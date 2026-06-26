# CHANGELOG — 高玉企業 進階ERP

---

## 2026-06-26（更新 58）— 消除幽靈「寄倉」模式→正名「買進」(Tina更正)

**Tina指正:沒有「寄倉」這種交易模式。** 買進=高玉進口商台幣到倉直售台灣通路(家樂福/星巴克/萊爾富/全聯/Feast/Europastry/VIRU);買進轉手=高玉轉賣NEXO再給客戶。「寄倉」是早期(6/07)建檔誤用標籤,全面移除。
- orders.json 54筆:交易模式/高玉模式 寄倉→買進、record_type 寄倉→銷售(Europastry37+Feast17)。
- 交易模式對應 _類別D、opex _進口人判定、gen_pnl 註記、rebuild_html 統計、交易模式與現金流規則.md → 全去「寄倉」。
- ⚠️**財務中性已驗證**:改前後 PnL(2025營收64,054,922/淨利4,047,749、2026營收40,632,072/淨利3,428,332)、對外收入102,294,464、毛利11,662,293 **完全一致**;進口費用本就不計(已含到岸成本)、營收用record_type≠採購故不受標籤影響。程式編譯通過。

---

## 2026-06-26（更新 57）— SP100013 供應商正名 GoMuc→S. Ruamthai＋S.Ruamthai簽章PI歸檔

**SP100013 供應商正名(Tina:GoMuc是品牌、供應商是S. Ruamthai)** — 一次改齊全主檔:products_final 19支(供應商→S. Ruamthai、品牌補GoMuc6/Tana4/FruitMania9)、supplier_master(名稱+品牌欄+備註)、交易模式對應(+S. Ruamthai/C並保留GoMuc別名給歷史單)、報價歷史21筆、orders.json 19筆(品牌補GoMuc)。供應商主檔Excel隨publish自動重生。

**S.Ruamthai PI(GJT002-26)蓋章歸檔** — 泰國供應商開給高玉的PI,高玉發票章蓋於左下簽名區;歸檔 Drive `SM260531-26FA0009/PI_工廠S.Ruamthai_GJT002-26_SM-260531_已蓋章_小T.pdf`+本機留底。屬SM-260531(GoMuc/Tana/FruitMania泰式零食,客戶美廉社)。

---

## 2026-06-26（更新 56）— NEXO文件全面蓋高玉發票章＋SM-260415客戶確認

**NEXO 文件加蓋高玉發票章(Tina指示:我可控制的對外文件一律蓋章)** — `gen_nexo_docs.py` sign_block() 加章:**只蓋高玉開立文件**(logo:True的PI/CI/PL GJ→NEXO,簽名線上方24mm);NEXO自家文件(NEXO→SM/PO_NEXO-GJ)不蓋我方章(無NEXO章)。章圖=assets/發票章_透明.png。現存5單(0415/0435/0444/0515/0531)全重生蓋章;Drive更新4單(0415/0435/0444/0531),**0515因缺毛重暫留本機**待重量補齊一起上。

**SM-260415 文件客戶已確認** — 屬切分點前舊NEXO單(文件核對系統不追舊單,無狀態欄),作資訊接收;蓋章文件已上傳Drive。

儀表板(物流貨況/現金流)隨publish重生更新。

---

## 2026-06-26（更新 55）— SM-260435/260444 NEXO地址改正重出＋業務週報/TDS週報/供應商主檔Excel自動化

**SM-260435、SM-260444 NEXO地址改正** — 客戶(美廉社)把PO上NEXO地址改正(舊Jalan Matang/Selangor錯址→正確「1st Floor, Lot 10524, Block 16, 151 Jalan Tun Jugah, 93350 Kuching, Sarawak」)。系統 gen_nexo_docs.py 第42行早於6/22已是正確址→兩單各重出7份NEXO文件(地址正確、check_nexo_docs數學/邏輯全過)，rclone原地更新Drive(同名保留file id、📎不斷)；客戶改正PO另存各資料夾源頭存證。

**SM-260515 出貨文件缺重量(待補)** — 客戶反映CI/PL無重量:單箱淨/毛重欄=TBA。淨重可算(48×180g=8.64kg/箱;水煮667→5,762.88kg、油漬700→6,048kg);毛重需工廠(Mas/Siam Tin)實際裝箱數字,Tina去要再補後重出。

**自動化/週報** — 供應商主檔Excel生成器(gen_supplier_xlsx.py,掛update_all,73家自動重生);業務週報加義大利咖啡/順發/Bentolee泡麵、移除美廉埃及洋芋片;TDS待辦#31刪Prisma(已下單)、新增PXM新增費用會議(等高玉)+桂冠扣款(等TDS)。

---

## 2026-06-26（更新 54）— 上海根因(東森)新品3支＋Drive舊鏡像清理

**上海根因 SP300001 新增3支(台湾东森-凯诗风尚報價)** — RMB/FOB、中國、型態用品/非食品、收佣金(根因)、付款「根因收到L/C後90天付高玉佣金」(模式E,中英併存;同步改正既有抹布的誤填TDS)、通路全通路、**利潤40%**(Tina指定)。
- 316不鏽鋼咖啡杯(480ml禮盒) RMB25.52 箱入30 EAN6931124381505 保8年
- 仿真絲斜紋方巾(90×90cm禮盒) RMB21.85 箱入50；MOQ階梯5000→22.56/8000→22.2/10000→21.85(成本取10000檔)
- 仿真絲緞面方巾(90×90cm禮盒) RMB25 箱入50；MOQ階梯5000→25.8/8000→25.56/10000→25
- ⚠️絲巾3階梯MOQ價→成本取10000最低檔、全階梯寫進`備註`(系統一品一價)；交易模式用既有標準寫法`收佣金(根因)`(與SP300001一致,不破壞現金流模式判定)。

**Drive 舊鏡像清理** — `gdrive:進階ERP`整個舊鏡像(停6/19、無腳本讀寫、真備份在Seagate+GitHub)已清到Drive垃圾桶(可復原)；232個Drive獨有舊備份/歷史/提案殘骸先下載進桌面刪除桶留底。本機根目錄死鏡像`船班追蹤.json`(僅data/版被讀)移刪除桶。

---

## 2026-06-26（更新 53）— 義大利咖啡34支＋順發新品3支

**順發 SP100005 新增3支(Gene Lo報價 SF Price Quotation)** — USD/CIF、馬來西亞、通路美廉社/全通路、利潤20%、付款「30% deposit, 70% against B/L」。
- #9 特級奶油蘇打餅乾(獨立包) 280g×16/箱 CIF USD0.89 BBD540天 EAN 955 6184 280 093
- #10 烘烤洋芋脆片(酸奶油洋蔥香草) 40g×30/箱 CIF USD0.33 EAN 955 6184 040 017
- #11 烘烤洋芋脆片(炙烤蔬菜) 40g×30/箱 CIF USD0.33 EAN 955 6184 040 000
- 成本=**CIF USD/UNIT**(每單支);箱入=CIF/CTN÷CIF/UNIT(16、30);⚠️無棧板欄→東南亞規則用 **箱/板≈1.1÷M3** 換算(0.0324→34、0.0515→21)。

**義大利咖啡(Attibassi/Meseta/Grandeca)34支** — 詳見下。

**新供應商 SP100063「Attibassi / Meseta (Co.Ind)」** — 桌面兩份2026 Export pricelist建檔。
- 三品牌同一供應商(同集團Co.Ind S.p.A.生產):Attibassi 9支、Meseta 22支、Grandeca低咖啡因3支。
- 類型:咖啡豆11、研磨咖啡6、Nespresso膠囊10、E.S.E.咖啡包3、Dolce Gusto膠囊4。
- 建檔規則(Tina確認):**全通路、利潤20%、成本用€每單支(single)、幣別EUR、常溫、交易模式TDS收佣金(付款TDS settlement)**。箱入數=single packs/group、箱/板=group packages/pallet(逐支抓報價單棧板資訊)。新增欄`阿拉比卡%`、`咖啡碼`。
- ⚠️去重:Grandeca(011020/010896/011016)兩檔重複→保留一次;E.S.E.三支EAN皆"no"→改用產品碼當去重鍵(否則只留1支)。
- 付款條件待補;COO/EXW待向供應商確認。

---

## 2026-06-24（更新 52）— 通路級台幣公式(萊爾富)＋VE啤酒106支＋好市多模式＋箱板統整＋SM-260515改量

**1. 通路級台幣公式架構(萊爾富,Tina選B:同產品多通路各存台幣)**
- `twd_formula_config` 加 `_通路公式對照`={"萊爾富":"CH_LAIFU"} ＋ 桶 CH_LAIFU(`formula:laifu`)。比照Feast/TDS:EXW+TDS8.7%→匯率(EUR37/USD32依幣別);冷凍海運3500€÷24板/常溫6萬TWD÷24板;關稅20%(酒類0)、菸酒稅(啤酒度<20:容量L×26;烈酒度≥20:容量L×度×2.5);清關3%;內陸3500/棧板;貼標2/瓶;無倉儲;利潤25%。
- `compute_twd`:compute()加laifu分支;build_records()**逐通路算**,rec帶channel。`apply_twd`:有channel→寫`通路台幣[通路]`(與預設台幣並存)。`sync_html_data`:業務HTML的D陣列 **r[24]=合作狀態、r[25]=通路台幣**。業務報價系統HTML:`twdMin/twdFloor/isPerUnitTWD`輔助,選萊爾富客戶→顯示萊爾富台幣(每個);CUSTS+萊爾富+下拉選項。
- ⚠️修列印bug:全域替換r[20]誤改`x.r[20]→x.twdMin(r)`致printQ拋錯,已改`twdMin(x.r)`。

**2. VE Volfas Engelman(立陶宛啤酒)106支** — 一般通路外幣(利潤10%)＋萊爾富台幣;容量L/度數/是否酒類欄;NORDLAND40%唯一烈酒。

**3. 好市多Costco模式** — compute_twd加`formula:costco`分支(EXW+2%內陸+海運10萬=CIF→關稅20%+報關3%+卸櫃1萬→×1.10無VAT);首例SP100010 Bianco Forno。

**4. 建檔/修正** — Wang Food 86支(常溫美廉社/冷凍家樂福,CBM推箱板);Gusto義大利冷凍披薩4支(Feast+TDS);Di Biase 6支(規格去重+官方箱板450g→12/81,1kg→8/81);Chaeum箱入30箱板60、Juice-Up箱板36(補抓Carton/Pallet);Omogary改韓國公式;冰塊完稅港口交貨。

**5. 箱板統整** — 372支缺箱板:從訂單PO/內部檔回填~21支;查證**箱板只有已進口品才有記錄**(成本計算主檔兩版Excel對未進口品都空白)。剩351→歐洲/土耳其/埃及234(Mirko清單+Gmail草稿)、東南亞117(待CBM)。⚠️規則:東南亞給CBM換算/歐土埃給棧板(透過Mirko)。

**6. SM-260515 水煮鮪魚 680→667** — 7份NEXO文件重生+稽核;orders.json銷售端(GJ應收39,927.60)+現金流;工廠成本32,805.40→32,502.76、應付尾款扣回22,661.14;⚠️高玉→Mas採購PO走Tina採購系統需自行重出。

**7. 中文品名補84支** — COOP39+TDS葡萄酒27+Bodegas6+VERGA4+其他8(原中文名空白顯示成規格;英文翻中,葡萄酒保留品種/產區)。

**8. 系統稽核+維護** — 無語法錯/無孤兒腳本;備份清理統一(每檔留5份);⚠️刪除桶機制(刪進階ERP檔不永久刪,mv到桌面進階ERP_刪除桶);apply_twd同名+EAN空白會錯置(品名帶規格去重)。

---

## 2026-06-11（更新 51）— 修復訂單加總金額 bug（Kao 回報 SM-260531 GoMuc）

**根因**:訂單分頁「單價」欄語意=每個(×箱入數加總),但客戶PO(美廉)用**箱價**(如38.48/箱)→ Kao 照PO填箱價,總額被多乘24/48倍。報價分頁(每個)與訂單分頁兩套基準且欄位未標示。
**修法(訂單側統一「箱單價」基準,與客戶PO一致)**:
- `defaultOrderPrice`/`ensureOrderItem`:預設帶入=每個底線×箱入數;報價分頁帶入訂單自動×箱入數;回寫報價分頁÷回每個。
- `renderSimpleOrder`/`doPrintOrder`/`doExportCSV`/通知摘要:小計=**箱價×箱數**;底線警示(最低/公司底線)×箱入數同基準;欄名改「**箱單價**(同客戶PO;Feast台幣=/個)」。
- Feast台幣不受影響(ctn=1 維持/個)。
- 匯出JSON:`qty=箱數`(原誤為個數)、`agreedPrice=箱價`、新增 `priceBasis:'carton'/'unit'`、minPrice/floor 各×箱入數;`totalAgreed=箱價×箱數`。
- `import_order.py`:check_prices 底線×箱入數(依priceBasis)再比;build_records 成本(每個)×箱入數×箱數。
- 驗算:GoMuc烤魷魚 38.48×25箱=962.00=美廉PO ✓(舊bug會算成46,176)。
- SM-260531 訂單本身以 Kao email 的PDF為準;系統修復後可重新輸入/匯入。

---

## 2026-06-11（更新 50）— Surgenuin 冷凍麵餃 12 品入系統（星巴克,台幣套 Europastry 公式）

依 Surgenuin 價目表(2026-06-11,有效至 12-11;TuttoFood米蘭接洽)入系統:
- **SP200012 Surgenuin**(義大利,冷凍義式麵餃 Chicche)｜EUR·**EXW**·**預付款**｜適用通路=**星巴克**(台幣到倉)。
- 12 品:500g×8/箱 6 款(肉醬3.39/番茄培根3.12/青醬3.58/鴨4.47/鮭魚3.35/番茄章魚3.16)+ 280g MONO×10/箱 6 款。
- 台幣公式:`twd_formula_config` 新增 SP200012 = **複製 Europastry 參數**(匯率37/關稅20%/VAT10%/倉儲240000×1/內陸30000固定/貼標10.5/利潤25%)。已套公式寫入(台幣價來源=公式):500g 最低報價 230~318、280g 141~197。
- ⚠️ **兩個待確認**:①箱/板=90 為假設值(Europastry中位數),待供應商棧板資料;②報價是 **EXW**,Europastry公式以CIF為基準**未含海運費**——台幣價偏低,若要含運需補 freight 參數(Tina 定)。
- 交易模式對應 +Surgenuin(買進/D);PDF 歸檔原始附件;產品 639→**664**。

---

## 2026-06-11（更新 49）— NEXO 多方文件自動生成器（小T 代做兩套文件）

NEXO 三方單轉手需做多套文件 → 新建 `03_腳本/gen_nexo_docs.py`:一張單自動生成 **2套×3份=6份PDF**(高玉→NEXO 與 NEXO→客戶 各 PI/CI/PL,NEXO套由高玉代做)。
- 單一規格檔 `data/nexo_docs/<客戶PO>.json` → 六份文件品項/條碼/數量/重量/效期**保證互相一致**。
- 留利自動算+驗算(≥1萬→450/<1萬→150,2026-05起),以 Discount 行呈現(依歸檔 SM260103 版式)。
- 規則(Tina):輸出 PDF｜發票號 Tina 給｜檔名帶小T。內嵌 Arial Unicode 字型(任何閱讀器中文正常)。
- 首例 SM-260515 六份已生成(`02_訂單資料/NEXO文件/SM-260515/`),總額40,752→Discount 450→高玉售NEXO 40,302 ✓。
- 待補欄位(TBA):船名/ETD/ETA/櫃號/效期/淨毛重(等工廠PL)+發票號(Tina 給)→ 補進規格檔重跑即可。

---

## 2026-06-11（更新 48）— 文件核對系統:建系統切分點 + 文件可點連結

**Tina 切分規則(一次性,建系統時)**:推算已到港的 → 文件全標綠(通過)歸檔、不再追舊文件;還沒到港的 → 從現在起用系統追(之後到港仍要正常核對,不自動轉綠)。
- 已到港 2 張標綠:**26FD24003**(到港6/8)、**SM-260515**(到港6/9);物流看板同步清催件。
- 其餘 8 張(海運中/待出貨)持續追蹤;26FP23020 維持⚠️不符待TDS重出。
- **文件可點連結(📎)**:文件卡有連結者可直接點開 Drive 原始檔(看/下載/轉客戶);示範4個PI連結。
- ⚠️ Tina Kao 要點得開,需 Tina 在 Drive 共用資料夾給 tinakao@goldenjadeterre.com(Tina 看完HTML確認後自行設定;Claude不可代改權限)。
- 現況:10張PO → ✅全通過2｜⚠️不符1｜核對中7。

---

## 2026-06-11（更新 47）— 訂單文件核對系統（Tina Kao 可用）

依 Tina 規格建獨立系統:每張PO以「PO號+內容」為準,核對 5 文件(序 **PI→PL→COO→CI→HC**),要與PO吻合且彼此吻合(**條碼/品名/重量/效期/收貨人公司名+地址**);核對無誤→**歸檔+標提供日期**。
- `data/文件核對.json`(資料模型:每PO的5文件狀態+提供日期+5核對欄位+備註),種子=10張在途PO。
- `03_腳本/gen_doc_check.py` → `訂單文件核對系統.html`:每PO一張卡,5文件狀態色標+提供日,文件互比欄位(條碼/品名/重量/效期/收貨人),搜尋/篩選,RWD。已接 update_all(第5步)。
- 狀態:待提供/已收/核對中/**通過(歸檔)**/不符;卡片色標+統計卡(不符/核對中/全通過)。
- 加進 index:**Tina Kao** + 管理者 都有(🚢物流貨況 + 📑訂單文件核對)。
- 現況:10張PO,26FP23020 標⚠️不符(文件互相不一致)。

---

## 2026-06-11（更新 46）— 文件智能核對機制（從 Drive 讀文件比對）

確認 Claude **可直接讀取 Tina Google Drive 的文件內容**(文字版PDF直讀;掃描版需下載+OCR)。
- 首次實際核對 **26FD24003**(全聯PO ↔ orders.json):抓到 2 個真實錯誤
  - ⚠️ **產地錯**:訂單記「愛沙尼亞」,PO 實為「立陶宛 Lithuania」(Volfas廠在Kaunas/出Klaipėda)→ **已修正**;海運天數補 立陶宛=70。
  - ⚠️ 單價分項:訂單4款都填平均8.94,PO各不同(9.36/8.64/8.88/8.88);總額€30,896.64一致、TDS分潤不受影響,暫不動。
  - ✅ 條碼EAN×4、數量×864、ETD/ETA 皆一致。
- 建 `02_訂單資料/核對報告/`(README機制說明 + 26FD24003報告)。機制:跟Claude說「核對 PO xxx」→ 搜Drive讀文件→逐欄比對→出報告。
- 限制:完整「文件互比」需出貨文件(Invoice/PL/COO)都在Drive;掃描檔需OCR。

---

## 2026-06-11（更新 45）— 物流文件追蹤 + 催件（從 Gmail 掃描）

延伸物流看板:解決進出口最痛的「文件缺件/遲到/不一致」。
- 文件全部進 Tina Gmail(TDS訂單→TDS郵件;NEXO/直採→供應商直寄,cc報關行Apollo)。
- 我用「文件來源」批次搜 Gmail,建 `data/文件追蹤.json`:每張PO的 6 種文件(PI/CI/PL/BL/COO/COA)狀態(✓收到/⏳處理中/⚠️有錯/❌缺)+ 窗口 + 催件待辦。
- `gen_logistics.py` 升級:看板加「文件六格(色標)+ 催件欄」+「⚠️文件異常」卡;搜尋含催件內容。
- 掃了 13 張在途PO。實例:**26FP23020 紅旗**(Tina Kao 5/19列:CI未提供、PL缺字樣/棧板數/Gross weight對不上、COO品名與PL/PI全不同、PZ/CFZ不一致);SM-260515(PI✓但未出貨,Kao今天在催);26FD24003(BL放行確認中)。
- 報關行=Apollo Logistics(Anna Yeh);TDS窗口=Mirko Puri/Ivano。
- B(文件智能核對):你把某PO文件存 `02_訂單資料/進口文件/PO號/`,我讀PDF逐欄交叉比對(已具備能力,待你丟檔)。
- 待續:其餘在途PO補掃、實際收件回填、缺件自動催件信草擬。

---

## 2026-06-11（更新 44）— 物流貨況追蹤看板 v1（系統藍圖 #3）

新模組:每張 PO 的物流生命週期一頁看(下單→海運中→到港報關→已到倉)。
- `data/物流海運天數.json`:各產地海運天數(Tina 提供:馬來/泰/印尼/中/韓=10、義/西=60、土/愛沙尼亞/埃=70),到港→到倉 +10天。
- `03_腳本/gen_logistics.py`:自動算狀態+預計到港/到倉+單據(發票/BL)→ 產生 `物流貨況追蹤.html`。已接進 `update_all.py`(第4步)。
- 看板:預設只顯**未到倉**(歷史已到倉摺疊),可搜尋/篩選(狀態·產地),手機RWD,色標(待出貨灰/海運中藍/到港報關橙/已到倉綠/延誤紅)。
- 狀態**自動推估**,可被 orders.json 的 `物流狀態` 欄**手動覆寫**(已報關/已到倉/延誤);手動者顯示 ✏️。
- 加進 index.html「管理者」tab(🚢 物流貨況追蹤)。
- 現況:129張PO,未到倉20(待出貨7/海運中11/到港報關2)。日期驗證正確(26FD24003愛沙尼亞BL3/30+70=6/8到港·報關中;義大利60天海運中)。
- 待擴充:PI/PL/COO/COA 單據齊備度、實際到港/到倉回填、延誤自動偵測。

---

## 2026-06-11（更新 43）— 新增韓國 2 供應商 13 產品（果汁）

依 Tina 兩封報價郵件（首爾食品展接洽）入系統：
- **Chaeum F&B（SP100056）**｜USD·FCA｜有機果汁 3 款（檸檬/西梅汁 2.40、藍莓泥 4.93 /盒）｜聯絡 Brad CHUN brad.chun@chaeumfnb.com。備註:有自有廠可OEM;報價為有機,台灣可改一般原料降成本。
- **WHALEZ「Juice-Up!」（SP100057）**｜KRW·FOB｜10 款 80ml×10入（南瓜/西梅/石榴/蘋果/梨桔梗/血橙/ABC/檸檬/紅豆/黑豆）｜FOB 7,500 KRW/盒（最貴量級）｜聯絡 Sean(CEO) whalezjuice@naver.com。
- 參數（Tina）：一般通路、USD 匯率 31、KRW 49=1台幣、成本價用最貴量級（盒價）。
- 利潤：原 20%，2026-06-11 Tina 調為 **28%**（新產品想多賺一點）→ 最低報價:有機檸檬/西梅 3.33、藍莓泥 6.85 USD;WHALEZ 各款 10,417 KRW。
- 桌面原始報價（Juice-Up xlsx、Offer Sheet pdf）已歸檔 `02_訂單資料/原始附件/`。
- 寫入 `products_final.json`(639→652)、`supplier_master.json`(+2,含完整聯絡/地址)、`交易模式對應.json`(兩家→買進轉手C)。
- `import_order.py` DEFAULT_RATES 補 KRW(0.0204)。已 publish_all 全同步。
- ⚠️ 待補:WHALEZ 賞味期、兩家 EAN/條碼、MOQ;**成本計算主檔.xlsx 需連動**(外幣一般通路)。

---

## 2026-06-07（更新 42）— 交易模式自動判定（業務只選供應商+產品）

需求：業務下單只選「供應商 + 產品」，系統要自動判是哪種交易型態(TDS/NEXO/PC/D/E)。
- 新增 **`data/交易模式對應.json`**：供應商→模式對應表(21家1對1)+ Pietro Coricelli 品牌判斷(Cirio→TDS / PC品牌→PC，靠品名或客戶)+ 特例。
- 新增 **`03_腳本/classify_mode.py`**：`classify(供應商,產品,客戶)` → (模式,類別,依據)；可獨立稽核 orders.json。
- 整合進 **`import_order.py` 的 `determine_mode()`**：優先用對應表判定，判不出才退回原邏輯/詢問。
- **稽核結果(262筆)：類別一致 251、真不符 0、未分類 11**(全為客戶=高玉的墊付/代墊內部單，本應人工確認)。
- 新供應商不在表 → 自動標「未分類_待確認」，不亂猜，Tina 分類一次即記住。
- 客戶=高玉(墊付/代墊/內部) → 自動標待確認。

---

## 2026-06-07（更新 41）— TDS 佣金規則更正：應收 = 毛利原值（不再×50%）

比對 `訂單彙整表2605.xlsx_` 確認:orders.json 的 `毛利_台幣` **就是彙整表「高玉收款金額」×匯率,本身已是淨額(已扣50%)**。
- 驗證:SM-250677 = 3,063.45×34 = **104,157** ✓;25FA25001 = 3,290.4×37 = **121,745** ✓
- 規則更正:`auto_schedule` 的 TDS 佣金 **從 毛利×50% 改為 = 毛利原值**(×1)
- 啤酒 26FD24003 移除臨時 override,改走統一規則(4×14,066 = 56,264,結果不變)
- TDS 佣金應收 58 筆,合計 **台幣 3,277,749**(= 全部毛利);總事件維持 **193**
- 彙整表欄位 `給供應商訂單金額`/`高玉收款金額`;有空格位移,讀取先壓 None 再依 CIF/EXW 錨定
- 📌 未來:Tina 會提供產品成本讓系統自算毛利(屆時毛利定義可能改變,規則需再確認)

---

## 2026-06-07（更新 40）— 修正「3/5 revised」啤酒單(歸真實PO 26FD24003)

Tina 指認「3/5 revised」是 Volfas Engelman 啤酒單(生活良好,唯一一張,4 SKU,總毛利56,264)。
- `高玉PO編號` 的垃圾值「3/5 revised」**清空** → 改用真實 `客戶PO 26FD24003`
- 凍結基準移除 stale 的「3/5 revised」應收 56,264(經 Tina 明確指示,屬「已發生放著」的例外）→ 凍結 133→132
- 啤酒歸 26FD24003,用 TDS 規則(BL+90 = 2026-06-28）
- ⚠️ **更正(Tina)**:啤酒毛利當時輸入時已是 50% 後的數(56,264 本身就是佣金)→ 改用明確明細 `現金流_應收`=毛利原值,**不再×50%**;應收 = **56,264**(非 28,132)
- 現金流事件 190 → **193**;「3/5 revised」殘留 0

---

## 2026-06-07（更新 39）— TDS 訂單核對修正 + 全部拉進現金流

用桌面 2 個 ZIP 訂單確認(美廉社29張 / 生活良好26張,已收進 `02_訂單資料/客戶訂單確認/`)逐張核對 TDS 訂單。

**關鍵釐清(Tina 確認)：** PO 確認單上的供應商 **TERRE DI SEMIA S.R.L. = TDS**(代理/集貨商)；orders.json 的「供應商」記**品牌商**(Verga酒/Kozakli·TERRE油/Pietro Coricelli·Cirio)。兩者不同是正常,供應商欄**不改**。

**修正 3 個機械性錯誤(金額皆與 PDF 吻合)：**
- `SM-251202` BL `2025-01-18`→`2026-01-18`(年份打錯)
- `SM-250905`→`SMO-250905`(PO漏O)、補 BL `2025-11-01`(PDF ETD beginning of Nov)
- `26FP250010`→`26FP250013`(PO號錯;3項 14,364/14,904/17,712 EUR 完全吻合)

**全部 TDS 訂單拉進現金流：**
- 25 張 PO / 60 SKU 設 `納入現金流=true`,全部有 BL ✓
- 套 auto_schedule TDS 規則(毛利_台幣×50% @ BL+90、與TDS清帳)→ 產生 **54 筆應收,合計台幣 1,610,747**
- `3/5 revised`(Volfas啤酒)4 筆自動略過(已在凍結基準,記為佣金56,264,無重複)
- 現金流事件 136 → **190**(133凍結 + NEXO 3 + TDS 54)

⚠️ 已知:`小計_外幣` 欄位部分訂單壞值(顯示偏小);`成交單價×數量_箱`/`台幣小計` 正確。PC佣金規則改用 `成交單價×箱`,不依賴壞欄位。
⚠️ 待議:凍結基準「3/5 revised」記全額毛利(100%)非50%,依「已發生放著」原則暫不改。

---

## 2026-06-07（更新 38）— 首張真實新訂單跑全流程：SM-260515（NEXO 三方轉手）

Tina 補充重要商業模型：**給 NEXO 的訂單是三方轉手**
```
泰國廠(Mas Choices) → 高玉 → NEXO → 最終客戶(美廉社)
```
- **每張訂單留 NEXO US$450 利潤** → 高玉售NEXO = NEXO售價 − 450。
- 決策（四題皆「1」）：客戶欄位=NEXO（美廉社記最終客戶）；NEXO付高玉=B/L copy後45天；高玉付泰國廠=訂金30%(下單)+尾款70%(BL)；450按金額比例分攤。
- PO 第2項 PDF 印 700箱有誤，實為 **680箱**（依 Tina）。

SM-260515 轉換結果：
- 客戶→NEXO Resources Sdn Bhd.，最終客戶→美廉社
- 高玉售NEXO = 40,752 − 450 = **US$40,302**（油浸29.91×700、鹽水28.48×680）
- 高玉成本(付泰國廠) = US$32,805.4，毛利 18.9% / 18.3%
- 現金流 3 筆：應收 NEXO 40,302 @ 7/14(B/L+45)；應付泰國廠 訂金30% @ 5/20、尾款70% @ 5/30

機制升級：
- `gen_cashflow.py` 新增 **分期明細支援**（`現金流_應收` / `現金流_應付` 陣列）→ 可拆訂金/尾款、CIF後X天；無明細時 fallback 單筆全額。
- 現金流事件 133 → **136**。

---

## 2026-06-07（更新 37）— 現金流事件產生器（新訂單自動入帳）

Tina 決策「3」:已發生的 133 筆放著(凍結),只有從現在起的新訂單才自動建立現金流事件。
- **凍結基準** `data/cashflow_base.json` = 現有 133 筆已發生事件,永遠不變動。
- 新建 `03_腳本/gen_cashflow.py`:凍結基準 + 「標記 `納入現金流=true` 的新訂單」→ 自動產生應收/應付事件 → 注入現金流HTML。
- 已接進 `update_all.py`(第3步),`publish_all.py` 連帶執行。
- 規則:新訂單該筆 orders.json 需 `納入現金流=true` + 應收(應收金額>0且收款日期_應收)/應付(應付金額>0且付款日期_應付);缺日期那邊自動略過、不亂估;PO 已在基準中則略過不重複。
- 驗證:目前 0 筆標記 → 現金流維持 133(正確);合成訂單測試 → 完整訂單產生應收+應付兩筆、缺日期那邊正確略過、台幣/外幣分流正確。
- 歷史的 82 個真實舊PO(缺收付日期)依決策不納入,維持現狀。

---

## 2026-06-07（更新 36）— 修復現金流預估表（EVENTS 被誤灌 orders）

⚠️ Bug:連動工作時我把 orders.json 直接灌進現金流 `const EVENTS`,但現金流 JS 需要的是
**衍生的應收/應付事件結構**(po/counterpart/type/date_est/foreign_amt/twd_amt/mode/pay_nature/ym),
欄位不同 → 整表 undefined/非數值。
修復:
- 從 rebuild_html.py **移除** EVENTS 注入(只保留日期戳更新)
- 從 git 1c8f5bb(6/3,133筆)還原正確的現金流 EVENTS + 補 viewport
- ⚠️ 現金流 EVENTS 為衍生結構,**不可直接灌 orders.json**;目前為靜態,
  若要隨訂單自動更新需另寫 orders→應收應付事件 產生器(待辦)

---

## 2026-06-07（更新 35）— 採購 PO 中英對照齊全

- 確認採購單(寄外國供應商)所有中文都有對應英文
- 補 Feast/TDS 版 buildTdsPO 的中文-only:供應商標籤、TDS佣金/總額欄、Remark 1&2 都補上英文
- buildOnePO(一般版)已全雙語,掃描無中文-only
- 保留中文,英文為主(供應商看英文)

---

## 2026-06-07（更新 34）— 採購自行下單:限同一供應商 + 多選產品

- **一張訂單限同一供應商**:先選供應商(下拉)鎖定;切換供應商若清單有別家→確認清空(mSupCode 鎖定)
- **多選產品**:該供應商產品以勾選清單呈現,可一次勾多項→「➕ 加入所選產品」一次加入
- 搜尋限縮在所選供應商內;未選供應商會提示「請先選供應商」
- 購物車仍可逐項改價/箱數,單一供應商→必為一份 PO

---

## 2026-06-07（更新 33）— 修正採購 PO 交易條件（用供應商報價條件）

⚠️ 採購是下單給供應商,Trade Term 必須用「成本交易條件」（供應商報價條件）：
- Feast=**EXW**、Europastry=**CIF**、VIRU=**FOB**（先前誤用「報價交易條件=到倉價」）
- 修 sync 轉鍵 `inc` 改取 `成本交易條件`；移除 buildOnePO 自動加的「Keelung, Taiwan」後綴
- 到倉價是「對客戶的報價條件」,與「對供應商下單的條件」不同,不可混用

---

## 2026-06-07（更新 32）— Feast 走 TDS 專屬 PO 格式

依實際訂單「土耳其FEAST 26FZ0001.xlsx」做出 Feast/TDS 專屬採購 PO 版型：
- **路由**：`const TDS_RATE={'SP200001':0.08}`；buildAllPO 偵測供應商→Feast 走 buildTdsPO,其餘走 buildOnePO
- **抬頭 SUPPLIER = TDS**（Mirko Puri,非 Feast）
- **欄位**：單價/包(EXW) + 「TDS 8%佣金」欄 + 總金額；數量 包/箱/板 三欄
- **8% 算法**：總額 = 單價 × 數量(包) × 1.08（與 Excel 對帳吻合,如楔型薯塊 1.12×800×1.08=967.68 ✅）
- Europastry/VIRU 直接買 → 用一般 buildOnePO（無8%欄,總額不×1.08）
- 草稿浮水印/確認蓋章/PDF 同其他 PO

說明：採購系統選 Feast 自動產出此格式;Europastry/VIRU 自動用直接格式。

---

## 2026-06-07（更新 31）— 採購系統升級：選供應商→建單→蓋章→PDF

國際採購下單系統「自行下單」大升級：
1. **🏭 選供應商** → 自動帶出該供應商全部產品（品名/規格/廠商報價/付款條件）；或仍可搜尋
2. **編輯價格**：購物車整箱報價可改，即時算小計/合計（多幣別）
3. **付款條件**：依所選供應商自動帶出
4. **草稿 → 確認**：「生成 PO 草稿」顯示草稿浮水印；「✅ 確認生成正式訂單」→ **蓋上公司發票章**（高玉統一發票專用章,base64嵌入,確認後才顯示）、移除草稿
5. **PDF**：列印/存 PDF（A4橫式,章與版面清晰）寄廠商
   - ⚠️ PDF 由系統產生,**寄信由 Tina 自己寄**（不自動寄）

技術：const SEAL（透明章320px base64）；PRODS 加 pay；buildOnePO 支援 customCarton 改價；
CSS body.confirmed 控制章顯示。已驗證流程（選Europastry→105產品→改價→PO→付款條件）。

---

## 2026-06-07（更新 30）— 採購自行下單帶出付款條件

- 自行下單原本 `supPayment:''`（空）→ PO 沒帶付款條件
- 修：PRODS 轉鍵加 `pay`（=products_final 付款條件）；mGenerate 依所選供應商帶入
- 現在手動下單 PO 會顯示該供應商付款（如 Europastry→BL 60天、順發→訂金30%BL70%），與自動帶入訂單一致
- ⚠️ 付款條件屬機密欄，但採購PO是對供應商、本就需付款條件（內部Tina工具）；
  與既有「成本價已在PRODS」同等級的內部資料，可接受

---

## 2026-06-07（更新 29）— 全同步一鍵化（杜絕選擇性推送）

問題：先前推 github 時「選擇性只推有變的檔」，造成 main 與 github 時間差/看似沒同步。
修正：新增 `03_腳本/publish_all.py`，**一個指令把整條管線全量跑完**：
```
update_all（資料→HTML）→ compute_twd（台幣審核/公式頁）
→ 複製全部交付HTML+del資料+CHANGELOG → github
→ git add -A / commit / push（Netlify）→ rsync 全資料夾 → Seagate
```
原則：**每次都全量更新+同步+上傳，不再由人/AI 挑要推哪些**。三處（本機/GitHub/Seagate）必然一致。
日常只要：改資料 → `python3 03_腳本/publish_all.py`。

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
