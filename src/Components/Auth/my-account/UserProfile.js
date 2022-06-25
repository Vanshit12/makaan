
import React, {useState, useEffect} from 'react';
import { Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {AuthState} from '../../../Context/Context';
import { useTranslation } from 'react-i18next';
import {Makaan} from '../../../request';
import axios from "axios";
import { toast } from 'react-toastify';
import Loader from '../../Common/Loader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const UserProfile = (props) => {
	const {register, watch, handleSubmit, formState , formState: {errors}, setValue, getValues                    
    } = useForm();
	const { isSubmitting } = formState;
	const { t } = useTranslation();
	const [state,setState] = useState({
		cities:[],
		countries: undefined,
		isSubmitting:false
    });
	const [image,setImage] = useState({
		file:'',
		logo:''
    });
	const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
	const [checked, setChecked] = useState(false);
	const handleCheckbox = () => setChecked(!checked);
   
    const handleChangeWhatsapp = (value, country, e, formattedValue) =>{
        setValue('whatsapp_number', value)
        setValue('whatsapp_code', country.dialCode)
    }
    
    const handleChangePhone = (value, country, e, formattedValue) =>{
        setValue('phone_number', value)
        setValue('phone_code', country.dialCode)
    }

	const onSubmit = async(data) => {
		
		setState(prevState => ({
			...prevState,
			isSubmitting: true
		}));
		var form = new FormData()
		form.append('company_logo',data.company_logo ? data.company_logo[0] : [])
		form.append('profile_picture',data.profile_picture ? data.profile_picture[0] : [])
		form.append('email',data.email)
		form.append('first_name',data.first_name)
		form.append('last_name',data.last_name)
		form.append('house_number',data.house_number)
		form.append('phone_number',data.phone_number)
		form.append('whatsapp_number',data.whatsapp_number)
		form.append('street',data.street)
		form.append('city',data.city)
		form.append('state',data.state)
		form.append('country',data.country)
		form.append('postcode',data.postcode)
		form.append('agency_locations',data.agency_locations)
		form.append('agency_name',data.agency_name)
		form.append('company_address',data.company_address)
		form.append('company_fax',data.company_fax)
		form.append('company_phone',data.company_phone)
		form.append('service_description',data.service_description)
		form.append('company_email',data.company_email)
		form.append('check_number',data.check_number)
		form.append('whatsapp_code',data.whatsapp_code)
		form.append('phone_code',data.phone_code)

		Makaan.post(`edit-user`,form)
        .then(response => {
			setState(prevState => ({
				...prevState,
				isSubmitting: false
			}));
        	if(!response.data.error){
				dispatch({type:'USER_INFO_FETCH',payload:response.data.data})
        		toast.success("Profile Updated Successfully !", {
			     	position: toast.POSITION.TOP_RIGHT,
			    });
        	}else{
        		toast.error(response.data.msg, {
			     	position: toast.POSITION.TOP_RIGHT,
			    });
        	}
        })
        .catch(error => {
        	toast.error(error.message, {
			     position: toast.POSITION.TOP_RIGHT,
			});
        });
	};
	const uploadSingleFile = (type, e) => {
        if((e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg') && (e.target.files[0].size <= 5242880) && (e.target.files[0].size >= 1024*3)) {
            if(type == 'profile'){
				setImage({...image, file:URL.createObjectURL(e.target.files[0])});

			}else if(type == 'logo'){
				setImage({...image, logo:URL.createObjectURL(e.target.files[0])});
			}
        }else{
            toast.error('Accepted images are jpg, jpeg, png and must be smaller than 5 MB', {
				position: toast.POSITION.TOP_RIGHT,
			});
        }
    }
	useEffect(() => {
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
			setImage({...image, file:user_info.user_picture, logo:user_info.agency_logo});
			setValue("email", (user_info.email && user_info.email != "null") ? user_info.email : '')
	        setValue("first_name", (user_info.first_name && user_info.first_name != "null") ? user_info.first_name : '')
	        setValue("last_name", (user_info.last_name && user_info.last_name != "null") ? user_info.last_name : '')
			setValue("phone_number", (user_info.phone_number && user_info.phone_number != "null") ? user_info.phone_number : '')
			setValue("whatsapp_number", (user_info.whatsapp_number && user_info.whatsapp_number != "null") ? user_info.whatsapp_number : '')
			setValue("phone_code", (user_info.phone_code && user_info.phone_code != "null") ? user_info.phone_code : '')
			setValue("whatsapp_code", (user_info.whatsapp_code && user_info.whatsapp_code != "null") ? user_info.whatsapp_code : '')
			setValue("city", user_info.city)
			setValue("country", user_info.country)
			setChecked(!(user_info.whatsapp_number && user_info.whatsapp_number != "null" && user_info.phone_number && user_info.phone_number != "null" &&  user_info.whatsapp_number === user_info.phone_number &&  (user_info.whatsapp_code && user_info.whatsapp_code != "null" && user_info.phone_code && user_info.phone_code != "null" &&  user_info.whatsapp_code === user_info.phone_code)))
			if(user_info.is_agency == '1'){
				setValue("agency_locations", user_info.agency_info.agency_locations)
				setValue("agency_name", user_info.agency_info.agency_name)
				setValue("company_address", user_info.agency_info.company_address)
				setValue("company_fax",(user_info.agency_info.company_fax && user_info.agency_info.company_fax != "null") ? user_info.agency_info.company_fax : '')
				setValue("company_phone", user_info.agency_info.company_phone)
				setValue("service_description", user_info.agency_info.service_description)
				setValue("company_email", user_info.agency_info.company_email)
			}
		});
    },[user_info]);
    return (
		<div className="user-profile-page">
			<Row>
				<Col xl={7}>
					<div class="myaccount-head">
						<Row className="align-items-center">
							<Col xl lg md sm={12}>
								<div class="myacconut_wrap_toggle">
									<h2>My Profile</h2>
								</div>
							</Col>
							
						</Row>
					</div>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Row>
							<Col xl={12}>
								<Form.Group className="profile-photo">
									<Form.Control type="file" id="profile-photo"
									{...register("profile_picture", {
										required: false,
										
									})}
									onChange={(e)=>{uploadSingleFile('profile', e)}}/>
									
									<label for="profile-photo" class="photo_box">
										<div class="img-wrap">
											<img src={`${image.file!='' ? (image.file == null ? '../../../assets/images/dummy-profile-image.png' : image.file) : '../../../assets/images/dummy-profile-image.png'}`} alt=""></img>
										</div>
										<div class="cam-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
										</div>
									</label>
								</Form.Group>
							</Col>
							<Col xl={12}>
								<Form.Group className="form-group">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder='example@info.com'
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
									<Form.Label>First Name</Form.Label>
									<Form.Control type="text" placeholder='First Name'
									{...register("first_name", {
										required: true && t('Common.This field is required'),
										maxLength:{value:30,message:t('Common.Too Many Characters')}
									})}/>
									{errors.first_name && (
										<Form.Text className="text-danger">
											{errors.first_name.message}
										</Form.Text>
									)}
									<Form.Text className="text-danger"></Form.Text>
								</Form.Group>
							</Col>
							<Col xl={6}>
								<Form.Group className="form-group">
									<Form.Label>Last Name</Form.Label>
									<Form.Control type="text" placeholder='Email Address'
									{...register('last_name', {
										required:false,
										maxLength:{value:30,message:t('Common.Too Many Characters')}
									})}/>
									{errors.last_name && (
										<Form.Text className="text-danger">
											{errors.last_name.message}
										</Form.Text>
										)}
									<Form.Text className="text-danger"></Form.Text>
								</Form.Group>
							</Col>
							<Col xl={6}>
								<Form.Group className="form-group">
									<Form.Label>WhatsApp Number</Form.Label>
									<InputGroup className="phone-control mb-3">
										<PhoneInput
											placeholder="00000-00000"
											enableSearch={true}
											country={getValues('whatsapp_code')}
											autoFormat={false}
											name="whatsapp_number"
											onChange={handleChangeWhatsapp}
											value={getValues('whatsapp_code')+getValues('whatsapp_number')}
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
									<Form.Text className="text-danger"></Form.Text>
								</Form.Group>
							</Col>
							{
								checked ?
								(<Col xl={6}>
									<Form.Group className="form-group">
										<Form.Label>Phone Number</Form.Label>
										<InputGroup className="phone-control mb-3">
										<PhoneInput
											placeholder="00000-00000"
											enableSearch={true}
											required={true}
											country={getValues('phone_code')}
											autoFormat={false}
											name="phone_number"
											onChange={handleChangePhone}
											value={watch('phone_number')}
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
										<Form.Text className="text-danger"></Form.Text>
									</Form.Group>
								</Col>) :
								<Col xl={6}></Col>
							}
							<Col xl={6}>
								<Form.Group className="form-group" controlId="formWhatsappPhone">
									<div className="form-check">
										<input type="checkbox" id="checkNumber" checked={checked} name="check_number" className="form-check-input" {...register('check_number', { required: false })}></input>
										<label htmlFor="checkNumber" onClick={handleCheckbox}>
											<div className="checkbox" ></div>
											<span>Phone Number is different from whatsapp?</span>
										</label>
									</div>
								</Form.Group>
							</Col>
							<Col xl={12}>
								<div class="form-title">
									<h4>Address</h4>
								</div>
							</Col>
							
							<Col xl={6}>
								<Form.Group className="form-group">
									<Form.Label>Country</Form.Label>
									<Form.Select type="text" placeholder='Country'
									{...register('country',{required:false})}>
										{
											state.countries !== undefined && (
												state.countries.length > 0 && 
												(
													state.countries.map((country, i)=>{  
														return(
																<option  key={'country'+i} value={country.code}>{country.name}</option> 
														)
													})
												)

											)
										}
									</Form.Select>
								</Form.Group>
							</Col>
							{
								(watch('country') === 'PK') && (
									<Col xl={6}>
										<Form.Group className="form-group">
											<Form.Label>City</Form.Label>
											<Form.Select name="city" 
											{...register('city',
											{
												maxLength:{value:30,message:t('Common.Too Many Characters')}
											})}>
												<option value="">Select City</option>
												{ 
													state.cities.map((city, i)=>{  
														return(
																<option  key={'city'+i} value={city.id}>{city.name}</option> 
														)
													})
												}
											</Form.Select>
											{errors.city && (
												<Form.Text className="text-danger">
													{errors.city.message}
												</Form.Text>
											)}
										</Form.Group>
									</Col>
								)
							}
							{
								user_info.is_agency == '1' && (
									<>
										<Col xl={12}>
											<div class="form-title">
												<h4>Agent Details</h4>
											</div>
										</Col>
										<Col xl={6}>
											<Form.Group className="form-group">
												<Form.Label>{t('Register.Locations')} <span>*</span></Form.Label>
												<Form.Select name="agency_locations" {...register('agency_locations', {
													maxLength:{value:50,message:t('Common.Too Many Characters')}
												})}>
													<option>Location 1</option>
													<option>Location 2</option>
													<option>Location 3</option>
													<option>Location 4</option>
													<option>Location 5</option>
												</Form.Select>
												
											</Form.Group>
										</Col>
										<Col xl={6}>
											<Form.Group className="form-group">
												<Form.Label>{t('Register.Agency Name')} <span>*</span></Form.Label>
												<Form.Control type="text" placeholder="" name="agency_name" 
												{...register("agency_name", {
													required: user_info.is_agency == '1' && t('Common.This field is required'),
													maxLength:{value:30,message:t('Common.Too Many Characters')}
												})}/>
												{errors.agency_name && (
													<Form.Text className="text-danger">
														{errors.agency_name.message}
													</Form.Text>
												)}
											</Form.Group>
										</Col>
										<Col xl={12}>
											<Form.Group className="form-group">
												<Form.Label>{t('Register.Service Description')} <span>*</span></Form.Label>
												<Form.Control as="textarea" placeholder="" name="service_description"  
												{...register("service_description", {
													required: user_info.is_agency == '1' && t('Common.This field is required'),
													maxLength:{value:50,message:t('Common.Too Many Characters')}
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
												<Form.Label>{t('Register.Company Phone')} <span>*</span></Form.Label>
												<Form.Control type="tel" placeholder="" name="company_phone" 
												{...register("company_phone", {
													required: user_info.is_agency == '1' && t('Common.This field is required'),
													maxLength:{value:50,message:t('Common.Too Many Characters')}
												})}/>
												{errors.company_phone && (
													<Form.Text className="text-danger">
														{errors.company_phone.message}
													</Form.Text>
													)}
											</Form.Group>
										</Col>
										<Col xl={6}>
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
										</Col>
										<Col xl={6}>
											<Form.Group className="form-group">
												<Form.Label>{t('Register.Company Address')} <span>*</span></Form.Label>
												<Form.Control type="text" placeholder="" name="company_address" 
												{...register("company_address", {
													required: user_info.is_agency == '1' && t('Common.This field is required'),
													maxLength:{value:50,message:t('Common.Too Many Characters')}
												})}/>
												{errors.company_address && (
													<Form.Text className="text-danger">
														{errors.company_address.message}
													</Form.Text>
													)}
											</Form.Group>
										</Col>
										<Col xl={6}>
											<Form.Group className="form-group">
												<Form.Label>{t('Register.Company Email')} <span>*</span></Form.Label>
												<Form.Control type="email" placeholder="" name="company_email" 
												{...register("company_email", {
													required: user_info.is_agency == '1' && t('Common.This field is required'),
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
										<Col xl={12}>
											<Form.Group className="profile-photo">
												<Form.Label>{t('Register.Upload Company Logo')}</Form.Label>
												<Form.Control type="file" id="logo-photo"
												{...register("company_logo", {
													required: false,
													validate: {
														lessThan5MB: files => (files[0]? files[0].size : 0) < 5242880 || 'Max 5MB',
														acceptedFormats: files =>
														['image/jpeg', 'image/png', 'image/jpg'].includes(
															(files[0] ? files[0].type : 'image/png')
														) || 'Only PNG, JPEG JPG',
													},
												})}
												onChange={(e)=>{uploadSingleFile('logo', e)}}/>
												
												<label for="logo-photo" class="photo_box">
													<div class="img-wrap">
														<img src={`${image.logo!='' ? (image.logo == null ? '../../../assets/images/dummy-profile-image.png' : image.logo) : '../../../assets/images/dummy-profile-image.png'}`} alt=""></img>
													</div>
													<div class="cam-icon">
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
													</div>
												</label>
												{errors.company_logo && (
													<Form.Text className="text-danger">
														{errors.company_logo.message}
													</Form.Text>
													)}
											</Form.Group>
										</Col>
									</>
								)
							}
							</Row>
							<div className="btn_wrap">
								<Button type="submit" className="w-100" disabled={state.isSubmitting}>Save Changes
									{state.isSubmitting && <Loader type="Button"></Loader>}
								</Button>
							</div>
						</Form>
					
					</Col>
				</Row>
			</div>
    );
}

export default UserProfile;