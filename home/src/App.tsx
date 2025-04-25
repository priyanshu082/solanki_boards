import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import Home from "./pages/home/Home";
import { ThemeProvider } from "./components/ui/theme-provider";
import FixedNavbar from "./components/FixedNavbar";
import NotFound from "./pages/home/NotFound";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ReactNode } from 'react';
import ChildPolicy from "./pages/home/policyPages/ChildPolicy";
import WhySBCODL from "./pages/home/WhySBCODL";
import ChairmanMessage from "./pages/home/about/ChairmanMessage";
import CookiePolicy from "./pages/home/policyPages/CookiePolicy";
import PrivacyPolicy from "./pages/home/policyPages/PrivacyPolicy";
import SafeguardingPolicy from "./pages/home/policyPages/SafeGuardingPolicy";
import SaferRecruitmentPolicy from "./pages/home/policyPages/SaferRecruitmentPolicy";
import AdmissionPolicy from "./pages/home/policyPages/AdmissionPage";
import InstituteRegistrationForm from "./pages/home/accredited/InstituteForm";
import BoardProfile from "./pages/home/about/BoardProfile";
import COE from "./pages/home/about/COE";
import MissionVision from "./pages/home/about/MissionVission";
import GoverningBody from "./pages/home/council/GoverningBody";
import ExcecutiveCommittee from "./pages/home/council/ExcecutiveCommittee";
import PowersOfSBCODL from "./pages/home/council/PowerOfSBCODL";
import ByeLawsRules from "./pages/home/council/ByeLawsRules";
import Prospectus from "./pages/home/council/Prospectus";
import MiddleYears from "./pages/home/programmes/MiddleYears";
import Diploma from "./pages/home/programmes/Diploma";
import UpperYears from "./pages/home/programmes/UpperYears";
import UG from "./pages/home/programmes/UG/UG";
import Research from "./pages/home/programmes/Research";
import PG from "./pages/home/programmes/PG/PG";
import Certificate from "./pages/home/programmes/Certificate";
import Faculty from "./pages/home/Faculty";
import ContactUs from "./pages/home/ContactUs";
import StudentAdmissionForm from "./pages/home/StudentAdmissionForm";
import CourseDetailPG from "./pages/home/programmes/PG/CourseDetailPG";
import CourseDetailUG from "./pages/home/programmes/UG/CourseDetailUG";
import Membership from "./pages/home/Recognition/Membership";
import PaymentPage from "./pages/home/PaymentPage";
import Recognition from "./pages/home/Recognition/Recognition";
import Constitutional from "./pages/home/Recognition/Constitutional";
import Autonomous from "./pages/home/Recognition/autonomous";
import VisitorCounter from "./components/VisitorCounter";
import FindInstitute from "./pages/home/accredited/FindInstitute";

// Initialize Google Analytics with your tracking ID
ReactGA.initialize("G-WDZG6SYQFM"); // Replace with your actual Google Analytics measurement ID

// Analytics tracking component
function AnalyticsTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Track pageview when location changes
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  
  return null;
}

interface LayoutProps {
  children: ReactNode;
}

// Layout component with typed props
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <div className="flex flex-col z-[10]">
    <FixedNavbar />
    <Navbar />
    </div>
      <div className="mt-[165px] lg:mt-[0px]">
      {children}
      </div>
      <VisitorCounter/>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {/* This component tracks all page views */}
        <AnalyticsTracker />
        <Routes>
          {/* NotFound route without Layout */}
          <Route path="*" element={<NotFound />} />
          
          {/* Routes with Layout (Navbar and Footer) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/admission" element={<Layout><AdmissionPolicy /></Layout>} />
          <Route path="/child-policy" element={<Layout><ChildPolicy /></Layout>} />
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
          <Route path="/programs/middle-years" element={<Layout><MiddleYears /></Layout>} /> 
          <Route path="/programs/upper-years" element={<Layout><UpperYears /></Layout>} /> 
          <Route path="/programs/diploma" element={<Layout><Diploma /></Layout>} /> 
          <Route path="/programs/ug" element={<Layout><UG /></Layout>} /> 
          <Route path="/programs/pg" element={<Layout><PG /></Layout>} /> 
          <Route path="/programs/certificate" element={<Layout><Certificate /></Layout>} /> 
          <Route path="/programs/research" element={<Layout><Research /></Layout>} /> 
          <Route path="/faculty" element={<Layout><Faculty /></Layout>} /> 
          <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} /> 
          <Route path="/ugcourse/:id" element={<Layout><CourseDetailUG /></Layout>} />
          <Route path="/pgcourse/:id" element={<Layout><CourseDetailPG /></Layout>} />
          <Route path="/membership-accreditation" element={<Layout><Membership /></Layout>} />
          <Route path="/accredited-institute-registration" element={<Layout><InstituteRegistrationForm /></Layout>} />
          <Route path="/student-admission-form" element={<Layout><StudentAdmissionForm /></Layout>} />
          <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />
          <Route path="/recognition" element={<Layout><Recognition /></Layout>} />
          <Route path="/constitutional-reliability" element={<Layout><Constitutional /></Layout>} />
          <Route path="/autonomous-institution" element={<Layout><Autonomous /></Layout>} />
          <Route path="/institutes/find" element={<Layout><FindInstitute /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;