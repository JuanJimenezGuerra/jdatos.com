// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Transición de Pestañas ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Datos de transición para las pestañas, usando SVGs en base64 - ACTUALIZADOS
    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            // Gráfico de líneas simple
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'portafolio': {
            title: 'Portafolio',
            // Nuevo SVG de portafolio actualizado - Convertido a base64
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiBmaWxsPSIjMzREMzk5Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMjUgODcuNWE1MCA1MCAwIDAgMSA1MC01MGg1MGE1MCA1MCAwIDAgMSA1MCA1MHYzLjQxN2MxNS41NSAxLjQxNyAzMC45NSAzLjI4MyA0Ni4yMzMgNS41NjdDMzQ0LjU2NyA5OS45NjcgMzU0LjEzMyAxMTUuNTUgMzU0LjEzMyAxMzMuMTE3djUwLjU1YzAgMjAuMTgzLTEyLjIzMyAzOS4yLTMyLjI2NyA0NS44NjdBNDEyLjEgNDEyLjEgMCAwIDEgMjAwIDI2Mi41Yy00NS41IDAtODkuMjgzLTcuMzY3LTEzMC4yMzMtMjAuOTgzQzQ5LjUzMyAyMzUuMzUgMzcuMzMzIDIxNi40MTcgMzcuMzMzIDE5Ni4yMzN2LTYzLjExNmMwLTIzLjkgMTcuMDMzLTQ1IDQxLjI2Ny00OC42MTdBODEzLjU2NyA4MTMuNTY3IDAgMCAxIDEyNSA5MS45MTdWODcuNXptMTI1IDBoLTEwMHYxLjVhODI0Ljc4MyA4MjQuNzgzIDAgMCAwLTEwMCAwdi0xLjVhMjUgMjUgMCAwIDEgMjUtMjVoNTBhMjUgMjUgMCAwIDEgMjUgMjVabS01MCA2OC43NWExMi41IDEyLjUgMCAxIDAtMjUgMCAxMi41IDEyLjUgMCAwIDAgMjUgMFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz48cGF0aCBkPSJNNTAgMzA2LjY2N3Y0Ni42YTcxLjY2NyA3MS42NjcgMCAwIDAgMTEuODgzIDUuMTgzQTQzNi43NyA0MzYuNzcgMCAwIDAgMjAwIDM3NS44MzNjNDguMiAwIDk0LjY2Ny03LjggMTM4LjExNy0yMi4zODNhNzEuNjY3IDcxLjY2NyAwIDAgMCAxMS44ODMtNS4xODNWMzA2LjY2N2MwIDI0LjIgNTAuMzMzIDMwLjQxNyA0OS41NSAyNy44MjMyODMzQzM5NS4zMzMgMzEzLjcgMzc3LjQ2NyAyOTguNzMzIDM1OC4zIDI4OS4zNjdhODE4LjE3IDgxOC4xNyAwIDAgMS0xMDcuOS03LjExN0M4MC43ODMgNTU0LjMzIDUwIDMyOS43IDUwIDMwNi42NjdaIiAvPjwvc3ZnPg==`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            // Nuevo SVG de persona - Convertido a base64
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiBmaWxsPSIjMzREMzk5Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMTEuNDE3IDMxOC4xNjJBMTYyLjA1IDE2Mi4wNSAwIDAgMCAzNjIuNSAyMDBjMC04OS43NS03Mi43NS0xNjIuNS0xNjIuNS0xNjIuNVM0Ny41IDExMC4yNSA0Ny41IDIwMGExNjIuMDUgMTYyLjA1IDAgMCAwIDUxLjA4MyAxMTguMTYyQTE2MS45MyAxNjEuOTMgMCAwIDAgMjAwIDM2Mi41YTE2MS45MyAxNjEuOTMgMCAwIDAgMTExLjQxNy00NC4zMzh6bS0yMDguOTE3LTIxLjQxNkExMjQuNzcgMTI0Ljc3IDAgMCAxIDIwMCAyNTBhMTI0Ljc3IDEyNC43NyAwIDAgMSA5Ny41IDQ2Ljc0NkExMzcuMDYgMTM3LjA2IDAgMCAxIDIwMCAzMzcuNWExMzcuMDYgMTM3LjA2IDAgMCAxLTk3LjUtNDAuNzU0ek0yNjIuNSAxNTBhNjIuNSA2Mi41IDAgMSAxLTEyNSAwIDYyLjUgNjIuNSAwIDAgMSAxMjUgMFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=`
        },
        'servicios-habilidades': {
            title: 'Servicios y habilidades',
            // Gráfico de Área (similar a un gráfico de radar)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cGF0aCBkPSJNMzYwLDUwTDE2MCwyNTBMNDYwLDU1MEw1NzYsMjUwWiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMzREMzk5IiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxwYXRoIGQ9Ik0zNjAsNTAgTCAxNjAsMjUwIEwgNDYwLDU1MCBMIDU3NiwyNTBaIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+`
        },
        'contacto': {
            title: 'Contacto',
            // Nuevo SVG de contacto actualizado - Convertido a base64
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiBmaWxsPSIjMzREMzk5Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMDAgMzcuNWMtODkuNzUgMC0xNjIuNSA3Mi43NS0xNjIuNSAxNjIuNXM3Mi43NSAxNjIuNSAxNjIuNSAxNjIuNSAxNjIuNS03Mi43NSAxNjIuNS0xNjIuNVM4OS43NSAzNy41IDIwMCAzNy41ek0xMDQuMzcgMTAxLjJhMTM3LjUgMTM3LjUgMCAxIDAgMTc2LjAzLTEyLjc2N0E3NS41IDc1LjUgMCAwIDEgMjU4LjUgMTA5LjVsLjI3NS41NWExMy40ODMgMTMuNDgzIDAgMCAxLTE4LjA5MiAxOC4wOTJsLTEwLjA2Ny01LjAzM2ExOC43NSAxOC43NSAwIDAgMC0yMS42MzIgMy41bC0yLjIgMi4xODNjLTcuMzE3IDcuMzE3LTcuMzE3IDE5LjIgMCAyNi41MTdsNC45MzMgNC45MzNjNC4yNjcgNC4yODMgMTAuMzcgNi4yMzMgMTYuMzMzIDUuMjMzbDE5LjUtMy4yNWM1LjM4My0uOSAxMC45IDYuMDE3IDE1LjA4MyAzLjgzM2wyMi4xNjcgMTguNDY3YzUuMzMzIDQuNDUgNy42NjcgMTEuNTY3IDUuOTY3IDE4LjMzM2ExNDUgMTQ1IDAgMCAxLTM4LjEzNCA2Ny4zMzNsLTEyLjA1IDEyLjA2N2ExOC43NSAxOC43NSAwIDAgMS0yMS42MzMgMy41bC0yLjU1LTEuMjY3YTE4Ljc1IDE4Ljc1IDAgMCAxLTEwLjM2Ny0xNi43NjZ2LTE4LjE1YzAtNC45NjctMS45ODMtOS43NS01LjUtMTMuMjY3bC0yMi40NS0yMi40NWExOC43NSAxOC43NSAwIDAgMS0zLjUtMjEuNjMzTDE2Mi41IDIwMGwtMjcuMzMzLTI3LjMzM2ExMDAgMTAwIDAgMCAxLTI3LjkzMy01NC4yODNsLTIuODY3LTEuNzE3WiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPjwvc3ZnPg==`
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

    // --- Funcionalidad del botón "Agenda una Consulta Gratuita" ---
    const consultaBtn = document.getElementById('consulta-btn');
    if (consultaBtn) {
        consultaBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Actualiza la clase 'active' para los enlaces de navegación
            tabLinks.forEach(l => l.classList.remove('active'));
            const contactoLink = document.querySelector('[data-target="contacto"]');
            if (contactoLink) {
                contactoLink.classList.add('active');
            }

            // Activa la pestaña de contacto
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

    // Clase para mapas de calor dinámicos (círculos difusos)
    class Heatmap extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 30 + 20;
            this.intensity = Math.random() * 0.8 + 0.2;
        }

        update() {
            // Cambia la intensidad del color con el tiempo
            this.intensity = 0.5 + Math.sin(Date.now() * 0.002 + this.x * 0.01 + this.y * 0.01) * 0.5;
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
            ctx.fillStyle = '#34D399';
            for (let i = 0; i < this.numBars; i++) {
                // Anima la altura de la barra usando una función sinusoidal
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
            // Define los segmentos iniciales del pastel
            this.segments = [Math.random() * 0.4, Math.random() * 0.3, Math.random() * 0.3];
            this.colors = ['#34D399', '#1F2937', '#6EE7B7']; // Restauración de los colores originales
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
