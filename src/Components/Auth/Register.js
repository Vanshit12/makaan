import React, { useEffect, useState} from 'react';
import axios from "axios";
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import Loader from '../Common/Loader';
import { Container, Form, Button, Card, Row, Col, InputGroup} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Register = (props) => {
  	const {register, getValues, handleSubmit, setValue, formState: {errors}, watch                      
    } = useForm();
	const location = useLocation();
	const {state : {authUser}, dispatch} = AuthState();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const watchIsAgency = watch("is_agency", false);
	const [state,setState] = useState({
		isToggleOn: true,
		cities:[],
		countries:undefined,
		isSubmitting:false
    });
	const [checked, setChecked] = useState({
		checkedPhone:false,
		checkedCompanyPhone:false,
		checkedCompanyEmail:false
	});
	const handlePhoneCheckbox = () => setChecked({...checked, checkedPhone:!checked.checkedPhone});
	const handleCompanyPhoneCheckbox = () => setChecked({...checked, checkedCompanyPhone:!checked.checkedCompanyPhone});
	const handleCompanyEmailCheckbox = () => setChecked({...checked, checkedCompanyEmail:!checked.checkedCompanyEmail});

    const handleChangeWhatsapp = (value, country, e, formattedValue) =>{
        setValue('whatsapp_number', value)
        setValue('whatsapp_code', country.dialCode)
    }
    const handleChangePhone = (value, country, e, formattedValue) =>{
        setValue('phone_number', value)
        setValue('phone_code', country.dialCode)
    }

	const onSubmit = async(data, e) => {
		setState(prevState => ({
			...prevState,
			isSubmitting: true
		}));
		var form = new FormData()
		form.append('company_logo',data.company_logo ? data.company_logo[0] : [])
		form.append('checkedPhone',checked.checkedPhone)
		form.append('checkedCompanyPhone',checked.checkedCompanyPhone)
		form.append('checkedCompanyEmail',checked.checkedCompanyEmail)
		form.append('city',data.city)
		form.append('country',data.country)
		form.append('email',data.email)
		form.append('first_name',data.first_name)
		form.append('is_agency',data.is_agency === true ? '1' : '0')
		form.append('last_name',data.last_name)
		form.append('password',data.password)
		form.append('password_confirmation',data.password_confirmation)
		form.append('phone_number',data.phone_number)
		form.append('policy',data.policy)
		form.append('agency_locations',data.agency_locations)
		form.append('agency_name',data.agency_name)
		form.append('company_email',data.company_email)
		// form.append('company_fax',data.company_fax)
		form.append('company_phone',data.company_phone)
		form.append('service_description',data.service_description)
		form.append('whatsapp_number',data.whatsapp_number)
		form.append('cnic_id',data.cnic_id)
		form.append('whatsapp_code',data.whatsapp_code)
		form.append('phone_code',data.phone_code)
		Makaan.post(`users/register`,form)
        .then(response => {
			setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
        	if(!response.data.error){
        		toast.success("Registered Successfully !. An email verification link has been sent to your email address.", {
			     	position: toast.POSITION.TOP_RIGHT,
			    });
				e.target.reset();
				if(location.state && location.state.from){
					navigate(location.state.from,{
						state: {
						  from:location.pathname
						}
					});
				}else{
					navigate('/login');
				}
        	}else{
        		toast.error(response.data.message[Object.keys(response.data.message)[0]][0], {
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

	useEffect(() => {
		window.scrollTo(0, 0);
		if(authUser){
            navigate(-1);
        }
		setValue('whatsapp_code', "pk")
		setValue('phone_code', "pk")
		let endpoints = [
			`cities-list`,
			`fetch-countries`
		];
		axios.all(endpoints.map((endpoint,i) => {
			return Makaan.get(endpoint);
		})).then(
			(res) => {
				setState({...state, cities: res[0].data.data, countries: res[1].data.data})
			}
		).then((res)=>{
            setValue('city', "245")
		});
	},[]);

    	return (
    			<div className="register">
	                <section className="inner-gap bg register-form">
	                    <Container>
	                        <div className="register-form-wrap">
	                            <Card>
	                                <Card.Body>
	                                    <Card.Title>{t('Register.Register')}</Card.Title>
	                                    <Form onSubmit={handleSubmit(onSubmit)}>
	                                        <Row>
	                                            <Col xl={12}>
		                                            <Form.Group className="form-group">
			        									<Form.Label>{t('Register.Email')} <span className="color">*</span></Form.Label>
	                                                    <Form.Control type="email" placeholder="example@info.com" 
	                                                    {...register("email", {
												              	required: true && t('Common.This field is required'),
														        maxLength:{value:55,message:t('Common.Too Many Characters')},
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
	                                                    
	                                            </Col>
	                                            <Col xl={6}>
	                                                <Form.Group className="form-group">
	                                                    <Form.Label>{t('Register.Password')} <span className="color">*</span></Form.Label>
	                                                    <Form.Control type="password" placeholder="********" name="password" 
	                                                    {...register("password", {
												              required: t('Common.This field is required')
												            })}/>
	                                                    {errors.password && (
													       <Form.Text className="text-danger">
													          {errors.password.message}
													        </Form.Text>
													      )}
	                                                </Form.Group>
	                                            </Col>
	                                            <Col xl={6}>
	                                                <Form.Group className="form-group">
	                                                    <Form.Label>{t('Register.Confirm Passwords')} <span className="color">*</span></Form.Label>
	                                                    <Form.Control type="password" placeholder="********" name="password_confirmation" 
	                                                    {...register("password_confirmation", {
												          validate: (value) => value === watch('password') || t('Register.The passwords do not match')
												        })}/>
	                                                    {errors.password_confirmation && (
													       <Form.Text className="text-danger">
													          {errors.password_confirmation.message}
													        </Form.Text>
													      )}
	                                                </Form.Group>
	                                            </Col>
	                                            <Col xl={6}>
	                                                <Form.Group className="form-group">
	                                                    <Form.Label>{t('Register.First Name')} <span className="color">*</span></Form.Label>
	                                                    <Form.Control type="text" name="first_name"
	                                                    {...register("first_name", {
												              	required: true && t('Common.This field is required'),
														        maxLength:{value:30,message:t('Common.Too Many Characters')}
												            })}/>
	                                                    {errors.first_name && (
													       <Form.Text className="text-danger">
													          {errors.first_name.message}
													        </Form.Text>
													      )}
	                                                </Form.Group>
	                                            </Col>
	                                            <Col xl={6}>
	                                                <Form.Group className="form-group">
	                                                    <Form.Label>{t('Register.Last Name')} </Form.Label>
	                                                    <Form.Control type="text" name="last_name" {...register('last_name', { 
														    required: t('Common.This field is required'),
															maxLength:{value:30,message:t('Common.Too Many Characters')}
	                                                     })} />
	                                                    {errors.last_name && (
													       <Form.Text className="text-danger">
													          {errors.last_name.message}
													        </Form.Text>
													      )}
	                                                </Form.Group>
	                                            </Col>
												<Col xl={6}>
													<Form.Group className="form-group">
														<Form.Label>{t('Register.Whatsapp Number')} <span className="color">*</span></Form.Label>
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
														<div className="form-check">
															<input type="checkbox" id="checkNumber" name="check_number" className="form-check-input" {...register('check_number', { required: false })}></input>
															<label htmlFor="checkNumber" onClick={handlePhoneCheckbox}>
																<div className="checkbox" ></div>
																<span>Phone Number is different from whatsapp?</span>
															</label>
														</div>
													</Form.Group>
												</Col>
												{
													checked.checkedPhone ?
													(<Col xl={6}>
														<Form.Group className="form-group">
															<Form.Label>{t('Register.Phone Number')} {checked.checkedPhone && <span className="color">*</span>}</Form.Label>
															
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
													</Col>) :
													<Col xl={6}></Col>
												}
												<Col xl={6}>
													
												</Col>
												<Col xl={6}></Col>
												<Col xl={6}>
	                                                <Form.Group className="form-group">
	                                                    <Form.Label>{t('Register.Country')}</Form.Label>
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
	                                            </Col>
												{
													(watch('country') === 'PK') && (
														<Col xl={6}>
															<Form.Group className="form-group">
																<Form.Label>{t('Register.City')}</Form.Label>
																<Form.Select name="city" {...register('city',{required:false})}>
																	<option>Select City</option>
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
														</Col>
													)
												}
	                                            {/* <Col xl={12}>
	                                                <Form.Group className="form-group pt-0 mb-3">
	                                                    <div className="form-check">
	                                                        <input type="checkbox" id="is_agency" name="is_agency"  className="form-check-input" {...register('is_agency',{required:false})}></input>
	                                                        <label htmlFor="is_agency">
	                                                            <div className="checkbox"></div>
	                                                            <span>{t('Register.Are You an agent?')}</span>
	                                                        </label>
	                                                    </div>
	                                                </Form.Group>
	                                            </Col> */}
	                                            <Col xl={12}>
	                                                {watchIsAgency && <div className="agency-form">
	                                                    <Row>
	                                                         <Col xl={6}>
	                                                             <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Locations')} <span className="color">*</span></Form.Label>
	                                                                <Form.Select name="agency_locations" {...register('agency_locations', {
																		maxLength:{value:50,message:t('Common.Too Many Characters')}
														            })} multiple>
																	{
																		state.cities.length > 0 && 
																		(
																			state.cities.map((city, i)=>{  
																				return(
																						<option  key={'location'+i} value={city.slug}>{city.name}</option> 
																				)
																			})
																		)
																	}
	                                                                </Form.Select>
	                                                            </Form.Group>
	                                                        </Col>
															<Col xl={6}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Address')}  <span className="color">*</span></Form.Label>
	                                                                <Form.Control type="text" placeholder="" name="address" 
	                                                                {...register("address", {
																		required: watchIsAgency && t('Common.This field is required'),
														              	maxLength:{value:50,message:t('Common.Too Many Characters')}
														            })}/>
	                                                                {errors.address && (
																       <Form.Text className="text-danger">
																          {errors.address.message}
																        </Form.Text>
																      )}
	                                                            </Form.Group>
	                                                        </Col>
	                                                        <Col xl={6}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Agency Name')} <span className="color">*</span></Form.Label>
	                                                                <Form.Control type="text" placeholder="" name="agency_name" 
	                                                                {...register("agency_name", {
														              required: watchIsAgency && t('Common.This field is required'),
														              maxLength:{value:30,message:t('Common.Too Many Characters')}
														            })}/>
	                                                                {errors.agency_name && (
																        <Form.Text className="text-danger">
																          {errors.agency_name.message}
																        </Form.Text>
																    )}
	                                                            </Form.Group>
	                                                        </Col>
															<Col xl={6}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.cnic_id')} <span className="color">*</span></Form.Label>
	                                                                <Form.Control type="text" placeholder="" name="cnic_id" 
	                                                                {...register("cnic_id", {
														             	required: watchIsAgency && t('Common.This field is required'),
														              	maxLength:{value:15,message:t('Common.Too Many Characters')}
														            })}/>
	                                                                {errors.cnic_id && (
																       <Form.Text className="text-danger">
																          {errors.cnic_id.message}
																        </Form.Text>
																      )}
	                                                            </Form.Group>
	                                                        </Col>
	                                                        <Col xl={12}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Service Description')}</Form.Label>
	                                                                <Form.Control as="textarea" placeholder="" name="service_description"  
	                                                                {...register("service_description", {
														              required: false,
														            })}/>
	                                                                {errors.service_description && (
																       <Form.Text className="text-danger">
																          {errors.service_description.message}
																        </Form.Text>
																      )}
	                                                            </Form.Group>
	                                                        </Col>
															<Col xl={6}>
	                                                            <Form.Group className="form-group">
																	<div className="form-check">
																		<input type="checkbox" id="check_company_number" name="check_company_number" className="form-check-input" {...register('check_company_number', { required: false })}></input>
																		<label htmlFor="check_company_number" onClick={handleCompanyPhoneCheckbox}>
																			<div className="checkbox" ></div>
																			<span>Company Phone is different from above phone number?</span>
																		</label>
																	</div>
																</Form.Group>
	                                                        </Col>
															{
																checked.checkedCompanyPhone ? (
																	<Col xl={6}>
																		<Form.Group className="form-group">
																			<Form.Label>{t('Register.Company Phone')} <span className="color">*</span></Form.Label>
																			<Form.Control type="tel" placeholder="" name="company_phone" 
																			{...register("company_phone", {
																				required: (checked.checkedCompanyPhone && watchIsAgency) && t('Common.This field is required'),
																				maxLength:{value:13,message:t('Common.Too Many Characters')}
																			})}/>
																			{errors.company_phone && (
																			<Form.Text className="text-danger">
																				{errors.company_phone.message}
																				</Form.Text>
																			)}
																		</Form.Group>
																	</Col>
																) : <Col xl={6}></Col>

															}

															<Col xl={6}>
	                                                            <Form.Group className="form-group">
																	<div className="form-check">
																		<input type="checkbox" id="check_company_email" name="check_company_email" className="form-check-input" {...register('check_company_email', { required: false })}></input>
																		<label htmlFor="check_company_email" onClick={handleCompanyEmailCheckbox}>
																			<div className="checkbox" ></div>
																			<span>Company Email is different from above email?</span>
																		</label>
																	</div>
																</Form.Group>
	                                                        </Col>
	                                                        {
																checked.checkedCompanyEmail ? 
																(
																	<Col xl={6}>
																		<Form.Group className="form-group">
																			<Form.Label>{t('Register.Company Email')} <span className="color">*</span></Form.Label>
																			<Form.Control type="email" placeholder="" name="company_email" 
																			{...register("company_email", {
																			required: (checked.checkedCompanyEmail && watchIsAgency) && t('Common.This field is required'),
																			maxLength:{value:50,message:t('Common.Too Many Characters')},
																			pattern: {
																				value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
																				message: t('Common.Invalid email address')
																			}
																			})}/>
																			{errors.company_email && (
																			<Form.Text className="text-danger">
																				{errors.company_email.message}
																				</Form.Text>
																			)}
																		</Form.Group>
																	</Col>
																) : <Col xl={6}></Col>
															}
	                                                        {/* <Col xl={6}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Company Fax')}</Form.Label>
	                                                                <Form.Control type="text" placeholder="" name="company_fax" 
	                                                                {...register("company_fax", {
														              maxLength:{value:50,message:t('Common.Too Many Characters')}
														            })}/>
	                                                                {errors.company_fax && (
																       <Form.Text className="text-danger">
																          {errors.company_fax.message}
																        </Form.Text>
																      )}
	                                                            </Form.Group>
	                                                        </Col> */}
	                                                        <Col xl={6}>
	                                                            <Form.Group className="form-group">
	                                                                <Form.Label>{t('Register.Upload Company Logo')}</Form.Label>
	                                                                <Form.Control type="file" placeholder="" name="company_logo" 
	                                                                {...register("company_logo", {
														              required: false,
														              validate: {
															              lessThan5MB: files => (files[0]? files[0].size : 0) < 5242880 || 'Max 5MB',
															              acceptedFormats: files =>
															                ['image/jpeg', 'image/png', 'image/jpg'].includes(
															                  (files[0] ? files[0].type : 'image/png')
															                ) || 'Only PNG, JPEG JPG',
															            },
														            })}/>
	                                                                {errors.company_logo && (
																       <Form.Text className="text-danger">
																          {errors.company_logo.message}
																        </Form.Text>
																      )}
	                                                            </Form.Group>
	                                                        </Col>
	                                                    </Row>
	                                                   
	                                                </div>}
	                                            </Col>
	                                            <Col xl={12}>
	                                                <Form.Group className="form-group pt-0">
	                                                    <div className="form-check">
	                                                        <input type="checkbox" id="policy" name="policy" className="form-check-input"
	                                                        {...register("policy", {
												              required: t('Common.This field is required'),
												            })}></input>
	                                                        <label htmlFor="policy">
	                                                            <div className="checkbox"></div>
	                                                            <span>{t('Register.I have read and I agree to the')} MakaanGuide.com <Link target="_blank" to="/terms-conditions">{t('Register.Terms and Conditions')}</Link></span>
	                                                        </label>
	                                                    </div>
	                                                    {errors.policy && (
												       <Form.Text className="text-danger">
												          {errors.policy.message}
												        </Form.Text>
												      )}
                                    				</Form.Group>
	                                            </Col>

	                                        </Row>
	                                        <div className="btn_wrap" >
	                                            <Button type="submit" className="w-100" disabled={state.isSubmitting}>
	                                                {t('Register.Register')}
	                                            	{state.isSubmitting && <Loader type="Button"></Loader>}
	                                            </Button>
	                                        </div>
											<div className="login-form-link">
                                            <p>{t("Login.Already have an account?")} <Link to="/login" state={{ from: location.state && location.state.from }}><span>{t('Login.Login')}</span></Link>
                                            </p>
                                        </div>
	                                    </Form>
	                                </Card.Body>
	                            </Card>
	                        </div>
	                    </Container>
	                </section>
	                {/* <AppSection></AppSection> */}
	                <WhatsAppSection></WhatsAppSection>
	            </div>
	    	);
}

export default Register;