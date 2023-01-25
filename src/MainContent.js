import React, { useRef, useEffect, useState } from 'react';
import "./MainContent.css"
import Tesseract from 'tesseract.js';


function MainContent() {
    // Create a ref to access the canvas element
    const canvasRef = useRef(null);

    const [recognizedText, setRecognizedText] = useState('');

    // Create a state variable to store the data URL of the captured image
  const [capturedImage, setCapturedImage] = useState(null);
  
    useEffect(() => {
      // Access the camera and stream the video feed to the canvas
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
          video.play();
          const context = canvasRef.current.getContext('2d');
          const draw = () => {
            context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
            requestAnimationFrame(draw);
          };
          requestAnimationFrame(draw);
        });
      });
    }, []);

        

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

  }

    

  
    return (
      <div>
        <div className='container'>
          <canvas ref={canvasRef} width={640} height={360} />
        </div>
        
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

export default MainContent