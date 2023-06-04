import type { BkmGroup } from "@/app/bookmarks/bookmarks.types";
import BkmGroupRow from "./BkmGroupRow";

interface Props {
  groups: BkmGroup[];
}

export default function BkmGroupList({ groups }: Props) {
  return (
    <div className={"flex flex-col items-start overflow-auto"}>
      {groups.map((group) => (
        <BkmGroupRow key={group.id} groupId={group.id} />
      ))}
    </div>
  );
}
