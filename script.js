let localImages = [
  `img1.jpg`,
  `img2.jpg`,
  `img3.jpg`,
  `img4.jpg`,
  `img5.jpg`,
  `img6.jpg`,
  `img7.jpg`,
  `img8.jpg`,
  `img9.jpg`,
  `img12.jpg`,
  `img13.jpg`,
  `img14.jpg`,
  `img15.jpg`,
  `img16.jpg`,
  `img17.jpg`,
  `img18.jpg`,
  `img19.jpg`,
  `img21.jpg`,
  `img22.jpg`,
  `img23.jpg`,
  `img24.jpg`,
  `img25.jpg`,
  `img26.jpg`,
  `img27.jpg`,
];

let apiImages = [];
let currentPage = 1;
const imagesPerPage = 10;
let loadedApiImages = 0;

function fktload() {
  let allImages = [...localImages, ...apiImages];

  // Nur die neu geladenen API-Bilder anzeigen
  for (let index = loadedApiImages; index < allImages.length; index++) {
    let fotos = allImages[index];

    if (fotos.includes('http')) {
      document.getElementById(`imgcontainer`).innerHTML += `
        <div id="img" class="imgbox"><img src="${fotos}" onclick="openDialog(${index})"></div>
      `;
    } else {
      document.getElementById(`imgcontainer`).innerHTML += `
        <div id="img" class="imgbox"><img src="./img/${fotos}" onclick="openDialog(${index})"></div>
      `;
    }
  }
}

function openDialog(index) {
  document.getElementById(`idFocus`).classList.add(`dialogBg`);
  document.getElementById(`idFocus`).classList.remove(`ausblenden`);

  let allImages = [...localImages, ...apiImages];
  let imgUrl = allImages[index];

  if (!imgUrl.includes('http')) {
    imgUrl = `./img/${imgUrl}`;
  }

  document.getElementById(`idFocus`).innerHTML = `
    <div class="Focus">
      <img class="classImg" src="${imgUrl}">
      <img class="delete" src="./img/delete.png" onclick="closen()">
      <img class="ARight" src="./img/arrow.png" onclick="swipen(${index - 1})">
      <img class="ALeft" src="./img/arrow.png" onclick="swipen(${index + 1})">
    </div>
  `;
}

function closen() {
  document.getElementById(`idFocus`).classList.add(`ausblenden`);
}

function swipen(i) {
  let allImages = [...localImages, ...apiImages];

  if (i < 0) {
    i = allImages.length - 1;
  }
  if (i > allImages.length - 1) {
    i = 0;
  }
  
  openDialog(i);
}


function loadPexelsImages(page) {
  const apiKey = 'a57Bee7QHclHAK3FKo6NAKUDfqYuyfCDmO9pfpv5prItTl8JKYKfjQDt';
  const apiUrl = `https://api.pexels.com/v1/search?query=animals&page=${page}&per_page=${imagesPerPage}`;

  fetch(apiUrl, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const animalImages = data.photos;
      apiImages = [...apiImages, ...animalImages.map(image => image.src.medium)];
      loadedApiImages = apiImages.length - animalImages.length; // Anzahl der bereits geladenen API-Bilder aktualisieren
      fktload();
    })
    .catch(error => {
      console.error(error);
    });
}

function loadMore() {
  currentPage++;
  loadPexelsImages(currentPage);
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMore();
  }
});

loadPexelsImages(currentPage);
