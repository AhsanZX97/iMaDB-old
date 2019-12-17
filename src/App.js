import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { formatResultsErrors } from 'jest-message-util';

export default class App extends Component {

  constructor(props) {
    super(props)
  
    /**
     * list shows displayed mangas on screen
     * start and end are to show the limit of manga shown on screen
     */ 
    this.state = {
       list: [],
       start: 0,
       end: 10
    }

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  
  componentDidMount() {
    this.getMangas();
  }

  // gets all list of mangas
  getMangas = () => {
    const api = fetch('https://www.mangaeden.com/api/list/1/').then(res => res.json()).then((result) => {
      const mangas =  result.manga.slice(this.state.start,this.state.end);
      this.setState({list: mangas.map(manga => manga.t) })
    })
  }

  // shows the next 10 mangas
  next() {
    this.setState(state => ({
      start: state.end,
      end: state.end+10
    }));
    this.getMangas();
  }

  // shows the previous 10 mangas
  prev() {
    this.setState(state => ({
      end: state.start < 10 ? 10 : state.start,
      start: state.start-10 < 0 ? 0 : state.start-10
    }));
    this.getMangas();
  } 

  render() {

    return (
      
      <div>
        <ul>
          {this.state.list.map(function(name,index){
            return <li key ={index}> {name}</li>;
          })}
        </ul>
        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>
      </div>
    )
  }
}
