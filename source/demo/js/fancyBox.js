var fancyBox = function () {
    var me = this;

    this.box = $(".fancy-box");
    this.iframe = null;
    this.open = false;

    this.init = function () {
        me.event();
        me.resizeBox();
    }

    this.event = function () {
        $(window).resize(me.resizeBox);

        $('.sub-box').click(function () {
            if (!me.open) {
                me.open = true;
                me.showBox($(this));
            }
        });

        $('.close-btn').click(function () {
            if (me.open) {
                me.open = false;
                me.hideBox();
            }
        });
    }

    this.resizeBox = function () {
        var height = $(window).height();
//        console.log(height);
        me.box.css({height: height, minHeight: 650});
    }

    this.showBox = function (obj) {
        // 左部消失、替换，fadeIn
        me.showLeft(obj);

        // 右部fadeout, 取desc, fadeIn, 右部按钮转动
        me.showRight(obj);

        // 取url, iframe 高度增加，box 高度增加
        me.showIframe(obj);
    }

    this.showLeft = function (obj) {
        var img = $('img', obj).attr('src'),
            text = $('h4', obj).text(),
            left = $('#show-box');

        left.fadeOut('fast', function () {
            $('img', left).attr('src', img);
            $('h4', left).text(text);
            left.fadeIn('fast');
        });
    }

    this.showRight = function (obj) {
        var desc = $('h4', obj).attr('desc'),
            sub = $('.sub'),
            right = $('.description'),
            close = $('.close-btn', right),
            count = 0;

        sub.fadeOut('fast', function () {
            ++count;
            if (count == 3) {
                $('h4', right).text(desc);
                right.fadeIn('fast', function () {
                    close.transit({rotate: '360deg'}, 1000);
                });
            }
        });


    }

    this.showIframe = function (obj) {
        me.iframe = $('#' + $('h4',obj).attr('data-id'));
        var iframe = me.iframe;

        iframe.css('display', 'block');
        iframe.transit({height: 500, opacity: 1}, 1000);
        me.box.transit({height: '+=500'}, 1000);
    }

    this.hideBox = function () {
        var close = $('.description .close-btn');

        // close-btn转动
        close.transit({rotate: '0'}, 800, function () {
            // 右部description fadeout, sub fadeIn
            me.hideRight();

            // 左部fadeout, 替换，fadeIn
            me.hideLeft();
        });

        // iframe 高度减少, box 高度减少
        me.hideIframe();
    }

    this.hideLeft = function () {
        var img = 'img/1.png',
            text = '入店率',
            left = $('#show-box');

        left.fadeOut('fast', function () {
            $('img', left).attr('src', img);
            $('h4', left).text(text);
            left.fadeIn('fast');
        });
    }

    this.hideRight = function () {
        var sub = $('.sub'),
            right = $('.description');

        right.fadeOut('fast', function () {
            sub.fadeIn('fast');
        });
    }

    this.hideIframe = function () {
        var iframe = me.iframe;

        iframe.transit({height: 0, opacity: 0.5}, 1000, function () {
            iframe.css('display', 'none');
        });
        me.box.transit({height: '-=500'}, 1000);
    }
}


var box = new fancyBox();
box.init();

