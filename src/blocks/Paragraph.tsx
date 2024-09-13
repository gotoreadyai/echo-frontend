import React from 'react';

export const Paragraph: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return <p className={`${className} container mx-auto` || ''}>{text || 'Default paragraph text.'}</p>;
};

export default Paragraph;
