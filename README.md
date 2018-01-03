# city_picker
一个**基于jQ**的城市选择器，核心内容来自网上的一个哥们儿(具体不详)，我在他的基础上做了优化，美化了下UI。
瞧，这就是我做的工作，所以我是改善者的角色，而非原作者。

预览地址: http://aqiongbei.top/city_picker/

## 使用方法
使用方法保持原有的样子，非常简单.

#### 1. 在需要插入选择器的地方创建一个容器
```html
<div class="city-picker"></div>
```

#### 2. 引入依赖文件
**由于该城市选择器基于jQ请确保已经引入jQ**
此外,需要引入样式文件`choose_city.css`
```html
<link rel="stylesheet" href="./css/choose_city.css">
```
需要引入样式文件`choose_city.js`以及城市列表的配置文件`city_list` 
```html
<script src="./js/choose_city.js"></script>
<script src="./js/city_list.js"></script>
```
其中城市列表配置文件格式包含两个变量,一个表示`热门城市`，一个表示`所有城市列表`:
```js
// 热门城市
var hotCities = [{
			        "name": "北京",
			        "code": "00110001"
			    }, {
			        "name": "上海",
			        "code": "00310000"
			    }];
// 所有城市列表
var cities = {
    "B": [{
            "name": "北京",
            "code": "00110001"
        },
        {
            "name": "包头",
            "code": "00150000"
        },
        {
            "name": "保定",
            "code": "00130005"
        }
    ],
    "C": [{
            "name": "成都",
            "code": "00510001"
        },
        {
            "name": "重庆",
            "code": "00500000"
        }
    ],}
```

#### 3. 最后调用方法,并传入`热门城市`与`所有城市列表`
```js
$(".city-picker").CityPicker({hotCities: hotCities, cities: cities});
```
