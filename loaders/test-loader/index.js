const loaderUtils = require('loader-utils');

module.exports = function (source, sourceMap, meta) {
    const options = loaderUtils.getOptions(this) || {};
    const callback = this.async();
    // this.callback(null, source);
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('aaa');
        }, 1000);
    }).then((value) => {
        console.log(value);
        callback(null, source);
    });

    // setTimeout(() => {
    //     console.log('test-loader-comming');
    //     callback(null, callback);
    // }, 1000);
};

// document.addEventListener('scroll', () =>{
//     document.querySelector('.gitbook-plugin-modal').style.display = 'none'
// })

// document.addEventListener('mousemove', () =>{
//     document.querySelector('.gitbook-plugin-modal').style.display = 'none'
// })
