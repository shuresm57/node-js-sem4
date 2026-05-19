import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function constructPage (page, options = {}) {
  const header = readPage(path.join(__dirname, '../public/components/header.html'));
  const footer = readPage(path.join(__dirname, '../public/components/footer.html'));
  const sidebar = readPage(path.join(__dirname, '../public/components/pages-sidebar.html'));

  if (options.sidebar) {
    return header
      .replace('$$DOCUMENT_TITLE$$', options.documentTitle || 'VSS')
      .replace('$$CSS_LINKS$$', options.cssLinks)
      .replace('$$HOME$$', options.homeButton || '<p href="/" class="topbar-home"> </p>') +
          sidebar +
          page +
          footer.replace('$$SCRIPTS$$', options.scripts || '');
  }

  return header
    .replace('$$DOCUMENT_TITLE$$', options.documentTitle || 'VSS')
    .replace('$$CSS_LINKS$$', options.cssLinks)
    .replace('$$HOME$$', options.homeButton || '<p href="/" class="topbar-home"> </p>') +
          page +
          footer.replace('$$SCRIPTS$$', options.scripts || '');
}

export function readPage (filePath) {
  return fs.readFileSync(filePath).toString();
}
