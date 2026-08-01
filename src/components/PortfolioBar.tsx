import { useEffect, useId, useState } from 'react';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY = 'northline-portfolio-bar-dismissed';

export default function PortfolioBar() {
  const [visible, setVisible] = useState(false);
  const labelId = useId();

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* private mode */
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div className="portfolio-bar" role="region" aria-labelledby={labelId}>
      <div className="portfolio-bar__inner">
        <p id={labelId} className="portfolio-bar__copy">
          <strong>Portfolio concept by Che Xu Studio.</strong> Conversion-focused home-services
          website concept. NorthLine Home Services is a fictional demonstration.
        </p>
        <div className="portfolio-bar__actions">
          <a
            className="btn btn-secondary portfolio-bar__btn"
            href="#case-study-copy"
            onClick={() => trackEvent('case_study_selected', { location: 'portfolio_bar' })}
          >
            View Case Study
          </a>
          <button
            type="button"
            className="btn btn-accent portfolio-bar__btn"
            onClick={() => {
              trackEvent('che_xu_cta_selected', { location: 'portfolio_bar' });
              window.dispatchEvent(
                new CustomEvent('northline:open-lead-drawer', {
                  detail: { source: 'portfolio_bar' },
                }),
              );
            }}
          >
            Build a Website Like This
          </button>
          <button type="button" className="portfolio-bar__dismiss" onClick={dismiss}>
            Dismiss
          </button>
        </div>
      </div>
      <style>{`
        .portfolio-bar {
          position: sticky;
          top: 0;
          z-index: 60;
          background: #0B1F33;
          color: #fff;
          border-bottom: 1px solid rgb(255 255 255 / 0.12);
        }
        .portfolio-bar__inner {
          width: min(1120px, calc(100% - 2rem));
          margin: 0 auto;
          padding: 0.65rem 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          align-items: center;
          justify-content: space-between;
        }
        .portfolio-bar__copy {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.4;
          max-width: 46rem;
        }
        .portfolio-bar__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }
        .portfolio-bar__btn {
          min-height: 40px;
          padding: 0.45rem 0.85rem;
          font-size: 0.9rem;
        }
        .portfolio-bar__dismiss {
          min-height: 40px;
          min-width: 44px;
          border: 0;
          background: transparent;
          color: rgb(255 255 255 / 0.85);
          text-decoration: underline;
          cursor: pointer;
          font: inherit;
        }
        .portfolio-bar__dismiss:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
