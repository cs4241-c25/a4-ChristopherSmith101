// FRONT-END (CLIENT) JAVASCRIPT HERE

const deleteAll_body = () =>
{
    const json = {username: localStorage.getItem("user")}
    return JSON.stringify(json)
}

const remove_body = () =>
{
    const delete_name = document.querySelector("#old_hero_name"),
        json={name: delete_name.value, username: localStorage.getItem("user")}
    return JSON.stringify(json)
}

const add_body = () =>
{
    const new_name = document.querySelector("#new_hero_name"),
        new_type = document.querySelector("#hero_type"),
        new_role = document.querySelector("#hero_role"),
        json = {name: new_name.value, type: new_type.value, role: new_role.value, username: localStorage.getItem("user")}
    return JSON.stringify(json)
}

const logout = ()=>{
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("user", "");
    console.log("Logged out");
    window.location.href = "login.html";
}

const add = async function(event){
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day

    event.preventDefault()

    // const input = document.querySelector( "#yourname" ),
    //     json = { yourname: input.value },
    const body = add_body()

    const response = await fetch( "/add", {
        method:'POST',
        body
    })

    const text = await response.text()
    console.log( "text:", text )

    const heroes = JSON.parse(text)
    console.log( heroes );
    makeTable(heroes)
}

const delete_all = async function(event){
    event.preventDefault()

    const body = deleteAll_body();

    const response = await fetch( "/delete_all", {
        method:'POST',
        body
    })

    const text = await response.text()
    console.log( "text:", text )

    const heroes = JSON.parse(text)
    console.log( heroes );

    makeTable(heroes)
}

const remove = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day

    event.preventDefault()

    const body = remove_body()

    const response = await fetch( "/delete", {
        method:'POST',
        body
    })

    const text = await response.text()
    console.log( "text:", text )

    const heroes = JSON.parse(text)
    console.log( "heroes:", text );
    makeTable(heroes)
}

const makeTable = function(heroes){
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    const headerPart = document.createElement("tr");
    for (const key in heroes[0]){
        //if(key !== "_id") {
            const header = document.createElement("th");
            header.textContent = key;
            headerPart.appendChild(header);
        //}
    }
    thead.appendChild(headerPart);
    for(const index in heroes){
            //console.log(heroes);
            //console.log(index);
            const row = document.createElement("tr");
            for (const key in heroes[index]) {
                //console.log(key)
                //if(key !== "_id") {
                const td = document.createElement("td");
                td.textContent = heroes[index][key];
                row.appendChild(td);
                //}
            }
            tbody.appendChild(row);

    }

    const last=document.createElement("tr");
    const title = document.createElement("td");
    const total = document.createElement("td");
    title.textContent = "Total Hero Count"
    console.log( heroes.length );
    if(heroes.length === undefined){
        total.textContent = "0";
    } else {
        total.textContent = heroes.length;
    }
    last.appendChild(title);
    last.appendChild(total);
    tbody.appendChild(last);

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById("info").replaceChildren(table);
}