import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';
import WhatsAppSection from '../Common/WhatsAppSection';
import AppSection from '../Common/AppSection';
import {AuthState} from '../../Context/Context';
import { toast } from 'react-toastify';

const MyAccount = ({children}) => {
	const {state : dispatch} = AuthState();
	const logout = () => {
		localStorage.removeItem("access_token")
		dispatch({type:'LOGOUT',payload:undefined});
		toast.success("Logout Successfull !", {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
    return (
        <div className="myaccount">
            <Container  fluid="xxl">
                <div className="myaccount_wrap">
                    <Navbar className="myaccount_navbar">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn btn-icon-round btn-icon-md btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="myaccount-sidebar" className="myaccount_sidebar">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn btn-icon-round btn-icon btn-icon-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </Navbar.Toggle>
                                <Nav defaultActiveKey="/my-account/dashboard" className="flex-column">
                               <NavLink exact to="/my-account/dashboard" className="nav-link">Dashboard</NavLink>
                               <NavLink exact to="/my-account/user-profile" className="nav-link">User Profile</NavLink>
                               <NavLink exact to="/my-account/change-password" className="nav-link">Change Password</NavLink>
                               <NavLink exact to="/my-account/added-properties" className="nav-link">Property Listing</NavLink>
                               {/* <NavLink to="/my-account/agent-dashboard" className="nav-link">Agent Dashboard</NavLink> */}
                                {/* <NavLink exact to="/my-account/requests" className="nav-link">Requests</NavLink> */}
                                <NavLink exact to="/" className="nav-link" onClick={logout}>
                                    Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="myaccount_content">
                        <Outlet />
	       			</div>
	       		</div>
        	</Container>
       		{/* <AppSection></AppSection> */}
            <WhatsAppSection></WhatsAppSection>
        </div>
    );
}

export default MyAccount;