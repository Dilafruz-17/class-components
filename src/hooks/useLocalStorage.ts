const STORAGE_KEY = 'pokemon-search-term';

export function useLocalStorage() {
  const getValue = (): string => {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  };

  const setValue = (value: string): void => {
    localStorage.setItem(STORAGE_KEY, value);
  };

  return { getValue, setValue };
}