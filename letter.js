var timeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: false });

//let paths = [];
let paths = [
    { name: '.a1', x: 195.47816, y: 152.84847, stroke: '#1f91ac' },
    { name: '.a2', x: 200.09133, y: 152.84847, stroke: '#1f91ac' },
    { name: '.a3', x: 127.09585, y: 329.962095, stroke: '#0b9444' },
    { name: '.a4', x: 127.09585, y: 329.962095, fill: '#0b9444' },
];

paths.forEach((path, index) => {
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
        });
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
        });
    }

    timeline
    .add({
        targets: path.name,
        translateX: {
            value: [100 * (index % 4) - path.x + 100, -100],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
        },
        translateY: {
            value: [100 * Math.floor(index / 4) - path.y + 100, -100],
            duration: 500,
            delay: 1000 + index * 30,
            easing: 'easeInOutQuad'
        },
        offset: 0
    });

    timeline
    .add({
        targets: path.name,
        strokeDashoffset: {
            value: setDash,
            duration: 800,
            delay: 1200 + index * 30,
            easing: 'easeInOutQuad'
        },
        offset: 0
    });
});