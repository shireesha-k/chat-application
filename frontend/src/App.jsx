import Navbar from "./components/Navbar";
//Route to gove specific routes
import { Routes,Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
const App =()=>{
  return(
    <div >
       <Navbar/>
       <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} /> 
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/settings" element={<SettingsPage/>} /> 
        <Route path="/profile" element={<ProfilePage/>} /> 
       </Routes>
    </div>
  );
};
export default App;