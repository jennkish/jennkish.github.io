let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navBar.classList.toggle('active');
}

navBar.querySelectorAll('a').forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navBar.classList.remove('active');
    }
});