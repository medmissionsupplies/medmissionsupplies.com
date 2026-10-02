// Purchasing considerations are editorial synthesis; sources are linked per item.
// Reference images illustrate equipment families, not current stock or endorsements.
const item = (
  id,
  title,
  image,
  listing,
  summary,
  options,
  checks,
  cost,
  sources,
) => ({ id, title, image, listing, summary, options, checks, cost, sources });
const guide = (
  id,
  title,
  category,
  department,
  image,
  summary,
  intro,
  entries,
  checklist,
) => ({
  id,
  title,
  category,
  department,
  image,
  summary,
  intro,
  entries,
  checklist,
  kind: "buying-guide",
  reviewed: "2026-10-02",
  sections: [],
  related: [...new Set(entries.map((entry) => entry.listing))],
  minutes: Math.ceil(JSON.stringify(entries).split(/\s+/).length / 210),
});

export const buyingGuides = [
  guide(
    "imaging-equipment-buying-guide",
    "Buying imaging equipment",
    "Imaging & radiology",
    "imaging",
    "ct-mri",
    "Ultrasound, digital X-ray, C-arms, CT, and MRI: compare the complete system.",
    "Start with the examinations your team needs, then compare image quality, the room, and the support package. A low equipment price can change quickly when a detector, probe, software license, or installation is missing.",
    [
      item(
        "ultrasound",
        "Ultrasound systems",
        "reference/ultrasound-portable",
        "ultrasound",
        "Choose the probes and clinical applications before choosing the machine. A portable system with the right transducers can be more useful than a larger system with an incomplete package.",
        [
          [
            "Handheld",
            "Useful when portability is the priority. Compare the supported examinations, phone compatibility, charging, and software plan.",
          ],
          [
            "Laptop or cart",
            "Compare the display, controls, probe ports, required Doppler functions, and workflow with your clinical team.",
          ],
        ],
        [
          "List each required transducer, its exact part number, compatible software, and replacement price. A connector that fits does not establish compatibility.",
          "Ask for images from the offered unit and a documented probe inspection. Review the cable, lens, connector, and image uniformity with a qualified technician.",
          "Check battery condition, image export, DICOM options, and approved cleaning products. For a handheld, verify account transfer and ongoing membership terms.",
        ],
        "Price the machine, every probe, software, cart, battery replacement, and reprocessing supplies together. Compare three-year ownership cost using the same examination requirements.",
        ["probes", "probeCare", "handheld"],
      ),
      item(
        "xray",
        "Digital X-ray systems",
        "reference/digital-xray",
        "xray",
        "A digital X-ray system is a generator, detector, workstation, software, and installation package. Confirm what the quote actually includes.",
        [
          [
            "Mobile",
            "Consider transport routes, unit weight, battery servicing, and the place where images will be acquired.",
          ],
          [
            "Fixed room",
            "Consider room layout, positioning equipment, detector storage, and the workflow from exposure to image review.",
          ],
        ],
        [
          "Match the detector size and generator specification to the examinations your radiology team has approved. Ask whether a grid, stand, table, or detector holder is included.",
          "Request detector condition and calibration records, battery and charger details, and replacement coverage. Ask specifically how accidental damage is handled.",
          "Have the installation team review electrical supply, shielding, delivery access, networking, and local acceptance requirements before freight is booked.",
        ],
        "Separate detector and tube coverage from the general warranty. Include PACS connections, software rights, image storage, installation, and training in the written scope.",
        ["imagingSite", "refurbished"],
      ),
      item(
        "c-arm",
        "Full-size and mini C-arms",
        "reference/c-arm",
        "xray",
        "Choose around the anatomy, procedures, and room. A mini C-arm and a full-size system are different purchasing decisions; neither is a universal substitute for the other.",
        [
          [
            "Image intensifier",
            "Often encountered on older systems. Request an image-quality demonstration and a realistic support plan for that generation.",
          ],
          [
            "Flat-panel detector",
            "Compare usable field of view, positioning clearance, image functions, and detector replacement terms.",
          ],
        ],
        [
          "Arrange a demonstration with the intended table and representative positioning. Confirm clearance, movement, brakes, and access around the patient area.",
          "Identify the licensed imaging options, software version, image export, footswitch, and accessories in the offered configuration.",
          "Request documented image-quality and equipment checks, service history, and a plan for specialist installation and local acceptance.",
        ],
        "Compare the supported procedure package and warranty exclusions, not just the model year. Include detector or image-intensifier repairs, tube support, freight, and engineer travel.",
        ["carm"],
      ),
      item(
        "ct-mri",
        "CT and MRI projects",
        "ct-mri",
        "ct-mri",
        "Treat CT or MRI as a facility project. Site readiness and an enforceable service arrangement can matter as much as the scanner purchase price.",
        [
          [
            "CT",
            "Ask for the exact scanner configuration, reconstruction options, tube history, and explicit tube coverage.",
          ],
          [
            "MRI",
            "Review field strength, included coils, software, magnet-specific cooling requirements, and the engineered room plan.",
          ],
        ],
        [
          "Require a site assessment covering delivery access, floor loading, power, cooling, shielding, networking, and any magnet-specific infrastructure.",
          "Obtain serial numbers, service records, transferable software rights, and a complete accessory list. Request a specialist review of the offered system.",
          "Assign responsibility for deinstallation, rigging, freight, reinstallation, commissioning, acceptance, and training. Establish who supports the site after handover.",
        ],
        "Compare the complete installed project and ongoing service cost. Manufacturer refurbishment programs illustrate how coverage can be bundled; their terms do not automatically apply to an independent seller’s unit.",
        ["imagingSite", "refurbished"],
      ),
    ],
    [
      "Required examinations and expected workload",
      "Exact probes, detectors, coils, software, and accessories",
      "Site assessment and written installation scope",
      "Unit-specific records and written service terms",
    ],
  ),

  guide(
    "surgical-equipment-buying-guide",
    "Buying operating room equipment",
    "Surgery & anesthesia",
    "surgical",
    "anesthesia",
    "Anesthesia, tables, endoscopy, electrosurgery, microscopes, and airway equipment.",
    "Build an operating room around the team’s procedures and the facility’s infrastructure. Compare compatible systems, reusable accessories, and the ongoing supply and reprocessing work behind each purchase.",
    [
      item(
        "anesthesia",
        "Anesthesia workstations",
        "reference/anesthesia-workstation",
        "anesthesia",
        "Start with the anesthesia team’s specification and your facility’s gas and power supplies. The machine, monitoring, vaporizers, and breathing system need to be assessed as one package.",
        [
          [
            "Established cart platform",
            "Compare the exact configuration, remaining support, documentation, and access to trained service personnel.",
          ],
          [
            "Compact or transportable",
            "Assess the intended setting, transport protection, gas requirements, and compromises in the included equipment.",
          ],
        ],
        [
          "Confirm gas types, inlet pressure requirements, connectors, scavenging, electrical supply, and specified backup arrangements against the exact model’s instructions.",
          "Itemize vaporizers, gas monitoring, breathing components, absorber, hoses, sensors, and compatible accessories; do not assume they are included in a photograph.",
          "Request documented functional and safety testing, maintenance history, and acceptance by the receiving anesthesia and biomedical teams.",
        ],
        "Include gas infrastructure, consumables, replacement sensors, maintenance, and training. A low cart price is not a comparison until both offers include the same functional configuration.",
        ["anesthesia"],
      ),
      item(
        "surgical-tables",
        "Surgical tables and lights",
        "operating-room",
        "surgical-tables",
        "Match the table to the positions and imaging access your procedures require. Match lighting to the room and mounting structure, not simply to a brightness claim.",
        [
          [
            "General-purpose table",
            "Check positioning range, height, imaging access, and the accessories for your regular procedures.",
          ],
          [
            "Specialty or imaging table",
            "Verify the intended configuration and any positioning limits with the manufacturer’s documentation.",
          ],
        ],
        [
          "Confirm safe working load in the intended configuration, including accessories. A maximum-load headline may not apply in every position.",
          "Itemize mattresses, clamps, rails, armboards, leg supports, controllers, batteries, and charging equipment. Check brakes and all powered movements.",
          "For lights, ask for an installation survey covering mounting, ceiling height, electrical work, handle reprocessing, and spare parts.",
        ],
        "Price the installed table-and-accessory package. Include compatible positioning attachments and any structural work for ceiling-mounted lighting.",
        ["tables", "lights"],
      ),
      item(
        "endoscopy",
        "Endoscopy systems",
        "reference/endoscopy-system",
        "endoscopy",
        "The processor is only part of the purchase. Scope compatibility, documented condition, and a workable reprocessing pathway determine whether the system can support your service.",
        [
          [
            "Existing platform expansion",
            "Match the exact scope model, processor, light source, connectors, and software to your current system.",
          ],
          [
            "Complete replacement",
            "Compare the full scope mix and the reprocessing capacity needed for your planned workload.",
          ],
        ],
        [
          "Obtain a written compatibility list. Ask for scope serial numbers, repair history, inspection results, leak-test records, and representative image quality.",
          "Budget for the complete reprocessing workflow: trained staff, cleaning accessories, compatible chemicals, water requirements, drying, storage, and documentation.",
          "If an automated reprocessor is proposed, confirm validation for the exact scope and required connectors. Automation does not justify skipping manufacturer-specified cleaning.",
        ],
        "Compare cost per usable procedure, including scope repairs, spare scopes, consumables, and reprocessing. Check current manufacturer notices before selecting an older platform.",
        ["endoscopy", "reprocessing", "aer"],
      ),
      item(
        "electrosurgery",
        "Electrosurgical generators",
        "reference/electrosurgery",
        "electrosurgery",
        "Buy the energy functions your procedures require. A basic office cautery device, a general electrosurgical generator, and a vessel-sealing platform are different packages.",
        [
          [
            "General electrosurgery",
            "Confirm the required monopolar and bipolar capabilities and compatible instruments.",
          ],
          [
            "Advanced energy",
            "Confirm the specific instrument family, software, and consumables needed for any additional functions.",
          ],
        ],
        [
          "List every handpiece, footswitch, return-electrode system, cable, and instrument by compatible part number.",
          "Have a qualified biomedical service provider document output and safety checks for the offered generator; a power-on demonstration alone is insufficient evidence of condition.",
          "Review reprocessing or single-use requirements and the availability of consumables with the receiving team.",
        ],
        "Compare generator cost with the price and availability of compatible instruments. Proprietary disposables can change the total cost of a seemingly inexpensive platform.",
        ["energy"],
      ),
      item(
        "surgical-microscopes",
        "Surgical microscopes",
        "reference/surgical-microscope",
        "surgical-microscopes",
        "Choose the optics and ergonomics around the specialty. A microscope should be demonstrated with the intended working distance, positioning, and accessories.",
        [
          [
            "Established optical system",
            "Assess optical condition, mechanical movement, illumination, and the availability of documented service.",
          ],
          [
            "Imaging or teaching package",
            "Check whether camera adapters, recording, assistant viewing, and display components are actually included.",
          ],
        ],
        [
          "Confirm objectives, eyepieces, magnification, working distance, and illumination requirements with the surgeon; use the exact model’s specification.",
          "Inspect the optics, focus and zoom movement, stand, brakes, counterbalance, controls, and included power supplies through a qualified service review.",
          "Check compatible sterile covers, spare illumination components, packing requirements, and availability of repairs at the destination.",
        ],
        "Include adapters, camera or teaching equipment, service, and protective freight packaging. Avoid paying for features that cannot be maintained or used by the receiving team.",
        ["microscope"],
      ),
      item(
        "airway",
        "Video laryngoscopes and airway scopes",
        "reference/airway",
        "airway",
        "Choose the device with the clinicians who will use it. Blade type, patient-size range, monitor compatibility, and cleaning requirements are purchasing essentials.",
        [
          [
            "Reusable components",
            "Assess the validated cleaning process, inspection requirements, and repair route.",
          ],
          [
            "Single-use blades or scopes",
            "Assess repeat supply, storage, shelf life, and the cost of each use.",
          ],
        ],
        [
          "Verify the complete monitor, cable, blade or scope combination against a manufacturer compatibility chart; similar-looking connectors are not enough.",
          "List the sizes required by the team and include the right chargers, batteries, protective cases, and compatible accessories.",
          "Confirm that the facility can follow the full reprocessing instructions for reusable parts. Choose equipment intended for the clinical application, not a general-purpose inspection camera.",
        ],
        "Compare the reusable system plus processing and repair costs with a disposable platform’s ongoing supply costs. Include backup equipment in the clinical team’s plan.",
        ["airway", "reprocessing"],
      ),
    ],
    [
      "Procedure list and approved equipment specification",
      "Gas, power, room, and mounting requirements",
      "Complete accessory and consumable list",
      "Documented testing and receiving-team acceptance",
    ],
  ),

  guide(
    "critical-care-buying-guide",
    "Buying critical care equipment",
    "Critical & patient care",
    "critical-care",
    "ekg",
    "Ventilation, oxygen, monitoring, defibrillation, infusion, suction, and neonatal care.",
    "Match each device to the intended patient group and care setting. Look closely at batteries, optional modules, compatible consumables, alarm functionality, and the people who will maintain the equipment.",
    [
      item(
        "ventilators",
        "Ventilators and respiratory support",
        "reference/icu-ventilator",
        "ventilators",
        "Begin with the clinical team’s required modes and patient population. A transport ventilator, ICU ventilator, noninvasive device, and sleep-therapy device should not be treated as interchangeable.",
        [
          [
            "ICU platform",
            "Compare the approved patient groups, required monitoring, humidification, gas supply, and support.",
          ],
          [
            "Transport platform",
            "Compare actual carried weight, mounting, battery capacity, gas consumption, and permitted use conditions.",
          ],
        ],
        [
          "Verify whether neonatal capabilities, noninvasive ventilation, CO₂ monitoring, and other requested functions are included, optional, or unavailable on the exact unit.",
          "Confirm whether the system requires compressed air or uses a turbine, and separately establish its oxygen requirements. A turbine does not generate oxygen.",
          "Request documented testing, battery assessment, alarm checks, service history, and the compatible circuit, sensor, and filter list.",
        ],
        "Include batteries, sensors, circuits, humidification, gas supply, staff training, and planned maintenance. Ask for a written parts-support horizon and check model-specific notices before purchase.",
        ["ventilation", "recalls"],
      ),
      item(
        "oxygen",
        "Oxygen concentrators and supply",
        "reference/oxygen",
        "oxygen",
        "Plan oxygen as a supply system. Flow, delivered concentration, pressure, environmental conditions, and continuity of supply need to match the intended devices and setting.",
        [
          [
            "Bedside concentrator",
            "Assess the rated output, permitted environment, power needs, alarms, and service requirements.",
          ],
          [
            "Facility oxygen project",
            "Have qualified specialists size distribution and reserve capacity around the facility’s planned workload.",
          ],
        ],
        [
          "Request concentration and flow verification for the offered unit under its specified conditions; confirm altitude, temperature, and humidity limits.",
          "Check outlet pressure and compatibility with any connected device. Do not assume a concentrator can power every ventilator or anesthesia workstation.",
          "Include filters, maintenance tools, oxygen-quality checks, replacement parts, and a qualified plan for backup supply and power outages.",
        ],
        "Compare the delivered system, electrical demand, maintenance, and supply continuity. Avoid judging value only by the maximum flow number on the front panel.",
        ["oxygen"],
      ),
      item(
        "high-flow",
        "High-flow and noninvasive systems",
        "reference/high-flow",
        "oxygen",
        "Humidified high-flow systems and noninvasive ventilators support different clinical workflows. Let the clinical team define the therapy, then price the complete approved configuration.",
        [
          [
            "Humidified high-flow",
            "Check the flow generator, humidifier, oxygen connection, heated tubing, and compatible interfaces.",
          ],
          [
            "Noninvasive ventilation",
            "Check the required modes, interface compatibility, circuit type, monitoring, and permitted care setting.",
          ],
        ],
        [
          "Confirm oxygen demand and source compatibility at the planned configuration; total gas flow and oxygen-source flow are not the same specification.",
          "Identify approved patient circuits, chambers, interfaces, water supplies, and cleaning equipment, including recurring local availability.",
          "Ask for model-specific manuals, service records, training, and the receiving team’s backup arrangements.",
        ],
        "Include the cost of complete patient kits and their replacement intervals from the manufacturer’s instructions. A bare unit can be inexpensive while its ongoing supplies are difficult to source.",
        ["highFlow"],
      ),
      item(
        "ekg",
        "Patient monitors",
        "reference/patient-monitor",
        "ekg",
        "Compare the parameters actually enabled on the offered unit. A screen shown with many values is not proof that the required modules, sensors, or licenses are included.",
        [
          [
            "Basic bedside monitoring",
            "Specify the measurements and patient-size accessories your ward needs.",
          ],
          [
            "Critical care or transport",
            "Specify additional measurements, battery needs, central-station connections, and movement between departments.",
          ],
        ],
        [
          "Require a list of enabled parameters, installed modules, compatible sensors, cuffs, cables, and adapters for each unit.",
          "Demonstrate the offered configuration, including alarms and battery operation, through the receiving biomedical team’s acceptance process.",
          "Verify central-station, network, and software compatibility before buying a group of monitors. Include mounting and charging accessories.",
        ],
        "Compare a complete working monitor package. Replacement sensors, proprietary cables, optional modules, and central software can be a substantial part of ownership cost.",
        ["monitoring"],
      ),
      item(
        "ecg",
        "Diagnostic ECG systems",
        "reference/ecg",
        "ekg",
        "A diagnostic ECG system is a different purchase from a bedside rhythm monitor. Specify the recording, reporting, and clinical-review workflow your team requires.",
        [
          [
            "Standalone recorder",
            "Check included leads, printing, battery operation, report export, and paper supply.",
          ],
          [
            "Computer-based ECG",
            "Check supported operating systems, software licenses, interfaces, and compatibility with your IT environment.",
          ],
        ],
        [
          "Confirm diagnostic lead acquisition, the complete patient cable, electrodes, and the required reporting functions with the clinical team.",
          "For used computer-based systems, establish software-transfer rights, supported computers, and whether optional connectivity needs an additional license.",
          "Request a representative report and a demonstration of saving, reviewing, exporting, and backing up recordings without patient-identifying sample data.",
        ],
        "Price the recorder or interface plus computer, software, accessories, printer, and ongoing support. An inexpensive hardware interface is incomplete without usable software.",
        ["ecg"],
      ),
      item(
        "defibrillation",
        "Defibrillators and AEDs",
        "reference/defibrillator",
        "ekg",
        "Choose the required functions with the resuscitation team. An AED and a manual monitor-defibrillator differ in training, configuration, and accessories.",
        [
          [
            "AED",
            "Consider the intended users, adult and pediatric accessories, readiness checks, and replacement supplies.",
          ],
          [
            "Monitor-defibrillator",
            "Confirm required monitoring, manual functions, pacing or other options, and compatible accessories on the exact unit.",
          ],
        ],
        [
          "Ask for documented functional testing by qualified service personnel, battery-condition evidence, and the exact model and software version.",
          "Check compatible batteries, chargers, pads, cables, and expiry dates. Confirm which accessories are reusable and which are single-use from their instructions.",
          "Verify service availability, manufacturer notices, and any outstanding corrective actions for the serial number before accepting an older unit.",
        ],
        "Include replacement pads, batteries, testing, training, and scheduled service. Do not base an emergency-equipment decision on the cheapest untested unit.",
        ["defibrillation", "recalls"],
      ),
      item(
        "infusion",
        "Infusion and syringe pumps",
        "reference/infusion",
        "infusion",
        "Start with compatible tubing and syringes, not the pump price. Standardizing a manageable set of supported devices can make supplies, training, and maintenance easier.",
        [
          [
            "Volumetric pump",
            "Confirm the exact administration-set family and intended infusion applications.",
          ],
          [
            "Syringe pump",
            "Confirm supported syringe models and sizes, required delivery range, and the intended patient population.",
          ],
        ],
        [
          "Obtain the manufacturer’s approved set or syringe list. Do not rely on a seller’s general claim that a pump accepts any tubing.",
          "Request documented delivery-performance and alarm checks, battery testing, maintenance history, and software or drug-library configuration.",
          "Calculate realistic ongoing set consumption and confirm local supply, lead times, shelf life, and an alternative procurement route.",
        ],
        "Compare pump, dock, battery, testing, software support, and recurring sets over the same period. A donated platform can be costly if its dedicated supplies are scarce.",
        ["pumpSets", "infusion"],
      ),
      item(
        "suction",
        "Portable and ward suction",
        "reference/suction",
        "suction",
        "Select around the intended procedure and operating pattern. Portable battery suction and a mains-powered unit may have different capabilities and duty-cycle limits.",
        [
          [
            "Portable",
            "Check measured battery performance, charging options, transport case, and permitted operating cycle.",
          ],
          [
            "Ward or procedure unit",
            "Check collection capacity, operating pattern, accessories, cleaning, and servicing.",
          ],
        ],
        [
          "Confirm specified vacuum range, flow performance, and duty cycle against the clinical team’s requirements; do not infer continuous operation from the unit’s size.",
          "Identify the correct canisters, lids, filters, tubing, overflow protection, and accessories, including their reuse or replacement instructions.",
          "Ask for functional testing, battery assessment where applicable, and a practical replacement-parts list.",
        ],
        "Include replacement filters and collection systems. Verify whether the exact variant includes a battery; similar product names can cover mains-only and battery versions.",
        ["suction"],
      ),
      item(
        "neonatal",
        "Maternal and neonatal equipment",
        "neonatal",
        "neonatal",
        "Have the maternity and neonatal teams define the needed functions. An incubator, radiant warmer, phototherapy unit, and fetal monitor solve different equipment needs.",
        [
          [
            "Incubator or warmer",
            "Compare access, thermal-control features, humidity requirements where relevant, and the complete sensor package.",
          ],
          [
            "Phototherapy or maternal monitoring",
            "Request a separate specification and suitable performance verification for each device type.",
          ],
        ],
        [
          "Itemize temperature probes, mattresses, scales, humidification components, mounts, and any optional features included with the offered unit.",
          "For incubators, request documented checks of temperature control, alarms, access panels, seals, and humidity functions where fitted.",
          "Ask the receiving team to define acceptance and cleaning requirements. For phototherapy, request output verification appropriate to the exact model, not just confirmation that its lights turn on.",
        ],
        "Include model-specific sensors, cleaning supplies, service, and replacement parts. Avoid mixing accessories from different generations without documented compatibility.",
        ["neonatal"],
      ),
    ],
    [
      "Patient groups and functions approved by the clinical team",
      "Enabled options and exact compatible consumables",
      "Battery, alarm, and functional-test records",
      "Ongoing supplies, training, maintenance, and backup plan",
    ],
  ),
  guide(
    "diagnostic-equipment-buying-guide",
    "Buying laboratory and diagnostic equipment",
    "Laboratory & diagnostics",
    "diagnostics",
    "laboratory",
    "Analyzers, point-of-care testing, microscopy, and ophthalmic diagnostics.",
    "Buy a sustainable testing workflow. Test volume, consumable supply, quality control, staff capability, and the service environment should drive the shortlist before a model or headline throughput does.",
    [
      item(
        "laboratory",
        "Chemistry and hematology analyzers",
        "reference/chemistry",
        "laboratory",
        "These are different analyzer families. Start with the test menu and realistic daily volume, then compare the staffing, reagent, and maintenance requirements of each proposed system.",
        [
          [
            "Lower-volume laboratory",
            "Compare smaller batch sizes, reagent-pack sizes, startup routines, and the cost of unused reagent.",
          ],
          [
            "Higher-volume laboratory",
            "Compare actual workflow capacity, specimen handling, downtime cover, and service response.",
          ],
        ],
        [
          "Ask for a complete test menu and distinguish measured throughput from headline capacity. Confirm any optional modules and accessories.",
          "Obtain reagent, calibrator, control, cleaner, and consumable lists with storage requirements, shelf life, minimum orders, and local supply arrangements.",
          "Have the laboratory team review water quality, room conditions, utilities, waste, quality-control work, training, and performance verification before acceptance.",
        ],
        "Compare cost per reportable result, including quality control, calibration, repeats, reagent waste, service, and staff time. Open-reagent claims still require method validation and local laboratory approval.",
        ["laboratory", "chemistry"],
      ),
      item(
        "point-of-care",
        "Cartridge and point-of-care analyzers",
        "reference/point-of-care",
        "point-of-care",
        "A compact analyzer can simplify the hardware while shifting cost and logistics into the cartridges. Assess the complete testing program, not just the handheld device.",
        [
          [
            "Cartridge system",
            "Compare the required test panels, sample types, storage, expiry, and ongoing cartridge supply.",
          ],
          [
            "Central laboratory alternative",
            "Compare total cost and turnaround with the existing laboratory at your actual testing volume.",
          ],
        ],
        [
          "Verify that the exact cartridge and analyzer combination supports the tests and specimen types your team needs.",
          "Check refrigerated and room-temperature storage limits for each cartridge. Do not apply one cartridge’s shelf-life rules to the entire range.",
          "Include quality-control materials, operator training, connectivity, maintenance, and the process for reviewing results in the purchase plan.",
        ],
        "Calculate cost per usable panel after expiry, quality-control use, and repeats. Request remaining shelf life at delivery and a dependable replenishment route.",
        ["pointOfCare"],
      ),
      item(
        "small-analyzers",
        "Hemoglobin, glucose, and urine testing",
        "reference/hemoglobin",
        "point-of-care",
        "Small instruments still need a reliable supply chain. The recurring cuvettes, strips, controls, and sampling supplies should be selected alongside the device.",
        [
          [
            "Single-purpose reader",
            "Check approved tests, specimen types, consumable handling, and the intended clinical setting.",
          ],
          [
            "Multi-test workflow",
            "Consider how samples, results, quality control, and stock will be managed across several devices.",
          ],
        ],
        [
          "Request the correct consumable part numbers and current instructions for storage, humidity, opened-container life, and expiry.",
          "Have the laboratory or clinical team confirm suitability for the intended population and specimen. Similar-looking strips or cuvettes are not interchangeable.",
          "Include control materials, sampling supplies, cleaning, batteries or power supplies, and an acceptance demonstration using the approved process.",
        ],
        "Compare complete testing costs and the smallest practical pack size. Individual packaging may reduce wastage where workload is low or environmental control is difficult.",
        ["hemoglobin", "laboratory"],
      ),
      item(
        "microscopy",
        "Microscopes and centrifuges",
        "reference/lab-microscope",
        "laboratory",
        "Choose the microscope around the techniques your laboratory performs. Choose a centrifuge around the tubes, rotor, relative centrifugal force, and temperature requirements of the workflow.",
        [
          [
            "Microscope",
            "Compare objectives, illumination, mechanical stage, viewing comfort, and any required camera or teaching adapter.",
          ],
          [
            "Centrifuge",
            "Compare compatible rotors, tube capacity, adapters, required RCF, and refrigeration where needed.",
          ],
        ],
        [
          "For microscopes, ask for an optical-condition inspection and a demonstration using the laboratory’s representative material and trained staff.",
          "For centrifuges, identify the exact rotor and adapters. RPM alone does not establish equivalent separation performance between different rotors.",
          "Request rotor condition and service records, lid and safety-interlock checks, and the manufacturer’s applicable service-life limits.",
        ],
        "Include rotors, buckets, adapters, replacement illumination, and service. A low-priced centrifuge without the correct rotor can become the more expensive purchase.",
        ["centrifuge"],
      ),
      item(
        "histology",
        "Histology and specimen preparation",
        "reference/lab-microscope",
        "laboratory",
        "A microtome alone does not create a histology service. Plan specimen preparation, processing, embedding, sectioning, staining, and review with the laboratory lead.",
        [
          [
            "Individual replacement",
            "Match the existing workflow, consumables, and service capability.",
          ],
          [
            "New service",
            "Map the full equipment chain, staff competence, ventilation, reagent storage, and quality processes before ordering.",
          ],
        ],
        [
          "Confirm the required specimen types, processing volumes, sectioning needs, and compatible blades, holders, cassettes, and molds.",
          "Request mechanical and functional assessment of used equipment and a demonstration appropriate to the laboratory’s work.",
          "Include reagent handling, ventilation and waste planning, preventive maintenance, and training in the project budget.",
        ],
        "Price the complete workflow and its recurring reagents and consumables. Assign responsibility for installation and performance verification before the laboratory accepts the system.",
        ["histology"],
      ),
      item(
        "ophthalmology",
        "Retinal cameras, slit lamps, and tonometers",
        "reference/retinal-camera",
        "ophthalmology",
        "Choose these as complementary instruments around your eye-care service. Imaging, examination, and pressure measurement have different requirements and consumables.",
        [
          [
            "Retinal camera",
            "Compare handheld and desktop workflows, image capture, software, connectivity, and the team’s intended use.",
          ],
          [
            "Slit lamp and tonometer",
            "Compare optics and illumination, working position, calibration requirements, and compatible contact components.",
          ],
        ],
        [
          "For retinal imaging, verify camera, computer, software licenses, export formats, and support. An older camera body may need additional capture hardware.",
          "For a slit lamp, check the optics, movement, illumination, table or mount, and any specified accessories with the eye-care team.",
          "For tonometry, confirm probe or tip compatibility and the manufacturer’s cleaning or single-use requirements. Include recurring supplies in every comparison.",
        ],
        "Ask for a complete, demonstrated package. Consider replacement probes, software, camera adapters, service, and transport protection alongside the equipment price.",
        ["retinal", "tonometry", "slitLamp"],
      ),
    ],
    [
      "Test menu, patient population, and realistic daily volume",
      "Reagents, controls, calibrators, and shelf life",
      "Room conditions, utilities, and local replenishment",
      "Training, verification, and ongoing laboratory oversight",
    ],
  ),

  guide(
    "hospital-essentials-buying-guide",
    "Buying hospital essentials",
    "Hospital essentials",
    "hospital",
    "operating-room",
    "Sterilization, beds, refrigeration, dialysis, and the infrastructure behind them.",
    "Some of the most expensive purchasing mistakes happen outside the headline equipment. Check processing capacity, compatible furniture, cold-chain monitoring, utilities, and specialist support early in the project.",
    [
      item(
        "sterilization",
        "Autoclaves and sterile processing",
        "reference/autoclave",
        "sterilization",
        "Choose a sterilizer around the instruments, packaging, load sizes, and turnaround your facility requires. Manual versus digital controls alone do not determine suitability.",
        [
          [
            "Tabletop sterilizer",
            "Compare chamber dimensions, permitted load types, cycle documentation, drying, and utility requirements.",
          ],
          [
            "Department-scale system",
            "Plan clean/dirty workflow, installation services, water and drainage, capacity, and validation with the processing team.",
          ],
        ],
        [
          "Confirm that the proposed cycles are appropriate for the actual instruments and their instructions. Identify included trays, racks, and load accessories.",
          "Check the exact water-quality, electrical, ventilation, and maintenance requirements. Do not assume that tap water or a shared socket is suitable.",
          "Request service records, a sound chamber and door assessment, installation qualification as applicable, and a facility-approved monitoring and release process.",
        ],
        "Include instrument cleaning, packaging, indicators, maintenance, water preparation, documentation, and trained operators. Purchase around a validated workflow, not an unqualified promise that a unit sterilizes everything.",
        ["sterilizer", "sterilizerCare"],
      ),
      item(
        "beds",
        "Hospital beds and patient transport",
        "beds",
        "beds",
        "Buy the bed frame, mattress, rails, and accessories as a compatible system. Dimensions, handling, and maintainability are as important as powered movement.",
        [
          [
            "Manual or basic powered bed",
            "Compare staff workflow, height adjustment, transfer needs, local repair capability, and power availability.",
          ],
          [
            "Specialty bed or stretcher",
            "Specify patient support, transport routes, braking, accessories, and the clinical functions required.",
          ],
        ],
        [
          "Confirm safe working load, mattress dimensions, rail compatibility, overall width, and clearance through doors, lifts, and corridors.",
          "Ask the receiving team to assess the complete bed and mattress combination for entrapment risks; substituting a mattress can change the system.",
          "Inspect brakes, wheels, rails, controls, cables, motors, batteries where fitted, and surfaces that must be cleaned.",
        ],
        "Include a suitable mattress, accessories, packing, freight volume, assembly, and replacement parts. Ask whether a low quote is for the frame only.",
        ["beds"],
      ),
      item(
        "refrigeration",
        "Medical refrigeration and cold chain",
        "refrigeration",
        "refrigeration",
        "Specify what will be stored before selecting the refrigerator. Vaccines, reagents, and blood products have different storage and oversight requirements.",
        [
          [
            "Purpose-built refrigerator",
            "Compare the documented storage application, usable capacity, recovery performance, alarms, and monitoring.",
          ],
          [
            "Remote-site installation",
            "Assess power quality, backup supply, ambient conditions, and the response plan for an equipment failure.",
          ],
        ],
        [
          "Confirm the required storage range with the product instructions and responsible clinical or laboratory team. Volume alone is not an adequate specification.",
          "Include continuous temperature monitoring, alarm response, probe placement, calibration arrangements, and record access in the purchase plan.",
          "Check installation clearance, service access, power interruption behavior, transport protection, and destination support.",
        ],
        "Budget for monitoring, backup arrangements, maintenance, and the cost of a stock-loss event. Use guidance appropriate to the stored product; vaccine guidance is not a specification for blood storage.",
        ["coldChain"],
      ),
      item(
        "dialysis",
        "Dialysis equipment and water systems",
        "dialysis",
        "dialysis",
        "A dialysis machine needs a supporting service, water system, supplies, trained staff, and ongoing quality assurance. Buying the machine is only one part of establishing the service.",
        [
          [
            "Replacement machine",
            "Match the existing treatment infrastructure, consumable ecosystem, maintenance capability, and clinical specification.",
          ],
          [
            "New dialysis service",
            "Scope water treatment and distribution, utilities, infection prevention, staffing, and monitoring as a coordinated project.",
          ],
        ],
        [
          "Require specialist review of water treatment, distribution, testing, disinfection, and monitoring appropriate to the facility and applicable standards.",
          "Confirm compatible consumables, concentrate supply, service documentation, spare parts, and the exact offered configuration.",
          "Assign commissioning and ongoing performance checks to qualified clinical and technical personnel, with clear responsibility for the whole installation.",
        ],
        "Compare installed and recurring costs, including water-system upkeep, testing, consumables, training, and service response. Avoid a machine-only quote for a new facility project.",
        ["dialysis"],
      ),
    ],
    [
      "Complete installed package, not only the main unit",
      "Water, power, space, and workflow requirements",
      "Compatible accessories and recurring supplies",
      "Responsible installation, acceptance, and maintenance teams",
    ],
  ),

  guide(
    "mission-clinic-equipment-guide",
    "Equipping a mission clinic",
    "Mission planning",
    null,
    "reference/instruments",
    "A practical equipment checklist for smaller clinics and mobile teams.",
    "Build the kit around the services your clinicians are equipped to provide. The useful purchase is a complete, maintainable setup with consumables, training, and a referral pathway—not the longest possible equipment list.",
    [
      item(
        "clinical-essentials",
        "Examination and vital-sign equipment",
        "reference/otoscope",
        "clinical-essentials",
        "Start with dependable examination tools and appropriately sized accessories. Standardize charging and consumables where practical, while keeping each device’s intended use clear.",
        [
          [
            "Core examination kit",
            "Consider a stethoscope, otoscope, examination light, thermometer, blood-pressure equipment, and measuring tools.",
          ],
          [
            "Connected instruments",
            "Check software, phone or computer compatibility, charging, offline use, data protection, and support.",
          ],
        ],
        [
          "Itemize handles, chargers, specula, cuffs, probe covers, batteries, carrying cases, and replacement illumination where needed.",
          "Match blood-pressure cuffs and other patient-contact accessories to the intended population. Ask the team to evaluate usability and cleaning before standardizing.",
          "For pulse oximeters, assess intended medical use, probe suitability, and known accuracy limitations. Do not assume every inexpensive consumer device is suitable for clinical purchasing.",
        ],
        "Compare a complete kit with repeat consumable and battery costs. Keep a stock list with compatible part numbers and realistic reorder points.",
        ["exam", "oximetry"],
      ),
      item(
        "portable-testing",
        "Small-clinic testing",
        "reference/glucometer",
        "point-of-care",
        "Choose tests that the team can collect, run, quality-control, interpret, and act on. A device that cannot be resupplied will quickly become unused equipment.",
        [
          [
            "Glucose, hemoglobin, or urine tests",
            "Confirm specimen requirements, consumables, quality-control materials, and approved intended use.",
          ],
          [
            "More complex testing",
            "Compare cartridge platforms with referral to an established laboratory, including cost and turnaround.",
          ],
        ],
        [
          "Plan consumable quantities around workload and expiry rather than buying a large stock simply because it is cheaper per pack.",
          "Confirm transport and storage requirements, including opened-container limits and the environmental conditions at the clinic.",
          "Include operator training, quality-control responsibilities, recording, and an appropriate result-review process.",
        ],
        "Request small-pack and replenishment pricing. Include waste, repeats, controls, and transport in cost-per-test comparisons.",
        ["hemoglobin", "laboratory", "pointOfCare"],
      ),
      item(
        "spirometry",
        "Spirometry and hearing assessment",
        "reference/spirometry",
        "clinical-essentials",
        "Portable equipment still depends on technique and environment. Decide whether the service is screening or diagnostic and have trained staff approve the specification.",
        [
          [
            "Spirometer",
            "Compare flow-sensor type, compatible mouthpieces and filters, software, reporting, and quality-assurance requirements.",
          ],
          [
            "Audiometer",
            "Compare screening versus diagnostic capability, matched transducers, calibration support, and room-noise requirements.",
          ],
        ],
        [
          "Request the instrument, cables, software rights, chargers, consumables, and current manufacturer documentation as one package.",
          "For spirometry, check sensor cleaning or disposal instructions and the manufacturer’s verification and calibration requirements.",
          "For audiometry, confirm that headphones and other transducers belong to the calibrated system and that the planned environment is appropriate.",
        ],
        "Include consumables, calibration services, software support, training, and transport protection. Portability does not eliminate the need for a suitable testing space.",
        ["spirometry", "audiometry"],
      ),
      item(
        "portable-eye-care",
        "Portable eye-care equipment",
        "reference/slit-lamp",
        "ophthalmology",
        "Plan the eye-care pathway with the clinicians: examination, pressure measurement, imaging where needed, documentation, and referral. Portability is useful only if the required examination remains practical.",
        [
          [
            "Portable slit lamp",
            "Assess optics, illumination, working position, power, and durability in the intended setting.",
          ],
          [
            "Tonometer or retinal camera",
            "Assess compatible consumables, software, image transfer, and access to clinical review.",
          ],
        ],
        [
          "Ask for a demonstration with the receiving team before choosing a model around weight or price alone.",
          "Budget for the exact probes, tips, batteries, chargers, and cleaning supplies the chosen device requires.",
          "Include protective cases and a service route. Confirm data export and software support for any connected camera.",
        ],
        "Compare the full examination package and ongoing supplies. Preserve manufacturer single-use requirements when budgeting contact accessories.",
        ["slitLamp", "tonometry", "retinal"],
      ),
      item(
        "procedure-kits",
        "Procedure instruments and emergency readiness",
        "reference/instruments",
        "clinical-essentials",
        "Equipment should follow the services and procedures the facility can safely support. Ask the clinical lead to define complete sets, backup needs, and the supporting cleaning and storage workflow.",
        [
          [
            "Reusable instrument sets",
            "Match instruments, trays, packaging, inspection, and compatible processing capacity.",
          ],
          [
            "Single-use supplies",
            "Plan quantity, expiry, storage, waste handling, and dependable replenishment.",
          ],
        ],
        [
          "Use a signed-off inventory for each intended service. Include compatible accessories rather than assuming a kit is complete from its product name.",
          "Establish validated reprocessing for reusable devices and follow their instructions; a general cleaning step is not equivalent to disinfection or sterilization.",
          "Review suction, airway equipment, oxygen, monitoring, and emergency equipment as a coordinated clinical plan with appropriately trained staff.",
        ],
        "Budget for cleaning and packaging supplies, replacement instruments, consumables, and staff training. Ask for a complete itemized quote.",
        ["reprocessing", "donations"],
      ),
      item(
        "mission-planning",
        "Donations, power, logistics, and records",
        "reference/blood-pressure",
        "clinical-essentials",
        "A useful donation meets a recipient’s documented need and arrives with a viable ownership plan. The same test applies to a bargain purchase.",
        [
          [
            "Permanent facility",
            "Plan standardization, utilities, maintenance responsibility, inventory, service records, and ongoing supply.",
          ],
          [
            "Mobile team",
            "Plan packing, charging, safe transport, consumable quantities, offline access, and handover to local partners.",
          ],
        ],
        [
          "Agree the recipient’s required specification before sourcing. Confirm manuals, accessories, condition, service, and who pays for freight and destination costs.",
          "Have qualified personnel assess power and installation needs. Select any backup supply around the equipment’s documented requirements rather than an improvised arrangement.",
          "For electronic records, assess offline workflow, access controls, backups, export, local support, and privacy obligations; software availability alone is not an implementation plan.",
        ],
        "Compare the delivered, usable system over its planned life. Record what will happen if an accessory fails, a consumable is unavailable, or a service provider cannot reach the facility.",
        ["donations"],
      ),
    ],
    [
      "Recipient-approved service and equipment priorities",
      "Complete accessories, supplies, and trained users",
      "Power, transport, reprocessing, and storage plans",
      "Named owner for maintenance and replenishment",
    ],
  ),
];

export function guideForEquipment(id) {
  for (const guide of buyingGuides) {
    const entry = guide.entries.find((entry) => entry.listing === id);
    if (entry) return { guide, entry };
  }
  return null;
}
