'use strict';

const postsData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    console.log('ok');
    return await res.json();
};

export {postsData};
