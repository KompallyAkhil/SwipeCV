import React from 'react';

export function Skeleton({ className = '', rounded = true }) {
  const radius = rounded ? 'rounded-md' : '';
  return <div className={`animate-pulse bg-muted ${radius} ${className}`} />;
}

export default Skeleton;
