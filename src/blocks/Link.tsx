import React from 'react';
import { Link } from 'react-router-dom';

export const LinkBlock: React.FC<{ name: string; to: string; className?: string }> = ({ name, to, className }) => {
  return (
    <Link to={to} className={className || 'text-blue-500'}>
      {name || 'Link'}
    </Link>
  );
};

export default LinkBlock;
