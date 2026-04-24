import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar: React.FC = () => {
  const navLinks = [
    { id: 1, label: 'Employees', href: '/employees' },
    { id: 2, label: 'Organization', href: '/organization' },

  ];

  return (
    <section className="nav-bar">
      <nav aria-label="Main navigation">
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};