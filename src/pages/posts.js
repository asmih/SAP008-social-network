import { gettingPost, deletingPost, editingPost } from "../firebase-services/firestore.js";
import { auth } from "../firebase-services/firebase-config.js";

export function postFunction(posts) {
  

  gettingPost().then((docs) => {
    for (const post of docs.docs) {
      const postsCreating = document.createElement("div");
      postsCreating.id = post.id
      const templatePosts = creatingPostTemplate(post);
      postsCreating.innerHTML = templatePosts;
      posts.appendChild(postsCreating);
    }
    
    const btnDeleteArrays = [...posts.getElementsByClassName('deletesvg')]
    btnDeleteArrays.forEach(element => {
      element.addEventListener('click', (event) => {
        const postId = event.target.parentNode.parentNode.parentNode.id
        document.body.appendChild(deleteConfirm(postId))
      })
    });
  });

}

export function deleteConfirm(postId){
  const confirmTemplate = document.createElement('div');
  confirmTemplate.classList.add("confirm-style");

  
  const templateDel = `
  <p class="confirm-paragraph">Tem certeza que deseja deletar seu post?</p>
    <button class="button-dlt" id="buttonDelete">Deletar</button>
    <button class="button-ccl" id="cancelConf">Cancelar</button>
   
  `
  confirmTemplate.innerHTML = templateDel;

  const btnDeleteModal = confirmTemplate.querySelector('#buttonDelete')
  btnDeleteModal.addEventListener('click', () => {
    deletingPost(postId);
    document.querySelector(`#${postId}`).remove();
    confirmTemplate.remove();
  })

  const btnCancelConfirm = confirmTemplate.querySelector('#cancelConf')
  btnCancelConfirm.addEventListener('click', () => {
    confirmTemplate.remove();
  })


  return confirmTemplate;
  
}

export function creatingPostTemplate(post){
  
  
  const postData = post.data();
  let templatePosts = `
  <div class="eachPost">
    <div class="infos-user">
      <img class="img-user-log" src=${postData.photoURL} referrerpolicy="no-referrer">
      <h3 class="name-user-log">${postData.displayName}</h3>
      <time class="date-hour">${postData.date}</time>
      `
    const secondTemplatePosts = `
      <img src='img\\edit.svg' class="editsvg updl" id="buttonEdit">
      <img src='img\\trash.svg' class="deletesvg updl" id="buttonDel"> `
    
    const thirdTemplatePosts = `
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
 if (postData.userId == auth.currentUser.uid) templatePosts = templatePosts.concat('', secondTemplatePosts);

 templatePosts = templatePosts.concat('', thirdTemplatePosts);


return templatePosts;
} 