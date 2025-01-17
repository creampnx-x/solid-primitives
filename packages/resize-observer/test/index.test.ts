import { describe, test, expect } from "vitest";
import { createRoot, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { createResizeObserver, getElementSize, getWindowSize } from "../src";

const div1 = document.createElement("div");
const div2 = document.createElement("div");
const div3 = document.createElement("div");

let _targets: Set<Element>;
let disconnect_count = 0;
class TestResizeObserver {
  _targets: Set<Element>;
  constructor(callback: ResizeObserverCallback) {
    this._targets = _targets;
  }
  observe(target: Element, options?: ResizeObserverOptions): void {
    this._targets.add(target);
  }
  unobserve(target: Element): void {
    this._targets.delete(target);
  }
  disconnect() {
    disconnect_count++;
  }
}
global.ResizeObserver = TestResizeObserver;

describe("createResizeObserver", () => {
  test("disposes on cleanup", () =>
    createRoot(dispose => {
      _targets = new Set<Element>();
      createResizeObserver(div1, () => {});
      expect(disconnect_count).toBe(0);
      dispose();
      expect(disconnect_count).toBe(1);
    }));

  test("adds initial target", () =>
    createRoot(dispose => {
      const targets = (_targets = new Set<Element>());
      createResizeObserver(div1, () => {});
      expect(targets.size).toBe(1);
      expect(targets.has(div1)).toBeTruthy();
      dispose();
    }));

  test("adds initial targets", () =>
    createRoot(dispose => {
      const targets = (_targets = new Set<Element>());
      createResizeObserver([div1, div2], () => {});
      expect(targets.size).toBe(2);
      expect(targets.has(div1)).toBeTruthy();
      expect(targets.has(div2)).toBeTruthy();
      dispose();
    }));

  test("observes signal targets", () =>
    createRoot(dispose => {
      const targets = (_targets = new Set<Element>());
      const [refs, setRefs] = createSignal([div1]);
      createResizeObserver(refs, () => {});
      expect(targets.size, "targets shouldn't be connected synchronously").toBe(0);
      queueMicrotask(() => {
        expect(targets.size).toBe(1);
        expect(targets.has(div1)).toBeTruthy();

        setRefs([div2, div3]);
        queueMicrotask(() => {
          expect(targets.size).toBe(2);
          expect(targets.has(div2)).toBeTruthy();
          expect(targets.has(div3)).toBeTruthy();

          dispose();
        });
      });
    }));

  test("observes store top-level targets", () =>
    createRoot(dispose => {
      const targets = (_targets = new Set<Element>());
      const [refs, setRefs] = createStore([div1]);
      createResizeObserver(refs, () => {});
      expect(targets.size, "targets shouldn't be connected synchronously").toBe(0);
      queueMicrotask(() => {
        expect(targets.size).toBe(1);
        expect(targets.has(div1)).toBeTruthy();

        setRefs([div2, div3]);
        queueMicrotask(() => {
          expect(targets.size).toBe(2);
          expect(targets.has(div2)).toBeTruthy();
          expect(targets.has(div3)).toBeTruthy();

          dispose();
        });
      });
    }));
});

describe("getWindowSize", () => {
  test("returns window size", () => {
    // values predefined by jsdom
    expect(getWindowSize()).toEqual({ width: 1024, height: 768 });
  });
});

describe("getElementSize", () => {
  test("returns window size", () => {
    expect(getElementSize(div1)).toEqual({ width: 0, height: 0 });
    expect(getElementSize(undefined)).toEqual({ width: null, height: null });
  });
});
