from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import sqlite3

app = FastAPI()


@app.get("/")
def home():

    return FileResponse(
        "static/index.html"
    )

# ============================================================
# 取得所有詐騙類型
# ============================================================

@app.get("/api/frauds")
def get_frauds():

    conn = sqlite3.connect("fraud.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            url
        FROM fraud_types
        ORDER BY id
    """)

    rows = cursor.fetchall()

    conn.close()

    return [
        dict(row)
        for row in rows
    ]


# ============================================================
# 取得單一詐騙詳細資料
# ============================================================

@app.get("/api/frauds/{fraud_id}")
def get_fraud_detail(fraud_id: int):

    conn = sqlite3.connect("fraud.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    # --------------------------------------------------------
    # 1. 查詢 fraud_types
    # --------------------------------------------------------

    cursor.execute("""
        SELECT
            id,
            name,
            url
        FROM fraud_types
        WHERE id = ?
    """,
    (
        fraud_id,
    ))

    fraud = cursor.fetchone()


    # 如果找不到資料
    if fraud is None:

        conn.close()

        raise HTTPException(
            status_code=404,
            detail="找不到此詐騙類型"
        )


    # --------------------------------------------------------
    # 2. 查詢 fraud_details
    # --------------------------------------------------------

    cursor.execute("""
        SELECT
            id,
            title,
            content
        FROM fraud_details
        WHERE fraud_type_id = ?
        ORDER BY id
    """,
    (
        fraud_id,
    ))

    details = cursor.fetchall()


    # --------------------------------------------------------
    # 3. 查詢 fraud_cases
    # --------------------------------------------------------

    cursor.execute("""
        SELECT
            id,
            title,
            content
        FROM fraud_cases
        WHERE fraud_type_id = ?
        ORDER BY id
    """,
    (
        fraud_id,
    ))

    cases = cursor.fetchall()


    conn.close()


    # --------------------------------------------------------
    # 4. 組成 JSON
    # --------------------------------------------------------

    result = {

        "id": fraud["id"],

        "name": fraud["name"],

        "url": fraud["url"],

        "details": [
            dict(detail)
            for detail in details
        ],

        "cases": [
            dict(case)
            for case in cases
        ]
    }


    return result
@app.get("/api/search")
def search_frauds(q: str):

    q = q.strip()

    if not q:
        raise HTTPException(
            status_code=400,
            detail="請輸入搜尋關鍵字"
        )

    conn = sqlite3.connect("fraud.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    keyword = f"%{q}%"

    cursor.execute("""
        SELECT DISTINCT
            ft.id,
            ft.name,
            ft.url

        FROM fraud_types ft

        LEFT JOIN fraud_details fd
        ON ft.id = fd.fraud_type_id

        LEFT JOIN fraud_cases fc
        ON ft.id = fc.fraud_type_id

        WHERE
            ft.name LIKE ?
            OR fd.title LIKE ?
            OR fd.content LIKE ?
            OR fc.title LIKE ?
            OR fc.content LIKE ?

        ORDER BY ft.id
    """,
    (
        keyword,
        keyword,
        keyword,
        keyword,
        keyword
    ))

    rows = cursor.fetchall()

    conn.close()

    return {
        "keyword": q,
        "count": len(rows),
        "results": [
            dict(row)
            for row in rows
        ]
    }
app.mount(
    "/static",
    StaticFiles(
        directory="static",
        html=True
    ),
    name="static"
)

@app.get("/api/statistics")
def get_statistics():

    conn = sqlite3.connect("fraud.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    # ================================================
    # 每種詐騙有多少 detail
    # ================================================

    cursor.execute("""
        SELECT
            ft.id,
            ft.name,
            COUNT(fd.id) AS detail_count

        FROM fraud_types ft

        LEFT JOIN fraud_details fd
        ON ft.id = fd.fraud_type_id

        GROUP BY
            ft.id,
            ft.name

        ORDER BY ft.id
    """)

    detail_counts = [
        dict(row)
        for row in cursor.fetchall()
    ]


    # ================================================
    # 基本資料數量
    # ================================================

    cursor.execute("""
        SELECT COUNT(*)
        FROM fraud_types
    """)

    fraud_count =cursor.fetchone()[0]


    cursor.execute("""
        SELECT COUNT(*)
        FROM fraud_details
    """)

    detail_count =cursor.fetchone()[0]


    cursor.execute("""
        SELECT COUNT(*)
        FROM fraud_cases
    """)

    case_count =cursor.fetchone()[0]


    conn.close()


    return {

        "summary": {
            "fraud_types": fraud_count,
            "details": detail_count,
            "cases": case_count
        },

        "detail_counts": detail_counts

    }

@app.get("/api/statistics/keywords")
def get_keyword_statistics():

    keywords = [
        "LINE",
        "匯款",
        "投資",
        "OTP",
        "金融卡",
        "網銀",
        "保證金",
        "連結",
        "帳戶",
        "客服"
    ]


    conn = sqlite3.connect(
        "fraud.db"
    )

    conn.row_factory =sqlite3.Row


    cursor =conn.cursor()


    results = []


    for keyword in keywords:

        search_keyword =f"%{keyword}%"


        cursor.execute("""
            SELECT COUNT(
                DISTINCT ft.id
            )

            FROM fraud_types ft

            LEFT JOIN fraud_details fd
            ON ft.id =
               fd.fraud_type_id

            LEFT JOIN fraud_cases fc
            ON ft.id =
               fc.fraud_type_id

            WHERE
                ft.name LIKE ?

                OR fd.title LIKE ?

                OR fd.content LIKE ?

                OR fc.title LIKE ?

                OR fc.content LIKE ?
        """,
        (
            search_keyword,
            search_keyword,
            search_keyword,
            search_keyword,
            search_keyword
        ))


        count =cursor.fetchone()[0]


        results.append(
            {
                "keyword":
                    keyword,

                "count":
                    count
            }
        )


    conn.close()


    results.sort(
        key=lambda item:
            item["count"],

        reverse=True
    )


    return results