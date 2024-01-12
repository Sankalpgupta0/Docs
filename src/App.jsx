import Back from "./components/Back.jsx"
import Front from "./components/Front.jsx"
import Signup from "./components/Signup.jsx"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
