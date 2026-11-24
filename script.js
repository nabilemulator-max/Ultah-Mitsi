/* =====================================================
   EDIT DI SINI AJA. Semua teks & foto ada di bagian ini.
   Foto: taruh di folder "photos", terus tulis nama filenya.
   Kalau foto belum ada, otomatis diganti kotak kosong bergaris.
   ===================================================== */
var C = {
  nama: "Sayang",          // nama pacarmu
  dari: "Aku",             // namamu

  foto: [                  // dipakai buat foto melayang di background
    "photos/1.jpg","photos/2.jpg","photos/3.jpg",
    "photos/4.jpg","photos/5.jpg","photos/6.jpg"
  ],

  pesan: [                 // pesan yang muncul satu-satu (ketuk buat lanjut)
    "Selamat ulang tahun ya, sayangku.",
    "Makasih banyak udh jadi orang yang selalu ada buat aku",
    "Kamu membuat semua momen momen mau kecil atau besar, sangat berkesan bgt buat aku.",
    "Semoga di kedepannya nanti semua yang kamu mau pelan-pelan kejadian.",
    "Aku pasti bakalan selalu dukung kamu, melewati semua hal hal bareng kamu,",
    "Aku pasti bakalan selalu dukung kamu, melewati semua hal hal bareng kamu,",
    "Dan aku pasti dan selalu ada di sini, disisi kamu, nemenin kamu, selalu dan selama lamanya."
  ],

  momen: [                 // tgl, foto, teks. Tambah/hapus sesuka kamu
    { tgl: "Awal kita kenal",   foto: "photos/1.jpg", teks: "Waktu itu aku belum tau kamu bakal jadi sepenting ini." },
    { tgl: "Jalan pertama",     foto: "photos/2.jpg", teks: "Grogi banget, tapi seneng." },
    { tgl: "Hari jadian",       foto: "photos/3.jpg", teks: "Hari paling aku inget sampai sekarang." },
    { tgl: "Hari random yang seru", foto: "photos/4.jpg", teks: "Nggak ngapa-ngapain, tapi tetep paling enak bareng kamu." }
  ],

  surat: "Hai {nama},\n\nSekali lagi, selamat ulang tahun. Aku nggak jago ngomong yang manis-manis, jadi aku bikin ini aja.\n\nMakasih ya udah sabar sama aku, udah nemenin pas aku lagi nggak asik, dan udah bikin aku ketawa hampir tiap hari.\n\nSemoga kamu sehat, bahagia, dan dikelilingi orang-orang yang sayang sama kamu. Termasuk aku, yang paling.\n\nSayang kamu banyak-banyak.\n\n{dari} 🌻",

  musik: "musik.mp3"                // isi "musik.mp3" kalau mau pakai lagu sendiri (taruh filenya di folder yang sama)
};
/* ===================== SELESAI ===================== */

var $ = function (i) { return document.getElementById(i); };
var scenes = document.querySelectorAll(".scene"), cur = 0, tm;

function pic(src, label) {
  var img = new Image();
  img.src = src; img.alt = "";
  img.onerror = function () {
    var d = document.createElement("div");
    d.className = "ph"; d.textContent = label ? "foto" : "";
    if (img.parentNode) img.parentNode.replaceChild(d, img);
  };
  return img;
}

// teks
$("nm").textContent = C.nama;
"Happy Birthday".split("").forEach(function (ch, i) {
  var s = document.createElement("span");
  s.textContent = ch === " " ? "\u00a0" : ch;
  s.style.setProperty("--d", i * 0.07 + "s");
  $("hbd").appendChild(s);
});

// dekorasi background
var PAL = ["#f6b800", "#d9392b", "#f28a30", "#5b8c3a", "#fffaf0", "#7fb2d9"];
function rnd(a, b) { return a + Math.random() * (b - a); }
function orn(kind, c) {
  var st = ' fill="' + c + '" stroke="#1f2a44" stroke-width="1.3" stroke-linejoin="round"';
  if (kind === 0) return '<svg viewBox="0 0 24 24"><path' + st + ' d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7z"/></svg>';
  if (kind === 1) return '<svg viewBox="0 0 24 24"><path' + st + ' d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.7-8 11-8 11z"/></svg>';
  if (kind === 2) return '<svg viewBox="0 0 24 24"><path' + st + ' d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11 6-1 10-5 11-11z"/></svg>';
  var p = "";
  for (var k = 0; k < 8; k++) p += '<ellipse cx="12" cy="5.4" rx="2.4" ry="4.3" transform="rotate(' + k * 45 + ' 12 12)"/>';
  return '<svg viewBox="0 0 24 24"><g fill="#f6b800" stroke="#1f2a44" stroke-width="1">' + p + '</g><circle cx="12" cy="12" r="3.8" fill="#4a2c0c" stroke="#1f2a44" stroke-width="1"/></svg>';
}
function buildFly() {
  var W = innerWidth, F = $("fly"), ft = C.foto, svg = "", i, t, x, y;
  F.innerHTML = "";
  // 1) bunting (bendera kertas)
  var n = Math.max(8, Math.round(W / 44)), sag = 14;
  svg += '<path d="M0 4Q' + W / 2 + ' ' + (4 + 2 * sag) + ' ' + W + ' 4" fill="none" stroke="#1f2a44" stroke-width="2"/>';
  for (i = 1; i <= n; i++) {
    t = i / (n + 1); x = t * W; y = 4 + 4 * sag * t * (1 - t);
    svg += '<polygon points="' + (x - 13) + ',' + y + ' ' + (x + 13) + ',' + y + ' ' + x + ',' + (y + 24) + '" fill="' + PAL[i % 5] + '" stroke="#1f2a44" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  // 2) tali foto gantung
  var by = 48, sg = 12;
  svg += '<path d="M0 ' + by + 'Q' + W / 2 + ' ' + (by + 2 * sg) + ' ' + W + ' ' + by + '" fill="none" stroke="#1f2a44" stroke-width="2"/>';
  F.insertAdjacentHTML("beforeend", '<svg class="strings">' + svg + '</svg>');
  var cnt = W < 600 ? 3 : W < 1000 ? 5 : 7, w = Math.min(92, W / (cnt + 1.6));
  for (i = 1; i <= cnt; i++) {
    t = i / (cnt + 1); x = t * W; y = by + 4 * sg * t * (1 - t);
    var h = document.createElement("div");
    h.className = "hang";
    h.style.cssText = "left:" + (x - w / 2) + "px;top:" + (y + 2) + "px";
    h.style.setProperty("--w", w + "px");
    h.style.setProperty("--t", rnd(3, 5.5) + "s");
    h.style.setProperty("--dl", -rnd(0, 4) + "s");
    h.style.setProperty("--r", rnd(2, 5) + "deg");
    h.innerHTML = '<i class="cl"></i><div class="fr"></div>';
    h.querySelector(".fr").appendChild(pic(ft[i % ft.length], false));
    F.appendChild(h);
  }
  // 3) stiker foto yang melayang pelan di pinggir
  var br = ["50%", "18px", "42% 58% 55% 45% / 50% 45% 55% 50%", "26px 8px 26px 8px", "50%"];
  var sc = W < 600 ? 5 : 8;
  for (i = 0; i < sc; i++) {
    var s = document.createElement("div"), sw = W < 600 ? rnd(78, 104) : rnd(110, 160);
    s.className = "stk";
    s.style.setProperty("--w", sw + "px");
    s.style.setProperty("--br", br[i % br.length]);
    s.style.setProperty("--t", rnd(6, 11) + "s");
    s.style.setProperty("--dl", -rnd(0, 8) + "s");
    s.style.setProperty("--r", rnd(3, 9) + "deg");
    s.style.top = (22 + (i * 66 / sc) + rnd(0, 6)) + "%";
    if (i % 2) s.style.right = -sw * 0.38 + "px"; else s.style.left = -sw * 0.38 + "px";
    s.appendChild(pic(ft[(i + 3) % ft.length], false));
    F.appendChild(s);
  }
  // 4) pernak-pernik naik pelan (bintang, hati, kilau, bunga matahari)
  for (i = 0; i < 20; i++) {
    var o = document.createElement("div"), sz = rnd(14, 32);
    o.className = "orn";
    o.style.left = rnd(0, 96) + "vw";
    o.style.setProperty("--s", sz + "px");
    o.style.setProperty("--t", rnd(20, 40) + "s");
    o.style.setProperty("--dl", -rnd(0, 40) + "s");
    o.style.setProperty("--sw", rnd(-70, 70) + "px");
    o.innerHTML = orn(i % 4, PAL[(i * 2) % PAL.length]);
    F.appendChild(o);
  }
}
buildFly();
var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(buildFly, 300); });

// momen
C.momen.forEach(function (m, i) {
  var d = document.createElement("div");
  d.className = "mo";
  d.innerHTML = '<div class="tg mk"></div><div class="pol"><div class="slot"></div><p class="tx"></p></div>';
  d.querySelector(".tg").textContent = m.tgl;
  d.querySelector(".tx").textContent = m.teks;
  d.querySelector(".slot").appendChild(pic(m.foto, true));
  $("momen").appendChild(d);
});

// pindah scene
function show(n) {
  scenes[cur].classList.remove("on");
  cur = Math.min(n, scenes.length - 1);
  scenes[cur].classList.add("on");
  scenes[cur].scrollTop = 0;
  if (cur === 1) { document.body.classList.add("fly"); $("mu").hidden = false; burst(60); }
  if (cur === 2) startPesan();
  if (cur === 5) typeLetter();
}
document.querySelectorAll(".nx").forEach(function (b) {
  b.onclick = function () { show(cur + 1); };
});

// pesan
var pi = 0;
function setPesan() {
  var p = $("pt");
  p.style.opacity = 0;
  setTimeout(function () { p.textContent = C.pesan[pi]; p.style.opacity = 1; }, 200);
  p.style.transition = "opacity .3s";
  if (pi >= C.pesan.length - 1) { $("nx2").hidden = false; $("hint").hidden = true; }
}
function startPesan() { pi = 0; setPesan(); }
$("note").onclick = function () {
  if (pi < C.pesan.length - 1) { pi++; setPesan(); }
};

// kue
$("blow").onclick = function () {
  $("cake").classList.add("out");
  burst(80);
  $("blow").hidden = true;
  $("nx4").hidden = false;
};

// surat
function typeLetter() {
  var t = C.surat.replace("{nama}", C.nama).replace("{dari}", C.dari), k = 0, L = $("letter");
  L.textContent = "";
  (function go() { L.textContent = t.slice(0, ++k); if (k < t.length) tm = setTimeout(go, 40); })();
}

// confetti
function burst(n) {
  var col = ["#f6b800", "#f28a30", "#d9392b", "#3d6b27", "#ffffff", "#1f2a44"];
  for (var i = 0; i < n; i++) {
    var s = document.createElement("i");
    s.className = "cf";
    s.style.left = Math.random() * 100 + "vw";
    s.style.background = col[i % col.length];
    document.body.appendChild(s);
    s.animate([
      { transform: "translate(0,0) rotate(0)", opacity: 1 },
      { transform: "translate(" + ((Math.random() - .5) * 200) + "px,108vh) rotate(" + (Math.random() * 720) + "deg)", opacity: .9 }
    ], { duration: 2400 + Math.random() * 1800, easing: "ease-in" });
    (function (el) { setTimeout(function () { el.remove(); }, 4300); })(s);
  }
}

// musik
var ac, playing = false, au, stopT;
var N = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392, A: 440, B: 466.16, H: 523.25 };
var M = "C.75 C.25 D1 C1 F1 E2 C.75 C.25 D1 C1 G1 F2 C.75 C.25 H1 A1 F1 E1 D1 B.75 B.25 A1 F1 G1 F2".split(" ");
function tone(f, t, d) {
  var o = ac.createOscillator(), g = ac.createGain();
  o.type = "triangle"; o.frequency.value = f;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(.18, t + .03);
  g.gain.exponentialRampToValueAtTime(.001, t + d);
  o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + .05);
}
function synth() {
  ac = new (window.AudioContext || window.webkitAudioContext)();
  var t = ac.currentTime + .1;
  M.forEach(function (x) { var d = parseFloat(x.slice(1)) * .5; tone(N[x[0]], t, d * .95); t += d; });
  stopT = setTimeout(stopMusic, (t - ac.currentTime) * 1000);
}
function stopMusic() {
  playing = false; $("mu").textContent = "🎵 Putar lagu";
  clearTimeout(stopT);
  if (au) au.pause();
  if (ac) { ac.close(); ac = null; }
}
$("mu").onclick = function () {
  if (playing) return stopMusic();
  playing = true; $("mu").textContent = "🎵 Matikan";
  if (C.musik) { au = au || new Audio(C.musik); au.loop = true; au.play(); } else synth();
};
