import { useState } from 'react';
import { Mail, Search, Inbox, Send, Trash2, Star, Clock } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Dr hab. Anna Nowak',
    subject: 'Zmiana terminu kolokwium',
    preview: 'Informuję, że kolokwium z programowania obiektowego zostało przesunięte...',
    content:
      'Szanowni Państwo,\n\nInformuję, że kolokwium z programowania obiektowego zostało przesunięte z 25 lutego na 4 marca. Zakres materiału pozostaje bez zmian.\n\nPozdrawiam,\nDr hab. Anna Nowak',
    date: '19 lutego 2026',
    time: '10:30',
    isRead: false,
    isStarred: true,
  },
  {
    id: 2,
    sender: 'Prof. Jan Wiśniewski',
    subject: 'Materiały do laboratorium',
    preview: 'Dodałem nowe materiały do następnych zajęć laboratoryjnych...',
    content:
      'Dzień dobry,\n\nDodałem nowe materiały do następnych zajęć laboratoryjnych z baz danych. Proszę o przygotowanie się do zajęć.\n\nMateriały dostępne w systemie.\n\nPozdrawiam,\nProf. Jan Wiśniewski',
    date: '18 lutego 2026',
    time: '15:45',
    isRead: true,
    isStarred: false,
  },
  {
    id: 3,
    sender: 'Dr Piotr Kowalczyk',
    subject: 'Konsultacje w przyszłym tygodniu',
    preview: 'Przypominam o terminach konsultacji w przyszłym tygodniu...',
    content:
      'Witam,\n\nPrzypominam o terminach konsultacji w przyszłym tygodniu:\n- Poniedziałek 14:00-16:00\n- Środa 10:00-12:00\n\nSala 305.\n\nPozdrawiam,\nDr Piotr Kowalczyk',
    date: '17 lutego 2026',
    time: '11:20',
    isRead: true,
    isStarred: false,
  },
  {
    id: 4,
    sender: 'Dr Magdalena Lewandowska',
    subject: 'Projekt grupowy - termin oddania',
    preview: 'Przypominam, że termin oddania projektu grupowego upływa...',
    content:
      'Dzień dobry,\n\nPrzypominam, że termin oddania projektu grupowego z inżynierii oprogramowania upływa 28 lutego. Proszę o przesłanie projektu wraz z dokumentacją.\n\nW razie pytań jestem do dyspozycji.\n\nPozdrawiam,\nDr Magdalena Lewandowska',
    date: '16 lutego 2026',
    time: '09:15',
    isRead: false,
    isStarred: true,
  },
  {
    id: 5,
    sender: 'Prof. Tomasz Kamiński',
    subject: 'Dodatkowe materiały do egzaminu',
    preview: 'Dodałem dodatkowe materiały pomocnicze do przygotowania się do egzaminu...',
    content:
      'Szanowni Państwo,\n\nDodałem dodatkowe materiały pomocnicze do przygotowania się do egzaminu z matematyki dyskretnej. Materiały zawierają przykładowe zadania wraz z rozwiązaniami.\n\nPozdrawiam,\nProf. Tomasz Kamiński',
    date: '15 lutego 2026',
    time: '16:30',
    isRead: true,
    isStarred: false,
  },
];

export function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(
      messages.map((m) => (m.id === message.id ? { ...m, isRead: true } : m))
    );
  };

  const toggleStar = (id: number) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-blue-400" />
            Wiadomości
          </h1>
          <p className="text-gray-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} nieprzeczytanych wiadomości` : 'Brak nowych wiadomości'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
          {/* Messages List */}
          <div className="lg:col-span-1">
            {/* Search Bar */}
            <div className="p-4 border-b border-slate-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Szukaj wiadomości..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Messages List */}
            <div className="overflow-y-auto max-h-[600px]">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 border-b border-slate-700 cursor-pointer transition-colors hover:bg-slate-700/50 ${
                      selectedMessage?.id === message.id ? 'bg-blue-900/30' : ''
                    } ${!message.isRead ? 'bg-blue-900/20' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                          <p
                            className={`text-sm truncate ${
                              message.isRead ? 'text-gray-300' : 'text-white font-semibold'
                            }`}
                          >
                            {message.sender}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(message.id);
                        }}
                        className="ml-2 flex-shrink-0"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            message.isStarred
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-500 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    </div>
                    <p
                      className={`text-sm mb-1 truncate ${
                        message.isRead ? 'text-gray-300' : 'text-white font-medium'
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-400 truncate mb-2">{message.preview}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {message.date}, {message.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Inbox className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                  <p>Brak wiadomości</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 p-6">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Message Header */}
                <div className="border-b border-slate-700 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">{selectedMessage.subject}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStar(selectedMessage.id)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            selectedMessage.isStarred
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {selectedMessage.sender.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{selectedMessage.sender}</p>
                      <p className="text-sm text-gray-400">
                        {selectedMessage.date}, {selectedMessage.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="prose max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                {/* Reply Button */}
                <div className="pt-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30">
                    <Send className="w-5 h-5" />
                    Odpowiedz
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                  <p className="text-lg">Wybierz wiadomość aby ją przeczytać</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
