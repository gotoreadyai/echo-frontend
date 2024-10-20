/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

const componentCache: { [key: string]: React.ComponentType<any> } = {};

export const useDynamicImport = (componentPath: string, fallbackPath: string) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (componentCache[componentPath]) {
      setComponent(() => componentCache[componentPath]);
    } else {
      import(`${componentPath}`)
        .then((module) => {
          componentCache[componentPath] = module.default;
          setComponent(() => module.default);
        })
        .catch(() => {
          import(`${fallbackPath}`).then((module) => {
            componentCache[fallbackPath] = module.default;
            setComponent(() => module.default);
          });
        });
    }
  }, [componentPath, fallbackPath]);

  return Component;
};
