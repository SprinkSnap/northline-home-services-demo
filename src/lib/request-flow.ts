export type DemoServiceChoice =
  'heating-cooling' | 'plumbing' | 'electrical' | 'home-maintenance' | 'not-sure';

export interface RequestOption {
  id: string;
  label: string;
  description: string;
}

export const demoServiceOptions: RequestOption[] = [
  {
    id: 'heating-cooling',
    label: 'Heating and cooling',
    description: 'Comfort systems, seasonal care, and performance concerns.',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    description: 'Fixtures, drains, and water-system questions.',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    description: 'Outlets, lighting, and panel-related requests.',
  },
  {
    id: 'home-maintenance',
    label: 'Home maintenance',
    description: 'Preventive upkeep and general home readiness.',
  },
  {
    id: 'not-sure',
    label: 'Not sure',
    description: 'Describe a mixed or unclear need and we will guide the path.',
  },
];

export const requestTypesByService: Record<DemoServiceChoice, RequestOption[]> = {
  'heating-cooling': [
    {
      id: 'seasonal-tuneup',
      label: 'Seasonal tune-up',
      description: 'Plan maintenance before peak weather.',
    },
    {
      id: 'comfort-issue',
      label: 'Comfort issue',
      description: 'Uneven rooms or systems not keeping up.',
    },
    {
      id: 'system-guidance',
      label: 'System guidance',
      description: 'Prepare for a professional consultation.',
    },
    {
      id: 'other-hvac',
      label: 'Something else',
      description: 'Another heating or cooling question.',
    },
  ],
  plumbing: [
    {
      id: 'fixture',
      label: 'Fixture concern',
      description: 'Taps, toilets, or fittings needing attention.',
    },
    { id: 'drain', label: 'Drain or flow', description: 'Slow drains or recurring flow issues.' },
    {
      id: 'water-heater',
      label: 'Water heater question',
      description: 'Temperature, capacity, or reliability.',
    },
    {
      id: 'other-plumbing',
      label: 'Something else',
      description: 'Another plumbing-related request.',
    },
  ],
  electrical: [
    {
      id: 'outlet-switch',
      label: 'Outlet or switch',
      description: 'Intermittent power or switch concerns.',
    },
    {
      id: 'lighting',
      label: 'Lighting project',
      description: 'Fixture upgrades or lighting planning.',
    },
    {
      id: 'panel',
      label: 'Panel question',
      description: 'Capacity or breaker concerns for a licensed electrician.',
    },
    {
      id: 'other-electrical',
      label: 'Something else',
      description: 'Another electrical-related request.',
    },
  ],
  'home-maintenance': [
    { id: 'seasonal', label: 'Seasonal checklist', description: 'Planned seasonal care visit.' },
    { id: 'upkeep', label: 'General upkeep', description: 'Smaller projects and ongoing care.' },
    {
      id: 'readiness',
      label: 'Home readiness',
      description: 'Prep for guests, listing, or seasonal change.',
    },
    {
      id: 'other-maintenance',
      label: 'Something else',
      description: 'Another maintenance-related request.',
    },
  ],
  'not-sure': [
    { id: 'mixed', label: 'Mixed needs', description: 'More than one trade may be involved.' },
    {
      id: 'advice',
      label: 'Need guidance',
      description: 'Help choosing the right starting category.',
    },
    {
      id: 'quote-shape',
      label: 'Quote conversation',
      description: 'Understand how a guided quote request could work.',
    },
  ],
};

export const timingOptions: RequestOption[] = [
  {
    id: 'asap',
    label: 'As soon as available',
    description: 'Shows urgency preference—does not promise real availability.',
  },
  {
    id: 'few-days',
    label: 'Within a few days',
    description: 'A near-term window for planning the visit conversation.',
  },
  {
    id: 'planning',
    label: 'Planning ahead',
    description: 'Useful for seasonal maintenance and scheduled projects.',
  },
  {
    id: 'flexible',
    label: 'Flexible',
    description: 'Happy to find a convenient time when a real business responds.',
  },
];

export interface DemoRequestState {
  service?: DemoServiceChoice;
  requestType?: string;
  timing?: string;
  contactPreviewName?: string;
  contactPreviewEmail?: string;
  contactPreviewPhone?: string;
  contactPreviewNotes?: string;
}

/** Explicitly documents that demo request data must never be transmitted. */
export function assertDemoRequestNotTransmitted(): void {
  // No network calls. This helper exists for tests and code review clarity.
}
