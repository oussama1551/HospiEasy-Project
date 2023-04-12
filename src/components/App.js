
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import SideBar from "components/SideBar/Sidebar.js"
import TableauBord from 'views/Pages/TableauBord/TableauBord';
import Patients from 'views/Pages/PatienstBord/Patients';




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />            
                <Route path="/admin" element={<SideBar />} >
                    <Route index element={<TableauBord />}/>
                    <Route path="Patients" element={<Patients />} />
                </Route>
            </Routes> 
        </Router>

    );
  }
  
  export default App;