@echo off
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
cd C:\Users\Administrator\yuanmei-printing-site\cms-js
curl -L --max-time 60 -o decap-cms.js "https://cdn.jsdelivr.net/npm/@sveltia/cms@1.0.0/dist/sveltia-cms.js"
for %%f in (decap-cms.js) do echo Size: %%~zf bytes
