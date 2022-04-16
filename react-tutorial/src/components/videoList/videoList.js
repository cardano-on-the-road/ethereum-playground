import React, {Component} from 'react'
import VideoListItem from '../videoListItem/videoListItem';

class VideoList extends Component{

    render(){

        const videoListUtems = this.props.videos.map((video) => 
            {return (
            <VideoListItem 
                onSelectedEpisode = {this.props.onSelectedEpisode}
                key = {video.url} video = {video} 
            />)}
        );

        return (
            <>
                <p> Number of videos: {this.props.videos.length}</p>
                <ul className='col-md-4 list-group video-list'>
                    {videoListUtems}
                </ul>
            </>
        );
    }
}

export default VideoList;