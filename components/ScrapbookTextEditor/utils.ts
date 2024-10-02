import { $isRangeSelection, BaseSelection } from "lexical";
import { $isInspirationTextNode } from "./nodes/InspirationTextNode";
import { createInspiration } from "@/jotai/inspirations/utils";

export const $unsetSelectionInspirationId = (selection: BaseSelection) => {
  const selectedNodes = selection.getNodes();
  selectedNodes.forEach((node) => {
    if ($isInspirationTextNode(node)) {
      node.setInspirationIds([]);
    }
  });
};

export const $setSelectionInspirationId = (
  selection: BaseSelection,
  templateId: string
) => {
  const inspirationId = createInspiration({
    nodeKeys: [],
    templateId,
    content: selection.getTextContent(),
  });
  if (!inspirationId) return;
  const selectedNodes = selection.getNodes();
  const selectedNodesLength = selectedNodes.length;
  const anchorAndFocus = selection.getStartEndPoints();
  if (anchorAndFocus === null) {
    return;
  }
  const [anchor, focus] = anchorAndFocus;

  const lastIndex = selectedNodesLength - 1;
  let firstNode = selectedNodes[0];
  let lastNode = selectedNodes[lastIndex];

  if (selection.isCollapsed() && $isRangeSelection(selection)) {
    return;
  }

  const firstNodeText = firstNode.getTextContent();
  const firstNodeTextLength = firstNodeText.length;
  const focusOffset = focus.offset;
  let anchorOffset = anchor.offset;
  const isBefore = anchor.isBefore(focus);
  let startOffset = isBefore ? anchorOffset : focusOffset;
  let endOffset = isBefore ? focusOffset : anchorOffset;
  const startType = isBefore ? anchor.type : focus.type;
  const endType = isBefore ? focus.type : anchor.type;
  const endKey = isBefore ? focus.key : anchor.key;

  // This is the case where the user only selected the very end of the
  // first node so we don't want to include it in the formatting change.
  if (
    $isInspirationTextNode(firstNode) &&
    startOffset === firstNodeTextLength
  ) {
    const nextSibling = firstNode.getNextSibling();

    if ($isInspirationTextNode(nextSibling)) {
      // we basically make the second node the firstNode, changing offsets accordingly
      anchorOffset = 0;
      startOffset = 0;
      firstNode = nextSibling;
    }
  }

  // This is the case where we only selected a single node
  if (selectedNodes.length === 1) {
    if ($isInspirationTextNode(firstNode)) {
      startOffset =
        startType === "element"
          ? 0
          : anchorOffset > focusOffset
          ? focusOffset
          : anchorOffset;
      endOffset =
        endType === "element"
          ? firstNodeTextLength
          : anchorOffset > focusOffset
          ? anchorOffset
          : focusOffset;

      // No actual text is selected, so do nothing.
      if (startOffset === endOffset) {
        return;
      }

      // The entire node is selected, so just format it
      if (startOffset === 0 && endOffset === firstNodeTextLength) {
        firstNode.addInspirationId(inspirationId);
        firstNode.select(startOffset, endOffset);
      } else {
        // The node is partially selected, so split it into two nodes
        // and style the selected one.
        const splitNodes = firstNode.splitText(startOffset, endOffset);
        const replacement = startOffset === 0 ? splitNodes[0] : splitNodes[1];
        if ($isInspirationTextNode(replacement)) {
          replacement.addInspirationId(inspirationId);
          replacement.select(0, endOffset - startOffset);
        }
      }
    } // multiple nodes selected.
  } else {
    if (
      $isInspirationTextNode(firstNode) &&
      startOffset < firstNode.getTextContentSize()
    ) {
      if (startOffset !== 0) {
        // the entire first node isn't selected, so split it
        firstNode = firstNode.splitText(startOffset)[1];
        startOffset = 0;
        anchor.set(firstNode.getKey(), startOffset, "text");
      }
      if ($isInspirationTextNode(firstNode)) {
        firstNode.addInspirationId(inspirationId);
      }
    }

    if ($isInspirationTextNode(lastNode)) {
      const lastNodeText = lastNode.getTextContent();
      const lastNodeTextLength = lastNodeText.length;

      // The last node might not actually be the end node
      //
      // If not, assume the last node is fully-selected unless the end offset is
      // zero.
      if (lastNode.__key !== endKey && endOffset !== 0) {
        endOffset = lastNodeTextLength;
      }

      // if the entire last node isn't selected, split it
      if (endOffset !== lastNodeTextLength) {
        [lastNode] = lastNode.splitText(endOffset);
      }

      if (endOffset !== 0 || endType === "element") {
        if ($isInspirationTextNode(lastNode)) {
          lastNode.addInspirationId(inspirationId);
        }
      }
    }

    // style all the text nodes in between
    for (let i = 1; i < lastIndex; i++) {
      const selectedNode = selectedNodes[i];
      const selectedNodeKey = selectedNode.getKey();

      if (
        $isInspirationTextNode(selectedNode) &&
        selectedNodeKey !== firstNode.getKey() &&
        selectedNodeKey !== lastNode.getKey() &&
        !selectedNode.isToken()
      ) {
        selectedNode.addInspirationId(inspirationId);
      }
    }
  }
};
