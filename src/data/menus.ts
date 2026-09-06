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
    slug: "puro-verde",
    tipo: "comercio",
    name: "Frutería y Verdulería Puro Verde SpA",
    rubro: "Verdulería y Frutas Frescas",
    address: "Avenida Carlos Ibáñez 2116, Puerto Natales",
    phone: "+56968282130",
    whatsapp: "56968282130",
    logo: "🌿",
    banner: "bg-gradient-to-r from-emerald-800 via-slate-900 to-green-800",
    categories: ["Frutas y Verduras"],
    items: [
      {
        id: "pv-43",
        name: "Tomate",
        description: "Tomates frescos seleccionados de primera calidad (unidad/kg).",
        price: 2500,
        category: "Frutas y Verduras"
      },
      {
        id: "pv-44",
        name: "Palta Hass",
        description: "Palta Hass madura, de gran sabor e ideal para consumo inmediato (unidad/kg).",
        price: 5500,
        category: "Frutas y Verduras"
      }
    ]
  }
};
