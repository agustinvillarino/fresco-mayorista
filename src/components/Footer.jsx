import React from 'react';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  const footerLinkClasses = "hover:text-white cursor-pointer transition-colors duration-300 text-white";
  const socialIconContainerClasses = "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300";
  const socialIconTextClasses = "text-sm font-bold";

  return (
    <footer className="text-white py-8" style={{ backgroundColor: '#065a37' }}>
      <div className="w-full px-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="text-lg font-semibold mb-4 block text-white">Soporte</span>
          <ul className="space-y-2">
            <li><span className={footerLinkClasses}>Condiciones de compra</span></li>
            <li><span className={footerLinkClasses}>Políticas de envío</span></li>
            <li><span className={footerLinkClasses}>Preguntas frecuentes</span></li>
            <li><span className={footerLinkClasses}>Contáctanos</span></li>
          </ul>
        </div>

        <div className="space-y-0">
          <div className="flex justify-center md:justify-start">
            <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.postimg.cc/3wv0gX2Y/FRESCO-BLANCO.png" 
                alt="FRESCO Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed text-center md:text-left">
            Tu aliado #Fitness, contamos con amplia gama de productos saludables.
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 mt-12 pt-8 text-center text-white">
        <p>&copy; {new Date().getFullYear()} FRESCO. Todos los derechos reservados. Configurada por Agustín Villarino.</p>
      </div>
    </footer>
  );
};

export default Footer;