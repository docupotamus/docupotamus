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

import { ListenerCollection } from './utils/listener-collection';
import { getSelectionRange } from './utils/range';

/**
 * An observer that watches for and buffers changes to the document's current selection.
 */
export class SelectionObserver {
    /**
     * Start observing changes to the current selection in the document.
     *
     * @param {(range: Range|null) => void} callback -
     *   Callback invoked with the selected region of the document when it has
     *   changed.
     * @param {Document} document_ - Test seam
     */
    constructor(callback, document_ = document) {
        let isMouseDown = false;

        this._pendingCallback = null;

        const scheduleCallback = (delay = 10) => {
            this._pendingCallback = setTimeout(() => {
                callback(getSelectionRange(document_));
            }, delay);
        };

        /** @param {Event} event */
        const eventHandler = event => {
            if (event.type === 'mousedown') {
                isMouseDown = true;
            }
            if (event.type === 'mouseup') {
                isMouseDown = false;
            }

            // If the user makes a selection with the mouse, wait until they release
            // it before reporting a selection change.
            if (isMouseDown) {
                return;
            }

            this._cancelPendingCallback();

            // Schedule a notification after a short delay. The delay serves two
            // purposes:
            //
            // - If this handler was called as a result of a 'mouseup' event then the
            //   selection will not be updated until the next tick of the event loop.
            //   In this case we only need a short delay.
            //
            // - If the user is changing the selection with a non-mouse input (eg.
            //   keyboard or selection handles on mobile) this buffers updates and
            //   makes sure that we only report one when the update has stopped
            //   changing. In this case we want a longer delay.

            const delay = event.type === 'mouseup' ? 10 : 100;
            scheduleCallback(delay);
        };

        this._document = document_;
        this._listeners = new ListenerCollection();

        this._listeners.add(document_, 'selectionchange', eventHandler);

        // Mouse events are handled on the body because propagation may be stopped
        // before they reach the document in some environments (eg. VitalSource).
        this._listeners.add(document_.body, 'mousedown', eventHandler);
        this._listeners.add(document_.body, 'mouseup', eventHandler);

        // Report the initial selection.
        scheduleCallback(1);
    }

    disconnect() {
        this._listeners.removeAll();
        this._cancelPendingCallback();
    }

    _cancelPendingCallback() {
        if (this._pendingCallback) {
            clearTimeout(this._pendingCallback);
            this._pendingCallback = null;
        }
    }
}
