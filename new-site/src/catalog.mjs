import { additionalEquipment } from "./additional-equipment.mjs";

export const categories = [
  {
    id: "imaging",
    name: "Imaging & radiology",
    description: "From portable ultrasound to full imaging suites.",
    image: "ultrasound",
    icon: "scan",
  },
  {
    id: "surgical",
    name: "Surgery & anesthesia",
    description: "Equipment at the heart of your operating room.",
    image: "anesthesia",
    icon: "surgery",
  },
  {
    id: "critical-care",
    name: "Critical & patient care",
    description: "Support for the bedside, ICU, and beyond.",
    image: "ekg",
    icon: "heart",
  },
  {
    id: "diagnostics",
    name: "Laboratory & diagnostics",
    description: "Practical tools for your diagnostic workflow.",
    image: "laboratory",
    icon: "lab",
  },
  {
    id: "hospital",
    name: "Hospital essentials",
    description: "The systems that keep a hospital moving.",
    image: "operating-room",
    icon: "hospital",
  },
];

export const equipment = [
  {
    id: "ultrasound",
    title: "Ultrasound systems",
    category: "imaging",
    image: "ultrasound",
    summary:
      "Portable and cart-based systems, selected around your team and clinical requirements.",
    includes: [
      "Portable and cart-based systems",
      "Probes and compatible accessories",
      "Configuration and support planning",
    ],
    considerations: [
      "Intended examinations and probe requirements",
      "Portability, power, and storage needs",
      "Training, service history, and ongoing support",
    ],
    text: "Start with the examinations your clinicians need to perform and the environment where the system will be used. We can help source ultrasound equipment and discuss probes, accessories, and support as part of the same request.",
  },
  {
    id: "xray",
    title: "X-ray & C-arm systems",
    category: "imaging",
    image: "xray",
    summary:
      "Mobile and fixed radiography, digital imaging, and C-arm sourcing.",
    includes: [
      "Mobile and fixed X-ray equipment",
      "C-arm systems",
      "Digital detectors and accessories",
    ],
    considerations: [
      "Room and installation requirements",
      "Detector and software compatibility",
      "Local technical support and acceptance requirements",
    ],
    text: "A useful imaging quote starts with more than a model name. Share your intended use, facility location, and existing infrastructure so we can discuss the equipment, accessories, and specialist installation support your project may need.",
  },
  {
    id: "ct-mri",
    title: "CT & MRI equipment",
    category: "imaging",
    image: "ct-mri",
    summary:
      "Capital imaging projects with sourcing and lifecycle support in view.",
    includes: [
      "CT system sourcing",
      "MRI system sourcing",
      "Project-specific support coordination",
    ],
    considerations: [
      "Site readiness and installation scope",
      "Software, accessories, and service arrangements",
      "Delivery access, project budget, and schedule",
    ],
    text: "For larger imaging projects, tell us about your facility, clinical priorities, site plans, and budget. We can explore sourcing options and help define the specialist support required. Availability, installation scope, and service coverage are confirmed for each project.",
  },
  {
    id: "anesthesia",
    title: "Anesthesia machines",
    category: "surgical",
    image: "anesthesia",
    summary:
      "Workstations and related equipment for your operating environment.",
    includes: [
      "Anesthesia workstation sourcing",
      "Compatible components and accessories",
      "Service and support coordination",
    ],
    considerations: [
      "Facility gas and electrical infrastructure",
      "Required configuration and accessories",
      "Inspection, documentation, and service scope",
    ],
    text: "We help hospitals explore anesthesia equipment options around their facility requirements and budget. Share the preferred configuration and any existing equipment so that compatibility, accessories, and service needs can be considered together.",
  },
  {
    id: "surgical-tables",
    title: "Surgical tables & lights",
    category: "surgical",
    image: "operating-room",
    summary:
      "Operating room essentials, from procedure tables to surgical lighting.",
    includes: [
      "Operating and procedure tables",
      "Surgical lighting",
      "Positioning and compatible accessories",
    ],
    considerations: [
      "Procedure and positioning requirements",
      "Room layout and mounting requirements",
      "Accessories, installation, and maintenance",
    ],
    text: "Outfitting an operating room means matching equipment to the team, the space, and the work. We can help source tables, lighting, and related accessories for a replacement purchase or a wider department project.",
  },
  {
    id: "endoscopy",
    title: "Endoscopy systems",
    category: "surgical",
    image: "endoscopy",
    summary: "Scopes, processors, and complete system sourcing.",
    includes: [
      "Video processors and light sources",
      "Flexible scopes and system components",
      "Compatible accessories",
    ],
    considerations: [
      "Scope and processor compatibility",
      "Reprocessing workflow and equipment",
      "Condition, repair history, and support",
    ],
    text: "Share your existing platform and the procedures your team needs to support. We can explore compatible endoscopy equipment and help you ask the right questions about condition, accessories, repair options, and ongoing support.",
  },
  {
    id: "ventilators",
    title: "Ventilators & respiratory equipment",
    category: "critical-care",
    image: "ventilators",
    summary:
      "Respiratory equipment sourcing for hospital and critical care settings.",
    includes: [
      "Ventilator sourcing",
      "Respiratory equipment and accessories",
      "Service and parts inquiries",
    ],
    considerations: [
      "Your clinical team’s required specification",
      "Gas, power, and accessory compatibility",
      "Maintenance, inspection, and training arrangements",
    ],
    text: "We work from the specification defined by your clinical and technical teams. Tell us the setting, intended patient population, and preferred platform so we can discuss sourcing, compatible components, and the support needed for your equipment.",
  },
  {
    id: "ekg",
    title: "Monitors, ECG & defibrillators",
    category: "critical-care",
    image: "ekg",
    summary:
      "Patient monitoring and cardiac equipment across hospital departments.",
    includes: [
      "Patient monitoring systems",
      "ECG equipment",
      "Defibrillators and compatible accessories",
    ],
    considerations: [
      "Required parameters and connectivity",
      "Leads, sensors, batteries, and consumables",
      "Inspection and service documentation",
    ],
    text: "From a single monitor to a department-wide equipment request, we can help explore suitable options. Include the parameters your team needs, existing systems, and accessory requirements so the proposed package is clear from the start.",
  },
  {
    id: "neonatal",
    title: "Maternal & neonatal equipment",
    category: "critical-care",
    image: "neonatal",
    summary: "Sourcing support for maternity and neonatal departments.",
    includes: [
      "Infant incubators and warmers",
      "Phototherapy equipment",
      "Maternal and fetal monitoring equipment",
    ],
    considerations: [
      "Clinical and technical specifications",
      "Accessories and consumable availability",
      "Inspection, training, and service arrangements",
    ],
    text: "Tell us what your maternity or neonatal team needs and the environment in which it will be used. We can discuss equipment sourcing and practical support requirements with your designated clinical and technical contacts.",
  },
  {
    id: "laboratory",
    title: "Laboratory equipment",
    category: "diagnostics",
    image: "laboratory",
    summary:
      "Analyzers, centrifuges, and laboratory systems for everyday workflows.",
    includes: [
      "Laboratory analyzer sourcing",
      "Centrifuges and microscopes",
      "Related laboratory equipment",
    ],
    considerations: [
      "Test menu and expected workload",
      "Reagent, consumable, and service availability",
      "Utilities, workspace, and installation needs",
    ],
    text: "Equipment is only one part of a working laboratory. Share your test requirements, expected workload, and location so we can consider the system alongside consumables, service options, and practical installation needs.",
  },
  {
    id: "sterilization",
    title: "Sterilization equipment",
    category: "hospital",
    image: "sterilization",
    summary: "Sterilizer and autoclave sourcing for your facility’s workflow.",
    includes: [
      "Autoclave and sterilizer sourcing",
      "Related processing equipment",
      "Parts and service inquiries",
    ],
    considerations: [
      "Required capacity and workflow",
      "Water, power, drainage, and space",
      "Installation, validation, and maintenance scope",
    ],
    text: "Share the capacity and infrastructure requirements established by your facility team. We can help explore equipment options and clarify the related installation and service needs before you commit to a purchase.",
  },
  {
    id: "beds",
    title: "Hospital beds & patient furniture",
    category: "hospital",
    image: "beds",
    summary: "Beds, stretchers, and equipment for patient care spaces.",
    includes: [
      "Hospital and examination beds",
      "Stretchers and patient transport equipment",
      "Compatible mattresses and accessories",
    ],
    considerations: [
      "Department requirements and available space",
      "Electrical supply and accessory compatibility",
      "Delivery access, assembly, and maintenance",
    ],
    text: "Whether you are replacing a few beds or equipping a new care area, tell us the quantities, room requirements, and destination. We can discuss sourcing and the practical details of delivery, setup, and support.",
  },
];

equipment.push(...additionalEquipment);

export const categoryFor = (id) =>
  categories.find((category) => category.id === id);
export const equipmentUrl = (item) => `/equipment/${item.id}.html`;
export const photoUrl = (name) =>
  `/assets/photos/${name}.${name.startsWith("reference/") ? "webp" : "jpg"}`;
export function filterEquipment({ category = "all", query = "" } = {}) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return equipment.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      terms.every((term) =>
        `${item.title} ${item.summary} ${item.includes.join(" ")} ${categoryFor(item.category).name}`
          .toLowerCase()
          .includes(term),
      ),
  );
}
export function catalogState(search = "") {
  const params = new URLSearchParams(search);
  const category = params.get("category");
  return {
    category:
      category === "all" || categories.some((item) => item.id === category)
        ? category
        : "imaging",
    query: "",
  };
}
