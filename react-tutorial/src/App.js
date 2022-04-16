import './App.css';
import SearchBar from './components/searchBar/searchBar';
import VideoList from './components/videoList/videoList';
import VideoDetail from './components/videoDetail/videoDetail';
import axios from 'axios'
import React, {Component} from 'react';
import './css/style.css'

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      episodes: [],
      episodeSelected: null
    };

  }

  componentDidMount(){
    axios.get('https://rickandmortyapi.com/api/episode')
    .then(resp => {
      const es = this.downloadEpisode(resp.data.results[0].url);
      console.log('ES',es);
      this.setState({
        episodes: resp.data.results,
        episodeSelected: this.downloadEpisode(resp.data.results[0].url)
      });
      this.downloadEpisode();
    });
  }

  async downloadEpisode(url){
    try{
      const response = await axios.get(url)
      console.log('Download episode', response.data);
      this.setState({episodeSelected: response.data});
    } catch (err){
      console.log(err);
    }
  }

  render(){
    return (
      <div>
        <SearchBar />
        {console.log('APP episodes', this.state.episodes)}
        {console.log('APP episode selected', this.state.episodeSelected)}
        <VideoDetail video = {this.state.episodeSelected}/>
        <VideoList
          onSelectedEpisode = {url => this.downloadEpisode(url)} 
          videos = {this.state.episodes} />
      </div>
    );
  }
}

export default App;
