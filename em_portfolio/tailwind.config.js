/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'black-white': {
          '50': '#fffef7',
          '100': '#fffad5',
          '200': '#fef2aa',
          '300': '#fde674',
          '400': '#fbcf3c',
          '500': '#f9bc16',
          '600': '#ea9f0c',
          '700': '#c27b0c',
          '800': '#9a5f12',
          '900': '#7c4f12',
          '950': '#432707',
        },
        'sweet-corn': {
          '50': '#fefce8',
          '100': '#fff8c2',
          '200': '#fff08f',
          '300': '#ffdf45',
          '400': '#fcca13',
          '500': '#ecb106',
          '600': '#cc8802',
          '700': '#a26006',
          '800': '#864b0d',
          '900': '#723e11',
          '950': '#431f05',
        },
        'pancho': {
          '50': '#fdf6ef',
          '100': '#f9eadb',
          '200': '#f2d1b3',
          '300': '#eab487',
          '400': '#e18d56',
          '500': '#da6f35',
          '600': '#cb582b',
          '700': '#a94325',
          '800': '#873725',
          '900': '#6d2f21',
          '950': '#3b160f',
        },
        'perfume': {
          '50': '#fbf5fe',
          '100': '#f4e9fe',
          '200': '#ead3fb',
          '300': '#e4c1f9',
          '400': '#c980f2',
          '500': '#b050e5',
          '600': '#9530c9',
          '700': '#7d24a7',
          '800': '#682088',
          '900': '#591f70',
          '950': '#37084a',
        },
      'blue-smoke': {
          '50': '#f5f8f7',
          '100': '#dfe8e7',
          '200': '#bed1ce',
          '300': '#96b2b0',
          '400': '#648381',
          '500': '#557775',
          '600': '#435e5e',
          '700': '#384d4c',
          '800': '#303f3f',
          '900': '#2b3536',
          '950': '#151d1e',
        },
      },
      fontFamily: {
        'main': ['Carrois Gothic SC', 'sans-serif'],
        'header': ['Libre Baskerville', 'serif'],
        'main': ['Rethink Sans', 'sans-serif'],
      },
      maxWidth: {
        '128': '32rem',
        '144': '38rem',
      },
      maxHeight: {
        '128': '32rem',  
        '144': '38rem',
      },
      width: {
        '128': '32rem',
        '144': '38rem',
      },
      height: {
        '128': '32rem',  
        '144': '38rem',
      },
      boxShadow: {
        'strong': '0 10px 30px rgba(0, 0, 0, 0.3)', // Example of a strong shadow
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
