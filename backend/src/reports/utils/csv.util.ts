export function convertToCSV<T extends Record<string, any>>(
  rows: T[],
  columns?: (keyof T)[],
): string {
  if (rows.length === 0) {
    return '';
  }

  const keys = columns ?? (Object.keys(rows[0]) as (keyof T)[]);

  const escapeCell = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = keys.map((k) => escapeCell(String(k))).join(',');
  const body = rows
    .map((row) => keys.map((k) => escapeCell(row[k])).join(','))
    .join('\n');

  return `${header}\n${body}`;
}
