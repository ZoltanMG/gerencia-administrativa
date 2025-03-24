import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Contratos from './components/contratos/contratos';
import Nav from './components/nav/nav';


function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/contratos'} element={<Contratos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
