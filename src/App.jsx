import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { initialStudents } from './data/studentsData';
import './App.css';

/**
 * App Component (Root Container)
 * Manages central student data and state, and passes all data
 * down to child components strictly through Props.
 */
export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [sortOrder, setSortOrder] = useState('default'); // 'default' | 'desc' | 'asc'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  // Extract unique departments for filter dropdown
  const departments = useMemo(() => {
    return Array.from(new Set(initialStudents.map((s) => s.department)));
  }, []);

  // Filter and sort students based on props and user controls
  const processedStudents = useMemo(() => {
    let result = [...students];

    // 1. Search filter by Name or Roll Number
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
      );
    }

    // 2. Department filter
    if (selectedDepartment !== 'ALL') {
      result = result.filter((s) => s.department === selectedDepartment);
    }

    // 3. Mechanism to Sort students by CGPA
    if (sortOrder === 'desc') {
      result.sort((a, b) => b.cgpa - a.cgpa);
    } else if (sortOrder === 'asc') {
      result.sort((a, b) => a.cgpa - b.cgpa);
    }

    return result;
  }, [students, searchQuery, selectedDepartment, sortOrder]);

  // Compute live statistics for Header props
  const stats = useMemo(() => {
    if (processedStudents.length === 0) {
      return { total: 0, avg: '0.00', top: '0.00' };
    }
    const total = processedStudents.length;
    const sum = processedStudents.reduce((acc, curr) => acc + curr.cgpa, 0);
    const avg = (sum / total).toFixed(2);
    const top = Math.max(...processedStudents.map((s) => s.cgpa)).toFixed(2);
    return { total, avg, top };
  }, [processedStudents]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('ALL');
    setSortOrder('default');
  };

  return (
    <div className="app-wrapper">
      {/* 1. Header Component with Props */}
      <Header
        title="Student Information Portal"
        subtitle="Manage student academic profiles, credentials, and performance records"
        totalStudents={stats.total}
        avgCgpa={stats.avg}
        topCgpa={stats.top}
      />

      {/* 2. StudentList Component with Props */}
      <main className="main-content">
        <StudentList
          students={processedStudents}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departments={departments}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* 3. Footer Component with Props */}
      <Footer
        portalName="EduPortal System"
        academicSession="2025 – 2026"
        courseCode="CS-302 (React & Web Development)"
        developerName="Abhik"
      />
    </div>
  );
}
