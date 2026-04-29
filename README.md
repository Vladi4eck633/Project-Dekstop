# Student Journal Web App

## Opis projektu

Projekt to aplikacja webowa „Dziennik Studenta" z opakowaniem Electron. Zawiera:
- `frontend/` — aplikacja React + Vite z interfejsem dziennika studenckiego
- `backend/` — serwer FastAPI pracujący z MongoDB
- `main.js` — prosty launcher Electron, ładujący aplikację webową z `http://localhost:5173`

Aplikacja obsługuje:
- stronę logowania i prostą autentykację
- chroniony dashboard z nawigacją
- sekcje: wiadomości, oceny, harmonogram, frekwencję, profil, ustawienia
- edycję profilu i zmianę hasła
- przechowywanie stanu logowania w `localStorage`

## Architektura

### Frontend

Folder: `frontend/`

- Używa React + Vite + Tailwind CSS
- Routing za pośrednictwem `react-router`
- Chronione trasy zdefiniowane w `frontend/src/app/routes.tsx`
- `DashboardLayout.tsx` zawiera górny pasek, boczną nawigację i `Outlet`
- Wybór motywu zapisany w `localStorage.appTheme`
- Żądania API wykonywane na `http://127.0.0.1:8000`

Główne strony:
- `Login.tsx` — strona logowania
- `News.tsx` — główna strona z aktualnościami
- `Grades.tsx` — oceny użytkownika
- `Schedule.tsx` — harmonogram zajęć
- `Attendance.tsx` — dane frekwencji
- `Messages.tsx` — wiadomości
- `Profile.tsx` — profil studenta z możliwością edycji
- `Settings.tsx` — ustawienia aplikacji i zmiana hasła

### Backend

Folder: `backend/`

- Używa FastAPI i Motor do pracy z MongoDB
- Ładuje zmienne środowiska z `api.env`

Usługi:
- `POST /login` — weryfikacja `username`/`password`
- `GET /grades/{username}` — zwraca listę ocen studenta z bazy danych
- `GET /timetable/{username}` — zwraca harmonogram z bazy
- `GET /attendance/{username}` — zwraca frekwencję z bazy
- `GET /profile/{username}` — zwraca profil studenta z bazy
- `POST /profile/{username}` — aktualizacja danych profilu w bazie danych
- `POST /settings/change-password/{username}` — zmiana hasła użytkownika w bazie danych

## Jak aplikacja działa

### Proces logowania

1. Użytkownik otwiera `/login` i wprowadza email i hasło
2. Formularz waliduje email (sprawdzenie domeny `.com` lub `.pl`)
3. Po wysłaniu żądanie jest wysyłane na endpoint `POST /login`
4. Jeśli uwierzytelnienie się powiedzie (`status: ok`), zapisywane są w `localStorage`:
   - `isLoggedIn = true`
   - `studentName = email` (używane jako identyfikator użytkownika w pozostałych żądaniach)
5. Przekierowanie na `/dashboard`

### Chronione trasy

- Komponent `ProtectedRoute` w `frontend/src/app/routes.tsx` sprawdza obecność `localStorage.isLoggedIn`
- Jeśli użytkownik nie jest uwierzytelniony, przechodzi na `/login`

### Użycie danych w interfejsie

- Po zalogowaniu każdy komponent pulpitu pobiera nazwę użytkownika z `localStorage.studentName`
- Komponenty wykonują żądania do odpowiednich endpointów (`/grades`, `/timetable`, `/attendance`, `/profile`)
- `DashboardLayout` pokazuje panel boczny, pasek górny z imieniem użytkownika i przyciskiem wylogowania

### Edycja danych

1. **Profil**: `Profile.tsx` ładuje `GET /profile/{username}`, pozwala edytować i wysyła `POST /profile/{username}` do zapisania
2. **Hasło**: `Settings.tsx` wysyła `POST /settings/change-password/{username}` z obecnym i nowym hasłem
3. **Motyw**: wybór motywu jest zapisywany w `localStorage.appTheme` i stosowany przez klasę CSS `dark` na `<html>`


## Uruchamianie projektu

### 1. Uruchamianie backendu

1. Przejdź do `backend/`
2. Utwórz plik `api.env` ze zmienną `MONGO_URL`
3. Zainstaluj zależności Python:
   - `pip install fastapi uvicorn motor python-dotenv`
4. Uruchom serwer:
   - `uvicorn main:app --reload --port 8000`

### 2. Uruchamianie frontendu

1. Przejdź do `frontend/`
2. Zainstaluj zależności:
   - `npm install`
3. Uruchom aplikację:
   - `npm run dev`

### 3. Uruchamianie Electron (jeśli potrzebny)

1. W katalogu głównym projektu wykonaj:
   - `npm install`
2. Upewnij się, że serwer frontendu działa na `http://localhost:5173`
3. Uruchom:
   - `npm start`

> Ważne: Electron ładuje `http://localhost:5173`, dlatego frontend musi być uruchomiony przed startem Electron.

## Struktura bazy danych (kolekcje MongoDB)

Aplikacja używa bazy `university_db` z 5 kolekcjami:

### `users` — dane autentykacji
```javascript
{
  _id: ObjectId,
  username: string,        // email użytkownika
  password: string,        // hasło (WAŻNE: powinno być hashowane!)
  full_name: string        // pełne imię
}
```

### `profiles` — profil studenta
```javascript
{
  _id: ObjectId,
  username: string,        // email studenta (klucz obcy)
  firstName: string,       // imię
  lastName: string,        // nazwisko
  studentId: string,       // numer indeksu
  major: string,           // kierunek studiów
  year: string,            // rok studiów ("1", "2", "3", "4")
  email: string,           // adres e-mail
  phone: string,           // numer telefonu
  address: string,         // adres zamieszkania
  avatar: string,          // zdjęcie profilu (data:image/...)
  avatarChanged: boolean   // flaga zmiany awatara
}
```

### `grades` — oceny studenta
```javascript
{
  _id: ObjectId,
  username: string,        // email studenta
  subject: string,         // nazwa przedmiotu
  teacher: string,         // imię wykładowcy
  grades: Array(number),   // tablica ocen [3, 4, 5, 4]
  status: string           // status ("zaliczony" / "niezaliczony")
}
```

### `timetable` — harmonogram zajęć
```javascript
{
  _id: ObjectId,
  username: string,        // email studenta
  day: string,             // dzień tygodnia ("Poniedziałek", "Wtorek", ...)
  time: string,            // czas zajęć ("10:00 - 11:30")
  subject: string,         // nazwa przedmiotu
  room: string,            // numer sali ("Lab 115")
  teacher: string,         // imię wykładowcy
  type: string             // typ zajęć ("lab", "lecture", "tutorial")
}
```

### `attendance` — frekwencja
```javascript
{
  _id: ObjectId,
  username: string,        // email studenta
  subject: string,         // nazwa przedmiotu
  totalClasses: number,    // łącznie zajęć
  attended: number,        // uczęszczane
  excused: number,         // nieobecności usprawiedliwione
  unexcused: number,       // nieobecności nieusprawiedliwione
  percentage: number       // procent obecności (obliczane: attended/totalClasses*100)
}
```

## Struktura projektu

```
/frontend      # Interfejs React + Vite
/backend       # Serwer FastAPI
main.js        # Punkt wejścia Electron
package.json   # Skrypty npm / Electron
```

## Co trzeba ulepszyć

- hasła w bazie powinny być hashowane
- autentykację należy wykonać za pośrednictwem JWT lub tokena sesji
- walidację pól logowania można wydzielić do osobnego narzędzia

