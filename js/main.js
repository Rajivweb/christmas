(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();


var flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

        } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
        flake.y += flake.velY;
        flake.x += flake.velX;
            
        if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
        }


        if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(snow);
};

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
        });
    }

    snow();
};

canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
    mY = e.clientY
});

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

init();

// SNOW


$(document).ready(function(){
	var santa = $('#santa'),
		cloud = $('#cloud > path'),
		tree = $('#tree'),
		gift = $('#gift')
		bell = $('#bell'),
		main = $('.christmas-content'),
		rl = $('#redlight > g'),
		bl = $('#bell_light > g'),
		path = $('#path'),
		wc = $('#welcome'),
		ct = $('#christmas_text > path'),
		date = $('#date'),
		star = $('#star'),
		minilight = $('#minilight #miniBulb > ellipse'),
		tl = new TimelineMax();
		// tlcloud = new TimelineMax({repeat:-1});

		TweenMax.from(cloud, 5, {x: -80, repeat: -1, yoyo: true},1);
		TweenMax.to(main, 1, {opacity:1}),2;
		// TweenMax.from(star, 1, { ease:Linear.easeNone, autoAlpha:0.5, repeat:-1,  yoyo: true});
		TweenMax.staggerFrom(minilight, 0.3, { ease:Linear.easeNone, scale:2, autoAlpha:0, repeat:-1,  yoyo: true},0.05);
		
		

	// test
	tl
	// .from(main, 0.2, {autoAlpha:0})
	.fromTo(path, 1, { scale:0, autoAlpha:0}, {ease: Expo.easeOut, scale:1, autoAlpha:1})
	.from(bell, 1, {autoAlpha:0})
	.from(wc, 0.5, {ease: Bounce.easeInOut, x:-800, autoAlpha:0})
	.staggerFrom(ct, 0.5, {ease: Bounce.easeInOut, x:800, autoAlpha:0},0.05)
	.from(date, 0.5, {ease: Bounce.easeInOut, autoAlpha:0})
	.from(tree, 1, {  y: 200, autoAlpha:0})
	.staggerFrom(rl, 1, { autoAlpha:0},0.05)
	.staggerFrom(bl, 1, { autoAlpha:0},0.05)
	.from(santa, 1, { ease: Power1.easeOut, y: 150, autoAlpha:0})
	.from(gift, 1, { ease: Elastic.easeOut.config(1, 0.3), y: 100});

});





	



