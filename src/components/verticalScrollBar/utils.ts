import {TListItem} from './types';

export const preprocessNames = (names: string[]): TListItem[] => {
  const processedNames: TListItem[] = [];
  const letterGroups: Record<string, string[]> = {};

  names.forEach(name => {
    const firstLetter = name[0].toUpperCase();
    if (!letterGroups[firstLetter]) {
      letterGroups[firstLetter] = [];
    }
    letterGroups[firstLetter].push(name);
  });

  Object.entries(letterGroups).forEach(([letter, group]) => {
    group.forEach((name, index) => {
      processedNames.push({
        name,
        letter,
        isFirstOfLetter: index === 0,
        isLastOfLetter: index === group.length - 1,
      });
    });
  });

  return processedNames;
};
