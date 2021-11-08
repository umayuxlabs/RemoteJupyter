// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const button = document.querySelector('#connect');
const nodename = document.querySelector('#nodename');
const url = document.querySelector('#url');

var session_list = new Vue({
    el: '#session-list',
    data: {
      items: JSON.parse(localStorage.getItem('session_list')) == undefined ? []: JSON.parse(localStorage.getItem('session_list'))
    },

    methods: {
        run: function(item){
            windowProxy = window.open('session.html?JupyterURL='+item.url + "&JupyterTitle="+item.session, item.session, 'minimizable=true')
        },
        remove: function(item){

            session_list.items = session_list.items.filter((i)=>{
                if (i == item){
                    delete session_dict[i.session + i.url]
                }
                
                return i != item
            })

            localStorage.setItem('session_list', JSON.stringify(session_list.items))
            localStorage.setItem('session_dict', JSON.stringify(session_dict))
        }
    }

  })

button.addEventListener('click', updateButton);
var windowProxy = null;

let session_dict = JSON.parse(localStorage.getItem('session_dict')) == undefined ? {}: JSON.parse(localStorage.getItem('session_dict')) 
let session_items = []
function updateButton() {
    windowProxy = window.open('session.html?JupyterURL='+url.value + "&JupyterTitle="+nodename.value, nodename.value, 'minimizable=true')
    if(session_dict[nodename.value + url.value] == undefined){
        session_list.items.push({session: nodename.value, url: url.value})
        session_dict[nodename.value + url.value] = 0

        localStorage.setItem('session_dict', JSON.stringify(session_dict))
        localStorage.setItem('session_list', JSON.stringify(session_list.items))
    }
}

function run_job(session, url){
    console.log(session, url)
}