document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const transitionOverlay = document.getElementById('tab-transition-overlay');
    const transitionImage = document.getElementById('transition-image');
    const transitionTitle = document.getElementById('transition-title');

    const tabTransitionData = {
        'inicio': {
            title: 'Inicio',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIj48cGF0aCBkPSJNNTAgNDUwIEwgMjAwLDEwMCBMIDQwMCw0MDAgTCA1NTAsMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzREMzOTkiIHN0cm9rZS13aWR0aD0iMTUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`
        },
        'sobre-mi-propuesta': {
            title: 'Sobre mí',
            svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTc2Ij48cG9seWxpbmUgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgcG9pbnRzPSI2Mi41LDIyNSA5My44LDE3NSA5My44LDM1MCAxNTYuMywyMjUgMTg3LjUsMzA1IDI1MCwxMTIuNSAzMTIuNSwyNTAgMzc1LDE3NSA0NjguOCwyNTAgNDY4LjgsMTc1IDUwMCwzMjUiLz48Y2lyY2xlIGN4PSI2Mi41IiBjeT0iMjI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjxjaXJjbGUgY3g9IjkzLjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iOTMuOCIgY3k9IjM1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxNTYuMyIgY3k9IjIyNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMwNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIyNTUiIGN5PSIxMTIuNSIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIzMTIuNSIgY3k9IjI1MCIgcj0iMTIiIGZpbGw9IiMzREMzOTkiLz48Y2lyY2xlIGN4PSIzNzUiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNDY4LjgiIGN5PSIyNTAiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNDY4LjgiIGN5PSIxNzUiIHI9IjEyIiBmaWxsPSIjMzREMzk5Ii8+PGNpcmNsZSBjeD0iNTAwIiBjeT0iMzI1IiByPSIxMiIgZmlsbD0iIzM0RDM5OSIvPjwvc3ZnPg==`
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

    // Iniciar el canvas y las partículas solo si existe el elemento
    const canvas = document.getElementById('data-visualization-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const elements = [];

    // Objeto para almacenar la posición del mouse
    let mouse = { x: null, y: null };

    // Escuchador de evento para la posición del mouse
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Clase base para todos los elementos animados
    class VisualElement {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.alpha = 0;
        }
        update() {
            // Lógica de actualización a ser sobrescrita
            return false;
        }
        draw() {
            // Lógica de dibujo a ser sobrescrita
        }
    }

    // Clase para los nodos de datos (círculos)
    class DataNode extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.maxAlpha = Math.random() * 0.5 + 0.1;
            this.alphaSpeed = 0.01;
        }

        update() {
            // Lógica de repulsión del mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;

            if (distance < repelRadius) {
                const force = 1 - (distance / repelRadius);
                this.x += dx / distance * force;
                this.y += dy / distance * force;
            }

            this.x += this.speedX;
            this.y += this.speedY;
            if (this.alpha < this.maxAlpha) {
                this.alpha += this.alphaSpeed;
            }

            if (this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) {
                return true;
            }
            return false;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${this.alpha})`;
            ctx.fill();
        }
    }

    // Clase para los gráficos de línea
    class LineGraph extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.length = Math.random() * 100 + 50;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.5;
            this.maxAlpha = Math.random() * 0.6 + 0.2;
            this.alphaSpeed = 0.01;
        }

        update() {
            // Lógica de repulsión del mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;

            if (distance < repelRadius) {
                const force = 1 - (distance / repelRadius);
                this.x += dx / distance * force;
                this.y += dy / distance * force;
            }

            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            if (this.alpha < this.maxAlpha) {
                this.alpha += this.alphaSpeed;
            }
            if (this.x < -this.length || this.x > width + this.length || this.y < -this.length || this.y > height + this.length) {
                return true;
            }
            return false;
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
            ctx.strokeStyle = `rgba(52, 211, 153, ${this.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Clase para los gráficos de barras
    class BarChart extends VisualElement {
        constructor() {
            super(Math.random() * width, height + 10);
            this.barWidth = Math.random() * 10 + 5;
            this.barHeight = Math.random() * 100 + 50;
            this.speedY = -1;
            this.maxAlpha = Math.random() * 0.7 + 0.3;
            this.alphaSpeed = 0.01;
        }

        update() {
            // Lógica de repulsión del mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;

            if (distance < repelRadius) {
                const force = 1 - (distance / repelRadius);
                this.x += dx / distance * force;
                this.y += dy / distance * force;
            }

            this.y += this.speedY;
            if (this.alpha < this.maxAlpha) {
                this.alpha += this.alphaSpeed;
            }
            if (this.y < -this.barHeight) {
                return true;
            }
            return false;
        }

        draw() {
            ctx.fillStyle = `rgba(52, 211, 153, ${this.alpha})`;
            ctx.fillRect(this.x, this.y, this.barWidth, this.barHeight);
        }
    }

    // Clase para los gráficos de radar
    class RadarChart extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.radius = Math.random() * 40 + 20;
            this.rotationSpeed = Math.random() * 0.01 + 0.005;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.2;
            this.maxAlpha = Math.random() * 0.4 + 0.1;
            this.alphaSpeed = 0.01;
        }

        update() {
            // Lógica de repulsión del mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;

            if (distance < repelRadius) {
                const force = 1 - (distance / repelRadius);
                this.x += dx / distance * force;
                this.y += dy / distance * force;
            }

            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.angle += this.rotationSpeed;
            if (this.alpha < this.maxAlpha) {
                this.alpha += this.alphaSpeed;
            }
            if (this.x < -this.radius || this.x > width + this.radius || this.y < -this.radius || this.y > height + this.radius) {
                return true;
            }
            return false;
        }

        draw() {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = this.angle + (Math.PI / 3) * i;
                const x = this.x + Math.cos(angle) * this.radius;
                const y = this.y + Math.sin(angle) * this.radius;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(52, 211, 153, ${this.alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements.length = 0;
        for (let i = 0; i < 50; i++) {
            elements.push(createRandomElement());
        }
    }

    function createRandomElement() {
        const type = Math.random();
        if (type < 0.25) {
            return new DataNode();
        } else if (type < 0.5) {
            return new LineGraph();
        } else if (type < 0.75) {
            return new BarChart();
        } else {
            return new RadarChart();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(17, 24, 39, 0.1)');
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.update()) {
                elements[i] = createRandomElement();
            }
            element.draw();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
});
