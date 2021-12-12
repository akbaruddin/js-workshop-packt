const canvasEl = document.querySelector("#audioVisualizer");
const audioEl = document.querySelector("#audioSample");

function visualizerFn() {
    const contextAudio = new AudioContext();
    const audioSrc = contextAudio.createMediaElementSource(audioEl);
    const analyser = contextAudio.createAnalyser();

    audioSrc.connect(analyser);
    analyser.connect(contextAudio.destination);

    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    const dataArray = new Uint8Array(bufferLength);
    const CANVAS_WIDTH = window.innerWidth;
    const CANVAS_HEIGHT = window.innerHeight;

    canvasEl.width = CANVAS_WIDTH;
    canvasEl.height = CANVAS_HEIGHT;
    const contextCanvas = canvasEl.getContext('2d');

    const BAR_WIDTH = (CANVAS_WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    const requestFrames = () => {
        requestAnimationFrame(requestFrames);

        x = 0;
        analyser.getByteFrequencyData(dataArray);

        contextCanvas.fillStyle = "#000";
        contextCanvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            const red = barHeight + (25 * (i /bufferLength));
            const green = 250 * (i/bufferLength);
            const blue = 50;

            contextCanvas.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            contextCanvas.fillRect(x, CANVAS_HEIGHT - barHeight, BAR_WIDTH, barHeight);

            x += BAR_WIDTH + 1;
        }
    }

    audioEl.addEventListener('play', () => {
        requestFrames();
    });
}

visualizerFn();