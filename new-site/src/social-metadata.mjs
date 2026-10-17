import { equipmentGuidance } from './editorial-guidance.mjs';

// Public share copy belongs to the page, never to a visitor or campaign.
// Item-level fields can refine a card without changing its predictable URL.
export const socialImageSize = { width: 1200, height: 630, type: 'image/jpeg' };
export const socialImagePath = key => `/assets/social/${key}.jpg`;

const card = (title, headline, strapline, description) => ({ title, headline, strapline, description });
const equipmentCards = {
  ultrasound: card('Buying ultrasound? Start with the probe.', 'Start with\nthe probe.', 'Ultrasound decisions beyond the screen.', 'Compare ultrasound probes, supported examinations, software, condition, and service before choosing a portable or cart-based system.'),
  xray: card('Is your X-ray quote a complete system?', 'Is the X-ray\nquote complete?', 'Detectors, software, room, support.', 'Compare the detector, generator, software, room preparation, and support behind an X-ray or C-arm proposal.'),
  'ct-mri': card('CT & MRI: plan the site before the delivery.', 'The scanner\nis only\nthe start.', 'CT & MRI planning beyond the machine.', 'A practical starting point for CT and MRI sourcing: site readiness, installation, software, delivery access, and service.'),
  anesthesia: card('Anesthesia equipment: compare the whole workstation.', 'Look beyond\nthe workstation.', 'Anesthesia, accessories, and infrastructure.', 'Compare anesthesia workstation configuration, compatible accessories, facility utilities, condition records, and service support.'),
  'surgical-tables': card('Surgical tables & lights: will the whole room work?', 'Make the\nwhole room work.', 'Tables, lighting, positioning, access.', 'Compare surgical tables and lighting around procedure needs, room layout, compatible accessories, installation, and maintenance.'),
  endoscopy: card('Endoscopy: compatibility comes first.', 'Compatibility\ncomes first.', 'Scopes, processors, and reprocessing.', 'Evaluate endoscopy systems as a complete chain: scopes, processors, reprocessing requirements, repair history, and ongoing support.'),
  ventilators: card('Ventilators: plan the support behind each breath.', 'Plan beyond\nthe ventilator.', 'Specification, supplies, and support.', 'Start with the clinical specification, then check gas and power, compatible circuits, inspection records, training, and service.'),
  ekg: card('Monitoring equipment: check what the quote leaves out.', 'What does the\nquote leave out?', 'Monitors, ECG, and defibrillators.', 'Compare monitoring parameters, connectivity, leads, sensors, batteries, accessories, and service documentation as one package.'),
  neonatal: card('Neonatal equipment: match the complete care setup.', 'Think beyond\nthe incubator.', 'Maternal and neonatal equipment planning.', 'Review neonatal and maternal equipment requirements alongside accessories, consumable supply, inspection, training, and service.'),
  laboratory: card('A laboratory analyzer needs a working supply plan.', 'Buy a working\nlab workflow.', 'Tests, reagents, space, and service.', 'Compare laboratory equipment against test workload, reagent supply, utilities, installation needs, and local service options.'),
  sterilization: card('Sterilization: capacity is only one part of the plan.', 'Plan the whole\nsterilization\nworkflow.', 'Capacity, utilities, installation, support.', 'Compare sterilization equipment alongside water, power, drainage, workflow capacity, installation, validation, and maintenance.'),
  beds: card('Hospital beds: fit the room, the workflow, the budget.', 'Fit the room.\nSupport the care.', 'Beds, stretchers, and patient furniture.', 'Compare hospital beds and patient furniture with room space, accessories, mattresses, delivery access, and maintenance in view.'),
  electrosurgery: card('Electrosurgery: the generator is only the start.', 'The generator\nis only the start.', 'Compatible instruments matter.', 'Compare electrosurgical generators with approved instruments, cables, testing records, recurring supplies, and service support.'),
  'surgical-microscopes': card('Surgical microscopes: look beyond magnification.', 'Look beyond\nmagnification.', 'Optics, positioning, condition, support.', 'Compare surgical microscopes around specialty requirements, working distance, illumination, accessories, condition, and service.'),
  airway: card('Airway equipment: match the complete system.', 'Match the\ncomplete system.', 'Airway visualization without missing pieces.', 'Check airway visualization equipment against patient groups, monitor and blade compatibility, consumables, and reprocessing needs.'),
  oxygen: card('Oxygen systems: plan power, flow, and backup.', 'Plan the supply\nbehind the system.', 'Oxygen, high flow, power, and backup.', 'Compare oxygen and high-flow systems using clinical requirements, connected-device compatibility, power, maintenance, and backup supply.'),
  infusion: card('Infusion pumps: price the supplies as well as the pump.', 'The pump is\nonly part\nof the cost.', 'Sets, syringes, batteries, and support.', 'Compare infusion and syringe pumps alongside approved supplies, software, battery condition, testing, and long-term consumable availability.'),
  suction: card('Medical suction: match the unit to the job.', 'Match suction\nto the setting.', 'Flow, batteries, collection, maintenance.', 'Compare medical suction equipment around clinical application, operating pattern, vacuum and flow, batteries, and collection systems.'),
  'point-of-care': card('Point-of-care testing: plan beyond the analyzer.', 'Plan beyond\nthe analyzer.', 'Cartridges, controls, and continuity.', 'Compare point-of-care testing equipment alongside the test menu, cartridges, controls, storage, shelf life, training, and oversight.'),
  ophthalmology: card('Ophthalmic equipment: start with the examination.', 'Start with\nthe examination.', 'Optics, imaging, software, and support.', 'Compare ophthalmic equipment against clinical workflow, optics, software, accessories, consumables, testing, and service.'),
  'clinical-essentials': card('Clinic equipment: build a kit your team can sustain.', 'Build a kit\nthat keeps working.', 'Clinic essentials beyond the packing list.', 'Choose clinic and examination equipment around services, staff capability, patient groups, recurring supplies, power, and maintenance.'),
  refrigeration: card('Medical refrigeration: protect the cold chain.', 'Plan the\nwhole cold chain.', 'Storage, monitoring, power, contingency.', 'Compare medical refrigeration around stored products, required conditions, capacity, temperature monitoring, power, and contingency arrangements.'),
  dialysis: card('Dialysis equipment: plan the system around the machine.', 'Plan around\nthe machine.', 'Dialysis, water, supplies, and service.', 'Start dialysis sourcing with clinical specifications, water infrastructure, consumables, commissioning, testing, and specialist support.'),
};

const resourceCards = {
  'the-price-of-a-working-service': card('Before you choose the lowest equipment quote', 'Compare the\nworking service.', 'What will it take to put care into operation?', 'Compare equipment proposals on the complete working service, including installation, supplies, training, and ongoing support.'),
  'refurbished-is-a-question-not-a-verdict': card('Refurbished equipment: buy the evidence', 'Buy the\nevidence.', 'A refurbished label is the start of the questions.', 'Evaluate a refurbished unit using condition records, the complete configuration, acceptance terms, and local support.'),
  'a-donation-should-start-with-the-recipient': card('A useful donation starts with the receiving team', 'Start with\nthe receiving team.', 'Make the donation useful after arrival.', 'Build an equipment donation around the recipient’s service plan, acceptance conditions, and continuing costs.'),
  'standardize-with-an-exit-plan': card('Standardize your fleet with a way to change course', 'Standardize.\nKeep a way\nto change course.', 'Common equipment. Clear alternatives.', 'Weigh the benefits of a common equipment fleet alongside supply dependence, exceptions, and future transition costs.'),
  'service-starts-before-delivery': card('Negotiate equipment service before the first breakdown', 'Plan service\nbefore delivery.', 'Turn “support included” into a clear agreement.', 'Define maintenance, parts, repair milestones, and return-to-service responsibilities before the first breakdown.'),
  'imaging-equipment-buying-guide': card('Buying imaging equipment? Compare the complete system.', 'Imaging,\nexplained.', 'Ultrasound. X-ray. C-arms. CT. MRI.', 'Understand imaging equipment options, then compare probes, detectors, software, room preparation, and service as part of the full purchase.'),
  'surgical-equipment-buying-guide': card('Equip the operating room around the whole workflow.', 'Surgery &\nanesthesia,\nexplained.', 'From workstations to instruments.', 'Compare operating-room equipment, compatible accessories, facility requirements, reprocessing, and ownership costs.'),
  'critical-care-buying-guide': card('Patient-care equipment: know what to compare.', 'Patient care,\nexplained.', 'From ventilation to bedside monitoring.', 'Understand ventilation, oxygen, monitoring, defibrillation, infusion, suction, and neonatal equipment before comparing proposals.'),
  'diagnostic-equipment-buying-guide': card('Buy a testing workflow your laboratory can sustain.', 'Diagnostics,\nexplained.', 'The analyzer is only the beginning.', 'Compare laboratory and diagnostic equipment with test volume, consumables, quality control, staff capability, and service in view.'),
  'hospital-essentials-buying-guide': card('Hospital essentials: the infrastructure matters.', 'Hospital\nessentials,\nexplained.', 'The systems behind everyday care.', 'Compare sterilization, beds, refrigeration, and dialysis equipment with utilities, capacity, installation, and ongoing support in view.'),
  'mission-clinic-equipment-guide': card('A mission clinic needs more than a packing list.', 'More than\na packing list.', 'Build a practical mission-clinic setup.', 'Plan clinic equipment around clinical services, staff, consumables, training, power, maintenance, and referral arrangements.'),
  'planning-hospital-equipment': card('Turn your equipment list into a useful buying brief.', 'Start with\na better brief.', 'Make the next equipment conversation count.', 'Prepare an equipment sourcing brief with clinical requirements, destination, site constraints, budget, timing, and support needs.'),
  'refurbished-equipment-questions': card('The lowest equipment price is not the whole cost.', 'Look beyond\nthe price tag.', 'Questions for new and refurbished equipment.', 'Ask about actual condition, configuration, included accessories, service terms, delivery, and acceptance before comparing equipment offers.'),
  'prepare-service-request': card('Need equipment support? Gather these details first.', 'Make your\nservice request\nmore useful.', 'Model. Issue. History. Next step.', 'Prepare the model and serial number, observed issue, equipment history, department impact, and technical contact for a service conversation.'),
  'wholesale-charitable-pricing': card('Put your mission and equipment budget in one brief.', 'Your mission.\nYour budget.\nOne conversation.', 'Preparing a charitable pricing request.', 'Share your organization, priorities, specifications, funding, destination, and support needs when requesting wholesale or charitable equipment pricing.'),
};

const mainCards = {
  index: { ...card('Hospital equipment, with the support to move forward.', 'Equipment.\nExpertise.\nOngoing support.', 'Sourcing for hospitals, clinics, and missions.', 'Explore hospital equipment sourcing, wholesale and charitable pricing, free equipment consultation, and practical support from MMS.'), image: 'operating-room' },
  offerings: { ...card('Explore 23 hospital equipment types in one place.', 'Find the equipment\nyour facility needs.', 'Hospital equipment, department by department.', 'Browse imaging, surgery, critical care, diagnostics, and hospital essentials, with practical buying advice and sourcing support.'), image: 'reference/ultrasound-portable' },
  services: { ...card('Bring your equipment questions. Build a clearer plan.', 'Bring the\nquestions.\nBuild the plan.', 'Procurement, advice, and service support.', 'Explore equipment sourcing and service plus free physician-to-physician equipment consultation and materials management support.'), image: 'equipment-detail' },
  articles: { ...card('Equipment buying guides: spend wisely, buy what works.', 'Buy what works.\nKnow what it costs.', '46 practical guides. One clearer decision.', 'Compare equipment options, complete-package costs and support. Read original MMS buying guides and download concise, printable guide sheets.'), image: 'guides/anesthesia' },
  about: { ...card('Meet the people behind Med Mission Supplies.', 'Equipment access.\nA shared mission.', 'Meet Med Mission Supplies.', 'Meet the MMS team and learn about our mission to help hospitals and clinics access equipment and ongoing support.'), image: 'operating-room' },
  employment: { ...card('Help connect care teams with the equipment they need.', 'Put your skills\nto work for care.', 'Explore careers with Med Mission Supplies.', 'Explore opportunities with Med Mission Supplies and help support hospital equipment access, procurement, and service.'), image: 'laboratory' },
  contact: { ...card('Let’s plan your next equipment purchase.', 'Start your next\nequipment\nconversation.', 'Equipment, advice, pricing, and support.', 'Request hospital equipment, free physician-to-physician equipment consultation, materials management support, or a service conversation.'), image: 'reference/ultrasound-portable' },
};

export function socialContentFor(route, item) {
  const guidance = route.equipmentId ? equipmentGuidance.find(entry => entry.id === route.equipmentId) : null;
  const fallback = equipmentCards[route.equipmentId] ?? resourceCards[route.articleId] ?? mainCards[route.key] ?? {};
  const headline = item?.socialHeadline ?? fallback.headline ?? item?.socialTitle ?? route.title;
  const title = item?.socialTitle ?? guidance?.socialTitle ?? fallback.title ?? route.title;
  const description = item?.socialDescription ?? guidance?.socialDescription ?? fallback.description ?? route.description;
  const label = route.equipmentId ? item.title : route.articleId ? (item.kind === 'opinion' ? 'MMS perspective' : 'Equipment guidance') : 'Med Mission Supplies';
  return {
    title,
    headline,
    description,
    strapline: item?.socialStrapline ?? fallback.strapline ?? 'Practical equipment decisions with MMS.',
    label,
    image: item?.image ?? fallback.image ?? 'operating-room',
    // Describes the composed image rather than presenting a generic filename.
    alt: `${headline.replace(/\n/g, ' ')} ${item?.socialStrapline ?? fallback.strapline ?? ''} — Med Mission Supplies; illustrative equipment photograph.`.replace(/\s+/g, ' ').trim(),
  };
}
