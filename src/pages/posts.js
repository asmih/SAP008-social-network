import { creatingPost, gettingPost } from "../firebase-services/firestore.js";

export function postFunction() {
  const postsCreating = document.createElement("div");

  gettingPost().then((docs) => {
    for (const post of docs.docs) {
      const postData = post.data();
      const posts = document.createElement("div");
      posts.classList.add("post-style");

      const templatePosts = `
      <div class="eachPost">
        <div class="infos-user">
          <img class="img-user-log" src=${postData.photoURL}>
          <h3 class="name-user-log">${postData.displayName}</h3>
          <time class="date-hour">${postData.date}</time>
          <img src='img\\edit.svg' class="editsvg updl">
          <img src='img\\trash.svg' class="deletesvg updl">
        </div>
        <div class="post-infos">
          <p class="quote-posted">${postData.post}</p>
          <p class="author-name-log">${postData.author}, ${postData.book}</p>    
        </div>  
      </div>
      <div class="user-reactions">
          <img clas="liked" src='img\\heart.svg' class='reactions liked'>
          <img class="read" src='img\\book-open.svg' class='reactions read'>
          <img class="want-read" src='img\\bookmark.svg' class='reactions toread'>
      </div>
      

    `;
      posts.innerHTML = templatePosts;
      postsCreating.appendChild(posts);
    }
  });
  return postsCreating;
}
