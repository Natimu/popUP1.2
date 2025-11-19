import json

input_file = "src/data/bible_verses.json"
output_file = "src/data/bible_verses_clean.json"

# Load the file (this will fail if JSON is invalid)
with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Save it back in a proper JSON format
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"✅ Cleaned JSON written to {output_file}")
