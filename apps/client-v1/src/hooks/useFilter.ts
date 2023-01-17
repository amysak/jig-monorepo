import { useEffect, useState } from "react";

export default function useFilter(key: string, defaultFilter = {}) {
  const [filters, setFilters] = useState({
    ...defaultFilter,
    ...getFilters(),
  });

  const storeFilter = (filters) => {
    try {
      localStorage.setItem(key, JSON.stringify(filters));
      setFilters(filters);
    } catch (error) {
      console.log(error);
    }
  };

  function getFilters() {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);

      return defaultFilter;
    }
  }

  useEffect(() => {
    storeFilter({ ...defaultFilter, ...getFilters() });
  }, []);

  return [filters, storeFilter];
}
