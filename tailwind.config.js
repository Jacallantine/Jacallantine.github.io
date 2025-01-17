/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html","./HTML/**/*.html", "./JS/**/*.js"],
  theme: {
    extend: {  screens: {
     
      '1300-md': {max: '1300px'},
      '1100-md': {max: '1100px'}, 
      '1000-md': {max: '1000px'}, 
      '800-md': { max: '768px' }, 
      '500-md': {max: '500px'},
      '300-md': {max: '300px'},
      '700-hmd': {'raw' : '(max-height:700px)'},
      '500-hmd': {'raw' : '(max-height:500px)'}
    },},
  },
  plugins: [],
}

