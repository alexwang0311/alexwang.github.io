const tl = anime.timeline({
    easing: "linear",
    autoplay: false
});
tl.add({
    targets: ["#block-1-1", "#block-1-2"],
    translateX: function(e, index) {
        //console.log(e, index);
        return [`${index % 2 == 0 ? "-" : ""}200%`, 0];
    },
    duration: 2000
})
.add({
    targets: ["#block-2-1", "#block-2-3"],
    translateX: function(e, index) {
        return [`${index % 2 == 0 ? "-" : ""}200%`, 0];
    },
    duration: 2000
}, "-=1000")
.add({
    targets: ["#block-3-1", "#block-3-3"],
    translateX: function(e, index) {
        return [`${index % 2 == 0 ? "-" : ""}200%`, 0];
    },
    duration: 2000
}, "-=1000")
.add({
    targets: ["#block-4-1", "#block-4-3"],
    translateX: function(e, index) {
        return [`${index % 2 == 0 ? "-" : ""}200%`, 0];
    },
    duration: 2000
}, "-=1000")
.add({
    targets: ["#block-5-1", "#block-5-2"],
    translateX: function(e, index) {
        return [`${index % 2 == 0 ? "-" : ""}200%`, 0];
    },
    duration: 2000,
}, "-=1000");

let hasSeen = false;
let finished = false;
var observer = new IntersectionObserver(function(entries) {
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
	if(entries[0].isIntersecting && !hasSeen){
        hasSeen = true;
        const start = document.documentElement.scrollTop;
        console.log('Element has just become visible in screen', start);
        const bottom = document.querySelector("#block").getBoundingClientRect().bottom;
        
        const height = document.querySelector("#block").getBoundingClientRect().height;
        
        if(bottom < 100){
            console.log("scrolling up")
            tl.seek(tl.duration)
            anime({
                targets: ["#block-2-2", "#block-3-2", "#block-4-2"],
                opacity: 1,
                delay: anime.stagger(500),
                duration: 2000,
            });
            $(window).scroll(function(e) {
                const distance = start - document.documentElement.scrollTop;
                // console.log(distance);
                let pct = 0
                if(distance >= (1 * height + (window.innerHeight - height) * 0.5)){
                    pct = (distance - (height + (window.innerHeight - height) * 0.5)) / (height + (window.innerHeight - height) * 0.5);
                    tl.seek(tl.duration * (1 - pct));
                }
                if(distance < (height + (window.innerHeight - height) * 0.5)){
                    tl.seek(tl.duration);
                }
            })
        }
        else{
            $(window).scroll(function(e) {
                const distance = document.documentElement.scrollTop - start;
                // console.log(document.documentElement.scrollTop);
                if(distance <= (1 * height + (window.innerHeight - height) * 0.25)){
                    let pct = distance / (1 * height + (window.innerHeight - height) * 0.25);
                    // console.log(pct);
                    tl.seek(tl.duration * pct);
                }
                else{
                    tl.seek(tl.duration);
                    if(!finished){
                        anime({
                            targets: ["#block-2-2", "#block-3-2", "#block-4-2"],
                            opacity: 1,
                            delay: anime.stagger(500),
                            duration: 2000,
                        });
                        console.log("done", distance);
                        finished = true;
                    }
                }
            });
        }
    }
}, { threshold: [0] });

observer.observe(document.querySelector("#block"));