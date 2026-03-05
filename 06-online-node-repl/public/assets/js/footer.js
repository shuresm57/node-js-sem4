console.log('footer.js works');
const copyrightYearSpan = document.getElementById("copyright-year");
copyrightYearSpan.textContent = '©' + new Date().getFullYear();

updateYear();