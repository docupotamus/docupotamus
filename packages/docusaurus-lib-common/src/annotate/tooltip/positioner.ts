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

// Gap between the selection and the arrow.
const ARROW_GAP: number = 20;

interface Positioner {
    position: (selectionRect: DOMRect, isRtlSelection: boolean) => Position;
};

enum ArrowDirection {
    // Position the tooltip below the selection with the arrow pointing upwards.
    Up = 'up',

    // Position the tooltip above the selection with the arrow pointing
    // downwards.
    Down = 'down',
};

interface Position {
    // Horizontal offset from left edge of viewport.
    readonly left: number;

    // Vertical offset from top edge of viewport.
    readonly top: number;

    // Max z-index.
    readonly zIndex: number;

    // Direction the tooltip's arrow should be pointing. The tooltip's position
    // relative to the selection is the opposite of this.
    readonly arrowDirection: ArrowDirection;
};

// Positions the tooltip at the top-center edge of the selection.
export class SelectionTopCenterPositioner implements Positioner {
    private arrowGap: number;

    constructor(arrowGap: number = ARROW_GAP) {
        this.arrowGap = arrowGap;
    }

    /**
     *
     * Calculate the XYZ viewport coordinates for the tooltip's position.
     * 
     * The direction of its arrow is always down.
     */
    position(selectionRect: DOMRect): Position {
        const { x, y, width } = selectionRect;
        const left = x + width / 2;
        // TODO: Fix incorrect position when selecting LTR vs. RTL.
        // TODO: Fix incorrect position when selecting across multiple nodes.
        const top = y + window.scrollY - this.arrowGap;
        // Fallback to an arbitrary large number (2^15).
        const zIndex = 32768;
        return {
            left,
            top,
            zIndex,
            arrowDirection: ArrowDirection.Down,
        };
    }
};
