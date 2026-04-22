import React, { useEffect, useState } from 'react';
import { BookOpen, TrendingUp, Award } from 'lucide-react';


interface Grade {
  id: string;
  subject: string;
  teacher: string;
  grades: number[];
  average: number;
  status: 'zaliczony' | 'niezaliczony' | 'w trakcie';
}

export function Grades() {
  
  const [gradesList, setGradesList] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const userEmail = localStorage.getItem('studentName');
    
    if (userEmail) {
      fetch(`http://127.0.0.1:8000/grades/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setGradesList(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Błąd podczas pobierania ocen:", err);
          setLoading(false);
        });
    } else {console.error("Nie znaleziono e-maila użytkownika w localStorage!");
      setLoading(false);
    }
    }, []);

  
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

  
  const overallAverage = gradesList.length > 0 
    ? (gradesList.reduce((sum, g) => sum + g.average, 0) / gradesList.length).toFixed(2)
    : "0.00";

  if (loading) {
    return <div className="text-foreground p-10">Wczytywanie ocen z bazy danych...</div>
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            Oceny
          </h1>
          <p className="text-gray-400 mt-1">Dane wczytane z MongoDB Atlas</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white border border-blue-500/30">
          <p className="text-blue-200 text-sm">Średnia ogólna</p>
          <p className="text-3xl font-bold mt-1">{overallAverage}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white border border-green-500/30">
          <p className="text-green-200 text-sm">Zaliczone przedmioty</p>
          <p className="text-3xl font-bold mt-1">
            {gradesList.filter(g => g.status === 'zaliczony').length}/{gradesList.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white border border-purple-500/30">
          <p className="text-purple-200 text-sm">Najwyższa średnia</p>
          <p className="text-3xl font-bold mt-1">
            {gradesList.length > 0 ? Math.max(...gradesList.map(g => g.average)).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Przedmiot</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Nauczyciel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Oceny</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-200">Średnia</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              
              {gradesList.map((grade) => (
                <tr key={grade.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{grade.subject}</td>
                  <td className="px-6 py-4 text-gray-300">{grade.teacher}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {grade.grades.map((g, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs font-bold border ${getGradeColor(g)}`}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg font-bold border ${getGradeColor(grade.average)}`}>
                      {grade.average}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(grade.status)}`}>
                      {grade.status}
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

