
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { User, AppSettings } from '../types';
import { t } from '../constants';
import { LogoIcon, EyeIcon, EyeOffIcon } from '../components/Icons';

const Login = ({ onLogin, settings }: { onLogin: (user: User) => void, settings: AppSettings }) => {
  const [step, setStep] = useState<'CREDENTIALS' | 'MFA'>('CREDENTIALS');
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { 
    const load = async () => {
      const data = await StorageService.getUsers();
      setUsers(data);
    };
    load();
  }, []);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    // Dev Override
    if ((cleanEmail === 'tallsaid99gmail.com' || cleanEmail === 'tallsaid99@gmail.com') && (cleanPass === 'Wrong2022.' || cleanPass === 'Wrong2022')) {
        let devUser = users.find(u => u.role === 'DEVELOPER');
        if (!devUser) {
            devUser = { id: '0', storeId: 'ALL', name: 'Super Developer', role: 'DEVELOPER', pin: '000000', email: 'tallsaid99gmail.com', mfaEnabled: true, mfaSecret: 'JBSWY3DPEHPK3PXP' };
        }
        setSelectedUser(devUser);
        setStep('MFA');
        setError('');
        return;
    }

    const user = users.find(u => u.email === cleanEmail && u.pin === cleanPass);
    if (user) {
      setSelectedUser(user);
      if (user.mfaEnabled) {
          setStep('MFA');
      } else {
          onLogin(user); 
      }
      setError('');
    } else {
      setError('Email ou PIN incorrect.');
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedUser) return;

      if (selectedUser.mfaEnabled && selectedUser.mfaSecret) {
          const cleanOtp = otp.trim().replace(/\s+/g, '');
          const isValid = StorageService.verifyMfa(cleanOtp, selectedUser.mfaSecret);
          if (isValid) {
              onLogin(selectedUser);
          } else {
              setError('Code Authenticator invalide. Vérifiez votre application.');
              setOtp('');
          }
      } else {
          onLogin(selectedUser);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-24 pb-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center relative z-10 mx-4 border border-slate-300">
        <div className="mb-6 flex justify-center">
           <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <LogoIcon className="w-12 h-12 text-white" />
           </div>
        </div>
        <h1 className="text-2xl font-extrabold mb-1 text-slate-800 font-heading">Meejo Manage</h1>
        
        {step === 'CREDENTIALS' ? (
            <>
                <p className="text-slate-500 mb-8 text-sm">{t('login_subtitle', settings.language)}</p>
                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder={t('email_placeholder', settings.language)} 
                            className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition outline-none text-slate-900 placeholder-slate-500 font-medium" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="relative">
                         <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="PIN / Mot de passe" 
                            className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition outline-none text-slate-900 placeholder-slate-500 font-medium" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                    <button className="w-full py-4 text-white font-bold rounded-xl shadow-lg bg-primary hover:bg-blue-600 transition">
                        {t('login_button', settings.language)}
                    </button>
                </form>
            </>
        ) : (
            <>
                <div className="mb-6">
                    <h3 className="font-bold text-lg mb-1 text-slate-800">Authentification Google</h3>
                    <p className="text-slate-500 text-xs">Entrez le code à 6 chiffres</p>
                </div>
                <form onSubmit={handleMfaSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="000 000" 
                        className="w-full text-center text-3xl tracking-[0.5em] font-mono p-4 border-2 border-slate-300 rounded-xl focus:border-primary outline-none transition text-slate-900 bg-white" 
                        value={otp} 
                        onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} 
                        maxLength={6} 
                        autoFocus 
                    />
                    {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</p>}
                    <button className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition bg-primary">
                        Valider
                    </button>
                </form>
                <button onClick={() => setStep('CREDENTIALS')} className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline">Retour</button>
            </>
        )}
      </div>
    </div>
  );
};

export default Login;
