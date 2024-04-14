const dictionaries = {
  en: () =>
    import("./../dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("./../dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return await dictionaries["en"]();
  } else {
    const result = await dictionaries[locale as "en" | "de"]();
    return result;
  }
};
