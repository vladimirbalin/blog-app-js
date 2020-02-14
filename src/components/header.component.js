import { Component } from "../core/component";

export class HeaderComponent extends Component{
  constructor(id) {
    super(id);
  }
  init(){
    if (localStorage.getItem('started')) {
      this.hide();
    }

    let btnStart = this.$el.querySelector('.btn-start-js');
    btnStart.addEventListener('click', clickHandler.bind(this));
  }
}

function clickHandler() {
  localStorage.setItem('started', JSON.stringify(true));
  this.hide();
}