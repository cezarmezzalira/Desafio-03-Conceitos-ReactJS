import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([])
  
  async function  handleAddRepository() {
    await api.post('repositories', {
      title: "Desafio 03",
      url: "https://github.com/cezarmzz/Desafio-02-Conceitos-do-Nodejs",
      techs: ["Node.js", "TypeScript"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });

  }; 

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(
      repositories.filter(repository => repository.id !== id));
  }; 

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

 

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
       ))}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
