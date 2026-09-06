export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag?: string;
  image?: string;
}

export interface Restaurant {
  slug: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  whatsapp: string;
  logo: string;
  banner: string;
  categories: string[];
  items: MenuItem[];
}

export const restaurants: Record<string, Restaurant> = {
  "asador-patagonico": {
    slug: "asador-patagonico",
    name: "Asador Criollo Patagónico",
    type: "Carnes, Cordero al Palo y Cocina Regional",
    address: "Eberhard 240, Puerto Natales",
    phone: "+56912345678",
    whatsapp: "56912345678",
    logo: "🔥",
    banner: "bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950",
    categories: ["Cordero & Parrilla", "Platos Típicos", "Pescados & Mariscos", "Bebidas & Vinos"],
    items: [
      {
        id: "1",
        name: "Cordero Magallánico al Palo",
        description: "Tradicional cordero patagónico asado lentamente a la leña con papas rústicas y pebre baqueano.",
        price: 18500,
        category: "Cordero & Parrilla",
        tag: "Especialidad de la Casa"
      },
      {
        id: "2",
        name: "Guanaco Sellado a la Pimienta",
        description: "Filete de guanaco con reducción de calafate y puré de papas nativas con merkén.",
        price: 19900,
        category: "Cordero & Parrilla",
        tag: "Plato Baqueano"
      },
      {
        id: "3",
        name: "Pastel de Centolla Austral",
        description: "Centolla fresca desmenuzada, gratinada al horno con queso parmesano y crema de mariscos.",
        price: 21000,
        category: "Pescados & Mariscos",
        tag: "Imperdible"
      },
      {
        id: "4",
        name: "Merluza Austral a la Mantequilla Negra",
        description: "Acompañada de risotto de hongos silvestres de la estepa.",
        price: 16500,
        category: "Pescados & Mariscos"
      },
      {
        id: "5",
        name: "Calafate Sour Baqueano",
        description: "Pisco artesanal chileno macerado con bayas frescas de calafate silvestre.",
        price: 5500,
        category: "Bebidas & Vinos",
        tag: "Trago Típico"
      },
      {
        id: "6",
        name: "Cerveza Artesanal Austral Calafate (500cc)",
        description: "Cerveza regional de fermentación tradicional patagónica.",
        price: 4500,
        category: "Bebidas & Vinos"
      }
    ]
  },
  "puro-verde": {
    slug: "puro-verde",
    name: "Frutería y Verdulería Puro Verde SpA",
    type: "Verdulería y Frutas Frescas",
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
