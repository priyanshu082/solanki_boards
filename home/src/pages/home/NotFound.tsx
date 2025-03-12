import { Button } from '../../components/ui/button';
import { Card,CardContent } from '../../components/ui/card';
import { Ghost, Home, RefreshCcw } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Fun ghost icon that floats */}
            <div className="animate-bounce">
              <Ghost className="w-20 h-20 text-primary" />
            </div>
            
            {/* Main error message */}
            <div className="space-y-2 text-primary">
              <h1 className="text-4xl font-bold ">404</h1>
              <h2 className="text-xl font-semibold ">Page Not Found</h2>
              <p >
                Oops! Looks like this page got spooked and ran away.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                variant="default"
                className="space-x-2"
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Button>
              
              <Button 
                variant="outline"
                className="space-x-2 text-primary"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;