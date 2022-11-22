import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div style={{ marginBottom: '24px' }}>
          <div>主应用区域</div>
          <Link to="/app-react">子应用页面</Link>
        </div>
       
        <div id="container"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
