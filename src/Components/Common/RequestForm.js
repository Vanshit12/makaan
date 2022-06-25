import React, { useEffect, useState } from 'react';
import { Card, Badge, Form, Container, Row, Col, Button, Modal, Tab, Nav, ToggleButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {Makaan} from '../../request';
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const RequestForm = (props) => {
    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
        watch
    } = useForm()
	const [state,setState] = useState({
		user_type:'buyer'
	});
    const param = useParams();
	const { t } = useTranslation();

    function clearFields(event) {
        Array.from(event.target).forEach((e) => (e.value = ""));
    }
	const sendRequestViaEmail = async (data, event) => {
        data.property_id = param.id;
        data.user_type = state.user_type;
        Makaan.post(`send-request-via-email`, data)
            .then(response => {
                if (response.data.sucess == 200) {
                    clearFields(event);
                    toast.success(response.data.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error("Something went wrong. Please try again", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    }
	/**
     * contact detail popup
     */
    const handleClose = () => setShow(false);
    
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const handleCloseWhatsapp = () => setShowWhatsapp(false);
    const handleShowWhatsapp = () => {
        setShowWhatsapp(true);
    }
	useEffect(() => {
		
	},[]);
    return (
        <Card className="contact-card">
            <Card.Body>
                <Form onSubmit={handleSubmit(sendRequestViaEmail)}>
                    <Form.Group className="form-group" controlId="formName">
                        <Form.Label> Name </Form.Label>
                        <Form.Control type="text" name="name" {...register("name", { required: t('Common.This field is required') })} />
                        {errors.name && (
                        <Form.Text className="text-danger">
                            {errors.name.message}
                        </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="form-group" controlId="formEmail">
                        <Form.Label> Email</Form.Label>
                        <Form.Control placeholder="" name="email" {...register("email", { required: t('Common.This field is required'), pattern: { value: /^(([^ <>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: t('Common.Invalid email address')
                        }
                        })}/>
                            {errors.email && (
                            <Form.Text className="text-danger">
                                {errors.email.message}
                            </Form.Text>
                            )}
                    </Form.Group>
                    <Form.Group className="form-group" controlId="formWhatsappPhone">
                        <Form.Label>Whatsapp Number</Form.Label>
                        <Form.Control name="whatsapp_number" {...register("whatsapp_number", { required: t('Common.This field is required'), maxLength: { value: 13, message: t('Common.Too Many Characters') } })} />
                        {errors.whatsapp_number && (
                        <Form.Text className="text-danger">
                            {errors.whatsapp_number.message}
                        </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="form-group pt-0" controlId="formWhatsappPhone">
                        <div className="form-check">
                            <input type="checkbox" id="checkNumber" name="check_number" className="form-check-input" {...register('check_number', { required: false })}></input>
                            <label htmlFor="checkNumber" onClick={handleCheckbox}>
                                <div className="checkbox" ></div>
                                <span>Phone Number is different from whatsapp?</span>
                            </label>
                        </div>
                    </Form.Group>
                    {checked &&
                    <Form.Group className="form-group" controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="phone_number" {...register("phone_number", { required: t('Common.This field is required'), maxLength: { value: 13, message: t('Common.Too Many Characters') } })} />
                        {errors.phone_number && (
                        <Form.Text className="text-danger">
                            {errors.phone_number.message}
                        </Form.Text>
                        )}
                    </Form.Group>
                    }
                    <Form.Group className="form-group" controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" {...register("message", { required: t('Common.This field is required') })} />
                        {errors.message && (
                        <Form.Text className="text-danger">
                            {errors.message.message}
                        </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="form-group radio_group form-nofloat" controlId="formMessage">
                        <Row>
                            <Col xl="auto">
                                <Form.Label className="mb-0">I am a:</Form.Label>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xl="auto">
                                        <ToggleButton  type="checkbox" id="inline-radio-1" name="role" variant="outline-primary" className="btn_radio_2 btn_radio_3" 
                                        checked={state.user_type === "buyer"}
                                        onClick={(e) => setState({...state,user_type:'buyer'})}
                                        >
                                            <div className="radio-dot"></div>
                                            Buyer/Tenant
                                        </ToggleButton>
                                    </Col>
                                    <Col xl="auto">
                                        <ToggleButton  type="checkbox" id="inline-radio-2" name="role" variant="outline-primary" className="btn_radio_2 btn_radio_3"
                                        checked={state.user_type === "agent"}
                                        onClick={(e) => setState({...state,user_type:'agent'})}
                                        >
                                            <div className="radio-dot"></div>
                                            Agent
                                        </ToggleButton>
                                    </Col>
                                    <Col xl="auto">
                                        <ToggleButton  type="checkbox" id="inline-radio-3" name="role" variant="outline-primary" className="btn_radio_2 btn_radio_3"
                                        checked={state.user_type === "other"}
                                        onClick={(e) => setState({...state,user_type:'other'})}>

                                            <div className="radio-dot"></div>
                                            Other
                                        </ToggleButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Group>
                    <div className="btn_wrap">
                        <Button variant="primary" className="w-100" type="submit" disabled={isSubmitting}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Send Email
                            {isSubmitting && <span className="spinner-border spinner-border-sm ml-3 d-block" />}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        );
    }
        
export default RequestForm;