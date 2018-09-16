const API_KEY = "743ce3f0-b77e-11e8-bf0e-e9322ccde4db";

document.addEventListener("DOMContentLoaded", () => {
  const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
  showGalleries(url);
});

// global variable for gallery holder so can go back webpages
var globalGalleryHolder = null;

const showGalleries = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector("#all-galleries").style.display = "block";
      document.querySelector("#all-objects").style.display = "none";
      document.querySelector("#button1").style.display = "none";
      document.querySelector("#button2").style.display = "none";
      data.records.forEach(gallery => {
        document.querySelector("#galleries").innerHTML += `
          <li>
            <a href="#${gallery.id}" onclick="showObjectsTable(${gallery.id})">
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

const showObjectsTable = (id) => {
  globalGalleryHolder = id;
  const url = 
    `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector("#all-galleries").style.display = "none";
      document.querySelector("#button1").style.display = "block";
      var button = document.getElementById("button1");
      button.addEventListener("click", () =>{
        showGalleries()});
      document.querySelector("#all-objects").style.display = "block";
      var table = document.getElementById("myTable");
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = 'Name',
      cell2.innerHTML = 'People',
      cell3.innerHTML = 'Image';
      cell4.innerHTML = 'URL';

        data.records.forEach(object => {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          cell1.innerHTML = 
          `<a href="#${object.objectnumber}" 
              onclick="showObject(${object.objectnumber})"'>${object.title}
          </a>`
          cell2.innerHTML = object.people[0].name,
          cell3.innerHTML = `<img src=${object.images[0]}>`;
          cell4.innerHTML = `<a href="${object.url}">See More</a>`;
          document.querySelector("#button2").style.display = "none";
        });
  })
};

const showObject = (number) => {
  const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${number}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
  document.querySelector("#button2").style.display = "block";
  document.querySelector("#object").innerHTML += `
    <li> Title: ${data.records[0].title} </li>
    <li> Description: ${data.records[0].description} </li>
    <li> Provenance: ${data.records[0].provenance} </li>
    <li> Accession Year: ${data.records[0].accessionyear} </li>
    <li> <img src = ${data.records[0].images[0]}> </li>
  `;
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "none";
  document.querySelector("#button1").style.display = "none";
})};

const toGallery = () => {
  // const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
  // showGalleries(url);
  location.reload()
};

const toObjects = () => {
  showObjectsTable(globalGalleryHolder);
}