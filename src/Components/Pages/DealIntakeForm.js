import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, ToggleButton, Form, Button, Card, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {Makaan} from '../../request';
import { useParams } from "react-router-dom";

const DealIntakeForm = (props) => {
    const [state,setState] = useState({
        DealType:''
    });
    /** get deal number from url */
    const param = useParams();
    const [showSkateholders, setSkateholders] = useState(false);
    const handleSkateholder = () => setSkateholders(!showSkateholders);
    const { t } = useTranslation();
    const [file, setFile] = useState([]);
    const {register, handleSubmit, formState , formState: {errors}, setValue, getValues                      
    } = useForm()
    const { isSubmitting } = formState;
    
    /**
     * check deal intake number is valid or not
     */
    useEffect(() => {
        Makaan.get(`get_deal_details/${param.id}`)
			  .then(res => {
                    let deal_data = res.data.data;
                   console.log(deal_data,"deal_data");
        })
    },[]);

    return (
            <div className="deal-form">
                <section className="hero-header pb-0 pt-0">
                    <img src="/assets/images/home/hero-header-bg.png" alt=""></img>
                </section>
                <section className="add-property-section bg">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={8}>
                                <div className="property-search">
                                    <div className="hero_search">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{t('deal_intake_translations:DealIntakeForm')} </Card.Title>
                                                <Form>
                                                    <div className="form-section">
                                                        {/* <div className="head">
                                                            <h3>{t('deal_intake_translations:DealIntakeForm')}</h3>
                                                        </div> */}
                                                        <Form.Group className="form-group radio_group">
                                                            <Form.Label>{t('deal_intake_translations:DealType')} <span className="color">*</span></Form.Label>
                                                            <Row>
                                                                <Col xl="auto">
                                                                    <ToggleButton  type="checkbox" id="radio-1" variant="outline-primary" className="btn_radio_2"
                                                                    checked={state.DealType === "sale"}
                                                                    onClick={(e) => setState({...state,DealType:'sale'})}
                                                                    {...register("DealType", {
                                                                        required: true
                                                                    })}>
                                                                        <div className="radio-dot"></div>
                                                                        {t('deal_intake_translations:SalePurchase')}
                                                                    </ToggleButton>
                                                                </Col>
                                                                <Col xl="auto">
                                                                    <ToggleButton  type="checkbox"  id="radio-2" variant="outline-primary" className="btn_radio_2"
                                                                    checked={state.DealType === "rental_deal"}
                                                                    onClick={(e) => setState({...state,DealType:'rental_deal'})}
                                                                    {...register("DealType", {
                                                                        required: !state.DealType
                                                                    })}>
                                                                        <div className="radio-dot"></div>
                                                                        {t('deal_intake_translations:RentalDeal')}
                                                                    </ToggleButton>
                                                                </Col>
                                                                <Col xl="auto">
                                                                    <ToggleButton  type="checkbox"  id="radio-2" variant="outline-primary" className="btn_radio_2"
                                                                    checked={state.DealType === "rental_property"}
                                                                    onClick={(e) => setState({...state,DealType:'rental_property'})}
                                                                    {...register("DealType", {
                                                                        required: !state.DealType
                                                                    })}>
                                                                        <div className="radio-dot"></div>
                                                                        {t('deal_intake_translations:RentalPropertyManagement')}
                                                                    </ToggleButton>
                                                                </Col>
                                                            </Row>
                                                            {errors.DealType && (
                                                            <Form.Text className="text-danger">
                                                                {t('Common.This field is required')}
                                                                </Form.Text>
                                                            )}
                                                        </Form.Group>
                                                        <Row>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:PropertyId')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="propertyId" 
                                                                    {...register("propertyId", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.propertyId && (
                                                                    <Form.Text className="text-danger">
                                                                        {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:City')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="city" 
                                                                    {...register("city", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.city && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>  
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:Location')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="location" 
                                                                    {...register("location", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.location && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:Address')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="address" 
                                                                    {...register("address", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.address && (
                                                                    <Form.Text className="text-danger">
                                                                        {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col> 
                                                        </Row>
                                                    </div>
                                                    <div className="form-section">
                                                        <div className="head">
                                                            <Button variant="primary" onClick={handleSkateholder}>
                                                                {t('deal_intake_translations:StakeHolderDealBtn')}
                                                            </Button>
                                                        </div>
                                                        {showSkateholders &&
                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BuyerName')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="buyerName" 
                                                                        {...register("buyerName", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.location && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:OwnerName')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="ownerName" 
                                                                        {...register("ownerName", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.ownerName && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col> 
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BrokerName')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="brokerName" 
                                                                        {...register("brokerName", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.brokerName && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BuyerPhone')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="buyerPhone" 
                                                                        {...register("buyerPhone", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.buyerPhone && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:OwnerPhone')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="ownerPhone" 
                                                                        {...register("ownerPhone", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.ownerPhone && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col> 
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BrokerPhone')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="brokerPhone" 
                                                                        {...register("brokerPhone", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.brokerPhone && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BuyerEmail')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="buyerEmail" 
                                                                        {...register("buyerEmail", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.buyerEmail && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:OwnerEmail')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="ownerEmail" 
                                                                        {...register("ownerEmail", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.ownerEmail && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col> 
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BrokerEmail')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="brokerEmail" 
                                                                        {...register("brokerEmail", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.brokerEmail && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BuyerCnicID')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="buyerCnicID" 
                                                                        {...register("buyerCnicID", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.buyerCnicID && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:OwnerCnicID')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="ownerCnicID" 
                                                                        {...register("ownerCnicID", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.ownerCnicID && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col> 
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BrokerCnicID')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="brokerCnicID" 
                                                                        {...register("brokerCnicID", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.brokerCnicID && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BuyerAddress')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="buyerAddress" 
                                                                        {...register("buyerAddress", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.buyerAddress && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:OwnerAddress')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="ownerAddress" 
                                                                        {...register("ownerAddress", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.ownerAddress && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col> 
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>{t('deal_intake_translations:BrokerAddress')}<span className="color">*</span></Form.Label>
                                                                        <Form.Control type="text" name="brokerAddress" 
                                                                        {...register("brokerAddress", {
                                                                            required: true
                                                                        })}/>
                                                                        {errors.brokerAddress && (
                                                                        <Form.Text className="text-danger">
                                                                            {t('Common.This field is required')}
                                                                            </Form.Text>
                                                                        )}
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        }
                                                        <Row>
                                                            <Col xl={12}>
                                                                <Form.Group className="form-group form-file">
                                                                    <Form.Label htmlFor="ownership-files" className="btn btn-primary">
                                                                        {t('deal_intake_translations:UploadOwnershipDoc')}
                                                                    </Form.Label>
                                                                    <Form.Control type="file" id="ownership-files" multiple style={{display:"none"}}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={12}>
                                                                <Form.Group className="form-group form-file">
                                                                    <Form.Label htmlFor="id-docs" className="btn btn-primary">
                                                                        {t('deal_intake_translations:UploadIdDoc')}
                                                                    </Form.Label>
                                                                    <Form.Control type="file" id="id-docs" multiple style={{display:"none"}}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:SalePrice')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="salePrice" 
                                                                    {...register("salePrice", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.salePrice && (
                                                                    <Form.Text className="text-danger">
                                                                        {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:TokenAmount')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="tokenAmount" 
                                                                    {...register("tokenAmount", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.tokenAmount && (
                                                                    <Form.Text className="text-danger">
                                                                        {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>{t('deal_intake_translations:Esignature')}<span className="color">*</span></Form.Label>
                                                                    <Form.Control type="text" name="esignature" 
                                                                    {...register("esignature", {
                                                                        required: true
                                                                    })}/>
                                                                    {errors.esignature && (
                                                                    <Form.Text className="text-danger">
                                                                        {t('Common.This field is required')}
                                                                        </Form.Text>
                                                                    )}
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Row className="justify-content-center">
                                                        <Col xl="auto">
                                                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                                                {t('Update')}
                                                                {isSubmitting && <span className="spinner-border spinner-border-sm ml-3 d-block" />}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
}

export default DealIntakeForm;