# CHANGELOG — 高玉企業 進階ERP

---

## 2026-06-07（更新 28）— 跨裝置支援（Mac/iPad/iPhone）

- **補 viewport**：採購下單/台幣價審核/公式檢視/現金流原本缺 viewport → 補上，iPad/iPhone 不再整頁縮小
- **成本工具上 Netlify**（Tina 決定，跨裝置）：`台幣價審核.html`、`台幣公式設定檢視.html` + 含 Tina 全部 tab 的 index.html 推上 github/Netlify
  - Tina 可在 iPad/iPhone 登入用手動給價/看公式；tab 僅 tina_huang，業務帳號看不到
  - ⚠️ 原始檔可被直接抓（同成本利潤報表，已接受）；compute_twd 重生後需 push 才更新 Netlify
- 裝置現況：iPad 全順；iPhone 可用（寬表格需橫向滑，完整手機版表格為後續工程）

---

## 2026-06-07（更新 27）— 資料夾整理

- 刪 .DS_Store ×6、孤兒舊靜態DB ×3（歷史版本內）
- products 備份保留最新 2（刪 4 舊）、提案JSON 保留最新 1
- **修正資料夾編號重複**：`04_台幣審核` → `05_台幣審核`（compute_twd.py REVIEW_DIR 同步更新）
- 根目錄資料夾現為 01-05 唯一編號 + data/github/兩個xlsx主檔
- 歷史版本維持 28（訂單分析14+現金流14，rebuild_html 自動管理）

---

## 2026-06-06（更新 26）

### 台幣公式改為「設定表驅動」— 改公式/加廠商只動一張表

把 Feast/Europastry/VIRU 三家寫死的公式，重構成**參數設定表** `data/twd_formula_config.json`。
- compute_twd.py 改用**通用公式**讀設定表計算（cost_basis EXW/FOB/CIF、匯率、運費、TDS%、關稅%、VAT%、冷凍倉儲、內陸pct/fixed、貼標、利潤%）
- **改公式** = 改表裡數字；**新廠商** = 加一筆（key=供應商編號）→ 自動套用，不必改程式
- 已驗證設定表算出的值與原公式完全一致（吉拿棒138.02、VIRU藍莓118.66、Europastry佛卡夏86.0）

未來維護台幣公式只需編輯 `twd_formula_config.json` 一處，徹底解決公式散落。

**新增唯讀檢視頁** `01_交付_HTML/台幣公式設定檢視.html`：清楚顯示各供應商參數 + 白話公式
（如 Feast：成本EXW→加海運費→加TDS8%→×37→加關稅25%→…→÷(1−25%)）。
Tina 只看不改，要改公式/加廠商直接告訴 Claude。由 compute_twd.py 一併產生。內部頁，不上 GitHub。

**入口加連結（僅 Tina Huang）**：本機 index.html 的 `tina_huang.systems` 加了
「🌐 國際採購下單」「🧮 台幣價審核」「📐 台幣公式設定」三個 tab；tina_kao / noah_tseng 沒有。
⚠️ **本機 index.html 與 cost 頁僅本機+Resilio，不推 github**（github/Netlify 的 index 不含這些 tab，
公開站看不到、原始檔也不在站上）。→ 本機=管理層含成本工具；github/Netlify=業務公開層。

---

## 2026-06-06（更新 25）

### 國際採購下單系統：新增「自行下單」+ 修復 const PRODS 格式 bug

**① 修復 bug（重要）**：更新19 把採購系統加進 sync 時，誤把中文鍵的 products_final 直接注入 `const PRODS`，但該頁 JS 用英文鍵（p.ean/zh/en/spec/pcs/plt/cost/cur/inc/sup/code），導致 matchProd 失效（PO 抓不到規格/成本）。
- 修正 `sync_html_data.py` Step 5：注入前**轉成英文鍵格式**
- ⚠️ 採購系統 const PRODS 必須是英文鍵，勿改回中文鍵

**② 新增「自行下單」功能**（國際採購下單系統.html）：
- 原本只能帶入業務報價系統匯出的訂單；現在多一個手動建單面板
- 選客戶 + 搜尋產品（中/英/EAN/供應商）加入 + 填箱數 → 「產生採購PO」
- 重用既有 buildAllPO 引擎：自動依供應商分組、matchProd 補規格/成本、多供應商自動分多份PO
- 用途：有些客戶訂單不會進系統，可手動開採購單

已驗證資料流（自行下單→PO 規格/成本/金額正確）+ sync 不會洗掉手動功能。

---

## 2026-06-06（更新 24）

### 台幣價自動計算 + 人機審核流程（補上成本主檔連動缺口）

把 Feast/Europastry/VIRU 的台幣公式做成自動化，**改成本後自動算建議價、Tina 打V審核/修正、才寫回 products_final.json**。

**新增 3 件：**
- `03_腳本/compute_twd.py`：對「公式」品項套各自公式算建議台幣價 → 產生審核頁 `01_交付_HTML/台幣價審核.html`（不直接寫主檔）；**跳過手動成交價**
- `01_交付_HTML/台幣價審核.html`：Tina 打✓核准 / 填修正值 / 匯出核准 JSON
  **（2026-06-06 升級為手動給價工作台）**：每項顯示 **現行成本(台幣)/現價/利潤率/來源**，
  手動輸入新價時**即時顯示利潤率**，可搜尋全部 203 項（Feast/Europastry/VIRU）；
  無公式變動時預設顯示全部當參考。⚠️ 此頁含成本/利潤，僅本機+Resilio，不上 GitHub。
- `03_腳本/apply_twd.py`：讀核准 JSON → 寫回 products_final.json（修正過的標記`台幣價來源=手動修正`，之後不再被公式覆蓋）

**新增欄位 `台幣價來源`**（products_final.json）：`公式` / `手動成交價` / `手動修正`
- Europastry 39 筆手動成交價標 `手動成交價` → 自動化**永不覆蓋**
- Feast/VIRU/其餘 Europastry 164 筆標 `公式`

**流程**：改成本 → `compute_twd.py` → 開審核頁打V/修正 → 匯出 → `apply_twd.py <核准.json> --sync`

已端到端測試通過（改成本→偵測→審核→套用→還原）。

---

## 2026-06-06（更新 23）

### Feast / Europastry 台幣價重算（用成本計算主檔公式 + 25%利潤）

一致性檢查發現：成本計算主檔.xlsx（6/2）與 products_final.json（6/6）重疊部分**台幣價0衝突**，
但 Excel 缺 123 筆（主要 Feast/Europastry 新品/蛋糕），且 products_final 既有台幣價偏舊。

依 Excel 兩家**各自公式**（從儲存格逐字還原）+ Tina 確認 **25%利潤**、**匯率37**：
- **Feast 93 筆**：全用公式重算（Feast 本無手動價，1筆跳過：舒芙蕾箱入數=0）
- **Europastry 66 筆**：用公式（Tina 沒手動定價的，多為「暫定」品項）
- **Europastry 39 筆**：⚠️ **Tina 已手動放的=成交價，原封不動**（如起司棒42、可頌32）

**關鍵規則（Tina 2026-06-06）**：
- Europastry 凡 Tina 手動放過的台幣價 = **成交價，不可動**
- Europastry 沒手動放的、以及 Feast、以及**以後所有新報價** → 用公式
- 辨識「手動放」：成本計算主檔 Europastry 區有手動填 AK 的那些（39筆）

### VIRU 秘魯冷凍水果（SP200011）台幣價：套 Feast 公式變體
4 筆重算（藍莓/綜合莓/草莓/酪梨丁），微調 ~-0.8（本就接近正確，標準化）。
規則：Feast 結構但**匯率31美金、無TDS8%、FOB照加海運費**（詳見記憶檔）。

公式詳見記憶檔 project_golden_erp.md「成本計算主檔」段。

---

## 2026-06-06（更新 22）

### 修復：產品成本利潤報表「產品名/客戶/類別」欄顯示「—」

**問題**：`產品成本利潤報表.html` 的 `renderOrd()` 與下拉選單讀錯欄位名：
- 讀 `產品名`/`客戶`/`類別`/`下訂月份`/`高玉PO`
- orders.json 實際是 `產品中文名`/`客戶名稱`/`產品類別`/`年+月`/`高玉PO編號`

供應商與金額欄正常（欄位名剛好一致），故只有那幾欄顯示「—」。

**修法**：在 `const ORD` 載入後加入**欄位正規化**（補別名），下拉/列/排序/搜尋全部修好。
此段位於 `const ORD` 之後，sync/rebuild 重新注入資料時**不會被覆蓋**（已驗證存活）。
（訂單分析系統.html 用正確欄位名，無此問題。）

### 靜態產品報價資料庫重生（517→639 筆）

`高玉產品報價資料庫_*.html` 是**完全靜態HTML表格**（產品烤進 td），`sync_html_data.py` 不會更新它（它找 `let DB`，此檔無）。舊快照停在 2026-06-02 共 517 筆，缺今天新增的 122 筆。
- 依現有 36 欄模板（含 data-status/supplier/category/search 篩選屬性）從 products_final.json 重建
- ⚠️ 此為**內部完整DB**（含成本/利潤/合作模式），非客戶報價單

#### 靜態DB 改為自動更新（不再手動）

- 新增 `03_腳本/generate_static_db.py`：從 products_final.json 重建靜態DB
- 改用**固定檔名** `高玉產品報價資料庫.html`（時間戳放頁內 meta：「共 N 筆 ｜ 更新 …」），每次覆蓋
- `sync_html_data.py` 新增 **Step 8** 自動呼叫，**改完產品跑一次 sync，靜態DB跟著更新**，無需手動重生
- 舊的帶時間戳快照已移除

#### 一鍵全跑 update_all.py

新增 `03_腳本/update_all.py`：依序執行 `sync_html_data.py`（產品側）+ `rebuild_html.py`（訂單側）。
改完 products 或 orders 後跑這一行即可，不必記兩個指令。

---

## 2026-06-06（更新 21）

### 訂單↔產品連動：49% → 100%（合批細拆後 262 筆全數連動）

完整稽核 orders.json 與 products_final.json 的連動，從約 49% 提升到 **100%**。
**核心原則：每次拆分金額總和不變**（對外營收 NT$102,049,119／毛利 NT$11,637,108 全程不動）。

#### 處理手法
| 手法 | 說明 |
|------|------|
| 加產品編號 | Europastry 等用「產品編號」欄位比對（品名對不準時）|
| 合批拆分 | 一行多SKU依 PDF 箱數比例拆，保金額總和（順發/Chizzpa/La Mole/TDS/Valnerina/Cirio/KORIKO/VE/Yonca/G7/Menodiciotto/GoMuc）|
| 品牌正名 | 訂單用品牌名→正名公司：HariHari→C&F、Koriko/海苔三明治→NBF、GURIMI→Abc、RAW→Prisma Foods Egypt（已寫入 supplier_master「品牌」欄）|
| 標記類別 | 混合採購／非產品（紙袋印刷/代墊費用/酒展）／合批／空單待確認 |

#### 新建產品（11）
Selme EVOO 500ml、Simple Life 純橄欖油 750ml、TDS 氣泡酒×5、Valnerina 松露×2、
Pietro Coricelli 100%純酪梨油 500ml*12瓶。皆有 PDF/備註佐證。

#### PC（Pietro Coricelli）規格釐清
- 兩品牌：Pietro Coricelli + Cirio（奇里歐）
- PC橄欖油 = 特級初榨橄欖油 500ml*6瓶（價格隨時間微調）
- PC酪梨油 = 100%純酪梨油 500ml，分 6瓶裝/12瓶裝（高價=12瓶）

#### 合批細拆到口味（最終）
HariHari/GURIMI/Koriko 的「合批」單，再用全聯/美廉 ZIP 內 PDF 拆到各口味：
- GURIMI 泡麵×2（雞/牛/蔬/炒）、Koriko 海苔×1（夾心3+捲2）
- HariHari Go Bites×8（辣椒/海鹽/蝦辣/原味/番茄，各PO口味比例不同）
最終 orders 262 筆：**239 筆對到實際 SKU**，其餘為非產品(9)/混合採購(6)/空草稿(8) 合理類別。

#### 證據來源
全聯/美廉社訂單 ZIP（55 PDF）、6 份 tier-1 PO PDF、Gmail/PDF 備註。
掃描 PDF 以 PyMuPDF 渲染後判讀。

---

## 2026-06-06（更新 20）

### 全系統連動完整修復：沒有遺漏

發現並修復兩個關鍵漏洞：

#### 1. 國際採購下單系統.html 遺漏同步
- **問題**：const PRODS 嵌入但未由 sync_html_data.py 自動更新
- **修復**：添加 Step 5（國際採購下單系統） 到 sync_html_data.py
- **驗證**：執行 sync → ✅ procurement=synced

#### 2. 現金流預估表.html 遺漏訂單事件同步
- **問題**：const EVENTS 嵌入但未由 rebuild_html.py 自動更新
- **修復**：添加 EVENTS 注入邏輯到 rebuild_html.py（在 Step 1 和備份之間）
- **驗證**：執行 rebuild_html → ✅ 現金流事件資料更新：157 筆

#### 完整系統連動表

| # | 系統 | 資料變數 | 資料來源 | 更新機制 |
|---|------|---------|---------|---------|
| 1 | 高玉業務報價系統.html | const D | sales_d3.json | sync_html_data.py Step 2 |
| 2 | 國際採購下單系統.html | const PRODS | products_final.json | sync_html_data.py Step 5 ✅ |
| 3 | 高玉產品報價資料庫_*.html | let DB | products_final.json | sync_html_data.py Step 3 |
| 4 | 產品技術主檔.html | const PRODS + TECH_RAW + SUPS | products_final + tech + supplier | sync_html_data.py Step 6 |
| 5 | 產品成本利潤報表.html | const PROD + const ORD | products_final + orders | sync_html_data.py Step 4,7 + rebuild_html.py |
| 6 | 訂單分析系統.html | const ORDERS | orders.json | rebuild_html.py |
| 7 | 現金流預估表.html | const EVENTS | orders.json | rebuild_html.py ✅ |

**手動 sync 週期**：`python3 sync_html_data.py` 
→ 更新系統 1-5（產品側）

**日更新 08:00**：launchd 自動執行 `rebuild_html.py`
→ 更新系統 5-7（訂單側）

**規則**：千萬不要分開維護，會亂掉 ✅ 完全無縫連動

---

## 2026-06-06（更新 19）

### sync_html_data.py 擴展：所有報表全接入自動同步

一次 `sync_html_data.py` 現在同時更新：

| 系統 | 變數 | 資料來源 |
|------|------|---------|
| 高玉業務報價系統.html | `const D` | products_final.json（via sales_d3） |
| **產品成本利潤報表.html** | `const PROD` | **products_final.json（新接入）** |
| **產品技術主檔.html** | `const PRODS` | **products_final.json（新接入）** |
| **產品技術主檔.html** | `const TECH_RAW` | **product_tech.json（新接入）** |
| **產品技術主檔.html** | `const SUPS` | **supplier_master.json（新接入）** |

以後任何成本/產品資料更新，只改 `products_final.json`，執行一次 sync，所有系統同步一致。

---

## 2026-06-06（更新 18）

### 好市多通路規範確立 + Olidi 通路修正

#### Olidi 通路修正（13筆）
`PX Mart / Costco` → `PX Mart`（Olidi 不是好市多產品）

#### 好市多規範寫入 md

- 好市多專賣標記：適用通路含「好市多」
- Noah 已可見好市多產品（含常溫）：`冷凍 OR 非食品 OR 適用通路含好市多`
- 好市多報價模式：報價系統選客戶「好市多」自動啟用 isCostco 模式及特殊公式
- 待辦：「新增產品時強制選擇通路」功能（後續討論）

---

## 2026-06-06（更新 17）

### 架構升級：products_final.json 成為唯一資料來源

改寫 `03_腳本/sync_html_data.py`，實現單一資料來源原則：

**舊架構（雙軌，容易不一致）：**
```
products_final.json ─┐
                     ├─ 需手動同步 ─ sales_d3.json → HTML
```

**新架構（單一來源，自動一致）：**
```
products_final.json → sync 自動生成 sales_d3.json → HTML
```

每次執行 `sync_html_data.py`，sales_d3.json 都從 products_final.json 完整重建，不再需要手動維護兩套資料。未來所有產品新增/修改只改 products_final.json 即可。

---

## 2026-06-06（更新 16）

### Feast 成本 + 箱入數更新（來源：Kutay 2026-05-20 報價 PDF）

#### 水果成本調整（5筆，EXW EUR）

| 品名 | 舊成本 | 新成本 |
|------|:---:|:---:|
| 急速冷凍鮮覆盆子 300g | 2.379 | **2.51** |
| 急速冷凍鮮草莓 300g | 1.296 | **1.37** |
| 急速冷凍鮮酸櫻桃 300g | 1.764 | **1.86** |
| 急速冷凍鮮黑莓 300g | 1.707 | **1.68** |
| 急速冷凍綜合鮮莓果 300g | 2.418 | **2.55** |

#### 箱入數修正（14筆蛋糕/點心）

原本誤存板箱數，已依 PDF 改為正確每箱入數：

| 品名 | 舊 | 新 |
|------|:---:|:---:|
| 覆盆子巧克力雙餡柏林甜甜圈 170g | 6 | **1** |
| 愛心覆盆子起司蛋糕 50g | 150 | **5** |
| 惡魔巧克力蛋糕 130g*10片 | 60 | **6** |
| 提拉米蘇方形蛋糕 135g*9片 | 54 | **6** |
| 黑森林櫻桃蛋糕 120g*10片 | 60 | **6** |
| 覆盆子巧克力單人蛋糕 175g*9入 | 54 | **6** |
| 巧克力酥粒馬芬 135g*9入 | 54 | **6** |
| 香草/巧克力/覆盆子柏林甜甜圈 | 60 | **6** |
| 巴斯克起司蛋糕 145g*10片 | 100 | **10** |
| 鳳梨杏仁單人蛋糕 150g*9片 | 90 | **10** |

⚠️ Feast 76 筆缺 EAN：PDF 僅含 HS Code，EAN 待 Tina 向 Kutay 索取。

---

## 2026-06-06（更新 15）

### 成本價更新（來源：(香料+果醬+COOP第二次選品)建議訂單-20260227-40呎.xlsx）

#### Apicoltura Casentinese 果醬 5 筆（SP100043）

| 品名 | 舊成本 | 新成本 | 交易條件 |
|------|:---:|:---:|:---:|
| 草莓果醬 330g | 1.65€ CIF | **1.60€** | EXW |
| 杏桃果醬 330g | 1.65€ CIF | **1.60€** | EXW |
| 綜合莓果醬 330g | 1.65€ CIF | **1.70€** | EXW |
| 桃子果醬 330g | 1.65€ CIF | **1.60€** | EXW |
| 橘子果醬 330g | 1.65€ CIF | **1.60€** | EXW |

MOQ：1板/SKU = 442箱（34箱×13層）

#### COOP 產品 15 筆（SP100046）

| 品類 | 筆數 | 成本範圍 | 交易條件 |
|------|:---:|---------|:---:|
| 番茄醬 700g / 番茄橄欖醬 400g | 2 | 1.230～1.332€ | FCA |
| 義大利麵（直/短管/筆管/螺旋/蝴蝶/通心等 500g） | 10 | 0.834～0.864€ | FCA |
| 雞蛋千層麵 500g | 1 | 2.152€ | FCA |
| 燉飯 米蘭/蘆筍 175g | 2 | 1.200€ | FCA |

注意：COOP 另有 41 筆新品（2025-10-09 目錄）成本仍為 0，尚無報價。

---

## 2026-06-06（更新 14）

### RAW 埃及洋芋片（Prisma Foods Egypt）— EAN + 技術主檔建立

來源：`Copy of 產品資訊-原廠-RAW埃及洋芋片 (1).xlsx`

#### EAN 補齊（7 筆）

| 中文品名 | 規格 | EAN | 箱入數 |
|---------|------|-----|:---:|
| RAW 海鹽洋芋片 | 40g | 6223015761795 | 12 |
| RAW 海鹽巴薩米可洋芋片 | 40g | 6223015761849 | 12 |
| RAW 切達起司紅蔥頭洋芋片 | 40g | 6223015761818 | 12 |
| RAW 白松露洋芋片 | 55g | 6223015762297 | 10 |
| RAW 辣椒萊姆波浪洋芋片 | 40g | 6223015762624 | 12 |
| RAW 甜蜜BBQ波浪洋芋片 | 40g | 6223015762631 | 12 |
| RAW 奶油胡椒波浪洋芋片 | 40g | 6223015762600 | 12 |

#### product_tech.json 新增 7 筆（649 筆）

每筆含：製造商（PRISMA FOODS EGYPT）、工廠地址、單品尺寸、外箱尺寸、淨重/毛重、外箱 EAN。  
成分欄位暫留空白（原廠尚未完整回覆，追蹤中）。

---

## 2026-06-06（更新 13）

### 美廉自有品牌葵花油1L — MOQ 資訊寫入報價系統

MOQ 完整資訊已寫入英文品名欄位，報價系統產品卡片即可顯示：

> `Sunflower Oil 1L (Simple Mart PL) · MOQ: 1×40'FCL / 1,824 cartons / 12 btl/ctn / 76 ctn/pallet`

products_final.json MOQ 欄位同步更新：`1×40'FCL / 1,824箱 / 12瓶/箱 / 76箱/板`

---

## 2026-06-06（更新 12）

### 美廉自有品牌葵花油1L — 最低利潤調整為 20%

| 欄位 | 修改前 | 修改後 |
|------|--------|--------|
| 最低利潤% | 15% | **20%** |
| f15（最低報價/瓶） | 1.718 Euro | **1.825 Euro** |
| e10（10%底線/瓶） | 1.606 Euro | 1.606 Euro（不變）|

報價邏輯：成本 1.46 Euro ÷ (1 - 20%) = **1.825 Euro/瓶**，每箱（12瓶）= **21.90 Euro**

---

## 2026-06-06（更新 11）

### 新增 Yonca 葵花油美廉自有品牌 PL（629 筆）

| 欄位 | 內容 |
|------|------|
| 中文品名 | 美廉自有品牌葵花油1L |
| 英文品名 | Sunflower Oil 1L (Simple Mart PL) |
| 供應商 | Yonca（SP100004，透過TDS） |
| 成本價 | **1.46 Euro/瓶 CIF Keelung** |
| 箱入數 | 12瓶/箱，76箱/板 |
| MOQ | 1824 箱（40'FCL） |
| 狀態 | 待進口 |
| 適用通路 | 美廉社（自有品牌PL） |
| 郵件來源 | Mirko Puri (TDS) 2026-06-05 |

備註：此為美廉社自有品牌報價，EAN 尚未確認，台幣成本欄位待成本計算檔補入。

總產品數：628 → **629 筆**

---

## 2026-06-05（更新 10）

### 供應商聯絡資料補齊（來源：給國外訂單 ZIP）

從 12 份歷史 PO Excel 擷取供應商地址、聯絡人、Email、電話，同步更新 `supplier_master.json` 和 `國際採購下單系統.html` 的 SUPS 聯絡簿：

| 供應商代碼 | 供應商名稱 | 補齊欄位 |
|-----------|-----------|---------|
| SP100003 | Agro Wellness (Thailand) Co., Ltd. | 地址、聯絡人、Email、電話 |
| SP100005 | Shoon Fatt Biscuit & Confectionery Factory Sdn Bhd | 地址、聯絡人、Email；名稱更正 |
| SP100012 | PT ABC President Indonesia | 地址、聯絡人、Email；名稱從"Abc"更正 |
| SP100013 | GoMuc / S.RUAMTHAI CO., LTD. | 工廠地址、聯絡人；備註說明品牌方/工廠關係 |
| SP100014 | Nature Best Food Co., Ltd. | 地址、聯絡人、Email、電話；名稱從"NBF"更正 |
| SP100015 | Food Excellence Specialist Sdn. Bhd. | 地址、聯絡人；名稱從"Chizzpa"更正 |
| SP100016 | C&F Enterprise Sdn Bhd | 地址、聯絡人、Email、電話；名稱更正 |
| SP100022 | MAS CHOICES Corporation Ltd. | 地址、聯絡人、Email、電話 |
| SP100052 | TDS International | 地址、聯絡人、Email；**新增至 SUPS** |
| SP200002 | Europastry S.A. | 地址更正（HQ）、聯絡人、Email |

**SP200001 Feast / SP200010 G7**：訂單透過 TDS 代理，SUPS 已更新為 TDS（Mirko Puri）聯絡資訊。

改動檔案：`data/supplier_master.json`、`01_交付_HTML/國際採購下單系統.html`

---

## 2026-06-05（更新 9）

### 國際採購下單系統 UX 改進

1. **PO 自動帶入供應商編號** — Supplier 欄位改為 `SP100022 MAS CHOICES...` 格式，欄位仍可手動編輯
2. **拖放區自動隱藏** — 當 `gj_po_queue` 有待處理訂單時，拖放區自動隱藏，改以 Queue 面板為主介面
3. **單筆訂單自動載入** — 開啟系統時若 Queue 只有一筆含買進項目的訂單，自動載入並生成 PO 草稿，不需點任何按鈕

改動檔案：`01_交付_HTML/國際採購下單系統.html`

---

## 2026-06-05（更新 8）

### 供應商編號全面清查（SP100010 誤用批次修正）

全系統稽核發現 SP100010（Bianco Forno）被大量誤掛到其他供應商。今日分兩批完成所有修正：

#### 第一批（本次更新）— 批次修正 117 筆 products + 119 筆 sales

| 供應商 | products 筆數 | sales 筆數 | 修正後代碼 |
|--------|:---:|:---:|--------|
| Polska Roza | 31（含1筆SP100031） | 31 | SP100051 |
| TDS | 28 | 28 | SP100052 |
| Olidi | 13 | 13 | **SP100053（新建）** |
| Dogadan | 11 | 11 | SP100048 |
| Domori | 10 | 10 | **SP100054（新建）** |
| CRIKCROK | 6 | 6 | SP100047 |
| Apicoltura Casentinese | 5 | 5 | SP100043 |
| MONTOSCO | 4 | 4 | SP100050 |
| Castle | 4 | 4 | SP100045 |
| Burcu | 3 | 3 | SP100044 |
| AntichiColli | 2 | 2 | SP100042 |
| G7（sales_d3 補修） | — | 2 | SP200010 |
| MB（sales_d3 補修） | — | 1 | SP100049 |

#### 供應商主檔新增

- **SP100053 Olidi**：常溫，橄欖油/植物油，義大利，EXW，Euro（13筆）
- **SP100054 Domori**：常溫，巧克力，義大利，EXW，Euro（10筆）

供應商主檔：56 → **58 家**

SP100010 修正後只剩正確的 2 筆（Bianco Forno 蝴蝶酥 + 杏仁餅乾）

#### 第二批（本日稍早）— COOP/MB/G7/Feast 修正

| 供應商 | 筆數 | 修正前 | 修正後 |
|--------|------|--------|--------|
| COOP | 15 | SP100010 | SP100046 |
| MB（Muliano Bianco） | 1 | SP100010 | SP100049 |
| G7 | 2 | SP100010 | SP200010 |

#### G7 義式冰淇淋資料修正（來源：桂冠採購訂單 20260121）

| 欄位 | 修正內容 |
|------|---------|
| EAN 榛果 | 800692083772 → **8006922083772**（少一位數字）|
| EAN 巧藏 | 800692083796 → **8006922083796**（少一位數字）|
| 中文品名 | 巧**酥**義式冰淇淋 → 巧**藏**義式冰淇淋（PDF「修正中文品名」文件）|

#### Feast 巧克力舒芙蕾 供應商編號補上

- Feast IQF 巧克力舒芙蕾 100g：補上 `供應商編號 = SP200001`

#### MB 供應商主檔修正

- SP100049 MB 產品類別：`葡萄酒 / 義大利餅乾` → `義大利餅乾`

#### COOP 產品大批新增（41 筆，來源：COOP-產品資料-20251009）

| 類別 | 新增品項 | 筆數 |
|------|---------|:---:|
| 番茄製品 / 義大利麵醬 | Pesto×2、Basil Sauce、Arrabbiata、Tomato Puree 3x250g、番茄橄欖醬（Ricotta版）、Cherry Tomatoes、Peeled Tomatoes、Tomato Pulp 2x210g、Mustard/Mayo/Ketchup 單份裝、巴薩米克醋×3、Pasta Salad醬 | 17 |
| 義大利麵 / 燉飯 | Durum Wheat 系列 5種（非100%）、Egg Tagliatelle、Risotto 起司/牛肝菌/朝鮮薊 | 9 |
| 果醬 | 杏桃/草莓/黑櫻桃 4x25g × 3、Light版 270g × 3 | 6 |
| 義大利餅乾 | Wafers 4種、Cioccobiscotti 2種、Sticks、方形威化 2種 | 9 |

**注意：41 筆新產品成本價 = 0（尚無進貨報價），箱入數待補。**

總產品數：587 → **628 筆**

---

## 2026-06-05（更新 4）

### 報價系統全面改版：每箱＋每個雙價顯示、ctn() 換算機制

#### 問題背景
MAS 鮪魚罐頭的 f15（外幣最低報價）以整箱儲存（如 31.25 USD/48罐），與其他供應商按每個/瓶儲存的方式不一致。業務報價時不清楚是箱價還是罐價，總金額計算也因此出錯。

#### ⚠️ 核心規範（以後永遠適用）

> **所有 products_final.json 的外幣成本欄位（成本價、外幣10%底線）及 sales_d3.json 的 f15 / e10，一律以「每個/每罐/每瓶」為單位。**
> - 成本是整箱報的（如 CIF 24.25/carton），入庫時必須 ÷ 箱入數（÷48 = 0.5052/罐）
> - 台幣欄位（AK、t10）本來就是每罐，不受影響
> - Feast / Europastry 以台幣到倉價計，不適用此規範

#### MAS Choices 5 筆產品資料修正

| 產品 | 成本（修正後/罐） | f15（修正後/罐） | e10（修正後/罐） |
|------|----------------|----------------|----------------|
| 油湯鮪魚片 180g | 0.5052 USD | 0.651 USD | 0.5729 USD |
| 水煮鮪魚片 180g | 0.485 USD | 0.625 USD | 0.55 USD |
| 油湯鮪魚片 185g | 0.7812 USD | 0.9766 USD | 0.8594 USD |
| 水煮鮪魚片 185g | 0.7708 USD | 0.9635 USD | 0.8479 USD |
| 大豆油（台灣配方）| 0.63 USD | 0.6929 USD | 0.6929 USD |

#### 業務報價系統（高玉業務報價系統.html）改版

**新增 `ctn(r)` 換算函數：**
```javascript
function ctn(r) {
  // Feast+TWD 以個計，qty 不乘以箱入數
  // 其他產品：qty = 箱數，乘以 箱入數 得總個數
  return (isTWD && r[12]==='Feast') ? 1 : Math.max(1, parseInt(r[6])||1);
}
```

**全系統 `tot/sub` 計算統一改為：**
```
小計 = 箱數 × 每個單價 × 箱入數  （共 19 處修改）
```

**購物車顯示：**
- 數量標籤：「箱數」（而非「數量」）
- 數量輸入右側提示：「×48/箱」（箱入數 > 1 時顯示）
- 報價標籤：「報價 / 個」；幣別顯示：「USD / 個」

**報價單（PDF）顯示：**
- 移除「每板箱數」欄（欄位減少，版面更清爽）
- 「數量」欄：顯示「10 箱（共 480 個/罐）」
- 「單價 / 個」欄：每罐/個報價（如 0.6929 USD / 個）
- 「單價 / 箱」欄：自動換算箱價（0.6929 × 48 = 33.26 USD / 箱）
- 「小計」：正確用箱數 × 箱入數 × 每個單價計算

**訂單匯出 JSON：**
- `cartons`：原箱數（新增欄位）
- `qty`：改為總個數（= 箱數 × 箱入數）
- `totalAgreed`：= 箱數 × 箱入數 × 每個成交單價

**更新檔案：**
- `data/products_final.json`：5 筆 MAS 成本/f15/e10 修正（÷48）
- `data/sales_d3.json`：5 筆 MAS f15/e10 修正（÷48）
- `01_交付_HTML/高玉業務報價系統.html`：ctn() 函數、報價單版面、所有 tot/sub 計算

---

## 2026-06-05（更新 3）

### MAS Choices 5 筆產品：成本單位錯誤修正（整箱→每罐）

發現 MAS 全部 5 筆產品的外幣成本欄位（成本價、外幣10%底線、f15、e10）以整箱儲存，
應改為每罐。已全部 ÷ 48 修正，並同步兩套系統。

---

## 2026-06-05（更新 2）

### 新產品：Mas Choices 大豆油鮪魚片罐頭 180g（台灣配方）

**來源：** WhatsApp 特殊報價，2026-06-05

| 欄位 | 內容 |
|------|------|
| 供應商 | Mas Choices（SP100022） |
| 中文品名 | Mas Choices 大豆油鮪魚片罐頭 180g（台灣配方） |
| 英文品名 | MC Canned Light Tuna Flake in Soybean Oil 180g (Taiwan Formula) |
| 規格 | NW180g DW125g EOE |
| 成本 | **0.63 USD/罐** CNF（原廠報 USD 0.63/tin，48罐/箱）|
| 箱入數 | 48 tins |
| 最低利潤% | **10%**（特殊報價，低於一般 MAS 產品的 20%） |
| 外幣最低報價（f15） | **0.6929 USD/罐**（= 0.63 × 1.10） |
| 外幣10%底線（e10） | **0.6929 USD/罐**（= 0.63 × 1.10，margin=floor=10%） |
| 台幣欄位 | 待 Excel 試算表計算後補入 |
| MOQ | 3 櫃，截止 2026-12-31 |
| 備註 | 紙標；Light Tuna（跳鰹，非 White Meat）；大豆油（非植物油） |

**更新檔案：**
- `data/products_final.json`：587 筆（+1）
- `data/sales_d3.json`：587 列（+1）
- `01_交付_HTML/高玉業務報價系統.html`：已同步

---

## 2026-06-05

### 訂單審核自動路由系統

#### 背景問題
業務系統匯出訂單後，Tina 點入「訂單審核」tab 仍需手動拖曳 JSON 才能看到審核畫面，不符合預期行為。

#### 更新內容

**`01_交付_HTML/高玉業務報價系統.html`**
- `doExportSummary()` 新增：同步將訂單 push 進 `gj_order_import_queue`（localStorage）
- Queue 保留 72 小時，舊單自動清除

**`01_交付_HTML/order_review.html`（全面升級）**
- 新增 `runQueueAutoProcess()`：頁面載入時自動讀取 `gj_order_import_queue`
- 新增 `checkItemPrice()`：JS 端價格核查（鏡像 import_order.py 的 `check_prices()` 邏輯）
  - 使用訂單 item 內建的 `minPrice / floorForeign / minPriceTWD / floorTWD` 欄位，無需外部資料
  - critical = 低於成本底線；warning = 低於最低報價
- 新增「✅ 已自動核准」面板：clean 訂單自動下載 `訂單_已核准_*.json`（含 `_approved:true`），無需 Tina 手動操作
- 新增 flagged 訂單 queue 導航：多張有旗標訂單可逐筆審核，核准/退件後自動跳至下一張
- `exportApproved()` / `exportRejected()`：queue 中仍有訂單時自動切換至下一張
- 待審核 bar 改為顯示 `reviewFiles`（`04_訂單匯入/待審核/` 中的檔案）而非 inbox root

**`01_交付_HTML/index.html`**
- badge 邏輯更新：`review`（待審核資料夾）+ `gj_order_import_queue`（localStorage 未處理）合計顯示

**`03_腳本/import_order.py`**
- `update_pending()` 新增 `review` 和 `reviewFiles` 欄位：追蹤 `04_訂單匯入/待審核/` 中已有旗標的檔案

#### 自動路由流程
```
業務匯出訂單
  ↓ (localStorage gj_order_import_queue)
Tina 點擊「訂單審核」tab
  ↓ order_review.html 自動讀取 queue
  ├─ 價格全部通過 → ✅ 自動下載 訂單_已核准_*.json（直接放入 04_訂單匯入/ 即可）
  └─ 有 critical/warning 旗標 → ⚠️ 審核畫面自動顯示，Tina 確認後核准或退件
```

#### 現有待審核訂單（已處理）
| 訂單 | 旗標 | 狀態 |
|------|------|------|
| 好市多_Bianco Forno_20260602 | 🔴 critical×2（蝴蝶酥+杏仁餅低於成本底線） | 待 Tina 審核 |
| 美廉社_SM-260515 | ⚪ info×2（MAS 鮪魚不在資料庫） | 待 Tina 審核 |

---

## 2026-06-04（更新 4）

### 產品技術主檔批次匯入 — 美廉需求欄位 Excel 5批次

#### 更新內容
- **KORIKO 2** (7 筆)：海苔夾心原味/韓式泡麵/芥末/麻辣/鹹蛋黃 + 海苔捲原味/辣味（完整成份、外箱尺寸）
- **Chizzpa** (4 筆)：原味/酸奶洋蔥/燒烤/香辣洋芋片 110g（外箱尺寸、效期 12 個月；無成份欄位）
- **義大利 Menodiciotto** (2 筆)：森林苺/百香果雪酪 350g（外箱尺寸、效期 18 個月）
- **Go Bites** (5 筆)：波浪/薄片洋芋片系列（外箱尺寸、效期 12 個月；無成份欄位）；新增番茄風味 9556819800863

#### product_tech.json
| 操作 | 筆數 |
|------|------|
| 更新前 | 638 |
| 新增 | 1（GOBITES 番茄 9556819800863） |
| 更新欄位 | 17 筆（KORIKO×7 成份+尺寸、Chizzpa×4 尺寸、Menodiciotto×2 尺寸、GOBITES×4 尺寸） |
| **更新後** | **639** |

#### 更新範圍
| 系統 | 檔案 | 更新後 |
|------|------|--------|
| 進階ERP | `data/product_tech.json` | 639 筆 |
| 進階ERP | `01_交付_HTML/產品技術主檔.html` | TECH_RAW=639, PRODS=583 |

---

## 2026-06-04（更新 3）

### KORIKO 海苔捲 5入裝 — 新規格上線

#### 新增產品（2 筆）
- **KORIKO 海苔捲原味 3.6 g(5入裝)**：規格 18g，箱入數 40，USD 0.70 FOB
- **KORIKO 海苔捲辣味 3.6 g(5入裝)**：規格 18g，箱入數 40，USD 0.70 FOB

#### 計算依據
- 成本：USD 0.70 / unit（FOB）
- 最低利潤%：21.9%（同 Koriko 系列）
- f15（外幣最低報價）= 0.70 ÷ (1 − 0.219) = **0.8963**
- e10（外幣10%底線）= 0.70 × 1.10 = **0.77**
- EAN：待 Koriko 提供後補入

#### 更新範圍
| 系統 | 檔案 | 更新前 | 更新後 |
|------|------|--------|--------|
| 進階ERP | `data/products_final.json` | 581 筆 | 583 筆 |
| 進階ERP | `data/sales_d3.json` | 581 行 | 583 行 |
| 進階ERP | `01_交付_HTML/高玉業務報價系統.html` | 581 行 | 583 行 |
| Golden ERP | `products_final.json` | 517 筆 → 519 筆（本次前） | 519 筆 |
| Golden ERP | `sales_d3.json` | 517 行 → 519 行（本次前） | 519 行 |
| Golden ERP | `高玉業務報價系統.html` | — | 519 行（已同步） |

#### 問題紀錄
- **初次遺漏**：本日先更新 Golden ERP，未同步至 進階ERP → Tina 截圖確認「沒有更新」
- **根本原因**：兩套系統資料獨立，Golden ERP sync 不會自動帶入 進階ERP
- **修正**：已補更新 進階ERP 全部資料與 HTML，並加強工作流程文件

---

## 2026-06-04（更新 2）

### 產品技術主檔大規模補完

#### 本次更新
- **name_en 全面補完**：593 筆記錄達 100% 覆蓋（原約 260 筆缺失）
  - 來源 1：SF USD Price List (Full) 2024.xlsx → 11 筆 SF 產品
  - 來源 2：GOMUC零食.xlsx → 13 筆 GoMuc 產品
  - 來源 3：MC魚罐頭.xlsx → 補 2 筆 MAS tuna 英文名
  - 來源 4：泰國Koriko.xlsx（PO）→ 5 筆 Koriko 產品
  - 來源 5：products_final.json 交叉比對 → 333 筆（含所有 Feast / Europastry / SP 系列）
  - 來源 6：products_final.json 中文品名交叉比對 → 216 筆 placeholder EAN 記錄
- **MAS 鮪魚罐頭**：補外箱尺寸 25.7×34.6×16.5 cm、工廠備注（Siam Tin Food Products Co., Ltd.）
- **Koriko（SP100014）**：補 factory_addr_en（599 Moo 17, Theparak Rd., Bangsaothong, Samut Prakan）
- **MC 沙丁魚（3 款）**：補 name_en（MC Sardine in Water / Tomato Sauce / Vegetable Oil NW125g）
- **Go Bites（5 款）**：補 name_en（Thin/Crinkle 系列）
- **SF 餅乾（5 款）**：補 name_en（Peanut Butter / Corn / Chocolate / Cheese / Cream Crackers）

#### 仍待 Gmail 附件（需 Tina 手動儲存至本機）
- `美廉需求欄位-原廠GOBITES.xlsx` — Go Bites 成分/過敏原/EAN
- `美廉需求欄位-原廠GOBITES韓式口味 03062026 (1).xlsx` — 韓式口味（Jacob 6/4 回覆）
- `美廉需求欄位-原廠(刪價格)-KORIKO(2).xlsx` — Koriko 成分/EAN
- `美廉需求欄位-原廠(刪價格)-Chizzpa_Golden Jade_REply.xlsx` — Chizzpa 成分
- `産品資訊-原廠-MAS鮪魚罐頭.xlsx` — MAS SM 技術文件（含 EAN）
- `美廉需求欄位-原廠(刪價格)-SF-20250715回.xlsx` — SF 最新回覆
- `埃及洋芋片 ingredient detail` xlsx — 31 款 RAW 洋芋片成分

#### 靜態 HTML 更新
- `01_交付_HTML/產品技術主檔.html` 重新同步（593 技術記錄 + 581 產品記錄）

---

## 2026-06-04（更新 1）

### 產品技術主檔系統 — 第一版上線

#### 新增檔案
- `01_交付_HTML/產品技術主檔.html`（506KB）— 全新主檔管理系統
- `data/product_tech.json` — 技術欄位資料（577 筆，鍵值為 EAN）
- `data/supplier_master.json` — 供應商主檔（56 家，從 xlsx 轉出）

#### 系統功能
- **產品主檔 tab**：581 筆產品、搜尋 + 4 個篩選器（型態/供應商/完整度/通路）
- **產品詳情面板**：4 個子 tab（基本資訊、成分規格、包裝、通路認證）
- **完整度指標**：8 個關鍵欄位計算百分比，顏色標示（紅/橙/黃/綠）
- **行內編輯**：modal 表單，存入 localStorage，可匯出 JSON
- **供應商主檔 tab**：56 家供應商，聯絡資訊、認證、銀行資訊（需解鎖）
- **權限控制**：管理者（全功能）/ Tina Kao（編輯+匯出）/ Noah（唯讀+冷凍篩選）

#### 預填資料
- **C&F Enterprise（Go Bites）**：5 筆，已填製造商名稱+地址+保存期限
- **GoMuc（RUAMTHAI）**：18 筆，已填製造商+地址+外箱尺寸+保存期限
- **Europastry**：105 筆，已填製造商名稱+工廠地址（西班牙）
- 其他供應商：品牌名稱+保存期限（從 BBD 天數換算），其餘欄位待從郵件補完

#### 安全確認
- PRODS 嵌入資料不含：成本價、前次成本價、台幣總成本、最低利潤%、合作模式
- 銀行資訊預設模糊（blur），管理者需手動點擊解鎖

#### index.html 更新
- 三個帳號均新增「📦 產品技術主檔」tab
- Tina Huang → `產品技術主檔.html`（管理者）
- Tina Kao → `產品技術主檔.html?role=tina`（編輯權）
- Noah Tseng → `產品技術主檔.html?role=noah`（唯讀+冷凍篩選）

#### 下一步（待做）
- 從郵件匯入美廉社、全聯、東森的建檔表資料（成分、過敏原、HS Code 等）
- 補完供應商主檔：聯絡人、地址、認證、銀行資訊
- 建議新增 QA 帳號（Juno Chen）

---

## 2026-06-04

### 國際採購下單系統 — 客戶地址補全

- **東森**：確認英文名 `Eastern Home Shopping and Leisure Co., LTD`，地址 `No. 258, Jingping Road, Zhonghe Dist., New Taipei City 23581, Taiwan`（來源：泰國AGRO訂單25OL003-25OL0005.xlsx Consignee 欄）
- **生活良好**：修正英文名 `Taiwan Lifestyle Goods Co., Ltd` → `Taiwan Better Life International Co., Ltd.`，地址 `3F., No. 33, Jingye 4th Rd., Zhongshan Dist., Taipei City 104052, Taiwan (R.O.C.)`（來源：Louis Yang 信件簽名）
- 悠旅生活、好市多：地址待補（欄位留空，系統可手動填寫）

### 國際採購下單系統 — PO Queue 工作流程（免拖曳）

**需求**：業務系統匯出訂單後，Tina 開啟採購系統不需再拖曳 JSON 檔案。

**實作方式**：兩個 HTML 透過 `localStorage` 傳遞訂單資料。

#### 業務系統（`高玉業務報價系統.html`）
- `doExportSummary()` 匯出時，同步將訂單 push 進 `gj_po_queue`（localStorage）
- Queue 為陣列，每筆含 `{id, queuedAt, order}`，不覆蓋既有筆數

#### 採購系統（`國際採購下單系統.html`）
- `DOMContentLoaded` 時自動讀取 `gj_po_queue`，清除 72 小時以上的舊單
- 有待辦訂單時，頁面頂端顯示橘色 Queue Panel（含筆數 badge）
- 每筆顯示：客戶、GJ PO、訂單日期、匯出時間（幾小時前）、[載入] [✕]
- **載入**：`loadFromData()` → 設定 `currentOrder` → `buildAllPO()` → 從 queue 移除
- **✕**：從 queue 移除（略過，不需採購）
- 無採購項目（非買進/買進轉手）的訂單顯示「無採購項目」提示
- 向下相容：若偵測到舊版 `gj_po_pending` 單筆格式，自動遷移至 queue 再清除

#### 驗證結果（2026-06-04 Python 模擬測試）
- ✅ 3 筆入 queue → 清除 73h 過期訂單後剩 2 筆，邏輯正確
- ✅ 載入後自動從 queue 移除，不重複
- ✅ 非買進訂單正確標示「無採購項目」
- ✅ 舊版 `gj_po_pending` 遷移正確，遷移後 key 清除

**限制**：同一台電腦、同一個瀏覽器才共用 localStorage（Tina 目前在同一台 Mac 使用，無問題）。

---

## 2026-06-03

### 好市多烘焙專案 — 新功能（全新架構）

#### 新產品：#25101 彎月奶油可頌（未發酵）
- `data/sales_d3.json`、`data/products_final.json` 新增產品
- 規格：85g × 84個/箱，90箱/板，MOQ 1 FTL 20'
- CIF：€0.229/個（來源：Europastry 2026-06-03 報價單）
- BBD：365天
- r[17] = '好市多烘焙專案'，r[16] = '已進口'
- AK = NT$12，t10 = NT$11.01（好市多專案公式）

#### 更新產品：#522 直條奶油可頌（已發酵）
- 中文品名：`#522 Straight Croissant (100u)` → `#522 直條奶油可頌（已發酵）`
- CIF 成本更新：€0.18475 → €0.201/個（2026 新報價）
- 箱/板更新：40 → 50（依 CIF 報價單修正）
- r[16] 修正：`0.203225`（錯誤數字）→ `'已進口'`
- r[17] 修正：`'Europastry'`（錯誤）→ `'好市多烘焙專案'`
- AK 更新：NT$19（標準公式）→ NT$11（好市多專案公式）
- t10 更新：NT$16.05 → NT$9.71（好市多專案成本+5%）

#### 好市多烘焙專案報價公式（新增至 ERP.md）
```
CIF_TWD = CIF_EUR × 37
總成本  = CIF_TWD + 關稅20% + 報關費3% + 卸櫃10,000÷(M×20×L)
AK      = ceil(總成本 × 1.10)   建議報價（+10%）
t10     = 總成本 × 1.05         底線（+5%）
```

#### HTML `高玉業務報價系統.html` 更新
- CSS 新增 `.bcostco{background:#FFF3CD;color:#7A4A00}`（好市多金黃色標籤）
- 新增 `sChBadge(ch)` 函數：r[17] 含「好市多」時顯示 🏬 好市多專案 badge
- `fil()` 篩選：`isCostco=false` 時自動隱藏 r[17] 含「好市多」的產品
- `togCart()` 攔截：非好市多模式點擊好市多產品 → 彈出警告
- **Bug fix**：`isFeastOrEuropastry(r)&&!isTWD` → 加入 `&&!isCostcoProduct(r)`
  修正前：好市多模式（`isTWD=false`）下 Europastry 產品被舊邏輯誤擋，無法加入報價單
  修正後：好市多專案產品在好市多模式下正常加入，其餘 Europastry 行為不變
- 「適用通路」篩選下拉新增「好市多烘焙專案」選項

#### `memory/costco_bakery_formula.md` 新增
- 記錄好市多烘焙專案公式與已試算案例
- 設定觸發規則：Tina 說「算台幣」時，先詢問是否為好市多烘焙專案

---

## 2026-06-02

#### `order_review.html` v2.1（全新重寫）
- 新增價格旗標警告區塊（`.flag-box`）：支援 `critical` / `warning` / `info` 三種嚴重等級
- 新增核准按鈕（`exportApproved()`）：下載含 `_approved: true` 的訂單 JSON
- 新增退件按鈕（`exportRejected()`）：僅在 `FLAG_MAP` 有資料時顯示
- 表格新增 `.flag-col` 欄（只在有旗標時顯示）
- Footer colspan 動態調整（7 or 9）

#### `import_order.py` v2.1（自動模式）
- 新增 `--auto` 參數，支援 launchd 無人值守執行
- 新增 `check_prices()`：比對 `sales_d3.json` 的 f15/AK/e10/t10 欄位
- 新增 `load_sales_d3()`：從 r[15]/r[20]/r[21]/r[22] 建立查詢表
- 通過價格 → 匯入 `orders.json`，移至 `已匯入/`
- 有旗標 → 加 `_priceFlags`，移至 `待審核/`
- `_approved: true` → 跳過價格檢查，直接匯入
- 新增 `generate_summary()`：每日 HTML 摘要報告

#### `goldenjade_orders_update.sh` 更新
- 在 `rebuild_html.py` 前新增 `import_order.py --auto` 步驟

#### `04_訂單匯入/待審核/` 目錄
- 新建（之前不存在）

#### Feast IQF 巧克力舒芙蕾 — 箱/板修正
- 箱/板：36 → 24
- 重新套用 Feast 公式：AH=59.37, AK=79.16, t10=65.31, e10=0.99, margin=25.0%
- 根因：原用 Europastry 公式計算，應使用 Feast 公式（AD=120,000/20/M/L + AE=AC×10%，無 AF/AG）

#### `成本計算主檔.xlsx` — 95 行×10 格公式跨列錯誤修正
- 問題：Feast 試算表第 48–143 行的公式（V/W/Y/AA/AB/AC/AD/AE/AH/AK）全部誤引用 -11 行的儲存格
- 修正：950 個公式儲存格全部更正為自身行號
- 影響：所有 Feast 產品 AH/AK/t10/e10 皆有誤差

#### 29 個 Feast 產品重新計算
- 根據修正後的 Feast 公式重算 AH/AK/t10/e10/margin
- 同步更新 `data/products_final.json` 和 `data/sales_d3.json`

#### `成本計算主檔` 重命名
- `成本計算主檔_202605.xlsx` → `成本計算主檔_20260602.xlsx`

#### 歷史版本清理
- `01_交付_HTML/歷史版本/` 保留最新 3 個（刪除 5 個舊版報價資料庫 HTML）

#### 全交付 HTML 更新（22:25–22:29）
- `高玉業務報價系統.html`
- `高玉產品報價資料庫_最後更新20260602_2229.html`（新靜態版）
- `產品成本利潤報表.html`
- `訂單分析系統.html`
- `現金流預估表.html`

#### Google Drive 同步架構更新
- 移除舊的 `成本報價模組 Claude 0522/` 和 `訂單分析系統/` 資料夾
- 新增 `進階ERP/` 資料夾（36 檔，6.5 MB）
- rclone 設定：`gdrive:進階ERP/`

#### 文件
- 新增 `ERP.md`（系統 skill 說明文件）
- 新增 `CHANGELOG.md`（本文件，從 ERP.md 拆出）
