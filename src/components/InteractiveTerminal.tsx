import { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, ShieldCheck, Cpu, Database, Network, ChevronRight } from 'lucide-react';

interface TerminalTask {
  id: string;
  name: string;
  command: string;
  icon: any;
  durationMs: number;
  logs: string[];
}

const terminalTasks: TerminalTask[] = [
  {
    id: 'lsm-compaction',
    name: 'SSTable LSM-Tree Compaction',
    command: 'chronosdb --compact --level=0',
    icon: Database,
    durationMs: 2500,
    logs: [
      '[SYSTEM] Initializing LSM-Tree leveled compaction strategy on Level 0...',
      '[INFO] Found 4 immutable SSTables in Level 0 (Total size: 256MB).',
      '[STATS] Memory buffer check: RAM is healthy (Utilization: 34.2%).',
      '[SYSTEM] Loading SSTable sparse indexes into memory buffers...',
      '[PROCESS] Read block range keys [0x00FF - 0x7FFA] for SSTable #001.',
      '[PROCESS] Read block range keys [0x2A00 - 0x9FFF] for SSTable #002.',
      '[COMPACTION] Merging blocks. Running multi-way merge-sort on overlapping key scopes...',
      '[COMPACTION] Resolving 12,408 duplicate elements (keeping latest timestamps).',
      '[COMPACTION] Discarding 2,154 expired tombstone records...',
      '[DISK] Writing compacted block to Level 1: SST-L1-009 (Size: 198MB)...',
      '[DISK] Flushing & synchronizing metadata headers to storage disk space...',
      '[SYSTEM] Updating system manifest. Cleared 4 level-0 SSTable records.',
      '[SUCCESS] SSTable compaction finished! Reclaimed 58MB of disk storage space.',
      '[STATS] LSM-Tree read amplification score improved from 4.8 to 1.1.'
    ],
  },
  {
    id: 'raft-consensus',
    name: 'Verify Distributed Consensus',
    command: 'orbitmesh --raft --health-check',
    icon: Network,
    durationMs: 3000,
    logs: [
      '[CONSENSUS] Querying OrbitMesh leader node @ 10.0.1.100:8545...',
      '[INFO] Current epoch: Term 14.',
      '[INFO] Active peers: [node-worker01, node-worker02, node-worker03, node-worker04]',
      '[CONSENSUS] Sending heartbeats to active peers to verify quorum stability...',
      '[PEER] Received ACK heartbeat response from node-worker01 (RTT: 4ms).',
      '[PEER] Received ACK heartbeat response from node-worker02 (RTT: 12ms).',
      '[PEER] Received ACK heartbeat response from node-worker03 (RTT: 21ms).',
      '[PEER] Received ACK heartbeat response from node-worker04 (RTT: 5ms).',
      '[CONSENSUS] Quorum calculation: 5/5 nodes fully operational (100% agreement).',
      '[PROCESS] Triggering mock transactional log entry write on leader node...',
      '[CONSENSUS] Replicating log index #9283 to cluster followers...',
      '[PEER] node-worker01 successfully appended transaction #9283.',
      '[PEER] node-worker02 successfully appended transaction #9283.',
      '[PEER] node-worker04 successfully appended transaction #9283.',
      '[CONSENSUS] Quorum reached (3/5 followers committed). Commit index updated.',
      '[SUCCESS] Distributed consensus ledger fully validated. Cluster healthy.'
    ],
  },
  {
    id: 'api-benchmark',
    name: 'Ingestion Flow Rate Benchmark',
    command: 'sentinel --benchmark --duration=5s --threads=4',
    icon: Cpu,
    durationMs: 3500,
    logs: [
      '[START] Initializing network stress benchmark client...',
      '[NETWORK] Spawned 4 telemetry workers executing synchronous parallel requests.',
      '[BENCH] Targeting local router endpoint: /api/telemetry/v1/ingest',
      '[RUNNING] Processing queries... Writing stream buffers in RAM circles.',
      '[WARMUP] Thread-0: Ingestion rates = 2,500 payloads/sec',
      '[WARMUP] Thread-1: Ingestion rates = 2,800 payloads/sec',
      '[WARMUP] Thread-2: Ingestion rates = 2,400 payloads/sec',
      '[WARMUP] Thread-3: Ingestion rates = 2,750 payloads/sec',
      '[METRIC] Ingestion load peaking... Total throughput: 10,450 requests/sec.',
      '[PROCESS] Internal Redis ring-buffer check: capacity usage 12.5%. Excellent.',
      '[PROCESS] Writing batch insertions into downstream ClickHouse tables...',
      '[METRIC] Disk write commit latency: Avg 0.42ms.',
      '[SUCCESS] Benchmark complete! Sent 52,250 requests.',
      '[STATS] Average Latency: 4.82ms | P99 Latency: 12.18ms | Data Loss: 0.00%.'
    ],
  },
];

export default function InteractiveTerminal() {
  const [selectedTask, setSelectedTask] = useState<TerminalTask>(terminalTasks[0]);
  const [running, setRunning] = useState<boolean>(false);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLogs]);

  const runTask = (task: TerminalTask) => {
    if (running) return;
    setRunning(true);
    setCompleted(false);
    setProgress(0);
    setCurrentLogs([]);

    // Immediately print starting commands
    const finalLogs = task.logs;
    const intervalTime = task.durationMs / finalLogs.length;
    let logIndex = 0;

    setCurrentLogs([`$ ${task.command}`]);

    const interval = setInterval(() => {
      if (logIndex < finalLogs.length) {
        setCurrentLogs((prev) => [...prev, finalLogs[logIndex]]);
        setProgress(((logIndex + 1) / finalLogs.length) * 100);
        logIndex++;
      } else {
        clearInterval(interval);
        setRunning(false);
        setCompleted(true);
      }
    }, intervalTime);
  };

  const handleReset = () => {
    setCurrentLogs([]);
    setProgress(0);
    setCompleted(false);
    setRunning(false);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[550px]" id="interactive-terminal">
      {/* Sidebar - Task Selector */}
      <div className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Engine Monitor</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 px-2 font-sans leading-relaxed">
            Select an engineering algorithm or distributed operations script and run its execution loop natively inside this sandbox environment.
          </p>

          <div className="space-y-1">
            {terminalTasks.map((task) => {
              const Icon = task.icon;
              const isSelected = selectedTask.id === task.id;
              return (
                <button
                  key={task.id}
                  id={`terminal-task-btn-${task.id}`}
                  onClick={() => {
                    if (!running) {
                      setSelectedTask(task);
                      handleReset();
                    }
                  }}
                  disabled={running}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold'
                      : 'border border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  } ${running ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium font-mono truncate">{task.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{task.command}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
          {/* Main Action buttons */}
          <div className="flex gap-2">
            <button
              id="run-terminal-btn"
              onClick={() => runTask(selectedTask)}
              disabled={running}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all ${
                running
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-550 text-white hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Execution
            </button>
            <button
              id="reset-terminal-btn"
              onClick={handleReset}
              disabled={running || currentLogs.length === 0}
              className={`p-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all ${
                running ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              title="Clear terminal logs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar */}
          {running && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Executing worker thread...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-850 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {completed && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2.5 flex items-start gap-2 animate-fade-in">
              <ShieldCheck className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-indigo-400 font-mono uppercase">Status SUCCESS (0)</p>
                <p className="text-[9px] text-indigo-350 font-sans leading-tight">Task execution achieved desired SLAs. System healthy.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 bg-slate-950 p-4 flex flex-col font-mono text-xs select-none relative h-full">
        {/* Window controls */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-900 mb-3 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <span className="ml-2 text-slate-500">bash • interactive-sandbox</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded cursor-default select-none uppercase">
            <Terminal className="w-3 h-3 text-slate-500" />
            STDOUT
          </div>
        </div>

        {/* Console space */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 font-mono scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {currentLogs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center px-4 self-center py-20 animate-fade-in">
              <Terminal className="w-8 h-8 text-slate-800 mb-3" />
              <p className="text-xs text-slate-500">Terminal ready and awaiting execution.</p>
              <p className="text-[10px] text-slate-600 mt-1">Select a core command from the left menu and hit &quot;Run Script&quot;.</p>
            </div>
          ) : (
            currentLogs.map((log, index) => {
              if (typeof log !== 'string') return null;
              let textClass = 'text-slate-300';
              if (log.startsWith('$')) textClass = 'text-sky-400 font-semibold';
              else if (log.includes('[SUCCESS]')) textClass = 'text-emerald-400';
              else if (log.includes('[SYSTEM]')) textClass = 'text-purple-400';
              else if (log.includes('[PROCESS]')) textClass = 'text-blue-400';
              else if (log.includes('[COMPACTION]')) textClass = 'text-yellow-400 font-medium';
              else if (log.includes('[PEER]')) textClass = 'text-amber-400';
              else if (log.includes('[CONSENSUS]')) textClass = 'text-pink-400';
              else if (log.includes('[STATS]')) textClass = 'text-teal-400 font-bold';
              else if (log.includes('[METRIC]')) textClass = 'text-orange-400';
              else if (log.includes('[INFO]')) textClass = 'text-slate-400';

              return (
                <div key={index} className={`leading-relaxed break-all ${textClass}`}>
                  {log.startsWith('$') ? null : <ChevronRight className="inline-block w-3 h-3 -mt-0.5 mr-1 text-slate-600" />}
                  {log}
                </div>
              );
            })
          )}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}
