import React, {useState} from "react";
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [readyUrl, setReadyUrl] = useState('');

  // Handle the video url input
  function handleInput(e) {
    let value = e.clipboardData.getData('Text');
    // Slice the ID off the URL and set it into 'videoId' for use in the fetch request
    let slicedUrl = value.slice(-11);
    setVideoId(slicedUrl);
    console.log("Full Url: " + value);
  }

  console.log("Video ID: " + videoId);
  console.log('https://www.yt-download.org/api/button/mp3/' + videoId);

  // Send the request to the server
  function fetchHtml() {
    // fetch('https://www.yt-download.org/api/button/mp3/5f3YgB5yb2I')
    fetch('https://www.yt-download.org/api/button/mp3/' + videoId)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      document.body.innerHTML = html;
    });
  }

  return (
    
      <div className="wrapper">
        <div className="controls">
          <h1>Youtube Video Converter</h1>
          <p>Welcome to my video converter, simply paste in a youtube URL and we will give you back a download link! Simple as that.</p>
          <input id="youtube-url" onPaste={handleInput} type='text' placeholder="Enter youtube URL" />  
          <button id="btn-convert" onClick={fetchHtml}>Convert to MP3</button>
        </div>
        <p id="disclaimer">Please note this was built for research purposes only.</p>
      </div>
   
  );
}

export default App;
