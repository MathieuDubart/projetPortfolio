// ********************** burger menu **********************//

[document.getElementById('burgerMenu'), document.getElementById('closingMenu')].forEach((elm) => {
    elm.addEventListener('click', function() {
        document.getElementById('navmenu').classList.toggle('active-menu');
        document.body.classList.toggle('no-scroll');
    });
})

// ********************** loading page **********************//

window.onload = function() {
    document.body.classList.remove('stop-scrolling');
    document.querySelector(".loadingPage").style.display = "none";
}