# organiza JSONs dentro de data/raw/
# converte para CSV/Parquet em data/processed/

import json
import os

RAW_DIR = "data/raw/"

def save_json(data, filename):
    """Saves a Python dict to data/raw/."""
    os.makedirs(RAW_DIR, exist_ok=True)
    with open(os.path.join(RAW_DIR, filename), "w") as f:
        json.dump(data, f, indent=2)