import React, { Component } from 'react';

const Loader = (props) => {
	    return (
	    	<>
		    {
		    	props.type === 'Section' ? (
				<div className="loader">
	        		<img src="/assets/images/loader.png" alt="" className="loading" style={{width: props.width}}></img>
	        	</div>
		    		):(
	    		<div className="loader-btn">
	    				<img src="/assets/images/loader.png" alt="" className="loading" style={{width: '32px'}}></img>
	    		</div>
	    		)
		    }
         </>   
        );
}

export default Loader;
