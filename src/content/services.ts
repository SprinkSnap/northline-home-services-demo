export type ServiceSlug = 'heating-cooling' | 'plumbing' | 'electrical' | 'home-maintenance';

export interface ServiceCategory {
  name: string;
  description: string;
}

export interface ServiceDefinition {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  icon: 'heating' | 'plumbing' | 'electrical' | 'maintenance';
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cardDescription: string;
  examples: string[];
  categories: ServiceCategory[];
  whenToRequest: string[];
  journey: string[];
  related: ServiceSlug[];
  faqs: Array<{ question: string; answer: string }>;
  emergencyNotice?: string;
}

export const services: ServiceDefinition[] = [
  {
    slug: 'heating-cooling',
    name: 'Heating & Cooling',
    shortName: 'Heating & Cooling',
    icon: 'heating',
    eyebrow: 'Home comfort systems',
    title: 'Heating and Cooling Service Information',
    metaTitle: 'Heating & Cooling Services | NorthLine Concept',
    metaDescription:
      'Explore a clear heating and cooling service page concept with guided request options—designed by Che Xu Studio for home-service businesses.',
    summary:
      'Help homeowners understand heating and cooling options, seasonal maintenance, and when to request professional help—without confusing jargon or pressure.',
    cardDescription: 'Furnace, AC, and comfort system support presented with clear next steps.',
    examples: ['Seasonal tune-ups', 'System not cooling', 'Thermostat questions'],
    categories: [
      {
        name: 'Seasonal maintenance',
        description:
          'Routine check-ups that help homeowners plan comfort care before peak seasons.',
      },
      {
        name: 'Performance concerns',
        description:
          'Uneven rooms, weak airflow, or systems that are not keeping up with expectations.',
      },
      {
        name: 'System guidance',
        description:
          'High-level information to help homeowners prepare for a professional consultation.',
      },
    ],
    whenToRequest: [
      'Comfort has changed suddenly or rooms feel uneven.',
      'You want to schedule seasonal maintenance in advance.',
      'A system alert or unusual sound needs a professional look.',
      'You are planning an upgrade conversation—not an emergency diagnosis online.',
    ],
    journey: [
      'Choose heating and cooling as your service category.',
      'Select a general request type that matches your situation.',
      'Share preferred timing—without promised availability.',
      'Review the demonstration confirmation and next steps.',
    ],
    related: ['home-maintenance', 'electrical', 'plumbing'],
    faqs: [
      {
        question: 'Does this page book a real technician?',
        answer:
          'No. NorthLine is a fictional portfolio concept. The request flow demonstrates the customer experience; genuine website enquiries go to Che Xu Studio.',
      },
      {
        question: 'Can Che Xu Studio connect this flow to HVAC scheduling software?',
        answer:
          'Yes. For a real contractor, Che Xu Studio can integrate approved scheduling, CRM, or dispatch tools after verifying business requirements.',
      },
      {
        question: 'What if I smell gas or suspect a hazardous condition?',
        answer:
          'Leave the area if needed and contact your gas utility or local emergency services. This demo does not diagnose hazardous conditions.',
      },
    ],
    emergencyNotice:
      'If you smell gas, see sparks, or face a life-safety emergency, leave the area if needed and contact your utility provider or local emergency services. This website cannot diagnose hazardous conditions.',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    shortName: 'Plumbing',
    icon: 'plumbing',
    eyebrow: 'Water systems & fixtures',
    title: 'Plumbing Service Information',
    metaTitle: 'Plumbing Services | NorthLine Concept',
    metaDescription:
      'A plumbing service page concept with clear categories, safe guidance, and a guided enquiry flow—built as a Che Xu Studio portfolio demonstration.',
    summary:
      'Present plumbing service categories so homeowners can describe what they need and request help without DIY repair instructions.',
    cardDescription: 'Leaks, fixtures, and water-system requests with a guided enquiry path.',
    examples: ['Fixture issues', 'Drain concerns', 'Water heater questions'],
    categories: [
      {
        name: 'Fixtures and fittings',
        description: 'Taps, toilets, and fixture concerns that need a professional visit.',
      },
      {
        name: 'Drains and flow',
        description: 'Slow drains or recurring flow issues described at a high level.',
      },
      {
        name: 'Water heater support',
        description: 'Temperature, capacity, or reliability questions for a technician review.',
      },
    ],
    whenToRequest: [
      'A fixture is leaking or no longer working reliably.',
      'Drains are slow after basic homeowner-safe checks.',
      'You want a professional assessment before a renovation.',
      'You need to describe a concern clearly before a visit.',
    ],
    journey: [
      'Select plumbing from the service chooser.',
      'Pick a general request category.',
      'Choose preferred timing for the demonstration.',
      'Complete the preview step without sending personal data to NorthLine.',
    ],
    related: ['home-maintenance', 'heating-cooling', 'electrical'],
    faqs: [
      {
        question: 'Will my plumbing request be sent to a real plumber?',
        answer:
          'No. This is a fictional demonstration. Information entered in the NorthLine request flow is not transmitted as a service booking.',
      },
      {
        question: 'Can this design support emergency plumbing CTAs for a real business?',
        answer:
          'Yes—after a real business verifies after-hours processes, Che Xu Studio can design truthful emergency contact patterns without fake urgency.',
      },
      {
        question: 'What about burst pipes or flooding?',
        answer:
          'Shut off water at the main if it is safe to do so, and contact emergency services or a licensed plumber through verified channels. This demo does not provide repair instructions.',
      },
    ],
    emergencyNotice:
      'For flooding, a major burst pipe, or sewage backup that threatens safety, shut off water if safe and contact emergency services or a licensed professional through verified channels.',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    shortName: 'Electrical',
    icon: 'electrical',
    eyebrow: 'Power & safety-minded support',
    title: 'Electrical Service Information',
    metaTitle: 'Electrical Services | NorthLine Concept',
    metaDescription:
      'Electrical service page concept focused on clear categories and safe next steps—demonstrating Che Xu Studio’s conversion-minded contractor websites.',
    summary:
      'Help visitors describe electrical concerns at a high level and understand when to seek a licensed professional—never DIY electrical repairs.',
    cardDescription: 'Outlets, lighting, and panel-related requests with safety-first messaging.',
    examples: ['Outlet issues', 'Lighting upgrades', 'Panel questions'],
    categories: [
      {
        name: 'Outlets and switches',
        description:
          'Intermittent power, warm outlets, or switch concerns for professional review.',
      },
      {
        name: 'Lighting projects',
        description: 'Fixture upgrades and lighting planning conversations.',
      },
      {
        name: 'Panel and capacity questions',
        description:
          'High-level questions about capacity or breaker concerns for a licensed electrician.',
      },
    ],
    whenToRequest: [
      'An outlet, switch, or light is behaving inconsistently.',
      'You are planning a lighting or renovation-related electrical update.',
      'Breakers trip repeatedly and you need a professional assessment.',
      'You want clear language to describe a concern before booking.',
    ],
    journey: [
      'Choose electrical as the service category.',
      'Select a safe, high-level request type.',
      'Indicate preferred timing for the demo flow.',
      'See how confirmation and handoff to Che Xu Studio can work.',
    ],
    related: ['home-maintenance', 'heating-cooling', 'plumbing'],
    faqs: [
      {
        question: 'Can the website tell me how to fix an electrical problem?',
        answer:
          'No. This demonstration never provides electrical repair instructions. Electrical work should be handled by a licensed professional.',
      },
      {
        question: 'How would a real electrician use this page?',
        answer:
          'Che Xu Studio can adapt the structure with verified credentials, service areas, and scheduling integrations supplied by the business owner.',
      },
      {
        question: 'What if I smell burning or see sparks?',
        answer:
          'Leave the area if needed and contact local emergency services or your utility provider. Do not use this website for emergency diagnosis.',
      },
    ],
    emergencyNotice:
      'If you smell burning, see sparks, or suspect an electrical fire risk, leave the area if needed and contact local emergency services or your utility provider immediately.',
  },
  {
    slug: 'home-maintenance',
    name: 'Home Maintenance',
    shortName: 'Maintenance',
    icon: 'maintenance',
    eyebrow: 'Preventive care & upkeep',
    title: 'Home Maintenance Service Information',
    metaTitle: 'Home Maintenance Services | NorthLine Concept',
    metaDescription:
      'Home maintenance service architecture for contractor websites—clear categories, guided requests, and conversion-focused UX by Che Xu Studio.',
    summary:
      'Organize preventive maintenance and general upkeep so homeowners can plan ahead and request help with confidence.',
    cardDescription: 'Seasonal checklists and general upkeep requests in plain language.',
    examples: ['Seasonal checklists', 'General upkeep', 'Pre-sale prep'],
    categories: [
      {
        name: 'Seasonal checklists',
        description: 'Planned visits that help homeowners stay ahead of weather-driven needs.',
      },
      {
        name: 'General upkeep',
        description: 'Smaller projects and ongoing care that do not fit a single trade page.',
      },
      {
        name: 'Home readiness',
        description: 'Prep for guests, listing photos, or seasonal transitions.',
      },
    ],
    whenToRequest: [
      'You want a planned maintenance visit rather than an urgent repair.',
      'Several small items would be easier as one coordinated request.',
      'You are preparing a home for a seasonal change or listing.',
      'You need a clear way to describe mixed upkeep needs.',
    ],
    journey: [
      'Select home maintenance from the services list.',
      'Choose the closest request category.',
      'Pick a flexible timing preference.',
      'Complete the demonstration and explore a Che Xu Studio website plan.',
    ],
    related: ['heating-cooling', 'plumbing', 'electrical'],
    faqs: [
      {
        question: 'Is NorthLine a real maintenance company?',
        answer:
          'No. NorthLine Home Services is a fictional demonstration created by Che Xu Studio to show contractor website quality.',
      },
      {
        question: 'Can this structure support membership or maintenance plans?',
        answer:
          'Yes. For a real client, Che Xu Studio can add plan pages, renewals, and CRM-connected enrolment once business rules are verified.',
      },
      {
        question: 'How are multi-trade requests handled in the demo?',
        answer:
          'Visitors can choose “Not sure” in the request flow or start from a primary service and note additional needs in the demonstration steps.',
      },
    ],
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}
