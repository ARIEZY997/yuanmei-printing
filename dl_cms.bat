@echo off
cd C:\Users\Administrator\yuanmei-printing-site\public\admin
curl -L -o cms.js "https://esm.sh/decap-cms@3.1.0/dist/decap-cms.js"
for %%f in (cms.js) do echo Size: %%~zf bytes
