import { useEffect, useState } from 'react';
import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

import MovieProps from '../types/MovieProps'
import GenreResponseProps from '../types/GenreResponseProps'

export function SideBar({selectedGenreId, handleClickButton}) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}