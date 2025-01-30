import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { ThemeProvider } from "./components/ui/theme-provider"
import FixedNavbar from "./components/FixedNavbar"
import NotFound from "./pages/NotFound"
import Footer from "./components/Footer"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={
            <>
              <FixedNavbar />
              <Navbar/>
              <Home />
              <Footer/>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>    
  )
}

export default App
