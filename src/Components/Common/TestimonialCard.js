import React, { Component } from 'react';
// import { useTranslation } from 'react-i18next';
import { Card} from 'react-bootstrap';


class TestimonialCard extends Component {
	render() {
        return (
            <Card className="testimonial-card">
				<Card.Body>
				  	<div className="body-content">
						<svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.8642 12.312C17.7975 11.8427 16.9655 11.1387 16.3682 10.2C15.7709 9.26137 15.4722 8.15204 15.4722 6.87204C15.4722 5.03737 16.0482 3.54404 17.2002 2.39204C18.3522 1.2827 19.8242 0.728036 21.6162 0.728036C23.4082 0.728035 24.9016 1.30404 26.0962 2.45604C27.2482 3.60804 27.8242 5.08004 27.8242 6.87204C27.8242 7.72537 27.7176 8.5787 27.5042 9.43204C27.2909 10.2854 26.8216 11.5654 26.0962 13.272L22.3842 22.488L16.0482 22.488L18.8642 12.312ZM3.76022 12.312C2.69355 11.8427 1.86155 11.1387 1.26422 10.2C0.666883 9.26137 0.368216 8.15204 0.368216 6.87204C0.368216 5.03737 0.944216 3.54404 2.09622 2.39204C3.24822 1.2827 4.72022 0.728037 6.51222 0.728037C8.30422 0.728037 9.79755 1.30404 10.9922 2.45604C12.1442 3.60804 12.7202 5.08004 12.7202 6.87204C12.7202 7.72537 12.6136 8.5787 12.4002 9.43204C12.1869 10.2854 11.7176 11.5654 10.9922 13.272L7.28022 22.488L0.944218 22.488L3.76022 12.312Z" fill="#828282"/>
						</svg>
					    <Card.Text>{this.props.testimonial.review}</Card.Text>
				  		<div className="meta">
				  			<div className="user">
				  				<Card.Title>{this.props.testimonial.user.first_name+' '+this.props.testimonial.user.last_name}</Card.Title>
				  				<p>{this.props.testimonial.designation}</p>
				  			</div>
				  			<div className="status">
				  				verified 
				  				<img src="assets/images/icons/testimonial/verify-1.png" alt="" className="img-fluid"></img>
				  			</div>
				  		</div>
					</div>
			  	</Card.Body>
			</Card>
        );
    }
}

export default TestimonialCard;
