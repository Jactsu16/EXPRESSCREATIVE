        // Navigation functionality
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.style.display = 'none';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        function toggleMobileMenu() {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'block';
            }
        }

        // Calculator functions
    function calculateAdMetrics() {
    // Obtener valores de los campos, si están vacíos toman 0 por defecto
    const cost = parseFloat(document.getElementById('total-cost').value) || 0;
    const impressions = parseFloat(document.getElementById('impressions').value) || 0;
    const clicks = parseFloat(document.getElementById('clicks').value) || 0;
    const conversions = parseFloat(document.getElementById('conversions').value) || 0;
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;

    // Validaciones básicas
    if (cost <= 0) {
      alert('Por favor ingresa el coste total de la campaña (mayor que 0).');
      return;
    }
    if (impressions <= 0) {
      alert('Por favor ingresa el número de impresiones (mayor que 0).');
      return;
    }
    if (clicks < 0) {
      alert('El número de clics no puede ser negativo.');
      return;
    }
    if (conversions < 0) {
      alert('El número de conversiones no puede ser negativo.');
      return;
    }
    if (revenue < 0) {
      alert('Los ingresos no pueden ser negativos.');
      return;
    }

    // Cálculos de las métricas con las fórmulas estándar
    const cpm = cost / (impressions / 1000);                   // CPM = inversión / (impresiones / 1000)
    const cpc = clicks > 0 ? cost / clicks : 0;                // CPC = inversión / clics
    const ctr = (clicks / impressions) * 100;                  // CTR = (clics / impresiones) × 100
    const cpa = conversions > 0 ? cost / conversions : 0;      // CPA = inversión / número de acciones
    const roi = ((revenue - cost) / cost) * 100;                // ROI = ((ganancias − inversión) / inversión) × 100
    const cr = clicks > 0 ? (conversions / clicks) * 100 : 0;  // CR = (conversiones / clics) × 100

    // Determinar calidad, color y recomendaciones para cada métrica
    // Umbrales orientativos; ajústalos según tu industria
    let cpmQuality, cpmColor, cpmRec;
    if (cpm < 5) {
      cpmQuality = 'Excelente CPM';
      cpmColor = '#0be881';  // verde
      cpmRec = '¡Buen coste por mil impresiones! Tus anuncios son muy eficientes en costo.';
    } else if (cpm < 10) {
      cpmQuality = 'CPM Aceptable';
      cpmColor = '#feca57';  // amarillo
      cpmRec = 'El CPM está en un rango medio; considera optimizar la audiencia o pujas.';
    } else {
      cpmQuality = 'CPM Alto';
      cpmColor = '#ff6b6b';  // rojo
      cpmRec = 'El CPM es elevado; revisa tu segmentación y ajuste de puja para reducir el costo.';
    }

    let cpcQuality, cpcColor, cpcRec;
    if (cpc < 1) {
      cpcQuality = 'CPC Excelente';
      cpcColor = '#0be881';
      cpcRec = 'Estás pagando muy poco por clic; continúa optimizando tu calidad de anuncio.';
    } else if (cpc < 2) {
      cpcQuality = 'CPC Promedio';
      cpcColor = '#feca57';
      cpcRec = 'Costo por clic razonable; prueba mejorar la relevancia de tu anuncio.';
    } else {
      cpcQuality = 'CPC Elevado';
      cpcColor = '#ff6b6b';
      cpcRec = 'El CPC es muy alto; ajusta pujas y mejora tu segmentación.';
    }

    let ctrQuality, ctrColor, ctrRec;
    if (ctr < 1) {
      ctrQuality = 'CTR Bajo';
      ctrColor = '#ff6b6b';
      ctrRec = 'Tu anuncio recibe pocos clics. Revisa el copy y el diseño para hacerlo más atractivo.';
    } else if (ctr < 3) {
      ctrQuality = 'CTR Medio';
      ctrColor = '#feca57';
      ctrRec = 'CTR aceptable. Experimenta con llamadas a la acción más fuertes.';
    } else {
      ctrQuality = 'CTR Alto';
      ctrColor = '#0be881';
      ctrRec = '¡Gran CTR! Tu anuncio está resonando bien con la audiencia.';
    }

    let cpaQuality, cpaColor, cpaRec;
    if (cpa < 10) {
      cpaQuality = 'CPA Excelente';
      cpaColor = '#0be881';
      cpaRec = 'Costo por acción muy bajo; tu campaña está convirtiendo eficientemente.';
    } else if (cpa < 50) {
      cpaQuality = 'CPA Medio';
      cpaColor = '#feca57';
      cpaRec = 'CPA razonable. Ajusta tu página de destino para mejorar conversiones.';
    } else {
      cpaQuality = 'CPA Alto';
      cpaColor = '#ff6b6b';
      cpaRec = 'El CPA es elevado; revisa tu embudo de conversión y calidad del tráfico.';
    }

    let roiQuality, roiColor, roiRec;
    if (roi < 0) {
      roiQuality = 'ROI Negativo';
      roiColor = '#ff6b6b';
      roiRec = 'Estás perdiendo dinero. Revisa la inversión y optimiza la oferta.';
    } else if (roi < 100) {
      roiQuality = 'ROI Positivo Moderado';
      roiColor = '#feca57';
      roiRec = 'Tienes retorno, pero podría mejorar. Incrementa el valor promedio de pedido.';
    } else {
      roiQuality = 'ROI Alto';
      roiColor = '#0be881';
      roiRec = '¡Excelente rentabilidad! Considera escalar la inversión manteniendo eficiencia.';
    }

    let crQuality, crColor, crRec;
    if (cr < 2) {
      crQuality = 'CR Bajo';
      crColor = '#ff6b6b';
      crRec = 'Tu tasa de conversión es baja; optimiza la experiencia de usuario en la landing.';
    } else if (cr < 5) {
      crQuality = 'CR Medio';
      crColor = '#feca57';
      crRec = 'Casi buen CR. Realiza pruebas A/B en formularios y llamadas a la acción.';
    } else {
      crQuality = 'CR Alto';
      crColor = '#0be881';
      crRec = '¡Excelente conversión! Tu embudo funciona bien, mantén el óptimo flujo de usuario.';
    }

    // Construir el informe como HTML
    const resultDiv = document.getElementById('ad-metrics-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
      <h4 style="margin-top: 0;">📈 Informe de Métricas Publicitarias</h4>
      <div style="background: ${cpmColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>CPM:</strong> USD ${cpm.toFixed(2)} <em>(${cpmQuality})</em></p>
        <p><strong>Recomendación:</strong> ${cpmRec}</p>
      </div>
      <div style="background: ${cpcColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>CPC:</strong> USD ${cpc.toFixed(2)} <em>(${cpcQuality})</em></p>
        <p><strong>Recomendación:</strong> ${cpcRec}</p>
      </div>
      <div style="background: ${ctrColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>CTR:</strong> ${ctr.toFixed(2)}% <em>(${ctrQuality})</em></p>
        <p><strong>Recomendación:</strong> ${ctrRec}</p>
      </div>
      <div style="background: ${cpaColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>CPA:</strong> USD ${cpa.toFixed(2)} <em>(${cpaQuality})</em></p>
        <p><strong>Recomendación:</strong> ${cpaRec}</p>
      </div>
      <div style="background: ${roiColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>ROI:</strong> ${roi.toFixed(2)}% <em>(${roiQuality})</em></p>
        <p><strong>Recomendación:</strong> ${roiRec}</p>
      </div>
      <div style="background: ${crColor}; padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem;">
        <p><strong>CR (Tasa de Conversión):</strong> ${cr.toFixed(2)}% <em>(${crQuality})</em></p>
        <p><strong>Recomendación:</strong> ${crRec}</p>
      </div>
      <small>📊 Tip: Evalúa cada métrica a lo largo del tiempo para detectar tendencias y actuar a tiempo.</small>
    `;
  }
        
          

        // Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Simple validation
            if (!data.name || !data.email) {
                alert('Por favor completa los campos obligatorios (Nombre y Email)');
                return;
            }
            
            // Simulate form submission
            alert('¡Gracias por tu interés! Nos pondremos en contacto contigo en las próximas 24 horas para programar tu consulta gratuita.');
            
            // Reset form
            this.reset();
        });

        // Add smooth animations on scroll
        function addScrollAnimations() {
            const cards = document.querySelectorAll('.service-card, .pricing-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            });
            
            cards.forEach(card => {
                observer.observe(card);
            });
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            addScrollAnimations();
        });

        // Add some interactive features
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects to service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
        // New add for filtering services
        
        // Función principal para filtrar servicios
function filterServices(category) {
    const cards = document.querySelectorAll('.specialized-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Remover clase active de todos los botones
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Agregar clase active al botón clickeado
    event.target.classList.add('active');
    
    // Filtrar las tarjetas
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animación de entrada
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            // Ocultar después de la animación
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Función para inicializar la sección cuando se carga la página
function initializeSpecializedServices() {
    // Agregar event listeners a los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            filterServices(category);
        });
    });
    
    // Agregar animación inicial a las tarjetas
    const cards = document.querySelectorAll('.specialized-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Agregar efectos hover a las tarjetas
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)';
        });
    });
}

// Función para contar servicios por categoría
function getServiceCount(category) {
    if (category === 'all') {
        return document.querySelectorAll('.specialized-card').length;
    }
    return document.querySelectorAll(`[data-category="${category}"]`).length;
}

// Función para actualizar contadores en los botones (opcional)
function updateButtonCounters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        const category = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 'all';
        const count = getServiceCount(category);
        
        // Agregar contador si no existe
        if (!button.querySelector('.count')) {
            const countSpan = document.createElement('span');
            countSpan.className = 'count';
            countSpan.textContent = ` (${count})`;
            countSpan.style.fontSize = '0.8em';
            countSpan.style.opacity = '0.7';
            button.appendChild(countSpan);
        }
    });
}

// Función para búsqueda en tiempo real (funcionalidad adicional)
function addSearchFunctionality() {
    // Crear input de búsqueda si no existe
    const filterContainer = document.querySelector('.filter-buttons');
    if (!document.querySelector('.search-input')) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = '🔍 Buscar servicios...';
        searchInput.style.cssText = `
            padding: 8px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 25px;
            margin-left: 16px;
            outline: none;
            transition: all 0.3s ease;
        `;
        
        // Agregar funcionalidad de búsqueda
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.specialized-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
        
        filterContainer.appendChild(searchInput);
    }
}

// Función para ordenar servicios por precio
function sortServicesByPrice(ascending = true) {
    const grid = document.getElementById('specializedGrid');
    const cards = Array.from(document.querySelectorAll('.specialized-card'));
    
    cards.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
        
        return ascending ? priceA - priceB : priceB - priceA;
    });
    
    // Remover todas las tarjetas y agregarlas en orden
    cards.forEach(card => grid.removeChild(card));
    cards.forEach(card => grid.appendChild(card));
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSpecializedServices();
    updateButtonCounters(); // Descomenta si quieres contadores
    addSearchFunctionality(); // Descomenta si quieres búsqueda
});

// Función adicional para responsive (opcional)
function handleResponsive() {
    const grid = document.getElementById('specializedGrid');
    const cards = document.querySelectorAll('.specialized-card');
    
    if (window.innerWidth <= 768) {
        // Comportamiento móvil
        cards.forEach(card => {
            card.style.marginBottom = '16px';
        });
    } else {
        // Comportamiento desktop
        cards.forEach(card => {
            card.style.marginBottom = '24px';
        });
    }
}

// Agregar listener para resize
window.addEventListener('resize', handleResponsive);

// Ejecutar una vez al cargar
handleResponsive();