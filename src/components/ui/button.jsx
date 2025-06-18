import React from 'react';
import clsx from 'clsx';

export function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 font-semibold shadow hover:opacity-90 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
