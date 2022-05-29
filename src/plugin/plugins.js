const myPlugin = {}


myPlugin.install = function (a) {   //注入一个Vue构造函数的参数，就可以使用Vue.prototype
  console.log('调用了自定义插件,我的参数为', a);

}


export default myPlugin;