// 啥也别问,这是网上拷的移动端自适应的代码,懂不
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=375){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 这个代码也是网上拷的别人的,我改吧改吧,这货思想不错,但是代码写的可真的够烂的
(function($, win, doc) {
    var CityPicker = function(ele, options) {
        this.ele = $(ele);
        this.cities = options.cities;
        this.hotCities = options.hotCities;
        this.city = null;
        this.code = null;
        this.init();
    };

    var p = CityPicker.prototype;

    p.init = function() {
        this.initContainer();
        this.renderHotCityList();
        this.renderCityList();
        this.initCityListEvent();
        this.renderCityNav();
        this.initCityNavEvent();
    };
    p.initContainer = function () {
        var htmlStr = '<div class="current-city-wrapper">';
            htmlStr += '<p>当前定位城市</p><div class="current-city"><span>北京</span><i></i></div>'
            htmlStr += '</div>';
            htmlStr += '<div class="city-list-wrapper"><div class="city-list-content">';
            htmlStr += '<div class="city-list-hot-wrapper"><p>热门城市</p><ul class="city-list-hot"></ul></div>';
            htmlStr += '<div class="city-list"></div>';
            htmlStr += '</div></div></div>';
            this.ele.append(htmlStr);
    }
    p.renderCityList = function() {
        var cities = this.cities;
        var cityListStr = "";
        for (var letterKey in cities) {
            var val = cities[letterKey];
            if (cities.hasOwnProperty(letterKey)) {
                var dt = "<dt id='" + letterKey + "'>" + letterKey + "</dt>";
                var dd = "";
                for (var city of val) {
                    dd += "<dd data-letter='" + letterKey + "'' data-code='" + city.code + "'>" + city.name + "</dd>";
                }
                cityListStr += "<dl>" + dt + dd + "</dl>";
            }
        }
        $(".city-list").append(cityListStr);
    };

    p.renderHotCityList = function() {
        var hotCitiesStr = '';
        for (var city of this.hotCities) {
            hotCitiesStr += "<li data-code='" + city.code + "'>" + city.name + "</li>"
        }
        $('.city-list-hot').html(hotCitiesStr);
    };

    p.initCityListEvent = function() {
        var that = this;
        $(".city-list-wrapper").on("click", function(e) {
            var target = e.target;
            if ($(target).is("dd") || $(target).is("li")) {
                that.city = $(target).text().trim();
                that.code = $(target).attr('data-code');
                var letter = $(target).data("letter");
                $('.current-city span').text(that.city);
                if (document.referrer.indexOf('&name=') === -1) {
                    window.location.href = document.referrer + '&name=' + that.city + '&code=' + that.code;
                } else {
                    window.location.href = document.referrer.replace(/&name=[^&]+&code=([^&]+)/, '&name=' + that.city + '&code=' + that.code);
                }
            }
        });
    };

    p.renderCityNav = function() {
        // var str = "热" + Object.keys(this.cities).toString().replace(/,/g, '');
        var str = '热ABCDEFGHIGKLMNOPQRSTUVWXYZ';
        var arr = str.split("");
        var a = "<a href='#' class='to-top'></a>";
        arr.forEach(function(item, i) {
            if (item === '热') {
                a += '<a href="#">' + item + '</a>';
            } else {
                a += '<a href="#' + item + '">' + item + '</a>';
            }
        });
        var div = '<div class="navbar">' + a + '</div>';
        $(".city-list-wrapper").append(div);
    };

    p.initCityNavEvent = function() {
        var that = this;
        var navBar = $(".navbar");
        var width = navBar.find("a").width();
        var height = navBar.find("a").height();
        navBar.on("touchstart", function(e) {
            $(this).addClass("active");
            that.createLetterPrompt($(e.target).html());
        });
        navBar.on("touchmove", function(e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0];
            var pos = { "x": touch.pageX, "y": touch.pageY };
            var x = pos.x,
                y = pos.y;
            $(this).find("a").each(function(i, item) {
                var offset = $(item).offset();
                var left = offset.left,
                    top = offset.top;
                if (x > left && x < (left + width) && y > top && y < (top + height)) {
                    that.changeLetter($(item).html());
                    location.href = item.href;
                }
            });
        });

        navBar.on("touchend", function(e) {
            $(this).removeClass("active");
            $(".prompt").hide();
        });

        navBar.click(function (e) {
            var currentEle = $(e.target);
            that.changeLetter(currentEle.html());
            location.href = currentEle.attr('href');
        });
    };

    p.createLetterPrompt = function(letter) {
        var prompt = $(".prompt");
        if (prompt[0]) {
            prompt.show();
        } else {
            var span = "<span class='prompt'>" + letter + "</span>";
            $(".city-list").append(span);
        }
    };

    p.changeLetter = function(letter) {
        var prompt = $(".prompt");
        prompt.html(letter);
    };

    $.fn.CityPicker = function(options) {
        return new CityPicker(this, options);
    }
}(window.jQuery, window, document));