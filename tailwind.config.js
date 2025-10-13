/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#667eea',
          600: '#5a6fd8',
          700: '#4f46e5',
          800: '#4338ca',
          900: '#3730a3',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          500: '#764ba2',
          600: '#6c4298',
          700: '#61398e',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.7' 
          },
          '25%': { 
            transform: 'translateY(-20px) rotate(90deg)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'translateY(-40px) rotate(180deg)', 
            opacity: '0.7' 
          },
          '75%': { 
            transform: 'translateY(-20px) rotate(270deg)', 
            opacity: '1' 
          },
        },
        'sound-wave': {
          '0%, 100%': { 
            height: '20px', 
            opacity: '0.3' 
          },
          '25%': { 
            height: '60px', 
            opacity: '0.8' 
          },
          '50%': { 
            height: '80px', 
            opacity: '1' 
          },
          '75%': { 
            height: '40px', 
            opacity: '0.6' 
          },
        },
        'sound-wave-speaking': {
          '0%': { height: '20px', opacity: '0.4' },
          '15%': { height: '70px', opacity: '0.9' },
          '30%': { height: '45px', opacity: '0.7' },
          '45%': { height: '85px', opacity: '1' },
          '60%': { height: '35px', opacity: '0.6' },
          '75%': { height: '65px', opacity: '0.8' },
          '90%': { height: '25px', opacity: '0.5' },
          '100%': { height: '20px', opacity: '0.4' },
        },
        'sound-wave-pause': {
          '0%, 100%': { height: '15px', opacity: '0.2' },
          '50%': { height: '25px', opacity: '0.3' },
        },
        'sound-wave-syllable': {
          '0%, 70%, 100%': { height: '20px', opacity: '0.3' },
          '20%': { height: '60px', opacity: '0.8' },
          '40%': { height: '80px', opacity: '1' },
          '60%': { height: '45px', opacity: '0.6' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        typing: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)'
          },
          '50%': {
            opacity: '0.5'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.05)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 12s ease-in-out infinite',
        'sound-wave': 'sound-wave 2s ease-in-out infinite',
        'sound-wave-speaking': 'sound-wave-speaking 1.2s ease-in-out infinite',
        'sound-wave-pause': 'sound-wave-pause 2s ease-in-out infinite',
        'sound-wave-syllable': 'sound-wave-syllable 0.8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'gradient-x': 'gradient-x 4s ease infinite',
        'typing': 'typing 1s ease-out forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
