export function fetchHttpData(url, options) {
    return fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
        return res;
    })
        .catch((error) => {
        console.log(error);
    });
}
//# sourceMappingURL=httpHelper.js.map