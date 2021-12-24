import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);

  const addFilterByName = (value) => {
    setName(value);
  };

  const addFilterNumericValues = (value) => {
    setFilters([...filters, value]);
  };

  const filterByName = (planet) => planet.name.includes(name);

  const filterByNumeric = (planet) => {
    if (!filters.length) {
      return true;
    }
    const lastFilter = filters[filters.length - 1];
    const columnValue = Number(planet[lastFilter.column]);
    const inputValue = Number(lastFilter.value);
    const comparisonValue = lastFilter.comparison;
    if (comparisonValue === 'maior que') {
      return columnValue > inputValue;
    }
    if (comparisonValue === 'menor que') {
      return columnValue < inputValue;
    }
    if (comparisonValue === 'igual a') {
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
    filterByNumericValues: filters,
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
