// Single source of truth for scoring logic.
// Both server (ayan-assistant-rules.ts) and client (ask/index.astro)
// use this function. Changes to scoring weights, keyword tiers, or
// matching logic must only be made here.

export function computeScoreForTopic(query: string, keywords: string[], strongKeywords: string[]) {
  const q = query.toLowerCase()
  let score = 0
  for (const kw of keywords) {
    if (q.includes(kw.toLowerCase())) {
      score += kw.length
    }
  }
  for (const kw of strongKeywords) {
    if (q.includes(kw.toLowerCase())) {
      score += kw.length * 100
    }
  }
  return score
}
