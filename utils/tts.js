export const tts = (text) => {
  // Detiene cualquier reproducción en curso antes de iniciar una nueva
  speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance();
  voice.text = text;
  voice.lang = "es-ES";
  voice.onend = () => window.location.reload(); // Refresca la página al terminar de hablar
  speechSynthesis.speak(voice);
};
