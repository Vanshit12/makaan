import React, {useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, NavItem, Container, Dropdown, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {Makaan} from '../../request';
import axios from "axios";
import {AuthState} from '../../Context/Context';
import Slider from "react-slick";
import Loader from '../Common/Loader';
import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";



const  Header = (props) => {
        const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
        const { t , i18n} = useTranslation();
        const [state,setState] = useState({
            lang:'en',
            show_announcement:'1',
            announcements:[],
            property_id :'',
            searchIsSubmitting:false,
        });
        const navigate = useNavigate();
        // const [selectedLang, setSelectedLang] = useState('en');
        const languageSelect = (event) => {
            setState({...state, lang:event})
//            setSelectedLang(event.target.value);
        i18n.changeLanguage(event);
        }
        const logout = () => {
            localStorage.removeItem("access_token")
            dispatch({type:'LOGOUT',payload:undefined});
            dispatch({type:'USER_INFO_FETCH',payload:{}});
            toast.success("Logout Successfull !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        const propertyUniqueIdSearch = () => {
            if(state.property_id == ''){
                return;
            }
            setState(prevState => ({
                ...prevState,
                searchIsSubmitting: true
              }));
            Makaan.post(`/property-search-id`,{property_id:state.property_id})
            .then(response => {
                setState(prevState => ({
                    ...prevState,
                    searchIsSubmitting: false
                  }));
                if(!response.data.error){
                    navigate('/property/'+response.data.data);
                }else{
                    toast.error("No Property Found with that property id", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
        }
        const readNotification = React.forwardRef(({ children, onClick }, ref) => (
              <button
                ref={ref}
                className="btn btn-dropdown dropdown-toggle"
                onClick={(e) => {
                    Makaan.post(`notifications`,{latest_id:notifications.length > 0 ? notifications[0].id : 0, count:5} )
                    .then(res => {
                            
                    })
                  e.preventDefault();
                  onClick(e);
                }}
              >
                {children}
              </button>
            ));
        const hideAnnouncement = () =>{
            // localStorage.setItem("show_announcement", '0')
            setState({...state,show_announcement:'0'});
        }
        function SampleNextArrow(props) {
          const {onClick } = props;
          return (
            <Button className={"btn-transparent btn btn-icon btn-icon-md slick-next"} onClick={onClick} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
            </Button>
          );
        }

        function SamplePrevArrow(props) {
          const {onClick } = props;
          return (
            <Button
              className={"btn-transparent btn btn-icon btn-icon-md slick-prev"}
              onClick={onClick}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
            </Button>
          );
        }

        const settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            touchMove: true,
            autoplay: true,
            arrows: false,
        }; 
            
        useEffect(() => {
            let endpoints = [
                `announcement`
            ];
            axios.all(endpoints.map((endpoint,i) => {
                return Makaan.get(endpoint);
            })).then(
                (res) => {
                    setState({...state, announcements:res[0].data.data})
                }
            );
        },[]);
        return (
                <header className="main-header">
                {
                    (state.announcements && state.announcements.length > 0 && state.show_announcement === '1') && (
                        <div className="announcement-bar">
                            <div class="announcement-bar-wrap">
                                <Slider {...settings}>
                                    {
                                        state.announcements.map((announcement,i)=>{
                                            return (
                                                <div key={`announcement-${i}`}  class="item">
                                                    <a href={announcement.link}>{announcement.title}</a>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <Button variant="btn btn-icon" onClick={hideAnnouncement}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </Button>
                        </div>
                       
                    )
                }
                
                <Navbar bg="light" expand="lg">
                <Container fluid="">
                    <Navbar.Brand>
                        <Link to="/">
                        <img src="/assets/images/logos/makaan-logo.svg" alt="Makaan Guide Logo"/>
                        </Link>
                        </Navbar.Brand>
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </Navbar.Toggle>
                        <Nav className="me-auto">
                            <NavItem>
                                <NavLink className="nav-link" to="rental-property-management">
                                    <span>{t('Navbar.RentalPropertyManagem')}</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/property-on-demand"><span>{t('Navbar.PropertyOnDemand')}</span> </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/pricing"><span>{t('Navbar.Pricing')}</span> </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/maping"><span>{t('Navbar.Maping')}</span> </NavLink>
                            </NavItem>
                            {/*<NavItem>
                                <NavLink className="nav-link" to="#"><span>{t('Navbar.DownloadApp')}</span></NavLink>
                            </NavItem>*/}
                            <NavItem>
                                <NavLink className="nav-link" to="/add-property"><span>{t('Navbar.ListProperty')}<span className="color">Free</span></span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="customer-services"><span>{t('Navbar.CustomerService')}</span></NavLink>
                            </NavItem>
                        </Nav>
                        <Form className="property-id-search">
                            <Form.Group className="form-group">
                                <Form.Control onChange={e => setState({...state,property_id:e.target.value})} type="text" name="propertyUniqueId" placeholder="Property Id" required/>
                                <Button variant="icon btn-primary btn-icon-sm" onClick={propertyUniqueIdSearch} disabled={state.searchIsSubmitting}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    {state.searchIsSubmitting && <Loader type="Button"></Loader>}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Navbar.Collapse>
                    <Nav className="right_menu align-items-center">
                        {/* <Nav.Item>
                            <Dropdown align="end">
                                <Dropdown.Toggle id="dropdown-autoclose-true" variant="dropdown">
                                    {state.lang}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item  onClick={() => languageSelect("urdu")} className="nav-link" >Urdu</Dropdown.Item >
                                    <Dropdown.Item onClick={() =>  languageSelect("en")}  className="nav-link" >English</Dropdown.Item >
                                </Dropdown.Menu>
                            </Dropdown> 
                        </Nav.Item> */}
                        {/* <Nav.Item>
                            <Dropdown  align="end">
                                <Dropdown.Toggle id="dropdown-autoclose-true" variant="dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                    </svg>
                                    {lang}
                                </Dropdown.Toggle>
                                <Dropdown.Menu> 
                                    <Dropdown.Item onClick={() => languageSelect("urdu")} className="nav-link" >Urdu</Dropdown.Item>
                                    <Dropdown.Item onClick={() =>  languageSelect("en")} className="nav-link">English</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                        </Nav.Item> */}
                        {/* <Nav.Item className="align-items-center d-flex">
                            <Dropdown align="end" className="notification-dropdown">
                                    <Dropdown.Toggle id="dropdown-autoclose-true" as={readNotification} className="active" variant="dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        <div className="notification-list">
                                            {
                                                notifications.length > 0 ? 
                                                (
                                                <>
                                                <div className="overflow">
                                                    {
                                                        notifications.map((notification)=>{
                                                        return (<NavItem>
                                                            <NavLink className={`nav-link ${notification.shown === 1 ? '' : 'unread'}`} to="{notification.link}">
                                                                <p>{notification.message.message}<span></span></p>
                                                                <div className="date">{notification.created_at}</div>
                                                            </NavLink>
                                                        </NavItem>
                                                        )
                                                    })
                                                }
                                                </div>
                                                <NavItem>
                                                    <NavLink className="nav-link all-notification" to="/notifications">
                                                        View All Notifications
                                                    </NavLink>
                                                </NavItem>
                                                </>
                                                ):
                                                (
                                                <NavItem className="empty-label">
                                                    <p className="text-center">No New Notification</p>
                                                </NavItem>
                                                )
                                            }
                                            
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </Nav.Item> */}
                        {
                            authUser &&
                            (<Nav.Item>
                                <Dropdown align="end">
                                    <Dropdown.Toggle id="dropdown-autoclose-true" variant="dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="user_menu">
                                        <NavItem>
                                            <NavLink className="nav-link" to="/my-account/dashboard">{t('My Account')} ({`${user_info.first_name}`} {`${user_info.last_name}`.slice(0,1)})</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" onClick={logout} to="#">{t('Logout')}</NavLink>
                                        </NavItem>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav.Item>
                            )
                        }
                        {
                            !authUser && (
                                <NavItem className="align-items-center d-flex">
                                    <Link className="btn btn-primary nav-link" to="/login"><span>{t('Common.Login')}</span></Link>
                                </NavItem>
                            )
                        }
                       
                            <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                            </Navbar.Toggle>
                    </Nav>
                </Container>
                </Navbar>
                </header>
        )
    }

export default Header;