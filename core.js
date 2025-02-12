
        // Прелоадер: плавное скрытие после загрузки страницы
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 600);
          });
      
          // Переключение мобильного меню и трансформация гамбургера
          function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu.style.display === 'flex') {
              mobileMenu.style.display = 'none';
              hamburger.classList.remove('open');
            } else {
              mobileMenu.style.display = 'flex';
              hamburger.classList.add('open');
            }
          }
      
          // Анимация появления элементов при скролле с помощью Intersection Observer
          const animateElements = document.querySelectorAll('.animate');
          const observerOptions = { threshold: 0.2 };
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, observerOptions);
          animateElements.forEach(el => observer.observe(el));
      
          // Модальное окно для портфолио
          const portfolioItems = document.querySelectorAll('.portfolio-item');
          const modal = document.getElementById('modal');
          const modalImage = document.getElementById('modalImage');
          portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
              modalImage.src = item.getAttribute('data-image');
              modal.classList.add('open');
            });
          });
          function closeModal() { modal.classList.remove('open'); }
          modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      
          // Эффект частиц в шапке с использованием Canvas
          const canvas = document.getElementById('particleCanvas');
          const ctx = canvas.getContext('2d');
          let particles = [];
          const particleCount = 100;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      
          class Particle {
            constructor() {
              this.reset();
            }
            reset() {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.vx = (Math.random() - 0.5) * 0.5;
              this.vy = (Math.random() - 0.5) * 0.5;
              this.radius = Math.random() * 2 + 1;
              this.alpha = Math.random() * 0.5 + 0.5;
            }
            update() {
              this.x += this.vx;
              this.y += this.vy;
              if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
              }
            }
            draw() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(240,210,122,${this.alpha})`;
              ctx.fill();
            }
          }
          function initParticles() {
            for (let i = 0; i < particleCount; i++) {
              particles.push(new Particle());
            }
          }
          function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
              p.update();
              p.draw();
            });
            requestAnimationFrame(animateParticles);
          }
          initParticles();
          animateParticles();
      
          // Изменение размеров Canvas при изменении размера окна
          window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          });
      
          // Отслеживание направления скролла для навигации и шапки
          let lastScrollY = window.pageYOffset;
          window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScrollY) {
              document.body.setAttribute('data-scroll-direction', 'down');
            } else {
              document.body.setAttribute('data-scroll-direction', 'up');
            }
            lastScrollY = currentScroll;
          });
    