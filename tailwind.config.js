// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Color palette based on CSS variables
      backgroundColor: {
        skin: {
          base: 'var(--background)',
          secondary: 'var(--background-secondary)',
        }
      },
      textColor: {
        skin: {
          base: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
          muted: 'var(--muted)',
          accent: 'var(--accent)',
        }
      },
      borderColor: {
        skin: {
          base: 'var(--border)',
        }
      },
      
      // Enhanced typography
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      
      // Advanced shadows
      boxShadow: {
        'minimal': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-minimal': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
      
      // Font families
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Neue Haas Grotesk', 'Inter', ...fontFamily.sans],
      },
      
      // Spacing and sizing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // Animations
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        subtle_float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        subtle_float: 'subtle_float 4s ease-in-out infinite',
      },
      
      // Grid and layout
      gridTemplateColumns: {
        'minimal': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    
    // Custom plugin for theme-aware elements
    function({ addBase, theme }) {
      addBase({
        ':root': {
          '--border-radius': theme('borderRadius.lg'),
        },
      })
    }
  ],
}