import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`${className || ''} container mx-auto`}>
    <img src="/logo.svg" alt="logo" />
  </div>;
};

export default Logo;
