import React from 'react';
import { Zap, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

const Footer = () => (
  <footer
    className="bg-[#f5f3f1] border-t border-[#e7e5e4] py-10"
    style={{ fontFamily: "'Outfit', sans-serif" }}
  >
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo + tagline */}
      <div className="flex flex-col items-center md:items-start gap-1">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center">
            <Zap size={13} className="text-[#1c1917]" fill="white" />
          </div>
          <span className="text-[#1c1917] font-semibold text-base">
            Build<span className="text-[#c2410c]">Buddy</span>
          </span>
        </Link>
        <p
          className="text-[#57534e]/60 text-xs"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Made for builders, by builders.
        </p>
      </div>

      {/* Links */}
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {footerLinks.map(({ label, href, external }) =>
          external ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#57534e]/80 hover:text-[#57534e] text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              {label === 'GitHub' ? <Github size={14} /> : null}
              {label}
            </a>
          ) : (
            <a
              key={label}
              href={href}
              className="text-[#57534e]/80 hover:text-[#57534e] text-sm transition-colors duration-200 cursor-pointer"
            >
              {label}
            </a>
          )
        )}
      </nav>

      {/* Copyright */}
      <p
        className="text-[#1c1917]/25 text-xs"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        © 2026 BuildBuddy
      </p>
    </div>
  </footer>
);

export default Footer;
