import React, {useEffect} from 'react';
import Router from './Router.js';
import Context from './Context/Context';
import './i18next/i18n.js';
import TagManager from 'react-gtm-module';
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-K3NZRPZ' });
    ReactGA.initialize("G-B3C556S9MS");
    ReactGA.send("pageview");
    },[]);
  
  return (
    <div className="App">
    <Context>
      <Router />
      </Context>
    </div>
  );
}

export default App;
