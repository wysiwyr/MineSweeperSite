import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from '@hapi/joi';

const {ObjectId} = mongoose.Types;

/*
파라미터로 입력받은 id가 올바른 ObjectId이면 post를 ctx.state에 저장
 */
export const getPostById = async (ctx, next) => {
    const {id} = ctx.params;
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad request
        return;
    }

    try {
        const post = await Post.findById(id);
        // 포스트가 없으면 오류를 반환합니다.
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403; // Forbidden
        return;
    }
    return next();
};

/*
포스트 작성
Post /api/posts
{
 "title": "제목",
 "body": "내용",
 "tags": ["태그1", "태그2"]
}
 */
export const write = async ctx => {
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있고 문자열임을 검증
        title: Joi.string().required(), // required()가 있으면 필수 항목
        body: Joi.string().required(),
        tags: Joi.array()
            .items(Joi.string())
            .required(), // 문자열로 이루어진 배열
        user: ctx.state.user,
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.status = 400; // Bad request
        ctx.body = result.error;
        return ;
    }
    
    // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
    const {title, body, tags} = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
포스트 목록 조회
GET /api/posts
 */
export const list = async ctx => {
    // query는 문자열이기 때문에 숫자로 변환해 주어야 합니다.
    // 값이 주어지지 않았다면 1을 기본으로 사용합니다.
    const page = parseInt(ctx.query.page || '1', 10);
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const {tag, username} = ctx.query;
    // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? {'user.username': username} : ''),
        ...(tag ? {tags: tag} : {}),
    };

    try {
        const posts = await Post.find(query)
            .sort({_id: -1})
            .limit(10)
            .skip((page - 1) * 10)
            .lean()
            .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts
            .map(post => ({
                ...post,
                body:
                post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
            }));
    } catch (e) {
        ctx.throw(500, e)
    }
};

/*
특정 포스트 조회
GET /api/posts/:id
 */
export const read = async ctx => {
    ctx.body = ctx.state.post;
};

/*
특정 포스트 제거
DELETE /api/posts/:id
 */
export const remove = async ctx => {
    const {id} = ctx.params;
    // 해당 id를 가진 post가 몇 번째인지 확인합니다.
    try {
        const post = await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
포스트 수정
PATCH /api/posts/:id
{
 "title": "수정한 제목",
 "body": "수정한 내용",
 "tags": ["수정한 태그1", "수정한 태그2"]
}
 PATCH 메서드는 주어진 필드만 교체합니다.
 */
export const update = async ctx => {
    const {id} = ctx.params;
    const schema = Joi.object.keys({
        // 객체가 문자열임을 검증
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array()
            .items(Joi.string()), // 문자열로 이루어진 배열
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.status = 400; // Bad request
        ctx.body = result.error;
        return ;
    }

    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
            // false일 때는 업데이트되기 전의 데이터를 반환합니다.
        }).exec();
        // 포스트가 없으면 오류를 반환합니다.
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};
