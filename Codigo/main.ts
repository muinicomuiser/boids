import { Matematica } from "./Fuente/Utiles/Matematica.js";
import { Punto } from "./Fuente/GeometriaPlana/Punto.js";
import { Forma } from "./Fuente/GeometriaPlana/Formas.js";
import { Vector } from "./Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "./Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "./Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "./Fuente/Fisicas/Fuerza.js";
import { Geometria } from "./Fuente/Utiles/Geometria.js";
import { Restriccion } from "./Fuente/Interaccion/Restriccion.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 920;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const NUMEROBOIDS: number = 200;
const ESCALA: number = 1.5;
const VELMAXIMA: number = 2;

const ROTARSEGUNVELOCIDAD: boolean = true;
    
const DISTANCIAREPELER: number = 20;
const FUERZAREPELER: number = 1.5;
    
const DISTANCIACOORDINAR: number = 40;
const FACTORCOORDINACION: number = 0.5;

const COLORBOID: string = Dibujante.colorHSL(50, 100, 100);
const COLORFONDO: string = Dibujante.colorHSL(220, 100, 0);

const DETECTARMOUSE: boolean = true;
const ATRACCIONMOUSE: number = 0.05;

////////////////

let mousePresente: boolean = false;
let vectorMouse: Vector = Vector.cero();    
CANVAS.style.backgroundColor = COLORFONDO;
    
window.addEventListener("load", ()=>{
    
    let dibu: Dibujante = new Dibujante(CONTEXT)
    dibu.colorFondo = COLORFONDO;

    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROBOIDS, 320);
    
    /**Generador de círculos.*/
    let boids: Cuerpo[] = [];
    let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
    for(let i: number = 0; i < NUMEROBOIDS; i++){
        let boid: Cuerpo = Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
        let velocidadInicial: Vector = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
        boid.vertices = verticesboids;
        boid.posicion = formaGeneradora.verticesTransformados[i]
        boid.velocidad = velocidadInicial;
        boid.escala = ESCALA;
        boid.rotarSegunVelocidad = ROTARSEGUNVELOCIDAD;
        boid.color = COLORBOID;
        boids.push(boid);
    }

    /**Límites infinitos.*/
    function envolverBorde(vector: Vector): Vector{
        let x: number = vector.x;
        let y: number = vector.y;
        if(x > CANVAS.width){
            x -= CANVAS.width
        }
        if(x < 0){
            x += CANVAS.width
        }
        if(y > CANVAS.height){
            y -= CANVAS.height
        }
        if(y < 0){
            y += CANVAS.height
        }
        return Vector.crear(x, y)
    }
    
    /**Prueba de tiempo.*/
    function tiempoProceso(): void{
        let tiempoInicio: number = Date.now();
        
        for(let i: number = 0; i < boids.length-1; i++){
            for(let j: number = i+1; j < boids.length; j++){
                let distancia: number = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                if(distancia < DISTANCIACOORDINAR){
                    if(distancia < DISTANCIAREPELER){
                        boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER*(1/distancia))
                        boids[j].aceleracion = Vector.invertir(boids[i].aceleracion)
                    }
                    let velI: Vector = boids[i].velocidad;
                    boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION*(1/distancia)))
                    boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION*(1/distancia)))
                }
                if(DETECTARMOUSE && mousePresente){
                    let distanciaMouse: number = Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector.suma(boids[i].aceleracion, Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE*(1/distanciaMouse)));
                    if(j == boids.length - 1){
                        distanciaMouse = Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector.suma(boids[j].aceleracion, Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE*(1/distanciaMouse)));
                    }
                }

            }
        }

        /**Dibujar boids.*/
        for(let boid of boids){
            boid.posicion = envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
            boid.mover()
            boid.trazar(dibu);
        }
        let tiempoFinal: number = Date.now();
        console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
    }
    //tiempoProceso();
    function animar(){

        dibu.limpiarCanvas(CANVAS)
        
        for(let i: number = 0; i < boids.length-1; i++){
            for(let j: number = i+1; j < boids.length; j++){
                let distancia: number = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);

                if(distancia < DISTANCIACOORDINAR){
                    if(distancia < DISTANCIAREPELER){
                        boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER*(1/distancia))
                        boids[j].aceleracion = Vector.invertir(boids[i].aceleracion)
                    }
                    let velI: Vector = boids[i].velocidad;
                    boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION*(1/distancia)))
                    boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION*(1/distancia)))
                }
                if(DETECTARMOUSE && mousePresente){
                    let distanciaMouse: number = Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector.suma(boids[i].aceleracion, Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE*(1/distanciaMouse)));
                    if(j == boids.length - 1){
                        distanciaMouse = Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector.suma(boids[j].aceleracion, Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE*(1/distanciaMouse)));
                    }
                }

            }
        }

        /**Dibujar boids.*/
        for(let boid of boids){
            boid.posicion = envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
            boid.mover()
            boid.trazar(dibu);
        }
        requestAnimationFrame(animar);
    }
    animar()
})
if(DETECTARMOUSE){
    CANVAS.addEventListener("mouseenter", (event)=>{
        if(event){
            mousePresente = true;
        }
    })
    CANVAS.addEventListener("mouseleave", (event)=>{
        if(event){
            mousePresente = false;
        }
    })
    CANVAS.addEventListener("mousemove", (event)=>{
        let mouseX: number = event.pageX - CANVAS.offsetLeft;
        let mouseY: number = event.pageY - CANVAS.offsetTop
        vectorMouse = Vector.crear(mouseX, mouseY);
    })
}

