const section = document.querySelector("#about");
let zoomedIn = false;

const moveCircle = (e) => {
    const svg = document.querySelector(".o");
    const maxDisplacement = svg.scrollWidth * 0.8 / 2;
    console.log(maxDisplacement);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const pct = (e.clientX - vw / 2) / (vw / 2);
    console.log(pct * maxDisplacement);
    anime({
        targets: ".o-left",
        translateX: pct * maxDisplacement,
        duration: 100,
        easing: 'easeOutSine'
    });
}

const attachMouseMoveListener = () => {
    if(!zoomedIn){
        section.addEventListener("mousemove", moveCircle);
        console.log("attached mouse move listener");
    }
}

const detachMouseMoveListener = () => {
    if(!zoomedIn){
        section.removeEventListener("mousemove", moveCircle);
        console.log("removed mouse move listener");
        anime({
            targets: ".o-left",
            translateX: 0,
        });
    }
}

section.addEventListener("mouseenter", (e) => {
    console.log("mouse entered about section");
    attachMouseMoveListener();
});

section.addEventListener("mouseleave", (e) => {
    console.log("mouse left about section");
    detachMouseMoveListener();
});

const onClickHandler = (e) => {
    console.log("clicked");
    if(!zoomedIn){
        detachMouseMoveListener();
        zoomedIn = true;
        anime({
            targets: ".o-left",
            r: "30%",
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: ".AB",
            translateX: "-20%"
        });
        anime({
            targets: ".UT",
            translateX: "20%"
        });
    }
    else{
        zoomedIn = false;
        attachMouseMoveListener();
        anime({
            targets: ".o-left",
            r: "5%",
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: ".AB",
            translateX: "20%"
        });
        anime({
            targets: ".UT",
            translateX: "-20%"
        });
    }
    

}

const circle = document.querySelector(".o-left");
circle.addEventListener("click", onClickHandler);