// Obtener el canvas y su contexto
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Variables para seguir el movimiento del mouse
var painting = false;

// Función para empezar a pintar cuando se hace clic en el canvas
canvas.addEventListener('mousedown', function(e) {
    painting = true;
    draw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
});

// Función para dejar de pintar cuando se suelta el clic
canvas.addEventListener('mouseup', function() {
    painting = false;
});

// Función para pintar mientras se mueve el mouse
canvas.addEventListener('mousemove', function(e) {
    if (painting) {
        draw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    }
});

// Función para pintar un punto en la posición dada
function draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = 'skyblue'; // color del trazo
        ctx.lineWidth = 30; // grosor del trazo
        ctx.lineJoin = 'round'; // estilo de unión
        ctx.moveTo(lastX, lastY); // mover el lápiz a la última posición
        ctx.lineTo(x, y); // dibujar una línea hasta la nueva posición
        ctx.closePath(); // cerrar el trazo
        ctx.stroke(); // dibujar el trazo
    }
    lastX = x; // actualizar la última posición en X
    lastY = y; // actualizar la última posición en Y
}


function toggleDisplay() {
    var elemento = document.getElementById("right");

    if (elemento.style.display === "none" || elemento.style.display === "") {
      elemento.style.display = "block";
    } else {
      elemento.style.display = "none";
    }
};
