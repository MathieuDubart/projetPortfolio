console.log('Hello World');

['resize', 'load'].forEach( event => {
    window.addEventListener(event, () => {
        if(window.screen.width <= 980) {
            for(i=0; i <= numberPosts; i++) {
                document.getElementById("mobileNumbers"+i).classList.remove("d-none");
            }
        } else if(window.screen.width > 980) {
            for(i=0; i <= numberPosts; i++) {
                document.getElementById("mobileNumbers"+i).classList.add("d-none");
            }
        }
    })
});