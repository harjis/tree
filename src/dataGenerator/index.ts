import { range } from "../utils/numberUtil";

let folderId = 0;
function nextId() {
  const nextId = folderId + 1;
  folderId = folderId + 1;
  return nextId;
}

interface BaseType {
  type: string;
}

interface Folder extends BaseType {
  id: number;
  name: string;
  parentId: number | null;
  type: "folder";
}

interface Report extends BaseType {
  id: number;
  name: string;
  parentId: number | null;
  type: "report";
}

export const generate = (depth: number, itemsOnLevel: number) => {
  // console.log("fold id at start", folderId);
  const root = createFolder({ name: "Root", parentId: null });

  // Yeah this isn't right :D
  return [root].concat(generateForLevel([root], depth, itemsOnLevel, 1));
};

function generateForLevel(
  folders: Folder[],
  depth: number,
  itemsOnLevel: number,
  currentDepth: number
): Folder[] {
  return folders.reduce((acc: Folder[], folder) => {
    const children = generateChildren(folder, currentDepth, itemsOnLevel);

    let temp: Folder[] = [];
    if (currentDepth < depth) {
      temp = generateForLevel(children, depth, itemsOnLevel, currentDepth + 1);
    }

    return [...acc, ...children, ...temp];
  }, []);
}

function generateChildren(
  parent: Folder,
  currentDepth: number,
  itemsOnLevel: number
): Folder[] {
  return range(itemsOnLevel, 1).map((itemNumber) => {
    return createFolder({
      name: `Child item no. ${itemNumber} parent_id: ${parent.id} depth: ${currentDepth}`,
      parentId: parent.id,
    });
  });
}

function createFolder(folderArgs: Omit<Folder, "id" | "type">): Folder {
  return { ...folderArgs, id: nextId(), type: "folder" };
}
