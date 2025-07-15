const estructuraMalla = [
  {
    semestre: "Primer Año - Primer Semestre",
    ramos: [
      "Formación ciudadana",
      "Taller de operaciones básicas de cocina",
      "Taller de panadería y bollería",
      "Taller de operaciones básicas de pastelería",
      "Higiene en la industria gastronómica",
      "Resolución de problemas en datos e información"
    ]
  },
  {
    semestre: "Primer Año - Segundo Semestre",
    ramos: [
      "Administración",
      "Diseño de ofertas en repostería",
      "Recepción y almacenamiento de insumos",
      "Taller de producción gastronómica",
      "Taller de servicios al cliente en restaurant",
      "Taller de producción en pastelería"
    ]
  },
  {
    semestre: "Segundo Año - Tercer Semestre",
    ramos: [
      "Electivo de tendencias del sector productivo y de servicios 1",
      "Inglés 1",
      "Taller de producción y seguridad alimentaría",
      "Taller de gestión operativa en cocina",
      "Taller de gestión operativa en pastelería",
      "Taller de supervisión en confitería y chocolatería"
    ]
  },
  {
    semestre: "Segundo Año - Cuarto Semestre",
    ramos: [
      "Electivo de tendencias del sector productivo y de servicios 2",
      "Innovación y emprendimiento 1",
      "Taller de supervisión de la producción gastronómica",
      "Taller de supervisión de la producción en pastelería",
      "Taller de supervisión de la producción en heladería",
      "Proyecto integrado"
    ]
  }
];

// Requisitos entre ramos
const prerequisitos = {
  "Taller de producción y seguridad alimentaría": ["Higiene en la industria gastronómica"],
  "Electivo de tendencias del sector productivo y de servicios 2": ["Electivo de tendencias del sector productivo y de servicios 1"],
  "Taller de supervisión de la producción gastronómica": ["Taller de gestión operativa en cocina"],
  "Taller de supervisión de la producción en pastelería": ["Taller de gestión operativa en pastelería"]
};

// Estado de aprobación
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || {};

function puedeAprobar(ramo) {
  if (!prerequisitos[ramo]) return true;
  return prerequisitos[ramo].every(r => aprobados[r]);
}

function renderMalla() {
  const contenedor = document.getElementById("contenedor-malla");
  contenedor.innerHTML = "";

  estructuraMalla.forEach(bloque => {
    const titulo = document.createElement("div");
    titulo.classList.add("semestre-titulo");
    titulo.textContent = bloque.semestre;
    contenedor.appendChild(titulo);

    bloque.ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.textContent = ramo;

      const aprobado = !!aprobados[ramo];
      const desbloqueado = puedeAprobar(ramo);

      if (aprobado) div.classList.add("aprobado");
      else if (!desbloqueado) div.classList.add("bloqueado");

      if (!aprobado && desbloqueado) {
        div.addEventListener("click", () => {
          aprobados[ramo] = true;
          localStorage.setItem("aprobados", JSON.stringify(aprobados));
          renderMalla();
        });
      }

      contenedor.appendChild(div);
    });
  });
}

// Reset
document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Deseas resetear todos los ramos aprobados?")) {
    aprobados = {};
    localStorage.removeItem("aprobados");
    renderMalla();
  }
});

renderMalla();

    
