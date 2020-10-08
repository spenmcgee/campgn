import React, { useState, useEffect } from 'react';
import placeholder from './img/placeholder.svg';
import { useParams } from "react-router-dom";

const API_ROOT_URL = process.env.REACT_APP_API_ROOT_URL;

function buildConfig(state, characterState) {
  return {
    name: state.name,
    description: state.description,
    board: {
      filetype: 'svg'
    },
    characterSize: 100,
    playerSize: 40,
    characters: Object.values(characterState).reduce((o,c) => {
      o[c.id] = {
        id: c.id,
        filetype: 'svg',
        name: 'blahhh'
      };
      return o;
    }, {})
  }
}

function CreateGame() {

  //let [cookies] = useCookies(['campgn']);
  let [state, setState] = useState({
    name: "",
    description: "",
    boardFile: ""
  });
  let [characterState, setCharacterState] = useState({});
  let { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const result = await fetch('/api/library/'+name);
        var data = await result.json();
        setState(data);
        Object.values(data.characters).forEach(c => c.img = `/asset/${name}/${c.id}.svg`);
        setCharacterState(data.characters);
        previewImageFromServer(name, 'boardImg', 'board.svg');
      }
    };
    fetchData();
  }, [name]);

  function previewImageFromServer(name, elementId, imageFilename) {
    var imgEl = document.getElementById(elementId);
    imgEl.src = `${API_ROOT_URL}/asset/${name}/${imageFilename}`;
  }

  function boardFileChange(e) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var boardImg = document.getElementById('boardImg');
      boardImg.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
    setState({...state, 'boardFile': e.target.files[0]});
  }

  function savePresets() {
    var data = new FormData();
    data.set('name', state.name);
    data.set('config', JSON.stringify(buildConfig(state, characterState), null, 2));
    data.set('files_board', state.boardFile);
    Object.values(characterState).forEach(c => data.set(`files_${c.id}`, c.file));
    fetch('/api/library', {
      method: 'POST',
      body: data
    })
  }

  function changeInput(e) {
    setState({...state, [e.target.name]: e.target.value});
  }

  function addCharacter(e) {
    var id = `c${Object.keys(characterState).length}`;
    var c = { id:id, img:placeholder };
    setCharacterState({...characterState, [id]: c});
  }

  function characterImageChange(e) {
    var reader = new FileReader();
    var id = e.target.name;
    var f = e.target.files[0];
    reader.onload = function(im) {
      var c = {...characterState[id], 'img':im.target.result, 'file':f};
      setCharacterState({...characterState, [id]: c});
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="CreateGame">

      <h2>Create Game</h2>
      <p>Create your own game presets. A game consists of a board, some config details, and characters.
      Please share with the community!</p>

      <p>Name</p>
      <input type="text" name="name" onChange={changeInput} value={state.name} />

      <p>Description</p>
      <textarea name="description" rows="5" cols="30" onChange={changeInput} value={state.description} />

      <p>Board Image</p>
      <input type="file" accept="image/*" name="boardFile" onChange={boardFileChange} />
      <br/>
      <img id="boardImg" className="preview" src={placeholder} alt="Board" />

      <p>Characters</p>
      <button onClick={addCharacter} className="nav">Add Character</button>

      {Object.values(characterState).map(c => (
        <div key={c.id}>
          <p>Character {c.id}</p>
          <input type="file" accept="image/*" name={c.id} onChange={characterImageChange} />
          <img id={c.id+"img"} className="preview" src={c.img||placeholder} alt={"Character " + c.id} />
        </div>
      ))}

      <p><button onClick={savePresets}>Save</button></p>

    </div>
  )
}

export default CreateGame;
