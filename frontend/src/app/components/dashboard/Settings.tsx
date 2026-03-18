import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [gradeNotifications, setGradeNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [scheduleNotifications, setScheduleNotifications] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            Ustawienia
          </h1>
          <p className="text-gray-400 mt-1">Zarządzaj swoim kontem i preferencjami</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Profil użytkownika</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  defaultValue="Jan Kowalski"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Numer indeksu
                </label>
                <input
                  type="text"
                  defaultValue="123456"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-gray-400 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="jan.kowalski@student.edu.pl"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  defaultValue="+48 123 456 789"
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30">
              Zapisz zmiany
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Powiadomienia</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-white">Powiadomienia email</p>
                <p className="text-sm text-gray-400">Otrzymuj powiadomienia na email</p>
              </div>
              <Switch.Root
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className={`w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[26px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-700">
              <div>
                <p className="font-medium text-white">Powiadomienia o ocenach</p>
                <p className="text-sm text-gray-400">Informuj o nowych ocenach</p>
              </div>
              <Switch.Root
                checked={gradeNotifications}
                onCheckedChange={setGradeNotifications}
                className={`w-12 h-6 rounded-full transition-colors ${
                  gradeNotifications ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[26px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-700">
              <div>
                <p className="font-medium text-white">Powiadomienia o wiadomościach</p>
                <p className="text-sm text-gray-400">Informuj o nowych wiadomościach</p>
              </div>
              <Switch.Root
                checked={messageNotifications}
                onCheckedChange={setMessageNotifications}
                className={`w-12 h-6 rounded-full transition-colors ${
                  messageNotifications ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[26px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-700">
              <div>
                <p className="font-medium text-white">Przypomnienia o zajęciach</p>
                <p className="text-sm text-gray-400">Powiadom przed rozpoczęciem zajęć</p>
              </div>
              <Switch.Root
                checked={scheduleNotifications}
                onCheckedChange={setScheduleNotifications}
                className={`w-12 h-6 rounded-full transition-colors ${
                  scheduleNotifications ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[26px]" />
              </Switch.Root>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Bezpieczeństwo</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Obecne hasło
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nowe hasło
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Potwierdź nowe hasło
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30">
              Zmień hasło
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Wygląd</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Motyw</label>
              <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option>Jasny</option>
                <option selected>Ciemny</option>
                <option>Automatyczny</option>
              </select>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Język i region</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Język</label>
              <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option>Polski</option>
                <option>English</option>
                <option>Deutsch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strefa czasowa
              </label>
              <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option>Europa/Warszawa (GMT+1)</option>
                <option>Europa/Londyn (GMT+0)</option>
                <option>America/New_York (GMT-5)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
