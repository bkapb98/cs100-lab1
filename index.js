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
  document.querySelector("#all-objects").style.display = "block";
  document.querySelector("#all-galleries").style.display = "none";
}