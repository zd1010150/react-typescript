
// const addCar =(options: any) => {
//     return (() => {
//         const parabola = (config :any) => {
//             this.init(config);
//         };
//         parabola.prototype = {
//             init: (opt: any) => {
//                 const flyO = this.calculatedValue(opt);
//                 const flyDom = this.creatHtml(flyO.site, flyO.img ,flyO.callback);
//                 const flyRule = this.creatRule(flyO.coord);

//                 document.getElementsByTagName('head')[0].appendChild(flyRule);
//                 document.body.appendChild(flyDom);
//                 // $('.parabola-animation').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.parabola-box-ver', function() {
//                 //     const _pfly = $('.parabola-animation');
//                 //     if (_pfly.length) _pfly.remove();
//                 //     flyO.callback();
//                 // });
//             },
//             // tslint:disable-next-line:object-literal-sort-keys
//             creatRule: (coord) => {
//                 const cssAnimation = document.createElement('style');
//                 cssAnimation.type = "text/css";
//                 const rules = "\
//                         @-webkit-keyframes parabola-hor-animation{\
//                             0%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             10%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             100%{\
//                                 -webkit-transform: translate(" + coord.x + "px, 0px);\
//                                         transform: translate(" + coord.x + "px, 0px);\
//                             }\
//                         }\
//                         @keyframes parabola-hor-animation{\
//                             0%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             10%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             100%{\
//                                 -webkit-transform: translate(" + coord.x + "px, 0px);\
//                                         transform: translate(" + coord.x + "px, 0px);\
//                             }\
//                         }\
//                         @-webkit-keyframes parabola-ver-animation{\
//                             0%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             10%{\
//                                 -webkit-transform: translate(0px, " + coord.os + "px);\
//                                         transform: translate(0px, " + coord.os + "px);\
//                             }\
//                             100%{\
//                                 -webkit-transform: translate(0px," + coord.y + "px);\
//                                         transform: translate(0px," + coord.y + "px);\
//                             }\
//                         }\
//                         @keyframes parabola-ver-animation{\
//                             0%{\
//                                 -webkit-transform: translate(0px, 0px);\
//                                         transform: translate(0px, 0px);\
//                             }\
//                             10%{\
//                                 -webkit-transform: translate(0px, " + coord.os + "px);\
//                                         transform: translate(0px, " + coord.os + "px);\
//                             }\
//                             100%{\
//                                 -webkit-transform: translate(0px," + coord.y + "px);\
//                                         transform: translate(0px," + coord.y + "px);\
//                             }\
//                         }\
//                     ";
//                 cssAnimation.innerHTML = rules;
//                 return cssAnimation;
//             },
//             creatHtml: (site, img ,callback) => {
//                 const imgHtml = img === '' ? '' : '<img src="' + img + '">';

//                 const html = '<div class="parabola-box-hor">\
//                                 <div class="parabola-box-ver">\
//                                     ' + imgHtml + '\
//                                 </div>\
//                             </div>';

//                 const parentBox = document.createElement('div');
//                 parentBox.innerHTML = html;
//                 parentBox.setAttribute('class', 'parabola-animation');

//                 $(parentBox).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.parabola-box-ver', () => {
//                     // tslint:disable-next-line:variable-name
//                     const _pfly = $(parentBox);
//                     if (_pfly.length) {
//                         _pfly.remove();
//                     }
//                     callback();
//                 });
//                 const frag = document.createDocumentFragment();
//                 frag.appendChild(parentBox);

//                 const verBox = frag.querySelector('.parabola-box-ver'),
//                     horBpx = frag.querySelector('.parabola-box-hor');
//                 verBox.style.left = site.left + 'px';
//                 verBox.style.top = site.top + 'px';

//                 if (site.cubic) {
//                     verBox.setAttribute("class", 'parabola-box-ver top');
//                     horBpx.setAttribute("class", 'parabola-box-hor top');
//                 }
//                 return frag;
//             },
//             calculatedValue:(opt) => {
//                 const fly = {
//                         begin: '',
//                         end: '',
//                         img: '',
//                         callback: () => {
//                             console.log('动画完成');
//                         }
//                     };
//                     const vData = {
//                         site: {

//                             cubic: false,
//                             left: 0,
//                             top: 0,
//                         },
//                         // tslint:disable-next-line:object-literal-sort-keys
//                         img: '',
//                         coord: {

//                             os: 0,
//                             x: 0,
//                             y: 0,
//                         },
//                         // tslint:disable-next-line:no-empty
//                         callback: () => {}
//                     };
//                     _this = this;

//                 if (typeof opt === 'object') {
//                     fly = Object.assign( fly, opt);
//                 }

//                 // 如果没有这两个元素中的其中一个则终止
//                 if (!fly.begin.length || !fly.end.length) { return vData; }
//                 /**
//                  * beginCrood 获取开始元素的位置
//                  * endCrood   获取结束元素的位置
//                  */
//                 const beginCrood = fly.begin[0].getBoundingClientRect();
//                   const  endCrood = fly.end[0].getBoundingClientRect();

//                 /*!
//                  *  购物车动画出现的位置
//                  *  left: 开始元素的left+width/2
//                  *  top: 开始元素的top
//                  *  购物车动画结束的位置
//                  *  x: 结束元素的left+width/2 再减去购物车动画出现的位置的left
//                  *  y: 结束元素的top+height/2 再减去购物车动画出现的位置的top
//                  */
//                 /**
//                  * 全部减去 18是因为购物车宽度和高度都是35px;一半难得算(-_-),就填18
//                  */
//                 vData.site.left = beginCrood.left + parseInt(Number(beginCrood.width) / 2, 10) - 18;
//                 vData.site.top = beginCrood.top - 18;
//                 vData.coord.x = endCrood.left + parseInt(endCrood.width / 2, 10) - vData.site.left - 18;
//                 vData.coord.y = endCrood.top + parseInt(endCrood.height / 2, 10) - vData.site.top - 18;
//                 vData.coord.os = -50;
//                 vData.img = fly.img;
//                 vData.callback = fly.callback;
//                 if (beginCrood.top > endCrood.top) vData.site.cubic = true;

//                 return vData;
//             }
//         }
//         return new parabola(options);
//     })();
// }