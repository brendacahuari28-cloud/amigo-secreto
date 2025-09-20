// Lista de participantes
let participantes = [];

// Referencias a los elementos del DOM
const input = document.getElementById("amigo");       // input de texto
const listaAmigos = document.getElementById("listaAmigos"); // ul donde se listan los amigos
const listaResultado = document.getElementById("resultado"); // ul donde se muestran resultados

// Función para mostrar la lista de amigos
function mostrarParticipantes() {
  listaAmigos.innerHTML = "";
  participantes.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = p;

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.onclick = () => {
      participantes.splice(i, 1);
      mostrarParticipantes();
    };

    li.appendChild(btnEliminar);
    listaAmigos.appendChild(li);
  });
}

// Función para añadir un amigo
function agregarAmigo() {
  const nombre = input.value.trim();
  if (nombre === "") {
    alert("El nombre no puede estar vacío");
    return;
  }
  if (participantes.includes(nombre)) {
    alert("Ese nombre ya fue añadido");
    return;
  }
  participantes.push(nombre);
  input.value = "";
  mostrarParticipantes();
}

// Función para mezclar un array (Fisher-Yates)
function mezclar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Función para sortear amigo secreto
function sortearAmigo() {
  if (participantes.length < 2) {
    alert("Necesitas al menos 2 participantes");
    return;
  }

  listaResultado.innerHTML = "";
  const listaSorteada = mezclar(participantes);
  const receptores = [...listaSorteada.slice(1), listaSorteada[0]];

  listaSorteada.forEach((dador, i) => {
    const receptor = receptores[i];
    const li = document.createElement("li");
    li.textContent = `${dador} → ${receptor}`;
    listaResultado.appendChild(li);
  });
}


