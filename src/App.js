import React, {useState} from "react";
import './App.css';

function App() {

  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [format, setFormat] = useState('mp3');
  const [active, setActive] = useState('mp3');

  // Handle the input when someone PASTES a link
  function handleInput(e) {
    setUrl(e.clipboardData.getData('Text'));
  }

  const handleFormatClick = (event) => {
    event.preventDefault();
    setActive(event.target.id);
    setFormat(event.target.id);
  }

  // This fires when focus of input is removed
  function onBlurHandler(e) {
    setUrl(e.target.value);
  }

  // Reset the page, maybe just dump the states at some point but this is fine
  function handleReset() {
    window.location.reload();
  }

  // API Request + URL Slicing
  function handleConvert() {

    // Empty input check
    if (!url) {
      alert("You gotta give us a link first!");
      return
    }
    
    // Slice the full url to just the id
    let vidId = url.slice(-11);
    setVideoId(vidId);

    console.log('https://www.yt-download.org/api/button/' + format + '/' + vidId);
    fetch('https://www.yt-download.org/api/button/' + format + '/' + vidId)
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
          <h1 id="nav"><a href="">Youtube to MP3/MP4 Converter</a></h1>
          <p style={{marginTop: 15, marginBottom: 15}}>Welcome to my video converter, simply paste in a youtube URL and we will give you back a download link! Simple as that. There are also no length limits so go bananas.</p>
          {/* <span style={{fontWeight: 700}}>{format.toUpperCase()}</span> */}
          <p style={{marginBottom: 10, fontSize: 14, fontWeight: 700}}>Select download format:</p>
          <section id="format-selection">
            <button id="mp3" onClick={handleFormatClick} className={`btn-format ${active === 'mp3' ? 'active' : undefined}` } name="mp3" style={{width: 80}}>MP3</button>
            <button id="videos" onClick={handleFormatClick} className={`btn-format ${active === 'videos' ? 'active' : undefined}` } name="mp4" style={{width: 80, marginLeft: 10, marginRight: 10}}>MP4</button>
            {/* <button id="merged" onClick={handleFormatClick} value="" className={`btn-format ${active === 'merged' ? 'active' : undefined}` } name="webm/mkv" style={{width: 110}}>WEBM / MKV</button> */}
          </section>
          <input id="youtube-url" onBlur={onBlurHandler} onPaste={handleInput} type='text' placeholder="Enter youtube URL"/> 
          <div id="action-bar">
            <button id="btn-convert" onClick={handleConvert} style={{width: 175}}>Convert</button> 
            <button id="btn-convert" onClick={handleReset} style={{width: 75}}>Reset</button> 
          </div> 
          <section id="downloadSection">
          </section>
          <p id="disclaimer">Please note this was built for research purposes only.</p>   
        </div>
      </div>
  );
}

export default App;
