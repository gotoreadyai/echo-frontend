/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import { usePageStore, getGetterByPath } from "../stores/pageStore";
import useNavigation, { parseKeyFromPath } from "../hooks/useNavigation";
import { icons } from "../utils/display";

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

    const listData: any[] =
      usePageStore(
        useCallback((state) => getGetterByPath(path)(state.pageData), [path])
      ) || [];

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
        navigateTo(parseKeyFromPath(actionUrl, item));
      },
      [navigateTo]
    );

    if (!isValidPath) {
      console.error("Ścieżka jest niezdefiniowana lub pusta.");
      return <div>Nieprawidłowa ścieżka do danych.</div>;
    }

    if (!isArrayData) {
      console.error(`Ścieżka "${path}" nie wskazuje na tablicę.`);
      return <div>Nieprawidłowe dane - oczekiwano tablicy.</div>;
    }

    const renderCell = (
      item: Record<string, any>,
      key: string,
      isSkeleton: boolean
    ) => {
      return (
        <td key={key}>
          {isSkeleton ? (
            <div className="skeleton p-1 w-full">&nbsp;</div>
          ) : (
            item[key] ?? "Brak danych"
          )}
        </td>
      );
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
            onClick={(e) => handleActionClick(e, action.url!, item)}
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
      <div className={`container m-auto p-md ${className}`}>
        <table className="table">
          <thead>
            <tr>
              {repeater.map(({ label, key }) => (
                <th key={key}>{label}</th>
              ))}
              {actions && actions.length > 0 && (
                <th key="actions-header">Akcje</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(listData) && listData.length === 0
              ? Array.from({ length: 9 }).map(() => renderRow({}, true))
              : listData.map((item) => renderRow(item))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default ListTableBlock;
