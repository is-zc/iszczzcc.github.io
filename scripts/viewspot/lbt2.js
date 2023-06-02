
// 当前轮播图编号
let current_index = -1;
// 自动轮播定时器
let swipe_timer = null;
// 轮播图的图片地址与跳转链接
let linkss = [
    { 'image': 'images/viewspot/九寨沟旅游景区.jpg', 'target': '#t1' },
    { 'image': 'images/viewspot/成都市青城山--都江堰旅游景区.jpg', 'target': '#t2' },
    { 'image': 'images/viewspot/乐山市峨眉山景区.jpg', 'target': '#t3' },
    { 'image': 'images/viewspot/乐山市乐山大佛景区.jpg', 'target': '#t4' },
    { 'image': 'images/viewspot/阿坝州黄龙景区.jpg', 'target': '#t5' },
    { 'image': 'images/viewspot/广安市故里旅游区.jpg', 'target': '#t6' },
    { 'image': 'images/viewspot/绵阳市北川羌城旅游区.jpg', 'target': '#t7' },
    { 'image': 'images/viewspot/阿坝州汶川特别旅游区.jpg', 'target': '#t8' },
    { 'image': 'images/viewspot/广元市剑门蜀道剑门关旅游区.jpg', 'target': '#t9' },
    { 'image': 'images/viewspot/南充市仪陇朱德故里景区.jpg', 'target': '#t10' },
];

// 需要操作到的元素
let swipe_s2 = document.getElementById('swipe_s2');
let swipe_bg_s2 = document.getElementById('swipe_bg_s2');
let swipe_img_s2_box_s2 = document.getElementById('swipe_img_s2_box_s2');
let swipe_link_s2 = document.getElementById('swipe_link_s2');
let swipe_img_s2 = document.getElementById('swipe_img_s2');
let swipe_select_s2 = document.getElementById('swipe_select_s2');
let swipe_btn_left_s2 = document.getElementById('swipe_btn_left_s2');
let swipe_btn_right_s2 = document.getElementById('swipe_btn_right_s2');

// 事件
// 切换图片
let select = (index) => {
    // 停止播放
    stop();
    // 转数字
    index = Number(index);
    // 越界超过最大数量,直接返回
    if (index >= linkss.length) {
        return;
    }
    // 选中当前已选中的,直接返回
    if (current_index == index) {
        return;
    }
    // 取消当前指示点的选中状态
    if (current_index > -1) {
        swipe_select_s2.children[current_index].classList.remove('checked');
    }
    // 变更当前轮播图的编号
    current_index = index;
    // 找到当前元素
    let current_link = linkss[current_index];
    // 背景变化
    swipe_bg_s2.style.backgroundImage = 'url(' + current_link.image + ')';
    // 前景变化
    swipe_img_s2.setAttribute('src', current_link.image);
    // 链接变化
    swipe_link_s2.setAttribute('href', current_link.target);
    // 增加新的指示点的选中状态
    swipe_select_s2.children[current_index].classList.add('checked');
};
// 自动切换图片
let autoSelect = (index) => {
    // 转数字
    index = Number(index);
    // 越界超过最大数量，直接返回
    if (index >= linkss.length) {
        return;
    }
    // 选中当前已选中的，直接返回
    if (current_index == index) {
        return;
    }
    // 取消当前指示点的选中状态
    swipe_select_s2.children[current_index].classList.remove('checked');
    // 变更当前轮播图的编号
    current_index = index;
    // 找到当前元素
    let current_link = linkss[current_index];
    // 前景图片
    // 第一步调整过渡时间
    swipe_img_s2.style.transition = 'opacity 0.5s ease-in 0s';
    // 第二步调整不透明度为0.2
    swipe_img_s2.style.opacity = 0.2;
    // 第三步延迟变换img图片，并重新定义透明度以及过渡时间和过渡方式
    setTimeout(() => {
        // 背景变化
        swipe_bg_s2.style.backgroundImage = 'url(' + current_link.image + ')';
        // 前景变化
        swipe_img_s2.setAttribute('src', current_link.image);
        // 链接变化
        swipe_link_s2.setAttribute('href', current_link.target);
        // 不透明度变化
        swipe_img_s2.style.transition = 'opacity 0.7s ease-out 0s';
        swipe_img_s2.style.opacity = 1;
        // 增加新的指示点选中状态
        // 如果已经通过手动点击了，选中则此处不再执行
        if (!document.querySelector('.swipe_s2 .checked')) {
            swipe_select_s2.children[current_index].style.transition = 'background-color 0.5s';
            swipe_select_s2.children[current_index].classList.add('checked');
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
        if (index >= linkss.length) {
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
    for (let i = 0; i < linkss.length; i++) {
        // 创建a元素
        let item = document.createElement('a');
        // 修改属性
        item.setAttribute('class', 'item');
        item.setAttribute('href', '#');/* 111111111111111111111111 */
        item.setAttribute('data-index', i);
        // 追加元素
        swipe_select_s2.appendChild(item);
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
    swipe_btn_left_s2.addEventListener('click', () => {
        // 设置新的index
        let index = current_index - 1;
        // 左翻越界，切到最后一张
        if (index < 0) {
            index = linkss.length - 1;

        }

        // 加载新图片
        select(index);
    });
    // 右翻事件监听
    swipe_btn_right_s2.addEventListener('click', () => {
        // 设置新的index
        let index = current_index + 1;
        // 右翻越界，切到第一张
        if (index >= linkss.length) {
            index = 0;
        }
        // 加载新图片
        select(index);
    });
    // 循环绑定指示器点击事件
    for (const key in swipe_select_s2.children) {
        if (swipe_select_s2.children.hasOwnProperty(key)) {
            const element = swipe_select_s2.children[key];
            element.addEventListener('click', (e) => {
                // 取消默认点击跳转
                e.preventDefault();
                // 跳转到当前指示点中data-index所指定的图片
                select(e.target.dataset.index);
            });
        }
    }
    // 绑定鼠标移入事件
    swipe_s2.addEventListener('mouseover', (e) => {
        // 防止鼠标从子元素移出时触发
        if (e.relatedTarget && swipe_s2.compareDocumentPosition(e.relatedTarget) == 10) {
            stop();
        }
    });
    // 绑定鼠标移出事件
    swipe_s2.addEventListener('mouseout', (e) => {
        // 防止鼠标从子元素移出时触发
        if (e.relatedTarget && swipe_s2.compareDocumentPosition(e.relatedTarget) == 10) {
            play();
        }
    });
    // 绑定鼠标移动事件
    swipe_s2.addEventListener('mousemove', (e) => {
        stop();
    });
};

// 页面加载完毕，执行初始化
window.addEventListener('load', () => {
    init();
})
