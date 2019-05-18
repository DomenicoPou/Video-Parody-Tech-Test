import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export class Home extends Component {
    displayName = Home.name

    constructor(props) {

        // Initialise States and Props
        super(props);
        this.state = { videos: [], users: [], videoHover: [], loading: true };

        // Grab all videos needed for the homepage
        // Lets assume a size of 20 would be enough for our application
        fetch('https://my-json-server.typicode.com/Campstay/youtube-test/videos') 
            .then(response => response.json())
            .then(data => {
                this.setState({ videos: data });
                for (let i = 0; i < this.state.videos.length; i++) {
                    this.state.videoHover.push(false);
                    fetch(`https://my-json-server.typicode.com/Campstay/youtube-test/users/?id=${this.state.videos[i].userId}`,{
                        method: "GET"})
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ loading: false });
                            this.state.videos[i].userId = data[0].name;
                            this.forceUpdate();
                        });

                    /* Now for a long, but userfreindly needed calculation
                     * For the date shown bellow the video
                     */
                     // NOTE: This would be implemented within the c# controllers
                    let val = 0;
                    let datediff = (Date.now() - Date.parse(this.state.videos[i].uploadedAt))/ 1000;

                    if (Math.floor(datediff / 60) < 60) {                      // Minutes
                        val = Math.floor(datediff / 60);
                        this.state.videos[i].uploadedAt = val + " Minute";

                    } else if (Math.floor(datediff / 3600) < 24) {             // Hours
                        val = Math.floor(datediff / 3600);
                        this.state.videos[i].uploadedAt = val + " Hour";

                    } else if (Math.floor(datediff / 86400) < 7) {             // Days
                        val = Math.floor(datediff / 86400);
                        this.state.videos[i].uploadedAt = val + " Day";

                    } else if (Math.floor(datediff / (86400 * 7)) < 4) {       // Weeks
                        val = Math.floor(datediff / (86400 * 7));
                        this.state.videos[i].uploadedAt = val + " Week";

                    } else if (Math.floor(datediff / (86400 * 7 * 4)) < 12) {  // Months
                        val = Math.floor(datediff / (86400 * 7 * 4));
                        this.state.videos[i].uploadedAt = val + " Month";

                    } else {                                                    // Years
                        val = Math.floor(datediff / (86400 * 7 * 4 * 12));
                        val = Math.floor(datediff / (86400 * 7 * 4 * 12));
                        this.state.videos[i].uploadedAt = val + " Year";
                    }

                    // Check if the date needs to be plural
                    if (val > 1) {
                        this.state.videos[i].uploadedAt += "s";
                    }
                    this.state.videos[i].uploadedAt += " Ago";
                    //this.state.videos[i].uploadedAt = datediff;
                    this.forceUpdate();
                    //this.state.videos[i].uploadedAt = datediff;
                }
            });

       

        this.handlePreviewEnter = this.previewEnter.bind(this);
        this.handlePreviewLeave = this.previewLeave.bind(this);
    }
    
    previewLeave(index, object) {
        object.target.pause();
        object.target.currentTime = 0;
        this.state.videoHover[index] = false;
        this.forceUpdate();
    }

    previewEnter(index, object) {
        object.target.play();
        object.target.currentTime = 0;
        this.state.videoHover[index] = true;
        this.forceUpdate();
    }

    renderVideos(Videos) {
        return (
            <Col md={12}>
                <div class="row justify-content-center">
                    <div class="col-md-8 col-md-offset-2">
                <div class="video-header-container">
                    <span>Uploaded Videos</span>
                </div>
                <div class="video-list">
                    {Videos.map((object, index) => {
                        return (
                            <a href={"/watch/" + object.id}>
                            <div class="video-container">
                                <video className={this.state.videoHover[index]? 'video-source-overlay active' : 'video-source-overlay'}>
                                    <source src={object.url} type="video/mp4" />
                                </video>
                                <video class="video-source-preview" onMouseEnter={this.previewEnter.bind(this, index)}
                                    onMouseLeave={this.previewLeave.bind(this, index)}>
                                    <source src={object.url} type="video/mp4"/>
                                </video>
                                <span class="video-title">{object.title}</span>
                                <span class="video-uploader">{object.userId}</span>
                                <span class="video-date">{object.uploadedAt}</span>

                            </div>
                        </a>
                    );
                    })}
                    </div>
                    </div>
                </div>
            </Col>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading Videos...</em></p>
            : this.renderVideos(this.state.videos);

        return (
            <div>
                
                {contents}
            </div>
        );
    }
}
/*
   DevNote: Just for future iterations, I would recommend the duration of the video file.
   really just out of preference. However, I assume users would prefer to know the 
   length of the video they are about to watch.
 */