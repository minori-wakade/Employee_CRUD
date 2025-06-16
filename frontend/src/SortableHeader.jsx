import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SortableHeader = ({ label, columnKey, sortConfig, onSort }) => {
  const isSorted = sortConfig.key === columnKey;
  const icon = isSorted
    ? sortConfig.direction === 'asc'
      ? <ChevronUp size={16} />
      : <ChevronDown size={16} />
    : null;

  return (
    <th
      onClick={() => onSort(columnKey)}
      className="sortable text-nowrap text-dark"
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center gap-1">
        {label}
        {icon}
      </div>
    </th>
  );
};

export default SortableHeader;
