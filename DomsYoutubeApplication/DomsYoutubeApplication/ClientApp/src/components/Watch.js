import React, { Component } from 'react';

export class Watch extends Component {
    displayName = Watch.name

  constructor(props) {
    super(props);
    this.state = { video: [], comments: [], videoLoading: true, commentLoading: true, vidId: this.props.match.params.videoId};
    fetch(`https://my-json-server.typicode.com/Campstay/youtube-test/videos/?id=${this.state.vidId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                video: data[0], videoLoading: false
            });
            fetch(`https://my-json-server.typicode.com/Campstay/youtube-test/users/?id=${this.state.vidId}`, {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                this.state.video.userId = data[0].name;
                this.forceUpdate();
                });

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date(Date.parse(this.state.video.uploadedAt));
            this.state.video.uploadedAt = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    });

    fetch(`https://my-json-server.typicode.com/Campstay/youtube-test/comments/?videoId=${this.state.vidId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ comments: data, commentLoading: false });
            // NOTE: This would be implemented within the c# controllers
            for (let i = 0; i < this.state.comments.length; i++) {
                fetch(`https://my-json-server.typicode.com/Campstay/youtube-test/users/?id=${this.state.comments[i].userId}`, {
                    method: "GET"
                })
                    .then(response => response.json())
                    .then(data => {
                        this.state.comments[i].userId = data[0].name;
                        this.forceUpdate();
                    });

                let val = 0;
                let datediff = (Date.now() - Date.parse(this.state.comments[i].date)) / 1000;

                if (Math.floor(datediff / 60) < 60) {                      // Minutes
                    val = Math.floor(datediff / 60);
                    this.state.comments[i].date = val + " Minute";

                } else if (Math.floor(datediff / 3600) < 24) {             // Hours
                    val = Math.floor(datediff / 3600);
                    this.state.comments[i].date = val + " Hour";

                } else if (Math.floor(datediff / 86400) < 7) {             // Days
                    val = Math.floor(datediff / 86400);
                    this.state.comments[i].date = val + " Day";

                } else if (Math.floor(datediff / (86400 * 7)) < 4) {       // Weeks
                    val = Math.floor(datediff / (86400 * 7));
                    this.state.comments[i].date = val + " Week";

                } else if (Math.floor(datediff / (86400 * 7 * 4)) < 12) {  // Months
                    val = Math.floor(datediff / (86400 * 7 * 4));
                    this.state.comments[i].date = val + " Month";

                } else {                                                    // Years
                    val = Math.floor(datediff / (86400 * 7 * 4 * 12));
                    val = Math.floor(datediff / (86400 * 7 * 4 * 12));
                    this.state.comments[i].date = val + " Year";
                }

                // Check if the date needs to be plural
                if (val > 1) {
                    this.state.comments[i].date += "s";
                }
                this.state.comments[i].date += " Ago";
                //this.state.videos[i].uploadedAt = datediff;
                this.forceUpdate();
            }
        
    });
    }

    renderComments(comments) {
        return (
            <div>
                {comments.map((object, index) => {
                    return (
                        <div class="comment-container">
                            <span class="comment-header">{object.userId}</span>
                            <span class="comment-text">{object.body}</span>
                            <span class="comment-date">{object.date}</span>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderVideo(video) {
        let commentContents = this.state.commentLoading
            ? <p><em>Loading Comments...</em></p>
            : this.renderComments(this.state.comments);

        let countContent = "No Comments";
        if (this.state.comments.length > 0) {
            countContent = "Comment"
            if (this.state.comments.length > 1) {
                countContent = "Comments"
            }
        }

        return (
            <div>
                <div class="watch-video-container">
                    <video class="watch-video" controls>
                        <source src={video.url} type="video/mp4" />
                    </video>
                </div>
                <div class="video-list-content-container">
                        <div class="watch-user-details">
                            <span class="watch-header">{video.title}</span>
                            <span class="watch-upload">Uploaded by: {video.userId}</span>
                            <span class="watch-date">Published on {video.uploadedAt}</span>
                        </div>
                        <div class="watch-description-container">
                            <span class="watch-description">{video.description}</span>
                        </div>
                    <div class="watch-comment-container">
                        <span class="watch-comment-count">{this.state.comments.length} {countContent}</span>
                            {commentContents}
                        </div>
                </div>
            </div>
    );
  }

  render() {
      let contents = this.state.videoLoading
      ? <p><em>Loading Video...</em></p>
        : this.renderVideo(this.state.video);

    return (
      <div>
        {contents}
      </div>
    );
  }
}