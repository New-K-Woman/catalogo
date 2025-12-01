// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Create indicators
function createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
}

// Auto-rotate carousel
let carouselInterval;

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

// Initialize carousel
if (slides.length > 0) {
    createIndicators();
    startCarousel();
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function toggleMobileCatalog() {
    const mobileCatalog = document.getElementById('mobileCatalog');
    mobileCatalog.classList.toggle('active');
}

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.textContent = 'MENSAJE ENVIADO';
        submitBtn.classList.add('success');
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'ENVIAR MENSAJE';
            submitBtn.classList.remove('success');
        }, 3000);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && menuBtn) {
        if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===================================
// MINI-CARRUSEL DE PRODUCTOS
// ===================================

// Dropdown con delay para desktop
let dropdownTimeout;
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdown && dropdownMenu) {
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(function() {
            dropdownMenu.style.display = 'none';
        }, 200); // 200ms de delay antes de cerrar
    });
    
    dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.style.display = 'block';
    });
    
    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(function() {
            dropdownMenu.style.display = 'none';
        }, 200);
    });
}

function initProductCarousels() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const carousel = card.querySelector('.product-carousel');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.product-carousel-slide');
        const dotsContainer = carousel.querySelector('.product-carousel-dots');
        let currentSlide = 0;
        
        // Crear dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('product-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToProductSlide(carousel, index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Botones de navegación
        const prevBtn = carousel.querySelector('.product-carousel-prev');
        const nextBtn = carousel.querySelector('.product-carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateProductSlides(carousel, currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide + 1) % slides.length;
                updateProductSlides(carousel, currentSlide);
            });
        }
        
        // Función para ir a slide específico
        function goToProductSlide(carousel, index) {
            currentSlide = index;
            updateProductSlides(carousel, currentSlide);
        }
        
        // Función para actualizar slides
        function updateProductSlides(carousel, activeIndex) {
            const slides = carousel.querySelectorAll('.product-carousel-slide');
            const dots = carousel.querySelectorAll('.product-dot');
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === activeIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
    });
}

// Inicializar carruseles de productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initProductCarousels);

// ===================================
// BOTÓN FLOTANTE DE WHATSAPP
// ===================================

function showWhatsAppBubble() {
    const bubble = document.getElementById('whatsappBubble');
    if (bubble) {
        bubble.classList.add('show');
        
        // Ocultar el globo después de 4 segundos
        setTimeout(() => {
            bubble.classList.remove('show');
        }, 4000);
    }
}

// Mostrar el globo por primera vez después de 3 segundos
setTimeout(showWhatsAppBubble, 3000);

// Mostrar el globo cada 30 segundos
setInterval(showWhatsAppBubble, 30000);

// ===================================
// SISTEMA DE LISTA DE PRODUCTOS
// ===================================

let productList = [];

// Cargar lista desde sessionStorage al iniciar
function loadProductList() {
    const saved = sessionStorage.getItem('productList');
    if (saved) {
        productList = JSON.parse(saved);
        updateViewListButton();
    }
}

// Guardar lista en sessionStorage
function saveProductList() {
    sessionStorage.setItem('productList', JSON.stringify(productList));
}

// Agregar producto a la lista (permite duplicados)
function addToList(productName, productPrice, productImage, button) {
    // Limpiar el precio (quitar símbolos y puntos)
    const priceNumber = parseInt(productPrice.replace(/[$.]/g, ''));
    
    const product = {
        id: Date.now() + Math.random(), // ID único para cada item
        name: productName,
        price: priceNumber,
        priceFormatted: productPrice,
        image: productImage,
        timestamp: new Date().getTime()
    };
    
    // Siempre agregar (permite duplicados)
    productList.push(product);
    saveProductList();
    
    // Feedback visual
    button.textContent = '✓ Agregado';
    button.style.backgroundColor = '#4a9d5f';
    button.style.color = 'white';
    button.style.borderColor = '#4a9d5f';
    
    setTimeout(() => {
        button.textContent = 'Agregar a mi lista';
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        button.style.color = '#333';
        button.style.borderColor = '#e5e5e5';
    }, 1000);
    
    updateViewListButton();
}

// Eliminar producto individual de la lista
function removeFromList(productId) {
    productList = productList.filter(p => p.id !== productId);
    saveProductList();
    updateViewListButton();
}

// Vaciar toda la lista
function clearProductList() {
    productList = [];
    saveProductList();
    updateViewListButton();
}

// Actualizar botón de ver lista
function updateViewListButton() {
    // Actualizar badge en menú desktop
    const desktopBadge = document.getElementById('listBadge');
    if (desktopBadge) {
        desktopBadge.textContent = productList.length;
        if (productList.length > 0) {
            desktopBadge.classList.add('show');
        } else {
            desktopBadge.classList.remove('show');
        }
    }
    
    // Actualizar badge en menú móvil
    const mobileBadge = document.getElementById('mobileListBadge');
    if (mobileBadge) {
        mobileBadge.textContent = productList.length;
        if (productList.length > 0) {
            mobileBadge.classList.add('show');
        } else {
            mobileBadge.classList.remove('show');
        }
    }
}

// Abrir lista en nueva ventana
function openProductList() {
    if (productList.length === 0) {
        alert('No hay productos en tu lista');
        return;
    }
    
    // Calcular total general
    let totalGeneral = 0;
    productList.forEach(product => {
        const subtotal = product.price * 8;
        totalGeneral += subtotal;
    });
    
    // Guardar referencia a la ventana
    window.listWindowRef = window.open('', '_blank', 'width=700,height=900,scrollbars=yes');
    
    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mi Lista de Productos - SANDALIAS</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                    background-color: #f9f9f9;
                    padding: 2rem;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    background-color: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                h1 {
                    font-size: 1.75rem;
                    font-weight: 300;
                    letter-spacing: 0.15em;
                    margin-bottom: 0.5rem;
                    text-align: center;
                    color: #333;
                }
                .subtitle {
                    text-align: center;
                    color: #666;
                    font-size: 0.875rem;
                    font-weight: 300;
                    margin-bottom: 0.5rem;
                }
                .note {
                    text-align: center;
                    color: #4a9d5f;
                    font-size: 0.875rem;
                    font-weight: 400;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e5e5;
                }
                .product-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .product-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1.25rem;
                    border: 1px solid #e5e5e5;
                    border-radius: 4px;
                    transition: box-shadow 0.3s;
                    position: relative;
                }
                .product-item:hover {
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }
                .btn-remove {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    background-color: #fff;
                    border: 1px solid #e5e5e5;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 1.125rem;
                    color: #666;
                    padding: 0;
                }
                .btn-remove:hover {
                    background-color: #ff4444;
                    border-color: #ff4444;
                    color: white;
                    transform: scale(1.1);
                }
                .product-image {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                .product-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .product-name {
                    font-size: 1rem;
                    font-weight: 400;
                    color: #333;
                }
                .product-price {
                    font-size: 0.95rem;
                    color: #666;
                }
                .product-subtotal {
                    font-size: 1.125rem;
                    font-weight: 400;
                    color: #2a2a2a;
                    padding-top: 0.5rem;
                    border-top: 1px dashed #e5e5e5;
                }
                .product-subtotal-label {
                    font-size: 0.875rem;
                    color: #666;
                    font-weight: 300;
                }
                .totals-section {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 2px solid #e5e5e5;
                }
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                }
                .total-items {
                    font-size: 1rem;
                    color: #666;
                }
                .total-general {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 2px solid #333;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .total-general-label {
                    font-size: 1.25rem;
                    font-weight: 400;
                    color: #333;
                }
                .total-general-amount {
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: #2a2a2a;
                }
                .actions {
                    margin-top: 2rem;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                .btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    font-weight: 300;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-print {
                    background-color: #2a2a2a;
                    color: white;
                }
                .btn-print:hover {
                    background-color: #444;
                }
                .btn-close {
                    background-color: #e5e5e5;
                    color: #333;
                }
                .btn-close:hover {
                    background-color: #d1d1d1;
                }
                .btn-clear-all {
                    background-color: #ff4444;
                    color: white;
                }
                .btn-clear-all:hover {
                    background-color: #cc0000;
                }
                @media print {
                    body {
                        background-color: white;
                        padding: 0;
                    }
                    .actions {
                        display: none;
                    }
                    .btn-remove {
                        display: none;
                    }
                }
                @media (max-width: 600px) {
                    body {
                        padding: 1rem;
                    }
                    .container {
                        padding: 1rem;
                    }
                    .product-item {
                        flex-direction: column;
                    }
                    .product-image {
                        width: 100%;
                        height: 200px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>MI LISTA DE PRODUCTOS</h1>
                <p class="subtitle">Lista temporal de ayuda memoria</p>
                <p class="note">Cada tarea contiene 8 pares del mismo modelo</p>
                <div class="product-list">
                    ${productList.map((product, index) => {
                        const subtotal = product.price * 8;
                        return `
                        <div class="product-item">
                            <button class="btn-remove" onclick="if(window.opener && window.opener.removeFromList) { window.opener.removeFromList(${product.id}); setTimeout(() => window.location.reload(), 100); }" title="Eliminar de la lista">×</button>
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <div class="product-name">${product.name}</div>
                                <div class="product-price">Precio por par: ${product.price.toLocaleString('es-AR')}</div>
                                <div class="product-subtotal">
                                    <span class="product-subtotal-label">Subtotal de la Tarea (8 pares):</span>
                                    <strong> ${subtotal.toLocaleString('es-AR')}</strong>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                <div class="totals-section">
                    <div class="total-row">
                        <span class="total-items">Total de tareas seleccionadas: <strong>${productList.length}</strong></span>
                        <span class="total-items">Total de pares: <strong>${productList.length * 8}</strong></span>
                    </div>
                    <div class="total-general">
                        <span class="total-general-label">TOTAL GENERAL:</span>
                        <span class="total-general-amount">${totalGeneral.toLocaleString('es-AR')}</span>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn btn-print" onclick="window.print()">Imprimir Lista</button>
                    <button class="btn btn-clear-all" onclick="if(confirm('¿Borrar toda la lista?')) { if(window.opener && window.opener.clearProductList) { window.opener.clearProductList(); alert('Lista borrada correctamente'); window.close(); } }">Borrar Todo</button>
                    <button class="btn btn-close" onclick="window.close()">Cerrar</button>
                </div>
            </div>
        </body>
        </html>
    `;
    
    window.listWindowRef.document.write(html);
    window.listWindowRef.document.close();
}

// Inicializar botones de agregar a lista
function initAddToListButtons() {
    const addButtons = document.querySelectorAll('.add-to-list-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const price = card.querySelector('.product-price').textContent;
            const image = card.querySelector('.product-carousel-slide.active img').src;
            addToList(name, price, image, this);
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadProductList(); // Cargar lista guardada
    initProductCarousels();
    initAddToListButtons();
});