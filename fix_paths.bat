@echo off
setlocal enabledelayedexpansion
set DIR=C:\Users\Administrator\yuanmei-printing-site\src\pages

for /r "%DIR%" %%f in (*.astro) do (
  powershell -Command "(Get-Content '%%f') -replace '../../../layouts/','../layouts/' -replace '../../../components/','../components/' -replace '../../../i18n/','../i18n/' -replace '\"/en/\"','\"/\"' -replace \"lang=\"en\"\",\"lang=\"\"en\"\" \" | Set-Content '%%f'"
  echo Done: %%f
)
