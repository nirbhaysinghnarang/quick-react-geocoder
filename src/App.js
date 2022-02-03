import React, {useState} from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [coords,setCoords] = useState({});
  const api = {
    key:"AIzaSyB-jZ-fJsZG_GPiVCAMPv12s7lcfZUFtQE",
    baseURL:"https://maps.googleapis.com/maps/api/geocode/json?address="
  }

  const cleanUp = (num) => {
    return Math.round(num * 100) / 100
  }


  const search = evt => {
    if(evt.key==="Enter"){
      console.log("Search init.")
      const finalURL = api.baseURL+sanitiseInput(query)+"&key="+api.key;
      fetch(finalURL)
       .then(res => res.json())
       .then(
         result => {
           console.log(result.results)
           setCoords(result.results);
           setQuery('');
       })
     }
  }

  const sanitiseInput = (input) => {
    return input.replace(" ", "+");
  }

  return (
    <div className="App">
    {console.log(coords)}
      <main>
        <h1 className="title"> Quick React Geocoder </h1>
        <input type="text" className="place-form" placeholder="Search for an address..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
        {(Object.keys(coords).length !== 0) ? (
          <div>
            <h3 className="coords"> {cleanUp(coords[0].geometry.location.lat)}, {cleanUp(coords[0].geometry.location.lng)} </h3>
            <h4 className = "address"> {coords[0].formatted_address} </h4>
          </div>
        ) : (
            <h3 className="coords"> Enter address above </h3>
        )
        }
      </main>
    </div>
  );
}

export default App;
