import React, {Component} from 'react'

class VideoList extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <>
                <p> Number of videos {this.props.videos.length}</p>
            </>
        );
    }
}

export default VideoList;