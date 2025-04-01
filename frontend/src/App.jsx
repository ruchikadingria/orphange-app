// App.jsx
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import OrphanageOverview from './components/OrphanageOverview';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import DonationPage from './components/DonationPage';
import PhotoGallery from './components/PhotoGallery';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'radial-gradient(circle at top left, rgba(220, 252, 231, 0.5), rgba(255, 255, 255, 0))' }}>
            <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-green-400/20 to-lime-400/20 rounded-full blur-[80px] -z-10"></div>
            <div className="overflow-hidden">
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <PurposeSection />
                                <FeaturesSection />
                                <OrphanageOverview />
                                <PhotoGallery />
                                <TestimonialsSection />
                                <ContactUs />
                            </>
                        }
                    />
                    <Route path="/donate" element={<DonationPage />} />
                </Routes>
                <Footer />
            </div>
        </main>
    );
}

export default App;