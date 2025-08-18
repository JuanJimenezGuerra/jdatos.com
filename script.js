// Espera a que el DOM (Document Object Model) esté completamente cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Transición de Pestañas ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Mapeo de datos para la transición, usando SVGs en base64.
    // Cada objeto contiene el título de la pestaña y un SVG único en base64 para la animación.
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
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cmVjdCB4PSIxMDAiIHk9IjMwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0RDM5OSIvPjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzREMzk5Ii8+PHJlY3QgeD0iMzAwIiB5PSIxMDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMzREMzOTkiLz48cmVjdCB4PSI0MDAiIHk9IjIwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM0RDM5OSIvPjwvc3ZnPg==`
        },
        'contacto': {
            title: 'Contacto',
            // Gráfico de Puntos
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjE1IiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iMzAwiIGN5PSIzMDAiIHI9IjE1IiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNTAwIiBjeT0iMjAwIiByPSIxNSIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjQwMCIgcj0iMTUiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI0NTAiIGN5PSIxNTAiIHI9IjE1IiBmaWxsPSIjMzREMzk5Ii8+PC9zdmc+`
        }
    };

    // Manejador del evento de clic para los enlaces de las pestañas
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = e.target.getAttribute('data-target');

            // Muestra el overlay de transición
            transitionOverlay.classList.add('active');

            // Actualiza el título y la imagen de transición según la pestaña de destino
            transitionTitle.textContent = tabTransitionData[targetTab].title;
            transitionImage.src = tabTransitionData[targetTab].svg;

            setTimeout(() => {
                // Oculta la pestaña activa actual
                document.querySelector('.tab-link.active').classList.remove('active');
                document.querySelector('.tab-content.active').classList.remove('active');

                // Muestra la nueva pestaña
                e.target.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Oculta el overlay después de la transición
                setTimeout(() => {
                    transitionOverlay.classList.remove('active');
                }, 500);
            }, 400);
        });
    });

    // --- Lógica de la animación del canvas de fondo ---
    const canvas = document.getElementById('data-visualization-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let elements = [];

    // Clase que representa un punto en la animación
    class Point {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = Math.random() * 0.5 - 0.25; // Velocidad en x
            this.vy = Math.random() * 0.5 - 0.25; // Velocidad en y
        }

        // Dibuja el punto en el canvas
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
            ctx.fill();
        }

        // Actualiza la posición del punto y lo reinicia si sale de la pantalla
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Si el punto sale de los límites, se reinicia.
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                return true;
            }
            return false;
        }
    }

    // Clase que representa una línea en la animación
    class Line {
        constructor() {
            this.x1 = Math.random() * width;
            this.y1 = Math.random() * height;
            this.x2 = this.x1 + (Math.random() - 0.5) * 100;
            this.y2 = this.y1 + (Math.random() - 0.5) * 100;
            this.opacity = 0;
            this.fadeIn = true;
        }

        // Dibuja la línea en el canvas
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.strokeStyle = `rgba(52, 211, 153, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Actualiza la opacidad de la línea para crear un efecto de "aparecer" y "desaparecer"
        update() {
            if (this.fadeIn) {
                this.opacity += 0.01;
                if (this.opacity >= 1) {
                    this.fadeIn = false;
                }
            } else {
                this.opacity -= 0.01;
                if (this.opacity <= 0) {
                    return true; // Reiniciar la línea
                }
            }
            return false;
        }
    }

    // Configuración para el número de elementos de cada tipo
    const elementConfig = {
        Point: { class: Point, count: 50 },
        Line: { class: Line, count: 10 }
    };

    // Inicializa el canvas y los elementos animados
    function initializeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements = []; // Limpiar elementos existentes

        // Genera los elementos basados en la configuración
        for (const type in elementConfig) {
            const { count, class: ElementClass } = elementConfig[type];
            for (let i = 0; i < count; i++) {
                elements.push(new ElementClass());
            }
        }
    }

    // Bucle principal de animación. Se llama a sí mismo en cada frame.
    function animate() {
        // Limpia el canvas con un gradiente de fondo, creando un efecto de rastro
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(17, 24, 39, 0.1)');
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Actualiza y dibuja cada elemento en la pantalla
        elements.forEach((element, index) => {
            // Si el método 'update' retorna 'true', el elemento debe ser reiniciado
            if (element.update()) {
                const elementType = element.constructor.name;
                const ElementClass = elementConfig[elementType].class;
                elements[index] = new ElementClass();
            }
            element.draw();
        });

        // Solicita el próximo frame de animación
        requestAnimationFrame(animate);
    }

    // Inicia la animación al cargar la página y al redimensionar la ventana
    window.addEventListener('resize', initializeCanvas);
    window.addEventListener('load', () => {
        initializeCanvas();
        animate();
    });
});
