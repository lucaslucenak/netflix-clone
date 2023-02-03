import React, {useEffect, useState} from 'react';
import MovieRow from './components/movieRow/MovieRow';
import Tmdb from './Tmdb';

const App = () => {

  const [movieList, setMovieList]  = useState([]);
  
  useEffect(() => {
    const loadAll = async () => {
      // Getting movies list
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return (
    <div className='page'>
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;