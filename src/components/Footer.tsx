import React from 'react';

export function Footer() {
  return (
    <footer className="text-center py-8 text-gray-600">
      <div className="max-w-md mx-auto px-4">
        <p className="font-display font-medium">
          © {new Date().getFullYear()} Tu Historia en Números
        </p>
        <p className="text-sm mt-2 text-gray-500">
          Creado con 💙 para contar historias a través de números
        </p>
      </div>
    </footer>
  );
}