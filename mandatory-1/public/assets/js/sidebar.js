const nav = Object.assign(document.createElement('nav'), { className: 'sidebar' });

const heading = document.createElement('h3');
heading.textContent = 'Overview';
nav.appendChild(heading);

document.querySelectorAll('h2, h3').forEach(h => {
  if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');
  const a = Object.assign(document.createElement('a'), {
    href: `#${h.id}`,
    textContent: h.textContent,
    className: h.tagName.toLowerCase(),
    onclick: e => {
      e.preventDefault();
      document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  nav.appendChild(a);
});

document.body.appendChild(nav);

const topbarHeight = document.querySelector('.topbar').offsetHeight;
window.addEventListener('scroll', () => {
  nav.style.top = `${Math.max(1, topbarHeight - window.scrollY)}px`;
  nav2.style.top = `${Math.max(1, topbarHeight - window.scrollY)}px`;
});

const nav2 = Object.assign(document.createElement('nav'), { 
  className: 'sidebar2',
  innerHTML: 
  `
  <h3>Topics</h3>
  <a href="./week-1">Introduction to Node.js</a>
  <a href="./week-2">First Server</a>
  <a href="./week-3">HTTP & Loops</a>
  <a href="./week-4">Time, Fetch & Deployment</a>
  <a href="./week-5">Modern Node.js</a>
  <a href="./week-6">Development Basics</a>
  `
});

document.body.appendChild(nav2);
