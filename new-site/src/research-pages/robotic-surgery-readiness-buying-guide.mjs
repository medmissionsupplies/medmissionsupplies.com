export default {
  "id": "robotic-surgery-readiness-buying-guide",
  "key": "robotic-surgery-readiness",
  "kind": "research-guide",
  "equipmentId": null,
  "categoryId": "surgical",
  "category": "Surgery & anesthesia",
  "related": [
    "sterilization"
  ],
  "sheet": {
    "title": "Before buying a surgical robot, count the instruments ready for the next case",
    "summary": "Robotic capacity depends on instrument availability, permitted uses and complete reprocessing. Test the planned list against those limits before committing to the robot or a higher case target.",
    "firstChoice": "Translate the defined case mix into exact instruments, permitted uses, processing routes and peak ready-set demand.",
    "upgradeWhen": "Additional sets, compatible processing equipment or staff remove a measured constraint in an approved service.",
    "supportCheck": "A program forecast depends on unverified compatibility, reuse beyond instructions or turnaround that the hospital cannot deliver.",
    "askSupplier": [
      "Which exact items cannot use the proposed automated route?",
      "How many complete sets are ready at every planned start time?",
      "What replacement budget follows from permitted life and observed damage?"
    ],
    "budgetWatch": "Compare the full usable configuration and recurring supplies over one common period.",
    "sourceIds": [
      "extended-use",
      "intuitive-guide",
      "racks",
      "ras-manual"
    ]
  },
  "research": {
    "id": "robotic-surgery-readiness",
    "kind": "feature",
    "coverage": [
      "Robotic surgical program readiness",
      "Instrument life and replacement",
      "RAS rack and washer compatibility",
      "Complete turnaround and case capacity"
    ],
    "sources": [
      {
        "id": "racks",
        "title": "STERIS specialty rack compatibility table",
        "url": "https://www.steris.com/healthcare/products/washing-and-decontamination-systems/washer-racks-and-accessories/specialty-washer-racks",
        "publisher": "STERIS",
        "kind": "manufacturer",
        "accessed": "2026-10-18",
        "evidence": "FD256/7052HP and FD257/7053HP mapping and RAS option requirement."
      },
      {
        "id": "ras-manual",
        "title": "RAS12 operator manual10295965 Rev.H, June3,2026",
        "url": "https://ww1.steris.com/onbDocs/V616/1/5133239.pdf",
        "publisher": "STERIS",
        "kind": "manufacturer",
        "accessed": "2026-10-18",
        "evidence": "Specific instrument exclusions, required process components and retained responsibilities; targeted sections read."
      },
      {
        "id": "intuitive-guide",
        "title": "Da Vinci reprocessing resources reference guide, MAT03634v3 (2024)",
        "url": "https://www.intuitive.com/en-us/-/media/ISI/Intuitive/Pdf/Da-Vinci-Reprocessing-Resources-Reference-Guide-SP-X-Xi.pdf",
        "publisher": "Intuitive",
        "kind": "manufacturer",
        "accessed": "2026-10-18",
        "evidence": "Platform-specific documents, owner training and verification responsibilities."
      },
      {
        "id": "extended-use",
        "title": "X/Xi Extended Use Program notice, July2020",
        "url": "https://www.intuitive.com/en-us/about-us/company/instruments-program-notice",
        "publisher": "Intuitive",
        "kind": "manufacturer",
        "accessed": "2026-10-18",
        "evidence": "Selected instrument scope and country/case-mix qualifications; projected savings not adopted."
      }
    ],
    "choices": [],
    "quickCompare": [
      {
        "option": "Use the accepted existing processing route",
        "capability": "Preserves a demonstrated pathway",
        "costDriver": "Staff time, instrument stock and bottleneck capacity",
        "bestFit": "The route supports the proposed list"
      },
      {
        "option": "Add compatible RAS equipment and cycle",
        "capability": "Automates a defined portion for specified instruments",
        "costDriver": "Rack, enabled washer, chemistry and remaining manual tasks",
        "bestFit": "Those eligible items create the measured processing constraint"
      },
      {
        "option": "Add instrument sets",
        "capability": "Increases ready stock while other sets are unavailable",
        "costDriver": "Capital, permitted life and replacement inventory",
        "bestFit": "Turnaround exceeds the interval between case starts"
      },
      {
        "option": "Stage or defer expansion",
        "capability": "Aligns the list with available capacity",
        "costDriver": "Lost planned activity versus premature commitments",
        "bestFit": "Clinical, processing or replacement readiness is incomplete"
      }
    ],
    "checklist": [],
    "questions": [
      "Which exact items cannot use the proposed automated route?",
      "How many complete sets are ready at every planned start time?",
      "What replacement budget follows from permitted life and observed damage?"
    ],
    "gaps": [
      "No comparative clinical-outcome, reliability or universal cost-saving claim.",
      "Exact current instrument IFUs, regional permissions and offered-platform support must be verified before program approval.",
      "No cleaning procedure, sterilization parameters or permission to extend use limits provided."
    ],
    "related": [
      "sterile-processing-workflow",
      "sterilization",
      "hospital-ready",
      "equipment-software-support"
    ],
    "title": "Before buying a surgical robot, count the instruments ready for the next case",
    "dek": "Robotic capacity depends on instrument availability, permitted uses and complete reprocessing. Test the planned list against those limits before committing to the robot or a higher case target.",
    "researchedAt": "2026-10-18",
    "sections": [
      {
        "heading": "A capital proposal needs an instrument plan",
        "paragraphs": [
          "The clinical case for robotic surgery comes first: a defined procedure mix, appropriately trained teams and a reason to deliver those cases locally. Once that is established, test whether the instrument and processing service can support the promised activity. Owning the robot is only one part of that capacity.",
          "Build the purchase around exact instrument and accessory identifiers. Include the endoscope, required energy or stapling components, approved packaging and the replacement stock. A generic “robotic set” hides differences that affect both case availability and recurring spending. The operating-room and sterile-processing teams should agree the list before the budget is approved."
        ],
        "sourceIds": []
      },
      {
        "heading": "Compatibility is a chain of specific components",
        "paragraphs": [
          "STERIS lists RAS 12 Rack FD256 for AMSCO 7052HP and the long FD257 rack for AMSCO 7053HP. The 7052HP needs the RAS cycle option; buying a rack alone does not establish that the washer is ready. The documented application covers selected da Vinci X/Xi and S/Si instruments, so it should not be extrapolated to another platform merely because the instruments look similar.",
          "The June 2026 RAS manual excludes the da Vinci Stapler and Single-Site instruments from that rack process. It specifies the required chemistry and retains operating-room preparation and subsequent terminal processing. These limits can leave several processing routes within one robotic program. Map each item to its own approved route instead of describing the entire service as automated."
        ],
        "sourceIds": [
          "racks",
          "ras-manual"
        ]
      },
      {
        "heading": "Count the whole return journey",
        "paragraphs": [
          "Follow an actual instrument set from the end of a case through transport, required preparation, cleaning, inspection, packaging, sterilization, release and return. Record queues and staff availability as well as machine time. A faster stage adds capacity only if another stage does not absorb the gain.",
          "For a hypothetical list, cases start at 08:00, 10:00 and 12:00, each lasting two hours. If an equivalent set becomes ready four hours after its case ends, the first returns at 14:00. Two sets cannot support the third start at noon: the plan needs a third ready set or a changed schedule. Three sets cover this example’s starts, but provide no allowance for a failed inspection, missing item or unexpected case."
        ],
        "sourceIds": []
      },
      {
        "heading": "Instrument life is a separate inventory constraint",
        "paragraphs": [
          "An instrument can be physically present yet unavailable because it has reached an applicable use or reprocessing limit. Track those limits by the exact instrument instructions and record the remaining permitted life before allocating a set. Intuitive’s Extended Use Program applied to selected X/Xi instruments; its historical announcement is not permission to apply one allowance across every instrument or generation.",
          "For illustration, an instrument costing US$3,600 with an assumed authorized allowance of 18 uses allocates US$200 per use if all are achieved. If damage retires it after nine accepted uses, the acquisition allocation becomes US$400. Neither the price nor the allowance is a product quote here. Use the actual permitted limit and observed retirement history, and never plan to recover value by exceeding it.",
          "Keep replacement cash separate from the allocated cost per case. If several instruments enter service together, their permitted-use counters may reach replacement points together. A program can appear affordable per case yet lack the cash or supplier lead time to replace a complete working group. Phase procurement where clinically and operationally appropriate, and maintain a dated replacement forecast by item rather than one average instrument-life number."
        ],
        "sourceIds": [
          "extended-use"
        ]
      },
      {
        "heading": "Automation still needs people and replacement parts",
        "paragraphs": [
          "Intuitive places responsibility for appropriate reprocessing training, supervision and verification on the system owner. Funding should therefore cover competency development, inspection, traceability and staffing through the required shifts. A washer does not fund the people who prepare the instruments or release the finished load.",
          "Budget rack hoses, connectors and other required components as well as the washer. Include an accepted response to equipment outages and instruments that fail inspection. Test whether extra sets, a different schedule or added processing capacity best solves the measured problem. A vendor’s percentage labour saving is not a local staffing plan."
        ],
        "sourceIds": [
          "intuitive-guide",
          "ras-manual"
        ]
      },
      {
        "heading": "Approve a service the hospital can sustain",
        "paragraphs": [
          "Compare the complete program over one common period: robot acquisition or access charges, service, instruments consumed, single-use supplies, processing, training, IT and contingency cover. Divide by realistic completed cases of the defined mix. Keep the financial comparison separate from claims about clinical benefit, which require appropriate procedure-specific evidence.",
          "A staged program can be sensible when readiness is demonstrated at the initial volume and expansion has a funded path. Defer when the proposed list depends on unavailable sets, unsupported processing or optimistic turnaround. The strongest approval is a workable service plan with explicit capacity and replacement limits."
        ],
        "sourceIds": []
      }
    ],
    "verdict": "Proceed only when the clinically justified program has enough accepted instruments, processing capacity and replacement funding for its planned cases. Add sets or processing capability where the measured constraint lies. A robot purchase or a shorter washer cycle alone does not establish additional usable surgical capacity.",
    "decision": {
      "firstMove": "Translate the defined case mix into exact instruments, permitted uses, processing routes and peak ready-set demand.",
      "spendMoreWhen": "Additional sets, compatible processing equipment or staff remove a measured constraint in an approved service.",
      "keepExistingWhen": "The present platform and processing route support the justified activity with acceptable support and cost.",
      "walkAwayWhen": "A program forecast depends on unverified compatibility, reuse beyond instructions or turnaround that the hospital cannot deliver."
    },
    "ownership": {
      "equation": "Program cost per completed case uses all program costs and completed cases over one period; separately model instrument acquisition divided by actual accepted uses, within its permitted limits.",
      "drivers": [
        "Exact case mix and instrument list",
        "Permitted uses and early retirement",
        "Complete return time",
        "Staffing, compatible processing and service"
      ]
    },
    "social": {
      "title": "Before buying a surgical robot, count the instruments ready for the next case",
      "description": "Robotic capacity depends on instrument availability, permitted uses and complete reprocessing. Test the planned list against those limits before committing to the robot or a higher case target.",
      "hook": "The robot can be ready while the next instrument set is still in processing."
    }
  },
  "title": "Before buying a surgical robot, count the instruments ready for the next case",
  "summary": "Robotic capacity depends on instrument availability, permitted uses and complete reprocessing. Test the planned list against those limits before committing to the robot or a higher case target.",
  "reviewedAt": "2026-10-18",
  "sections": [
    [
      "A capital proposal needs an instrument plan",
      "The clinical case for robotic surgery comes first: a defined procedure mix, appropriately trained teams and a reason to deliver those cases locally. Once that is established, test whether the instrument and processing service can support the promised activity. Owning the robot is only one part of that capacity. Build the purchase around exact instrument and accessory identifiers. Include the endoscope, required energy or stapling components, approved packaging and the replacement stock. A generic “robotic set” hides differences that affect both case availability and recurring spending. The operating-room and sterile-processing teams should agree the list before the budget is approved."
    ],
    [
      "Compatibility is a chain of specific components",
      "STERIS lists RAS 12 Rack FD256 for AMSCO 7052HP and the long FD257 rack for AMSCO 7053HP. The 7052HP needs the RAS cycle option; buying a rack alone does not establish that the washer is ready. The documented application covers selected da Vinci X/Xi and S/Si instruments, so it should not be extrapolated to another platform merely because the instruments look similar. The June 2026 RAS manual excludes the da Vinci Stapler and Single-Site instruments from that rack process. It specifies the required chemistry and retains operating-room preparation and subsequent terminal processing. These limits can leave several processing routes within one robotic program. Map each item to its own approved route instead of describing the entire service as automated."
    ],
    [
      "Count the whole return journey",
      "Follow an actual instrument set from the end of a case through transport, required preparation, cleaning, inspection, packaging, sterilization, release and return. Record queues and staff availability as well as machine time. A faster stage adds capacity only if another stage does not absorb the gain. For a hypothetical list, cases start at 08:00, 10:00 and 12:00, each lasting two hours. If an equivalent set becomes ready four hours after its case ends, the first returns at 14:00. Two sets cannot support the third start at noon: the plan needs a third ready set or a changed schedule. Three sets cover this example’s starts, but provide no allowance for a failed inspection, missing item or unexpected case."
    ],
    [
      "Instrument life is a separate inventory constraint",
      "An instrument can be physically present yet unavailable because it has reached an applicable use or reprocessing limit. Track those limits by the exact instrument instructions and record the remaining permitted life before allocating a set. Intuitive’s Extended Use Program applied to selected X/Xi instruments; its historical announcement is not permission to apply one allowance across every instrument or generation. For illustration, an instrument costing US$3,600 with an assumed authorized allowance of 18 uses allocates US$200 per use if all are achieved. If damage retires it after nine accepted uses, the acquisition allocation becomes US$400. Neither the price nor the allowance is a product quote here. Use the actual permitted limit and observed retirement history, and never plan to recover value by exceeding it. Keep replacement cash separate from the allocated cost per case. If several instruments enter service together, their permitted-use counters may reach replacement points together. A program can appear affordable per case yet lack the cash or supplier lead time to replace a complete working group. Phase procurement where clinically and operationally appropriate, and maintain a dated replacement forecast by item rather than one average instrument-life number."
    ],
    [
      "Automation still needs people and replacement parts",
      "Intuitive places responsibility for appropriate reprocessing training, supervision and verification on the system owner. Funding should therefore cover competency development, inspection, traceability and staffing through the required shifts. A washer does not fund the people who prepare the instruments or release the finished load. Budget rack hoses, connectors and other required components as well as the washer. Include an accepted response to equipment outages and instruments that fail inspection. Test whether extra sets, a different schedule or added processing capacity best solves the measured problem. A vendor’s percentage labour saving is not a local staffing plan."
    ],
    [
      "Approve a service the hospital can sustain",
      "Compare the complete program over one common period: robot acquisition or access charges, service, instruments consumed, single-use supplies, processing, training, IT and contingency cover. Divide by realistic completed cases of the defined mix. Keep the financial comparison separate from claims about clinical benefit, which require appropriate procedure-specific evidence. A staged program can be sensible when readiness is demonstrated at the initial volume and expansion has a funded path. Defer when the proposed list depends on unavailable sets, unsupported processing or optimistic turnaround. The strongest approval is a workable service plan with explicit capacity and replacement limits."
    ]
  ],
  "socialTitle": "Before buying a surgical robot, count the instruments ready for the next case",
  "socialDescription": "Robotic capacity depends on instrument availability, permitted uses and complete reprocessing. Test the planned list against those limits before committing to the robot or a higher case target.",
  "socialHeadline": "Before buying a surgical robot, count the instruments ready for the next case",
  "socialStrapline": "The robot can be ready while the next instrument set is still in processing.",
  "minutes": 3,
  "searchTerms": "Before buying a surgical robot, count the instruments ready for the next case Robotic surgical program readiness Instrument life and replacement RAS rack and washer compatibility Complete turnaround and case capacity",
  "librarySection": "equipment",
  "image": "guides/surgical-robot",
  "photo": {
    "id": "surgical-robot",
    "photographer": "Alvarogarciamd",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "caption": "A da Vinci Xi surgical system, photographed in September 2018. Archive equipment example.",
    "sourcePage": "https://commons.wikimedia.org/wiki/File:New_Da_Vinci_Xi.jpg",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/77/New_Da_Vinci_Xi.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    "captionContext": "A da Vinci Xi surgical system, photographed in September 2018. Archive equipment example. Illustrative photograph; the exact configuration discussed may differ.",
    "alt": "A da Vinci Xi surgical system, photographed in September 2018. Archive equipment example.",
    "fit": "contain",
    "modelMatch": "category",
    "modelMatchNote": "Not evidence of MMS stock, recommended options, current support, performance or endorsement.",
    "verifiedAt": "2026-10-18",
    "changes": "Resized and converted to WebP; photographic content retained. The stated licence remains applicable."
  }
};
