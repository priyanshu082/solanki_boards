import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/ui/theme-provider";
import FixedNavbar from "./components/FixedNavbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ReactNode } from 'react';
import ChildPolicy from "./pages/policyPages/ChildPolicy";
import WhySBCODL from "./pages/WhySBCODL";
import ChairmanMessage from "./pages/about/ChairmanMessage";
import CookiePolicy from "./pages/policyPages/CookiePolicy";
import PrivacyPolicy from "./pages/policyPages/PrivacyPolicy";
import SafeguardingPolicy from "./pages/policyPages/SafeGuardingPolicy";
import SaferRecruitmentPolicy from "./pages/policyPages/SaferRecruitmentPolicy";
import AdmissionPolicy from "./pages/policyPages/AdmissionPage";
import InstituteRegistrationForm from "./pages/InstituteForm";
import BoardProfile from "./pages/about/BoardProfile";
import COE from "./pages/about/COE";
import MissionVision from "./pages/about/MissionVission";
import GoverningBody from "./pages/council/GoverningBody";
import ExcecutiveCommittee from "./pages/council/ExcecutiveCommittee";
import PowersOfSBCODL from "./pages/council/PowerOfSBCODL";
import ByeLawsRules from "./pages/council/ByeLawsRules";
import Prospectus from "./pages/council/Prospectus";

interface LayoutProps {
  children: ReactNode;
}

// Layout component with typed props
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <FixedNavbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* NotFound route without Layout */}
          <Route path="*" element={<NotFound />} />
          
          {/* Routes with Layout (Navbar and Footer) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/child-policy" element={<Layout><ChildPolicy /></Layout>} />
          <Route path="/admission" element={<Layout><AdmissionPolicy /></Layout>} />
          <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/institute-registration" element={<Layout><InstituteRegistrationForm /></Layout>} />
          <Route path="/safeguarding-policy" element={<Layout><SafeguardingPolicy /></Layout>} />
          <Route path="/saferrecruitment-policy" element={<Layout><SaferRecruitmentPolicy /></Layout>} />
          <Route path="/why-sbcodl" element={<Layout><WhySBCODL /></Layout>} />
          <Route path="/chairman-message" element={<Layout><ChairmanMessage /></Layout>} />
          <Route path="/board-profile" element={<Layout><BoardProfile /></Layout>} />
          <Route path="/coe" element={<Layout><COE /></Layout>} />
          <Route path="/mission-vision" element={<Layout><MissionVision /></Layout>} /> 
          <Route path="/governing-body" element={<Layout><GoverningBody /></Layout>} /> 
          <Route path="/executive-committee" element={<Layout><ExcecutiveCommittee /></Layout>} /> 
          <Route path="/powers-of-sbcodl" element={<Layout><PowersOfSBCODL /></Layout>} /> 
          <Route path="/bye-laws-rules" element={<Layout><ByeLawsRules /></Layout>} /> 
          <Route path="/prospectus" element={<Layout><Prospectus /></Layout>} /> 
        </Routes>
        
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;