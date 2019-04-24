import { Component } from "../core/component"
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    onShow() {
        this.loader.show();
        apiService.getPosts().then(fbData => {
            const posts = TransformService.fbOdbjectToArray(fbData);
            const html = posts.map(post => {
                return renderPost(post, { withButton: true });
            })
            this.loader.hide();
            this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
        })
     }

     onHide() {
         this.$el.innerHTML = '';
     }
}

function buttonHandler(event) {
    const $el = event.target;
    const id = $el.dataset.id;

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(id)) {
            favorites = favorites.filter(fId => fId !== id);
            $el.textContent = 'В Избранное';
            $el.classList.add('button-primary');
            $el.classList.remove('button-danger');
        } else {
            favorites.push(id);
            $el.textContent = 'Удалить из Избранного';
            $el.classList.remove('button-primary');
            $el.classList.add('button-danger');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}