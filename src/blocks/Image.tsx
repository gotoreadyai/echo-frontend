import React from 'react';

export const ImageBlock: React.FC<{ url: string; className?: string }> = ({ url, className }) => {
  return (
    // <img
    //   src={url || 'https://via.placeholder.com/150'}
    //   alt="image"
    //   className={`w-full ${className || ''}`}
    // />
    <div>[IMAGE:{url},{className}]</div>
  );
};

export default ImageBlock;
