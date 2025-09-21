import React, { Component } from 'react';
import HeroSection from './HeroSection/HeroSection';
import Header from './Header/Header';
import UploadSection from './UploadSection/UploadSection';
import Loader from './Loader/Loader';
import CanvasSection from './CanvasSection/CanvasSection';
import LearnSection from './LearnSection/LearnSection';
import Footer from './Footer/Footer';

addEventListener('scroll', () => {

});

export class App extends Component {
  render() {
    return (
        <>
        <Loader/>
        <Header/>
        <HeroSection/>
        <UploadSection/>
        <CanvasSection/>
        <LearnSection/>
        <Footer/>
        </>
    )
  }
}

export default App;