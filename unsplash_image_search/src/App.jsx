import React, { useRef } from "react";
import { Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {

  const searchInput = useRef(null); //valor da pesquisa

  const handleSearch = (event) => { //aqui vai ser o metodo para pesquisar

    event.preventDefault();

    console.log(searchInput.current.value);

  };

  const handleSelection = (selection) => { //esse metodo vai fazer o valor de selection ir pra barra de pesquisa

    searchInput.current.value = selection;

  };



  return (

    <div className='container'>

      <h1 className='title'>Image Search</h1>

      <div className='search-section'>

        <Form onSubmit={handleSearch}>

          <Form.Control

            type='search'

            placeholder='Digite algo para pesquisar...'

            className='search-input'

            ref={searchInput}

          />

        </Form>

      </div>

      <div className='filters'>

        <div onClick={() => handleSelection('nature')}>Nature</div>

        <div onClick={() => handleSelection('birds')}>Birds</div>

        <div onClick={() => handleSelection('cats')}>Cats</div>

        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>

    </div>

  );

};

export default App;