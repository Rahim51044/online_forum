// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const RootLayout = () => {
//     return (
//         <div className='bg-gray-900'>
//             <Navbar></Navbar>
//             <Outlet></Outlet>
//             <Footer></Footer>
//         </div>
//     );
// };

// export default RootLayout;



import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        // Gradient background: from blue-900 to black
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-black to-black text-white flex flex-col">
            <Navbar />
            {/* Outlet should take available space so footer sticks bottom */}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
