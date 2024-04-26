document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.getElementById("createForm");
  const articleTitle = document.getElementById("ArticleTitle");
  const articleCover = document.getElementById("articleCover");
  const articleContent = document.getElementById("articleContent");
  const blogContainer = document.getElementById("main-blog-container");
  const singleArticle = document.querySelector(".article");
  const loader = document.querySelector(".dot-spinner");
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    inputValidation();
  });

  const setError = (element, message) => {
    const errorDisplay = element.nextElementSibling;
    errorDisplay.innerText = message;
    errorDisplay.classList.add("error");
    errorDisplay.classList.remove("success");
  };

  const setSuccess = (element) => {
    const errorDisplay = element.nextElementSibling;
    errorDisplay.innerText = "";
    errorDisplay.classList.add("success");
    errorDisplay.classList.remove("error");
  };
  const showLoader = () => {
    loader.style.visibility = "visible";
  };

  const hideLoader = () => {
    loader.style.visibility = "hidden";
  };
  const inputValidation = () => {
    const articleTitleValue = articleTitle.value.trim();

    if (articleTitleValue === "") {
      setError(articleTitle, "Ooops Please Enter The Title");
    } else {
      setSuccess(articleTitle);
    }
    // if (articleContentValue === "") {
    //   setError(articleContent, "Ooooops Please Enter The Content Of Blog");
    // } else {
    //   setSuccess(articleContent);
    // }
    if (!articleCover.files[0]) {
      setError(articleCover, "Ooops Please Enter Article Cover");
    } else {
      setSuccess(articleCover);
    }

    if (articleTitleValue && articleCover.files[0]) {
      showLoader();
      const BlogContent = new FormData();
      const content = articleContent.innerHTML;
      BlogContent.append("title", articleTitleValue);
      BlogContent.append("cover", articleCover.files[0]);
      BlogContent.append("content", content);

      let tokens = localStorage.getItem("jwt");
      let token = JSON.parse(tokens);

      fetch("https://my-brand-back-end-ts.onrender.com/blog/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: BlogContent,
      })
        .then((res) => res.json())
        .then((data) => {
          document
            .getElementsByClassName("popUp-card")[0]
            .classList.add("active");
          document
            .getElementById("dismiss-btn")
            .addEventListener("click", function () {
              document
                .getElementsByClassName("popUp-card")[0]
                .classList.remove("active");
              window.location.href = `./admin.html`;
            });
        })
        .catch((error) => {
          hideLoader();
          console.log("There was an Error", error);
        });
    }
  };

  /**************************** Creating  New Article ***********************************/

  //   const addArticle = (title,cover,content) =>{

  //     const currentDate = new Date().toLocaleDateString();
  //     const articles = { title, cover, content, dateCreated: currentDate };
  //     const existingArticle = localStorage.getItem("article")
  //     const articleList = existingArticle ? JSON.parse(existingArticle): [];

  //     articleList.push(articles);
  //    localStorage.setItem("article",JSON.stringify(articleList))
  //    return articles
  //   }

  /*************************** Delete ***************** */

  const deleteArticle = (index) => {
    const confirm = window.confirm(
      "Are You Sure You Want To Delete This Article?"
    );

    if (confirm) {
      let articleList = JSON.parse(localStorage.getItem("article"));
      let comments = JSON.parse(localStorage.getItem("comment"));
      if (
        articleList &&
        Array.isArray(articleList) &&
        index >= 0 &&
        index < articleList.length
      ) {
        articleList.splice(index, 1);
        localStorage.setItem("article", JSON.stringify(articleList));
      }

      let count = 0;
      for (i = 0; i < comments.length; i++) {
        if (comments[i].articleId == index) {
          count++;
        }
      }
      comments.splice(index, count);
      localStorage.setItem("comment", JSON.stringify(comments));

      window.location.reload();
    }
  };

  /*************************** Displaying The Articles In UI ****************/

  const existingArticle = localStorage.getItem("article");
  const articleList = JSON.parse(existingArticle);

  if (articleList !== "") {
    for (let i = 0; i < articleList.length; i++) {
      const blogContent = document.createElement("div");

      blogContent.innerHTML = ` <div class="blog-box">
            <div class="blog-img">
                <img src="${articleList[i].cover}" alt="Blog">
            </div>
            <div class="blog-text">
                <span>${articleList[i].dateCreated}</span>
                <a href="#" class="blog-title">${articleList[i].title}</a>
                <p>${articleList[i].content}</p>
                <div class="edit">
                    <a href="#" class="delete-btn"  ><svg fill="red" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 354.319 354.319" xml:space="preserve" stroke="red">

                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        
                        <g id="SVGRepo_iconCarrier"> <path id="XMLID_2_" d="M293.765,125.461l-41.574-17.221l17.221-41.574c3.17-7.654-0.464-16.428-8.118-19.599L150.428,1.146 C142.775-2.024,134,1.61,130.83,9.264l-17.221,41.574L72.035,33.617c-7.654-3.17-16.428,0.464-19.599,8.118 c-3.17,7.654,0.464,16.428,8.118,19.599l55.433,22.961l96.628,40.024H87.16c-8.284,0-15,6.716-15,15v200c0,8.284,6.716,15,15,15h180 c8.284,0,15-6.716,15-15V153.126l0.125,0.052c1.877,0.777,3.821,1.146,5.734,1.146c5.886,0,11.472-3.487,13.864-9.264 C305.053,137.406,301.419,128.631,293.765,125.461z M141.326,62.318l11.48-27.716l83.148,34.441l-11.48,27.716L182.9,79.539 L141.326,62.318z"/> </g>
                        
                        </svg>
                      </a>
                       <a href="update.html?id=${i}"><svg  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1f43d1">

                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        
                        <g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#1f43d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#1f43d1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>
                        
                        </svg></a> 
                 </div>
            </div>
        </div>
    
        `;

      blogContainer.append(blogContent);

      blogContent
        .querySelector(".delete-btn")
        .addEventListener("click", function (e) {
          e.preventDefault();
          deleteArticle(i);
        });

      blogContent
        .querySelector(".blog-title")
        .addEventListener("click", function () {
          window.location.href = `./article.html?id=${i}`;
        });
    }
  } else {
    blogContent.innerHTML = "Ooooop There is No Blog ";
  }

  /******************************** Displaying The Individual Article************************************/

  const url = new URL(window.location.href);
  const idPar = url.searchParams.get("id");

  singleArticle.innerHTML = ` <div class="article-container">
 <marquee behavior="" direction="">Welcome To Our Blog</marquee>
<h1>Article : <u>${articleList[idPar].title}</u>
</h1>
<div class="blog-boxs">
 <div class="blog-img">
     <img src="${articleList[idPar].cover}" alt="Blog">
 </div>
 <div class="blog-text">
     <span>${articleList[idPar].dateCreated}</span>
     <a href="#" class="blog-title">${articleList[idPar].title}</a>
     
     ${articleList[idPar].content}
     
 </div>
</div>
</div>  
<h2 style="text-align: center; margin: 5px;">Recent <span  style="color: darkcyan;">Comments 📩</span></h2>
<div id="commentContainer">

</div>
<div class="reaction">
<h4>Was This article Interested ?</h4>
<div class="likes">
 <i class="fa-solid fa-thumbs-up"></i> <i class="fa-solid fa-thumbs-down"></i>
</div>

</div>
<div class="feedback">
<form action="" id="commentForm">
 <div class="input-control">
 <input type="text" id="fullName" placeholder="Enter Your Full Name"  />
 <div class="error"></div>
</div>
<div class="input-control">
 <input type="Email"  id="userEmail" placeholder="Enter Your Email" />
 <div class="error"></div>
</div><br><br>
 <legend>Comment This Article:
     
 </legend><br>
 <div class="input-control">
 <textarea  id="comment" cols="30" rows="10" >
 </textarea><div class="error"></div>
 </div><br><br>
 <input type="submit" >
</form>
</div>
<h1 style="margin-top: 80px;">Other Related Articles</h1>
<div class="blog-container">

<div class="blog-box">
 <div class="blog-img">
     <img src="./Assets/Education.PNG" alt="Blog">
 </div>
 <div class="blog-texts">
     <span>05 March 2024 / AI </span>
     <a href="#" class="blog-title">What Is The Impacts Of AI To Human ?</a>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo delectus doloremque, aperiam libero cumque molestias dignissimos ad, ducimus praesentium debitis iure, natus eligendi porro nam sint facere culpa commodi officiis!</p>
     <a href="#">Read More</a>
 </div>
</div>


<div class="blog-box">
 <div class="blog-img">
     <img src="./Assets/Education.PNG" alt="Blog">
 </div>
 <div class="blog-texts">
     <span>05 March 2024 / AI </span>
     <a href="#" class="blog-title">What Is The Impacts Of AI To Human ?</a>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo delectus doloremque, aperiam libero cumque molestias dignissimos ad, ducimus praesentium debitis iure, natus eligendi porro nam sint facere culpa commodi officiis!</p>
     <a href="#">Read More</a>
 </div>
</div>


<div class="blog-box">
 <div class="blog-img">
     <img src="./Assets/Education.PNG" alt="Blog">
 </div>
 <div class="blog-texts">
     <span>05 March 2024 / AI </span>
     <a href="#" class="blog-title">What Is The Impacts Of AI To Human ?</a>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo delectus doloremque, aperiam libero cumque molestias dignissimos ad, ducimus praesentium debitis iure, natus eligendi porro nam sint facere culpa commodi officiis!</p>
     <a href="#">Read More</a>
 </div>
</div>

</div>




<section class='Newsletter'>
<div class="container flexSB">
 <div class="left">
   <h1>Newsletter - Stay tune and get the latest update</h1>
  
 </div>
 <div class="right">
     <input type="email" placeholder='Enter Email Here ....'/>
     <i class='fas fa-paper-plane'></i>
 </div>
</div>
</section>
<footer>
<div class="container flexSB">
   <div class="box logo">
         <h1>Prince M</h1>
        
       <p>I'm Prince Mucyo, a passionate software developer from Rwanda.</p>
       <i class='fab fa-facebook-f icon'></i>
       <i class='fab fa-twitter icon'></i>
       <i class='fab fa-instagram icon'></i>
   </div>
   <div class="box links">
         <h3>Explore</h3>
         <ul>
         <li>
      <a href="index.html">Home</a> 
       </li>
       <li>  
         <a href="index.html">About Us</a> 
       </li>
       <li>
         <a href="index.html">Skills</a> 
       </li>
      
      
         </ul>
   </div>
   <div class="box links">
          <h3>Quick Links</h3>
          <ul>
       <li>
         <a href="index.html">portifolio</a> 
       </li>
       <li>
         <a href="index.html">contact</a> 
       </li>
       <li>
         <a href="index.html">Login</a> 
       </li>
          </ul>
   </div>
   
   <div class="box last">
       <h3>Have a Questions ?</h3> 
       <ul>
       <li>
           <i class='fa fa-map'></i>
           Rubavu,Rwanda</li>
       <li>
           <i class='fa fa-phone'></i>
           +250783154587</li>
       <li>
           <i class='fa fa-paper-plane'></i>
           mucyoprinc@gmail.com</li>
       </ul>
     
   </div>
</div>
<div class="legal">
 <p>
     Copyright@2024 All rights reserved | Made With <i class='fa fa-heart'></i>by Prince~Kid
 </p>
</div>
</footer>

`;

  /********************************* Creating The Comment  Section on Individual  Article ********************************/

  const commentForm = document.getElementById("commentForm");
  const commentContainer = document.getElementById("commentContainer");
  const fullName = document.getElementById("fullName");
  const userEmail = document.getElementById("userEmail");
  const comment = document.getElementById("comment");

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validation();
  });

  const error = (element, message) => {
    const inputElement = element.parentElement;
    errorDisplay = inputElement.querySelector(".error");
    errorDisplay.innerHTML = message;
    errorDisplay.classList.add("error");
    errorDisplay.classList.remove("success");
  };

  const valid = (element) => {
    const inputElement = element.parentElement;
    const errorDisplay = inputElement.querySelector(".error");
    errorDisplay.innerHTML = "";
    errorDisplay.classList.add("success");
    errorDisplay.classList.remove("error");
  };

  const validation = () => {
    const fullNameValue = fullName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const commentValue = comment.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullNameValue === "") {
      error(fullName, "Please  enter your Full Name.");
    } else {
      valid(fullName);
    }

    if (!emailRegex.test(userEmailValue)) {
      error(userEmail, "Please Enter  a valid email address");
    } else {
      valid(userEmail);
    }

    if (commentValue === "") {
      error(comment, "Comment can not be empty");
    } else {
      valid(comment);
    }

    if (fullNameValue && userEmailValue && commentValue) {
      alert("Your Comment Was Submitted Successfully !!");

      addComment(idPar, fullNameValue, userEmailValue, commentValue);

      fullName.value = "";
      userEmail.value = "";
      comment.value = "";

      window.location.href = `article.html?id=${idPar}`;
    }
  };

  /******************************* Setting The Comment Into local Storage  ************************************/

  const addComment = (articleId, fullName, userEmail, comment) => {
    const currentDate = new Date().toDateString();
    const comments = { articleId, fullName, userEmail, comment, currentDate };
    const existingComment = localStorage.getItem("comment");
    const commentList = existingComment ? JSON.parse(existingComment) : [];
    commentList.push(comments);
    localStorage.setItem("comment", JSON.stringify(commentList));

    return comments;
  };

  /**************** Displaying Specific Comment To The Screeen*********************************** */

  const existingComment = localStorage.getItem("comment");
  const commentList = JSON.parse(existingComment);

  if (commentList) {
    let foundComments = false;
    let numberOfComment = 0;

    for (i = 0; i < commentList.length; i++) {
      if (commentList[i].articleId === idPar) {
        const commentContent = document.createElement("div");
        const profiles = document.createElement("div");
        const username = document.createElement("h3");
        const reactions = document.createElement("div");
        const comm = document.createElement("textarea");
        const btn = document.createElement("button");
        const btn1 = document.createElement("button");

        commentContent.classList.add("commentContent");
        btn.classList.add("reply");
        profiles.classList.add("prof");
        username.classList.add("user");
        btn1.classList.add("like");
        comm.classList.add("comm");

        username.innerHTML = "@" + commentList[i].fullName;
        comm.innerHTML = commentList[i].comment;
        btn.innerHTML = "Reply";
        btn1.innerHTML = "🩶";
        profiles.innerHTML = commentList[i].currentDate;
        reactions.append(btn, btn1);
        commentContent.append(username, profiles, comm, reactions);
        commentContainer.appendChild(commentContent);
        numberOfComment++;
        foundComments = true;
      }
    }
    if (!foundComments) {
      commentContainer.innerHTML = "No Comment Yet";
    } else {
      const commentCountElement = document.createElement("p");
      commentCountElement.innerHTML = "Number of comments: " + numberOfComment;

      commentContainer.appendChild(commentCountElement);
    }
  }
});
