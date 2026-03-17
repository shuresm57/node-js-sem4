const nav = document.createElement('nav');
const nav2 = document.createElement('nav');

nav.className = 'sidebar2';
nav.innerHTML = `
  <h1>Topics</h1>
  <a href="./week-1"> Week 1 - Introduction to Node.js</a>
  <a href="./week-2"> Week 2 - First Server</a>
  <a href="./week-3"> Week 3 - HTTP & Loops</a>
  <a href="./week-4"> Week 4 - Time, Fetch & Deployment</a>
  <a href="./week-5"> Week 5 - Modern Node.js</a>
  <a href="./week-6"> Week 6 - Development Basics</a>
  <a href="./week-7"> Week 7 - Advanced Node.js</a>
`;

document.body.appendChild(nav);

nav2.className = 'sidebar';
nav2.innerHTML = `
  <h3>In this article</h3>
  <div class="js-toc"></div>
`;
document.body.appendChild(nav2);

tocbot.init({
  tocSelector: '.js-toc',
  contentSelector: 'main',
  headingSelector: 'h2',
  hasInnerContainers: true,
  smoothScroll: false,
  headingsOffset: 0,  
});

console.log(tocbot);