//mostrar informações ao clicar no atomo
const atomData = {
  H: {
    nome: "Hidrogênio",
    simbolo: "H",
    numero: 1,
    massa: "1,008 u",
    camadas: 1,
    grupo: "1 (Metais alcalinos)"
  },
  C: {
    nome: "Carbono",
    simbolo: "C",
    numero: 6,
    massa: "12,011 u",
    camadas: 2,
    grupo: "14 (Carbonoides)"
  },
  O: {
    nome: "Oxigênio",
    simbolo: "O",
    numero: 8,
    massa: "15,999 u",
    camadas: 2,
    grupo: "16 (Calcogênios)"
  },
  Na: {
    nome: "Sódio",
    simbolo: "Na",
    numero: 11,
    massa: "22,990 u",
    camadas: 3,
    grupo: "1 (Metais alcalinos)"
  }
};

document.querySelectorAll(".atom").forEach(atom => {
  atom.addEventListener("click", () => {
    let el = atomData[atom.dataset.element];
    if (el) {
      alert(
        `Nome: ${el.nome}\nSímbolo: ${el.simbolo}\nNúmero atômico: ${el.numero}\nMassa atômica: ${el.massa}\nCamadas eletrônicas: ${el.camadas}\nGrupo: ${el.grupo}`
      );
    }
  });
});

// Flexbox que expande
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let content = btn.nextElementSibling;
    let arrow = btn.querySelector('.arrow');

    content.classList.toggle('open');

    // troca a seta
    if (content.classList.contains('open')) {
      arrow.textContent = '▲';
    } else {
      arrow.textContent = '▼';
    }
  });
});

function updateHeaderOffset(){
  let header = document.querySelector('.site-header');
  let height = header ? Math.ceil(header.getBoundingClientRect().height) : 80;

  document.documentElement.style.setProperty('--header-height', height + 'px');

  document.querySelectorAll("section[id]").forEach(sec => {
    sec.style.scrollMarginTop = height + "px";
  });
}



let header = document.querySelector("header");
let headerHeight = header.offsetHeight;

document.querySelectorAll('#nav-list a').forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('show'));
});



// atualiza no load e resize
window.addEventListener('load', updateHeaderOffset);
window.addEventListener('resize', updateHeaderOffset);
window.addEventListener('orientationchange', updateHeaderOffset);


let hamburger = document.getElementById('hamburger-btn');
let navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('show');
});


