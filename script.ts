// @ts-ignore
import './style.css';

const uma = "https://raw.githubusercontent.com/n-ce/Uma/main/dynamic_instances.json";
const instances: string[] = [];
const controller = document.forms[0] as HTMLFormElement;
const [prefixInput, linkInput] = document.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
const submitBtn = controller.lastElementChild as HTMLButtonElement;
const renderRoot = document.getElementsByTagName('section')[0] as HTMLDivElement;
const idExtractor = (id: string) => id.split('?list=')[1].slice(0, 34);


async function fetchPlaylist(url: string, idx = 0) {
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



function renderData(data: Record<'title' | 'url', string>[]) {
  renderRoot.innerHTML = data.reduce((_, v) => _ + `
      <article>
        <figure>
          <img src="https://i.ytimg.com/vi_webp/${v.url.slice(-11)}/mqdefault.webp" />
          <figcaption>${v.title}</figcaption>
        </figure>
        <samp>${prefixInput.value} https://youtu.be/${v.url.slice(-11)}</samp>
      </article>
      `, '');
}

fetch(uma)
  .then(res => res.json())
  .then((data: {
    piped: string[]
  }) => data.piped.forEach((instance) => instances.push(instance)))
  .catch(e => alert(e.message || 'Instances Down'))
  .finally(() => console.log(instances));


controller.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchPlaylist(linkInput.value);
});

renderRoot.addEventListener('click', (e) => {
  const btn = e.target as HTMLInputElement;
  if (!btn.matches('samp')) return;
  if (navigator.clipboard?.writeText)
    navigator.clipboard.writeText(btn.textContent || '');
  else alert('clipboard not supported');
});
