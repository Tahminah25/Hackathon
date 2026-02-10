import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-display font-black text-primary/10 select-none mb-[-2rem]">404</div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">Lost in the Neighborhood?</h1>
        <p className="text-muted-foreground mb-10 text-lg">
          It looks like the page you're looking for has moved out or never lived here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
