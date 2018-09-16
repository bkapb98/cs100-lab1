const API_KEY = "743ce3f0-b77e-11e8-bf0e-e9322ccde4db";

document.addEventListener("DOMContentLoaded", () => {
  const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
  showGalleries(url);
});

const showGalleries = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
  const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&?gallery=${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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

          cell1.innerHTML = object.title,
          cell2.innerHTML = object.people,
          cell3.innerHTML = object.images[0];
          cell4.innerHTML = `<a href="#${object.id}" onclick="showObject(${object.id})"'>See More</a>`;
          document.querySelector("#all-galleries").style.display = "none";
          document.querySelector("#button2").style.display = "none";
        });
  })
};

const showObject = (id) => {
  const url = `https://api.harvardartmuseums.org/?apikey=${API_KEY}&?object=${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
  document.querySelector("#object").innerHTML += `
    <li> title: ${object.title} </li>
    </p> 
  `;
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "none";
  document.querySelector("#button1").style.display = "none";
})};
