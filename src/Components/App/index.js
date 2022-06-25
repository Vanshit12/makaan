import React, { Component } from 'react';
import Header from '../Pages/Home';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
 
class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <Home />
            <Footer />
        </div>
    );
  }
}
export default App;