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
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setTranscript(currentTranscript);
        if (
          currentTranscript.toLowerCase().includes("por favor") &&
          !messageSentRef.current
        ) {
          recognitionInstance.stop();
          messageSentRef.current = true; // Actualizamos la referencia para evitar envíos repetidos
          setTimeout(() => {
            wsInstance.send(currentTranscript);
            messageSentRef.current = false; // Restablecemos la referencia después de enviar
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
