# 247-252: Floating AI Ayan Assistant Widget

## Summary

Replaced the broken `<a class="ai-widget" href="/tools/">` global bottom‑right link with a self‑contained floating popup component. The old widget navigated away to /tools/ (工具页) — wrong behavior. The new widget opens an in‑page floating panel that reuses the existing rule‑based matching logic (ayan‑assistant‑rules.ts, computeScoreForTopic) with no API, no LLM, no localStorage, no privacy collection.

## Files Changed

| File | Change |
|------|--------|
| `src/components/FloatingAyanAssistant.astro` | **New** — self‑contained component: trigger button (no data‑lead‑cta) + popup panel + scoped styles + client‑side matching script |
| `src/layouts/BaseLayout.astro` | Import `FloatingAyanAssistant`; replace `<a class="ai-widget" href="/tools/">` with `<FloatingAyanAssistant />`; remove 2 blocks of dead `.ai‑widget` CSS |

## How It Works

1. **Trigger button** — fixed bottom‑right, pulse animation, click toggles popup
2. **Topic JSON injection** — `ayanAssistantData` hidden script (server‑rendered from ayan‑assistant‑rules.ts)
3. **computeScoreForTopic injection** — `window.ayanFloatingMatchFn` (client‑bundled from ayan‑assistant‑match.ts)
4. **User input** — textarea + submit → `buildScenarios(text)` → match against rules → display matched topic + direction buttons
5. **Direction buttons** — `[data‑ask]` with same convention as /ask/ page
6. **Fallback** — "没有直接匹配 / 换一个问题 / 浏览所有主题" buttons always visible
7. **Footer** — links to /ask/ (full assistant) and /survey/ (诊断)
8. **Mobile** — hidden ≤720px

## Key Decisions

- `<button>` without `data‑lead‑cta` → not caught by BaseLayout CTA script
- Topic rules reused by value (server JSON injection) — no import dependency in client bundle
- Existing `ayan‑assistant‑match.ts` reused via `?client` param and `window.ayanFloatingMatchFn`
- Hidden div JSON approach for topics — avoids duplicating the heavy import in client JS
- No `<form>` / `localStorage` / `fetch` — fully static
- i18n key mapping for direction buttons parsed client‑side from `data‑ask`

## Verification

- `npm run build`: ✅ 57 pages, Pagefind 3 filters
- `npm run seo:audit`: ✅ 456 pass, 0 fail
- `npm run images:check`: ✅ 49 manifest items, 0 missing/duplicate/orphans
- No new dependencies, no new routes, no existing page modifications
