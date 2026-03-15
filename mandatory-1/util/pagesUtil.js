import { readPage, constructPage } from './templatingEngine.js';

const frontpage = readPage('./public/pages/frontpage.html');
const frontpagePage = constructPage(frontpage, { documentTitle: 'VSS', cssLinks: '<link rel="stylesheet" href="/assets/css/frontpage.css">' });

const weekCssLinks = '<link rel="stylesheet" href="/assets/css/main-style.css"><link rel="stylesheet" href="/assets/css/documentation.css">';
const homeButton = '<a href="/" class="topbar-home">Home</a>';
const week1 = readPage('./public/pages/week-1.html');
const week1Page = constructPage(week1, {
  documentTitle: 'VSS - Week 1',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week2 = readPage('./public/pages/week-2.html');
const week2Page = constructPage(week2, {
  documentTitle: 'VSS - Week 2',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week3 = readPage('./public/pages/week-3.html');
const week3Page = constructPage(week3, {
  documentTitle: 'VSS - Week 3',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week4 = readPage('./public/pages/week-4.html');
const week4Page = constructPage(week4, {
  documentTitle: 'VSS - Week 4',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week5 = readPage('./public/pages/week-5.html');
const week5Page = constructPage(week5, {
  documentTitle: 'VSS - Week 5',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week6 = readPage('./public/pages/week-6.html');
const week6Page = constructPage(week6, {
  documentTitle: 'VSS - Week 6',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

const week7 = readPage('./public/pages/week-7.html');
const week7Page = constructPage(week7, {
  documentTitle: 'VSS - Week 7',
  cssLinks: weekCssLinks,
  homeButton: homeButton
});

export const pagesObject = {
  frontpage: frontpagePage,
  week1: week1Page,
  week2: week2Page,
  week3: week3Page,
  week4: week4Page,
  week5: week5Page,
  week6: week6Page,
  week7: week7Page
};
