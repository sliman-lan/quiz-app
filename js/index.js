// Global letiables
let http = new XMLHttpRequest();
let htmlBtn = document.getElementById("html-btn")
let cssBtn = document.getElementById("css-btn")
let q = document.querySelector("#q")
let labels = document.querySelectorAll(".row_ans > label")
let submit = document.querySelector("#submit")
let radioBtns = document.querySelectorAll(".row_ans > input[type='radio']")
let quizArea = document.querySelector(".quiz-area")
let resultSection = document.querySelector(".result-section")
let result = document.querySelector(".result")
let rightAnswers = 0;
let correct = '';
let rowAns = document.querySelectorAll('.row_ans > label')
let counter = 0
let redo = document.querySelector('#redo')

// main functionality
const switchToQuizMode = ()=> {
    document.querySelector(".main-content").style.display = "none"
    document.querySelector("#quiz-content").style.display = "block"
    document.querySelector("#result").style.display = "block"
    counter = 0
    rightAnswers = 0
    result.children[0].textContent = ''
}
const redoBtn = ()=> window.location.reload()
redo.addEventListener("click",redoBtn)

// Handling the Requests
http.onreadystatechange = function () { 
    if(this.readyState == 4 && this.status == 200){
        let obj = JSON.parse(this.responseText)
        let questionCount = Object.keys(obj).length - 1
        // get data 
        switchToQuizMode()
        q.textContent = `${obj[counter]['title']}`
        labels.forEach((label, index )=>{
            label.textContent = obj[counter][`answer_${index + 1}`]
        })
        radioBtns[0].click()
        submit.addEventListener("click", function() {
            // Loop on Answers
            rowAns.forEach((row) => {
                let user_ans_id = document.querySelector(`#${row.previousElementSibling.id}`)
                let user_ans = ''
                if(user_ans_id.checked){
                    user_ans = row.textContent
                    correct = obj[counter][`right_ans`]
                    rightAnswers += correct == user_ans ?  1 : 0
                }
            })
            if(counter < questionCount){
                counter++
                q.textContent = `${obj[counter]['title']}`
                labels.forEach((label, index )=>{
                    label.textContent = obj[counter][`answer_${index + 1}`]
                })  
                radioBtns[0].click()
            }else {
                // show the result
                quizArea.style.display = 'none'
                result.className = rightAnswers > 8 ? "alert-success" : rightAnswers >= 5  ?  "alert-primary":"alert-danger"
                result.children[0].textContent = rightAnswers
                resultSection.style.display = 'block'
                result.style.display = 'block'
            }
        })       
    }
}


htmlBtn.addEventListener( "click", function() {
    http.open("GET",'./html_quiz.json')
    http.send()  
});

cssBtn.addEventListener( "click", function() {
    http.open("GET",'./css_quiz.json')
    http.send()  
});