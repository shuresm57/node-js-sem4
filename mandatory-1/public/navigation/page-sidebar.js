const headings = document.querySelectorAll('h1, h2, h3');
const nav = document.createElement('nav');
nav.classList.add('sidebar');

headings.forEach(h => {
  if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');

  const a = document.createElement('a');
  a.href = `#${h.id}`;
  a.textContent = h.textContent;
  a.classList.add(h.tagName.toLowerCase());

  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
    a.classList.add('active');
    
    const target = document.getElementById(h.id);
    target.scrollIntoView({ behavior: 'smooth' });
  });

  nav.appendChild(a);
});

document.body.prepend(nav);