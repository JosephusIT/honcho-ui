import { useRef, useEffect, useState, type ReactNode, type ChangeEvent, type KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  instantResults?: ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  instantResults,
  placeholder = 'Search memory...',
  autoFocus,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  // Global / shortcut to focus — uses native DOM KeyboardEvent
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onChange('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onChange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      inputRef.current?.blur();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search
          size={18}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: 14, pointerEvents: 'none' }}
        />
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{
            paddingLeft: 42,
            paddingRight: value ? 42 : 14,
            height: 52,
            fontSize: 'var(--text-base)',
            borderColor: focused ? 'var(--accent-primary)' : undefined,
            boxShadow: focused ? '0 0 0 3px var(--accent-glow)' : undefined,
          }}
        />
        {value && (
          <button
            onClick={() => { onChange(''); inputRef.current?.focus(); }}
            className="btn btn-ghost btn-sm"
            style={{
              position: 'absolute',
              right: 8,
              padding: 'var(--space-1)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Instant results dropdown */}
      {focused && instantResults && value.trim().length > 0 && (
        <div
          className="fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            maxHeight: 420,
            overflowY: 'auto',
          }}
        >
          {instantResults}
        </div>
      )}
    </div>
  );
}
