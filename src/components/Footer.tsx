import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="wrap">
        <p>© {new Date().getFullYear()} Journey Forrest · Texas State University</p>
      </div>
    </footer>
  );
};
