#!/usr/bin/env python3
"""Refresh src/data/parquet-catalog.json from Tilda Store API."""

from __future__ import annotations

import json
import re
import time
import urllib.request
from html import unescape
from pathlib import Path

API = (
    "https://store.tildaapi.com/api/getproductslist/"
    "?projectid=13680789&storepartuid=602876614822&recid=1847632311"
)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "parquet-catalog.json"
UA = "Mozilla/5.0 (compatible; XStyleSite/1.0)"


def strip_html(html: str) -> str:
    text = re.sub(r"(?is)<br\s*/?>", "\n", html or "")
    text = re.sub(r"(?is)<a[^>]*>.*?</a>", " ", text)
    text = re.sub(r"(?is)<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", unescape(text)).strip()
    text = re.sub(r"^➔?\s*ЗАЯВКА НА РАССЧ[ЁЕ]Т\s*", "", text, flags=re.I).strip()
    return text


def first_image(product: dict) -> str | None:
    try:
        gallery = json.loads(product.get("gallery") or "[]")
        if gallery:
            return gallery[0].get("img")
    except json.JSONDecodeError:
        pass
    editions = product.get("editions") or []
    return editions[0].get("img") if editions else None


def normalize(product: dict) -> dict:
    title = str(product.get("title") or "").strip()
    desc = strip_html(product.get("text") or "")
    if len(desc) < 15:
        desc = product.get("descr") or "Паркетная доска из массива дуба."
    return {
        "uid": product.get("uid"),
        "title": title,
        "subtitle": (product.get("descr") or "").strip() or None,
        "price": product.get("price"),
        "description": desc[:2000],
        "image": first_image(product),
        "gallery": json.loads(product.get("gallery") or "[]"),
        "characteristics": product.get("characteristics") or [],
    }


def main() -> None:
    req = urllib.request.Request(API, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    products = [normalize(p) for p in data.get("products") or []]
    payload = {
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "https://x-stl.ru/parquet",
        "products": products,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Wrote", OUT, len(products), "items")


if __name__ == "__main__":
    main()
