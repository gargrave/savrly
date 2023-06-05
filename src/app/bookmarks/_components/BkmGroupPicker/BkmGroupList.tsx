import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import BkmGroupRow from "./BkmGroupRow";

interface Props {
  groups: BkmGroup[];
  onClick: (id: string | null) => void;
  selectedGroupId: string | null;
}

export default function BkmGroupList({
  groups,
  onClick,
  selectedGroupId,
}: Props) {
  return (
    <div className={"flex flex-col items-start overflow-auto"}>
      {groups.map((group) => (
        <BkmGroupRow
          key={group.id}
          groupId={group.id}
          isSelected={group.id === selectedGroupId}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
