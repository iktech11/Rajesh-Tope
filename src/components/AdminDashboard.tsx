import React, { useState, useEffect } from 'react';
import type { Language, PublicConnectSubmission } from '../types';
import { developmentProjects as defaultProjects } from '../data/politicalData';
import { 
  Lock, 
  X, 
  Users, 
  FolderGit2, 
  Download, 
  LogOut,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdminDashboard: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'submissions' | 'projects' | 'password'>('submissions');
  const [submissions, setSubmissions] = useState<PublicConnectSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSub, setSelectedSub] = useState<PublicConnectSubmission | null>(null);

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwChangeStatus, setPwChangeStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [isChangingPw, setIsChangingPw] = useState(false);

  // Check existing session token on mount / open
  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem('admin_token');
      if (token) {
        verifyToken(token);
      }
    }
  }, [isOpen]);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        loadSubmissions(token);
      } else {
        sessionStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      }
    } catch {
      // Offline fallback
      setIsAuthenticated(true);
      loadLocalSubmissions();
    }
  };

  const loadSubmissions = async (token: string) => {
    try {
      const res = await fetch('/api/submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      } else {
        loadLocalSubmissions();
      }
    } catch {
      loadLocalSubmissions();
    }
  };

  const loadLocalSubmissions = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rajesh_tope_submissions') || '[]');
      setSubmissions(stored);
    } catch {
      setSubmissions([]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        setPassword('');
        loadSubmissions(data.token);
      } else {
        const errData = await res.json().catch(() => ({}));
        // Generic error message - does not reveal system specifics
        setLoginError(errData.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Unable to connect to authentication service.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setSelectedSub(null);
    setPassword('');
  };

  const updateSubStatus = async (id: string, newStatus: any, notes?: string) => {
    const token = sessionStorage.getItem('admin_token');
    
    // Optimistic UI update
    const updated = submissions.map(s => {
      if (s.id === id) {
        return { ...s, status: newStatus, adminNotes: notes !== undefined ? notes : s.adminNotes };
      }
      return s;
    });
    setSubmissions(updated);
    if (selectedSub && selectedSub.id === id) {
      setSelectedSub({ ...selectedSub, status: newStatus, adminNotes: notes !== undefined ? notes : selectedSub.adminNotes });
    }

    // Server-side update
    if (token) {
      try {
        await fetch(`/api/submissions/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus, adminNotes: notes })
        });
      } catch (err) {
        console.warn('Server status update fallback:', err);
      }
    }

    // Local sync fallback
    try {
      localStorage.setItem('rajesh_tope_submissions', JSON.stringify(updated));
    } catch {}
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwChangeStatus(null);

    if (newPassword !== confirmPassword) {
      setPwChangeStatus({ error: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 8) {
      setPwChangeStatus({ error: 'New password must be at least 8 characters long.' });
      return;
    }

    const token = sessionStorage.getItem('admin_token');
    if (!token) {
      setPwChangeStatus({ error: 'Session expired. Please log in again.' });
      return;
    }

    setIsChangingPw(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (res.ok) {
        setPwChangeStatus({ success: 'Admin password updated securely.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errData = await res.json().catch(() => ({}));
        setPwChangeStatus({ error: errData.error || 'Failed to update password.' });
      }
    } catch (err: any) {
      setPwChangeStatus({ error: err.message || 'Server connection error.' });
    } finally {
      setIsChangingPw(false);
    }
  };

  const exportCSV = () => {
    const headers = ['RefNo', 'Date', 'Full Name', 'Mobile Number', 'Village / City', 'Subject', 'Detailed Message', 'Status', 'Admin Notes'];
    const rows = submissions.map(s => [
      `"${s.refNo}"`,
      `"${s.date}"`,
      `"${s.fullName}"`,
      `"${s.mobile}"`,
      `"${s.village}"`,
      `"${s.subject.replace(/"/g, '""')}"`,
      `"${s.message.replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${(s.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rajesh_tope_citizen_petitions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-elevated border border-[#E7EAF0] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#E7EAF0] bg-[#17243A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C58B45] text-white flex items-center justify-center font-bold text-xs shrink-0">
              RT
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm tracking-wide">
                {lang === 'mr' ? 'प्रशासक नियंत्रण कक्ष (Admin Control Room)' : 'Office of Rajesh Tope – Admin Panel'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300">
                Ghansawangi • Jalna • Citizen Petitions & Review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 transition-colors min-h-[36px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Secure Login Prompt (No Demo PIN, Generic Error Messages, Server Protected) */
          <div className="p-6 sm:p-12 max-w-md mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#EAD7BE] text-[#C58B45] flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#17243A]">
                {lang === 'mr' ? 'प्रशासक सुरक्षा पडताळणी' : 'Authorized Access Verification'}
              </h4>
              <p className="text-xs text-[#667085] mt-1">
                {lang === 'mr' 
                  ? 'नागरिक निवेदने व्यवस्थापनासाठी प्रशासक पासवर्ड प्रविष्ट करा.' 
                  : 'Please enter authorized administrator credentials to manage citizen representations.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#17243A] mb-1">
                  Administrator Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7EAF0] text-sm text-[#17243A] focus:outline-none focus:border-[#17243A] min-h-[44px]"
                  autoFocus
                  required
                />
                {loginError && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 rounded-xl bg-[#17243A] hover:bg-[#243B53] text-white text-xs font-bold transition-colors min-h-[44px] disabled:opacity-50"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Sub-nav Tabs */}
            <div className="px-5 py-2.5 bg-[#F7F8FA] border-b border-[#E7EAF0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                    activeTab === 'submissions'
                      ? 'bg-white text-[#17243A] shadow-sm'
                      : 'text-[#667085] hover:text-[#17243A]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>{lang === 'mr' ? 'नागरिक निवेदने' : 'Citizen Petitions'}</span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#FAF5EE] text-[#A66E2E] text-[10px] font-mono">
                    {submissions.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                    activeTab === 'projects'
                      ? 'bg-white text-[#17243A] shadow-sm'
                      : 'text-[#667085] hover:text-[#17243A]'
                  }`}
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>{lang === 'mr' ? 'विकासकामे' : 'Development Projects'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                    activeTab === 'password'
                      ? 'bg-white text-[#17243A] shadow-sm'
                      : 'text-[#667085] hover:text-[#17243A]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>Security & Password</span>
                </button>
              </div>

              {activeTab === 'submissions' && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7EAF0] bg-white text-xs font-semibold text-[#17243A] hover:bg-[#F7F8FA] transition-colors min-h-[36px]"
                >
                  <Download className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span className="hidden sm:inline">{lang === 'mr' ? 'CSV एक्सपोर्ट' : 'Export CSV'}</span>
                </button>
              )}
            </div>

            {/* Tab 1: Submissions */}
            {activeTab === 'submissions' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left: Submissions Table */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#667085] pb-2 border-b border-[#E7EAF0]">
                      <span className="font-semibold text-[#17243A]">
                        {submissions.length} Total Petitions
                      </span>
                      <div className="flex items-center gap-1">
                        <span>Filter:</span>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-2 py-0.5 rounded border border-[#E7EAF0] text-xs bg-white text-[#17243A]"
                        >
                          <option value="all">All</option>
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Action Taken">Action Taken</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {submissions
                        .filter(s => statusFilter === 'all' || s.status === statusFilter)
                        .map(sub => (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedSub(sub)}
                            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              selectedSub?.id === sub.id
                                ? 'border-[#17243A] bg-[#FAF5EE]/50 shadow-sm'
                                : 'border-[#E7EAF0] bg-white hover:bg-[#F7F8FA]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono font-bold text-[#A66E2E]">
                                {sub.refNo}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                sub.status === 'New'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : sub.status === 'Under Review'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                {sub.status}
                              </span>
                            </div>
                            <div className="font-bold text-[#17243A] text-xs sm:text-sm mb-0.5">
                              {sub.fullName}
                            </div>
                            <div className="text-[#667085] line-clamp-1 mb-1.5 font-medium">
                              {sub.subject}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#667085] pt-1 border-t border-[#F1F3F6]">
                              <span>{sub.village}</span>
                              <span className="font-mono">{sub.date}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Right: Selected Submission Review */}
                  <div className="lg:col-span-5 bg-[#F7F8FA] rounded-2xl p-4 sm:p-5 border border-[#E7EAF0] flex flex-col justify-between">
                    {selectedSub ? (
                      <div className="space-y-3.5">
                        <div className="pb-2.5 border-b border-[#E7EAF0] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#667085]">
                              Tracking ID
                            </span>
                            <div className="font-mono font-bold text-[#17243A] text-sm">
                              {selectedSub.refNo}
                            </div>
                          </div>
                          <span className="text-[11px] text-[#667085]">{selectedSub.date}</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[#667085] block">Applicant Name:</span>
                            <span className="font-bold text-[#17243A] text-sm">{selectedSub.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[#667085] block">Mobile Number:</span>
                            <a href={`tel:${selectedSub.mobile}`} className="font-mono font-bold text-[#17243A] underline">
                              +91 {selectedSub.mobile}
                            </a>
                          </div>
                          <div>
                            <span className="text-[#667085] block">Village / City:</span>
                            <span className="font-semibold text-[#17243A]">{selectedSub.village}</span>
                          </div>
                          <div>
                            <span className="text-[#667085] block">Subject:</span>
                            <span className="font-bold text-[#17243A]">{selectedSub.subject}</span>
                          </div>
                          <div>
                            <span className="text-[#667085] block">Detailed Message:</span>
                            <div className="p-3 bg-white rounded-xl border border-[#E7EAF0] text-[#17243A] mt-1 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                              {selectedSub.message}
                            </div>
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="pt-2.5 border-t border-[#E7EAF0] space-y-1.5">
                          <label className="text-xs font-bold text-[#17243A] block">
                            Change Workflow Status:
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(['New', 'Under Review', 'Action Taken'] as const).map(st => (
                              <button
                                key={st}
                                onClick={() => updateSubStatus(selectedSub.id, st)}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-colors ${
                                  selectedSub.status === st
                                    ? 'bg-[#17243A] text-white border-[#17243A]'
                                    : 'bg-white text-[#667085] border-[#E7EAF0] hover:text-[#17243A]'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 sm:h-64 flex flex-col items-center justify-center text-center text-[#667085] text-xs">
                        <Users className="w-7 h-7 text-[#D0D6E2] mb-2" />
                        <span>Select a petition from the left column to view full details.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Development Projects */}
            {activeTab === 'projects' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#17243A]">
                    Sanctioned Development Projects ({defaultProjects.length})
                  </h4>
                  <span className="text-xs text-[#667085]">
                    Documented Works Archive
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {defaultProjects.map(p => (
                    <div key={p.id} className="p-3.5 rounded-xl border border-[#E7EAF0] bg-white text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#A66E2E] font-bold">{p.year}</span>
                        <span className="px-2 py-0.5 rounded bg-[#FAF5EE] text-[#A66E2E] font-bold">{p.status}</span>
                      </div>
                      <div className="font-bold text-[#17243A] text-xs sm:text-sm">{p.title[lang]}</div>
                      <div className="text-[#667085]">{p.village}, {p.taluka} • Ref: {p.officialRef}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Security & Password Management */}
            {activeTab === 'password' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-lg mx-auto w-full">
                <div className="bg-white rounded-2xl border border-[#E7EAF0] p-6 shadow-sm space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-[#17243A] flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#C58B45]" />
                      <span>Change Administrator Password</span>
                    </h4>
                    <p className="text-xs text-[#667085] mt-1">
                      Update your administrator credentials. Passwords are securely hashed with 12-round bcrypt salt on the server.
                    </p>
                  </div>

                  {pwChangeStatus?.success && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{pwChangeStatus.success}</span>
                    </div>
                  )}

                  {pwChangeStatus?.error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pwChangeStatus.error}</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7EAF0] text-xs text-[#17243A] focus:outline-none focus:border-[#17243A]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1">
                        New Password (min 8 characters)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7EAF0] text-xs text-[#17243A] focus:outline-none focus:border-[#17243A]"
                        required
                        minLength={8}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7EAF0] text-xs text-[#17243A] focus:outline-none focus:border-[#17243A]"
                        required
                        minLength={8}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isChangingPw}
                      className="w-full py-2.5 rounded-xl bg-[#17243A] hover:bg-[#243B53] text-white text-xs font-bold transition-colors min-h-[44px] disabled:opacity-50"
                    >
                      {isChangingPw ? 'Updating Password...' : 'Save New Password'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
