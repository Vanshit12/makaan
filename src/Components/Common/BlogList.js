import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Link  } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Tab, Nav} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const BlogList = (props) => {
		
		const { t } = useTranslation();
    	const bodytext1 = "The Building drawing plan documents will be submitted to Customer Care Counter Nos. 6,7,8 & 9 for detailed checking";
    	const bodytext2 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.";
    	const bodytext3 = "Authority Holder submits the documents to Customer Services Officer at Customer Care Centre, DHA Office";
    	const bodytext4 = "Customer Service Officer will issue the receipt of the documents";
		
		const bloglink1 = "/blog-construction-and-building-control-process-in-dha";
    	const bloglink2 = "/dha-lahore-transfer-process";
    	const bloglink3 = "/foreign-transfer-process-in-dha-if-seller-or-buyer-is-out-of-pakistan";
    	const bloglink4 = "/issuance-of-allocation-intimation-allotment-transfer-letter";

    	const blogImage1 = "assets/images/blog/blog1-2.jpg";
    	const blogImage2 = "assets/images/blog/blog1-2.jpg";
    	const blogImage3 = "assets/images/blog/blog1-2.jpg";
    	const blogImage4 = "assets/images/blog/blog1-2.jpg";
    	const blogTile1 = "Blog Construction and Building Control Process in DHA";
    	const blogTile2 = "DHA Lahore Transfer Process";
    	const blogTile3 = "Foreign Transfer Process in DHA If Seller Or Buyer Is Out Of Pakistan";
    	const blogTile4 = "Issuance of Allocation/Intimation/Allotment/Transfer Letter";
    	
    	const blogs = [
						{propertyImage:blogImage1, propertyTile:blogTile1, bodytext: bodytext1, bloglink:bloglink1},
    					{propertyImage:blogImage2, propertyTile:blogTile2, bodytext: bodytext2, bloglink:bloglink2},
    					{propertyImage:blogImage3, propertyTile:blogTile3, bodytext: bodytext3, bloglink:bloglink3},
    					{propertyImage:blogImage4, propertyTile:blogTile4, bodytext: bodytext4, bloglink:bloglink4}
					];
    	

    	return (
            <section className="recent-blog bg inner-gap">
    			<Container>
    				<Row>
    					<Col>
    						<div className="section-title">
        						<h2 className="heading-2">{props.title}</h2>
        					</div>
    					</Col>
    				</Row>
    				
    				<Row>
						{ 
							blogs.map((blog, index)=>{  
								return(
		        					<Col xl={3} lg={3} md={6} sm={12} key={`blog-${index}`}>
										<BlogCard title={blog.propertyTile} link={blog.bloglink} image={blog.propertyImage} text={blog.bodytext}></BlogCard> 
		        					</Col>
								)
							})
						}
    				</Row>
    			</Container>
    		</section>
			
        );
}

export default BlogList;