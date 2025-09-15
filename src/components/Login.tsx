import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn, useUser, useSession } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, isLoaded } = useSignIn();
  const { user } = useUser();
  const { session } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate Clerk is ready
      if (!isLoaded || !signIn) {
        setError('Authentication system not ready. Please try again.');
        setIsLoading(false);
        return;
      }

      // Sign in with Clerk using the provided credentials
      // User must exist in Clerk dashboard with matching username/password
      const result = await signIn.create({
        identifier: username,
        password: password,
      });

      if (result.status === 'complete') {
        // Sign-in successful
        console.log('🎉 Login Successful!');
        console.log('Sign-in result:', result);
        
        // Redirect to recordings page
        setTimeout(() => { 
          navigate('/app/recordings'); 
        }, 1000);
      } else {
        // Sign-in requires additional steps (2FA, etc.)
        console.log('Sign-in requires additional steps:', result.status);
        setError('Sign-in requires additional verification steps');
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      
      // Handle specific Clerk errors
      if (err.errors) {
        const errorMessage = err.errors[0]?.message || 'Authentication failed';
        setError(errorMessage);
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
      
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold text-gray-900">SynaptiVoice</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
