import React, {useEffect, useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card, InputGroup} from 'react-bootstrap';
import {Makaan} from '../../request';
import axios from "axios";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import Loader from '../Common/Loader';
import {AuthState} from '../../Context/Context';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CustomerServices = (props) => {
    const {state : {site_settings}} = AuthState();
    const [state,setState] = useState({
        isSubmitting:false,
        countries:undefined,
    });
    const whatsappref = useRef(null);
    const [copyText, setCopyText] = React.useState({
        whatsapp:'Copy'
    });
    const copyToClipboard = (type) => {
        whatsappref.current.select();
        setCopyText({...copyText,whatsapp:'Copied'});
        document.execCommand('copy');
    };
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {register, setValue, watch, handleSubmit, getValues, formState , formState: {errors, isSubmitSuccessful}                      
    } = useForm()
    
    const handleChangeWhatsapp = (value, country, e, formattedValue) =>{
        setValue('whatsapp_number', value)
        setValue('whatsapp_code', country.dialCode)
    }

    const onSubmit = async(data, e) => {
        setState(prevState => ({
            ...prevState,
            isSubmitting: true
          }));
        var form = new FormData()
        form.append('file',data.file ? data.file[0] : [])
        form.append('full_name',data.full_name)
        form.append('whatsapp_number',data.whatsapp_number)
        form.append('email',data.email)
        form.append('whatsapp_code',data.whatsapp_code)
        form.append('question',data.question)
        Makaan.post(`customer-service`,form)
        .then(response => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
            if(!response.data.error){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                e.target.reset();
            }else{
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        })
        .catch(error => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
            if(error.response.status === 422){
                toast.error(error.response.data.message, {
                     position: toast.POSITION.TOP_RIGHT,
                });
            }else{
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        });
    };

    const uploadSingleFile = (type, e) => {
        if((e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg') && (e.target.files[0].size <= 5242880) && (e.target.files[0].size >= 1024*3)) {
            // if(type == 'profile'){
			// 	setImage({...image, file:URL.createObjectURL(e.target.files[0])});

			// }else if(type == 'logo'){
			// 	setImage({...image, logo:URL.createObjectURL(e.target.files[0])});
			// }
        }else{
            toast.error('Accepted files are jpg, jpeg, png and must be smaller than 5 MB', {
				position: toast.POSITION.TOP_RIGHT,
			});
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        setValue('whatsapp_code', "pk")
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

    // useEffect(() => {
    //     reset({
    //         data:'test'
    //     })
    // },[isSubmitSuccessful]);
    return (
        <div className="customer-services">
            <section className="section bg">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={11}>
                            <Row>
                                <Col xl={7} lg={7} md={7}>
                                    <Card className="contact-form">
                                        <Card.Body>
                                            <Card.Title>{t('customer_helpesk.customer_helpdesk')}</Card.Title>
                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Name: <span className="color">*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Full Name" {...register("full_name", {
                                                    required: t('Common.This field is required'),
                                                    pattern: {
                                                        required: t('Common.This field is required')
                                                    }
                                                    })}/>
                                                    {errors.full_name && (
                                                        <Form.Text className="text-danger">
                                                            {errors.full_name.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Whatsapp No: <span className="color">*</span></Form.Label>
                                                    <InputGroup className="phone-control mb-3">
                                                    <PhoneInput
                                                        placeholder="00000-00000"
                                                        enableSearch={true}
                                                        required={true}
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
                                                <Form.Group className="form-group">
                                                    <Form.Label>Email: <span className="color">*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="name@example.com" 
                                                    {...register("email", {
                                                        required: t('Common.This field is required'),
                                                        pattern: {
                                                          value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                          message: t('Common.Invalid email address')
                                                        }
                                                      })}/>
                                                    {errors.email && (
                                                        <Form.Text className="text-danger">
                                                            {errors.email.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Upload File:</Form.Label>
                                                    <Form.Control type="file"
                                                    {...register("file", {
                                                        required: false,
                                                        validate: {
                                                            lessThan5MB: files => (files[0]? files[0].size : 0) < 5242880 || 'Max 5MB',
                                                        },
                                                    })}
                                                    />
                                                    {errors.file && (
                                                        <Form.Text className="text-danger">
                                                            {errors.file.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Question: <span className="color">*</span></Form.Label>
                                                    <Form.Control  as="textarea" rows={3} placeholder="Type Here..." 
                                                    {...register("question", {
                                                        required: t('Common.This field is required')
                                                      })}/>
                                                    {errors.question && (
                                                        <Form.Text className="text-danger">
                                                            {errors.question.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Row className="justify-content-center">
                                                        <Col xs="auto">
                                                            <Button variant="primary" type="submit" disabled={state.isSubmitting}>
                                                                
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                                Send
                                                                {state.isSubmitting && <Loader type="Button"></Loader>}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xl={5} lg={5} md={5}>
                                    <Card className="action-card">
                                        <Card.Body>
                                            <p class="label">Customer Service Hours</p>
                                            <h3>9.30am – 6pm (PKT)</h3>
                                            <p class="note"></p>
                                        </Card.Body>
                                    </Card>
                                    <Card className="action-card">
                                        <Card.Body>
                                            <p class="label">Join WhatsApp Group to ask question/stay updated:</p>
                                            <a target="_blank" href={site_settings ? (site_settings.helpdesk_group_whatsapp ? site_settings.helpdesk_group_whatsapp: '') : ''} className="btn btn-whatsapp">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M30 14.615C30 22.6813 23.4087 29.2312 15.2763 29.2312C12.6975 29.2312 10.2688 28.5663 8.15875 27.4137L0 30L2.66249 22.155C1.31747 19.955 0.543766 17.3738 0.543766 14.6163C0.543766 6.54628 7.13747 0 15.2762 0C23.4087 0 30 6.54628 30 14.615ZM15.2762 2.32752C8.44999 2.32752 2.88999 7.83627 2.88999 14.6163C2.88999 17.3087 3.76747 19.7988 5.2475 21.8237L3.70498 26.375L8.46373 24.8713C10.4163 26.1562 12.7587 26.8975 15.2762 26.8975C22.0975 26.8975 27.6562 21.3863 27.6562 14.6063C27.6562 7.83753 22.0975 2.32752 15.2762 2.32752ZM22.7075 17.9825C22.62 17.8362 22.38 17.7475 22.0238 17.555C21.6525 17.3762 19.885 16.52 19.545 16.4025C19.2213 16.2824 18.9813 16.2237 18.7413 16.5799C18.49 16.9337 17.8063 17.7487 17.5975 17.9824C17.375 18.2199 17.1675 18.25 16.81 18.0725C16.4575 17.8962 15.2875 17.5162 13.9112 16.2912C12.8412 15.3475 12.1125 14.1762 11.9038 13.8125C11.6887 13.4512 11.8788 13.2587 12.0588 13.0825C12.2276 12.92 12.4213 12.66 12.6 12.4525C12.7863 12.2463 12.845 12.0988 12.9638 11.8613C13.0838 11.6163 13.0225 11.4101 12.9338 11.225C12.845 11.0463 12.1176 9.28757 11.8201 8.56882C11.5163 7.85258 11.2213 7.97135 11.0125 7.97135C10.795 7.97135 10.5601 7.94136 10.3151 7.94136C10.0776 7.94136 9.68509 8.02888 9.35006 8.39258C9.02381 8.74757 8.08754 9.61382 8.08754 11.3788C8.08754 13.1388 9.38005 14.8488 9.56507 15.0838C9.74507 15.3213 12.0588 19.0488 15.7326 20.4838C19.4014 21.9188 19.4014 21.445 20.0688 21.3851C20.7201 21.3251 22.2063 20.5151 22.5038 19.6851C22.7962 18.8412 22.7962 18.1313 22.7075 17.9825Z" fill="currentColor"/>
                                                </svg>
                                                Join WhatsApp Group
                                            </a>
                                        </Card.Body>
                                    </Card>
                                    <Card className="action-card">
                                        <Card.Body>
                                            {/* <p class="label">Call WhatsApp:</p>
                                            <Link to="" className="btn btn-whatsapp">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M30 14.615C30 22.6813 23.4087 29.2312 15.2763 29.2312C12.6975 29.2312 10.2688 28.5663 8.15875 27.4137L0 30L2.66249 22.155C1.31747 19.955 0.543766 17.3738 0.543766 14.6163C0.543766 6.54628 7.13747 0 15.2762 0C23.4087 0 30 6.54628 30 14.615ZM15.2762 2.32752C8.44999 2.32752 2.88999 7.83627 2.88999 14.6163C2.88999 17.3087 3.76747 19.7988 5.2475 21.8237L3.70498 26.375L8.46373 24.8713C10.4163 26.1562 12.7587 26.8975 15.2762 26.8975C22.0975 26.8975 27.6562 21.3863 27.6562 14.6063C27.6562 7.83753 22.0975 2.32752 15.2762 2.32752ZM22.7075 17.9825C22.62 17.8362 22.38 17.7475 22.0238 17.555C21.6525 17.3762 19.885 16.52 19.545 16.4025C19.2213 16.2824 18.9813 16.2237 18.7413 16.5799C18.49 16.9337 17.8063 17.7487 17.5975 17.9824C17.375 18.2199 17.1675 18.25 16.81 18.0725C16.4575 17.8962 15.2875 17.5162 13.9112 16.2912C12.8412 15.3475 12.1125 14.1762 11.9038 13.8125C11.6887 13.4512 11.8788 13.2587 12.0588 13.0825C12.2276 12.92 12.4213 12.66 12.6 12.4525C12.7863 12.2463 12.845 12.0988 12.9638 11.8613C13.0838 11.6163 13.0225 11.4101 12.9338 11.225C12.845 11.0463 12.1176 9.28757 11.8201 8.56882C11.5163 7.85258 11.2213 7.97135 11.0125 7.97135C10.795 7.97135 10.5601 7.94136 10.3151 7.94136C10.0776 7.94136 9.68509 8.02888 9.35006 8.39258C9.02381 8.74757 8.08754 9.61382 8.08754 11.3788C8.08754 13.1388 9.38005 14.8488 9.56507 15.0838C9.74507 15.3213 12.0588 19.0488 15.7326 20.4838C19.4014 21.9188 19.4014 21.445 20.0688 21.3851C20.7201 21.3251 22.2063 20.5151 22.5038 19.6851C22.7962 18.8412 22.7962 18.1313 22.7075 17.9825Z" fill="currentColor"/>
                                                </svg>
                                                Call On WhatsApp
                                            </Link> */}
                                            <div className="contact-list">
                                                <input  ref={whatsappref} style={{opacity:0, position: "absolute", "z-index": -999, pointerEvents:"none"}} value={site_settings ? (site_settings.helpdesk_call_whatsapp ? site_settings.helpdesk_call_whatsapp: '') : ''} />
                                                
                                                <div className="contact">
                                                    <div className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" color="currentColor">
                                                    <g>
                                                        <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M1,12.6c0-0.4,0-0.8,0-1.2c0-0.1,0-0.2,0-0.3   c0-0.8,0.2-1.5,0.4-2.3C2,7.2,2.8,5.7,4.1,4.4c1.7-1.7,3.7-2.8,6-3.2c0.4-0.1,0.8-0.1,1.3-0.2c0.4,0,0.9,0,1.3,0   c0.3,0,0.6,0.1,0.8,0.1c2.2,0.3,4.1,1.2,5.8,2.7c1.9,1.7,3.1,3.8,3.6,6.4c0.1,0.4,0.1,0.8,0.2,1.2c0,0.4,0,0.9,0,1.3   c0,0.1,0,0.2,0,0.2c-0.1,1.6-0.6,3-1.3,4.4c-1.1,2.1-2.8,3.6-4.9,4.6c-0.9,0.5-1.9,0.8-3,0.9c-0.4,0.1-0.8,0.1-1.1,0.2   c-0.4,0-0.9,0-1.3,0c-0.1,0-0.1,0-0.2,0c-1.6-0.1-3.1-0.6-4.5-1.4c-0.1-0.1-0.3-0.1-0.4,0c-1.3,0.4-2.7,0.7-4,1.1   c-0.3,0.1-0.6,0-0.8-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0.4-1.3,0.7-2.7,1.1-4c0-0.2,0-0.3,0-0.4c-0.6-1.1-1-2.3-1.2-3.6   C1.1,13.4,1.1,13,1,12.6z M3,21c0.1,0,0.2,0,0.2,0c1-0.3,2-0.5,3-0.8c0.3-0.1,0.5,0,0.8,0.1c0.6,0.3,1.3,0.7,1.9,0.9   c1.6,0.6,3.3,0.7,5,0.3c1.8-0.4,3.4-1.2,4.7-2.5c2.4-2.3,3.3-5.1,2.9-8.3c-0.3-2.1-1.2-3.9-2.7-5.4c-2.4-2.4-5.4-3.3-8.8-2.7   C7.7,3,5.8,4.2,4.3,6.2c-1.6,2.1-2.2,4.4-1.9,7C2.6,14.5,3,15.8,3.7,17c0.2,0.3,0.2,0.5,0.1,0.8c-0.3,1-0.5,2-0.8,3   C3,20.9,3,20.9,3,21z"/>
                                                        <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M14.3,18c-1.8,0-3.2-0.7-4.6-1.6c-1.4-1-2.5-2.4-3.1-4   c-0.5-1.2-0.7-2.5-0.4-3.7c0.2-1,0.8-1.8,1.8-2.4C8.5,5.9,9.2,6,9.7,6.4c0.4,0.4,0.9,0.8,1.3,1.3c0.7,0.7,0.6,1.7-0.2,2.3   c-0.1,0.1-0.3,0.2-0.5,0.3c0,0-0.1,0.1-0.1,0.2c0.2,0.8,0.4,1.5,0.9,2.1c0.6,0.7,1.4,1,2.2,1.2c0.3,0.1,0.4,0,0.5-0.2   c0.2-0.4,0.5-0.7,0.9-0.9c0.5-0.2,1-0.2,1.4,0.2c0.5,0.5,1,0.9,1.5,1.5c0.4,0.4,0.4,1.1,0.1,1.7c-0.6,1.1-1.6,1.6-2.7,1.8   C14.7,17.9,14.4,17.9,14.3,18z M7.4,9.7c0,1.1,0.3,2,0.8,2.9c0.8,1.4,1.8,2.4,3.2,3.2c1,0.5,2,0.9,3.2,0.8c0.8-0.1,1.5-0.3,2-1.1   c0.1-0.2,0.1-0.3,0-0.4c-0.3-0.3-0.7-0.7-1-1c-0.2-0.2-0.3-0.2-0.4,0c-0.2,0.3-0.4,0.5-0.5,0.8c-0.2,0.3-0.4,0.4-0.8,0.3   c-0.3-0.1-0.7-0.1-1-0.2c-1.1-0.3-2.2-0.9-2.9-1.8c-0.6-0.9-1-1.8-1.1-2.9c-0.1-0.4,0.1-0.7,0.5-1C9.4,9.2,9.6,9.1,9.8,9   c0.2-0.2,0.2-0.2,0-0.4C9.6,8.3,9.4,8,9.1,7.8c-0.5-0.5-0.6-0.5-1.1,0c0,0,0,0,0,0C7.5,8.4,7.4,9.1,7.4,9.7z"/>
                                                    </g>
                                                </svg>
                                                    </div>
                                                    <div className="contact-detail">
                                                        <p>Connect with Whatsapp</p>
                                                        <a target="_blank" rel="noopener noreferrer" className="phone_click" id="phone" href={"https://api.whatsapp.com/send?phone="+(site_settings ? (site_settings.helpdesk_call_whatsapp ? site_settings.helpdesk_call_whatsapp: '') : '')+"&text=Join WatsApp Group to ask question/stay"}>
                                                        {site_settings ? (site_settings.helpdesk_call_whatsapp ? site_settings.helpdesk_call_whatsapp: '') : ''}
                                                        </a>
                                                    </div>
                                                    <div className="contact-copy">
                                                        <Button variant="transparent text-color" onClick={()=>copyToClipboard('whatsapp')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                                            {copyText.whatsapp}
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
        
}

export default CustomerServices;
