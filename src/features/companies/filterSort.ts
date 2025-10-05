import type { Company, SortState } from "../../types/company";

export function filterAndSortCompanies(
  companies: Company[],
  search: string,
  industry: string,
  location: string,
  sort: SortState
): Company[] {
  // copy first to avoid mutating original
  let filtered = companies.slice();

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(q));
  }

  if (industry) {
    filtered = filtered.filter((c) => c.industry === industry);
  }

  if (location) {
    filtered = filtered.filter((c) => c.location === location);
  }

  if (sort?.column && sort.direction) {
    const col = sort.column;
    const dir = sort.direction;

    filtered.sort((a, b) => {
      const aRaw = a[col];
      const bRaw = b[col];

      // handle null/undefined
      if (aRaw == null && bRaw == null) return 0;
      if (aRaw == null) return dir === "asc" ? -1 : 1;
      if (bRaw == null) return dir === "asc" ? 1 : -1;

      // number comparison
      if (typeof aRaw === "number" && typeof bRaw === "number") {
        return dir === "asc" ? aRaw - bRaw : bRaw - aRaw;
      }

      // string comparison (case-insensitive, numeric-aware)
      const aStr = String(aRaw).toLowerCase();
      const bStr = String(bRaw).toLowerCase();
      const cmp = aStr.localeCompare(bStr, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return dir === "asc" ? cmp : -cmp;
    });
  }

  return filtered;
}
