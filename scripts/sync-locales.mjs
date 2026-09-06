import fs from 'fs';
import path from 'path';

const API_BASE = 'https://api.baqueanonatales.com';

const LOCALES_CONFIG = [
  {
    id: 4,
    slug: 'puro-verde',
    tipo: 'comercio',
    tipoLabel: 'Comercio',
    rubro: 'Verdulería y Frutas Frescas',
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
      
      const resCat = await fetch(`${API_BASE}/catalogo/local/${cfg.id}`, { timeout: 10000 });
      if (!resCat.ok) {
        console.warn(`⚠️ No se pudo obtener catálogo para ID ${cfg.id} (Status: ${resCat.status})`);
        continue;
      }
      const dataCat = await resCat.json();

      const items = [];
      const categoriesSet = new Set();

      const procesarItem = (it, catNombre) => {
        if (it.disponible !== false) {
          const img = it.imagen_url || it.imagen || it.foto || it.url_imagen || null;
          items.push({
            id: `item-${it.id}`,
            name: it.nombre,
            description: it.descripcion || `${it.nombre} disponible en local.`,
            price: Number(it.precio) || 0,
            category: catNombre,
            image: img && img.startsWith('http') ? img : (img ? `${API_BASE}${img}` : undefined)
          });
        }
      };

      if (Array.isArray(dataCat.categorias)) {
        for (const cat of dataCat.categorias) {
          const catNombre = cat.nombre || 'General';
          categoriesSet.add(catNombre);
          if (Array.isArray(cat.items)) {
            for (const it of cat.items) {
              procesarItem(it, catNombre);
            }
          }
        }
      }

      if (items.length === 0 && Array.isArray(dataCat.items)) {
        categoriesSet.add('Productos');
        for (const it of dataCat.items) {
          procesarItem(it, 'Productos');
        }
      }

      const categories = Array.from(categoriesSet);
      if (categories.length === 0) categories.push('General');

      resultadoLocales[cfg.slug] = {
        slug: cfg.slug,
        tipo: cfg.tipo,
        tipoLabel: cfg.tipoLabel,
        name: dataCat.local?.razon_social || dataCat.local?.nombre || cfg.slug,
        rubro: cfg.rubro,
        address: dataCat.local?.direccion || 'Puerto Natales',
        phone: dataCat.local?.telefono || '+56968282130',
        whatsapp: (dataCat.local?.whatsapp || dataCat.local?.telefono || '56968282130').replace(/\D/g, ''),
        logo: cfg.logo,
        banner: cfg.banner,
        categories: categories,
        items: items
      };

      console.log(`✅ Sincronizado ${cfg.slug}: ${items.length} productos.`);
    } catch (err) {
      console.warn(`⚠️ Error consultando API para ${cfg.slug} (usando caché previa si existe):`, err.message);
    }
  }

  // Si se obtuvieron datos válidos, actualizar menus.ts
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
    console.log(`🎉 Archivo src/data/menus.ts actualizado.`);
  } else {
    console.log(`ℹ️ Manteniendo datos existentes en src/data/menus.ts.`);
  }
}

sync();
