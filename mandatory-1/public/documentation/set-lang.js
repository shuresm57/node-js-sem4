document.querySelectorAll('pre code').forEach(block => {
  const lang = block.className.match(/language-(\w+)/)?.[1];
  if (lang) block.parentElement.dataset.lang = lang;
});