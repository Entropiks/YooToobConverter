import React, {useState} from "react";

function App() {

  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [readyUrl, setReadyUrl] = useState('');

  // Send the request to the server
  function fetchHtml() {
    fetch('https://www.yt-download.org/api/button/mp3/5f3YgB5yb2I')
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      document.body.innerHTML = html;
    });
  }

  // Handle the video url input
  function handleInput(e) {
    let slicedUrl = url.slice(-9);
    console.log(slicedUrl);
    setUrl(e.target.value);
    
  }

  
  const getVideoId = () => {
    
  }

  return (
    <div>
      <input onChange={handleInput} type='text' placeholder="Enter youtube URL" />
      <button onClick={fetchHtml}>Fetch</button>
      <button onClick={getVideoId}>Get Video ID</button>

    </div>
  );
}

export default App;
