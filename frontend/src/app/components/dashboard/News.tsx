import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  fullContent: string;
  image?: string;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Rozpoczęcie rekrutacji na studia magisterskie 2026/2027',
    date: '18 lutego 2026',
    description: 'Uczelnia ogłasza rozpoczęcie rekrutacji na studia magisterskie. Zapisy trwają do 30 czerwca.',
    fullContent:
      'Uniwersytet ogłasza rozpoczęcie rekrutacji na studia magisterskie na rok akademicki 2026/2027. Zapisy odbywają się wyłącznie drogą elektroniczną przez system rekrutacyjny. Kandydaci mogą aplikować na wszystkie kierunki oferowane przez uczelnię. Termin składania dokumentów upływa 30 czerwca 2026 roku.',
    category: 'Rekrutacja',
  },
  {
    id: 2,
    title: 'Nowe laboratorium informatyczne otwarte dla studentów',
    date: '15 lutego 2026',
    description: 'W budynku głównym otwarto nowoczesne laboratorium komputerowe wyposażone w najnowszy sprzęt.',
    fullContent:
      'Z radością informujemy o otwarciu nowego laboratorium informatycznego na Wydziale Informatyki. Laboratorium zostało wyposażone w 50 stanowisk z najnowszym sprzętem komputerowym, monitorami 4K oraz specjalistycznym oprogramowaniem. Studenci mogą korzystać z laboratorium w godzinach 8:00-20:00.',
    category: 'Infrastruktura',
  },
  {
    id: 3,
    title: 'Konferencja naukowa "IT Future 2026"',
    date: '12 lutego 2026',
    description: 'Zapraszamy na międzynarodową konferencję poświęconą przyszłości technologii informacyjnych.',
    fullContent:
      'Wydział Informatyki organizuje międzynarodową konferencję naukową "IT Future 2026", która odbędzie się 15-16 marca 2026 roku. Konferencja skupi się na najnowszych trendach w sztucznej inteligencji, blockchain i cyberbezpieczeństwie. Udział mogą wziąć studenci oraz wykładowcy.',
    category: 'Wydarzenia',
  },
  {
    id: 4,
    title: 'Stypendium rektora - nowy program wsparcia',
    date: '10 lutego 2026',
    description: 'Uczelnia uruchamia nowy program stypendiów dla najlepszych studentów z wynikami powyżej 4.5.',
    fullContent:
      'Rektor Uniwersytetu ogłasza nowy program stypendialny dla studentów osiągających wybitne wyniki w nauce. Stypendium otrzymają studenci ze średnią powyżej 4.5 oraz aktywni w życiu uczelnianym. Wnioski należy składać do 28 lutego 2026 roku w Dziekanacie.',
    category: 'Stypendia',
  },
  {
    id: 5,
    title: 'Wymiana studencka z programem Erasmus+',
    date: '8 lutego 2026',
    description: 'Rusza nowa edycja programu wymiany studenckiej. Możliwość studiowania za granicą przez semestr.',
    fullContent:
      'Biuro Programów Międzynarodowych zaprasza do udziału w programie Erasmus+ na rok akademicki 2026/2027. Studenci mogą wybrać jedną z 30 uczelni partnerskich w Europie. Zgłoszenia przyjmowane są do końca marca. Szczegółowe informacje dostępne na stronie uczelni.',
    category: 'Wymiana',
  },
  {
    id: 6,
    title: 'Warsztaty z programowania w Python - zapisy otwarte',
    date: '5 lutego 2026',
    description: 'Koło naukowe organizuje darmowe warsztaty z programowania dla początkujących.',
    fullContent:
      'Koło Naukowe Programistów organizuje seria darmowych warsztatów z programowania w języku Python. Warsztaty skierowane są do studentów wszystkich lat, również początkujących. Spotkania odbywać się będą w każdy czwartek o godz. 17:00 w sali 305. Zapisy przez email.',
    category: 'Warsztaty',
  },
];

export function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Rekrutacja: 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
      Infrastruktura: 'bg-green-600/20 text-green-400 border border-green-500/30',
      Wydarzenia: 'bg-purple-600/20 text-purple-400 border border-purple-500/30',
      Stypendia: 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30',
      Wymiana: 'bg-pink-600/20 text-pink-400 border border-pink-500/30',
      Warsztaty: 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30',
    };
    return colors[category] || 'bg-gray-600/20 text-gray-400 border border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-blue-400" />
            Aktualności
          </h1>
          <p className="text-muted-foreground mt-1">Najnowsze wiadomości z uczelni</p>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:border-blue-500/50"
            onClick={() => setSelectedNews(news)}
          >
            {/* Category Badge */}
            <div className="p-4 pb-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                {news.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                {news.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                <span>{news.date}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {news.description}
              </p>

              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group">
                Czytaj więcej
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedNews.category)}`}>
                  {selectedNews.category}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3">
                {selectedNews.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Calendar className="w-4 h-4" />
                <span>{selectedNews.date}</span>
              </div>

              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedNews.fullContent}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Newspaper className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-300 mb-1">Bądź na bieżąco</h3>
            <p className="text-sm text-blue-200/80">
              Sprawdzaj regularnie sekcję aktualności, aby nie przegapić ważnych informacji
              dotyczących uczelni, wydarzeń i możliwości rozwoju.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
