import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropertyListCard from '../Common/PropertyListCard';
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import {Makaan} from '../../request';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import AllModal from '../Common/AllModal';

const PropertyListing = (props) => {
	const [state,setState] = useState({
		properties: [],
		popular_locations:[],
		last_stage:false,
		location:'',
		type:'',
		show_paginate:false,
		
	});
	const [total,setTotal] = useState(0);
	const navigate = useNavigate();
	const { parent_property_type, city, parent_location, child_location, grand_location } = useParams();

    const handlePageClick = (event) => {
        Makaan.get(`properties?page=${event.selected+1}`)
			.then(res => {
				setState({...state,properties: res.data.data.properties.data});
			})
    };
	let location_properties_endpoint = `properties?page=1&parent_property_type=${parent_property_type}&city=${city}`
	if(parent_location){
		location_properties_endpoint += `&parent_location=${parent_location}`
	}
	if(child_location){
		location_properties_endpoint += `&child_location=${child_location}`
	}
	if(grand_location){
		location_properties_endpoint += `&grand_location=${grand_location}`
	}
	
	const changePropertyType = (type, slug)=>{
		let redirect_endpoint = `${slug}/${city}`
		if(parent_location){
			redirect_endpoint += `/${parent_location}`
		}
		if(child_location){
			redirect_endpoint += `/${child_location}`
		}
		if(grand_location){
			redirect_endpoint += `/${grand_location}`
		}
		navigate(`/${redirect_endpoint}`)
		setState({...state, type : type});
	}

	/**
     * contact detail popup
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const handleCloseWhatsapp = () => setShowWhatsapp(false);
    const handleShowWhatsapp = () => {
        setShowWhatsapp(true);
    }

	const [showRequest, setShowRequest] = useState(false);
    const handleCloseRequest = () => setShowRequest(false);
    const handleShowRequest = () => {
        setShowRequest(true);
    }
	useEffect(() => {
		window.scrollTo(0, 0);
		let endpoints = [
			location_properties_endpoint,
			`locations-list`,
		];
		axios.all(endpoints.map((endpoint,i) => {
			if(i === 1) {
				return Makaan.post(endpoint,{"parent_property_type":parent_property_type,"city":city,"parent_location":parent_location,"child_location":child_location,"grand_location":grand_location,});
			}else{
				return Makaan.get(endpoint);
			}
		})).then(
			(res) => {
				console.log(res[1],'res[1]res[1]res[1]res[1]')
				setTotal(Math.ceil(res[0].data.data.properties.total/2));
				for(var i= 0; i < res[1].data.data.length; i++){
					if(res[1].data.data[i].cities.length > 0 ){
						setState({...state, properties: res[0].data.data.properties.data, popular_locations: res[1].data.data, last_stage:true, location: res[1].data.location, show_paginate:(res[0].data.data.properties.current_page === 1 ? (res[0].data.data.properties.data.length < 12 ? false : true) : true)})
						break;
					}else{
						setState({...state, properties: res[0].data.data.properties.data, popular_locations: res[1].data.data, last_stage:false, location: res[1].data.location, show_paginate:(res[0].data.data.properties.current_page === 1 ? (res[0].data.data.properties.data.length < 12 ? false : true) : true) })
					}
				}				
			}
		);
	},[parent_location,child_location,grand_location,parent_property_type]);
        return (
        <div className="property-listing">
            <AllModal show={show} handleClose={handleClose} showWhatsapp={showWhatsapp} handleCloseWhatsapp={handleCloseWhatsapp} showRequest={showRequest} handleCloseRequest={handleCloseRequest}/>

        	<section className="popular-locations inner-gap">
    			<Container fluid="md">
    				<Row>
    					<Col>
    						<div className="section-title">
        						<h2 className="heading-2">{parent_property_type} in {state.location} </h2>
        					</div>
    					</Col>
    				</Row>
					{
						state.last_stage && 
						(
							<div className="tabs">
								<Tab.Container id="left-tabs-example" defaultActiveKey={parent_property_type}>
								<Row>
									<Col xl={12}>
										<Nav variant="pills" className="flex-row">
											{
												state.popular_locations &&
												(
													state.popular_locations.map((popular_location, i)=>{
														return(
															popular_location.cities.length > 0 &&
															(
																<Nav.Item key={'tab'+i}>
																	<Nav.Link eventKey={popular_location.slug} onClick={()=>{changePropertyType(popular_location.title, popular_location.slug)}}>{popular_location.title}</Nav.Link>
																</Nav.Item>
															)
														)
													})
												)
											}
										</Nav>
									</Col>
									<Col xl={12}>
										<Tab.Content>
											{ 
												state.popular_locations && (
													state.popular_locations.map((popular_location, i)=>{
														return(
															<Tab.Pane key={'pane'+i} eventKey={popular_location.slug}>
																{
																	popular_location.cities.map((cityy,k)=>{
																		return(
																			<Row>
																				<Col xl={3} lg={4} md={4} sm={6} xs={12}>
																					<Link to={`/${parent_property_type ? parent_property_type : '/'+popular_location.slug}${city ? '/'+city : '/'+cityy.slug}${parent_location ? '/'+parent_location : (parent_location ? '/'+cityy.slug : '')}${child_location ? '/'+child_location : '/'+cityy.slug}${grand_location ? '/'+grand_location : (child_location ? '/'+cityy.slug : '')}`} className="btn btn-location">
																						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
																						{cityy.name} ({cityy.properties_count})
																					</Link>
																				</Col>
																			</Row>
																		)
																	})
																}
															</Tab.Pane>
														)
													})
												)
											}
										</Tab.Content>
									</Col>						    
								</Row>
								</Tab.Container>
							</div>
						)

					}
    				
    			</Container>
    		</section>
        	<Container fluid="md">
        		<Row>
        			<Col xl={8} lg={8}>
        				<section className="property-list pt-0">
        					<Row>
        						
        					{ 
								state.properties.map((property, i)=>{  
									return(
									<Col xl={12} lg={12} md={12} sm={6}>
										<PropertyListCard handleShow={handleShow} handleShowWhatsapp={handleShowWhatsapp} handleShowRequest={handleShowRequest} key={`property-${i}`} property={property} layout="horizontal" Cardtype="normal"></PropertyListCard>
									</Col>
									)
								})
							}
        					</Row>
        				</section>
						{
							state.show_paginate && 
							(
								<Row>
									<ReactPaginate
										breakLabel="..."
										nextLabel="next >"
										pageClassName="page-item"
										pageLinkClassName="page-link"
										previousClassName="page-item"
										previousLinkClassName="page-link"
										nextClassName="page-item"
										nextLinkClassName="page-link"
										onPageChange={(e) =>handlePageClick(e)}
										pageRangeDisplayed={12}
										pageCount={total}
										previousLabel="< previous"
										renderOnZeroPageCount={null}
										breakClassName="page-item"
										containerClassName="pagination"
										activeClassName="active"
									/>
								</Row>
							)
						}
        			</Col>
        			<Col xl={4} lg={4}> 
        				<section className="google-ads pt-0">
        					<Row>
        						<Col xl={12} lg={12} md={6} sm={6}>
        							<img src="/assets/images/ads/ad1.png" alt="Ad"></img>
        						</Col>	
        						<Col xl={12} lg={12} md={6} sm={6}>
        							<img src="/assets/images/ads/ad1.png" alt="Ad"></img>
        						</Col>	
        					</Row>
        				</section>
        			</Col>
        		</Row>
				
        	</Container>
        	{/* <AppSection></AppSection> */}
        	<WhatsAppSection></WhatsAppSection>
        </div>
        );
}

export default PropertyListing;