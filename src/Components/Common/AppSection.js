import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AppSection = (props) => {

	const { t } = useTranslation();
        return (
            <section className="mobile-app-download pb-lg-0">
    			<Container>
    				<Row className="align-items-center">
    					<Col xl={6} lg={5}>
    						<div className="mobile-app-image">
    							<img src="/assets/images/home/mobile-app.png" alt="" className="img-fluid d-none d-lg-inline"></img>
    							<img src="/assets/images/home/mobile-app-2.png" alt="" className="img-fluid d-lg-none"></img>
    						</div>
    					</Col>
    					<Col xl={6} lg={7}>
							<div className="mobile-app-content">
								<h2>{t('home_translations:MakaanAppHeading')}</h2>
								<h4>{t('home_translations:MakaanAppDescription')}</h4>
								<div className="btn-group">
									<div className="app-btn">
										<Link to="">
											
											<img src="/assets/images/icons/download/google.png" alt="" className="img-fluid"></img>
										</Link>
										<Link to="">
											<img src="/assets/images/icons/download/app-store.png" alt="" className="img-fluid"></img>
										</Link>
									</div>
									<div className="qr">
										<img src="/assets/images/icons/download/qr-icon.png" alt="" className="img-fluid"></img>
										<p>{t('home_translations:QRCodeText')}</p>
									</div>
								</div>
							</div>
    					</Col>
    				</Row>
    			</Container>
    		</section>
        );
}

export default AppSection;	