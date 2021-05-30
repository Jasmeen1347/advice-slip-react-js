import { useRef, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const el = useRef(null);
  const [showAdvice, setShowAdvice] = useState(false);
  const [advice, setAdvice] = useState("");

  const getAdvice = async () => {
    let music2 = new Audio('/sound/beep.ogg');
    music2.play();
    await axios.get('https://api.adviceslip.com/advice')
      .then(function (response) {
        setAdvice(response.data.slip.advice);
        el.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
        let music = new Audio('/sound/cash_count.ogg');
        music.play();
      console.log(response);
      setShowAdvice(true);
    })
  }


  const resetSlip = (e) => {
    e.preventDefault();
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    setShowAdvice(false);
  }

  return (
    <div className="App">
      <div className="main-box">
        <div className="sub-box">
          <h3 className="title">ADVICE SLIP GENERATER</h3>
          <h3 className="button" onClick={getAdvice}>GENERATE</h3>
        </div>
      </div>

      <div className="result">
        <div className="slipfeed">
			    	<div className="slip">
            <div className={(showAdvice) ? "animation paper print-only" : "noanimation paper print-only"}>
							<div className="padder">
								<h3>ADVICESLIP</h3>
                <p className="breakline">==============================</p>
								<p className="advice">{advice}</p>
                <p className="breakline">==============================</p>
								<p className="datetime">{new Date().toLocaleString() }</p>
                <p className="breakline">==============================</p>
								<p className="ignore"><a href="#" onClick={(e) => resetSlip(e)}>COMPLETELY IGNORE THIS</a></p>
                <p className="breakline" >==============================</p>
								<br className="clearer"/>
							</div>
						</div>
			    	</div>
            </div>
      </div>

      <footer>
        <p ref={el}>Made by Jasmeen Maradeeya</p>
      </footer>
    </div>
  );
}

export default App;
