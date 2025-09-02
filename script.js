// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Transición de Pestañas ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const footerNavs = document.querySelectorAll('.footer-nav');

    // Función para activar una pestaña sin transiciones
    function activateTab(targetId) {
        // Oculta todas las pestañas inmediatamente
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Muestra la pestaña objetivo inmediatamente
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
            // Para términos y privacidad, hacer scroll hacia arriba siempre
            // Para pestañas principales, solo si no son términos o privacidad
            if (targetId === 'terminos' || targetId === 'privacidad') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    // Función para actualizar enlaces activos
    function updateActiveLinks(activeElement) {
        // Remueve active de todos los enlaces de navegación
        tabLinks.forEach(l => l.classList.remove('active'));
        footerNavs.forEach(l => l.classList.remove('active'));
        
        // Agrega active al elemento clickeado
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }

    // Agrega el event listener a cada enlace de navegación principal
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;
            updateActiveLinks(link);
            activateTab(targetId);
        });
    });

    // Agrega el event listener a cada enlace de navegación del footer
    footerNavs.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;
            
            if (targetId) {
                updateActiveLinks(null); // No marcamos como activo los enlaces del footer
                activateTab(targetId);
            }
        });
    });

    // --- Funcionalidad del botón "Agenda una Consulta Gratuita" ---
    const consultaBtn = document.getElementById('consulta-btn');
    if (consultaBtn) {
        consultaBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Actualiza la clase 'active' para los enlaces de navegación
            const contactoLink = document.querySelector('[data-target="contacto"]');
            updateActiveLinks(contactoLink);
            activateTab('contacto');
        });
    }

    // --- Lógica del Canvas de Visualización de Datos ---
    const canvas = document.getElementById('data-visualization-canvas');
    if (!canvas) {
        // Si el canvas no existe, no se ejecuta el resto del script para evitar errores
        return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    const elements = []; // Array que contendrá todos los elementos visuales animados
    
    // Cantidades para cada tipo de elemento visual
    const numParticles = 200;
    const numGraphs = 10;
    const numHeatmaps = 10;
    const numBinary = 100;
    const numBarCharts = 20;
    const numPieCharts = 20;

    // Clase base para todos los elementos visuales
    class VisualElement {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.alpha = 0; // Utilizado para la animación de entrada
        }
        update() {
            // Método para actualizar la posición o estado del elemento.
            // Retorna 'true' si el elemento debe ser reiniciado.
            return false;
        }
        draw() {} // Método para dibujar el elemento en el canvas
    }

    // Clase para partículas ascendentes - velocidad reducida
    class Particle extends VisualElement {
        constructor() {
            super(Math.random() * width, height + 20);
            this.radius = Math.random() * 1.5 + 0.5;
            this.speedY = -(Math.random() * 0.4 + 0.2); // Reducida de 0.8 + 0.5 a 0.4 + 0.2
            this.opacity = Math.random() * 0.6 + 0.4;
        }

        update() {
            this.y += this.speedY;
            this.opacity -= 0.003; // Reducida de 0.005
            return this.y < -20 || this.opacity <= 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${Math.max(0, this.opacity)})`;
            ctx.fill();
        }
    }

    // Clase para gráficos de líneas minimalistas (ondas) - velocidad reducida
    class MinimalGraph extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height * 0.7 + height * 0.3);
            this.amplitude = Math.random() * 30 + 10;
            this.frequency = Math.random() * 0.01 + 0.005; // Reducida de 0.02 + 0.01
            this.phase = Math.random() * Math.PI * 2;
            this.lineWidth = Math.random() * 1.5 + 0.5;
            this.speed = Math.random() * 0.25 + 0.1; // Reducida de 0.5 + 0.2
        }

        update() {
            this.phase += this.frequency;
            this.x += this.speed * (Math.random() - 0.5);
            if (this.x < -50 || this.x > width + 50) {
                this.x = Math.random() * width;
            }
            return false;
        }

        draw() {
            ctx.strokeStyle = '#34D399';
            ctx.lineWidth = this.lineWidth;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            for (let i = 0; i < 50; i++) {
                const x = this.x + i * 5;
                const yOffset = Math.sin(this.phase + i * 0.1) * this.amplitude;
                const y = this.y + yOffset;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // Clase para mapas de calor dinámicos (círculos difusos) - velocidad reducida
    class Heatmap extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 30 + 20;
            this.intensity = Math.random() * 0.8 + 0.2;
        }

        update() {
            // Cambia la intensidad del color con el tiempo - velocidad reducida
            this.intensity = 0.5 + Math.sin(Date.now() * 0.001 + this.x * 0.005 + this.y * 0.005) * 0.5; // Reducida velocidad
            return false;
        }

        draw() {
            // Crea un gradiente radial para el efecto de brillo
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(52, 211, 153, ${this.intensity * 0.6})`);
            gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    // Clase para datos binarios que caen (0s y 1s) - velocidad reducida
    class BinaryData extends VisualElement {
        constructor() {
            super(Math.random() * width, -20);
            this.value = Math.random() < 0.5 ? '0' : '1';
            this.speedY = Math.random() * 0.5 + 0.25; // Reducida de 1 + 0.5
            this.fontSize = Math.random() * 10 + 8;
            this.opacity = Math.random() * 0.7 + 0.3;
        }

        update() {
            this.y += this.speedY;
            this.opacity -= 0.002; // Reducida de 0.003
            return this.y > height + 20 || this.opacity <= 0;
        }

        draw() {
            ctx.font = `${this.fontSize}px monospace`;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
            ctx.fillText(this.value, this.x, this.y);
        }
    }
    
    // Clase para gráficos de barras animados - velocidad reducida
    class BarChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height * 0.8 + height * 0.1);
            this.numBars = Math.floor(Math.random() * 4) + 3;
            this.barWidth = Math.random() * 8 + 4;
            this.barHeights = Array.from({ length: this.numBars }, () => Math.random() * 60 + 20);
            this.animationPhase = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.15 + 0.05; // Reducida de 0.3 + 0.1
        }

        update() {
            this.animationPhase += 0.025; // Reducida de 0.05
            this.y += this.speed * (Math.random() - 0.5);
            if (this.y < -50 || this.y > height + 50) {
                this.y = Math.random() * height;
            }
            return false;
        }

        draw() {
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = '#34D399';
            for (let i = 0; i < this.numBars; i++) {
                // Anima la altura de la barra usando una función sinusoidal
                const animatedHeight = this.barHeights[i] * (0.5 + Math.sin(this.animationPhase + i * 0.5) * 0.5);
                ctx.fillRect(this.x + i * (this.barWidth + 2), this.y, this.barWidth, -animatedHeight);
            }
            ctx.globalAlpha = 1;
        }
    }

    // Clase para gráficos de pastel (pie charts) animados - velocidad reducida
    class PieChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 20 + 10;
            // Define los segmentos iniciales del pastel
            this.segments = [Math.random() * 0.4, Math.random() * 0.3, Math.random() * 0.3];
            this.colors = ['#34D399', '#1F2937', '#6EE7B7']; // Restauración de los colores originales
            this.animationPhase = Math.random() * Math.PI * 2;
        }

        update() {
            this.animationPhase += 0.01; // Reducida de 0.02
            return false;
        }

        draw() {
            ctx.globalAlpha = 0.7;
            let startAngle = 0;
            for (let i = 0; i < this.segments.length; i++) {
                // Anima el tamaño de cada segmento
                const segmentValue = this.segments[i] * (0.5 + Math.sin(this.animationPhase + i) * 0.5);
                const endAngle = startAngle + segmentValue * Math.PI * 2;
                
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = this.colors[i % this.colors.length];
                ctx.fill();
                
                startAngle = endAngle; // El próximo segmento empieza donde el anterior terminó
            }
            ctx.globalAlpha = 1;
        }
    }

    // Inicializa el canvas y los elementos visuales
    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements.length = 0; // Limpiar elementos existentes

        // Agrega los diferentes tipos de elementos al array
        for (let i = 0; i < numParticles; i++) { elements.push(new Particle()); }
        for (let i = 0; i < numGraphs; i++) { elements.push(new MinimalGraph()); }
        for (let i = 0; i < numHeatmaps; i++) { elements.push(new Heatmap()); }
        for (let i = 0; i < numBinary; i++) { elements.push(new BinaryData()); }
        for (let i = 0; i < numBarCharts; i++) { elements.push(new BarChart()); }
        for (let i = 0; i < numPieCharts; i++) { elements.push(new PieChart()); }
    }

    // Bucle principal de animación
    function animate() {
        // Fondo con un gradiente muy sutil
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(17, 24, 39, 0.1)'); // Color de fondo interior transparente
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)'); // Color de fondo exterior semi-transparente
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height); // Limpiar el canvas con el gradiente

        // Actualiza y dibuja cada elemento en el array
        elements.forEach((element, index) => {
            if (element.update()) {
                // Si el elemento debe ser reiniciado, crea uno nuevo del mismo tipo
                if (element instanceof Particle) { elements[index] = new Particle(); }
                else if (element instanceof MinimalGraph) { elements[index] = new MinimalGraph(); }
                else if (element instanceof Heatmap) { elements[index] = new Heatmap(); }
                else if (element instanceof BinaryData) { elements[index] = new BinaryData(); }
                else if (element instanceof BarChart) { elements[index] = new BarChart(); }
                else if (element instanceof PieChart) { elements[index] = new PieChart(); }
            }
            element.draw();
        });

        // Solicita el siguiente cuadro de animación
        requestAnimationFrame(animate);
    }

    // Inicia la animación cuando la página carga y se redimensiona
    window.addEventListener('resize', init);
    init(); // Inicializa al cargar
    animate(); // Inicia el bucle de animación
});
