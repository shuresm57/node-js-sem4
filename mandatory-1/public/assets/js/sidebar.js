const nav = Object.assign(document.createElement('nav'), { className: 'sidebar' });

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

document.body.prepend(nav);

const topbarHeight = document.querySelector('.topbar').offsetHeight;
window.addEventListener('scroll', () => {
  nav.style.top = `${Math.max(0, topbarHeight - window.scrollY)}px`;
});