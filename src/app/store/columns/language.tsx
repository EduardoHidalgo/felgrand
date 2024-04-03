import { FC } from "react";

import { CardLanguage } from "@/types";
import { FlagUS } from "@/components/icons/flags/us";
import { FlagSP } from "@/components/icons/flags/sp";
import { FlagFR } from "@/components/icons/flags/fr";
import { FlagDE } from "@/components/icons/flags/de";
import { FlagJP } from "@/components/icons/flags/jp";
import { FlagIT } from "@/components/icons/flags/it";
import { FlagPT } from "@/components/icons/flags/pt";

export interface StoreColumnLanguageProps {
  language: CardLanguage;
}

export const StoreColumnLanguage: FC<StoreColumnLanguageProps> = ({
  language,
}) => {
  const mapLanguage = (language: CardLanguage) => {
    switch (language) {
      case CardLanguage.English:
        return <FlagUS className="h-6 w-6" />;
      case CardLanguage.Spanish:
        return <FlagSP className="h-6 w-6" />;
      case CardLanguage.French:
        return <FlagFR className="h-6 w-6" />;
      case CardLanguage.German:
        return <FlagDE className="h-6 w-6" />;
      case CardLanguage.Italian:
        return <FlagIT className="h-6 w-6" />;
      case CardLanguage.Japanese:
        return <FlagJP className="h-6 w-6" />;
      case CardLanguage.Portuguese:
        return <FlagPT className="h-6 w-6" />;
    }
  };

  return (
    <div className="flex w-full flex-row justify-center">
      {mapLanguage(language)}
    </div>
  );
};
