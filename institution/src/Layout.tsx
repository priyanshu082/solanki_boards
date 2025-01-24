// Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Layout = () => {
  return (
    <div className="flex overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20vw] overflow-auto ">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;