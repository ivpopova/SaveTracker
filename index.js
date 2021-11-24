let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("saveTab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    
    myLeads.forEach(element => {
        printLead(element);
    });
}

tabBtn.addEventListener("click", function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
        printLead(tabs[0].url);
    });  
})

deleteBtn.addEventListener("click", function () {
    myLeads = [];
    localStorage.clear();

    while(ulEl.firstChild){
        ulEl.removeChild(ulEl.firstChild); 
    }
})

inputBtn.addEventListener("click", addLead);

function addLead () {
    myLeads.push(inputEl.value);

    printLead(inputEl.value);

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    inputEl.value = "";
}

function printLead (element) {
    let newListItem = document.createElement('li');
    let a = document.createElement('a');
    
    a.setAttribute("href", element);
    a.textContent = element;
    
    ulEl.appendChild(newListItem).appendChild(a);
}
