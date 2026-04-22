import React, { useEffect, useState } from 'react';
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



const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

export function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
    const userEmail = localStorage.getItem('studentName'); 
    
    if (userEmail) {
      fetch(`http://127.0.0.1:8000/timetable/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setSchedule(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Błąd ładowania planu:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-500';
      case 'lab': return 'bg-green-500';
      case 'tutorial': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture': return 'Wykład';
      case 'lab': return 'Laboratorium';
      case 'tutorial': return 'Ćwiczenia';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        Ładowanie planu zajęć...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Plan zajęć
          </h1>
          <p className="text-gray-400 mt-1">Harmonogram zajęć na bieżący tydzień</p>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {weekDays.map((day) => {
          const daySchedule = schedule.filter((item) => item.day === day);
          
          return (
            <div key={day} className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-colors">
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">
                <h3 className="font-semibold text-center">{day}</h3>
              </div>

              
              <div className="p-3 space-y-3">
                {daySchedule.length > 0 ? (
                  daySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-600 rounded-lg p-3 hover:shadow-md hover:border-blue-500/50 transition-all bg-slate-900/30"
                    >
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
