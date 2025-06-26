import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam"; // Ensure `react-webcam` is installed: npm install react-webcam
import * as faceapi from "face-api.js"; // Ensure `face-api.js` and `@tensorflow/tfjs` are installed
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface WebcamCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAligned, setIsAligned] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load face-api.js models with local priority and CDN fallback
  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading face-api.js models from /models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        setIsModelLoaded(true);
        console.log("Models loaded successfully from local /models.");
      } catch (error) {
        console.error("Failed to load models from /models:", error);
        console.log("Attempting to load from CDN...");
        try {
          await faceapi.nets.tinyFaceDetector.loadFromUri("https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights");
          await faceapi.nets.faceLandmark68Net.loadFromUri("https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights");
          setIsModelLoaded(true);
          console.log("Models loaded successfully from CDN.");
        } catch (cdnError) {
          console.error("Error loading face-api.js models from CDN:", cdnError);
          setError("Failed to load face detection models. Ensure model files are in public/models or check your internet connection for CDN access.");
        }
      }
    };
    loadModels();
  }, []);

  // Handle webcam initialization
  const handleWebcamLoaded = useCallback(() => {
    console.log("Webcam metadata loaded.");
    if (webcamRef.current && webcamRef.current.video) {
      console.log("Webcam video ready:", webcamRef.current.video.readyState);
      setWebcamReady(true);
    } else {
      console.error("Webcam video not available after metadata load.");
      setError("Failed to initialize webcam. Please ensure camera permissions are granted.");
    }
  }, []);

  // Function to check face alignment
  const checkAlignment = useCallback(
    (detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>) => {
      const { landmarks, detection: { box } } = detection;
      const { width, height } = videoConstraints;

      // Get face center
      const faceCenterX = box.x + box.width / 2;
      const faceCenterY = box.y + box.height / 2;

      // Check if face is centered (within 20% of the video center)
      const centerXThreshold = width * 0.2;
      const centerYThreshold = height * 0.2;
      const isCentered =
        Math.abs(faceCenterX - width / 2) < centerXThreshold &&
        Math.abs(faceCenterY - height / 2) < centerYThreshold;

      // Check rotation (using eye landmarks)
      const leftEye = landmarks.positions[36]; // Left eye outer corner
      const rightEye = landmarks.positions[45]; // Right eye outer corner
      const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI);
      const isLevel = Math.abs(angle) < 5; // Allow 5-degree tilt

      // Check face size (ensure it's appropriate for passport photo)
      const minFaceWidth = width * 0.3;
      const maxFaceWidth = width * 0.6;
      const isCorrectSize = box.width >= minFaceWidth && box.width <= maxFaceWidth;

      console.log("Alignment check:", { isCentered, isLevel, isCorrectSize, faceCenterX, faceCenterY, angle, boxWidth: box.width });

      return isCentered && isLevel && isCorrectSize;
    },
    []
  );

  // Auto-capture when aligned
  const captureImage = useCallback(() => {
    if (webcamRef.current && !isCapturing) {
      setIsCapturing(true);
      console.log("Capturing image...");
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "passport-photo.jpg", { type: "image/jpeg" });
            console.log("Image captured successfully:", file);
            onCapture(file);
            onClose();
          })
          .catch((error) => {
            console.error("Error capturing image:", error);
            setError("Failed to capture image. Please try again.");
          })
          .finally(() => setIsCapturing(false));
      } else {
        console.error("No image source from webcam.");
        setError("Failed to capture image. Please ensure webcam is active.");
        setIsCapturing(false);
      }
    }
  }, [isCapturing, onCapture, onClose]);

  // Face detection loop
  useEffect(() => {
    if (!isModelLoaded || !webcamReady) {
      console.log("Detection loop waiting:", { isModelLoaded, webcamReady });
      return;
    }

    let alignedFrames = 0;
    const requiredAlignedFrames = 5; // Require 5 consecutive aligned frames (~500ms)

    const interval = setInterval(async () => {
      console.log("Checking refs:", {
        webcamRef: !!webcamRef.current,
        video: !!webcamRef.current?.video,
        canvas: !!canvasRef.current,
      });

      if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = { width: videoConstraints.width, height: videoConstraints.height };
        faceapi.matchDimensions(canvas, displaySize);

        try {
          const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            console.error("Canvas context not available.");
            setError("Canvas rendering failed.");
            return;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (detections) {
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const isFaceAligned = checkAlignment(resizedDetections);
            setIsAligned(isFaceAligned);

            // Draw box
            ctx.strokeStyle = isFaceAligned ? "green" : "red";
            ctx.lineWidth = 2;
            const { x, y, width, height } = resizedDetections.detection.box;
            ctx.strokeRect(x, y, width, height);

            // Count consecutive aligned frames for stable capture
            if (isFaceAligned) {
              alignedFrames++;
              if (alignedFrames >= requiredAlignedFrames) {
                captureImage();
              }
            } else {
              alignedFrames = 0;
            }

            console.log("Detection:", { isFaceAligned, box: resizedDetections.detection.box });
          } else {
            setIsAligned(false);
            alignedFrames = 0;
            console.log("No face detected.");
          }
        } catch (error) {
          console.error("Error in face detection loop:", error);
          setError("Face detection failed. Please try again.");
        }
      } else {
        console.error("Webcam or canvas not available:", {
          webcamRef: !!webcamRef.current,
          video: !!webcamRef.current?.video,
          canvas: !!canvasRef.current,
        });
        setError("Webcam or canvas not initialized. Please ensure camera permissions are granted.");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isModelLoaded, webcamReady, checkAlignment, captureImage]);

  if (error) {
    return (
      <div className="text-white text-sm text-center">
        {error}
        <motion.button
          variants={{
            hover: { scale: 1.05 },
            tap: { scale: 0.95 },
          }}
          whileHover="hover"
          whileTap="tap"
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-sm"
        >
          Close
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onLoadedMetadata={handleWebcamLoaded}
          className="rounded-lg transform scale-x-[-1]" // Flip horizontally
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 transform scale-x-[-1]" // Flip canvas to match webcam
          width={videoConstraints.width}
          height={videoConstraints.height}
        />
      </div>
      <div className="text-white text-sm">
        {isAligned
          ? "Face aligned! Capturing..."
          : "Please center your face and keep it level."}
      </div>
      <div className="flex space-x-2">
        <motion.button
          variants={{
            hover: { scale: 1.05 },
            tap: { scale: 0.95 },
          }}
          whileHover="hover"
          whileTap="tap"
          onClick={captureImage}
          disabled={isCapturing || !webcamReady}
          className="px-4 py-2 rounded-2xl bg-[#cba135] text-[#183b4e] hover:bg-[#b3922f] disabled:opacity-50 text-sm flex items-center"
        >
          <Camera className="h-4 w-4 mr-2" />
          Capture
        </motion.button>
        <motion.button
          variants={{
            hover: { scale: 1.05 },
            tap: { scale: 0.95 },
          }}
          whileHover="hover"
          whileTap="tap"
          onClick={onClose}
          className="px-4 py-2 rounded-2xl border border-[#cba135] text-[#cba135] hover:bg-[#cba135] hover:text-white text-sm"
        >
          Close
        </motion.button>
      </div>
    </div>
  );
};

export default WebcamCapture;