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

            session_list.items[item.project] = session_list.items[item.project].filter((i)=>{
                if (i == item){
                    delete session_dict[item.session + '|' + item.url + '|' + item.project]
                }
                
                return i != item
            })
            
            // if ( Object.keys(session_list.items[item.project])[0] == undefined) {
            //     delete session_list.items[item.project]
            // }

            localStorage.setItem('project_items', JSON.stringify(session_list.items))
            localStorage.setItem('session_dict', JSON.stringify(session_dict))
            
        }
    }

  })

button.addEventListener('click', updateButton);
var windowProxy = null;

let session_dict = JSON.parse(localStorage.getItem('session_dict')) == undefined ? {}: JSON.parse(localStorage.getItem('session_dict')) 
let session_items = []

let project_items = JSON.parse(localStorage.getItem('project_items')) == undefined ? {}: JSON.parse(localStorage.getItem('project_items')) 

function updateButton() {
    windowProxy = window.open('session.html?JupyterURL='+url.value + "&JupyterTitle="+nodename.value + "&Project=" +project.value, nodename.value+'|'+project.value, 'minimizable=true')

    if (session_dict[nodename.value + '|' + url.value + '|' + project.value] == undefined) {
        
        session_dict[nodename.value + '|' + url.value + '|' + project.value] = 0
        
        try {
            project_items[project.value].push(
                { session: nodename.value, url: url.value, project: project.value }
            )
        } catch (error) {
            project_items[project.value] = [
                { session: nodename.value, url: url.value, project: project.value }
            ]
        }
        
        localStorage.setItem('session_dict', JSON.stringify(session_dict))
        localStorage.setItem('project_items', JSON.stringify(project_items))
        session_list.items = project_items
    }
}
