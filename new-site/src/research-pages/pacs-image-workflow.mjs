export default {
  "id": "pacs-image-workflow",
  "key": "pacs-image-workflow",
  "kind": "research-guide",
  "equipmentId": null,
  "title": "Your scanner sends images. Can your team still find them tomorrow?",
  "summary": "Buy an image workflow that covers identity, reading, retention, outages and eventual export—not just a successful DICOM connection.",
  "categoryId": "imaging",
  "category": "Imaging & radiology",
  "image": "guides/ultrasound",
  "photo": {
    "id": "ultrasound",
    "sourcePage": "https://commons.wikimedia.org/wiki/File:3rd_Medical_Battalion_Mass_Casualty_Training_(9634378).jpg",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/3rd_Medical_Battalion_Mass_Casualty_Training_%289634378%29.jpg",
    "photographer": "U.S. Marine Corps photo by Cpl. Jonathan Rodriguez Pastrana",
    "license": "Public domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "caption": "A SonoSite M-Turbo during medical training in Okinawa, Japan, April 2026. Equipment example.",
    "captionContext": "Illustrative equipment photograph: A SonoSite M-Turbo during medical training in Okinawa, Japan, April 2026. Equipment example.",
    "alt": "A SonoSite M-Turbo portable ultrasound with its screen and controls visible during a medical training exercise.",
    "fit": "cover",
    "modelMatch": "category",
    "verifiedAt": "2026-10-17",
    "changes": "Resized and converted to WebP. Original photographic content retained; display framing may vary. Each image retains its stated license.",
    "modelMatchNote": "This photograph illustrates the equipment context. It is not evidence of a product, supplier, software configuration or service package recommended in this guide."
  },
  "minutes": 3,
  "sections": [
    [
      "Follow one study all the way through",
      "Start with the people who need the images and the moments when they need them. A technologist sends a study, a reader opens it, a clinician compares it with an earlier examination, and another hospital requests a copy. Those are separate transactions. A demonstration that stops after transmission does not prove the rest. Draw a worksheet with five columns: step, responsible system, responsible person, required result and test evidence. Include patient identification, reading access, reports, prior studies and export. Use representative studies from each proposed modality, with appropriately authorized test data, rather than judging the purchase from a vendor's demonstration library."
    ],
    [
      "Match the actual software and services",
      "DICOM conformance statements describe supported information objects and services. The standard's conformance section does not itself prescribe validation procedures or require every optional feature for every device. The purchasing implication is practical: obtain statements for the actual software versions at both ends, then have the integration team assess and test the required workflow. GE publishes conformance information for network services, media exchange and information objects. Ask the scanner seller and PACS provider to identify the relevant documents and licensed options. Record who fixes a mismatch, who pays for an interface change, and whether that work is included before acceptance."
    ],
    [
      "Separate receiving an image from keeping it",
      "DICOM distinguishes Storage from Storage Commitment. Accepting a transmission does not, by itself, establish an explicit safekeeping obligation. Storage Commitment describes an implementation-specific commitment, including the period and retrieval capabilities documented by the receiving system. It is therefore important to ask what the purchased archive actually promises. Have the hospital set its retention requirements and identify where complete studies, reports and relevant associated objects reside. Ask the provider to describe capacity limits, backup arrangements, restoration responsibilities and deletion behavior. A storage dashboard showing spare capacity is different evidence from a successful restoration of a selected study after a simulated failure."
    ],
    [
      "Make offline access a specific requirement",
      "“Works offline” can mean several things: the scanner continues acquiring, a workstation displays recently cached studies, or the department retrieves its full local archive. Specify which people must do which tasks during an internet or internal-network interruption. Include the duration the hospital needs to accommodate without inventing a universal target. Ask for a controlled demonstration of that scenario. Record which images, prior studies and reports remain available, what cannot be done, and how information is reconciled when connectivity returns. Clinical and IT teams should approve the operating procedure. An untested cache setting should not become the hospital's entire continuity plan."
    ],
    [
      "Buy the right to leave with usable data",
      "Request an example export before signing. Have the receiving team open it in the intended destination and verify study identity, completeness and the objects it needs. A screenshot or a printable image may serve one purpose while failing the hospital's archive-transfer requirement. Specify both routine referral exports and a future bulk migration. Put the export format, assistance, turnaround, charges and responsibilities into the agreement. Ask what happens when a subscription ends or a supplier is replaced. For hosted services, obtain an explanation of how the hospital receives its information and how the agreed retention and deletion instructions are handled."
    ],
    [
      "Compare costs against the same tested journey",
      "Use the same planning period for local, hosted and hybrid proposals. Include interfaces, viewers, storage growth, connectivity, support, replacement infrastructure, backup verification and migration. Separate committed charges from volume-dependent ones. Ask suppliers to price the hospital's own activity assumptions rather than adopting an attractive but irrelevant sample workload. Finish the worksheet with a named acceptance owner for every step. The least expensive useful proposal is the one that delivers the agreed journey within the hospital's operating capacity. A familiar existing system deserves consideration when it passes; a new platform earns its premium by resolving a demonstrated problem."
    ]
  ],
  "related": [
    "ultrasound"
  ],
  "socialTitle": "A successful image send is only the beginning",
  "socialDescription": "Use a study-journey worksheet to compare PACS, archives, offline access and export before buying imaging equipment.",
  "socialHeadline": "Image access: follow the whole study",
  "socialStrapline": "Practical equipment buying guidance.",
  "reviewedAt": "2026-10-17",
  "sheet": {
    "title": "Image access: follow the whole study",
    "summary": "A successful send does not establish a complete archive service. Compare the journey from registration to reading, retention, recovery and eventual export.",
    "firstChoice": "Test the existing supported workflow first. Map each step to its responsible system, person and acceptance evidence before buying additional software or storage.",
    "upgradeWhen": "A demonstrated access, capacity, integration or recovery gap requires a different local, hosted or hybrid arrangement that the team can maintain.",
    "budgetWatch": "Include interfaces, viewers, storage growth, connectivity, support, backup verification, infrastructure replacement and a future bulk export. Compare identical workload assumptions.",
    "supportCheck": "Match conformance statements to actual versions. Demonstrate current and prior study access during the agreed outage, then verify restoration and reconciliation.",
    "askSupplier": [
      "Which exact versions and licensed services will you test together?",
      "What remains accessible during an internet or local-network interruption?",
      "How do we receive a complete usable export when the agreement ends?"
    ],
    "sourceIds": [
      "dicom-conformance",
      "dicom-storage",
      "ge-dicom"
    ]
  },
  "research": {
    "kind": "feature",
    "id": "pacs-image-workflow",
    "researchedAt": "2026-10-17",
    "coverage": [
      "DICOM conformance and acceptance",
      "PACS and archive responsibilities",
      "offline access and recovery",
      "image export and supplier exit"
    ],
    "title": "Your scanner sends images. Can your team still find them tomorrow?",
    "dek": "Buy an image workflow that covers identity, reading, retention, outages and eventual export—not just a successful DICOM connection.",
    "verdict": "Choose the simplest supported arrangement that demonstrates the hospital's complete study journey, including an outage and an exit. Keep a working archive when it passes those tests; expand it only to resolve a documented access, capacity or support gap.",
    "decision": {
      "firstMove": "Map one representative study from patient registration to reading, long-term retrieval and external export.",
      "spendMoreWhen": "A tested local, hosted or hybrid arrangement resolves a material access or recovery requirement.",
      "keepExistingWhen": "The current workflow remains supported and passes retrieval, outage and export checks.",
      "walkAwayWhen": "The proposal leaves retention, restoration, compatibility or data-exit responsibilities undefined."
    },
    "social": {
      "title": "A successful image send is only the beginning",
      "description": "Use a study-journey worksheet to compare PACS, archives, offline access and export before buying imaging equipment.",
      "hook": "Ask to retrieve yesterday's study during an internet outage."
    },
    "choices": [
      {
        "model": "Extend the existing PACS and archive",
        "position": "First comparison",
        "bestFor": "A hospital with a supported workflow and a specific new modality.",
        "why": "Matching conformance statements and a witnessed transfer can establish the proposed integration's scope.",
        "tradeoff": "Additional licenses, capacity or interfaces may be needed.",
        "price": "Quote the complete added modality and storage obligation.",
        "support": "Name who resolves scanner-to-archive failures.",
        "sourceIds": [
          "dicom-conformance",
          "ge-dicom"
        ]
      },
      {
        "model": "Local PACS and archive",
        "position": "Local access option",
        "bestFor": "A facility that can fund and maintain onsite infrastructure.",
        "why": "An onsite design can be evaluated against the hospital's defined connectivity-outage requirement.",
        "tradeoff": "Hardware, backups, recovery and skilled support remain explicit responsibilities.",
        "price": "Include server replacement, support and restore testing.",
        "support": "Demonstrate failure recovery and access controls.",
        "sourceIds": [
          "dicom-storage"
        ]
      },
      {
        "model": "Hosted image-management service",
        "position": "Service-based option",
        "bestFor": "A facility with suitable connectivity and a defined service agreement.",
        "why": "Purchasing storage and retrieval as a service can be compared against explicit retention and access requirements.",
        "tradeoff": "Connectivity, recurring fees and bulk export need examination.",
        "price": "Quote storage growth, retrieval, interfaces and exit charges.",
        "support": "Define service availability and the process during loss of internet.",
        "sourceIds": [
          "dicom-storage"
        ]
      },
      {
        "model": "Hybrid arrangement with defined local access",
        "position": "Continuity option",
        "bestFor": "Sites needing selected studies locally while using a remote archive.",
        "why": "A buyer can specify which studies remain accessible and how reconciliation works after interruption.",
        "tradeoff": "Two locations create additional support and synchronization obligations.",
        "price": "Include local capacity, hosted fees and end-to-end testing.",
        "support": "Test exactly which images and reports are available offline.",
        "sourceIds": [
          "dicom-conformance",
          "dicom-storage"
        ]
      }
    ],
    "quickCompare": [
      {
        "option": "Extend current system",
        "capability": "Add a verified modality workflow.",
        "costDriver": "Interfaces, licenses and capacity.",
        "bestFit": "Existing service passes continuity and export tests."
      },
      {
        "option": "Local",
        "capability": "Defined onsite reading and storage.",
        "costDriver": "Infrastructure, staff and recovery.",
        "bestFit": "Maintainable local operating environment."
      },
      {
        "option": "Hosted",
        "capability": "Contracted remote image services.",
        "costDriver": "Recurring storage, connectivity and exit.",
        "bestFit": "Connectivity and outage provisions meet requirements."
      },
      {
        "option": "Hybrid",
        "capability": "Local access plus remote services.",
        "costDriver": "Duplicate capacity and coordination.",
        "bestFit": "A demonstrated offline-access need."
      }
    ],
    "sections": [
      {
        "heading": "Follow one study all the way through",
        "paragraphs": [
          "Start with the people who need the images and the moments when they need them. A technologist sends a study, a reader opens it, a clinician compares it with an earlier examination, and another hospital requests a copy. Those are separate transactions. A demonstration that stops after transmission does not prove the rest.",
          "Draw a worksheet with five columns: step, responsible system, responsible person, required result and test evidence. Include patient identification, reading access, reports, prior studies and export. Use representative studies from each proposed modality, with appropriately authorized test data, rather than judging the purchase from a vendor's demonstration library."
        ],
        "sourceIds": []
      },
      {
        "heading": "Match the actual software and services",
        "paragraphs": [
          "DICOM conformance statements describe supported information objects and services. The standard's conformance section does not itself prescribe validation procedures or require every optional feature for every device. The purchasing implication is practical: obtain statements for the actual software versions at both ends, then have the integration team assess and test the required workflow.",
          "GE publishes conformance information for network services, media exchange and information objects. Ask the scanner seller and PACS provider to identify the relevant documents and licensed options. Record who fixes a mismatch, who pays for an interface change, and whether that work is included before acceptance."
        ],
        "sourceIds": [
          "dicom-conformance",
          "ge-dicom"
        ]
      },
      {
        "heading": "Separate receiving an image from keeping it",
        "paragraphs": [
          "DICOM distinguishes Storage from Storage Commitment. Accepting a transmission does not, by itself, establish an explicit safekeeping obligation. Storage Commitment describes an implementation-specific commitment, including the period and retrieval capabilities documented by the receiving system. It is therefore important to ask what the purchased archive actually promises.",
          "Have the hospital set its retention requirements and identify where complete studies, reports and relevant associated objects reside. Ask the provider to describe capacity limits, backup arrangements, restoration responsibilities and deletion behavior. A storage dashboard showing spare capacity is different evidence from a successful restoration of a selected study after a simulated failure."
        ],
        "sourceIds": [
          "dicom-storage"
        ]
      },
      {
        "heading": "Make offline access a specific requirement",
        "paragraphs": [
          "“Works offline” can mean several things: the scanner continues acquiring, a workstation displays recently cached studies, or the department retrieves its full local archive. Specify which people must do which tasks during an internet or internal-network interruption. Include the duration the hospital needs to accommodate without inventing a universal target.",
          "Ask for a controlled demonstration of that scenario. Record which images, prior studies and reports remain available, what cannot be done, and how information is reconciled when connectivity returns. Clinical and IT teams should approve the operating procedure. An untested cache setting should not become the hospital's entire continuity plan."
        ],
        "sourceIds": []
      },
      {
        "heading": "Buy the right to leave with usable data",
        "paragraphs": [
          "Request an example export before signing. Have the receiving team open it in the intended destination and verify study identity, completeness and the objects it needs. A screenshot or a printable image may serve one purpose while failing the hospital's archive-transfer requirement. Specify both routine referral exports and a future bulk migration.",
          "Put the export format, assistance, turnaround, charges and responsibilities into the agreement. Ask what happens when a subscription ends or a supplier is replaced. For hosted services, obtain an explanation of how the hospital receives its information and how the agreed retention and deletion instructions are handled."
        ],
        "sourceIds": [
          "ge-dicom"
        ]
      },
      {
        "heading": "Compare costs against the same tested journey",
        "paragraphs": [
          "Use the same planning period for local, hosted and hybrid proposals. Include interfaces, viewers, storage growth, connectivity, support, replacement infrastructure, backup verification and migration. Separate committed charges from volume-dependent ones. Ask suppliers to price the hospital's own activity assumptions rather than adopting an attractive but irrelevant sample workload.",
          "Finish the worksheet with a named acceptance owner for every step. The least expensive useful proposal is the one that delivers the agreed journey within the hospital's operating capacity. A familiar existing system deserves consideration when it passes; a new platform earns its premium by resolving a demonstrated problem."
        ],
        "sourceIds": []
      }
    ],
    "checklist": [
      "List each modality and exact software version beside its conformance statement.",
      "Record who can access current and prior images during each outage scenario.",
      "State retention, retrieval, backup and restore responsibilities separately.",
      "Witness a routine export and a representative restoration.",
      "Price growth, interfaces, support and eventual bulk migration."
    ],
    "ownership": {
      "equation": "Comparable image-workflow cost = integration + viewing and archive services + storage growth + connectivity and recovery + support + eventual migration.",
      "drivers": [
        "Modality and viewer licenses",
        "Storage and backup growth",
        "Internet and local infrastructure",
        "Restore and interoperability testing",
        "Bulk export and migration"
      ]
    },
    "questions": [
      "Can both suppliers demonstrate the complete study journey using the offered versions?",
      "What remains usable during each relevant outage?",
      "What does a complete export cost, and who verifies it?"
    ],
    "gaps": [
      "No product-specific interoperability is established without matching statements and testing.",
      "No universal retention period, service availability or storage-price assumption is used."
    ],
    "sources": [
      {
        "id": "dicom-conformance",
        "title": "DICOM PS3.2: Scope and Field of Application",
        "url": "https://dicom.nema.org/medical/dicom/current/output/chtml/part02/chapter_1.html",
        "publisher": "DICOM Standards Committee",
        "kind": "primary standard",
        "accessed": "2026-10-17",
        "evidence": "Current 2026d text explains conformance statements and the limits of conformance and validation scope."
      },
      {
        "id": "dicom-storage",
        "title": "DICOM PS3.4: Storage Commitment Service Class",
        "url": "https://dicom.nema.org/medical/dicom/current/output/chtml/part04/chapter_J.html",
        "publisher": "DICOM Standards Committee",
        "kind": "primary standard",
        "accessed": "2026-10-17",
        "evidence": "Distinguishes acceptance of transmitted objects from explicit storage commitment and documented retention/retrieval capabilities."
      },
      {
        "id": "ge-dicom",
        "title": "Interoperability: DICOM conformance statements",
        "url": "https://www.gehealthcare.com/en-us/products/interoperability/dicom-conformance-statements",
        "publisher": "GE HealthCare",
        "kind": "manufacturer",
        "accessed": "2026-10-17",
        "evidence": "Explains the network-service, media-exchange and information-object capabilities covered by manufacturer conformance statements."
      }
    ],
    "related": [
      "ultrasound",
      "xray",
      "ct-mri",
      "dr-retrofit"
    ]
  },
  "searchTerms": "DICOM conformance and acceptance PACS and archive responsibilities offline access and recovery image export and supplier exit Extend the existing PACS and archive Local PACS and archive Hosted image-management service Hybrid arrangement with defined local access"
};
