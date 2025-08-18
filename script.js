document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Datos de transición para las pestañas
    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cG9seWxpbmUgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSI2Mi41LDIyNSA5My44LDE3NSA5My44LDM1MCAxNTYuMywyMjUgMTg3LjUsMzA1IDI1MCwxMTIuNSAzMTIuNSwyNTAgMzc1LDE3NSA0NjguOCwyNTAgNDY4LjgsMTc1IDUwMCwzMjUiLz48Y2lyY2xlIGN4PSI2Mi41IiBjeT0iMjI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjkzLjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iOTMuOCIgY3k9IjM1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxNTYuMyIgY3k9IjIyNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMwNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIyNTUuMCIgY3k9IjExMi41IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjMxMi41IiBjeT0iMjUwIiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjM3NSIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjI1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI0NjguOCIgY3k9IjE3NSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIzMjUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PC9zdmc+`
        },
        'servicios-habilidades': {
            title: 'Servicios y habilidades',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cGF0aCBkPSJNMzYwLDUwTDE2MCwyNTBMNDYwLDU1MEw1NzYsMjUwWiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMzREMzk5IiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxwYXRoIGQ9Ik0zNjAsNTAgTCAxNjAsMjUwIEwgNDYwLDU1MCBMIDU3NiwyNTBaIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+`
        },
        'portafolio': {
            title: 'Portafolio',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDExMCBMIDQwMCwzODAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvcmFkYXJEb2N1bWVudD48L3N2Zz4=`
        },
        'contacto': {
            title: 'Contacto',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEwMCIgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjE1IiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMTAwIiByPSI1MCIgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjEwIiBmaWxsPSJub25lIi8+PC9zdmc+`
        }
    };

    function activateTab(targetId) {
        const { title, svg } = tabTransitionData[targetId];
        transitionImage.src = svg;
        transitionTitle.textContent = title;
        transitionOverlay.classList.add('active');

        setTimeout(() => {
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 600);
        }, 400);
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;

            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            activateTab(targetId);
        });
    });

    const canvas = document.getElementById('data-visualization-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const elements = [];
    const numParticles = 200;
    const numGraphs = 10;
    const numHeatmaps = 10;
    const numBinary = 100;
    const numBarCharts = 20; // Número de gráficos de barras
    const numPieCharts = 20; // Número de gráficos de pastel
    const backgroundColor = '#0A192F';

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

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
            ctx.fillStyle = `rgba(52, 211, 153, ${Math.max(0, this.opacity)})`;
            ctx.fill();
        }
    }

    // Clase para gráficos de líneas minimalistas
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

    // Clase para mapas de calor dinámicos
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

    // Clase para datos binarios que caen
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
    
    // Nueva clase para gráficos de barras
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
            const totalWidth = this.numBars * (this.barWidth + 2);
            for (let i = 0; i < this.numBars; i++) {
                const animatedHeight = this.barHeights[i] * (0.5 + Math.sin(this.animationPhase + i * 0.5) * 0.5);
                ctx.fillRect(this.x + i * (this.barWidth + 2), this.y, this.barWidth, -animatedHeight);
            }
            ctx.globalAlpha = 1;
        }
    }

    // Nueva clase para gráficos de pastel
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

    // Inicializa el canvas y los elementos
    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements.length = 0; // Limpiar elementos existentes
        
        // Agregar los diferentes tipos de elementos al array
        for (let i = 0; i < numParticles; i++) { elements.push(new Particle()); }
        for (let i = 0; i < numGraphs; i++) { elements.push(new MinimalGraph()); }
        for (let i = 0; i < numHeatmaps; i++) { elements.push(new Heatmap()); }
        for (let i = 0; i < numBinary; i++) { elements.push(new BinaryData()); }
        for (let i = 0; i < numBarCharts; i++) { elements.push(new BarChart()); }
        for (let i = 0; i < numPieCharts; i++) { elements.push(new PieChart()); }
    }

    // Bucle principal de animación
    function animate() {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        elements.forEach((element, index) => {
            if (element.update()) {
                // Si el elemento debe ser reiniciado, creamos uno nuevo del mismo tipo
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
