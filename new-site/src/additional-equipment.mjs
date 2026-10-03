export const additionalEquipment = [
  {
    id: "electrosurgery",
    title: "Electrosurgical equipment",
    category: "surgical",
    image: "reference/electrosurgery",
    summary:
      "Generators, compatible instruments, and accessories for your procedure requirements.",
    includes: [
      "Electrosurgical generators",
      "Compatible instruments and cables",
      "Parts and service inquiries",
    ],
    considerations: [
      "Required functions and instrument compatibility",
      "Reusable and single-use accessory costs",
      "Documented testing and service support",
    ],
  },
  {
    id: "surgical-microscopes",
    title: "Surgical microscopes",
    category: "surgical",
    image: "reference/surgical-microscope",
    summary:
      "Optics, illumination, and microscope systems for specialist procedures.",
    includes: [
      "Surgical microscope sourcing",
      "Viewing and imaging accessories",
      "Service and support coordination",
    ],
    considerations: [
      "Specialty, optics, and working distance",
      "Stand, illumination, and accessory condition",
      "Destination service and transport protection",
    ],
  },
  {
    id: "airway",
    title: "Airway visualization",
    category: "surgical",
    image: "reference/airway",
    summary:
      "Video laryngoscopes, airway scopes, and compatible system components.",
    includes: [
      "Video laryngoscope sourcing",
      "Airway visualization systems",
      "Compatible cables and accessories",
    ],
    considerations: [
      "Patient groups and clinical requirements",
      "Monitor, cable, and blade compatibility",
      "Consumables and validated reprocessing",
    ],
  },
  {
    id: "oxygen",
    title: "Oxygen & high-flow systems",
    category: "critical-care",
    image: "reference/oxygen",
    summary:
      "Concentrators and respiratory supply equipment, planned around your facility.",
    includes: [
      "Oxygen concentrator sourcing",
      "High-flow system inquiries",
      "Accessories and service planning",
    ],
    considerations: [
      "Required flow, concentration, and pressure",
      "Connected device compatibility",
      "Power, maintenance, and backup supply",
    ],
  },
  {
    id: "infusion",
    title: "Infusion & syringe pumps",
    category: "critical-care",
    image: "reference/infusion",
    summary:
      "Pumps and compatible supplies for ward, theatre, and critical care workflows.",
    includes: [
      "Volumetric infusion pumps",
      "Syringe pump sourcing",
      "Docks and compatible accessories",
    ],
    considerations: [
      "Approved sets and syringe compatibility",
      "Testing, battery condition, and software",
      "Long-term consumable supply",
    ],
  },
  {
    id: "suction",
    title: "Medical suction",
    category: "critical-care",
    image: "reference/suction",
    summary:
      "Portable and facility suction equipment with accessory and service support.",
    includes: [
      "Portable suction units",
      "Procedure and ward suction sourcing",
      "Canister, tubing, and filter inquiries",
    ],
    considerations: [
      "Clinical application and operating pattern",
      "Flow, vacuum, and battery requirements",
      "Collection systems and maintenance",
    ],
  },
  {
    id: "point-of-care",
    title: "Point-of-care testing",
    category: "diagnostics",
    image: "reference/point-of-care",
    summary:
      "Compact analyzers and testing equipment with consumables considered from the start.",
    includes: [
      "Point-of-care analyzers",
      "Hemoglobin, glucose, and urine testing",
      "Related accessories and supply inquiries",
    ],
    considerations: [
      "Test menu and approved specimen types",
      "Cartridges, controls, storage, and shelf life",
      "Training and laboratory oversight",
    ],
  },
  {
    id: "ophthalmology",
    title: "Ophthalmic equipment",
    category: "diagnostics",
    image: "reference/retinal-camera",
    summary:
      "Retinal imaging, slit lamps, and tonometry equipment for eye-care services.",
    includes: [
      "Retinal camera sourcing",
      "Slit lamps",
      "Tonometers and related accessories",
    ],
    considerations: [
      "Clinical workflow and required optics",
      "Software and accessory compatibility",
      "Consumables, testing, and service",
    ],
  },
  {
    id: "clinical-essentials",
    title: "Clinic & examination equipment",
    category: "diagnostics",
    image: "reference/otoscope",
    summary:
      "Examination tools, vital signs, and portable diagnostics for clinics and mission teams.",
    includes: [
      "Examination and vital-sign equipment",
      "Spirometry and audiometry inquiries",
      "Procedure instruments and clinic essentials",
    ],
    considerations: [
      "Services, staff capability, and patient groups",
      "Accessories, cleaning, and recurring supplies",
      "Portability, power, and maintenance",
    ],
  },
  {
    id: "refrigeration",
    title: "Medical refrigeration",
    category: "hospital",
    image: "refrigeration",
    summary:
      "Refrigeration and cold-chain equipment matched to the products you need to store.",
    includes: [
      "Medical refrigerator sourcing",
      "Cold-chain equipment inquiries",
      "Monitoring and support planning",
    ],
    considerations: [
      "Stored products and required conditions",
      "Capacity, temperature monitoring, and power",
      "Installation and contingency arrangements",
    ],
  },
  {
    id: "dialysis",
    title: "Dialysis equipment",
    category: "hospital",
    image: "dialysis",
    summary:
      "Specialist sourcing inquiries for dialysis equipment and its supporting systems.",
    includes: [
      "Dialysis machine sourcing inquiries",
      "Related equipment and consumables",
      "Specialist support coordination",
    ],
    considerations: [
      "Clinical specification and water infrastructure",
      "Consumables, commissioning, and service",
      "Ongoing testing and trained facility teams",
    ],
  },
].map((item) => ({
  ...item,
  text: `Tell us about your facility, the clinical team's specification, quantities, and destination. We can explore ${item.title.toLowerCase()} options and clarify the accessories, delivery, and support required for your project. Availability and scope are confirmed for each request.`,
}));
