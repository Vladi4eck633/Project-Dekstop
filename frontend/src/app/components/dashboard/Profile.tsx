import { User, Mail, Phone, GraduationCap, Calendar, MapPin, Camera, Edit2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  studentId: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  avatarChanged?: boolean; 
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const userEmail = localStorage.getItem('studentName');


  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    studentId: '',
    major: '',
    year: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    avatarChanged: false
  });

  const [tempData, setTempData] = useState<ProfileData>(profileData);

  
  useEffect(() => {
    if (userEmail) {
      fetch(`http://127.0.0.1:8000/profile/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setProfileData(data);
            setTempData(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Błąd ładowania profilu:", err);
          setLoading(false);
        });
    }
  }, [userEmail]);


  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  // 2. СОХРАНЕНИЕ ДАННЫХ В БД
  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/profile/${userEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: tempData.firstName,
          lastName: tempData.lastName,
          phone: tempData.phone,
          address: tempData.address,
          avatar: tempData.avatar 
        }),
      });

      if (response.ok) {
       
        const hasNewAvatar = tempData.avatar !== profileData.avatar;
        setProfileData({ 
          ...tempData, 
          avatarChanged: hasNewAvatar ? true : profileData.avatarChanged 
        });
        setIsEditing(false);
      } else {
        alert("Błąd zapisu na békendzie");
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania profilu:", error);
      alert("Błąd połączenia z serwerem");
    }
  };

  

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({ ...tempData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (loading) {
    return <div className="text-foreground p-10 text-center">Ładowanie danych profilu...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="w-8 h-8 text-blue-400" />
            Mój profil
          </h1>
          <p className="text-muted-foreground mt-1">Zarządzaj swoimi danymi osobowymi</p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
          >
            <Edit2 className="w-5 h-5" />
            Edytuj profil
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-lg transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-colors shadow-lg shadow-green-500/30"
            >
              <Save className="w-5 h-5" />
              Zapisz
            </button>
          </div>
        )}
      </div>

      
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-500"></div>

        
        <div className="px-6 pt-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-card shadow-xl bg-input overflow-hidden">
                {tempData.avatar ? (
                  <img
                    src={tempData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

             
              {isEditing && !profileData.avatarChanged && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
              
            </div>

            <div className="text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-foreground">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-muted-foreground">Nr indeksu: {profileData.studentId}</p>
              <p className="text-blue-600 font-medium">
                {profileData.major} • Rok {profileData.year}
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-card/50">
          <h2 className="font-semibold text-foreground">Dane osobowe</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Imię</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.firstName}
                onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.firstName}</span>
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Nazwisko</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.lastName}
                onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.lastName}</span>
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Numer indeksu
            </label>
            <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">{profileData.studentId}</span>
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Kierunek studiów
            </label>
            
            <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.major}</span>
            </div>
            
          </div>

         
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Rok studiów
            </label>
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Rok {profileData.year}</span>
              </div>
          </div>
        </div>
      </div>

      
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-card/50">
          <h2 className="font-semibold text-foreground">Dane kontaktowe</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.email}</span>
              </div>
            
          </div>

          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Telefon</label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData.phone}
                onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.phone}</span>
              </div>
            )}
          </div>

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Adres</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.address}
                onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{profileData.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
