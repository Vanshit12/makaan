import React, { useRef } from 'react';
import { Button, Modal} from 'react-bootstrap';

const WhatsappModal = ({show, handleClose, showWhatsapp, handleCloseWhatsapp, showRequest, handleCloseRequest}) => {
    const [copyText, setCopyText] = React.useState({
        whatsapp:'Copy'
    });
    const whatsappref = useRef(null);
    const copyToClipboard = (type) => {
        whatsappref.current.select();
        setCopyText({...copyText,whatsapp:'Copied'});
        document.execCommand('copy');
    };
    const CloseWhatsapp = () => {
        setCopyText({...copyText, whatsapp:'Copy'});
        handleCloseWhatsapp();
    }
    const Close = () => {
        setCopyText({...copyText, whatsapp:'Copy'});
        handleClose();
    }

    const CloseRequest = () => {
        handleCloseRequest();
    }
    
    return (
        <>
            {/* Whatsapp details popup for call */}
            <Modal show={showWhatsapp} onHide={CloseWhatsapp}>
                <Modal.Header closeButton>
                    <Modal.Title>Whatsapp Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="ag_detail">
                        <div className="contact-list">
                            <input  ref={whatsappref} style={{opacity:0, position: "absolute", "z-index": -999, pointerEvents:"none"}} value="98765445210" />
                            
                            <div className="contact">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" color="currentColor">
                                <g>
                                    <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M1,12.6c0-0.4,0-0.8,0-1.2c0-0.1,0-0.2,0-0.3   c0-0.8,0.2-1.5,0.4-2.3C2,7.2,2.8,5.7,4.1,4.4c1.7-1.7,3.7-2.8,6-3.2c0.4-0.1,0.8-0.1,1.3-0.2c0.4,0,0.9,0,1.3,0   c0.3,0,0.6,0.1,0.8,0.1c2.2,0.3,4.1,1.2,5.8,2.7c1.9,1.7,3.1,3.8,3.6,6.4c0.1,0.4,0.1,0.8,0.2,1.2c0,0.4,0,0.9,0,1.3   c0,0.1,0,0.2,0,0.2c-0.1,1.6-0.6,3-1.3,4.4c-1.1,2.1-2.8,3.6-4.9,4.6c-0.9,0.5-1.9,0.8-3,0.9c-0.4,0.1-0.8,0.1-1.1,0.2   c-0.4,0-0.9,0-1.3,0c-0.1,0-0.1,0-0.2,0c-1.6-0.1-3.1-0.6-4.5-1.4c-0.1-0.1-0.3-0.1-0.4,0c-1.3,0.4-2.7,0.7-4,1.1   c-0.3,0.1-0.6,0-0.8-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0.4-1.3,0.7-2.7,1.1-4c0-0.2,0-0.3,0-0.4c-0.6-1.1-1-2.3-1.2-3.6   C1.1,13.4,1.1,13,1,12.6z M3,21c0.1,0,0.2,0,0.2,0c1-0.3,2-0.5,3-0.8c0.3-0.1,0.5,0,0.8,0.1c0.6,0.3,1.3,0.7,1.9,0.9   c1.6,0.6,3.3,0.7,5,0.3c1.8-0.4,3.4-1.2,4.7-2.5c2.4-2.3,3.3-5.1,2.9-8.3c-0.3-2.1-1.2-3.9-2.7-5.4c-2.4-2.4-5.4-3.3-8.8-2.7   C7.7,3,5.8,4.2,4.3,6.2c-1.6,2.1-2.2,4.4-1.9,7C2.6,14.5,3,15.8,3.7,17c0.2,0.3,0.2,0.5,0.1,0.8c-0.3,1-0.5,2-0.8,3   C3,20.9,3,20.9,3,21z"/>
                                    <path stroke="#currentColor" strokeWidth="0.5" strokeMiterlimit="10" d="M14.3,18c-1.8,0-3.2-0.7-4.6-1.6c-1.4-1-2.5-2.4-3.1-4   c-0.5-1.2-0.7-2.5-0.4-3.7c0.2-1,0.8-1.8,1.8-2.4C8.5,5.9,9.2,6,9.7,6.4c0.4,0.4,0.9,0.8,1.3,1.3c0.7,0.7,0.6,1.7-0.2,2.3   c-0.1,0.1-0.3,0.2-0.5,0.3c0,0-0.1,0.1-0.1,0.2c0.2,0.8,0.4,1.5,0.9,2.1c0.6,0.7,1.4,1,2.2,1.2c0.3,0.1,0.4,0,0.5-0.2   c0.2-0.4,0.5-0.7,0.9-0.9c0.5-0.2,1-0.2,1.4,0.2c0.5,0.5,1,0.9,1.5,1.5c0.4,0.4,0.4,1.1,0.1,1.7c-0.6,1.1-1.6,1.6-2.7,1.8   C14.7,17.9,14.4,17.9,14.3,18z M7.4,9.7c0,1.1,0.3,2,0.8,2.9c0.8,1.4,1.8,2.4,3.2,3.2c1,0.5,2,0.9,3.2,0.8c0.8-0.1,1.5-0.3,2-1.1   c0.1-0.2,0.1-0.3,0-0.4c-0.3-0.3-0.7-0.7-1-1c-0.2-0.2-0.3-0.2-0.4,0c-0.2,0.3-0.4,0.5-0.5,0.8c-0.2,0.3-0.4,0.4-0.8,0.3   c-0.3-0.1-0.7-0.1-1-0.2c-1.1-0.3-2.2-0.9-2.9-1.8c-0.6-0.9-1-1.8-1.1-2.9c-0.1-0.4,0.1-0.7,0.5-1C9.4,9.2,9.6,9.1,9.8,9   c0.2-0.2,0.2-0.2,0-0.4C9.6,8.3,9.4,8,9.1,7.8c-0.5-0.5-0.6-0.5-1.1,0c0,0,0,0,0,0C7.5,8.4,7.4,9.1,7.4,9.7z"/>
                                </g>
                            </svg>
                                </div>
                                <div className="contact-detail">
                                    <p>Connect with Whatsapp</p>
                                    <a target="_blank" rel="noopener noreferrer" className="phone_click" id="phone" href="https://api.whatsapp.com/send?phone=98765445210&text=Join WatsApp Group to ask question/stay">
                                        +98-765-445-210
                                    </a>
                                </div>
                                <div className="contact-copy">
                                    <Button variant="transparent text-color" onClick={()=>copyToClipboard('whatsapp')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                        {copyText.whatsapp}
                                    </Button>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showRequest} onHide={CloseRequest}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyRequestForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default WhatsappModal;