export const articleCategories = [
  "Procurement",
  "Service & support",
  "Mission planning",
];
export const articles = [
  {
    id: "planning-hospital-equipment",
    title: "Plan your equipment purchase",
    category: "Procurement",
    image: "operating-room",
    minutes: 4,
    summary:
      "Turn a list of equipment needs into a clear, useful sourcing brief.",
    intro:
      "A good equipment conversation begins with the care you want to deliver. Whether you need one replacement machine or equipment for a whole department, a clear brief helps everyone work toward the same result.",
    sections: [
      [
        "Start with the department, then the equipment",
        "Describe where the equipment will be used, who will use it, and the requirements your clinical and technical teams have agreed. Include preferred models when you have them, but also explain which features are essential and which are flexible. This helps us discuss alternatives without losing sight of your original need.",
      ],
      [
        "Describe the place it is going",
        "A hospital’s location, available utilities, room layout, and delivery access all shape an equipment project. Share the destination, any known installation constraints, and the people responsible for site readiness. Flag unanswered questions early so they can become part of the sourcing conversation.",
      ],
      [
        "Build the request around the whole package",
        "Ask what is included with the equipment: accessories, software, documentation, freight, installation support, and service arrangements. A base price is easier to evaluate when exclusions are visible. Keep a written list of the items and responsibilities that must be confirmed before an order.",
      ],
      [
        "Make the budget and timing useful",
        "Give a target budget, the date you hope to have the equipment ready, and any dependencies such as funding approval or building work. Distinguish a preferred date from a firm operational deadline. We can then discuss what needs to be established before a delivery or service commitment is made.",
      ],
    ],
    checklist: [
      "Equipment list, quantities, and essential specifications",
      "Facility, destination, and main project contact",
      "Known utilities and installation constraints",
      "Budget, funding status, and target timing",
      "Accessories and support you want included",
    ],
    related: ["anesthesia", "surgical-tables", "ct-mri"],
  },
  {
    id: "refurbished-equipment-questions",
    title: "Look beyond the purchase price",
    category: "Procurement",
    image: "ultrasound",
    minutes: 4,
    summary:
      "Questions to bring to a new or refurbished equipment conversation.",
    intro:
      "An equipment proposal should help you understand what you are buying and what you will need afterward. These questions give your procurement and technical teams a shared starting point when discussing a new or refurbished system.",
    sections: [
      [
        "Be specific about condition",
        "Ask how the offered unit’s condition is described, what work has been completed, and which records are available. Terms such as used, refurbished, and inspected should be explained for the particular unit. Request photographs and documentation for the actual equipment before making a purchasing decision.",
      ],
      [
        "Check the complete configuration",
        "Record the model, software configuration, included accessories, and any known exclusions. Ask your technical team to check compatibility with existing equipment and local infrastructure. An accessory shown in a general photograph should not be assumed to be included in a quote.",
      ],
      [
        "Discuss ownership after delivery",
        "Ask about parts, consumables, maintenance, technical support, and any proposed warranty. Confirm the duration, scope, exclusions, and who is responsible for each service. Consider what happens if a component needs to be shipped for repair and who will coordinate that process.",
      ],
      [
        "Agree how the equipment will be received",
        "Identify the person who will inspect the shipment, reconcile the packing list, and coordinate the facility’s acceptance process. Document any installation or testing responsibilities in the proposal. Your clinical and technical teams should determine the checks required before equipment enters use.",
      ],
    ],
    checklist: [
      "Condition and unit-specific records",
      "Exact configuration and included accessories",
      "Written warranty or service terms, if offered",
      "Freight, installation, and acceptance responsibilities",
      "Parts, consumables, and ongoing support plan",
    ],
    related: ["ultrasound", "endoscopy", "laboratory"],
  },
  {
    id: "prepare-service-request",
    title: "Prepare for a service request",
    category: "Service & support",
    image: "equipment-detail",
    minutes: 3,
    summary:
      "The equipment details and context that make a support conversation more useful.",
    intro:
      "A useful service request gives the support team a clear picture of the equipment and the issue. Gathering a few details first helps keep the conversation focused and makes it easier to identify the next step.",
    sections: [
      [
        "Identify the equipment clearly",
        "Include the manufacturer, model, serial number, and facility location. If there are several similar systems, identify the affected unit. Add the name and contact details of the person who can coordinate with the facility’s technical team.",
      ],
      [
        "Describe what was observed",
        "Write down the issue, when it began, and any displayed error message exactly as it appears. Explain whether the problem is intermittent or continuous and whether anything changed before it started. Share only equipment information; do not include patient records or identifying images.",
      ],
      [
        "Explain the operational context",
        "Tell us which department is affected, your preferred contact method, and the urgency of the request. Include any existing service agreement or recent service history that could help establish responsibility. Do not assume a response time or repair scope until it has been confirmed.",
      ],
      [
        "Agree the next step and its owner",
        "Support may involve clarifying the issue, discussing parts, or coordinating an appropriate service resource. Before proceeding, establish the proposed scope, cost, location, and timing. Equipment operation and technical work should follow your facility’s procedures and the manufacturer’s instructions.",
      ],
    ],
    checklist: [
      "Manufacturer, model, and serial number",
      "Facility location and technical contact",
      "Exact error message and observed behavior",
      "Relevant service history",
      "Department impact and requested timing",
    ],
    related: ["anesthesia", "ventilators", "ekg"],
  },
  {
    id: "wholesale-charitable-pricing",
    title: "Ask about wholesale & charitable pricing",
    category: "Mission planning",
    image: "laboratory",
    minutes: 3,
    summary: "How to prepare a request for wholesale or charitable pricing.",
    intro:
      "Your budget and your mission belong in the same conversation. Med Mission Supplies offers wholesale pricing and considers charitable pricing for mission-driven projects. Tell us what you are trying to accomplish so we can explore the options available for your request.",
    sections: [
      [
        "Tell us who and where you serve",
        "Introduce your organization, facility, and project. Explain the department or community the equipment will support and include a contact who can discuss the requirements. A concise project description helps us understand the purpose behind the list.",
      ],
      [
        "Separate essentials from preferences",
        "Share your equipment priorities, quantities, and required specifications. Identify where an alternative model or configuration could work, subject to your clinical and technical teams’ approval. This creates room for a useful sourcing discussion while keeping essential requirements clear.",
      ],
      [
        "Share the funding picture",
        "Include the available budget and whether funds are confirmed, being raised, or awaiting approval. Let us know if you need a proposal for a funding application. Charitable pricing is considered for each request; a particular discount, donation, or availability should not be assumed.",
      ],
      [
        "Plan for delivery and ongoing care",
        "Include the destination and the support your organization needs after purchase. Freight, local arrangements, installation, accessories, and maintenance should be considered alongside the equipment itself. We can discuss the scope with you and identify what needs to be confirmed in the proposal.",
      ],
    ],
    checklist: [
      "Organization and project purpose",
      "Prioritized equipment list and quantities",
      "Essential specifications and acceptable flexibility",
      "Budget and funding status",
      "Destination and support requirements",
    ],
    related: ["beds", "ultrasound", "sterilization"],
  },
];
export const articleUrl = (article) => `/resources/${article.id}.html`;
export function filterArticles({ category = "all", query = "" } = {}) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return articles.filter(
    (item) =>
      (category === "all" || category === item.category) &&
      terms.every((term) =>
        `${item.title} ${item.summary} ${item.category}`
          .toLowerCase()
          .includes(term),
      ),
  );
}
