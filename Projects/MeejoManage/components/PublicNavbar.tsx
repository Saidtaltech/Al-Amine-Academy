import React, { useState, useEffect } from 'react';
import { LogoIcon } from './Icons';

interface PublicNavbarProps {
    currentPage: string;
    setPage: (page: string) => void;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentPage, setPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLanding = currentPage === 'landing';
    
    // Fixed: The navbar was being hidden with -translate-y-full which prevented interaction. 
    // Now it's always visible but with transition effects.
    const navWrapperClasses = `fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out
        ${(isLanding && !isScrolled && !isMobileMenuOpen) 
            ? 'bg-transparent border-transparent' 
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
        }
        ${isMobileMenuOpen ? 'h-screen bg-white' : 'h-auto'}
    `;

    const handleNavigation = (hash: string) => {
        if (window.location.hash === hash) {
            window.scrollTo(0, 0);
        }
        window.location.hash = hash;
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { id: 'landing', label: 'Accueil', hash: '#' },
        { id: 'mall', label: 'Marché', hash: '#mall' },
        { id: 'calculator', label: 'Calculateur', hash: '#calculator' },
        { id: 'meejo-services', label: 'Services', hash: '#services' },
    ];

    return (
        <nav className={navWrapperClasses}>
            {/* Header Strip */}
            <div className={`relative z-50 transition-all duration-300 px-4 md:px-6`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center py-2">
                    
                    {/* Logo Area */}
                    <div 
                        className={`flex items-center gap-2 cursor-pointer group ${isLanding && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-slate-800'}`} 
                        onClick={() => handleNavigation('#')}
                    >
                        <div className="bg-blue-600 text-white p-2 rounded-xl transition-colors duration-300">
                            <LogoIcon className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight font-heading">Meejo Manage</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className={`hidden md:flex items-center gap-8 font-medium text-sm ${isLanding && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-slate-800'}`}>
                        {navItems.map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => handleNavigation(item.hash)} 
                                className={`relative group py-2 transition-opacity hover:opacity-100 ${currentPage === item.id ? 'opacity-100 font-bold text-blue-600' : 'opacity-80'}`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out 
                                    ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                                />
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                         <button 
                            onClick={() => handleNavigation('#login')} 
                            className={`hidden md:block px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm ${isLanding && !isScrolled && !isMobileMenuOpen ? 'bg-white text-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            SE CONNECTER
                        </button>

                        {/* Mobile Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className={`md:hidden p-3 rounded-xl transition-all duration-300 shadow-sm ${isLanding && !isScrolled && !isMobileMenuOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-slate-900 active:bg-gray-200'} ${isMobileMenuOpen ? 'rotate-90 bg-gray-50' : ''}`}
                            aria-label="Menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`absolute inset-0 z-40 bg-white transition-all duration-300 md:hidden flex flex-col pt-24 px-6 space-y-4 overflow-y-auto
                ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
            >
                {navItems.map((item, idx) => (
                    <button 
                        key={item.id}
                        onClick={() => handleNavigation(item.hash)} 
                        className={`text-lg font-bold text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group
                            ${currentPage === item.id 
                                ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100 pl-6' 
                                : 'text-slate-600 hover:bg-gray-50 active:scale-95 border border-transparent'
                            }
                        `}
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <span className="flex items-center gap-3">
                            {item.label}
                        </span>
                        
                        {currentPage === item.id && <div className="w-2 h-2 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50"></div>}
                    </button>
                ))}
                
                <div className="h-px bg-gray-100 my-2"></div>

                <button 
                    onClick={() => handleNavigation('#login')} 
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl mt-4 animate-slide-in hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2"
                    style={{ animationDelay: '200ms' }}
                >
                    SE CONNECTER
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-8 pb-8">
                    © 2025 Meejo Manage
                </p>
            </div>
        </nav>
    );
};

export default PublicNavbar;