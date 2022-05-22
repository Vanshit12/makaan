import React, { useEffect, useState } from 'react';
import { Card, Form, Container, Row, Col, Button, ToggleButton, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Makaan } from '../../request';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Loader from '../Common/Loader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PropertyRequestForm = () => {
    const {register, watch, handleSubmit, formState , formState: {errors}, setValue, getValues                    
    } = useForm();
    const [state, setState] = useState({
        isSubmitting:false,
        user_type:'buyer',
        countries: undefined
    });
    const param = useParams();
    const { t } = useTranslation();
    const sendRequestViaEmail = async (data, event) => {
        setState(prevState => ({
            ...prevState,
            isSubmitting: true
        }));
        data.property_id = param.id;
        data.user_type = state.user_type;
        Makaan.post(`send-request-via-email`, data)
            .then(response => {
                if (response.data.success === 200) {
                    setState(prevState => ({
                        ...prevState,
                        isSubmitting: false
                    }));
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
   
    const handleChangeWhatsapp = (value, country, e, formattedValue) =>{
        setValue('whatsapp_number', value)
        setValue('whatsapp_code', country.dialCode)
    }
    
    const handleChangePhone = (value, country, e, formattedValue) =>{
        setValue('phone_number', value)
        setValue('phone_code', country.dialCode)
    }

    function clearFields(event) {
        Array.from(event.target).forEach((e) => (e.value = ""));
    }
    const [checked, setChecked] = useState({
		checkedPhone:false
	});
    const handlePhoneCheckbox = () => setChecked({...checked, checkedPhone:!checked.checkedPhone});

    useEffect(() => {
        setValue('whatsapp_code', "pk")
		setValue('phone_code', "pk")
		let endpoints = [
            `fetch-countries`
		];
		axios.all(endpoints.map((endpoint,i) => {
			return Makaan.get(endpoint);
		})).then(
			(res) => {
				setState({...state,countries: res[0].data.data})
			}
		)
	},[]);
    return (
            <Form onSubmit={handleSubmit(sendRequestViaEmail)}>
                <Form.Group className="form-group" controlId="formName">
                    <Form.Label> Name <span className="color">*</span></Form.Label>
                    <Form.Control type="text" name="name" {...register("name", { required: t('Common.This field is required') })} />
                    {errors.name && (
                    <Form.Text className="text-danger">
                        {errors.name.message}
                    </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="form-group" controlId="formEmail">
                    <Form.Label> Email <span className="color">*</span></Form.Label>
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
                    <Form.Label>Whatsapp Number <span className="color">*</span></Form.Label>
                    <InputGroup className="phone-control mb-3">
                        <PhoneInput
                            placeholder="00000-00000"
                            enableSearch={true}
                            country={getValues('whatsapp_code')}
                            autoFormat={false}
                            name="whatsapp_number"
                            onChange={handleChangeWhatsapp}
                        />
                        <input
                            type="hidden"
                            value={watch('whatsapp_number')}
                            name="whatsapp_number"

                            {...register("whatsapp_number", {
                                required: t('Common.This field is required'),
                                minLength: {
                                    value: 10,
                                    message: t('Common.Very Few digits')
                                },
                                maxLength: {
                                    value: 15,
                                    message: t('Common.Too Many digits')
                                }
                                })}
                        />
                        <input
                            type="hidden"
                            value={watch('whatsapp_code')}
                            name="whatsapp_code"

                            {...register("whatsapp_code", {
                                required: false
                                })}
                        />
                    </InputGroup>
                    {errors.whatsapp_number && (
                    <Form.Text className="text-danger">
                        {errors.whatsapp_number.message}
                    </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="form-group pt-0" controlId="formWhatsappPhone">
                    <div className="form-check">
                        <input type="checkbox" id="checkedPhone" name="checkedPhone" className="form-check-input" {...register('checkedPhone', { required: false })}></input>
                        <label htmlFor="checkedPhone" onClick={handlePhoneCheckbox}>
                            <div className="checkbox" ></div>
                            <span>Phone Number is different from whatsapp?</span>
                        </label>
                    </div>
                </Form.Group>
                {checked.checkedPhone &&
                    (
                        <Form.Group className="form-group" controlId="formPhone">
                            <Form.Label>Phone Number <span className="color">*</span></Form.Label>
                            <InputGroup className="phone-control mb-3">
                            <PhoneInput
                                placeholder="00000-00000"
                                enableSearch={true}
                                required={true}
                                country={getValues('phone_code')}
                                autoFormat={false}
                                name="phone_number"
                                onChange={handleChangePhone} 
                            />
                            <input
                                type="hidden"
                                value={watch('phone_number')}
                                name="phone_number"

                                {...register("phone_number", {
                                    required:checked.checkedPhone && t('Common.This field is required'),
                                    minLength: {
                                        value: 10,
                                        message: t('Common.Very Few digits')
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: t('Common.Too Many digits')
                                    }
                                    })}
                            />
                            <input
                                type="hidden"
                                value={watch('phone_code')}
                                name="phone_code"

                                {...register("phone_code", {
                                    required: false
                                    })}
                            />
                            </InputGroup>
                            {errors.phone_number && (
                            <Form.Text className="text-danger">
                                {errors.phone_number.message}
                            </Form.Text>
                            )}
                        </Form.Group>
                    )
                }
                <Form.Group className="form-group" controlId="formMessage">
                    <Form.Label>Message <span className="color">*</span></Form.Label>
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
                                <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                                    <ToggleButton  type="checkbox" id="inline-radio-1" name="role" variant="outline-primary" className="btn_radio_2 btn_radio_3" 
                                    checked={state.user_type === "buyer"}
                                    onClick={(e) => setState({...state,user_type:'buyer'})}
                                    >
                                        <div className="radio-dot"></div>
                                        Buyer/Tenant
                                    </ToggleButton>
                                </Col>
                                <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                                    <ToggleButton  type="checkbox" id="inline-radio-2" name="role" variant="outline-primary" className="btn_radio_2 btn_radio_3"
                                    checked={state.user_type === "agent"}
                                    onClick={(e) => setState({...state,user_type:'agent'})}
                                    >
                                        <div className="radio-dot"></div>
                                        Agent
                                    </ToggleButton>
                                </Col>
                                <Col xl="auto" lg="auto" md="auto"sm="auto" xs="auto">
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
                    <Button variant="primary" className="w-100" type="submit" disabled={state.isSubmitting}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        Send Email
                        {state.isSubmitting && <Loader type="Button"></Loader>}
                    </Button>
                </div>
            </Form>
    );
}
export default PropertyRequestForm;