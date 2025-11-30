// App.tsx
import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/SignUp"

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
  )
}

export default App
