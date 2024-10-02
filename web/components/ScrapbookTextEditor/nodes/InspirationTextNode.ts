import {
  createInspiration,
  deleteInspiration,
  readInspiration,
  updateInspiration,
} from "@/jotai/inspirations/utils";
import {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from "lexical";

export type SerializedInspirationTextNode = SerializedTextNode & {
  inspirationIds: string[];
  templateId: string;
};

export class InspirationTextNode extends TextNode {
  __inspirationIds: string[];
  __templateId: string;

  constructor(
    text: string,
    templateId: string,
    inspirationIds: string[],
    key?: NodeKey
  ) {
    super(text, key);
    this.__inspirationIds = inspirationIds;
    this.__templateId = templateId;
  }

  static getType(): string {
    return "inspiration-text";
  }

  static clone(node: InspirationTextNode): InspirationTextNode {
    return new InspirationTextNode(
      node.__text,
      node.__templateId,
      node.__inspirationIds,
      node.__key
    );
  }

  getInspirationIds() {
    const self = this.getLatest();
    return self.__inspirationIds;
  }

  setInspirationIds(inspirationIds: string[]) {
    const self = this.getWritable();
    self.__inspirationIds = inspirationIds;
  }

  addInspirationId(inspirationId: string) {
    const self = this.getWritable();
    self.__inspirationIds.push(inspirationId);
    this.addInspirationHandler();
  }

  addInspirationHandler() {
    this.__inspirationIds.forEach((inspirationId) => {
      const prevInspiration = readInspiration({
        inspirationId,
      });

      // if the inspiration exists, we re-add the node to it
      if (prevInspiration) {
        const newInspirationNodeKeys = new Set(prevInspiration.nodeKeys);
        newInspirationNodeKeys.add(this.__key);
        updateInspiration({
          inspirationId: inspirationId,
          updates: { nodeKeys: Array.from(newInspirationNodeKeys) },
        });
      }
      // we create a new inspiration if the previous one was deleted
      else {
        createInspiration({
          content: this.__text,
          templateId: this.__templateId,
          nodeKeys: [this.__key],
          prevInspirationId: inspirationId,
        });
      }
    });
  }

  deleteInspirationHandler(inspirationId: string) {}

  removeInspirationId(inspirationId: string) {
    const self = this.getWritable();
    self.__inspirationIds = self.__inspirationIds.filter(
      (id) => id !== inspirationId
    );
  }

  getTemplateId() {
    const self = this.getLatest();
    return self.__templateId;
  }

  setTemplateId(templateId: string) {
    const self = this.getWritable();
    self.__templateId = templateId;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);

    /**
     * if a node was created and has an inspiration id already,
     * it was created from a lexical undo action.
     */
    this.__inspirationIds.forEach((inspirationId) => {
      const prevInspiration = readInspiration({
        inspirationId,
      });

      // if the inspiration still exists, we re-add the node to it
      if (prevInspiration) {
        const newInspirationNodeKeys = new Set(prevInspiration.nodeKeys);
        newInspirationNodeKeys.add(this.__key);
        updateInspiration({
          inspirationId: inspirationId,
          updates: { nodeKeys: Array.from(newInspirationNodeKeys) },
        });
      }
      // we create a new inspiration if the previous one was deleted
      else {
        createInspiration({
          content: this.__text,
          templateId: this.__templateId,
          nodeKeys: [this.__key],
          prevInspirationId: inspirationId,
        });
      }
    });

    element.style.backgroundColor = this.__inspirationIds.length
      ? "yellow"
      : "";
    return element;
  }

  updateDOM(
    prevNode: InspirationTextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    const prevInspirationIds = new Set(prevNode.__inspirationIds);
    const currentInspirationsIds = new Set(this.__inspirationIds);

    // run updates every time the node is updated
    if (currentInspirationsIds.size) {
      currentInspirationsIds.forEach((inspirationId) => {
        if (prevInspirationIds.has(inspirationId)) return;
        const prevInspiration = readInspiration({
          inspirationId,
        });

        if (prevInspiration) {
          const newInspirationNodeKeys = new Set(prevInspiration.nodeKeys);
          newInspirationNodeKeys.add(this.__key);
          updateInspiration({
            inspirationId,
            updates: { nodeKeys: Array.from(newInspirationNodeKeys) },
          });
        } else {
          createInspiration({
            content: this.__text,
            templateId: this.__templateId,
            nodeKeys: [this.__key],
            prevInspirationId: inspirationId,
          });
        }
      });
      dom.style.backgroundColor = "yellow";
    }

    // we removed an inspiration id from this node, we need to remove it from the inspiration
    else if (prevInspirationIds.size > currentInspirationsIds.size) {
      prevInspirationIds.forEach((inspirationId) => {
        if (currentInspirationsIds.has(inspirationId)) return;
        const prevInspiration = readInspiration({
          inspirationId,
        });
        if (prevInspiration) {
          const newInspirationNodeKeys = new Set(prevInspiration.nodeKeys);
          newInspirationNodeKeys.delete(this.__key);
          updateInspiration({
            inspirationId: prevInspiration.id,
            updates: {
              nodeKeys: Array.from(newInspirationNodeKeys),
            },
          });
        } else {
          deleteInspiration({ inspirationId });
        }
      });
      dom.style.backgroundColor = "";
    }

    return isUpdated;
  }

  static importJSON(serializedNode: SerializedInspirationTextNode) {
    return $createInspirationTextNode(
      serializedNode.text,
      serializedNode.templateId,
      serializedNode?.inspirationIds
    );
  }

  exportJSON(): SerializedInspirationTextNode {
    return {
      ...super.exportJSON(),
      type: "inspiration-text",
      inspirationIds: this.__inspirationIds,
      templateId: this.__templateId,
    };
  }
}

export function $createInspirationTextNode(
  text: string,
  templateId: string,
  inspirationIds: string[],
  key?: NodeKey
): InspirationTextNode {
  return new InspirationTextNode(text, templateId, inspirationIds, key);
}

export function $isInspirationTextNode(
  node: LexicalNode | null | undefined
): node is InspirationTextNode {
  return node instanceof InspirationTextNode;
}
