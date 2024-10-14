/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { ModelSingular, ModelData } from "../../../models_EXPORT/models";

import { FaCheckCircle, FaClipboardCheck } from "react-icons/fa"; // Added FaClipboardCheck for feedback
import { FiCrosshair, FiFilter, FiLink } from "react-icons/fi";
import { useGlobalStore, usePageStore } from "../../stores";

// Funkcja pomocnicza do konwersji nazwy modelu: tylko pierwsza litera na małą
const toModelKey = (modelName: string) =>
  modelName.charAt(0).toLowerCase() + modelName.slice(1);

const ScopeManager: React.FC = () => {
  // Pobierz pageData z Zustand store
  const pageData = usePageStore((state) => state.pageData);
  const selectedScope = useGlobalStore(
    (state) => state.scopeManager.selectedScope
  );

  const constructFilterPath = (referencingModel: string): string => {
    console.log(ModelSingular[selectedScope]);
    const singular = ModelSingular[selectedScope];
    const relationId = `${singular
      .charAt(0)
      .toLowerCase()}${singular.slice(1)}Id`; // np. 'schoolId'
    return `filters.${referencingModel}.where.${relationId}`;
  };

  // Funkcja obsługująca kliknięcie w klucz
  const handleScopeClick = (key: string) => {
    useGlobalStore.setState((state) => ({
      scopeManager: {
        ...state.scopeManager,
        selectedScope: key,
      },
    }));
  };

  // Funkcja resetująca zakres
  const handleResetScope = () => {
    useGlobalStore.setState((state) => ({
      scopeManager: {
        ...state.scopeManager,
        selectedScope: "", // lub inna domyślna wartość
      },
    }));
  };

  // Pobierz wybrany model na podstawie selectedScope
  const selectedModel = selectedScope ? ModelData[selectedScope] : null;

  // Pobierz klucze wybranego modelu
  const modelKeys = selectedModel ? Object.keys(selectedModel) : [];

  // ----------------------------
  // Sekcja Referencing Models
  // Modele referencjonowane przez wybrany model
  // ----------------------------
  const referencingModels = useMemo(() => {
    if (!selectedModel) return [];
    return Object.keys(selectedModel)
      .filter((key) => selectedModel[key].references)
      .map((key) => selectedModel[key].references!.model);
  }, [selectedModel]);

  const uniqueReferencingModels = Array.from(new Set(referencingModels));

  // ----------------------------
  // Sekcja Referenced Models
  // Modele, które referencjonują wybrany model
  // ----------------------------
  const referencedModels = useMemo(() => {
    if (!selectedScope) return [];
    const referencedModelName =
      selectedScope.charAt(0).toUpperCase() + selectedScope.slice(1);
    return Object.keys(ModelData)
      .filter((key) => {
        const model = ModelData[key];
        return Object.values(model).some(
          (field: any) => field.references?.model === referencedModelName
        );
      })
      .map((key) => key); // Zwraca klucze modeli w formacie camelCase
  }, [selectedScope]);

  const uniqueReferencedModels = Array.from(new Set(referencedModels));

  // State for feedback messages
  const [copiedFilter, setCopiedFilter] = useState<string | null>(null);

  // Funkcja do kopiowania tekstu do clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFilter(text);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedFilter(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  return (
    <div className="flex">
      {/* Lewa sekcja: Lista modeli */}
      <div className="p-md border-b border-base-content border-opacity-30 select-none flex-1">
        <h2 className="text-xl font-semibold mb-4">Scope Manager (select)</h2>
        <button
          onClick={handleResetScope}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset Scope
        </button>
        <ul className="list-disc list-inside gap-px flex flex-col">
          {Object.keys(ModelSingular).map((key) => {
            const isSelected = key === selectedScope;
            return (
              <li
                key={key}
                className={`flex items-center p-xs px-md hover:bg-base-300 cursor-pointer ${
                  isSelected ? "bg-blue-500 text-white" : "bg-base-200"
                }`}
                onClick={() => handleScopeClick(key)}
              >
                <span className="flex-1">{ModelSingular[key]}</span>
                {/* Bezpieczne sprawdzenie, czy klucz istnieje w pageData */}
                {Object.prototype.hasOwnProperty.call(pageData, key) && (
                  <>
                    <span className="text-xs">Now in scope</span>{" "}
                    
                    <FaCheckCircle
                      className="ml-2 text-green-500"
                      title="Active"
                      aria-label="Active"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Prawa sekcja: Klucze wybranego modelu, Referencing Models i Referenced Models */}
      <div className="p-md border-b border-base-content border-opacity-30 select-none flex-1">
        <h2 className="text-xl font-semibold mb-4">Selected Model Keys</h2>
        {selectedScope ? (
          <>
            {modelKeys.length > 0 ? (
              <ul className="list-disc list-inside flex flex-col gap-px mb-6">
                {modelKeys.map((key) => (
                  <li
                    key={key}
                    className="p-xs px-md flex items-center gap-md bg-base-200"
                  >
                    <FiCrosshair /> {key}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Brak kluczy w wybranym modelu.</p>
            )}

            {/* Sekcja Referencing Models (Modele referencjonowane przez wybrany model) */}
            <h2 className="text-sm font-semibold">Referencing Models</h2>
            {uniqueReferencingModels.length > 0 ? (
              <ul className="list-disc list-inside flex flex-col gap-px py-sm">
                {uniqueReferencingModels.map((model) => {
                  const modelKey = toModelKey(model);
                  return (
                    <li
                      key={model}
                      className="p-sm px-md flex items-center gap-md bg-base-200"
                    >
                       <FiLink className="bg-info rounded-full p-xs text-neutral-content"/>
                      
                      {ModelSingular[modelKey] || modelKey}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-xs">
                Wybrany model nie referencjonuje żadnych innych modeli.
              </p>
            )}

            {/* Sekcja Referenced Models (Modele, które referencjonują wybrany model) */}
            <h2 className="text-sm font-semibold mt-6">Referenced Models</h2>
            {uniqueReferencedModels.length > 0 ? (
              <ul className="list-disc list-inside flex flex-col gap-px py-sm">
                {uniqueReferencedModels.map((model) => {
                  const filterPath = constructFilterPath(model);
                  return (
                    <li
                      key={model}
                      className="p-sm px-md flex items-center gap-md bg-base-200"
                    >
                       <FiLink className="bg-info rounded-full p-xs text-neutral-content"/>
                    
                      <span className="flex-1">
                        {ModelSingular[model] || model}
                      </span>
                      <div
                        className="border border-base-content border-opacity-30 p-xs rounded flex items-center text-xs gap-xs cursor-pointer"
                        onClick={() => copyToClipboard(filterPath)}
                        title="Copy filter path to clipboard"
                      >
                        <span>{filterPath}</span>
                        {copiedFilter === filterPath ? (
                          <FaClipboardCheck className="text-green-500" />
                        ) : (
                          <FiFilter />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-xs">
                Żaden model nie referencjonuje wybranego modelu.
              </p>
            )}
          </>
        ) : (
          <p>Żaden zakres nie został wybrany.</p>
        )}
      </div>
    </div>
  );
};

export default ScopeManager;
