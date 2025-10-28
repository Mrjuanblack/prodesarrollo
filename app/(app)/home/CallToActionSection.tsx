export const CallToActionSection = () => {
  return (
    <section className="bg-[#F3F6FF] py-16 px-4 md:px-8 lg:px-16 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 rounded-lg">
        <div className="flex-shrink-0 relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
          <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#D7E3FF] opacity-70" />

          <img
            src="/images/handshake.svg"
            alt="Haz parte del cambio - Manos unidas"
            className="absolute z-10 w-full h-full object-contain"
          />
        </div>

        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002D74] mb-4">
            Haz parte del cambio
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6 max-w-lg mx-auto md:mx-0">
            Explora nuestros proyectos sociales con impacto real y conoce cómo
            puedes ayudar a financiarlos para su ejecución.
          </p>
          <button className="bg-[#9C6AFF] hover:bg-[#8B5CD6] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md">
            Ver proyectos y donar
          </button>
        </div>
      </div>
    </section>
  );
};
