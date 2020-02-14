import { Component } from "../core/component";

export class FavoritesComponent extends Component{
  constructor(id) {
    super(id);
  }
  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    this.$el.insertAdjacentHTML("afterbegin", renderList(favorites));
    console.log(favorites);
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}

function renderList(list= []) {
  if (list && list.length){
    return `
      <ul>
        ${list.map(el=>`<li><a href="#">${el.id}</a></li>`).join('')}
      </ul>
    `;
  }
    return `<p>Пока в избранном ничего нет...</p>`;
}
