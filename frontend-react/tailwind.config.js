module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)', /* orange-600 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* gray-800 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-300 */
          foreground: 'var(--color-accent-foreground)' /* gray-900 */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 */
          foreground: 'var(--color-muted-foreground)' /* gray-500 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* gray-800 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* gray-800 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* yellow-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        }
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Source Sans 3', 'system-ui', '-apple-system', 'sans-serif'],
        caption: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        data: ['JetBrains Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'heading-5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '-0.01em' }]
      },
      spacing: {
        'card': 'var(--spacing-card)',
        'section': 'var(--spacing-section)',
        'grid': 'var(--spacing-grid)',
        'safe-top': 'var(--safe-area-top)',
        'safe-bottom': 'var(--safe-area-bottom)',
        'safe-left': 'var(--safe-area-left)',
        'safe-right': 'var(--safe-area-right)'
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)'
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'ios': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'ios-card': '0 1px 3px rgba(0, 0, 0, 0.06)'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ios': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      },
      transitionDuration: {
        'smooth': '250ms',
        'spring': '800ms',
        'ios': '300ms'
      },
      scale: {
        '97': '0.97',
        '98': '0.98'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        fadeIn: 'fadeIn 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        slideIn: 'slideIn 250ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      zIndex: {
        'base': '0',
        'card': '1',
        'dropdown': '50',
        'sticky': '75',
        'navigation': '100',
        'modal': '200',
        'toast': '300'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}