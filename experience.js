let totalTime = 10000;
const tl = anime.timeline({
    //duration: totalTime,
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
}, "-=1000")
/*
.add({
    targets: ["#block-2-2", "#block-3-2", "#block-4-2"],
    opacity: 1,
    delay: anime.stagger(500),
    duration: 2000,
});
*/

let hasSeen = false;
let finished = false;
var observer = new IntersectionObserver(function(entries) {
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
	if(entries[0].isIntersecting && !hasSeen){
        hasSeen = true;
        const start = document.documentElement.scrollTop;
        //console.log('Element has just become visible in screen', start);
        const height = document.querySelector("#block").getBoundingClientRect().height;
        $(window).scroll(function(e) {
            const distance = document.documentElement.scrollTop - start;
            //console.log(document.documentElement.scrollTop);
            if(distance <= (1 * height + (window.innerHeight - height) / 2)){
                //console.log(distance);
                const pct = distance / (1 * height + (window.innerHeight - height) * 0.45);
                tl.seek(tl.duration * pct);
            }
            else{
                if(!finished){
                    tl.seek(tl.duration);
                    anime({
                        targets: ["#block-2-2", "#block-3-2", "#block-4-2"],
                        opacity: 1,
                        delay: anime.stagger(500),
                        duration: 2000,
                    });
                    console.log("done");
                    finished = true;
                }
            }
        });
    }
}, { threshold: [0] });

observer.observe(document.querySelector("#block"));
/*
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

let blockIsVisible = isScrolledIntoView(document.querySelector("#block"));
console.log(blockIsVisible);

$(window).scroll(function(e) {
    if(isScrolledIntoView(document.querySelector("#block"))){
        if(!blockIsVisible){
            console.log("visible!", window.scrollY);
            blockIsVisible = true;
        }
    }
    else{
        if(blockIsVisible){
            console.log("invisible!", window.scrollY);
            blockIsVisible = false;
        }
    }
 });
*/