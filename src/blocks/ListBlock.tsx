/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const listData =
    usePageStore((state) => getGetterByPath(path)(state.pageData)) || [];

  if (!path) {
    console.error("Ścieżka jest niezdefiniowana lub pusta.");
    return <div>Nieprawidłowa ścieżka do danych.</div>;
  }

  if (!Array.isArray(listData)) {
    console.error(`Ścieżka "${path}" nie wskazuje na tablicę.`);
    return <div>Nieprawidłowe dane - oczekiwano tablicy.</div>;
  }

  const renderItem = (item: { [key: string]: any }, isSkeleton = false) => (
    <div className={` card bg-base-100 p-sm shadow-xl`}>
      <div className={`flex gap-md `}>
        {repeater.map(({ label, key }) => (
          <div key={key} className={`flex-1`}>
            <strong>{label}: </strong>
            <div
              className={`w-full h-6 rounded ${isSkeleton ? "skeleton" : ""}`}
            >
              {isSkeleton ? null : item[key] ?? "Brak danych"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`container m-auto p-md flex flex-col gap-sm ${className}`}>
      {listData.length === 0
        ? Array(9)
            .fill(null)
            .map(() => renderItem({}, true))
        : listData.map((item) => renderItem(item))}
    </div>
  );
};

export default ListBlock;
