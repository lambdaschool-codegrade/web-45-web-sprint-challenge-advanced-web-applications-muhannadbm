import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axios from "axios";
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false)




  useEffect( ()=> {

    async function fetch() {
      let test = await fetchColorService()
      setColors(test)
    }
    fetch()

  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    let color = colors.find(e => e.id === editColor.id)
    let newcolors = colors.filter((e) => {return e.id !== color.id})
    setColors(newcolors)
    axiosWithAuth().put(`colors/${color.id}`,color)
    .then(res =>
      setColors([...newcolors, editColor]),
    )
  };

  const deleteColor = (colorToDelete) => {
    let color = colors.find(e => e.id === colorToDelete.id);
    axiosWithAuth().delete(`colors/${color.id}`)
    .then(res => setColors(colors.filter((e) => {return e.id !== color.id})),
    )
  };

  return (

    <div className="container">
      {loading ? 'Loading...' :  <> <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/> </>}

    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
