import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export function Settings() {
  const [profileData, setProfileData] = useState<any>(null);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  
  useEffect(() => {
    const username = localStorage.getItem('studentName');
    if (username) {
      fetch(`http://127.0.0.1:8000/profile/${username}`)
        .then(res => res.json())
        .then(data => setProfileData(data))
        .catch(err => console.error("API Error:", err));
    }
  }, []);

  
  const handlePasswordChange = async () => {
    const username = localStorage.getItem('studentName');
    
    if (passwords.new !== passwords.confirm) {
      alert("Hasła nie są identyczne!");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/settings/change-password/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        }),
      });

      if (response.ok) {
        alert("Hasło zostało zmienione!");
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Błąd");
      }
    } catch (error) {
      alert("Błąd połączenia с API");
    }
  };

  const handleThemeChange = (newTheme: string) => {
  const root = window.document.documentElement; 
  
  if (newTheme === 'Jasny') {
    root.classList.remove('dark'); 
    localStorage.setItem('appTheme', 'Jasny');
  } else {
    root.classList.add('dark');    
    localStorage.setItem('appTheme', 'Ciemny');
  }
};

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            Ustawienia
          </h1>
          <p className="text-gray-400 mt-1">Zarządzaj swoim kontem i preferencjami</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold text-white">Profil użytkownika</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Imię i nazwisko</label>
                <input
                  type="text"
                  value={`${profileData?.firstName || ''} ${profileData?.lastName || ''}`}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-400 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Numer indeksu</label>
                <input
                  type="text"
                  value={profileData?.studentId || ''}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-400 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData?.email || ''}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-400 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={profileData?.phone || ''}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-400 cursor-not-allowed outline-none"
                />
              </div>
            </div>
            
          </div>
        </div>

        
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold text-white">Bezpieczeństwo</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Obecne hasło</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nowe hasło</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Potwierdź nowe hasło</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none focus:border-blue-500"
                />
              </div>
              <button 
                onClick={handlePasswordChange}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/20"
              >
                Aktualizuj hasło
              </button>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Wygląd</h2>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Motyw aplikacji</label>
              <select 
                onChange={(e) => handleThemeChange(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none"
                  >
                <option value="Ciemny">Ciemny</option>
                <option value="Jasny">Jasny</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Język</h2>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Język interfejsu</label>
              <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none">
                <option>Polski</option>
                <option>English</option>
                <option>Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}