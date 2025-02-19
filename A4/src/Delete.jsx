const DeleteForm = () => {
    const URL_Delete = "http://localhost:3000/delete";
    const URL_Delete_All = "http://localhost:3000/delete_all";


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

    const removeData = async (event, id) => {
        event.preventDefault();
        if (id === "delete") {
            const body = remove_body();
            const response = await fetch(URL_Delete, {
                method: 'POST',
                body: body
            })
            console.log(response);
        } else if(id === "removeb") {
            const body = remove_body();
            const response = await fetch(URL_Delete_All, {
                method: 'POST',
                body: body
            })
            console.log(response);
        }
    }

    return (
        <>
        <form>
                <label htmlFor="old_hero_name">Hero to Remove: </label><input type="text" id="old_hero_name" name="name" defaultValue="Hero Name"/>
                <button id="delete" onClick={(event)=> removeData(event, "delete")}>submit</button>
        </form>
                <button id="removeb" onClick={(event) => removeData(event, "removeb")}>Remove All</button>
        </>
    )
}

export default DeleteForm;