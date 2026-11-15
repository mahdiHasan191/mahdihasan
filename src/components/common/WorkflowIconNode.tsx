import React from 'react';

interface WorkflowIconNodeProps {
  icon: React.ElementType;
  delayIndex?: number;
  tone?: 'cyan' | 'purple' | 'emerald';
  showTrail?: boolean;
}

export const WorkflowIconNode: React.FC<WorkflowIconNodeProps> = ({
  icon: Icon,
  delayIndex = 0,
  tone = 'cyan',
  showTrail = true,
}) => {
  const delaySec = `${((delayIndex % 4) * 1.1).toFixed(1)}s`;

  const palette =
    tone === 'purple'
      ? {
          wfColor: 'rgba(168, 85, 247, 0.88)',
          wfGlow: 'rgba(168, 85, 247, 0.45)',
          iconColor: 'text-purple-400 group-hover:text-purple-300',
          portBg: 'bg-purple-400',
          beamGrad: 'via-purple-400',
          sweepGrad: 'via-purple-400/20',
        }
      : tone === 'emerald'
      ? {
          wfColor: 'rgba(16, 185, 129, 0.88)',
          wfGlow: 'rgba(16, 185, 129, 0.45)',
          iconColor: 'text-emerald-400 group-hover:text-emerald-300',
          portBg: 'bg-emerald-400',
          beamGrad: 'via-emerald-400',
          sweepGrad: 'via-emerald-400/20',
        }
      : {
          wfColor: 'rgba(34, 211, 238, 0.88)',
          wfGlow: 'rgba(34, 211, 238, 0.45)',
          iconColor: 'text-cyan-400 group-hover:text-cyan-300',
          portBg: 'bg-cyan-400',
          beamGrad: 'via-cyan-400',
          sweepGrad: 'via-cyan-400/20',
        };

  return (
    <div className="inline-flex items-center shrink-0">
      {/* Input trace & connector port */}
      <div className="flex items-center">
        <span className="w-2.5 h-[2px] bg-slate-800 rounded-l" />
        <span
          style={{ animationDelay: delaySec }}
          className={`animate-workflow-port w-1.5 h-1.5 rounded-full ${palette.portBg} -mr-[3px] z-20`}
        />
      </div>

      {/* Stationary Workflow Node Icon Container */}
      <div
        style={
          {
            animationDelay: delaySec,
            '--wf-color': palette.wfColor,
            '--wf-glow': palette.wfGlow,
          } as React.CSSProperties
        }
        className={`animate-workflow-node relative p-3 bg-slate-950/90 border border-slate-800 rounded-xl ${palette.iconColor} overflow-hidden transition-colors`}
      >
        {/* Internal execution energy sweep */}
        <div
          style={{ animationDelay: delaySec }}
          className={`animate-kpi-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent ${palette.sweepGrad} to-transparent`}
        />

        {/* Active top-right execution LED */}
        <span
          style={{ animationDelay: delaySec }}
          className={`animate-workflow-port absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${palette.portBg}`}
        />

        <Icon className="relative z-10 w-6 h-6" />
      </div>

      {/* Output workflow wire with traveling energy packet */}
      {showTrail && (
        <div className="hidden sm:flex items-center">
          <span
            style={{ animationDelay: delaySec }}
            className={`animate-workflow-port w-1.5 h-1.5 rounded-full ${palette.portBg} -ml-[3px] z-20`}
          />
          <div className="relative w-10 h-[2px] bg-slate-800/90 overflow-hidden rounded-r">
            <div
              style={{ animationDelay: delaySec }}
              className={`animate-workflow-packet w-5 h-full bg-gradient-to-r from-transparent ${palette.beamGrad} to-transparent`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
