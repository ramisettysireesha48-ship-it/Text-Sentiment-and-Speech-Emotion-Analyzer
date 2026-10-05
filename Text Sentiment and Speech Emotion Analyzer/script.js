/* ==============================
   CHARACTER COUNTER
================================= */

const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");

textInput.addEventListener("input", function () {

    const count = textInput.value.length;

    charCount.textContent = count + " characters";

});


/* ==============================
   TEXT SENTIMENT ANALYSIS
================================= */

function analyzeText() {

    const text = textInput.value.trim();

    const result = document.getElementById("textResult");

    if (text === "") {

        result.innerHTML = `
            <div class="analysis-result">

                <div class="result-icon">
                    ⚠️
                </div>

                <div>
                    <h4>Please enter some text</h4>
                    <p>
                        Enter a sentence or message to analyze.
                    </p>
                </div>

            </div>
        `;

        return;
    }


    const positiveWords = [
        "happy",
        "good",
        "great",
        "excellent",
        "love",
        "amazing",
        "wonderful",
        "awesome",
        "success",
        "best",
        "like",
        "thank",
        "beautiful",
        "fantastic",
        "enjoy"
    ];


    const negativeWords = [
        "bad",
        "sad",
        "hate",
        "angry",
        "terrible",
        "worst",
        "poor",
        "problem",
        "failure",
        "horrible",
        "disappointed",
        "pain",
        "upset",
        "fear",
        "difficult"
    ];


    const words = text.toLowerCase().split(/\s+/);

    let positiveScore = 0;
    let negativeScore = 0;


    words.forEach(function(word) {

        word = word.replace(/[.,!?]/g, "");

        if (positiveWords.includes(word)) {
            positiveScore++;
        }

        if (negativeWords.includes(word)) {
            negativeScore++;
        }

    });


    let sentiment;
    let icon;
    let description;


    if (positiveScore > negativeScore) {

        sentiment = "Positive";
        icon = "😊";

        description =
            "The text expresses a positive sentiment.";

    }

    else if (negativeScore > positiveScore) {

        sentiment = "Negative";
        icon = "😔";

        description =
            "The text expresses a negative sentiment.";

    }

    else {

        sentiment = "Neutral";
        icon = "😐";

        description =
            "The text appears to have a neutral sentiment.";

    }


    result.innerHTML = `

        <div class="analysis-result">

            <div class="result-icon">
                ${icon}
            </div>

            <div>

                <h4>
                    ${sentiment} Sentiment
                </h4>

                <p>
                    ${description}
                </p>

            </div>

        </div>

    `;

}


/* ==============================
   SPEECH RECOGNITION
================================= */

let recognition;

const recordButton =
    document.getElementById("recordButton");

const speechStatus =
    document.getElementById("speechStatus");

const speechResult =
    document.getElementById("speechResult");

const micCircle =
    document.getElementById("micCircle");


function startSpeech() {

    if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
    ) {

        speechResult.innerHTML = `

            <div class="analysis-result">

                <div class="result-icon">
                    ⚠️
                </div>

                <div>

                    <h4>
                        Speech Recognition Not Supported
                    </h4>

                    <p>
                        Please use Google Chrome or another
                        supported browser.
                    </p>

                </div>

            </div>

        `;

        return;
    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    recognition = new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.onstart = function() {

        speechStatus.textContent =
            "Listening...";

        recordButton.textContent =
            "Listening...";

        micCircle.style.transform =
            "scale(1.15)";

    };


    recognition.onresult = function(event) {

        const speechText =
            event.results[0][0].transcript;


        speechStatus.textContent =
            "Speech Captured";


        recordButton.textContent =
            "Start Recording";


        micCircle.style.transform =
            "scale(1)";


        analyzeSpeechText(speechText);

    };


    recognition.onerror = function() {

        speechStatus.textContent =
            "Something went wrong";

        recordButton.textContent =
            "Try Again";

        micCircle.style.transform =
            "scale(1)";

    };


    recognition.onend = function() {

        recordButton.textContent =
            "Start Recording";

        micCircle.style.transform =
            "scale(1)";

    };


    recognition.start();

}


/* ==============================
   SPEECH RESULT
================================= */

function analyzeSpeechText(text) {

    const lowerText =
        text.toLowerCase();


    let emotion = "Neutral";
    let icon = "😐";


    if (
        lowerText.includes("happy") ||
        lowerText.includes("great") ||
        lowerText.includes("love") ||
        lowerText.includes("wonderful")
    ) {

        emotion = "Happy";
        icon = "😊";

    }

    else if (
        lowerText.includes("sad") ||
        lowerText.includes("cry") ||
        lowerText.includes("unhappy")
    ) {

        emotion = "Sad";
        icon = "😢";

    }

    else if (
        lowerText.includes("angry") ||
        lowerText.includes("hate") ||
        lowerText.includes("furious")
    ) {

        emotion = "Angry";
        icon = "😡";

    }

    else if (
        lowerText.includes("wow") ||
        lowerText.includes("surprise") ||
        lowerText.includes("amazing")
    ) {

        emotion = "Surprised";
        icon = "😮";

    }


    speechResult.innerHTML = `

        <div class="analysis-result">

            <div class="result-icon">
                ${icon}
            </div>

            <div>

                <h4>
                    ${emotion} Emotion
                </h4>

                <p>
                    "${text}"
                </p>

            </div>

        </div>

    `;

}