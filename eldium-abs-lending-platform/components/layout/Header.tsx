
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    IconUserCircle, 
    IconSun, 
    IconMoon, 
    IconBell, 
    IconEnvelope, 
    IconLocationDot,
    IconChevronDown,
    IconSettings,
    IconLogout,
    IconCheckCircle
} from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import { MOCK_USER_PROFILE, MOCK_NOTIFICATIONS, MOCK_MESSAGES } from '../../constants';
import { NotificationItem, MessageItem } from '../../types';
import { useClickOutside } from '../../hooks/useClickOutside';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const { themeName, setThemeName, primaryColor } = useTheme();
  const user = MOCK_USER_PROFILE;

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(notificationsRef, () => setNotificationsOpen(false));
  useClickOutside(messagesRef, () => setMessagesOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };

  const unreadNotificationsCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const unreadMessagesCount = MOCK_MESSAGES.filter(m => m.unread).length;

  return (
    <header className="bg-white dark:bg-gray-800 h-16 flex justify-between items-center px-6 border-b border-gray-200 dark:border-gray-700 relative z-30">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{pageTitle}</h1>
      
      <div className="flex items-center space-x-3 md:space-x-5">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Toggle theme"
        >
          {themeName === 'light' ? <IconMoon className="w-5 h-5" /> : <IconSun className="w-5 h-5" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Notifications"
          >
            <IconBell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            )}
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-md shadow-xl border dark:border-gray-700 overflow-hidden">
              <div className="p-3 flex justify-between items-center border-b dark:border-gray-700">
                <h6 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Notifications</h6>
                <button className="text-xs text-primary hover:underline">Mark all as read</button>
              </div>
              <ul className="max-h-80 overflow-y-auto divide-y dark:divide-gray-700">
                {MOCK_NOTIFICATIONS.map((n: NotificationItem) => (
                  <li key={n.id} className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${!n.read ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-1.5 rounded-full text-white ${n.bgColorClass || 'bg-primary'}`}>
                        {/* FIX: Removed redundant cast as n.icon type in NotificationItem is now React.ReactElement<{ className?: string }> */}
                        {React.cloneElement(n.icon, { className: "w-4 h-4"})}
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${!n.read ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{n.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{n.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-2 text-center border-t dark:border-gray-700">
                <a href="#/notifications" className="text-xs font-medium text-primary hover:underline">View all notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className="relative" ref={messagesRef}>
          <button 
            onClick={() => setMessagesOpen(!messagesOpen)}
            className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Messages"
          >
            <IconEnvelope className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
                 <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            )}
          </button>
          {messagesOpen && (
             <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-md shadow-xl border dark:border-gray-700 overflow-hidden">
              <div className="p-3 border-b dark:border-gray-700">
                <h6 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Messages</h6>
              </div>
              <ul className="max-h-80 overflow-y-auto divide-y dark:divide-gray-700">
                {MOCK_MESSAGES.map((m: MessageItem) => (
                  <li key={m.id} className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${m.unread ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <img src={m.senderAvatarUrl} alt={m.senderName} className="w-8 h-8 rounded-full"/>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                           <p className={`text-xs font-medium ${m.unread ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{m.senderName}</p>
                           <p className="text-xs text-gray-400 dark:text-gray-500">{m.time}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.messageSnippet}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
               <div className="p-2 text-center border-t dark:border-gray-700">
                <a href="#/messages" className="text-xs font-medium text-primary hover:underline">View all messages</a>
              </div>
            </div>
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
          <IconLocationDot className="w-4 h-4" />
          <span>{user.location || 'N/A'}</span>
        </div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 cursor-pointer group p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="User profile"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <IconUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            )}
            <div className="hidden sm:block">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary">{user.name}</span>
            </div>
            <IconChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-xl border dark:border-gray-700 py-1">
              <div className="px-4 py-2 border-b dark:border-gray-700">
                 <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
              <NavLink to="/settings" 
                onClick={() => setProfileOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconUserCircle className="w-4 h-4 mr-2" /> View Profile (Mock)
              </NavLink>
              <NavLink to="/settings" 
                onClick={() => setProfileOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconSettings className="w-4 h-4 mr-2" /> Account Settings
              </NavLink>
              <button 
                onClick={() => { alert('Logout functionality'); setProfileOpen(false); }}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconLogout className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;