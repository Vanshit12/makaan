import React, {useState} from 'react';
import { NavLink, Link} from 'react-router-dom';
import { Nav, Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {Makaan} from '../../../request';
import {AuthState} from '../../../Context/Context';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { toast } from 'react-toastify';
import WhatsAppSection from '../../Common/WhatsAppSection';
import AppSection from '../../Common/AppSection';




const ChangePassword = (props) => {
    const {register, handleSubmit, formState , formState: {errors}, watch                     
    } = useForm();
const { t } = useTranslation();
const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
const onSubmit = async(data) => {
    var form = new FormData()
    form.append('current_password',data.current_password)
    form.append('new_password',data.new_password)
    form.append('confirm_password',data.confirm_password)

    Makaan.post(`user-password-change`,form)
    .then(response => {
        if(!response.data.error){
            toast.success(response.data.message, {
                 position: toast.POSITION.TOP_RIGHT,
            });
            localStorage.removeItem("access_token")
            dispatch({type:'LOGOUT',payload:undefined});
        }else{
            toast.error(response.data.message, {
                 position: toast.POSITION.TOP_RIGHT,
            });
        }
    })
    .catch(error => {
        toast.error(error.message, {
             position: toast.POSITION.TOP_RIGHT,
        });
    });
};

    return (
        
        <div className="user-profile-page">
            <Row>
                <Col xl={7}>
                    <div class="myaccount-head">
                        <Row className="align-items-center">
                            <Col xl lg md sm={12}>
                                <div class="myacconut_wrap_toggle">
                                    <h2>Change Password</h2>
                                </div>
                            </Col>
                            
                        </Row>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="form-group">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder='********'
                            {...register("current_password", {
                                required: true && t('Common.This field is required'),
                            })}/>
                            {errors.current_password && (
                                <Form.Text className="text-danger">
                                    {errors.current_password.message}
                                </Form.Text>
                            )}
                            <Form.Text className="text-danger"></Form.Text>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder='********'
                            {...register("new_password", {
                                required: true && t('Common.This field is required'),
                            })}/>
                            {errors.new_password && (
                                <Form.Text className="text-danger">
                                    {errors.new_password.message}
                                </Form.Text>
                            )}
                            <Form.Text className="text-danger"></Form.Text>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder='********'
                            {...register("confirm_password", {
                                validate: (value) => value === watch('new_password') || t('Register.The passwords do not match')
                            })}/>
                            {errors.confirm_password && (
                                <Form.Text className="text-danger">
                                    {errors.confirm_password.message}
                                </Form.Text>
                            )}
                            <Form.Text className="text-danger"></Form.Text>
                        </Form.Group>
                        <div className="btn_wrap">
                            <Button type="submit" className="w-100">Save Changes</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default ChangePassword;