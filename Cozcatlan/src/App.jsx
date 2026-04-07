import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

// Importación de pantallas (Screens)
// Asegúrate de que las rutas coincidan con tu estructura de carpetas
import Home from './screens/Home';


// Importación de componentes globales (opcional por ahora)
// import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      {/* El Navbar iría aquí para que aparezca en todas las páginas */}
      {/* <Navbar /> */}

      <Routes>
        {/* Ruta principal: Home */}
        <Route path="/" element={<Home />} />
        
        {/* Opcional: Ruta para manejar errores 404 */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;