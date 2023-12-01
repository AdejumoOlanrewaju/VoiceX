let store = []
let taskList = document.querySelector(".task-list")
let output = document.querySelector(".output")
let action = document.querySelector(".action")
let allowText = document.querySelector(".allow")
let taskText;
let btn;
let editLink;

let retrievedStore = JSON.parse(localStorage.getItem("store"))
if(retrievedStore){
    store = retrievedStore
    console.log(store)
    renderLists(store)
}

function renderLists(arr){
    let list = ""
    arr.map(text => {
        list += `<li class = "task">
                    <p class = "task-text">${text}</p>
                    <div class = "task-btn-container">
                        <button class = "task-btn">Done</button>

                        <a class = "edit-link">Edit</a>
                    </div>
                 </li>`
    })
    taskList.innerHTML = list

    let taskBtn = document.querySelectorAll(".task-btn")
    taskText = document.querySelectorAll(".task-text")
    editLink = document.querySelectorAll(".edit-link")
    
    editText(editLink)
    taskBtnFunc(taskBtn)


}

 function editText(elem){
     for(let link of elem){
     
         link.addEventListener("click", (event) => {
             event.preventDefault()
             let linkContainer = link.parentElement
             let parent = linkContainer.parentElement
             let text = parent.querySelector("p")
             text.contentEditable = true
             text.style.backgroundColor = "#2b2b67"
             // console.log(text)
             console.log("click")

             saveEdit(text)
         })
     }
     
    //  console.log(editLink)
 }
 
function saveEdit(taskWords){
    let elem = taskText
    let text;
    window.addEventListener("click", function(event){
        if(!event.target.closest(".edit-link") && !event.target.closest(".task-btn")){
            console.log("we are there")
            for(let i = 0; i < elem.length; i++){
                text = elem[i]
                store[i] = text.textContent
                // text.contentEditable = false
                // console.log(store[i])
                // console.log(text)
            } 
            localStorage.setItem("store", JSON.stringify(store))
        }
        
        if(!event.target.closest(".task")){
            taskWords.style.backgroundColor = "transparent"
            console.log("hi")
            console.log(text)
        }
        // console.log(store)
    })
}


let itemLen;
function taskBtnFunc(elem){
    for(let [index, btn] of elem.entries()){
        // console.log(index + ": " + btn)
        // console.log(btn)
        btn.addEventListener("click", function () {
            let btnContainer = btn.parentElement
            let parent = btnContainer.parentElement
            let text = parent.querySelector("p")
            console.log(text.textContent)
            text.style.textDecoration = "line-through"
         
            let result = store.filter(n => n !== text.textContent)
            store = result
            console.log(store)
            localStorage.setItem("store", JSON.stringify(store))
 
            parent.classList.add("swipe")
            text.classList.add("swipe")
            btnContainer.classList.add("swipe")
            let timeId = setTimeout(() => {
                parent.style.display = "none"
            }, 500)

            if(store.length == 0){
                console.log("store is empty")
                text.textContent  = "no more task, pls click on the 'click to start' button to add new ones"
                text.style.textDecoration = "none"
                localStorage.clear()

                parent.classList.remove("swipe")
                text.classList.remove("swipe")
                btnContainer.classList.remove("swipe")
                clearTimeout(timeId)
            }

        })
        
    }
}





let recognition = new webkitSpeechRecognition()
let startBtn = document.querySelector(".action-btn")
startBtn.addEventListener("click", () => {
    
    recognition.onstart = () => {
        action.textContent = "Loading"
        output.textContent = ""
        allowText.textContent = ''
    }
    
    recognition.onresult = (event) => {
        action.textContent = "Here we are"
        let transcript = event.results[0][0].transcript
        store.unshift(transcript)
        localStorage.setItem("store", JSON.stringify(store))
        console.log(store)
        renderLists(store)
    }
    
    recognition.onnomatch = () => {
        action.textContent = "Yikes!!!"
        output.textContent = "No match was found"
    }
    
    recognition.onerror = (event) => {
        action.textContent = "Oh No!!"
        output.textContent = `An error occured: ${event.error.toUpperCase()}`
        if(event.error == "not-allowed"){
            allowText.textContent = `To allow, 
                right click on the extension's icon 
                and select view web permissions. After that, 
                pls select allow for the microphone permission.`
        }
    }
    
    recognition.start()

})



