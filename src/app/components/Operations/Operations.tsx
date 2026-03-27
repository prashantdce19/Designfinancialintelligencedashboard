import { useState, useEffect } from "react";
import { 
  Mail, 
  TrendingUp, 
  GitMerge, 
  Database, 
  TerminalSquare, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Download,
  ChevronDown,
  ChevronUp,
  Play
} from "lucide-react";

type JobStatus = "success" | "failed" | "running";

interface JobHistory {
  id: string;
  type: string;
  startedAt: string;
  duration: string;
  status: JobStatus;
}

const jobTypes = [
  {
    id: "process_emails",
    title: "Process Emails",
    description: "Scan inbox for CAS statements, contract notes, and trade confirmations to parse new transactions.",
    icon: <Mail size={32} />,
    lastRun: "10 mins ago",
    color: "#4F8EF7"
  },
  {
    id: "update_nav",
    title: "Update NAV",
    description: "Fetch latest Net Asset Values from AMFI and update all current mutual fund holdings.",
    icon: <TrendingUp size={32} />,
    lastRun: "2 hours ago",
    color: "#10B981"
  },
  {
    id: "map_funds",
    title: "Map Funds",
    description: "Reconcile unmapped folio transactions with the master ISIN database and benchmark indices.",
    icon: <GitMerge size={32} />,
    lastRun: "1 day ago",
    color: "#F59E0B"
  },
  {
    id: "backfill_nav",
    title: "Backfill NAV",
    description: "Fetch historical NAV data for new folios to build complete performance graphs.",
    icon: <Database size={32} />,
    lastRun: "3 days ago",
    color: "#8B5CF6"
  }
];

const mockRecentJobs: JobHistory[] = [
  { id: "JOB-9042", type: "Update NAV", startedAt: "Today, 09:00 AM", duration: "45s", status: "success" },
  { id: "JOB-9041", type: "Process Emails", startedAt: "Today, 08:30 AM", duration: "1m 12s", status: "success" },
  { id: "JOB-9040", type: "Map Funds", startedAt: "Yesterday, 11:45 PM", duration: "12s", status: "success" },
  { id: "JOB-9039", type: "Backfill NAV", startedAt: "Yesterday, 10:00 PM", duration: "5m 34s", status: "failed" },
  { id: "JOB-9038", type: "Update NAV", startedAt: "Yesterday, 09:00 AM", duration: "48s", status: "success" },
  { id: "JOB-9037", type: "Process Emails", startedAt: "Yesterday, 08:30 AM", duration: "1m 05s", status: "success" },
  { id: "JOB-9036", type: "Process Emails", startedAt: "2 days ago, 08:30 AM", duration: "1m 10s", status: "success" },
  { id: "JOB-9035", type: "Map Funds", startedAt: "2 days ago, 02:15 AM", duration: "15s", status: "success" },
  { id: "JOB-9034", type: "Update NAV", startedAt: "3 days ago, 09:00 AM", duration: "52s", status: "success" },
  { id: "JOB-9033", type: "Backfill NAV", startedAt: "3 days ago, 01:00 AM", duration: "14m 20s", status: "success" }
];

const initialLogs = [
  "[SYSTEM] Initializing job execution environment...",
  "[SYSTEM] Connecting to secure AMFI API endpoint...",
  "[INFO] Authentication successful. Fetching delta updates...",
  "[INFO] Processing 1,204 active mutual fund schemes...",
];

export function Operations() {
  const [activeJobId, setActiveJobId] = useState<string | null>("update_nav");
  const [progress, setProgress] = useState(45);
  const [logsExpanded, setLogsExpanded] = useState(true);
  const [logs, setLogs] = useState<string[]>(initialLogs);

  // Simulate progress and logs for the active job
  useEffect(() => {
    if (!activeJobId) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLogs(l => [...l, "[SUCCESS] Job completed successfully."]);
          return 100;
        }
        
        // Randomly add logs as progress goes up
        if (Math.random() > 0.6) {
          setLogs(l => [...l, `[INFO] Processed batch #${Math.floor(Math.random() * 100)} (${prev}% complete)...`]);
        }
        
        return prev + Math.floor(Math.random() * 5);
      });
    }, 800);

    return () => clearInterval(interval);
  }, [activeJobId]);

  const handleRunJob = (id: string) => {
    setActiveJobId(id);
    setProgress(0);
    setLogs([`[SYSTEM] Starting new job: ${jobTypes.find(j => j.id === id)?.title}...`]);
    setLogsExpanded(true);
  };

  const activeJob = jobTypes.find(j => j.id === activeJobId);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
      {/* Top Section: Action Cards */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <TerminalSquare size={24} className="text-[#4F8EF7]" />
          <h2 className="text-xl font-bold text-white">Background Operations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobTypes.map((job) => {
            const isRunning = activeJobId === job.id && progress < 100;
            
            return (
              <div 
                key={job.id} 
                className="glass-card p-6 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all"
              >
                {/* Status indicator glow */}
                {isRunning && (
                  <div className="absolute top-0 left-0 w-full h-1">
                    <div 
                      className="h-full bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.8)] animate-pulse" 
                      style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }} 
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${job.color}15`, color: job.color, border: `1px solid ${job.color}30` }}
                  >
                    {job.icon}
                  </div>
                  <div className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    {isRunning ? (
                      <span className="flex items-center gap-1.5 text-[#4F8EF7]">
                        <Loader2 size={12} className="animate-spin" /> Running
                      </span>
                    ) : (
                      `Last: ${job.lastRun}`
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>
                <p className="text-sm text-gray-400 flex-1 mb-6 leading-relaxed">
                  {job.description}
                </p>
                
                <button 
                  onClick={() => handleRunJob(job.id)}
                  disabled={isRunning}
                  className={`w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isRunning 
                      ? 'bg-white/5 text-gray-400 cursor-not-allowed border border-white/10' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 shadow-sm'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Play size={18} /> Run Now
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Section: Active Job Tracker */}
      {activeJob && (
        <div className="glass-card overflow-hidden flex flex-col border border-[#4F8EF7]/30 shadow-[0_4px_30px_rgba(79,142,247,0.1)]">
          <div className="p-6 bg-[#1A1F3A]/80 border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/20 flex items-center justify-center text-[#4F8EF7]">
                  {progress < 100 ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {activeJob.title}
                    {progress < 100 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#4F8EF7]/20 text-[#4F8EF7] font-semibold border border-[#4F8EF7]/30 uppercase tracking-wide">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {progress < 100 ? 'Execution in progress...' : 'Job completed successfully'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{progress}%</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#4F8EF7] to-[#10B981] relative"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA4TDEwIC0yWk0yIDEwTDEyIDBaIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-50"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0F1322] border-t border-black/50">
            <button 
              onClick={() => setLogsExpanded(!logsExpanded)}
              className="w-full px-6 py-3 flex items-center justify-between text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TerminalSquare size={16} /> View Full Log
              </div>
              {logsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {logsExpanded && (
              <div className="p-6 pt-2">
                <pre className="w-full h-64 overflow-y-auto custom-scrollbar bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-[13px] leading-relaxed text-[#10B981] shadow-inner">
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-4 hover:bg-white/5 px-2 py-0.5 rounded">
                      <span className="text-gray-500 select-none">
                        {new Date().toISOString().substring(11, 19)}
                      </span>
                      <span className={
                        log.includes('[ERROR]') ? 'text-red-400' : 
                        log.includes('[SYSTEM]') ? 'text-[#4F8EF7]' : 
                        log.includes('[SUCCESS]') ? 'text-[#10B981] font-bold' : ''
                      }>
                        {log}
                      </span>
                    </div>
                  ))}
                  {progress < 100 && (
                    <div className="flex gap-4 px-2 py-0.5 animate-pulse">
                      <span className="text-gray-500 select-none">
                        {new Date().toISOString().substring(11, 19)}
                      </span>
                      <span className="text-[#4F8EF7]">_</span>
                    </div>
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Section: Recent Jobs Table */}
      <div className="glass-card p-6 overflow-hidden flex flex-col mt-4">
        <h3 className="text-lg font-bold text-white mb-6">Recent Jobs</h3>
        
        <div className="overflow-x-auto custom-scrollbar -mx-6 px-6 pb-2">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <th className="pb-4 pl-2 font-medium">Job ID</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium">Started</th>
                <th className="pb-4 font-medium">Duration</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 pr-2 font-medium text-right">Logs</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentJobs.map((job, idx) => (
                <tr 
                  key={job.id} 
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 pl-2 text-sm font-medium text-[#4F8EF7]">{job.id}</td>
                  <td className="py-4 text-sm text-gray-200">{job.type}</td>
                  <td className="py-4 text-sm text-gray-400">{job.startedAt}</td>
                  <td className="py-4 text-sm text-gray-400">{job.duration}</td>
                  <td className="py-4 text-sm">
                    {job.status === 'success' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 font-medium text-xs">
                        <CheckCircle2 size={14} /> Success
                      </span>
                    )}
                    {job.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-medium text-xs">
                        <XCircle size={14} /> Failed
                      </span>
                    )}
                    {job.status === 'running' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#4F8EF7]/10 text-[#4F8EF7] border border-[#4F8EF7]/20 font-medium text-xs">
                        <Loader2 size={14} className="animate-spin" /> Running
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-2 text-sm text-right">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-[#4F8EF7] hover:bg-[#4F8EF7]/10 transition-colors">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
