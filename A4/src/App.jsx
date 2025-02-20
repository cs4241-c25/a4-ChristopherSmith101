import './App.css'
import './Add.jsx'
import AddForm from "./Add.jsx";
import DeleteForm from "./Delete.jsx";
import LoadTable from "./Table.jsx";

async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const json = {"username": username, "password": password};

  let body = JSON.stringify(json);
  console.log(body);

  const response = await fetch('https://a4-server-e6j7.onrender.com/login', {
    method: 'POST',
    body
  })
  console.log(response);

  const text = await response.text();
  const user = JSON.parse(text);
  console.log(text);

  if(user !== null){
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', user.username);
    console.log('logged in');
    window.location.reload();
  } else {
    alert('Invalid Login, Try Again or Go Away.');
  }
}

function App() {
    const title = "Mobile Legends Database";
    const addHeader = "Add or Edit a Hero";
    const deleteHeader = "Remove Heroes";
    const results = "Results";

    let user = localStorage.getItem("user");
    let loggedIn = localStorage.getItem("loggedIn");

    if(user !== '' || loggedIn === 'true') {
      return(
          <>
            <button id="sign-out" onClick={()=>{localStorage.setItem('loggedIn', 'false'); localStorage.setItem('user', ''); window.location.reload()}}>Log Out</button>
            <h1>{title}</h1>
            <h2>{addHeader}</h2>
            <AddForm/>
            <h2>{deleteHeader}</h2>
            <DeleteForm/>
            <h2>{results}</h2>
            <LoadTable/>
          </>
      )
      }
  return(
      <>
        <div className="container">
          <form onSubmit={login}>
            <label htmlFor="username">Username:</label><input type="text" name="username" id="username"
                                                              placeholder="Enter Username"/>
            <br/>
            <label htmlFor="password">Password:</label><input type="password" name="password" id="password"
                                                              placeholder="Enter Password"/>
            <br/>
            <button type="submit">Login</button>
          </form>
        </div>
      </>
  )

}

export default App
