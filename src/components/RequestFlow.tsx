import { useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import {
  assertDemoRequestNotTransmitted,
  demoServiceOptions,
  requestTypesByService,
  timingOptions,
  type DemoRequestState,
  type DemoServiceChoice,
} from '../lib/request-flow';

const steps = ['Service', 'Request type', 'Timing', 'Contact preview'] as const;

function initialService(): DemoServiceChoice | undefined {
  if (typeof window === 'undefined') return undefined;
  const value = new URLSearchParams(window.location.search).get('service');
  const allowed = demoServiceOptions.map((option) => option.id);
  return allowed.includes(value ?? '') ? (value as DemoServiceChoice) : undefined;
}

export default function RequestFlow({ compact = false }: { compact?: boolean }) {
  const preset = initialService();
  const [step, setStep] = useState(preset ? 1 : 0);
  const [state, setState] = useState<DemoRequestState>({ service: preset });
  const [complete, setComplete] = useState(false);

  const requestTypes = useMemo(() => {
    if (!state.service) return [];
    return requestTypesByService[state.service];
  }, [state.service]);

  function start() {
    trackEvent('request_demo_started', { location: compact ? 'homepage' : 'request_page' });
  }

  function finishDemo() {
    assertDemoRequestNotTransmitted();
    setComplete(true);
    trackEvent('request_demo_completed', { location: compact ? 'homepage' : 'request_page' });
  }

  function restart() {
    setStep(0);
    setState({});
    setComplete(false);
  }

  if (complete) {
    return (
      <section className="request-flow surface" aria-labelledby="request-complete-title">
        <p className="eyebrow">Demo complete</p>
        <h2 id="request-complete-title" className="display">
          You’ve completed the NorthLine conversion-flow demonstration.
        </h2>
        <p className="lead">Want a customer experience like this for your business?</p>
        <div className="request-flow__actions">
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => {
              trackEvent('che_xu_cta_selected', { location: 'request_complete' });
              window.dispatchEvent(
                new CustomEvent('northline:open-lead-drawer', {
                  detail: { source: 'request_complete' },
                }),
              );
            }}
          >
            Build My Website
          </button>
          <a
            className="btn btn-secondary"
            href="https://chexustudio.com/packages"
            onClick={() => trackEvent('package_link_selected', { location: 'request_complete' })}
          >
            View Che Xu Studio Packages
          </a>
          <button type="button" className="btn btn-ghost" onClick={restart}>
            Restart Demo
          </button>
        </div>
        <Style />
      </section>
    );
  }

  return (
    <section
      className={`request-flow surface ${compact ? 'is-compact' : ''}`}
      aria-labelledby="request-flow-title"
    >
      <p className="eyebrow">Guided request demo</p>
      <h2 id="request-flow-title" className="display">
        {compact
          ? 'Try the first steps of a clearer request flow.'
          : 'Request Service Demonstration'}
      </h2>
      <p className="lead">
        Demo only—this information will not be submitted to NorthLine because NorthLine is a
        fictional portfolio concept.
      </p>

      <ol className="request-flow__steps" aria-label="Request steps">
        {steps.map((label, index) => (
          <li key={label} aria-current={index === step ? 'step' : undefined}>
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="request-flow__panel" role="group" aria-label={steps[step]}>
        {step === 0 && (
          <fieldset>
            <legend>Choose a service</legend>
            <div className="option-grid">
              {demoServiceOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`option-card ${state.service === option.id ? 'is-selected' : ''}`}
                  onClick={() => {
                    start();
                    setState({ service: option.id as DemoServiceChoice });
                    trackEvent('service_card_selected', {
                      service: option.id,
                      location: 'request_flow',
                    });
                  }}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend>Choose the general request type</legend>
            <div className="option-grid">
              {requestTypes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`option-card ${state.requestType === option.id ? 'is-selected' : ''}`}
                  onClick={() => setState((prev) => ({ ...prev, requestType: option.id }))}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Preferred timing</legend>
            <p className="hint">
              Timing preferences help demonstrate planning UX—they do not promise real appointments.
            </p>
            <div className="option-grid">
              {timingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`option-card ${state.timing === option.id ? 'is-selected' : ''}`}
                  onClick={() => setState((prev) => ({ ...prev, timing: option.id }))}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend>Contact preview</legend>
            <p className="hint" role="note">
              Demo only—this information will not be submitted to NorthLine because NorthLine is a
              fictional portfolio concept. Feel free to use placeholder details.
            </p>
            <div className="preview-fields">
              <label>
                Name
                <input
                  value={state.contactPreviewName ?? ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, contactPreviewName: e.target.value }))
                  }
                  autoComplete="off"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={state.contactPreviewEmail ?? ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, contactPreviewEmail: e.target.value }))
                  }
                  autoComplete="off"
                />
              </label>
              <label>
                Phone
                <input
                  value={state.contactPreviewPhone ?? ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, contactPreviewPhone: e.target.value }))
                  }
                  autoComplete="off"
                />
              </label>
              <label>
                Notes
                <textarea
                  rows={3}
                  value={state.contactPreviewNotes ?? ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, contactPreviewNotes: e.target.value }))
                  }
                />
              </label>
            </div>
          </fieldset>
        )}
      </div>

      <div className="request-flow__actions">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              (step === 0 && !state.service) ||
              (step === 1 && !state.requestType) ||
              (step === 2 && !state.timing)
            }
            onClick={() => setStep((value) => value + 1)}
          >
            Continue
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={finishDemo}>
            Finish demonstration
          </button>
        )}
      </div>
      <Style />
    </section>
  );
}

function Style() {
  return (
    <style>{`
      .request-flow { padding: 1.25rem; }
      @media (min-width: 768px) { .request-flow { padding: 1.75rem; } }
      .request-flow .display { font-size: clamp(1.45rem, 3vw, 2rem); margin: 0.35rem 0 0.75rem; }
      .request-flow .lead { margin: 0 0 1.25rem; }
      .request-flow__steps {
        list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0 0 1.25rem;
      }
      .request-flow__steps li {
        display: inline-flex; align-items: center; gap: 0.4rem; min-height: 36px;
        padding: 0.25rem 0.7rem; border-radius: 999px; background: #EAF3FF; color: #0B1F33;
        font-size: 0.9rem; font-weight: 650;
      }
      .request-flow__steps li[aria-current='step'] { background: #176BFF; color: #fff; }
      .request-flow__steps span {
        display: inline-grid; place-items: center; width: 1.35rem; height: 1.35rem;
        border-radius: 999px; background: rgb(255 255 255 / 0.35); font-size: 0.8rem;
      }
      fieldset { border: 0; padding: 0; margin: 0; }
      legend { font-weight: 750; color: #0B1F33; margin-bottom: 0.75rem; }
      .hint { color: #5b6b7c; margin: 0 0 0.85rem; }
      .option-grid { display: grid; gap: 0.65rem; }
      @media (min-width: 768px) { .option-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      .option-card {
        text-align: left; border: 2px solid #d7e0ea; border-radius: 0.75rem; background: #fff;
        padding: 0.9rem; min-height: 88px; cursor: pointer; display: grid; gap: 0.3rem;
      }
      .option-card strong { color: #0B1F33; }
      .option-card span { color: #5b6b7c; font-size: 0.92rem; }
      .option-card.is-selected, .option-card:hover { border-color: #176BFF; }
      .preview-fields { display: grid; gap: 0.75rem; }
      .preview-fields label { display: grid; gap: 0.35rem; font-weight: 650; color: #0B1F33; }
      .preview-fields input, .preview-fields textarea {
        min-height: 44px; border: 1px solid #d7e0ea; border-radius: 0.625rem;
        padding: 0.6rem 0.75rem; font: inherit;
      }
      .request-flow__actions {
        display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 1.25rem;
      }
    `}</style>
  );
}
