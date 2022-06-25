import React from 'react';
import { Card, Row, Col, Button, OverlayTrigger, Tooltip, Badge} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import NumberFormat from 'react-number-format';

const PropertyCard = (props) => {

        return (
            <Card className={`property-list-card ${props.layout} ${props.Cardtype}`}>
                <div className="image-wrap">
                {
                    props.property.tag && (
                        <Badge bg="danger">
                            <span>{props.property.tag}</span>
                        </Badge>
                    )
                }
                    <Link className="overlay-link" to={`/property/${props.property.uuid}`}>
                    <Card.Img variant="top" src={props.property.property_image  ?  props.property.property_image : "/assets/images/property/property-1.png"} />
                    </Link>
                    {
                        props.property.owner.is_agency === 1 &&
                        (
                            <div className="agency-img">
                                <img src={props.property.owner.agency_logo ? props.property.owner.agency_logo : '../../assets/images/logos/agency/40445135-240x180.jpeg'} alt=""></img>
                            </div>
                        )
                    }
                    
                </div>
                <Card.Body>
                        <Link className="overlay-link" to={`/property/${props.property.uuid}`}>
                        <Card.Title>
                        {
                            props.property && 
                            (<NumberFormat
                                value={props.property.price}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="PKR "
                                isNumericString={false}
                                fixedDecimalScale={false}
                            />)
                        }
                        </Card.Title>
                        </Link>
                        <Card.Text> {props.property.address}</Card.Text>
                        <div className="description">
                            <p>{props.property.description.substring(0, 60)}... more</p>
                        </div>

                        <div className="features">
                            <Row>
                                <Col className={props.layout ? ('col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'): ('col-auto')}>
                                    <div className="features-item">
                                        <div className="icon">
                                            <img src="../../assets/images/icons/property-list-card/bed.png" alt=""></img>
                                        </div>
                                        <div className="text text-center">
                                            <p>{props.property.bedrooms} Bedrooms</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col className={props.layout ? ('col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'): ('col-auto')}>
                                    <div className="features-item">
                                        <div className="icon">
                                            <img src="../../assets/images/icons/property-list-card/bathtub.png" alt=""></img>
                                        </div>
                                        <div className="text text-center">
                                            <p>{props.property.bathrooms} Bathrooms</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className={props.layout ? ('col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'): ('col-auto')}>
                                <OverlayTrigger
                                    key="top"
                                    data-html="true"
                                    placement="top"
                                    overlay={
                                        <Tooltip data-html="true"  id={`tooltip-top`}>
                                            {ReactHtmlParser(props.property.rough_area_size)}
                                        </Tooltip>
                                    }
                                >

                                    <div className="features-item">
                                        <div className="icon">
                                            <img src="../../assets/images/icons/property-list-card/square-ruler.png" alt=""></img>
                                        </div>
                                        <div className="text text-center">
                                            <p>{props.property.rough_area_size}</p>
                                        </div>
                                    </div>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                        </div>
                        <div className="actions">
                            <div className="actions_wrap">
                                <div className="btns">     
                                    <Button variant="primary" className="btn-md" onClick={props.handleShowWhatsapp}>
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" color="currentColor">
                                            <g>
                                                <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M1,12.6c0-0.4,0-0.8,0-1.2c0-0.1,0-0.2,0-0.3   c0-0.8,0.2-1.5,0.4-2.3C2,7.2,2.8,5.7,4.1,4.4c1.7-1.7,3.7-2.8,6-3.2c0.4-0.1,0.8-0.1,1.3-0.2c0.4,0,0.9,0,1.3,0   c0.3,0,0.6,0.1,0.8,0.1c2.2,0.3,4.1,1.2,5.8,2.7c1.9,1.7,3.1,3.8,3.6,6.4c0.1,0.4,0.1,0.8,0.2,1.2c0,0.4,0,0.9,0,1.3   c0,0.1,0,0.2,0,0.2c-0.1,1.6-0.6,3-1.3,4.4c-1.1,2.1-2.8,3.6-4.9,4.6c-0.9,0.5-1.9,0.8-3,0.9c-0.4,0.1-0.8,0.1-1.1,0.2   c-0.4,0-0.9,0-1.3,0c-0.1,0-0.1,0-0.2,0c-1.6-0.1-3.1-0.6-4.5-1.4c-0.1-0.1-0.3-0.1-0.4,0c-1.3,0.4-2.7,0.7-4,1.1   c-0.3,0.1-0.6,0-0.8-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0.4-1.3,0.7-2.7,1.1-4c0-0.2,0-0.3,0-0.4c-0.6-1.1-1-2.3-1.2-3.6   C1.1,13.4,1.1,13,1,12.6z M3,21c0.1,0,0.2,0,0.2,0c1-0.3,2-0.5,3-0.8c0.3-0.1,0.5,0,0.8,0.1c0.6,0.3,1.3,0.7,1.9,0.9   c1.6,0.6,3.3,0.7,5,0.3c1.8-0.4,3.4-1.2,4.7-2.5c2.4-2.3,3.3-5.1,2.9-8.3c-0.3-2.1-1.2-3.9-2.7-5.4c-2.4-2.4-5.4-3.3-8.8-2.7   C7.7,3,5.8,4.2,4.3,6.2c-1.6,2.1-2.2,4.4-1.9,7C2.6,14.5,3,15.8,3.7,17c0.2,0.3,0.2,0.5,0.1,0.8c-0.3,1-0.5,2-0.8,3   C3,20.9,3,20.9,3,21z"/>
                                                <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M14.3,18c-1.8,0-3.2-0.7-4.6-1.6c-1.4-1-2.5-2.4-3.1-4   c-0.5-1.2-0.7-2.5-0.4-3.7c0.2-1,0.8-1.8,1.8-2.4C8.5,5.9,9.2,6,9.7,6.4c0.4,0.4,0.9,0.8,1.3,1.3c0.7,0.7,0.6,1.7-0.2,2.3   c-0.1,0.1-0.3,0.2-0.5,0.3c0,0-0.1,0.1-0.1,0.2c0.2,0.8,0.4,1.5,0.9,2.1c0.6,0.7,1.4,1,2.2,1.2c0.3,0.1,0.4,0,0.5-0.2   c0.2-0.4,0.5-0.7,0.9-0.9c0.5-0.2,1-0.2,1.4,0.2c0.5,0.5,1,0.9,1.5,1.5c0.4,0.4,0.4,1.1,0.1,1.7c-0.6,1.1-1.6,1.6-2.7,1.8   C14.7,17.9,14.4,17.9,14.3,18z M7.4,9.7c0,1.1,0.3,2,0.8,2.9c0.8,1.4,1.8,2.4,3.2,3.2c1,0.5,2,0.9,3.2,0.8c0.8-0.1,1.5-0.3,2-1.1   c0.1-0.2,0.1-0.3,0-0.4c-0.3-0.3-0.7-0.7-1-1c-0.2-0.2-0.3-0.2-0.4,0c-0.2,0.3-0.4,0.5-0.5,0.8c-0.2,0.3-0.4,0.4-0.8,0.3   c-0.3-0.1-0.7-0.1-1-0.2c-1.1-0.3-2.2-0.9-2.9-1.8c-0.6-0.9-1-1.8-1.1-2.9c-0.1-0.4,0.1-0.7,0.5-1C9.4,9.2,9.6,9.1,9.8,9   c0.2-0.2,0.2-0.2,0-0.4C9.6,8.3,9.4,8,9.1,7.8c-0.5-0.5-0.6-0.5-1.1,0c0,0,0,0,0,0C7.5,8.4,7.4,9.1,7.4,9.7z"/>
                                            </g>
                                        </svg>
                                    
                                        WhatsApp
                                    </Button>
                                    <Button variant="primary" className="btn-icon btn-icon-md" onClick={props.handleShow}>
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    
                                    </Button>
                                    {/* <Button variant="primary" className="btn-icon btn-icon-md"  onClick={props.handleShowRequest}>
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    
                                    
                                    </Button> */}
                                </div>
                                
                            </div>
                        </div>
                        
                   
                </Card.Body>
                
            </Card>
        
        );
}

export default PropertyCard;
