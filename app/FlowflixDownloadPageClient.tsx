"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  TvIcon,
  Smartphone,
  Film,
  Users,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Loader2,
  AlertCircle,
  BadgeDollarSign,
  Star,
  Zap,
  Shield,
  Heart,
} from "lucide-react"
import { getLatestReleaseChangelog, type ChangelogInfo } from "./actions"

const GITHUB_RELEASES_URL = "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/latest"

export default function FlowflixDownloadPageClient() {
  const [changelogData, setChangelogData] = useState<ChangelogInfo | null>(null)
  const [isLoadingChangelog, setIsLoadingChangelog] = useState(true)

  useEffect(() => {
    async function fetchChangelog() {
      setIsLoadingChangelog(true)
      const data = await getLatestReleaseChangelog()
      setChangelogData(data)
      setIsLoadingChangelog(false)
    }
    fetchChangelog()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const cardClasses =
    "bg-slate-900/30 border-slate-700/30 text-slate-50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/40"
  const accordionItemClasses = `${cardClasses} rounded-xl mb-3`

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 sm:p-8 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-slate-50">
      {/* Enhanced decorative background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-60 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute -bottom-60 -right-40 w-[35rem] h-[35rem] bg-gradient-to-r from-pink-500 to-red-500 rounded-full filter blur-3xl opacity-25 animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 w-[30rem] h-[30rem] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-2xl opacity-20 animate-pulse-slowest" />
        <div className="absolute top-20 right-20 w-[20rem] h-[20rem] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full filter blur-2xl opacity-15 animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-[25rem] h-[25rem] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full filter blur-2xl opacity-10 animate-pulse-slower" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-5 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <header className="w-full max-w-4xl mb-12 text-center z-10">
        <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-extrabold">
          Flowflix
        </h1>
        <p className="text-slate-400 mt-2">Twoja ulubiona platforma streamingowa.</p>
        <div className="flex justify-center gap-3 mt-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-semibold">
            <BadgeDollarSign className="w-4 h-4 mr-2" />
            Darmowa
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-semibold">
            <Shield className="w-4 h-4 mr-2" />
            Bezpieczna
          </Badge>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8 z-10">
        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Odkryj Świat Flowflix</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-slate-300 space-y-4">
            <p>
              Oglądaj tysiące filmów i seriali gdziekolwiek jesteś. Flowflix oferuje dostęp do bogatej biblioteki treści
              na żądanie, zawsze w wysokiej jakości.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-sm">
              <div className="flex flex-col items-center">
                <TvIcon className="w-8 h-8 mb-1 text-purple-400" /> Oglądaj na TV
              </div>
              <div className="flex flex-col items-center">
                <Smartphone className="w-8 h-8 mb-1 text-pink-500" /> Na urządzeniach mobilnych
              </div>
              <div className="flex flex-col items-center">
                <Film className="w-8 h-8 mb-1 text-red-500" /> Tysiące tytułów
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-1 text-purple-400" /> Community
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Pobierz Aplikację Flowflix</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Przejdź do strony pobierania, aby pobrać najnowszą, darmową wersję aplikacji Flowflix na swoje urządzenie
              z systemem Android.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button
              asChild
              className="w-full max-w-xs bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105"
              size="lg"
            >
              <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Przejdź do strony pobierania
              </a>
            </Button>
            <p className="text-sm text-slate-500 pt-2">Zostaniesz przekierowany na stronę GitHub.</p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full text-slate-300">
          <AccordionItem value="installation" className={accordionItemClasses}>
            <AccordionTrigger className="hover:no-underline text-xl font-bold text-slate-100 px-8 py-6 hover:text-purple-400 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-500/20 mr-4">
                  <Download className="w-5 h-5 text-purple-400" />
                </div>
                Instrukcja Instalacji
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-slate-400 px-8 pb-6 text-base leading-relaxed">
              <div className="space-y-4">
                {[
                  "Po przejściu na stronę GitHub, pobierz plik APK z najnowszego wydania.",
                  "Przejdź do ustawień swojego telefonu.",
                  "Znajdź sekcję Bezpieczeństwo lub Aplikacje.",
                  'Zezwól na instalację aplikacji z "Nieznanych źródeł" (opcja może się różnić w zależności od modelu telefonu).',
                  'Otwórz pobrany plik APK (zwykle znajduje się w folderze "Pobrane").',
                  "Postępuj zgodnie z instrukcjami na ekranie, aby zakończyć instalację.",
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="quick-start" className={accordionItemClasses.replace("mb-3", "")}>
            <AccordionTrigger className="hover:no-underline text-xl font-bold text-slate-100 px-8 py-6 hover:text-green-400 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-500/20 mr-4">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                Szybki Start
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-slate-400 px-8 pb-6 text-base leading-relaxed">
              <div className="space-y-4">
                {[
                  "Po zainstalowaniu, otwórz aplikację Flowflix.",
                  "Zaloguj się na swoje konto lub utwórz nowe, jeśli go jeszcze nie posiadasz.",
                  "Przeglądaj bibliotekę filmów i seriali.",
                  "Wybierz interesujący Cię tytuł i rozpocznij oglądanie.",
                  "Ciesz się nieograniczonym dostępem do rozrywki!",
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className={cardClasses}>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center">
              <div className="p-2 rounded-full bg-cyan-500/20 mr-3">
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
              Co nowego? (Changelog)
            </CardTitle>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            {isLoadingChangelog && (
              <div className="flex items-center space-x-3 text-slate-400 py-4">
                <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                <span className="text-lg">Ładowanie informacji o zmianach...</span>
              </div>
            )}
            {changelogData?.error && !isLoadingChangelog && (
              <div className="space-y-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-3 text-yellow-400">
                  <AlertCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Informacje o wydaniu tymczasowo niedostępne</span>
                </div>
                <p className="text-slate-400">
                  Sprawdź najnowsze wydania bezpośrednio na{" "}
                  <a
                    href="https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline font-semibold"
                  >
                    stronie GitHub
                  </a>
                </p>
              </div>
            )}
            {!isLoadingChangelog && !changelogData?.error && changelogData && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    Wersja: {changelogData.version}
                    {changelogData.title && ` - ${changelogData.title}`}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">Opublikowano: {formatDate(changelogData.publishedDate)}</p>
                  {changelogData.description ? (
                    <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap text-slate-300 leading-relaxed">
                      {changelogData.description}
                    </div>
                  ) : (
                    <p className="text-slate-400">Brak opisu dla tej wersji.</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={cardClasses}>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent flex items-center">
              <div className="p-2 rounded-full bg-pink-500/20 mr-3">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              Wsparcie i Kontakt
            </CardTitle>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div className="grid gap-4">
              <a
                href="https://discord.gg/VSUWb283RK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-300 mr-4">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-purple-400 fill-current"
                  >
                    <title>Discord</title>
                    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.21.375-.444.864-.608 1.229a18.258 18.258 0 00-5.484 0 10.028 10.028 0 00-.632-1.229.075.075 0 00-.078-.037A19.719 19.719 0 003.683 4.37a.077.077 0 00-.035.079C3.388 6.273 3.06 9.758 3.03 13.065a.08.08 0 00.042.078c1.45.862 2.902 1.447 4.324 1.772a.078.078 0 00.086-.05c.322-.906.577-1.787.747-2.61a.072.072 0 00-.04-.082 12.04 12.04 0 01-1.806-.615.075.075 0 01-.013-.117c.02-.023.04-.044.058-.063.078-.086.15-.18.228-.272.09-.103.174-.216.262-.334a.077.077 0 01.068-.024c.132.02.266.042.4.062a1.12 1.12 0 00.262.03A13.01 13.01 0 0012 14.592a12.83 12.83 0 002.94-.317c.99-.26 1.932-.588 2.796-.948a.075.075 0 00.086.048c.132.768.338 1.507.59 2.2a.076.076 0 00.084.052c1.422-.325 2.874-.91 4.324-1.772a.08.08 0 00.042-.078c-.03-.327-.056-.658-.087-.985.003-.001.006-.001.008-.002.002-.001.004-.002.006-.004a.07.07 0 00.004-.006c-.002-.008-.003-.017-.005-.025a.076.076 0 00-.032-.08C20.018 10.05 18.79 8.11 18.094 5.855a.075.075 0 00-.03-.08zm-4.734 6.802a2.412 2.412 0 01-2.438 2.438 2.412 2.412 0 01-2.438-2.438c0-1.347 1.09-2.438 2.438-2.438a2.412 2.412 0 012.438 2.438zm-5.404 0a2.412 2.412 0 01-2.438 2.438 2.412 2.412 0 01-2.438-2.438c0-1.347 1.09-2.438 2.438-2.438a2.412 2.412 0 012.438 2.438z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg">Discord</p>
                  <p className="text-slate-400">Dołącz do naszej społeczności</p>
                </div>
              </a>
              <a
                href="https://github.com/FlowFlix/FlowFlix_Early_Alpha/issues/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-slate-500/10 border border-slate-500/20 rounded-lg hover:bg-slate-500/20 transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-slate-500/20 group-hover:bg-slate-500/30 transition-all duration-300 mr-4">
                  <Github className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-lg">GitHub</p>
                  <p className="text-slate-400">Zgłoś problem lub sugestię</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full max-w-4xl mt-16 pt-8 border-t border-slate-700/50 text-center z-10">
        <p className="text-slate-400 mb-6 text-lg">Śledź nas w mediach społecznościowych</p>
        <div className="flex justify-center space-x-8 mb-8">
          {[
            { icon: Github, label: "Github", color: "hover:text-purple-400" },
            { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
            { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
            { icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
          ].map(({ icon: Icon, label, color }) => (
            <a
              key={label}
              href="#"
              aria-label={`FlowFlix on ${label}`}
              className={`text-slate-400 ${color} transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-slate-800/50`}
            >
              <Icon className="w-8 h-8" />
            </a>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-slate-500">&copy; {new Date().getFullYear()} FlowFlix. Wszelkie prawa zastrzeżone.</p>
          <p className="text-xs text-slate-600">{""}</p>
        </div>
      </footer>
    </div>
  )
}
