/**
 * Configuración centralizada de la API de Baqueano.
 * Usa variables de entorno con fallback para dev/prod.
 */

export const API_URL =
  import.meta.env.PUBLIC_API_URL || 'https://api.baqueanonatales.com';

export const API_ENDPOINTS = {
  comercios: `${API_URL}/api/v1/comercios`,
  comercioPorSlug: (slug: string) => `${API_URL}/api/v1/comercios/${slug}`,
  categorias: `${API_URL}/api/v1/comercios/categorias`,
} as const;

export const DIAS_SEMANA = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
] as const;

export interface Categoria {
  nombre: string;
  slug: string;
  icono: string | null;
  color_hex: string | null;
}

export interface ComercioListItem {
  id: string;
  slug: string;
  nombre: string;
  descripcion_corta: string | null;
  categoria: Categoria;
  direccion: string;
  ciudad: string;
  region: string;
  logo_url: string | null;
  portada_url: string | null;
  acepta_delivery: boolean;
  acepta_retiro: boolean;
  costo_envio_clp: number;
  pedido_minimo_clp: number;
  radio_entrega_km: string | null;
  rating_promedio: string;
  total_resenas: number;
  destacado: boolean;
}

export interface Horario {
  dia_semana: number;
  cerrado: boolean;
  abre: string | null;
  cierra: string | null;
}

export interface ComercioDetalle extends ComercioListItem {
  descripcion_larga: string | null;
  telefono: string | null;
  whatsapp: string | null;
  email: string | null;
  sitio_web: string | null;
  horarios: Horario[];
}

export async function fetchComercios(): Promise<{ items: ComercioListItem[]; meta: { total: number } }> {
  const res = await fetch(`${API_ENDPOINTS.comercios}?page_size=100`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    return { items: [], meta: { total: 0 } };
  }
  return res.json();
}

export async function fetchComercioPorSlug(slug: string): Promise<ComercioDetalle | null> {
  const res = await fetch(API_ENDPOINTS.comercioPorSlug(slug), {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  return res.json();
}

export function formatearHorario(h: Horario): string {
  if (h.cerrado) return 'Cerrado';
  if (!h.abre || !h.cierra) return 'Horario no disponible';
  // "09:00:00" → "09:00"
  return `${h.abre.slice(0, 5)} - ${h.cierra.slice(0, 5)}`;
}
