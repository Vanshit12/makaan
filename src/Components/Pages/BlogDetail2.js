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
            				<h1>DHA Lahore Transfer Process</h1>
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
                                    <td>Verification of Property</td>
                                    <td>24 Hours</td>
                                    <td>Rs 2000/-</td>
                                    <td>Resident desk</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>

                        <h3>Documents Required</h3>
                        <ul>
                            <li>Copy of Allocation / Intimation / Allotment Letter.</li>
                            <li>Copy of Computerized National Identity Card.</li>
                            <li>Copy of Computerized National Identity Card of Authority Holder (in case of Authority holder).</li>
                            <li>Original paid Voucher of Verification Fee.</li>
                            <li>(if applied through Property Dealer).</li>
                            <li>Copy of Property Dealer’s Registration Card</li>
                            <li>Stamp of Estate Agent In Case of Ex. JCOs / Soliders / NOK of Shuhdas</li>
                            <li>1 x photocopy of NOC from GHQ</li>
                            <li>1 x photocopy of Discharge Certificate.</li>
                            <li>Pension Book (Duly Attested)</li>
                        </ul>
	    				<p>In case of Company / Trust / Firm / Partnership, Kindly refer to set of instructions available at Reception / Website Transfer Form section.</p>

                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Verification form is available at DHA Office Reception.</li>
                            <li>Submit the Verification Form along with the documents mentioned above at DHA Office Reception.</li>
                            <li>Customer/ Authority Holder will collect Verification Performa from DHA Reception next day.</li>
                        </ul>

                        <br/>
	    				<h2>No Demand Certificate</h2>
	    				<p>No Demand Certificate is the first step for transfer in which the owner has to clear all outstanding objections and dues.</p>
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
                                    <td>No Demand Certificate</td>
                                    <td>Subject to Plots/House, Phase and Transfer type</td>
                                    <td>Nil</td>
                                    <td>NDC vouchers to be collected from Finance branch on due date.</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <ul>
                            <li>1 x Photocopy of CNIC</li>
                            <li>1 x Photocopy of Allocation / Intimation / Allotment / Transfer Letters</li>
                            <li>1 x Photocopy of Site Plan for the plots (if possession is open), If not held will be applied for along with NDC.</li>
                            <li>1 x Photocopy of Completion Certificate (in case of Completed House / Building)</li>
                            <li>TIP Paid receipt and clearance certificate from Walton / Lahore Cantt Board (In case of constructed property).</li>
                            <li>Property Tax receipt and clearance certificate from Walton / Lahore Cantt Board. In case of exemption, exemption certificate be attached.</li>
                            <li>In case of Company / Trust / Firm / Partnership, kindly refer to set of instructions available at Reception / Website.</li>
                            <li>NOC for Armed Forces Personnel in case of service benefit Plots/ Plots allotted out of Defence quota from GHQ AG’s Branch (W&R Dte).</li>
                            <li>Attested photocopies of Pension Book, Discharge Certificate and Form ‘B’ in case of Rtd. JCOs/NCOs and NOKs of Shaheed / Deceased.</li>
                            <li>In case of Hiba transfer, 1 x Photocopy of Family Registration Certificate (FRC) to be attached.</li>
                            <li><strong>For Haly Tower/ Gold Crest/ Penta Square:</strong></li>
                            <li>No Objection Certificate from concerned O & M Company is mandatory.</li>
                            <li>Undertaking by the Purchaser is mandatory for submission along with Transfer documents set.</li>
                        </ul>

                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>No Demand Certificate request form is available at DHA Office Reception. <Link to="">(Download)</Link></li>
                            <li>Submit the No Demand Certificate along with the documents mentioned above to the Customer Services Officer at Customer Care Centre, DHA Office.</li>
                            <li>If the required documents are complete, the Customer Services Officer will issue receipt of documents to the customer.</li>
                            <li>Customer will come on the date provided on the receipt to collect Payment Voucher from Finance counters, DHA Office.</li>
                            <li>After paying the voucher in the bank, customer submits the copies of Vouchers of all dues including Transfer Fee along with IT-5 Form and Paid Voucher of Advance Tax (if applicable) at NDC counters.</li>
                            <li>In case of House or Open Possession Plot, customer will have to coordinate with Building Control Branch for Surveyor visit and dues clearance.</li>
                            <li>In case of Constructed Building, customer has to clear the TIP Tax of Walton / Lahore Cantt Board and Water Bill.</li>
                            <li>Submits the complete Transfer Documents after fulfilling the above requirements to Customer Service Officer for the transfer appointment.</li>
                        </ul>

                        <br/>
                        <h3>Note:</h3>
                        <ul>
                            <li>Original Allocation / Intimation / Allotment / Transfer Letter(s) to be surrendered to DHA at the time of transfer.</li>
                            <li>Original Paid challan of Transfer Fee and other dues (if any) to be submitted at least two working days before Transfer.</li>
                            <li>Physical appearance of Minor at the time of transfer of property is not mandatory if Guardian is already appointed from court of Law.</li>
                            <li>
                                Validity period of NDC.
                                <ul>
                                    <li>Constructed building (House/Plaza) – 30 days</li>
                                    <li>Possession/Non-Possession – 90 days</li>
                                </ul>
                            </li>
                        </ul>

                        <br/>
                        <h2>Regular Transfer</h2>
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
                                    <td>Regular Transfer</td>
                                    <td>After No Demand Certificate Clearance</td>
                                    <td>Charges Depends on the Phase, Size and Plot / Building Type. (Click Here for Schedule of Charges)</td>
                                    <td>Transfer Branch</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <ul>
                            <li>Forwarding letter giving the details of the plot / house, name of purchaser and documents under Seller’s three Signatures.</li>
                            <li>Original Allotment / Transfer Letter so that new letter is issued in the name of transferee.</li>
                            <li>Affidavit typed on Stamp paper worth Rs.50/- duly attested by Oath Commissioner.</li>
                            <li>No Demand Certificate (NDC).</li>
                            <li>Undertaking by the Seller & Purchaser.</li>
                            <li>Photocopies of the Computerized National Identity Card (CNIC) of both Seller and Buyer duly attested by Oath Commissioner.</li>
                            <li>2 x Passport size photograph duly attested by class one officer.</li>
                            <li>Associate Membership Registration Fee Rs.50,000/- of new Owner.</li>
                            <li>Cost of Associate Membership Registration Form Rs.1,500/-.</li>
                            <li>Cantt. Board transfer Tax.</li>
                            <li>Original Transfer / Sales Deed along with affidavits of seller and purchaser are to be surrendered in case of registered plot.</li>
                            <li>CVT-1 & IT-5 Form</li>
                            <li>Transfer Fee according to the size of plot.</li>
                            <li>Undertaking by the Purchaser is mandatory for Submission of transfer documents in relation to Haly Tower/ Gold Crest/ Penta Square. <Link to="">(Download)</Link></li>
                            <li>Stamp duty tax will be paid by the Purchaser after transfer activity. Transfer Documents set specimen available at DHA Office Reception. <Link to="">(Download)</Link></li>
                        </ul>

                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Apply for No Demand Certificate.</li>
                            <li>Customer to visit Transfer Branch for Transfer appointment.</li>
                            <li>Both Seller and Purchaser will visit Transfer Branch for transfer.</li>
                            <li>Customer will submit Transfer Documents along with all paid Government charges and Membership fee of DHA within 30 days of Transfer at Customer Care Centre.</li>
                            <li>Customer Services Officer will endorse/receive the documents and issue receipt.</li>
                            <li>Customer will bring the receipt and original Computerized National Identity Card on the given date, to collect the Allocation / Intimation / Transfer Letter(s) from Transfer Branch, DHA Office.</li>
                        </ul>

                        <br/>
                        <h3>Note:</h3>
                        <ul>
                            <li>“Members are required to intimate DHA Lahore about change in address / cell phone number / landline immediately on occurrence, failing which can cause inconvenience in correspondence and also request for waiver of surcharge on development charges will not be entertained.”</li>
                        </ul>

                        <br/>
                        <h2>Hiba Transfer</h2>
                        <p>Property gifted to the blood relatives (Parents to Children, Children to Parents, Husband to Wife, Wife to Husband).</p>
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
                                    <td>Hiba Transfer</td>
                                    <td>After No Demand Certificate Clearance</td>
                                    <td>Depends on the Phase, Size and Plot / Building Type. (Click Here for Schedule of Charges)</td>
                                    <td>Transfer Branch</td>
                                </tr>
                            </tbody>
                        </table>

                        <br/>
                        <h3>Documents Required</h3>
                        <ul>
                            <li>Forwarding letter giving the details of the sale / transfer documents.</li>
                            <li>Original Allocation / Intimation / Allotment / Transfer Letter for cancellation at the time of Transfer.</li>
                            <li>Original Family Registration Certificate (FRC) issued by NADRA.</li>
                            <li>Declaration of oral gift on e-stamp paper worth Rs.100/- .</li>
                            <li>No Demand Certificate (NDC) after clearance of all the dues and transfer fee.</li>
                            <li>Undertaking by the Donee in relation to taxes.</li>
                            <li>Acceptance by Donee on e-stamp paper worth Rs.100/-.</li>
                            <li>Photocopies of the Computerized National Identity Card (CNIC) of Donor, Donee and two Witnesses duly attested by the Oath Commissioner / Gazetted Class one officer / regular member.</li>
                            <li>2 x Passport size photograph of the Donee (Blue Background) duly attested.</li>
                            <li>Associate Membership (AM) Form (Available at Finance counter for Rs.1,500/-)</li>
                            <li>Paid Challan of Associate Membership (AM) Fee Rs.50,000/- of Donee.</li>
                            <li>Original Transfer / Sales Deed along with affidavits of Donor and Donee regarding surrender of the deed (In case of registered plot).</li>
                            <li>CVT-1 and IT-5 Forms</li>
                            <li>Transfer Fee according to the size of plot.</li>
                            <li>Advance Tax (to be paid by Donor / Donee (exempted))</li>
                            <li>Stamp duty tax will be paid by the Donee after Transfer execution.</li>
                        </ul>
                        
                        <br/>
                        <h3>Procedure</h3>
                        <ul>
                            <li>Apply for No Demand Certificate.</li>
                            <li>Customer will bring the Transfer Set to the Customer Services Officer at Customer Care Counter DHA Office, to obtain Transfer Appointment.</li>
                            <li>Both donor and donee along with 2 x witnesses will visit Transfer Branch section for Transfer.</li>
                            <li>Customer will submit Transfer Documents along with all paid Government charges and membership fee of DHA within 30 days of Transfer at Customer Care Centre.</li>
                            <li>Customer Service Officer will endorse/receive the documents and issue receipt.</li>
                            <li>Donee will bring the receipt and original Computerized National Identity Card on the given date to collect the Allocation / Intimation / Transfer Letter(s) from Transfer Branch.</li>
                        </ul>
                        <p>Hiba Transfer Documents Set Specimen available at DHA Office Reception.</p>
                        
                        <br/>
                        <h3>Note:</h3>
                        <p>“Members are required to intimate DHA Lahore about change in address / cell phone number / landline immediately on occurrence, failing which can cause inconvenience in correspondence and also request for waiver of surcharge on development charges will not be entertained.”</p>
                        <ul>
                            <li>Hiba transfer may be made by the registered person only in favour of Wife, Husband, Children, Parents, Natural and Legal Heirs or to Blood Relatives (Only Real Brothers and Sisters) subject to payment of fee determined by the Authority. The fee for transfer of property as a gift in favour of a person, other than the Legal Heirs, may be different which would be determined from time to time by the Authority.</li>
                            <li>In case Hiba Transfer is being done between Parent(s) and Daughter(s), the daughter(s) (if she is married and her CNIC has been changed) will have to give proof of relationship in form of Old CNIC / Educational Documents or Nikah Nama etc.</li>
                            <li>Physical appearance of 2 x witnesses along with their original CNIC is must at the time of transfer.</li>
                        </ul>
	    			</div>
    			</Container>
            </div>
            <BlogList title="Related Blog"></BlogList>
			</>
        );
}

export default BlogDetail;