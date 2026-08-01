/**
 * Service-area architecture demonstration.
 * These are illustrative region groupings—not published thin city pages.
 * Each real location page must have unique, useful local content before launch.
 */

export interface ServiceAreaGroup {
  id: string;
  name: string;
  summary: string;
  exampleCommunities: string[];
  contentRequirements: string[];
}

export const serviceAreaGroups: ServiceAreaGroup[] = [
  {
    id: 'core-metro',
    name: 'Core Metro Communities',
    summary:
      'Primary service coverage presented as a clear regional group rather than dozens of duplicate city URLs.',
    exampleCommunities: ['Downtown core', 'Inner suburbs', 'Riverside neighbourhoods'],
    contentRequirements: [
      'Unique neighbourhood context and travel notes',
      'Verified coverage boundaries from the business owner',
      'Distinct FAQs that reflect local housing stock',
    ],
  },
  {
    id: 'north-corridor',
    name: 'North Corridor',
    summary:
      'Shows how expanding coverage can be organized by corridor with shared proof points and unique local detail.',
    exampleCommunities: ['Northridge', 'Maple Heights', 'Cedar Park'],
    contentRequirements: [
      'Local landmarks or housing patterns that matter to technicians',
      'Seasonal considerations unique to the corridor',
      'Clear statement of which services are offered there',
    ],
  },
  {
    id: 'west-communities',
    name: 'West Communities',
    summary:
      'A template-ready grouping that keeps navigation simple while leaving room for genuine local pages later.',
    exampleCommunities: ['Westgate', 'Harbor View', 'Oak Hollow'],
    contentRequirements: [
      'Owner-verified drive-time or scheduling rules',
      'Differentiated copy—not swapped city names',
      'Optional project stories only when real and consented',
    ],
  },
];

export const serviceAreaGuidance = {
  heading: 'Local Coverage, Built the Right Way',
  intro:
    'This demo shows a clean service-area architecture without publishing thin, keyword-stuffed city pages.',
  principles: [
    'Group nearby communities when content would otherwise duplicate.',
    'Publish a dedicated location page only with unique local value.',
    'Keep NAP consistency for real businesses across site, maps, and directories.',
    'Use service + area combinations thoughtfully—never auto-generated doorways.',
  ],
  templateNote:
    'A location page template is ready for verified clients. Che Xu Studio activates it only after the business owner supplies accurate coverage details and useful local content.',
};
