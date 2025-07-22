'use client';

export default function DMCAPage() { 
  return (
    <main className="dmca-bg py-16 px-4 sm:px-8 lg:px-16">
      <section className="max-w-3xl mx-auto bg-black/60 backdrop-blur-md p-8 rounded-lg text-slate-50">
        <h1 className="text-4xl font-bold mb-6">Informacje DMCA</h1>
        <p className="mb-4">
          W FlowFlix szanujemy prawa autorskie twórców i właścicieli treści. Dlatego też dokładamy wszelkich starań,
          aby reagować na zgłoszenia dotyczące potencjalnych naruszeń praw autorskich zgodnie z obowiązującymi przepisami,
          w tym z wytycznymi Digital Millennium Copyright Act (DMCA).
        </p>
        <p className="mb-4">
          Jeśli uważasz, że Twoje materiały zostały wykorzystane w naszej aplikacji bez Twojej zgody – poprzez odtwarzanie
          z zewnętrznych źródeł – i posiadasz prawa autorskie, które możesz udokumentować, prosimy o kontakt. Po otrzymaniu
          wiarygodnego zgłoszenia podejmiemy niezwłocznie działania w celu usunięcia wskazanych treści.
        </p>
        <p className="mb-4">
          Aby przyspieszyć proces, prosimy o przesłanie zgłoszenia na adres:{' '}
          <a href="mailto:treekillerp@gmail.com" className="underline text-teal-400 hover:text-teal-300">
            treekillerp@gmail.com
          </a>{' '}
          (tymczasowo)
        </p>
        <p className="mb-6">Dziękujemy za współpracę.</p>

        {/* Przycisk */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block mt-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
          >
            Wróć do strony
          </a>
        </div>
      </section>
    </main>
  );
}