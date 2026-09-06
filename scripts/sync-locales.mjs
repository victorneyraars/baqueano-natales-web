import fs from 'fs';
import path from 'path';

const API_BASE = 'https://api.baqueanonatales.com';

const LOCALES_CONFIG = [
  {
    id: 4,
    slug: 'puro-verde',
    tipo: 'comercio',
    tipoLabel: 'Comercio',
    name: 'Frutería y Verdulería Puro Verde SpA',
    rubro: 'Verdulería y Frutas Frescas',
    address: 'Avenida Carlos Ibáñez 2116, Puerto Natales',
    phone: '+56968282130',
    whatsapp: '56968282130',
    logo: '🌿',
    banner: 'bg-gradient-to-r from-emerald-800 via-slate-900 to-green-800'
  }
];

async function sync() {
  console.log('🔄 Iniciando sincronización con API Baqueano Natales...');
  const resultadoLocales = {};

  for (const cfg of LOCALES_CONFIG) {
    try {
      console.log(`📡 Consultando API para local ID ${cfg.id} (${cfg.slug})...`);
      
      const resCat = await fetch(`${API_BASE}/catalogo/local/${cfg.id}`, { signal: AbortSignal.timeout(10000) });
      if (!resCat.ok) {
        console.warn(`⚠️ No se pudo obtener catálogo para ID ${cfg.id} (Status: ${resCat.status})`);
        continue;
      }
      const dataCat = await resCat.json();

      const items = [];
      const categoriesSet = new Set();

      // Recorrer dataCat.grupos
      if (Array.isArray(dataCat.grupos)) {
        for (const grupo of dataCat.grupos) {
          const catNombre = (!grupo.nombre || grupo.nombre === 'Sin categoría') ? 'Productos' : grupo.nombre;
          categoriesSet.add(catNombre);

          if (Array.isArray(grupo.items)) {
            for (const it of grupo.items) {
              if (it.disponible !== false) {
                let img = it.foto_url || (Array.isArray(it.fotos) && it.fotos.length > 0 ? it.fotos[0] : null);
                if (img && !img.startsWith('http')) {
                  img = `${API_BASE}${img}`;
                }

                const desc = it.descripcion && it.descripcion.trim().length > 0
                  ? it.descripcion
                  : `${it.nombre} fresco seleccionado${it.unidad ? ` (${it.unidad})` : ''}.`;

                items.push({
                  id: `item-${it.id}`,
                  name: it.nombre,
                  description: desc,
                  price: Number(it.precio) || 0,
                  category: catNombre,
                  image: img || undefined,
                  tag: it.etiqueta || undefined
                });
              }
            }
          }
        }
      }

      const categories = Array.from(categoriesSet);
      if (categories.length === 0) categories.push('Productos');

      resultadoLocales[cfg.slug] = {
        slug: cfg.slug,
        tipo: cfg.tipo,
        tipoLabel: cfg.tipoLabel,
        name: cfg.name,
        rubro: cfg.rubro,
        address: cfg.address,
        phone: cfg.phone,
        whatsapp: cfg.whatsapp,
        logo: cfg.logo,
        banner: cfg.banner,
        categories: categories,
        items: items
      };

      console.log(`✅ Sincronizado ${cfg.slug}: ${items.length} productos detectados con éxito.`);
    } catch (err) {
      console.warn(`⚠️ Error consultando API para ${cfg.slug}:`, err.message);
    }
  }

  if (Object.keys(resultadoLocales).length > 0) {
    const fileContent = `// Archivo autogenerado via scripts/sync-locales.mjs
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

export const locales: Record<string, Local> = ${JSON.stringify(resultadoLocales, null, 2)};
`;
    fs.writeFileSync(path.resolve('src/data/menus.ts'), fileContent, 'utf8');
    console.log(`🎉 Archivo src/data/menus.ts actualizado con los productos y fotos de la API.`);
  }
}

sync();
