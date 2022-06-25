import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Row, Col, ListGroup} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const  Footer = (props) => {
		const { t } = useTranslation();
        return (
            <footer className="main-footer">
            	<div className="beta">
            		<img src="/assets/images/beta-icon.png" alt=""/>
            	</div>	
              	<Container>
              		<Row>
	              		<Col xl={4} lg={4} md={6} xs={12}>
	              			<div className="footer-col footer-about">
	              				<img src="/assets/images/logos/makaan-logo.svg" alt="Logo"/>
	              				<p>MakaanGuide.com is a Lahore based technology company with a focus on the real estate marketplace, real estate development, and allied services.</p>
	              			</div>
	              		</Col>
              			<Col xl={2} lg={2} md={6} xs={12}>
              				<div className="footer-col">
              					<h4 className="title">{t('Footer.Company')}</h4>
              					<ListGroup>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/about-us">{t('Footer.AboutUs')}</NavLink>
								  	</ListGroup.Item>
								  	{/* <ListGroup.Item>
								  		<NavLink className="nav-link" to="/contact-us">{t('Footer.ContactUs')}</NavLink>
								  	</ListGroup.Item> */}
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/jobs">{t('Footer.Jobs')}</NavLink>
								  	</ListGroup.Item>
								  	{/* <ListGroup.Item>
								  		<NavLink className="nav-link" to="/help-support">{t('Footer.HelpSupport')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/advertise-makaan">{t('Footer.AdvertiseOnMakaan')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/terms-use">{t('Footer.TermsOfUse')}</NavLink>
								  	</ListGroup.Item> */}
								</ListGroup>
              				</div>
              			</Col>
              			{/* <Col xl={3} lg={3} md={6} xs={12}>
              				<div className="footer-col">
              					<h4 className="title">{t('Footer.QuickLinks')}</h4>
              					<ListGroup>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/about-us">{t('Footer.Pakistan')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/contact-us">{t('Footer.Karachi')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/jobs">{t('Footer.Lahore')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/help-support">{t('Footer.Islamabad')}</NavLink>
								  	</ListGroup.Item>
								  	<ListGroup.Item>
								  		<NavLink className="nav-link" to="/advertise-makaan">{t('Footer.Poonch')}</NavLink>
								  	</ListGroup.Item>
								</ListGroup>
              				</div>
              			</Col> */}
						  <Col xl={3} lg={3} md={6} xs={12}>
              				<div className="footer-col last">
              					<div className="social social-2">
              						<h4 className="title">{t('Footer.FollowUs')}</h4>
	              					<ListGroup horizontal>
									  	<ListGroup.Item>
									  		<a target="_blank" rel="noopener noreferrer" href="https://fb.me/MakaanGuide">
									  			<img src="../../assets/images/icons/social/facebook.svg" alt=""></img>
									  		</a>
									  	</ListGroup.Item>
										  {/* enfdef */}
									  	<ListGroup.Item>
									  		<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/makaanGuide">
									  			<img src="../../assets/images/icons/social/twitter.svg" alt=""></img>
									  		</a>
									  	</ListGroup.Item>
									  	<ListGroup.Item>
									  		<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/makaanguide">
									  			<img src="../../assets/images/icons/social/linkedin.svg" alt=""></img>
									  		</a>
									  	</ListGroup.Item>
									  	<ListGroup.Item>
									  		<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCUoZ4e76orx23NImhCnzkxA">
									  			<img src="../../assets/images/icons/social/youtube.svg" alt=""></img>
									  		</a>
									  	</ListGroup.Item>
									  	<ListGroup.Item>
									  		<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/MakaanGuide">
									  			<img src="../../assets/images/icons/social/instagram.svg" alt=""></img>
									  		</a>
									  	</ListGroup.Item>
									  	
									</ListGroup>
              					</div>
              				</div>
              			</Col>
              			<Col xl={3} lg={3} md={6} xs={12}>
              				<div className="footer-col">
              					<h4 className="title">{t('Footer.ContactUs')}</h4>
              					<address className="address-group">
						  			<div className="address-group-item">
						  				<a href="https://goo.gl/maps/uq8PPoBpLUkzuZrP8" target="_blank" rel="noopener noreferrer" className="address-link">
							  				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
											</svg>
											<div className="address">
												<p>1st floor,114-CCA, Sector C, <br/>Phase 6, DHA Lahore, Punjab, Pakistan</p>
								  			</div>
						  				</a>
						  			</div>
						  			<div className="address-group-item">
						  				<p className="address-link">
										  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" fill="none">
											<path d="M30 14.615C30 22.6813 23.4087 29.2312 15.2763 29.2312C12.6975 29.2312 10.2688 28.5663 8.15875 27.4137L0 30L2.66249 22.155C1.31747 19.955 0.543766 17.3738 0.543766 14.6163C0.543766 6.54628 7.13747 0 15.2762 0C23.4087 0 30 6.54628 30 14.615ZM15.2762 2.32752C8.44999 2.32752 2.88999 7.83627 2.88999 14.6163C2.88999 17.3087 3.76747 19.7988 5.2475 21.8237L3.70498 26.375L8.46373 24.8713C10.4163 26.1562 12.7587 26.8975 15.2762 26.8975C22.0975 26.8975 27.6562 21.3863 27.6562 14.6063C27.6562 7.83753 22.0975 2.32752 15.2762 2.32752ZM22.7075 17.9825C22.62 17.8362 22.38 17.7475 22.0238 17.555C21.6525 17.3762 19.885 16.52 19.545 16.4025C19.2213 16.2824 18.9813 16.2237 18.7413 16.5799C18.49 16.9337 17.8063 17.7487 17.5975 17.9824C17.375 18.2199 17.1675 18.25 16.81 18.0725C16.4575 17.8962 15.2875 17.5162 13.9112 16.2912C12.8412 15.3475 12.1125 14.1762 11.9038 13.8125C11.6887 13.4512 11.8788 13.2587 12.0588 13.0825C12.2276 12.92 12.4213 12.66 12.6 12.4525C12.7863 12.2463 12.845 12.0988 12.9638 11.8613C13.0838 11.6163 13.0225 11.4101 12.9338 11.225C12.845 11.0463 12.1176 9.28757 11.8201 8.56882C11.5163 7.85258 11.2213 7.97135 11.0125 7.97135C10.795 7.97135 10.5601 7.94136 10.3151 7.94136C10.0776 7.94136 9.68509 8.02888 9.35006 8.39258C9.02381 8.74757 8.08754 9.61382 8.08754 11.3788C8.08754 13.1388 9.38005 14.8488 9.56507 15.0838C9.74507 15.3213 12.0588 19.0488 15.7326 20.4838C19.4014 21.9188 19.4014 21.445 20.0688 21.3851C20.7201 21.3251 22.2063 20.5151 22.5038 19.6851C22.7962 18.8412 22.7962 18.1313 22.7075 17.9825Z" fill="currentColor"/>
										</svg>
										<div>
											
											<p>
												<a href="tel:+923171116020">+92-317-1116020</a>
											</p>
											<p>
												<a href="tel:+923106147777">+92 310-6147777</a>
											</p>
										</div>
						  				</p>
						  			</div>
						  			<div className="address-group-item">
						  				<a href="mailto:makaanguideco@gmail.com" className="address-link">
						  					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						  					makaanguideco@gmail.com
						  				</a>
								  	</div>
									
								</address>
              				</div>
              			</Col>
              		</Row>
              	</Container>
              	<div className="copy-right">
              		<Container>
              			<Row>
              			 	<Col>
              			 		<p>{t('Footer.CopyRight')}</p>
              			 	</Col>
              			 	<Col xl="auto" lg="auto" md="auto">
              			 		<ListGroup horizontal className="links">
              			 			<ListGroup.Item>
              			 				<Link to="/terms-and-conditions">{t('Footer.TermCondition')}</Link>
              			 			</ListGroup.Item>

              			 			<ListGroup.Item>
              			 				<Link to="/privacy-policy">{t('Footer.PrivacyPolicy')}</Link>
              			 			</ListGroup.Item>

              			 			<ListGroup.Item>
              			 				<Link to="/disclaimer">{t('Footer.Disclaimer')}</Link>
              			 			</ListGroup.Item>
              			 		</ListGroup>
              			 	</Col>
              			</Row>
              		</Container>
              	</div>
            </footer>
        )
}
export default Footer;