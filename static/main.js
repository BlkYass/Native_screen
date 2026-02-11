// static/main.js
const recordButton = document.getElementById("recordBtn");
const stopButton = document.getElementById("stopBtn");
const videoPreview = document.getElementById("preview");

let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
    // Request camera + microphone
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });

    videoPreview.srcObject = stream;
    videoPreview.play();

    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => recordedChunks.push(e.data);

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        a.click();
    };

    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop();
    videoPreview.srcObject.getTracks().forEach(track => track.stop());
}

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
