import os
import json
import time
import threading
import requests
from dotenv import load_dotenv
from pathlib import Path
import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from playwright.sync_api import sync_playwright
import re

def argb_to_hex(argb: str) -> str:
    """Convierte un color ARGB tipo '0xFFFFFFFF' en hexadecimal '#ffffff'."""
    if not argb:
        return "#ffffff"
    hex_value = argb.lower().replace("0x", "")[-6:]
    return f"#{hex_value}"

load_dotenv(override=True)
API_TOKEN = os.getenv("BRAWL_API_TOKEN")
BASE_URL = "https://api.brawlstars.com/v1"
OUTPUT_DIR = Path("brawl_job/club_data")
USUARIO = "laspain_"
CODIGO = "HA6qRz59rM"

CLUBS = {
    "hydra": "#2GQUUQQC8",
    "thunder": "#2JUQQQVR8",
    "spain": "#2UGP9PPLV",
    "snow": "#CGV0GVG2",
    "astral": "#2L988PC8U",
    "moon": "#80082RGC9",
    "kings": "#LUJPVJ00",
    "ghosts": "#809PLYCQ8",
    "toxic": "#800YUP00P",
    "souls": "#2CP2JYYC8",
    "tikal": "#P9GYLQLU",
    "stars": "#YGVJQ998",
    "justice": "#2GYQQGGL0",
    "infernal": "#2VCPQGR9L",
    "zero": "#22YQQ2JYJ",
    "ragnarok": "#2YCRLRLRQ",
    "legends": "#YGU2QQJ0",
    "gods": "#22YQLYRPU",
    "zenith": "#2UUGJV2Y8",
    "knights": "#Q2YRUL2J",
    "light": "#2GCCLL9U2",
    "tall": "#UVUYJPUJ",
    "expert": "#RRJR0QC8",
    "legacy": "#2VPQYU98J",
    "crystal": "#2GJVRCJ0R",
}

ROLE_TRANSLATIONS = {
    "vicePresident": "VicePresidente",
    "senior": "Veterano",
    "member": "Miembro",
    "president": "Presidente"
}

MAX_WORKERS_PLAYER_FETCH = 10
player_data_cache = {}

if not API_TOKEN:
    print("❌ ERROR: No se pudo cargar el token de la API de Brawl Stars. Comprueba tu archivo .env")
    exit(1)

OUTPUT_DIR.mkdir(exist_ok=True)

def obtener_seguidores_tiktok(USUARIO):
    url = f"https://www.tiktok.com/@{USUARIO}"
    print(f"📡 Procesando tiktok: {USUARIO}...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)  # headless=False si quieres ver el navegador
        page = browser.new_page()
        page.goto(url, timeout=60000)

        # Aceptar cookies si aparece el botón
        try:
            page.click('button:has-text("Accept all")', timeout=5000)
        except:
            pass

        page.wait_for_selector('strong[data-e2e="followers-count"]', timeout=10000)
        seguidores = page.query_selector('strong[data-e2e="followers-count"]').inner_text()

        browser.close()
        print(f"✅ Tiktok followers: {seguidores}")
        return seguidores

def obtener_seguidores_twitter_playwright(USUARIO):
    print(f"📡 Procesando twitter: {USUARIO}...")
    with sync_playwright() as p:
        print()
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        url = f"https://mobile.twitter.com/{USUARIO}"
        page.goto(url)
        page.wait_for_selector('a[href*="followers"]', timeout=15000)
        enlaces = page.query_selector_all('a[href*="followers"]')
        for enlace in enlaces:
            texto = enlace.inner_text().strip()
            if texto:
                numero = texto.split()[0]
                browser.close()
                print(f"✅ Twitter followers: {numero}")
                return numero
        browser.close()

def obtener_miembros_discord(CODIGO):
    url = f"https://discord.com/invite/{CODIGO}"

    with sync_playwright() as p:
        print(f"📡 Procesando discord: {CODIGO}...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        page.goto(url)

        # Esperamos que cargue algún texto que contenga "miembros"
        page.wait_for_selector("text=miembros", timeout=15000)

        html = page.content()
        browser.close()

        # Buscar "xxx en línea, yyy miembros"
        match = re.search(r'([\d.,]+)\s+en línea,\s+([\d.,]+)\s+miembros', html, re.IGNORECASE)
        if match:
            online = match.group(1).replace(',', '').strip()
            discord = match.group(2).replace(',', '').strip()
            return int(online), int(discord)

        # Si no se encuentra ambos, buscar individualmente
        online_match = re.search(r'([\d.,]+)\s+en línea', html, re.IGNORECASE)
        total_match = re.search(r'([\d.,]+)\s+miembros', html, re.IGNORECASE)

        online = int(online_match.group(1).replace(',', '')) if online_match else None
        discord = int(total_match.group(1).replace(',', '')) if total_match else None

        if discord is None:
            raise Exception("No se pudo encontrar el número de miembros.")

        print(f"✅ Miembros totales: {discord}")
        print(f"✅ Miembros en línea: {online}")
        return online, discord

def _make_api_request(url: str) -> dict | None:
    headers = {"Authorization": f"Bearer {API_TOKEN}"}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error en la solicitud para {url}: {e}")
        time.sleep(5)
        return _make_api_request(url)
    return None

def fetch_club_data(tag: str) -> dict | None:
    escaped_tag = tag.replace("#", "%23")
    return _make_api_request(f"{BASE_URL}/clubs/{escaped_tag}")

def fetch_player_data(player_tag: str) -> dict | None:
    if player_tag in player_data_cache:
        return player_data_cache[player_tag]
    escaped_tag = player_tag.replace("#", "%23")
    data = _make_api_request(f"{BASE_URL}/players/{escaped_tag}")
    if data:
        player_data_cache[player_tag] = data
    return data

def fetch_rankings(ranking_type: str, country_code: str = "global") -> list:
    url = f"{BASE_URL}/rankings/{country_code}/{ranking_type}" if country_code != "global" else f"{BASE_URL}/rankings/global/{ranking_type}"
    data = _make_api_request(url)
    return data.get("items", []) if data else []

def save_json(data: dict | list, filename: str):
    file_path = OUTPUT_DIR / filename
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
            f.flush()
            os.fsync(f.fileno())
        print(f"✅ Datos guardados en '{file_path}'")
    except Exception as e:
        print(f"❌ ERROR al guardar '{file_path}': {e}")

def process_single_club(name: str, tag: str, global_rankings: list, local_rankings_es: list) -> dict | None:
    print(f"📡 Procesando club: {name} ({tag})...")
    club_data = fetch_club_data(tag)
    if not club_data:
        print(f"⚠️  Fallo obteniendo datos de '{name}'.")
        return None

    members_summary = club_data.get("members", [])
    members_detailed_info_unsorted = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS_PLAYER_FETCH) as executor:
        future_to_summary = {
            executor.submit(fetch_player_data, member.get("tag")): member
            for member in members_summary
        }

        for future in as_completed(future_to_summary):
            summary = future_to_summary[future]
            player_tag = summary.get("tag")
            member_info = {
                "nombre": summary.get("name"),
                "tag": player_tag,
                "copas": summary.get("trophies"),
                "rol": ROLE_TRANSLATIONS.get(summary.get("role"), summary.get("role")),
                "icono": summary.get("icon", {}).get("id")
            }
            members_detailed_info_unsorted.append(member_info)

    members_detailed_info = sorted(members_detailed_info_unsorted, key=lambda m: m["copas"], reverse=True)
    for idx, member in enumerate(members_detailed_info):
        member["top"] = idx + 1

    num_veterans = sum(1 for m in members_summary if m.get("role") == "senior")
    num_vicepresidents = sum(1 for m in members_summary if m.get("role") == "vicePresident")
    top_global = next((entry.get("rank", 0) for entry in global_rankings if entry.get("tag") == tag), 0)
    top_local_es = next((entry.get("rank", 0) for entry in local_rankings_es if entry.get("tag") == tag), 0)
    president_name = next((m["name"] for m in members_summary if m.get("role") == "president"), None)
    total_members = len(members_summary)
    avg_trophies = club_data.get("trophies", 0) // total_members if total_members else 0

    club_info = {
        "nombre": club_data.get("name"),
        "tag": club_data.get("tag"),
        "descripcion": club_data.get("description", ""),
        "icono": club_data.get("badgeId"),
        "copas_totales": club_data.get("trophies", 0),
        "n_miembros": total_members,
        "requiredTrophies": club_data.get("requiredTrophies", 0),
        "type": club_data.get("type", ""),
        "presidente": president_name,
        "num_veterans": num_veterans,
        "num_vicepresidents": num_vicepresidents,
        "media_copas": avg_trophies,
        "top_global": top_global,
        "top_local_ES": top_local_es,
        "miembros": members_detailed_info
    }
    print(f"✅ Club '{name}' procesado correctamente. Hora: {datetime.datetime.now().strftime('%H:%M:%S')}")
    return club_info

def generate_and_save_all_members_data(all_clubs_data: list):
    if not all_clubs_data:
        print("⚠️ No hay datos de clubes para 'members.json'.")
        return
    all_members = []
    for club in all_clubs_data:
        for member in club.get("miembros", []):
            player_data = fetch_player_data(member.get("tag")) or {}
            brawlers = player_data.get("brawlers", [])
            all_members.append({
                "tag": member.get("tag"),
                "nombre": member.get("nombre"),
                "color": argb_to_hex(player_data.get("nameColor")),
                "icono": member.get("icono"),
                "club": club.get("nombre"),
                "club_tag": club.get("tag"),
                "icono_del_club": club.get("icono"),
                "rol_en_el_club": member.get("rol"),
                "copas": member.get("copas"),
                "max_copas": player_data.get("highestTrophies", 0),
                "brawlers_desbloqueados": len(brawlers),
                "media_copas_brawler": player_data.get("trophies", 0) // len(brawlers) if brawlers else 0,
                "victorias_3v3": player_data.get("3vs3Victories", 0),
                "victorias_supervivencia_solo": player_data.get("soloVictories", 0),
                "victorias_supervivencia_duo": player_data.get("duoVictories", 0),
                "wins_desafio": 15 if player_data.get("isQualifiedFromChampionshipChallenge") else "< 15"
            })
    all_members.sort(key=lambda m: m.get("copas", 0), reverse=True)
    for idx, member in enumerate(all_members):
        member["top"] = idx + 1
    save_json(all_members, "members.json")

def generate_and_save_general_stats(all_clubs_data: list):
    if not all_clubs_data:
        print("⚠️ No hay datos para generar estadísticas generales.")
        return
    num_clubs = len(all_clubs_data)
    total_copas = sum(club.get("copas_totales", 0) for club in all_clubs_data)
    total_miembros = sum(club.get("n_miembros", 0) for club in all_clubs_data)
    media_copas = total_copas / num_clubs if num_clubs else 0
    online, discord = obtener_miembros_discord(CODIGO)
    general_stats = {
        "numero_de_clubs": num_clubs,
        "total_de_copas": total_copas,
        "total_de_miembros": total_miembros,
        "media_de_copas": round(media_copas, 0),
        "discord": discord,
        "online": online,
        "tiktok": obtener_seguidores_tiktok(USUARIO),
        "twitter": obtener_seguidores_twitter_playwright(USUARIO),
    }
    save_json(general_stats, "lageneral.json")

def monitor_clubs_loop():
    time.sleep(2)
    print("🔁 Monitor de clubes iniciado.")
    while True:
        global player_data_cache
        player_data_cache = {}
        print(f"\n⏳ Procesando clubs. Hora: {datetime.datetime.now().strftime('%H:%M:%S')}")
        global_rankings = fetch_rankings("clubs", "global")
        local_rankings_es = fetch_rankings("clubs", "ES")
        all_clubs_data = []
        for name, tag in CLUBS.items():
            club_info = process_single_club(name, tag, global_rankings, local_rankings_es)
            if club_info:
                all_clubs_data.append(club_info)
        if all_clubs_data:
            all_clubs_data.sort(key=lambda c: c.get("copas_totales", 0), reverse=True)
            save_json(all_clubs_data, "laclubs.json")
            generate_and_save_all_members_data(all_clubs_data)
            generate_and_save_general_stats(all_clubs_data)
        else:
            print("⚠️ No se pudieron recuperar datos de ningún club.")
        print("\n⏱️ Esperando 10 minutos para el siguiente ciclo...\n")
        time.sleep(600)

def iniciar_monitor_en_segundo_plano():
    thread = threading.Thread(target=monitor_clubs_loop, daemon=True)
    thread.start()

def main():
    print(">>> Iniciando el Obtenedor de Datos de Brawl Stars <<<")
    iniciar_monitor_en_segundo_plano()
    while True:
        time.sleep(1)

if __name__ == "__main__":
    main()