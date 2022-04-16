import React, {Component} from "react";

class VideoDetail extends Component{



    render(){


        if (!this.props.video){
            return <div className="col-md-8">
                Loading data...
                </div>;
        }
    
        return (<div className="col-md-8 video-detail">
            <p> EPISODE DETAIL</p>
            <p> Episode name: {this.props.video.name}</p>
            <p> Air date {this.props.video.air_date}</p>
        </div>);
    }
}



export default VideoDetail;