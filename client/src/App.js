import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'; 

function App() {
  //setting up state for input values
  const [name, setName] = useState('');
  const [universe, setUniverse] = useState('');
  const [attack, setAttack] = useState(0);
  const [defence, setDefence] = useState(0);
  const [level, setLevel] = useState(0);
  const [newHeroName, setNewHeroName] = useState('');
  const [heroesArray, setHeroesArray] = useState([]);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {  
      name, 
      universe, 
      attack, 
      defence, 
      level 
    });
  };

  const renameHero = (id) => {
    Axios.put("http://localhost:3001/update", {
      id, 
      newHeroName
    });
  };

  const deleteHero = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setHeroesArray(response.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>Add your SuperHero's</h1>

      <label>Name: </label>
      <input 
        type="text" 
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label>Universe: </label>
      <input 
        type="text" 
        onChange={(e) => {
          setUniverse(e.target.value);
        }}
      />
      
      <label>Attack: </label>
      <input 
        type="number" 
        onChange={(e) => {
          setAttack(e.target.value);
        }}
      />
      
      <label>Defence: </label>
      <input 
        type="number" 
        onChange={(e) => {
          setDefence(e.target.value);
        }}  
      />
      
      <label>Level: </label>
      <input 
        type="number" 
        onChange={(e) => {
          setLevel(e.target.value);
        }}
      />

      <button onClick={addToList}>Add to list</button>

      <h3>SuperHero List:</h3>

      {heroesArray.map((val, key) => {
        return (
          <div key={key} className="heroContainer"> 
            <h2 className="name">Name: {val.name}</h2> 
            <h4 className="universe">Universe: {val.universe}</h4>
            <h4 className="attack">Attack: {val.attack}</h4>
            <h4 className="defence">Defence: {val.defence}</h4>
            <h4 className="level">Level: {val.level}</h4>
            
            <input 
              type="text" 
              placeholder='Rename...' 
              onChange={(e) => {
                setNewHeroName(e.target.value);
              }}
            /> 
            <button className='btn' onClick={() => renameHero(val._id)}>update</button>
            <button className="btn" onClick={() => deleteHero(val._id)}>remove</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
