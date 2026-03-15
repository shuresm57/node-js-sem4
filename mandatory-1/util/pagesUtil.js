import { readPage, constructPage } from './templatingEngine.js';



const frontpage = readPage('./public/pages/frontpage.html');
const frontpagePage = constructPage(frontpage, { documentTitle: 'VSS', cssLinks: '<link rel="stylesheet" href="/assets/css/main-style.css"><link rel="stylesheet" href="/assets/css/frontpage.css"><link rel="stylesheet" href="/assets/css/topbar.css">' });
const weekCssLinks = `
      <link rel="stylesheet" href="/assets/css/main-style.css">
      <link rel="stylesheet" href="/assets/css/documentation.css">
      <link rel="stylesheet" href="/assets/css/topbar.css">
      <link rel="stylesheet" href="/assets/css/sidebars.css">
`;

const homeButton = `
      <a href="/" class="topbar-home"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
      </svg> HOME</a>
`;

const projects = readPage('./public/pages/projects.html');
const projectsPage = constructPage(projects, {
  documentTitle: 'VSS - Projects',
  cssLinks: `
      <link rel="stylesheet" href="/assets/css/main-style.css">
      <link rel="stylesheet" href="/assets/css/topbar.css">
      <link rel="stylesheet" href="/assets/css/projects.css">`,
  homeButton: homeButton
});

const weekScripts = '<script type="module" src="/assets/js/sidebar.js"></script>';

const week1 = readPage('./public/pages/week-1.html');
const week1Page = constructPage(week1, {
  documentTitle: 'VSS - Week 1',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week2 = readPage('./public/pages/week-2.html');
const week2Page = constructPage(week2, {
  documentTitle: 'VSS - Week 2',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week3 = readPage('./public/pages/week-3.html');
const week3Page = constructPage(week3, {
  documentTitle: 'VSS - Week 3',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week4 = readPage('./public/pages/week-4.html');
const week4Page = constructPage(week4, {
  documentTitle: 'VSS - Week 4',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week5 = readPage('./public/pages/week-5.html');
const week5Page = constructPage(week5, {
  documentTitle: 'VSS - Week 5',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week6 = readPage('./public/pages/week-6.html');
const week6Page = constructPage(week6, {
  documentTitle: 'VSS - Week 6',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

const week7 = readPage('./public/pages/week-7.html');
const week7Page = constructPage(week7, {
  documentTitle: 'VSS - Week 7',
  cssLinks: weekCssLinks,
  homeButton: homeButton,
  scripts: weekScripts
});

export const pagesObject = {
  frontpage: frontpagePage,
  projects: projectsPage,
  week1: week1Page,
  week2: week2Page,
  week3: week3Page,
  week4: week4Page,
  week5: week5Page,
  week6: week6Page,
  week7: week7Page
};
