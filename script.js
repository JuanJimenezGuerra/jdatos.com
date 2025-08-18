// Espera a que el DOM (Document Object Model) esté completamente cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Transición de Pestañas ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Mapeo de datos para la transición, usando SVGs en base64.
    // Puedes actualizar los SVGs cambiando el valor de la cadena base64.
    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            // Gráfico de líneas simple
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'portafolio': {
            title: 'Portafolio',
            // Gráfico circular
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cGF0aCBkPSJNMjkwLDI5MCBMNDEwLDEyMCA0OTAsMTcwIEM0NzgsMjIxLjUgNDIzLDI4OSAyODgsMjg4IEwyOTAsMjkwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiLz48cGF0aCBkPSJNMjkwLDI5MCBMNDkwLDE3MCA0NzAsNDMwIEM0NjUsNDYwIDM3MCw0OTAgMjkwLDI5MCBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiLz48cGF0aCBkPSJNMjkwLDI5MCBMMjAwLDEwMCBMMTkwLDIxMCBMMjkwLDI5MCIgZmlsbD0ibm9uZSINCiAgICAgc3Ryb2tlPSIjMzlFMzE5IiBzdHJva2Utd2lkdGg9IjE1Ii8+PHBhdGggZD0iTTI5MCwyOTAgTDE5MCwyMTAgOTAsMjk3IEwyOTAsMjkwIiBmaWxsPSJub25lIiANCiAgICAgc3Ryb2tlPSIjMzQwODk5IiBzdHJva2Utd2lkdGg9IjE1Ii8+PC9zdmc+`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            // Gráfico de Puntos Conectados (Scatter plot con líneas)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cG9seWxpbmUgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSI2Mi41LDIyNSA5My44LDE3NSA5My44LDM1MCAxNTYuMywyMjUgMTg3LjUsMzA1IDI1MCwxMTIuNSAzMTIuNSwyNTAgMzc1LDE3NSA0NjguOCwyNTAgNDY4LjgsMTc1IDUwMCwzMjUiLz48Y2lyY2xlIGN4PSI2Mi41IiBjeT0iMjI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjkzLjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iOTMuOCIgY3k9IjM1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxNTYuMyIgY3k9IjIyNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMwNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIyNTAuMCIgY3k9IjExMi41IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjMxMi41IiBjeT0iMjUwIiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjM3NSIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjI1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIzMjUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PC9zdmc+`
        },
        'servicios-habilidades': {
            title: 'Servicios y habilidades',
            // Gráfico de Barras Verticales
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cmVjdCB4PSIxMDAiIHk9IjMwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0RDM5OSIvPjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzREMzk5Ii8+PHJlY3QgeD0iMzAwIiB5PSIxMDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMzREMzOTkiLz48cmVjdCB4PSI0MDAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzM0RDM5OSIvPjwvc3ZnPg==`
        },
        'contacto': {
            title: 'Contacto',
            // Gráfico de red
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48Y2lyY2xlIGN4PSIyMjUiIGN5PSIyMjUiIHI9IjIwIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iMzc1IiBjeT0iMzc1IiByPSIxOCIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjQwMCIgcj0iMjIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIxMDAiIHI9IjI1IiBmaWxsPSIjMzREMzk5Ii8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI4IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAzNzUsMzc1Ii8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI1IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMTAwLDQwMCA1MDAsMTAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI2IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI3IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAyMjUsMjI1Ii8+PC9zdmc+`
        }
    };

    /**
     * Activa una pestaña específica con una animación de transición.
     * @param {string} targetId El ID de la pestaña de destino.
     */
    function activateTab(targetId) {
        const { title, svg } = tabTransitionData[targetId];
        transitionImage.src = svg;
        transitionTitle.textContent = title;
        transitionOverlay.classList.add('active');

        // Retrasa el cambio de contenido para que la animación de entrada se complete.
        // El valor 400ms debe coincidir con la duración de la transición en el CSS.
        setTimeout(() => {
            // Oculta todas las secciones de contenido.
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
            });

            // Muestra la nueva sección de contenido.
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                // Un pequeño retraso para la transición de opacidad del contenido.
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                }, 50);
            }

            // Oculta el overlay de transición una vez que el nuevo contenido está visible.
            // El valor 600ms debe coincidir con la duración de la animación de salida en el CSS.
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 600);
        }, 400);
    }

    // Añade el event listener a cada enlace de navegación para la transición.
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const targetId = link.dataset.target;

            // Actualiza la clase 'active' para los enlaces.
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Activa la pestaña con la función de transición.
            activateTab(targetId);
        });
    });

    // Muestra la primera sección al cargar la página.
    const initialTab = document.querySelector('.tab-link.active');
    if (initialTab) {
        const initialContent = document.getElementById(initialTab.dataset.target);
        if (initialContent) {
            initialContent.classList.add('active');
            initialContent.style.opacity = '1';
        }
    }

    // --- Lógica del Canvas de Visualización de Datos ---
    const canvas = document.getElementById('data-visualization-canvas');
    if (!canvas) {
        // Si no se encuentra el canvas, no se ejecuta el resto del script para evitar errores.
        console.error("No se encontró el elemento 'data-visualization-canvas'.");
        return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let elements = []; // Array que contendrá todos los elementos visuales animados

    // Mapeo de tipos de elementos y sus cantidades.
    const elementConfig = {
        Particle: { count: 200, class: Particle },
        MinimalGraph: { count: 10, class: MinimalGraph },
        Heatmap: { count: 10, class: Heatmap },
        BinaryData: { count: 100, class: BinaryData },
        BarChart: { count: 20, class: BarChart },
        PieChart: { count: 20, class: PieChart }
    };
    
    // Clase base para todos los elementos visuales.
    class VisualElement {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        update() { return false; } // Actualiza el estado del elemento.
        draw() {} // Dibuja el elemento en el canvas.
    }

    // Clase para partículas ascendentes.
    class Particle extends VisualElement {
        constructor() {
            super(Math.random() * width, height + 20);
            this.radius = Math.random() * 1.5 + 0.5;
            this.speedY = -(Math.random() * 0.8 + 0.5);
            this.opacity = Math.random() * 0.6 + 0.4;
        }

        update() {
            this.y += this.speedY;
            this.opacity -= 0.005;
            return this.y < -20 || this.opacity <= 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${Math.max(0, this.opacity)})`;
            ctx.fill();
        }
    }

    // Clase para gráficos de líneas minimalistas (ondas).
    class MinimalGraph extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height * 0.7 + height * 0.3);
            this.amplitude = Math.random() * 30 + 10;
            this.frequency = Math.random() * 0.02 + 0.01;
            this.phase = Math.random() * Math.PI * 2;
            this.lineWidth = Math.random() * 1.5 + 0.5;
            this.speed = Math.random() * 0.5 + 0.2;
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

    // Clase para mapas de calor dinámicos (círculos difusos).
    class Heatmap extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 30 + 20;
            this.intensity = Math.random() * 0.8 + 0.2;
        }

        update() {
            this.intensity = 0.5 + Math.sin(Date.now() * 0.002 + this.x * 0.01 + this.y * 0.01) * 0.5;
            return false;
        }

        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(52, 211, 153, ${this.intensity * 0.6})`);
            gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    // Clase para datos binarios que caen (0s y 1s).
    class BinaryData extends VisualElement {
        constructor() {
            super(Math.random() * width, -20);
            this.value = Math.random() < 0.5 ? '0' : '1';
            this.speedY = Math.random() * 1 + 0.5;
            this.fontSize = Math.random() * 10 + 8;
            this.opacity = Math.random() * 0.7 + 0.3;
        }

        update() {
            this.y += this.speedY;
            this.opacity -= 0.003;
            return this.y > height + 20 || this.opacity <= 0;
        }

        draw() {
            ctx.font = `${this.fontSize}px monospace`;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
            ctx.fillText(this.value, this.x, this.y);
        }
    }
    
    // Clase para gráficos de barras animados.
    class BarChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height * 0.8 + height * 0.1);
            this.numBars = Math.floor(Math.random() * 4) + 3;
            this.barWidth = Math.random() * 8 + 4;
            this.barHeights = Array.from({ length: this.numBars }, () => Math.random() * 60 + 20);
            this.animationPhase = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.animationPhase += 0.05;
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
                const animatedHeight = this.barHeights[i] * (0.5 + Math.sin(this.animationPhase + i * 0.5) * 0.5);
                ctx.fillRect(this.x + i * (this.barWidth + 2), this.y, this.barWidth, -animatedHeight);
            }
            ctx.globalAlpha = 1;
        }
    }

    // Clase para gráficos de pastel (pie charts) animados.
    class PieChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 20 + 10;
            this.segments = [Math.random() * 0.4, Math.random() * 0.3, Math.random() * 0.3];
            this.colors = ['#34D399', '#1F2937', '#6EE7B7'];
            this.animationPhase = Math.random() * Math.PI * 2;
        }

        update() {
            this.animationPhase += 0.02;
            return false;
        }

        draw() {
            ctx.globalAlpha = 0.7;
            let startAngle = 0;
            for (let i = 0; i < this.segments.length; i++) {
                const segmentValue = this.segments[i] * (0.5 + Math.sin(this.animationPhase + i) * 0.5);
                const endAngle = startAngle + segmentValue * Math.PI * 2;
                
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = this.colors[i % this.colors.length];
                ctx.fill();
                
                startAngle = endAngle;
            }
            ctx.globalAlpha = 1;
        }
    }

    // Inicializa el canvas y los elementos visuales.
    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements = []; // Limpiar elementos existentes

        // Genera los elementos basados en la configuración.
        for (const type in elementConfig) {
            const { count, class: ElementClass } = elementConfig[type];
            for (let i = 0; i < count; i++) {
                elements.push(new ElementClass());
            }
        }
    }

    // Bucle principal de animación.
    function animate() {
        // Limpia el canvas con un gradiente de fondo.
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(17, 24, 39, 0.1)');
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Actualiza y dibuja cada elemento.
        elements.forEach((element, index) => {
            // Si el método 'update' retorna 'true', el elemento debe ser reiniciado.
            if (element.update()) {
                const elementType = element.constructor.name;
                const ElementClass = elementConfig[elementType].class;
                elements[index] = new ElementClass();
            }
            element.draw();
        });

        requestAnimationFrame(animate);
    }

    // Inicia la animación al cargar la página y al redimensionar la ventana.
    window.addEventListener('resize', init);
    init();
    animate();
});
