import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form} from 'react-bootstrap';
import {Makaan} from '../../request';
import ReactPaginate from 'react-paginate';
import {useLocation, useNavigate} from "react-router-dom";
import PropertyListCard from '../Common/PropertyListCard';
import AllModal from '../Common/AllModal';
import Loader from '../Common/Loader';
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const Properties = (props) => {

    let query = useQuery();
    const inputField = {
        "city":query.get('city'),
        "location":query.get('location'),
        "propertyType":query.get('propertyType'),
        "MinPrice":query.get('MinPrice'),
        "MaxPrice":query.get('MaxPrice'),
        "MaxArea":query.get('MaxArea'),
        "Area":query.get('Area'),
        "Bedrooms":query.get('Bedrooms'),
        "ActiveTab":query.get('ActiveTab'),
        'sort':query.get('sort') == '' ? '' : query.get('sort')
    };
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [state,setState] = useState({
        search_properties:undefined,
        show_paginate:false,
        sort:''
    });

    const [total,setTotal] = useState(0);

    /**
     * contact detail popup
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const handleCloseWhatsapp = () => setShowWhatsapp(false);
    const handleShowWhatsapp = () => {
        setShowWhatsapp(true);
    }
    const [showRequest, setShowRequest] = useState(false);
    const handleCloseRequest = () => setShowRequest(false);
    const handleShowRequest = () => {
        setShowRequest(true);
    }
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        Makaan.post(`search_properties?page=${event.selected+1}`,inputField)
			  .then(res => {
					setState({...state,search_properties: res.data.data.properties.data});
        })
    };

    // Invoke when user changes filter.
    const handleFilterChange = (event) => {
        setState({...state,search_properties: undefined,sort:''})
        // if(event.target.value == ''){
        //     delete inputField.sort
        //     window.scrollTo(0, 0);
        //     Makaan.post(`search_properties?page=1`,inputField)
        //           .then(res => {
        //                 setTotal(res.data.data.properties.last_page);
        //                 setState({...state,search_properties: res.data.data.properties.data, show_paginate:(res.data.data.properties.current_page === 1 ? (res.data.data.properties.data.length < 12 ? false : true) : true)});
        //     })
        // }else{
            inputField.sort = event.target.value
            const queryString = new URLSearchParams(inputField).toString();
            navigate("/search-property?"+queryString);
            window.scrollTo(0, 0);
            Makaan.post(`search_properties?page=1`,inputField)
                  .then(res => {
                        setTotal(res.data.data.properties.last_page);
                        setState({...state,search_properties: res.data.data.properties.data, show_paginate:(res.data.data.properties.current_page === 1 ? (res.data.data.properties.data.length < 12 ? false : true) : true)});
            })
            // Makaan.post(`search_properties?page=1&sort=${event.target.value}`,inputField)
            //       .then(res => {
            //             setState({...state,search_properties: res.data.data.properties.data});
            // })
        // }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        setState({...state,sort: query.get('sort') == '' ? '' : query.get('sort')});
        Makaan.post(`search_properties?page=1`,inputField)
			  .then(res => {
                  console.log(Math.ceil(res.data.data.properties.total/6),'Math.ceil(res.data.data.properties.total/6)Math.ceil(res.data.data.properties.total/6)')
                    setTotal(res.data.data.properties.last_page);
					setState({...state,search_properties: res.data.data.properties.data, show_paginate:(res.data.data.properties.current_page === 1 ? (res.data.data.properties.data.length < 12 ? false : true) : true)});
        })
    },[]);
        return (
            <div className="Properties">
                <AllModal show={show} handleClose={handleClose} showWhatsapp={showWhatsapp} handleCloseWhatsapp={handleCloseWhatsapp} showRequest={showRequest} handleCloseRequest={handleCloseRequest}/>
                <section className="properties-list">
        			<Container>
        				<Row>
        					<Col>
        						<div className="section-title">
	        						<h2 className="heading-2">{t('Common.SearchResult')}</h2>
	        					</div>
        					</Col>
                            <Col>
                                <div className="section-title">
                                    <Form.Select name="sort"
                                    onChange={(e)=>{handleFilterChange(e)}}>
                                        <option value="" selected={inputField.sort == ''}>Popular</option>
                                        <option value="date_desc" selected={inputField.sort == 'date_desc'}>Newest</option>
                                        <option value="price_asc" selected={inputField.sort == 'price_asc'}>Lowest Price</option>
                                        <option value="price_dsc" selected={inputField.sort == 'price_dsc'}>Highest Price</option>
                                    </Form.Select>
                                </div>
                            </Col>
        				</Row>
        				<Row>
    						{
                                state.search_properties !== undefined ? 
    							state.search_properties.map((property, index)=>{  
									return(
			        					<Col xl={4} lg={4} md={6} key={`search-${index}`}>
                                            <PropertyListCard handleShow={handleShow} handleShowWhatsapp={handleShowWhatsapp} handleShowRequest={handleShowRequest} property={property} layout="vertical" Cardtype="normal"></PropertyListCard>
			        					</Col>
									)
								}) :
                                <Loader width="110px" type="Section"></Loader>
							}

                            {
                                !state.search_properties  || !state.search_properties.length ?  <div class="col-12"><div class="no-data-message"><div className="wrap">No result found</div></div></div> :''
                            }
                            
        				</Row>

                        {
                            state.show_paginate && (
                                <Row className="justify-content-center">
                                    <Col xs="auto">
                                    <div class="pagination">
                                        
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={total}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={null}
                                        breakClassName="page-item"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                    />
                                    </div>
                                    </Col>
                                </Row>
                            )
                        }
                        
        			</Container>
        		</section>
            </div>
        );
}

export default Properties;
