import React, { useEffect, useState } from 'react';
import PropertyCard from '../Common/PropertyCard';
import TestimonialCard from '../Common/TestimonialCard';
import SearchFilter from '../Common/SearchFilter';
import BlogCard from '../Common/BlogCard';
import axios from "axios";
import { Link  } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Tab, Nav} from 'react-bootstrap';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import Banner from '../Common/Banner';
import BlogList from '../Common/BlogList';
import {Makaan} from '../../request';
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
		const [state,setState] = useState({
            deal_type: '',
			testimonials:[],
			feature_properties:[],
			locations:[],
			cities:[],
			property_types:[],
			popular_locations:[],
			parent_type:null,
			agents:[],
			feature_property_images:[],
			banners:[]
        });
		
    	useEffect(() => {
			window.scrollTo(0, 0);
			let endpoints = [
				`property-type`,
				`testimonials`,
				`location`,
				`locations-list`,
				`agents-list`,
				`cities-list`,
				`feature-property-images`,
			];
			axios.all(endpoints.map((endpoint,i) => {
				if(i === 0) {
					return Makaan.get(endpoint);
				}
				if(i === 3) {
					return Makaan.post(endpoint);
				}
				return Makaan.get(endpoint);
			})).then(
				(res) => {
					setState({...state, property_types: res[0].data.data, testimonials: res[1].data.data,locations:res[2].data.data,popular_locations:res[3].data.data,agents:res[4].data.data,cities:res[5].data.data, feature_property_images:res[6].data.data })
				}
			);
		},[]);
		const { t } = useTranslation();
    	const bodytext1 = "Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
    	const bodytext2 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.";
    	const bodytext3 = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.";
    	const bodytext4 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words..";

    	const blogImage1 = "assets/images/blog/blog-1.png";
    	const blogImage2 = "assets/images/blog/blog-2.png";
    	const blogImage3 = "assets/images/blog/blog-3.png";
    	const blogImage4 = "assets/images/blog/blog-4.png";
    	const blogTile1 = "Phenomenal Addition to Bahria Town Rawalpindi’s Real Estate Market";
    	const blogTile2 = "9 Easy-to-Ambitious DIY Projects to Improve Your Home";
    	const blogTile3 = "Looking for a New Place? Use This Time to Create Your Wishlist";
    	const blogTile4 = "Does Your Home Make You Happy?";
    	
    	const blogs = [
						{propertyImage:blogImage1, propertyTile:blogTile1, bodytext: bodytext1},
    					{propertyImage:blogImage2, propertyTile:blogTile2, bodytext: bodytext2},
    					{propertyImage:blogImage3, propertyTile:blogTile3, bodytext: bodytext3},
    					{propertyImage:blogImage4, propertyTile:blogTile4, bodytext: bodytext4}
					];
    	
    	const feature_properties = [
			{
				badge:t("TOP DEALS ON APARTMENTS"),
				image:state.feature_property_images ? state.feature_property_images.flat_properties : '',
				description:"Check out the limited-time and best-priced deals on apartments here",
				link:'top-deals-on-apartments',
				title:"600 Sqft Apartment",
				imageCount:"3",
				dummyImage:"assets/images/property/property-1.png"
			},
			{
				badge:t("TOP DEALS ON HOUSES"),
				image:state.feature_property_images ? state.feature_property_images.house_properties : '',
				description:"Check out the limited-time and best-priced deals on houses here",
				link:'top-deals-on-houses',
				title:"600 Sqft Apartment",
				imageCount:"2",
				dummyImage:"assets/images/property/property-2.png"
			},
			{
				badge:t("TOP DEALS ON PLOTS"),
				image:state.feature_property_images ? state.feature_property_images.plot_properties : '',
				description:"Check out the limited-time and best-priced deals on plots here",
				link:'top-deals-on-plots',
				title:"600 Sqft Apartment",
				imageCount:"1",
				dummyImage:"assets/images/property/property-3.png"
			},
			{
				badge:t("TOP RENTAL PROPERTY DEALS"),
				image: state.feature_property_images ? state.feature_property_images.rent_properties : '',
				description:"Check out the limited-time and best-priced deals on rental property here",
				link:'top-rental-property-deals',
				title:"600 Sqft Apartment",
				imageCount:"3",
				dummyImage:"assets/images/property/property-4.png"
			},
			{
				badge:t("TOP DEALS ON FILES"),
				image:state.feature_property_images ? state.feature_property_images.file_properties : '',
				description:"Check out the limited-time and best-priced deals on files here",
				link:'top-deals-on-files',
				title:"600 Sqft Apartment",
				imageCount:"3",
				dummyImage:"assets/images/property/property-3.png"
			}
		];

		function SampleNextArrow(props) {
	      const {onClick } = props;
	      return (
	        <Button className={"btn-transparent btn btn-icon btn-icon-md slick-next"} onClick={onClick} >
	        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
	        </Button>
	      );
	    }

	    function SamplePrevArrow(props) {
	      const {onClick } = props;
	      return (
	        <Button
	          className={"btn-transparent btn btn-icon btn-icon-md slick-prev"}
	          onClick={onClick}
	        >
	        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
	        </Button>
	      );
	    }

    	const settings = {
	      	dots: false,
	      	infinite: false,
	      	speed: 500,
	      	slidesToShow: 4,
	      	slidesToScroll: 1,
	      	initialSlide: 0,
	      	touchMove: true,
	      	autoplay: false,
	      	nextArrow: <SampleNextArrow />,
	        prevArrow: <SamplePrevArrow />,
	        responsive: [
	            {
	                breakpoint: 1600,
	                settings: {
	                    slidesToShow: 4,
	                }
	            },
	            {
	                breakpoint: 1200,
	                settings: {
	                    slidesToShow: 3,
	                }
	            },
	            {
	                breakpoint: 980,
	                settings: {
	                    slidesToShow: 2,
	                }
	            },
	            {
	                breakpoint: 620,
	                settings: {
	                    slidesToShow: 2,
	                }
	            },
	            {
	                breakpoint: 575,
	                settings: {
	                    slidesToShow: 1,
	                }
	            }
	            
	            // You can unslick at a given breakpoint now by adding:
	            // settings: "unslick"
	            // instead of a settings object
	        ]
	    };
	    const settings2 = {
	      	dots: true,
	      	infinite: false,
	      	speed: 500,
	      	slidesToShow: 6,
	      	slidesToScroll: 1,
	      	touchMove: true,
	      	nextArrow: <SampleNextArrow />,
	        prevArrow: <SamplePrevArrow />,
	        responsive: [
	            {
	                breakpoint: 1200,
	                settings: {
	                    slidesToShow: 5,
	                }
	            },
	            {
	                breakpoint: 980,
	                settings: {
	                    slidesToShow: 4,
	                }
	            },
	            {
	                breakpoint: 620,
	                settings: {
	                    slidesToShow: 3,
	                }
	            },
	            {
	                breakpoint: 575,
	                settings: {
	                    slidesToShow: 2,
	                }
	            }
	            
	            // You can unslick at a given breakpoint now by adding:
	            // settings: "unslick"
	            // instead of a settings object
	        ]
	    };

    	return (
            <div className="Home">
            	
        		<section className="hero-header pb-0 pt-0">
        			<Banner/>
        		</section>
				<SearchFilter cities={state.cities} property_types={state.property_types}/>
        		{/* <section className="feature-properties">
        			<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">{t('home_translations:FeaturedProperty')}</h2>
	        					</div>
        					</Col>
        				</Row>
        				<Row>
    						{ 
    							feature_properties.map((property, index)=>{  
									return(
			        					<Col xl={6} lg={6} md={6} sm={12} xs={12} key={`featured-${index}`}>
											<PropertyCard title={property.title} image={property.image} dummyImage={property.dummyImage} imagesShow={property.imageCount} badge={property.badge} text={property.description} link={property.link}></PropertyCard> 
			        					</Col>
									)
								})
							}
        				</Row>
        			</Container>
        		</section> */}
        		<section className="youtube-channel bg inner-gap">
        			<Container>
        				<Row className="align-items-center">
        					<Col xl={8} lg={7}>
	        					<div className="youtube-channel-video">
								<iframe width="736" height="413" src="https://www.youtube.com/embed/rTuT1ZOfq_8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	        					</div>
        					</Col>
        					<Col xl={4} lg={5}>
        						<div className="youtube-channel-content">
        							<h3>Check Out MakaanGuide.com YouTube Channel</h3>
	        						<a rel="stylesheet" target="_blank" href="https://www.youtube.com/channel/UCUoZ4e76orx23NImhCnzkxA" className="btn  btn-subscribe">
	        							<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 6.5L0.749999 12.9952L0.75 0.00480889L12 6.5Z" fill="currentColor"/>
										</svg>
	        							{t('home_translations:Subscribe')}
	        						</a>
        						</div>
        					</Col>
        				</Row>
        			</Container>
        		</section>
        		{/* <section className="agency-partners inner-gap">
        			<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">{t('home_translations:AgencyPartners')}</h2>
	        					</div>
        					</Col>
        				</Row>
        			</Container>
        			{
        				state.agents.length > 0 &&
        			(<div className="slider">

				        <Slider {...settings2}>
							{ 
    							state.agents.map((agent, index)=>{  
									return(
			        					<div className="slider-item" key={`agency-${index}`}>
											<Card className="logo-card">
												<div className="image-wrap">
													<div className="img">
														<img src={agent.agency_logo ? agent.agency_logo : "assets/images/logos/agency-1.png"} alt=""></img>
													</div>
												</div>
											</Card>
										</div>
									)
								})
							}
							
				        </Slider>
				    </div>)
        			}
				</section>
        		<section className="testimonial bg inner-gap">
        			<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">{t('home_translations:AboutUsHeading')}</h2>
	        						<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
	        					</div>
        					</Col>
        				</Row>
        			</Container>
        			{

	        			state.testimonials.length > 0 &&
	        			(<div className="slider">
					        <Slider {...settings}>
								{state.testimonials.map((testimonial, index) => {
	                            	return(
		                            	<div className="slider-item" key={`testimonial-${index}`}>
		                            		<TestimonialCard testimonial={testimonial}>
		                            		</TestimonialCard>
		                            	</div>
	                            	)
		                        })
		                        }
								
					        </Slider>
					    </div>)
        			}
        		</section>
        		<section className="popular-locations inner-gap">
        			<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">{t('home_translations:PopularLocation')}</h2>
	        					</div>
        					</Col>
        				</Row>
        				<div className="tabs">
							<Tab.Container id="left-tabs-example" defaultActiveKey="initial">
							  <Row>
							    <Col xl={12}>
							      	<Nav variant="pills" className="flex-row">
							      	{ 
						        		state.popular_locations.map((popular_location, i)=>{
						        			return(
					        					<Nav.Item key={'tab'+i}>
										          	<Nav.Link eventKey={i === 0 ? 'initial' : popular_location.id}>{popular_location.title}</Nav.Link>
										        </Nav.Item>
											)
						        		})
						        	}
							      	</Nav>
							    </Col>
							    <Col xl={12}>
							      <Tab.Content>
								        	{ 
								        		state.popular_locations.map((popular_location, i)=>{
								        			return(
												        <Tab.Pane key={'pane'+i} eventKey={i === 0 ? 'initial' :popular_location.id}>
											        					<Row>
												        	{
												        		popular_location.cities.map((city,k)=>{
												        			return(
												        					<Col xl={3} lg={3} md={4} xs={6}>
																				<Link to={`/${popular_location.slug}/${city.slug}`} className="btn btn-location">
																					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
																					{city.name} ({city.properties_count})
																				</Link>
												        					</Col>
											        				)
												        		})
												        	}
															        	</Row>
												        </Tab.Pane>
													)
								        		})
								        	}
							      </Tab.Content>
							    </Col>
							  </Row>
							</Tab.Container>
    					</div>
        			</Container>
				</section> */}
        		<BlogList title="Recent from the Blog"></BlogList>
                <WhatsAppSection></WhatsAppSection>
            </div>
        );
}

export default Home;