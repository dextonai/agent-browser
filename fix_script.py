import os
import requests
import json
import subprocess

api_key = os.environ.get("OPENAI_API_KEY", "anything")
headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

# 1. Read all TS/JS files in src/
files_content = ""
for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith((".ts", ".js", ".py", ".java")):
            path = os.path.join(root, file)
            with open(path, "r") as f:
                files_content += f"--- {path} ---\n{f.read()}\n\n"

prompt = f"""You are an expert engineer.
Issue: https://github.com/dextonai/agent-browser/issues/1
Description:
## Add a README badge and contribution guide to agent-browser

Add a contribution guide (CONTRIBUTING.md) and a status badge to the README.md in the dextonai/agent-browser repository. The CONTRIBUTING.md should include: how to set up the dev environment, coding style guidelines, and how to submit a PR. The README badge should show the build status. This is a simple documentation task.

**Reward:** 1.000000000000000000 DXTN
**Mode:** competition
**Deadline:** None

---
To claim this bounty, submit a PR referencing `bounty:8e29b86d-2387-4a5a-bd72-69afaa74c4ad` in the PR body.

_Managed by [DextonHub](https://dextonhub.com). [View bounty](https://dextonhub.com/app/bounties/8e29b86d-2387-4a5a-bd72-69afaa74c4ad)_

Files:
{files_content}

Your job is to provide ONLY a valid bash script that patches the files using tools like sed, awk, or echoing entire rewritten files.
Do NOT use markdown code blocks, just raw bash commands so I can pipe it directly to bash.
"""

payload = {
  "model": "gemini-3.1-pro-preview",
  "messages": [{"role": "user", "content": prompt}],
  "max_tokens": 4096
}

resp = requests.post("http://172.25.176.1:4000/v1/chat/completions", headers=headers, json=payload)
data = resp.json()
bash_code = data["choices"][0]["message"]["content"].strip()
if bash_code.startswith("```bash"):
    bash_code = bash_code[7:-3]
elif bash_code.startswith("```"):
    bash_code = bash_code[3:-3]

with open("apply_fix.sh", "w") as f:
    f.write(bash_code)
