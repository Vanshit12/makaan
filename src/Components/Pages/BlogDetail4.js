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
            				<h1>Issuance of Allocation/Intimation/Allotment/Transfer Letter</h1>
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
    					<h3>Verification of Property</h3>
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
                                    <td>Issuance of Allotment Letter</td>
                                    <td>25 working days</td>
                                    <td>Nil</td>
                                    <td>Transfer Branch</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>

                        <h3>Documents Required</h3>
                        <ul>
                            <li>Application to DHA Secretary or Director Transfer & Record for the issuance of Allotment Letter.</li>
                            <li>Original payment slip of latest installment.</li>
                            <li>Photo Copy of Computerized National Identity Card.</li>
                            <li>2 x recent Passport size photographs (blue background).</li>
                            <li>Photo Copy of Intimation Letter.</li>
                        </ul>
	    				<p>In case of Company / Trust / Firm / Partnership, Kindly refer to set of instructions available at Reception / Website Transfer Form section.</p>

                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Customer submits the required documents to the Customer Services Officer at Customer Care Center, DHA Office.</li>
                            <li>If the documents are complete, the Customer Service Officer after endorsing will give a receipt to the customer.</li>
                            <li>Customer will receive the allotment letter at the given date.</li>
                        </ul>

                        <br/>
	    				<h3>Note</h3>
                        <ul>
                            <li>Urgent Transfer / Intimation / Allocation / Allotment letter and Allocation against land affidavit can be obtained after the approval of Director Transfer & Record on affidavit of Rs 100/- Stamp Paper. <Link to="">(Download Specimen)</Link></li>
                            <li>Bring Original CNIC, Allocation Letter and Intimation Letter to receive Allotment Letter.</li>
                            <li>Allotment Letter will only be prepared after deposit of Associate Membership form along with registration fee if already not deposited.</li>
                            <li>Urgent Transfer / Allotment letter fee (all phases) is Rs 15,000/-</li>
                            <li>Urgent allocation letter against land fee is Rs 40,000/</li>
                            <li>“Members are required to intimate DHA Lahore about change in address / cell phone number / landline immediately on occurrence, failing which can cause inconvenience in correspondence and also request for waiver of surcharge on development charges will not be entertained.”</li>
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