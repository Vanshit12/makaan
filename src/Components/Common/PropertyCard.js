import React from 'react';
import { Card, Badge} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link  } from 'react-router-dom';

const PropertyCard = (props) => {

	const { t } = useTranslation();

        return (
			<Link className="card-link" to={props.link}>
				<Card className="property-card">
					<div className="image-wrap">
						<div class={`layout layout-${(props.image && props.image.length > 0) ? (props.image.length >= props.imagesShow ? props.imagesShow : props.image.length) : 1}`}>
						{
							(props.image && props.image.length > 0) ?
							(
								props.image.map((image,index)=>{
										return(
												(props.imagesShow >= index+1) &&
												(
													<div class={`img img-${index+1}`}>
														<Card.Img variant="top" src={image} />
													</div>
												)
										)
								})
							):
							(
								<div class={`img img-1`}>
									<Card.Img variant="top" src={props.dummyImage} />
								</div>
							)
						}
						</div>
						{
								props.badge && 
								(<Badge bg="primary">
									<span>{props.badge}</span>
								</Badge>)
							}
					</div>
					<Card.Body>
						<div className="body-content">
							
							<Card.Title>{props.title}</Card.Title>
							<Card.Text>{props.text}</Card.Text>
						</div>
					</Card.Body>
				</Card>
			</Link>
        );
}

export default PropertyCard;
