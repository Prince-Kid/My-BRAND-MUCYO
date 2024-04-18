
const commentForm = document.getElementById("commentForm")
const commentContainer = document.getElementById("commentContainer")
const fullName = document.getElementById("fullName")
const userEmail = document.getElementById("userEmail")
const comment = document.getElementById("comment")


commentForm.addEventListener("submit", e => {
    e.preventDefault();
    validation()
});

const error = (element, message)=>{
    const inputElement = element.parentElement;
    errorDisplay = inputElement.querySelector(".error")
    errorDisplay.innerHTML = message;
    errorDisplay.classList.add("error");
    errorDisplay.classList.remove("success");
}

const valid = (element)=>{
  const inputElement = element.parentElement;
  const errorDisplay = inputElement.querySelector(".error")
  errorDisplay.innerHTML = "";
  errorDisplay.classList.add("success")
  errorDisplay.classList.remove('error')
}

const validation = ()=>{

 const fullNameValue = fullName.value.trim() 
 const userEmailValue = userEmail.value.trim()
 const commentValue  = comment.value.trim()
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


 if(fullNameValue === ""){
    error(fullName, "Please  enter your Full Name.")
 }else{
    valid(fullName)
 }
 
 if(!emailRegex.test(userEmailValue)){
    error(userEmail, "Please Enter  a valid email address")
 }else{
     valid(userEmail);
 }

if(commentValue === "") {
    error(comment,"Comment can not be empty")
}
else{
    valid(comment)
}

if(fullNameValue && userEmailValue && commentValue){
 
     alert("Your Comment Was Submitted Successfully !!")

    // const newComment = addComment(fullNameValue,userEmailValue,commentValue)
    // createCommentContainer(newComment)

    // fullName.value = ""
    // userEmail.value = ""
    // comment.value = ""

    const url = URLSearchParams(window.location.href)
    const id = url.get("id");

    const commentData = {
        fullNameValue,
        userEmailValue,
        commentValue
    }

    fetch(`http://localhost:5000/blog/comment/${id}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(commentData)
    })
    .then(res => res.json)
    .then(commentInfo => console.log("comment Info : ",commentInfo))
    .catch(error=>[
        console.log("Error",error)
    ])
    window.location.href="article.html"
}

}


// const addComment = (fullName,userEmail,comment) =>{
//   const comments = {fullName,userEmail,comment}
//   const existingComment  =  localStorage.getItem("comment")
//   const commentList = existingComment ? JSON.parse(existingComment) : [];
//   commentList.push(comments)
//   localStorage.setItem("comment",JSON.stringify(commentList))

//   return comments
// }

const createCommentContainer = (comments)=>{
  const commentContent = document.createElement("div")
  const profiles = document.createElement("div")
  const username = document.createElement("h3")
  const reactions = document.createElement("div")
  const comm = document.createElement("textarea")
  const btn = document.createElement("button")
  const btn1 = document.createElement("button")


  commentContent.classList.add("commentContent")
  btn.classList.add("reply")
  profiles.classList.add("prof")
  username.classList.add("user")
  btn1.classList.add("like")
  comm.classList.add("comm")

  username.innerHTML ="@" + comments.fullName
  comm.innerHTML = comments.comment
  btn.innerHTML = "Reply"
  btn1.innerHTML = "🩶"

  reactions.append(btn,btn1)
  commentContent.append(username,comm,reactions)
  commentContainer.appendChild(commentContent)

}

const existingComment = localStorage.getItem("comment")
if(existingComment){
    const commentList = JSON.parse(existingComment)
    commentList.forEach(createCommentContainer)
}