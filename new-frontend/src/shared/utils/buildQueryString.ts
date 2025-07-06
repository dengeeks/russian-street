export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );
  return query.toString();
}
