import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import {transform} from "../services/transform";
import { renderPosts } from "../templates/post.template";

export class FavoritesComponent extends Component{
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    this.$el.insertAdjacentHTML('afterbegin', renderList(favorites));

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

    const favoritePostObj = await apiService.fetchPostById(event.target.dataset.id);
    favoritePostObj.id = event.target.dataset.id;
    const html = renderPosts(favoritePostObj, false);
    this.$el.insertAdjacentHTML('beforeend', html);
    this.loader.hide();
    event.target.innerHTML = '';
  }
}


