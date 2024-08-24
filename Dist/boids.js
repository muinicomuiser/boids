(function () {
    'use strict';

    /**
     * MÓDULO MATEMÁTICO EN ESPAÑOL
     *
     * Por agregar: floor, ceil, logaritmo, trigonometrías, exp, raizcuadrada, cuadrado, cubo, max, min, promedio.
     * POR CORREGIR: Reemplazar multiplicaciones por multiplicacion, y las sumas también.
     */
    class Matematica {
        static aleatorio(min, max) {
            let rango = max - min;
            return (Math.random() * rango) + min;
        }
        //PROBAR
        static aleatorioEntero(min, max) {
            let rango = 1 + max - min;
            return Math.trunc((Math.random() * rango) + min);
        }
    }

    class Geometria {
        /**Retorna el doble del valor de PI.*/
        static get DOS_PI() {
            return Math.PI * 2;
        }
        /**Retorna la mitad del valor de PI.*/
        static get PI_MEDIO() {
            return Math.PI / 2;
        }
        //GRADOS  
        /**Transforma grados sexagesimales a radianes.*/
        static gradoARadian(grado) {
            return (grado / 180) * Math.PI;
        }
        /**Transfoma radianes a grados sexagesimales.*/
        static radianAGrado(rad) {
            return (rad / Math.PI) * 180;
        }
        //PITAGÓRICA
        /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
        static hipotenusa(cateto1, cateto2) {
            return (cateto1 ** 2 + cateto2 ** 2) ** (1 / 2);
        }
        /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
        static cateto(hipotenusa, cateto) {
            return (hipotenusa ** 2 - cateto ** 2) ** (1 / 2);
        }
        //COORDENADAS
        /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
        static distanciaEntrePuntos(puntoUno, puntoDos) {
            return this.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        }
        /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
        static puntoMedio(puntoUno, puntoDos) {
            return { x: (puntoUno.x / 2 + puntoDos.x / 2), y: (puntoUno.y / 2, +puntoDos.y / 2) };
        }
    }

    //POR REVISAR
    class Vector {
        _x;
        _y;
        _origen;
        _id;
        constructor(x, y) {
            this._x = x;
            this._y = y;
            this._origen = { x: 0, y: 0 };
            this._id = 0;
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        get magnitud() {
            return Vector.magnitud(this);
        }
        get angulo() {
            return Vector.angulo(this);
        }
        get origen() {
            return { x: this._origen.x, y: this._origen.y };
        }
        set origen(origen) {
            this._origen = { x: origen.x, y: origen.y };
        }
        static magnitud(vector) {
            return (vector.x ** 2 + vector.y ** 2) ** (1 / 2);
        }
        //REVISARRRRRRRRRRRRRRRR
        static angulo(vector) {
            if (vector.x == 0 && vector.y == 0) {
                return 0;
            }
            else if (vector.y > 0 && vector.x == 0) {
                return Geometria.PI_MEDIO;
            }
            else if (vector.y < 0 && vector.x == 0) {
                return (3 / 2) * Math.PI;
            }
            else {
                if (vector.y > 0 && vector.x > 0) {
                    return Math.atan(vector.y / vector.x);
                }
                else if (vector.y > 0 && vector.x < 0) {
                    return Math.acos(vector.x / Vector.magnitud(vector));
                }
                else if (vector.y < 0 && vector.x < 0) {
                    return Math.PI - Math.asin(vector.y / Vector.magnitud(vector));
                }
                return Geometria.DOS_PI - Math.acos(vector.x / Vector.magnitud(vector));
            }
        }
        static cero() {
            return new Vector(0, 0);
        }
        static arriba() {
            return new Vector(0, -1);
        }
        static abajo() {
            return new Vector(0, 1);
        }
        static izquierda() {
            return new Vector(-1, 0);
        }
        static derecha() {
            return new Vector(1, 0);
        }
        /**Retorna un vector nuevo correspondiente a las componentes x e y ingresadas.*/
        static crear(x, y) {
            return new Vector(x, y);
        }
        static segunPuntos(origen, extremo) {
            let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
            return vector;
        }
        static clonar(vector) {
            let x = vector.x;
            let y = vector.y;
            return new Vector(x, y);
        }
        static suma(vectorUno, vectorDos) {
            let vectorSuma = new Vector((vectorUno.x + vectorDos.x), (vectorUno.y + vectorDos.y));
            return vectorSuma;
        }
        static resta(vectorUno, vectorDos) {
            let vectorResta = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
            return vectorResta;
        }
        /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
        static escalar(vector, escalar) {
            let vectorEscalado = new Vector((vector.x * escalar), (vector.y * escalar));
            return vectorEscalado;
        }
        /**Retorna una copia del vector ingresado con magnitud 1.*/
        static normalizar(vector) {
            return new Vector(vector.x / vector.magnitud, vector.y / vector.magnitud);
        }
        /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
        static invertir(vector) {
            return new Vector(-vector.x, -vector.y);
        }
        /**Retorna el vector normal de un segmento formado por dos vectores.
         * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.
         * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
        */
        static normal(vectorUno, vectorDos) {
            let vectorSegmento = Vector.segunPuntos(vectorUno, vectorDos);
            return Vector.rotar(vectorSegmento, -Geometria.PI_MEDIO);
        }
        static punto(vectorUno, vectorDos) {
            return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y);
        }
        static cruz(vectorUno, vectorDos) {
            return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x;
        }
        /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
        static proyeccion(vectorUno, vectorEje) {
            return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
        }
        //O DEBERÍA ENTREGAR LA RESTA DEL MAYOR CON EL MENOR??? 
        /**Retorna el valor del ángulo entre dos vectores.*/
        static anguloVectores(vectorUno, vectorDos) {
            let punto = Vector.punto(vectorUno, vectorDos);
            let magnitudes = vectorUno.magnitud * vectorDos.magnitud;
            return Math.acos(punto / magnitudes);
        }
        static clonarConjunto(vectores) {
            let conjuntoCopia = [];
            for (let vector of vectores) {
                conjuntoCopia.push(Vector.clonar(vector));
            }
            return conjuntoCopia;
        }
        static rotar(vector, angulo) {
            let x = (Math.cos(angulo) * vector.x) - (Math.sin(angulo) * vector.y);
            let y = (Math.sin(angulo) * vector.x) + (Math.cos(angulo) * vector.y);
            return new Vector(x, y);
        }
    }

    /**
            =============================================
                    * MÓDULO DE TRANSFORMACIONES *
            =============================================
            Trabaja sobre conjuntos de vectores.

            Almacena las transformaciones como atributos.

            Siempre retorna copias nuevas de los conjuntos de vectores ingresados.

     */
    /**Aplica transformaciones de escala, rotación y desplazamiento sobre arreglos de vectores.
     * Siempre retorna copias nuevas de los arreglos.
     * Almacena en sus atributos los valores de las transformaciones que aplica.
     */
    class Transformacion {
        escala;
        rotacion;
        posicion;
        constructor(x = 0, y = 0, rotacion = 0, escala = 1) {
            this.escala = escala;
            this.rotacion = rotacion;
            this.posicion = Vector.crear(x, y);
        }
        /**Retorna el arreglo de vectores resultante de aplicar las transformaciones de escala, rotación y desplazamiento
         * sobre un arreglo de vectores de entrada.
         * Permite aumentar puntualmente la rotación en un ángulo específico sin modificar la propiedad de rotación de la transformación.*/
        transformarConjuntoVectores(vectores) {
            let vectoresTransformados = Vector.clonarConjunto(vectores);
            vectoresTransformados = this.aplicarEscalaVectores(vectoresTransformados);
            vectoresTransformados = this.aplicarRotacionVectores(vectoresTransformados);
            vectoresTransformados = this.aplicarDesplazamientoVectores(vectoresTransformados);
            return vectoresTransformados;
        }
        /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        aplicarEscalaVectores(vectores) {
            let vectoresEscalados = [];
            for (let vector of vectores) {
                let vectorEscalado = Vector.escalar(vector, this.escala);
                vectoresEscalados.push(vectorEscalado);
            }
            return vectoresEscalados;
        }
        /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        aplicarDesplazamientoVectores(vectores) {
            let vectoresDesplazados = [];
            for (let vector of vectores) {
                let x = vector.x + this.posicion.x;
                let y = vector.y + this.posicion.y;
                vectoresDesplazados.push(Vector.crear(x, y));
            }
            return vectoresDesplazados;
        }
        /**Rota cada uno de los vectores del arreglo ingresado según el ángulo de rotación almacenado y los retorna en un arreglo nuevo.
        */
        aplicarRotacionVectores(vectores) {
            let vectoresRotados = [];
            for (let vector of vectores) {
                let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
                let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
                vectoresRotados.push(Vector.crear(x, y));
            }
            return vectoresRotados;
        }
        /**Rota cada uno de los vectores de un arreglo según el ángulo ingresado y los retorna en un arreglo nuevo.
        */
        static rotarVectores(vectores, angulo) {
            let vectoresRotados = [];
            for (let vector of vectores) {
                let x = vector.x * Math.cos(angulo) - vector.y * Math.sin(angulo);
                let y = vector.x * Math.sin(angulo) + vector.y * Math.cos(angulo);
                vectoresRotados.push(Vector.crear(x, y));
            }
            return vectoresRotados;
        }
    }

    var TipoFormas;
    (function (TipoFormas) {
        TipoFormas["circunferencia"] = "circunferencia";
        TipoFormas["poligono"] = "poligono";
        TipoFormas["linea"] = "linea";
        TipoFormas["vector"] = "vector";
    })(TipoFormas || (TipoFormas = {}));

    //POR INTEGRAR
    // Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
    // Función de escalar, reflejar
    // SUMAR FORMAS
    //Agregar propiedad de vértices transformados, normales rotadas y apotema, para no estar calculándolo en cada momento,
    //ademas de una propiedad que avise cuando haya que aplicar la transformación.
    class Forma {
        _centro = Vector.cero();
        _lados = 0;
        _radio = 0;
        _color = "";
        _vertices = [];
        _verticesTransformados = [];
        _tipo = TipoFormas.poligono;
        _transformacion = new Transformacion();
        _transformar = true;
        constructor() { }
        /**Retorna un string que indica el tipo de forma geométrica.
         * "poligono", "circunferencia", "linea"
        */
        get tipo() {
            return this._tipo;
        }
        /**Retorna el número de lados de la figura.*/
        get lados() {
            return this._lados;
        }
        /**Retorna el valor del radio sin transformar.*/
        get radio() {
            return this._radio;
        }
        /**Retorna el valor del radio con la transformación de escala aplicada.*/
        get radioTransformado() {
            let radioTransformado = this._radio * this._transformacion.escala;
            return radioTransformado;
        }
        /**Retorna una copia de la transformación de la forma.*/
        get transformacion() {
            return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
        }
        /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
        get posicion() {
            let posicion = Vector.clonar(this._transformacion.posicion);
            return posicion;
        }
        /**Retorna el ángulo de rotación actual de la forma.*/
        get rotacion() {
            return this._transformacion.rotacion;
        }
        get escala() {
            return this._transformacion.escala;
        }
        /**Retorna el arreglo de vértices sin transformaciones.*/
        get vertices() {
            return Vector.clonarConjunto(this._vertices);
        }
        /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
        get verticesTransformados() {
            if (this._transformar) {
                this.transformarVertices();
            }
            return Vector.clonarConjunto(this._verticesTransformados);
            // let verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
            // return verticesTransformados;
        }
        /**Retorna un conjunto de vectores normales de cada arista del polígono.
         * El orden de las aristas es en senttipoo horario.
        */
        get normales() {
            let normales = [];
            for (let i = 0; i < this.verticesTransformados.length; i++) {
                if (i != this.verticesTransformados.length - 1) {
                    let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[i + 1]);
                    normales.push(normal);
                }
                else {
                    let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[0]);
                    normales.push(normal);
                }
            }
            return normales;
        }
        /**Retorna la distancia entre el centro del polígono y el punto más cercano de sus aristas.*/
        get apotema() {
            if (this.tipo == TipoFormas.circunferencia) {
                return this.radioTransformado;
            }
            return Math.cos(Math.PI / this.lados) * this.radio;
        }
        get color() {
            return this._color;
        }
        set tipo(nuevatipo) {
            this._tipo = nuevatipo;
        }
        set lados(numeroLados) {
            this._lados = numeroLados;
        }
        set radio(nuevoRadio) {
            this._radio = nuevoRadio;
        }
        set transformacion(transformacion) {
            this._transformar = true;
            this._transformacion = transformacion;
        }
        set posicion(nuevaPosicion) {
            this._transformar = true;
            this._transformacion.posicion = Vector.clonar(nuevaPosicion);
        }
        /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
        set rotacion(rotacion) {
            this._transformar = true;
            this._transformacion.rotacion = rotacion;
        }
        set escala(nuevaEscala) {
            this._transformar = true;
            this._transformacion.escala = nuevaEscala;
        }
        set vertices(vertices) {
            this._vertices = Vector.clonarConjunto(vertices);
        }
        set color(color) {
            this._color = color;
        }
        crearVertices() {
            if (this._lados == 0) {
                return [];
            }
            let theta = Geometria.DOS_PI / this._lados;
            let offset = theta * 0.5;
            let nVertices = [];
            for (let i = 0; i < this.lados; i++) {
                let angulo = offset + (i * theta);
                let xx = Math.cos(angulo) * this._radio;
                let yy = Math.sin(angulo) * this._radio;
                let vertice = Vector.crear(xx, yy);
                nVertices.push(vertice);
            }
            return nVertices;
        }
        //Agregar control de errores para índices mayores al número de vértices
        moverVertice(indice, punto) {
            this._vertices[indice] = Vector.crear(punto.x, punto.y);
        }
        //--
        static poligono(x, y, lados, radio) {
            let nuevoPoligono = new Forma();
            nuevoPoligono.lados = lados;
            nuevoPoligono.radio = radio;
            nuevoPoligono.vertices = nuevoPoligono.crearVertices();
            nuevoPoligono.tipo = TipoFormas.poligono;
            nuevoPoligono.iniciarTransformacion(x, y);
            return nuevoPoligono;
        }
        static circunferencia(x, y, radio) {
            let nuevaCircunferencia = new Forma();
            nuevaCircunferencia.radio = radio;
            let lados = 10 + Math.trunc(radio / 10);
            if (lados % 2 == 1) {
                lados++;
            }
            if (lados > 30) {
                lados = 30;
            }
            nuevaCircunferencia.lados = lados;
            nuevaCircunferencia.vertices = nuevaCircunferencia.crearVertices();
            nuevaCircunferencia.tipo = TipoFormas.circunferencia;
            nuevaCircunferencia.iniciarTransformacion(x, y);
            return nuevaCircunferencia;
        }
        static rectangulo(x, y, base, altura) {
            let rectangulo = new Forma();
            rectangulo.lados = 4;
            rectangulo.radio = Geometria.hipotenusa(base * 0.5, altura * 0.5);
            let ver1 = Vector.crear(base / 2, altura / 2);
            let ver2 = Vector.crear(-base / 2, altura / 2);
            let ver3 = Vector.crear(-base / 2, -altura / 2);
            let ver4 = Vector.crear(base / 2, -altura / 2);
            let rectVertices = [ver1, ver2, ver3, ver4];
            rectangulo.vertices = rectVertices;
            rectangulo.tipo = TipoFormas.poligono;
            rectangulo.iniciarTransformacion(x, y);
            return rectangulo;
        }
        /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
        static recta(puntoUno, puntoDos) {
            let linea = new Forma();
            linea.lados = 1;
            linea.radio = Geometria.distanciaEntrePuntos(puntoUno, puntoDos) / 2;
            let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
            let vertices = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];
            linea.vertices = vertices;
            linea.tipo = TipoFormas.linea;
            linea.iniciarTransformacion(centro.x, centro.y);
            return linea;
        }
        /**
         * Crea un conjunto de rectas a partir de un grupo de vértices.
         * Calcula el centro de los vértices, centra la forma en el origen y almacena
         * el centro en el registro de transformación.
         */
        static trazo(vertices) {
            let centro = Vector.crear(0, 0);
            let trazo = new Forma();
            let verticesTrazo = [];
            trazo.lados = vertices.length - 1;
            for (let vertice of vertices) {
                centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length));
            }
            for (let vertice of vertices) {
                verticesTrazo.push(Vector.resta(vertice, centro));
            }
            trazo.vertices = verticesTrazo;
            trazo.tipo = TipoFormas.linea;
            trazo.iniciarTransformacion(centro.x, centro.y);
            return trazo;
        }
        /**
         * Crea un polígono a partir de un grupo de vértices.
         * Calcula el centro de los vértices, centra la forma en el origen y almacena
         * el centro en el registro de transformación.
         */
        static poligonoSegunVertices(vertices) {
            let centro = Vector.crear(0, 0);
            let poligono = new Forma();
            let verticesPoligono = [];
            poligono.lados = vertices.length - 1;
            for (let vertice of vertices) {
                centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length));
            }
            for (let vertice of vertices) {
                verticesPoligono.push(Vector.resta(vertice, centro));
            }
            poligono.vertices = verticesPoligono;
            poligono.tipo = TipoFormas.poligono;
            poligono.iniciarTransformacion(centro.x, centro.y);
            return poligono;
        }
        iniciarTransformacion(x, y) {
            this._transformacion.posicion = Vector.crear(x, y);
            // this.transformacion = new Transformacion(x, y);
        }
        transformarVertices() {
            this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
            this._transformar = false;
        }
        /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
        rotar(angulo) {
            this._transformacion.rotacion += angulo;
        }
        /**Suma el vector ingresado al vector de posición de la figura.*/
        desplazar(vector) {
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
        }
        rotarSegunOrigen(angulo) {
            this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
        }
        rotarSegunPunto(punto, angulo) {
            let vectorAcomodador = Vector.crear(punto.x, punto.y);
            this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
            this.rotarSegunOrigen(angulo);
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
        }
        trazar(dibujante) {
            dibujante.trazar(this);
        }
        rellenar(dibujante) {
            dibujante.rellenar(this);
        }
    }

    /**
            =============================================
                     * MÓDULO DE CUERPOS *
            =============================================
            Trabaja usando objetos de tipo Forma.

            Crea cuerpos geométricos con masa y densidad.

            Contiene métodos para mover según velocidad y aceleración.

     */
    //TAREAS
    //Una propiedad que defina si es necesario actualizar la posición y la rotación.
    //Un solo método para aplicar transformar y actualizar transformaciones
    //Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
    /**MÓDULO DE CUERPOS
     * Trabaja usando objetos de tipo Forma.
     */
    class Cuerpo extends Forma {
        _velocidad = Vector.cero();
        _aceleracion = Vector.cero();
        _rotarSegunVelocidad = false;
        _fijo = false;
        _masa = 1;
        _densidad = 1;
        constructor() {
            super();
        }
        get fijo() {
            return this._fijo;
        }
        get masa() {
            return this._masa;
        }
        get densidad() {
            return this._densidad;
        }
        get velocidad() {
            return Vector.clonar(this._velocidad);
        }
        get aceleracion() {
            return Vector.clonar(this._aceleracion);
        }
        get verticesTransformados() {
            if (this._rotarSegunVelocidad == true) {
                this._transformacion.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            }
            let verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
            return verticesTransformados;
        }
        set velocidad(velocidad) {
            this._velocidad = Vector.clonar(velocidad);
        }
        set aceleracion(aceleracion) {
            this._aceleracion = Vector.clonar(aceleracion);
        }
        set masa(masa) {
            this._masa = masa;
        }
        set densidad(densidad) {
            this._densidad = densidad;
        }
        set fijo(fijo) {
            this._fijo = fijo;
        }
        set rotarSegunVelocidad(opcion) {
            this._rotarSegunVelocidad = opcion;
        }
        trazarVelocidad(dibujante) {
            let vectorVelocidad = Vector.clonar(this._velocidad);
            vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
            vectorVelocidad.origen = this._transformacion.posicion;
            dibujante.trazarVector(vectorVelocidad);
        }
        static cuerpoSegunForma(forma) {
            let cuerpo = new Cuerpo();
            cuerpo.vertices = forma.vertices;
            cuerpo.transformacion = forma.transformacion;
            cuerpo.lados = forma.lados;
            cuerpo.radio = forma.radio;
            cuerpo.tipo = forma.tipo;
            return cuerpo;
        }
        /**Retorna un cuerpo geométrico regular.
         * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
        static poligono(x, y, lados, radio, masa = 1, densidad = 1) {
            let poliForma = super.poligono(x, y, lados, radio);
            let poligono = Cuerpo.cuerpoSegunForma(poliForma);
            poligono.masa = masa;
            poligono.densidad = densidad;
            poligono.fijo = false;
            return poligono;
        }
        /**Retorna un cuerpo geométrico regular.
         * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
        static poligonoSegunVertices(vertices, masa = 1, densidad = 1) {
            let poliForma = super.poligonoSegunVertices(vertices);
            let poligono = Cuerpo.cuerpoSegunForma(poliForma);
            poligono.masa = masa;
            poligono.densidad = densidad;
            poligono.fijo = false;
            return poligono;
        }
        /**Retorna un cuerpo rectangular.*/
        static rectangulo(x, y, base, altura, masa = 1, densidad = 1) {
            let rectForma = super.rectangulo(x, y, base, altura);
            let rectangulo = Cuerpo.cuerpoSegunForma(rectForma);
            rectangulo.masa = masa;
            rectangulo.densidad = densidad;
            rectangulo.fijo = false;
            return rectangulo;
        }
        /**Retorna un cuerpo con forma de circunferencia.*/
        static circunferencia(x, y, radio, masa = 1, densidad = 1) {
            let circuloForma = super.circunferencia(x, y, radio);
            let circunferencia = Cuerpo.cuerpoSegunForma(circuloForma);
            circunferencia.masa = masa;
            circunferencia.densidad = densidad;
            circunferencia.fijo = false;
            return circunferencia;
        }
        /**Suma la velocidad y la aceleración a la posición.*/
        mover() {
            this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
        }
    }

    class Restriccion {
        static limitarVelocidad(cuerpo, limite) {
            let magnitudVel = cuerpo.velocidad.magnitud;
            if (magnitudVel > limite) {
                let velNormalizado = Vector.normalizar(cuerpo.velocidad);
                return Vector.escalar(velNormalizado, limite);
            }
            return cuerpo.velocidad;
        }
        /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud
         * de la velocidad no supere el límite ingresado.*/
        static limitarAceleracionSegunVelocidad(cuerpo, limite) {
            let magnitudVelocidad = cuerpo.velocidad.magnitud;
            let magnitudAceleracion = cuerpo.aceleracion.magnitud;
            if (magnitudAceleracion != 0 && magnitudVelocidad != 0) {
                if (magnitudVelocidad + magnitudAceleracion > limite) {
                    let razonAceleracion = magnitudAceleracion / (magnitudAceleracion + magnitudVelocidad);
                    let aceleracionNormalizada = Vector.normalizar(cuerpo.aceleracion);
                    let aceleracionEscalada = Vector.escalar(aceleracionNormalizada, razonAceleracion * limite);
                    return aceleracionEscalada;
                }
            }
            return cuerpo.aceleracion;
        }
    }

    //Módulo de cálculos físicos
    //Considerar: fricción, gravedad, resortes, torques.
    class Fuerza {
        /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un cuerpo atractor.
         * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static atraer(cuerpo, atractor, magnitudAceleracion) {
            let vectorAtractor = Vector.segunPuntos(cuerpo.posicion, atractor.posicion);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudAceleracion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un vector atractor.
         * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static atraerAVector(cuerpo, atractor, magnitudAceleracion) {
            let vectorAtractor = Vector.segunPuntos(cuerpo.posicion, atractor);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudAceleracion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un cuerpo repulsor.
        * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static repeler(cuerpo, repulsor, magnitudAceleracion) {
            let vectorAtractor = Vector.segunPuntos(repulsor.posicion, cuerpo.posicion);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudAceleracion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un vector repulsor.
        * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
       */
        static repelerDeVector(cuerpo, repulsor, magnitudAceleracion) {
            let vectorRepulsor = Vector.segunPuntos(repulsor, cuerpo.posicion);
            vectorRepulsor = Vector.normalizar(vectorRepulsor);
            vectorRepulsor = Vector.escalar(vectorRepulsor, magnitudAceleracion);
            return vectorRepulsor;
        }
    }

    //POR INCORPORAR:
    //  Throw de errores para valores incompatibles
    //  Opacidad, letras
    class Dibujante {
        _color;
        _colorFondo;
        _colorTexto;
        _grosorTrazo;
        _grosorVector;
        _opacidad;
        _colorVectores;
        _context;
        constructor(context) {
            this._context = context;
            this._color = "black";
            this._colorFondo = "white";
            this._colorTexto = "white";
            this._grosorTrazo = 1;
            this._opacidad = 1;
            this._colorVectores = "red";
            this._grosorVector = 1;
        }
        get color() {
            return this._color;
        }
        get colorFondo() {
            return this._colorFondo;
        }
        get colorTexto() {
            return this._colorTexto;
        }
        get colorVectores() {
            return this._colorVectores;
        }
        get grosorTrazo() {
            return this._grosorTrazo;
        }
        get opacidad() {
            return this._opacidad;
        }
        set color(color) {
            this._color = color;
        }
        set colorFondo(color) {
            this._colorFondo = color;
        }
        set colorTexto(color) {
            this._colorTexto = color;
        }
        set colorVectores(color) {
            this._colorVectores = color;
        }
        set grosorTrazo(grosor) {
            this._grosorTrazo = grosor;
        }
        set opacidad(opacidad) {
            this._opacidad = opacidad;
        }
        set grosorVector(grosor) {
            this._grosorVector = grosor;
        }
        /**
         * Retorna un string con el color en formato HSL.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes.
         */
        static colorHSL(hue, saturation, lightness) {
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
        /**
         * Retorna un string con el color en formato HSLA.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes, y (alpha)
         * valores entre 0 y 1.
         */
        static colorHSLA(hue, saturation, lightness, alpha) {
            return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        }
        /**
         * Retorna un string con el color en formato RGB.
         * (red), (green) y (blue) reciben valores entre 0 y 255.
         */
        static colorRGB(red, green, blue) {
            return `rgb(${red}, ${green}, ${blue})`;
        }
        /**
         * Retorna un string con el color en formato RGBA.
         * (red), (green) y (blue) reciben valores entre 0 y 255,
         * y (alpha) valores entre 0 y 1.
         */
        static colorRGBA(red, green, blue, alpha) {
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        }
        /**Traza en el canvas la forma ingresada como argumento.*/
        trazar(forma) {
            if (forma.tipo == TipoFormas.circunferencia) {
                this.pathCircunferencia(forma);
                this._context.strokeStyle = forma.color;
            }
            if (forma.tipo == TipoFormas.poligono) {
                this.pathPoligono(forma);
                this._context.strokeStyle = forma.color;
            }
            if (forma.tipo == TipoFormas.linea) {
                this.pathLinea(forma);
                this._context.strokeStyle = forma.color;
            }
            // this._context.strokeStyle = this._color;
            if (forma.tipo == TipoFormas.vector) {
                this.pathLinea(forma);
                this._context.strokeStyle = this._colorVectores;
            }
            this._context.lineWidth = this._grosorTrazo;
            this._context.globalAlpha = this._opacidad;
            this._context.stroke();
            this._context.strokeStyle = this._color;
        }
        /**Rellena en el canvas la forma ingresada como argumento.*/
        rellenar(forma) {
            if (forma.tipo == TipoFormas.circunferencia) {
                this.pathCircunferencia(forma);
                this._context.fillStyle = forma.color;
            }
            if (forma.tipo == TipoFormas.poligono) {
                this.pathPoligono(forma);
                this._context.fillStyle = forma.color;
            }
            if (forma.tipo == TipoFormas.linea) {
                this.pathPoligono(forma);
                this._context.fillStyle = forma.color;
            }
            // this._context.fillStyle = this._color;
            this._context.globalAlpha = this._opacidad;
            this._context.fill();
        }
        /** Traza en el canvas el vector ingresado como argumento.
         * Usa como color el atributo colorVectores.
         */
        trazarVector(vector) {
            let origen = vector.origen;
            let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
            this._context.beginPath();
            this._context.moveTo(origen.x, origen.y);
            this._context.lineTo(extremo.x, extremo.y);
            this._context.lineWidth = this._grosorVector;
            this._context.globalAlpha = this._opacidad;
            this._context.strokeStyle = this._colorVectores;
            this._context.stroke();
        }
        /**Rellena un texto en el canvas según los argumentos ingresados.
         * Recibe tamaño en pixeles, grosor en un rango de 100 a 900 (como el font-weight de CSS), alineacion como instrucción de
         * CSS de text-align ("center", "left", "right") y fuente como font-family.
         */
        escribir(texto, posicionX, posicionY, tamano, grosor = 500, alineacion = "center", fuente = "calibri") {
            this._context.textAlign = alineacion;
            this._context.font = `${grosor} ${tamano}px ${fuente}`;
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._colorTexto;
            this._context.fillText(texto, posicionX, posicionY);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
        */
        pathCircunferencia(forma) {
            this._context.beginPath();
            this._context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.
        */
        pathPoligono(forma) {
            this._context.beginPath();
            this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
            for (let vertice of forma.verticesTransformados) {
                this._context.lineTo(vertice.x, vertice.y);
            }
            this._context.closePath();
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.
        */
        pathLinea(forma) {
            this._context.beginPath();
            this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
            for (let vertice of forma.verticesTransformados) {
                this._context.lineTo(vertice.x, vertice.y);
            }
        }
    }

    class Renderizado extends Dibujante {
        _canvas;
        constructor(canvas) {
            super(canvas.getContext("2d"));
            this._canvas = canvas;
        }
        trazarFormas(formas) {
            for (let forma of formas) {
                forma.trazar(this);
            }
        }
        rellenarFormas(formas) {
            for (let forma of formas) {
                forma.rellenar(this);
            }
        }
        /**Borra el contenido del canvas.
         * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
         */
        limpiarCanvas(opacidad) {
            if (opacidad) {
                this._context.globalAlpha = opacidad;
                this._context.fillStyle = this._colorFondo;
                this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                this._context.globalAlpha = this._opacidad;
                this._context.fillStyle = this._color;
            }
            else {
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            }
        }
        trazarNormales(forma) {
            let saltoColor = 360 / forma.normales.length;
            let color = 0;
            forma.normales.forEach((normal) => {
                // let normalTrazable: Vector = Vector.escalar(Vector.normalizar(normal), forma.radioTransformado);
                let normalTrazable = normal;
                this.colorVectores = Renderizado.colorHSL(color, 100, 50);
                this.colorTexto = Renderizado.colorHSL(color, 100, 50);
                normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
                this.trazarVector(normalTrazable);
                color += saltoColor;
            });
        }
    }

    /**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
    const CANVAS = document.getElementById("canvas");
    CANVAS.width = window.innerWidth - 40;
    CANVAS.height = window.innerHeight - 40;
    // CANVAS.width = 1150;
    // CANVAS.height = 680;
    //CONSTANTES
    const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
    const RADIOFORMAGENERADORA = CANVAS.width < CANVAS.height ? CANVAS.width / 4 : CANVAS.height / 4;
    const NUMEROBOIDS = 200;
    const ESCALA = 1.5;
    const VELMAXIMA = 2;
    const ROTARSEGUNVELOCIDAD = true;
    const DISTANCIAREPELER = 20;
    const FUERZAREPELER = 1.5;
    const DISTANCIACOORDINAR = 40;
    const FACTORCOORDINACION = 0.5;
    const COLORBOID = Renderizado.colorHSL(50, 100, 100);
    const COLORFONDO = Renderizado.colorHSL(220, 100, 0);
    const ATRACCIONMOUSE = 0.05;
    ////////////////
    let mousePresente = false;
    let vectorMouse = Vector.cero();
    CANVAS.style.backgroundColor = COLORFONDO;
    window.addEventListener("load", () => {
        let dibu = new Renderizado(CANVAS);
        dibu.colorFondo = COLORFONDO;
        /**Forma generadora de posiciones.*/
        let formaGeneradora = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROBOIDS, RADIOFORMAGENERADORA);
        /**Generador de círculos.*/
        let boids = [];
        let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)];
        for (let i = 0; i < NUMEROBOIDS; i++) {
            let boid = Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
            let velocidadInicial = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
            boid.vertices = verticesboids;
            boid.posicion = formaGeneradora.verticesTransformados[i];
            boid.velocidad = velocidadInicial;
            boid.escala = ESCALA;
            boid.rotarSegunVelocidad = ROTARSEGUNVELOCIDAD;
            boid.color = COLORBOID;
            boids.push(boid);
        }
        /**Límites infinitos.*/
        function envolverBorde(vector) {
            let x = vector.x;
            let y = vector.y;
            if (x > CANVAS.width) {
                x -= CANVAS.width;
            }
            if (x < 0) {
                x += CANVAS.width;
            }
            if (y > CANVAS.height) {
                y -= CANVAS.height;
            }
            if (y < 0) {
                y += CANVAS.height;
            }
            return Vector.crear(x, y);
        }
        //tiempoProceso();
        function animar() {
            dibu.limpiarCanvas();
            for (let i = 0; i < boids.length - 1; i++) {
                for (let j = i + 1; j < boids.length; j++) {
                    let distancia = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                    if (distancia < DISTANCIACOORDINAR) {
                        if (distancia < DISTANCIAREPELER) {
                            boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                            boids[j].aceleracion = Vector.invertir(boids[i].aceleracion);
                        }
                        let velI = boids[i].velocidad;
                        boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)));
                        boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)));
                    }
                    if (mousePresente) {
                        let distanciaMouse = Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                        boids[i].aceleracion = Vector.suma(boids[i].aceleracion, Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                        if (j == boids.length - 1) {
                            distanciaMouse = Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                            boids[j].aceleracion = Vector.suma(boids[j].aceleracion, Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                        }
                    }
                }
            }
            /**Dibujar boids.*/
            for (let boid of boids) {
                boid.posicion = envolverBorde(boid.posicion);
                boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
                boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
                boid.mover();
                boid.trazar(dibu);
            }
            requestAnimationFrame(animar);
        }
        animar();
    });
    {
        CANVAS.addEventListener("mouseenter", (event) => {
            if (event) {
                mousePresente = true;
            }
        });
        CANVAS.addEventListener("mouseleave", (event) => {
            if (event) {
                mousePresente = false;
            }
        });
        CANVAS.addEventListener("mousemove", (event) => {
            let mouseX = event.pageX - CANVAS.offsetLeft;
            let mouseY = event.pageY - CANVAS.offsetTop;
            vectorMouse = Vector.crear(mouseX, mouseY);
        });
    }

})();
