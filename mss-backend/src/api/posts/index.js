import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkedLoggedIn from "../../lib/checkLoggedIn";

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkedLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkedLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkedLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

// 라우터를 내보냅니다.
export default posts;
