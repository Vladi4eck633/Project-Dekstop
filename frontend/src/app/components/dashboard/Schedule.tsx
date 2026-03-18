import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  subject: string;
  room: string;
  teacher: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

const mockSchedule: ScheduleItem[] = [
  {
    id: 1,
    day: 'Poniedziałek',
    time: '08:00 - 09:30',
    subject: 'Programowanie obiektowe',
    room: 'Sala 201',
    teacher: 'Dr hab. Anna Nowak',
    type: 'lecture',
  },
  {
    id: 2,
    day: 'Poniedziałek',
    time: '10:00 - 11:30',
    subject: 'Bazy danych',
    room: 'Lab 115',
    teacher: 'Prof. Jan Wiśniewski',
    type: 'lab',
  },
  {
    id: 3,
    day: 'Wtorek',
    time: '09:00 - 10:30',
    subject: 'Algorytmy i struktury danych',
    room: 'Sala 305',
    teacher: 'Dr Piotr Kowalczyk',
    type: 'lecture',
  },
  {
    id: 4,
    day: 'Wtorek',
    time: '11:00 - 12:30',
    subject: 'Matematyka dyskretna',
    room: 'Sala 102',
    teacher: 'Prof. Tomasz Kamiński',
    type: 'tutorial',
  },
  {
    id: 5,
    day: 'Środa',
    time: '08:00 - 09:30',
    subject: 'Inżynieria oprogramowania',
    room: 'Lab 220',
    teacher: 'Dr Magdalena Lewandowska',
    type: 'lab',
  },
  {
    id: 6,
    day: 'Środa',
    time: '10:00 - 11:30',
    subject: 'Systemy operacyjne',
    room: 'Sala 403',
    teacher: 'Dr Krzysztof Zieliński',
    type: 'lecture',
  },
  {
    id: 7,
    day: 'Czwartek',
    time: '09:00 - 10:30',
    subject: 'Bazy danych',
    room: 'Sala 201',
    teacher: 'Prof. Jan Wiśniewski',
    type: 'lecture',
  },
  {
    id: 8,
    day: 'Czwartek',
    time: '11:00 - 12:30',
    subject: 'Programowanie obiektowe',
    room: 'Lab 118',
    teacher: 'Dr hab. Anna Nowak',
    type: 'lab',
  },
  {
    id: 9,
    day: 'Piątek',
    time: '08:00 - 09:30',
    subject: 'Systemy operacyjne',
    room: 'Lab 315',
    teacher: 'Dr Krzysztof Zieliński',
    type: 'lab',
  },
  {
    id: 10,
    day: 'Piątek',
    time: '10:00 - 11:30',
    subject: 'Algorytmy i struktury danych',
    room: 'Sala 204',
    teacher: 'Dr Piotr Kowalczyk',
    type: 'tutorial',
  },
];

const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

export function Schedule() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-500';
      case 'lab':
        return 'bg-green-500';
      case 'tutorial':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Wykład';
      case 'lab':
        return 'Laboratorium';
      case 'tutorial':
        return 'Ćwiczenia';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Plan zajęć
          </h1>
          <p className="text-gray-400 mt-1">Harmonogram zajęć na bieżący tydzień</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-4">
        <h3 className="font-semibold text-white mb-3">Legenda:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-300">Wykład</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-300">Laboratorium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-300">Ćwiczenia</span>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {weekDays.map((day) => {
          const daySchedule = mockSchedule.filter((item) => item.day === day);
          
          return (
            <div key={day} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-colors">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">
                <h3 className="font-semibold text-center">{day}</h3>
              </div>

              {/* Classes */}
              <div className="p-3 space-y-3">
                {daySchedule.length > 0 ? (
                  daySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-600 rounded-lg p-3 hover:shadow-md hover:border-blue-500/50 transition-all bg-slate-900/30"
                    >
                      {/* Time with colored indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1 h-12 rounded ${getTypeColor(item.type)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.time}</span>
                          </div>
                          <div className="font-semibold text-sm text-white leading-tight">
                            {item.subject}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-1 text-xs text-gray-300 pl-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="truncate">{item.teacher}</span>
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-white text-xs ${getTypeColor(item.type)}`}>
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                    <p className="text-sm">Brak zajęć</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
