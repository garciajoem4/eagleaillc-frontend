import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

interface TrialRestrictionProps {
  feature: string;
  description: string;
}

const TrialRestriction: React.FC<TrialRestrictionProps> = ({ feature, description }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            {feature} Restricted
            <Badge variant="outline">Trial</Badge>
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-600">
            This feature is only available in the full version of SynaptiVoice.
          </p>
          <div className="space-y-2">
            <Link to="/login" className="block">
              <Button className="w-full">Upgrade to Full Access</Button>
            </Link>
            <Link to="/trial" className="block">
              <Button variant="outline" className="w-full">Back to Trial</Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="ghost" className="w-full">Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialRestriction;
