import React, { useRef, useEffect, useState } from 'react';
import "./MainContent.css"
import Tesseract from 'tesseract.js';
import Webcam from "react-webcam";

function MainContent() {
    // Create a ref to access the canvas element
    /*const canvasRef = useRef(null);

    const [recognizedText, setRecognizedText] = useState('');

    // Create a state variable to store the data URL of the captured image
    const [capturedImage, setCapturedImage] = useState(null);
    const camera = useCamera({
        video: true,
        audio: false
    });
    
    useEffect(() => {
        if (!camera) return;
        const video = camera.stream.current;
        const context = canvasRef.current.getContext('2d');
        const draw = () => {
            context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }, [camera]);

    function captureImage() {
    // Get the data URL of the current frame from the canvas
    const dataURL = canvasRef.current.toDataURL();

    // Set the data URL as the value of the capturedImage state variable
    setCapturedImage(dataURL);

    console.log(dataURL);

    setTimeout(5000);

    Tesseract.recognize(
      dataURL,
      'eng',
      { logger: m => console.log (m) } ). then (({ data: { text } }) => {
      setRecognizedText(text);
      })

  }*/

  const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');

    function captureImage() {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        Tesseract.recognize(imageSrc, 'eng', { logger: m => console.log(m) }).then(({ data: { text } }) => {
            setRecognizedText(text);
        });
    }

    return (
      <div>
          <Webcam ref={webcamRef} audio={false} width={640} height={480} />
<button onClick={captureImage}>Capture</button>
{capturedImage && <img src={capturedImage} alt="Captured image" />}
{recognizedText ? (
<div>Recognized text: {recognizedText}</div>
) : (
<div>Recognized text: </div>
)}
</div>
);
}

export default MainContent;
    
    
    
    /*return (
      <div>
        {camera ? (
        <canvas ref={canvasRef} width={640} height={480} />
        ) : (
        <div>Please give permission to access camera</div>
        )}
        <button onClick={captureImage}>Capture</button>
        {capturedImage && <img src={capturedImage} alt="Captured image" />}
        {recognizedText ? (
        <div>Recognized text: {recognizedText}</div>
      ) : (
        <div>Recognized text: </div>
      )}

      </div>
    );
  }

export default MainContent*/