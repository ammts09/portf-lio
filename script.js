document.addEventListener("DOMContentLoaded", function() {

    // --- Efeito Typewriter (Máquina de Escrever) ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = ["Desenvolvedor Web", "Estudante de Análise de Sistemas", "Entusiasta de Tecnologia", "Futuro Dev Full-Stack"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleta caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Adiciona caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Define o tempo de digitação
            let typingSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pausa no final da palavra
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Passa para a próxima palavra
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(type, typingSpeed);
        }
        
        type(); // Inicia o efeito
    }


    // --- Animação de Fade-in ao Rolar (Intersection Observer) ---
    // Esta é a forma moderna e eficiente de fazer animações de scroll
    
    const sectionsToFade = document.querySelectorAll('.fade-in-section');

    if (sectionsToFade.length) {
        const observerOptions = {
            root: null, // Observa em relação ao viewport
            rootMargin: '0px',
            threshold: 0.15 // 15% da seção precisa estar visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Para a animação não repetir
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        sectionsToFade.forEach(section => {
            observer.observe(section);
        });
    }

});
// --- Funcionalidade de Carrossel de Projetos ---
const projectsWrapper = document.querySelector('.projects-wrapper');
const prevButton = document.querySelector('.carousel-nav.prev');
const nextButton = document.querySelector('.carousel-nav.next');

if (projectsWrapper && prevButton && nextButton) {
    nextButton.addEventListener('click', () => {
        // Pega o tamanho de um item (col-lg-4 ou col-md-6) + o espaçamento (gap)
        const itemWidth = projectsWrapper.querySelector('.col-project-item').offsetWidth + 16; // 16px é o 'g-4' do Bootstrap (gap)

        // Rola o wrapper o tamanho de um item para a direita
        projectsWrapper.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        // Pega o tamanho de um item (col-lg-4 ou col-md-6) + o espaçamento (gap)
        const itemWidth = projectsWrapper.querySelector('.col-project-item').offsetWidth + 16; // 16px é o 'g-4' do Bootstrap (gap)

        // Rola o wrapper o tamanho de um item para a esquerda
        projectsWrapper.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    });

    // Opcional: Adicionar lógica para desabilitar as setas no início/fim
    projectsWrapper.addEventListener('scroll', () => {
        // Verifica se está no início
        prevButton.disabled = projectsWrapper.scrollLeft === 0;

        // Verifica se está no fim (com uma pequena margem de erro)
        const maxScroll = projectsWrapper.scrollWidth - projectsWrapper.clientWidth;
        nextButton.disabled = projectsWrapper.scrollLeft >= maxScroll - 5;
    });

    // Inicia a seta "anterior" como desabilitada, pois começa no início
    prevButton.disabled = true;
}