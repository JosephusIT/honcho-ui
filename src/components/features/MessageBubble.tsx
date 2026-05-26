import type { Message } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDateTime, formatTokenCount } from '../../lib/utils';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: Message;
}

const roleColors: Record<Message['role'], 'default' | 'accent' | 'info'> = {
  user: 'info',
  assistant: 'accent',
  system: 'default',
};

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`message-bubble message-bubble-${message.role}`}>
      <div className="message-bubble-header">
        <Badge variant={roleColors[message.role]}>{message.role}</Badge>
        <span className="message-bubble-time">
          {formatDateTime(message.created_at)}
        </span>
        {message.token_count != null && (
          <span className="message-bubble-tokens">
            {formatTokenCount(message.token_count)} tokens
          </span>
        )}
      </div>

      <div className="message-bubble-content">
        {message.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>

      {message.context_injections && message.context_injections.length > 0 && (
        <div className="message-bubble-injections">
          <span className="message-bubble-injections-label">Context injections:</span>
          {message.context_injections.map((inj) => (
            <div key={inj.id} className="message-bubble-injection">
              <Badge variant="default" className="message-bubble-injection-badge">
                {inj.type}
              </Badge>
              <span className="message-bubble-injection-content">
                {inj.content}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
