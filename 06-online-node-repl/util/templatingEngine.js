import fs from 'fs';

// we want to be able to customize the page
// per what we need on the page (css, title etc)

export function constructPage(page, options = {}) {
    const header = readPage('./public/components/header/header.html');
    const footer = readPage('./public/components/footer/footer.html');


    //also make sure the navlinks are an option!
    return header
            .replace('$$DOCUMENT_TITLE$$', options.documentTitle || 'Online Node.js REPL') 
            .replace('$$CSS_LINKS$$', options.cssLinks || '<link rel="stylesheet" href="/pages/frontend/frontend.css">')
          + page 
          + footer;
}

export function readPage(path) {
    return fs.readFileSync(path).toString();
}

