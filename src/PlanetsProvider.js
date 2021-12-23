import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');

  const addFilterByName = (value) => {
    setName(value);
  };

  const contextValue = {
    data: planets.filter((planet) => planet.name.includes(name)),
    filterByName: {
      name,
    },
    addFilterByName,
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  };

  useEffect(() => {
    async function responseApi() {
      const responsePlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await responsePlanets.json();
      setPlanets(results);
    }
    responseApi();
  }, [setPlanets]);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.shape(Object).isRequired,
};
