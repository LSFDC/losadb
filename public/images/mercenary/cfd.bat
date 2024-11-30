@echo off
setlocal enabledelayedexpansion

:: Specify the number of folders to create
set "total=260"

:: Folder prefix (e.g., "Folder")
set "prefix="

for /L %%i in (1,1,%total%) do (
    set "num=%%i"
    if %%i LSS 10 set "num=00%%i"
    if %%i GEQ 10 if %%i LSS 100 set "num=0%%i"
    md "!prefix!!num!"
)

echo Folders created successfully.
pause