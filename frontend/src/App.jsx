import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import TaskManager from './TaskManager'
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='App'>
      <Routes>
				<Route path='/' element={authUser ? <TaskManager /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
    </div>
  )
}

export default App
