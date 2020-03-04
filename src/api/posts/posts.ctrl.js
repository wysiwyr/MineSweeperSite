import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from "@hapi/joi";
import sanitizeHtml from "sanitize-html";

const {ObjectId} = mongoose.Types;

/*
허용할 html 태그와 속성 설정
htt[://www.npmjs.com/package/sanitize-html 참고
 */
const sanitizeOption = {
    allowedTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

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
        // 포스트가 없으면 오류를 반환
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

/*
본인이 작성한 포스트가 맞는지 확인
 */
export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403; // Forbidden
        return;
    }
    return next();
};

/*
html을 없애고 내용이 너무 길면 200자로 제한하는 함수
 */
const removeHtmlAndShorten = body => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`
};

/*
포스트 작성
Post /api/posts
{
 "title": "제목",
 "level": "난이도",
 "time": "걸린 시간",
 "body": "내용",
 "tags": ["태그1", "태그2"]
}
 */
export const write = async ctx => {
    const schema = Joi.object().keys({
        // 객체가 다음 필드를 가지고 있고 문자열임을 검증
        title: Joi.string().required(), // required()가 있으면 필수 항목
        level: Joi.string().required(),
        time: Joi.string().required(),
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
    
    // REST API의 Request Body는 ctx.request.body에서 조회 가능
    const {title, level, time, body, tags} = ctx.request.body;
    const post = new Post({
        title,
        level,
        time,
        body: sanitizeHtml(body, sanitizeOption),
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
    // query는 문자열이기 때문에 숫자로 변환해 줘야함
    // 값이 주어지지 않았다면 1을 기본으로 사용
    const page = parseInt(ctx.query.page || '1', 10);
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const {username, tag, level} = ctx.query;
    // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? {'user.username': username} : ''),
        ...(tag ? {tags: tag} : {}),
        ...(level ? {level: level} : {}),
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
                body: removeHtmlAndShorten(post.body),
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
    // 해당 id를 가진 post가 몇 번째인지 확인
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
 PATCH 메서드는 주어진 필드만 교체
 */
export const update = async ctx => {
    const {id} = ctx.params;
    const schema = Joi.object().keys({
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

    // 객체를 복사하고 body 값이 주어졌으면 html 필터링
    const nextData = {...ctx.request.body};
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }

    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
            // false일 때는 업데이트되기 전의 데이터를 반환
        }).exec();
        // 포스트가 없으면 오류를 반환
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};
