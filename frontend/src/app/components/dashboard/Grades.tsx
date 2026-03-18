import { BookOpen, TrendingUp, Award } from 'lucide-react';

interface Grade {
  id: number;
  subject: string;
  teacher: string;
  grades: number[];
  average: number;
  status: 'zaliczony' | 'niezaliczony' | 'w trakcie';
}

const mockGrades: Grade[] = [
  {
    id: 1,
    subject: 'Programowanie obiektowe',
    teacher: 'Dr hab. Anna Nowak',
    grades: [5, 4.5, 5, 4],
    average: 4.63,
    status: 'zaliczony',
  },
  {
    id: 2,
    subject: 'Bazy danych',
    teacher: 'Prof. Jan Wiśniewski',
    grades: [4, 4, 4.5, 5],
    average: 4.38,
    status: 'zaliczony',
  },
  {
    id: 3,
    subject: 'Algorytmy i struktury danych',
    teacher: 'Dr Piotr Kowalczyk',
    grades: [3.5, 4, 3.5, 4],
    average: 3.75,
    status: 'w trakcie',
  },
  {
    id: 4,
    subject: 'Inżynieria oprogramowania',
    teacher: 'Dr Magdalena Lewandowska',
    grades: [5, 5, 4.5, 5],
    average: 4.88,
    status: 'zaliczony',
  },
  {
    id: 5,
    subject: 'Matematyka dyskretna',
    teacher: 'Prof. Tomasz Kamiński',
    grades: [3, 3, 3.5, 3],
    average: 3.13,
    status: 'w trakcie',
  },
  {
    id: 6,
    subject: 'Systemy operacyjne',
    teacher: 'Dr Krzysztof Zieliński',
    grades: [4, 4.5, 4, 4.5],
    average: 4.25,
    status: 'zaliczony',
  },
];

export function Grades() {
  const getGradeColor = (grade: number) => {
    if (grade >= 4.5) return 'bg-green-600/20 text-green-400 border-green-500/30';
    if (grade >= 4) return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
    if (grade >= 3.5) return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-600/20 text-red-400 border-red-500/30';
  };

  const getStatusColor = (status: string) => {
    if (status === 'zaliczony') return 'bg-green-600/20 text-green-400 border-green-500/30';
    if (status === 'niezaliczony') return 'bg-red-600/20 text-red-400 border-red-500/30';
    return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
  };

  const overallAverage = (
    mockGrades.reduce((sum, grade) => sum + grade.average, 0) / mockGrades.length
  ).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            Oceny
          </h1>
          <p className="text-gray-400 mt-1">Przegląd ocen z wszystkich przedmiotów</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Średnia ogólna</p>
              <p className="text-3xl font-bold mt-1">{overallAverage}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg shadow-green-500/20 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Zaliczone przedmioty</p>
              <p className="text-3xl font-bold mt-1">
                {mockGrades.filter((g) => g.status === 'zaliczony').length}/{mockGrades.length}
              </p>
            </div>
            <Award className="w-12 h-12 text-green-300" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg shadow-purple-500/20 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Najwyższa średnia</p>
              <p className="text-3xl font-bold mt-1">
                {Math.max(...mockGrades.map((g) => g.average)).toFixed(2)}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-purple-300" />
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                  Przedmiot
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                  Nauczyciel
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                  Oceny cząstkowe
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-200">
                  Średnia
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{grade.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">{grade.teacher}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {grade.grades.map((g, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-lg text-sm font-medium border ${getGradeColor(
                            g
                          )}`}
                        >
                          {g.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${getGradeColor(
                        grade.average
                      )}`}
                    >
                      {grade.average.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                        grade.status
                      )}`}
                    >
                      {grade.status.charAt(0).toUpperCase() + grade.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
