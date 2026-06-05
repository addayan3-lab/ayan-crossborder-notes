# 252B: Floating Assistant Visual Polish

## Changes
- `src/components/FloatingAyanAssistant.astro`: Added `trigger.style.display = "none"` on panel open, `trigger.style.display = ""` on panel close

## Verification

| Check | Result |
|-------|--------|
| `npm run build` | ✅ 57 pages, Pagefind 3 filters |
| `npm run seo:audit` | ✅ 456 pass / 0 fail |
| `npm run images:check` | ✅ 49 items, 0 missing, 0 duplicate, 0 orphan |

## Behavior
- Page load: trigger button visible, panel hidden ✅
- Click trigger: panel opens, trigger hidden ✅
- Click close / outside: panel closes, trigger reappears ✅
- Input / quick questions / result display: unchanged ✅
- /ask/ and /survey/ footer links: unchanged ✅
- Mobile ≤720px: entire wrap hidden (unchanged) ✅

## Constraints
- No API ❌ (not used)
- No LLM ❌ (not used)
- No form submission ❌
- No privacy collection ❌
- No localStorage ❌
- No article body changes ❌
- No new articles ❌
- No commit ❌
- No push ❌
