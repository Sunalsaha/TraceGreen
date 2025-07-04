import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Menu, X } from 'lucide-react';
import './Header.scss';

const Header = ({ isManufacturer = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="nav-wrapper">
          {/* Logo */}
          <Link to="/" className="logo-link group">
            <div className="logo-icon">
              <Leaf />
              <Shield />
            </div>
            <span className="logo-text">TraceGreen</span>
          </Link>

          {/* Mobile Toggle */}
          <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </div>

          {/* Navigation */}
          <nav className={menuOpen ? 'show' : ''}>
            {isManufacturer ? (
              <>
                <Link to="/manufacturer/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/manufacturer/submit-product" onClick={() => setMenuOpen(false)}>
                  Submit Product
                </Link>
              </>
            ) : (
              <>
                <Link to="/manufacturer/auth" onClick={() => setMenuOpen(false)}>
                  For Businesses
                </Link>
                <Link to="/compare" onClick={() => setMenuOpen(false)}>
                  Compare Products
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
