export type SearchMatch = {
  id: string;
  location: string;
};

export type SearchFilters = {
  radiusKm: number;
  breed: string | null;
};

// Local simulation only
export async function searchByImage(file: File, filters: SearchFilters): Promise<SearchMatch[]> {
  if (file.size === 0) {
    throw new Error("La imagen está vacía. Selecciona otro archivo.");
  }

  if (![2, 5, 10, 20].includes(filters.radiusKm)) {
    throw new Error("Selecciona un radio de búsqueda válido.");
  }

  await new Promise((resolve) => setTimeout(resolve, 4000));
  return [];
}
