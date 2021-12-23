import React, { useContext } from 'react';
import PlanetsContext from '../PlanetsContext';

export default function Table() {
  const { data, addFilterByName } = useContext(PlanetsContext);
  // data é onde o requisito pede para guardar a lista de planetas recebida na requisição
  const renderPlanet = (planet) => (
    <tr key={ planet.url }>
      <td>{ planet.name }</td>
      <td>{ planet.rotation_period }</td>
      <td>{ planet.orbital_period }</td>
      <td>{ planet.diameter }</td>
      <td>{ planet.climate }</td>
      <td>{ planet.gravity }</td>
      <td>{ planet.terrain }</td>
      <td>{ planet.surface_water }</td>
      <td>{ planet.population }</td>
      <td>{ planet.films }</td>
      <td>{ planet.created }</td>
      <td>{ planet.edited }</td>
      <td>{ planet.url }</td>
    </tr>
  );

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (event) => addFilterByName(event.target.value) }
      />
      <section>
        <label htmlFor="column">
          Filtrar por:
          <select
            id="column"
            data-testid="column-filter"
            name="column"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          Comparar se é:
          <select
            id="comparison"
            data-testid="comparison-filter"
            name="comparison"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
        />
        <button type="button" data-testid="button-filter">Filtrar</button>
      </section>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data.map((planet) => renderPlanet(planet)) }
        </tbody>
      </table>
    </div>
  );
}
