import React from 'react';
import StudentCard from './StudentCard';
import './StudentList.css';

/**
 * StudentList Component
 * Receives all student data and handlers strictly via Props.
 * Props:
 * - students: Array of student objects
 * - sortOrder: 'default' | 'desc' | 'asc'
 * - onSortChange: (order: string) => void
 * - searchQuery: string
 * - onSearchChange: (query: string) => void
 * - selectedDepartment: string
 * - onDepartmentChange: (dept: string) => void
 * - departments: Array<string>
 * - onResetFilters: () => void
 */
export default function StudentList({
  students,
  sortOrder,
  onSortChange,
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  onResetFilters
}) {
  return (
    <section className="student-list-container container">
      {/* Control Panel: Search, Department Filter, and Sort by CGPA */}
      <div className="controls-panel">
        <div className="controls-left">
          {/* Search bar */}
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Mechanism to Sort Students by CGPA (Requirement) */}
        <div className="controls-right">
          <span className="sort-label">
            <span>⚡ Sort by CGPA:</span>
          </span>

          <div className="sort-button-group">
            <button
              className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => onSortChange('desc')}
              title="Highest to Lowest CGPA"
            >
              Highest First ↓
            </button>

            <button
              className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => onSortChange('asc')}
              title="Lowest to Highest CGPA"
            >
              Lowest First ↑
            </button>

            <button
              className={`sort-btn ${sortOrder === 'default' ? 'active' : ''}`}
              onClick={() => onSortChange('default')}
              title="Original Order"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Render Student Cards via Props */}
      {students.length > 0 ? (
        <div className="students-grid">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <div className="empty-icon">📂</div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-desc">
            No students match your filter criteria or search query.
          </p>
          <button className="reset-filter-btn" onClick={onResetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
}
