import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { Card, Button} from 'react-bootstrap';

class BlogCard extends Component {
	constructor(props) {
        super(props);
       	this.state = {
       		images:[]
        };
    }
    render() {
        return (
            <Card className="blog-card">
            	<div className="image-wrap">
					<Card.Img variant="top" src={this.props.image} />
				</div>
			  	<Card.Body>
				  	<div className="body-content">
				  		<Card.Title>{this.props.title}</Card.Title>
					    <Card.Text>{this.props.text}</Card.Text>
					</div>
					<div class="card-action">
						<Link to={this.props.link} className="btn btn-primary">Read More</Link>
					</div>
			  	</Card.Body>
			</Card>
        );
    }
}

export default BlogCard;
