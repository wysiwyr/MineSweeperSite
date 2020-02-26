import qs from 'qs';
import client from './client';

export const listPosts = ({page, username, tag}) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });

    return client.get(`/api/posts${queryString}`);
};

export const readPost = id => client.get(`/api/posts/${id}`);

export const writePost = ({title, level, time, body, tags}) =>
    client.post('/api/posts', {title, level, time, body, tags});


export const updatePost = ({id, title, body, tags}) =>
    client.patch(`/api/posts/${id}`, {
        title,
        body,
        tags,
    });

export const removePost = id => client.delete(`/api/posts/${id}`);
