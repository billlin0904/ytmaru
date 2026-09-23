# ytmaru · Textamisu

Chrome / Edge 的影片字幕擴充功能。以 Textamisu Agent API token 進行分段語音辨識、字幕翻譯與聊天室／回覆翻譯。

## 安裝

1. **先部署 Textamisu 後端的 live-sessions API**。原有整檔字幕 API 並不能代替這些端點；後端尚未部署時，開始字幕會失敗。
2. 在 Textamisu 建立 API token，至少勾選 `credits:read`、`jobs:create`、`subtitles:read`。
3. 下載此 repository，開啟 `chrome://extensions` 或 `edge://extensions` 的開發人員模式，載入未封裝項目，選擇 `extension` 資料夾。
4. 開啟擴充功能，輸入 token。預設 API 網址為 `https://textamisu.com/api/agent/v1`。自架可指定 HTTPS，localhost 開發環境可用 HTTP。
5. 開啟影片頁，選擇語言與字幕模式後開始。

Token 只存在擴充功能的 `chrome.storage.session`，關閉瀏覽器後需要重新輸入。網頁 content script 不會取得 token，也不會把 token 放入字幕設定或 URL。設定 API 網址時，瀏覽器會要求該來源的存取權。

更新擴充功能後，請重新整理已開啟的影片頁面，讓頁面載入新版字幕面板。0.2.1 修正了首次開啟時用量尚未產生造成的畫面更新中斷，移除原本的 `slow_credit`／USD 估算，並限制額度讀取等待時間。若即時字幕工作階段尚未就緒，會先顯示 API 回傳的帳戶餘額；本次已扣與預留額度須等工作階段回傳，不會以 0 代替。

0.2.2 在 API 回傳 HTML 或其他非 JSON 內容時，會顯示請求方法、接口類型、HTTP 狀態與回應格式，避免只看到「未回傳 JSON」。缺少即時接口時仍須部署後端，更新插件本身不會新增伺服器接口。付費請求恢復時，僅在伺服器明確回傳 `operation_not_found` 才重送同一筆請求；一般網頁 404 不作為重送依據。

## API 與計費

| 功能 | API | 用量 |
| --- | --- | --- |
| 建立／結束工作階段 | `POST /live-sessions`、`POST /live-sessions/:id/end` | 同一影片的字幕與聊天室共用工作階段 |
| 語音辨識 | `POST /live-sessions/:id/stt` | 音訊時長，工作階段累計 |
| 字幕翻譯 | `POST /live-sessions/:id/translate` | 引用已完成的 STT；同一 STT 分句翻譯不重複計時 |
| 聊天室／回覆翻譯 | `POST /live-sessions/:id/chat-translate` | 每累計 1,000 個輸入 Unicode 字元 1 credit，不算譯文 |
| 結果／用量 | `GET /live-sessions/:id/operations/:requestId`、`GET /live-sessions/:id` | 由伺服器回傳實際數字 |

語音辨識和字幕翻譯各沿用 Textamisu 的每分鐘費率，目前預設各 1 credit。分別對整個工作階段累計用量向上取整，只扣新增的差額；並非每個音訊片段或每則留言各進位一次。失敗請求不扣點，同一 request ID 的重送會讀取原結果。

瀏覽器保留原本的影片音訊擷取、MSE 音訊處理、字幕同步與聊天室批次顯示。送出前轉為 PCM16、單聲道、16 kHz WAV，每段最多 30 秒。HTTP 任務回傳 202 時會輪詢結果，**不是 WebSocket 即時串流**。

## 目前範圍

- 後端翻譯支援英語、日語、韓語、泰語、繁體中文。語音可選自動偵測；字幕翻譯使用該段辨識回傳的語言。
- 聊天室須明確指定來源語言；現有翻譯服務尚無混合語言自動偵測。錯誤會直接顯示，不會猜測或改呼叫其他供應商。
- 上游提供片段時間碼，尚未提供逐字時間碼；維持片段字幕時間，不產生假的逐字時間。
- 原服務的 Google／匿名登入、雙錢包、遠端共享字幕、雲端字幕快取與自動背景研究沒有對應的 Textamisu API，已停用。舊供應商的網路路徑另外設有阻擋，沒有轉送或備援。
- 延遲取決於 Textamisu 的語音與翻譯服務；固定同步延遲需實際使用時調整。

## 開發與驗證

```sh
npm ci
npm test
npm run check
npx playwright install chromium
npm run test:browser
```

瀏覽器測試使用獨立暫存 profile、假 token 與攔截的 API 回應，不連使用者帳號，也不扣實際點數。可設定 `YTMARU_BROWSER_CHANNEL=msedge` 使用已安裝的 Edge。這些測試不等於已驗證正式上游服務的延遲或辨識品質。

`extension/` 以本機安裝的 Subruu 0.1.75.4 打包檔案為遷移基礎，保留媒體與字幕功能；新增的 Textamisu 接口、驗證與計費由本專案維護。
