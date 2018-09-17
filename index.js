const API_KEY = "743ce3f0-b77e-11e8-bf0e-e9322ccde4db";

const showGalleries = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // hide irrelevant and show relevants parts of page
      document.querySelector("#all-galleries").style.display = "block";
      document.querySelector("#all-objects").style.display = "none";
      document.querySelector("#button1").style.display = "none";
      document.querySelector("#button2").style.display = "none";
      data.records.forEach(gallery => {
        const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${gallery.id}`
        document.querySelector("#galleries").innerHTML += `
          <li>
            <a href="#${gallery.id}" onclick="showObjectsTable('${url}')">
              Gallery #${gallery.id}: ${gallery.name} (Floor ${gallery.floor})
          </a>
          </li>
          `;
      });
      if (data.info.next) {
        showGalleries(data.info.next);
      }
    });
};

const showObjectsTable = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // hide and show only relevant parts of the page
      document.querySelector("#all-galleries").style.display = "none";
      document.querySelector("#button1").style.display = "block";
      document.querySelector("#button2").style.display = "none";
      document.querySelector("#object").style.display = "none";
      document.querySelector("#all-objects").style.display = "block";

      // get galleryId to pass to show object for url hashs
      const galleryId = document.location.hash.split('#')[1];
      console.log('showTable', galleryId)

      // create table
      var table = document.getElementById("myTable");
        data.records.forEach(object => {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = 
            `<a href="#${galleryId}&${object.objectnumber}" 
              onclick="showObject('${object.objectnumber}')">${object.title}
          </a>`
          if(object.people) {
            object.people.forEach(people => {
              cell2.innerHTML += people.name
            })}
          cell3.innerHTML = 
            `<img src=${object.primaryimageurl} class="gallery-image">`;
          cell4.innerHTML = `<a href="${object.url}">See More</a>`;
        });

      // if more results call function on next page
      if (data.info.next) {
        showObjectsTable(data.info.next);
      }
  })   
};

const showObject = (number) => {
  const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${number}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
  // hide and show only relevant parts of the page
  document.querySelector("#object").style.display = "block";
  document.querySelector("#button2").style.display = "block";
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "none";
  document.querySelector("#button1").style.display = "none";
  document.querySelector("#object").innerHTML = `
    <li> Title: ${data.records[0].title} </li>
    <li> Description: ${data.records[0].description} </li>
    <li> Provenance: ${data.records[0].provenance} </li>
    <li> Accession Year: ${data.records[0].accessionyear} </li>
    <img src = ${data.records[0].primaryimageurl} class="gallery-image"> 
  `;
})};

// function for button to show all objects in a gallery
// changes hash and reloads page so it goes to right part
const toGallery = () => {
  document.location.hash = "";
  document.location.hash = `galleries?`;
  document.location.reload();
};

// function for button to show all objects in a gallery
// changes hash and reloads page so it goes to right part
const toObjects = () => {
  const oldHash = document.location.hash.split('#')[1];
  const galleryId = oldHash.split('&');
  document.location.hash = "";
  document.location.hash = `${galleryId[0]}`;
  document.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  const hash = document.location.hash.split('#')[1];
  console.log('hash', hash)
  if (hash == '' || hash == 'galleries?') {
    const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
    showGalleries(url);
  }
  // if has & then gallery is before & and object id is after 
  if (hash.includes('&')) {
    const [galleryId, objectId]  = hash.split('&');
    showObject(objectId);
  }
  // when there is no &, and there is a numeber, there is just a gallery
  else {
    const galleryId = hash;
    const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${galleryId}`
    showObjectsTable(url);
  }
});
