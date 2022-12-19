let timeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: true });

function setDash(el) {
    if (el.nodeName === 'path') {
      el.style.dashArray = anime.setDashoffset(el);
      //console.log(el, anime.setDashoffset(el));
      return [anime.setDashoffset(el) - 1, 0];
    }
    
    return 0;
}

let paths = [
    { name: '.a1', x: 0, y: 0, stroke: '#1f91ac' },
    { name: '.a2', x: 0, y: 0, stroke: '#1f91ac' },
    { name: '.a3', x: 0, y: 177, fill: '#df871b', r: 30 },
    { name: '.l1', x: 233, y: 0, stroke: '#dd5d20'},
    { name: '.l2', x: 233, y: 236, stroke: '#0b9444' },
    { name: '.e1', x: 493, y: 0, stroke: '#1f91ac'},
    { name: '.e2', x: 493, y: 0, stroke: '#0b9444' },
    { name: '.e3', x: 493, y: 236, stroke: '#1f91ac'},
    { name: '.e4', x: 565, y: 118, fill: '#da3931', r: 30 },
    { name: '.x1', x: 753, y: 0, stroke: '#dd5d20' },
    { name: '.x2', x: 903, y: 0, stroke: '#df871b'},
    { name: '.w1', x: -103, y: 436, stroke: '#da3931' },
    { name: '.w2', x: 85, y: 436, stroke: '#da3931' },
    { name: '.w3', x: -9, y: 448, fill: '#000000', r: 30 },
    { name: '.a21', x: 275, y: 436, stroke: '#df871b' },
    { name: '.a22', x: 275, y: 436, stroke: '#df871b' },
    { name: '.a23', x: 275, y: 613, fill: '#1f91ac', r: 30 },
    { name: '.n1', x: 493, y: 436, stroke: '#1f91ac'},
    { name: '.n2', x: 623, y: 436, stroke: '#1f91ac'},
    { name: '.n3', x: 493, y: 436, stroke: '#da3931'},
    { name: '.g1', x: 763, y: 436, stroke: '#0b9444'},
    { name: '.g2', x: 763, y: 436, stroke: '#df871b'},
    { name: '.g3', x: 763, y: 672, stroke: '#da3931'},
    { name: '.g4', x: 883, y: 554, fill: '#1f91ac', r: 30},
];
const dotPerRow = 4;

paths.forEach((path, index) => {
    //let timeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: false, durationn: 300 });
    if (path.stroke) {
        timeline
        .add({
          targets: path.name,
          stroke: {
            value: ['#000', path.stroke],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
          },
          offset: 0
        }, 0);
    }

    if (path.fill) {
        timeline
        .add({
          targets: path.name,
          fill: {
            value: ['#000', path.fill],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
          },
          offset: 0
        }, 0);
    }

    if (path.r) {
        timeline
        .add({
            targets: path.name,
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad',
            r: path.r,
            offset: 0
        }, 0);
    }

    timeline
    .add({
        targets: path.name,
        translateX: {
            value: [100 * (index % dotPerRow) - path.x + 250, 0],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
        },
        translateY: {
            value: [100 * Math.floor(index / dotPerRow) - path.y + 100, 0],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
        },
    }, 0)
    .add({
        targets: path.name,
        strokeDashoffset: {
            value: setDash,
            duration: 800,
            delay: 1200 + index * 30,
            easing: 'easeInOutQuad',
            endDelay: 1000,
        },
    }, 0);
});
