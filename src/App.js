import Configurator from './Configurator';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'center', height: '100px', backgroundColor: '#282c34', color: 'white', lineHeight: '100px', fontWeight: 'bold' }}>
        Car configurator with external json data
      </header>
      <Configurator />
    </div>
  );
}

export default App;
