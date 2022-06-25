import React, {useState, useEffect} from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';

const PasswordReset = (props) => {
    const {state : {authUser}, dispatch} = AuthState();
    const [state,setState] = useState({
		email: ''
	});
    const {register, setValue, watch, handleSubmit, formState , formState: {errors}                      
    } = useForm() 
    const { isSubmitting } = formState;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    setValue('email', searchParams.get('email'));
    const { token } = useParams();

    const onSubmit = async(data) => {
        var form = new FormData()
        form.append('email',data.email)
        form.append('password',data.password)
        form.append('password_confirmation',data.password_confirmation)
        form.append('token',token)
        Makaan.post(`users/password/reset`,form)
        .then(response => {
            if(!response.data.error){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/login')
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
                                    <Card.Title>{t('PasswordReset.reset_password')}</Card.Title>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="form-group">
                                            <Form.Label>{t('PasswordReset.email')} <span className="color">*</span></Form.Label>
                                            <Form.Control disabled type="email" placeholder={t('PasswordReset.Email Address')} {...register("email", {
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

                                        <Form.Group className="form-group">
                                            <Form.Label>{t('PasswordReset.password')} <span className="color">*</span></Form.Label>
                                            <Form.Control type="password" placeholder="********" name="password" 
                                            {...register("password", {
                                                  required: t('Common.This field is required')
                                                })}/>
                                            {errors.password && (
                                               <Form.Text className="text-danger">
                                                  {errors.password.message}
                                                </Form.Text>
                                              )}
                                        </Form.Group>

                                        <Form.Group className="form-group">
                                            <Form.Label>{t('PasswordReset.confirm_password')} <span className="color">*</span></Form.Label>
                                            <Form.Control type="password" placeholder="********" name="password_confirmation" 
                                            {...register("password_confirmation", {
                                                required: t('Common.This field is required'),
                                              validate: (value) => value === watch('password') || t('Register.The passwords do not match')
                                            })}/>
                                            {errors.password_confirmation && (
                                               <Form.Text className="text-danger">
                                                  {errors.password_confirmation.message}
                                                </Form.Text>
                                              )}
                                        </Form.Group>
                                        <div className="btn_wrap">
                                            <Button type="submit" className="w-100" disabled={isSubmitting}>
                                                {t('PasswordReset.send_password_link')}
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

export default PasswordReset;