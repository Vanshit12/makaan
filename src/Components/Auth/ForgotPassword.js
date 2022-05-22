import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';

const ForgotPassword = (props) => {
    const {state : {authUser}, dispatch} = AuthState();
    const {register, handleSubmit, formState , formState: {errors}                      
    } = useForm() 
    const { isSubmitting } = formState;
    const navigate = useNavigate();
    const { t } = useTranslation();
        
         

    const onSubmit = async(data) => {
        var form = new FormData()
        form.append('email',data.email)
        Makaan.post(`users/password/email`,form)
        .then(response => {
            if(!response.data.error){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else{
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        })
        .catch(error => {
            if(error.response.status === 422){
                toast.error(error.response.data.message, {
                     position: toast.POSITION.TOP_RIGHT,
                });
            }else{
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        });
    };
    useEffect(() => {
        if(authUser){
            navigate(-1);
        }
    },[]);

    return (
        <div className="login">
                <section className="inner-gap bg login-form">
                    <Container>
                        <div className="login-form-wrap">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{t('ForgotPassword.forgot_password')}</Card.Title>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="form-group">
                                            <Form.Label>{t('ForgotPassword.Email')} <span className="color">*</span></Form.Label>
                                            <Form.Control type="email" placeholder={t('ForgotPassword.Email Address')} {...register("email", {
                                              required: t('Common.This field is required'),
                                              pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: t('Common.Invalid email address')
                                              }
                                            })} />
                                            {errors.email && (
                                               <Form.Text className="text-danger">
                                                  {errors.email.message}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                        <div className="btn_wrap">
                                            <Button type="submit" className="w-100" disabled={isSubmitting}>
                                                {t('ForgotPassword.send_password_link')}
                                                {isSubmitting && <span className="spinner-border spinner-border-sm ml-3 d-block" />}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                </section>
                {/* <AppSection></AppSection> */}
                <WhatsAppSection></WhatsAppSection>
            </div>
    );
}

export default ForgotPassword;