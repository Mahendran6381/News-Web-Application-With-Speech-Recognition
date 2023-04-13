"use strict";
var finalQue = "";
var oldOne = [];
var len = 0;
const searchForm = document.querySelector("#search-form");
var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'); // number button
var mainDiv = document.getElementById("container");
var seconDiv = document.getElementById("content");  
var textEle = document.getElementById('textPart')
function final(data){
   var news  = data["news"]
   console.log(news)
   textEle.innerText = news;
   var soundAdd = data["link"]
   console.log(soundAdd)
   var sound = new Howl({
    src: [soundAdd],
    volume: 0.5,
    onend: function () {
        alert('Finished!');
    }
   });
sound.play()


}

function makeGetRequest(path) {
    console.log("Its working")
    axios.get(path).then(
        (response) => {
            var result = response.data;
            console.log(result);
            mainDiv.style.display = "none"
            seconDiv.style.display = "inline"
            final(result)
        },
        (error) => {
            console.log(error);
        }
    );
}

  for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    console.log(e.target.innerHTML)
    var queryNum = e.target.innerHTML;
    const newsCat = {
  1: "tamilnadu",
  2: "india",
  3: "ulagam",
  4: "vanigam",
  5: "corona",
  6: "cinima",
  7: "vilayattu",
  8: "samayam",
  9: "thagaval"
}

    console.log(newsCat[queryNum]);
    finalQue = newsCat[queryNum];
    if (typeof finalQue === 'string' && finalQue !== null && finalQue !== undefined) {
    makeGetRequest('https://news-application-backend.onrender.com/'+ finalQue);
    }
  });
}


// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
    alert("Your Browser does support speech Recognition")
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  input.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;
  alert("hi its me")
  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
      alert("but is clicked")
    }
    else {
      recognition.stop();
      alert("button is not clicked")
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    alert("start listing")
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    input.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    alert("voice disconnected")
    input.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {

    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript,oldOne,len)
    oldOne.push(transcript)
    len = len+1;
    if(transcript.toLowerCase().trim()==="stop") {
      recognition.stop();
    }
    else if(!input.value) {
      input.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="okay" || transcript.toLowerCase().trim()==="ok" || transcript.toLowerCase().trim()==="ok." ) {
        finalQue = oldOne[len-2];
        input.innerText = finalQue;
        console.log(finalQue)
        alert(finalQue)
        SaySome(finalQue)

      }
      else if(transcript.toLowerCase().trim()==="reset input") {
        input.value = "";
      }
      else {
        input.value = transcript;
      }
    }

  }
  

  
}
else {
  console.log("Your Browser does not support speech Recognition");
  alert("Your Browser does not support speech Recognition")
  
}

function matchKeyword(keyword) {
  var matches = ["tamilnadu" , "india", "ulagam", "vanigam", "corona" , "cinima", "corona", "vilayattu", "samayam"]
  let bestMatch = "";
  let bestMatchScore = 0;
  keyword = keyword.toLowerCase()
  // Iterate over each potential match in the array
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    let score = 0;
    if(keyword.length + 1 < match.length){
       continue;
    }
    
    // Check if the keyword starts with or ends with the match
    if (keyword.startsWith(match) || keyword.endsWith(match)) {
      score += 4;
    }
    
    // Check how many characters in the keyword match the match
    for (let j = 0; j < match.length; j++) {
      if (keyword.includes(match[j])) {
        score++;
      }
    }
    
    // If this match has a higher score than the current best match, update the best match
    if (score > bestMatchScore) {
      bestMatch = match;
      bestMatchScore = score;
    }
  }
  
  console.log(bestMatch);
  return bestMatch
}

function SaySome(que) {
  if (typeof que === 'string' && que !== null && que !== undefined) {
    alert("search")
  que = que.toLowerCase().replace(/\s/g, "");
  let keyword = matchKeyword(que)
  makeGetRequest('https://news-application-backend.onrender.com/'+ keyword);
  }
}