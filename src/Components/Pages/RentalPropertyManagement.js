import React, {useEffect, useState, useRef} from 'react';
import { Row, Col, Form, Button, Container, Card, InputGroup} from 'react-bootstrap';
import { useForm } from "react-hook-form";

import {AuthState} from '../../Context/Context';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {Makaan} from '../../request';
import axios from "axios";
import Loader from '../Common/Loader';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const RentalPropertyManagement = (props) => {
    const {state : {authUser, notifications, user_info, site_settings}, dispatch} = AuthState();
    const [state,setState] = useState({
		cities:[],
		housing_areas: [],
        countries:undefined,
        isSubmitting:false,
        isSubmitting:false
    });
    const [checked, setChecked] = useState({
		checkedPhone:false
	});
    const handlePhoneCheckbox = () => setChecked({...checked, checkedPhone:!checked.checkedPhone});
    const {register, watch, handleSubmit, formState , formState: {errors}, setValue, getValues, reset, control                    
    } = useForm();


    const handleChangeWhatsapp = (value, country, e, formattedValue) =>{
        setValue('whatsapp_number', value)
        setValue('whatsapp_code', country.dialCode)
    }

    const handleChangePhone = (value, country, e, formattedValue) =>{
        setValue('phone_number', value)
        setValue('phone_code', country.dialCode)
    }

	const { isSubmitting } = formState;
	const { t } = useTranslation();
    const onSubmit = async(data, e) => {
        setState(prevState => ({
			...prevState,
			isSubmitting: true
		  }));
		var form = new FormData()
        form.append('checkedPhone',checked.checkedPhone)
		form.append('full_name',data.full_name)
		form.append('whatsapp_number',data.whatsapp_number)
		form.append('phone_number',data.phone_number)
        form.append('city',data.city)
        form.append('email',data.email)
        form.append('property_type',data.property_type)
        form.append('housing_area',data.housing_area)
        form.append('country',data.country)
        form.append('description',data.description)
        form.append('whatsapp_code',state.whatsapp_code)
		form.append('phone_code',state.phone_code)

		Makaan.post(`rental-property-store`,form)
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
                setChecked({...checked, checkedPhone:false})
        	}else{
                toast.error(response.data.message[0], {
                        position: toast.POSITION.TOP_RIGHT,
                });
        	}
        })
        .catch(error => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
        	toast.error(error.message, {
			     position: toast.POSITION.TOP_RIGHT,
			});
        });
	};

    const whatsappref = useRef(null);
    const [copyText, setCopyText] = React.useState({
        whatsapp:'Copy'
    });
    const copyToClipboard = (type) => {
        whatsappref.current.select();
        setCopyText({...copyText,whatsapp:'Copied'});
        document.execCommand('copy');
    };
    useEffect(() => {
        setValue('whatsapp_code', "pk")
        setValue('phone_code', "pk")
        let endpoints = [
            `fetch-countries`,
			`cities-list`,
			`fetch-parent-locations`,
		];
		axios.all(endpoints.map((endpoint,i) => {
			return Makaan.get(endpoint);
		})).then(
			(res) => {
				setState({...state, countries: res[0].data.data, cities: res[1].data.data, housing_areas: res[2].data.data})
			}
		).then((res)=>{
            setValue('city', "245")
		});
    },[]);

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
                                            <Card.Title>{t('Rental.rental_property_management')}</Card.Title>
                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('Rental.full_name')} <span className="color">*</span></Form.Label>
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
                                                    <Form.Label>{ t('Rental.email')} <span className="color">*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="example@info.com" 
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
                                                    <Form.Label> {t('Rental.whatsapp_no')} <span className="color">*</span></Form.Label>
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
                                                    <div className="form-check mt-3">
                                                        <input type="checkbox" id="checkNumber" name="check_number" className="form-check-input" {...register('check_number', { required: false })}></input>
                                                        <label htmlFor="checkNumber" onClick={handlePhoneCheckbox}>
                                                            <div className="checkbox" ></div>
                                                            <span>{t('Rental.phone_number_is_different_from_whatsapp')}</span>
                                                        </label>
                                                    </div>
                                                </Form.Group>
                                                {
													checked.checkedPhone ?
                                                    (
														<Form.Group className="form-group">
															<Form.Label>{t('Rental.phone_no')} {checked.checkedPhone && <span className="color">*</span>}</Form.Label>
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
													) :
													<Col xl={6}></Col>
                                                }
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('Rental.Country')}</Form.Label>
                                                    {
                                                        state.countries !== undefined && (
                                                        <Form.Select name="country" {...register('country',{required:false})}>
                                                            <option value="">Select Country</option>
                                                            {
                                                                state.countries.length > 0 && 
                                                                (
                                                                    state.countries.map((country, i)=>{  
                                                                        return(
                                                                                <option  key={'country'+i} selected={country.code === 'PK'} value={country.code}>{country.name}</option> 
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </Form.Select>
                                                        )
                                                    }
                                                </Form.Group>
												{
													(watch('country') === 'PK' && state.cities.length > 0) &&   (
                                                        <Form.Group className="form-group">
                                                            <Form.Label>{t('Rental.City')}</Form.Label>
                                                            <Form.Select name="city" {...register('city',{required:false})}>
                                                                <option value="">Select City</option>
                                                                {
                                                                    state.cities.length > 0 && 
                                                                    (
                                                                        state.cities.map((city, i)=>{  
                                                                            return(
                                                                                    <option  key={'city'+i} value={city.id}>{city.name}</option> 
                                                                            )
                                                                        })
                                                                    )
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
													)
												}
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('Rental.property_type')}</Form.Label>
                                                    <Form.Select name="property_type" {...register('property_type',{
                                                    
                                                    required: false && t('Common.This field is required')})}>
                                                        <option value="">Select Property Type</option>
                                                        <option value="Residential">Residential</option>
                                                        <option value="Commercial">Commercial</option>
                                                    </Form.Select>
                                                    {errors.property_type && (
                                                        <Form.Text className="text-danger">
                                                            {errors.property_type.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('Rental.housing_area')}</Form.Label>
                                                    <Form.Select name="housing_area" {...register('housing_area',{required:false})}>
                                                        <option value="">Select Housing Area</option>
                                                        {
                                                            state.housing_areas.length > 0 && 
                                                            (
                                                                state.housing_areas.map((housing_area, i)=>{  
                                                                    return(
                                                                            <option  key={'housing_area'+i} value={housing_area.slug}>{housing_area.name}</option> 
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('Rental.description')}</Form.Label>
                                                    <Form.Control  as="textarea" rows={3} placeholder="Type Here..." 
                                                    {...register("description", {
                                                        required: false && t('Common.This field is required')
                                                      })}/>
                                                    {errors.description && (
                                                        <Form.Text className="text-danger">
                                                            {errors.description.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Row className="justify-content-center">
                                                        <Col xs="auto">
                                                            <Button variant="primary" type="submit" disabled={state.isSubmitting}>
                                                                
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                                {t('Rental.Send')}
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
                                            <p className="label">{t('Rental.customer_service_hours')}</p>
                                            <h3>9.30am – 6pm (PKT)</h3>
                                            <p className="note"></p>
                                        </Card.Body>
                                    </Card>
                                    <Card className="action-card">
                                        <Card.Body>
                                            <p className="label">{t('Rental.join_whatsApp_group_to_ask_question')}</p>
                                            <a target="_blank" href={(site_settings ? (site_settings.rental_page_group_whatsapp ? site_settings.rental_page_group_whatsapp: '') : '')} className="btn btn-whatsapp">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M30 14.615C30 22.6813 23.4087 29.2312 15.2763 29.2312C12.6975 29.2312 10.2688 28.5663 8.15875 27.4137L0 30L2.66249 22.155C1.31747 19.955 0.543766 17.3738 0.543766 14.6163C0.543766 6.54628 7.13747 0 15.2762 0C23.4087 0 30 6.54628 30 14.615ZM15.2762 2.32752C8.44999 2.32752 2.88999 7.83627 2.88999 14.6163C2.88999 17.3087 3.76747 19.7988 5.2475 21.8237L3.70498 26.375L8.46373 24.8713C10.4163 26.1562 12.7587 26.8975 15.2762 26.8975C22.0975 26.8975 27.6562 21.3863 27.6562 14.6063C27.6562 7.83753 22.0975 2.32752 15.2762 2.32752ZM22.7075 17.9825C22.62 17.8362 22.38 17.7475 22.0238 17.555C21.6525 17.3762 19.885 16.52 19.545 16.4025C19.2213 16.2824 18.9813 16.2237 18.7413 16.5799C18.49 16.9337 17.8063 17.7487 17.5975 17.9824C17.375 18.2199 17.1675 18.25 16.81 18.0725C16.4575 17.8962 15.2875 17.5162 13.9112 16.2912C12.8412 15.3475 12.1125 14.1762 11.9038 13.8125C11.6887 13.4512 11.8788 13.2587 12.0588 13.0825C12.2276 12.92 12.4213 12.66 12.6 12.4525C12.7863 12.2463 12.845 12.0988 12.9638 11.8613C13.0838 11.6163 13.0225 11.4101 12.9338 11.225C12.845 11.0463 12.1176 9.28757 11.8201 8.56882C11.5163 7.85258 11.2213 7.97135 11.0125 7.97135C10.795 7.97135 10.5601 7.94136 10.3151 7.94136C10.0776 7.94136 9.68509 8.02888 9.35006 8.39258C9.02381 8.74757 8.08754 9.61382 8.08754 11.3788C8.08754 13.1388 9.38005 14.8488 9.56507 15.0838C9.74507 15.3213 12.0588 19.0488 15.7326 20.4838C19.4014 21.9188 19.4014 21.445 20.0688 21.3851C20.7201 21.3251 22.2063 20.5151 22.5038 19.6851C22.7962 18.8412 22.7962 18.1313 22.7075 17.9825Z" fill="currentColor"/>
                                                </svg>
                                                WhatsApp
                                            </a>
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

export default RentalPropertyManagement;