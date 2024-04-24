document.addEventListener("DOMContentLoaded", function () {
  const updateForm = document.getElementById("updateForm");

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  fetch(`https://my-brand-back-end-ts.onrender.com/blog/getBlog/${articleId}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("title").value = data.title;
      document.getElementById("content").innerHTML = data.content;
    })
    .catch((error) => {
      console.log("Erorr", error);
    });

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const articleTitleValue = document.getElementById("title").value;
    const articleCover = document.getElementById("cover").files[0];
    const articleContentValue = document.getElementById("content").innerHTML;
    const loader = document.querySelector(".dot-spinner");
    const showLoader = () => {
      loader.style.visibility = "visible";
    };

    const hideLoader = () => {
      loader.style.visibility = "hidden";
    };
    showLoader();
    const BlogContent = new FormData();

    BlogContent.append("title", articleTitleValue);
    BlogContent.append("cover", articleCover);
    BlogContent.append("content", articleContentValue);

    let tokens = localStorage.getItem("jwt");
    let token = JSON.parse(tokens);
    fetch(
      `https://my-brand-back-end-ts.onrender.com/blog/update/${articleId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: BlogContent,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        hideLoader();
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
        console.log("Error", error);
      });
  });
});
