
// inputs 
const imageInput = document.getElementById("imageInput")
const contactInput = document.getElementById("contactInput")
const messageInput = document.getElementById("messageInput")
const nameInput = document.getElementById("nameInput")
const emailInput = document.getElementById("emailInput")
// error message 
const errorInputAuthor = document.getElementById("errorInputAuthor")
const errorInputJoke = document.getElementById("errorInputJoke")
// count 
const countEmailsSpan = document.getElementById("countEmailsSpan")
// buttons 
const submitBtn = document.getElementById("submitBtn")
// container 
const blockMail = document.getElementById("blockMail")

// submitBtn.setAttribute("disabled","")

const reset =()=>{
    imageInput.value = ""
    contactInput.value = "Bonjour"
    messageInput.value = ""
    nameInput.value = ""
    emailInput.value = ""
}
resetBtn.addEventListener('click',()=>{
    reset()
})

// authorInput.addEventListener('input',()=>{
//     let valueAuthor = authorInput.value 
    
//     if(!valueAuthor) {
//         errorInputAuthor.innerText = " the author is required  "
//         return submitBtn.setAttribute("disabled","")

//     }
    
// })
// jokeInput.addEventListener('input',()=>{
//     let valueJoke   = jokeInput.value
//     if(valueJoke.length <= 5){
//         errorInputJoke.innerText = " joke must contains at least 5 caracters "
//         return submitBtn.setAttribute("disabled","")
//     }
        
    
// })
// const verification = ()=>{

//         errorInputJoke.innerText = ""
//         return submitBtn.removeAttribute("disabled","")
// }
const addEmailToDiv = (data)=>{
    let emailContainer = document.createElement("div")

    // for the image 
    let img = document.createElement("img")
    img.classList.add("profile-image")
    img.src = "/images/" + data.image; 



    // for the blackbnote 
    let divBlockNote = document.createElement("div")
    divBlockNote.classList.add("blockNote")

    let h1 =  document.createElement("h1")
    // "Bonjour " + 
    h1.innerText = data.contact

    let parag =  document.createElement("p")
    parag.innerText = data.message

    let h2 =  document.createElement("h2")
    h2.innerText = data.name

    let h3 =  document.createElement("h3")
    h3.innerText = data.email
    h3.classList.add("email")

    // for the blacIcon 
    let divBlocIcon = document.createElement("div")
    let a1 =  document.createElement("a")
    a1.classList.add("social-icon")
    let a2 =  document.createElement("a")
    a2.classList.add("social-icon")
    let a3 =  document.createElement("a")
    a3.classList.add("social-icon")

    divBlocIcon.classList.add("blocIcon")

    // for the buttons 
    let divBtns = document.createElement("div")
    divBtns.classList.add("btns")

    let btnDelete = document.createElement("button")
    let btnLike = document.createElement("button")

    // 
    emailContainer.appendChild(img)
    emailContainer.appendChild(divBlockNote)
    emailContainer.appendChild(divBlocIcon)
    emailContainer.appendChild(divBtns)

    divBlockNote.appendChild(h1)
    divBlockNote.appendChild(parag)
    divBlockNote.appendChild(h2)
    divBlockNote.appendChild(h3)

    divBlocIcon.appendChild(a1)
    divBlocIcon.appendChild(a2)
    divBlocIcon.appendChild(a3)

    divBtns.appendChild(btnDelete)
    divBtns.appendChild(btnLike)


    blockMail.appendChild(emailContainer)
    
    countEmailsSpan.innerText = parseInt(countEmailsSpan.innerText)+1

    btnDelete.classList.add("delete")
    btnDelete.innerText="Delete"

    btnDelete.addEventListener('click',()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("delete",urlApi + '/' + data.id,true)
        xhr.addEventListener('load ',()=>{
            if(xhr.status != 200 )
                return alert("error" +xhr.response)
            emailContainer.remove()
            countEmailsSpan.innerText = parseInt(countEmailsSpan.innerText) -1
            
        })  
        xhr.addEventListener('error',()=>{
          alert('Error removing Data')
        })
        xhr.send()
        location.reload();
    })

    btnLike.classList.add("likeBtn")
    btnLike.innerText="like"
    // btnLike.addEventListener('click',()=>{
        
    // })
}

const urlApi = "http://localhost:3000/emails"
const loadQuestion = ()=>{
    blockMail.innerHTML =""
    const xhr = new XMLHttpRequest()
    xhr.open("get",urlApi,true)
    xhr.addEventListener('load',()=>{
        if(xhr.status != 200)
            return alert("Error"+xhr.response)
        let data = JSON.parse(xhr.response)
        data.forEach(ele =>addEmailToDiv(ele))
    })
    xhr.addEventListener('error',()=>{
        return alert("Error")
    })
    
    xhr.send()
}
loadQuestion()
submitBtn.addEventListener('click',()=>{
    let imageValue = imageInput.value
    let contactValue = contactInput.value
    let messageValue = messageInput.value
    let nameValue = nameInput.value 
    let emailValue = emailInput.value
    let dataToSend = {
        image:imageValue,
        contact:contactValue,
        message:messageValue,
        name:nameValue,
        email:emailValue
    }
    dataToSend = JSON.stringify(dataToSend)
    const xhr = new XMLHttpRequest()
    xhr.open("post",urlApi,true)
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.addEventListener('load',()=>{
        if(xhr.status == 201)
        {
            let data = JSON.parse(xhr.response)
            addEmailToDiv(data)
        }  
        else{
            alert(xhr.response)
        }
    })
    xhr.addEventListener('error',()=>{
        return alert("Error")
    })
    xhr.send(dataToSend)
    reset()
})

// const updateNumbers = () => {
//     const likes = document.querySelectorAll(".likes");
//     likes.forEach((ele, index) => (ele.innerText = index + 1));
//   };
  

//     generateBtn.addEventListener('click',()=>{
//     const xhr = new XMLHttpRequest()
//     xhr.open("get","https://api.chucknorris.io/jokes/random",true)
//     xhr.addEventListener('load',()=>{
//         if(xhr.status !== 200) {
//             return alert("Error" + xhr.response);
//         }
//         let data = JSON.parse(xhr.response);
//         // Set the received values into the input fields
//         authorInput.value = "Chuck Norris"; // or any other default author value
//         jokeInput.value = data.value;
//         // Optionally, enable the submit button
//         submitBtn.removeAttribute("disabled");
//     });
//     xhr.addEventListener('error',()=>{
//         return alert("Error");
//     });
//     xhr.send();
// });