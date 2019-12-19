import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';



const App = () => {

  const APP_ID = "b6605271";
  const APP_KEY = "ab33784f98db1504cfa6858a2b42712b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('burger');
  useEffect(() => {

    getRecipes();
    console.log(' Effected');
    console.log('save our fetching data');
  }, [query]);


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    console.log('***************');
    console.log(data.hits);
    setRecipes(data.hits);


  };


  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
    // setSearch('');
  }


  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <h1 className="header"> COMO ESTAS DevEd</h1>
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>

  )
}



export default App;
