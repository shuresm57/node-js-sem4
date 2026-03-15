import fs from 'fs';

export function constructPage (page, options = {}) {
  const header = readPage('./public/components/header.html');
  const footer = readPage('./public/components/footer.html');

  // TODO: also make sure the navlinks are an option!
  return header
    .replace('$$DOCUMENT_TITLE$$', options.documentTitle || 'VSS')
    .replace('$$CSS_LINKS$$', options.cssLinks)
    .replace('$$HOME$$', options.homeButton || '<p href="/" class="topbar-home"> </p>') +
          page +
          footer;
}

export function readPage (path) {
  return fs.readFileSync(path).toString();
}
