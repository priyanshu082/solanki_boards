import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; // Import Navbar component

const Layout = () => {
  return (
    <div className="flex overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20vw]">
        {/* Fixed Navbar */}
        <div className="fixed left-[20vw] right-0 top-0 z-20">
          <Navbar />
        </div>

        {/* Main Content Below Navbar */}
        <div className="mt-16 overflow-auto">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
