export default {
  "id": "pacs-image-workflow",
  "key": "pacs-image-workflow",
  "kind": "research-guide",
  "equipmentId": null,
  "title": "Buying PACS? Test the outage and the exit",
  "summary": "Choose image storage by what clinicians can retrieve, recover and move elsewhere—not by a successful send alone.",
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
      "Start with yesterday’s study",
      "Before buying a new PACS or archive, ask the existing system to prove a small but demanding journey. Send an appropriately authorized test study, open it for reading, retrieve an earlier examination, recover it after a controlled interruption and export it for another system. Keep the present arrangement if it does those jobs reliably and remains supported. This is a more useful starting point than comparing storage capacity alone. A hospital can have plenty of disk space yet struggle with patient identification, prior studies or referral exports. Spend on the step that fails, whether that means an interface, a viewer, added capacity or a different service."
    ],
    [
      "Separate the handshake from the archive",
      "DICOM C-ECHO verifies application-level communication. It does not prove that an image has been stored, retained or made available to a clinician. DICOM also distinguishes accepting transmitted objects from an explicit Storage Commitment. The latter has implementation-specific retention and retrieval terms documented by the receiving system. Treat a successful connection as the beginning of acceptance. Obtain conformance statements for the actual software versions and licensed services at both ends. Have the integration team identify the required objects and transactions, then test them. A familiar standard name is not a promise that every optional function is present."
    ],
    [
      "Give each handoff an owner",
      "Use a five-column study worksheet: step, responsible system, responsible person, required result and test evidence. Include registration, acquisition, reading, reports, prior studies, retention and export. Use representative studies from each modality rather than only a supplier's demonstration library. Name who investigates when the scanner says 'sent' but the reader cannot find the examination. The scanner supplier, network team and archive provider should not leave the hospital to resolve their boundary. Include interface changes, licences and acceptance work in the integration scope."
    ],
    [
      "Choose local, hosted or hybrid around the interruption",
      "A local installation deserves consideration when the hospital can maintain its hardware, network, backups and recovery. A hosted service may reduce onsite infrastructure responsibilities, but connectivity, recurring charges and access during disruption become central. A hybrid arrangement is useful when defined local access is worth its additional coordination. Specify the actual outage: loss of internet, loss of the local network or failure of an archive component. State which images, prior studies and reports must remain available, to whom and for how long. 'Works offline' may describe only recent cached images. Demonstrate the agreed scenario and the reconciliation when service returns; do not assume that an untested cache meets it."
    ],
    [
      "Purchase retention, recovery and a way out",
      "Have the hospital set retention requirements and locate complete studies, reports and associated objects. Record capacity limits, deletion behavior, backup ownership and restoration responsibilities. A capacity dashboard is not a restoration test. Select a study and verify that the agreed recovery process makes it usable again. Then test leaving. A screenshot is not a complete archive migration. Ask the receiving team to open an example export and verify identity, completeness and required objects. Specify routine referrals and future bulk export separately, including format, assistance, turnaround and charges. Subscription expiry should not leave the hospital discovering its exit requirements for the first time."
    ],
    [
      "Compare one workload over one period",
      "Price local, hosted and hybrid proposals against the same activity and retention assumptions. Include interfaces, viewers, storage growth, connectivity, support, replacement infrastructure, recovery testing and migration. Separate fixed commitments from volume-dependent fees so a low starting subscription does not hide the later workload. The deciding question is which arrangement can deliver the tested study journey within the hospital's operating capacity. Extend a sound existing service when that resolves the gap. Buy a different platform when it demonstrably improves access, recovery or support enough to justify both transition and ongoing cost."
    ]
  ],
  "related": [
    "ultrasound"
  ],
  "socialTitle": "Buying PACS? Test the outage and the exit",
  "socialDescription": "Choose image storage by what clinicians can retrieve, recover and move elsewhere—not by a successful send alone.",
  "socialHeadline": "Buying PACS? Test the outage and the exit",
  "socialStrapline": "A study is useful only when the right person can retrieve it.",
  "reviewedAt": "2026-10-18",
  "sheet": {
    "title": "Buying PACS? Test the outage and the exit",
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
    "researchedAt": "2026-10-18",
    "coverage": [
      "DICOM conformance and acceptance",
      "PACS and archive responsibilities",
      "offline access and recovery",
      "image export and supplier exit"
    ],
    "title": "Buying PACS? Test the outage and the exit",
    "dek": "Choose image storage by what clinicians can retrieve, recover and move elsewhere—not by a successful send alone.",
    "verdict": "Choose the simplest supported arrangement that demonstrates the hospital's complete study journey, including an outage and an exit. Keep a working archive when it passes those tests; expand it only to resolve a documented access, capacity or support gap.",
    "decision": {
      "firstMove": "Map one representative study from patient registration to reading, long-term retrieval and external export.",
      "spendMoreWhen": "A tested local, hosted or hybrid arrangement resolves a material access or recovery requirement.",
      "keepExistingWhen": "The current workflow remains supported and passes retrieval, outage and export checks.",
      "walkAwayWhen": "The proposal leaves retention, restoration, compatibility or data-exit responsibilities undefined."
    },
    "social": {
      "title": "Buying PACS? Test the outage and the exit",
      "description": "Choose image storage by what clinicians can retrieve, recover and move elsewhere—not by a successful send alone.",
      "hook": "A study is useful only when the right person can retrieve it."
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
        "heading": "Start with yesterday’s study",
        "paragraphs": [
          "Before buying a new PACS or archive, ask the existing system to prove a small but demanding journey. Send an appropriately authorized test study, open it for reading, retrieve an earlier examination, recover it after a controlled interruption and export it for another system. Keep the present arrangement if it does those jobs reliably and remains supported.",
          "This is a more useful starting point than comparing storage capacity alone. A hospital can have plenty of disk space yet struggle with patient identification, prior studies or referral exports. Spend on the step that fails, whether that means an interface, a viewer, added capacity or a different service."
        ],
        "sourceIds": []
      },
      {
        "heading": "Separate the handshake from the archive",
        "paragraphs": [
          "DICOM C-ECHO verifies application-level communication. It does not prove that an image has been stored, retained or made available to a clinician. DICOM also distinguishes accepting transmitted objects from an explicit Storage Commitment. The latter has implementation-specific retention and retrieval terms documented by the receiving system.",
          "Treat a successful connection as the beginning of acceptance. Obtain conformance statements for the actual software versions and licensed services at both ends. Have the integration team identify the required objects and transactions, then test them. A familiar standard name is not a promise that every optional function is present."
        ],
        "sourceIds": [
          "dicom-echo",
          "dicom-storage",
          "dicom-conformance"
        ]
      },
      {
        "heading": "Give each handoff an owner",
        "paragraphs": [
          "Use a five-column study worksheet: step, responsible system, responsible person, required result and test evidence. Include registration, acquisition, reading, reports, prior studies, retention and export. Use representative studies from each modality rather than only a supplier's demonstration library.",
          "Name who investigates when the scanner says 'sent' but the reader cannot find the examination. The scanner supplier, network team and archive provider should not leave the hospital to resolve their boundary. Include interface changes, licences and acceptance work in the integration scope."
        ],
        "sourceIds": [
          "ge-dicom"
        ]
      },
      {
        "heading": "Choose local, hosted or hybrid around the interruption",
        "paragraphs": [
          "A local installation deserves consideration when the hospital can maintain its hardware, network, backups and recovery. A hosted service may reduce onsite infrastructure responsibilities, but connectivity, recurring charges and access during disruption become central. A hybrid arrangement is useful when defined local access is worth its additional coordination.",
          "Specify the actual outage: loss of internet, loss of the local network or failure of an archive component. State which images, prior studies and reports must remain available, to whom and for how long. 'Works offline' may describe only recent cached images. Demonstrate the agreed scenario and the reconciliation when service returns; do not assume that an untested cache meets it."
        ],
        "sourceIds": []
      },
      {
        "heading": "Purchase retention, recovery and a way out",
        "paragraphs": [
          "Have the hospital set retention requirements and locate complete studies, reports and associated objects. Record capacity limits, deletion behavior, backup ownership and restoration responsibilities. A capacity dashboard is not a restoration test. Select a study and verify that the agreed recovery process makes it usable again.",
          "Then test leaving. A screenshot is not a complete archive migration. Ask the receiving team to open an example export and verify identity, completeness and required objects. Specify routine referrals and future bulk export separately, including format, assistance, turnaround and charges. Subscription expiry should not leave the hospital discovering its exit requirements for the first time."
        ],
        "sourceIds": [
          "dicom-storage",
          "ge-dicom"
        ]
      },
      {
        "heading": "Compare one workload over one period",
        "paragraphs": [
          "Price local, hosted and hybrid proposals against the same activity and retention assumptions. Include interfaces, viewers, storage growth, connectivity, support, replacement infrastructure, recovery testing and migration. Separate fixed commitments from volume-dependent fees so a low starting subscription does not hide the later workload.",
          "The deciding question is which arrangement can deliver the tested study journey within the hospital's operating capacity. Extend a sound existing service when that resolves the gap. Buy a different platform when it demonstrably improves access, recovery or support enough to justify both transition and ongoing cost."
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
        "accessed": "2026-10-18",
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
      },
      {
        "id": "dicom-echo",
        "title": "DICOM PS3.4: Verification Service Class",
        "url": "https://dicom.nema.org/medical/dicom/current/output/chtml/part04/chapter_A.html",
        "publisher": "DICOM Standards Committee",
        "kind": "primary standard",
        "accessed": "2026-10-18",
        "evidence": "2026d chapter A.1: C-ECHO verifies application-level communication. It does not establish archive retention or retrieval."
      }
    ],
    "related": [
      "ultrasound",
      "xray",
      "ct-mri",
      "dr-retrofit"
    ]
  },
  "searchTerms": "DICOM conformance and acceptance PACS and archive responsibilities offline access and recovery image export and supplier exit Extend the existing PACS and archive Local PACS and archive Hosted image-management service Hybrid arrangement with defined local access",
  "librarySection": "decisions"
};
