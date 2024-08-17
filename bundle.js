(function () {
    'use strict';

    /**
     * MÓDULO MATEMÁTICO EN ESPAÑOL
     *
     * Por agregar: floor, ceil, logaritmo, trigonometrías, exp, raizcuadrada, cuadrado, cubo, max, min, promedio.
     * POR CORREGIR: Reemplazar multiplicaciones por multiplicacion, y las sumas también.
     */
    class Matematica {
        //CONSTANTES
        /**Retorna el valor de PI usando quince decimales.*/
        static get PI() {
            return 3.141592653589793;
        }
        /**Retorna el doble del valor de PI usando quince decimales.*/
        static get DOS_PI() {
            return 6.283185307179586;
        }
        /**Retorna la mitad del valor de PI usando quince decimales.*/
        static get PI_MEDIO() {
            return 1.570796326794896;
        }
        /**Retorna el valor de PHI (número áureo) usando quince decimales*/
        static get PHI() {
            return 1.618033988749895;
        }
        /**Retorna el valor del número e usando quince decimales.*/
        static get e() {
            return 2.718281828459045;
        }
        /**Retorna la parte entera de cualquier número real.
         *
         *ANOTACIÓN:
         *Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, javascript
         *lo aproximará automáticamente. Pueden ocurrir cosas raras con más de 15 decimales.
        */
        static parteEntera(numero) {
            let numString = numero.toPrecision(15);
            numString = numString.split('.')[0];
            return parseFloat(numString);
            //Checkeado
            //ANOTACIÓN
            //Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, typescript
            //lo aproximará automáticamente.
        }
        /**Retorna la parte decimal de cualquier número real.*/
        static parteDecimal(numero) {
            let num = numero.toPrecision(15);
            if (num.split(".")[1]) {
                let decimales = parseFloat("0." + num.split(".")[1]);
                if (numero < 0) {
                    return -decimales;
                }
                return decimales;
            }
            return 0;
            //Checkeado
        }
        /**Retorna un número aleatorio dentro del rango ingresado.*/
        static aleatorio(min, max) {
            let aleatorio = 0;
            for (let i = 0; i < 111; i++) {
                let unidades = 7538694219;
                let fecha = (new Date()).getMilliseconds();
                fecha = (fecha % 10) + (fecha % 100 - (fecha % 10)) / 10 + (fecha % 1000 - (fecha % 100) - (fecha % 10)) / 100;
                let numero = fecha;
                numero = Matematica.multiplicacion(numero, Matematica.PI);
                let selector = Matematica.suma((fecha % 10), 1);
                unidades = Matematica.division(unidades, (10 ** (selector)));
                aleatorio = Matematica.suma(aleatorio, Matematica.multiplicacion(numero, unidades));
                aleatorio = aleatorio % 1;
            }
            let rango;
            if (min < 0) {
                rango = Matematica.suma(max, -min);
            }
            else if (min > 0) {
                rango = Matematica.suma(max, -min);
            }
            else if (min == 0) {
                rango = max;
            }
            aleatorio = Matematica.multiplicacion(aleatorio, rango);
            return Matematica.suma(aleatorio, min);
        }
        /**Retorna un número entero aleatorio dentro del rango ingresado.*/
        static aleatorioEntero(min, max) {
            let aleatorio = 0;
            for (let i = 0; i < 111; i++) {
                let unidades = 7538694219;
                let fecha = (new Date()).getMilliseconds();
                fecha = (fecha % 10) + (fecha % 100 - (fecha % 10)) / 10 + (fecha % 1000 - (fecha % 100) - (fecha % 10)) / 100;
                let numero = fecha;
                numero = Matematica.multiplicacion(numero, Matematica.PI);
                let selector = Matematica.suma((fecha % 10), 1);
                unidades = Matematica.division(unidades, (10 ** (selector)));
                aleatorio = Matematica.suma(aleatorio, Matematica.multiplicacion(numero, unidades));
                aleatorio = aleatorio % 1;
            }
            let rango;
            if (min < 0) {
                rango = Matematica.suma(max + 1, -min);
            }
            else if (min > 0) {
                rango = Matematica.suma(max + 1, -min);
            }
            else if (min == 0) {
                rango = max + 2;
            }
            aleatorio = Matematica.multiplicacion(aleatorio, rango);
            aleatorio = Matematica.suma(aleatorio, -(aleatorio % 1));
            aleatorio = Matematica.suma(aleatorio, min);
            if (Number.isInteger(aleatorio)) {
                if (aleatorio > max) {
                    aleatorio -= 1;
                }
                return aleatorio;
            }
            if (aleatorio < min) {
                aleatorio += 1;
            }
            if (aleatorio > max) {
                aleatorio -= 1;
            }
            return Matematica.parteEntera(Matematica.suma(aleatorio, min));
        }
        /**Retorna 1 si el número es positivo, -1 si es negativo y 0 cuando el número es 0.*/
        static signo(numero) {
            if (numero == 0) {
                return 0;
            }
            return numero > 0 ? 1 : -1;
        }
        /**Retorna la copia de un número con la cantidad de decimales especificada.
         * Solo acepta números entre 0 y 100.
        */
        static truncar(numero, decimales) {
            if (decimales < 0) {
                throw new Error("El método .truncar solo acepta números entre 0 y 100");
            }
            // let dec: number = Matematica.parteEntera(decimales);
            let dec = Matematica.suma(decimales, -Matematica.parteDecimal(decimales));
            let numString = numero.toFixed(dec + 1);
            let num = parseFloat(numString.slice(0, -1));
            return num;
        }
        /**Retorna un número truncado según la cantidad de decimales especificada, con la última cifra redondeada.*/
        static redondear(numero, decimales) {
            let num = numero.toFixed(decimales + 1);
            if (num.slice(-1) == "5") {
                num += "6";
                num = parseFloat(num).toFixed(decimales + 1);
            }
            num = parseFloat(num).toFixed(decimales);
            return parseFloat(num);
        }
        /**Retorna el valor absoluto de cualquier número real.*/
        static absoluto(numero) {
            if (numero < 0) {
                return -numero;
            }
            return numero;
        }
        /**Retorna true o false dependiendo de si los números ingresados son iguales o no.
         * Permite definir el nivel de tolerancia de comparación. Si no se define, se usa por
         * defecto el rango de Number.EPSILON (2.220446049250313e-16)
        */
        static comparar(a, b, tolerancia = Number.EPSILON) {
            return (Matematica.absoluto(Matematica.suma(a, -b)) < tolerancia);
        }
        /**Multiplica dos números. Evita varios comportamientos erráticos de javascript al multiplicar ciertos números,
         * como el caso típico 0.1 * 0.2 = 0.020000000000000004;
        */
        static multiplicacion(numero1, numero2) {
            if (numero1 == 0 || numero2 == 0) {
                return 0;
            }
            if (Number.isInteger(numero1) && Number.isInteger(numero2)) {
                return numero1 * numero2;
            }
            else if (Number.isInteger(numero2)) {
                let i = 1;
                while (!Number.isInteger(numero1 * (10 ** i)) && i <= 16) {
                    i++;
                }
                return ((numero1 * (10 ** i)) * numero2) / (10 ** i);
            }
            else if (Number.isInteger(numero1)) {
                let i = 1;
                while (!Number.isInteger(numero2 * (10 ** i)) && i <= 16) {
                    i++;
                }
                return ((numero2 * (10 ** i)) * numero1) / (10 ** i);
            }
            else {
                let i = 1;
                while (!Number.isInteger(numero1 * (10 ** i)) && i <= 16) {
                    i++;
                }
                let j = 1;
                while (!Number.isInteger(numero2 * (10 ** j)) && j <= 16) {
                    j++;
                }
                return ((numero1 * (10 ** i)) * (numero2 * (10 ** j))) / (10 ** (i + j));
            }
        }
        /**Divide dos números. Evita varios comportamientos erráticos de javascript al dividir ciertos números,
         * como el caso típico 0.02 / 0.1 = 0.19999999999999998;
        */
        static division(numero1, numero2) {
            if (numero1 == 0) {
                return 0;
            }
            else if (numero2 == 0) {
                throw new Error("El método .division no admite divisiones por cero");
            }
            if (Number.isInteger(numero1) && Number.isInteger(numero2)) {
                return numero1 / numero2;
            }
            else if (Number.isInteger(numero1)) {
                let i = 1;
                while (!Number.isInteger(numero2 * (10 ** i)) && i < 16) {
                    i++;
                }
                return (numero1 * (10 ** i)) / (numero2 * (10 ** i));
            }
            else if (Number.isInteger(numero2)) {
                let i = 1;
                numero1 *= 10;
                numero2 *= 10;
                while (!Number.isInteger(numero1) && i <= 16) {
                    i++;
                    numero1 *= 10;
                    numero2 *= 10;
                }
                return (numero1) / (numero2);
            }
            else {
                let i = 1;
                while (!Number.isInteger(numero1 * (10 ** i)) && i < 16) {
                    i++;
                }
                while (!Number.isInteger(numero2 * (10 ** i)) && i < 16) {
                    i++;
                }
                return (numero1 * (10 ** i)) / (numero2 * (10 ** i));
            }
        }
        /**Suma dos números. Evita comportamientos erráticos de javascript al sumar ciertos números,
         * como el caso típico 0.1 + 0.2 = 0.30000000000000004;
        */
        static suma(numero1, numero2) {
            if (Number.isInteger(numero1) && Number.isInteger(numero2)) {
                return numero1 + numero2;
            }
            else if (Number.isInteger(numero2)) {
                let i = 1;
                while (!Number.isInteger(numero1 * (10 ** i)) && i <= 16) {
                    i++;
                }
                return ((numero1 * (10 ** i)) + numero2 * (10 ** i)) / (10 ** i);
            }
            else if (Number.isInteger(numero1)) {
                let i = 1;
                while (!Number.isInteger(numero2 * (10 ** i)) && i <= 16) {
                    i++;
                }
                return ((numero1 * (10 ** i)) + numero2 * (10 ** i)) / (10 ** i);
            }
            else {
                let i = 1;
                while (!Number.isInteger(numero1 * (10 ** i)) && i < 16) {
                    i++;
                }
                while (!Number.isInteger(numero2 * (10 ** i)) && i < 16) {
                    i++;
                }
                return ((numero1 * (10 ** i)) + (numero2 * (10 ** i))) / (10 ** i);
            }
        }
        /**Retorna el resultado de elevar la base ingresada al exponente ingresado.*/
        static potencia(base, exponente) {
            return base ** exponente;
        }
        /**Retorna la raíz enésima de un número. Solo trabaja con números reales.*/
        static raiz(radicando, indice) {
            if (radicando < 0 && indice % 2 == 0) {
                throw new Error("El método .raiz solo trabaja con números reales. No responde a la raíz par de un número negativo.");
            }
            if (indice == 0) {
                throw new Error("El método .raiz no contempla el uso de un índice igual a cero en una raíz.");
            }
            if (radicando == 0) {
                return 0;
            }
            return radicando ** Matematica.division(1, indice);
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
            // return Matematica.raiz(Matematica.suma(Matematica.potencia(vector.x, 2), Matematica.potencia(vector.y, 2)), 2)
            return (vector.x ** 2 + vector.y ** 2) ** (1 / 2);
        }
        //REVISARRRRRRRRRRRRRRRR
        static angulo(vector) {
            if (vector.x == 0 && vector.y == 0) {
                return 0;
            }
            if (vector.x > 0 && vector.y >= 0) {
                return Math.acos(vector.x / Vector.magnitud(vector));
            }
            else if (vector.x <= 0 && vector.y >= 0) {
                return Math.acos(vector.x / Vector.magnitud(vector));
            }
            else if (vector.x >= 0 && vector.y < 0) {
                return Matematica.DOS_PI + Math.asin(vector.y / Vector.magnitud(vector));
            }
            else if (vector.x <= 0 && vector.y < 0) {
                return Matematica.PI - Math.asin(vector.y / Vector.magnitud(vector));
            }
            else {
                return 0;
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
            // let vectorSuma: Vector = new Vector(Matematica.suma(vectorUno.x, vectorDos.x), Matematica.suma(vectorUno.y, vectorDos.y));
            return vectorSuma;
        }
        static resta(vectorUno, vectorDos) {
            let vectorResta = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
            // let vectorResta: Vector = new Vector(Matematica.suma(vectorUno.x, -vectorDos.x), Matematica.suma(vectorUno.y, -vectorDos.y));
            return vectorResta;
        }
        static escalar(vector, escalar) {
            let vectorEscalado = new Vector((vector.x * escalar), (vector.y * escalar));
            // let vectorEscalado: Vector = new Vector(Matematica.multiplicacion(vector.x, escalar), Matematica.multiplicacion(vector.y, escalar));
            return vectorEscalado;
        }
        static normalizar(vector) {
            // let magnitud: number = Matematica.raiz(vector.x**2 + vector.y**2, 2);
            // return new Vector(vector.x / magnitud, vector.y / magnitud);
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
            return Vector.rotar(vectorSegmento, -Matematica.PI_MEDIO);
        }
        static punto(vectorUno, vectorDos) {
            return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y);
            // let productoX: number = Matematica.multiplicacion(vectorUno.x, vectorDos.x)
            // let productoY: number = Matematica.multiplicacion(vectorUno.y, vectorDos.y)
            // let producto: number = Matematica.suma(productoX, productoY);
            // return producto;
        }
        static cruz(vectorUno, vectorDos) {
            return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x;
            // return Matematica.multiplicacion(vectorUno.x, vectorDos.y) - Matematica.multiplicacion(vectorUno.y, vectorDos.x)
        }
        static proyeccion(vectorUno, vectorEje) {
            return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
            // return Matematica.division(Vector.punto(vectorUno, vectorEje), Vector.magnitud(vectorEje));
        }
        static anguloVectores(vectorUno, vectorDos) {
            let punto = Vector.punto(vectorUno, vectorDos);
            let magnitudes = vectorUno.magnitud * vectorDos.magnitud;
            // let magnitudes: number = Matematica.multiplicacion(vectorUno.magnitud, vectorDos.magnitud);
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
            /**Las dos líneas siguientes demoran 4 veces más que las dos líneas anteriores.*/
            // let x: number = Matematica.suma(Matematica.multiplicacion(Math.cos(angulo), vector.x), - Matematica.multiplicacion(Math.sin(angulo), vector.y));
            // let y: number = Matematica.suma(Matematica.multiplicacion(Math.sin(angulo), vector.x), Matematica.multiplicacion(Math.cos(angulo), vector.y));
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
         * sobre un arreglo de vectores de entrada.*/
        transformarConjuntoVectores(vectores) {
            let vectoresTransformados = Vector.clonarConjunto(vectores);
            vectoresTransformados = this.escalarVectores(vectoresTransformados);
            vectoresTransformados = this.rotarVectores(vectoresTransformados);
            vectoresTransformados = this.desplazarVectores(vectoresTransformados);
            return vectoresTransformados;
        }
        /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        escalarVectores(vectores) {
            let vectoresEscalados = [];
            for (let vector of vectores) {
                let vectorEscalado = Vector.escalar(vector, this.escala);
                vectoresEscalados.push(vectorEscalado);
            }
            return vectoresEscalados;
        }
        /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        desplazarVectores(vectores) {
            let vectoresDesplazados = [];
            for (let vector of vectores) {
                let x = vector.x + this.posicion.x;
                let y = vector.y + this.posicion.y;
                vectoresDesplazados.push(Vector.crear(x, y));
            }
            return vectoresDesplazados;
        }
        /**Rota cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        rotarVectores(vectores) {
            let vectoresRotados = [];
            for (let vector of vectores) {
                let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
                let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
                vectoresRotados.push(Vector.crear(x, y));
            }
            return vectoresRotados;
        }
    }

    class Geometria {
        //GRADOS  
        /**Transforma grados sexagesimales a radianes.*/
        static gradoARadian(grado) {
            // return Matematica.multiplicacion(Matematica.division(grado, 180), Matematica.PI);
            return (grado / 180) * Matematica.PI;
        }
        /**Transfoma radianes a grados sexagesimales.*/
        static radianAGrado(rad) {
            // return Matematica.multiplicacion(Matematica.division(rad, Matematica.PI), 180);
            return (rad / Matematica.PI) * 180;
        }
        //PITAGÓRICA
        /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
        static hipotenusa(cateto1, cateto2) {
            // let hipotenusa: number = Matematica.raiz(Matematica.suma(cateto1**2, cateto2**2), 2);
            // return hipotenusa;
            return (cateto1 ** 2 + cateto2 ** 2) ** (1 / 2);
        }
        /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
        static cateto(hipotenusa, cateto) {
            // let cateto2: number = Matematica.raiz(Matematica.suma(hipotenusa**2, -(cateto**2)), 2);
            // return cateto2;
            return (hipotenusa ** 2 - cateto ** 2) ** (1 / 2);
        }
        //COORDENADAS
        /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
        static distanciaEntrePuntos(puntoUno, puntoDos) {
            // let distanciaX: number = Matematica.suma(puntoDos.x, -puntoUno.x)
            // let distanciaY: number = Matematica.suma(puntoDos.y, -puntoUno.y)
            // let distancia = Matematica.hipotenusa(distanciaX, distanciaY);
            // return distancia;
            return this.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        }
        /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
        static puntoMedio(puntoUno, puntoDos) {
            // let medioX: number = Matematica.suma(Matematica.division(puntoUno.x, 2), Matematica.division(puntoDos.x, 2));
            // let medioY: number = Matematica.suma(Matematica.division(puntoUno.y, 2), Matematica.division(puntoDos.y, 2));
            // let puntoMedio: Punto = {x: medioX, y: medioY};
            // return puntoMedio;
            return { x: (puntoUno.x / 2 + puntoDos.x / 2), y: (puntoUno.y / 2, +puntoDos.y / 2) };
        }
    }

    //POR INTEGRAR
    // Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
    // Función de escalar, reflejar
    // SUMAR FORMAS
    class Forma {
        _id;
        _centro;
        _lados;
        _radio;
        _vertices;
        _verticesTransformados;
        _transformacion;
        _radioTransformado;
        _color;
        constructor(x, y, lados = 0, radio = 0) {
            this._id = "";
            this._centro = Vector.cero();
            this._lados = lados;
            this._radio = radio;
            this._vertices = this.crearVertices();
            this._verticesTransformados = [];
            this._transformacion = new Transformacion(x, y);
            this.aplicarTransformacion();
            this._radioTransformado = this._radio * this._transformacion.escala;
            this._color = "blue";
        }
        /**Retorna un string que indica el tipo de forma geométrica.
         * "poligono", "circunferencia", "linea"
        */
        get id() {
            return this._id;
        }
        /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
        get posicion() {
            let posicion = Vector.clonar(this._transformacion.posicion);
            return posicion;
        }
        /**Retorna el número de lados de la figura.*/
        get lados() {
            return this._lados;
        }
        /**Retorna el valor del radio con la transformación de escala aplicada.*/
        get radio() {
            this._radioTransformado = this._radio * this._transformacion.escala;
            return this._radioTransformado;
        }
        /**Retorna el arreglo de vértices sin transformaciones.*/
        get vertices() {
            return Vector.clonarConjunto(this._vertices);
        }
        /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
        get verticesTransformados() {
            return Vector.clonarConjunto(this._verticesTransformados);
        }
        /**Retorna una copia de la transformación de la forma.*/
        get transformacion() {
            return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
        }
        /**Retorna el ángulo de rotación actual de la forma.*/
        get rotacion() {
            return this._transformacion.rotacion;
        }
        /**Retorna un conjunto de vectores normales de cada arista del polígono.
         * El orden de las aristas es en sentido horario.
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
        get color() {
            return this._color;
        }
        set id(nuevaId) {
            this._id = nuevaId;
        }
        set posicion(nuevaPosicion) {
            this._transformacion.posicion = Vector.clonar(nuevaPosicion);
        }
        set escala(nuevaEscala) {
            this._transformacion.escala = nuevaEscala;
        }
        /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
        set rotacion(rotacion) {
            this._transformacion.rotacion = rotacion;
        }
        set lados(numeroLados) {
            this._lados = numeroLados;
        }
        set radio(nuevoRadio) {
            this._radio = nuevoRadio;
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
            let theta = Matematica.DOS_PI / this._lados;
            let offset = theta * 0.5;
            let nVertices = [];
            for (let i = 0; i < this._lados; i++) {
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
        static poligono(x, y, lados, radio) {
            let nuevoPoligono = new Forma(x, y, lados, radio);
            nuevoPoligono.id = "poligono";
            return nuevoPoligono;
        }
        static circunferencia(x, y, radio) {
            let lados = 10 + Matematica.truncar(radio / 10, 0);
            if (lados % 2 == 1) {
                lados++;
            }
            if (lados > 30) {
                lados = 30;
            }
            let nuevaCircunferencia = new Forma(x, y, lados, radio);
            nuevaCircunferencia.id = "circunferencia";
            return nuevaCircunferencia;
        }
        static rectangulo(x, y, base, altura) {
            let rectangulo = new Forma(x, y, 4, Geometria.hipotenusa(base * 0.5, altura * 0.5));
            rectangulo.id = "poligono";
            let ver1 = Vector.crear(base / 2, altura / 2);
            let ver2 = Vector.crear(-base / 2, altura / 2);
            let ver3 = Vector.crear(-base / 2, -altura / 2);
            let ver4 = Vector.crear(base / 2, -altura / 2);
            let rectVertices = [ver1, ver2, ver3, ver4];
            rectangulo.vertices = rectVertices;
            rectangulo.aplicarTransformacion();
            return rectangulo;
        }
        /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
        static recta(puntoUno, puntoDos) {
            let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
            let vertices = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];
            let linea = new Forma(centro.x, centro.y, 1);
            linea.vertices = vertices;
            linea.aplicarTransformacion();
            linea.id = "linea";
            return linea;
        }
        /**
         * Crea un conjunto de rectas a partir de un grupo de vértices.
         * Calcula el centro de los vértices, centra la forma en el origen y almacena
         * el centro en el registro de transformación.
         */
        static trazo(vertices) {
            let centro = { x: 0, y: 0 };
            for (let vertice of vertices) {
                centro.x += vertice.x / vertices.length;
                centro.y += vertice.y / vertices.length;
            }
            let posicion = Vector.crear(centro.x, centro.y);
            let trazo = new Forma(centro.x, centro.y);
            for (let vertice of vertices) {
                trazo.vertices.push(Vector.resta(vertice, posicion));
            }
            trazo.aplicarTransformacion();
            trazo.id = "linea";
            trazo.lados = vertices.length - 1;
            return trazo;
        }
        aplicarTransformacion() {
            this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        }
        /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
        rotar(angulo) {
            this._transformacion.rotacion += angulo;
            this.aplicarTransformacion();
        }
        /**Suma el vector ingresado al vector de posición de la figura.*/
        desplazar(vector) {
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
            this.aplicarTransformacion();
        }
        rotarSegunOrigen(angulo) {
            this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
            this.aplicarTransformacion();
        }
        rotarSegunPunto(punto, angulo) {
            let vectorAcomodador = Vector.crear(punto.x, punto.y);
            this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
            this.rotarSegunOrigen(angulo);
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
            this.aplicarTransformacion();
        }
        escalar(escala) {
            this._transformacion.escala = escala;
            this.aplicarTransformacion();
        }
        trazar(dibujante) {
            dibujante.color = this._color;
            dibujante.trazar(this);
        }
        rellenar(dibujante) {
            dibujante.color = this._color;
            dibujante.rellenar(this);
        }
    }

    //POR INCORPORAR:
    //  Throw de errores para valores incompatibles
    //  Opacidad, letras
    class Dibujante {
        _color;
        _colorFondo;
        _grosorTrazo;
        _opacidad;
        _colorVectores;
        _context;
        constructor(context) {
            this._context = context;
            this._color = "black";
            this._colorFondo = "white";
            this._grosorTrazo = 1;
            this._opacidad = 1;
            this._colorVectores = "red";
        }
        get color() {
            return this._color;
        }
        get colorFondo() {
            return this._colorFondo;
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
        set colorVectores(color) {
            this._colorVectores = color;
        }
        set grosorTrazo(grosor) {
            this._grosorTrazo = grosor;
        }
        set opacidad(opacidad) {
            this._opacidad = opacidad;
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
        /**Borra el contenido del canvas.
         * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
         */
        limpiarCanvas(canvas, opacidad) {
            if (opacidad) {
                this._context.globalAlpha = opacidad;
                this._context.fillStyle = this._colorFondo;
                this._context.fillRect(0, 0, canvas.width, canvas.height);
                this._context.globalAlpha = this._opacidad;
                this._context.fillStyle = this._color;
            }
            else {
                this._context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        /**Traza en el canvas la forma ingresada como argumento.*/
        trazar(forma) {
            if (forma.id == "circunferencia") {
                this.pathCircunferencia(forma);
            }
            if (forma.id == "poligono") {
                this.pathPoligono(forma);
            }
            if (forma.id == "linea") {
                this.pathLinea(forma);
            }
            this._context.strokeStyle = this._color;
            if (forma.id == "vector") {
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
            if (forma.id == "circunferencia") {
                this.pathCircunferencia(forma);
            }
            if (forma.id == "poligono") {
                this.pathPoligono(forma);
            }
            if (forma.id == "linea") {
                this.pathPoligono(forma);
            }
            this._context.fillStyle = this._color;
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
            this._context.lineWidth = this._grosorTrazo;
            this._context.globalAlpha = this._opacidad;
            this._context.strokeStyle = this._colorVectores;
            this._context.stroke();
        }
        /**Rellena un texto en el canvas según los argumentos ingresados.
         * Recibe tamaño en pixeles, grosor en un rango de 100 a 900 (como el font-weight de CSS), fuente como font-family y alineacion como instrucción
         * de CSS de text-align ("center", "left", "right").
         */
        escribir(texto, posicionX, posocionY, tamano, grosor = 500, fuente = "calibri", alineacion = "center") {
            this._context.textAlign = alineacion;
            this._context.font = `${grosor} ${tamano}px ${fuente}`;
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._color;
            this._context.fillText(texto, posicionX, posocionY);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
        */
        pathCircunferencia(forma) {
            this._context.beginPath();
            this._context.arc(forma.posicion.x, forma.posicion.y, forma.radio, 0, Matematica.DOS_PI);
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
        _masa;
        _densidad;
        _velocidad;
        _aceleracion;
        _fijo;
        _rotarSegunVelocidad;
        constructor(x, y, lados = 0, radio = 0, masa = 1, densidad = 1, fijo = false) {
            super(x, y, lados, radio);
            this._masa = masa;
            this._densidad = densidad;
            this._velocidad = Vector.cero();
            this._velocidad.origen = this._transformacion.posicion;
            this._aceleracion = Vector.cero();
            this._fijo = fijo;
            this._rotarSegunVelocidad = false;
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
        set velocidad(velocidad) {
            this._velocidad = Vector.clonar(velocidad);
        }
        set aceleracion(aceleracion) {
            this._aceleracion = Vector.clonar(aceleracion);
        }
        set fijo(fijo) {
            this._fijo = fijo;
        }
        set escala(escala) {
            this.transformacion.escala = escala;
            super.escalar(escala);
        }
        set rotarSegunVelocidad(opcion) {
            this._rotarSegunVelocidad = opcion;
        }
        trazarVelocidad(dibujante) {
            let vectorVelocidad = Vector.clonar(this._velocidad);
            vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
            vectorVelocidad.origen = this._transformacion.posicion;
            dibujante.trazarVector(vectorVelocidad);
        }
        /**Retorna un cuerpo geométrico regular.
         * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
        static poligono(x, y, lados, radio, masa = 1, densidad = 1) {
            let poli = super.poligono(x, y, lados, radio);
            let poligono = new Cuerpo(x, y, lados, radio, masa, densidad);
            poligono.id = poli.id;
            return poligono;
        }
        /**Retorna un cuerpo rectangular.*/
        static rectangulo(x, y, base, altura, masa = 1, densidad = 1) {
            let rect = super.rectangulo(x, y, base, altura);
            let rectangulo = new Cuerpo(x, y, 4, rect.radio, masa);
            rectangulo.vertices = rect.vertices;
            rectangulo.id = "poligono";
            return rectangulo;
        }
        /**Retorna un cuerpo con forma de circunferencia.*/
        static circunferencia(x, y, radio, masa = 1, densidad = 1, fijo = false) {
            let circulo = super.circunferencia(x, y, radio);
            let circunferencia = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, fijo);
            circunferencia.id = circulo.id;
            circunferencia.lados = circulo.lados;
            return circunferencia;
        }
        /**Suma la velocidad y la aceleración a la posición y aplica las transformaciones de escala, rotación y posición.*/
        mover() {
            this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
            this.actualizarTransformacion();
        }
        /**Aplica las transformaciones de escala, rotación y posición.*/
        actualizarTransformacion() {
            if (this._rotarSegunVelocidad == true) {
                let anguloTransformacionVelocidad = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
                this._transformacion.rotacion += anguloTransformacionVelocidad;
                this.aplicarTransformacion();
                this._transformacion.rotacion -= anguloTransformacionVelocidad;
            }
            else {
                this.aplicarTransformacion();
            }
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

    /**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
    const CANVAS = document.getElementById("canvas");
    const CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = 920;
    CANVAS.height = 680;
    //CONSTANTES
    const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
    const NUMEROBOIDS = 200;
    const ESCALA = 2;
    const VELMAXIMA = 2;
    const ROTARSEGUNVELOCIDAD = true;
    const DISTANCIAREPELER = 20;
    const FUERZAREPELER = 2;
    const DISTANCIACOORDINAR = 40;
    const FACTORCOORDINACION = 0.4;
    const COLORBOID = Dibujante.colorHSL(50, 100, 100);
    const COLORFONDO = Dibujante.colorHSL(220, 100, 0);
    const ATRACCIONMOUSE = 0.1;
    ////////////////
    let mousePresente = false;
    let vectorMouse = Vector.cero();
    CANVAS.style.backgroundColor = COLORFONDO;
    window.addEventListener("load", () => {
        let dibu = new Dibujante(CONTEXT);
        dibu.colorFondo = COLORFONDO;
        /**Forma generadora de posiciones.*/
        let formaGeneradora = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROBOIDS, 320);
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
            dibu.limpiarCanvas(CANVAS);
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
