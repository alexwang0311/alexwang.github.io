const smallDevice = window.matchMedia("(max-width: 576px)");
const section = document.querySelector("#about");
let isSmallDevice = smallDevice.matches;

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

const setupMouseEnterListener = (e) => {
    console.log("mouse entered about section");
    attachMouseMoveListener();
}

const setupMouseLeaveListener = (e) => {
    console.log("mouse left about section");
    detachMouseMoveListener();
}

const setupTouchStartListener = (e) => {
    console.log("touched about section");
    attachTouchMoveListener();
    if(!zoomedIn)
    {
        smMoveCircle(e);
    }
}

const setupTouchEndListener = (e) => {
    console.log("ended touching about section");
    detachTouchMoveListener();
}

const setUpListeners = () => {
    section.removeEventListener("mouseenter", setupMouseEnterListener);
    section.removeEventListener("mouseleave", setupMouseLeaveListener);
    section.removeEventListener("touchstart", setupTouchStartListener);
    section.removeEventListener("touchend", setupTouchEndListener);

    if(smallDevice.matches) {
        section.addEventListener("touchstart", setupTouchStartListener);

        section.addEventListener("touchend", setupTouchEndListener);
    }
    else {
        section.addEventListener("mouseenter", setupMouseEnterListener);

        section.addEventListener("mouseleave", setupMouseLeaveListener);
    }
}

setUpListeners();

const lgText = `<div class="o-text-body">
                    <h3>I am a software engineer at <a href="https://www.microsoft.com/en-us/" target="_blank">Microsoft</a> with a passion for crafting clean, modern, and efficient solutions.</h3>
                    <br>
                    <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create an intuitive and visually pleasing user experience - not settling for less.</p>
                    <p>Previously, my work primarily focused on developing trading/accounting systems with a distributed architecture at <a href="https://www.alliancebernstein.com/corporate/en/home.html" target="_blank">AllianceBernstein</a>. While I'm not coding away on my new <a href="https://github.com/alexwang0311" target="_blank">projects</a>, I enjoy learning about 
                        digital design, reading about software architecture, and working out.</p>
                </div>`;
const smText = `<div class="o-text-body" z-index="1" style="font: 13px 'prompt-light'">
                    <h5 class="o-text-body-header" style="font: 17px 'prompt-light'; opacity: 0">I am a software engineer at <a href="https://www.microsoft.com/en-us/" target="_blank">Microsoft</a> with a passion for crafting clean, modern, and efficient solutions.</h4>
                    <br>
                    <p class="o-text-body-content" style="opacity: 0">Whether I'm working on a new app or optimizing an existing system, I always strive to create an intuitive and visually pleasing user experience - not settling for less.</p>
                    <p class="o-text-body-content" style="opacity: 0">Previously, my work primarily focused on developing trading/accounting systems with a distributed architecture at <a href="https://www.alliancebernstein.com/corporate/en/home.html" target="_blank">AllianceBernstein</a>. While I'm not coding away on my new <a href="https://github.com/alexwang0311" z-index="2" target="_blank">projects</a>, I enjoy learning about 
                        digital design, reading about software architecture, and working out.</p>
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
                const g = d3.select("#about")
                            .append('div')
                            .attr("class", "o-text")
                            .style("position", "absolute")
                            .style("right", "20%")
                            .style("left", "20%")
                            .style("z-index", 1)
                const body = g.append("foreignObject")
                                .append("xhtml:body")
                                .style("font", "14px 'prompt-light'")
                                .style("color", "black")
                                .style("background-color", "transparent");
                body.html(smText);
                section.scrollIntoView();
                anime({
                    targets: [".o-text-body-header", ".o-text-body-content"],
                    opacity: 1,
                    duration: 1000,
                    delay: anime.stagger(1000),
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
    console.log("clicked on lg device");
    if(!zoomedIn){
        detachMouseMoveListener();
        zoomedIn = true;
        section.scrollIntoView();
        const svg = document.querySelector(".o");
        const w = svg.clientWidth;
        const h = svg.clientHeight;
        //radius percentage reference: https://oreillymedia.github.io/Using_SVG/extras/ch05-percentages.html
        anime({
            targets: ".o-out",
            r: (svg.scrollWidth / 2 - 1) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100 + "%",
            fill: "#000000",
        })
        anime({
            targets: [".o-in"],
            r: (svg.scrollWidth / 2 - 8) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100 + "%",
            fill: "#ffffff",
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeInOutQuad',
            complete: function() {
                const circle = document.querySelector(".o-in");
                const radius = circle.r.animVal.value;
                const cx = circle.cx.animVal.value + 2;
                const cy = circle.cy.animVal.value;

                const width = 2 * radius * Math.cos(Math.PI / 4);
                const height = 2 * radius * Math.cos(Math.PI / 4);
                const dx = cx - radius * Math.sin(Math.PI / 4);
                const dy = cy - radius * Math.cos(Math.PI / 4);

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
                                .style("z-index", 1)
                                .style("position", "relative")
                                .style("font", "14px 'prompt-light'")
                                .style("color", "black")
                                .style("background-color", "transparent");
                body.html(lgText);
                document.querySelector(".o-text").addEventListener("click", lgOnClickHandler);
                section.scrollIntoView();
                //important!!! force the following code to be finish executing before anime({}) call
                setTimeout(() => {
                    const textBox = document.querySelector("foreignObject body div");
                    const outerBox = document.querySelector(".o-text");
                    const outerHeight = outerBox.getBoundingClientRect().height;
                    console.log(textBox.clientHeight, outerHeight);
                    if(textBox.clientHeight < outerHeight) {
                        textBox.setAttribute("style", `transform: translateY(${(outerHeight - textBox.clientHeight) / 2}px)`);
                    }
                }, 0);
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
            translateX: ["30%", 0],
            duration: 1500,
        });
        anime({
            targets: ".UT",
            translateX: ["-30%", 0],
            duration: 1500,
        });
    }
}

const attachClickHandler = () => {
    const circle = document.querySelector(".o-group");
    if(smallDevice.matches){
        circle.addEventListener("click", smOnClickHandler);
        console.log("attached sm click handler");
    }
    else{
        circle.addEventListener("click", lgOnClickHandler);
        console.log("attached lg click handler");
    }
}

attachClickHandler();

addEventListener("resize", (e) => {
    console.log("screen size changed");
    const circle = document.querySelector(".o-group");
    if(smallDevice.matches && isSmallDevice){
        if(zoomedIn){
            const svg = document.querySelector(".o");
            const scrollHeight = svg.scrollHeight;
            const g = d3.select(".o-text")
                        .attr('transform', `translate(0, ${scrollHeight * 0.2})`);
        }
    }
    else if(!smallDevice.matches && !isSmallDevice){
        if(zoomedIn){
            const svg = document.querySelector(".o");
            const scrollWidth = svg.scrollWidth;
            const w = svg.clientWidth;
            const h = svg.clientHeight;
            document.querySelector(".o-out").setAttribute("r", (scrollWidth / 2 - 1) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100 + "%");
            document.querySelector(".o-in").setAttribute("r", (scrollWidth / 2 - 8) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100+ "%");
            const circle = document.querySelector(".o-in");
            
            const radius = circle.r.animVal.value;
            const cx = circle.cx.animVal.value;
            const cy = circle.cy.animVal.value;
                    
            const isFullCircle = scrollWidth >= radius * 2;
            const width = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : scrollWidth;
            const height = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(scrollWidth / 2, 2));
            const dx = isFullCircle ? cx - radius * Math.sin(Math.PI / 4) : cx - scrollWidth / 2;
            const dy = isFullCircle ? cy - radius * Math.cos(Math.PI / 4) : cy - height / 2;

            const g = d3.select(".o-text")
                        .attr('transform', 'translate(' + [dx, dy] + ')');
            const xhtml = g.select("foreignObject")
                            .attr("width", width)
                            .attr("height", height);

            const textBox = document.querySelector("foreignObject body div");
            const outerBox = document.querySelector(".o-text");
            const outerHeight = outerBox.getBoundingClientRect().height;
            if(textBox.clientHeight < outerHeight) {
                //console.log(textBox.clientHeight, outerHeight);
                textBox.setAttribute("style", `transform: translateY(${(outerHeight - textBox.clientHeight) / 2}px)`);
            }
            else{
                textBox.setAttribute("style", `transform: translateY(0)`);
            }
        }
    }
    else if(smallDevice.matches && !isSmallDevice){
        console.log("from lg device to sm device");
        isSmallDevice = true;
        if(zoomedIn){
            const el = document.querySelector(".o-text");
            el.remove();

            d3.select(".o-out")
                .attr("r", "5%")
                .style("fill", "#000000");
            d3.select(".o-in")
                .attr("r", "3%")
                .style("fill", "#ffffff");
            d3.select(".o-group")
                .style("transform", "translateY(40%)");

            const g = d3.select("#about")
                            .append('div')
                            .attr("class", "o-text")
                            .style("position", "absolute")
                            .style("right", "20%")
                            .style("left", "20%")
                            .style("z-index", 1)
            const body = g.append("foreignObject")
                                .append("xhtml:body")
                                .style("font", "14px 'prompt-light'")
                                .style("color", "black")
                                .style("background-color", "transparent");
            body.html(smText);
            d3.select(".o-text-body-header")
                .style("opacity", 1);
            d3.selectAll(".o-text-body-content")
                .style("opacity", 1);
            
            d3.select(".AB")
                .style("transform", "translateY(40%)  translateX(100%)");
            d3.select(".UT")
                .style("transform", "translateY(40%)  translateX(-100%)");
        }
        circle.removeEventListener("click", lgOnClickHandler);
        detachMouseMoveListener();
        if(!zoomedIn) {
            setUpListeners();
        }
        attachClickHandler();
    }
    else{
        console.log("from sm device to lg device");
        isSmallDevice = false;
        if(zoomedIn){
            const el = document.querySelector(".o-text");
            el.remove();

            d3.select(".o-group")
                .style("transform", "translateY(0)");
            d3.select(".AB")
                .style("transform", "translateX(0)  translateY(0)");
            d3.select(".UT")
                .style("transform", "translateX(0)  translateY(0)");
            const svg = document.querySelector(".o");
            const w = svg.clientWidth;
            const h = svg.clientHeight;
            d3.select(".o-out")
                .attr("r", (svg.scrollWidth / 2 - 1) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100 + "%");
            d3.select(".o-in")
                .attr("r", (svg.scrollWidth / 2 - 8) / (Math.sqrt((Math.pow(w, 2) + Math.pow(h, 2)) / 2)) * 100 + "%");

            const circle = document.querySelector(".o-in");
            const radius = circle.r.animVal.value;
            const cx = circle.cx.animVal.value + 2;
            const cy = circle.cy.animVal.value;

            const width = 2 * radius * Math.cos(Math.PI / 4);
            const height = 2 * radius * Math.cos(Math.PI / 4);
            const dx = cx - radius * Math.sin(Math.PI / 4);
            const dy = cy - radius * Math.cos(Math.PI / 4);

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
                            .style("z-index", 1)
                            .style("position", "relative")
                            .style("font", "14px 'prompt-light'")
                            .style("color", "black")
                            .style("background-color", "transparent");
            body.html(lgText);
            d3.select(".o-text")
                .style("opacity", 1);
            const textBox = document.querySelector("foreignObject body div");
            const outerBox = document.querySelector(".o-text");
            const outerHeight = outerBox.getBoundingClientRect().height;
            console.log(textBox.clientHeight, outerHeight);
            if(textBox.clientHeight < outerHeight) {
                textBox.setAttribute("style", `transform: translateY(${(outerHeight - textBox.clientHeight) / 2}px)`);
            }
        }
        circle.removeEventListener("click", smOnClickHandler);
        detachTouchMoveListener();
        if(!zoomedIn) {
            detachTouchMoveListener();
            setUpListeners();
        }
        attachClickHandler();
    }
});