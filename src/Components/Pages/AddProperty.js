import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Container, Row, Col, ToggleButton, Form, Button, Card, Modal} from 'react-bootstrap';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';
import Loader from '../Common/Loader';
import Banner from '../Common/Banner';
import RUG, { DragArea, DropArea, List } from 'react-upload-gallery'
import 'react-upload-gallery/dist/style.css'

const AddProperty = (props) => {
    const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
    const location = useLocation();
    const [state,setState] = useState({
        isToggleOn: true,
        parent_type:'',
        child_type:'',
        parent_type_name:'',
        selected_features:[],
        show: false,
        features:[],
        property_types:[],
        cities:[],
        parent_locations:[],
        child_locations:[],
        grand_locations:[],
        isSubmitting:false,
    });
    const [file, setFile] = useState([]);
    const [purposeState,setPurposeState] = useState({
        purpose:'',
    });
    const [auth,setAuth] = useState({
        isAuthenticated:'',
    });
    const {register, handleSubmit, formState , formState: {errors}, setValue, getValues} = useForm() 
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleShow = () => setState({...state, show : true})
    const handleClose = () => setState({...state, show : false})

    // const uploadSingleFile = (e) => {
    //     if((e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg') && (e.target.files[0].size <= 5242880) && (e.target.files[0].size >= 1024*3)) {
    //         setFile([...file, URL.createObjectURL(e.target.files[0])]);
    //     }else{
    //         toast.error('Accepted images are jpg, jpeg, png and must be smaller than 5 MB', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //             });
    //     }
    // }
    // const  deleteFile = (e) =>{
    //     const s = file.filter((item, index) => index !== e);
    //     setFile(s);
    // }
    const purposeChange = (purpose) => {
        setPurposeState({...purposeState,purpose:purpose});
        if(purpose === 'rent'){
            setState({...state,parent_type:'',child_type:'',parent_type_name:''});
        }
    }
    const parentLocationChange = (e,type) =>{
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
       
    const typeChange = (slug, e)=>{
        setState({...state,parent_type:slug,child_type:'',parent_type_name:e.target.dataset.value})
    }

    const onSubmit = async(data, e) => {
        setState(prevState => ({
			...prevState,
			isSubmitting: true
		  }));
        let form = new FormData()

        ///for multiple images
        await Promise.all(file.map(async (filee,index) => {
            // let file = await fetch(filee).then(r => r.blob()).then(blobFile => new File([blobFile], `abcd.${blobFile.type}`, { type: blobFile.type })) 
            form.append("images[" + index + "]", filee.file);
        }));
        let features = [];
        // for looping over object data
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(key.includes('feature---')){ //for checking feature keys
                    // key.split('---').pop() // for getting id after ---
                    features.push({'feature_id':key.split('---').pop(),'value':data[key] ? data[key] : ''})
                }
            }
        }
        form.append('purpose',purposeState.purpose)
        form.append('parent_type',state.parent_type)
        form.append('child_type',state.child_type)
        form.append('city',data.city)
        form.append('title',data.title)
        form.append('price',data.price)
        form.append('area',data.area)
        form.append('unit',data.unit)
        form.append('house_number',data.house_number)
        form.append('floor_number',data.floor_number)
        form.append('street_number',data.street_number)
        form.append('plot_number',data.plot_number)
        form.append('description',data.description)
        form.append('bathrooms',data.bathrooms)
        form.append('bedrooms',data.bedrooms)
        form.append('expries_after',data.expries_after)
        form.append('parent_location',data.parent_location)
        form.append('child_location',data.child_location)
        form.append('grand_location',data.grand_location)
        form.append('email',data.email)
        form.append('password',data.password)
        form.append('min_contract_period',data.min_contract_period)
        form.append('rough_area_size',data.rough_area_size)
        form.append('features',JSON.stringify(features))

        Makaan.post(`save-property`,form)
        .then(response => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
            if(!response.data.error){
                toast.success("Property Added !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                e.target.reset();
                setFile([]);
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
                dispatch({type:'LOGOUT',payload:undefined});
            }else{
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        });
    }
    const signUp = ()=>{
        let data = getValues();
        data.parent_type = state.parent_type
        data.child_type = state.child_type
        data.purpose = purposeState.purpose
        localStorage.setItem('add_property',JSON.stringify(data))
        navigate('/register',{
            state: {
              from:location.pathname
            }
        });
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        setAuth({...auth, isAuthenticated:localStorage.getItem("access_token")})
        let endpoints = [
            `features`,
            `property-type`,
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
                setState({...state, features: res[0].data.data, property_types: res[1].data.data, cities: res[2].data.data, parent_locations: res[3].data.data })
            }
        ).then((res)=>{
            setValue('city', "245")
            if(location.state && location.state.from && localStorage.getItem('add_property')){
                let data = JSON.parse(localStorage.getItem('add_property'));
                setPurposeState({...purposeState,purpose:data.purpose})
                setState(prevState => ({
                    ...prevState,
                    parent_type:data.parent_type,child_type:data.child_type,parent_type_name:data.parent_type
                  }));
                data.purpose = ''
                data.parent_type = ''
                data.child_type = ''
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        setValue(key,data[key])
                    }
                }
            }
        })

    },[]);

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
                                                <Card.Title>{t('Add Property.Add Property')} <span> (<span className="color">*</span>) {t('Add Property.Required Fields.')}</span></Card.Title>
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <h3>{t('Add Property.PROPERTY TYPE AND LOCATION')}</h3>
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
                                                                            For Sale
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
                                                                                                        }else if(purposeState.purpose === "rent" && (child_property_type.slug !== 'upper-portion' || child_property_type.slug !== 'lower-portion')){
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
                                                                                                        }else if(purposeState.purpose === "sale" && state.parent_type === 'plots' && child_property_type.slug !== 'upper-portion' && child_property_type.slug !== 'lower-portion'){
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
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.City:')} <span className="color">*</span></Form.Label>
                                                                    <Form.Select name="city"
                                                                    {...register("city", {
                                                                      required: true
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
                                                                          {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            {
                                                                (
                                                                <Col xl={6} lg={6} md={6}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('Add Property.Location:')} <span className="color">*</span></Form.Label>
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
                                                                <Col xl={6} lg={6} md={6}>
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
                                                                <Col xl={6} lg={6} md={6}>
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
                                                            {
                                                                (state.child_type !== 'plot-file') && (
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('Add Property.Street Number:')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="text" name="street_number" 
                                                                            {...register("street_number", {
                                                                                required: t('Common.This field is required'),
                                                                                maxLength:{value:15,message:t('Common.Too Many Digits')}
                                                                            })}/>
                                                                            {errors.street_number && (
                                                                            <Form.Text className="text-danger">
                                                                                {errors.street_number.message}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                )
                                                            }
                                                            {
                                                                (state.parent_type === 'plots' && state.child_type !== 'plot-file') && (
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('Add Property.Plot Number:')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="text" name="plot_number" 
                                                                            {...register("plot_number", {
                                                                                required: state.parent_type === 'plots' && t('Common.This field is required') ,
                                                                                maxLength:{value:15,message:t('Common.Too Many Digits')}
                                                                            })}/>
                                                                            {errors.plot_number && (
                                                                            <Form.Text className="text-danger">
                                                                                {errors.plot_number.message}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col> 
                                                                )
                                                            }
                                                            {
                                                                (state.parent_type === 'homes') && 
                                                                    (
                                                                        <Col xl={6} lg={6} md={6}>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label>{t('Add Property.House Number:')} <span className="color">*</span></Form.Label>
                                                                                <Form.Control type="text" name="house_number" 
                                                                                {...register("house_number", {
                                                                                required: state.parent_type === 'homes' && t('Common.This field is required'),
                                                                                maxLength:{value:15,message:t('Common.Too Many Digits')}
                                                                                })}/>
                                                                                {errors.house_number && (
                                                                                <Form.Text className="text-danger">
                                                                                    {errors.house_number.message}
                                                                                    </Form.Text>
                                                                                )}
                                                                            </Form.Group>
                                                                        </Col>
                                                                    )
                                                            }
                                                            {
                                                                state.child_type === 'flat' && 
                                                                    (
                                                                        <Col xl={6} lg={6} md={6}>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label>{ t('Add Property.Floor Number:')}</Form.Label>
                                                                                <Form.Control type="text" name="floor_number" 
                                                                                {...register("floor_number", {
                                                                                required: false,
                                                                                maxLength:{value:15,message:t('Common.Too Many Digits')}
                                                                                })}/>
                                                                                {errors.floor_number && (
                                                                                <Form.Text className="text-danger">
                                                                                    {errors.floor_number.message}
                                                                                    </Form.Text>
                                                                                )}
                                                                            </Form.Group>
                                                                        </Col>
                                                                    )
                                                            }

                                                            {
                                                                ( state.child_type !== 'plot-file') && (
                                                                    <Col xs={12}>
                                                                        <p className="help_text_field test">{t('Add Property.notice_street_house')} </p>
                                                                    </Col>
                                                                )
                                                            }
                                                        </Row>
                                                    </div>
                                                    {
                                                        purposeState.purpose === 'rent' && 
                                                        (
                                                            <div className="form-section">
                                                                <div className="head">
                                                                    <h3>{t('Add Property.RENTAL PROPERTY DETAILS')}</h3>
                                                                </div>
                                                                <Row>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>{t('Add Property.minimum_contract_period')} <span className="color">*</span></Form.Label>
                                                                            <Form.Select name="min_contract_period"
                                                                            {...register("min_contract_period", {
                                                                            required: true
                                                                            })}>
                                                                                <option value="0" >No Minimum Contract Period</option>
                                                                                <option value="3" >3 Months</option>
                                                                                <option value="6" >6 Months</option>
                                                                                <option value="11" >11 Months</option>
                                                                            </Form.Select>
                                                                            {errors.min_contarct_period && (
                                                                            <Form.Text className="text-danger">
                                                                                {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <h3>{t('Add Property.PROPERTY DETAILS')}</h3>
                                                        </div>
                                                        <Row>
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Property Title:')} <span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="title" 
                                                                    {...register("title", {
                                                                        required: true && t('Common.This field is required'),
                                                                        maxLength:{value:100,message:t('Common.Too Many Characters')}
                                                                    })}/>
                                                                    {errors.title && (
                                                                       <Form.Text className="text-danger">
                                                                            {errors.title.message}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{purposeState.purpose !== 'rent' ? t('Add Property.All Inclusive Price: (PKR)') : t('Add Property.monthly_rent')} <span className="color">*</span></Form.Label>
                                                                    <Form.Control type="number" min="1" name="price"
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
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Exact Land Area:')}</Form.Label>
                                                                    <Form.Control type="number" min="1" name="area"
                                                                    {...register("area", {
                                                                        required: false,
                                                                        maxLength:{value:9,message:t('Common.Too Many Digits')}
                                                                    })} />
                                                                    {errors.area && (
                                                                       <Form.Text className="text-danger">
                                                                          {errors.area.message}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Unit:')}</Form.Label>
                                                                    <Form.Select name="unit"
                                                                    {...register("unit", {
                                                                      required: false
                                                                    })}>
                                                                        <option value="" >Select Unit</option>
                                                                        <option value="Square Feet" >Square Feet</option>
                                                                        <option value="Square Yards" >Square Yards</option>
                                                                        <option value="Square Meters" >Square Meters</option>
                                                                        <option value="Marla" >Marla</option>
                                                                        <option value="Kanal" >Kanal</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Area Size:')} <span className="color">*</span></Form.Label>
                                                                    <Form.Select name="rough_area_size"
                                                                    {...register("rough_area_size", {
                                                                      required: true
                                                                    })}>
                                                                        <option value="3-Marla" >3 Marla</option>
                                                                        <option value="4-Marla" >4 Marla</option>
                                                                        <option value="5-Marla" >5 Marla</option>
                                                                        <option value="6-Marla" >6 Marla</option>
                                                                        <option value="7-Marla" >7 Marla</option>
                                                                        <option value="8-Marla" >8 Marla</option>
                                                                        <option value="10-Marla" >10 Marla</option>
                                                                        <option value="12-Marla" >12 Marla</option>
                                                                        <option value="15-Marla" >15 Marla</option>
                                                                        <option value="18-Marla" >18 Marla</option>
                                                                        <option value="1-Kanal" >1 Kanal</option>
                                                                        <option value="2-Kanal" >2 Kanal</option>
                                                                        <option value="3-Kanal" >3 Kanal</option>
                                                                        <option value="4-Kanal" >4 Kanal</option>

                                                                    </Form.Select>
                                                                    {errors.rough_area_size && (
                                                                       <Form.Text className="text-danger">
                                                                          {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={12} lg={12} md={12}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Description:')} <span className="color">*</span></Form.Label>
                                                                    <Form.Control as="textarea" rows={3} name="description"
                                                                    {...register("description", {
                                                                      required: true
                                                                    })}/>
                                                                    {errors.description && (
                                                                       <Form.Text className="text-danger">
                                                                          {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
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
                                                            <Col xl={4} lg={4} md={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('Add Property.Expires After:')}</Form.Label>
                                                                    <Form.Select  name="expries_after"
                                                                    {...register("expries_after", {
                                                                      required: false
                                                                    })}>
                                                                        <option value="3" >3 Months</option>
                                                                        <option value="6" >6 Months</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs="12">
                                                                <Button variant="primary" onClick={handleShow}>
                                                                    {t('Add Property.Add Features')}
                                                                </Button>
                                                                <Modal size="lg" show={state.show} onHide={handleClose} centered className="feature-modal">
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>{t('Add Property.Property Features')}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <Row>
                                                                            <Col xl={6} lg={6} md={6}>
                                                                                {
                                                                                    state.features ? (state.features.map((feature, i)=>{
                                                                                        let name = 'feature---'+feature.name+'---'+feature.id

                                                                                        if(feature.type === 'input'){
                                                                                            return (
                                                                                                <Form.Group className="form-group" key={i}>
                                                                                                    <Form.Label>{feature.name}:{feature.required === '1' && <span className="color">*</span>}</Form.Label>
                                                                                                    <Form.Control type="text"
                                                                                                    {...register(name, {
                                                                                                    required: feature.required === '1' ? true : false
                                                                                                    })}/>
                                                                                                    {errors[name] && (
                                                                                                    <Form.Text className="text-danger">
                                                                                                        {t('Common.This field is required')}
                                                                                                        </Form.Text>
                                                                                                    )}
                                                                                                </Form.Group> 
                                                                                            )
                                                                                        }
                                                                                        else if(feature.type === 'select'){
                                                                                            return(
                                                                                                <Form.Group className="form-group" key={i}>
                                                                                                    <Form.Label>{feature.name}:{feature.required === '1' && <span className="color">*</span>}</Form.Label>
                                                                                                    <Form.Select 
                                                                                                    {...register(name, {
                                                                                                    required: feature.required === '1' ? true : false
                                                                                                    })}>
                                                                                                        {
                                                                                                            (feature.options).split(",").length > 0 && (
                                                                                                                (feature.options).split(",").map((option,i)=>{
                                                                                                                    return (<option value={option}>{option}</option>)
                                                                                                                })
                                                                                                            )
                                                                                                            

                                                                                                        }
                                                                                                        
                                                                                                        
                                                                                                    </Form.Select>
                                                                                                    {errors[name] && (
                                                                                                    <Form.Text className="text-danger">
                                                                                                        {t('Common.This field is required')}
                                                                                                        </Form.Text>
                                                                                                    )}
                                                                                                </Form.Group>
                                                                                        )
                                                                                        }
                                                                                        }
                                                                                        )
                                                                                    ):(
                                                                                    <Col>No Features</Col>
                                                                                    )
                                                                                }
                                                                                
                                                                            </Col>
                                                                            <Col xl={6} lg={6} md={6}>
                                                                                <div className="feature-checks">
                                                                                {
                                                                                    state.features ? (state.features.map((feature, i)=>{
                                                                                    let name = 'feature---'+feature.name+'---'+feature.id
                                                                                    if(feature.type === 'checkbox'){
                                                                                        return(
                                                                                            <div className="form-check" key={i}>
                                                                                                <input type="checkbox" id={"remember"+i} className="form-check-input"
                                                                                                {...register(name, {
                                                                                                  required: feature.required === '1' ? true : false
                                                                                                })}></input>
                                                                                                <label htmlFor={"remember"+i}>
                                                                                                    <div className="checkbox"></div>
                                                                                                    <span>{feature.name}{feature.required === '1' && <span className="color">*</span>}</span>
                                                                                                </label>
                                                                                                {errors[name] && (
                                                                                                   <Form.Text className="text-danger">
                                                                                                      {t('Common.This field is required')}
                                                                                                    </Form.Text>
                                                                                                )}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })
                                                                                ):(
                                                                                <Col>No Features</Col>
                                                                                )}
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                      <Button variant="transparent" onClick={handleClose}>
                                                                        {t('Add Property.Close')}
                                                                      </Button>
                                                                      <Button variant="primary" onClick={handleClose}>
                                                                        {t('Add Property.Save')}
                                                                      </Button>
                                                                    </Modal.Footer>
                                                                  </Modal>
                                                            </Col>
                                                            {
                                                                state.features ? (state.features.map((feature, i)=>{
                                                                    let name = 'feature---'+feature.name+'---'+feature.id
                                                                        return(
                                                                            errors[name] &&
                                                                                (<Form.Text className="text-danger">
                                                                                    {t(`${feature.name} is required`)}
                                                                                </Form.Text>)
                                                                        )
                                                                })
                                                                ) : (<span></span>)
                                                            }
                                                        </Row>
                                                    </div>
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <h3>{t('Add Property.Add Images')}</h3>
                                                        </div>
                                                        {
                                                            file.length > 0 && (
                                                                <Col xs={12}>
                                                                    <p className="help_text_field test">Hold on the image to change its order </p>
                                                                </Col>
                                                            )
                                                        }
                                                        <Row>
                                                            <Col xl={12} lg={12} md={12}>
                                                                <Form.Group className="form-group form-file">
                                                                    {/* <Form.Label htmlFor="image-files" className="btn btn-primary">
                                                                        {t('Add Property.Add Images')}
                                                                    </Form.Label> */}
                                                                    <div class="image">
                                                                    <RUG
                                                                        ssrSupport={true}
                                                                        onChange={(images) => {
                                                                            setFile(images)
                                                                            console.log(file,'filfifjefiejfiejfiejfeifjifjeifjiefj')
                                                                      }}
                                                                        autoUpload={false}
                                                                        sorting={true}
                                                                        rules={{
                                                                           
                                                                        }}
                                                                        
                                                                        accept={['jpg', 'jpeg', 'png']}
                                                                        
                                                                        onWarning={(type, rules) => {
                                                                            switch(type) {
                                                                            case 'accept':
                                                                                toast.error('Accepted images are jpg, jpeg, png', {
                                                                                    position: toast.POSITION.TOP_RIGHT,
                                                                                });
                                                                            default:
                                                                            }
                                                                        }}
                                                                        header={({ openDialogue }) => (
                                                                            <>
                                                                            <DropArea>
                                                                                {
                                                                                (isDrag) => <div style={{ background: isDrag ? 'yellow' : '#fff' }}>
                                                                                    <Form.Label htmlFor="image-files" className="btn btn-primary" onClick={openDialogue}>
                                                                                        {t('Add Property.Add Images')}
                                                                                    </Form.Label>
                                                                                    {/* <button onClick={openDialogue}>Open</button> */}
                                                                                </div>
                                                                                }
                                                                            </DropArea>
                                                                            </>
                                                                        )}
                                                                        onConfirmDelete={(currentImage, images) => {
                                                                            return new Promise(resolve => {
                                                                              // For example, you can affect the loading screen here
                                                                              setState({...state, loading: true })
                                                                                
                                                                              setTimeout(() => resolve(true), 1000)
                                                                            })
                                                                        }}
                                                                    />
                                                                    </div>
                                                                    {/* <Form.Control type="file" id="image-files" multiple onChange={uploadSingleFile} style={{display:"none"}}/> */}
                                                                </Form.Group>
                                                            </Col>
                                                            {/* <Col>
                                                                <div className="image-list" >
                                                                    {file.length > 0 &&
                                                                      file.map((item, index) => {
                                                                        return (
                                                                          <div key={item} className="image-col">
                                                                            <div className="image-item">
                                                                                <div className="img">
                                                                                    
                                                                                    <img src={item} alt=""/>
                                                                                </div>
                                                                                <button type="button" className="btn btn-icon btn-icon-xs" onClick={() => deleteFile(index)}>
                                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                                                                </button>
                                                                            </div>
                                                                          </div>
                                                                        );
                                                                      })}
                                                                </div>
                                                            </Col> */}
                                                        </Row>
                                                    </div>
                                                    <div className="form-section">
                                                        {
                                                            !auth.isAuthenticated && (
                                                                <>
                                                                <div className="head">
                                                                    <h3>{t('Add Property.Contact Details')}</h3>
                                                                </div>
                                                                <Row>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group form-file">
                                                                            <Form.Label>{t('Add Property.Username:')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="email"
                                                                            {...register("email", {
                                                                              required: auth.isAuthenticated ? false : true
                                                                            })} />
                                                                            {errors.email && (
                                                                               <Form.Text className="text-danger">
                                                                                  {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                            )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xl={6} lg={6} md={6}>
                                                                        <Form.Group className="form-group form-file">
                                                                            <Form.Label htmlFor="">{t('Add Property.Password:')} <span className="color">*</span></Form.Label>
                                                                            <Form.Control type="password" placeholder="********" name="password" 
                                                                            {...register("password", {
                                                                                  required: auth.isAuthenticated ? false : true
                                                                                })}/>
                                                                            {errors.password && (
                                                                               <Form.Text className="text-danger">
                                                                                  {t('Common.This field is required')}
                                                                                </Form.Text>
                                                                              )}
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </>)
                                                        }
                                                        
                                                        
                                                    </div>
                                                        <Row className="justify-content-center">
                                                            <Col xs="auto" className="text-center">
                                                                <Button variant="primary" type="submit" disabled={state.isSubmitting}>
                                                                    {t('Add Property.Submit Property')}
                                                                    {state.isSubmitting && <Loader type="Button"></Loader>}
                                                                </Button>
                                                            {
                                                            !authUser && (
                                                                <div className="login-form-link">
                                                                    <p>{t("Login.Don't have an account?")} <a  
                                                                     href="javascript:void(0)" onClick={signUp}><span>{t('Login.Sign Up')}</span></a></p>
                                                                </div>
                                                            )
                                                            }
                                                            </Col>
                                                        </Row>
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

export default AddProperty;