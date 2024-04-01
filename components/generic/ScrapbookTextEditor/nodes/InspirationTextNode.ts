import { readInspiration, updateInspiration } from "@/jotai/inspirations/utils";
import {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  TextNode,
} from "lexical";

export type SerializedInspirationTextNode = SerializedTextNode & {
  inspirationId?: string;
};

export class InspirationTextNode extends TextNode {
  __inspirationId?: string;

  constructor(text: string, inspirationId?: string, key?: NodeKey) {
    super(text, key);
    this.__inspirationId = inspirationId;
  }

  static getType(): string {
    return "inspiration-text";
  }

  static clone(node: InspirationTextNode): InspirationTextNode {
    return new InspirationTextNode(
      node.__text,
      node.__inspirationId,
      node.__key
    );
  }

  getInspirationId() {
    const self = this.getLatest();
    return self.__inspirationId;
  }

  setInspirationId(inspirationId: string | undefined) {
    const self = this.getWritable();
    self.__inspirationId = inspirationId;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    if (this.__inspirationId) {
      element.style.backgroundColor = "yellow";
      element.dataset.inspirationId = this.__inspirationId;
      const prevInspiration = readInspiration({
        inspirationId: this.__inspirationId,
      });
      if (prevInspiration)
        updateInspiration({
          inspirationId: this.__inspirationId,
          updates: { nodeKeys: [...prevInspiration.nodeKeys, this.__key] },
        });
    } else {
      delete element.dataset.inspirationId;
      element.style.backgroundColor = "";
    }
    return element;
  }

  updateDOM(
    prevNode: InspirationTextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__inspirationId !== this.__inspirationId) {
      console.log("inspiration id changed");
      if (this.__inspirationId) {
        dom.style.backgroundColor = "yellow";
        dom.dataset.inspirationId = this.__inspirationId;
        const prevInspiration = readInspiration({
          inspirationId: this.__inspirationId,
        });
        if (prevInspiration)
          updateInspiration({
            inspirationId: this.__inspirationId,
            updates: { nodeKeys: [...prevInspiration.nodeKeys, this.__key] },
          });
        console.log("added inspiration id");
      } else {
        delete dom.dataset.inspirationId;
        const prevInspiration = readInspiration({
          inspirationId: prevNode.__inspirationId ?? "",
        });
        console.log(prevInspiration);
        if (prevInspiration)
          updateInspiration({
            inspirationId: prevInspiration.id,
            updates: {
              nodeKeys: prevInspiration.nodeKeys.filter(
                (key) => key !== prevNode.__key
              ),
            },
          });
        dom.style.backgroundColor = "";
        console.log("deleted inspiration id");
      }
    }
    return isUpdated;
  }

  static importJSON(serializedNode: SerializedInspirationTextNode) {
    return $createInspirationTextNode(
      serializedNode.text,
      serializedNode?.inspirationId
    );
  }

  exportJSON(): SerializedInspirationTextNode {
    return {
      ...super.exportJSON(),
      type: "inspiration-text",
      inspirationId: this.__inspirationId,
    };
  }
}

export function $createInspirationTextNode(
  text: string,
  inspirationId?: string,
  key?: NodeKey
): InspirationTextNode {
  return new InspirationTextNode(text, inspirationId, key);
}

export function $isInspirationTextNode(
  node: LexicalNode | null | undefined
): node is InspirationTextNode {
  return node instanceof InspirationTextNode;
}
