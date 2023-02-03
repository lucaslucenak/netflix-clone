import React, {useEffect, useState} from 'react';
import MovieRow from './components/movieRow/MovieRow';
import Tmdb from './Tmdb';
import './App.css';
import FeaturedMovie from './components/featuredMovie/FeaturedMovie';

const App = () => {

  const [movieList, setMovieList]  = useState([]);
  const [featuredMovieData, setFeaturedMovieData]  = useState(null);
  
  useEffect(() => {
    const loadAll = async () => {
      // Getting movies list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Getting featured data
      let originals = list.filter(x => x.slug === 'orignals');
      let randomNumber = Math.floor(Math.random() * (originals[0].items.results.lenght - 1));
      let chosenMovie = originals[0].items.results[randomNumber];
      let chosenMovieInfo = await Tmdb.getMovieInformation(chosenMovie.id, 'tv');
      setFeaturedMovieData(chosenMovieInfo);
    }

    loadAll();
  }, []);

  return (
    <div className='page'>

      {FeaturedMovie && <FeaturedMovie item={featuredMovieData} />}

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;