const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
let colors = [];

function genPalette() {
  colors = Array.from({ length: 5 }, () => '#' + Math.random().toString(16).slice(2, 8));
  colors.forEach((x, i) => {
    const c = $$('.color')[i];
    if (c.locked) return;
    c.querySelector('.color-preview').style.backgroundColor = x;
    c.querySelector('.text').innerText = x.toUpperCase();
  });
}

$$('.color').forEach((x) => {
  x.addEventListener('click', () => {
    const c = x.querySelector('.text').innerText;
    copy(c);
    $('.cb-color').innerText = c;
    $('.clipboard').style.opacity = 1;
    x.classList.toggle('selected');
    x.locked = !x.locked;
  });
});

function copy(c) {
  const el = document.createElement('input');
  el.value = c;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(el);
}

$('.btn').addEventListener('click', genPalette);
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) genPalette();
  if (e.keyCode === 67) copy(colors.join`, `);
});

genPalette();
