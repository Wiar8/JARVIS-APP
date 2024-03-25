import AutoTranscribe from "@/components/AutoTranscribe";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-6  p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:lg:h-[360px] z-[-1]">
        <Image
          className="relative"
          src="/robot.png"
          alt="Robot"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Hola! Soy <span className="text-blue-400">Jarvis</span>
        </h1>
        <p className="text-center text-gray-600 max-w-md">
          Soy un asistente personal controlado por voz. Puedo hacer tareas como
          abrir un sitio web, decirte la hora, buscar cosas en internet, etc.
        </p>
        <p className="text-center text-gray-800 max-w-md">
          Pregunta lo que quieras y yo te ayudaré. Solo di la palabra Jarvis y
          te respondere
        </p>
      </div>
      <div>
        <AutoTranscribe />
      </div>
    </main>
  );
}
