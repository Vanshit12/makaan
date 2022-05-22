import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, ToggleButton, Form, Button, Card, Tab, Nav, InputGroup} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {Makaan} from '../../request';
import axios from "axios";
import Loader from './Loader';

const SearchFilter = ({cities, property_types}) => {

    const [state,setState] = useState({
        cities:[],
        property_types:[],
        checked:"sale",
        searchLocationString: "",
        searchResults:[],
        isSearch: true,
        searching:false,
        min:[
            {key:0,value:0},
            {key:'500,000',value:500000},
            {key:'1,000,000',value:1000000},
            {key:'2,000,000',value:2000000},
            {key:'3,500,000',value:3500000},
            {key:'5,000,000',value:5000000},
            {key:'6,500,000',value:6500000},
            {key:'8,000,000',value:8000000},
            {key:'10,000,000',value:10000000},
            {key:'12,500,000',value:12500000},
            {key:'15,000,000',value:15000000},
            {key:'17,500,000',value:17500000},
            {key:'20,000,000',value:20000000},
            {key:'25,000,000',value:25000000},
            {key:'30,000,000',value:30000000},
            {key:'40,000,000',value:40000000},
            {key:'50,000,000',value:50000000},
            {key:'75,000,000',value:75000000},
            {key:'100,000,000',value:100000000},
            {key:'250,000,000',value:250000000},
            {key:'500,000,000',value:500000000},
            {key:'1000,000,000',value:1000000000}
        ],
        preMax:[
            {key:0,value:0},
            {key:'1,000,000',value:1000000},
            {key:'2,000,000',value:2000000},
            {key:'3,500,000',value:3500000},
            {key:'5,000,000',value:5000000},
            {key:'6,500,000',value:6500000},
            {key:'8,000,000',value:8000000},
            {key:'10,000,000',value:10000000},
            {key:'12,500,000',value:12500000},
            {key:'15,000,000',value:15000000},
            {key:'17,500,000',value:17500000},
            {key:'20,000,000',value:20000000},
            {key:'25,000,000',value:25000000},
            {key:'30,000,000',value:30000000},
            {key:'40,000,000',value:40000000},
            {key:'50,000,000',value:50000000},
            {key:'75,000,000',value:75000000},
            {key:'100,000,000',value:100000000},
            {key:'250,000,000',value:250000000},
            {key:'500,000,000',value:500000000},
            {key:'1000,000,000',value:1000000000},
            {key:'5,000,000,000',value:5000000000}
        ],
        max:[
            {key:0,value:0},
            {key:'1,000,000',value:1000000},
            {key:'2,000,000',value:2000000},
            {key:'3,500,000',value:3500000},
            {key:'5,000,000',value:5000000},
            {key:'6,500,000',value:6500000},
            {key:'8,000,000',value:8000000},
            {key:'10,000,000',value:10000000},
            {key:'12,500,000',value:12500000},
            {key:'15,000,000',value:15000000},
            {key:'17,500,000',value:17500000},
            {key:'20,000,000',value:20000000},
            {key:'25,000,000',value:25000000},
            {key:'30,000,000',value:30000000},
            {key:'40,000,000',value:40000000},
            {key:'50,000,000',value:50000000},
            {key:'75,000,000',value:75000000},
            {key:'100,000,000',value:100000000},
            {key:'250,000,000',value:250000000},
            {key:'500,000,000',value:500000000},
            {key:'1000,000,000',value:1000000000},
            {key:'5,000,000,000',value:5000000000}
        ]
    });
    const [inputField , setInputField] = useState({
        city: '',
        location: '',
        propertyType: '',
        MinPrice:'',
        MaxPrice:'',
        Area:'',
        ActiveTab:'sale',
        Bedrooms:'',
        sort:''
    });
    const navigate = useNavigate();
    function searchPropertiesAPI(event) {
        event.preventDefault();
        const queryString = new URLSearchParams(inputField).toString();
        navigate("/search-property?"+queryString);
    }

    const setChecked = (event) => {
        setState({...state,checked : event});
        setInputField({...inputField,ActiveTab : event});
    }
    const inputsHandler = (e) =>{
        const { name, value } = e.target;
        // if(e.target.name == 'MinPrice'){
        //     setState((prevState) => ({
        //         ...prevState,
        //         'max': state.preMax,
        //     }));
        // }
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // if(e.target.name == 'MinPrice'){
        //     var filteredMaxArray = (state.max).filter(function(maxValue){
        //         return maxValue.value > inputField.MinPrice;
        //     });
        //     setState((prevState) => ({
        //         ...prevState,
        //         'max': filteredMaxArray,
        //     }));
        // }
    }
    const handleSearchString =(e)=>{
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            ['searching']: true,
        }));
        setInputField((prevState) => ({
            ...prevState,
            ['location']: value,
        }));
    }

    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
          const context = this;
          const args = arguments;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };
    
    const handleSearchChange = debounce(function (e) {
        const { name, value } = e.target;
        if(value !== '' && state.isSearch){
            let endpoints = [
                `search-result`,
            ];
            axios.all(endpoints.map((endpoint,i) => {
                return Makaan.get(`${endpoint}?searchLocationString=${value}`);
            })).then(
                (res) => {
                    setState({...state, searching:false, searchResults: res[0].data.data })
                }
            );
        }else{
            setState({...state, searchResults: []})
        }
        setState((prevState) => ({
            ...prevState,
            ['isSearch']: true,
        }));
    }, 300);

    
    const selectLocation = (name) =>{
        setInputField((prevState) => ({
            ...prevState,
            ['location']: name,
          }));
          setState({...state, searchLocationStringlocation: name, searchResults:[], isSearch: false })
        //   document.getElementsByName("").value = name;
    }
    
    const { t } = useTranslation();
    useEffect(() => {
        
    },[]);

        return (
            <section className="property-search pt-0">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={10} lg={10} md={10} sm={12}>
                            <div className="hero_search">
                                <div className="search_tabs">
                                    <ListGroup horizontal className="justify-content-center">
                                        <ListGroup.Item>
                                            <ToggleButton  type="radio" name="deal_type" id="type_buy" variant="outline-primary" className="btn_radio_1" checked={state.checked === "sale"?"true":""} onChange={(e) => setChecked("sale")}>{t('home_translations:Buy')}</ToggleButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <ToggleButton  type="radio" name="deal_type" id="type_rent" variant="outline-primary" className="btn_radio_1" checked={state.checked === "rent"?"true":""} onChange={(e) => setChecked("rent")}>{t('home_translations:Rent')}</ToggleButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <ToggleButton  type="radio" name="deal_type" id="type_plot" variant="outline-primary" className="btn_radio_1" checked={state.checked === "plot"?"true":""} onChange={(e) => setChecked("plot")}>{t('home_translations:Plot')}</ToggleButton>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <div className="search_card">
                                    <Form>
                                        <Row>
                                            <Col xl lg={4} md={5} xs={5}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('home_translations:City')}</Form.Label>
                                                    <Form.Select  name="city" onChange={inputsHandler} value={inputField.city}>
                                                        <option>Select City</option>
                                                        { 
                                                            cities.map((city, index)=>{  
                                                                return(
                                                                        <option value={city.slug} key={`city-${index}`}>{city.name}</option> 
                                                                )
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xl lg={8} md={7} xs={7}>
                                                <Form.Group className="form-group form-suggestion-wrap">
                                                    <Form.Label>{t('home_translations:Location')}</Form.Label>
                                                    <div className="loader_wrap">
                                                        <Form.Control type="text" autocomplete="off" name="location" value={inputField.location} onChange={(e)=>{e.persist();handleSearchString(e);handleSearchChange(e)}} placeholder={t('home_translations:LocationPlaceholder')}/>
                                                        {state.searching && <Loader type="Button"></Loader>}
                                                    </div>
                                                        <div className="form-suggestion">
                                                    {
                                                        (state.searchResults && state.searchResults.length > 0 ) && (
                                                            state.searchResults.map((searchResult,i)=>{
                                                                return(
                                                                        <div className="item">
                                                                            <button onClick={()=>{selectLocation(searchResult.name)}}>
                                                                                <div className="title">
                                                                                    <p><span>{searchResult.name}</span></p>
                                                                                </div>
                                                                                {/* <div className="address">
                                                                                    <p>
                                                                                        <span>
                                                                                            
                                                                                            DHA Defence, Lahore, Punjab
                                                                                        </span>
                                                                                    </p>
                                                                                </div> */}
                                                                            </button>
                                                                        </div>
                                                                )
                                                            })
                                                            )
                                                        }
                                                        </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xl lg={6} md={12} >
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('home_translations:PropetyType')}</Form.Label>
                                                    <Form.Select name="propertyType" onChange={inputsHandler} value={inputField.propertyType}>
                                                        <option>Select Type</option>
                                                            {
                                                                property_types.map((parent_type, index)=>{
                                                                    if(!(inputField.ActiveTab === 'rent' && parent_type.slug == 'plots'))
                                                                    {
                                                                        if(!(inputField.ActiveTab === 'plot' && parent_type.slug == 'homes')){
                                                                            return parent_type.child_property_type.length > 0 ?
                                                                                (
                                                                                    // <optgroup label={parent_type.title} key={`parent-type-${index}`}>
                                                                                        parent_type.child_property_type.map((child_type,i)=>{
                                                                                            if(inputField.ActiveTab === 'rent' && (child_type.slug === 'upper-portion' || child_type.slug === 'lower-portion'))
                                                                                                {
                                                                                                    return	(
                                                                                                        <>
                                                                                                            {/* {i === 0 && (<option key={`double-parent-type-${index}`} value={parent_type.slug} >{parent_type.title}</option>)} */}
                                                                                                            <option value={child_type.slug} key={`child-type-${i}-${index}`}>{child_type.title}</option>
                                                                                                        </>
                                                                                                    )
                                                                                                }else if(child_type.slug !== 'upper-portion' && child_type.slug !== 'lower-portion'){
                                                                                                    if(!(inputField.ActiveTab === 'sale' && child_type.slug==='rooms' && parent_type.slug === 'homes')){
                                                                                                        return	(
                                                                                                            <>
                                                                                                                {/* {i === 0 && (<option key={`double-parent-type-${index}`} value={parent_type.slug} >{parent_type.title}</option>)} */}
                                                                                                                <option value={child_type.slug} key={`child-type-${i}-${index}`}>{child_type.title}</option>
                                                                                                            </>
                                                                                                        )
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        
                                                                                    // </optgroup>
                                                                                
                                                                                )
                                                                                : <option value={parent_type.slug}>{parent_type.title}</option>
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} lg>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('home_translations:Price')}</Form.Label>
                                                    <InputGroup className="mb-3">
                                                    <Form.Select placeholder={t('home_translations:Min')} name="MinPrice" onChange={inputsHandler} value={inputField.MinPrice}>
                                                        <option disabled>{t('home_translations:Min')}</option>
                                                        {
                                                            state.min.map((min,i)=>{
                                                            return(<option value={min.value} >{min.key}</option>)
                                                            })
                                                        }
                                                    </Form.Select>

                                                    <Form.Select placeholder={t('home_translations:Max')} name="MaxPrice" onChange={inputsHandler} value={inputField.MaxPrice}>
                                                        <option disabled >{t('home_translations:Max')}</option>
                                                        
                                                        {
                                                            state.max.map((max,i)=>{
                                                                return(<option value={max.value} >{max.key}</option>)
                                                            })
                                                        }
                                                    </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg>
                                                <Form.Group className="form-group">
                                                    <Form.Label>{t('home_translations:Area')}</Form.Label>
                                                    <Form.Select name="Area" onChange={inputsHandler}  value={inputField.Area}>
                                                        <option>{t('home_translations:Any')}</option>
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
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg>
                                            {
                                                inputField.ActiveTab !== 'plot' && (
                                                    <Form.Group className="form-group">
                                                        <Form.Label>{t('home_translations:Bedrooms')}</Form.Label>
                                                        <Form.Select name="Bedrooms" onChange={inputsHandler} value={inputField.Bedrooms}>
                                                            <option>{t('home_translations:Any')}</option>
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
                                                )
                                            }
                                            </Col>
                                            <Col xl="auto" lg="auto">
                                                <div className="btn_wrap">
                                                    <Button type="submit" onClick={searchPropertiesAPI}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                                        {t('home_translations:Submit')}
                                                    </Button>
                                                    <Button type="submit" onClick={searchPropertiesAPI} variant="transparent btn-italic btn-icon-right" className="d-inline-flex d-lg-none" >
                                                        {t('home_translations:MoreOptions')}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
}

export default SearchFilter;