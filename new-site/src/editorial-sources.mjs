// Primary references consulted for the October 10, 2026 editorial draft.
// Eight references were rechecked for the October 16 decision-focused content pass.
// Existing guide sources not listed in checkedSourceIds retain their prior provenance.
import { guideSources } from './guide-sources.mjs';

export const editorialSourceOverrides = {
  probes: ['FUJIFILM Sonosite · transducers and compatible systems', 'https://www.sonosite.com/uk/products/ultrasound-transducers'],
  tables: ['Baxter / Hillrom · example surgical table configuration', 'https://www.hillrom.com.au/en/products/pst-500-precision-surgical-table/'],
  microscopeExample: ['ZEISS · example optics, viewing and suspension options', 'https://www.zeiss.com/meditec/en/products/surgical-microscopes/opmi-pico.html'],
  neonatal: ['GE HealthCare · example incubator configuration', 'https://www.gehealthcare.com/middle-east/products/maternal-infant-care/giraffe-incubator-carestation'],
  suction: ['Drive DeVilbiss · suction unit specifications', 'https://www.drivemedical.com/news-article/the-compact-lightweight-vacu-aide-7325-features-improved-battery-function-and-is-appropriatefor-all-patient-populations?hs_amp=true'],
};

export const checkedSourceIds = ['probes', 'imagingSite', 'ctBasics', 'mriBasics', 'anesthesia', 'tables', 'reprocessing', 'aer', 'energy', 'microscopeExample', 'airway', 'ventilation', 'monitoring', 'ecg', 'defibrillation', 'neonatal', 'recalls', 'oxygen', 'highFlow', 'infusion', 'suction', 'laboratory', 'pointOfCare', 'retinal', 'tonometry', 'oximetry', 'sterilizer', 'beds', 'coldChain', 'dialysis', 'donations'];

export const recheckedSourceIds = ['tables', 'aer', 'ventilation', 'oxygen', 'infusion', 'laboratory', 'coldChain', 'donations'];

export const editorialSources = Object.fromEntries(Object.entries({ ...guideSources, ...editorialSourceOverrides }).map(([id, [label, url]]) => [id, {
  label, url,
  checked: recheckedSourceIds.includes(id) ? '2026-10-16' : checkedSourceIds.includes(id) ? '2026-10-10' : null,
  note: checkedSourceIds.includes(id)
    ? 'Primary source consulted for the editorial guidance. Model-specific examples do not establish availability or suitability of an offered unit; this is not clinical approval.'
    : 'Reference retained from the existing source; not independently rechecked in this writing pass.',
}]));
