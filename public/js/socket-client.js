// Referencias del HTML

const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

/**
 * Aqui debe ir toda la configuracion y comunicacion de los websockets con
 * nuestro servidor
 */

// socket del cliente
const socket = io(); // esto expone toda la libreria

/**
 * Podemos poner listeners que escuchan cambios o eventos. El fin de esto
 * aqui es para que desde el lado del cliente, en la consola del navegador
 * podamos enviar informacion
 */

socket.on("connect", () => {
  console.log("Conectado");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  console.log("desconectado");
  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;

  const payload = {
    mensaje,
    id: "",
    fecha: new Date().getTime(),
  };

  // Mandando info al servidor mediante nuestro socket:
  socket.emit("enviar-mensaje", payload, (id) => {
    console.log("Desde el server", id);
  });
});
