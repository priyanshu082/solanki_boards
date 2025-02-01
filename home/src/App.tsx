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
import ChairmanMessage from "./pages/ChairmanMessage";
import CookiePolicy from "./pages/policyPages/CookiePolicy";
import PrivacyPolicy from "./pages/policyPages/PrivacyPolicy";
import SafeguardingPolicy from "./pages/policyPages/SafeGuardingPolicy";
import SaferRecruitmentPolicy from "./pages/policyPages/SaferRecruitmentPolicy";


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
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/child-policy"
            element={
              <Layout>
                <ChildPolicy />
              </Layout>
            }
          />
          <Route
            path="/cookie-policy"
            element={
              <Layout>
                <CookiePolicy />
              </Layout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/safeguarding-policy"
            element={
              <Layout>
                <SafeguardingPolicy />
              </Layout>
            }
          />
          <Route
            path="/saferrecruitment-policy"
            element={
              <Layout>
                <SaferRecruitmentPolicy />
              </Layout>
            }
          />
          <Route
            path="/why-sbcodl"
            element={
              <Layout>
                <WhySBCODL />
              </Layout>
            }
          />
          <Route
            path="/chairman"
            element={
              <Layout>
                <ChairmanMessage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;