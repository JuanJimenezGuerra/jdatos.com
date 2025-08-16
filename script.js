document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    // Mapeo de nombres de pestañas para el título y la imagen SVG de la transición
    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            // Gráfico de líneas simple (NUEVO)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            // Gráfico de Puntos Conectados (Scatter plot con líneas) - MEJORADO
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cG9seWxpbmUgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSI2Mi41LDIyNSA5My44LDE3NSA5My44LDM1MCAxNTYuMywyMjUgMTg3LjUsMzA1IDI1MCwxMTIuNSAzMTIuNSwyNTAgMzc1LDE3NSA0NjguOCwyNTAgNDY4LjgsMTc1IDUwMCwzMjUiLz48Y2lyY2xlIGN4PSI2Mi41IiBjeT0iMjI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjkzLjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iOTMuOCIgY3k9IjM1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxNTYuMyIgY3k9IjIyNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMwNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxMTIuNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIzMTIuNSIgY3k9IjI1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIzNzUiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNDY4LjgiIGN5PSIyNTAiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNDY4LjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNTAwIiBjeT0iMzI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjwvc3ZnPg==`
        },
        'servicios-habilidades': {
            title: 'Servicios y habilidades',
            // Gráfico de Barras Verticales
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cmVjdCB4PSIxMDAiIHk9IjMwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0RDM5OSIvPjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzREMzk5Ii8+PHJlY3QgeD0iMzAwIiB5PSIxMDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMzREMzOTkiLz48cmVjdCB4PSI0MDAiIHk9IjI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzM0RDM5OSIvPjwvc3ZnPg==`
        },
        'portafolio': {
            title: 'Portafolio',
            // Gráfico circular verde (NUEVO)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cGF0aCBkPSJNMjkwLDI5MCBMNDEwLDEyMCA0OTAsMTcwIEM0NzgsMjIxLjUgNDIzLDI4OSAyODgsMjg4IEwyOTAsMjkwIiBmaWxsPSIjMzREMzk5Ii8+PHBhdGggZD0iTTI5MCwyOTAgTDQ5MCwxNzAgNDcwLDQzMCBDNDY1LDQ2MCAzNzAsNDkwIDI5MCwyOTAgWiIgZmlsbD0iIzI2OTk3NCIvPjxwYXRoIGQ9Ik0yOTAsMjkwIEwyMDAsMTAwIEwxOTAsMjEwIEwyOTAsMjkwIiBmaWxsPSIjMjY5OTc0Ii8+PHBhdGggZD0iTTI5MCwyOTAgTDE5MCwyMTAgOTAsMjk3IEwyOTAsMjkwIiBmaWxsPSIjMzk`
        },
        'contacto': {
            title: 'Contacto',
            // Gráfico de red (NUEVO)
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48Y2lyY2xlIGN4PSIyMjUiIGN5PSIyMjUiIHI9IjIwIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iMzc1IiBjeT0iMzc1IiByPSIxOCIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjQwMCIgcj0iMjIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSI1MDAiIGN5PSIxMDAiIHI9IjI1IiBmaWxsPSIjMzREMzk5Ii8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI4IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAzNzUsMzc1Ii8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI1IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMTAwLDQwMCA1MDAsMTAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI2IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMjI1LDIyNSAxMDAsNDAwIi8+PHBvbHlsaW5lIHN0cm9rZT0iIzM0RDM5OSIgc3Ryb2tlLXdpZHRoPSI3IiBvcGFjaXR5PSIwLjciIGZpbGw9Im5vbmUiIHBvaW50cz0iMzc1LDM3NSAyMjUsMjI1Ii8+PC9zdmc+`
        }
    };

    // Variables globales para el canvas y la animación
    let canvas, ctx, particles, mouse;

    // Inicializar el canvas y las partículas
    function initCanvas() {
        canvas = document.getElementById('data-visualization-canvas');
        if (!canvas) {
            console.error("Canvas element not found!");
            return;
        }
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        mouse = { x: null, y: null };
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        createParticles(150);
        animateParticles();
    }

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        createParticles(150);
    }

    function handleMouseMove(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    }

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxSpeed = 10;
                let speedFactor = 1.2;
                this.x -= forceDirectionX * speedFactor;
                this.y -= forceDirectionY * speedFactor;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            let size = Math.random() * 5 + 1;
            let x = Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2;
            let y = Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(52, 211, 153, 0.8)';
            particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }

    // Lógica para el cambio de pestañas con transición
    function activateTab(targetId) {
        // Muestra el overlay de transición
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

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;

            // Actualiza la clase 'active' para los enlaces de navegación
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Activa la pestaña con la nueva lógica de transición
            activateTab(targetId);
        });
    });

    // Iniciar el canvas y las partículas solo si existe el elemento
    if (document.getElementById('data-visualization-canvas')) {
        initCanvas();
    }
});
