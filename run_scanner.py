#!/usr/bin/env python3
"""
  python run_scanner.py --flow network
  python run_scanner.py --flow analysis
  python run_scanner.py  # runs both flows (network then analysis)

"""
import argparse
import subprocess
import sys
from pathlib import Path


FLOWS = {
    "network": [
        Path("scanner/discovery.py"),
        Path("scanner/validator.py"),
        Path("scanner/tls_analyzer.py"),
    ],
    "analysis": [
        Path("scanner/fingerprint.py"),
        Path("analysis/tls_clusters.py"),
        Path("analysis/honeypot_score.py"),
    ],
}


def run_script(path: Path) -> None:
    if not path.exists():
        print(f"[!] Script not found: {path}")
        raise SystemExit(1)

    print(f"\n--- Running: {path} ---")
    cmd = [sys.executable, str(path)]
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"[!] Script failed: {path} (exit {e.returncode})")
        raise


def run_flow(name: str) -> None:
    scripts = FLOWS.get(name)
    if not scripts:
        print(f"Unknown flow: {name}")
        raise SystemExit(1)

    for s in scripts:
        run_script(s)


def main():
    p = argparse.ArgumentParser(description="Run scanner workflows in order")
    p.add_argument("--flow", choices=["network", "analysis", "all"], default="all")
    args = p.parse_args()

    if args.flow in ("network", "all"):
        run_flow("network")

    if args.flow in ("analysis", "all"):
        run_flow("analysis")

    print("\n[✓] Run complete.")


if __name__ == "__main__":
    main()
