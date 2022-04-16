import React, {Component} from 'react'

class VideoListItem extends Component{

    render(){
        return (
            <>
                <li className='list-group-item video-element' onClick={() => this.props.onSelectedEpisode(this.props.video.url)}>
                    <div className='media-body'>
                        <p>{this.props.video.episode}/</p>
                        <p>{this.props.video.name}/</p>
                        <p>{this.props.video.url}/</p>
                    </div>
                </li>
            </>
        );
    }
}

export default VideoListItem