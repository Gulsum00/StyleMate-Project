import React from 'react';

// Icon map keeps visuals consistent across clothing and outfit cards.
export const categoryIcons = {
  tops: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10l2 3-4 2v10H9V9L5 7l2-3Z" />
    </svg>
  ),
  bottoms: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4h6l1 4-1 12h-2l-1-8-1 8H8L7 8l2-4Z" />
    </svg>
  ),
  shoes: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h2l3 2 4-3 3 2 4 1v2H4v-4Z" />
      <path d="M9 11v2" />
    </svg>
  ),
  accessories: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M9 11.5 6 20h3l3-6 3 6h3l-3-8.5" />
    </svg>
  ),
};

export const getCategoryIcon = (category) => categoryIcons[category] || categoryIcons.tops;
