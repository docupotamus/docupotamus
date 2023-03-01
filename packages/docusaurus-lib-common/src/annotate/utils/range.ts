// Released under the 2-Clause BSD license, copied from:
// https://github.com/hypothesis/client
//
// Copyright (c) 2013-2019 Hypothes.is Project and contributors
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Return the current selection, or null if there is no selection or if the
 * selection is empty.
 */
export const getSelectionRange = (document: Document): Range | null => {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) {
        return null;
    }
    const range = selection.getRangeAt(0);
    if (range.collapsed) {
        return null;
    }
    return range;
};

/**
 * Returns true if the start point of a selection occurs after the end point,
 * in document order.
 */
const isSelectionBackwards = (selection: Selection): boolean => {
    if (selection.focusNode === selection.anchorNode) {
        return selection.focusOffset < selection.anchorOffset;
    }
    const range = selection.getRangeAt(0);
    // Does not work correctly on iOS when selecting nodes backwards.
    // See: https://bugs.webkit.org/show_bug.cgi?id=220523
    return range.startContainer === selection.focusNode;
};

/**
 * Returns true if any part of node lies within range.
 */
export const rangeContainsNode = (range: Range, node: Node): boolean => {
    try {
        const length = node.nodeValue?.length ?? node.childNodes.length;
        const nodeStartIsBeforeRangeEnd = range.comparePoint(node, 0) <= 0;
        const nodeEndIsAfterRangeStart = range.comparePoint(node, length) >= 0;
        return nodeStartIsBeforeRangeEnd && nodeEndIsAfterRangeStart;
    } catch (e) {
        // Range.comparePoint fails if the range and node do not share an
        // ancestor or if node is a DOCUMENT_TYPE_NODE.
        return false;
    }
};

/**
 * Iterate over all Node(s) which overlap range in document order and invoke
 * callback for each of them.
 */
const forEachNodeInRange = (range: Range, callback: (node: Node) => void) => {
    const root = range.commonAncestorContainer;
    const nodeIter = (root.ownerDocument ?? document).createNodeIterator(
        root,
        NodeFilter.SHOW_ALL,
    );

    let currentNode;
    while (currentNode = nodeIter.nextNode()) {
        if (rangeContainsNode(range, currentNode)) {
            callback(currentNode);
        }
    }
};

/**
 * Returns the bounding rectangles of non-whitespace text nodes in range.
 */
const getTextBoundingBoxes = (range: Range): Array<DOMRect> => {
    const whitespaceOnly = /^\s*$/;
    const textNodes: Text[] = [];
    forEachNodeInRange(range, node => {
        // TODO(dnguyen0304): Fix usage of non-null assertion operator.
        if (
            node.nodeType === Node.TEXT_NODE &&
            !(/** @type {string} */ (node.textContent!).match(whitespaceOnly))
        ) {
            textNodes.push(node as Text);
        }
    });

    let rects: DOMRect[] = [];
    textNodes.forEach(node => {
        const nodeRange = node.ownerDocument.createRange();
        nodeRange.selectNodeContents(node);
        if (node === range.startContainer) {
            nodeRange.setStart(node, range.startOffset);
        }
        if (node === range.endContainer) {
            nodeRange.setEnd(node, range.endOffset);
        }
        if (nodeRange.collapsed) {
            // If the range ends at the start of this text node or starts at the
            // end of this node then do not include it.
            return;
        }
        // Measure the range and translate from viewport to document
        // coordinates.
        const viewportRects = Array.from(nodeRange.getClientRects());
        nodeRange.detach();
        rects = rects.concat(viewportRects);
    });
    return rects;
};

/**
 * Returns the rectangle, in viewport coordinates, for the line of text
 * containing the focus point of a Selection.
 *
 * Returns null if the selection is empty.
 */
export const selectionFocusRect = (selection: Selection): DOMRect | null => {
    if (selection.isCollapsed) {
        return null;
    }
    const textBoxes = getTextBoundingBoxes(selection.getRangeAt(0));
    if (textBoxes.length === 0) {
        return null;
    }
    if (isSelectionBackwards(selection)) {
        return textBoxes[0] ?? null;
    } else {
        return textBoxes[textBoxes.length - 1] ?? null;
    }
};
