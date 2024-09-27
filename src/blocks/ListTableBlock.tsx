/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import { usePageStore, getGetterByPath } from "../stores/pageStore";
import useNavigation, { parseKeyFromPath } from "../hooks/useNavigation";
import { icons } from "../utils/display";
import { useParams } from "react-router-dom";
import { PathParams } from "../types/types";

interface RepeaterField {
  label: string;
  key: string;
}

interface Action {
  icon: string;
  url?: string;
}

interface ListBlockProps {
  path: string;
  repeater: RepeaterField[];
  actions?: Action[];
  url?: string;
  className?: string;
}

const ListTableBlock: React.FC<ListBlockProps> = React.memo(
  ({ path, repeater, actions, className = "", url = "" }) => {
    const { navigateTo } = useNavigation();
    const { workspace, slug } = useParams<PathParams>();

    // Pobieranie danych z store bez domyślnej wartości
    const listData: any[] | undefined = usePageStore(
      useCallback((state) => getGetterByPath(path)(state.pageData), [path])
    );

    // Pobieranie stanu ładowania dla danej ścieżki
    const isLoading: boolean = usePageStore(
      useCallback((state) => state.loading[path], [path])
    );

    const isValidPath = useMemo(() => path.trim() !== "", [path]);
    const isArrayData = useMemo(() => Array.isArray(listData), [listData]);

    const handleRowClick = useCallback(
      (item: Record<string, any>) => {
        navigateTo(parseKeyFromPath(url, item));
      },
      [navigateTo, url]
    );

    const handleActionClick = useCallback(
      (e: React.MouseEvent, actionUrl: string, item: Record<string, any>) => {
       
        e.preventDefault();
        e.stopPropagation();
        console.log('in',actionUrl, item);
        console.log('out',parseKeyFromPath(actionUrl, item ));
        
        navigateTo(parseKeyFromPath(actionUrl, item ));
      },
      [navigateTo]
    );

    if (!isValidPath) {
      console.error("Ścieżka jest niezdefiniowana lub pusta.");
      return <div>Nieprawidłowa ścieżka do danych.</div>;
    }

    if (!isLoading && !isArrayData) {
      console.error(`Ścieżka "${path}" nie wskazuje na tablicę.`);
      return <div>Nieprawidłowe dane - oczekiwano tablicy.</div>;
    }

    const getValueByPath = (obj: Record<string, any>, path: string) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const renderCell = (
      item: Record<string, any>,
      key: string,
      isSkeleton: boolean
    ) => {
      const value = getValueByPath(item, key);
      let displayValue;

      if (isSkeleton) {
        displayValue = <div className="skeleton p-1 w-full">&nbsp;</div>;
      } else if (typeof value === "string") {
        displayValue = value;
      } else if (value !== undefined && value !== null) {
        displayValue = "Dane są, ale nie są typu string";
      } else {
        displayValue = "Brak danych";
      }

      return <td key={key}>{displayValue}</td>;
    };

    const renderAction = (
      action: Action,
      item: Record<string, any>,
      isSkeleton: boolean,
      index: number
    ) => {
      if (isSkeleton) {
        return (
          <div key={index} className="skeleton w-8">
            &nbsp;
          </div>
        );
      }

      if (action.url) {
        return (
          <div
            key={index}
            className="bg-base-300 rounded p-sm -my-xs hover:bg-base-100"
            onClick={(e) =>
              handleActionClick(e, action.url!, {
                ...item
                ,
                param:{ workspace, slug } 
              })
            }
          >
            {action.icon &&
              typeof icons(action.icon) === "function" &&
              React.createElement(icons(action.icon))}
          </div>
        );
      }

      return <span key={index}>{action.icon}</span>;
    };

    const renderRow = (
      item: Record<string, any>,
      isSkeleton: boolean = false
    ) => (
      <tr
        className="hover cursor-pointer"
        onClick={() => !isSkeleton && handleRowClick(item)}
        key={
          isSkeleton ? `skeleton-${Math.random()}` : item.id || Math.random()
        }
      >
        {repeater.map(({ key }) => renderCell(item, key, isSkeleton))}
        {actions && actions.length > 0 && (
          <td className="gap-sm flex justify-end" key="actions">
            {actions.map((action, index) =>
              renderAction(action, item, isSkeleton, index)
            )}
          </td>
        )}
      </tr>
    );

    return (
      <div className={`container m-auto ${className}`}>
        <table className="table">
          <thead>
            <tr>
              {repeater.map(({ label, key }) => (
                <th key={key}>{label}</th>
              ))}
              {actions && actions.length > 0 && (
                <th key="actions-header" className="text-right">
                  Akcje
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Wyświetlanie szkieletów podczas ładowania
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {repeater.map(({ key }) => (
                    <td key={key}>
                      <div className="skeleton p-1 w-full">&nbsp;</div>
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="gap-sm flex justify-end" key="actions">
                      {actions.map((_, idx) => (
                        <div key={idx} className="skeleton w-8">
                          &nbsp;
                        </div>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : listData && listData.length === 0 ? (
              // Wyświetlanie komunikatu, gdy dane są puste
              <tr>
                <td
                  colSpan={repeater.length + (actions ? 1 : 0)}
                  className="text-center"
                >
                  Brak danych do wyświetlenia.
                </td>
              </tr>
            ) : (
              // Wyświetlanie rzeczywistych danych
              listData?.map((item) => renderRow(item))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default ListTableBlock;
