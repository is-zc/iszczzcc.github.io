var hp = document.getElementById('hp');
hp.onclick = function () {
    alert('已在首页');
}

$(function () {
    var spanHeight = $(".fanhui").offset().top; //获取fanhui绑定元素到html边界的高的距离
    $(window).scroll(function () { //滑动滚动条的时候
        slideIn($(".fanhui"), 1355); //触发函数 移动距离
    });

    function slideIn(obj, left) {
        var spanHeight = obj.offset().top; //获取fanhui绑定元素到html边界的高的距离
        var scrollTop = $(this).scrollTop(); //获取滚动高度
        if (scrollTop > spanHeight - 700) { //如果滚动距离大于 fanhui绑定元素到html边界的高的距离时 就触发效果
            obj.animate({
                left: left + 'px',
                opacity: 1,
                filter: 'Alpha(opacity=90)'
            }, 1000); //淡入效果
        }
    };
});