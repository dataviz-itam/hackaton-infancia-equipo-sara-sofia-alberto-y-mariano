
/*********************************************************************************** */
//Definición del objeto de datos "Registro"
/*********************************************************************************** */

class registro {
    constructor(X, def_suicidio, def_agresion, C,Anio) {
        this.X = X;
        this.def_suicidio = def_suicidio;
        this.def_agresion = def_agresion;
        this.C = C;
        this.Anio = Anio;
    }
}

/************************************************************************************ */
// Función para castear y transformar los datos leidos desde csv
/************************************************************************************ */
function getDataArray(datos, opcion) {
    let arregloDatos = [];

    datos.forEach(d => {
        let objDatos = new registro(d.Estado, parseFloat(d.def_suicidio), 
                                    parseFloat(d.def_agresion),d.sexo, parseFloat(d.Anio));
        arregloDatos.push(objDatos);
    });

    return arregloDatos;
}


function getRandomSampleData(datos, tamanoSubconjunto) {

    // Creamos un conjunto para almacenar los índices seleccionados
    var indicesSeleccionados = new Set();
    var subconjuntoAleatorio = [];

    // Generamos índices aleatorios únicos 
    while (indicesSeleccionados.size < tamanoSubconjunto) {
        var indiceAleatorio = Math.floor(Math.random() * datos.length);
        
        // Verificamos si el índice ya se colocó
        if (!indicesSeleccionados.has(indiceAleatorio)) {
            //Se almacena indice para no tener registros repetidos
            indicesSeleccionados.add(indiceAleatorio);
            //Se agrega el registro a la muestra
            subconjuntoAleatorio.push(datos[indiceAleatorio]);
        }
    }

    return subconjuntoAleatorio;
}

// QUitar outlier por desviación
function deleteOutliers(arr, property, desviaciones) {
    
    //Valores de la propiedad elegida para todos los registros
    const valores = arr.map(objeto => objeto[property]); 
    
    const mean = valores.reduce((acc, val) => acc + val, 0) / valores.length;
    const variance = valores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / valores.length;
    const stdDev = Math.sqrt(variance);
    const lowerBound = mean - (stdDev * desviaciones);
    const upperBound = mean + (stdDev * desviaciones);

    return arr.filter(objeto => {
        const valor = objeto[property];
        return valor >= lowerBound && valor <= upperBound;
    });
}


// Función para agregar un pequeño ruido a un arreglo de datos
function addAxeNoise(datos, ruido, eje) {
    
    datos = datos.map(dato => { 
         return {...dato, [eje]: dato[eje] + (Math.random() * ruido) };
    });

    return datos;

}


function orderDataByColumn(datos, property, asc = true) {

   // Determinar el orden de la comparación
   var orderFactor = asc ? 1 : -1;

   // Ordenar el subconjunto por la característica especificada
   datos.sort((a, b) => {
       // Suponiendo que 'caracteristica' es el nombre de la propiedad por la que quieres ordenar
       // Asegúrate de que 'caracteristica' sea una propiedad válida en tus objetos de datos
       return orderFactor * (a[property] - b[property]);
   });

   return datos;
}
