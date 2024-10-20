// LinkBlock.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useNav from '../hooks/useNav';


export const LinkBlock: React.FC<{
  name: string;
  to: string;
  className?: string;
  wide?: boolean;
  outline?: boolean;
  variant?: string;
  size?: string;
}> = ({
  name,
  to,
  className,
  wide,
  outline,
  variant,
  size,
}) => {
  const { buildLink } = useNav();
  const location = useLocation();
  const linkTo = buildLink(to);

  // Sprawdź, czy bieżąca ścieżka jest aktywna
  const isActive = location.pathname === linkTo;

  return (
    <div className={`${className ? className : 'container mx-auto'}`}>
      <Link
        to={linkTo}
        className={`no-animation btn ${wide ? 'btn-wide' : ''} ${
          outline ? 'btn-outline' : ''
        } ${variant ? variant : ''} ${size ? size : ''} ${
          isActive ? 'btn-active' : ''
        }`}
      >
        {name || 'Link'}
      </Link>
    </div>
  );
};

export default LinkBlock;
