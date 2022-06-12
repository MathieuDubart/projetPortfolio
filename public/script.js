// ********************** burger menu **********************//

[document.getElementById('burgerMenu'), document.getElementById('closingMenu')].forEach((elm) => {
    elm.addEventListener('click', function() {
        document.getElementById('navmenu').classList.toggle('active-menu');
    });
})