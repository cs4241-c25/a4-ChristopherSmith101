import {useState, useEffect} from 'react';


const LoadTable = () => {
    const [data, setData] = useState(null);
    const URL = "http://localhost:3000/load-table";

    //let refresh = false;

    const body = {username: localStorage.getItem('user')};
    const inp = JSON.stringify(body);

    const findData = ()=>{
        const getData = async () => {
            console.log("getting data");

            const response = await fetch( URL, {
                method:'POST',
                body: inp
            })

            console.log("got data");
            console.log(response);
            const json = await response.json();
            setData(json);
        }
        const result = getData();
        console.log(result);
        //refresh = false;
    }

    useEffect(() => {
        findData();
    }, [URL, inp])

    const makeTable = (listOfHeroes) => {
        if (!listOfHeroes || listOfHeroes.length === 0) {
            return <p>There are no heroes.</p>
        }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    {Object.keys(listOfHeroes[0]).map((key) => (
                        <th key={key}>
                            {key}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {listOfHeroes.map( (hero, index) => (
                    <tr key={index}>
                        {Object.values(hero).map((item, i) => (
                            <td key={i}>
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{listOfHeroes.length}</td>
                </tr>
                </tfoot>
            </table>
        </>
    )
    }

    return (
        <>
            <button id="seeTable" onClick={findData}>See Results</button>
            {makeTable(data)}
        </>
    )

}

export default LoadTable;