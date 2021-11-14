// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const button = document.querySelector('#connect');
const nodename = document.querySelector('#nodename');
const project = document.querySelector('#projectname');

const url = document.querySelector('#url');

var session_list = new Vue({
    el: '#ProjectsGroup',
    data: {
        items: JSON.parse(localStorage.getItem('project_items')) == undefined ? {}: JSON.parse(localStorage.getItem('project_items'))
    },

    methods: {
        run: function(item){
            windowProxy = window.open('session.html?JupyterURL='+item.url + "&JupyterTitle="+item.session + "&Project=" +item.project, item.project + '|' + item.session, 'minimizable=true')
        },
        remove: function(item){
            delete session_list.items[item.project][item.session]
            
            if (Object.keys(session_list.items[item.project]).length == 0) {
                delete session_list.items[item.project]
            }

            localStorage.setItem('project_items', JSON.stringify(session_list.items))
            session_list.items = {}
            session_list.items = JSON.parse(localStorage.getItem('project_items'));
        }
    }

  })

button.addEventListener('click', updateButton);
var windowProxy = null;

session_list.items = JSON.parse(localStorage.getItem('project_items')) == undefined ? {}: JSON.parse(localStorage.getItem('project_items'))

function updateButton() {
    windowProxy = window.open('session.html?JupyterURL='+url.value + "&JupyterTitle="+nodename.value + "&Project=" +project.value, nodename.value+'|'+project.value, 'minimizable=true')

    if (session_list.items[project.value] == undefined) {
        session_list.items[project.value] = {}
    }
    
    session_list.items[project.value][nodename.value] = { session: nodename.value, url: url.value, project: project.value }
    localStorage.setItem('project_items', JSON.stringify(session_list.items))
    session_list.items = {}
    session_list.items = JSON.parse(localStorage.getItem('project_items'));
}
