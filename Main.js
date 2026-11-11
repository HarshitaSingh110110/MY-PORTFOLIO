var typed= new typed(".text",{
    string:["Frontend Developer", "Web Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})
// Kis skill ka kitna percent (bars ke liye) - yahan badlo
const barPercent = { html: 90, css: 60, javascript: 85, python: 50, react: 75 };

const R = 80;
const CIRC = 2 * Math.PI * R; // 502.65

function countUp(el, target, duration, suffix = '%') {
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * t) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function runSkills() {
  // Bars
  document.querySelectorAll('.progress').forEach(bar => {
    const key = Object.keys(barPercent).find(k => bar.classList.contains(k));
    if (!key) return;
    const p = barPercent[key];
    const fill = bar.querySelector('span');
    fill.style.width = p + '%';
    // tag ka number bhi badhta dikhe
    let n = 0;
    const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / 1600, 1);
      fill.dataset.pct = Math.round(p * t) + '%';
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  });

  // Circles (percent HTML ke .perecntage se padhta hai)
  document.querySelectorAll('.radial-bars').forEach(box => {
    const label = box.querySelector('.perecntage');
    const p = parseInt(label.textContent, 10);
    box.querySelector('.path').style.strokeDashoffset = CIRC * (1 - p / 100);
    countUp(label, p, 1800);
  });
}

// Pehle tag 0% dikhe
document.querySelectorAll('.progress span').forEach(s => s.dataset.pct = '0%');

// Jab skills section screen pe aaye tabhi chale
const target = document.querySelector('#skills');
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { runSkills(); obs.disconnect(); }
}, { threshold: 0.3 }).observe(target);