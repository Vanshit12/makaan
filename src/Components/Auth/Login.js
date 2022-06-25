import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AppSection from '../Common/AppSection';
import WhatsAppSection from '../Common/WhatsAppSection';
import Loader from '../Common/Loader';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';

const Login = (props) => {
    const {state : {authUser}, dispatch} = AuthState();
    const location = useLocation();
    const {register, handleSubmit, formState: {errors, isSubmitting}                      
    } = useForm() 
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [state,setState] = useState({
        isToggleOn: true,
        passwordShow:false,
        isSubmitting:false
    });
        

    const onSubmit = async(data, e) => {
        setState(prevState => ({
            ...prevState,
            isSubmitting: true
          }));
        var form = new FormData()
        form.append('email',data.email)
        form.append('password',data.password)
        Makaan.post(`users/login`,form)
        .then(response => {
            if(!response.data.error){
                toast.success("Login Successfully !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('access_token', response.data.token)
                dispatch({type:'LOGIN',payload:response.data.token});
                e.target.reset()
                if(location.state && location.state.from){
					navigate(location.state.from,{
						state: {
						  from:location.pathname
						}
					  });
				}else{
					navigate('/');
				}
            }else{
                toast.error(response.data.message[Object.keys(response.data.message)[0]][0], {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
        })
        .catch(error => {
            setState(prevState => ({
                ...prevState,
                isSubmitting: false
              }));
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
    const passwordTypeChange = () =>{
        setState(prevState => ({
          ...prevState,
          passwordShow: !state.passwordShow
        }));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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
                                    <Card.Title>{t('Login.Login')}</Card.Title>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="form-group">
                                            <Form.Label>{t('Login.Email')} <span className="color">*</span></Form.Label>
                                            <Form.Control type="email" placeholder={t('Login.Email Address')} {...register("email", {
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
                                        <Form.Group className="form-group mb-3">
                                            <Form.Label>{t('Login.Password')} <span className="color">*</span></Form.Label>
                                            <div className="form-control-wrap">
                                                <Form.Control type={state.passwordShow ? "text" : "Password"} placeholder="*******" {...register("password", {
                                                              required: t('Common.This field is required'),
                                                            })}/>
                                                <Button className="btn-icon">
                                                {
                                                    state.passwordShow ?
                                                        (<svg onClick={passwordTypeChange} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>)
                                                    :
                                                        (<svg onClick={passwordTypeChange} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>)
                                                    
                                                }
                                                </Button>
                                            </div>
                                            {errors.password && (
                                               <Form.Text className="text-danger">
                                                  {errors.password.message}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                        <div className="login-form-options d-flex">
                                            <div className="remeber-me">
                                                <div className="form-check">
                                                    <input type="checkbox" id="remember" className="form-check-input" {...register('remember', { required: false })}></input>
                                                    <label htmlFor="remember">
                                                        <div className="checkbox"></div>
                                                        <span>{t('Login.Remember Me')}</span>
                                                    </label>
                                                </div>
                                            </div>
                                            { <div className="forgot-link">
                                                <Link to="/forgot-password">{t('Login.Forgot Password')}?</Link>
                                            </div> }
                                        </div>
                                        <div className="btn_wrap">
                                            <Button type="submit" className="w-100" disabled={state.isSubmitting}>
                                                {t('Login.Login')}
                                                {state.isSubmitting && <Loader type="Button"></Loader>}
                                            </Button>
                                        </div>
                                        <div className="login-form-link">
                                            <p>{t("Login.Don't have an account?")} <Link to="/register" ><span>{t('Login.Sign Up')}</span></Link>
                                            </p>
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

export default Login;