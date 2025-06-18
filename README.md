<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sucios - Rojo y Negro</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Nuevo archivo JavaScript para la lógica de acceso de administrador -->
    <script src="adminAccess.js"></script>
    <!-- Firebase CDN -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
        
        // Global variables for Firebase instances
        window.firebaseAppGlobal = null; 
        window.authGlobal = null;
        window.currentUser = null; // To hold the currently logged-in Firebase user

        /**
         * Initializes Firebase application and authentication.
         * Sets up an auth state change listener to update global currentUser.
         */
        window.initFirebaseAuth = async () => {
            // Check for Canvas environment global variables
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            if (Object.keys(firebaseConfig).length === 0) {
                console.warn('Firebase configuration is empty. User authentication might not work correctly.');
                // In a real scenario, you'd handle this more robustly, e.g., prompt for config or disable auth features.
                return;
            }

            window.firebaseAppGlobal = initializeApp(firebaseConfig);
            window.authGlobal = getAuth(window.firebaseAppGlobal);

            // Set up a listener for auth state changes globally
            onAuthStateChanged(window.authGlobal, (user) => {
                window.currentUser = user; // Update the global currentUser
                console.log("Firebase Auth State Changed:", user ? user.email : "No user");
                // Update UI elements that depend on user login status
                if (currentPage === 'account') { // Only update if currently on the account page
                    updateAccountUI(); 
                }
            });

            // If a custom token is provided (Canvas environment), try to sign in
            if (initialAuthToken) {
                try {
                    // Check if signInWithCustomToken function exists and is imported
                    if (typeof signInWithCustomToken === 'function') {
                        await signInWithCustomToken(window.authGlobal, initialAuthToken);
                        console.log('Signed in with custom token (Canvas environment)');
                    } else {
                        console.warn('signInWithCustomToken is not available. Anonymous sign-in will be used as fallback.');
                    }
                } catch (error) {
                    console.error('Error signing in with custom token:', error);
                }
            } 
            // We are not forcing anonymous sign-in here. User will explicitly login/register.
        };

        // Expose Firebase Auth functions for use in the main script
        window.firebaseAuth = {
            createUserWithEmailAndPassword: createUserWithEmailAndPassword,
            signInWithEmailAndPassword: signInWithEmailAndPassword,
            signOut: signOut,
            onAuthStateChanged: onAuthStateChanged
        };
    </script>
    <style>
        /* Import Inter font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden; /* Prevent horizontal scroll on smaller screens */
        }
        /* Custom animations */
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
            animation-delay: 0.3s; /* Delay for a staggered effect */
        }
        /* Hidden by default, shown by JS */
        .page-content {
            display: none;
        }
        /* Adjust for sticky navbar */
        body {
            padding-top: 64px; /* Adjust based on navbar height */
        }
        @media (min-width: 768px) {
            body {
                padding-top: 80px; /* Adjust for larger screen navbar */
            }
        }

        /* Carousel specific styles */
        .carousel-item {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }

        .carousel-item.active {
            display: block;
            opacity: 1;
        }

        .carousel-overlay {
            background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for text readability */
        }
    </style>
</head>
<body class="bg-gray-900 text-white">       

    <!-- Navbar -->
    <nav class="bg-black p-4 shadow-lg fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto flex flex-wrap justify-between items-center">
            <h1 class="text-white text-3xl font-extrabold cursor-pointer hover:text-red-200 transition duration-300" onclick="navigateTo('home')">
                Sucios
            </h1>
            <div class="md:hidden">
                <button id="mobile-menu-button" class="text-white focus:outline-none">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path id="mobile-menu-icon-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        <path id="mobile-menu-icon-close" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="navbar-menu" class="w-full md:block md:w-auto hidden">
                <ul class="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-xl">
                    <li>
                        <button class="text-white hover:text-red-200 transition duration-300 py-2 px-4 rounded-lg focus:outline-none" onclick="navigateTo('home')">
                            Inicio
                        </button>
                    </li>
                    <li>
                        <button class="text-white hover:text-red-200 transition duration-300 py-2 px-4 rounded-lg focus:outline-none" onclick="navigateTo('categories')">
                            Categorías
                        </button>
                    </li>
                    <li>
                        <button class="text-white hover:text-red-200 transition duration-300 py-2 px-4 rounded-lg focus:outline-none" onclick="navigateTo('about')">
                            Acerca de Nosotros
                        </button>
                    </li>
                    <li>
                        <button class="text-white hover:text-red-200 transition duration-300 py-2 px-4 rounded-lg focus:outline-none" onclick="navigateTo('account')">
                            Cuenta
                        </button>
                    </li>
                    <li id="admin-nav-item" class="hidden"> <!-- Hidden by default -->
                        <button class="text-white hover:text-red-200 transition duration-300 py-2 px-4 rounded-lg focus:outline-none" onclick="navigateTo('admin')">
                            Admin
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main class="min-h-screen bg-gray-900 text-white">
        <!-- Home Page -->
        <div id="home-page" class="page-content min-h-screen bg-gray-900 pb-16">
            <!-- Hero Carousel Section -->
            <section class="relative w-full h-96 md:h-[500px] overflow-hidden shadow-lg">
                <div id="carousel-container" class="w-full h-full relative">
                    <!-- Carousel Items will be injected here by JS -->
                </div>

                <!-- Carousel Navigation Buttons -->
                <button id="carousel-prev" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button id="carousel-next" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all focus:outline-none z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                <!-- Carousel Indicators -->
                <div id="carousel-indicators" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    <!-- Indicators will be injected here by JS -->
                </div>

                <!-- Text Overlay for Carousel -->
                <div class="carousel-overlay absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h2 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">Descubre tu Estilo Único</h2>
                    <p class="text-xl md:text-2xl mb-8 animate-fade-in-up">
                        Explora nuestra exclusiva colección de ropa y accesorios de moda.
                    </p>
                    <button
                        onclick="navigateTo('categories')"
                        class="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-red-100 hover:scale-105 transition duration-300 transform"
                    >
                        Ver Catálogo
                    </button>
                </div>
            </section>

            <!-- Featured Categories Section -->
            <section class="container mx-auto px-4 py-16">
                <h3 class="text-4xl font-bold text-white mb-12 text-center">Nuestras Categorías Destacadas</h3>
                <div id="featured-categories-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Categories will be dynamically loaded here by JS -->
                </div>
            </section>

            <!-- Featured Products Section -->
            <section class="container mx-auto px-4 py-16">
                <h3 class="text-4xl font-bold text-white mb-12 text-center">Productos Destacados</h3>
                <div id="featured-products-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <!-- Featured products will be dynamically loaded here by JS -->
                </div>
            </section>
        </div>

        <!-- Categories Page -->
        <div id="categories-page" class="page-content container mx-auto px-4 py-8 min-h-screen bg-gray-900">
            <h2 class="text-4xl font-bold text-white mb-8 text-center">Nuestras Categorías</h2>

            <div id="category-buttons-container" class="mb-8 flex flex-wrap justify-center gap-4">
                <!-- Category filter buttons will be dynamically loaded here by JS -->
            </div>

            <div id="filtered-products-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <!-- Filtered products will be dynamically loaded here by JS -->
            </div>
        </div>

        <!-- Product Detail Page -->
        <div id="product-detail-page" class="page-content container mx-auto px-4 py-8 min-h-screen bg-gray-900">
            <button
                onclick="navigateTo('categories')"
                class="mb-8 flex items-center text-red-500 hover:text-red-300 transition duration-300 text-lg font-medium"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Volver al Catálogo
            </button>

            <div id="product-detail-content" class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
                <!-- Product details will be dynamically loaded here by JS -->
            </div>
        </div>

        <!-- About Us Page -->
        <div id="about-page" class="page-content container mx-auto px-4 py-8 min-h-screen bg-gray-900">
            <h2 class="text-4xl font-bold text-white mb-8 text-center">Acerca de Nosotros</h2>
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-lg leading-relaxed text-gray-300">
                <p class="mb-4">
                    Bienvenido a Sucios, tu destino para explorar las últimas tendencias y estilos en moda.
                    Nuestra misión es presentarte una curada selección de prendas y accesorios que inspiren tu creatividad
                    y te ayuden a definir tu propio estilo.
                </p>
                <p class="mb-4">
                    Creemos que la moda es una forma de expresión personal y queremos facilitarte la exploración de
                    diferentes looks y colecciones. Desde lo casual hasta lo elegante, nuestro catálogo está diseñado
                    para ofrecerte una visión completa de lo que está de moda.
                </p>
                <p class="mb-4">
                    Aunque no ofrecemos funciones de compra directa en este sitio, esperamos que disfrutes navegando
                    por nuestras colecciones y encuentres la inspiración que buscas para tu próximo atuendo.
                </p>
                <p>
                    ¡Gracias por visitarnos y ser parte de nuestra comunidad de amantes de la moda!
                </p>
            </div>
        </div>

        <!-- Account Page (Login/Register) -->
        <div id="account-page" class="page-content container mx-auto px-4 py-8 min-h-screen bg-gray-900">
            <h2 class="text-4xl font-bold text-white mb-8 text-center">Tu Cuenta</h2>

            <div id="account-content" class="flex flex-col items-center">
                <!-- Content will be injected here by JS based on login status -->
                <!-- Forms for login/register OR User info/logout -->
            </div>
            
            <p class="text-gray-400 text-sm italic mt-8 text-center">
                Esta es una demostración. La funcionalidad de inicio de sesión y registro NO guarda usuarios en una base de datos real.
            </p>
        </div>

        <!-- Admin Panel Page -->
        <div id="admin-page" class="page-content container mx-auto px-4 py-8 min-h-screen bg-gray-900">
            <h2 class="text-4xl font-bold text-white mb-8 text-center">Gestión de Productos (Solo Administrador)</h2>
            <div id="admin-login-area" class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-lg leading-relaxed text-gray-300">
                <p class="mb-4 text-center">Por favor, ingresa el correo electrónico del administrador para acceder a esta sección.</p>
                <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <input type="email" id="admin-email-input" placeholder="Correo electrónico" class="shadow appearance-none border rounded w-full md:w-1/2 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" />
                    <input type="password" id="admin-password-input" placeholder="Contraseña" class="shadow appearance-none border rounded w-full md:w-1/2 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white mt-4 md:mt-0" />
                    <button onclick="checkAdminAccessLogic()" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 mt-4 md:mt-0">Acceder</button>
                </div>
                <p id="admin-login-message" class="text-red-400 text-center mt-4 hidden">Correo electrónico o contraseña incorrectos.</p>
            </div>

            <div id="admin-content-area" class="hidden mt-8">
                <div class="flex justify-end mb-4">
                    <button onclick="adminLogoutLogic()" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                        Cerrar Sesión
                    </button>
                </div>
                <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">Añadir/Editar Producto</h3>
                    <form id="product-form" onsubmit="handleProductFormSubmit(event)">
                        <input type="hidden" id="product-id">
                        <div class="mb-4">
                            <label for="product-category" class="block text-gray-300 text-sm font-bold mb-2">Categoría:</label>
                            <select id="product-category" class="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" required>
                                <option value="">Selecciona una categoría</option>
                                <option value="Camisas">Camisas</option>
                                <option value="Pantalones">Pantalones</option>
                                <option value="Suéteres">Suéteres</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="product-name" class="block text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                            <input type="text" id="product-name" placeholder="Nombre del Producto" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" required>
                        </div>
                        <div class="mb-4">
                            <label for="product-description" class="block text-gray-300 text-sm font-bold mb-2">Descripción:</label>
                            <textarea id="product-description" rows="3" placeholder="Descripción del Producto" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" required></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="product-price" class="block text-gray-300 text-sm font-bold mb-2">Precio:</label>
                            <input type="number" id="product-price" step="0.01" placeholder="Precio" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" required>
                        </div>
                        <div class="mb-4">
                            <label for="product-image-url" class="block text-gray-300 text-sm font-bold mb-2">URL de Imagen:</label>
                            <input type="url" id="product-image-url" placeholder="URL de la imagen del producto" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white" required>
                        </div>
                        <div class="mb-6">
                            <label for="product-details" class="block text-gray-300 text-sm font-bold mb-2">Detalles (separar con ";"):</label>
                            <textarea id="product-details" rows="2" placeholder="Detalle 1; Detalle 2; Detalle 3" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"></textarea>
                        </div>
                        <div class="flex items-center justify-between">
                            <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                                Guardar Producto
                            </button>
                            <button type="button" onclick="clearProductForm()" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                                Limpiar Formulario
                            </button>
                        </div>
                    </form>
                </div>

                <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10">
                    <h3 class="text-2xl font-semibold text-white mb-4">Productos Existentes</h3>
                    <div id="product-list-admin" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Products will be listed here with edit/delete buttons -->
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-6 mt-12">
        <div class="container mx-auto text-center text-lg">
            <p>&copy; <span id="current-year"></span> Sucios. Todos los derechos reservados.</p>
            <p class="mt-2">Diseñado con <span class="text-red-500">&hearts;</span> para el estilo.</p>
        </div>
    </footer>

    <!-- Custom Confirmation Modal -->
    <div id="custom-confirm-modal" class="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]">
        <div class="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <p id="custom-confirm-message" class="text-xl text-white mb-6">¿Estás seguro de que quieres realizar esta acción?</p>
            <div class="flex justify-center space-x-4">
                <button id="custom-confirm-yes" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300">Sí</button>
                <button id="custom-confirm-no" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300">No</button>
            </div>
        </div>
    </div>

    <script>
        // Data de productos (se inicializará desde localStorage o con valores por defecto)
        let products = [];

        // Cargar productos desde localStorage al inicio
        function loadProductsFromLocalStorage() {
            const storedProducts = localStorage.getItem('clothingCatalogProducts');
            if (storedProducts) {
                try {
                    products = JSON.parse(storedProducts);
                } catch (e) {
                    console.error("Error parsing products from localStorage:", e);
                    products = getDefaultProducts(); // Fallback to default if corrupted
                }
            } else {
                products = getDefaultProducts();
            }
        }

        // Guardar productos en localStorage
        function saveProductsToLocalStorage() {
            localStorage.setItem('clothingCatalogProducts', JSON.stringify(products));
            // Re-render relevant sections after saving
            renderFeaturedProducts();
            renderCategoriesPage(); // This will re-render buttons and filtered products
        }

        // Productos por defecto si no hay nada en localStorage
        function getDefaultProducts() {
            return [
                {
                    id: '1',
                    category: 'Camisas',
                    name: 'Blusa de Verano Floral',
                    description: 'Una blusa ligera y aireada perfecta para los días cálidos de verano. Confeccionada con algodón suave y un estampado floral vibrante.',
                    price: '35.00',
                    imageUrl: 'https://placehold.co/400x500/A7F3D0/047857?text=Blusa+Floral',
                    details: [
                        'Material: 100% Algodón',
                        'Corte: Relajado',
                        'Colores disponibles: Blanco, Azul, Rosa',
                        'Tallas disponibles: XS, S, M, L, XL',
                    ],
                },
                {
                    id: '2',
                    category: 'Pantalones',
                    name: 'Jeans de Talle Alto Ajustados',
                    description: 'Jeans clásicos de talle alto que realzan tu figura. Fabricados con denim elástico para máxima comodidad.',
                    price: '59.99',
                    imageUrl: 'https://placehold.co/400x500/FECACA/B91C1C?text=Jeans+Ajustados',
                    details: [
                        'Material: 98% Algodón, 2% Spandex',
                        'Corte: Skinny',
                        'Colores disponibles: Azul Clásico, Negro',
                        'Tallas disponibles: 26, 28, 30, 32, 34',
                    ],
                },
                {
                    id: '3',
                    category: 'Suéteres',
                    name: 'Suéter de Lana Elegante',
                    description: 'Un suéter sofisticado, ideal para ocasiones especiales o para un look de oficina chic. Tejido suave con caída elegante.',
                    price: '79.95',
                    imageUrl: 'https://placehold.co/400x500/BFDBFE/1E40AF?text=Sueter+Midi', // Changed image text
                    details: [
                        'Material: 100% Lana Merino',
                        'Corte: Oversize',
                        'Colores disponibles: Negro, Borgoña',
                        'Tallas disponibles: S, M, L',
                    ],
                },
                {
                    id: '4',
                    category: 'Accesorios',
                    name: 'Bolso de Hombro de Cuero',
                    description: 'Un bolso de hombro versátil y elegante, perfecto para el uso diario. Fabricado con cuero sintético de alta calidad.',
                    price: '45.00',
                    imageUrl: 'https://placehold.co/400x500/D1FAE5/065F46?text=Bolso+Hombro',
                    details: [
                        'Material: Cuero Sintético',
                        'Dimensiones: 25cm x 18cm x 8cm',
                        'Colores disponibles: Negro, Marrón',
                    ],
                },
                {
                    id: '5',
                    category: 'Camisas',
                    name: 'Camiseta Básica de Algodón',
                    description: 'La camiseta esencial para tu guardarropa. Suave, transpirable y disponible en una variedad de colores.',
                    price: '19.99',
                    imageUrl: 'https://placehold.co/400x500/FEF2F2/DC2626?text=Camiseta+Basica', // Changed image text
                    details: [
                        'Material: 100% Algodón Peinado',
                        'Corte: Regular',
                        'Colores disponibles: Blanco, Negro, Gris, Marino',
                        'Tallas disponibles: XS, S, M, L, XL, XXL',
                    ],
                },
                {
                    id: '6',
                    category: 'Pantalones',
                    name: 'Pantalón Chino Relaxed Fit',
                    description: 'Pantalones chinos cómodos con un corte relajado, ideales para un look casual o semi-formal.',
                    price: '49.50',
                    imageUrl: 'https://placehold.co/400x500/FFFBEB/D97706?text=Pantalon+Chino', // Changed image text
                    details: [
                        'Material: 97% Algodón, 3% Elastano',
                        'Corte: Relaxed Fit',
                        'Colores disponibles: Caqui, Verde Oliva, Azul Marino',
                        'Tallas disponibles: 28, 30, 32, 34, 36, 38',
                    ],
                },
                {
                    id: '7',
                    category: 'Suéteres',
                    name: 'Suéter Ligero de Verano',
                    description: 'Un suéter ligero y divertido, perfecto para los días soleados o una salida informal. Estampado vibrante y corte cómodo.',
                    price: '42.00',
                    imageUrl: 'https://placehold.co/400x500/FCE7F3/BE185D?text=Sueter+Ligero', // Changed image text
                    details: [
                        'Material: 100% Viscosa',
                        'Corte: Ajustado',
                        'Colores disponibles: Floral, Rayas, Puntos',
                        'Tallas disponibles: XS, S, M, L',
                    ],
                },
                {
                    id: '8',
                    category: 'Accesorios',
                    name: 'Bufanda de Seda Estampada',
                    description: 'Añade un toque de elegancia a tu atuendo con esta bufanda de seda con un estampado único.',
                    price: '28.00',
                    imageUrl: 'https://placehold.co/400x500/E0E7FF/4338CA?text=Bufanda+Seda',
                    details: [
                        'Material: 100% Seda',
                        'Dimensiones: 90cm x 90cm',
                        'Estampados: Varios',
                    ],
                },
            ];
        }

        let currentPage = 'home';
        let selectedProduct = null;
        let selectedCategory = 'Todos'; // For categories page filter

        // Carousel variables
        const carouselImages = [
            {
                imageUrl: 'https://placehold.co/1200x500/000000/FF0000?text=Carrusel+Imagen+1',
                linkUrl: 'https://www.google.com/search?q=moda+roja+y+negra' // Example link
            },
            {
                imageUrl: 'https://placehold.co/1200x500/333333/FF3333?text=Carrusel+Imagen+2',
                linkUrl: 'https://www.google.com/search?q=tendencias+de+ropa' // Example link
            },
            {
                imageUrl: 'https://placehold.co/1200x500/666666/FF6666?text=Carrusel+Imagen+3',
                linkUrl: 'https://www.google.com/search?q=accesorios+de+moda' // Example link
            }
        ];
        let currentImageIndex = 0;
        let carouselInterval;

        // Images for featured categories
        const featuredCategoryImages = {
            'Camisas': 'https://placehold.co/600x400/FF0000/FFFFFF?text=Camisas', // Example image for Camisas
            'Pantalones': 'https://placehold.co/600x400/0000FF/FFFFFF?text=Pantalones', // Example image for Pantalones
            'Suéteres': 'https://placehold.co/600x400/00FF00/FFFFFF?text=Sueteres', // Example image for Suéteres
            'Accesorios': 'https://placehold.co/600x400/FFFF00/000000?text=Accesorios' // Example image for Accesorios
        };


        // Función para mostrar solo la página actual y ocultar las demás
        function showPage(pageId) {
            document.querySelectorAll('.page-content').forEach(page => {
                if (page) {
                    page.style.display = 'none';
                }
            });

            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                window.scrollTo(0, 0);
            } else {
                console.error(`Error: No se encontró el elemento con ID '${pageId}' al intentar mostrar la página.`);
            }
        }

        // Función de navegación principal
        function navigateTo(page, data = null) {
            currentPage = page;
            selectedProduct = null; // Reinicia el producto seleccionado
            selectedCategory = 'Todos'; // Reinicia la categoría seleccionada

            // Detener carrusel al navegar fuera de la página de inicio
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }

            if (page === 'product-detail' && data) {
                selectedProduct = data;
                renderProductDetailPage();
            } else if (page === 'categories' && data) {
                selectedCategory = data;
                renderCategoriesPage();
            } else if (page === 'categories') {
                renderCategoriesPage();
            } else if (page === 'home') {
                startCarousel(); // Reiniciar carrusel al volver a la página de inicio
            } else if (page === 'admin') {
                // Handle admin page navigation using the global isAdminAuthenticated set by adminAccess.js
                const adminLoginArea = document.getElementById('admin-login-area');
                const adminContentArea = document.getElementById('admin-content-area');
                if (adminLoginArea && adminContentArea) {
                    if (window.isAdminAuthenticated) { // Check the global flag
                        adminLoginArea.classList.add('hidden');
                        adminContentArea.classList.remove('hidden');
                    } else {
                        adminLoginArea.classList.remove('hidden');
                        adminContentArea.classList.add('hidden');
                        document.getElementById('admin-login-message').classList.add('hidden'); // Hide any previous error messages
                        document.getElementById('admin-email-input').value = ''; // Clear inputs
                        document.getElementById('admin-password-input').value = '';
                    }
                }
                clearProductForm(); // Clear the form when entering admin page
                renderAdminProductList(); // Render the product list in admin area
            } else if (page === 'account') {
                updateAccountUI(); // Update account page content based on user login status
            }

            console.log(`Navegando a la página: ${page}`, data ? `con datos: ${JSON.stringify(data)}` : '');
            showPage(`${page}-page`);
        }

        // Carousel functions
        function renderCarousel() {
            const carouselContainer = document.getElementById('carousel-container');
            const indicatorsContainer = document.getElementById('carousel-indicators');
            if (!carouselContainer || !indicatorsContainer) return;

            carouselContainer.innerHTML = '';
            indicatorsContainer.innerHTML = '';

            carouselImages.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = `carousel-item ${index === currentImageIndex ? 'active' : ''}`;
                div.style.backgroundImage = `url('${item.imageUrl}')`;
                div.onerror = `this.style.backgroundImage='url("https://placehold.co/1200x500/374151/D1D5DB?text=Imagen+No+Disponible")'`;

                if (item.linkUrl) {
                    div.style.cursor = 'pointer';
                    div.onclick = () => window.open(item.linkUrl, '_blank');
                }

                carouselContainer.appendChild(div);

                const indicator = document.createElement('button');
                indicator.className = `w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-red-500' : 'bg-white bg-opacity-50'} hover:bg-red-300 transition-colors`;
                indicator.onclick = () => showImage(index);
                indicatorsContainer.appendChild(indicator);
            });
        }

        function showImage(index) {
            currentImageIndex = index;
            renderCarousel();
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            renderCarousel();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
            renderCarousel();
        }

        function startCarousel() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }
            carouselInterval = setInterval(nextImage, 5000);
        }

        // Render Featured Categories on Home Page
        function renderFeaturedCategories() {
            const container = document.getElementById('featured-categories-container');
            if (!container) {
                console.error("Error: Element with ID 'featured-categories-container' not found.");
                return;
            }
            container.innerHTML = '';
            ['Camisas', 'Pantalones', 'Suéteres', 'Accesorios'].forEach(category => {
                const div = document.createElement('div');
                div.className = "bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden group";
                div.onclick = () => navigateTo('categories', category);
                const imageUrl = featuredCategoryImages[category] || `https://placehold.co/600x400/374151/D1D5DB?text=${category}`;
                div.innerHTML = `
                    <img
                        src="${imageUrl}"
                        alt="Image of ${category}"
                        class="w-full h-64 object-cover object-center rounded-t-xl"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x400/374151/D1D5DB?text=Imagen+No+Disponible';"
                    />
                    <div class="p-6 text-center">
                        <h4 class="text-2xl font-semibold text-white mb-2 group-hover:text-red-500 transition duration-300">
                            ${category}
                        </h4>
                        <p class="text-gray-400">Explora lo último en ${category.toLowerCase()}.</p>
                    </div>
                `;
                container.appendChild(div);
            });
        }

        // Render Featured Products on Home Page
        function renderFeaturedProducts() {
            const container = document.getElementById('featured-products-container');
            if (!container) {
                console.error("Error: Element with ID 'featured-products-container' not None.");
                return;
            }
            container.innerHTML = '';
            products.slice(0, 4).forEach(product => {
                const div = document.createElement('div');
                div.className = "bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer group";
                div.onclick = () => navigateTo('product-detail', product);
                div.innerHTML = `
                    <img
                        src="${product.imageUrl}"
                        alt="Image of ${product.name}"
                        class="w-full h-72 object-cover object-center rounded-t-xl"
                        onerror="this.onerror=null;this.src='https://placehold.co/400x500/374151/D1D5DB?text=Imagen+No+Disponible';"
                    />
                    <div class="p-6">
                        <h4 class="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition duration-300">
                            ${product.name}
                        </h4>
                        <p class="text-gray-400 mb-3 line-clamp-2">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold text-red-500">$${product.price}</span>
                            <button
                                onclick="event.stopPropagation(); navigateTo('product-detail', ${JSON.stringify(product).replace(/"/g, '&quot;')});"
                                class="bg-red-600 text-white px-5 py-2 rounded-full text-lg font-medium hover:bg-red-700 transition duration-300 transform hover:scale-105"
                            >
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(div);
            });
        }

        // Render Categories Page
        function renderCategoriesPage() {
            const categoriesContainer = document.getElementById('category-buttons-container');
            const productsContainer = document.getElementById('filtered-products-container');
            if (!categoriesContainer || !productsContainer) {
                console.error("Error: One or both category/product containers not found.");
                return;
            }
            categoriesContainer.innerHTML = '';
            productsContainer.innerHTML = '';

            const categories = ['Todos', ...new Set(products.map(p => p.category))];

            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.onclick = () => {
                    selectedCategory = category;
                    renderFilteredProducts();
                    document.querySelectorAll('#category-buttons-container button').forEach(btn => {
                        btn.classList.remove('bg-red-600', 'text-white', 'shadow-md');
                        btn.classList.add('bg-gray-700', 'text-gray-300', 'hover:bg-red-900', 'hover:text-red-300');
                    });
                    button.classList.add('bg-red-600', 'text-white', 'shadow-md');
                    button.classList.remove('bg-gray-700', 'text-gray-300', 'hover:bg-red-900', 'hover:text-red-300');
                };
                button.className = `px-6 py-3 rounded-full text-lg font-semibold transition duration-300
                    ${selectedCategory === category
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-red-900 hover:text-red-300'
                    }`;
                categoriesContainer.appendChild(button);
            });

            renderFilteredProducts();
        }

        // Render Filtered Products in Categories Page
        function renderFilteredProducts() {
            const productsContainer = document.getElementById('filtered-products-container');
            if (!productsContainer) {
                console.error("Error: Element with ID 'filtered-products-container' not found.");
                return;
            }
            productsContainer.innerHTML = '';

            const filteredProducts = selectedCategory === 'Todos'
                ? products
                : products.filter(p => p.category === selectedCategory);

            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const div = document.createElement('div');
                    div.className = "bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer group";
                    div.onclick = () => navigateTo('product-detail', product);
                    div.innerHTML = `
                        <img
                            src="${product.imageUrl}"
                            alt="Image of ${product.name}"
                            class="w-full h-72 object-cover object-center rounded-t-xl"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x500/374151/D1D5DB?text=Imagen+No+Disponible';"
                        />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition duration-300">
                                ${product.name}
                            </h3>
                            <p class="text-gray-400 mb-3 line-clamp-2">${product.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-red-500">$${product.price}</span>
                                <button
                                    onclick="event.stopPropagation(); navigateTo('product-detail', ${JSON.stringify(product).replace(/"/g, '&quot;')});"
                                    class="bg-red-600 text-white px-5 py-2 rounded-full text-lg font-medium hover:bg-red-700 transition duration-300 transform hover:scale-105"
                                >
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    `;
                    productsContainer.appendChild(div);
                });
            } else {
                productsContainer.innerHTML = `
                    <p class="col-span-full text-center text-xl text-gray-400 py-10">No se encontraron productos en esta categoría.</p>
                `;
            }
        }

        // Render Product Detail Page
        function renderProductDetailPage() {
            const detailContainer = document.getElementById('product-detail-content');
            if (!detailContainer) {
                console.error("Error: Element with ID 'product-detail-content' not found.");
                return;
            }
            if (!selectedProduct) {
                detailContainer.innerHTML = `
                    <div class="text-center w-full">
                        <h2 class="text-4xl font-bold text-white mb-4">Producto no encontrado</h2>
                        <p class="text-xl text-gray-400 mb-8">Por favor, regresa a las categorías para explorar.</p>
                        <button
                            onclick="navigateTo('categories')"
                            class="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-red-700 transition duration-300 transform hover:scale-105"
                        >
                            Ir a Categorías
                        </button>
                    </div>
                `;
                return;
            }

            detailContainer.innerHTML = `
                <div class="md:w-1/2 flex justify-center items-center">
                    <img
                        src="${selectedProduct.imageUrl}"
                        alt="Image of ${selectedProduct.name}"
                        class="w-full max-w-lg h-auto rounded-lg shadow-md object-cover object-center"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x750/374151/D1D5DB?text=Imagen+No+Disponible';"
                    />
                </div>
                <div class="md:w-1/2">
                    <span class="text-sm font-semibold text-gray-400 uppercase">${selectedProduct.category}</span>
                    <h1 class="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">${selectedProduct.name}</h1>
                    <p class="text-gray-300 text-lg mb-6 leading-relaxed">${selectedProduct.description}</p>

                    <div class="mb-6">
                        <span class="text-red-500 text-4xl font-extrabold">$${selectedProduct.price}</span>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-white mb-3">Detalles del Producto:</h3>
                        <ul class="list-disc list-inside text-gray-400 text-lg space-y-1">
                            ${selectedProduct.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>

                    <p class="text-gray-500 text-sm italic mt-8">
                        Este es un artículo de catálogo y no está disponible para compra directa en este sitio.
                    </p>
                </div>
            `;
        }

        // Custom Confirmation Modal Logic (can be in a separate file or inline as needed)
        let confirmCallback = null;

        function showCustomConfirm(message, callback) {
            const modal = document.getElementById('custom-confirm-modal');
            const msgElement = document.getElementById('custom-confirm-message');
            const yesBtn = document.getElementById('custom-confirm-yes');
            const noBtn = document.getElementById('custom-confirm-no');

            if (modal && msgElement && yesBtn && noBtn) {
                msgElement.textContent = message;
                confirmCallback = callback;
                modal.classList.remove('hidden');

                yesBtn.onclick = () => {
                    modal.classList.add('hidden');
                    if (confirmCallback) confirmCallback(true);
                };

                noBtn.onclick = () => {
                    modal.classList.add('hidden');
                    if (confirmCallback) confirmCallback(false);
                };
            } else {
                console.error("Custom confirm modal elements not found, falling back to native confirm.");
                if (window.confirm(message)) {
                    if (callback) callback(true);
                } else {
                    if (callback) callback(false);
                }
            }
        }

        // Admin Panel Functions (Functions called from HTML, logic handled by adminAccess.js)
        // These are global functions or are called by event listeners in the HTML.
        // Their implementations are in adminAccess.js, which is loaded as a separate script.

        function generateUniqueId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        function handleProductFormSubmit(event) {
            event.preventDefault();
            const productId = document.getElementById('product-id').value;
            const productCategory = document.getElementById('product-category').value;
            const productName = document.getElementById('product-name').value;
            const productDescription = document.getElementById('product-description').value;
            const productPrice = parseFloat(document.getElementById('product-price').value).toFixed(2);
            const productImageUrl = document.getElementById('product-image-url').value;
            const productDetailsRaw = document.getElementById('product-details').value;
            const productDetails = productDetailsRaw ? productDetailsRaw.split(';').map(d => d.trim()) : [];

            const productData = {
                category: productCategory,
                name: productName,
                description: productDescription,
                price: productPrice,
                imageUrl: productImageUrl,
                details: productDetails
            };

            if (productId) {
                // Editing existing product
                editProduct(productId, productData);
            } else {
                // Adding new product
                addProduct(productData);
            }
            clearProductForm();
            renderAdminProductList();
            saveProductsToLocalStorage(); // Save changes after add/edit
        }

        function addProduct(productData) {
            productData.id = generateUniqueId();
            products.push(productData);
        }

        function editProduct(id, updatedData) {
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedData, id: id }; // Ensure ID remains the same
            }
        }

        function deleteProduct(id) {
            showCustomConfirm('¿Estás seguro de que quieres eliminar este producto?', (result) => {
                if (result) {
                    products = products.filter(p => p.id !== id);
                    renderAdminProductList();
                    saveProductsToLocalStorage();
                }
            });
        }

        function populateProductForm(product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-image-url').value = product.imageUrl;
            document.getElementById('product-details').value = product.details.join('; ');
        }

        function clearProductForm() {
            document.getElementById('product-id').value = '';
            document.getElementById('product-category').value = '';
            document.getElementById('product-name').value = '';
            document.getElementById('product-description').value = '';
            document.getElementById('product-price').value = '';
            document.getElementById('product-image-url').value = '';
            document.getElementById('product-details').value = '';
        }

        function renderAdminProductList() {
            const productListContainer = document.getElementById('product-list-admin');
            if (!productListContainer) return;
            productListContainer.innerHTML = '';

            if (products.length === 0) {
                productListContainer.innerHTML = '<p class="col-span-full text-center text-gray-400">No hay productos para mostrar.</p>';
                return;
            }

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = "bg-gray-900 rounded-lg shadow-md p-4 flex flex-col";
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-40 object-cover object-center rounded-md mb-4" onerror="this.onerror=null;this.src='https://placehold.co/200x160/374151/D1D5DB?text=Imagen+No+Disponible';" />
                    <h4 class="text-xl font-semibold text-white mb-2">${product.name}</h4>
                    <p class="text-gray-400 text-sm mb-2">Categoría: ${product.category}</p>
                    <p class="text-red-400 font-bold mb-4">$${product.price}</p>
                    <div class="flex gap-2 mt-auto">
                        <button onclick="populateProductForm(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-full transition duration-300">Editar</button>
                        <button onclick="deleteProduct('${product.id}')" class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-full transition duration-300">Eliminar</button>
                    </div>
                `;
                productListContainer.appendChild(productCard);
            });
        }

        // Function to update the Account page UI based on login status
        function updateAccountUI() {
            const accountContentDiv = document.getElementById('account-content');
            if (!accountContentDiv) return;

            if (window.currentUser) {
                // User is logged in via Firebase
                accountContentDiv.innerHTML = `
                    <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-center max-w-lg w-full">
                        <h3 class="text-2xl font-semibold text-white mb-4">Bienvenido, ${window.currentUser.email}!</h3>
                        <p class="text-gray-300 mb-6">Has iniciado sesión con éxito.</p>
                        <button
                            onclick="handleLogout()"
                            class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                `;
            } else {
                // User is not logged in via Firebase
                accountContentDiv.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <!-- Login Section -->
                        <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-lg leading-relaxed text-gray-300">
                            <h3 class="text-2xl font-semibold text-white mb-4 text-center">Iniciar Sesión</h3>
                            <form onsubmit="handleLoginSubmit(event)">
                                <div class="mb-4">
                                    <label for="login-email" class="block text-gray-300 text-sm font-bold mb-2">
                                        Correo Electrónico:
                                    </label>
                                    <input
                                        type="email"
                                        id="login-email"
                                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                                <div class="mb-6">
                                    <label for="login-password" class="block text-gray-300 text-sm font-bold mb-2">
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        id="login-password"
                                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"
                                        placeholder="Tu contraseña"
                                        required
                                    />
                                </div>
                                <div class="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
                                    >
                                        Acceder
                                    </button>
                                </div>
                                <p id="login-message" class="text-red-400 text-center mt-4 hidden"></p>
                            </form>
                        </div>

                        <!-- Register Section -->
                        <div class="bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-lg leading-relaxed text-gray-300">
                            <h3 class="text-2xl font-semibold text-white mb-4 text-center">Registrarse</h3>
                            <form onsubmit="handleRegisterSubmit(event)">
                                <div class="mb-4">
                                    <label for="register-email" class="block text-gray-300 text-sm font-bold mb-2">
                                        Correo Electrónico:
                                    </label>
                                    <input
                                        type="email"
                                        id="register-email"
                                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                                <div class="mb-4">
                                    <label for="register-password" class="block text-gray-300 text-sm font-bold mb-2">
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        id="register-password"
                                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"
                                        placeholder="Crea una contraseña"
                                        required
                                    />
                                </div>
                                <div class="mb-6">
                                    <label for="register-confirm-password" class="block text-gray-300 text-sm font-bold mb-2">
                                        Confirmar Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        id="register-confirm-password"
                                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-700 text-white"
                                        placeholder="Confirma tu contraseña"
                                        required
                                    />
                                </div>
                                <div class="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
                                    >
                                        Registrarse
                                    </button>
                                </div>
                                <p id="register-message" class="text-red-400 text-center mt-4 hidden"></p>
                            </form>
                        </div>
                    </div>
                `;
            }
        }


        // Handle Account Form Submissions (Login and Register with Firebase)
        async function handleLoginSubmit(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginMessage = document.getElementById('login-message');

            if (!window.firebaseAuth || !window.authGlobal) {
                loginMessage.textContent = 'Error: Firebase no está inicializado. Por favor, recarga la página.';
                loginMessage.classList.remove('hidden');
                console.error("Firebase Auth is not initialized.");
                return;
            }

            try {
                await window.firebaseAuth.signInWithEmailAndPassword(window.authGlobal, email, password);
                loginMessage.textContent = '¡Inicio de sesión exitoso!';
                loginMessage.classList.remove('hidden', 'text-red-400');
                loginMessage.classList.add('text-green-400');
                // updateAccountUI will be called by onAuthStateChanged listener
            } catch (error) {
                console.error("Error logging in:", error);
                let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No hay usuario con ese correo electrónico.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Contraseña incorrecta.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico es inválido.';
                        break;
                    case 'auth/invalid-credential': // Generic error for bad credentials
                        errorMessage = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                        break;
                }
                loginMessage.textContent = errorMessage;
                loginMessage.classList.remove('hidden', 'text-green-400');
                loginMessage.classList.add('text-red-400');
            }
        }

        async function handleRegisterSubmit(event) {
            event.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const registerMessage = document.getElementById('register-message');

            if (password !== confirmPassword) {
                registerMessage.textContent = 'Las contraseñas no coinciden.';
                registerMessage.classList.remove('hidden', 'text-green-400');
                registerMessage.classList.add('text-red-400');
                return;
            }
            if (password.length < 6) {
                registerMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                registerMessage.classList.remove('hidden', 'text-green-400');
                registerMessage.classList.add('text-red-400');
                return;
            }

            if (!window.firebaseAuth || !window.authGlobal) {
                registerMessage.textContent = 'Error: Firebase no está inicializado. Por favor, recarga la página.';
                registerMessage.classList.remove('hidden', 'text-green-400');
                registerMessage.classList.add('text-red-400');
                console.error("Firebase Auth is not initialized.");
                return;
            }

            try {
                await window.firebaseAuth.createUserWithEmailAndPassword(window.authGlobal, email, password);
                registerMessage.textContent = '¡Registro exitoso! Has iniciado sesión automáticamente.';
                registerMessage.classList.remove('hidden', 'text-red-400');
                registerMessage.classList.add('text-green-400');
                // updateAccountUI will be called by onAuthStateChanged listener
            } catch (error) {
                console.error("Error registering:", error);
                let errorMessage = 'Error al registrarse.';
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este correo electrónico ya está en uso.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico es inválido.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'La contraseña es demasiado débil (debe tener al menos 6 caracteres).';
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                        break;
                }
                registerMessage.textContent = errorMessage;
                registerMessage.classList.remove('hidden', 'text-green-400');
                registerMessage.classList.add('text-red-400');
            }
        }

        async function handleLogout() {
            if (!window.firebaseAuth || !window.authGlobal) {
                console.error("Firebase Auth is not initialized for logout.");
                return;
            }
            try {
                await window.firebaseAuth.signOut(window.authGlobal);
                console.log("User signed out from Firebase.");
                // updateAccountUI will be called by onAuthStateChanged listener
                navigateTo('home'); // Optionally redirect after logout
            } catch (error) {
                console.error("Error signing out:", error);
                // Display error message if logout fails
                alert('Error al cerrar sesión: ' + error.message); // Use alert for simplicity here, custom modal for better UX
            }
        }

        // Mobile Menu Toggle Logic
        document.addEventListener('DOMContentLoaded', async () => {
            // Initialize Firebase first
            await window.initFirebaseAuth(); 

            loadProductsFromLocalStorage(); 
            
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const navbarMenu = document.getElementById('navbar-menu');
            const mobileMenuIconOpen = document.getElementById('mobile-menu-icon-open');
            const mobileMenuIconClose = document.getElementById('mobile-menu-icon-close');
            const carouselPrevBtn = document.getElementById('carousel-prev');
            const carouselNextBtn = document.getElementById('carousel-next');

            // Expose updateAdminNavVisibility globally
            window.updateAdminNavVisibility = function() {
                const adminNavItem = document.getElementById('admin-nav-item');
                if (adminNavItem) {
                    if (window.isAdminAuthenticated) {
                        adminNavItem.classList.remove('hidden');
                    } else {
                        adminNavItem.classList.add('hidden');
                    }
                }
            };

            if (mobileMenuButton) {
                mobileMenuButton.addEventListener('click', () => {
                    navbarMenu.classList.toggle('hidden');
                    mobileMenuIconOpen.classList.toggle('hidden');
                    mobileMenuIconClose.classList.toggle('hidden');
                });
            }

            if (carouselPrevBtn) {
                carouselPrevBtn.addEventListener('click', prevImage);
            }
            if (carouselNextBtn) {
                carouselNextBtn.addEventListener('click', nextImage);
            }

            const currentYearSpan = document.getElementById('current-year');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }

            renderFeaturedCategories();
            renderFeaturedProducts();
            renderCarousel(); // Initial render of the carousel
            updateAdminNavVisibility(); // Initial call to hide Admin button if not logged in
            navigateTo('home'); // Start on the home page, which will also start the carousel
        });
    </script>
</body>
</html>
