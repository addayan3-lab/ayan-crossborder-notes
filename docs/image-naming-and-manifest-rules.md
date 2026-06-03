# 统一图片命名与 Manifest 规则

## 1. 目录规范

### 文章图片
```
public/images/articles/{slug}/cover.{svg|png}
public/images/articles/{slug}/guide.{svg|png}        # 操作指南图（可选）
public/images/articles/{slug}/table-{n}.{svg|png}     # 数据表图（可选）
```

### 资源中心图片
```
public/images/resources/{slug}/cover.svg
```

### 公开课图片
```
public/images/open-class/{slug}/cover.svg
public/images/open-class/{slug}/hero.svg              # 课程场景图（可选）
```

### 专题封面（全局）
```
public/images/covers/cover-{topic}.svg
```

### 通用配图（article-assets）
```
public/images/article-assets/{topic}/{id}.svg
```

### 生成式信息图（旧系统，建议冻结）
```
public/images/generated-infographics/{slug}/{type}.svg
```

## 2. Manifest ID 命名规则

格式：`{topic}-{detail}-{nn}`

| 类别 | 格式 | 示例 |
|------|------|------|
| 文章封面 | `cover-{slug}` | `cover-keyword-learning-path` |
| 资源页面 | `res-{slug}` | `res-keyword-cleaning-sheet` |
| 公开课页面 | `oc-{slug}` | `oc-keyword-to-listing` |
| 专题封面 | `topic-{topic}` | `topic-keyword` |
| 通用配图 | `{topic}-{type}-{nn}` | `ppc-dashboard-01` |

## 3. Alt 文案规则

- 中文描述
- 简明扼要（15 字以内）
- 包含页面主题关键词
- 不重复文章标题
- 不包含"图"字结尾

示例：
- ✅ `亚马逊关键词学习路径导览图`
- ✅ `新品 PPC 首周广告节奏示意图`
- ❌ `图1：关键词`
- ❌ `这是关于关键词学习的图片`

## 4. 图片尺寸建议

| 用途 | 尺寸 | 格式 |
|------|------|------|
| 文章 cover（OG 图） | 1200×630px | SVG / PNG |
| 文章内配图 | 800×450px | SVG / WebP |
| 资源页封面 | 400×400px | SVG |
| 公开课 hero | 600×400px | SVG |
| 专题封面 | 1200×630px | SVG |
| 通用配图 | 800×600px | SVG |

## 5. SVG / PNG / WebP 使用边界

| 格式 | 适用场景 | 禁用场景 |
|------|---------|---------|
| **SVG** | 信息图、流程图、架构图、图标、封面 — **首选** | 照片、复杂渐变 |
| **PNG** | 截图、UI 展示 | 封面、图标、文字为主的内容 |
| **WebP** | 需要透明通道的大图 | 浏览器兼容性不确定时 |

## 6. 不允许的情况

- ❌ **中文文件名** — 必须全英文小写 + 连字符
- ❌ **文件名含空格** — 必须用连字符 `-`
- ❌ **manifest 重复 id** — id 必须在 manifest 中唯一
- ❌ **图片存在但未入 manifest** — 所有 `public/images/` 下的图片必须注册到 manifest（全局图片除外，如 og-default.svg）
- ❌ **manifest 有记录但文件缺失** — 删除 manifest 条目或补图片
- ❌ **图片路径含大写字母** — 全小写
- ❌ **manifest 中 path 不以 `/` 开头** — 必须统一 `/{dir}/{subdir}/{file}` 格式

## 7. 例外说明

以下全局图片不需要入 manifest：
- `public/images/og-default.svg`
- `public/images/hero-pattern.svg`
- `public/images/ayan-avatar.png`
- `public/images/ayan-hero.png`
