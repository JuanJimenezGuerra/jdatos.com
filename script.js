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
    const numElements = 50;

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

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

    class DataFlow extends VisualElement {
        constructor() {
            super(Math.random() * width, Math.random() * height);
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.size = Math.random() * 3 + 1;
            this.maxAlpha = Math.random() * 0.4 + 0.1;
            this.alphaSpeed = 0.005;
            this.connectedTo = null;
        }

        update() {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 120;

            if (distance < repelRadius) {
                const force = 1 - (distance / repelRadius);
                this.x += dx / distance * force * 0.3;
                this.y += dy / distance * force * 0.3;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.alpha < this.maxAlpha) {
                this.alpha += this.alphaSpeed;
            }

            if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.alpha = 0;
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

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        elements.length = 0;
        for (let i = 0; i < numElements; i++) {
            elements.push(new DataFlow());
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
            const el1 = elements[i];
            el1.update();
            el1.draw();
            for (let j = i + 1; j < elements.length; j++) {
                const el2 = elements[j];
                const dx = el1.x - el2.x;
                const dy = el1.y - el2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const connectionDistance = 120;

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(el1.x, el1.y);
                    ctx.lineTo(el2.x, el2.y);
                    ctx.strokeStyle = `rgba(52, 211, 153, ${Math.min(el1.alpha, el2.alpha) * 0.3})`;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();
});
