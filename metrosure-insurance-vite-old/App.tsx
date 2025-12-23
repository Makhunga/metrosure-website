import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import Approach from './components/Approach';
import Products from './components/Products';
import Difference from './components/Difference';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <StatsBar />
        <Features />
        <Approach />
        <Products />
        <Difference />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default App;