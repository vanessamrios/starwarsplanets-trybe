import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [numericValues, setNumericValues] = useState(null);
  // o valor inicial é null porque na função filterByNumeric a primeira condição se o objeto existe e é preciso que ele seja nulo para que ele já seja verdade.

  const addFilterByName = (value) => {
    setName(value);
  };

  const addFilterNumericValues = (value) => {
    setNumericValues(value);
  };

  const filterByName = (planet) => planet.name.includes(name);

  const filterByNumeric = (planet) => {
    if (!numericValues) {
      return true;
    }

    const columnValue = Number(planet[numericValues.column]);
    const inputValue = Number(numericValues.value);
    if (numericValues.comparison === 'maior que') {
      return columnValue > inputValue;
    }
    if (numericValues.comparison === 'menor que') {
      return columnValue < inputValue;
    }
    if (numericValues.comparison === 'igual a') {
      return columnValue === inputValue;
    }
  };

  const contextValue = {
    data: planets.filter((planet) => filterByName(planet) && filterByNumeric(planet)),
    filterByName: {
      name,
    },
    addFilterByName,
    addFilterNumericValues,
    filterByNumericValues: [
      numericValues,
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
