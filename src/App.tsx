
import React from 'react';
import './App.css';
import ExstensionGrid from './features/grid-result/extension-grid.component';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Switch>
            <Route path='/' component={ExstensionGrid} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
