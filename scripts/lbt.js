
// 当前轮播图编号
let current_index = -1;
// 自动轮播定时器
let swipe_timer = null;
// 轮播图的图片地址与跳转链接
let links = [
    { 'image': 'images/slideshow/资阳市沱江三桥.jpg', 'targer': 'https://www.baidu.com/' },
    { 'image': 'images/slideshow/绵阳市越王楼.jpg', 'target': '#2' },
    { 'image': 'images/slideshow/成都天府广场.jpg', 'target': '#3' },
    { 'image': 'images/slideshow/泸州市钟鼓楼.jpg', 'target': '#4' },
    { 'image': 'images/slideshow/乐山市乐山大佛.jpg', 'target': '#5' },
    { 'image': 'images/slideshow/内江市圣水寺.jpg', 'target': '#6' },
    { 'image': 'images/slideshow/遂宁市临仙阁.jpg', 'target': '#7' },
    { 'image': 'images/slideshow/自贡市西秦会馆.jpg', 'target': '#8' },
    { 'image': 'images/slideshow/广安市白塔.jpg', 'target': '#9' },
    { 'image': 'images/slideshow/雅安市高颐阙.jpg', 'target': '#10' },
    { 'image': 'images/slideshow/达州红军亭.jpg', 'target': '#11' },
    { 'image': 'images/slideshow/南充市嘉陵江大桥.jpg', 'target': '#12' },
    { 'image': 'images/slideshow/宜宾市广播电视台 广电大楼.jpg', 'target': '#13' },
    { 'image': 'images/slideshow/德阳市彩虹桥.jpg', 'target': '#14' },
    { 'image': 'images/slideshow/眉山市三苏祠.jpg', 'target': '#15' },
    { 'image': 'images/slideshow/巴中市恩阳古镇.jpg', 'target': '#16' },
    { 'image': 'images/slideshow/攀枝花市三线建设博物馆.jpg', 'target': '#17' },
];


// 需要操作到的元素
let swipe = document.getElementById('swipe');
let swipe_bg = document.getElementById('swipe_bg');
let swipe_img_box = document.getElementById('swipe_img_box');
let swipe_link = document.getElementById('swipe_link');
let swipe_img = document.getElementById('swipe_img');
let swipe_select = document.getElementById('swipe_select');
let swipe_btn_left = document.getElementById('swipe_btn_left');
let swipe_btn_right = document.getElementById('swipe_btn_right');

// 事件
// 切换图片
let select = (index) => {
    // 停止播放
    stop();
    // 转数字
    index = Number(index);
    // 越界超过最大数量,直接返回
    if (index >= links.length) {
        return;
    }
    // 选中当前已选中的,直接返回
    if (current_index == index) {
        return;
    }
    // 取消当前指示点的选中状态
    if (current_index > -1) {
        swipe_select.children[current_index].classList.remove('checked');
    }
    // 变更当前轮播图的编号
    current_index = index;
    // 找到当前元素
    let current_link = links[current_index];
    // 背景变化
    swipe_bg.style.backgroundImage = 'url(' + current_link.image + ')';
    // 前景变化
    swipe_img.setAttribute('src', current_link.image);
    // 链接变化
    swipe_link.setAttribute('href', current_link.target);
    // 增加新的指示点的选中状态
    swipe_select.children[current_index].classList.add('checked');
};
// 自动切换图片
let autoSelect = (index) => {
    // 转数字
    index = Number(index);
    // 越界超过最大数量，直接返回
    if (index >= links.length) {
        return;
    }
    // 选中当前已选中的，直接返回
    if (current_index == index) {
        return;
    }
    // 取消当前指示点的选中状态
    swipe_select.children[current_index].classList.remove('checked');
    // 变更当前轮播图的编号
    current_index = index;
    // 找到当前元素
    let current_link = links[current_index];
    // 前景图片
    // 第一步调整过渡时间
    swipe_img.style.transition = 'opacity 0.5s ease-in 0s';
    // 第二步调整不透明度为0.2
    swipe_img.style.opacity = 0.2;
    // 第三步延迟变换img图片，并重新定义透明度以及过渡时间和过渡方式
    setTimeout(() => {
        // 背景变化
        swipe_bg.style.backgroundImage = 'url(' + current_link.image + ')';
        // 前景变化
        swipe_img.setAttribute('src', current_link.image);
        // 链接变化
        swipe_link.setAttribute('href', current_link.target);
        // 不透明度变化
        swipe_img.style.transition = 'opacity 0.7s ease-out 0s';
        swipe_img.style.opacity = 1;
        // 增加新的指示点选中状态
        // 如果已经通过手动点击了，选中则此处不再执行
        if (!document.querySelector('.swipe .checked')) {
            swipe_select.children[current_index].style.transition = 'background-color 0.5s';
            swipe_select.children[current_index].classList.add('checked');
        }
    }, 500);
};
// 播放
let play = () => {
    // 2秒切换一次
    swipe_timer = setInterval(() => {
        // 设置新的index
        let index = current_index + 1;
        // 右翻越界，切到第一张
        if (index >= links.length) {
            index = 0;
        }
        // 加载新图片（这里选择自动，增加切换效果）
        autoSelect(index);
    }, 2000);
};
// 停止
let stop = () => {
    if (swipe_timer) {
        clearInterval(swipe_timer);
        swipe_timer = null;
    }
};
// 初始化
let init = () => {
    for (let i = 0; i < links.length; i++) {
        // 创建a元素
        let item = document.createElement('a');
        // 修改属性
        item.setAttribute('class', 'item');
        item.setAttribute('href', '#');/* 111111111111111111111111 */
        item.setAttribute('data-index', i);
        // 追加元素
        swipe_select.appendChild(item);
    }
    // 默认第一张
    select(0);
    // 绑定各个事件并开始轮播
    bind();
    play();
};
// 绑定
let bind = () => {
    // 左翻事件监听
    swipe_btn_left.addEventListener('click', () => {
        // 设置新的index
        let index = current_index - 1;
        // 左翻越界，切到最后一张
        if (index < 0) {
            index = links.length - 1;

        }

        // 加载新图片
        select(index);
    });
    // 右翻事件监听
    swipe_btn_right.addEventListener('click', () => {
        // 设置新的index
        let index = current_index + 1;
        // 右翻越界，切到第一张
        if (index >= links.length) {
            index = 0;
        }
        // 加载新图片
        select(index);
    });
    // 循环绑定指示器点击事件
    for (const key in swipe_select.children) {
        if (swipe_select.children.hasOwnProperty(key)) {
            const element = swipe_select.children[key];
            element.addEventListener('click', (e) => {
                // 取消默认点击跳转
                e.preventDefault();
                // 跳转到当前指示点中data-index所指定的图片
                select(e.target.dataset.index);
            });
        }
    }
    // 绑定鼠标移入事件
    swipe.addEventListener('mouseover', (e) => {
        // 防止鼠标从子元素移出时触发
        if (e.relatedTarget && swipe.compareDocumentPosition(e.relatedTarget) == 10) {
            stop();
        }
    });
    // 绑定鼠标移出事件
    swipe.addEventListener('mouseout', (e) => {
        // 防止鼠标从子元素移出时触发
        if (e.relatedTarget && swipe.compareDocumentPosition(e.relatedTarget) == 10) {
            play();
        }
    });
    // 绑定鼠标移动事件
    swipe.addEventListener('mousemove', (e) => {
        stop();
    });
};

// 页面加载完毕，执行初始化
window.addEventListener('load', () => {
    init();
})
