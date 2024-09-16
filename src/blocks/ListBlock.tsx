import React from "react";
import { usePageStore, getGetterByPath } from "../stores/pageStore";

interface RepeaterField {
  label: string;
  key: string;
}

interface ListBlockProps {
  path: string;
  repeater: RepeaterField[];
  className?: string;
}

const ListBlock: React.FC<ListBlockProps> = ({ path, repeater, className }) => {
  // Pobierz dane z pageStore za pomocą ścieżki
  const listData =
    usePageStore((state) => getGetterByPath(path)(state.pageData)) || [];

  // Sprawdź, czy ścieżka jest prawidłowa
  if (!path) {
    console.error("Ścieżka jest niezdefiniowana lub pusta.");
    return <div>Nieprawidłowa ścieżka do danych.</div>;
  }

  // Sprawdź, czy dane pod ścieżką są rzeczywiście tablicą
  if (!Array.isArray(listData)) {
    console.error(`Ścieżka "${path}" nie wskazuje na tablicę.`);
    return <div>Nieprawidłowe dane - oczekiwano tablicy.</div>;
  }

  return (
    <div className={`container m-auto p-md flex flex-col gap-sm ${className}`}>
      {listData.map((item, index) => (
        <div className="card bg-base-100 p-sm shadow-xl " key={index}>
          <div className="flex gap-md">
            {repeater.map(({ label, key }) => (
              <div key={key} className="flex-1">
                <strong>{label}: </strong>
                <div>{item[key] ?? "Brak danych"}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListBlock;
