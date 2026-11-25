# Sweden Data Series: Power BI Build Pack

Everything needed to build the three new dashboards. Apply the theme file `LauraIkwechegh_Portfolio.theme.json` in every report (View → Themes → Browse for themes) so the screenshots match the portfolio.

Common to all three:
- A `dim_date` table, marked as a date table (Table tools → Mark as date table), with Date, Year, MonthNo, MonthName, YearMonth (e.g. 2026-03) and Season.
- Single-direction one-to-many relationships from each dimension to the fact table.
- Pages at 1280×720, with a KPI row at the top, the main visual in the middle and a "So what?" text box in plain language at the bottom.

```dax
dim_date =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2018, 1, 1 ), DATE ( 2026, 12, 31 ) ),
    "Year", YEAR ( [Date] ),
    "MonthNo", MONTH ( [Date] ),
    "MonthName", FORMAT ( [Date], "MMM" ),
    "YearMonth", FORMAT ( [Date], "YYYY-MM" ),
    "Season", SWITCH ( TRUE (),
        MONTH ( [Date] ) IN { 12, 1, 2, 3 }, "Winter",
        MONTH ( [Date] ) IN { 6, 7, 8 }, "Summer",
        "Shoulder" )
)
```

---

## 1. Electricity Prices SE1–SE4

**Business question:** How far apart are prices in northern and southern Sweden, when does the gap open, and how volatile is SE4?

**Data (real, public):**
- Hourly day-ahead prices per bidding zone. Two routes:
  - elprisetjustnu.se API, one GET per day per zone, returning SEK/kWh and EUR/kWh: `https://www.elprisetjustnu.se/api/v1/prices/YYYY/MM-DD_SE3.json`. In Power Query, generate a list of dates × zones and call `Web.Contents` for each. This makes a good "live API" talking point.
  - ENTSO-E Transparency Platform history (CC BY 4.0), also mirrored as CSVs in the Hugging Face dataset `Elpriser/sweden-power-market` covering SE1–SE4 from 2018. Use this for the long history.
- Recommended scope: 2022-01-01 to the latest full month.

**Model:** `fact_price` (DateTimeUTC, Date, Hour, Zone, PriceEURMWh) → `dim_date`, `dim_zone` (Zone, ZoneName, Region North/South).

```dax
Avg Price = AVERAGE ( fact_price[PriceEURMWh] )

SE4 vs SE1 Spread =
CALCULATE ( [Avg Price], dim_zone[Zone] = "SE4" )
    - CALCULATE ( [Avg Price], dim_zone[Zone] = "SE1" )

Price Volatility = STDEV.P ( fact_price[PriceEURMWh] )

Peak Hours Avg =
CALCULATE ( [Avg Price], fact_price[Hour] >= 8 && fact_price[Hour] <= 19 )

Negative Price Hours =
CALCULATE ( COUNTROWS ( fact_price ), fact_price[PriceEURMWh] < 0 )

Avg Price YoY % =
VAR Cur = [Avg Price]
VAR PY = CALCULATE ( [Avg Price], SAMEPERIODLASTYEAR ( dim_date[Date] ) )
RETURN DIVIDE ( Cur - PY, PY )
```

**Pages:**
1. Overview: KPI cards (Avg Price, Spread, Volatility, Negative Price Hours), a line chart of monthly Avg Price by zone, and a zone slicer.
2. When the gap opens: matrix heatmap of Hour (rows) × MonthName (columns) showing the SE4 vs SE1 Spread, with conditional formatting.
3. Volatility and business cost: column chart of Volatility by zone and year, and a what-if parameter "Annual use (MWh)" multiplied by the spread to show what an SE4 business pays compared with SE1.

---

## 2. Swedish Tourism & Guest Nights

**Business question:** Which regions depend most on one season, and on international guests? Start with Dalarna's winter and summer peaks.

**Data (real, public):** Tillväxtverket's accommodation statistics (*inkvarteringsstatistik*), which give guest nights by region, month and guests' country of residence. SCB's own database tables for this (NV1701) only run to 2021, so take 2022 onwards from Tillväxtverket's statistics pages. Export them to CSV and keep the downloaded files as the project's source evidence.

**Model:** `fact_guest_nights` (YearMonth, Region, OriginGroup Swedish/International, GuestNights) → `dim_date` (joined on the first day of the month), `dim_region`, `dim_origin`.

```dax
Guest Nights = SUM ( fact_guest_nights[GuestNights] )

International Share =
DIVIDE (
    CALCULATE ( [Guest Nights], dim_origin[OriginGroup] = "International" ),
    [Guest Nights]
)

Winter Share =
DIVIDE ( CALCULATE ( [Guest Nights], dim_date[Season] = "Winter" ), [Guest Nights] )

Seasonality Index =
DIVIDE (
    MAXX ( VALUES ( dim_date[YearMonth] ), [Guest Nights] ),
    AVERAGEX ( VALUES ( dim_date[YearMonth] ), [Guest Nights] )
)

Guest Nights YoY % =
VAR Cur = [Guest Nights]
VAR PY = CALCULATE ( [Guest Nights], SAMEPERIODLASTYEAR ( dim_date[Date] ) )
RETURN DIVIDE ( Cur - PY, PY )
```

**Pages:**
1. Sweden overview: KPIs, a filled map of guest nights by region, and a monthly trend.
2. Seasonality: scatter of Winter Share against International Share per region, with bubble size set to Guest Nights. Dalarna's position makes the story.
3. Dalarna deep dive: monthly profile, origin countries and YoY change.

---

## 3. Retail & Clothing Import Supply Chain

**Business question:** Do clothing imports lead Swedish retail sales, and by how many months?

**Data (real, public, SCB Statistikdatabasen):**
- Foreign trade: monthly import value of clothing (SITC 84) by country of origin.
- Retail trade: monthly retail sales volume index (*detaljhandelns försäljningsvolym*), with the clothing branch where available.
- Fetch with SCB PxWebApi v2, which supports GET requests with the query in the URL (limit of 150,000 cells per call and 30 calls per 10 seconds). Copy the API URL from each table's API tab into Power Query's `Web.Contents`.

**Model:** `fact_imports` (YearMonth, Country, ImportValueSEK) and `fact_retail` (YearMonth, Branch, IndexValue) → shared `dim_date`, plus `dim_country`. Add a what-if parameter `Lag` from 0 to 6 months.

```dax
Import Value = SUM ( fact_imports[ImportValueSEK] )

Retail Index = AVERAGE ( fact_retail[IndexValue] )

Import Value Lagged =
VAR n = SELECTEDVALUE ( Lag[Lag Value], 2 )
RETURN CALCULATE ( [Import Value], DATEADD ( dim_date[Date], -n, MONTH ) )

Lag Correlation =
VAR t =
    FILTER (
        ADDCOLUMNS ( VALUES ( dim_date[YearMonth] ),
            "@x", [Import Value Lagged], "@y", [Retail Index] ),
        NOT ISBLANK ( [@x] ) && NOT ISBLANK ( [@y] )
    )
VAR mx = AVERAGEX ( t, [@x] )
VAR my = AVERAGEX ( t, [@y] )
VAR cov = SUMX ( t, ( [@x] - mx ) * ( [@y] - my ) )
VAR sx = SQRT ( SUMX ( t, ( [@x] - mx ) ^ 2 ) )
VAR sy = SQRT ( SUMX ( t, ( [@y] - my ) ^ 2 ) )
RETURN DIVIDE ( cov, sx * sy )

Origin Share =
DIVIDE ( [Import Value], CALCULATE ( [Import Value], ALL ( dim_country ) ) )
```

**Pages:**
1. Import flows: KPIs, a treemap of Origin Share by country, and a monthly import trend.
2. Lead–lag: a combo chart of Import Value Lagged against Retail Index, a Lag slicer and a Lag Correlation card. The finding is the lag with the highest correlation.
3. Sourcing risk: concentration of the top five origin countries over time, written from a supply chain planner's point of view.

---

## Finishing the two existing projects

- **Labour Market Intelligence:** connect Power BI to the SQL Server warehouse the SSIS package already loads (Import mode). Build pages for Regional hiring, Occupational demand, Employers and Requirements (skills and language asked for).
- **Staffing Profitability:** use the real company financials and Arbetsförmedlingen vacancy trends that are already decided. Build pages for Margin by company, Margin against vacancy demand, and Benchmark.

For each dashboard, export a 1280×720 PNG of page 1 (File → Export → PowerPoint, or a screenshot) so it can replace the coloured cover on its portfolio card.
