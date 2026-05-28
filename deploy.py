#!/usr/bin/env python3
"""
deploy.py — Upload site AAA vers Hostinger via FTP
Usage:
    python deploy.py            # upload fichiers modifiés (git diff vs origin)
    python deploy.py --all      # upload TOUT le site
    python deploy.py --dry      # simulation sans upload
    python deploy.py index.html assets/js/site-shell.js   # fichiers spécifiques
"""

import ftplib
import os
import sys
import configparser
import subprocess
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent
CFG_FILE = ROOT / "deploy.cfg"

# Dossiers/fichiers à ne jamais uploader
EXCLUDE = {
    "deploy.py", "deploy.cfg", ".gitignore", ".git",
    "node_modules", "dist", ".cache", ".claude",
    "local-agent-mode-sessions", "ruvector.db",
    "__pycache__", ".DS_Store", "Thumbs.db",
}

def load_config():
    if not CFG_FILE.exists():
        print("❌  deploy.cfg introuvable. Crée-le d'abord.")
        sys.exit(1)
    cfg = configparser.ConfigParser()
    cfg.read(CFG_FILE, encoding="utf-8")
    return cfg["ftp"]

# ── Fichiers modifiés via git ────────────────────────────────────────────────
def git_changed_files():
    """Retourne les fichiers modifiés par rapport à origin/main."""
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "origin/main..HEAD"],
            capture_output=True, text=True, cwd=ROOT
        )
        files = [f.strip() for f in result.stdout.splitlines() if f.strip()]
        # Ajoute aussi les fichiers non-trackés
        result2 = subprocess.run(
            ["git", "ls-files", "--others", "--exclude-standard"],
            capture_output=True, text=True, cwd=ROOT
        )
        files += [f.strip() for f in result2.stdout.splitlines() if f.strip()]
        return [f for f in files if not should_exclude(f)]
    except Exception as e:
        print(f"⚠️  git diff échoué ({e}), utilise --all pour tout uploader.")
        return []

def all_site_files():
    """Tous les fichiers du site (récursif), hors exclusions."""
    files = []
    for path in ROOT.rglob("*"):
        if path.is_file():
            rel = path.relative_to(ROOT).as_posix()
            if not should_exclude(rel):
                files.append(rel)
    return files

def should_exclude(rel_path: str) -> bool:
    parts = Path(rel_path).parts
    return any(p in EXCLUDE for p in parts)

# ── Upload FTP ───────────────────────────────────────────────────────────────
def ensure_remote_dirs(ftp, remote_path):
    """Crée les dossiers distants manquants."""
    dirs = remote_path.rsplit("/", 1)
    if len(dirs) < 2 or not dirs[0]:
        return
    folder = dirs[0]
    try:
        ftp.cwd(folder)
        ftp.cwd("/")
    except ftplib.error_perm:
        parts = folder.lstrip("/").split("/")
        current = ""
        for part in parts:
            current += "/" + part
            try:
                ftp.mkd(current)
            except ftplib.error_perm:
                pass  # dossier existe déjà

def upload_file(ftp, local_path, remote_path, dry=False):
    if dry:
        print(f"  [DRY]  {remote_path}")
        return
    ensure_remote_dirs(ftp, remote_path)
    try:
        with open(local_path, "rb") as f:
            ftp.storbinary(f"STOR {remote_path}", f)
        print(f"  ✅  {remote_path}")
    except Exception as e:
        print(f"  ❌  {remote_path}  →  {e}")

def run(files, cfg, dry=False):
    remote_root = cfg.get("remote_root", "/public_html").rstrip("/")
    if not dry:
        print(f"🔌  Connexion FTP → {cfg['host']} …")
        ftp = ftplib.FTP()
        ftp.connect(cfg["host"], 21, timeout=30)
        ftp.login(cfg["user"], cfg["password"])
        ftp.set_pasv(True)
        print(f"✅  Connecté. Racine distante : {remote_root}\n")
    else:
        ftp = None
        print(f"🔍  DRY RUN — racine distante : {remote_root}\n")

    for rel in files:
        local  = ROOT / rel
        remote = f"{remote_root}/{rel}"
        upload_file(ftp, local, remote, dry=dry)

    if ftp:
        ftp.quit()
    print(f"\n{'🔍 Simulation' if dry else '🚀 Upload'} terminé — {len(files)} fichier(s).")

# ── Main ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    args = sys.argv[1:]
    dry    = "--dry" in args
    upload_all = "--all" in args
    explicit = [a for a in args if not a.startswith("--")]

    cfg = load_config()

    if explicit:
        files = [f for f in explicit if not should_exclude(f)]
        print(f"📋  Fichiers spécifiés : {len(files)}")
    elif upload_all:
        files = all_site_files()
        print(f"📋  Tous les fichiers : {len(files)}")
    else:
        files = git_changed_files()
        print(f"📋  Fichiers modifiés (git diff) : {len(files)}")

    if not files:
        print("ℹ️  Rien à uploader.")
        sys.exit(0)

    for f in files:
        print(f"   • {f}")
    print()

    run(files, cfg, dry=dry)
