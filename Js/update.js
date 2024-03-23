    document.addEventListener("DOMContentLoaded",function(){

    const updateForm = document.getElementById("updateForm")

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    const articleData = JSON.parse(localStorage.getItem("article"))[articleId]

    console.log(articleData)

    document.getElementById("title").value = articleData.title
    document.getElementById("content").value = articleData.content
    
    updateForm.addEventListener("submit", e =>{
        e.preventDefault()
    
    const updateTitle = document.getElementById("title").value
    const updateContent = document.getElementById("content").value
    const updatedImage = document.getElementById("cover").files[0]
    const reader = new FileReader();
    reader.readAsDataURL(updatedImage)
    reader.onload = function(){
        const cover = reader.result ;

        const articles = JSON.parse(localStorage.getItem("article"))
        articles[articleId].title = updateTitle
        articles[articleId].content = updateContent
        articles[articleId].cover = cover
        
        localStorage.setItem("article",JSON.stringify(articles))
    
            window.location.href=`admin.html`
      
    
    }
    
})

    })