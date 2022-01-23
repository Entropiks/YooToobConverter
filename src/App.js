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
      <h1>Converter</h1>
        <input onPaste={handleInput} type='text' placeholder="Enter youtube URL" />
        
        <button onClick={fetchHtml}>Fetch</button>
      </div>

    </div>
  );
}

export default App;
