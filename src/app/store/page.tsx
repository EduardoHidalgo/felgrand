"use client";
import { Importance, Priority } from "@/types";
import { useStore } from "./useStore";
import { Datatable } from "@/components/datatable";

export default function StorePage() {
  const { cards, selectedCard, onClickRow } = useStore({});

  const mapImportance = (importance: Importance): keyof typeof Importance => {
    switch (importance) {
      case Importance.ArchetypeCore:
        return "ArchetypeCore";
      case Importance.HighValue:
        return "HighValue";
      case Importance.LowValue:
        return "LowValue";
      case Importance.MediumValue:
        return "MediumValue";
      case Importance.Staple:
        return "Staple";
      case Importance.Trash:
        return "Trash";
      case Importance.Unused:
        return "Unused";
      case Importance.Unwanted:
        return "Unwanted";
      case Importance.VeryHighValue:
        return "VeryHighValue";
      case Importance.NotDefined:
      default:
        return "NotDefined";
    }
  };

  const mapPriority = (priority: Priority): keyof typeof Priority => {
    switch (priority) {
      case Priority.High:
        return "High";
      case Priority.Ignore:
        return "Ignore";
      case Priority.Low:
        return "Low";
      case Priority.Medium:
        return "Medium";
      case Priority.NotReleasedYet:
        return "NotReleasedYet";
      case Priority.Pending:
        return "Pending";
      case Priority.TooExpensive:
        return "TooExpensive";
      case Priority.Unwanted:
        return "Unwanted";
      case Priority.Urgent:
        return "Urgent";
      case Priority.VeryHigh:
        return "VeryHigh";
      case Priority.NotDefined:
      default:
        return "NotDefined";
    }
  };

  return (
    <div className="fixed flex h-full w-full flex-col overflow-y-scroll px-2">
      <Datatable>
        <Datatable.Head>
          <Datatable.HeaderCell>name</Datatable.HeaderCell>
          <Datatable.HeaderCell>count</Datatable.HeaderCell>
          <Datatable.HeaderCell>wanted count</Datatable.HeaderCell>
          <Datatable.HeaderCell>avg value</Datatable.HeaderCell>
          <Datatable.HeaderCell>importance</Datatable.HeaderCell>
          <Datatable.HeaderCell>priority</Datatable.HeaderCell>
          <Datatable.HeaderCell>ban</Datatable.HeaderCell>
          <Datatable.HeaderCell>card type</Datatable.HeaderCell>
          <Datatable.HeaderCell>archetype</Datatable.HeaderCell>
          <Datatable.HeaderCell>race</Datatable.HeaderCell>
        </Datatable.Head>
        <Datatable.Body>
          {cards.map((card, index) => (
            <Datatable.Row
              index={index}
              key={card.id}
              onClickRow={onClickRow}
              isSelected={
                selectedCard ? selectedCard.id === card.id : undefined
              }
            >
              <Datatable.Data>{card.name}</Datatable.Data>
              <Datatable.Data>{card.countSum}</Datatable.Data>
              <Datatable.Data>{card.wantedCountSum}</Datatable.Data>
              <Datatable.Data>
                <p>$</p>
                <p className="w-full flex-1 text-right">
                  {card.avgValue.toFixed(2).toString()}
                </p>
              </Datatable.Data>
              <Datatable.Data>{mapImportance(card.importance)}</Datatable.Data>
              <Datatable.Data>{mapPriority(card.priority)}</Datatable.Data>
              <Datatable.Data>{card.banType}</Datatable.Data>
              <Datatable.Data>{card.cardType}</Datatable.Data>
              <Datatable.Data>
                {card.archetype ? card.archetype : ""}
              </Datatable.Data>
              <Datatable.Data>{card.race}</Datatable.Data>
            </Datatable.Row>
          ))}
        </Datatable.Body>
      </Datatable>
    </div>
  );
}
