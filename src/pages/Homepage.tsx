import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import StripeProvider from '../components/StripeProvider';
import FreeTrialModal from '../components/FreeTrialModal';
import SubscriptionModal from '../components/SubscriptionModal';
import { useHomepage, plans, transcriptionExamples, featuresData, type Feature } from '../hooks/useHomepage';

const Homepage: React.FC = () => {
  const {
    // State
    openFAQ,
    currentTranscriptionIndex,
    currentFeatureIndex,
    subscriptionModal,
    freeTrialModal,
    isMobileMenuOpen,
    isCarouselPaused,
    
    // Functions
    goToFeature,
    goToPrevFeature,
    goToNextFeature,
    toggleFAQ,
    handleSubscribe,
    closeSubscriptionModal,
    openFreeTrialModal,
    closeFreeTrialModal,
    formatPrice,
    toggleMobileMenu,
    closeMobileMenu,
    toggleCarouselPause,
  } = useHomepage();

  // Build features with JSX icons from featuresData
  const features: Feature[] = featuresData.map(feature => ({
    ...feature,
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
      </svg>
    )
  }));

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNextFeature(features.length);
    } else if (isRightSwipe) {
      goToPrevFeature(features.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="absolute w-full top-[8px] px-4 sm:px-6 lg:px-[50px] z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute right-5 lg:hidden p-2 text-white bg-white/10 border-[1px] border-white rounded-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Left Navigation */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-[calc(100%+200px)] items-center justify-end space-x-8 py-2">
              <a href="#pricing" className="text-white font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200">
                Pricing
              </a>
              <a href="#resources" className="text-white font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200">
                Resources
              </a>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <div className="bg-white rounded-b-3xl pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5 lg:pb-7 px-8 sm:px-12 lg:px-16">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#4e69fd] to-[#7c3aed] bg-clip-text text-transparent">
                  SynaptiVoice
                </h1>
              </div>
            </div>

            {/* Desktop Right Navigation */}
            <div className="hidden lg:flex absolute left-1/2 transform translate-x-[200px] items-center space-x-4">
              <Link to="/login" className="text-white font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200">
                Log In
              </Link>
              <Button className="bg-white text-gray-900 font-normal hover:text-white hover:bg-[#3d54e6] transition-all duration-200" onClick={openFreeTrialModal}>
                Get Started Free
              </Button>
            </div>

            {/* Mobile CTA Button */}
            {/* <div className="lg:hidden">
              <Button className="bg-white text-gray-900 font-normal hover:text-white hover:bg-[#3d54e6] transition-all duration-200 text-sm px-3 py-2" onClick={openFreeTrialModal}>
                Get Started
              </Button>
            </div> */}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mx-[10px] mt-4 p-4 border-t border-white/20 rounded-[15px] bg-white">
              <div className="flex flex-col space-y-4">
                <a
                  href="#pricing"
                  className="font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </a>
                <a
                  href="#resources"
                  className="font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200"
                  onClick={closeMobileMenu}
                >
                  Resources
                </a>
                <Link
                  to="/login"
                  className="font-normal px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-200"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br border-[10px] border-white rounded-[30px] md:rounded-[50px] from-[#4e69fd] via-[#6366f1] to-[#7c3aed] py-20 !pt-[150px] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Moving gradient orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-white/10 to-[#8b5cf6]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-[#06b6d4]/20 to-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-[#f472b6]/20 to-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Moving particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Sound Wave Animation */}
        

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-6">
              Transform Your Meetings with 
              <span className="pb-4 block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-gradient-x"> Powered Intelligence</span>
            </h1>
            {/* <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Automatically transcribe, analyze, and extract actionable insights from your recordings. 
              Turn every conversation into valuable business intelligence.
            </p> */}
          </div>
          <div className="h-[85px] flex items-center justify-center opacity-70">
            <div className="flex items-center space-x-1">
              {[...Array(50)].map((_, i) => {
                // Create frequency distribution that mimics human voice
                const centerDistance = Math.abs(i - 25);
                const frequencyWeight = Math.exp(-Math.pow(centerDistance, 2) / 200); // Gaussian distribution
                
                // Calculate speech characteristics
                const baseHeight = 15 + frequencyWeight * 65; // Voice frequency range
                const speechCycle = Math.floor(i / 8); // Group into speech segments
                const isCoreSpeech = centerDistance < 15; // Core speech frequencies
                
                // Determine animation type based on position and speech cycle
                let animationClass = 'animate-sound-wave-pause';
                let animationDelay = i * 0.08;
                let animationDuration = '2s';
                
                if (isCoreSpeech) {
                  // Core speech frequencies - most active
                  if (speechCycle % 3 === 0) {
                    animationClass = 'animate-sound-wave-speaking';
                    animationDuration = '1.2s';
                    animationDelay = (i * 0.05) + (speechCycle * 0.3);
                  } else if (speechCycle % 3 === 1) {
                    animationClass = 'animate-sound-wave-syllable';
                    animationDuration = '0.8s';
                    animationDelay = (i * 0.06) + (speechCycle * 0.2);
                  }
                } else {
                  // Harmonic frequencies - less active
                  if (speechCycle % 4 === 0) {
                    animationClass = 'animate-sound-wave-syllable';
                    animationDuration = '1.5s';
                    animationDelay = (i * 0.1) + (speechCycle * 0.4);
                  }
                }
                
                return (
                  <div
                    key={i}
                    className={`bg-white/40 rounded-full ${animationClass}`}
                    style={{
                      width: '4px',
                      height: `${baseHeight}px`,
                      animationDelay: `${animationDelay}s`,
                      animationDuration: animationDuration,
                      transform: `scaleY(${0.6 + frequencyWeight * 0.4})` // Height variation based on frequency
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          {/* Transcription Animation */}
          <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20 transition-all duration-500">
              <div className="text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-blue-100">Live Transcription</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-blue-200 opacity-60 mr-2">
                      {transcriptionExamples[currentTranscriptionIndex].title}
                    </span>
                    <div className="flex space-x-1">
                      {transcriptionExamples.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentTranscriptionIndex 
                              ? 'bg-white/80' 
                              : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-white/90 text-sm" key={currentTranscriptionIndex}>
                  {transcriptionExamples[currentTranscriptionIndex].lines.map((line, index) => (
                    <div 
                      key={index}
                      className="animate-typing"
                      style={{animationDelay: `${index * 2}s`}}
                    >
                      <span className="opacity-60">[{line.timestamp}]</span> "{line.text}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1.6s'}}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg bg-white text-[#4e69fd] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl"
                onClick={openFreeTrialModal}
              >
                Start Free Trial
              </Button>
              {/* <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-[#4e69fd] hover:scale-105 transition-all duration-300">
                Watch Demo
              </Button> */}
            </div>
            <p className="text-sm text-blue-100 mt-4 opacity-80 animate-fade-in-up" style={{animationDelay: '0.9s'}}>No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Features Section - Carousel */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to capture, analyze, and act on your meeting insights
            </p>
          </div>

          {/* Carousel Container - Card Stack Style */}
          <div className="relative group md:pt-[170px] md:pb-[130px]">
            {/* Play/Pause Button - Shows on hover */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCarouselPause();
              }}
              className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4e69fd]/50 opacity-0 group-hover:opacity-100"
              aria-label={isCarouselPaused ? 'Play carousel' : 'Pause carousel'}
              title={isCarouselPaused ? 'Play carousel' : 'Pause carousel'}
            >
              {isCarouselPaused ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
            </button> */}

            {/* Auto-play indicator */}
            {/* {!isCarouselPaused && (
              <div className="absolute top-4 left-4 z-50 bg-[#4e69fd]/10 text-[#4e69fd] px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-[#4e69fd]/20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-[#4e69fd] rounded-full animate-pulse"></div>
                Auto-playing
              </div>
            )} */}

            {/* Desktop: Multiple Cards Visible - Infinite Loop */}
            <div className="hidden lg:flex justify-center items-center gap-6 perspective-1000">
              {features.map((feature, index) => {
                // Calculate position relative to current with infinite wrap
                let offset = index - currentFeatureIndex;
                const totalFeatures = features.length;
                
                // Normalize offset for infinite loop
                // Handle wrapping: if offset is more than half the length, wrap it around
                if (offset > totalFeatures / 2) {
                  offset -= totalFeatures;
                } else if (offset < -totalFeatures / 2) {
                  offset += totalFeatures;
                }

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isFarLeft = offset === -2;
                const isFarRight = offset === 2;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <div
                    key={index}
                    className={`transition-all duration-700 ease-out cursor-pointer ${
                      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{
                      transform: isCenter 
                        ? 'scale(1) translateX(0) rotateY(0deg)' 
                        : isLeft
                        ? 'scale(0.85) translateX(-60%) rotateY(15deg)'
                        : isRight
                        ? 'scale(0.85) translateX(60%) rotateY(-15deg)'
                        : isFarLeft
                        ? 'scale(0.7) translateX(-120%) rotateY(20deg)'
                        : isFarRight
                        ? 'scale(0.7) translateX(120%) rotateY(-20deg)'
                        : 'scale(0.5)',
                      zIndex: isCenter ? 30 : isLeft || isRight ? 20 : 10,
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-200px',
                      width: '400px'
                    }}
                    onClick={() => goToFeature(index)}
                  >
                    {/* Card */}
                    <Card className={`border-2 p-6 bg-white shadow-2xl transition-all duration-300 ${
                      isCenter 
                        ? 'border-[#4e69fd]/40 shadow-[0_20px_60px_rgba(78,105,253,0.3)]' 
                        : 'border-gray-200'
                    }`}>
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isCenter ? 'scale-110' : 'scale-100'
                        }`}>
                          {feature.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                        
                        {/* Image Placeholder */}
                        {/* <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div> */}
                        
                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {feature.description}
                        </p>

                        <ul className="grid grid-cols-1 gap-3">
                          {feature.items.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Mobile/Tablet: Single Card */}
            <div className="lg:hidden">
              <div 
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentFeatureIndex * 100}%)` }}
                >
                  {features.map((feature, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      {/* Label at top */}
                      {/* <div className="mb-2 text-center">
                        <div className="inline-block bg-black text-white px-4 py-1.5 rounded-t-lg text-sm font-medium">
                          {feature.title}
                        </div>
                      </div> */}
                      
                      <Card className="border-2 border-[#4e69fd]/20 p-6 bg-white shadow-xl">
                        <div className="flex flex-col items-center text-center space-y-4">
                          {/* Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#4e69fd] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg">
                            {feature.icon}
                          </div>
                          
                          {/* Image Placeholder */}
                          {/* <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div> */}

                          <h3 className="text-md font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>

                          {/* Feature Items */}
                          <ul className="space-y-2 text-left">
                            {feature.items.map((item, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-700">
                                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {/* <button
              onClick={() => goToPrevFeature(features.length)}
              className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-lg border-2 border-gray-200 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4e69fd]/50"
              aria-label="Previous feature"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => goToNextFeature(features.length)}
              className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-3 shadow-lg border-2 border-gray-200 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4e69fd]/50"
              aria-label="Next feature"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button> */}

            {/* Dot Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToFeature(index)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4e69fd]/50 ${
                    index === currentFeatureIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-[#4e69fd] to-[#7c3aed]'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free trial, then choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all hover:shadow-lg ${
                  plan.recommended ? 'border-[#4e69fd] shadow-md' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#4e69fd] text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#4e69fd] mt-2">
                    {formatPrice(plan.price)}
                    <span className="text-lg text-gray-600 font-normal">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.recommended ? 'bg-[#4e69fd] hover:bg-[#3d54e6]' : ''}`}
                    variant={plan.recommended ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan)}
                  >
                    Get Started with {plan.name}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    14-day free trial • No credit card required • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                End-to-end encryption
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SOC 2 compliance
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 support
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SynaptiVoice
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How secure is SynaptiVoice?",
                answer: "Absolutely. SynaptiVoice is designed with security, privacy, and control at its core. We follow industry best practices, including end-to-end encryption and continuous monitoring. SynaptiVoice is fully compliant with SOC 2, HIPAA, and GDPR standards. You also get granular, customizable controls to ensure meeting data is only accessible to the intended participants."
              },
              {
                question: "How do I get started with SynaptiVoice?",
                answer: "Getting started with SynaptiVoice is quick and free. You can try it out for yourself, your team, or your entire organization. Enjoy 14 days of complimentary access to the SynaptiVoice Pro plan, including AI recording credits for testing. After your trial, you’ll be automatically moved to the free plan — which stays free forever."
              },
              {
                question: "Who has access to my meeting recordings and notes?",
                answer: "By default, only internal meeting attendees can access your notes and recordings — so private conversations like 1-on-1s or leadership meetings stay confidential. If needed, you can share recordings with others by creating custom recording channels, which can be limited to specific users or opened up to your entire workspace. The choice is yours."
              },
              {
                question: "How does SynaptiVoice capture meeting notes?",
                answer: "SynaptiVoice joins your virtual meetings as a participant and requests permission to join — making it clear to everyone that the meeting will be recorded. You can set SynaptiVoice to join meetings automatically or manually invite it via your conferencing platform."
              },
              {
                question: "Who can use SynaptiVoice for meeting recording and transcription?",
                answer: "Anyone running remote meetings can use SynaptiVoice to capture conversations accurately. Record internal and external calls, 1-on-1s, team check-ins, and all-hands meetings using one secure AI-powered note-taking platform. Flying solo? SynaptiVoice’s individual plan is perfect for keeping your meeting notes and recordings organized and accessible."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4e69fd] to-[#7c3aed]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands  of teams already using SynaptiVoice to unlock insights from their conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-3 text-lg bg-white text-[#4e69fd] hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              onClick={openFreeTrialModal}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SynaptiVoice</h3>
              <p className="text-gray-400 text-sm">
                Transforming conversations into actionable insights with Smart intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#integrations" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">About</button></li>
                <li><button className="hover:text-white text-left">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">Help Center</button></li>
                <li><button className="hover:text-white text-left">Documentation</button></li>
                <li><button className="hover:text-white text-left">Contact Support</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 SynaptiVoice. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscriptionModal.isOpen}
        onClose={closeSubscriptionModal}
        plan={subscriptionModal.plan}
      />

      {/* Free Trial Modal */}
      <FreeTrialModal
        isOpen={freeTrialModal}
        onClose={closeFreeTrialModal}
      />
    </div>
  );
};

const WrappedHomepage: React.FC = () => {
  return (
    <StripeProvider>
      <Homepage />
    </StripeProvider>
  );
};

export default WrappedHomepage;
