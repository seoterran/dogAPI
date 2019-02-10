import React, { Component } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    const {breed,subBreed} = props.match.params;

    let breedPath = breed;
    if(subBreed){
       breedPath += `/${subBreed}`;
     }

    this.fetchUrl = `https://dog.ceo/api/breed/${breedPath}/images/random`;
    this.breed = breed;
    this.fetch = this.fetch.bind(this);

    this.state = {
      imgSrc:null,
      //breed:breed//props.location.state.value
    };
  }

  componentDidMount(){
     this.fetch();
  }

  fetch(){
    fetch(this.fetchUrl)
    .then(res => res.json())
    .then((result) => {
       this.setState({
         imgSrc:result.message
       })
    });
  }

  renderImage(){
    const { imgSrc } = this.state;
    if(imgSrc){
      return ( <img src={imgSrc} alt={this.breed}/>);
    }
    return (<div>Loading</div>);
  }

  render() {
    return (
       <div>
         {this.renderImage()}
         <div>
           <button onClick={this.fetch}>refresh</button>
           <button onClick={this.props.history.goBack}>back</button>
         </div>
       </div>
    );
  }
}

export default Image;
