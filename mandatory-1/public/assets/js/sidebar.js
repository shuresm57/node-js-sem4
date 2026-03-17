const nav = document.createElement('nav');
const nav2 = document.createElement('nav');

nav.className = 'sidebar';
nav.innerHTML = `
  <h1>Pages</h1>
  <a href="./week-1">Introduction to Node.js</a>
  <a href="./week-2">First Server</a>
  <a href="./week-3">HTTP & Loops</a>
  <a href="./week-4">Time, Fetch & Deployment</a>
  <a href="./week-5">Modern Node.js</a>
  <a href="./week-6">Development Basics</a>
  <a href="./week-7">Advanced Node.js</a>
`;

document.body.appendChild(nav);

nav2.className = 'sidebar2';
nav2.innerHTML = `
  <h1>In this article</h3>
  <div class="js-toc"></div>
`;
document.body.appendChild(nav2);

tocbot.init({
  tocSelector: '.js-toc',
  contentSelector: 'main',
  headingSelector: 'h2',
  hasInnerContainers: true,
  headingsOffset: 0,  
});

console.log(tocbot);