import React, {useState} from 'react';
import { NavLink, Link} from 'react-router-dom';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';


const AgentDashboard = (props) => {

    return (
        <div className="property-listing-page">
            <div class="myaccount-head">
                <Row className="align-items-center">
                    <Col xl lg md sm={12}>
                        <div class="myacconut_wrap_toggle">
                            <h2>Agent Dashboard</h2> 
                        </div>
                    </Col>
                </Row>
        	</div>
            <div class="myaccount-body">
            <Form>
                <Row>
                    <Col xl={12} lg={12}>
                        <h6 class="form-section-heaing"><strong>PROPERTY TYPE AND LOCATION</strong></h6>   
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={4}>
                        <Form.Group className="form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder='Email Address'/>
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                    </Col>


                    <Col xl={12} lg={12}>
                        <h6 class="form-section-heaing"><strong>PROPERTY DETAILS</strong></h6>   
                    </Col>
                    <Col xl={4} lg={4}>
                       
                    </Col>

                </Row>
            </Form>
            </div>     
        </div>
    );
}

export default AgentDashboard;