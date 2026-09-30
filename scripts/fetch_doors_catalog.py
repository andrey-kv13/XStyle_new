#!/usr/bin/env python3
"""Refresh src/data/doors-catalog.json from Tilda Store API."""

from __future__ import annotations

import json
import re
import time
import urllib.request
from html import unescape
from pathlib import Path

API = (
    "https://store.tildaapi.com/api/getproductslist/"
    "?projectid=13680789&storepartuid=178657792182&recid=1847634891"
)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "doors-catalog.json"
UA = "Mozilla/5.0 (compatible; XStyleSite/1.0)"


def strip_html(html: str) -> str:
    text = re.sub(r"(?is)<br\s*/?>", "\n", html or "")
    text = re.sub(r"(?is)<a[^>]*>.*?</a>", " ", text)
    text = re.sub(r"(?is)<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", unescape(text)).strip()
    text = re.sub(r"^➔?\s*ЗАЯВКА НА РАССЧ[ЁЕ]Т\s*", "", text, flags=re.I).strip()
    return text


def first_image(product: dict) -> str | None:
    gallery_raw = product.get("gallery") or "[]"
    try:
        gallery = json.loads(gallery_raw)
        if gallery:
            return gallery[0].get("img")
    except json.JSONDecodeError:
        pass
    editions = product.get("editions") or []
    if editions:
        return editions[0].get("img")
    return None


def wood_id_from_text(text: str) -> str | None:
    low = text.lower()
    if "сосн" in low:
        return "sosna"
    if "ольх" in low:
        return "olha"
    if "дуб" in low:
        return "dub"
    return None


def wood_ids_for_product(product: dict) -> set[str]:
    ids: set[str] = set()
    for ch in product.get("characteristics") or []:
        title = str(ch.get("title", "")).upper()
        val = str(ch.get("value", "")).strip()
        if not val:
            continue
        if "МАССИВ" in title or "ПОРОД" in title or title in ("ДЕРЕВО", "МATERIAL"):
            wid = wood_id_from_text(val)
            if wid:
                ids.add(wid)
    if not ids:
        wid = wood_id_from_text(product.get("descr") or "")
        if wid:
            ids.add(wid)
    blob = json.dumps(product, ensure_ascii=False).lower()
    for key, wid in [("сосн", "sosna"), ("ольх", "olha")]:
        if key in blob and wid not in ids:
            for ch in product.get("characteristics") or []:
                if key in str(ch.get("value", "")).lower():
                    ids.add(wid)
                    break
    return ids


def wood_display(wid: str) -> str:
    return {"dub": "Дуб", "olha": "Ольха", "sosna": "Сосна"}.get(wid, wid)


def normalize(product: dict, wid: str) -> dict:
    desc = strip_html(product.get("text") or "")
    if len(desc) < 20:
        desc = f"Межкомнатная дверь из массива ({wood_display(wid)}). Уточните размер и отделку у менеджера."
    return {
        "uid": product.get("uid"),
        "title": f"Модель №{product.get('title')}",
        "model": product.get("title"),
        "wood": wood_display(wid),
        "woodId": wid,
        "price": product.get("price"),
        "description": desc[:1500],
        "image": first_image(product),
        "gallery": json.loads(product.get("gallery") or "[]"),
        "characteristics": product.get("characteristics") or [],
    }


def main() -> None:
    req = urllib.request.Request(API, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    raw = data.get("products") or []
    by_wood: dict[str, list] = {"dub": [], "olha": [], "sosna": []}
    products: list = []
    seen: dict[str, set] = {k: set() for k in by_wood}

    for p in raw:
        wids = wood_ids_for_product(p) or {"dub"}
        for wid in wids:
            uid = p.get("uid")
            if uid in seen[wid]:
                continue
            seen[wid].add(uid)
            entry = normalize(p, wid)
            by_wood[wid].append(entry)
            products.append(entry)

    payload = {
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "total": len(raw),
        "counts": {k: len(v) for k, v in by_wood.items()},
        "products": products,
        "byWood": by_wood,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Wrote", OUT, "counts", payload["counts"])


if __name__ == "__main__":
    main()
