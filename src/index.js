import './style.css';
import { HeaderComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component";
import { PostsComponent } from "./components/posts.component";
import { CreateComponent } from "./components/create.component";
import { FavoritesComponent } from "./components/favorites.component";
import { LoaderComponent } from "./components/loader.component";

const header = new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');
const posts = new PostsComponent('postslist', {loader});
const create = new CreateComponent('create');
const favorites = new FavoritesComponent('favorites');


navigation.registerTabs([
    {name: 'postslist', component: posts},
    {name: 'create', component: create},
    {name: 'favorites', component: favorites}
  ]
);
