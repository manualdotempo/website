const botaoMenu = document.querySelector('.abrir-menu')
const menu = document.querySelector('.navegador-mobile')
menu.style.display = 'none'

document.querySelectorAll('.navegador-paginas a, .navegador-mobile a').forEach(link => {
    if (link.pathname.split('/').pop() == window.location.pathname.split('/').pop()) {
        link.classList.add('link-ativo')
    }
})

botaoMenu.addEventListener('click', function () {
    if (menu.style.display == 'none') {
        menu.style.display = 'block'
        botaoMenu.style.content = 'url(../assets/images/icone-fechar.png)'
        document.body.style.position = 'fixed'
    } else {
        menu.style.display = 'none'
        botaoMenu.style.content = 'none'
        document.body.style.position = 'relative'
    }
})