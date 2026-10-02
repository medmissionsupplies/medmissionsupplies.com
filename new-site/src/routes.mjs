import { equipment, equipmentUrl } from "./catalog.mjs";
import { articles, articleUrl } from "./articles.mjs";

const info = [
  [
    "index",
    "Quality hospital equipment. Within reach.",
    "We procure, support, and service almost every major type of hospital capital equipment. Wholesale and charitable pricing from Med Mission Supplies.",
  ],
  [
    "offerings",
    "Explore hospital equipment",
    "Browse imaging, surgery, anesthesia, critical care, laboratory, and hospital equipment. Discuss sourcing, support, service, and pricing with MMS.",
  ],
  [
    "services",
    "Procure. Support. Service.",
    "One partner for hospital equipment sourcing, practical support, and service coordination, with wholesale and charitable pricing.",
  ],
  [
    "articles",
    "Medical equipment buying guides",
    "Read equipment procurement, service, support, and mission planning guides from Med Mission Supplies.",
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
    "Tell MMS about your hospital equipment, sourcing, service, or charitable pricing needs.",
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
