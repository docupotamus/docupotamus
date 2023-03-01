/**
 * This module exports a set of classes for converting between DOM `Range`
 * objects and different types of selectors. It is mostly a thin wrapper around a
 * set of anchoring libraries. It serves two main purposes:
 *
 *  1. Providing a consistent interface across different types of anchors.
 *  2. Insulating the rest of the code from API changes in the underlying anchoring
 *     libraries.
 */

import { TextPosition, TextRange } from './text-range';
import { nodeFromXPath, xpathFromNode } from './xpath';

/**
 * @typedef {import('../../types/api').RangeSelector} RangeSelector
 */

/**
 * Converts between `RangeSelector` selectors and `Range` objects.
 */
export class RangeAnchor {
  /**
   * @param {Node} root - A root element from which to anchor.
   * @param {Range} range -  A range describing the anchor.
   */
  constructor(root, range) {
    this.root = root;
    this.range = range;
  }

  /**
   * @param {Node} root -  A root element from which to anchor.
   * @param {Range} range -  A range describing the anchor.
   */
  static fromRange(root, range) {
    return new RangeAnchor(root, range);
  }

  /**
   * Create an anchor from a serialized `RangeSelector` selector.
   *
   * @param {Element} root -  A root element from which to anchor.
   * @param {RangeSelector} selector
   */
  static fromSelector(root, selector) {
    const startContainer = nodeFromXPath(selector.startContainer, root);
    if (!startContainer) {
      throw new Error('Failed to resolve startContainer XPath');
    }

    const endContainer = nodeFromXPath(selector.endContainer, root);
    if (!endContainer) {
      throw new Error('Failed to resolve endContainer XPath');
    }

    const startPos = TextPosition.fromCharOffset(
      startContainer,
      selector.startOffset
    );
    const endPos = TextPosition.fromCharOffset(
      endContainer,
      selector.endOffset
    );

    const range = new TextRange(startPos, endPos).toRange();
    return new RangeAnchor(root, range);
  }

  toRange() {
    return this.range;
  }

  /**
   * @return {RangeSelector}
   */
  toSelector() {
    // "Shrink" the range so that it tightly wraps its text. This ensures more
    // predictable output for a given text selection.
    const normalizedRange = TextRange.fromRange(this.range).toRange();

    const textRange = TextRange.fromRange(normalizedRange);
    const startContainer = xpathFromNode(textRange.start.element, this.root);
    const endContainer = xpathFromNode(textRange.end.element, this.root);

    return {
      type: 'RangeSelector',
      startContainer,
      startOffset: textRange.start.offset,
      endContainer,
      endOffset: textRange.end.offset,
    };
  }
}
