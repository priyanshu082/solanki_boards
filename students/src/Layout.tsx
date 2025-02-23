import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component

const Layout = () => {
  return (
    <div className="flex overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content Below Navbar */}
        <div className="mt-8 overflow-auto">
          <main >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
