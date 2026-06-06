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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isUnlocked(_folder: string): boolean {
  return true;
}
