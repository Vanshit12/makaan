import React, {useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card} from 'react-bootstrap';
import WhatsAppSection from '../Common/WhatsAppSection';
import BlogList from '../Common/BlogList';
import { useTranslation } from 'react-i18next';



const BlogDetail = (props) => {
    
	const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
    <>
            <div className="blog-detail">
        		<div class="blog-header">
            		<Container>
            			<div class="blog-title">
            				<h1>Foreign Transfer Process in DHA If Seller Or Buyer Is Out Of Pakistan</h1>
            			</div>
            			<div class="blog-meta">
            				<ul>
            					<li>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            						23 September, 2022
            					</li>
            					<li>
            						<span className="tag">
        								Tip and Advice
            						</span>
            					</li>
            				</ul>
            			</div>
            			
            		</Container>
        		</div>
        		<div class="blog-featured">
        			<Container>
        				<img src="assets/images/blog/featured.png" alt="featured" className="test-img" />
        			</Container>
    			</div>
    			<Container>
    				<div class="blog-content">
    					<h3>Foreign Transfer (Seller Abroad)</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>SERVICE</th>
                                    <th>TIMELINE</th>
                                    <th>CHARGES</th>
                                    <th>DELIVERY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Foreign Transfer</td>
                                    <td>Varies per case</td>
                                    <td>Depends on the Phase, Size and Plot / Building Type.</td>
                                    <td>Transfer Branch</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>If the Seller is abroad and can not appear for transfer.</p>
                        <br/>

                        <h3>Documents Required</h3>
                        <ul>
                            <li>Request for submission of complete Transfer document set duly attested by Pakistan Emnassy/ Consulate (specimen attached) along with CVT-1, IT-5 Form, NDC Form and site plan form (if required sent to the owner by seller’s representative)</li>
                            <li>Documents are signed by the owner in concerned Embassy / consulate and documents should be attested by the Embassy / consulate.</li>
                            <li>Photocopy of Owner’s CNIC (duly attested).</li>
                            <li>Photocopy of Passport and Visa with exit  and entry stamp(duly attested).</li>
                            <li>Authority Letter for submission of papers on stamp paper worth Rs. 100/-.</li>
                            <li>Fee receipt from consulate general of Pakistan.</li>
                            <li>After submission of documents the same will be verified through QR code & NDC will be submitted by Transfer Branch. After that routine process for NDC is to be pursued.</li>
                            <li>After preparation of NDC, transfer will be carried out in the presence of Authority holder.</li>
                        </ul>
                        <br/>

                        <h3>Procedure</h3>
                        <ul>
                            <li>Authority Holder submits the documents to Customer Services Officer at Customer Care Centre, DHA Office.</li>
                            <li>Customer Service Officer will issue the receipt of the documents.</li>
                            <li>Transfer Branch will verify the transfer documents from concerned Embassy / Consulate and Owner.</li>
                            <li>After receiving the Confirmation Letter from the Embassy / Consulate and individual, Authority Holder will follow procedure mentioned in Regular Transfer Section.</li>
                        </ul>
                        <br/>

	    				<h2>Foreign Transfer (Seller Abroad)</h2>
	    				<p>If the Purchaser is abroad and can not appear for transfer.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>SERVICE</th>
                                    <th>TIMELINE</th>
                                    <th>CHARGES</th>
                                    <th>DELIVERY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Foreign Transfer</td>
                                    <td>On completion of requirements / documentation</td>
                                    <td>Depends on the Phase, Size and Plot / Building Type.</td>
                                    <td>Transfer Branch</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>

                        <h3>Documents Required</h3>
                        <ul>
                            <li>Photocopy of Purchaser’s CNIC (duly attested)</li>
                            <li>Photocopy of passport and visa with exit and entry stamp (duly attested)</li>
                            <li>2 x attested passport size photograph</li>
                            <li>Undertaking on E-Stamp Paper worth Rs.100/- by the Purchaser’s representative</li>
                        </ul>
                        <br/>

                        <h3>Procedure</h3>
                        <ul>
                            <li>As per Regular Transfer.</li>
                        </ul>
                        <br/>
                    </div>
    			</Container>
            </div>
            <BlogList title="Related Blog"></BlogList>
			</>
        );
}

export default BlogDetail;