import { LESSONS } from "./lessons";

const KEY = "afs_progress";

export function getCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function markComplete(folder: string): Set<string> {
  const completed = getCompleted();
  completed.add(folder);
  try { localStorage.setItem(KEY, JSON.stringify([...completed])); } catch {}
  return completed;
}

export function isUnlocked(folder: string): boolean {
  const idx = LESSONS.findIndex(l => l.folder === folder);
  if (idx <= 0) return true;
  return getCompleted().has(LESSONS[idx - 1].folder);
}
