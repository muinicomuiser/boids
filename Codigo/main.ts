import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Geometria, ManejadorEventos, Matematica, Renderizado, Restriccion, Vector } from './MUI-JS/mui.js'

const COMPO: Composicion = new Composicion('canvas')
COMPO.tamanoCanvas(1080, 1920)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = Renderizado.colorHSL(220, 100, 0);
Render.anchoCanvas = window.innerWidth;
Render.altoCanvas = window.innerHeight;

const BORDEMENOR: number = Render.anchoCanvas < Render.altoCanvas ? Render.anchoCanvas : Render.altoCanvas

//CONSTANTES
const NUMEROBOIDS: number = 200 < Math.floor(BORDEMENOR / 2) ? 200 : Math.floor(BORDEMENOR / 2);
const ESCALA: number = 2
const VELMAXIMA: number = 2;
const RADIOINICIAL: number = BORDEMENOR / 2;

const DISTANCIAREPELER: number = 30;
const FUERZAREPELER: number = 6;

const DISTANCIACOORDINAR: number = 50;
const FACTORCOORDINACION: number = 0.4;

const COLORBOID: string = Renderizado.colorHSL(220, 0, 100);

const DETECTARMOUSE: boolean = true;
const ATRACCIONMOUSE: number = 5;

////////////////

let mousePresente: boolean = false;
let vectorMouse: Vector = Vector.cero();

let entorno: Entorno = Entorno.crearEntornoCanvas(Render.canvas)

/**Forma generadora de posiciones.*/
let formaGeneradora: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROBOIDS, RADIOINICIAL);

/**Generador de círculos.*/
let boids: Cuerpo[] = [];
let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
formaGeneradora.verticesTransformados.forEach((vertice) => {
    let boid: Cuerpo = Cuerpo.poligono(vertice.x, vertice.y, 3, 5);
    boid.vertices = verticesboids;
    boid.posicion = vertice;
    boid.velocidad = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
    boid.escala = ESCALA
    boid.rotarSegunVelocidad = true;
    boid.colorTrazo = COLORBOID;
    boids.push(boid);
})

animar();

function animar() {
    Render.limpiarCanvas()
    /**Dibujar boids.*/
    boids.forEach((boid) => {
        // boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
        boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
        boid.posicion = entorno.envolverBorde(boid.posicion);
        boid.mover()
        boid.trazar(Render);
        boid.aceleracion = Vector.cero()
    })

    for (let i: number = 0; i < boids.length - 1; i++) {
        for (let j: number = i + 1; j < boids.length; j++) {
            let distancia: number = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
            if (distancia < DISTANCIACOORDINAR) {
                if (distancia < DISTANCIAREPELER) {
                    boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia))
                    boids[j].aceleracion = Vector.invertir(boids[i].aceleracion)
                }
                let velI: Vector = boids[i].velocidad;
                boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)))
                boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)))
            }

        }
    }
    if (DETECTARMOUSE && mousePresente) {
        boids.forEach((boid) => {
            let distanciaMouse: number = Geometria.distanciaEntrePuntos(boid.posicion, vectorMouse);
            boid.aceleracion = Vector.suma(boid.aceleracion, Fuerza.atraerAVector(boid, vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));

        })
    }
    requestAnimationFrame(animar);
}

function setMousePresente(presente: boolean): void {
    if (DETECTARMOUSE) {
        mousePresente = presente;
    }
}

ManejadorEventos.mouseEnCanvas('mouseenter', Render.canvas, setMousePresente, true);
ManejadorEventos.mouseEnCanvas('mouseleave', Render.canvas, setMousePresente, false);
ManejadorEventos.eventoMouseEnCanvas('mousemove', Render.canvas, (evento) => {
    if (DETECTARMOUSE) {
        let mouseX: number = evento.pageX - Render.canvas.offsetLeft;
        let mouseY: number = evento.pageY - Render.canvas.offsetTop
        vectorMouse = Vector.crear(mouseX, mouseY);
    }
});
