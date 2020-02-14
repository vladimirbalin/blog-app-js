export function renderPosts(fbData, buttonOpt = true) {

    const tag = fbData.type === 'news' ? `<div class="tag tag-news">Новость</div>`
      : `<div class="tag tag-note">Заметка</div>`;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find(f => f.id === fbData.id) && buttonOpt;
    const button = candidate ?
      `<button data-id="${fbData.id}" data-title="${fbData.title}" class="btn btn-warning">Удалить из избранного</button>` :
      `<button data-id="${fbData.id}" data-title="${fbData.title}" class="btn">Добавить в избранное</button>`
    return `
        <div class="panel">
          <div class="panel-head">
            <p class="panel-title bold">${fbData.title}</p>
            ${tag}
          </div>
          <div class="panel-body">
            <p class="multi-line">${fbData.fulltext}</p>
          </div>
          <div class="panel-footer w-panel-footer">
            <small>${fbData.date}</small>
            ${buttonOpt ? button : ''}
          </div>
        </div>
   `;

}