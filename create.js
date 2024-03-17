document.addEventListener("DOMContentLoaded", function() {
    const createForm = document.getElementById("createForm");
    const articleTitle = document.getElementById("ArticleTitle");
    const articleCover = document.getElementById("articleCover");
    const articleContent = document.getElementById("articleContent");
    const blogContainer = document.getElementById("main-blog-container")
    


    createForm.addEventListener("submit", e => {
        e.preventDefault();
        inputValidation();
    });

    const setError = (element, message) => {
        const errorDisplay = element.nextElementSibling; 
        errorDisplay.innerText = message;
        errorDisplay.classList.add("error");
        errorDisplay.classList.remove("success");
    };

    const setSuccess = element => {
        const errorDisplay = element.nextElementSibling; 
        errorDisplay.innerText = "";
        errorDisplay.classList.add("success");
        errorDisplay.classList.remove("error");
        
    };

    const inputValidation = () => {
        const articleTitleValue = articleTitle.value.trim();
       
        const articleContentValue = articleContent.value.trim();

        if (articleTitleValue === "") {
            setError(articleTitle, "Ooops Please Enter The Title");
        } else {
            setSuccess(articleTitle);
        }
        if (articleContentValue === "") {
            setError(articleContent, "Ooooops Please Enter The Content Of Blog");
        } else {
            setSuccess(articleContent);
        }
        if (!articleCover.files[0]) {
            setError(articleCover, "Ooops Please Enter Article Cover");
        } else {
            setSuccess(articleCover);
        }


        if(articleTitleValue && articleContentValue && articleCover.files[0]){
            alert("Article Created SuccessFully  !!!!!!")
         
         const file = articleCover.files[0]
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = function(){
         const cover  = reader.result;

           const newArticle = addArticle(articleTitleValue,cover,articleContentValue)
           createArticleContainer(newArticle)
           articleTitle.value = ""
           articleCover.value = ""
           articleContent.value = ""
        }

        }
    };

 
     
  const addArticle = (title,cover,content) =>{
    
    const articles = {title,cover,content}
    const existingArticle = localStorage.getItem("article")
    const articleList = existingArticle ? JSON.parse(existingArticle): [];
  
    articleList.push(articles);
   localStorage.setItem("article",JSON.stringify(articleList))
   return articles
  }

 const createArticleContainer = (articles) =>{
   
    const blogContent = document.createElement("div")
    const blogTitle = document.createElement("h3")
    const blogDesc = document.createElement("p")
    const blogImage = document.createElement("img")
    


    blogTitle.innerHTML = articles.title;
    blogDesc.innerHTML = articles.content
    blogImage.src= articles.cover

    blogContent.append(blogTitle,blogImage,blogDesc)
    blogContainer.appendChild(blogContent)

 }


 const existingArticle = localStorage.getItem("article");
 if(existingArticle){
    const articleList = JSON.parse(existingArticle)
    articleList.forEach(createArticleContainer)
 }
});
