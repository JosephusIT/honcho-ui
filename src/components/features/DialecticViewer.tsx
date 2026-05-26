import { useState } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatTimestamp } from '../../lib/utils';
import type { DialecticView, DialecticStep } from '../../types';

interface DialecticViewerProps {
  view: DialecticView;
}

function ContextChip({ snippet, peer, relevance }: { snippet: string; peer?: { name: string }; relevance: number }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-1) var(--space-2)',
        background: 'var(--bg-hover)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-xs)',
      }}
    >
      <span style={{ color: 'var(--text-secondary)' }}>{snippet.slice(0, 80)}{snippet.length > 80 ? '...' : ''}</span>
      {peer && <span className="text-muted">· {peer.name}</span>}
      <Badge
        variant={relevance > 0.8 ? 'accent' : relevance > 0.5 ? 'info' : 'default'}
        style={{ fontSize: 10, padding: '1px 4px' }}
      >
        {Math.round(relevance * 100)}%
      </Badge>
    </div>
  );
}

function StepCard({ step }: { step: DialecticStep }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card"
      style={{
        borderLeft: '3px solid var(--accent-primary)',
        marginBottom: 'var(--space-3)',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
        }}
      >
        {expanded ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Badge variant="accent" style={{ fontSize: 10 }}>Step {step.step_number}</Badge>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {step.query}
            </span>
          </div>
        </div>
        <span className="text-xs text-muted">{formatTimestamp(step.timestamp)}</span>
      </button>

      {expanded && (
        <div className="fade-in" style={{ marginTop: 'var(--space-3)', paddingLeft: 28 }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <div className="text-xs text-muted" style={{ marginBottom: 'var(--space-1)' }}>Reasoning</div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.reasoning}</p>
          </div>

          {step.contexts_used.length > 0 && (
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div className="text-xs text-muted" style={{ marginBottom: 'var(--space-2)' }}>
                Contexts used ({step.contexts_used.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {step.contexts_used.map((ctx) => (
                  <ContextChip
                    key={ctx.id}
                    snippet={ctx.snippet}
                    peer={ctx.peer}
                    relevance={ctx.relevance}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-muted" style={{ marginBottom: 'var(--space-1)' }}>Conclusion</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--color-success-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <Lightbulb size={14} color="var(--color-success)" />
              <span className="text-sm" style={{ color: 'var(--color-success)' }}>{step.conclusion}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DialecticViewer({ view }: DialecticViewerProps) {
  return (
    <div>
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <Lightbulb size={18} color="var(--accent-primary)" />
          <h3 className="text-lg font-semibold">Dialectic Reasoning</h3>
          <Badge variant="default" style={{ marginLeft: 'auto' }}>
            {view.steps.length} steps
          </Badge>
        </div>

        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
          <div className="text-xs text-muted" style={{ marginBottom: 'var(--space-1)' }}>Query</div>
          <p className="text-base font-medium" style={{ color: 'var(--accent-primary)' }}>{view.query}</p>
        </div>
      </Card>

      <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--border-subtle)' }}>
        {view.steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>

      <Card style={{ marginTop: 'var(--space-4)', border: '1px solid var(--accent-primary)', boxShadow: '0 0 20px var(--accent-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <ArrowRight size={16} color="var(--accent-primary)" />
          <span className="text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>Final Conclusion</span>
        </div>
        <p className="text-base" style={{ color: 'var(--text-primary)' }}>{view.final_conclusion}</p>
        <div className="text-xs text-muted" style={{ marginTop: 'var(--space-2)' }}>
          {formatTimestamp(view.created_at)}
        </div>
      </Card>
    </div>
  );
}
