import React, { useEffect, useState} from 'react';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { Link  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Container, Row, Col, ToggleButton, Form, Button, Card, InputGroup} from 'react-bootstrap';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';
import Loader from '../Common/Loader';
import Banner from '../Common/Banner';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PropertyOnDemand = (props) => {
    const {state : {authUser, notifications, user_info}} = AuthState();
    const [state,setState] = useState({
        isToggleOn: true,
        parent_type:'',
        parent_type_name:'',
        show: false,
        property_types:[],
        cities:[],
        parent_locations:[],
        child_locations:[],
        grand_locations:[],
        isSubmitting:false,
        countries:undefined
    });
    const [purposeState,setPurposeState] = useState({
        purpose:'',
    });
    const {register, handleSubmit, formState , formState: {errors}, setValue, getValues,watch                     
    } = useForm() 
    const { t } = useTranslation();
    const handleShow = () => setState({...state, show : true})
    const handleClose = () => setState({...state, show : false})

    const [checked, setChecked] = useState({
		checkedPhone:false
	});
    const handlePhoneCheckbox = () => setChecked({...checked, checkedPhone:!checked.checkedPhone});
    const parentLocationChange = (e,type) =>{
        // setValue("child_location", "", { required: false })
        // setState({...state, child_locations: []})
        var params = {};
        if(type === 'parent'){
            params = {parent_location:e.target.value}
        }else if(type === 'child'){
            params = {child_location:e.target.value}
        }
        if( e.target.value !== ''){
            Makaan.post(`location-by-parent`,params)
                  .then(res => {
                    if(type === 'parent'){
                        setState({...state,child_locations: res.data.data});
                    }else if(type === 'child'){
                        setState({...state,grand_locations: res.data.data});
                    }
            })
        }
    }
    
    const purposeChange = (purpose) => {
        setPurposeState({...purposeState,purpose:purpose});
        if(purpose === 'rent'){
            setState({...state,parent_type:'',child_type:''});
        }
    }
    const typeChange = (id, e)=>{
        setState({...state,parent_type:id,child_type:'',parent_type_name:e.target.dataset.value})
    }

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
        let form = new FormData()
        form.append('purpose',purposeState.purpose)
        form.append('parent_type',state.parent_type)
        form.append('child_type',state.child_type)
        form.append('country',data.country)
        form.append('city',data.city)
        form.append('price',data.price)
        form.append('description',data.description)
        form.append('bathrooms',data.bathrooms)
        form.append('bedrooms',data.bedrooms)
        form.append('parent_location',data.parent_location)
        form.append('child_location',data.child_location)
        form.append('grand_location',data.grand_location)
        form.append('email',data.email)
        form.append('phone_number',data.phone_number)
        form.append('whatsapp_number',data.whatsapp_number)
        form.append('phone_code',data.phone_code)
        form.append('whatsapp_code',data.whatsapp_code)
        form.append('checkedPhone',checked.checkedPhone)
        form.append('full_name',data.full_name)

        Makaan.post(`save-property-demand`,form)
        .then(response => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
            if(!response.data.error){
                toast.success("Property On Demand Added !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                e.target.reset();
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
    }
    useEffect(() => {
        setValue('whatsapp_code', "pk")
        setValue('phone_code', "pk")
        setValue("email", user_info.email, { required: true })
        setValue("full_name", (user_info.first_name === undefined ? '' : user_info.first_name) + ' ' + (user_info.last_name === undefined ? '' : user_info.last_name), { required: true })
        setValue("phone_number", (user_info.phone_number && user_info.phone_number != "null") ? user_info.phone_number : '')
        setValue("whatsapp_number", (user_info.whatsapp_number && user_info.whatsapp_number != "null") ? user_info.whatsapp_number : '')
        setChecked({...checked, checkedPhone:user_info.whatsapp_number !== user_info.phone_number})
        let endpoints = [
            `property-type`,
            `fetch-countries`,
            `cities-list`,
            `parent-locations`
        ];
        axios.all(endpoints.map((endpoint,i) => {
            if(i === 0) {
                return Makaan.get(endpoint);
            }
            return Makaan.get(endpoint);
        })).then(
            (res) => {
                setState({...state, property_types: res[0].data.data, countries: res[1].data.data, cities: res[2].data.data, parent_locations: res[3].data.data })
            }
        ).then((res)=>{
            setValue('city', "245")
		});

    },[user_info]);

    return (
            <div className="add-property">
                <Banner/>
                <section className="add-property-section bg">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={8}>
                                <div className="property-search">
                                    <div className="hero_search">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{t('property_on_demand.title')} <span> (<span className="color">*</span>) {t('property_on_demand.Required Fields.')}</span></Card.Title>
                                                {/* {
                                                        !authUser && (
                                                            <div class="login-form-link">
                                                                <p className="help_text">You need to be logged in for requesting property on demand <Link to="/login">Login</Link></p>
                                                            </div>
                                                        )
                                                } */}
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <h3>{t('property_on_demand.type_location')}</h3>
                                                        </div>
                                                        <Form.Group className="form-group radio_group">
                                                            <Form.Label>{t('Add Property.Purpose:')} <span className="color">*</span></Form.Label>
                                                            <Row>
                                                                <Col xs="auto">
                                                                    <ToggleButton  type="checkbox" id="radio-1" variant="outline-primary" className="btn_radio_2"
                                                                        checked={purposeState.purpose === "sale"}
                                                                        onClick={()=>purposeChange('sale')}
                                                                        {...register("purpose", {
                                                                            required: !purposeState.purpose
                                                                        })}>
                                                                            <div className="radio-dot"></div>
                                                                            For Buy
                                                                    </ToggleButton>
                                                                </Col>
                                                                <Col xs="auto">
                                                                    <ToggleButton  type="checkbox"  id="radio-2" variant="outline-primary" className="btn_radio_2"
                                                                    checked={purposeState.purpose === "rent"}
                                                                    onClick={()=>purposeChange("rent")}
                                                                    {...register("purpose", {
                                                                      required: !purposeState.purpose
                                                                    })}>
                                                                        <div className="radio-dot"></div>
                                                                        For Rent
                                                                    </ToggleButton>
                                                                </Col>
                                                            </Row>
                                                            {errors.purpose && (
                                                                <Form.Text className="text-danger">
                                                                    {t('Common.This field is required')}
                                                                </Form.Text>
                                                            )}
                                                        </Form.Group>
                                                        <Form.Group className="form-group radio_group">
                                                            <Form.Label>{t('Add Property.Property Type:')} <span className="color">*</span></Form.Label>
                                                            <Row>
                                                                    {            
                                                                        state.property_types ? (state.property_types.map((property_type, i)=>{
                                                                            if(!(purposeState.purpose === "rent" && property_type.slug === "plots")){
                                                                                return(
                                                                                    <Col xs="auto">
                                                                                    <ToggleButton  key={"parent_type-"+property_type.slug} type="checkbox" id={"parent_type-"+i}  variant="outline-primary" className="btn_radio_2"
                                                                                    checked={state.parent_type === property_type.slug }
                                                                                    onClick={(e) => {typeChange(property_type.slug, e)}}
                                                                                    data-value ={property_type.title}
                                                                                    {...register("parent_type", {
                                                                                      required: !state.parent_type
                                                                                    })}>
                                                                                        <div className="radio-dot" data-value ={property_type.title}></div>
                                                                                        {property_type.title}
                                                                                    </ToggleButton>
                                                                                    </Col>
                                                                                )
                                                                            }
                                                                        })
                                                                        ) : 'No Parent Property Type Found'
                                                                    }
                                                                    {errors.parent_type && (
                                                                       <Form.Text className="text-danger">
                                                                          {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                {state.parent_type && 
                                                                    (
                                                                        <Col xl={12}>
                                                                            <div className="radio_group_menu">
                                                                                <Row>
                                                                                     {            
                                                                                        state.property_types ? (state.property_types.map((property_type, i)=>{
                                                                                            return(
                                                                                                    property_type.child_property_type.map((child_property_type, j)=>{
                                                                                                        if(purposeState.purpose === "rent" && (child_property_type.slug === 'upper-portion' || child_property_type.slug === 'lower-portion')){
                                                                                                            return (
                                                                                                                    child_property_type.parent_id === state.parent_type && 
                                                                                                                    (<Col xs="auto" key={"child_type-"+child_property_type.slug}>
                                                                                                                        <ToggleButton  type="checkbox" id={"child_type-"+child_property_type.slug}  variant="outline-primary" className="btn_radio_2"
                                                                                                                        checked={state.child_type === child_property_type.slug }
                                                                                                                        onClick={(e) => setState({...state,child_type:child_property_type.slug})}
                                                                                                                        {...register("child_type", {
                                                                                                                          required: !state.child_type
                                                                                                                        })}>
                                                                                                                            <div className="radio-dot"></div>
                                                                                                                            {child_property_type.title}
                                                                                                                        </ToggleButton>
                                                                                                                    </Col>)
                                                                                                                )
                                                                                                        }if(purposeState.purpose === "rent" && (child_property_type.slug !== 'upper-portion' || child_property_type.slug !== 'lower-portion')){
                                                                                                            return (
                                                                                                                    child_property_type.parent_id === state.parent_type && 
                                                                                                                    (<Col xs="auto" key={"child_type-"+child_property_type.slug}>
                                                                                                                        <ToggleButton  type="checkbox" id={"child_type-"+child_property_type.slug}  variant="outline-primary" className="btn_radio_2"
                                                                                                                        checked={state.child_type === child_property_type.slug }
                                                                                                                        onClick={(e) => setState({...state,child_type:child_property_type.slug})}
                                                                                                                        {...register("child_type", {
                                                                                                                          required: !state.child_type
                                                                                                                        })}>
                                                                                                                            <div className="radio-dot"></div>
                                                                                                                            {child_property_type.title}
                                                                                                                        </ToggleButton>
                                                                                                                    </Col>)
                                                                                                                )
                                                                                                        }else if (purposeState.purpose === "sale" && state.parent_type === 'homes' && !(child_property_type.slug === 'rooms' || child_property_type.slug === 'upper-portion' || child_property_type.slug === 'lower-portion')){
                                                                                                            return (
                                                                                                                child_property_type.parent_id === state.parent_type && 
                                                                                                                (<Col xs="auto" key={"child_type-"+child_property_type.slug}>
                                                                                                                    <ToggleButton  type="checkbox" id={"child_type-"+child_property_type.slug}  variant="outline-primary" className="btn_radio_2"
                                                                                                                    checked={state.child_type === child_property_type.slug }
                                                                                                                    onClick={(e) => setState({...state,child_type:child_property_type.slug})}
                                                                                                                    {...register("child_type", {
                                                                                                                        required: !state.child_type
                                                                                                                    })}>
                                                                                                                        <div className="radio-dot"></div>
                                                                                                                        {child_property_type.title}
                                                                                                                    </ToggleButton>
                                                                                                                </Col>)
                                                                                                            )
                                                                                                        }
                                                                                                        else if (purposeState.purpose === "sale" && state.parent_type === 'plots' && child_property_type.slug !== 'upper-portion' && child_property_type.slug !== 'lower-portion'){
                                                                                                            return (
                                                                                                                child_property_type.parent_id === state.parent_type && 
                                                                                                                (<Col xs="auto" key={"child_type-"+child_property_type.slug}>
                                                                                                                    <ToggleButton  type="checkbox" id={"child_type-"+child_property_type.slug}  variant="outline-primary" className="btn_radio_2"
                                                                                                                    checked={state.child_type === child_property_type.slug }
                                                                                                                    onClick={(e) => setState({...state,child_type:child_property_type.slug})}
                                                                                                                    {...register("child_type", {
                                                                                                                        required: !state.child_type
                                                                                                                    })}>
                                                                                                                        <div className="radio-dot"></div>
                                                                                                                        {child_property_type.title}
                                                                                                                    </ToggleButton>
                                                                                                                </Col>)
                                                                                                            )
                                                                                                        }
                                                                                                    })
                                                                                            )
                                                                                        })
                                                                                        ) : 'No Child Property Type Found'
                                                                                    }
                                                                                    {errors.child_type && (
                                                                                       <Form.Text className="text-danger">
                                                                                          {t('Common.This field is required')}
                                                                                        </Form.Text>
                                                                                    )}
                                                                                </Row>
                                                                            </div>    
                                                                        </Col>
                                                                    )
                                                            }
                                                            </Row>
                                                        </Form.Group>
                                                        <Row>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('property_on_demand.country')} <span className="color">*</span></Form.Label>
                                                                    {
                                                                        state.countries !== undefined && (
                                                                            <Form.Select name="country" {...register("country", {
                                                                                required: true
                                                                            })}>
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
                                                                    {errors.country && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            {
                                                                (watch('country') === 'PK') && (
                                                                    <Col xl={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('property_on_demand.city')}</Form.Label>
                                                                            <Form.Select name="city" {...register("city", {
                                                                                required: true
                                                                            })}>
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
                                                                            {errors.city && (
                                                                                <Form.Text className="text-danger">
                                                                                    {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                )
                                                            }
                                                            {
                                                                (
                                                                <Col xl={6} lg={6} md={6} >
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('property_on_demand.location')} <span className="color">*</span></Form.Label>
                                                                        <Form.Select name="parent_location"
                                                                        {...register("parent_location", {
                                                                          required: true
                                                                        })}
                                                                        onChange={(e) => parentLocationChange(e,'parent')}>
                                                                            <option value="" >Select Location</option>
                                                                            { 
                                                                                state.parent_locations.map((parent_location, i)=>{  
                                                                                    return(
                                                                                            <option  key={'parent_location'+i} value={parent_location.id}>{parent_location.name}</option> 
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Form.Select>
                                                                        {errors.parent_location && (
                                                                           <Form.Text className="text-danger">
                                                                             {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                )
                                                            }

                                                            {
                                                                (state.child_locations.length > 0 && state.parent_locations.length > 0)  &&
                                                                (
                                                                <Col xl={6} lg={6} md={6} >
                                                                    <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Phase:')}</Form.Label>
                                                                        <Form.Select name="child_location"
                                                                        {...register("child_location", {
                                                                          required: false
                                                                        })}
                                                                        onChange={(e) => parentLocationChange(e,'child')}>
                                                                            <option value=""></option>
                                                                            { 
                                                                                state.child_locations.map((child_location, i)=>{  
                                                                                    return(
                                                                                            <option  key={'child_location'+i} value={child_location.id}>{child_location.name}</option> 
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                                )
                                                            }
                                                            {
                                                                (state.grand_locations.length > 0 && state.parent_locations.length > 0)  &&
                                                                (
                                                                <Col xl={6} lg={6} md={6} >
                                                                    <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Block:')}</Form.Label>
                                                                        <Form.Select name="grand_location"
                                                                        {...register("grand_location", {
                                                                          required: false
                                                                        })}
                                                                        >
                                                                            <option value=""></option>
                                                                            { 
                                                                                state.grand_locations.map((grand_location, i)=>{  
                                                                                    return(
                                                                                        <option  key={'grand_location'+i} value={grand_location.id}>{grand_location.name}</option> 
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <option value="other">Other</option>
                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                                )
                                                            }
                                                            
                                                        </Row>
                                                    </div>
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <h3>{t('property_on_demand.property_details')}</h3>
                                                        </div>
                                                        <Row>
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('property_on_demand.budget')} <span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="price"
                                                                    {...register("price", {
                                                                        required: true && t('Common.This field is required'),
                                                                        maxLength:{value:15,message:t('Common.Too Many Digits')}
                                                                    })} />
                                                                    {errors.price && (
                                                                       <Form.Text className="text-danger">
                                                                          {errors.price.message}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={12}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('property_on_demand.some_more_info_about')}</Form.Label>
                                                                    <Form.Control as="textarea" rows={3} name="description"
                                                                    {...register("description", {
                                                                      required: false
                                                                    })}/>
                                                                </Form.Group>
                                                            </Col>
                                                            {
                                                                (state.parent_type !== 'plots') && (
                                                                <>
                                                                    <Col xl={4} lg={4} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('Add Property.Bedrooms:')}</Form.Label>
                                                                            <Form.Select name="bedrooms"
                                                                            {...register("bedrooms", {
                                                                              required: false
                                                                            })}>
                                                                                <option value="0" >Select Bedrooms</option>
                                                                                <option value="1" >1</option>
                                                                                <option value="2" >2</option>
                                                                                <option value="3" >3</option>
                                                                                <option value="4" >4</option>
                                                                                <option value="5" >5</option>
                                                                                <option value="6" >6</option>
                                                                                <option value="7" >7</option>
                                                                                <option value="8" >8</option>
                                                                                <option value="9" >9</option>
                                                                                <option value="10" >10</option>
                                                                                <option value="10+" >10+</option>

                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xl={4} lg={4} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('Add Property.Bathrooms:')}</Form.Label>
                                                                            <Form.Select name="bathrooms"
                                                                            {...register("bathrooms", {
                                                                              required: false
                                                                            })}>
                                                                                <option value="0" >Select Bathrooms</option>
                                                                                <option value="1" >1</option>
                                                                                <option value="2" >2</option>
                                                                                <option value="3" >3</option>
                                                                                <option value="4" >4</option>
                                                                                <option value="5" >5</option>
                                                                                <option value="6" >6</option>
                                                                                <option value="7" >7</option>
                                                                                <option value="8" >8</option>
                                                                                <option value="9" >9</option>
                                                                                <option value="10" >10</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </>
                                                                )
                                                            }
                                                        </Row>
                                                    </div>
                                                    {/* {
                                                        authUser && ( */}
                                                            <div className="form-section">
                                                                <div className="head">
                                                                    <h3>{t('property_on_demand.contact_details')}</h3>
                                                                </div>
                                                                <Row>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group form-file">
                                                                            <Form.Label>{t('property_on_demand.full_name')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="full_name"
                                                                            {...register("full_name", {
                                                                                required: true
                                                                            })} />
                                                                            {errors.full_name && (
                                                                                <Form.Text className="text-danger">
                                                                                    {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group form-file">
                                                                            <Form.Label>{t('property_on_demand.email')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="email"
                                                                            {...register("email", {
                                                                                required: true
                                                                            })} />
                                                                            {errors.email && (
                                                                                <Form.Text className="text-danger">
                                                                                    {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>WhatsApp Number <span className="color">*</span></Form.Label>
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
                                                                            <Form.Text className="text-danger"></Form.Text>
                                                                            <div className="form-check mt-3">
                                                                                <input type="checkbox" id="checkNumber" defaultChecked={user_info.whatsapp_number !== user_info.phone_number} name="check_number" className="form-check-input" {...register('check_number', { required: false })}></input>
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
                                                                                <Form.Label>{t('property_on_demand.phone')} <span className="color">*</span></Form.Label>
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
                                                                                <Form.Text className="text-danger"></Form.Text>
                                                                            </Form.Group>
                                                                        </Col>) :
                                                                        <Col xl={6}></Col>
                                                                    }
                                                                </Row>
                                                            </div>
                                                        {/* )  
                                                    } */}
                                                    
                                                    <Row className="justify-content-center">
                                                        <Col xl="auto">
                                                            <Button variant="primary" type="submit" disabled={state.isSubmitting}>
                                                                {t('property_on_demand.request_property')}
                                                                {state.isSubmitting &&  <Loader type="Button"></Loader>}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    {/* {
                                                        !authUser && (
                                                        <div class="login-form-link">
                                                            <p>Login to request property on demand <Link to="/login">Login</Link></p>
                                                        </div>
                                                        )
                                                    } */}
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                
            </div>
        );
}

export default PropertyOnDemand;