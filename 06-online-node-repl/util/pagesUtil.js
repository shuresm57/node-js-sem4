import { readPage, constructPage } from './templatingEngine.js';

// SSR is great because of SEO
// also because of speed
// also rendering runs on the server
// const frontpage = readPage('./public/pages/frontend/frontend.html', 'utf-8');

// TODO create function that does this so i dont have to write header + footer all the time
const frontpage = readPage('./public/pages/frontend/frontend.html');
export const frontpagePage = constructPage(frontpage, { cssLinks: '<link rel="stylesheet" href="/pages/frontend/frontend.css"></link>' });

const about = readPage('./public/pages/about/about.html');
export const aboutPage = constructPage(about, { documentTitle: 'Online Node.js REPL | About' });

const contact = readPage('./public/pages/contact/contact.html');
export const contactPage = constructPage(contact, { documentTitle: 'Online Node.js REPL | Contact' });
