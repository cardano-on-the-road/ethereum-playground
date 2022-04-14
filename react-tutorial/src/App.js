import './App.css';
import credential from './credentials.json';
import SearchBar from './components/searchBar/searchBar';
import VideoList from './components/videoList/videoList';
import YTSearch from 'youtube-search';
import axios from 'axios'
import React, {Component} from 'react';

class App extends Component {
  
  constructor(props){
    super(props);

    var opts = {
      maxResults: 10,
      key: credential.googleApiKey
    };

    this.state = {episodes: []};

    axios.get('https://rickandmortyapi.com/api/episode')
    .then(resp => {
      this.state = {episodes: resp.data.results}
    });
    console.log(this.state.episodes)
    // YTSearch('valerio mellini', opts, (err, videos) => {
    //   if(err) return console.log(err);
    //   this.state = { videos };
    // });
  }

  render(){
    return (
      <div>
        <SearchBar />
        {console.log(this.state.episodes)}
        <VideoList videos = {this.state.episodes} />
      </div>
    );
  }
}

export default App;
