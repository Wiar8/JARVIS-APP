"use client";

import { useState, useEffect, useRef } from "react";
import { tts } from "@/utils/tts";

const AutoTranscribe = () => {
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [response, setResponse] = useState("");
  const [ws, setWs] = useState(null);
  const messageSentRef = useRef(false); // Usamos useRef para controlar el envío del mensaje

  const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

  useEffect(() => {
    const wsInstance = new WebSocket(wsUrl);
    setWs(wsInstance);

    wsInstance.onopen = () => {
      console.log("WebSocket Connected");
    };

    wsInstance.onmessage = (event) => {
      setResponse(event.data);
      tts(event.data);
    };

    wsInstance.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Actualiza el estado solo con el transcript final para evitar duplicados
        setTranscript(finalTranscript);

        if (
          finalTranscript.toLowerCase().includes("por favor") &&
          !messageSentRef.current
        ) {
          recognitionInstance.stop();
          messageSentRef.current = true;
          setTimeout(() => {
            wsInstance.send(finalTranscript);
            messageSentRef.current = false;
          }, 2000);
        }
      };
      setRecognition(recognitionInstance);
      recognitionInstance.start();
    } else {
      console.error("Este navegador no soporta SpeechRecognition.");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      wsInstance.close();
    };
  }, []);

  const stopTTS = () => {
    speechSynthesis.cancel();
  };

  return (
    <div>
      <p>Transcripción: {transcript}</p>
      <p>Respuesta: {response}</p>
      <button onClick={stopTTS}>Detener TTS</button>
    </div>
  );
};

export default AutoTranscribe;
