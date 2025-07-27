const uma = "https://raw.githubusercontent.com/n-ce/Uma/main/dynamic_instances.json";
const instances = [];
const controller = document.getElementById('controller');
const prefixInput = document.getElementById('prefix');
const linkInput = document.getElementById('link');
const submitBtn = document.getElementById('submit');
const renderRoot = document.getElementById('container');
const idExtractor = (id) => id.split('?list=')[1].slice(0, 34);


function fetchPlaylist(url, idx = 0) {
  submitBtn.classList.toggle('is-loading');

  fetch(instances[idx] + '/playlists/' + idExtractor(url))
    .then(res => res.json())
    .then(data => data.relatedStreams)
    .then(renderData)
    .catch(async e => {
      if (instances.length - idx === 1)
        alert(e.message);
      else
        await fetchPlaylist(url, idx + 1);
    })
    .finally(() => {
      submitBtn.classList.toggle('is-loading');
    });
}

function renderData(data) {
  renderRoot.innerHTML = data.reduce((_, v) => _ + `
      <div class="cell box is-clipped">
        <figure>
          <img class="is-rounded" src="https://i.ytimg.com/vi_webp/${v.url.slice(-11)}/hqdefault.webp" />
          <figcaption>${v.title}</figcaption>
        </figure>
        <button class="button is-pulled-right">${prefixInput.value} https://youtu.be/${v.url.slice(-11)}</button>
      </div>     
      `, '');
}

fetch(uma)
  .then(res => res.json())
  .then(data => data.piped.forEach(instance => instances.push(instance)))
  .catch(e => alert(e.message || 'Instances Down'))
  .finally(() => console.log(instances));


controller.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchPlaylist(linkInput.value);
});

renderRoot.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.matches('button')) return;
  if (navigator.clipboard?.writeText)
    navigator.clipboard.writeText(btn.textContent);
  else alert('clipboard not supported');
});
