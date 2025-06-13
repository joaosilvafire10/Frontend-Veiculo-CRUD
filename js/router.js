const routes = {
  '/form': 'views/form.html',
  '/list': 'views/list.html'
};

function loadView(route) {
  const path = routes[route] || routes['/list'];
  fetch(path).then(res => res.text()).then(html => {
    document.getElementById('app').innerHTML = html;
    import('./components/init.js').then(m => m.init(route));
  });
}

window.addEventListener('hashchange', () => loadView(location.hash.slice(1)));
window.addEventListener('load', () => loadView(location.hash.slice(1) || '/list'));
