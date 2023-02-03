import React, {useEffect, useState} from 'react';
import MovieRow from './components/movieRow/MovieRow';
import Tmdb from './Tmdb';
import './App.css';

const App = () => {

  const [movieList, setMovieList]  = useState([]);
  const [featuredData, setFaturedData]  = useState(null);
  
  useEffect(() => {
    const loadAll = async () => {
      // Getting movies list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Getting featured data
      let originals = list.filter(x => x.slug === 'orignals');
      let randomNumber = Math.floor(Math.random() * (originals[0].items.results.lenght - 1));
      setFaturedData(originals[0].items.results[randomNumber]);
    }

    loadAll();
  }, []);

  return (
    <div className='page'>

      {featuredData && <featuredData item={featuredData} />}

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;