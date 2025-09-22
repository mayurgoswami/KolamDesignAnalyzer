import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './HeroSection/HeroSection';
import Header from './Header/Header';
import UploadSection from './UploadSection/UploadSection';
import Loader from './Loader/Loader';
import CanvasSection from './CanvasSection/CanvasSection';
import LearnSection from './LearnSection/LearnSection';
import Footer from './Footer/Footer';
import AboutSection from './AboutSection/AboutSection';


function App() {
  return (
    <Router basename="/KolamDesignAnalyzer">
      <Loader/>
        <Header />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/upload" element={<UploadSection />} />
            <Route path="/canvas" element={<CanvasSection />} />
            <Route path="/learn" element={<LearnSection />} />
          </Routes>
          <AboutSection/>
          <Footer/>
    </Router>
  )
}

export default App;