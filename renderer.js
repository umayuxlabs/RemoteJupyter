// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const button = document.querySelector('#connect');
const nodename = document.querySelector('#nodename');
const url = document.querySelector('#url');
const panel = document.querySelector('#panel')

button.addEventListener('click', updateButton);

function updateButton() {
//   window.location.assign(url.value)

    const webview = document.querySelector('webview')
    webview.src = url.value
    webview.style.top = '0px'
    
    document.title = 'Session: ' + nodename.value
}