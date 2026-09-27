import React from 'react';
import './Footer.css';

/**
 * Footer Component
 * Receives metadata strictly via Props.
 */
export default function Footer({ portalName, academicSession, courseCode, developerName }) {
  return (
    <footer className="portal-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="footer-brand">
            🎓 {portalName}
            <span className="footer-assignment-badge">Assignment 2: Props Management</span>
          </div>
          <p className="footer-note">
            Built using reusable React components, explicit Props passing, and dynamic CGPA sorting.
          </p>
        </div>

        <div className="footer-right">
          <span>Session: {academicSession}</span>
          <span>•</span>
          <span>Course: {courseCode}</span>
          <span>•</span>
          <span>Developed by: <strong>{developerName}</strong></span>
        </div>
      </div>
    </footer>
  );
}
