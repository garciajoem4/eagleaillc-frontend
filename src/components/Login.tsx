import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SynaptiVoice</h1>
        </div>
        
        <SignIn 
          routing="path"
          path="/login"
          fallbackRedirectUrl="/app/recordings"
          signUpUrl={undefined}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg border-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              footerActionLink: "text-blue-600 hover:text-blue-800",
              footerAction: "hidden",
              footer: "hidden"
            },
            layout: {
              socialButtonsVariant: "blockButton",
              socialButtonsPlacement: "bottom"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;
