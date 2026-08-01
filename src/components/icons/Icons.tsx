import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function baseProps(props: IconProps, title?: string) {
  const { title: _t, ...rest } = props;
  return {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    ...rest,
  };
}

export function IconHeating(props: IconProps) {
  const title = props.title;
  return (
    <svg {...baseProps(props, title)}>
      {title ? <title>{title}</title> : null}
      <path d="M12 3v10" />
      <path d="M8 7c2 2 6 2 8 0" />
      <path d="M7 14a5 5 0 0 0 10 0" />
      <path d="M9 21h6" />
    </svg>
  );
}

export function IconPlumbing(props: IconProps) {
  const title = props.title;
  return (
    <svg {...baseProps(props, title)}>
      {title ? <title>{title}</title> : null}
      <path d="M6 8h8a3 3 0 0 1 0 6H9" />
      <path d="M9 14v4a2 2 0 0 0 2 2h1" />
      <path d="M6 8V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

export function IconElectrical(props: IconProps) {
  const title = props.title;
  return (
    <svg {...baseProps(props, title)}>
      {title ? <title>{title}</title> : null}
      <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8z" />
    </svg>
  );
}

export function IconMaintenance(props: IconProps) {
  const title = props.title;
  return (
    <svg {...baseProps(props, title)}>
      {title ? <title>{title}</title> : null}
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  const title = props.title;
  return (
    <svg {...baseProps(props, title)}>
      {title ? <title>{title}</title> : null}
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-3a8 8 0 1 1 18-8z" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ServiceIcon({
  name,
  className,
}: {
  name: 'heating' | 'plumbing' | 'electrical' | 'maintenance';
  className?: string;
}) {
  const map = {
    heating: IconHeating,
    plumbing: IconPlumbing,
    electrical: IconElectrical,
    maintenance: IconMaintenance,
  } as const;
  const Cmp = map[name];
  return <Cmp className={className} />;
}
