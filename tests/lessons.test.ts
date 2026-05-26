import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { LESSONS, STAGES, getLessonByFolder, getLessonIndex } from "../src/lib/lessons";

describe("LESSONS", () => {
  it("has 14 lessons", () => {
    expect(LESSONS).toHaveLength(14);
  });

  it("lesson numbers are sequential from 1", () => {
    LESSONS.forEach((l, i) => expect(l.num).toBe(i + 1));
  });

  it("each lesson has required fields", () => {
    for (const l of LESSONS) {
      expect(l.id).toBeTruthy();
      expect(l.title).toBeTruthy();
      expect(l.tag).toBeTruthy();
      expect(l.keys.length).toBeGreaterThan(0);
      expect(["fundamentals", "agent-patterns", "advanced-reasoning"]).toContain(l.stage);
    }
  });

  it("folder names match expected pattern", () => {
    for (const l of LESSONS) {
      expect(l.folder).toMatch(/^\d{2}_/);
    }
  });

  it("each stage has the right lesson count", () => {
    expect(LESSONS.filter(l => l.stage === "fundamentals")).toHaveLength(6);
    expect(LESSONS.filter(l => l.stage === "agent-patterns")).toHaveLength(4);
    expect(LESSONS.filter(l => l.stage === "advanced-reasoning")).toHaveLength(4);
  });

  it("no duplicate lesson numbers", () => {
    const nums = LESSONS.map(l => l.num);
    expect(new Set(nums).size).toBe(nums.length);
  });

  it("no duplicate folder names", () => {
    const folders = LESSONS.map(l => l.folder);
    expect(new Set(folders).size).toBe(folders.length);
  });
});

describe("STAGES", () => {
  it("has 3 stages", () => {
    expect(STAGES).toHaveLength(3);
  });

  it("stage nums are two-digit strings", () => {
    for (const s of STAGES) {
      expect(s.num).toMatch(/^\d{2}$/);
    }
  });
});

describe("getLessonByFolder", () => {
  it("returns lesson for valid folder", () => {
    const l = getLessonByFolder("01_intro");
    expect(l?.title).toBe("Introduction");
  });

  it("returns undefined for unknown folder", () => {
    expect(getLessonByFolder("99_unknown")).toBeUndefined();
  });

  it("finds the last lesson by folder", () => {
    const l = getLessonByFolder("14_chain-of-thought");
    expect(l?.num).toBe(14);
  });
});

describe("getLessonIndex", () => {
  it("returns correct index", () => {
    expect(getLessonIndex("01_intro")).toBe(0);
    expect(getLessonIndex("14_chain-of-thought")).toBe(13);
  });

  it("returns -1 for unknown folder", () => {
    expect(getLessonIndex("99_unknown")).toBe(-1);
  });
});

describe("progress logic (pure)", () => {
  it("first lesson is always index 0", () => {
    expect(getLessonIndex(LESSONS[0].folder)).toBe(0);
  });

  it("next lesson index is prev + 1", () => {
    for (let i = 0; i < LESSONS.length - 1; i++) {
      expect(getLessonIndex(LESSONS[i + 1].folder)).toBe(i + 1);
    }
  });
});
