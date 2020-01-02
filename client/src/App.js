import './App.css';
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Rating from 'react-rating';
import Signup from './components/Signup';

export default class App extends Component {

  constructor(props) {
    super(props)

    /**
     * list shows displayed mangas on screen
     * genre of a manga is stored in array
     * start and end are to show the limit of manga shown on screen
     * display is false when no manga has been clicked to view
     */
    this.state = {
      list: [],
      genre: "",
      display: false,
      start: 0,
      end: 10,
      email: '',
      username: '',
      password: '',
      apiResponse: ""
    }

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.viewManga = this.viewManga.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.getMangas();
    this.callAPI();
  }

  handleSubmit(event) {
    alert('A email was submitted: ' + this.state.email);
    event.preventDefault();
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => console.log(res));
  }

  // gets all list of mangas
  getMangas = () => {
    fetch('https://www.mangaeden.com/api/list/1/').then(res => res.json()).then((result) => {
      const mangas = result.manga.slice(this.state.start, this.state.end);
      var genres = [];
      mangas.map(function (manga) {
        var string = "";
        manga.c.forEach(genre => string += genre + " ");
        genres.push(string);
      });
      this.setState({
        list: mangas.map(manga => manga.t),
        genre: genres
      });
    })
  }

  // shows the next 10 mangas
  next() {
    this.reset();
    this.setState(state => ({
      start: state.end,
      end: state.end + 10
    }));
    this.getMangas();
  }

  // shows the previous 10 mangas
  prev() {
    this.reset();
    this.setState(state => ({
      end: state.start < 10 ? 10 : state.start,
      start: state.start - 10 < 0 ? 0 : state.start - 10
    }));
    this.getMangas();
  }

  // clicking on a manga in the will show the mangas detail
  viewManga(index) {
    this.reset();
    this.setState({ display: true });
    console.log(this.state.genre[index.index]);
    this.setState({
      displayGenre: this.state.genre[index.index]
    })
  }

  // resets some of the variable before an action
  reset() {
    this.setState({
      display: false,
      displayGenre: ""
    })
  }

  render() {

    return (

      <div>
        <div>

          <form onSubmit= {this.handleSubmit}>
            <label>
              Email: <input type="email" name="email" required value={this.state.email} onChange={this.handleChange}/>
            </label> <br/>
            <label>
              Username: <input type="text" name="username" required value={this.state.username} onChange={this.handleChange}/>
            </label> <br/>
            <label>
              Password: <input type="password" name="password" required value={this.state.password} onChange={this.handleChange}/>
            </label> <br/>
            <input type="submit" value="Submit" />
          </form>

          <Grid spacing={10}>
            <Grid container item xs={12} spacing={1}>

              <Grid item xs={3}>
                <ul>
                  {this.state.list.map(function (name, index) {
                    return <li key={index} onClick={() => this.viewManga({ index })}> {name}</li>;
                  }, this)}
                </ul>
              </Grid>

              {this.state.display &&
                <Grid item xs={3}>
                  <p> <span className="manga_subtitle">Genre: {this.state.displayGenre}</span>  </p>
                  <p> <span className="manga_subtitle">Ratings:</span>
                    <Rating
                      emptySymbol="fa fa-star-o fa-2x"
                      fullSymbol="fa fa-star fa-2x"
                      fractions={2}
                    />
                  </p>
                </Grid>
              }

            </Grid>
          </Grid>
        </div>

        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>

        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}
