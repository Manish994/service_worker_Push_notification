import "./App.css";
import Users from "users";
import RefreshServiceWorker from "./component/RefreshServiceWorker";

function App() {
  const date = new Date().toString();
  return (
    <>
      <div>Buit at : {date}</div>
      <h1>Vite + React</h1>
      <Users></Users>
      <RefreshServiceWorker></RefreshServiceWorker>
    </>
  );
}

export default App;
