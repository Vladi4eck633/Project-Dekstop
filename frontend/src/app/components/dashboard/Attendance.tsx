import React, { useEffect, useState } from 'react';
import { UserCheck, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  subject: string;
  totalClasses: number;
  attended: number;
  excused: number;
  unexcused: number;
  percentage: number;
}

export function Attendance() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('studentName'); 
    if (userEmail) {
      // Добавить коллекцию attendance
      fetch(`http://127.0.0.1:8000/attendance/${userEmail}`) 
        .then(res => res.json())
        .then(data => {
          setAttendanceData(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Błąd ładowania frekwencji:", err);
          setLoading(false);
        });
    }
  }, []);

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBreakdown = (record: AttendanceRecord) => {
    if (record.totalClasses === 0) {
      return {
        attendedPct: 0,
        excusedPct: 0,
        unexcusedPct: 0,
      };
    }

    const attendedPct = (record.attended / record.totalClasses) * 100;
    const excusedPct = (record.excused / record.totalClasses) * 100;
    const unexcusedPct = (record.unexcused / record.totalClasses) * 100;

    return {
      attendedPct,
      excusedPct,
      unexcusedPct,
    };
  };

  const totalAttended = attendanceData.reduce((sum, r) => sum + r.attended, 0);
  const totalClasses = attendanceData.reduce((sum, r) => sum + r.totalClasses, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : "0.0";
  const totalUnexcused = attendanceData.reduce((sum, r) => sum + r.unexcused, 0);

  if (loading) {
    return <div className="text-foreground p-10 text-center">Ładowanie frekwencji...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-blue-400" />
            Obecności
          </h1>
          <p className="text-gray-400 mt-1">Twoja frekwencja na zajęciach</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Ogólna frekwencja</p>
              <p className="text-3xl font-bold mt-1">{overallPercentage}%</p>
              <p className="text-blue-200 text-xs mt-1">
                {totalAttended}/{totalClasses} zajęć
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg shadow-green-500/20 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Obecności</p>
              <p className="text-3xl font-bold mt-1">{totalAttended}</p>
              <p className="text-green-200 text-xs mt-1">zajęć ukończonych</p>
            </div>
            <Calendar className="w-12 h-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg shadow-red-500/20 border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm">Nieobecności nieuspraw.</p>
              <p className="text-3xl font-bold mt-1">{totalUnexcused}</p>
              <p className="text-red-200 text-xs mt-1">wymagana uwaga</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-300" />
          </div>
        </div>
      </div>

      
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-card/50">
          <h2 className="font-semibold text-foreground">Szczegółowa frekwencja</h2>
        </div>

        <div className="p-6 space-y-6">
          {attendanceData.map((record) => (
            <div key={record.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{record.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    {record.attended} / {record.totalClasses} zajęć
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getPercentageColor(record.percentage)}`}>
                    {record.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-700/30 dark:bg-slate-200/15">
                <div
                  className="bg-green-500 h-full"
                  style={{ flexBasis: `${getBreakdown(record).attendedPct}%` }}
                />
                <div
                  className="bg-yellow-500 h-full"
                  style={{ flexBasis: `${getBreakdown(record).excusedPct}%` }}
                />
                <div
                  className="bg-red-500 h-full"
                  style={{ flexBasis: `${getBreakdown(record).unexcusedPct}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Obecny: <span className="font-medium">{record.attended}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Usprawiedliwiony: <span className="font-medium">{record.excused}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Nieusprawiedliwiony: <span className="font-medium">{record.unexcused}</span>
                  </span>
                </div>
              </div>

              
              {record.percentage < 80 && (
                <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-300">
                    <p className="font-medium">Uwaga! Niska frekwencja</p>
                    <p>
                      Twoja frekwencja jest poniżej 80%. Skontaktuj się z prowadzącym.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-300 mb-1">Zasady frekwencji</h3>
            <p className="text-sm text-blue-200/80">
              Minimalna wymagana frekwencja wynosi 80%. Przy frekwencji poniżej tego poziomu
              należy skonsultować się z prowadzącym zajęcia. Nieusprawiedliwione nieobecności mogą
              wpłynąć na możliwość zaliczenia przedmiotu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
