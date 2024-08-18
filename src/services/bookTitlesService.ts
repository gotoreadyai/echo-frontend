// src/services/bookTitlesService.ts
const enpoint = `http://localhost:3004`
export interface BookTitle {
  id: string;
  name: string;
  bookObjectiveId: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchBookTitles = async (): Promise<BookTitle[]> => {
  const response = await fetch(`${enpoint}/bookTitles`);
  if (!response.ok) {
    throw new Error("Failed to fetch book titles");
  }
  return response.json();
};

export const createBookTitle = async (
  bookTitle: Partial<BookTitle>
): Promise<BookTitle> => {
  const response = await fetch(`${enpoint}/bookTitle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookTitle),
  });
  if (!response.ok) {
    throw new Error("Failed to create book title");
  }
  return response.json();
};

export const updateBookTitle = async (
  id: string,
  bookTitle: Partial<BookTitle>
): Promise<BookTitle> => {
  const response = await fetch(`${enpoint}/bookTitle/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookTitle),
  });
  if (!response.ok) {
    throw new Error("Failed to update book title");
  }
  return response.json();
};

export const deleteBookTitle = async (id: string): Promise<void> => {
  const response = await fetch(`${enpoint}/bookTitle/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete book title");
  }
};
