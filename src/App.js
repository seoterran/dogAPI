import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './App.css';
//import logo from './logo.svg';
const breedListUrl = 'https://dog.ceo/api/breeds/list/all';
function ListItem(props) {
   const breed = props.itemName;
   const subBreed = props.subItemName;
   let breedName = breed;
   let toPath = `/image/${breed}`;

   if(subBreed){
     toPath+=`/${subBreed}`;
     breedName = `${subBreed} ${breed}`
   }

   return (
      <div>
       <Link to={toPath} >
         {breedName}
       </Link>
      </div>
   );
}

function List(props) {
   const breeds = props.breeds;
   const listItems = breeds.map((breed) => {
       return <ListItem
                key={`${breed.name}${breed.subBreedName}`}
                itemName={breed.name}
                subItemName={breed.subBreedName}
              />
   });

   return (
       <div>
       {listItems}
       </div>
   );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:null,
      message:null
    }
  }

  componentDidMount(){
    fetch(breedListUrl,{
    }).then(res => res.json())
     .then(
        (result) => {
          //console.log('fetched',result);
          this.setState({
             message:this.convertBreedObjToArr(result.message)
          });
        },
        (error) => {
          this.setState({
             error:error
          });
        }
      );
  }

  convertBreedObjToArr(breedObject){
    const breedArray = [];
    for (const key in breedObject) {
       if(breedObject[key].length){
         for(const subBreed of breedObject[key]){
            breedArray.push({
              name:key,
              subBreedName:subBreed
            });
         }
       }else{
          breedArray.push({
            name:key,
            subBreedName:null
          });
       }
    }
    return breedArray;
  }

  render() {
    const { message,error } = this.state;
    if(error){
      return (<div>Server Error</div>);
    }
    if(!message){
      return (<div>Loading</div>);
    }

    return (
      <div className="App">
        <List breeds={message} />
      </div>
    );
  }
}

export default App;
