let store = []
let taskList = document.querySelector(".task-list")
let output = document.querySelector(".output")
let action = document.querySelector(".action")
let allowText = document.querySelector(".allow")
let taskText = document.querySelectorAll(".task-text")

let retrievedStore = JSON.parse(localStorage.getItem("store"))
if(retrievedStore){
    store = retrievedStore
    renderLists(store)
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


function renderLists(arr){
    let list = ""
    arr.map(text => {
        list += `<li class = "task">
                    <p class = "task-text">${text}</p>
                    <div class = "task-btn-container">
                        <button class = "task-btn">Done</button>
                    </div>
                 </li>`
    })
    taskList.innerHTML = list

}
// for(let btn of taskBtn){
    
// }
let taskBtn;
taskBtn = document.querySelectorAll(".task-btn")
    for(let btn of taskBtn){
        btn.addEventListener("click", () => {
            let btnContainer = btn.parentElement
            let parent = btnContainer.parentElement
            let text = parent.querySelector("p")
            console.log(text.textContent)
            text.style.textDecoration = "line-through"
            // store.splice(index, 1)
            // localStorage.setItem("store", JSON.stringify(store))
            console.log(store)
            // localStorage.clear()
            // console.log(store)
        })
        // console.log(btn + ":" + index)
        // console.log(btn)
        
}


// if(taskBtn.length > 1){
//     for(let btn of taskBtn){
//         btn.addEventListener("click", () => {
//             let btnContainer = btn.parentElement
//             let parent = btnContainer.parentElement
//             let text = parent.querySelector("p")
//             console.log(text.textContent)
//             text.style.textDecoration = "line-through"
//             // localStorage.clear()
//             // console.log(store)
//             // store.splice(index, 1)
//             // console.log(store)
//         })
        
//     }

// }else{
//     taskBtn = document.querySelector(".task-btn")
//     taskBtn.addEventListener('click', ()=> {
//         console.log("seen")
//     })
// }

// num = [1, 2, 4]
// let index = num.indexOf(1)
// num.splice(1, 1)

// console.log(num.entries())
// if (taskBtn.length > 1){
//     for(let btn of taskBtn){
//         btn.addEventListener("click", ()=>{
//             console.log("cleared")
//         })
//     }
// }
// for (let [index, n] of num.entries()){
//     console.log(n)
//     console.log(index)
// }
console.log(taskBtn.length)
console.log(taskText.length)