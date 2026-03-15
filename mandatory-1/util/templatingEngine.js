import fs from 'fs';

export function constructPage (page, options = {}) {
  const header = readPage('./public/components/header.html');
  const footer = readPage('./public/components/footer.html');

  return header
    .replace('$$DOCUMENT_TITLE$$', options.documentTitle || 'VSS')
    .replace('$$CSS_LINKS$$', options.cssLinks)
    .replace('$$HOME$$', options.homeButton || '<p href="/" class="topbar-home"> </p>') +
          page +
          footer.replace('$$SCRIPTS$$', options.scripts || '');
}

export function readPage (path) {
  return fs.readFileSync(path).toString();
}
