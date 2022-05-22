import React, {useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {Container, NavItem, Row, Col} from 'react-bootstrap';
import {Makaan} from '../../request'
const NotificationListing = (props) => {

const [state,setState] = useState({
  notifications:[]
});

    useEffect(() => {
        window.scrollTo(0, 0);
        let endpoints = [
            `notifications`
        ];
        axios.all(endpoints.map((endpoint,i) => {
                return Makaan.get(endpoint);
        })).then(
            (res) => {
                setState({...state, notifications: res[0].data.data})
            }
        );

   },[]);

    return (
        <div className="notification-page">
            <section className="">
                <Container>
                    <Row>
                        <Col>
                            <div className="section-title">
                                <h2 className="heading-2">Notifications</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <div className="notification-list">
                                {
                                    state.notifications.length > 0 ? 
                                    (
                                        state.notifications.map((notification)=>{
                                            return (<NavItem>
                                                <NavLink className={`nav-link ${notification.shown === 1 ? '' : 'unread'}`} to="{notification.link}">
                                                    <p>{notification.message.message}<span></span></p>
                                                    <div className="date">{notification.created_at}</div>
                                                </NavLink>
                                            </NavItem>
                                            )
                                        })
                                    ) : 'No notifications found'
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div> 
    );
}

export default NotificationListing;
