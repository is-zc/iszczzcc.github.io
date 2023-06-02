/* 手机打开提示 */
var mobileAgent = new Array('iphone', 'ipod', 'ipad', 'android', 'mobile', 'blackberry', 'webos', 'incognito', 'webmate', 'bada', 'nokia', 'lg', 'ucweb', 'skyfire');
var browser = navigator.userAgent.toLowerCase();
var isMobile = false;
for (var i = 0; i < mobileAgent.length; i++) {
    if (browser.indexOf(mobileAgent[i]) != -1) {
        isMobile = true;
        alert('本网站提示手机端打开不适配，建议使用电脑端访问效果最佳！点击确定继续使用手机浏览');
        break;
    }
}
