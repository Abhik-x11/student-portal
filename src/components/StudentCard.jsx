import React from 'react';
import './StudentCard.css';

/**
 * StudentCard Component
 * Displays individual student details passed strictly via Props.
 * Props:
 * - name: string
 * - rollNo: string
 * - department: string
 * - semester: string
 * - cgpa: number
 * - photo: string (URL / asset path)
 * - email: string
 * - status: string
 */
export default function StudentCard({ student }) {
  const { name, rollNo, department, semester, cgpa, photo, email, status } = student;

  // Determine performance color tier based on CGPA
  const getTierInfo = (score) => {
    if (score >= 9.5) return { tierClass: 'gold', badgeClass: 'cgpa-tier-top', label: 'Outstanding' };
    if (score >= 9.0) return { tierClass: 'emerald', badgeClass: 'cgpa-tier-high', label: 'Distinction' };
    if (score >= 8.0) return { tierClass: 'indigo', badgeClass: 'cgpa-tier-mid', label: 'First Class' };
    return { tierClass: 'blue', badgeClass: 'cgpa-tier-normal', label: 'Good Standing' };
  };

  const tier = getTierInfo(cgpa);
  const percentage = (cgpa / 10) * 100;

  return (
    <article className="student-card">
      <div className="card-top-banner"></div>

      <div className="student-avatar-container">
        <img 
          src={photo} 
          alt={`${name}'s photo`} 
          className="student-photo"
          onError={(e) => {
            // Fallback avatar if external image fails
            e.target.onerror = null;
            e.target.src = '/photos/student1.jpg';
          }}
        />
        <span className={`cgpa-floating-pill ${tier.badgeClass}`}>
          ★ {cgpa.toFixed(2)}
        </span>
      </div>

      <div className="card-body">
        <h3 className="student-name">{name}</h3>
        <span className="student-roll">{rollNo}</span>

        <div className="details-divider"></div>

        <div className="student-meta-grid">
          <div className="meta-field">
            <span className="meta-label">Department</span>
            <span className="meta-value">{department}</span>
          </div>

          <div className="meta-field">
            <span className="meta-label">Semester</span>
            <span className="meta-value">{semester}</span>
          </div>
        </div>

        {/* CGPA Progress Gauge */}
        <div className="cgpa-gauge-box">
          <div className="gauge-header">
            <span className="gauge-label">Academic CGPA</span>
            <span className={`gauge-score ${tier.tierClass}`}>
              {cgpa.toFixed(2)} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/ 10</span>
            </span>
          </div>
          <div className="gauge-progress-bg">
            <div 
              className={`gauge-progress-fill ${tier.tierClass}`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="card-footer-info">
          <span>🏷️ {status || tier.label}</span>
          <a href={`mailto:${email}`} title={`Contact ${name}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
            ✉ Email
          </a>
        </div>
      </div>
    </article>
  );
}
