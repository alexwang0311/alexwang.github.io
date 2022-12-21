const smallDevice = window.matchMedia("(max-width: 576px)");

const section = document.querySelector("#about");
let zoomedIn = false;

const lgMoveCircle = (e) => {
    const svg = document.querySelector(".o");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const pctX = (e.clientX - vw / 2) / (vw / 2);
    const pctY = (e.clientY - vh / 2) / (vh / 2);
    anime({
        targets: [".o-out"],
        translateX: pctX * svg.scrollWidth * 0.8 / 2,
        duration: 100,
        easing: 'easeOutSine'
    });
    anime({
        targets: ".o-in",
        translateX: pctX * svg.scrollWidth * 0.85 / 2,
        translateY: `${pctY * 2}%`,
        duration: 100,
        easing: 'easeOutSine'
    });
}

const smMoveCircle = (e) => {
    const svg = document.querySelector(".o");
    const circle = document.querySelector(".o-group");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const pctX = (e.touches[0].clientX - vw / 2) / (vw / 2);
    const circleClientY = circle.getBoundingClientRect().top;
    //console.log(circleClientY, e.touches[0].clientY);
    const pctY = circleClientY > e.touches[0].clientY ? -0.5 : 0.5;
    anime({
        targets: [".o-out"],
        translateX: pctX * svg.scrollWidth * 0.8 / 2,
        duration: 100,
        easing: 'easeOutSine'
    });
    anime({
        targets: ".o-in",
        translateX: pctX * svg.scrollWidth * 0.85 / 2,
        translateY: `${pctY * 2}%`,
        duration: 100,
        easing: 'easeOutSine'
    });
}

const attachMouseMoveListener = () => {
    if(!zoomedIn){
        section.addEventListener("mousemove", lgMoveCircle);
        console.log("attached mouse move listener");
    }
}

const detachMouseMoveListener = () => {
    if(!zoomedIn){
        section.removeEventListener("mousemove", lgMoveCircle);
        console.log("removed mouse move listener");
        anime({
            targets: [".o-out", ".o-in"],
            translateX: 0,
            translateY: 0,
        });
    }
}

const attachTouchMoveListener = () => {
    if(!zoomedIn){
        section.addEventListener("touchmove", smMoveCircle);
        console.log("attached touch move listener");
    }
}

const detachTouchMoveListener = () => {
    if(!zoomedIn){
        section.removeEventListener("touchmove", smMoveCircle);
        console.log("removed touch move listener");
        anime({
            targets: [".o-out", ".o-in"],
            translateX: 0,
            translateY: 0,
        });
    }
}

let startY = 0;
const scroll = (e) => {
    e.preventDefault();
    const displacement = startY - e.touches[0].clientY;
    const text = document.querySelector("foreignObject");
    text.scrollBy(0, displacement);
    console.log("scrolled:", displacement);
}

const setUpListeners = () => {
    if(smallDevice.matches) {
        section.addEventListener("touchstart", (e) => {
            if(e.target.getAttribute("class") == "text-body"){
                e.preventDefault();
                startY = e.touches[0].clientY;
                const text = document.querySelector("foreignObject");
                text.addEventListener("touchmove", scroll);
                return;
            }
            console.log("touched about section");
            attachTouchMoveListener();
            if(!zoomedIn)
            {
                smMoveCircle(e);
            }
        });

        section.addEventListener("touchend", (e) => {
            if(e.target.getAttribute("class") == "text-body"){
                e.preventDefault();
                const text = document.querySelector("foreignObject");
                text.removeEventListener("touchmove", scroll);
                /*
                const endY = e.changedTouches[0].clientY;
                const displacementY = startY - endY;
                //console.log(displacementY);
                const text = document.querySelector("foreignObject");
                setTimeout(text.scroll({
                    top: displacementY,
                    behavior: "smooth"
                }), 100);
                */
                return;
            }
            console.log("ended touching about section");
            detachTouchMoveListener();
        });
    }
    else {
        section.addEventListener("mouseenter", (e) => {
            console.log("mouse entered about section");
            attachMouseMoveListener();
        });

        section.addEventListener("mouseleave", (e) => {
            console.log("mouse left about section");
            detachMouseMoveListener();
        });
    }
}

setUpListeners();

const lgText = `<h3>I am a software engineer with a passion for crafting clean, modern, and efficient solutions.</h3>
                <br>
                <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create an intuitive and visually pleasing user experience - not settling for less.</p>
                <p>In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new <a href="https://github.com/alexwang0311" target="_blank">projects</a>, I enjoy learning about 
                    digital design, reading about software architecture, and working out. <a href="#">Here</a> is how I created this website.</p>`;
const smText = `<div class="text-body" z-index="1">
                    <h5 class="text-body">I am a software engineer with a passion for crafting clean, modern, and efficient solutions.</h5>
                    <br>
                    <p class="text-body">Whether I'm working on a new app or optimizing an existing system, I always strive to create an intuitive and visually pleasing user experience - not settling for less.</p>
                    <p class="text-body">In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new <a href="https://github.com/alexwang0311" z-index="2" target="_blank">projects</a>, I enjoy learning about 
                        digital design, reading about software architecture, and working out. <a href="#" z-index="2">Here</a> is how I created this website.</p>
                </div>`;

const smOnClickHandler = (e) => {
    if(!zoomedIn){
        detachTouchMoveListener();
        zoomedIn = true;
        section.scrollIntoView();
        anime({
            targets: [".o-group"],
            translateY: "40%",
            complete: function() {
                const svg = document.querySelector(".o");
                const scrollHeight = svg.scrollHeight;
                //console.log(scrollHeight);
                const g = d3.select(".o")
                            .append('g')
                            .attr("class", "o-text")
                            .style("opacity", 0)
                            .attr('transform', `translate(0, ${scrollHeight * 0.2})`);
                const body = g.append("foreignObject")
                                .attr("width", "100%")
                                .attr("height", "60%")
                                .style("overflow", "auto")
                                .append("xhtml:body")
                                .style("font", "14px 'prompt-light'")
                                .style("color", "black")
                                .style("background-color", "transparent");
                body.html(smText);
                section.scrollIntoView();
                anime({
                    targets: ".o-text",
                    opacity: 1,
                    duration: 1000,
                    easing: 'easeOutSine',
                });
            }
        });
        anime({
            targets: ".o-out",
            fill: "#000000"
        });
        anime({
            targets: ".o-in",
            fill: "#ffffff"
        });
        anime({
            targets: [".AB"],
            translateY: "40%",
            translateX: "100%",
        });
        anime({
            targets: [".UT"],
            translateY: "40%",
            translateX: "-100%",
        });
    }
    else{
        const el = document.getElementsByClassName("o-text");
        //console.log(el);
        el[0].remove();
        attachTouchMoveListener();
        zoomedIn = false;
        anime({
            targets: [".o-group", ".AB", ".UT"],
            translateY: 0,
            translateX: 0,
        });
        anime({
            targets: ".o-out",
            fill: "#ffffff"
        });
        anime({
            targets: ".o-in",
            fill: "#000000"
        });
    }
}

const lgOnClickHandler = (e) => {
    console.log("clicked");
    if(!zoomedIn){
        detachMouseMoveListener();
        zoomedIn = true;
        section.scrollIntoView();
        anime({
            targets: ".o-out",
            r: "32%",
            fill: "#000000",
        })
        anime({
            targets: [".o-in"],
            r: "30%",
            fill: "#ffffff",
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeInOutQuad',
            complete: function() {
                const circle = document.querySelector(".o-in");
                const svg = document.querySelector(".o");
                const scrollWidth = svg.scrollWidth;
                const radius = circle.r.animVal.value;
                const cx = circle.cx.animVal.value + 2;
                const cy = circle.cy.animVal.value;

                const isFullCircle = scrollWidth >= radius * 2;
                const width = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : scrollWidth;
                const height = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(scrollWidth / 2, 2));
                const dx = isFullCircle ? cx - radius * Math.sin(Math.PI / 4) : cx - scrollWidth / 2;
                const dy = isFullCircle ? cy - radius * Math.cos(Math.PI / 4) : cy - height / 2;
                //console.log(dx, dy);
                const g = d3.select(".o")
                            .append('g')
                            .attr("class", "o-text")
                            .style("opacity", 0)
                            .attr('transform', 'translate(' + [dx, dy] + ')');
                const body = g.append("foreignObject")
                                .attr("width", width)
                                .attr("height", height)
                                .style("overflow-y", "scroll")
                                .append("xhtml:body")
                                .style("font", "14px 'prompt-light'")
                                .style("color", "black")
                                .style("background-color", "transparent");
                if(isFullCircle){
                    body.html(lgText);
                }
                else{
                    body.html(smText);
                }
                document.querySelector(".o-text").addEventListener("click", lgOnClickHandler);
                section.scrollIntoView();
                anime({
                    targets: ".o-text",
                    opacity: 1,
                    duration: 1000,
                    easing: 'easeOutSine',
                }); 
            }
        });
        anime({
            targets: ".AB",
            translateX: ["-70%", 0],
            duration: 1500,
        });
        anime({
            targets: ".UT",
            translateX: ["70%", 0],
            duration: 1500,
        });
    }
    else{
        if(e.target.tagName.toLowerCase() == "a") return; //guard against click on 'a' elements
        zoomedIn = false;
        const el = document.getElementsByClassName("o-text");
        //console.log(el);
        el[0].remove();
        attachMouseMoveListener();
        anime({
            targets: ".o-out",
            r: "5%",
            fill: "#ffffff",
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: ".o-in",
            r: "3%",
            fill: "#000000",
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

const attachClickHandler = () => {
    const circle = document.querySelector(".o-group");
    if(smallDevice.matches){
        circle.addEventListener("click", smOnClickHandler);
    }
    else{
        circle.addEventListener("click", lgOnClickHandler);
    }
}

attachClickHandler();

addEventListener("resize", (e) => {
    console.log("screen size changed");
    const circle = document.querySelector(".o-group");
    if(smallDevice.matches){
        circle.removeEventListener("click", lgOnClickHandler);
        detachMouseMoveListener();
        setUpListeners();
        attachClickHandler();
        if(zoomedIn){
            const svg = document.querySelector(".o");
            const scrollHeight = svg.scrollHeight;
            const g = d3.select(".o-text")
                        .attr('transform', `translate(0, ${scrollHeight * 0.2})`);
        }
    }
    else{
        circle.removeEventListener("click", smOnClickHandler);
        detachTouchMoveListener();
        setUpListeners();
        attachClickHandler();
        if(zoomedIn){
            const circle = document.querySelector(".o-in");
            const svg = document.querySelector(".o");
            const scrollWidth = svg.scrollWidth;
            const radius = circle.r.animVal.value;
            const cx = circle.cx.animVal.value;
            const cy = circle.cy.animVal.value;
                    
            const isFullCircle = scrollWidth >= radius * 2;
            const width = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : scrollWidth;
            const height = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(scrollWidth / 2, 2));
            const dx = isFullCircle ? cx - radius * Math.sin(Math.PI / 4) : cx - scrollWidth / 2;
            const dy = isFullCircle ? cy - radius * Math.cos(Math.PI / 4) : cy - height / 2;
            //console.log(dx, dy);
            const g = d3.select(".o-text")
                        .attr('transform', 'translate(' + [dx, dy] + ')');
            const xhtml = g.select("foreignObject")
                            .attr("width", width)
                            .attr("height", height);
            if(isFullCircle){
                xhtml.select("body")
                     .html("")
                     .html(lgText);
            }
            else{
                xhtml.select("body")
                     .html("")
                     .html(smText);
            }
        }
    }
});