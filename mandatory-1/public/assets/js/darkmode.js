const moonSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

const prefersDark = localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (prefersDark) document.body.classList.add('darkmode');

const toggle = document.getElementById('themeToggle');

toggle.innerHTML = prefersDark ? sunSVG : moonSVG;

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('darkmode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});