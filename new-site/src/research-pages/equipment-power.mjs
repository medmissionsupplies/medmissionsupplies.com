export default {
  "id": "equipment-power",
  "key": "equipment-power",
  "kind": "research-guide",
  "equipmentId": null,
  "title": "A UPS quote is incomplete until you name what must stay on",
  "summary": "Define the failure, the protected equipment and the required outcome before buying power conditioning or backup.",
  "categoryId": "decisions",
  "category": "Procurement & service",
  "image": "guides/anesthesia",
  "photo": {
    "id": "anesthesia",
    "sourcePage": "https://www.pexels.com/photo/equipment-at-hospital-13697732/",
    "imageUrl": "https://images.pexels.com/photos/13697732/pexels-photo-13697732.jpeg",
    "photographer": "Jonathan Borba",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/",
    "caption": "GE Carestation 620 anesthesia workstation in a hospital operating room.",
    "captionContext": "Illustrative equipment photograph: GE Carestation 620 anesthesia workstation in a hospital operating room.",
    "alt": "GE Carestation 620 anesthesia workstation with flow controls, vaporizer, breathing circuit and patient monitor.",
    "fit": "contain",
    "modelMatch": "category",
    "modelMatchNote": "This photograph illustrates the equipment context. It is not evidence of a product, supplier, software configuration or service package recommended in this guide.",
    "verifiedAt": "2026-10-17",
    "changes": "Resized and converted to WebP. Original photographic content retained; display framing may vary. Each image retains its stated license."
  },
  "minutes": 3,
  "sections": [
    [
      "Describe the failure before shopping for the box",
      "Begin with a record of what happens: a console restarts, an examination stops, an alarm appears, or a room loses all power. Record the time, affected devices and any available event logs. Have a qualified engineer investigate the supply and equipment together; a coincidental outage is not a diagnosis. GE separates its voltage-sag correction offering from UPS applications and recommends assessment of the site's power profile. Use that distinction to ask better questions. The proposal should name the event it addresses and the outcome it provides, rather than describe all power problems as one interchangeable need."
    ],
    [
      "Draw the boundary around the protected load",
      "Write down every item that must remain available for the desired outcome. Depending on the project, that may include the equipment console, acquisition hardware, associated computers, network devices or other supporting services. The supplier and facilities engineer must determine the actual requirement; a scanner's marketing name is not a load schedule. Ask for a drawing or schedule that clearly marks what is protected and what is outside the proposal. Have the equipment manufacturer confirm applicable supply requirements and restrictions. A UPS serving only a workstation should not be described in the purchase order as backing up an entire imaging room."
    ],
    [
      "Specify an outcome and the conditions behind it",
      "Choose whether the purpose is uninterrupted operation through a defined event, a bridge to another supply, or enough time for an approved controlled shutdown. GE lists both imaging and PACS applications, but that product-family description does not prove the capability of a particular UPS attached to a particular system. Require the designer to state the protected load, expected operating conditions, runtime basis, battery condition assumptions and behavior when capacity is exhausted. Ask how the proposed arrangement changes as equipment or accessories are added. Do not let an unspecified runtime figure substitute for a documented operating scenario."
    ],
    [
      "Test the handover, including the return to normal",
      "A generator and UPS can each appear satisfactory on their own while the overall sequence remains unproven. Specify who assesses their compatibility, transfer behavior and the equipment's recovery. The project should cover the move to backup supply, operation under the agreed load, and the return to normal power. Agree a controlled acceptance exercise with facilities staff, the equipment service team and relevant clinical representatives. They should define safe test conditions and pass criteria. Record alarms, interruptions, recovery steps and unresolved exceptions. This is a purchasing and verification requirement for qualified professionals, not a set of instructions for modifying electrical systems."
    ],
    [
      "Fund the system after commissioning",
      "WHO's energy-access report treats facility electrification as both a technical and an economic undertaking. Apply that perspective to ongoing support: batteries, inspection, testing, monitoring, spare components and the operating needs of the chosen backup supply must have owners and budgets. Ask who responds to a power-system alarm after hours and who can establish whether a fault belongs to the utility, backup system or medical device. Identify the maintenance arrangements during which protection is reduced. A proposal that funds installation but leaves replacement consumables and service unsupported is an unfinished continuity plan."
    ],
    [
      "Use a one-page power requirement worksheet",
      "Create one row per required outcome. Fill in the affected equipment, measured event, acceptable interruption, protected loads, proposed solution, maintenance owner and acceptance evidence. Obtain the equipment supplier's requirements and the engineer's approved design before comparing prices. Keep uncertain entries visibly unresolved instead of allowing suppliers to make different assumptions. Compare the complete project, including assessment, site work, commissioning and upkeep. Retain an existing installation when evidence confirms it meets the brief. Expand or replace it when the accepted design shows a real gap. The decision is complete when the hospital knows what remains operational, for what conditions, and who maintains that capability."
    ]
  ],
  "related": [
    "anesthesia"
  ],
  "socialTitle": "What exactly does your UPS protect?",
  "socialDescription": "A practical worksheet for equipment power quality, protected loads, UPS runtime, generator transfer and maintenance responsibilities.",
  "socialHeadline": "Power support: specify the protected outcome",
  "socialStrapline": "Practical equipment buying guidance.",
  "reviewedAt": "2026-10-17",
  "sheet": {
    "title": "Power support: specify the protected outcome",
    "summary": "Buy a documented response to the site's actual power events. A UPS label alone does not identify what stays operational or for how long.",
    "firstChoice": "Commission a qualified assessment, obtain exact equipment requirements and list every load needed for the proposed bridge, continued operation or controlled shutdown.",
    "upgradeWhen": "The accepted design identifies an interruption or power-quality problem that the installed arrangement cannot adequately address for the required equipment.",
    "budgetWatch": "Include assessment, electrical design, site work, commissioning, batteries, monitoring, routine service and the operating needs of any backup supply.",
    "supportCheck": "Assign responsibility for equipment compatibility, generator handover, recovery, alarms and maintenance. Witness agreed tests under professionally controlled conditions before acceptance.",
    "askSupplier": [
      "Which exact loads and conditions support your runtime claim?",
      "Who verifies transfer to backup supply and return to normal?",
      "What maintenance and replacement funding preserves the promised capability?"
    ],
    "sourceIds": [
      "ge-ups",
      "ge-sag",
      "who-energy"
    ]
  },
  "research": {
    "kind": "feature",
    "id": "equipment-power",
    "researchedAt": "2026-10-17",
    "coverage": [
      "power-quality assessment",
      "protected-load specification",
      "UPS and generator handover",
      "maintenance and acceptance"
    ],
    "title": "A UPS quote is incomplete until you name what must stay on",
    "dek": "Define the failure, the protected equipment and the required outcome before buying power conditioning or backup.",
    "verdict": "Commission a site-specific assessment and purchase a documented power-support outcome. Match conditioning, UPS capacity and generator handover to the exact equipment and measured site conditions, with qualified engineering design and witnessed acceptance.",
    "decision": {
      "firstMove": "List power events, affected equipment and the required response to each event.",
      "spendMoreWhen": "The engineered proposal protects an essential function or controlled shutdown that the current arrangement cannot demonstrate.",
      "keepExistingWhen": "Assessment and testing confirm the installed system meets the equipment's requirements and remains maintainable.",
      "walkAwayWhen": "Capacity, protected loads, runtime conditions or transfer behavior are assumed from a generic equipment label."
    },
    "social": {
      "title": "What exactly does your UPS protect?",
      "description": "A practical worksheet for equipment power quality, protected loads, UPS runtime, generator transfer and maintenance responsibilities.",
      "hook": "A computer staying on does not prove the scanner can keep working."
    },
    "choices": [
      {
        "model": "Power-quality survey before equipment selection",
        "position": "Starting option",
        "bestFor": "Unexplained trips, interruptions or an unfamiliar site.",
        "why": "GE's sag-corrector guidance specifically recommends assessing the site's power profile before choosing protection.",
        "tradeoff": "Assessment takes time but can reveal that different events need different responses.",
        "price": "Quote measurement, analysis and a written recommendation.",
        "support": "Use qualified facilities engineers with the equipment supplier.",
        "sourceIds": [
          "ge-sag",
          "who-energy"
        ]
      },
      {
        "model": "Targeted voltage-sag correction",
        "position": "Event-specific option",
        "bestFor": "A professionally assessed site dominated by compatible short-duration voltage-sag problems.",
        "why": "GE offers HC-DySC for this class of disturbance.",
        "tradeoff": "Do not treat a sag-correction proposal as long-duration backup.",
        "price": "Price the approved circuit and equipment configuration.",
        "support": "Confirm exact compatibility and the acceptance test.",
        "sourceIds": [
          "ge-sag"
        ]
      },
      {
        "model": "UPS for a defined equipment load",
        "position": "Bridge or shutdown option",
        "bestFor": "A documented requirement to bridge interruption or complete an approved shutdown sequence.",
        "why": "GE describes UPS applications for imaging and PACS, including data preservation and shutdown.",
        "tradeoff": "The proposed protected load and runtime must be established for this site.",
        "price": "Include batteries, monitoring, maintenance and replacement.",
        "support": "Obtain OEM and designer approval for the offered configuration.",
        "sourceIds": [
          "ge-ups"
        ]
      },
      {
        "model": "Engineered backup supply with coordinated transfer",
        "position": "Facility continuity option",
        "bestFor": "A site requiring longer interruption coverage across selected essential services.",
        "why": "WHO frames reliable facility energy as a technical and economic planning task.",
        "tradeoff": "Generation, transfer, fuel or energy storage and downstream equipment must work together.",
        "price": "Compare the complete engineered system and its continuing upkeep.",
        "support": "Assign integrated testing and ongoing operational responsibility.",
        "sourceIds": [
          "who-energy"
        ]
      }
    ],
    "quickCompare": [
      {
        "option": "Survey",
        "capability": "Identify the actual events and affected loads.",
        "costDriver": "Monitoring and engineering analysis.",
        "bestFit": "Unknown cause or incomplete site information."
      },
      {
        "option": "Sag correction",
        "capability": "Address an assessed voltage-disturbance problem.",
        "costDriver": "Compatible protection for selected loads.",
        "bestFit": "A measured problem within the proposed device's scope."
      },
      {
        "option": "UPS",
        "capability": "Provide the specified bridge or shutdown outcome.",
        "costDriver": "Load, runtime, batteries and support.",
        "bestFit": "A defined interruption requirement."
      },
      {
        "option": "Backup supply and transfer",
        "capability": "Support a planned facility continuity strategy.",
        "costDriver": "Generation/storage, transfer and operation.",
        "bestFit": "Longer outages with a funded operating plan."
      }
    ],
    "sections": [
      {
        "heading": "Describe the failure before shopping for the box",
        "paragraphs": [
          "Begin with a record of what happens: a console restarts, an examination stops, an alarm appears, or a room loses all power. Record the time, affected devices and any available event logs. Have a qualified engineer investigate the supply and equipment together; a coincidental outage is not a diagnosis.",
          "GE separates its voltage-sag correction offering from UPS applications and recommends assessment of the site's power profile. Use that distinction to ask better questions. The proposal should name the event it addresses and the outcome it provides, rather than describe all power problems as one interchangeable need."
        ],
        "sourceIds": [
          "ge-sag"
        ]
      },
      {
        "heading": "Draw the boundary around the protected load",
        "paragraphs": [
          "Write down every item that must remain available for the desired outcome. Depending on the project, that may include the equipment console, acquisition hardware, associated computers, network devices or other supporting services. The supplier and facilities engineer must determine the actual requirement; a scanner's marketing name is not a load schedule.",
          "Ask for a drawing or schedule that clearly marks what is protected and what is outside the proposal. Have the equipment manufacturer confirm applicable supply requirements and restrictions. A UPS serving only a workstation should not be described in the purchase order as backing up an entire imaging room."
        ],
        "sourceIds": []
      },
      {
        "heading": "Specify an outcome and the conditions behind it",
        "paragraphs": [
          "Choose whether the purpose is uninterrupted operation through a defined event, a bridge to another supply, or enough time for an approved controlled shutdown. GE lists both imaging and PACS applications, but that product-family description does not prove the capability of a particular UPS attached to a particular system.",
          "Require the designer to state the protected load, expected operating conditions, runtime basis, battery condition assumptions and behavior when capacity is exhausted. Ask how the proposed arrangement changes as equipment or accessories are added. Do not let an unspecified runtime figure substitute for a documented operating scenario."
        ],
        "sourceIds": [
          "ge-ups"
        ]
      },
      {
        "heading": "Test the handover, including the return to normal",
        "paragraphs": [
          "A generator and UPS can each appear satisfactory on their own while the overall sequence remains unproven. Specify who assesses their compatibility, transfer behavior and the equipment's recovery. The project should cover the move to backup supply, operation under the agreed load, and the return to normal power.",
          "Agree a controlled acceptance exercise with facilities staff, the equipment service team and relevant clinical representatives. They should define safe test conditions and pass criteria. Record alarms, interruptions, recovery steps and unresolved exceptions. This is a purchasing and verification requirement for qualified professionals, not a set of instructions for modifying electrical systems."
        ],
        "sourceIds": []
      },
      {
        "heading": "Fund the system after commissioning",
        "paragraphs": [
          "WHO's energy-access report treats facility electrification as both a technical and an economic undertaking. Apply that perspective to ongoing support: batteries, inspection, testing, monitoring, spare components and the operating needs of the chosen backup supply must have owners and budgets.",
          "Ask who responds to a power-system alarm after hours and who can establish whether a fault belongs to the utility, backup system or medical device. Identify the maintenance arrangements during which protection is reduced. A proposal that funds installation but leaves replacement consumables and service unsupported is an unfinished continuity plan."
        ],
        "sourceIds": [
          "who-energy"
        ]
      },
      {
        "heading": "Use a one-page power requirement worksheet",
        "paragraphs": [
          "Create one row per required outcome. Fill in the affected equipment, measured event, acceptable interruption, protected loads, proposed solution, maintenance owner and acceptance evidence. Obtain the equipment supplier's requirements and the engineer's approved design before comparing prices. Keep uncertain entries visibly unresolved instead of allowing suppliers to make different assumptions.",
          "Compare the complete project, including assessment, site work, commissioning and upkeep. Retain an existing installation when evidence confirms it meets the brief. Expand or replace it when the accepted design shows a real gap. The decision is complete when the hospital knows what remains operational, for what conditions, and who maintains that capability."
        ],
        "sourceIds": []
      }
    ],
    "checklist": [
      "Record event logs and commission a qualified power assessment.",
      "Name the exact equipment and every protected supporting load.",
      "Specify bridge, continued operation or controlled shutdown as the required outcome.",
      "Document runtime assumptions and equipment compatibility.",
      "Witness the agreed transfer and recovery tests.",
      "Assign maintenance, alarm response and replacement funding."
    ],
    "ownership": {
      "equation": "Power-support cost = assessment and design + equipment and site work + acceptance + routine operation and maintenance + component replacement.",
      "drivers": [
        "Protected load and required outcome",
        "Site electrical work",
        "Battery and other component replacement",
        "Monitoring and service",
        "Integrated transfer testing"
      ]
    },
    "questions": [
      "Which loads and operating conditions support the quoted runtime?",
      "Who verifies compatibility with this equipment and the site's backup supply?",
      "What happens during maintenance, transfer and return to normal power?"
    ],
    "gaps": [
      "No universal UPS size, runtime, electrical threshold or generator-transfer limit is assumed.",
      "The guide does not establish suitability for any individual medical device or site."
    ],
    "sources": [
      {
        "id": "ge-ups",
        "title": "UPS: Uninterruptible Power Supplies",
        "url": "https://www.gehealthcare.com/en/products/clinical-accessories/ups-uninterruptible-power-supplies",
        "publisher": "GE HealthCare",
        "kind": "manufacturer",
        "accessed": "2026-10-17",
        "evidence": "Describes imaging and PACS applications including power management, data saving and appropriate shutdown; exact configuration requires engineering confirmation."
      },
      {
        "id": "ge-sag",
        "title": "Dynamic Sag Corrector",
        "url": "https://www.gehealthcare.com/en/products/clinical-accessories/dynamic-sag-corrector",
        "publisher": "GE HealthCare",
        "kind": "manufacturer",
        "accessed": "2026-10-17",
        "evidence": "Distinguishes voltage-sag correction from UPS applications and recommends assessment of the site's power profile."
      },
      {
        "id": "who-energy",
        "title": "Energizing health: accelerating electricity access in health-care facilities",
        "url": "https://www.who.int/publications/i/item/9789240066960",
        "publisher": "WHO, World Bank, IRENA and SEforALL",
        "kind": "institutional report",
        "published": "2023-01-14",
        "accessed": "2026-10-17",
        "evidence": "Addresses characterization of facility energy needs and technical, economic, funding and implementation considerations."
      }
    ],
    "related": [
      "ct-mri",
      "mri-site-readiness",
      "equipment-shipping"
    ]
  },
  "searchTerms": "power-quality assessment protected-load specification UPS and generator handover maintenance and acceptance Power-quality survey before equipment selection Targeted voltage-sag correction UPS for a defined equipment load Engineered backup supply with coordinated transfer"
};
