

import {Outlet,Navigate} from 'react-router-dom';

const AdminRoutes=()=>{
    let loginStatus = sessionStorage.getItem('login');
    let user = sessionStorage.getItem('user');
    let user_id = sessionStorage.getItem('id');
    return(
        loginStatus==='true'&& user==='admin' && user_id ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AdminRoutes;