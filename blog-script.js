// ===== FUNCIONALIDADES DO BLOG =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    const blogGrid = document.getElementById('blog-grid');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Sistema de filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Atualizar botões ativos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar posts
            filterPosts(category);
        });
    });

    function filterPosts(category) {
        // Adicionar classe de loading
        blogGrid.classList.add('loading');
        
        blogPosts.forEach(post => {
            const postCategory = post.dataset.category;
            
            if (category === 'todos' || postCategory === category) {
                // Mostrar post
                setTimeout(() => {
                    post.classList.remove('hidden');
                    post.classList.add('show');
                }, 100);
            } else {
                // Esconder post
                post.classList.add('hidden');
                post.classList.remove('show');
            }
        });

        // Remover classe de loading após animação
        setTimeout(() => {
            blogGrid.classList.remove('loading');
        }, 300);
    }

    // Animação de entrada dos posts
    function animatePostsOnLoad() {
        blogPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('show');
            }, index * 100);
        });
    }

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            
            if (!emailInput.value) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simular envio
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Obrigado! Você foi inscrito na nossa newsletter.');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Detectar scroll para efeitos visuais
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show effect
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, false);

    // Lazy loading para imagens (opcional)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.post-media img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Inicializar animações
    setTimeout(animatePostsOnLoad, 300);

    // Adicionar transições suaves ao header
    if (header) {
        header.style.transition = 'transform 0.3s ease-in-out';
    }

    // Gerenciar foco para acessibilidade
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Toast notifications (para feedback do usuário)
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Estilos do toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            zIndex: '9999',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Expor função para usar em outros lugares se necessário
    window.blogUtils = {
        showToast,
        filterPosts
    };
});