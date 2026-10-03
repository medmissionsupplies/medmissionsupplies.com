import { equipment, equipmentUrl } from "./catalog.mjs";
import { articles, articleUrl } from "./articles.mjs";

const info = [
  [
    "index",
    "More care. Within reach.",
    "Hospital capital equipment at wholesale and charitable prices. Lowest quote guaranteed, with free physician-to-physician consultation and materials management support.",
  ],
  [
    "offerings",
    "Explore hospital equipment",
    "Browse imaging, surgery, anesthesia, critical care, laboratory, and hospital equipment. Discuss sourcing, support, service, and pricing with MMS.",
  ],
  [
    "services",
    "Procure. Support. Service.",
    "Hospital equipment procurement and service, plus free physician-to-physician equipment consultation and materials management support.",
  ],
  [
    "articles",
    "Explore & learn about hospital equipment",
    "Compare hospital equipment, understand ownership costs, and get practical advice for your next purchase or service request.",
  ],
  [
    "about",
    "About our mission and team",
    "Meet Med Mission Supplies: helping hospitals and clinics access equipment and ongoing support.",
  ],
  [
    "employment",
    "Work with purpose",
    "Explore opportunities with Med Mission Supplies.",
  ],
  [
    "contact",
    "Start an equipment conversation",
    "Request a quote, free physician-to-physician equipment consultation, or free materials management support. MMS guarantees the lowest quote.",
  ],
];
export const routes = [
  ...info.map(([key, title, description]) => ({
    key,
    path: `/${key}.html`,
    title,
    description,
  })),
  ...equipment.map((item) => ({
    key: `equipment-${item.id}`,
    path: equipmentUrl(item),
    title: item.title,
    description: item.summary,
    equipmentId: item.id,
  })),
  ...articles.map((item) => ({
    key: `article-${item.id}`,
    path: articleUrl(item),
    title: item.title,
    description: item.summary,
    articleId: item.id,
  })),
];
export const metadata = Object.fromEntries(
  routes.map((route) => [
    route.key,
    {
      title: `${route.title} | Med Mission Supplies`,
      description: route.description,
    },
  ]),
);
export function resolvePage(pathname) {
  if (pathname === "/" || pathname === "/index.html") return "index";
  return (
    routes.find((route) =>
      [
        route.path,
        route.path.replace(/\.html$/, ""),
        route.path.replace(/\.html$/, "/"),
        route.path.replace(/\.html$/, "/index.html"),
      ].includes(pathname),
    )?.key ?? null
  );
}
