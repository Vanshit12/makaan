import React, {useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, ListGroup} from 'react-bootstrap';
import WhatsAppSection from '../Common/WhatsAppSection';

const Pricing = (props) => {
    

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
            <div className="jobs-page">
                <section className="inner-gap">
                	<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">Apply Jobs</h2>
	        					</div>
        					</Col>
        				</Row>
        				<Row>
        					<Col xl={12}>
        						<Card className="job-card">
        							<Card.Body>
										<div className="description">
											<p>We’re bringing trust and human back to real estate by enabling transparency and sound advice in every step of business. Through first-ever managed marketplace model in Pakistan, we are empowering people to take more control over their real estate wealth journeys. If you are looking for a place that provides great work culture, helps people, grows your career, then you’ll love MakaanGuide.com</p>
											<p>Please email your resume to <a href="mailto:makaanguideco@gmail.com" target="_blank">makaanguideco@gmail.com</a> with position of interest in subject line.</p>
											<p>We are always looking for rock star:</p>
										</div>
        								<ListGroup as="ul" className="meta-description">
										  	<ListGroup.Item as="li">General Managers</ListGroup.Item>
										  	<ListGroup.Item as="li">Operation Managers/Interns</ListGroup.Item>
										  	<ListGroup.Item as="li">Customer Support Associates</ListGroup.Item>
										  	<ListGroup.Item as="li">Relationship Managers</ListGroup.Item>
										  	<ListGroup.Item as="li">Property Advisors</ListGroup.Item>
										  	<ListGroup.Item as="li">Software Engineers/Interns</ListGroup.Item>
										  	<ListGroup.Item as="li">Social Media Managers/Interns</ListGroup.Item>
										  	<ListGroup.Item as="li">Digital Marketing/Interns</ListGroup.Item>
										  	<ListGroup.Item as="li">Structural Engineers/Interns</ListGroup.Item>
										  	<ListGroup.Item as="li">Architects/Inters</ListGroup.Item>
										  	<ListGroup.Item as="li">Contractors</ListGroup.Item>
										  	<ListGroup.Item as="li">Civil Engineers</ListGroup.Item>
										  	<ListGroup.Item as="li">MEP Engineers</ListGroup.Item>
										</ListGroup>
        							</Card.Body>
        							<Card.Footer>
        								<a href="mailto:makaanguideco@gmail.com" target="_blank" className="btn btn-primary">Apply Job</a>
        							</Card.Footer>
        						</Card>
        					</Col>
        				</Row>
    				</Container>
                </section>
                <WhatsAppSection></WhatsAppSection>
            </div>
        );
}

export default Pricing;