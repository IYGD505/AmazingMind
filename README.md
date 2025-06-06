<meta name='viewport' content='width=device-width, initial-scale=1'/><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IYGD - Innovate Your Growth Digital</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
        // Simulated Lucide React icons for direct browser use without a build step.
        // In a real React project, you would import these from 'lucide-react'.
        const Home = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        const Briefcase = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
        const Users = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
        const DollarSign = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
        const Menu = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>;
        const X = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
        const Check = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>;
        // Icons for collapsible sections (ChevronDown and ChevronUp)
        const ChevronDown = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"></path></svg>;
        const ChevronUp = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 15-6-6-6 6"></path></svg>;
        // New icons for Contact Section
        const Mail = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
        const MapPin = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
        const Phone = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.35a18.78 18.78 0 0 0 6.14 6.14l.35-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
        const Facebook = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
        const Instagram = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
        const Linkedin = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
        // New Icon for Blog Section (Rss feed icon)
        const Rss = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>;


        // Main App Component
        function App() {
          const [activeSection, setActiveSection] = React.useState('home');
          const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

          // Tailwind CSS custom colors for gold
          const goldColor = 'text-amber-400';
          const goldBg = 'bg-amber-400';

          // Function to open WhatsApp chat with a pre-filled message
          const openWhatsAppChat = (message) => {
            const phoneNumber = '526568596503'; // WhatsApp phone number without '+'
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
          };

          // Navbar Component
          const Navbar = () => (
            <nav className="bg-black text-white p-4 shadow-lg sticky top-0 z-50">
              <div className="container mx-auto flex justify-between items-center flex-wrap">
                {/* Company Logo - now a button to redirect to home */}
                <button
                  onClick={() => { setActiveSection('home'); setIsMobileMenuOpen(false); }}
                  className="flex items-center text-2xl font-bold focus:outline-none hover:text-amber-400 transition-colors duration-300"
                >
                  <span className={goldColor}>IYGD</span>
                </button>

                {/* Mobile menu button - always visible in the sticky header */}
                <div className="md:hidden">
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                  </button>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex md:items-center md:space-x-8">
                  <li>
                    <button
                      onClick={() => setActiveSection('home')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'home' ? goldColor : ''}`}
                    >
                      <Home className="mr-2" size={20} /> Inicio
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('services')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'services' ? goldColor : ''}`}
                    >
                      <Briefcase className="mr-2" size={20} /> Servicios
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('members')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'members' ? goldColor : ''}`}
                    >
                      <Users className="mr-2" size={20} /> Área de Miembros
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('clients')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'clients' ? goldColor : ''}`}
                    >
                      <DollarSign className="mr-2" size={20} /> Área de Clientes
                    </button>
                  </li>
                   {/* Blog Link */}
                  <li>
                    <button
                      onClick={() => setActiveSection('blog')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'blog' ? goldColor : ''}`}
                    >
                      <Rss className="mr-2" size={20} /> Blog
                    </button>
                  </li>
                  {/* New Contact link */}
                  <li>
                    <button
                      onClick={() => setActiveSection('contact')}
                      className={`flex items-center hover:${goldColor} transition-colors duration-300 ${activeSection === 'contact' ? goldColor : ''}`}
                    >
                      <Mail className="mr-2" size={20} /> Contacto
                    </button>
                  </li>
                </ul>
              </div>

              {/* Slide-out Mobile Menu */}
              {isMobileMenuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicking outside
                ></div>
              )}
              <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex justify-end p-4">
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white focus:outline-none p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                    <X size={28} />
                  </button>
                </div>
                <ul className="flex flex-col p-4 space-y-6">
                  <li>
                    <button
                      onClick={() => { setActiveSection('home'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'home' ? goldColor : ''}`}
                    >
                      <Home className="mr-3" size={24} /> Inicio
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveSection('services'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'services' ? goldColor : ''}`}
                    >
                      <Briefcase className="mr-3" size={24} /> Servicios
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveSection('members'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'members' ? goldColor : ''}`}
                    >
                      <Users className="mr-3" size={24} /> Área de Miembros
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveSection('clients'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'clients' ? goldColor : ''}`}
                    >
                      <DollarSign className="mr-3" size={24} /> Área de Clientes
                    </button>
                  </li>
                   {/* Blog Link for mobile */}
                  <li>
                    <button
                      onClick={() => { setActiveSection('blog'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'blog' ? goldColor : ''}`}
                    >
                      <Rss className="mr-3" size={24} /> Blog
                    </button>
                  </li>
                  {/* New Contact link for mobile */}
                  <li>
                    <button
                      onClick={() => { setActiveSection('contact'); setIsMobileMenuOpen(false); }}
                      className={`flex items-center text-white text-xl hover:${goldColor} transition-colors duration-300 ${activeSection === 'contact' ? goldColor : ''}`}
                    >
                      <Mail className="mr-3" size={24} /> Contacto
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          );

          // Hero Section Component
          const HeroSection = () => (
            <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 md:py-32 text-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className={goldColor}>Innovamos</span> tu Crecimiento Digital
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                  En IYGD, creamos experiencias web impactantes y soluciones digitales que impulsan tu negocio hacia el éxito.
                </p>
                {/* Button to redirect to Client Area */}
                <button
                  onClick={() => setActiveSection('clients')}
                  className={`py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 ${goldBg} text-black hover:bg-amber-500 hover:scale-105`}
                >
                  Descubre Nuestros Servicios
                </button>
              </div>
            </section>
          );

          // Services Section Component
          const ServicesSection = () => (
            <section id="services" className="bg-white py-16 md:py-24 text-gray-800">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Nuestros <span className={goldColor}>Servicios</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Service Card 1 */}
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black mb-6 mx-auto">
                      <Briefcase className={goldColor} size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-center">Diseño y Desarrollo Web</h3>
                    <p className="text-gray-600 text-center">
                      Creamos sitios web modernos, responsivos y optimizados para ofrecer la mejor experiencia de usuario.
                    </p>
                  </div>
                  {/* Service Card 2 */}
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black mb-6 mx-auto">
                      <Users className={goldColor} size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-center">Marketing Digital</h3>
                    <p className="text-gray-600 text-center">
                      Estrategias de SEO, SEM y redes sociales para aumentar tu visibilidad y atraer más clientes.
                    </p>
                  </div>
                  {/* Service Card 3 */}
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black mb-6 mx-auto">
                      <DollarSign className={goldColor} size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-center">Consultoría y Estrategia</h3>
                    <p className="text-gray-600 text-center">
                      Asesoramiento experto para definir tu estrategia digital y alcanzar tus objetivos de negocio.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );

          // Members Area Component
          const MembersArea = () => {
            const [showRequirements, setShowRequirements] = React.useState(false);
            const [showContractDetails, setShowContractDetails] = React.useState(false);
            const [showDesignProcess, setShowDesignProcess] = React.useState(false);
            const [showSiteStructure, setShowSiteStructure] = React.useState(false);

            return (
              <section id="members-area" className="bg-gray-800 text-white py-16 md:py-24 text-center">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">Área de <span className={goldColor}>Miembros</span></h2>
                  <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Bienvenido al portal de capacitación exclusivo para los miembros de IYGD. Aquí encontrarás recursos, tutoriales y herramientas para tu desarrollo profesional.
                  </p>

                  {/* Collapsible Card for Requirements */}
                  <div className="mt-10 text-left max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl border-t-4 border-amber-400 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer">
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setShowRequirements(!showRequirements)}
                    >
                      <h3 className="text-2xl font-semibold text-amber-400">Requisitos para empezar a desarrollar</h3>
                      {showRequirements ? <ChevronUp className={goldColor} size={24} /> : <ChevronDown className={goldColor} size={24} />}
                    </div>
                    {showRequirements && (
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <ul className="list-none space-y-3 pl-0 text-gray-200">
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**1- Domina todas tus herramientas:** Asegúrate de tener un conocimiento profundo de las tecnologías y plataformas que utilizas.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**2- Vende recursos adicionales a clientes importantes:** Identifica oportunidades para ofrecer servicios o productos complementarios que aporten valor extra.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**3- No diversifiques:** Concéntrate en tu nicho y especialízate para ser el mejor en lo que haces.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**4- Optimiza tu proceso:** Busca constantemente formas de mejorar la eficiencia y la calidad de tu trabajo.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**5- Véndele a los ricos:** Dirige tus esfuerzos de marketing y ventas a clientes con mayor capacidad de inversión.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Card for Contract Details */}
                  <div className="mt-8 text-left max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl border-t-4 border-amber-400 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer">
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setShowContractDetails(!showContractDetails)}
                    >
                      <h3 className="text-2xl font-semibold text-amber-400">¿Qué debe incluir el contrato?</h3>
                      {showContractDetails ? <ChevronUp className={goldColor} size={24} /> : <ChevronDown className={goldColor} size={24} />}
                    </div>
                    {showContractDetails && (
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <p className="text-md text-gray-200 mb-6">
                          Un contrato bien definido es la base de cualquier proyecto exitoso. Asegúrate de que tu acuerdo incluya los siguientes puntos clave:
                        </p>
                        <ul className="list-none space-y-3 pl-0 text-gray-200">
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**1- Objeto del contrato:** Define claramente qué se va a hacer.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**2- Alcance del proyecto:** Detalla las funcionalidades y entregables específicos.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**3- Cronograma de entregas:** Establece fechas límite y fases del proyecto.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**4- Costos y métodos de pago:** Especifica el precio total, plazos y formas de pago.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**5- Derechos de propiedad intelectual:** Aclara quién posee el código y los diseños.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**6- Política de modificaciones y revisión:** Cómo se gestionarán los cambios y las revisiones.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**7- Confidencialidad:** Acuerdos para proteger la información sensible.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**8- Responsabilidad de ambas partes:** Roles y obligaciones de cada involucrado.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**9- Limitación de responsabilidad:** Define los límites de la responsabilidad de cada parte.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**10- Cláusula de conclusión:** Condiciones para finalizar el contrato.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**11- Resoluciones de problemas:** Proceso para abordar disputas o inconvenientes.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Card for Design Process */}
                  <div className="mt-8 text-left max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl border-t-4 border-amber-400 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer">
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setShowDesignProcess(!showDesignProcess)}
                    >
                      <h3 className="text-2xl font-semibold text-amber-400">Proceso de diseño</h3>
                      {showDesignProcess ? <ChevronUp className={goldColor} size={24} /> : <ChevronDown className={goldColor} size={24} />}
                    </div>
                    {showDesignProcess && (
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <ul className="list-none space-y-3 pl-0 text-gray-200">
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**1- Investigar competencia e industria antes del desarrollo:** Comprende el mercado y las tendencias.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**2- Inspírate pero no robes, copies y pegues:** Crea diseños originales y adaptados.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**3- Crea wireframes o bocetos:** Planifica la estructura y el flujo de la interfaz.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**4- Desarrollar diseño visual:** Aplica colores, tipografías e imágenes para una estética atractiva.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**5- Presentar al cliente:** Obtén retroalimentación y aprobación en cada etapa.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**6- Entorno de pruebas:** Asegura la funcionalidad y compatibilidad en diferentes dispositivos.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**7- Totalmente responsive:** Garantiza que el diseño se adapte a cualquier tamaño de pantalla.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**8- Aprobación del cliente:** Confirma la satisfacción final antes de la implementación.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**9- Implementación del hosting:** Publica el sitio en un servidor seguro y confiable.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**10- Capacitación al cliente:** Enseña al cliente a gestionar y actualizar su sitio.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**11- Entregar en tiempo y forma cada proyecto:** Cumple con los plazos acordados.</span>
                          </li>
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**12- 100% transparencia:** Mantén una comunicación abierta y honesta durante todo el proceso.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Card for Site Structure */}
                  <div className="mt-8 text-left max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl border-t-4 border-amber-400 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer">
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setShowSiteStructure(!showSiteStructure)}
                    >
                      <h3 className="text-2xl font-semibold text-amber-400">Estructura de los sitios</h3>
                      {showSiteStructure ? <ChevronUp className={goldColor} size={24} /> : <ChevronDown className={goldColor} size={24} />}
                    </div>
                    {showSiteStructure && (
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <ul className="list-none space-y-3 pl-0 text-gray-200">
                          <li className="flex items-start">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**1- Inicio:**</span>
                            <ul className="list-disc list-inside ml-6 text-gray-300">
                              <li>Hero (sección principal con imagen/video y mensaje clave)</li>
                              <li>Breve descripción de la empresa</li>
                              <li>Servicios (en 3 columnas)</li>
                              <li>Frase importante o propuesta de valor</li>
                              <li>Artículos recientes (en 3 columnas)</li>
                              <li>Testimonios de clientes</li>
                              <li>Sección de suscripción a newsletter, etc.</li>
                            </ul>
                          </li>
                          <li className="flex items-start mt-3">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**2- Nosotros:**</span>
                            <ul className="list-disc list-inside ml-6 text-gray-300">
                              <li>Historia de la empresa</li>
                              <li>Imagen del equipo</li>
                              <li>Llamada a la acción (CTA), etc.</li>
                            </ul>
                          </li>
                          <li className="flex items-start mt-3">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**3- Servicios:**</span>
                            <ul className="list-disc list-inside ml-6 text-gray-300">
                              <li>Detalle del servicio 1</li>
                              <li>Detalle del servicio 2</li>
                              <li>Detalle del servicio 3, etc.</li>
                            </ul>
                          </li>
                          <li className="flex items-start mt-3">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**4- Productos:**</span>
                            <ul className="list-disc list-inside ml-6 text-gray-300">
                              <li>Información del producto 1</li>
                              <li>Información del producto 2</li>
                              <li>Información del producto 3, etc.</li>
                            </ul>
                          </li>
                          <li className="flex items-start mt-3">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**5- Blog**</span>
                          </li>
                          <li className="flex items-start mt-3">
                            <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                            <span>**6- Contacto:**</span>
                            <ul className="list-disc list-inside ml-6 text-gray-300">
                              <li>Formulario de contacto</li>
                              <li>Mapa de ubicación</li>
                              <li>Datos de contacto (teléfono, email, dirección), etc.</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              </section>
            );
          };

          // Client Area Component
          const ClientArea = () => (
            <section id="client-area" className="bg-white py-16 md:py-24 text-gray-800 text-center">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Área de <span className={goldColor}>Clientes</span></h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                  Aquí puedes cotizar nuestros servicios, explorar nuestros paquetes de precios y ver ejemplos de proyectos anteriores.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-10"> {/* Adjusted grid to 4 columns on extra large screens */}
                  {/* Pricing Card: Tu Primera Página */}
                  <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md border-t-4 border-amber-400 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4">Tu Primera Página</h3>
                    <p className="text-4xl font-bold mb-2 flex items-center justify-center">
                      <span className={goldColor}>$5,000 - $10,000</span>
                      <span className="text-lg ml-2">MXN</span>
                    </p>
                    <p className="text-sm mb-6 text-gray-400">Ideal para profesionales independientes</p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Diseño personalizado</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">3-5 secciones</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Responsivo (móvil/tablet/PC)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Formulario de contacto</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">SEO básico</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Portafolio personal</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Presentación de negocio</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-400 mb-6">
                      El costo varía según: cantidad de secciones, diseños personalizados y funciones especiales.
                    </p>
                    <button
                      onClick={() => openWhatsAppChat("Hola, me gustaría cotizar el servicio 'Tu Primera Página' con un precio de $5,000 - $10,000 MXN.")}
                      className={`py-2 px-6 rounded-full font-semibold ${goldBg} text-black hover:bg-amber-500 transition-colors duration-300`}
                    >
                      Cotizar Ahora
                    </button>
                  </div>

                  {/* Pricing Card: Sitio Profesional */}
                  <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md border-t-4 border-amber-400 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative">
                    <span className="absolute top-0 right-0 -mt-4 -mr-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase transform rotate-6">
                      Popular
                    </span>
                    <h3 className="text-2xl font-semibold mb-4">Sitio Profesional</h3>
                    <p className="text-4xl font-bold mb-2 flex items-center justify-center">
                      <span className={goldColor}>$15,000 - $25,000</span>
                      <span className="text-lg ml-2">MXN</span>
                    </p>
                    <p className="text-sm mb-6 text-gray-400">Perfecto para negocios establecidos</p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Diseño premium</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">6-8 secciones</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Integración con redes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Galería multimedia</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">SEO avanzado</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Blog integrado</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Soporte prioritario</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-400 mb-6">
                      Incluye funciones avanzadas y mayor personalización.
                    </p>
                    <button
                      onClick={() => openWhatsAppChat("Hola, me gustaría cotizar el servicio 'Sitio Profesional' con un precio de $15,000 - $25,000 MXN.")}
                      className={`py-2 px-6 rounded-full font-semibold ${goldBg} text-black hover:bg-amber-500 transition-colors duration-300`}
                    >
                      Cotizar Ahora
                    </button>
                  </div>

                  {/* New Pricing Card: Solución Empresarial */}
                  <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md border-t-4 border-amber-400 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4">Solución Empresarial</h3>
                    <p className="text-4xl font-bold mb-2 flex items-center justify-center">
                      <span className={goldColor}>$35,000+</span>
                      <span className="text-lg ml-2">MXN</span>
                    </p>
                    <p className="text-sm mb-6 text-gray-400">Para necesidades complejas</p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Diseño exclusivo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Secciones ilimitadas</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Sistema de reservas</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Integración de pago</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Panel administrativo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                        <span>Desarrollo a medida</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                        <span>Soporte 24/7</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-400 mb-6">
                      Solución completa para empresas con necesidades específicas.
                    </p>
                    <button
                      onClick={() => openWhatsAppChat("Hola, me gustaría cotizar el servicio 'Solución Empresarial' con un precio de $35,000+ MXN.")}
                      className={`py-2 px-6 rounded-full font-semibold ${goldBg} text-black hover:bg-amber-500 transition-colors duration-300`}
                    >
                      Cotizar Ahora
                    </button>
                  </div>

                  {/* New Pricing Card: LMS Avanzado */}
                  <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md border-t-4 border-amber-400 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h3 className="text-2xl font-semibold mb-4">LMS Avanzado</h3>
                    <p className="text-4xl font-bold mb-2 flex items-center justify-center">
                      <span className={goldColor}>$40,000+</span>
                      <span className="text-lg ml-2">MXN</span>
                    </p>
                    <p className="text-sm mb-6 text-gray-400">Sistema avanzado para cursos para escuelas o cursos</p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Personalización avanzada</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Integración de IA para tutoría</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Automatización de evaluación</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Analítica educativa en profundidad</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={goldColor} size={20} />
                        <span className="ml-3">Panel administrativo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                        <span>Expedir certificados verificables al finalizar los módulos</span>
                      </li>
                      <li className="flex items-center">
                        <Check className={`${goldColor} mr-3 mt-1 flex-shrink-0`} size={20} />
                        <span>Soporte 24/7</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => openWhatsAppChat("Hola, me gustaría cotizar el servicio 'LMS Avanzado' con un precio de $40,000+ MXN.")}
                      className={`py-2 px-6 rounded-full font-semibold ${goldBg} text-black hover:bg-amber-500 transition-colors duration-300`}
                    >
                      Cotizar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );

          // New Blog Section Component
          const BlogSection = () => {
            const blogPosts = [
              {
                id: 1,
                title: '5 Estrategias Clave para un SEO Exitoso en 2024',
                date: '15 de Mayo, 2025',
                author: 'Equipo IYGD',
                excerpt: 'Descubre las tácticas más efectivas para mejorar tu posicionamiento en buscadores y atraer más tráfico orgánico a tu sitio web este año...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=SEO+2024',
                link: '#' // In a real blog, this would be a link to the full article
              },
              {
                id: 2,
                title: 'Tendencias de Diseño Web que no puedes ignorar',
                date: '10 de Mayo, 2025',
                author: 'Andrea M.',
                excerpt: 'Desde el minimalismo hasta la interactividad, te contamos qué está marcando la pauta en el diseño web para crear experiencias memorables...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=Diseño+Web',
                link: '#'
              },
              {
                id: 3,
                title: 'Cómo el Marketing de Contenidos Impulsa tu Marca',
                date: '05 de Mayo, 2025',
                author: 'Carlos G.',
                excerpt: 'Aprende a crear contenido de valor que resuene con tu audiencia, construya autoridad y convierta a tus visitantes en clientes leales...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=Marketing+Contenido',
                link: '#'
              },
               {
                id: 4,
                title: 'Inteligencia Artificial en el Desarrollo Web: ¿El Futuro?',
                date: '28 de Abril, 2025',
                author: 'Equipo IYGD',
                excerpt: 'Exploramos cómo la IA está transformando el desarrollo web, desde la automatización de tareas hasta la personalización de la experiencia del usuario...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=IA+Web',
                link: '#'
              },
              {
                id: 5,
                title: 'La Importancia de la Seguridad Web para tu Negocio',
                date: '20 de Abril, 2025',
                author: 'Laura S.',
                excerpt: 'Descubre por qué la seguridad de tu sitio web es crucial y las mejores prácticas para proteger tus datos y los de tus usuarios...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=Seguridad+Web',
                link: '#'
              },
              {
                id: 6,
                title: 'Transformando tu Negocio con Soluciones E-commerce',
                date: '12 de Abril, 2025',
                author: 'Pedro R.',
                excerpt: 'Guía completa para establecer una tienda online exitosa, desde la elección de la plataforma hasta las estrategias de venta...',
                imageUrl: 'https://placehold.co/400x250/222222/FFF?text=E-commerce',
                link: '#'
              },
            ];

            return (
              <section id="blog" className="bg-gray-800 text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Nuestro <span className={goldColor}>Blog</span></h2>
                  <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300">
                    Mantente al día con las últimas tendencias, consejos y noticias sobre desarrollo web, marketing digital y tecnología.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.map(post => (
                      <div key={post.id} className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border-t-4 border-amber-400 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 leading-tight">{post.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">
                            Por <span className="font-medium text-amber-400">{post.author}</span> el {post.date}
                          </p>
                          <p className="text-gray-300 text-base mb-4">{post.excerpt}</p>
                          <a href={post.link} className="inline-block text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-300">
                            Leer más &rarr;
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optional: Call to action for more blog posts */}
                  <div className="text-center mt-16">
                    <button
                      onClick={() => alert('¡Pronto tendremos más artículos para ti!')} // Replace with actual navigation to a "all posts" page
                      className={`py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 ${goldBg} text-black hover:bg-amber-500 hover:scale-105`}
                    >
                      Ver Todos los Artículos
                    </button>
                  </div>
                </div>
              </section>
            );
          };


          // New Contact Section Component
          const ContactSection = () => {
            const [formData, setFormData] = React.useState({
              name: '',
              email: '',
              message: ''
            });

            const handleChange = (e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            };

            const handleSubmit = (e) => {
              e.preventDefault();
              // In a real application, you would send this data to a backend service
              // For now, we'll just log it and provide a success message.
              console.log('Formulario de contacto enviado:', formData);
              alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'); // Using alert for demo, replace with custom modal in production
              setFormData({ name: '', email: '', message: '' }); // Clear form
            };

            return (
              <section id="contact" className="bg-gray-900 text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Contáctanos</h2>
                  <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-12 text-gray-300">
                    Estamos listos para ayudarte a llevar tu negocio al siguiente nivel. Envíanos un mensaje o encuéntranos.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-amber-400">
                      <h3 className="text-2xl font-semibold mb-6 text-amber-400">Envíanos un Mensaje</h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Nombre</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-400 transition-colors duration-300"
                            placeholder="Tu nombre completo"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Correo Electrónico</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-400 transition-colors duration-300"
                            placeholder="tu.correo@ejemplo.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Mensaje</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-400 transition-colors duration-300"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-full font-semibold text-lg ${goldBg} text-black hover:bg-amber-500 transition-colors duration-300`}
                        >
                          Enviar Mensaje
                        </button>
                      </form>
                    </div>

                    {/* Contact Info and Map */}
                    <div className="flex flex-col space-y-8">
                      {/* Contact Details */}
                      <div className="bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-amber-400">
                        <h3 className="text-2xl font-semibold mb-6 text-amber-400">Nuestra Información</h3>
                        <div className="space-y-4 text-gray-300">
                          <p className="flex items-center">
                            <Phone className={`${goldColor} mr-3`} size={24} />
                            <span>+52 656 859 6503</span>
                          </p>
                          <p className="flex items-center">
                            <Mail className={`${goldColor} mr-3`} size={24} />
                            <span>contacto@iygd.com</span> {/* Placeholder email */}
                          </p>
                          <p className="flex items-start">
                            <MapPin className={`${goldColor} mr-3 mt-1`} size={24} />
                            <span>Av. de la Raza 123, Ciudad Juárez, Chihuahua, México</span> {/* Placeholder address */}
                          </p>
                        </div>
                        <div className="mt-8">
                          <h4 className="text-xl font-semibold mb-4 text-amber-400">Síguenos</h4>
                          <div className="flex space-x-6 justify-center lg:justify-start">
                            <a href="https://facebook.com/iygd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                              <Facebook size={32} />
                            </a>
                            <a href="https://instagram.com/iygd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                              <Instagram size={32} />
                            </a>
                            <a href="https://linkedin.com/company/iygd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                              <Linkedin size={32} />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Map Embed (Placeholder) */}
                      <div className="bg-gray-800 p-4 rounded-lg shadow-xl border-t-4 border-amber-400 flex-grow">
                        <h3 className="text-2xl font-semibold mb-4 text-center text-amber-400">Nuestra Ubicación</h3>
                        <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden">
                          {/* Placeholder image for the map */}
                          <img
                            src="https://placehold.co/600x400/333333/FFFFFF?text=Mapa+de+Ubicación"
                            alt="Mapa de ubicación de IYGD"
                            className="w-full h-full object-cover"
                          />
                          {/* Optional: Link to Google Maps */}
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Av.+de+la+Raza+123,+Ciudad+Juárez,+Chihuahua,+México"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
                          >
                            Ver en Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          };


          // Footer Component
          const Footer = () => (
            <footer className="bg-black text-white py-8 text-center">
              <div className="container mx-auto px-4">
                <p className="text-sm md:text-base">
                  © {new Date().getFullYear()} <span className={goldColor}>IYGD</span>. Todos los derechos reservados.
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="hover:text-amber-400 transition-colors duration-300">Privacidad</a>
                  <span className="text-gray-600">|</span>
                  <a href="#" className="hover:text-amber-400 transition-colors duration-300">Términos</a>
                </div>
              </div>
            </footer>
          );

          // Render the appropriate section based on activeSection state
          const renderSection = () => {
            switch (activeSection) {
              case 'home':
                return (
                  <>
                    <HeroSection />
                    <ServicesSection />
                  </>
                );
              case 'services':
                return <ServicesSection />;
              case 'members':
                return <MembersArea />;
              case 'clients':
                return <ClientArea />;
              case 'blog': // New case for BlogSection
                return <BlogSection />;
              case 'contact':
                return <ContactSection />;
              default:
                return (
                  <>
                    <HeroSection />
                    <ServicesSection />
                  </>
                );
            }
          };

          return (
            <div className="min-h-screen flex flex-col font-sans overflow-x-hidden"> {/* Added overflow-x-hidden here */}
              <Navbar />
              <main className="flex-grow">
                {renderSection()}
              </main>
              <Footer />
            </div>
          );
        }

        // Render the App component into the root div
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
    </script>
</body>
</html>

