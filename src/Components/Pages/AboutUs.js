import React, {useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card} from 'react-bootstrap';
import WhatsAppSection from '../Common/WhatsAppSection';


const AboutUs = (props) => {
    

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
            <div className="about-us-page">
                <section className="hero-header pb-0 pt-0">
        			<img src="assets/images/home/hero-header-bg.png" alt="Banner Image" className="bg-image"/>
        			<div className="hero-content">
        				<Container>
        					<h1>About Us</h1>
	        				<p>MakaanGuide.com is Pakistan’s first full-service and managed real estate marketplace to buy, sell, rent, market and construct properties.</p>
        				</Container>
        			</div>
        		</section>
        		<section className="inner-gap how-started">
        				<Container>
        					<Row className="align-items-center">
        						<Col xl={7} lg={6}>
        							<div className="content">
        								<div class="wrap">
	        								<p>MakaanGuide.com is a Lahore based technology company with a focus on the real estate marketplace,  real estate development, and allied services. MakaanGuide.com is a full-service managed and hybrid marketplace.</p>
											<p>MakaanGuide.com's vision is to deliver trustworthy deals and savings by leveraging the best combination of technology and human excellence.</p>
										</div>
        							</div>
        						</Col>
        						<Col xl={5} lg={6}> 
        							<div className="makaan-guide">
        								<div class="logo-wrap">
        									<div class="wrap">
        										<img src="assets/images/logos/makaan-logo.svg" alt=""/>
        									</div>
        								</div>
        							</div>
        						</Col>
        					</Row>
        				</Container>
        		</section>
        		<section className="about-features">
        			
        		</section>
        		<WhatsAppSection></WhatsAppSection>
            </div>
        );
}

export default AboutUs;