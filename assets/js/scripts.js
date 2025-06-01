const botaoMenu = document.querySelector('.abrir-menu')
const menu = document.querySelector('.navegador-mobile')
menu.style.display = 'none'

botaoMenu.addEventListener('click', function() {    
    if (menu.style.display == 'none') {
        menu.style.display = 'block'
        botaoMenu.style.content = 'url(../assets/images/icone-fechar.png)'
    } else {
        menu.style.display = 'none'
        botaoMenu.style.content = 'none'
    }
})