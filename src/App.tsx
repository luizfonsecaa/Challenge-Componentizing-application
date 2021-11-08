import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import MovieProps from './types/MovieProps'
import GenreResponseProps from './types/GenreResponseProps'

import { api } from './services/api';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);


  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar  selectedGenreId={selectedGenreId}  handleClickButton={handleClickButton}/>
      <Content  movies={movies} selectedGenre={selectedGenre}/>
    </div>
  )
}