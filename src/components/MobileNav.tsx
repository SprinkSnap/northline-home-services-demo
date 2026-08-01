import { useEffect, useId, useRef, useState } from 'react';
import { IconClose, IconMenu } from './icons/Icons';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/request-service', label: 'Request Service', primary: true },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="mobile-nav lg-hidden">
      <button
        ref={buttonRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <IconClose /> : <IconMenu />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      {open ? <div className="mobile-nav__backdrop" onClick={() => setOpen(false)} /> : null}

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={`mobile-nav__panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        hidden={!open}
      >
        <p id={titleId} className="mobile-nav__title">
          Menu
        </p>
        <nav aria-label="Mobile">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={link.primary ? 'btn btn-primary' : 'mobile-nav__link'}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(
                    new CustomEvent('northline:open-lead-drawer', {
                      detail: { source: 'mobile_nav' },
                    }),
                  );
                }}
              >
                Build a Website Like This
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <style>{`
        .mobile-nav { display: block; }
        @media (min-width: 1024px) {
          .mobile-nav { display: none; }
        }
        .mobile-nav__toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 0.625rem;
          border: 1px solid #d7e0ea;
          background: #fff;
          color: #0B1F33;
          cursor: pointer;
        }
        .mobile-nav__backdrop {
          position: fixed;
          inset: 0;
          background: rgb(11 31 51 / 0.45);
          z-index: 70;
        }
        .mobile-nav__panel {
          position: fixed;
          top: 0;
          right: 0;
          width: min(22rem, 100%);
          height: 100%;
          background: #fff;
          z-index: 80;
          padding: 1.25rem;
          transform: translateX(100%);
          transition: transform 220ms ease;
          overflow-y: auto;
        }
        .mobile-nav__panel.is-open {
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-nav__panel { transition: none; }
        }
        .mobile-nav__title {
          margin: 0 0 1rem;
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.35rem;
          color: #0B1F33;
        }
        .mobile-nav__panel ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.65rem;
        }
        .mobile-nav__link {
          display: flex;
          align-items: center;
          min-height: 44px;
          padding: 0.5rem 0.25rem;
          text-decoration: none;
          font-weight: 700;
          color: #0B1F33;
        }
        .mobile-nav__panel .btn {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
