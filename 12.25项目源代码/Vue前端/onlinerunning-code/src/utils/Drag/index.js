// 因为多个组件中用到了拖放小组件
// 所以把小组件的逻辑抽离出来

function dragControllerDiv() {
    var resize = document.getElementsByClassName("resize"); // 竖条
    var left = document.getElementsByClassName("left");
    var mid = document.getElementsByClassName("mid");
    var box = document.getElementsByClassName("globalContent");
    var initWidth = document.body.offsetWidth;

    resize[0].onmousedown = function (e) {
        // 颜色改变提醒
        resize[0].style.background = "#818181";
        var startX = e.clientX;
        resize[0].left = resize[0].offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = (e) => {
            var endX = e.clientX;
            var moveLen = resize[0].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box[0].clientWidth - resize[0].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            if (moveLen < 500) moveLen = 500; // 左边区域的最小宽度为32px
            if (moveLen > maxT - 300) moveLen = maxT - 300; //右边区域最小宽度为150px
            left[0].style.width = moveLen + "px";
            mid[0].style.width = box[0].clientWidth - moveLen + "px";
        };
        window.onresize = () => {
            // 监控窗口发生变化
            let Width = initWidth - document.body.offsetWidth;
            mid[0].style.width = parseInt(mid[0].style.width) - Width + "px";
            initWidth = document.body.offsetWidth;
        };
        // // 鼠标松开事件
        document.onmouseup = function () {
            //颜色恢复
            resize[0].style.background = "#d6d6d6";
            document.onmousemove = null;
            document.onmouseup = null;
            resize[0].releaseCapture && resize[0].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        };
        resize[0].setCapture && resize[0].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false;
    }
}

function ShrinkSidebarUpdate() {
    // 当侧边栏宽度发生改变
    let box = document.getElementsByClassName("globalContent");
    let left = document.getElementsByClassName("left");
    var mid = document.getElementsByClassName("mid");
    var rightWidth = box[0].clientWidth - mid[0].clientWidth;
    left[0].style.width = rightWidth + "px";
    mid[0].style.width = mid[0].clientWidth + "px";
}

export { dragControllerDiv, ShrinkSidebarUpdate };
