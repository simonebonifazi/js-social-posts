/*
# Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
# Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali, inventatele*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=3)*
#Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
#Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
# ****BONUS**
 1. Formattare le date in formato italiano (gg/mm/aaaa)
 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola  => LF).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
# Consigli del giorno:
 Ragioniamo tanto sulla definizione dell'oggetto, se sbagliamo quello tutto diventa più difficile!

*/
/*
steps__
0. dichiaro variabili globali
1. costruisco il mio array di oggetti con tutte le sue caratteristiche
2. stampo i post nel DOM 
3. con un event-listener aggiungo al click funzione che fa diventare verde la scritta del testo e aggiunge 1 al numero dei like
*/
//funzione per creare le card
const createCard = (card) => {
    //semplifico  e destrutturizzo
    const { photo, name, date, text, id, content, likes } = postContent[i];
    card = `
    <div class="post">
      <div class="post__header">
          <div class="post-meta">
          <div class="post-meta__icon">
            <img class="profile-pic" src="${photo}" alt="${name}" />
          </div>
          <div class="post-meta__data">
            <div class="post-meta__author">${name}</div>
            <div class="post-meta__time">${date}</div>
          </div>
        </div>
      </div>
      <div class="post__text">
      ${text}
    </div>
    <div class="post__image">
      <img src="${content}" alt="${id}" />
    </div>
    <div class="post__footer">
      <div class="likes js-likes">
        <div class="likes__cta">
          <a class="like-button js-like-button" href="#" data-postid="${id}">
            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
            <span class="like-button__label">Mi Piace</span>
          </a>
        </div>
        <div class="likes__counter">Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone</div>
      </div>
      </div>`;
    return card
}

//variabili globali
const post = document.getElementById('container');

//array
const postContent = [
    {
        id: '1',
        name: 'Giulius Sandrinus',
        photo: 'https://unsplash.it/300/300?image=2',
        date: '07/24/2022',
        text: 'this is my best post ever',
        content: 'https://unsplash.it/300/300?image=5',
        likes: 50
    },
    {
        id: '2',
        name: 'Giannis Postis',
        photo: 'https://unsplash.it/300/300?image=21',
        date: '07/17/2022',
        text: 'this is my best post this week',
        content: 'https://unsplash.it/300/300?image=56',
        likes: 24
    },
    {
        id: '3',
        name: 'Manuel Eccommiamm',
        photo: 'https://unsplash.it/300/300?image=11',
        date: '07/01/2022',
        text: 'this is my best picture of manue',
        content: 'https://unsplash.it/300/300?image=335',
        likes: 1024
    },
    {
        id: '4',
        name: 'Rezza Capa',
        photo: 'https://unsplash.it/300/300?image=15',
        date: '07/11/2022',
        text: 'this is my viral post ',
        content: 'https://unsplash.it/300/300?image=28',
        likes: 26
    },

]

//costruisco i post
//flag
let cards = '';
//ciclo
for (i = 0; i < postContent.length; i++) {
    //sfrutto la funzione che ho ideato poc'anzi
    post.innerHTML += createCard(cards);
}

//aumento i like e diventa verde lo sfondo al click
//aggancio ai bottoni QUI, dopo aver "ciclato" i post
const likeButtons = document.querySelectorAll(".like-button");

for (let i = 0; i < likeButtons.length; i++) {
    const button = likeButtons[i]
    button.addEventListener('click', (event) => {
        event.preventDefault();
        //aggiungo classe
        button.classList.toggle('like-button--liked');

        //recupero id post
        const postId = button.dataset.postid;

        //sfrutto id del post per recuperare contatore di like
        const likeCounter = document.getElementById(`like-counter-${postId}`);
        //recupero contatore di likes
        let likes = parseInt(likeCounter.innerText);
        //controllo se è già cliccato il tasto
        const isLiked = button.classList.contains('like-button--liked');
        //per incrementarlo
        likeCounter.innerText = isLiked ? ++likes : --likes;

    })
}

// document.querySelector('.like-button').addEventListener('click', function () {
//     this.classList.add('green');
//     (document.querySelector('.js-likes-counter').innerText)++
//     if (document.querySelector('.like-button').classList.contains('green')) return

// })