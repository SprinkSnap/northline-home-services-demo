/**
 * Verified business data for a real client launch.
 * When DEMO_MODE is true, this data must NOT be published as LocalBusiness NAP.
 * When DEMO_MODE is false, every field marked required must be verified by the business owner.
 */

export interface VerifiedBusinessData {
  legalName: string;
  displayName: string;
  description: string;
  phone: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: number | null;
  longitude: number | null;
  openingHours: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  priceRange: string;
  areaServed: string[];
  sameAs: string[];
  contractorSubtype: 'HVACBusiness' | 'Electrician' | 'Plumber' | 'HomeAndConstructionBusiness';
  licenses: string[];
  insuranceNotes: string[];
}

/**
 * Placeholder shape only. Do not invent real NAP values for the fictional demo.
 * Populate and verify before setting DEMO_MODE=false.
 */
export const verifiedBusiness: VerifiedBusinessData | null = null;

export function assertVerifiedBusinessForProduction(
  demoMode: boolean,
  business: VerifiedBusinessData | null,
): void {
  if (demoMode) return;
  if (!business) {
    throw new Error('DEMO_MODE=false requires verified business data in src/config/business.ts');
  }
  const required: Array<keyof VerifiedBusinessData> = [
    'legalName',
    'displayName',
    'phone',
    'email',
    'streetAddress',
    'addressLocality',
    'addressRegion',
    'postalCode',
    'addressCountry',
  ];
  for (const key of required) {
    const value = business[key];
    if (value === null || value === undefined || value === '') {
      throw new Error(`Missing verified business field: ${key}`);
    }
  }
}
