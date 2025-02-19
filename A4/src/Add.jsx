const AddForm = () => {

    const add_body = () =>
    {
        const new_name = document.querySelector("#new_hero_name"),
            new_type = document.querySelector("#hero_type"),
            new_role = document.querySelector("#hero_role"),
            json = {name: new_name.value, type: new_type.value, role: new_role.value, username: localStorage.getItem("user")}
        return JSON.stringify(json)
    }

    const URL = "http://localhost:3000/add";
    //const body = {username: localStorage.getItem('user')};

    const addData = async (event) => {
        event.preventDefault();
        const body = add_body();
        const response = await fetch(URL, {
            method: 'POST',
            body: body
        })
        console.log(response);
    }

    return (
        <form>
            <label htmlFor="new_hero_name">New Hero: </label><input type="text" id="new_hero_name" name="name" defaultValue={"Hero Name"}/>
            <br/>
            <label htmlFor="hero_type">Hero Type: </label>
            <select id="hero_type" name="type">
                <option value="tank" id="tank">Tank</option>
                <option value="fighter" id="fighter">Fighter</option>
                <option value="mage" id="mage">Mage</option>
                <option value="assassin" id="assassin">Assassin</option>
                <option value="marksman" id="marksman">Marksman</option>
                <option value="support" id="support">Support</option>
            </select>
            <br/>
            <label htmlFor="hero_role">Hero Role: </label>
            <select id="hero_role" name="role">
                <option value="roam" id="roam">Roam</option>
                <option value="exp" id="exp">Exp Lane</option>
                <option value="mid" id="mid">Mid Lane</option>
                <option value="jungle" id="jg">Jungle</option>
                <option value="gold" id="gold">Gold Lane</option>
            </select>
            <br/>
            <button id="addb" onClick={addData}>submit</button>
        </form>
    )
}

export default AddForm;