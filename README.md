# Remote Jupyter

We just want to be able to have a window with Jupyter Notebook that is placed in a remote server. We want to have an APP. It is a simple Jupyter Notebook APP. Useful when you are working with remote access and want to know what windows are you using and what projects are you in each individual window.

# DEV only

## Build the app

```bash
npm install --save-dev -g electron-packager
npm install

# MAC OS
electron-packager . --overwrite --platform=darwin --arch=x64  --prune=true --out=release-builds

# Windows
electron-packager . electron-tutorial-app --overwrite --asar --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Session Manager"

# Linux
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
```
