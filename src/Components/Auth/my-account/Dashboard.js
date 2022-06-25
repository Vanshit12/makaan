import React, {useState} from 'react';
import { NavLink, Link} from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import {AuthState} from '../../../Context/Context';

const Dashboard = (props) => {
	const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
    return (
        <div className="dashboard-page">
        	<div class="myaccount-head">
				<Row className="align-items-center">
					<Col xl lg md sm={12}>
						<div class="myacconut_wrap_toggle">
							<h4>Hello, {`${user_info.first_name}`}</h4>
        					<h2>Welcome to Makaan Guide Dashboard!</h2>
						</div>
					</Col>
					
				</Row>
        		
        	</div>
       	</div>
    );
}

export default Dashboard;