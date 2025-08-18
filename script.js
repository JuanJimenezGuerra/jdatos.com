document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Transición de Pestañas ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Datos de transición para las pestañas, usando SVGs en base64
    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            // Gráfico de líneas simple
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MGE1ZmEiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'portafolio': {
            title: 'Portafolio',
            // Gráfico de Puntos Conectados (Scatter plot con líneas)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cG9seWxpbmUgc3Ryb2tlPSIjNjBhNWZhIiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSI2Mi41LDIyNSA5My44LDE3NSA5My44LDM1MCAxNTYuMywyMjUgMTg3LjUsMzA1IDI1MCwxMTIuNSAzMTIuNSwyNTAgMzc1LDE3NSA0NjguOCwyNTAgNDY4LjgsMTc1IDUwMCwzMjUiLz48Y2lyY2xlIGN4PSI2Mi41IiBjeT0iMjI1IiByPSIxMiIgZmlsbD0iIzYwYTVmYSIvPjxjaXJjbGUgY3g9IjkzLjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjNjBhNWZhIi8+PGNpcmNsZSBjeD0iOTMuOCIgY3k9IjM1MCIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSIxNTYuMyIgY3k9IjIyNSIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMwNSIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSIyNTAuMCIgY3k9IjExMi41IiByPSIxMiIgZmlsbD0iIzYwYTVmYSIvPjxjaXJjbGUgY3g9IjMxMi41IiBjeT0iMjUwIiByPSIxMiIgZmlsbD0iIzYwYTVmYSIvPjxjaXJjbGUgY3g9IjM3NSIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjI1MCIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIzMjUiIHI9IjEyIiBmaWxsPSIjNjBhNWZhIi8+PC9zdmc+`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            // Gráfico de Barras Verticales
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cmVjdCB4PSIxMDAiIHk9IjMwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzYwYTVmYSIvPjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjBhNWZhIi8+PHJlY3QgeD0iMzAwIiB5PSIxMDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiM2MGE1ZmEiLz48cmVjdCB4PSI0MDAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzYwYTVmYSIvPjwvc3ZnPg==`
        },
        'servicios-habilidades': {
            title: 'Servicios y habilidades',
            // Gráfico circular
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cGF0aCBkPSJNMjkwLDI5MCBMNDEwLDEyMCA0OTAsMTcwIEM0NzgsMjIxLjUgNDIzLDI4OSAyODgsMjg4IEwyOTAsMjkwIiBmaWxsPSIjNjBhNWZhIi8+PHBhdGggZD0iTTI5MCwyOTAgTDQ5MCwxNzAgNDcwLDQzMCBDNDY1LDQ2MCAzNzAsNDkwIDI5MCwyOTAgWiIgZmlsbD0iIzQ2OGVmYSIvPjxwYXRoIGQ9Ik0yOTAsMjkwIEwyMDAsMTAwIEwxOTAsMjEwIEwyOTAsMjkwIiBmaWxsPSIjNmRhY2VhIi8+PHBhdGggZD0iTTI5MCwyOTAgTDE5MCwyMTAgOTAsMjk3IEwyOTAsMjkwIiBmaWxsPSIjMzlhMmZhIi8+PC9zdmc+`
        },
        'contacto': {
            title: 'Contacto',
            // Gráfico de red
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48Y2lyY2xlIGN4PSIyMjUiIGN5PSIyMjUiIHI9IjIwIiBmaWxsPSIjNjBhNWZhIi8+PGNpcmNsZSBjeD0iMzc1IiBjeT0iMzc1IiByPSIxOCIgZmlsbD0iIzYwYTVmYSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjQwMCIgcj0iMjIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIxMDAiIHI9IjI1IiBmaWxsPSIjNjBhNWZhIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSI4IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAzNzUsMzc1Ii8+PHBvbHlsaW5lIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSI1IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMTAwLDQwMCA1MDAsMTAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSI2IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSI3IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAyMjUsMjI1Ii8+PC9zdmc+`
        }
    };

    // Función para activar una pestaña con la animación de transición
    function activateTab(targetId) {
        const { title, svg } = tabTransitionData[targetId];
        transitionImage.src = svg;
        transitionTitle.textContent = title;
        transitionOverlay.classList.add('active');

        // Retrasa el cambio de contenido hasta que la transición se vea
        setTimeout(() => {
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Oculta el overlay después de un breve período
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 600); // Duración de la animación de salida
        }, 400); // Coincide con la duración de la animación de entrada
    }

    // Agrega el event listener a cada enlace de navegación
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace
            const targetId = link.dataset.target;

            // Actualiza la clase 'active' para los enlaces de navegación
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Activa la pestaña con la nueva lógica de transición
            activateTab(targetId);
        });
    });

    // --- Lógica del Canvas de Visualización de Datos ---
    const canvas = document.getElementById('data-visualization-canvas');
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    const elements = [];
    
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
            this.alpha = 0;
        }
        update() {
            return false;
        }
        draw() {}
    }

    // Clase para partículas ascendentes
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
            ctx.fillStyle = `rgba(96, 165, 250, ${Math.max(0, this.opacity)})`; // Azul claro
            ctx.fill();
        }
    }

    // Clase para gráficos de líneas minimalistas (ondas)
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
            ctx.strokeStyle = '#60a5fa'; // Azul claro
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

    // Clase para mapas de calor dinámicos (círculos difusos)
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
            gradient.addColorStop(0, `rgba(96, 165, 250, ${this.intensity * 0.6})`); // Azul claro
            gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    // Clase para datos binarios que caen (0s y 1s)
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

    // Clase para gráficos de barras animados
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
            ctx.fillStyle = '#60a5fa'; // Azul claro
            for (let i = 0; i < this.numBars; i++) {
                const animatedHeight = this.barHeights[i] * (0.5 + Math.sin(this.animationPhase + i * 0.5) * 0.5);
                ctx.fillRect(this.x + i * (this.barWidth + 2), this.y, this.barWidth, -animatedHeight);
            }
            ctx.globalAlpha = 1;
        }
    }

    // Clase para gráficos de pastel (pie charts) animados
    class PieChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 20 + 10;
            this.segments = [Math.random() * 0.4, Math.random() * 0.3, Math.random() * 0.3];
            this.colors = ['#60a5fa', '#1F2937', '#6EE7B7']; // Azul y grises
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

    // Inicializa el canvas y los elementos visuales
    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements.length = 0;

        for (let i = 0; i < numParticles; i++) { elements.push(new Particle()); }
        for (let i = 0; i < numGraphs; i++) { elements.push(new MinimalGraph()); }
        for (let i = 0; i < numHeatmaps; i++) { elements.push(new Heatmap()); }
        for (let i = 0; i < numBinary; i++) { elements.push(new BinaryData()); }
        for (let i = 0; i < numBarCharts; i++) { elements.push(new BarChart()); }
        for (let i = 0; i < numPieCharts; i++) { elements.push(new PieChart()); }
    }

    // Bucle principal de animación
    function animate() {
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(17, 24, 39, 0.1)');
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        elements.forEach((element, index) => {
            if (element.update()) {
                if (element instanceof Particle) { elements[index] = new Particle(); }
                else if (element instanceof MinimalGraph) { elements[index] = new MinimalGraph(); }
                else if (element instanceof Heatmap) { elements[index] = new Heatmap(); }
                else if (element instanceof BinaryData) { elements[index] = new BinaryData(); }
                else if (element instanceof BarChart) { elements[index] = new BarChart(); }
                else if (element instanceof PieChart) { elements[index] = new PieChart(); }
            }
            element.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
});
