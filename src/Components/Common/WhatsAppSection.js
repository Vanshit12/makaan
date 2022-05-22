import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import {Makaan} from '../../request';
import { toast } from 'react-toastify';
import Loader from '../Common/Loader';
import {AuthState} from '../../Context/Context';

const WhatsAppSection = (props) => {
    	const {state : {site_settings}} = AuthState();
		const { t } = useTranslation();
		const {register, handleSubmit, formState , formState: {errors}, watch                      
    	} = useForm();
		const [state,setState] = useState({
			isSubmitting:false
		});
		const onSubmit = async(data) => {
			setState(prevState => ({
				...prevState,
				isSubmitting: true
			  }));
			var form = new FormData()
			form.append('full_name',data.full_name)
			form.append('email',data.email)
			form.append('phone_number',data.phone_number)
			Makaan.post(`users/newsletter`,form)
			.then(response => {
				setState(prevState => ({
					...prevState,
					isSubmitting: false
				  }));
				if(!response.data.error){
					toast.success(response.data.message, {
						 position: toast.POSITION.TOP_RIGHT,
					});
				}else{
					console.log(response.data.message[0]);
					toast.error(response.data.message[0], {
						position: toast.POSITION.TOP_RIGHT,
				   });
				}
			})
			.catch(error => {
				
			});
		};
        return (
            <section className="whatsapp-form bg inner-gap">
        			<Container>
        				<Row>
        					<Col xl={12}>
        						<div className="section-title">
	        						<h2 className="heading-2">Be the first to see the property deals and stay <br></br>updated with news by subscribing below</h2>
	        					</div>
        					</Col>
        				</Row>
        				<Row className="justify-content-center">
        					<Col xl={10}>
        						<div className="search_card">
									<Form onSubmit={handleSubmit(onSubmit)}>
        								<Row>
        									<Col md={12} lg>
        										<Form.Group className="form-group">
		        									<Form.Label>{t('home_translations:Contact.FullName')} <span className="color">*</span></Form.Label>
		        									<Form.Control type="text" placeholder={t('home_translations:Contact.FullNamePlaceholder')} 
													{...register("full_name", {
														required: true && t('Common.This field is required'),
													  	maxLength:{value:60,message:t('Common.Too Many Characters')}
												  	})}/>
												    {errors.full_name && (
														<Form.Text className="text-danger">
															{errors.full_name.message}
														</Form.Text>
													)}
							        			</Form.Group>
        									</Col>
        									<Col md={12} lg> 
        										<Form.Group className="form-group">
		        									<Form.Label>{t('home_translations:Contact.EmailAddress')} <span className="color">*</span></Form.Label>
		        									<Form.Control type="text" placeholder={t('home_translations:Contact.EmailAddressPlaceholder')}
													{...register("email", {
														required: true && t('Common.This field is required'),
													   pattern: {
														  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
														  message: t('Common.Invalid email address')
														}
												  })}/>
												    {errors.email && (
														<Form.Text className="text-danger">
															{errors.email.message}
														</Form.Text>
													)}
							        			</Form.Group>
        									</Col>
        									<Col md={12} lg>
        										<Form.Group className="form-group">
		        									<Form.Label>{t('home_translations:Contact.WhatsAppNumber')} <span className="color">*</span></Form.Label>
		        									<Form.Control type="text" placeholder={t('home_translations:Contact.PhoneNumberPlaceholder')}
													{...register("phone_number", {
														required: true && t('Common.This field is required'),
													  	maxLength:{value:11,message:t('Common.Too Many digits')},
														minLength:{value:8,message:t('Common.Very Few digits')}
												  })}/>
												    {errors.phone_number && (
														<Form.Text className="text-danger">
															{errors.phone_number.message}
														</Form.Text>
													)}
							        			</Form.Group>
        									</Col>
        									<Col xl="auto" lg="auto" md={12}> 
	        									<div className="btn_wrap text-center">
	        										<Button type="submit" disabled={state.isSubmitting}>
														{t('home_translations:Submit')}
														{state.isSubmitting && <Loader type="Button"></Loader>}
		        									</Button>
	        									</div>
        									</Col>
        								</Row>
        							</Form>
        						</div>
        					</Col>
        				</Row>
        				<div className="whatsapp-form-btn">
        					<Row className="justify-content-center">
        						<Col xl="auto" lg="auto" md="auto" xs="auto">
        							<a target="_blank" rel="noopener noreferrer" href={"https://api.whatsapp.com/send?phone="+(site_settings ? (site_settings.home_page_call_whatsapp ? site_settings.home_page_call_whatsapp: '') : '')+"&text=Join WatsApp Group to ask question/stay"} className="btn btn-whatsapp">
		        						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
											<path d="M30 14.615C30 22.6813 23.4087 29.2312 15.2763 29.2312C12.6975 29.2312 10.2688 28.5663 8.15875 27.4137L0 30L2.66249 22.155C1.31747 19.955 0.543766 17.3738 0.543766 14.6163C0.543766 6.54628 7.13747 0 15.2762 0C23.4087 0 30 6.54628 30 14.615ZM15.2762 2.32752C8.44999 2.32752 2.88999 7.83627 2.88999 14.6163C2.88999 17.3087 3.76747 19.7988 5.2475 21.8237L3.70498 26.375L8.46373 24.8713C10.4163 26.1562 12.7587 26.8975 15.2762 26.8975C22.0975 26.8975 27.6562 21.3863 27.6562 14.6063C27.6562 7.83753 22.0975 2.32752 15.2762 2.32752ZM22.7075 17.9825C22.62 17.8362 22.38 17.7475 22.0238 17.555C21.6525 17.3762 19.885 16.52 19.545 16.4025C19.2213 16.2824 18.9813 16.2237 18.7413 16.5799C18.49 16.9337 17.8063 17.7487 17.5975 17.9824C17.375 18.2199 17.1675 18.25 16.81 18.0725C16.4575 17.8962 15.2875 17.5162 13.9112 16.2912C12.8412 15.3475 12.1125 14.1762 11.9038 13.8125C11.6887 13.4512 11.8788 13.2587 12.0588 13.0825C12.2276 12.92 12.4213 12.66 12.6 12.4525C12.7863 12.2463 12.845 12.0988 12.9638 11.8613C13.0838 11.6163 13.0225 11.4101 12.9338 11.225C12.845 11.0463 12.1176 9.28757 11.8201 8.56882C11.5163 7.85258 11.2213 7.97135 11.0125 7.97135C10.795 7.97135 10.5601 7.94136 10.3151 7.94136C10.0776 7.94136 9.68509 8.02888 9.35006 8.39258C9.02381 8.74757 8.08754 9.61382 8.08754 11.3788C8.08754 13.1388 9.38005 14.8488 9.56507 15.0838C9.74507 15.3213 12.0588 19.0488 15.7326 20.4838C19.4014 21.9188 19.4014 21.445 20.0688 21.3851C20.7201 21.3251 22.2063 20.5151 22.5038 19.6851C22.7962 18.8412 22.7962 18.1313 22.7075 17.9825Z" fill="currentColor"/>
										</svg>
		        						{t('home_translations:NeedHelpText')}
		        					</a>
        						</Col>
        					</Row>
        				</div>
        			</Container>
        		</section>
        );
}

export default WhatsAppSection;	