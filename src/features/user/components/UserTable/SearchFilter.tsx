// src/features/user/components/SearchFilter.tsx
import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import "../../styles/SearchFilter.css";

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
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
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
            <option value="">Tất cả vai trò</option>
            <option value="Administrator">Administrator</option>
            <option value="Lab Manager">Lab Manager</option>
            <option value="Service">Service</option>
            <option value="Lab User">Lab User</option>
            <option value="Custom Role">Custom Role</option>
          </select>
        </div>

        <div className="filter-item">
          <select
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilter;

