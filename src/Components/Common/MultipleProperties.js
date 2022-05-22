import React, {useState} from 'react';
import PropertyListCard from '../Common/PropertyListCard';
import { Container, Row, Col} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import AllModal from '../Common/AllModal';
const Properties = (props) => {

    const handlePageClick = () =>{
        props.handlePageClick();
    }
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
    return (
        <div className="Properties">
            <AllModal show={show} handleClose={handleClose} showWhatsapp={showWhatsapp} handleCloseWhatsapp={handleCloseWhatsapp}  showRequest={showRequest} handleCloseRequest={handleCloseRequest}/>
            <section className="properties-list">
    			<Container>
    				<Row>
    					<Col>
    						<div className="section-title">
        						<h2 className="heading-2">{props.heading}</h2>
        					</div>
    					</Col>
    				</Row>
    				<Row>
						{   (props.list && props.list.length > 0) ?
                            (
                                props.list.map((property)=>{  
                                    return(
                                        <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
                                        <PropertyListCard handleShow={handleShow} handleShowWhatsapp={handleShowWhatsapp} handleShowRequest={handleShowRequest} property={property} layout="vertical" Cardtype="normal"></PropertyListCard>
                                            {/* <PropertyCard unit={props.unit} title={property.title} image={property.property_image ? property.property_image : "/assets/images/property/property-1.png"} badge={property.badge} text={property.description} link={'/property/'+property.id}></PropertyCard>  */}
                                        </Col>
                                    )
                                })
                            ) :
                            <div class="no-data-message">
                                <div class="wrap">NO PROPERTIES FOUND</div>
                            </div>
						}
    				</Row>
                    {
                        props.show_paginate && 
                        (
                            <Row>
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
                                    pageRangeDisplayed={12}
                                    pageCount={props.total}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={null}
                                    breakClassName="page-item"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                />
                            </Row>
                        )
                    }
                    
    			</Container>
    		</section>
        </div>
        );
}

export default Properties;
