"""Export Store Name + Warehouse ID from the Google Sheet to public/warehouses.json.

Run from the flolite folder:  python scripts/export_warehouses.py
Uses token.json / credential.json (override with FLOLITE_TOKEN / FLOLITE_CREDS).
Keep those two files OUT of the Vite project root - the dev server can serve them.
"""
import json
import os
import sys

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
import gspread

SHEET_ID = "1_0YsJUPdnX_I0FZRJDeiWlo3AbXtoEy_gu9msz3-Tuw"
GID = 215346173
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
]
TOKEN = os.environ.get("FLOLITE_TOKEN", "token.json")
CREDS = os.environ.get("FLOLITE_CREDS", "credential.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "warehouses.json")


def authenticate():
    creds = None
    if os.path.exists(TOKEN):
        creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception as e:
                print("Refresh failed, re-authenticating:", e)
                os.remove(TOKEN)
                return authenticate()
        else:
            creds = InstalledAppFlow.from_client_secrets_file(CREDS, SCOPES).run_local_server(port=0)
        with open(TOKEN, "w") as f:
            f.write(creds.to_json())
    return gspread.authorize(creds)


def main():
    ws = authenticate().open_by_key(SHEET_ID).get_worksheet_by_id(GID)
    seen, rows = set(), []
    for r in ws.get_all_records():
        wid = str(r.get("Warehouse ID", "")).strip().lower()
        name = str(r.get("Store Name", "")).strip()
        if not wid or wid in seen:
            continue
        seen.add(wid)
        rows.append({"id": wid, "name": name, "city": str(r.get("City", "")).strip()})
    rows.sort(key=lambda x: (x["name"].lower(), x["id"]))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)
    print(f"Wrote {len(rows)} warehouses -> {os.path.abspath(OUT)}")


if __name__ == "__main__":
    sys.exit(main())
