// ============================================================
// 相關新聞報導
// 暫時使用 JavaScript Object 管理，不寫入 SQLite
// ============================================================

const fraudNewsLinks = {

    "網路購物詐騙":
        "https://www.cna.com.tw/news/asoc/202603170179.aspx",

    "假投資詐騙":
        "https://news.cnyes.com/news/id/6575981",

    "釣魚連結詐騙":
        "https://www.police.taichung.gov.tw/youth/home.jsp?id=9&parentpath=0,1&mcustomize=news_view.jsp&dataserno=202405270007&mserno=201710280074",

    "假中獎通知詐騙":
        "https://police.npa.gov.tw/ch/app/data/view?module=wg081&id=1835&serno=af016087-5c60-42b4-89f3-2b0249fe4fee",

    "假求職詐騙":
        "https://www.peoplenews.tw/articles/anti-fraud-alert/49142",

    "假借銀行貸款詐騙":
        "https://tw.news.yahoo.com/%E8%A9%90%E5%9C%98%E5%81%87%E8%B2%B8%E6%AC%BE%E7%9C%9F%E8%A9%90%E9%A8%99-%E5%89%8D%E9%8E%AE%E8%AD%A6%E7%93%A6%E8%A7%A3%E9%87%8D%E8%A6%81%E9%87%91%E6%B5%81%E7%AF%80%E9%BB%9E-095900984.html",

    "騙取金融帳戶(卡片)詐騙":
        "https://udn.com/news/story/124490/9687403",

    "猜猜我是誰詐騙":
        "https://cnews.com.tw/204230905a01/",

    "假快遞詐騙":
        "https://tw.news.yahoo.com/14%E5%AE%B6%E7%89%A9%E6%B5%81%E5%8B%BE%E8%A9%90%E5%9C%98%E9%80%81%E5%81%87%E5%8C%85%E8%A3%B9-140815608.html",

    "假檢警詐騙":
        "https://c2.police.gov.taipei/News_Content.aspx?n=2DC3338BBEDB001E&sms=1108C7E3ACB5AF54&s=DDC20AFFFC3AC2FB",

    "假交友(投資詐財)詐騙":
        "https://www.cdns.com.tw/articles/1437686",

    "假冒公務機關詐騙":
        "https://tw.news.yahoo.com/%E5%B1%80%E9%95%B7%E4%B8%8D%E6%9C%83%E6%89%93%E7%B5%A6%E4%BD%A0%E5%8A%A0line-%E8%A9%90%E9%A8%99%E9%9B%86%E5%9C%98%E5%81%87%E6%89%AE%E5%AE%98%E5%93%A1%E9%A8%99%E5%80%8B%E8%B3%87-%E6%96%B0%E5%8C%97%E7%B1%B2%E6%B0%91%E7%9C%BE%E5%8D%83%E8%90%AC%E5%88%A5%E4%B8%8A%E7%95%B6-090200487.html",

    "假冒銀行詐騙":
        "https://www.storm.mg/lifestyle/11155957",

    "假冒電商客服詐騙":
        "https://www.storm.mg/lifestyle/11155904",

    "假冒親友詐騙":
        "https://news.immigration.gov.tw/Column/Detail/ec0f7787-f1dc-4b17-b8cb-536123bb21ce?category=9&lang=TW",

    "假網拍詐騙":
        "https://md-fraud.police.gov.taipei/News_Content.aspx?n=BD99F0864A7983ED&sms=25A240A82B494F61&s=2B30BDBFE07B6970",

    "假慈善募款詐騙":
        "https://www.gvm.com.tw/article/129376",

    "虛擬貨幣詐騙":
        "https://news.cnyes.com/news/id/6579613",

    "網路博弈詐騙":
        "https://udn.com/news/story/124490/9694801",

    "假票券詐騙":
        "https://cdn-news.org/News.aspx?EntityID=News&PK=0000000082bca9b27e9763ae3aaaef4897426497794f89cf",

    "假租屋詐騙":
        "https://news.housetube.tw/17570",

    "假解除分期付款詐騙":
        "https://www.storm.mg/lifestyle/11155904",

    "假買家騙賣家詐騙":
        "https://tw.news.yahoo.com/%E8%B3%A3%E8%B2%A8%E4%BE%BF%E9%9C%80%E8%A6%81%E5%AF%A6%E5%90%8D%E8%AA%8D%E8%AD%89-%E5%88%91%E4%BA%8B%E5%B1%80%E6%8F%90%E9%86%92%E5%8D%83%E8%90%AC%E5%88%A5%E4%BF%A1%E5%81%87%E5%AE%A2%E6%9C%8D-105453160.html"
};


// ============================================================
// 處理文字換行
// ============================================================

function formatText(text) {

    // 避免 null / undefined 導致 replace() 錯誤
    if (!text) {
        return "";
    }

    return text.replace(
        /\n/g,
        "<br>"
    );
}


// ============================================================
// 建立詐騙卡片
// ============================================================

function renderFraudCards(frauds) {

    const fraudList =
        document.getElementById(
            "fraud-list"
        );


    fraudList.innerHTML = "";


    if (frauds.length === 0) {

        fraudList.innerHTML = `
            <p class="no-result">
                找不到符合條件的詐騙資料
            </p>
        `;

        return;
    }


    frauds.forEach(
        function (fraud) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "fraud-card";


            card.innerHTML = `

                <h3>
                    ${fraud.name}
                </h3>

                <p>
                    編號：${fraud.id}
                </p>

                <button
                    onclick="showFraudDetail(${fraud.id})"
                >
                    查看詳細資料
                </button>

            `;


            fraudList.appendChild(
                card
            );

        }
    );
}


// ============================================================
// 載入所有詐騙資料
// ============================================================

async function loadFrauds() {

    try {

        const response =
            await fetch(
                "/api/frauds"
            );


        if (!response.ok) {

            throw new Error(
                "取得詐騙資料失敗"
            );

        }


        const frauds =
            await response.json();


        console.log(
            "所有詐騙資料：",
            frauds
        );


        renderFraudCards(
            frauds
        );


        document
            .getElementById(
                "search-message"
            )
            .textContent =
            `目前共有 ${frauds.length} 種詐騙資料`;

    }

    catch (error) {

        console.error(
            "載入詐騙資料錯誤：",
            error
        );


        document
            .getElementById(
                "fraud-list"
            )
            .innerHTML =
            "資料載入失敗";

    }
}


// ============================================================
// 搜尋詐騙
// ============================================================

async function searchFrauds() {

    const input =
        document.getElementById(
            "search-input"
        );


    const keyword =
        input.value.trim();


    if (!keyword) {

        alert(
            "請輸入搜尋關鍵字"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `/api/search?q=${encodeURIComponent(keyword)}`
            );


        if (!response.ok) {

            throw new Error(
                "搜尋失敗"
            );

        }


        const data =
            await response.json();


        console.log(
            "搜尋結果：",
            data
        );


        renderFraudCards(
            data.results
        );


        document
            .getElementById(
                "search-message"
            )
            .textContent =
            `搜尋「${data.keyword}」，找到 ${data.count} 種相關詐騙`;

    }

    catch (error) {

        console.error(
            "搜尋錯誤：",
            error
        );


        document
            .getElementById(
                "search-message"
            )
            .textContent =
            "搜尋發生錯誤";

    }
}


// ============================================================
// 清除搜尋
// ============================================================

function clearSearch() {

    document
        .getElementById(
            "search-input"
        )
        .value = "";


    loadFrauds();
}


// ============================================================
// 顯示單一詐騙詳細資料
// ============================================================

async function showFraudDetail(fraudId) {

    try {

        console.log(
            "準備取得詐騙 ID：",
            fraudId
        );


        // ----------------------------------------------------
        // 呼叫 FastAPI
        // ----------------------------------------------------

        const response =
            await fetch(
                `/api/frauds/${fraudId}`
            );


        console.log(
            "API Status：",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                `取得詳細資料失敗：HTTP ${response.status}`
            );

        }


        // ----------------------------------------------------
        // 先取得 fraud
        // ----------------------------------------------------

        const fraud =
            await response.json();


        console.log(
            "詳細資料：",
            fraud
        );


        // ----------------------------------------------------
        // fraud 建立後才能取得 newsUrl
        // ----------------------------------------------------

        const newsUrl =
            fraudNewsLinks[
            fraud.name
            ];


        console.log(
            "目前類型：",
            fraud.name
        );


        console.log(
            "相關新聞：",
            newsUrl
        );


        // ----------------------------------------------------
        // 隱藏列表
        // ----------------------------------------------------

        document
            .getElementById(
                "list-section"
            )
            .classList
            .add(
                "hidden"
            );


        // ----------------------------------------------------
        // 顯示詳細頁
        // ----------------------------------------------------

        document
            .getElementById(
                "detail-section"
            )
            .classList
            .remove(
                "hidden"
            );


        const detailContainer =
            document.getElementById(
                "fraud-detail"
            );


        // ====================================================
        // 防詐詳細資訊
        // ====================================================

        let detailsHTML = "";


        if (
            fraud.details &&
            fraud.details.length > 0
        ) {

            fraud.details.forEach(
                function (detail) {

                    detailsHTML += `

                        <div class="detail-card">

                            <h3>
                                ${detail.title}
                            </h3>

                            <p>
                                ${formatText(
                        detail.content
                    )}
                            </p>

                        </div>

                    `;

                }
            );

        }

        else {

            detailsHTML = `
                <p>
                    目前沒有防詐詳細資料
                </p>
            `;
        }


        // ====================================================
        // 案例
        // ====================================================

        let casesHTML = "";


        if (
            fraud.cases &&
            fraud.cases.length > 0
        ) {

            fraud.cases.forEach(
                function (fraudCase) {

                    casesHTML += `

                        <div class="case-card">

                            <h3>
                                ${fraudCase.title || "詐騙案例"}
                            </h3>

                            <p>
                                ${formatText(
                        fraudCase.content
                    )}
                            </p>

                        </div>

                    `;

                }
            );

        }

        else {

            casesHTML = `
                <p>
                    目前沒有相關案例
                </p>
            `;
        }


        // ====================================================
        // 相關新聞按鈕
        // ====================================================

        let newsButtonHTML = "";


        if (newsUrl) {

            newsButtonHTML = `

                <a
                    href="${newsUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="source-button"
                >
                    查看相關報導
                </a>

            `;

        }


        // ====================================================
        // 組合詳細頁
        // ====================================================

        detailContainer.innerHTML = `

            <div class="fraud-detail-header">

                <h2>
                    ${fraud.name}
                </h2>


                <p>
                    詐騙類型編號：
                    ${fraud.id}
                </p>


                <div class="source-links">

                    <a
                        href="${fraud.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="source-button"
                    >
                        查看原始防詐資料
                    </a>


                    ${newsButtonHTML}

                </div>

            </div>


            <h2>
                防詐資訊
            </h2>


            ${detailsHTML}


            <h2>
                詐騙案例
            </h2>


            ${casesHTML}

        `;


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    catch (error) {

        // 這裡會把真正的錯誤顯示在 Console
        console.error(
            "詳細資料載入錯誤：",
            error
        );


        alert(
            "詳細資料載入失敗"
        );

    }
}


// ============================================================
// 基本統計資料
// 只留下 23 / 46 / 23
// 不再建立「每種類型都是 2」的圖表
// ============================================================

async function loadStatistics() {

    try {

        const response =
            await fetch(
                "/api/statistics"
            );


        if (!response.ok) {

            throw new Error(
                "統計資料取得失敗"
            );

        }


        const data =
            await response.json();


        console.log(
            "統計資料：",
            data
        );


        document
            .getElementById(
                "fraud-count"
            )
            .textContent =
            data.summary.fraud_types;


        document
            .getElementById(
                "detail-count"
            )
            .textContent =
            data.summary.details;


        document
            .getElementById(
                "case-count"
            )
            .textContent =
            data.summary.cases;

    }

    catch (error) {

        console.error(
            "統計資料錯誤：",
            error
        );

    }
}


// ============================================================
// 關鍵字統計圖
// ============================================================

async function loadKeywordStatistics() {

    try {

        const response =
            await fetch(
                "/api/statistics/keywords"
            );


        if (!response.ok) {

            throw new Error(
                "關鍵字統計取得失敗"
            );

        }


        const data =
            await response.json();


        console.log(
            "關鍵字統計：",
            data
        );


        const labels =
            data.map(
                function (item) {

                    return item.keyword;

                }
            );


        const values =
            data.map(
                function (item) {

                    return item.count;

                }
            );


        const canvas =
            document.getElementById(
                "keyword-chart"
            );


        // 如果 HTML 沒有 keyword-chart，
        // 就直接跳過，避免整個 app.js 壞掉
        if (!canvas) {

            console.log(
                "找不到 keyword-chart，略過 Chart.js"
            );

            return;
        }


        // Chart.js 沒有成功載入時也不要影響詳細頁
        if (
            typeof Chart ===
            "undefined"
        ) {

            console.error(
                "Chart.js 尚未載入"
            );

            return;
        }


        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: labels,

                    datasets: [
                        {

                            label:
                                "相關詐騙類型數量",

                            data:
                                values

                        }
                    ]

                },

                options: {

                    responsive: true,

                    indexAxis: "y",

                    scales: {

                        x: {

                            beginAtZero:
                                true,

                            ticks: {

                                precision:
                                    0

                            }

                        }

                    }

                }

            }
        );

    }

    catch (error) {

        console.error(
            "關鍵字圖表錯誤：",
            error
        );

    }
}


// ============================================================
// 返回列表
// ============================================================

const backButton =
    document.getElementById(
        "back-button"
    );


if (backButton) {

    backButton.addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "detail-section"
                )
                .classList
                .add(
                    "hidden"
                );


            document
                .getElementById(
                    "list-section"
                )
                .classList
                .remove(
                    "hidden"
                );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ============================================================
// 搜尋按鈕
// ============================================================

const searchButton =
    document.getElementById(
        "search-button"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchFrauds
    );

}


// ============================================================
// 清除搜尋按鈕
// ============================================================

const clearButton =
    document.getElementById(
        "clear-button"
    );


if (clearButton) {

    clearButton.addEventListener(
        "click",
        clearSearch
    );

}


// ============================================================
// Enter 搜尋
// ============================================================

const searchInput =
    document.getElementById(
        "search-input"
    );


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchFrauds();

            }

        }
    );

}


// ============================================================
// 初始載入
// ============================================================

loadFrauds();

loadStatistics();

loadKeywordStatistics();