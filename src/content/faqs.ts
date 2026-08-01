export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'How does the service-request process work?',
    answer:
      'In this demonstration, you choose a service, pick a general request type, select preferred timing, and preview a contact step. Nothing is submitted to NorthLine because NorthLine is fictional. The flow shows how a real contractor site can reduce friction.',
  },
  {
    question: 'Can I request more than one service?',
    answer:
      'Yes in the demo experience—choose your primary category, or select “Not sure” and describe mixed needs. For a real business, Che Xu Studio can support multi-service forms connected to the right dispatch queue.',
  },
  {
    question: 'How would this website connect to scheduling software?',
    answer:
      'Che Xu Studio can integrate approved scheduling, booking, or field-service tools for a real client after reviewing workflow, availability rules, and privacy requirements. This demo does not connect to live calendars.',
  },
  {
    question: 'Can this design be customized for another type of contractor?',
    answer:
      'Absolutely. The information architecture—services, areas, guided requests, and mobile CTAs—adapts well to HVAC, plumbing, electrical, roofing, cleaning, and other local trades.',
  },
  {
    question: 'Can Che Xu Studio add online payments?',
    answer:
      'Yes. For verified clients, Che Xu Studio can integrate secure payment providers for deposits, invoices, or maintenance plans—never inside this fictional NorthLine booking flow.',
  },
  {
    question: 'Can Che Xu Studio create service-area SEO pages?',
    answer:
      'Yes—when each location page has unique, useful local content. This demo intentionally avoids thin city-page duplicates and shows a responsible service-area architecture instead.',
  },
  {
    question: 'Can this website connect to an existing CRM?',
    answer:
      'For a real business, Che Xu Studio can route consented leads into your CRM, email tools, or dispatch system using secure server-side integrations.',
  },
];

export const contactFaqs: FaqItem[] = [
  {
    question: 'Who should I contact about this website?',
    answer:
      'All genuine business enquiries go to Che Xu Studio. Use “Build a Website Like This” or the contact options on this page.',
  },
  {
    question: 'Can I book NorthLine for a home visit?',
    answer:
      'No. NorthLine Home Services is a fictional portfolio concept and does not accept service requests.',
  },
];
