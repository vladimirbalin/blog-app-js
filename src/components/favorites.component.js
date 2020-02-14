import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import {transform} from "../services/transform";

export class FavoritesComponent extends Component{
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }
  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    this.$el.insertAdjacentHTML('afterbegin', renderList(favorites));
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}

function renderList(list= []) {
  if (list && list.length){
    return `
      <ul>
        ${list.map(el=>`<li><a href="#" data-id="${el.id}">${el.name}</a></li>`).join('')}
      </ul>
    `;
  }
    return `<p>Пока в избранном ничего нет...</p>`;
}

async function linkClickHandler(event){
  if(event.target && event.target.tagName === 'A'){
    event.preventDefault();
    this.loader.show();

    const fbData = await apiService.fetchPosts();     //получаем объект постов с бд
    const fbDataArr = transform.fbDbToArray(fbData);
    const html = fbDataArr.map(el => {
      if(event.target.dataset.id === el.id){

          const tag = el.type === 'news' ? `<div class="tag tag-news">Новость</div>`
            : `<div class="tag tag-note">Заметка</div>`;

          return `
            <div class="panel">
              <div class="panel-head">
                <p class="panel-title">${el.title}</p>
                ${tag}
              </div>
              <div class="panel-body">
                <p class="multi-line">${el.fulltext}</p>
              </div>
              <div class="panel-footer w-panel-footer">
                <small>${el.date}</small>
               
              </div>
            </div>
           `;

      }
    }).join('');
    this.$el.insertAdjacentHTML('beforeend', html);
    this.loader.hide();
    event.target.classList.add('hide');
  }
}
