import { userLogOut } from '../firebase-services/auth.js';
import { creatingPost, gettingPost, deletingPost } from '../firebase-services/firestore.js';
import { postFunction, creatingPostTemplate } from './posts.js';
import { getDoc } from '../firebase-services/exports.js';


export const feedFunction = () => {
  const containerFeed = document.createElement("section");
  const posts = document.createElement("div");
  posts.classList.add("post-style");
  

  const templateFeed = `
  
  <section class='feed-page'>
    <div class='form-feed'>
      <div class='inputs-feed'>
      <textarea class='question-feed ipt-general' type='text' id="inputQuote" wrap="harder" placeholder='Qual trecho você gostaria de compartilhar hoje?' /></textarea>
    <div class='inputs-source'>
      <input type='text' class='author input-space ipt-general' id="inputAuthor" placeholder='Autora' />
      <input type='text' class='book input-space ipt-general' id="inputBook" placeholder='Livro'/>
      <button type='submit' class='button-publish btnFeed'>Publicar 
      </button>
    </div>
    
  </div>
  <div class='logout'>
    <button type='submit' class='button-logout btnFeed'>Sair
    </button>
    </div>
  </section>
  
    <section class="container-post" id="containerPost">
    </section>
  `;

  containerFeed.innerHTML = templateFeed;

  const btnLogOut = containerFeed.querySelector('.button-logout');
  btnLogOut.addEventListener('click', () => {
    userLogOut().then(() => {
      window.location.hash = '#home';
    })
    
  });

  const containerPost = containerFeed.querySelector('#containerPost');
  containerPost.appendChild(posts);

  const btnPublish = containerFeed.querySelector('.button-publish');
  btnPublish.addEventListener('click', (e) => {
    const iptAuthor = containerFeed.querySelector('#inputAuthor').value;
    const iptBook = containerFeed.querySelector('#inputBook').value;
    const iptQuote = containerFeed.querySelector('#inputQuote').value;
    e.preventDefault;
    creatingPost(iptQuote, iptAuthor, iptBook).then((post) => {
      getDoc(post).then((postSnap) => {
      const newPost = document.createElement('div');
      newPost.innerHTML = creatingPostTemplate(postSnap)
      posts.insertBefore(newPost, posts.firstChild)
      })
      
    })
  });

  console.log(posts)
  postFunction(posts);

  

  return containerFeed;
};


