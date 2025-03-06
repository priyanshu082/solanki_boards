import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className="flex overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30 md:w-[20vw] ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-[20vw]">
        {/* Fixed Navbar */}
        <div className="fixed  md:left-[20vw] left-0 right-0 top-0 z-20">
          <Navbar />
        </div>

        {/* Main Content Below Navbar */}
        <div className="mt-16 overflow-auto md:w-[80vw] w-[100vw]">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
