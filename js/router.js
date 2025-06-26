const routes = {
    '/form': 'views/form.html',
    '/list': 'views/list.html'
};


function loadView(hash) {
    const route = hash.replace('#', '');
    const path = routes[route] || routes['/list'];
    fetch(path)
        .then(res => res.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
            import('./init.js').then(m => m.init(route));
        })
        .catch(err => {
            console.error("Erro ao carregar view:", err);
        });
}


window.addEventListener('hashchange', () => loadView(location.hash));
window.addEventListener('load', () => loadView(location.hash));