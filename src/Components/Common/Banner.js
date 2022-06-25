import React, { useEffect, useState} from 'react';
import axios from "axios";
import { Container, Row, Col, ToggleButton, Form, Button, Card, Modal} from 'react-bootstrap';
import {Makaan} from '../../request';
import {AuthState} from '../../Context/Context';
import Loader from '../Common/Loader';

const Banner = (props) => {
    const [state,setState] = useState({
        banners:[]
    });
     
    useEffect(() => {
        let endpoints = [
            `banner-list`
        ];
        axios.all(endpoints.map((endpoint,i) => {
            return Makaan.get(endpoint);
        })).then(
            (res) => {
                setState({...state,banners:res[0].data.data })
            }
        );
    },[]);
    
    return (
        <section className="hero-header pb-0 pt-0">
            <Row className="mx-0">
                {
                    state.banners && (
                        // state.banners.map((banner,index)=>{
                            // return (
                                <Col xs={12} className="px-0">
                                    <img src={state.banners ? state.banners.banner_image : 'assets/images/home/hero-header-bg.png'} alt=""></img>
                                </Col>
                            // )
                        // })
                    )
                }
            </Row>
        </section>
    );
}

export default Banner;