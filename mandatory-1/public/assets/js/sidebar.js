const nav = document.createElement('nav');

nav.className = 'sidebar';
nav.innerHTML = `
  <h3>Topics</h3>
  <a href="./week-1">Introduction to Node.js</a>
  <a href="./week-2">First Server</a>
  <a href="./week-3">HTTP & Loops</a>
  <a href="./week-4">Time, Fetch & Deployment</a>
  <a href="./week-5">Modern Node.js</a>
  <a href="./week-6">Development Basics</a>
  <a href="./week-7">Advanced Node.js</a>
`;


document.body.appendChild(nav);

const topbarHeight = document.querySelector('.topbar').offsetHeight;
window.addEventListener('scroll', () => {
  nav.style.top = `${Math.max(1, topbarHeight - window.scrollY)}px`;
});
