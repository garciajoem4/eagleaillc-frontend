import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Homepage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">SynaptiVoice</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-8">
                  <a href="#products" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Products
                  </a>
                  <a href="#pricing" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Pricing
                  </a>
                  <a href="#resources" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Resources
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Meetings with 
              <span className="text-blue-600 block"> AI-Powered Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Automatically transcribe, analyze, and extract actionable insights from your recordings. 
              Turn every conversation into valuable business intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Transcription */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Transcription</h3>
                  <p className="text-gray-600 mb-4">
                    Accurate, real-time transcription with speaker identification and timestamp precision
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 99%+ accuracy rate</li>
                    <li>• Multi-language support</li>
                    <li>• Speaker identification</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Smart Intelligence */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Intelligence Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Automatically extract action items, decisions, issues, and questions from conversations
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Action item detection</li>
                    <li>• Decision tracking</li>
                    <li>• Issue identification</li>
                    <li>• Question extraction</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Advanced Search */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Search & Filter</h3>
                  <p className="text-gray-600 mb-4">
                    Find any moment in your recordings with powerful search and time-based filtering
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Full-text search</li>
                    <li>• Time range filtering</li>
                    <li>• Content categorization</li>
                    <li>• Instant results</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Audio Playback */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a1 1 0 011-1h1m4 1h1a1 1 0 011 1v1m-4 3v1a1 1 0 01-1 1H9.586a1 1 0 01-.707-.293L6.465 13.293A1 1 0 016 12.586V11a1 1 0 011-1h1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrated Audio Playback</h3>
                  <p className="text-gray-600 mb-4">
                    Listen to original recordings with synchronized transcript highlighting
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• High-quality playback</li>
                    <li>• Sync with transcript</li>
                    <li>• Speed controls</li>
                    <li>• Bookmark moments</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Export Options */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Export Options</h3>
                  <p className="text-gray-600 mb-4">
                    Export your data in multiple formats for seamless integration with your workflow
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• PDF reports</li>
                    <li>• Word documents</li>
                    <li>• JSON data</li>
                    <li>• Plain text</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Security & Privacy */}
            <Card className="border-2 hover:border-blue-200 transition-colors p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-gray-600 mb-4">
                    Bank-level security with end-to-end encryption and compliance certifications
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• End-to-end encryption</li>
                    <li>• SOC 2 compliance</li>
                    <li>• GDPR compliant</li>
                    <li>• Private cloud options</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="resources" className="py-20 bg-gray-50">
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
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands  of teams already using SynaptiVoice to unlock insights from their conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
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
                Transforming conversations into actionable insights with AI-powered intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#integrations" className="hover:text-white">Integrations</a></li>
                <li><button className="hover:text-white text-left">API</button></li>
                <li><button className="hover:text-white text-left">Security</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">About</button></li>
                <li><button className="hover:text-white text-left">Blog</button></li>
                <li><button className="hover:text-white text-left">Careers</button></li>
                <li><button className="hover:text-white text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white text-left">Help Center</button></li>
                <li><button className="hover:text-white text-left">Documentation</button></li>
                <li><button className="hover:text-white text-left">Status</button></li>
                <li><button className="hover:text-white text-left">Contact Support</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 SynaptiVoice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
