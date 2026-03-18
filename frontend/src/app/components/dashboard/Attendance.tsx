import { UserCheck, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface AttendanceRecord {
  id: number;
  subject: string;
  totalClasses: number;
  attended: number;
  excused: number;
  unexcused: number;
  percentage: number;
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: 1,
    subject: 'Programowanie obiektowe',
    totalClasses: 20,
    attended: 18,
    excused: 1,
    unexcused: 1,
    percentage: 90,
  },
  {
    id: 2,
    subject: 'Bazy danych',
    totalClasses: 18,
    attended: 17,
    excused: 1,
    unexcused: 0,
    percentage: 94.4,
  },
  {
    id: 3,
    subject: 'Algorytmy i struktury danych',
    totalClasses: 22,
    attended: 19,
    excused: 2,
    unexcused: 1,
    percentage: 86.4,
  },
  {
    id: 4,
    subject: 'Inżynieria oprogramowania',
    totalClasses: 16,
    attended: 16,
    excused: 0,
    unexcused: 0,
    percentage: 100,
  },
  {
    id: 5,
    subject: 'Matematyka dyskretna',
    totalClasses: 24,
    attended: 20,
    excused: 3,
    unexcused: 1,
    percentage: 83.3,
  },
  {
    id: 6,
    subject: 'Systemy operacyjne',
    totalClasses: 19,
    attended: 18,
    excused: 1,
    unexcused: 0,
    percentage: 94.7,
  },
];

export function Attendance() {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalAttended = mockAttendance.reduce((sum, record) => sum + record.attended, 0);
  const totalClasses = mockAttendance.reduce((sum, record) => sum + record.totalClasses, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);
  const totalUnexcused = mockAttendance.reduce((sum, record) => sum + record.unexcused, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-blue-400" />
            Obecności
          </h1>
          <p className="text-gray-400 mt-1">Twoja frekwencja na zajęciach</p>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Attendance Table */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
          <h2 className="font-semibold text-white">Szczegółowa frekwencja</h2>
        </div>

        <div className="p-6 space-y-6">
          {mockAttendance.map((record) => (
            <div key={record.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{record.subject}</h3>
                  <p className="text-sm text-gray-400">
                    {record.attended} / {record.totalClasses} zajęć
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getPercentageColor(record.percentage)}`}>
                    {record.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress.Root
                className="relative overflow-hidden bg-slate-700 rounded-full w-full h-3"
                value={record.percentage}
              >
                <Progress.Indicator
                  className={`w-full h-full transition-transform duration-300 ${getProgressColor(
                    record.percentage
                  )}`}
                  style={{ transform: `translateX(-${100 - record.percentage}%)` }}
                />
              </Progress.Root>

              {/* Detailed Stats */}
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

              {/* Warning */}
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

      {/* Info Box */}
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
