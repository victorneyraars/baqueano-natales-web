/**
 * Cloudflare Pages Function: /descargar
 * Redirige la descarga al APK oficial según el query param `app`.
 * Uso: /descargar?app=client o /descargar?app=admin
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const appType = url.searchParams.get('app') || 'client';
  const apiUrl = context.env.PUBLIC_API_URL || 'https://api.baqueanonatales.com';
  
  const isDev = apiUrl.includes('api-dev');
  const suffix = isDev ? 'dev' : '';
  
  let apkUrl = '';
  if (appType === 'admin') {
    apkUrl = `${apiUrl}/apks/app-admin${suffix}.apk`;
  } else {
    apkUrl = `${apiUrl}/apks/app-client${suffix}.apk`;
  }

  return Response.redirect(apkUrl, 302);
}
