import React from 'react';

export default function LoadingCard({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-5 space-y-3">
          <div className="shimmer h-4 w-3/4" />
          <div className="shimmer h-3 w-1/2" />
          <div className="shimmer h-3 w-full" />
          <div className="shimmer h-8 w-24 mt-2" />
        </div>
      ))}
    </>
  );
}
