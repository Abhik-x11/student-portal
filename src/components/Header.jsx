import React from 'react';
import './Header.css';

/**
 * Header Component
 * Receives portal metadata and statistics via Props.
 */
export default function Header({ title, subtitle, totalStudents, avgCgpa, topCgpa }) {
  return (
    <header className="portal-header">
      <div className="container header-inner">
        <div className="brand-wrapper">
          <div className="portal-icon">🎓</div>
          <div>
            <h1 className="portal-title">{title}</h1>
            <p className="portal-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-chip-label">Total Enrolled</span>
            <span className="stat-chip-value">{totalStudents} Students</span>
          </div>

          <div className="stat-chip">
            <span className="stat-chip-label">Average CGPA</span>
            <span className="stat-chip-value highlight-emerald">{avgCgpa} / 10.0</span>
          </div>

          <div className="stat-chip">
            <span className="stat-chip-label">Top Performance</span>
            <span className="stat-chip-value highlight-gold">{topCgpa} CGPA</span>
          </div>
        </div>
      </div>
    </header>
  );
}
