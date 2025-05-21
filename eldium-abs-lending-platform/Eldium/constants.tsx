
import React from 'react';
// FIX: Removed self-import of icons defined in this file. The original line was:
// import { IconActivityAlert, IconActivityAssessment, IconActivityNewDeal, IconBell, IconCreditEngine, IconDashboard, IconDeals, IconPortfolio, IconSettings, IconUserCircle, IconUsers } from './constants'; // Ensure all used icons are imported
import { ThemeOption, NotificationItem, MessageItem, ApiEndpointDefinition, Deal, Facility, ApiResponseData, ApiRequestData } from './types';


export const APP_TITLE = "Eldium ABS";

// SVG Icons as React Components

export const IconChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const IconDashboard: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5M3.75 3V1.5M13.5 7.5h4.5M13.5 11.25h4.5m0-7.5V15A2.25 2.25 0 0115.75 17.25h-3.375A2.25 2.25 0 0110.125 15V7.5A2.25 2.25 0 0112.375 5.25H15m0-2.25h3.375A2.25 2.25 0 0120.625 5.25v9.75c0 .34-.028.675-.083 1M15 5.25V3m0 2.25h-2.625A2.25 2.25 0 0010.125 7.5v7.5c0 .34.028.675.083 1M3.75 21v-6.75A2.25 2.25 0 016 12h2.25m-4.5 9H5.625M3.75 21v-1.5m0 1.5h1.5M13.5 11.25v6.75A2.25 2.25 0 0111.25 20.25H9M13.5 11.25V9.75M13.5 11.25h-1.5m1.5 0h1.5M15 17.25h3.375c.34 0 .675-.028 1-.083M15 17.25v1.5m0-1.5h-1.5M15 17.25V15m0 2.25h-2.625a2.25 2.25 0 01-2.25-2.25V15c0-.34.028.675.083-1" />
  </svg>
);

export const IconDeals: React.FC<{ className?: string }> = ({ className }) => ( // Existing icon, may be reused or replaced if different style needed
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const IconPortfolio: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const IconCreditEngine: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375.993L6.25 21M9 17.25v-2.25M9 17.25h2.25M15 17.25v1.007a3 3 0 00.375.993l2.375 1.75M15 17.25v-2.25M15 17.25h-2.25m-3-6.75V6.75c0-1.125.672-2.162 1.683-2.595S13.438 3.75 14.25 3.75s1.688-.045 2.567.39c1.01.432 1.683 1.47 1.683 2.595v3.75M12 6.75v6.75m0-6.75H9.375M12 6.75h2.625M4.5 9.75v2.25c0 1.125.672 2.162 1.683 2.595S8.562 15 9.375 15s1.688-.045 2.567.39c1.01.432 1.683 1.47 1.683 2.595v3.75c0 1.125-.672 2.162-1.683 2.595s-1.875.545-2.567.39c-.692-.155-1.308-.538-1.683-1.095l-2.25-3.375c-.375-.557-.375-1.283 0-1.84.375-.557.99-.94 1.683-1.095.692-.155 1.875-.045 2.567.39.375.225.607.568.683.948V9.75M4.5 9.75H2.25M4.5 9.75H6" />
  </svg>
);

export const IconUsers: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

export const IconReports: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const IconHelpCenter: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const IconContactSupport: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-1.253a1.125 1.125 0 00-1.034.018l-2.805 1.592L9.75 16.5l-2.805-1.592a1.125 1.125 0 00-1.034-.018L3.75 16.173V12.75c0-1.136.847-2.1 1.98-2.193.34-.027.68-.052 1.02-.072V3.75c0-1.136.847-2.1 1.98-2.193L8.25 1.5h2.25l.481.072A1.125 1.125 0 0112 2.827l2.805 1.592L17.25 6l2.805-1.592a1.125 1.125 0 011.034-.018l2.184 1.253v3.091c-.34-.02-.68-.045-1.02-.072zM7.5 15.75c.621 0 1.125-.504 1.125-1.125V12c0-.621-.504-1.125-1.125-1.125H4.5A1.125 1.125 0 003.375 12v2.625c0 .621.504 1.125 1.125 1.125H7.5zM16.5 15.75c.621 0 1.125-.504 1.125-1.125V12c0-.621-.504-1.125-1.125-1.125H13.5A1.125 1.125 0 0012.375 12v2.625c0 .621.504 1.125 1.125 1.125H16.5z" />
  </svg>
);


export const IconBell: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const IconEnvelope: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const IconLocationDot: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);


export const IconWallet: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V12m18 0v-6.75A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25V12m15-3H9" />
  </svg>
);

export const IconBriefcase: React.FC<{ className?: string }> = ({ className }) => ( // For Active Deals KPI
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.155V12a2.25 2.25 0 00-2.25-2.25h-5.5V7.5A2.25 2.25 0 0010.25 5.25h-4.5A2.25 2.25 0 003.5 7.5v4.5A2.25 2.25 0 005.75 14.25h12.5a2.25 2.25 0 012 2.046M3.5 10.5H18.5" />
  </svg>
);

export const IconDocumentText: React.FC<{ className?: string }> = ({ className }) => ( // For Avg Deal Size KPI
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 17.25h6M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const IconChartPie: React.FC<{ className?: string }> = ({ className }) => ( // For Risk Score KPI
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
);

export const IconPlusCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconEye: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const IconPencil: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const IconUpload: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const IconDocumentArrowUp: React.FC<{ className?: string }> = ({ className }) => ( // Used for Generate Report
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const IconPlay: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const IconBellAlert: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M12 6.75h.008v.008H12V6.75z" />
  </svg>
);

export const IconDonutChartPlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 120" className={className || "w-48 h-48"} xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#E0E0E0" strokeWidth="20" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#4A90E2" strokeWidth="20" strokeDasharray="188.495" strokeDashoffset="0" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#F5A623" strokeWidth="20" strokeDasharray="188.495" strokeDashoffset="188.495" /* Placeholder offset for segment */ transform="rotate(36 60 60)" />
       <circle cx="60" cy="60" r="50" fill="none" stroke="#50E3C2" strokeWidth="20" strokeDasharray="188.495" strokeDashoffset="125.66"  transform="rotate(160 60 60)"/>
      <circle cx="60" cy="60" r="30" fill="white" />
    </svg>
);

export const IconLineChartPlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 300 150" className={className || "w-full h-64"} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="150" fill="#F7F8FA" />
        {/* Grid lines */}
        {[1, 2, 3, 4].map(i => <line key={`h-${i}`} x1="10" y1={i * 30 + 10} x2="290" y2={i * 30 + 10} stroke="#E5E7EB" strokeWidth="1"/>)}
        {[1, 2, 3, 4, 5].map(i => <line key={`v-${i}`} x1={i * 50 + 30} y1="10" x2={i * 50 + 30} y2="140" stroke="#E5E7EB" strokeWidth="1"/>)}
        {/* Data lines */}
        <polyline points="40,100 90,80 140,90 190,70 240,85 290,60" fill="none" stroke="#4B3AFF" strokeWidth="2"/>
        <polyline points="40,120 90,110 140,115 190,100 240,105 290,90" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="4"/>
        {/* Axis */}
        <line x1="30" y1="10" x2="30" y2="140" stroke="#D1D5DB" strokeWidth="1.5"/>
        <line x1="30" y1="140" x2="290" y2="140" stroke="#D1D5DB" strokeWidth="1.5"/>
    </svg>
);

export const IconNewDeal: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5 mr-2"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);


// Existing Icons (can be removed if fully replaced by above or kept if used elsewhere)
export const IconFacilities: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a3.375 3.375 0 013.375 3.375v3.375a3.375 3.375 0 01-3.375 3.375H9V6.75z" />
  </svg>
);

export const IconSettings: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-.111l.281.04c.09.013.18.026.27.042a8.915 8.915 0 013.982 3.982c.016.09.03.18.042.27l.04.281c.099.542.099 1.11-.111 1.11l-.281-.04a8.915 8.915 0 01-3.982-3.982A8.915 8.915 0 018.47 3.982l-.04-.281c-.542-.099-1.007-.56-1.11.111zM12 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" />
  </svg>
);

export const IconSun: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25c0 1.352.773 2.504 1.884 3.033A4.482 4.482 0 0012 17.25a4.5 4.5 0 000-9z" />
  </svg>
);

export const IconMoon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21c3.089 0 5.897-1.459 7.752-3.768A9.742 9.742 0 0121.752 15.002z" />
  </svg>
);

export const IconUserCircle: React.FC<{ className?: string }> = ({ className }) => ( // Original user icon for profile
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const IconChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const IconLogout: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);
export const IconCheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export const DEFAULT_THEME_OPTIONS: ThemeOption[] = [
  { name: 'Eldium Indigo', label: 'Eldium Indigo', primaryColor: '#4B3AFF' }, // New default from screenshot
  { name: 'Emerald Green', label: 'Emerald Green', primaryColor: '#059669' },
  { name: 'Royal Purple', label: 'Royal Purple', primaryColor: '#7c3aed' },
  { name: 'Graphite Gray', label: 'Graphite Gray', primaryColor: '#4b5563' },
];

export const MOCK_USER_PROFILE = {
  name: 'Sarah Johnson',
  role: 'Manager Director', // Updated role
  avatarUrl: `https://picsum.photos/seed/sarahj/100/100`, // New seed for different avatar
  location: 'Sydney, AU',
};

export const IconActivityNewDeal: React.FC<{ className?: string }> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z" />
    </svg>
);
export const IconActivityAssessment: React.FC<{ className?: string }> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.7071 9.29289C17.0976 8.90237 17.0976 8.2692 16.7071 7.87868C16.3166 7.48816 15.6834 7.48816 15.2929 7.87868L10.5 12.6716L8.70711 10.8787C8.31658 10.4882 7.68342 10.4882 7.29289 10.8787C6.90237 11.2692 6.90237 11.9024 7.29289 12.2929L9.79289 14.7929C10.1834 15.1834 10.8166 15.1834 11.2071 14.7929L16.7071 9.29289Z" />
    </svg>
);
export const IconActivityCash: React.FC<{ className?: string }> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM10 7H14L12 10L14 13H10L12 16L10 19H14L12 16L10 13H14L12 10L10 7Z" transform="rotate(15 12 12)" />
    </svg>
);
export const IconActivityAlert: React.FC<{ className?: string }> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11 7V13H13V7H11ZM11 15V17H13V15H11Z" />
    </svg>
);

export const IconThreeDots: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

// New Icons for placeholder pages:
export const IconBookOpen: React.FC<{ className?: string }> = ({ className }) => ( // For Help Center / Documentation
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const IconPaperAirplane: React.FC<{ className?: string }> = ({ className }) => ( // For Contact Support Send
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const IconSearch: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const IconFilter: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
);

export const IconDownload: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const IconCalendarDays: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008z" />
  </svg>
);

export const IconCodeBracket: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0l-4.5 16.5" />
  </svg>
);


// MOCK DATA for Header Dropdowns
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', icon: <IconActivityNewDeal className="w-5 h-5" />, title: 'New Deal Submitted', description: 'Project Phoenix (ID: D002) needs review.', time: '15m ago', read: false, bgColorClass: 'bg-blue-500' },
  { id: 'n2', icon: <IconActivityAlert className="w-5 h-5" />, title: 'Covenant Alert', description: 'Facility F002 DSCR approaching limit.', time: '1h ago', read: false, bgColorClass: 'bg-yellow-500' },
  { id: 'n3', icon: <IconActivityAssessment className="w-5 h-5" />, title: 'Assessment Complete', description: 'Deal D003 risk score: 7.2.', time: '3h ago', read: true, bgColorClass: 'bg-green-500' },
  { id: 'n4', icon: <IconBell className="w-5 h-5" />, title: 'System Maintenance', description: 'Scheduled for Sunday 2 AM.', time: 'Yesterday', read: true, bgColorClass: 'bg-gray-500' },
];

export const MOCK_MESSAGES: MessageItem[] = [
  { id: 'm1', senderAvatarUrl: 'https://picsum.photos/seed/john/40/40', senderName: 'John Doe', messageSnippet: 'Hey, can we discuss Project Titan numbers?', time: '5m ago', unread: true },
  { id: 'm2', senderAvatarUrl: 'https://picsum.photos/seed/jane/40/40', senderName: 'Jane Smith', messageSnippet: 'Meeting for facility F001 reschedule...', time: '2h ago', unread: false },
  { id: 'm3', senderAvatarUrl: 'https://picsum.photos/seed/mike/40/40', senderName: 'Mike Brown', messageSnippet: 'Approved the latest batch of documents.', time: '1d ago', unread: false },
];


// MOCK API Data (simplified versions)
const mockApiDeals: Deal[] = [
  { id: 'D001', name: 'Project Titan (API)', originator: 'FinCorp', amount: 25000000, currency: 'USD', status: 'Funded', submittedDate: '2023-10-15', creditScore: 820, facilityId: 'F001', assetType: 'Auto Loans', riskScore: 7.8 },
  { id: 'D002', name: 'Phoenix Initiative (API)', originator: 'Asset Co', amount: 15000000, currency: 'USD', status: 'Approved', submittedDate: '2023-11-01', creditScore: 780, facilityId: 'F002', assetType: 'Equipment Leases', riskScore: 7.1  },
];
const mockApiFacilities: Facility[] = [
  { id: 'F001', name: 'Alpha Warehouse (API)', type: 'Warehouse', limit: 100000000, utilized: 65000000, currency: 'USD', originator: 'FinCorp', status: 'Active' },
];

// MOCK API Endpoint Definitions
export const MOCK_API_ENDPOINTS: ApiEndpointDefinition[] = [
  {
    id: 'get_deals',
    method: 'GET',
    pathTemplate: '/api/v1/deals',
    description: 'Retrieve a list of all deals.',
    defaultPath: '/api/v1/deals',
    handler: async (req, data) => {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      let deals = data.deals;
      if (req.queryParams.find(p => p.name === 'originator')?.value) {
        deals = deals.filter(d => d.originator === req.queryParams.find(p => p.name === 'originator')?.value);
      }
      return { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' }, body: deals };
    }
  },
  {
    id: 'get_deal_by_id',
    method: 'GET',
    pathTemplate: '/api/v1/deals/{dealId}',
    description: 'Retrieve a specific deal by its ID.',
    defaultPath: '/api/v1/deals/D001',
    handler: async (req, data) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const dealId = req.pathParams.dealId;
      const deal = data.deals.find(d => d.id === dealId);
      if (deal) {
        return { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' }, body: deal };
      }
      return { status: 404, statusText: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: { error: 'Deal not found' } };
    }
  },
  {
    id: 'create_deal',
    method: 'POST',
    pathTemplate: '/api/v1/deals',
    description: 'Create a new deal.',
    defaultPath: '/api/v1/deals',
    defaultBody: JSON.stringify({
      name: "New API Deal",
      originator: "APITest Co",
      assetType: "Test Assets",
      amount: 10000000,
      currency: "AUD",
      status: "Draft"
    }, null, 2),
    handler: async (req, data) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const newDealData = JSON.parse(req.body || '{}') as Partial<Deal>;
        if (!newDealData.name || !newDealData.originator) {
            return { status: 400, statusText: 'Bad Request', headers: {'Content-Type': 'application/json'}, body: {error: 'Missing required fields: name, originator'}};
        }
        const newDeal: Deal = {
          id: `D${Math.floor(Math.random() * 9000) + 1000}`,
          submittedDate: new Date().toISOString().split('T')[0],
          ...newDealData,
          // Provide defaults for any missing required fields from Deal that are not in Partial<Deal>
          amount: newDealData.amount || 0,
          currency: newDealData.currency || 'USD',
          status: newDealData.status || 'Draft',

        } as Deal; // Cast to Deal after ensuring all required fields are present
        data.deals.push(newDeal); // Add to mock data store for session persistence
        return { status: 201, statusText: 'Created', headers: { 'Content-Type': 'application/json', 'Location': `/api/v1/deals/${newDeal.id}` }, body: newDeal };
      } catch (e) {
        return { status: 400, statusText: 'Bad Request', headers: { 'Content-Type': 'application/json' }, body: { error: 'Invalid JSON body' } };
      }
    }
  },
   {
    id: 'update_deal',
    method: 'PUT',
    pathTemplate: '/api/v1/deals/{dealId}',
    description: 'Update an existing deal by ID.',
    defaultPath: '/api/v1/deals/D001',
    defaultBody: JSON.stringify({ status: "Approved", riskScore: 7.9 }, null, 2),
    handler: async (req, data) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      const dealId = req.pathParams.dealId;
      const dealIndex = data.deals.findIndex(d => d.id === dealId);
      if (dealIndex === -1) {
        return { status: 404, statusText: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: { error: 'Deal not found' } };
      }
      try {
        const updates = JSON.parse(req.body || '{}');
        data.deals[dealIndex] = { ...data.deals[dealIndex], ...updates };
        return { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' }, body: data.deals[dealIndex] };
      } catch (e) {
        return { status: 400, statusText: 'Bad Request', headers: { 'Content-Type': 'application/json' }, body: { error: 'Invalid JSON body' } };
      }
    }
  },
  {
    id: 'delete_deal',
    method: 'DELETE',
    pathTemplate: '/api/v1/deals/{dealId}',
    description: 'Delete a deal by ID.',
    defaultPath: '/api/v1/deals/D002',
    handler: async (req, data) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      const dealId = req.pathParams.dealId;
      const dealIndex = data.deals.findIndex(d => d.id === dealId);
      if (dealIndex === -1) {
        return { status: 404, statusText: 'Not Found', headers: { 'Content-Type': 'application/json' }, body: { error: 'Deal not found' } };
      }
      data.deals.splice(dealIndex, 1);
      return { status: 204, statusText: 'No Content', headers: {}, body: null };
    }
  },
  {
    id: 'get_facilities',
    method: 'GET',
    pathTemplate: '/api/v1/facilities',
    description: 'Retrieve a list of all facilities.',
    defaultPath: '/api/v1/facilities',
    handler: async (req, data) => {
        await new Promise(resolve => setTimeout(resolve, 250));
        return { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' }, body: data.facilities };
    }
  }
];

export const MOCK_API_DATA_STORE = {
    deals: [...mockApiDeals],
    facilities: [...mockApiFacilities],
};