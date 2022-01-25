import React, {useState} from "react";
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [readyUrl, setReadyUrl] = useState('');

  // Handle the input when someone PASTES a link in
  function handleInput(e) {
    let value = e.clipboardData.getData('Text');
    // Slice the ID off the URL and set it into 'videoId' for use in the fetch request
    let slicedUrl = value.slice(-11);
    setVideoId(slicedUrl);
    console.log("Full Url: " + value);
  }

  // function emptyStringTest() {}

  console.log("Video ID: " + videoId);
  console.log('https://www.yt-download.org/api/button/mp3/' + videoId);

  function fetchHtml() {
    fetch('https://www.yt-download.org/api/button/mp3/' + videoId)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      document.getElementById('downloadSection').innerHTML = html;
      // After load, lets strip the nasty css that is provided
      document.querySelector('link[href$="style.css"]').remove()
    });
  }

  return (
    
      <div className="wrapper">
        <div className="controls">
          <h1 id="nav"><a href="">Youtube Video Converter</a></h1>
          <p style={{marginTop: 15, marginBottom: 15}}>Welcome to my video converter, simply paste in a youtube URL and we will give you back a download link! Simple as that. There are also no length limits so go bananas.</p>
          <input id="youtube-url" onPaste={handleInput} type='text' placeholder="Enter youtube URL" autoComplete="off"/>  
          <button id="btn-convert" onClick={fetchHtml}>Convert to MP3</button>
          <section id="downloadSection">
          </section>
        <p id="disclaimer">Please note this was built for research purposes only.</p>
      </div>
    </div>
   
  );
}

export default App;
