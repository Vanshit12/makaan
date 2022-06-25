import React, {useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge} from 'react-bootstrap';
import WhatsAppSection from '../Common/WhatsAppSection';
import { useTranslation } from 'react-i18next';
import Loader from '../Common/Loader';
import {Makaan} from '../../request';


const Maps = (props) => {
    
	const { t } = useTranslation();
    
    const [state, setState] = useState({
        maps: undefined,
    });

    useEffect(() => {
		window.scrollTo(0, 0);
        Makaan.post(`/map-list`)
            .then(res => {
                setState({ ...state, maps: res.data.data});
            })
    },[]);

    return (
            <div className="pricing-page">
                <section className="inner-gap">
                	<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">Maps</h2>
	        					</div>
        					</Col>
        				</Row>
        				<Row className="mt-4">
							{
								state.maps != undefined ? (
									state.maps.length > 0 ? (
										state.maps.map((map, i)=>{
											return (
												<Col xl={12}>
													<Card className="property-card pricing-card">
														<Badge bg="primary">
															<span>{map.heading}</span>
														</Badge>
														<Card.Body>
															<img src={map.map_image} alt=""></img>
														</Card.Body>
													</Card>
												</Col>
											)
										})
									) :  <div class="col-12"><div class="no-data-message"><div className="wrap">No Map found</div></div></div>
								) : <Loader width="110px" type="Section"></Loader>
							}
        					
        				</Row>
    				</Container>
                </section>
                <WhatsAppSection></WhatsAppSection>
            </div>
        );
}

export default Maps;