import React, { useRef, useState, useEffect, useCallback } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './index.css';

const IMAGES_PER_PAGE = 20;
const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {

  const searchInput = useRef(null); //valor da pesquisa

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchImages = useCallback(async () => {

    try {

     

        setErrorMsg('');

        setLoading(true);

        const { data } = await axios.get(

          `${API_URL}?query=${searchInput.current.value

          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY

          }`

        );

        setImages(data.results);

        setTotalPages(data.total_pages);

        setLoading(false);

      

    } catch (error) {

      setErrorMsg('Erro ao buscar imagens');

      console.log(error);

      setLoading(false);

    }

  }, [page]);

  const handleSearch = (event) => { //aqui vai ser o metodo para pesquisar

    event.preventDefault();
    if (searchInput.current.value) {
      resetSearch();
    }else{
      setErrorMsg('Insira algo para pesquisar');
    }

    

  };

  const resetSearch = () => {

    setPage(1);

    fetchImages();

  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSelection = (selection) => { //esse metodo vai fazer o valor de selection ir pra barra de pesquisa

    searchInput.current.value = selection;
    resetSearch();

  };



  return (

    <div className='container'>

      <h1 className='title'>Image Search</h1>

      {errorMsg && <p className='error'>{errorMsg}</p>}

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

      {loading ? (

        <p className='loading'>Loading...</p>

      ) : (

        <>

          <div className='images'>
            {images.map((image) => { //mapeia as imagens criando um img para cada uma delas
              return (
                <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
              );
            })}
          </div>

          <div className='buttons'>

            {page > 1 && <Button onClick={() => setPage(page - 1)} >Previous</Button>}

            {page < totalPages && <Button onClick={() => setPage(page + 1)}  >Next</Button>}

          </div>

        </>

      )}
    </div>


  );

};

export default App;