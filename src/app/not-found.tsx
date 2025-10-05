"use client";

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e580e5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Yorkie Mascot SVG */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: '2rem' }}
        >
          {/* Body */}
          <ellipse cx="100" cy="130" rx="60" ry="35" fill="#8B7355" stroke="#000" strokeWidth="3"/>
          
          {/* Head */}
          <circle cx="100" cy="80" r="40" fill="#C4A571" stroke="#000" strokeWidth="3"/>
          
          {/* Ears */}
          <path d="M 70 60 L 60 30 L 75 50 Z" fill="#B8956A" stroke="#000" strokeWidth="3"/>
          <path d="M 130 60 L 140 30 L 125 50 Z" fill="#B8956A" stroke="#000" strokeWidth="3"/>
          
          {/* Hair tuft on head */}
          <path d="M 95 45 Q 100 35 105 45" stroke="#D4AF37" strokeWidth="3" fill="none"/>
          <circle cx="100" cy="42" r="3" fill="#ff6b6b"/>
          
          {/* Eyes - sad expression */}
          <circle cx="85" cy="75" r="8" fill="#000"/>
          <circle cx="115" cy="75" r="8" fill="#000"/>
          <circle cx="87" cy="73" r="3" fill="#fff"/>
          <circle cx="117" cy="73" r="3" fill="#fff"/>
          
          {/* Eyebrows - worried */}
          <path d="M 75 65 Q 85 62 95 65" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M 105 65 Q 115 62 125 65" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          
          {/* Nose */}
          <ellipse cx="100" cy="90" rx="6" ry="5" fill="#000"/>
          
          {/* Mouth - sad */}
          <path d="M 90 100 Q 100 95 110 100" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          
          {/* Legs */}
          <rect x="75" y="150" width="12" height="30" fill="#8B7355" stroke="#000" strokeWidth="2.5" rx="3"/>
          <rect x="113" y="150" width="12" height="30" fill="#8B7355" stroke="#000" strokeWidth="2.5" rx="3"/>
          
          {/* Paws */}
          <ellipse cx="81" cy="180" rx="8" ry="5" fill="#6B5344" stroke="#000" strokeWidth="2"/>
          <ellipse cx="119" cy="180" rx="8" ry="5" fill="#6B5344" stroke="#000" strokeWidth="2"/>
          
          {/* Fur texture lines */}
          <path d="M 65 125 Q 70 130 75 135" stroke="#6B5344" strokeWidth="1.5" fill="none"/>
          <path d="M 125 125 Q 130 130 135 135" stroke="#6B5344" strokeWidth="1.5" fill="none"/>
          
          {/* Tail */}
          <path d="M 155 125 Q 170 120 175 110" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 155 125 Q 168 122 173 115" stroke="#8B7355" strokeWidth="8" fill="none" strokeLinecap="round"/>
        </svg>

        {/* 404 Message */}
        <div style={{
          backgroundColor: '#fff',
          border: '4px solid #000',
          boxShadow: '7px 6.5px 0 #000',
          borderRadius: '2px',
          padding: '2.5rem 2rem',
          marginBottom: '1.5rem'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            margin: '0 0 1rem 0',
            color: '#000',
            lineHeight: '1'
          }}>
            404
          </h1>
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            color: '#000'
          }}>
            Oops! Page Not Found
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#000',
            margin: '0 0 2rem 0',
            lineHeight: '1.6'
          }}>
            Looks like this yorkie couldn&apos;t fetch that page. It might have been moved or doesn&apos;t exist.
          </p>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#f5c242',
              border: '3px solid #000',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '4px',
              boxShadow: '4px 5px 0 #000',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '7px 7px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '4px 5px 0 #000';
            }}
          >
            Take Me Home
          </Link>
        </div>

        <p style={{
          fontSize: '0.95rem',
          color: '#000',
          opacity: '0.8'
        }}>
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;