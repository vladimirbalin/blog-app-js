import { Component } from "../core/component";

export class NavigationComponent extends Component{
  constructor(id) {
    super(id);
    this.tabs = [];
  }
  init(){
    this.$el.addEventListener('click', clickHandler.bind(this));
  }

  registerTabs(tabs){
    this.tabs = tabs;
  }
}

function clickHandler(event) {
  event.preventDefault();
  if(event.target && event.target.classList.contains('tab')){
    Array.from(this.$el.querySelectorAll('.tab')).forEach((element)=>{
      element.classList.remove('active');
    });

    event.target.classList.add('active');

    const activeTab = this.tabs.find(t => t.component.$el.id === event.target.dataset.name);
    this.tabs.forEach(t => t.component.hide());
    activeTab.component.show();
  }


}
