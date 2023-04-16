import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Startscreen from './components/startscreen/startscreen';

function App() {
  return (
    <div className="App">
      <Header />
      <Startscreen site="startscreen" />
    </div>
  );
}

export default App;
