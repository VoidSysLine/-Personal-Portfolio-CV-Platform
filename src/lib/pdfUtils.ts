export function getPdfPageUrl(pdfPath: string): string {
  return pdfPath.startsWith('/') ? pdfPath : `/${pdfPath}`;
}

export function isPdfAvailable(pdfPath: string | undefined): boolean {
  return Boolean(pdfPath && pdfPath.trim().length > 0);
}
