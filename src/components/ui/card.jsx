import React from 'react';
import clsx from 'clsx';

export function Card({ children, className }) {
  return (
    <div className={clsx("bg-white rounded-2xl border", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={clsx("px-4 py-2", className)}>
      {children}
    </div>
  );
}
