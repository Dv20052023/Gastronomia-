
const ramos = {
  // Primer año - Primer Semestre
  "Formación ciudadana": [],
  "Taller de operaciones básicas de cocina": [],
  "Taller de panadería y bollería": [],
  "Taller de operaciones básicas de pastelería": [],
  "Higiene en la industria gastronómica": [],
  "Resolución de problemas en datos e información": [],

  // Primer año - Segundo Semestre
  "Administración": [],
  "Diseño de ofertas en repostería": [],
  "Recepción y almacenamiento de insumos": [],
  "Taller de producción gastronómica": [],
  "Taller de servicios al cliente en restaurant": [],
  "Taller de producción en pastelería": [],

  // Segundo año - Tercer Semestre
  "Electivo de tendencias del sector productivo y de servicios 1": [],
  "Inglés 1": [],
  "Taller de producción y seguridad alimentaría": ["Higiene en la industria gastronómica"],
  "Taller de gestión operativa en cocina": [],
  "Taller de gestión operativa en pastelería": [],
  "Taller de supervisión en confitería y chocolatería": [],

  // Segundo año - Cuarto Semestre
  "Electivo de tendencias del sector productivo y de servicios 2": ["Electivo de tendencias del sector productivo y de servicios 1"],
  "Innovación y emprendimiento 1": [],
  "Taller de supervisión de la producción gastronómica": ["Taller de gestión operativa en cocina"],
  "Taller de supervisión de la producción en pastelería": ["Taller de gestión operativa en pastelería"],
  "Taller de supervisión de la producción en heladería": [],
  "Proyecto integrado": []
};

// Guardamos el estado de ramos aprobados en localStorage
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || {};

const malla = document.getElementById("malla");
const resetBtn = document.getElementById("reset");

function puedeAprobar(ramo) {
  // Si no tiene prerequisitos, siempre puede
  if (ramos[ramo].length === 0) return true;

  // Si todos sus prerequisitos están aprobados, puede aprobar
  return ramos[ramo].every(prereq => aprobados[prereq]);
}

function renderMalla() {
  malla.innerHTML = "";

  Object.keys(ramos).forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");

    const desbloqueado = puedeAprobar(ramo);
    const aprobado = !!aprobados[ramo];

    if (aprobado) {
      div.classList.add("aprobado");
    } else if (!desbloqueado) {
      div.classList.add("bloqueado");
    }

    div.textContent = ramo;

    if (desbloqueado && !aprobado) {
      div.addEventListener("click", () => {
        aprobados[ramo] = true;
        localStorage.setItem("aprobados", JSON.stringify(aprobados));
        renderMalla();
      });
    }

    malla.appendChild(div);
  });
}

resetBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres resetear todos los ramos aprobados?")) {
    aprobados = {};
    localStorage.removeItem("aprobados");
    renderMalla();
  }
});

renderMalla();
