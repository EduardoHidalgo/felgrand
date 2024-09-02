import { FC, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { Button } from "@/components/button";
import { AsyncState, StoreCSV, StoredCardCombined } from "@/types";

export interface StoreSummaryProps {
  data?: Array<StoredCardCombined>;
}

export const StoreSummary: FC<StoreSummaryProps> = ({ data }) => {
  const [generateCSVState, setGenerateSCVState] = useState(AsyncState.Initial);
  const [storeCSV, setStoreCSV] = useState<Array<StoreCSV>>([]);

  if (data == undefined) return <></>;

  const totalCount = data.reduce((sum, { count }) => (sum += count), 0);
  const totalWantedCount = data.reduce(
    (sum, { wantedCount }) => (sum += wantedCount),
    0,
  );
  const totalValue = data.reduce(
    (sum, { value, count }) => (sum += value * count),
    0,
  );
  const totalBoughtValue = data.reduce(
    (sum, { boughtValue, wantedCount }) => (sum += boughtValue * wantedCount),
    0,
  );

  const generateCSV = () => {
    if (!data) return;

    const list: Array<StoreCSV> = data.map((scc) => {
      return [
        scc.name,
        String(scc.count),
        scc.value.toFixed(2),
        String(scc.condition),
        scc.language,
        String(scc.rarityCode),
        scc.setCode,
      ];
    });

    setStoreCSV(list);
  };

  useEffect(() => {
    if (storeCSV.length > 0) {
      setGenerateSCVState(AsyncState.Success);
    }
  }, [storeCSV]);

  return (
    <>
      <div className="">
        total count:{" "}
        <span className="font-bold text-green-500">{totalCount}</span>
      </div>
      <div>
        total value:{" "}
        <span className="font-bold text-green-500">
          {totalValue.toFixed(2).toString()}
        </span>
      </div>
      <div>
        total wanted count:{" "}
        <span className="font-bold text-green-500">{totalWantedCount}</span>
      </div>
      <div>
        total bought value:{" "}
        <span className="font-bold text-green-500">
          {totalBoughtValue.toFixed(2).toString()}
        </span>
      </div>
      {generateCSVState !== AsyncState.Success && (
        <Button label="Generate CSV" onClick={generateCSV} />
      )}
      {generateCSVState == AsyncState.Success && (
        <Button>
          <CSVLink data={storeCSV} filename={`${crypto.randomUUID()}.csv`}>
            Download CSV
          </CSVLink>
        </Button>
      )}
    </>
  );
};
