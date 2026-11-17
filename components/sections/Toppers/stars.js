/* Firefly sparkles in the Toppers section's background (user 2026-11-15: "a 4 sided star just like the ai logo for gemini and it should
   illuminate like a firefly"; in place of the gravity stars, which had replaced animate-ui-style drifting star layers). On a canvas
   that fills the section under everything else (css/podium.css .stars):
   - each sparkle is a four-pointed star whose sides curve in to fine points, as Gemini's mark
   - it floats like a firefly: wandering slowly, its heading turning a little at a time, wrapping round at the edges
   - it lights up like one: mostly dim, then every few seconds (each on its own beat) it swells into a warm glow, holds a moment and
     fades, a touch larger while lit
   Stops while the section is off screen or the tab is hidden; one still frame, every sparkle softly lit, for people who ask for
   reduced motion.
   Performance (user 2026-11-16): the glow is no longer a canvas shadowBlur on every star in every frame (the costliest thing a 2D
   canvas does); each star is drawn from three sprites made once (its ember, its full glow and its white core), mixed by how lit it
   is. The canvas is at most 1.5x the screen's pixels and redraws about 30 times a second (a slow drift needs no more). */
export default function initStars() {
  var box = document.querySelector('[data-stars]');
  if (!box) return;
  var host = box.parentElement;
  var hex = (box.getAttribute('data-stars') || '#ffffff').replace('#', '');
  var rgb = [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16); }).join(',');
  var still = true;   // static glitter (user 2026-11-17): one frame drawn once, like an image; nothing moves or twinkles

  var cv = document.createElement('canvas');
  box.innerHTML = '';
  box.appendChild(cv);
  var cx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, flies = [], raf = 0, onScreen = true, last = performance.now();

  function make(n) {
    flies = [];
    for (var i = 0; i < n; i++) {
      flies.push({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * Math.PI * 2,
        v: .12 + Math.random() * .22,                      // px a frame: slow
        r: 3 + Math.random() * 5,                          // the star's reach, centre to point
        period: 3.5 + Math.random() * 4.5,                 // seconds between lightings
        phase: Math.random(),                              // where in its beat it starts
        spin: (Math.random() - .5) * .004, rot: (Math.random() - .5) * .3 });
    }
  }
  function size() {
    var w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    var regrow = !flies.length || Math.abs(w - W) > 40 || Math.abs(h - H) > 40;
    W = w; H = h; dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (regrow) make(Math.max(24, Math.min(90, Math.round(W * H / 22000))));
    sprites();
    draw(0);
  }

  // how lit a firefly is at point p (0..1) of its beat: dim most of the time; a quick swell, a short hold, a slower fade
  function glow(p) {
    if (p < .55) return 0;
    if (p < .68) { var u = (p - .55) / .13; return u * u * (3 - 2 * u); }
    if (p < .76) return 1;
    var d = (p - .76) / .24; return 1 - d * d * (3 - 2 * d);
  }
  // the Gemini-like sparkle: four points, its sides curving in towards the centre
  function sparkle(x, y, r, rot) {
    var k = r * .16;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.beginPath();
    cx.moveTo(0, -r);
    cx.quadraticCurveTo(k, -k, r, 0);
    cx.quadraticCurveTo(k, k, 0, r);
    cx.quadraticCurveTo(-k, k, -r, 0);
    cx.quadraticCurveTo(-k, -k, 0, -r);
    cx.closePath(); cx.fill();
    cx.restore();
  }

  // the three sprites, drawn once per size change: a star of reach R with a short soft edge (the ember), the same with the full warm
  // glow, and the white core; each is drawn scaled to a star's size and faded by how lit it is
  var R = 12, PAD = 30, spr = null;
  function sprite(blur, colour, alpha) {
    var c = document.createElement('canvas'), n = Math.ceil((R + PAD) * 2 * dpr);
    c.width = c.height = n;
    var g = c.getContext('2d'), keep = cx;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = g;   // sparkle() draws on cx
    g.shadowBlur = blur * dpr; g.shadowColor = 'rgba(' + colour + ',' + alpha + ')'; g.fillStyle = 'rgba(' + colour + ',1)';
    sparkle(R + PAD, R + PAD, R, 0);
    cx = keep;
    return c;
  }
  function sprites() { spr = { ember: sprite(4, rgb, 0), glow: sprite(26, rgb, .95), core: sprite(0, '255,255,255', 0) }; }
  function stamp(img, x, y, r, rot, alpha) {
    if (alpha < .01) return;
    var k = r / R, s = (R + PAD) * 2 * k;
    cx.globalAlpha = alpha;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
  }

  function draw(dt) {
    var t = performance.now() / 1000;
    cx.clearRect(0, 0, W, H);
    if (!spr) sprites();
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      if (dt) {   // wander: the heading turns a little, as a firefly's
        f.a += (Math.random() - .5) * .08 * dt;
        f.x += Math.cos(f.a) * f.v * dt; f.y += Math.sin(f.a) * f.v * dt - .03 * dt;   // and a faint rise
        f.rot += f.spin * dt;
        if (f.x < -20) f.x = W + 20; else if (f.x > W + 20) f.x = -20;
        if (f.y < -20) f.y = H + 20; else if (f.y > H + 20) f.y = -20;
      }
      var g = still ? .7 : glow(((t / f.period) + f.phase) % 1);
      var o = .14 + g * .86;                               // never quite gone: a faint ember between lightings
      var r = f.r * (.85 + g * .35);
      stamp(spr.ember, f.x, f.y, r, f.rot, o * (1 - g));
      stamp(spr.glow, f.x, f.y, r, f.rot, o * g);
      if (g > .05) stamp(spr.core, f.x, f.y, r * .45, f.rot, g * .85);   // a bright core while lit
    }
    cx.globalAlpha = 1;
  }
  function loop(now) {
    raf = 0;
    if (!onScreen || document.hidden) return;
    if (now - last >= 32) {   // about 30 redraws a second
      var dt = Math.min(3, (now - last) / 16.67); last = now;   // in 60fps frames, so the pace holds on any screen
      draw(dt);
    }
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!still && !raf && onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } }

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(box);
  else window.addEventListener('resize', size);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
    onScreen = e[0].isIntersecting;
    // the section's looping CSS animations (shine, sway, sparks, rays: css/podium.css) rest too while it is off screen
    var sec = host.closest('#toppers'); if (sec) sec.classList.toggle('pd--off', !onScreen);
    start();
  }).observe(host);
  document.addEventListener('visibilitychange', start);
  start();
}
