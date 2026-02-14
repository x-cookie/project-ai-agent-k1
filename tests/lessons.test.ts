import { describe, it, expect } from "vitest";
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
});

describe("STAGES", () => {
  it("has 3 stages", () => {
    expect(STAGES).toHaveLength(3);
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
});

describe("getLessonIndex", () => {
  it("returns correct index", () => {
    expect(getLessonIndex("01_intro")).toBe(0);
    expect(getLessonIndex("14_chain-of-thought")).toBe(13);
  });
});
