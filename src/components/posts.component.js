import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { transform } from "../services/transform";
import { LoaderComponent } from "./loader.component";


export class PostsComponent extends Component{
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }
  async onShow() {

    this.loader.show();
    const fbData = await apiService.fetchPosts();     //получаем объект постов с бд
    const fbDataArr = transform.fbDbToArray(fbData);  //кидаем айди в объекты, а объекты в массив
    const html = renderPosts(fbDataArr).join('');     //объединяем элементы массива в одну html строку
    document.getElementById('postslist').insertAdjacentHTML("beforeend", html);  //и выводим на страницу
    this.loader.hide();

    this.$el.addEventListener('click', buttonHandler);
  }
  onHide() {
    this.$el.innerHTML = ''; //чистим при выходе, чтобы мультипликативно не выводились
  }
}

//возвращает новый массив из html строк для каждого поста
function renderPosts(fbData) {
  return fbData.map(el=>{
    const tag = el.type === 'news' ? `<div class="tag tag-news">Новость</div>`
                                   : `<div class="tag tag-note">Заметка</div>`;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find(f => f.id === el.id);
    const button = candidate ?
                    `<button data-id="${el.id}" data-title="${el.title}" class="btn btn-warning">Удалить из избранного</button>` :
                    `<button data-id="${el.id}" data-title="${el.title}" class="btn">Добавить в избранное</button>`
    return `
        <div class="panel">
          <div class="panel-head">
            <p class="panel-title bold">${el.title}</p>
            ${tag}
          </div>
          <div class="panel-body">
            <p class="multi-line">${el.fulltext}</p>
          </div>
          <div class="panel-footer w-panel-footer">
            <small>${el.date}</small>
            ${button}
          </div>
        </div>
   `;
  });
}

function buttonHandler(event) {
  const $el = event.target;
  const id = $el.dataset.id;
  const name = $el.dataset.title;
  
  if(id){
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let candidate = favorites.find(el=> el.id === id);

    if(candidate){
      favorites = favorites.filter(el => el.id !== id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      $el.classList.remove('btn-warning');
      $el.textContent = 'Добавить в избранное';
    } else {
      favorites.push({id, name});
      localStorage.setItem('favorites', JSON.stringify(favorites));
      $el.classList.add('btn-warning');
      $el.textContent = 'Удалить из избранного';
    }
  }
}