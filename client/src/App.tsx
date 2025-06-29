import { Switch, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/firebaseConfig";
import { queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProgramsPage from "@/pages/ProgramsPage";
import CrowdFundingPage from "@/pages/CrowdFundingPage";
import MerchandisePage from "@/pages/MerchandisePage";
import ConsultationPage from "@/pages/ConsultationPage";
import ProgramDetailPage from "@/pages/ProgramDetailPage";
import AIAssistancePage from "@/pages/AIAssistancePage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import WebcamCapture from "@/pages/WebcamCapture";
import ApplicationPage from "@/pages/applicationPage";
import NotFound from "@/pages/not-found";

const ScrollToTop: React.FC = () => {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

const ProtectedRoute: React.FC<{
  path: string;
  component: React.ComponentType<any>;
}> = ({ component: Component, path }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-sm text-[#183b4e]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    setLocation(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    return null;
  }

  return <Component />;
};

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/programs" component={ProgramsPage} />
      <Route path="/programs/:id" component={ProgramDetailPage} />
      <Route path="/programs/:id/apply" component={() => <ProtectedRoute component={ApplicationPage} path="/programs/:id/apply" />} />
      <Route path="/crowdfunding" component={CrowdFundingPage} />
      <Route path="/merchandise" component={MerchandisePage} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/ai-assistance" component={() => <ProtectedRoute component={AIAssistancePage} path="/ai-assistance" />} />
      <Route
        path="/webcam-capture"
        component={() => (
          <WebcamCapture
            onCapture={() => {}}
            onClose={() => {}}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

const App: React.FC = () => {
  const [location] = useLocation();
  const hideHeader = location.match(/^\/programs\/[^/]+$/);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white font-['Inter',sans-serif]">
          {!hideHeader && <Header />}
          <ScrollToTop />
          <main>
            <Router />
          </main>
          <Footer />
          <FloatingActionButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;