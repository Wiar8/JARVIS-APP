export const tts = (text) => {
  if ("speechSynthesis" in window) {
    // Detiene cualquier reproducción en curso antes de iniciar una nueva
    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance();
    voice.text = text;
    voice.lang = "es-ES";
    // Elimina el recargo de página al terminar de hablar
    // voice.onend = () => window.location.reload();
    voice.onend = () => window.location.reload(); // Refresca la página al terminar de hablar

    window.speechSynthesis.speak(voice);
  } else {
    console.error("La síntesis de voz no está disponible en este navegador.");
  }
};
