import logo from './logo.svg';
import './App.css';
import Api from './comp/Api';
import Pruebas from './comp/Pruebas';
import BarraNav from './comp/BarraNav';
import ApiDiez from './comp/ApiDiez';

function App() {
  return (
    <div className="App">
      <BarraNav />
      <Api/>
      <ApiDiez />
    </div>
  );
}

export default App;
