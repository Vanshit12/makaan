import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';
import { Card, Form, Container, Row, Col, Button, ToggleButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Makaan } from '../../request';
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Slider from "react-slick";
import PropertyListCard from '../Common/PropertyListCard';
import AllModal from '../Common/AllModal';
import PropertyRequestForm from '../Common/PropertyRequestForm';
import ImageGallery from 'react-image-gallery';
import NumberFormat from 'react-number-format';
import ReactHtmlParser from 'html-react-parser';

const SingleProperties = (props) => {
    const {
        register,
        handleSubmit,
        formState,
        formState: { errors },
    } = useForm()
    const { t } = useTranslation();
    
    const [state, setState] = useState({
        property_detail: '',
        similar_properties: [],
        propertyImages: 'undefined'
    });
    
    const param = useParams();
    
    /** similar properties slider settings */
    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <Button
          className={"btn btn-icon btn-icon-md slick-next"}
          
          onClick={onClick}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
        </Button>
      );
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <Button
          className={"btn btn-icon btn-icon-md slick-prev"}
          onClick={onClick}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
        </Button>
      );
    }
    const settings3 = {
        dots: false,
        infinite: false,
        autoPlay: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchMove: true,
        centerMode: false,
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
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                }
            }

            
            
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        Makaan.get(`property-detail/${param.id}`)
            .then(res => {
                let property_images = res.data.data.property_images;
                let images = [];
                property_images && property_images.length && property_images.forEach((image) => {
                    images.push({
                        'original': image,
                        'thumbnail': image
                    })
                });
                setState({ ...state, property_detail: res.data.data, similar_properties: res.data.data.similar_properties, propertyImages: images });
            })
    }, [param.id]);
    
    /**
     * contact detail popup
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const [showRequest, setShowRequest] = useState(false);
    const handleCloseWhatsapp = () => setShowWhatsapp(false);
    const handleCloseRequest = () => setShowRequest(false);
    const handleShowWhatsapp = () => {
        setShowWhatsapp(true);
    }
    const handleShowRequest = () => {
        setShowRequest(true);
    }
    
    return (
        <div className="single_property_page">
            <AllModal show={show} handleClose={handleClose} showWhatsapp={showWhatsapp} handleCloseWhatsapp={handleCloseWhatsapp} showRequest={showRequest} handleCloseRequest={handleCloseRequest}/>
            <div className="breadcrums">
                <Container>
                    <Row>
                        <Col xl={12}>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="#">{state.property_detail && state.property_detail.title}</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section className="single_property_section inner-gap-2">
                <Container>
                    <Row>
                        <Col xxl={8} xl={7} lg={7}>
                            <div className="single_property">
                                <div className="thumbnail-slider">
                                    <div className=""></div>
                                    {
                                        state.propertyImages != 'undefined' && (
                                            <ImageGallery items={state.propertyImages} />
                                        )
                                    }
                                </div>
                                <div className="meta-area">
                                    <Row>
                                        <Col>
                                            <div className="meta-title">
                                                <h2>{(state.property_detail && state.property_detail.title) && state.property_detail.title}</h2>
                                                <h4>{(state.property_detail && state.property_detail.address) && state.property_detail.address}</h4>
                                            </div>
                                        </Col>
                                        <Col xl="auto">
                                            <div className="meta-info">
                                                <div className="features">
                                                    <Row>
                                                        {
                                                        (state.property_detail && state.property_detail.bedrooms != 0) &&
                                                            (
                                                                <Col xl="auto" xs="auto">
                                                                    <div className="features-item">
                                                                        <div className="icon">
                                                                            <img src="/assets/images/icons/property-list-card/bed.png" alt=""></img>
                                                                        </div>
                                                                        <div className="text">
                                                                            <p>{`${state.property_detail ? state.property_detail.bedrooms : 'No'} Bedrooms`}</p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        }
                                                        {
                                                        (state.property_detail && state.property_detail.bathrooms != 0) &&
                                                            (
                                                                <Col xl="auto" xs="auto">
                                                                    <div className="features-item">
                                                                        <div className="icon">
                                                                            <img src="/assets/images/icons/property-list-card/bathtub.png" alt=""></img>
                                                                        </div>
                                                                        <div className="text">
                                                                            <p>{`${state.property_detail ? state.property_detail.bathrooms : 'No'} Bathrooms`}</p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        }
                                                        <Col xl="auto" xs="auto">
                                                        {
                                                            (state.property_detail && state.property_detail.area_size > 0) && (
                                                                <OverlayTrigger
                                                                    key="bottom"
                                                                    data-html="true"
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip data-html="true"  id={`tooltip-top`}>
                                                                            {ReactHtmlParser(state.property_detail.area_sizes_title)}
                                                                        </Tooltip>
                                                                        }
                                                                        >
                                                                <div className="features-item">
                                                                    <div className="icon">
                                                                        <img src="/assets/images/icons/property-list-card/square-ruler.png" alt=""></img>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{`${state.property_detail.area_size} ${state.property_detail.unit}` }</p>
                                                                    </div>
                                                                </div>
                                                            </OverlayTrigger>
                                                            )
                                                        }
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                
                            </div>
                        </Col>
                        <Col xxl={4} xl={5} lg={5}>
                            <div className="single_property_right">
                                <div className="heading_price">
                                    <h4 className="heading-4">
                                        {
                                            state.property_detail && 
                                            (<NumberFormat
                                              value={state.property_detail.price}
                                              displayType="text"
                                              thousandSeparator={true}
                                              prefix="PKR "
                                              isNumericString={false}
                                              fixedDecimalScale={false}
                                            />)
                                        }
                                    </h4>
                                </div>
                                <div className="contact">
                                    <Row>
                                       <Col>
                                          
                                            <Button variant="primary" className="w-100" onClick={handleShow}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                                Call
                                            </Button>
                                            
                                       </Col>
                                       <Col>
                                            <Button variant="primary" className="w-100" onClick={handleShowWhatsapp}>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" color="currentColor">
                                                    <g>
                                                        <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M1,12.6c0-0.4,0-0.8,0-1.2c0-0.1,0-0.2,0-0.3   c0-0.8,0.2-1.5,0.4-2.3C2,7.2,2.8,5.7,4.1,4.4c1.7-1.7,3.7-2.8,6-3.2c0.4-0.1,0.8-0.1,1.3-0.2c0.4,0,0.9,0,1.3,0   c0.3,0,0.6,0.1,0.8,0.1c2.2,0.3,4.1,1.2,5.8,2.7c1.9,1.7,3.1,3.8,3.6,6.4c0.1,0.4,0.1,0.8,0.2,1.2c0,0.4,0,0.9,0,1.3   c0,0.1,0,0.2,0,0.2c-0.1,1.6-0.6,3-1.3,4.4c-1.1,2.1-2.8,3.6-4.9,4.6c-0.9,0.5-1.9,0.8-3,0.9c-0.4,0.1-0.8,0.1-1.1,0.2   c-0.4,0-0.9,0-1.3,0c-0.1,0-0.1,0-0.2,0c-1.6-0.1-3.1-0.6-4.5-1.4c-0.1-0.1-0.3-0.1-0.4,0c-1.3,0.4-2.7,0.7-4,1.1   c-0.3,0.1-0.6,0-0.8-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0.4-1.3,0.7-2.7,1.1-4c0-0.2,0-0.3,0-0.4c-0.6-1.1-1-2.3-1.2-3.6   C1.1,13.4,1.1,13,1,12.6z M3,21c0.1,0,0.2,0,0.2,0c1-0.3,2-0.5,3-0.8c0.3-0.1,0.5,0,0.8,0.1c0.6,0.3,1.3,0.7,1.9,0.9   c1.6,0.6,3.3,0.7,5,0.3c1.8-0.4,3.4-1.2,4.7-2.5c2.4-2.3,3.3-5.1,2.9-8.3c-0.3-2.1-1.2-3.9-2.7-5.4c-2.4-2.4-5.4-3.3-8.8-2.7   C7.7,3,5.8,4.2,4.3,6.2c-1.6,2.1-2.2,4.4-1.9,7C2.6,14.5,3,15.8,3.7,17c0.2,0.3,0.2,0.5,0.1,0.8c-0.3,1-0.5,2-0.8,3   C3,20.9,3,20.9,3,21z"/>
                                                        <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M14.3,18c-1.8,0-3.2-0.7-4.6-1.6c-1.4-1-2.5-2.4-3.1-4   c-0.5-1.2-0.7-2.5-0.4-3.7c0.2-1,0.8-1.8,1.8-2.4C8.5,5.9,9.2,6,9.7,6.4c0.4,0.4,0.9,0.8,1.3,1.3c0.7,0.7,0.6,1.7-0.2,2.3   c-0.1,0.1-0.3,0.2-0.5,0.3c0,0-0.1,0.1-0.1,0.2c0.2,0.8,0.4,1.5,0.9,2.1c0.6,0.7,1.4,1,2.2,1.2c0.3,0.1,0.4,0,0.5-0.2   c0.2-0.4,0.5-0.7,0.9-0.9c0.5-0.2,1-0.2,1.4,0.2c0.5,0.5,1,0.9,1.5,1.5c0.4,0.4,0.4,1.1,0.1,1.7c-0.6,1.1-1.6,1.6-2.7,1.8   C14.7,17.9,14.4,17.9,14.3,18z M7.4,9.7c0,1.1,0.3,2,0.8,2.9c0.8,1.4,1.8,2.4,3.2,3.2c1,0.5,2,0.9,3.2,0.8c0.8-0.1,1.5-0.3,2-1.1   c0.1-0.2,0.1-0.3,0-0.4c-0.3-0.3-0.7-0.7-1-1c-0.2-0.2-0.3-0.2-0.4,0c-0.2,0.3-0.4,0.5-0.5,0.8c-0.2,0.3-0.4,0.4-0.8,0.3   c-0.3-0.1-0.7-0.1-1-0.2c-1.1-0.3-2.2-0.9-2.9-1.8c-0.6-0.9-1-1.8-1.1-2.9c-0.1-0.4,0.1-0.7,0.5-1C9.4,9.2,9.6,9.1,9.8,9   c0.2-0.2,0.2-0.2,0-0.4C9.6,8.3,9.4,8,9.1,7.8c-0.5-0.5-0.6-0.5-1.1,0c0,0,0,0,0,0C7.5,8.4,7.4,9.1,7.4,9.7z"/>
                                                    </g>
                                                </svg>
                                                WhatsApp
                                            </Button>
                                       </Col>
                                    </Row>
                                </div>
                                <Card className="contact-card">
                                    <Card.Body>
                                        <PropertyRequestForm/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        
                        <Col xxl={8} xl={7}>
                            <div className="single_property top-space">
                                <div className="single_property_detail">
                                    <div className="card-border">
                                        <div className="card-border-header">
                                            <h3>Details</h3>
                                        </div>
                                        <div className="card-border-body">
                                            <div className="strip_list">
                                                <Row>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Property Id</p>
                                                            <p>{(state.property_detail && state.property_detail.property_unique_id) && state.property_detail.property_unique_id}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Type</p>
                                                            <p>{(state.property_detail && state.property_detail.parent_type) && state.property_detail.parent_type.title}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Area</p>
                                                            <p>{state.property_detail && (`${state.property_detail.rough_area_size}`) }</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Price</p>
                                                            <p>
                                                                {
                                                                    state.property_detail && 
                                                                    (<NumberFormat
                                                                      value={state.property_detail.price}
                                                                      displayType="text"
                                                                      thousandSeparator={true}
                                                                      prefix="PKR "
                                                                      isNumericString={false}
                                                                      fixedDecimalScale={false}
                                                                    />)
                                                                }
                                                              </p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Purpose</p>
                                                            <p>For {(state.property_detail && state.property_detail.property_purpose) && state.property_detail.property_purpose}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Location</p>
                                                            <p>{(state.property_detail && state.property_detail.address) && state.property_detail.address}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Bedroom(s)</p>
                                                            <p>{(state.property_detail && state.property_detail.bedrooms != 0) ? state.property_detail.bedrooms : '-'}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Bath(s)</p>
                                                            <p>{(state.property_detail && state.property_detail.bathrooms != 0) ? state.property_detail.bathrooms : '-'}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6}>
                                                        <div className="strip_list_item">
                                                            <p className="label">Added</p>
                                                            <p>{(state.property_detail && state.property_detail.createdAtForHuman) && state.property_detail.createdAtForHuman}</p>
                                                        </div>
                                                    </Col>                                                    
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-border">
                                        <div className="card-border-header">
                                            <h3>Description</h3>
                                        </div>
                                        <div className="card-border-body">
                                            <p>{(state.property_detail && state.property_detail.description) && state.property_detail.description}</p>
                                        </div>
                                    </div>
                                    <div className="card-border features_card">
                                        <div className="card-border-header">
                                            <h3>Features</h3>
                                        </div>
                                        <div className="card-border-body">
                                            <div className="strip_list">
                                                <Row>
                                                    <Col xl={12}>
                                                        <div className="strip_list_item align-items-center">
                                                            {/* <p className="label">Main Features</p> */}
                                                            
                                                            <div className="strip_list_data">
                                                                <Row>
                                                                {
                                                                    state.property_detail && 
                                                                    (
                                                                        state.property_detail.features.map((feature,index)=>{
                                                                            return (<Col xl={4} lg={4} md={4}>
                                                                                <div className="features-item horizontal">
                                                                                    <div className="icon">
                                                                                        <img src={feature.feature_image ? feature.feature_image.original_url : '../assets/images'} alt=""></img>
                                                                                    </div>
                                                                                    <div className="text">
                                                                                        <p>{feature.name}: {feature.value}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>)
                                                                        })
                                                                    )
                                                                }
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={4} xl={5}>
                        </Col>
                        
                    </Row>
                    
                </Container>
                {
                    state.similar_properties.length > 0 &&
                    (
                    <section className="similar_properties">
                        <Container>
                            <Row>
                                <Col xl={12}>
                                    <div className="section-title">
                                        <h2 className="heading-2">Similar Properties</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className="slider">
                            <Slider {...settings3}>
                                { 
                                    state.similar_properties.map((property, index)=>{
                                        return(
                                            <div className="slider-item" key={`similar-${index}`}>
                                                <PropertyListCard handleShow={handleShow} handleShowWhatsapp={handleShowWhatsapp} handleShowRequest={handleShowRequest} property={property} layout="vertical" Cardtype="similar"></PropertyListCard>
                                            </div>
                                        )
                                    })
                                }
                            </Slider> 
                        </div> 
                    </section>
                    )
                }
                
            </section>
            {/* <AppSection></AppSection> */}
            <WhatsAppSection></WhatsAppSection>
        </div>
    );
}
export default SingleProperties;