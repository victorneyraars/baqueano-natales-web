// Archivo autogenerado via scripts/sync-locales.mjs
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  tag?: string;
}

export interface Local {
  slug: string;
  tipo: "comercio" | "gastronomia" | "servicios";
  tipoLabel: string;
  name: string;
  rubro: string;
  address: string;
  phone: string;
  whatsapp: string;
  logo: string;
  banner: string;
  categories: string[];
  items: MenuItem[];
}

export const locales: Record<string, Local> = {
  "puro-verde": {
    "slug": "puro-verde",
    "tipo": "comercio",
    "tipoLabel": "Comercio",
    "name": "Frutería y Verdulería Puro Verde SpA",
    "rubro": "Verdulería y Frutas Frescas",
    "address": "Avenida Carlos Ibáñez 2116, Puerto Natales",
    "phone": "+56968282130",
    "whatsapp": "56968282130",
    "logo": "🌿",
    "banner": "bg-gradient-to-r from-emerald-800 via-slate-900 to-green-800",
    "categories": [
      "Productos"
    ],
    "items": [
      {
        "id": "item-43",
        "name": "Tomate",
        "description": "Tomate fresco seleccionado (kg).",
        "price": 2500,
        "category": "Productos",
        "image": "https://api.baqueanonatales.com/media/items/c63bf82a3ac7944d.jpg"
      },
      {
        "id": "item-44",
        "name": "Palta Hass",
        "description": "Palta Hass fresco seleccionado (kg).",
        "price": 5500,
        "category": "Productos"
      }
    ]
  }
};
