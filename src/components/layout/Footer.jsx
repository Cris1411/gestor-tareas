import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-6 mt-auto border-t ${
      darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img src="/tareas.png" alt="Logo" className="w-5 h-5" />
              <span className="font-semibold">Gestor de Tareas</span>
            </div>
            <p className="text-sm">
              {new Date().getFullYear()} Todos los derechos reservados
            </p>
            <p className="text-sm mt-1">
              Desarrollado por{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Cristian Roberto Sanchez Canesin
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex gap-4">
              <a
                href="https://github.com/CristianSanchezCanesin"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 transition-colors ${
                  darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}
                title="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/cristian-sanchez-canesin"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 transition-colors ${
                  darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                }`}
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Versión 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
