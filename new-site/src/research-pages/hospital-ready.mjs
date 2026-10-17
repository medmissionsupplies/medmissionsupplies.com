export default {
  "id": "hospital-ready",
  "key": "hospital-ready",
  "kind": "research-guide",
  "equipmentId": null,
  "title": "The machine is ready. Is your hospital?",
  "summary": "Power, gases, water, temperature and maintenance can decide a purchase before brand or price. Find the missing dependency before the equipment ships.",
  "categoryId": "decisions",
  "category": "Procurement & service",
  "image": "guides/sterilization",
  "photo": {
    "id": "sterilization",
    "sourcePage": "https://commons.wikimedia.org/wiki/File:AUTOCLAVE_4210.jpg",
    "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/AUTOCLAVE_4210.jpg",
    "photographer": "Fernando A. Rivetti Suelotto",
    "license": "Public domain",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:AUTOCLAVE_4210.jpg",
    "caption": "A steam autoclave with its chamber door and front controls visible. Equipment example.",
    "captionContext": "Illustrative equipment photograph: A steam autoclave with its chamber door and front controls visible. Equipment example.",
    "alt": "A steam autoclave with its chamber door and front controls visible.",
    "fit": "contain",
    "modelMatch": "category",
    "verifiedAt": "2026-10-17",
    "changes": "Resized and converted to WebP. Original photographic content retained; display framing may vary. Each image retains its stated license.",
    "modelMatchNote": "This photograph illustrates the equipment context. It is not evidence of a product, supplier, software configuration or service package recommended in this guide."
  },
  "minutes": 3,
  "sections": [
    [
      "Follow the service through an ordinary day",
      "Begin where the equipment will work. Identify who prepares it, what supplies arrive, which utilities it uses, how results or records move, and who returns it to readiness. Then repeat the exercise with a power interruption, delayed delivery or failed component. This reveals dependencies that an equipment-only quotation cannot describe. Give each unresolved dependency an owner and a decision: the site already meets it, a funded change will meet it, or the proposed service needs a different design. A readiness review should produce an installation plan the receiving team can use. It should not leave a list of important tasks that everyone assumes someone else will handle."
    ],
    [
      "Describe the whole electrical requirement",
      "Have the responsible technical team use the exact equipment's installation documents to assess its electrical supply and interruption behavior. Include the complete attached equipment, charging, environmental control and any manufacturer-specified backup requirements. Use the manufacturer's site-planning information for the installation. The Gradian UAM integrates oxygen generation and monitored ventilation, but its subsystems have different power needs. Gradian specifies six-hour backup for the ventilator and vital-sign monitor. The concentrator requires 220–240 V, 50–60 Hz mains power at 500 W; its 9 V battery powers only the mains-failure alarm. Its ability to entrain room air does not preserve oxygen-enriched delivery. Include backup oxygen and the remaining power requirements in the site's funded plan."
    ],
    [
      "Treat oxygen as a facility service",
      "Count the equipment that must use oxygen, where it will operate and what simultaneous demand the planned service creates. The responsible clinical and technical leads must match source capability, delivery arrangements and device requirements. WHO's facility oxygen specifications provide a framework for source, storage and distribution planning; buying a concentrator addresses only part of that system. Airvo 2 is a useful purchasing example. A high-flow generator/humidifier is not an oxygen generator. Its purchase must sit alongside a suitable oxygen arrangement, compatible patient supplies, power continuity and maintenance. A discounted device cannot close a gap in source capacity by itself. Avoid assuming one source is suitable for another device simply because both have a connection for oxygen."
    ],
    [
      "Make water quality and room conditions visible",
      "Different equipment can impose very different water obligations. BioBase BK200 specifies deionized-water use below 5 L/hour, alongside washing and other operating requirements. Dialysis adds a distinct treated-water and monitoring system: CDC guidance addresses chemical and microbiological quality across treatment and distribution. A generic water connection or an unqualified reverse-osmosis label does not establish that either installation meets its requirements. Room temperature can be equally decisive. B Medical's B51 blood refrigerator has a published upper ambient limit of 32°C. A hotter room requires a resolved environmental or equipment-selection decision. The cabinet's cold setting does not change its ambient rating. Its monitoring and response arrangements also need someone able to act when conditions move outside the accepted range."
    ],
    [
      "Include delivery and storage before the first test",
      "Some services fail economically before a patient reaches the machine. epoc cards require 15–30°C storage, while Piccolo discs require 2–8°C. Those conditions matter on the delivery route and in the storeroom as well as in the testing area. Plan shipment quantities and usable expiry around the site's actual ability to receive, store and consume them. Equipment can sometimes change the dependency. Dulas VC88SDD uses solar-direct-drive cooling, making it a candidate where building power is unreliable. It still needs an appropriate site, solar installation, monitoring and continuing care. Choose the architecture that fits the site and then fund the requirements that remain."
    ],
    [
      "Decide who owns readiness after the handover",
      "Name the person who orders supplies, the team that maintains the equipment, the service provider who accepts repairs and the budget paying for each. Confirm that documentation and training remain with the receiving service. Where software is involved, establish usable access and support rather than relying on a visitor's personal laptop or account. Finish with an acceptance and handover plan covering the installed configuration and its dependencies. Some gaps justify a targeted upgrade; others make a smaller service or dependable referral the better first investment. Readiness is achieved when the local team can continue the work after the installation team leaves."
    ]
  ],
  "related": [
    "sterilization"
  ],
  "socialTitle": "The machine is ready. Is your hospital?",
  "socialDescription": "Check power, oxygen, water, room conditions and repairs before shipping equipment. A complete machine can still arrive at an incomplete service.",
  "socialHeadline": "Hospital equipment readiness guide",
  "socialStrapline": "Practical equipment buying guidance.",
  "reviewedAt": "2026-10-16",
  "sheet": {
    "id": "hospital-ready",
    "title": "Hospital equipment readiness guide",
    "summary": "Follow the proposed service through an ordinary day and an interruption. Give every essential utility, supply and maintenance dependency a funded owner before shipment.",
    "firstChoice": "Use the exact installation documents to match equipment with power, oxygen, water, room conditions and storage. Fund the missing enabling infrastructure before adding capacity that cannot operate reliably at the site.",
    "upgradeWhen": "Change equipment architecture when it solves a documented constraint: solar-direct-drive vaccine refrigeration can address building-power dependence, while its site, monitoring and installation requirements still need funding.",
    "budgetWatch": "UAM's ventilator/monitor battery does not power its oxygen concentrator. Airvo is not an oxygen generator. BK200 needs deionized water; dialysis has a separate water-quality system. Include each dependency in the installed cost.",
    "supportCheck": "Carry storage limits through delivery and handover: epoc cards need 15–30°C and Piccolo discs 2–8°C. B51's +32°C upper ambient limit also applies after the installer leaves.",
    "askSupplier": [
      "Which complete utility requirements must our technical team approve?",
      "What stops working during our expected power or supply interruption?",
      "Who owns replenishment, environmental monitoring and repair after handover?"
    ],
    "sourceIds": [
      "uam-infrastructure",
      "uam-manual",
      "oxygen-system",
      "airvo-system",
      "bk200-utilities",
      "dialysis-water",
      "blood-fridge",
      "epoc-storage",
      "piccolo-storage",
      "solar-fridge"
    ]
  },
  "research": {
    "kind": "feature",
    "coverage": [
      "buying decisions"
    ],
    "choices": [],
    "quickCompare": [],
    "id": "hospital-ready",
    "title": "The machine is ready. Is your hospital?",
    "dek": "Power, gases, water, temperature and maintenance can decide a purchase before brand or price. Find the missing dependency before the equipment ships.",
    "verdict": "Buy equipment whose operating requirements the site can sustain. Fund infrastructure that enables the needed service. Delay or change a purchase when essential dependencies remain unowned or unfunded.",
    "decision": {
      "firstMove": "Map utilities, supplies, workflow and repairs through an ordinary day and an interruption.",
      "spendMoreWhen": "A funded infrastructure upgrade makes the required service feasible.",
      "keepExistingWhen": "Improving the surroundings removes the installed equipment's actual constraint.",
      "walkAwayWhen": "Required utilities, room conditions or technical support cannot be sustained."
    },
    "social": {
      "title": "The machine is ready. Is your hospital?",
      "description": "Check power, oxygen, water, room conditions and repairs before shipping equipment. A complete machine can still arrive at an incomplete service.",
      "hook": "A machine can pass its bench test and still be the wrong purchase for the room waiting for it."
    },
    "sections": [
      {
        "heading": "Follow the service through an ordinary day",
        "paragraphs": [
          "Begin where the equipment will work. Identify who prepares it, what supplies arrive, which utilities it uses, how results or records move, and who returns it to readiness. Then repeat the exercise with a power interruption, delayed delivery or failed component. This reveals dependencies that an equipment-only quotation cannot describe.",
          "Give each unresolved dependency an owner and a decision: the site already meets it, a funded change will meet it, or the proposed service needs a different design. A readiness review should produce an installation plan the receiving team can use. It should not leave a list of important tasks that everyone assumes someone else will handle."
        ],
        "sourceIds": []
      },
      {
        "heading": "Describe the whole electrical requirement",
        "paragraphs": [
          "Have the responsible technical team use the exact equipment's installation documents to assess its electrical supply and interruption behavior. Include the complete attached equipment, charging, environmental control and any manufacturer-specified backup requirements. Use the manufacturer's site-planning information for the installation.",
          "The Gradian UAM integrates oxygen generation and monitored ventilation, but its subsystems have different power needs. Gradian specifies six-hour backup for the ventilator and vital-sign monitor. The concentrator requires 220–240 V, 50–60 Hz mains power at 500 W; its 9 V battery powers only the mains-failure alarm. Its ability to entrain room air does not preserve oxygen-enriched delivery. Include backup oxygen and the remaining power requirements in the site's funded plan."
        ],
        "sourceIds": [
          "uam-infrastructure",
          "uam-manual"
        ]
      },
      {
        "heading": "Treat oxygen as a facility service",
        "paragraphs": [
          "Count the equipment that must use oxygen, where it will operate and what simultaneous demand the planned service creates. The responsible clinical and technical leads must match source capability, delivery arrangements and device requirements. WHO's facility oxygen specifications provide a framework for source, storage and distribution planning; buying a concentrator addresses only part of that system.",
          "Airvo 2 is a useful purchasing example. A high-flow generator/humidifier is not an oxygen generator. Its purchase must sit alongside a suitable oxygen arrangement, compatible patient supplies, power continuity and maintenance. A discounted device cannot close a gap in source capacity by itself. Avoid assuming one source is suitable for another device simply because both have a connection for oxygen."
        ],
        "sourceIds": [
          "oxygen-system",
          "airvo-system"
        ]
      },
      {
        "heading": "Make water quality and room conditions visible",
        "paragraphs": [
          "Different equipment can impose very different water obligations. BioBase BK200 specifies deionized-water use below 5 L/hour, alongside washing and other operating requirements. Dialysis adds a distinct treated-water and monitoring system: CDC guidance addresses chemical and microbiological quality across treatment and distribution. A generic water connection or an unqualified reverse-osmosis label does not establish that either installation meets its requirements.",
          "Room temperature can be equally decisive. B Medical's B51 blood refrigerator has a published upper ambient limit of 32°C. A hotter room requires a resolved environmental or equipment-selection decision. The cabinet's cold setting does not change its ambient rating. Its monitoring and response arrangements also need someone able to act when conditions move outside the accepted range."
        ],
        "sourceIds": [
          "bk200-utilities",
          "dialysis-water",
          "blood-fridge"
        ]
      },
      {
        "heading": "Include delivery and storage before the first test",
        "paragraphs": [
          "Some services fail economically before a patient reaches the machine. epoc cards require 15–30°C storage, while Piccolo discs require 2–8°C. Those conditions matter on the delivery route and in the storeroom as well as in the testing area. Plan shipment quantities and usable expiry around the site's actual ability to receive, store and consume them.",
          "Equipment can sometimes change the dependency. Dulas VC88SDD uses solar-direct-drive cooling, making it a candidate where building power is unreliable. It still needs an appropriate site, solar installation, monitoring and continuing care. Choose the architecture that fits the site and then fund the requirements that remain."
        ],
        "sourceIds": [
          "epoc-storage",
          "piccolo-storage",
          "solar-fridge"
        ]
      },
      {
        "heading": "Decide who owns readiness after the handover",
        "paragraphs": [
          "Name the person who orders supplies, the team that maintains the equipment, the service provider who accepts repairs and the budget paying for each. Confirm that documentation and training remain with the receiving service. Where software is involved, establish usable access and support rather than relying on a visitor's personal laptop or account.",
          "Finish with an acceptance and handover plan covering the installed configuration and its dependencies. Some gaps justify a targeted upgrade; others make a smaller service or dependable referral the better first investment. Readiness is achieved when the local team can continue the work after the installation team leaves."
        ],
        "sourceIds": []
      }
    ],
    "checklist": [
      "Confirm exact installation documents and electrical configuration.",
      "Assess interruption behavior across the complete setup.",
      "Match oxygen source and distribution to the planned service.",
      "Specify water quality, treatment and ongoing checks.",
      "Verify room and consumable transport/storage conditions.",
      "Name supplies, maintenance and repair owners with budgets.",
      "Plan acceptance, training, documentation and handover."
    ],
    "ownership": {
      "equation": "Service setup cost = equipment + required utility/environment changes + commissioning/training + continuing utility, supply and maintenance provision.",
      "drivers": [
        "Electrical installation and backup",
        "Oxygen source and distribution",
        "Water treatment and monitoring",
        "Room conditions and cold chain",
        "Technical support and consumable replenishment"
      ]
    },
    "questions": [
      "What would prevent first use?",
      "What changes during an interruption?",
      "Who maintains the supporting infrastructure?"
    ],
    "gaps": [
      "This procurement framework is not an engineering design or clinical protocol.",
      "Exact site and equipment requirements need local assessment."
    ],
    "sources": [
      {
        "id": "uam-infrastructure",
        "title": "Gradian UAM product and package features",
        "url": "https://www.gradianhealth.org/product/uam/",
        "publisher": "Gradian Health",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "Integrated oxygen concentrator and oxygen monitoring; stated six-hour rechargeable backup for the ventilator and vital-sign monitor, and room-air fallback."
      },
      {
        "id": "oxygen-system",
        "title": "Facility-based medical oxygen systems technical specifications",
        "url": "https://www.who.int/publications/i/item/9789240101616",
        "publisher": "World Health Organization",
        "kind": "institutional procurement",
        "accessed": "2026-10-16",
        "evidence": "Facility oxygen-source, storage and distribution specification framework."
      },
      {
        "id": "airvo-system",
        "title": "MSF Airvo 2 procurement entry",
        "url": "https://unicat.msf.org/cat/product/80501",
        "publisher": "Médecins Sans Frontières",
        "kind": "institutional procurement",
        "accessed": "2026-10-16",
        "evidence": "Airvo 2 specifications and separately listed accessories; not a public sales offer."
      },
      {
        "id": "bk200-utilities",
        "title": "BK200 automated chemistry specification",
        "url": "https://www.biobase.com/product/automatic-clinical-blood-chemistry-biochemistry-analyzer",
        "publisher": "BioBase",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "200 tests/hour, cooled reagents, reusable cuvettes, water and room-condition requirements."
      },
      {
        "id": "dialysis-water",
        "title": "Water use in dialysis",
        "url": "https://www.cdc.gov/dialysis-safety/hcp/recommendations-resources/water-use-in-dialysis.html",
        "publisher": "CDC",
        "kind": "regulator",
        "accessed": "2026-10-16",
        "evidence": "Dialysis requires chemical and microbiological water quality assurance and appropriate treatment/distribution equipment."
      },
      {
        "id": "blood-fridge",
        "title": "B51 blood-bank refrigerator specifications",
        "url": "https://www.bmedicalsystems.com/en/product/b51/",
        "publisher": "B Medical Systems",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "45 L net; ambient +10 to +32°C; specified holdover endpoint is +10°C."
      },
      {
        "id": "epoc-storage",
        "title": "epoc system environmental and storage instructions",
        "url": "https://content.doclib.siemens-healthineers.com/rest/v1/view?document-id=1005512",
        "publisher": "Siemens Healthineers",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "Manual specifies 15–30°C card storage; reader conditions and calibration workflow."
      },
      {
        "id": "piccolo-storage",
        "title": "Piccolo Xpress product FAQs",
        "url": "https://www.abaxis.com/faqs/",
        "publisher": "Abbott/Abaxis",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "100 µL panel chemistry, approximately 12 minutes, refrigerated discs and external QC considerations."
      },
      {
        "id": "solar-fridge",
        "title": "VC88SDD vaccine refrigerator and specification",
        "url": "https://dulas.org.uk/life-sciences/vaccine-cold-chain-blood-storage/solar-direct-drive-vaccine-refrigerators/vc88sdd/",
        "publisher": "Dulas",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "88 L net vaccine capacity; solar direct drive; manufacturer gives ambient and autonomy conditions."
      },
      {
        "id": "uam-manual",
        "title": "Universal Anaesthesia Machine User Manual, Revision 0, December 2025",
        "url": "https://www.gradianhealth.org/wp-content/uploads/2024/04/Document-SCXUPT0402-_-Revision-0-_-Dec-2025-2-1.pdf",
        "publisher": "Gradian Health",
        "kind": "manufacturer",
        "accessed": "2026-10-16",
        "evidence": "Printed pp. 9 and 26: room-air fallback; concentrator 220–240 V, 50–60 Hz, 500 W; 9 V battery powers its mains-failure alarm."
      }
    ],
    "related": [
      "anesthesia",
      "oxygen",
      "laboratory",
      "dialysis",
      "refrigeration",
      "point-of-care"
    ]
  },
  "searchTerms": "buying decisions"
};
