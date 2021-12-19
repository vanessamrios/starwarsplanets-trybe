import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>Vanessa</div>
      <Table />
    </PlanetsProvider>
  );
}

// commit inicial

export default App;
