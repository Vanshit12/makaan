import React, {useEffect} from 'react';
import { Link  } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';

const  NoRouteFound = (props) => {

  useEffect(() => {
      window.scrollTo(0, 0);
    },[]);
        return (
              	<Container>
              		<Row>
              			<Col xl={12}>
                      <div className="coming-soon">
                        <div className="content_wrap">
                        	<h4 className="text-center">Coming Soon</h4>
                          <p>We are making some final changes. This page will available soon.</p>
                          <div className="pt-3 text-center">
                            <Link className="overlay-link" to="/" className="btn btn-primary">Back to Home</Link>
                          </div>
                        </div>
                      </div>
              			</Col>
              		</Row>
              	</Container>
        )
}
export default NoRouteFound;