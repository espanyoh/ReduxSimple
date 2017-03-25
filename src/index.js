import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar'


const API_KEY = 'AIzaSyBnGjL6wdWokYxtOD6Vf8HxGgzGpkzQEeY';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo:null
    };
    // YTSearch({key: API_KEY, term:'surfboards'}, function(data){
    //   console.log(data);
    //   this.setState({videos:data});
    // })
    this.videoSearch('arrow season 5');
  }

  videoSearch(term){
    YTSearch({key:API_KEY, term:term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo : videos[0]
      });
    });
  }

  render (){
    const videoSearch = _.debounce( (term) => {this.videoSearch(term)}, 300);
    return(
    <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
        </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));
