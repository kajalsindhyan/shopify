import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import StorefrontPage from './pages/StorefrontPage';

const App: React.FC = () => {
  // In a real Shopify app, Shopify's routing would determine whether to show
  // the Admin page or the Theme App Extension. We use HashRouter here to
  // simulate navigation between the two for standalone development and demonstration.

  const Nav: React.FC = () => (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-center space-x-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-white font-semibold text-lg px-4 py-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          Butikkfront (Kalkulator)
        </NavLink>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            `text-white font-semibold text-lg px-4 py-2 rounded-md transition-colors duration-300 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          Admin (Materialbehandling)
        </NavLink>
      </div>
    </nav>
  );

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Nav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<StorefrontPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; 2024 3D Print Service. Alle rettigheter reservert.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
