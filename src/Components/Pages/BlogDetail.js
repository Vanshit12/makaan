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
            				<h1>Blog Construction and Building Control Process in DHA</h1>
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
    					<h3>Site Plan Issuance</h3>
                        <p>Site plan is a certificate that indicates area and the dimensions of the plot, duly issued by DHA Lahore office.</p>
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
                                    <td>Site Plan Issuance</td>
                                    <td>Varies case to case</td>
                                    <td>Varies case to case</td>
                                    <td>Building Control Branch</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>

                        <h3>Documents Required</h3>
                        <ul>
                            <li>2 x Site Plan Application Forms.</li>
                            <li>1 x Photocopy of Allotment / Transfer Letter.</li>
                            <li>1 x Photocopy of Computerized National Identity Card of Client.</li>
                        </ul>
	    				
                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Site Plan Application Forms are available at Customer Care Services of DHA Office free of cost. <Link to="">(Download)</Link></li>
                            <li>Site Plan Application Forms along-with required documents will be submitted at Customer Care Services.</li>
                            <li>Challan Form for dues will be issued from Finance Branch on given date.</li>
                            <li>Original deposited challan has to be submitted to Finance Branch.</li>
                            <li>Site Plan can be received from Customer Care Centre Counter No. 3 and 4, after 2 working days of payment of dues.</li>
                        </ul>

                        <br/>
                        <h2>Submission of Building Drawings/Plans</h2>
                        <p>Site plan is a certificate that indicates area and the dimensions of the plot, duly issued by DHA Lahore office.</p>
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
                                    <td>Submission of Building Drawings/Plans</td>
                                    <td>20 working days</td>
                                    <td>Click Here for Schedule of Charges</td>
                                    <td>Letter of approval will be dispatched to customer's address</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <ul>
                            <li>Original Architect Stability Certificate</li>
                            <li>Original Structure Stability Certificate</li>
                            <li>Form A & B (Cantonment Board). Filled with Owner’s Current Address</li>
                            <li>Performa – Information Requirement Drawing Submission (Proposed / Revised)</li>
                            <li>Submission Drawings: –  (a). Architectural Drawing – 01 x Tracing Cloth, 07 x Ammonia Prints and 01 x Soft Copy in Form of CD. (b). Fire Protection Drawing – 02 x Ammonia Prints. (c). Structural Drawing – 01 x Set of Drawing and 01 x Soft copy of ETABS/ SAP Report (Commercial Only). (d). MEP Structure Drawing
                                <ul>
                                    <li>Covering letter from architect office</li>
                                    <li>MEP structure stability certificate</li>
                                    <li>2 x set of hard copies of MEP structure drawings</li>
                                    <li>1 x soft copy on CD having MEP drawing in PDF, ACAD 2(D) & 3-dimensional model.</li>
                                </ul>
                            </li>
                            <li>Original Soil Testing Report / Geotechnical Test Report.</li>
                            <li>Original paid challan of Soil Testing Report / Geotechnical Test Report.</li>
                            <li>Photocopy of Allotment/ Transfer Letter.</li>
                            <li>Photocopy of Site Plan Issued by Building Control Branch in Current Owner’s Name.</li>
                            <li>Photocopy of CNIC of the Owner.</li>
                            <li>Irrevocable Undertaking for Commercial/ Residential building construction in DHA Lahore (Specimen available with Customer Care).</li>
                            <li><Link to="">(Download)</Link> Complete Set</li>
                        </ul>

                        <br/>
                        <h3>Note:</h3>
                        <ul>
                            <li>All undertakings to be duly signed by owner and attested by the Oath Commissioner.</li>
                        </ul>
                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>The Building drawing plan documents will be submitted to Customer Care Counter Nos. 6,7,8 & 9 for detailed checking.</li>
                            <li>Customer Care Counter will issue payment slip for generation of challan by Finance Branch.</li>
                            <li>The Customer Services Officer will issue payment challan according to the payment slip which will be paid in branches of banks mentioned on reverse of challan.</li>
                            <li>A photocopy of paid challan will be attached with the Building Drawings / Plans along-with documents tagged in a file.</li>
                            <li>Acknowledgment Slip will be issued to client for the submission of Building Drawings/Plans.</li>
                            <li>After receiving the approval letter of drawing, member will visit Building Control Branch and get the Payment Slip for TIP Tax. Thereafter client will get the Payment Challan from Finance Branch for deposit in National Bank of Pakistan (NBP).</li>
                            <li>Owner will provide 3 x Copies of Paid Challan to Building Control Branch and collect the Building Drawing / Plan.</li>
                        </ul>

                        <br/>
                        <h3>Note:</h3>
                        <ul>
                            <li>After approval of Building Drawing / Plan, member will obtain demarcation from DHA Lahore, after which construction should commence within one month and completion of building within two years.</li>
                        </ul>

                        <br/>
                        <h2>No Demand Certificate</h2>
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
                                    <td>Issuance of No Demand Certificate</td>
                                    <td>As per Site & Phase requirement</td>
                                    <td>
                                        <p>Security Charges & Non utilization fee (If applicable)</p>
                                        <p>Any other charges as intimated by Finance Branch</p>
                                    </td>
                                    <td>
                                        <p>Client will be informed by Building Control Branch in case of construction violation in house / building.</p>
                                        <p>Client will coordinate with Transfer & Record Branch and Finance Branch for payment of dues and date of transfer.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <ul>
                            <li>Copy of Site Plan issued by Building Control Branch in name of present owner.</li>
                            <li>Copy of Completion Certificate (in case of house / building).</li>
                            <li>Copy of Allotment / Transfer Letter.</li>
                            <li>Copy of Computerized National Identity Card of owner.</li>
                            <li>No Objection Certificate from Cantt Board (relating to TIP Tax).</li>
                            <li>No Objection Certificate from W&R Directorate, GHQ Rawalpindi in case of service benefit plots / plots allotted out of defence quota from GHQ AG’s Branch.</li>
                        </ul>

                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Client will submit No Demand Certificate Form along-with required documents to Customer Services Officer (Transfer & Record Branch).</li>
                            <li>DHA field staff will visit the site in case of constructed house/building for ground verification.</li>
                            <li>If construction violations are observed, owner will be informed on corresponding address or in case of no violation No Demand Certificate will be processed to Transfer & Records Branch through Finance Branch for clearance of dues and transfer of plot.</li>
                            <li>The client can check the status and collect the Payment Challan from Finance Branch, DHA office.</li>
                        </ul>
                        <br/>
                        <h2>Temporary Sewage Connection</h2>
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
                                    <td>Temporary Sewerage Connection</td>
                                    <td>12 Working Days</td>
                                    <td>N/A</td>
                                    <td>Temporary sewerage connectivity on site</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <p>An application from owner to Director Building Control requesting for the opening of temporary sewerage connection. Download Application Form <Link to="">(Click Here)</Link></p>
                        
                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Client can start the construction work after receiving demarcation papers and is bound to construct Septic Tank as per approved drawing and Temporary Lavatory within the plot area.</li>
                            <li>The application for Temporary Sewerage Connection will be submitted to Customer Services Officer (Building Control Branch).</li>
                            <li>Septic Tank & Temporary Lavatory (connected with each other) should be ready before the field staff visit within 10-12 working days.</li>
                            <li>Temporary Sewerage Connection will be provided to particular house / building when Temporary Lavatory has been constructed and connected with Septic Tank.</li>
                        </ul>
                        
                        <br/>
                        <h3>Note:</h3>
                        <ul>
                            <li>Photocopy of CNIC is required.</li>
                            <li>Temporary Sewerage Connection will be provided to particular house / building when Temporary Lavatory has been constructed and connected with Septic Tank.</li>
                        </ul>
                    </div>
    			</Container>
            </div>
            <BlogList title="Related Blog"></BlogList>
			</>
        );
}

export default BlogDetail;