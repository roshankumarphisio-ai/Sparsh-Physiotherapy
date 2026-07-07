import { useState, useEffect, useMemo, FormEvent } from 'react';
import { 
  Lock, User, Calendar, Clock, Search, LogOut, CheckCircle, 
  XCircle, Filter, Download, RefreshCw, MessageSquare, Phone, 
  ShieldCheck, FileText, Check, ChevronDown, Trash2, CalendarDays, 
  UserCheck, ClipboardList, Info, AlertTriangle, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { getAppointments, Appointment, supabaseConfig } from '../lib/supabase';
import { SERVICES } from '../data';

interface AdminPanelProps {
  onClose: () => void;
}

type AppointmentStatus = 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sparsh_admin_session') === 'active';
    }
    return false;
  });

  // Data State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncSource, setSyncSource] = useState<'both' | 'supabase' | 'local'>('both');
  const [dbError, setDbError] = useState<string | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedSlot, setSelectedSlot] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Appointment Actions / Local Overrides (Status & Notes)
  const [statuses, setStatuses] = useState<Record<string, AppointmentStatus>>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('sparsh_appointment_statuses') || '{}');
      } catch {
        return {};
      }
    }
    return {};
  });

  const [clinicalNotes, setClinicalNotes] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('sparsh_appointment_clinical_notes') || '{}');
      } catch {
        return {};
      }
    }
    return {};
  });

  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [editingNotesText, setEditingNotesText] = useState('');

  // Credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'drroshan@sparsh';

  // Handle Login
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('sparsh_admin_session', 'active');
      setLoginError(null);
    } else {
      setLoginError('Invalid Username or Password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sparsh_admin_session');
  };

  // Fetch / Sync Appointments
  const loadData = async () => {
    setIsLoading(true);
    setDbError(null);
    let supabaseList: Appointment[] = [];
    let localList: Appointment[] = [];

    // 1. Fetch from Supabase
    try {
      const { data, error } = await getAppointments();
      if (error) {
        console.warn('Supabase fetch issue:', error);
        setDbError(`Supabase connection note: ${error.message || 'Table not found or offline.'}`);
      } else if (data) {
        supabaseList = data;
      }
    } catch (err: any) {
      console.warn('Network issue fetching from Supabase:', err);
      setDbError('Could not reach Supabase. Loading local offline database copy.');
    }

    // 2. Fetch from LocalStorage fallback
    try {
      localList = JSON.parse(localStorage.getItem('sparsh_appointments') || '[]');
    } catch (e) {
      console.error('Error parsing local appointments:', e);
    }

    // 3. Merge lists seamlessly by ID to prevent duplicates
    const mergedMap = new Map<string, Appointment>();
    
    // Add local ones first
    localList.forEach(item => {
      if (item.id) mergedMap.set(item.id, item);
    });

    // Add Supabase ones (overwriting or complementing)
    supabaseList.forEach(item => {
      if (item.id) mergedMap.set(item.id, item);
    });

    // Sort by created_at descending
    const mergedList = Array.from(mergedMap.values()).sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

    setAppointments(mergedList);
    setIsLoading(false);
  };

  // Load data upon login
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  // Update Status
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = { ...statuses, [id]: newStatus };
    setStatuses(updated);
    localStorage.setItem('sparsh_appointment_statuses', JSON.stringify(updated));
  };

  // Update Clinical Notes
  const handleSaveNotes = (id: string) => {
    const updated = { ...clinicalNotes, [id]: editingNotesText };
    setClinicalNotes(updated);
    localStorage.setItem('sparsh_appointment_clinical_notes', JSON.stringify(updated));
    setActiveNotesId(null);
  };

  // Delete/Remove booking locally
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to archive/remove this appointment record?')) {
      const updatedList = appointments.filter(app => app.id !== id);
      setAppointments(updatedList);

      // Save updated list back to local backup so it persists
      try {
        const localList = JSON.parse(localStorage.getItem('sparsh_appointments') || '[]');
        const filteredLocal = localList.filter((item: any) => item.id !== id);
        localStorage.setItem('sparsh_appointments', JSON.stringify(filteredLocal));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Filtering Logic
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      // 1. Search Query filter (name, phone, message)
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        app.name.toLowerCase().includes(query) || 
        app.phone.includes(query) || 
        (app.message && app.message.toLowerCase().includes(query)) ||
        (app.service && app.service.toLowerCase().includes(query));

      // 2. Service filter
      const matchesService = selectedService === 'all' || 
        app.service.toLowerCase().includes(selectedService.toLowerCase()) ||
        selectedService.toLowerCase().includes(app.service.toLowerCase());

      // 3. Slot filter
      const matchesSlot = selectedSlot === 'all' || app.slot === selectedSlot;

      // 4. Date filter
      let matchesDate = true;
      if (selectedDate) {
        // match YYYY-MM-DD
        matchesDate = app.date === selectedDate || app.date.includes(selectedDate);
      }

      // 5. Status filter
      const appStatus = statuses[app.id || ''] || 'pending';
      const matchesStatus = selectedStatus === 'all' || appStatus === selectedStatus;

      return matchesSearch && matchesService && matchesSlot && matchesDate && matchesStatus;
    });
  }, [appointments, searchQuery, selectedService, selectedSlot, selectedDate, selectedStatus, statuses]);

  // Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    
    // Today's Date formatted YYYY-MM-DD
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = appointments.filter(app => app.date === todayStr || app.date.includes(todayStr)).length;
    
    const pendingCount = appointments.filter(app => (statuses[app.id || ''] || 'pending') === 'pending').length;
    const confirmedCount = appointments.filter(app => statuses[app.id || ''] === 'confirmed').length;

    return { total, todayCount, pendingCount, confirmedCount };
  }, [appointments, statuses]);

  // Export to CSV Functionality
  const exportToCSV = () => {
    if (filteredAppointments.length === 0) {
      alert('No data to export.');
      return;
    }

    const headers = ['ID', 'Patient Name', 'Phone Number', 'Service Required', 'Booking Date', 'Preferred Slot', 'Symptoms/Note', 'Status', 'Clinical Notes', 'Booked At'];
    const csvRows = [headers.join(',')];

    filteredAppointments.forEach(app => {
      const status = statuses[app.id || ''] || 'pending';
      const note = clinicalNotes[app.id || ''] || '';
      
      const row = [
        `"${app.id || ''}"`,
        `"${app.name.replace(/"/g, '""')}"`,
        `"${app.phone}"`,
        `"${app.service.replace(/"/g, '""')}"`,
        `"${app.date}"`,
        `"${app.slot.toUpperCase()}"`,
        `"${(app.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${status.toUpperCase()}"`,
        `"${note.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${app.created_at || ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sparsh_bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF Functionality
  const exportToPDF = () => {
    if (filteredAppointments.length === 0) {
      alert('No patient data to export.');
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    
    // Style config
    const primaryColor = [13, 148, 136]; // Teal primary
    const darkColor = [15, 23, 42]; // Slate 900
    const lightGray = [100, 116, 139]; // Slate 500

    // Title / Header setup
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Sparsh Physiotherapy Clinic', 14, 20);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text('Clinical Lead: Dr. Roshan Kumar Sharma', 14, 26);
    doc.text(`Report Generated: ${new Date().toLocaleString('en-IN')}`, 14, 31);
    doc.text(`Total Patients Shown: ${filteredAppointments.length}`, 14, 36);

    // Separator Line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 196, 40);

    let y = 48;

    filteredAppointments.forEach((app, index) => {
      // Dynamic page boundary checks
      if (y > pageHeight - 55) {
        doc.addPage();
        y = 20;
      }

      const appStatus = statuses[app.id || ''] || 'pending';
      const notesText = clinicalNotes[app.id || ''] || 'No private clinical diagnosis notes provided.';

      // Patient Name Title
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(`${index + 1}. ${app.name}`, 14, y);

      // Status Badge
      const statusText = appStatus.toUpperCase();
      let statusBg = [239, 246, 255]; // light blue
      let statusTextCol = [29, 78, 216]; // deep blue

      if (appStatus === 'confirmed') {
        statusBg = [240, 253, 244]; // light green
        statusTextCol = [21, 128, 61]; // deep green
      } else if (appStatus === 'cancelled') {
        statusBg = [254, 242, 242]; // light red
        statusTextCol = [185, 28, 28]; // deep red
      } else if (appStatus === 'rescheduled') {
        statusBg = [250, 245, 255]; // light purple
        statusTextCol = [107, 33, 168]; // deep purple
      }

      const nameWidth = doc.getTextWidth(`${index + 1}. ${app.name}`);
      const badgeX = Math.min(14 + nameWidth + 6, 140);
      doc.setFillColor(statusBg[0], statusBg[1], statusBg[2]);
      doc.rect(badgeX, y - 4, doc.getTextWidth(statusText) + 6, 6, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(statusTextCol[0], statusTextCol[1], statusTextCol[2]);
      doc.text(statusText, badgeX + 3, y);

      y += 6;

      // Inner details
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text('Contact Phone:', 16, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(app.phone, 42, y);

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text('Required Service:', 110, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(app.service, 142, y);

      y += 5;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text('Preferred Date:', 16, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      
      let formattedDate = app.date;
      try {
        if (app.date && app.date !== 'Not specified') {
          const d = new Date(app.date);
          formattedDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        }
      } catch {}
      doc.text(formattedDate, 42, y);

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text('Time Slot:', 110, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(app.slot.toUpperCase(), 142, y);

      y += 5;

      // Symptoms wrap
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text('Symptoms/Note:', 16, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const messageLines = doc.splitTextToSize(app.message || 'None provided.', 140);
      doc.text(messageLines, 48, y);
      y += (messageLines.length * 4);

      // Private clinical notes
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Clinician Note:', 16, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const clinicalLines = doc.splitTextToSize(notesText, 140);
      doc.text(clinicalLines, 48, y);
      y += (clinicalLines.length * 4) + 6;

      // Card separator
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(14, y - 3, 196, y - 3);
      y += 2;
    });

    // Page numbers
    const totalPages = (doc.internal as any).pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Sparsh Physiotherapy Clinic - Confidential Patient Directory | Page ${i} of ${totalPages}`, 14, pageHeight - 10);
    }

    doc.save(`sparsh_patients_directory_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Helper for status badge styling
  const getStatusStyle = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'rescheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
    }
  };

  // Create formatted direct WhatsApp follow-up link
  const getWhatsAppFollowupLink = (app: Appointment, action: 'confirm' | 'followup') => {
    const formattedPhone = app.phone.replace(/\D/g, '');
    const cleanPhone = formattedPhone.startsWith('91') && formattedPhone.length > 10 
      ? formattedPhone 
      : `91${formattedPhone}`;

    let text = '';
    if (action === 'confirm') {
      text = `Hello ${app.name},\n\nThis is Sparsh Physiotherapy Clinic (Dr. Roshan Kumar Sharma). We are pleased to confirm your appointment reservation:\n\n🩺 Treatment: ${app.service}\n📅 Date: ${app.date}\n⏰ Slot: ${app.slot.toUpperCase()}\n\nPlease reach the clinic 10 minutes before your slot. Let us know if you need any directions!`;
    } else {
      text = `Hello ${app.name},\n\nThis is Sparsh Physiotherapy Clinic. We received your booking request for ${app.service}. We would love to discuss and schedule your initial expert clinical consultation session. Please let us know if you are free for a quick call. Thanks!`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="admin-panel-container" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* 1. Unauthorized LOGIN SCREEN */}
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center px-4 py-16 bg-slate-950 relative overflow-hidden">
          {/* Accent light beams */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
          >
            <div className="flex flex-col items-center gap-2 mb-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-display font-black tracking-tight text-white mt-2">Sparsh Clinical Console</h2>
              <p className="text-xs text-slate-400 max-w-[280px]">Secure clinical booking archive management portal. Authorized clinicians only.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Admin Username ID</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter admin ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Secure Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium placeholder:text-slate-600"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs px-4 py-3 rounded-xl flex items-start gap-2 mt-1">
                  <span className="shrink-0 mt-0.5">⚠️</span>
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/10 cursor-pointer mt-2 text-sm"
              >
                Decrypt & Enter Portal
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> AES-256 Encrypted
              </span>
              <button 
                type="button"
                onClick={onClose}
                className="hover:text-blue-400 transition-colors underline cursor-pointer"
              >
                ← Back to Clinic Website
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        
        /* 2. AUTHENTICATED ADMIN DASHBOARD VIEW */
        <div className="flex-1 flex flex-col">
          
          {/* Header Navigation */}
          <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Brand Branding */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white font-black text-sm">
                  S
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-base text-white tracking-tight">
                      Sparsh Physiotherapy
                    </span>
                    <span className="bg-blue-900/80 text-blue-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-blue-800/60 uppercase tracking-wider">
                      Admin Portal
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold">Clinical Lead: Dr. Roshan Kumar Sharma</p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={loadData}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  Sync Database
                </button>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={exportToCSV}
                    className="flex items-center justify-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-w-[125px]"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    Excel Export
                  </button>

                  <button
                    type="button"
                    onClick={exportToPDF}
                    className="flex items-center justify-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-w-[125px]"
                  >
                    <FileText className="w-3.5 h-3.5 text-teal-400" />
                    Download PDF
                  </button>
                </div>

                <div className="h-5 w-px bg-slate-800 shrink-0"></div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-rose-950/40 border border-rose-900/50 hover:bg-rose-950 text-rose-300 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log Out
                </button>
              </div>

            </div>
          </header>

          {/* Database Info Notice if offline/fallback */}
          {dbError && (
            <div className="bg-amber-950/40 border-b border-amber-800/30 text-amber-300 text-xs px-4 py-3 text-center flex items-center justify-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{dbError} Booking copies safely preserved locally!</span>
            </div>
          )}

          {/* Main Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
            
            {/* Bento Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Booking Forms</p>
                  <p className="text-xl font-black text-white mt-0.5">{stats.total}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Scheduled</p>
                  <p className="text-xl font-black text-white mt-0.5">{stats.todayCount}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Response</p>
                  <p className="text-xl font-black text-white mt-0.5">{stats.pendingCount}</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirmed Slots</p>
                  <p className="text-xl font-black text-white mt-0.5">{stats.confirmedCount}</p>
                </div>
              </div>

            </div>

            {/* Sticky Filtering Controls Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-900">
                <Filter className="w-3.5 h-3.5 text-blue-400" />
                <span>Search and Advanced Filters</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                
                {/* Search query input */}
                <div className="md:col-span-4 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Patient name, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Treatment required selection */}
                <div className="md:col-span-2">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">🩺 All Services</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred time slot selection */}
                <div className="md:col-span-2">
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">⏰ All Slots</option>
                    <option value="morning">Morning (9 AM - 1 PM)</option>
                    <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                {/* Preferred date selector */}
                <div className="md:col-span-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  />
                </div>

                {/* Appointment status filter */}
                <div className="md:col-span-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">🏁 All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

              </div>

              {/* Reset state trigger */}
              {(searchQuery || selectedService !== 'all' || selectedSlot !== 'all' || selectedDate || selectedStatus !== 'all') && (
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedService('all');
                      setSelectedSlot('all');
                      setSelectedDate('');
                      setSelectedStatus('all');
                    }}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
                  >
                    Reset Filter Fields
                  </button>
                </div>
              )}
            </div>

            {/* List / Data Table layout */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
              
              {/* Header count indicators */}
              <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Displaying <strong className="text-white font-black">{filteredAppointments.length}</strong> of <strong className="text-slate-300">{appointments.length}</strong> bookings found</span>
                {selectedStatus !== 'all' && <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] uppercase">Filter: {selectedStatus}</span>}
              </div>

              {isLoading ? (
                <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-sm font-semibold text-slate-400">Syncing with medical registers...</p>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
                  <FileText className="w-10 h-10 text-slate-600" />
                  <p className="text-sm font-extrabold text-slate-300">No Booking Records Found</p>
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                    No results matched your search or filter configuration. Try typing differently or resetting the search filters.
                  </p>
                </div>
              ) : (
                
                /* Large List of booking entries */
                <div className="divide-y divide-slate-900/60 overflow-x-auto">
                  
                  {/* Desktop Table View header columns */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-900/40 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="col-span-3">Patient & Contact</div>
                    <div className="col-span-2">Required Service</div>
                    <div className="col-span-2">Preferred Date & Slot</div>
                    <div className="col-span-3">Message / Symptom Detail</div>
                    <div className="col-span-2 text-right">Status Controls</div>
                  </div>

                  {filteredAppointments.map((app) => {
                    const appStatus = statuses[app.id || ''] || 'pending';
                    const notesText = clinicalNotes[app.id || ''] || '';
                    const initials = app.name.slice(0, 2).toUpperCase();

                    return (
                      <div 
                        key={app.id || Math.random().toString()} 
                        className="p-4 sm:p-6 lg:px-6 lg:py-5 hover:bg-slate-900/20 transition-all grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
                      >
                        
                        {/* Column 1: Patient details */}
                        <div className="col-span-3 flex items-start gap-3">
                          {/* Circle Avatar badge */}
                          <div className="w-9 h-9 rounded-full bg-slate-800 text-blue-400 font-extrabold text-xs flex items-center justify-center shrink-0 border border-slate-700 select-none">
                            {initials}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-white truncate flex items-center gap-1.5">
                              {app.name}
                            </h4>
                            
                            {/* Mobile action call buttons */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-slate-300">{app.phone}</span>
                              <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(app.phone)}
                                className="text-[10px] text-slate-500 hover:text-white transition-colors cursor-pointer"
                                title="Copy Phone Number"
                              >
                                [Copy]
                              </button>
                            </div>

                            {/* Booking timestamp */}
                            {app.created_at && (
                              <p className="text-[9px] text-slate-500 font-semibold mt-1">
                                Booked: {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Column 2: Required treatment service */}
                        <div className="col-span-2 lg:pt-1">
                          <span className="inline-block text-xs font-bold text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                            🩺 {app.service}
                          </span>
                        </div>

                        {/* Column 3: Scheduled Date and Time Slot */}
                        <div className="col-span-2 lg:pt-1 flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-xs text-slate-300 font-bold">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            <span>
                              {(() => {
                                try {
                                  if (!app.date || app.date === 'Not specified') return 'Not specified';
                                  const d = new Date(app.date);
                                  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                                } catch {
                                  return app.date;
                                }
                              })()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold capitalize">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>{app.slot} Slot</span>
                          </div>
                        </div>

                        {/* Column 4: Message and Clinical notes */}
                        <div className="col-span-3 flex flex-col gap-2.5 lg:pt-1">
                          {app.message ? (
                            <p className="text-xs text-slate-300 leading-normal font-normal bg-slate-950/40 p-2.5 rounded-xl border border-slate-900/60 italic">
                              "{app.message}"
                            </p>
                          ) : (
                            <span className="text-[10px] text-slate-600 font-semibold">No message provided.</span>
                          )}

                          {/* Dynamic Clinical notes edit drawer */}
                          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-2.5">
                            {activeNotesId === app.id ? (
                              <div className="flex flex-col gap-2">
                                <textarea
                                  value={editingNotesText}
                                  onChange={(e) => setEditingNotesText(e.target.value)}
                                  placeholder="Write private clinical follow-up details (e.g. diagnosed stroke side, recommended 10 sessions)..."
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-medium text-white focus:outline-none focus:border-blue-500 min-h-16"
                                />
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setActiveNotesId(null)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10px] px-2.5 py-1 rounded-md font-bold cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveNotes(app.id || '')}
                                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-2.5 py-1 rounded-md font-bold flex items-center gap-1 cursor-pointer"
                                  >
                                    <Check className="w-3 h-3" /> Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-2">
                                <div className="text-[11px] text-slate-400 font-medium">
                                  <strong>Clinician Notes:</strong>{' '}
                                  {notesText ? (
                                    <span className="text-slate-200">{notesText}</span>
                                  ) : (
                                    <span className="text-slate-600 italic">None added yet. Click edit to write patient diagnosis notes.</span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveNotesId(app.id || '');
                                    setEditingNotesText(notesText);
                                  }}
                                  className="text-[10px] text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer shrink-0 ml-1"
                                >
                                  {notesText ? '[Edit]' : '[+ Add]'}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Column 5: Status modifiers & WhatsApp actions */}
                        <div className="col-span-2 flex flex-col gap-2 lg:items-end lg:pt-1">
                          
                          {/* Live Selector */}
                          <div className="w-full lg:max-w-[130px]">
                            <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1">State Status</label>
                            <div className="relative">
                              <select
                                value={appStatus}
                                onChange={(e) => handleStatusChange(app.id || '', e.target.value as AppointmentStatus)}
                                className={`w-full appearance-none bg-slate-900 border border-slate-800 rounded-lg py-1 px-2.5 pr-8 text-xs font-bold capitalize cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStatusStyle(appStatus)}`}
                              >
                                <option value="pending" className="bg-slate-950 text-blue-400">⏳ Pending</option>
                                <option value="confirmed" className="bg-slate-950 text-emerald-400">✓ Confirmed</option>
                                <option value="rescheduled" className="bg-slate-950 text-purple-400">↻ Resched</option>
                                <option value="cancelled" className="bg-slate-950 text-rose-400">✕ Cancelled</option>
                              </select>
                              <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Quick Followup Link triggers */}
                          <div className="flex flex-col gap-1.5 w-full lg:max-w-[130px] mt-1">
                            <a
                              href={getWhatsAppFollowupLink(app, 'confirm')}
                              onClick={() => handleStatusChange(app.id || '', 'confirmed')}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full flex items-center justify-center gap-1 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-900/60 text-emerald-300 font-bold text-[10px] py-1 px-2 rounded-lg transition-all"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-400" />
                              Send Confirmation
                            </a>
                            <a
                              href={getWhatsAppFollowupLink(app, 'followup')}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-[10px] py-1 px-2 rounded-lg transition-all"
                            >
                              <MessageSquare className="w-3 h-3 text-blue-400" />
                              Custom Followup
                            </a>
                            <a
                              href={`tel:${app.phone}`}
                              className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-[10px] py-1 px-2 rounded-lg transition-all"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              Call Patient
                            </a>
                            
                            {/* Archive command */}
                            <button
                              type="button"
                              onClick={() => handleDeleteAppointment(app.id || '')}
                              className="w-full flex items-center justify-center gap-1 hover:bg-rose-950/40 hover:text-rose-400 text-slate-600 border border-transparent hover:border-rose-900/40 font-semibold text-[10px] py-1 px-2 rounded-lg transition-all mt-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete Booking
                            </button>
                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>

          </main>
        </div>
      )}

    </div>
  );
}
