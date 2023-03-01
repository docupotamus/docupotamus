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
 * @typedef Listener
 * @prop {EventTarget} eventTarget
 * @prop {string} eventType
 * @prop {(event: Event) => void} listener
 */

/**
 * Return the event type that a listener will receive.
 *
 * For example `EventType<HTMLElement, 'keydown'>` evaluates to `KeyboardEvent`.
 *
 * The event type is extracted from the target's `on${Type}` property (eg.
 * `HTMLElement.onkeydown` here) If there is no such property, the type defaults
 * to `Event`.
 *
 * @template {EventTarget} Target
 * @template {string} Type
 * @typedef {`on${Type}` extends keyof Target ?
 *   Target[`on${Type}`] extends ((...args: any[]) => void)|null ?
 *     Parameters<NonNullable<Target[`on${Type}`]>>[0]
 *  : Event : Event} EventType
 */

/**
 * Utility that provides a way to conveniently remove a set of DOM event
 * listeners when they are no longer needed.
 */
export class ListenerCollection {
  constructor() {
    /** @type {Map<Symbol, Listener>} */
    this._listeners = new Map();
  }

  /**
   * Add a listener and return an ID that can be used to remove it later
   *
   * @template {string} Type
   * @template {EventTarget} Target
   * @param {Target} eventTarget
   * @param {Type} eventType
   * @param {(event: EventType<Target, Type>) => void} listener
   * @param {AddEventListenerOptions} [options]
   */
  add(eventTarget, eventType, listener, options) {
    eventTarget.addEventListener(
      eventType,
      /** @type {EventListener} */ (listener),
      options
    );
    const symbol = Symbol();
    this._listeners.set(symbol, {
      eventTarget,
      eventType,
      // eslint-disable-next-line object-shorthand
      listener: /** @type {EventListener} */ (listener),
    });
    return symbol;
  }

  /**
   * Remove a specific listener.
   *
   * @param {Symbol} listenerId
   */
  remove(listenerId) {
    const event = this._listeners.get(listenerId);
    if (event) {
      const { eventTarget, eventType, listener } = event;
      eventTarget.removeEventListener(eventType, listener);
      this._listeners.delete(listenerId);
    }
  }

  removeAll() {
    this._listeners.forEach(({ eventTarget, eventType, listener }) => {
      eventTarget.removeEventListener(eventType, listener);
    });
    this._listeners.clear();
  }
}
