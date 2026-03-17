const nav2 = document.createElement('nav');

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

