import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="dark:bg-zinc-900/80 rounded-xl shadow-xl p-10 flex flex-col items-center gap-6 border border-border max-w-md w-full">
        <h1 className="text-7xl font-extrabold text-primary drop-shadow mb-2">404</h1>
        <p className="text-2xl font-semibold text-foreground mb-2">Page Not Found</p>
        <p className="text-base text-muted-foreground mb-4">Sorry, the page you are looking for does not exist or has been moved.</p>
        <a href="/" className="inline-block px-6 py-2 rounded-md bg-primary text-white font-medium shadow hover:bg-primary/90 transition-colors">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
