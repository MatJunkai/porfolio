// función reutilizable para iniciar el carrusel
function initCarousel() {
    const circle = document.getElementById("circle");
    if (!circle) return;
    circle.style.transform = "";

    const cards = circle.querySelectorAll(".card");
    const total = cards.length;
    const radius = 190;
    let angleStep = 360 / total;
    let currentRotation = 0;

    // posicionar
    cards.forEach((card, i) => {
        const angle = i * angleStep - 90;
        const rad = angle * (Math.PI / 180);
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });

    function updateActiveCards() {
        cards.forEach(card => card.classList.remove("active"));
        const visibleIndices = getVisibleIndices();
        visibleIndices.forEach(i => cards[i].classList.add("active"));
    }

    function getVisibleIndices() {
        let closestIndex = 0, minDiff = Infinity;
        cards.forEach((card, i) => {
            const initialAngle = i * angleStep - 90;
            const currentAngle = (initialAngle + currentRotation) % 360;
            const normalizedAngle = (currentAngle + 360) % 360;
            const diff = Math.abs(normalizedAngle - 180);
            if (diff < minDiff) { minDiff = diff; closestIndex = i; }
        });
        return [closestIndex];
    }

    function rotateCarousel(dir) {
        currentRotation += dir * angleStep;
        circle.style.transform = `rotate(${currentRotation}deg)`;
        cards.forEach((card, i) => {
            const angle = i * angleStep - 90;
            const rad = angle * (Math.PI / 180);
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);
            card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-currentRotation}deg)`;
        });
        updateActiveCards();
    }

    // limpiar listeners previos
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
    }
    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    }
    document.querySelector(".next")?.addEventListener("click", () => rotateCarousel(-1));
    document.querySelector(".prev")?.addEventListener("click", () => rotateCarousel(1));

    updateActiveCards();
}

window.initCarousel = initCarousel;