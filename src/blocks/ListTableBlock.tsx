/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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

const getValueByPath = (obj: any, path: string) =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

const ListTableBlock: React.FC<ListBlockProps> = ({
  path,
  repeater,
  actions = [],
  className = "",
  url = "",
}) => {
  const { navigateTo } = useNavigation();
  const { workspace, slug } = useParams<PathParams>();

  const rawData = usePageStore((state) =>
    getGetterByPath(path)(state.pageData)
  );
  const isLoading = usePageStore((state) => state.loading[path]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && (!rawData || (rawData as any[]).length === 0)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isLoading, rawData]);

  if (!path.trim()) {
    console.error("Ścieżka jest niezdefiniowana lub pusta.");
    return <div>Nieprawidłowa ścieżka do danych.</div>;
  }

  // Ustawiamy `listData` jako pustą tablicę, jeśli dane nie są tablicą
  const listData = Array.isArray(rawData) ? rawData : [];

  const handleRowClick = (item: any) => navigateTo(parseKeyFromPath(url, item));

  const handleActionClick = (
    e: React.MouseEvent,
    actionUrl: string,
    item: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo(
      parseKeyFromPath(actionUrl, {
        ...item,
        _router_workspace: workspace,
        _router_slug: slug,
      })
    );
  };

  const renderCell = (item: any, key: string, isSkeleton: boolean) => (
    <td key={key}>
      {isSkeleton ? (
        <div className="skeleton p-1 w-full">&nbsp;</div>
      ) : (
        getValueByPath(item, key) ?? "Brak danych"
      )}
    </td>
  );

  const renderAction = (
    action: Action,
    item: any,
    isSkeleton: boolean,
    index: number
  ) => (
    <div
      key={index}
      className={`w-8 ${
        isSkeleton
          ? "skeleton"
          : "bg-base-300 rounded p-sm -my-xs hover:bg-base-100"
      }`}
      onClick={(e) => !isSkeleton && handleActionClick(e, action.url!, item)}
    >
      {!isSkeleton && React.createElement(icons(action.icon))}
    </div>
  );

  const renderRow = (item: any, isSkeleton: boolean, key: string | number) => (
    <tr
      key={key}
      className="hover cursor-pointer"
      onClick={() => !isSkeleton && handleRowClick(item)}
    >
      {repeater.map(({ key }) => renderCell(item, key, isSkeleton))}
      {actions.length > 0 && (
        <td className="gap-sm flex justify-end">
          {actions.map((action, index) =>
            renderAction(action, item, isSkeleton, index)
          )}
        </td>
      )}
    </tr>
  );

  const totalColumns = repeater.length + (actions.length > 0 ? 1 : 0);

  return (
    <div
      className={`${className ? className : "container m-auto"} select-none`}
    >
      <table className="table select-auto">
        <thead>
          <tr>
            {repeater.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
            {actions.length > 0 && <th className="text-right">Akcje</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) =>
              renderRow({}, true, `skeleton-${index}`)
            )
          ) : listData.length > 0 ? (
            listData.map((item: any) =>
              renderRow(item, false, item.id || Math.random())
            )
          ) : (
            <tr
              className={`transition-opacity ease-in duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <td colSpan={totalColumns}>Brak danych do wyświetlenia.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTableBlock;
