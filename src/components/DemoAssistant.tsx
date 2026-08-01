import { useEffect, useId, useRef, useState } from 'react';
import { ASSISTANT_QUICK_ACTIONS } from '../lib/assistant';
import { trackEvent } from '../lib/analytics';
import { IconChat, IconClose } from './icons/Icons';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function DemoAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "I'm an AI assistant in a fictional portfolio demonstration by Che Xu Studio. I can explain the demo, services, local SEO architecture, or help you start a website enquiry.",
    },
  ]);
  const titleId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send(content: string) {
    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setPending(true);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = (await response.json()) as { ok?: boolean; reply?: string };
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ??
            "I'm an AI assistant in a fictional portfolio demonstration by Che Xu Studio. Please try again, or contact Che Xu Studio directly.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm an AI assistant in a fictional portfolio demonstration by Che Xu Studio. I couldn't reach the assistant endpoint just now.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const content = input.trim();
    if (!content || pending) return;
    setInput('');
    void send(content);
  }

  return (
    <div className="demo-assistant">
      {!open ? (
        <button
          type="button"
          className="demo-assistant__launch"
          onClick={() => {
            setOpen(true);
            trackEvent('chat_opened');
          }}
        >
          <IconChat />
          <span>Demo Website Assistant</span>
        </button>
      ) : (
        <section
          className="demo-assistant__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <header>
            <div>
              <h2 id={titleId}>Demo Website Assistant</h2>
              <p>Fictional portfolio assistant by Che Xu Studio</p>
            </div>
            <button
              type="button"
              className="demo-assistant__close"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </header>

          <div className="demo-assistant__messages" ref={listRef} aria-live="polite">
            {messages.map((message, index) => (
              <p key={`${message.role}-${index}`} className={`msg msg--${message.role}`}>
                {message.content}
              </p>
            ))}
          </div>

          <div className="demo-assistant__quick">
            {ASSISTANT_QUICK_ACTIONS.map((action) =>
              'href' in action && action.href ? (
                <a key={action.id} href={action.href} className="quick">
                  {action.label}
                </a>
              ) : (
                <button
                  key={action.id}
                  type="button"
                  className="quick"
                  onClick={() => {
                    trackEvent('human_handoff_requested', { source: 'assistant' });
                    trackEvent('che_xu_cta_selected', { location: 'assistant' });
                    window.dispatchEvent(
                      new CustomEvent('northline:open-lead-drawer', {
                        detail: { source: 'assistant' },
                      }),
                    );
                  }}
                >
                  {action.label}
                </button>
              ),
            )}
          </div>

          <form onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="assistant-input">
              Message the demo assistant
            </label>
            <input
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask about the demo…"
              disabled={pending}
            />
            <button className="btn btn-primary" type="submit" disabled={pending || !input.trim()}>
              Send
            </button>
          </form>
        </section>
      )}

      <style>{`
        .demo-assistant {
          position: fixed;
          right: 1rem;
          bottom: calc(5.25rem + env(safe-area-inset-bottom));
          z-index: 45;
        }
        @media (min-width: 1024px) {
          .demo-assistant { bottom: 1.25rem; }
        }
        .demo-assistant__launch {
          display: inline-flex; align-items: center; gap: 0.5rem;
          min-height: 48px; padding: 0.7rem 1rem; border: 0; border-radius: 999px;
          background: #0B1F33; color: #fff; font-weight: 700; cursor: pointer;
          box-shadow: 0 12px 30px rgb(11 31 51 / 0.25);
        }
        .demo-assistant__panel {
          width: min(22rem, calc(100vw - 2rem));
          background: #fff; border: 1px solid #d7e0ea; border-radius: 1rem;
          box-shadow: 0 18px 40px rgb(11 31 51 / 0.18); overflow: hidden;
          display: grid; grid-template-rows: auto 1fr auto auto;
          max-height: min(70vh, 34rem);
        }
        .demo-assistant__panel header {
          display: flex; justify-content: space-between; gap: 0.75rem;
          padding: 0.9rem 1rem; background: #0B1F33; color: #fff;
        }
        .demo-assistant__panel h2 { margin: 0; font-size: 1rem; }
        .demo-assistant__panel header p { margin: 0.2rem 0 0; font-size: 0.8rem; opacity: 0.85; }
        .demo-assistant__close {
          width: 40px; height: 40px; border: 0; border-radius: 0.5rem;
          background: rgb(255 255 255 / 0.12); color: #fff; cursor: pointer;
          display: grid; place-items: center;
        }
        .demo-assistant__messages {
          padding: 0.85rem; overflow-y: auto; display: grid; gap: 0.55rem; background: #F8FAFC;
        }
        .msg { margin: 0; padding: 0.65rem 0.75rem; border-radius: 0.75rem; font-size: 0.92rem; white-space: pre-wrap; }
        .msg--assistant { background: #fff; border: 1px solid #d7e0ea; color: #17212B; }
        .msg--user { background: #EAF3FF; color: #0B1F33; justify-self: end; max-width: 90%; }
        .demo-assistant__quick {
          display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0.65rem 0.85rem; border-top: 1px solid #d7e0ea;
        }
        .quick {
          border: 1px solid #d7e0ea; background: #fff; border-radius: 999px;
          min-height: 36px; padding: 0.3rem 0.7rem; font-size: 0.8rem; font-weight: 650;
          color: #0B1F33; text-decoration: none; cursor: pointer;
        }
        .demo-assistant__panel form {
          display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;
          padding: 0.75rem; border-top: 1px solid #d7e0ea;
        }
        .demo-assistant__panel input {
          min-height: 44px; border: 1px solid #d7e0ea; border-radius: 0.625rem;
          padding: 0.55rem 0.75rem; font: inherit;
        }
      `}</style>
    </div>
  );
}
