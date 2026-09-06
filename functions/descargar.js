export async function onRequest(context) {
  // Intentar descargar desde GitHub directamente como fallback confiable
  const githubApkUrl = "https://github.com/sandraalvaradoclp/superapp-natales-app/releases/download/apk-latest/baqueano-natales.apk";
  const response = await fetch(githubApkUrl);
  
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/vnd.android.package-archive");
  headers.set("Content-Disposition", 'attachment; filename="baqueano-natales.apk"');
  
  return new Response(response.body, {
    status: response.status,
    headers
  });
}
