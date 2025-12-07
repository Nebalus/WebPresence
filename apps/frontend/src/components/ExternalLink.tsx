import { Link } from 'react-router-dom';
import React from "react";

export default function ExternalLink({ to, children, className }: { to: string, children?: React.ReactNode, className?: string }) {
  return (
      <Link
          to={to}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
      >
        {children}
      </Link>
  );
}
