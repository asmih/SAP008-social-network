import {
  gettingPost,
  deletingPost,
  editingPost,
} from '../firebase-services/firestore.js';
import { auth, db } from '../firebase-services/firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc,
} from '../firebase-services/exports.js';

export function postFunction(posts) {
  gettingPost().then((docs) => {
    for (const post of docs.docs) {
      const postsCreating = document.createElement('div');
      postsCreating.id = post.id;
      const templatePosts = creatingPostTemplate(post);
      postsCreating.innerHTML = templatePosts;
      posts.appendChild(postsCreating);
    }

    const btnDeleteArrays = [...posts.getElementsByClassName('deletesvg')];
    btnDeleteArrays.forEach((element) => {
      element.addEventListener('click', (event) => {
        const postId = event.target.parentNode.parentNode.parentNode.id;
        document.body.appendChild(deleteConfirm(postId));
      });
    });

    const btnEditArrays = [...posts.getElementsByClassName('editsvg')];
    btnEditArrays.forEach((element) => {
      element.addEventListener('click', (event) => {
        const postId = event.target.parentNode.parentNode.parentNode.id;
        const elementTarget = event.target.parentNode.parentNode;
        const oldText = elementTarget.querySelector('.quote-posted').innerText;
        const oldAuthorBook = elementTarget.querySelector('.author-name-log').innerText.split(',');
        console.log(oldAuthorBook);
        document.body.appendChild(
          editConfirm(postId, oldText, oldAuthorBook[0], oldAuthorBook[1]),
        );
      });
      const btnLike = [...posts.querySelectorAll('.liked')];
      btnLike.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const postId = event.target.parentNode.parentNode.id;
          const docRef = getDoc(doc(db, 'post', postId));
          docRef.then((resp) => {
            const postData = resp.data();
            if (postData.likes.includes(auth.currentUser.uid)) {
              const idIndex = postData.likes.indexOf(auth.currentUser.uid);
              postData.likes.splice(idIndex, 1);
              event.target.src = 'img//heart.svg';
            } else {
              postData.likes.push(auth.currentUser.uid);
              event.target.src = 'img//heart-fill.svg';
            }
            updateDoc(doc(db, 'post', postId), { likes: postData.likes });
            event.target.parentNode.getElementsByTagName('p')[0].innerHTML = postData.likes.length;
          });
        });
      });
    });
  });
}

export function editConfirm(postId, text, author, book) {
  const confirmEditTemplate = document.createElement('div');
  confirmEditTemplate.classList.add('edit-style');

  const templateEdit = `
      <textarea class='edit-post-ipt'>
        ${text}
      </textarea>
        <div class='inputs-edit-source'>
          <input type='text' class='author-updt edit-post' id="updtAuthor" value="${author}">
          <input type='text' class='book-updt edit-post' id="updtBook" value="${book}">
        </div>  
    <div class='buttons-updt'>
          <button type='submit' class='button-update buttons-post'>Atualizar 
          </button>
          <button type='submit' class='button-update-cancel buttons-post'>Cancelar 
          </button>
    </div> 
  `;
  confirmEditTemplate.innerHTML = templateEdit;

  const btnEditModal = confirmEditTemplate.querySelector('.button-update');
  btnEditModal.addEventListener('click', () => {
    const updatedText = confirmEditTemplate.querySelector('.edit-post-ipt');
    const updatedAuthor = confirmEditTemplate.querySelector('.author-updt');
    const updatedBook = confirmEditTemplate.querySelector('.book-updt');
    const postData = {};
    if (text !== updatedText) postData.text = updatedText.value;
    if (author !== updatedAuthor) postData.author = updatedAuthor.value;
    if (book !== updatedBook) postData.book = updatedBook.value;
    editingPost(postId, postData);

    const postDiv = document.getElementById(postId);
    const quote = postDiv.querySelector('.quote-posted');
    console.log(quote);
    quote.innerHTML = updatedText.value;
    postDiv.querySelector('.author-name-log').innerHTML = `${updatedAuthor.value}, ${updatedBook.value}`;
    confirmEditTemplate.remove();
  });

  const btnCancelEditConfirm = confirmEditTemplate.querySelector('.button-update-cancel');
  btnCancelEditConfirm.addEventListener('click', () => {
    confirmEditTemplate.remove();
  });

  return confirmEditTemplate;
}

export function deleteConfirm(postId) {
  const confirmTemplate = document.createElement('div');
  confirmTemplate.classList.add('confirm-style');

  const templateDel = `
  
  <p class="confirm-paragraph">Tem certeza que deseja deletar seu post?</p>
    <button class="button-dlt buttons-post" id="buttonDelete">Deletar</button>
    <button class="button-ccl buttons-post" id="cancelConf">Cancelar</button>
   
  `;
  confirmTemplate.innerHTML = templateDel;

  const btnDeleteModal = confirmTemplate.querySelector('#buttonDelete');
  btnDeleteModal.addEventListener('click', () => {
    deletingPost(postId);
    document.querySelector(`#${postId}`).remove();
    confirmTemplate.remove();
  });

  const btnCancelConfirm = confirmTemplate.querySelector('#cancelConf');
  btnCancelConfirm.addEventListener('click', () => {
    confirmTemplate.remove();
  });

  return confirmTemplate;
}

export function creatingPostTemplate(post) {
  const postData = post.data();
  let templatePosts = `
  <div class="eachPost">
    <div class="infos-user">
      <time class="date-hour">${postData.date.toDate().toLocaleString('pt-br')}</time>  
      <img class="img-user-log" src=${postData.photoURL} referrerpolicy="no-referrer">
      <h3 class="name-user-log">${postData.displayName}</h3>

      `;
  const secondTemplatePosts = `
      <img src='img\\edit.svg' class="editsvg updl" id="buttonEdit">
      <img src='img\\trash.svg' class="deletesvg updl" id="buttonDel"> `;

  const thirdTemplatePosts = `
      </div>
    <div class="post-infos">
      <p class="quote-posted">${postData.post}</p>
      <p class="author-name-log">${postData.author}, ${postData.book}</p>  
    </div>  
  </div>
  <div class="user-reactions">
      <img src= ${postData.likes.length > 0 ? 'img//heart-fill.svg' : 'img\\heart.svg'} class='reactions liked'>
      <p>${postData.likes.length}</p>
      <img src='img\\book-open.svg' class='reactions read'>
      <img src='img\\bookmark.svg' class='reactions toread want-read'>
  </div>
  
`;

  if (postData.userId == auth.currentUser.uid) templatePosts = templatePosts.concat('', secondTemplatePosts);

  templatePosts = templatePosts.concat('', thirdTemplatePosts);

  return templatePosts;
}
