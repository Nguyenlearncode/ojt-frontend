// src/features/user/components/SearchFilter.tsx
import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import "../styles/SearchFilter.css";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  genderFilter: string;
  onGenderFilterChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  genderFilter,
  onGenderFilterChange,
}) => {
  return (
    <motion.div
      className="search-filter-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <div className="filter-item">
          <FiFilter className="filter-icon" />
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Roles</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="filter-item">
          <select
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilter;

