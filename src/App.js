import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { formatResultsErrors } from 'jest-message-util';

export default class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       list: [],
       start: 0,
       end: 10
    }
  }
  
  componentDidMount() {
    const api = fetch('https://www.mangaeden.com/api/list/1/').then(res => res.json()).then((result) => {
      const mangas = result.manga.slice(this.state.start,this.state.end);
      this.setState({list: mangas.map(manga => manga.t) });
    })
  }

  render() {

    return (
      
      <div>
        <ul>
          {this.state.list.map(function(name,index){
            return <li key ={index}> {name}</li>;
          })}
        </ul>
      </div>
    )
  }
}
