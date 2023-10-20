import './App.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import Inicio from './assets/components/Inicio';
import Demo from './assets/components/Demo';
import 'bootstrap/dist/css/bootstrap.css'
import Create from './assets/components/Create';
import Encuesta from './assets/components/Encuesta';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        {/* Routes will be rendered here */}
        <Routes>
          <Route path='/' index  element={<Inicio/>} />
          <Route path='/demo/:id'   element={<Demo/>} />
          <Route path='/new/:id'   element={<Create/>} />
          <Route path='/encuesta/:id'   element={<Encuesta/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
