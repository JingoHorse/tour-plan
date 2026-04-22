var currentDay = 0,
  mapViewMode = "day",
  currentPlayer = 0,
  currentVoteTab = "scenic",
  votedPlayers = new Set();
var voteData = {
  0: {
    scenic: [],
    food: [],
  },
  1: {
    scenic: [],
    food: [],
  },
  2: {
    scenic: [],
    food: [],
  },
  3: {
    scenic: [],
    food: [],
  },
};
var LOC = {
  hotel: { name: "庆隆海客瀛洲B栋", lng: 106.587, lat: 29.563 },
  hongyadong: { name: "洪崖洞", lng: 106.579, lat: 29.562 },
  jiefangbei: { name: "解放碑步行街", lng: 106.575, lat: 29.557 },
  chaotianmen: { name: "朝天门广场", lng: 106.589, lat: 29.563 },
  liziba: { name: "李子坝轻轨站", lng: 106.537, lat: 29.557 },
  suodao: { name: "长江索道", lng: 106.582, lat: 29.56 },
  nanshan: { name: "南山一棵树", lng: 106.612, lat: 29.53 },
  ciqikou: { name: "磁器口古镇", lng: 106.45, lat: 29.581 },
  shibati: { name: "十八梯传统风貌区", lng: 106.573, lat: 29.551 },
  huguang: { name: "湖广会馆", lng: 106.587, lat: 29.558 },
  sanxia: { name: "三峡博物馆", lng: 106.551, lat: 29.562 },
  eling: { name: "鹅岭公园", lng: 106.536, lat: 29.55 },
  danzishi: { name: "弹子石老街", lng: 106.588, lat: 29.58 },
  baigongguan: { name: "白公馆旧址", lng: 106.432, lat: 29.576 },
  dalitang: { name: "人民大礼堂", lng: 106.553, lat: 29.562 },
  junjie: { name: "俊杰火锅", lng: 106.446, lat: 29.616 },
  xiaobing: { name: "小兵老火锅", lng: 106.573, lat: 29.515 },
  wayulang: { name: "蛙鱼郎美蛙鱼", lng: 106.578, lat: 29.553 },
  hongguang: { name: "红蜻蜓美蛙鱼", lng: 106.51, lat: 29.597 },
  baoqiwa: { name: "宝气蛙自助", lng: 106.533, lat: 29.58 },
  beizhan: { name: "重庆北站", lng: 106.55, lat: 29.611 },
  ktv: { name: "唱吧麦颂KTV(解放碑店)", lng: 106.572, lat: 29.554 },
};
var DR = [
  {
    c: "#ff4f7b",
    r: ["hotel", "jiefangbei", "hongyadong", "wayulang", "hongyadong", "hotel"],
  },
  {
    c: "#2161ff",
    r: [
      "hotel",
      "suodao",
      "shibati",
      "huguang",
      "sanxia",
      "dalitang",
      "xiaobing",
      "hotel",
    ],
  },
  {
    c: "#ff8a00",
    r: ["hotel", "ciqikou", "baigongguan", "junjie", "ktv", "hotel"],
  },
  {
    c: "#7c4dff",
    r: [
      "hotel",
      "eling",
      "liziba",
      "danzishi",
      "chaotianmen",
      "baoqiwa",
      "hotel",
    ],
  },
  { c: "#00b8a9", r: ["hotel", "jiefangbei", "hongguang", "hotel", "beizhan"] },
];
var W = [
  {
    d: "4/30",
    w: "周四",
    i: "⛅",
    h: 27,
    l: 18,
    desc: "多云转晴",
    dt: "上午多云，下午转晴。14:00后阳光充足，适合户外活动。紫外线中等，建议防晒。傍晚微风，适合散步。",
  },
  {
    d: "5/1",
    w: "周五",
    i: "☀️",
    h: 31,
    l: 18,
    desc: "晴天",
    dt: "全天晴好，气温较高。11:00-15:00最热，注意防暑降温。建议早出晚归，避开正午高温。",
  },
  {
    d: "5/2",
    w: "周六",
    i: "🌧️",
    h: 30,
    l: 17,
    desc: "中雨",
    dt: "全天有雨，上午小雨，下午转中雨。务必携带雨具！建议室内景点为主。路面湿滑注意安全。",
  },
  {
    d: "5/3",
    w: "周日",
    i: "🌦️",
    h: 19,
    l: 17,
    desc: "小雨",
    dt: "上午小雨，下午渐停。气温骤降，需添外套。🎂今日有生日庆祝，注意准备惊喜！",
  },
  {
    d: "5/4",
    w: "周一",
    i: "⛅",
    h: 25,
    l: 18,
    desc: "多云",
    dt: "多云为主，气温舒适。三峡博物馆周一闭馆请注意。返程天气良好，交通顺畅。",
  },
];
var FD = {
  junjie: {
    n: "俊杰火锅（双碑店）",
    t: "火锅",
    img: "http://store.is.autonavi.com/showpic/ecc1567b42947b0a56f14150c5ad5354",
    a: "嘉勤路宏城名都A区停车库对面",
    tm: "11:00-14:00 / 17:00-21:00",
    c: "人均 ¥89",
    rt: "4.7",
    sp: "毛肚、鸭肠、老肉片",
    ds: "俊杰火锅是重庆沙坪坝双碑地区的口碑老店，以传统牛油火锅著称。店内环境朴实，但味道正宗地道。招牌毛肚鲜脆爽口，鸭肠处理干净口感嫩滑，老肉片厚实入味。锅底麻辣鲜香，是本地人常来的火锅店，拒绝网红噱头，只凭味道说话。位于双碑，与磁器口同属沙坪坝区，适合安排在同一天游览。",
  },
  xiaobing: {
    n: "小兵老火锅",
    t: "火锅",
    img: "http://store.is.autonavi.com/showpic/38d3e20986e71ed16317cdf12d2bff24",
    a: "学府大道2号附72号（四公里）",
    tm: "11:00-次日04:00",
    c: "人均 ¥87",
    rt: "4.7",
    sp: "鲜毛肚、嫩牛肉、酥肉",
    ds: "小兵老火锅位于南岸区四公里，是当地居民口口相传的深夜食堂。营业到凌晨4点，是重庆夜宵火锅的好去处。鲜毛肚七上八下涮煮即食，嫩牛肉腌制入味，酥肉外酥里嫩。锅底用传统牛油熬制，麻辣层次分明，越煮越香。",
  },
  wayulang: {
    n: "蛙鱼郎·美蛙鱼火锅（解放碑店）",
    t: "美蛙鱼",
    img: "https://aos-comment.amap.com/B0JAYZ8NRY/comment/20260314-1a1a98c4c4eb267c3e096403-A9MTrNQJYUAALC7voQdcDM.jpg",
    a: "南纪门街道凯旋路96号附8号",
    tm: "10:00-次日02:00",
    c: "人均 ¥77",
    rt: "4.7",
    sp: "美蛙、鱼头、黑豆花",
    ds: "蛙鱼郎是重庆美蛙鱼火锅的知名品牌，解放碑店位置便利。美蛙肉质鲜嫩弹牙，鱼头新鲜入味，配上招牌黑豆花，豆香与麻辣完美融合。锅底用多种辣椒和花椒精心调配，麻辣鲜香四溢。性价比极高，是品尝正宗美蛙鱼的首选。",
  },
  hongguang: {
    n: "林玉红蜻蜓美蛙鱼头（新牌坊店）",
    t: "美蛙鱼",
    img: "https://store.is.autonavi.com/showpic/e95bc672765e5ab39e320d40b0a64e81",
    a: "新牌坊三路302号",
    tm: "09:30-22:30",
    c: "人均 ¥109",
    rt: "4.5",
    sp: "美蛙鱼头、鲜椒味",
    ds: "红蜻蜓美蛙鱼头是重庆美蛙鱼的代表品牌之一，新牌坊店是直营店。以鲜椒味锅底为特色，青椒的清香与花椒的麻味相得益彰。美蛙个头饱满，鱼头肉质细嫩。环境整洁，服务周到，适合团队聚餐。",
  },
  baoqiwa: {
    n: "宝气蛙自助美蛙鱼火锅（观音桥店）",
    t: "自助美蛙鱼",
    img: "https://aos-comment.amap.com/B0J1VA5F2I/comment/content_media_external_images_media_1000007134_ss__1753677929062_39072966.jpg",
    a: "洋河西路与星桂坊路交叉口东120米",
    tm: "11:00-23:00",
    c: "人均 ¥53",
    rt: "4.7",
    sp: "自助式·美蛙鱼无限畅吃！",
    ds: "宝气蛙是重庆自助美蛙鱼火锅的人气之选！仅需53元/人即可无限畅享美蛙、鱼头、黑豆花及各类涮菜。美蛙新鲜现杀，鱼头肉质细嫩，锅底麻辣鲜香。自助模式让团队聚餐更加自由尽兴，想吃什么拿什么，性价比超高！🎂生日聚餐的绝佳选择！",
  },
  xiaomian: {
    n: "重庆小面",
    t: "特色小吃",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    a: "遍布全城",
    tm: "06:00-14:00",
    c: "人均 ¥12-18",
    rt: "",
    sp: "麻辣鲜香，重庆人的早餐灵魂",
    ds: "重庆小面是重庆最具代表性的早餐，以麻辣鲜香著称。面条筋道，佐料丰富（辣椒油、花椒面、芝麻酱、葱花等十余种），一碗下肚，满口留香。推荐豌杂面、牛肉面等变体，是了解重庆饮食文化的最佳入口。",
  },
  tangyuan: {
    n: "山城小汤圆",
    t: "特色小吃",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
    a: "解放碑附近",
    tm: "08:00-21:00",
    c: "人均 ¥15-20",
    rt: "",
    sp: "黑芝麻馅，软糯香甜",
    ds: "山城小汤圆是重庆传统名小吃，皮薄馅大，黑芝麻馅香甜浓郁。一碗热腾腾的汤圆，配上清甜的汤底，是山城人甜蜜的早晨。店内还有其他传统甜品，如冰粉、凉糕等，适合作为早餐或下午茶。",
  },
  kaoyu: {
    n: "万州烤鱼",
    t: "特色美食",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400",
    a: "观音桥/解放碑",
    tm: "11:00-次日02:00",
    c: "人均 ¥60-80",
    rt: "",
    sp: "麻辣烤鱼，外焦里嫩",
    ds: "万州烤鱼是重庆美食名片之一，将鱼先烤后炖，外焦里嫩。铺满辣椒、花椒、花生等配料，端上桌时还在咕嘟冒泡，香气四溢。推荐麻辣味和豆豉味，配菜丰富，是一道能吃能喝的大菜。",
  },
  suanlafen: {
    n: "酸辣粉+抄手",
    t: "特色小吃",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    a: "十八梯附近",
    tm: "08:00-20:00",
    c: "人均 ¥15-25",
    rt: "",
    sp: "酸辣开胃，红油抄手",
    ds: "酸辣粉是重庆街头小吃的代表，红薯粉条配上醋和辣椒，酸辣开胃。红油抄手皮薄馅嫩，淋上红油辣子，鲜香四溢。两者搭配是重庆人的经典组合，简单却让人欲罢不能。",
  },
  chenmahua: {
    n: "毛血旺+陈麻花",
    t: "特色美食",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400",
    a: "磁器口古镇",
    tm: "09:00-20:00",
    c: "人均 ¥40-60",
    rt: "",
    sp: "磁器口双绝",
    ds: "毛血旺是磁器口的招牌菜，以鸭血、毛肚、黄豆等为主料，麻辣鲜香，汤汁浓郁。陈麻花则是磁器口最著名的小吃，酥脆香甜，有原味、椒盐、麻辣等多种口味，是必买的伴手礼。",
  },
};
var SD = {
  hongyadong: {
    n: "洪崖洞",
    img: "http://store.is.autonavi.com/showpic/ba42dbbf1e38e41ba65a84f3d021b96b",
    a: "嘉陵江滨江路88号",
    tm: "全天开放（灯光18:00-23:00）",
    tk: "免费",
    rt: "4.8",
    lv: "AAAA·必去",
    ds: '洪崖洞是重庆最具标志性的景点，依山就势沿崖而建，层层叠叠的吊脚楼从山脚延伸至山顶，被誉为"现实版千与千寻"。白天可逛民俗风情街，品尝各色小吃；夜晚华灯初上，整座建筑金碧辉煌，倒映在嘉陵江中，美不胜收。建议傍晚前往，既可看日落又能赏夜景。',
  },
  jiefangbei: {
    n: "解放碑步行街",
    img: "https://store.is.autonavi.com/showpic/27134418fa2f22e40000001501908122?type=pic",
    a: "民族路177号",
    tm: "全天开放",
    tk: "免费",
    rt: "4.9",
    lv: "地标",
    ds: '解放碑是重庆的城市地标和精神象征，全称"人民解放纪念碑"，是中国唯一一座纪念抗战胜利的纪念碑。步行街周边是重庆最繁华的商业区，汇集了各大商场、美食街和特色小店。白天购物逛街，夜晚霓虹闪烁，是感受重庆都市脉搏的最佳去处。',
  },
  suodao: {
    n: "长江索道",
    img: "http://store.is.autonavi.com/showpic/16df69e9d7e0d24e361b93c9694209cd",
    a: "新华路151号",
    tm: "07:00-22:00",
    tk: "单程¥20/往返¥30",
    rt: "4.5",
    lv: "体验",
    ds: "长江索道是重庆独特的交通工具，横跨长江两岸，全长1166米。乘坐索道凌空飞渡，脚下是滚滚长江，两岸是层叠的山城建筑，视野开阔震撼。建议从新华路索道站上车，往南岸方向乘坐，夜景尤为壮观。排队可能较长，建议错峰出行。",
  },
  shibati: {
    n: "十八梯传统风貌区",
    img: "http://aos-cdn-image.amap.com/sns/ugccomment/72a52977-9e95-4d8c-a5e4-446ca1128dd3.jpg",
    a: "中兴路1号（较场口地铁站旁）",
    tm: "全天开放",
    tk: "免费",
    rt: "4.8",
    lv: "推荐",
    ds: "十八梯是老重庆的缩影，从上半城直通下半城，共十八级台阶。经过修缮后保留了传统风貌，青石板路、老式吊脚楼、巴渝民居错落有致。这里曾是重庆最市井的地方，如今既有老茶馆、传统小吃，也有文创店铺和特色民宿，是感受山城烟火气的绝佳去处。",
  },
  huguang: {
    n: "湖广会馆",
    img: "http://store.is.autonavi.com/showpic/b44117b134ac7b1d6dabee5d837c7642",
    a: "长江滨江路芭蕉园1号",
    tm: "09:00-17:00",
    tk: "¥25",
    rt: "4.7",
    lv: "AAAA",
    ds: '湖广会馆始建于清乾隆年间，是目前中国城市中心区最大的古会馆建筑群。包括禹王宫、广东公所、齐安公所等，雕梁画栋，飞檐翘角，极具明清建筑特色。这里见证了"湖广填四川"的移民历史，是了解巴渝文化的重要窗口。',
  },
  sanxia: {
    n: "三峡博物馆",
    img: "http://store.is.autonavi.com/showpic/f0793548abccf60661920c5dc752e8b6",
    a: "人民路236号",
    tm: "09:00-17:00（周一闭馆）",
    tk: "免费",
    rt: "4.8",
    lv: "推荐",
    ds: "重庆中国三峡博物馆是首批国家一级博物馆，馆藏文物约10万件。常设展览包括《壮丽三峡》《远古巴渝》《重庆·城市之路》等，全面展示了三峡工程、巴渝文化和重庆城市发展史。建筑本身也是一件艺术品，与人民大礼堂隔街相望。注意：周一闭馆！",
  },
  eling: {
    n: "鹅岭公园",
    img: "http://store.is.autonavi.com/showpic/e0c2074eb112d71ff3db00d166c5e4e8",
    a: "鹅岭正街176号",
    tm: "06:00-22:00",
    tk: "免费",
    rt: "4.7",
    lv: "AAA",
    ds: "鹅岭公园位于重庆渝中半岛最高处，是俯瞰两江（长江、嘉陵江）风光的最佳地点。园内有揽胜楼、鹅项岭、莲池等景观，登揽胜楼可360度俯瞰山城全貌。公园绿树成荫，环境清幽，是闹市中的世外桃源。附近还有贰厂文创公园，适合文艺打卡。",
  },
  danzishi: {
    n: "弹子石老街",
    img: "http://store.is.autonavi.com/showpic/61d46fc3a0ae5f57a17f395bfa250493",
    a: "泰昌路69号",
    tm: "10:00-22:00",
    tk: "免费",
    rt: "4.7",
    lv: "推荐",
    ds: "弹子石老街是重庆百年老街的全新演绎，依山而建的街巷保留了大量历史建筑，同时融入了现代商业元素。最著名的是观景平台，可同时眺望长江与嘉陵江交汇的壮观景象，以及朝天门来福士的现代化天际线。老街内美食、文创、手作店铺林立，适合悠闲漫步和拍照打卡。",
  },
  ciqikou: {
    n: "磁器口古镇",
    img: "http://aos-cdn-image.amap.com/sns/ugccomment/0563885f-17e8-4b9a-b97f-ce1e60360f19.jpg",
    a: "沙坪坝区磁南街1号",
    tm: "全天开放",
    tk: "免费",
    rt: "4.5",
    lv: "AAAA",
    ds: '磁器口古镇始建于宋代，因清代盛产瓷器而得名"磁器口"。千年古镇保留了大量的明清建筑，石板路两旁是各式店铺，陈麻花、毛血旺是必尝美食。古镇依山傍水，嘉陵江从旁流过，雨中的磁器口更有韵味。建议避开节假日高峰，清晨游览体验最佳。',
  },
  baigongguan: {
    n: "白公馆旧址",
    img: "http://aos-cdn-image.amap.com/sns/ugccomment/ede2eb95-2572-466b-b500-d97eb5b053ce.jpg",
    a: "壮志路治法三村63号",
    tm: "09:00-16:30",
    tk: "免费",
    rt: "4.7",
    lv: "红色",
    ds: "白公馆原为四川军阀白驹的别墅，抗战时期被国民党特务机关改为秘密监狱。小说《红岩》中许云峰的原型曾关押于此。如今作为红岩革命纪念地对外开放，是了解革命历史、缅怀先烈的重要场所。与渣滓洞同属歌乐山革命遗址群。",
  },
  dalitang: {
    n: "人民大礼堂",
    img: "http://store.is.autonavi.com/showpic/71effaff3c5057491d6b782555b9fa01",
    a: "人民路173号",
    tm: "08:00-18:00",
    tk: "¥10",
    rt: "4.7",
    lv: "地标",
    ds: "重庆市人民大礼堂建于1954年，是重庆的标志性建筑之一。整座建筑仿明清宫殿风格，中间是仿天坛的圆形大厅，两侧为配殿，气势恢宏。大礼堂对面是三峡博物馆，两者隔人民广场相望，构成重庆最具代表性的城市景观。",
  },
  liziba: {
    n: "李子坝轻轨站",
    img: "http://aos-cdn-image.amap.com/sns/ugccomment/07332bed-1d8e-4b26-a5cc-715fa266137d.jpg",
    a: "李子坝站",
    tm: "全天（观景平台）",
    tk: "免费",
    rt: "4.4",
    lv: "网红",
    ds: '李子坝轻轨站因轻轨2号线穿楼而过而成为网红打卡地。轻轨从一栋居民楼的6-8层穿过，这种独特的"站桥合一"设计在全球独一无二。对面的观景平台是最佳拍摄点，可以拍到轻轨穿楼的全过程。每隔几分钟就有一列车经过，非常震撼。',
  },
  nanshan: {
    n: "南山一棵树观景台",
    img: "http://store.is.autonavi.com/showpic/83e25815dfc25311765adba58b89938b",
    a: "南山半山腰",
    tm: "09:00-22:30",
    tk: "¥30",
    rt: "4.5",
    lv: "夜景",
    ds: "南山一棵树观景台是观赏重庆夜景的最佳地点，位于南山半山腰，可俯瞰整个渝中半岛。夜幕降临后，万家灯火与霓虹交相辉映，两江波光粼粼，美不胜收。建议日落前到达，先看日落再赏夜景。山上温度较低，建议带件外套。",
  },
  chaotianmen: {
    n: "朝天门广场",
    img: "http://store.is.autonavi.com/showpic/3018b48adcd6941a173478f29124ea42",
    a: "渝中区朝千路1号",
    tm: "全天开放",
    tk: "免费",
    rt: "4.3",
    lv: "地标",
    ds: '朝天门位于长江与嘉陵江交汇处，是重庆最古老的码头之一。站在广场上可以清晰看到两江交汇——长江水浑浊泛黄，嘉陵江水碧绿清澈，泾渭分明。旁边的来福士广场是重庆新地标，造型独特。这里是感受重庆"两江四岸"格局的最佳地点。',
  },
};
var VS = [
  { id: "hongyadong", name: "洪崖洞", icon: "🏮", desc: "现实版千与千寻" },
  { id: "jiefangbei", name: "解放碑", icon: "🏛️", desc: "城市地标" },
  { id: "suodao", name: "长江索道", icon: "🚡", desc: "空中走廊" },
  { id: "shibati", name: "十八梯", icon: "🏘️", desc: "山城烟火气" },
  { id: "huguang", name: "湖广会馆", icon: "🏯", desc: "明清古建筑" },
  { id: "sanxia", name: "三峡博物馆", icon: "🏛️", desc: "巴渝文化" },
  { id: "eling", name: "鹅岭公园", icon: "🌳", desc: "两江风光" },
  { id: "danzishi", name: "弹子石老街", icon: "🏘️", desc: "两江交汇" },
  { id: "ciqikou", name: "磁器口古镇", icon: "🏘️", desc: "千年古镇" },
  { id: "baigongguan", name: "白公馆旧址", icon: "🏛️", desc: "红色记忆" },
  { id: "dalitang", name: "人民大礼堂", icon: "🏛️", desc: "仿古杰作" },
  { id: "liziba", name: "李子坝轻轨", icon: "🚇", desc: "穿楼奇观" },
  { id: "nanshan", name: "南山一棵树", icon: "🌃", desc: "最佳夜景" },
  { id: "chaotianmen", name: "朝天门广场", icon: "⛵", desc: "两江交汇" },
];
var VF = [
  { id: "junjie", name: "俊杰火锅", icon: "🔥", desc: "口碑老店·¥89" },
  { id: "xiaobing", name: "小兵老火锅", icon: "🔥", desc: "深夜食堂·¥87" },
  { id: "wayulang", name: "蛙鱼郎美蛙鱼", icon: "🐸", desc: "解放碑店·¥77" },
  { id: "hongguang", name: "红蜻蜓美蛙鱼", icon: "🐸", desc: "新牌坊店·¥109" },
  { id: "baoqiwa", name: "宝气蛙自助", icon: "🍽️", desc: "自助畅吃·¥53" },
  { id: "xiaomian", name: "重庆小面", icon: "🍜", desc: "早餐灵魂·¥15" },
  { id: "tangyuan", name: "山城小汤圆", icon: "🥣", desc: "软糯香甜·¥18" },
  { id: "kaoyu", name: "万州烤鱼", icon: "🐟", desc: "外焦里嫩·¥70" },
  { id: "suanlafen", name: "酸辣粉+抄手", icon: "🍜", desc: "酸辣开胃·¥20" },
  {
    id: "chenmahua",
    name: "毛血旺+陈麻花",
    icon: "🍲",
    desc: "磁器口双绝·¥50",
  },
];

var DAYS = [
  {
    lb: "Day1 · 4/30",
    ov: [
      { ic: "fa-plane-arrival", cls: "transport", lb: "交通", vl: "抵达重庆" },
      { ic: "fa-hotel", cls: "hotel", lb: "住宿", vl: "庆隆海客瀛洲B栋" },
      { ic: "fa-landmark", cls: "scenic", lb: "景点", vl: "解放碑·洪崖洞" },
      { ic: "fa-frog", cls: "food", lb: "晚餐", vl: "蛙鱼郎美蛙鱼 🐸" },
    ],
    tl: [
      {
        t: "14:00",
        ti: "🚄 抵达重庆",
        d: "到达重庆，前往酒店办理入住",
        tg: [{ c: "transport", l: "交通" }],
        tp: "transport",
        dk: "transport",
        did: "arrive",
      },
      {
        t: "14:30",
        ti: "🏨 入住庆隆海客瀛洲B栋",
        d: "休息调整，放下行李",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "",
        dk: "hotel",
        did: "hotel",
      },
      {
        t: "16:30",
        ti: "🏛️ 解放碑步行街",
        d: "漫步重庆地标，感受都市繁华",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "jiefangbei",
      },
      {
        t: "18:00",
        ti: "🏮 洪崖洞观景",
        d: "欣赏日落时分，等待华灯初上",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "hongyadong",
      },
      {
        t: "19:30",
        ti: "🐸 蛙鱼郎·美蛙鱼火锅（解放碑店）",
        d: "鲜嫩美蛙+麻辣鱼头，第一天轻松享受",
        tg: [{ c: "frogfish", l: "美蛙鱼 #1" }],
        tp: "food",
        dk: "food",
        did: "wayulang",
      },
      {
        t: "21:00",
        ti: "🌃 洪崖洞夜景",
        d: "千与千寻般的璀璨夜景",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "hongyadong",
      },
      {
        t: "22:00",
        ti: "🚶 返回酒店休息",
        d: "步行回酒店，结束轻松的第一天",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
    ],
  },
  {
    lb: "Day2 · 5/1",
    ov: [
      {
        ic: "fa-landmark",
        cls: "scenic",
        lb: "景点",
        vl: "索道·十八梯·湖广会馆·博物馆·大礼堂",
      },
      { ic: "fa-fire", cls: "food", lb: "晚餐", vl: "小兵老火锅 🔥" },
      { ic: "fa-walking", cls: "transport", lb: "交通", vl: "步行+地铁" },
    ],
    tl: [
      {
        t: "09:00",
        ti: "🥣 早餐：山城小汤圆",
        d: "重庆传统名小吃，软糯香甜",
        tg: [{ c: "local", l: "特色小吃" }],
        tp: "food",
        dk: "food",
        did: "tangyuan",
      },
      {
        t: "10:00",
        ti: "🚡 长江索道",
        d: "横跨长江的空中走廊",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "suodao",
      },
      {
        t: "11:30",
        ti: "🏘️ 十八梯传统风貌区",
        d: "老重庆的记忆，山城烟火气",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "shibati",
      },
      {
        t: "12:30",
        ti: "🍜 午餐：酸辣粉+抄手",
        d: "十八梯附近地道小吃",
        tg: [{ c: "local", l: "特色小吃" }],
        tp: "food",
        dk: "food",
        did: "suanlafen",
      },
      {
        t: "14:00",
        ti: "🏯 湖广会馆",
        d: "明清古建筑群，移民文化见证",
        tg: [
          { c: "scenic", l: "景点" },
          { c: "scenic", l: "AAAA" },
        ],
        tp: "",
        dk: "scenic",
        did: "huguang",
      },
      {
        t: "15:30",
        ti: "🏛️ 三峡博物馆",
        d: "了解巴渝文化与三峡工程",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "sanxia",
      },
      {
        t: "17:00",
        ti: "🏛️ 人民大礼堂",
        d: "重庆标志性建筑",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "dalitang",
      },
      {
        t: "18:30",
        ti: "🔥 小兵老火锅",
        d: "南岸区四公里，本地人推荐的深夜食堂",
        tg: [{ c: "hotpot", l: "火锅 #1" }],
        tp: "food",
        dk: "food",
        did: "xiaobing",
      },
      {
        t: "20:30",
        ti: "🚶 散步回酒店",
        d: "沿江漫步，消食赏夜",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
    ],
  },
  {
    lb: "Day3 · 5/2",
    ov: [
      { ic: "fa-landmark", cls: "scenic", lb: "景点", vl: "磁器口·白公馆" },
      { ic: "fa-fire", cls: "food", lb: "晚餐", vl: "俊杰火锅 🔥" },
      { ic: "fa-microphone", cls: "entertainment", lb: "晚间", vl: "唱吧麦颂KTV 🎤" },
      { ic: "fa-subway", cls: "transport", lb: "交通", vl: "地铁+打车" },
    ],
    tl: [
      {
        t: "09:00",
        ti: "🍜 早餐：重庆小面",
        d: "麻辣鲜香，开启山城的一天",
        tg: [{ c: "local", l: "特色小吃" }],
        tp: "food",
        dk: "food",
        did: "xiaomian",
      },
      {
        t: "10:00",
        ti: "🏘️ 磁器口古镇",
        d: "千年古镇，巴渝风情",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "ciqikou",
      },
      {
        t: "12:30",
        ti: "🍲 午餐：毛血旺+陈麻花",
        d: "磁器口特色美食",
        tg: [{ c: "local", l: "特色美食" }],
        tp: "food",
        dk: "food",
        did: "chenmahua",
      },
      {
        t: "14:00",
        ti: "🏛️ 白公馆旧址",
        d: "红岩精神，革命历史纪念地",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "baigongguan",
      },
      {
        t: "16:00",
        ti: "😴 返回酒店休息",
        d: "午间休息，避雨避暑",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
      {
        t: "18:00",
        ti: "🔥 俊杰火锅（双碑店）",
        d: "沙坪坝口碑老店，正宗牛油火锅",
        tg: [{ c: "hotpot", l: "火锅 #2" }],
        tp: "food",
        dk: "food",
        did: "junjie",
      },
      {
        t: "20:00",
        ti: "🎤 唱吧麦颂KTV（解放碑店）",
        d: "住宿附近KTV，预算约¥180/4人",
        tg: [
          { c: "entertainment", l: "🎤 KTV" },
          { c: "local", l: "≤¥200" },
        ],
        tp: "",
        dk: "",
        did: "ktv",
      },
      {
        t: "22:30",
        ti: "🚶 返回酒店休息",
        d: "步行回酒店，KTV距酒店仅5分钟",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
    ],
  },
  {
    lb: "Day4 · 5/3 🎂",
    ov: [
      {
        ic: "fa-landmark",
        cls: "scenic",
        lb: "景点",
        vl: "鹅岭·李子坝·弹子石·朝天门",
      },
      {
        ic: "fa-birthday-cake",
        cls: "food",
        lb: "生日",
        vl: "🎂 下午茶+晚餐庆祝",
      },
      { ic: "fa-frog", cls: "food", lb: "晚餐", vl: "宝气蛙自助 🐸自助" },
      { ic: "fa-bus", cls: "transport", lb: "交通", vl: "地铁+步行" },
    ],
    tl: [
      {
        t: "09:00",
        ti: "🥟 早餐：酒店附近小吃",
        d: "油茶、糍粑块等重庆早点",
        tg: [{ c: "local", l: "特色小吃" }],
        tp: "food",
        dk: "",
        did: "",
      },
      {
        t: "10:00",
        ti: "🌳 鹅岭公园",
        d: "登高望远，俯瞰两江风光",
        tg: [
          { c: "scenic", l: "景点" },
          { c: "scenic", l: "AAA" },
        ],
        tp: "",
        dk: "scenic",
        did: "eling",
      },
      {
        t: "11:30",
        ti: "🚇 李子坝轻轨站",
        d: "轻轨穿楼奇观",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "liziba",
      },
      {
        t: "12:30",
        ti: "🐟 午餐：万州烤鱼",
        d: "重庆烤鱼代表",
        tg: [{ c: "local", l: "特色美食" }],
        tp: "food",
        dk: "food",
        did: "kaoyu",
      },
      {
        t: "14:00",
        ti: "🎂 生日下午茶·弹子石老街",
        d: "为寿星庆生！下午茶+拍照留念+江景",
        tg: [
          { c: "scenic", l: "🎂生日" },
          { c: "scenic", l: "景点" },
        ],
        tp: "",
        dk: "scenic",
        did: "danzishi",
      },
      {
        t: "16:30",
        ti: "😴 返回酒店休息",
        d: "午间休息，准备晚间生日惊喜",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
      {
        t: "18:00",
        ti: "⛵ 朝天门广场",
        d: "两江交汇之处，欣赏落日",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "chaotianmen",
      },
      {
        t: "18:30",
        ti: "🐸 宝气蛙自助美蛙鱼火锅（观音桥店）",
        d: "🎂 生日晚餐！自助式美蛙鱼，无限畅吃！",
        tg: [
          { c: "frogfish", l: "美蛙鱼 #2" },
          { c: "buffet", l: "自助" },
          { c: "buffet", l: "🎂生日" },
        ],
        tp: "food",
        dk: "food",
        did: "baoqiwa",
      },
      {
        t: "20:30",
        ti: "🎂 生日庆祝",
        d: "切蛋糕·许愿·合影·祝福寿星！",
        tg: [{ c: "buffet", l: "🎂生日快乐" }],
        tp: "",
        dk: "",
        did: "",
      },
      {
        t: "21:30",
        ti: "🚕 返回酒店休息",
        d: "愉快的一天结束",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "rest",
        dk: "",
        did: "",
      },
    ],
  },
  {
    lb: "Day5 · 5/4",
    ov: [
      { ic: "fa-landmark", cls: "scenic", lb: "景点", vl: "附近自由活动" },
      {
        ic: "fa-frog",
        cls: "food",
        lb: "午餐",
        vl: "红蜻蜓美蛙鱼 🐸(已吃过该品类可换其他 😉)",
      },
      {
        ic: "fa-train",
        cls: "transport",
        lb: "返程",
        vl: "15:30 重庆北站高铁",
      },
      {
        ic: "fa-exclamation-triangle",
        cls: "hotel",
        lb: "注意",
        vl: "13:30前出发去车站",
      },
    ],
    tl: [
      {
        t: "08:30",
        ti: "🍜 早餐：重庆小面",
        d: "最后一碗地道小面",
        tg: [{ c: "local", l: "特色小吃" }],
        tp: "food",
        dk: "food",
        did: "xiaomian",
      },
      {
        t: "09:30",
        ti: "🛍️ 解放碑附近自由活动",
        d: "购买特产伴手礼",
        tg: [{ c: "scenic", l: "景点" }],
        tp: "",
        dk: "scenic",
        did: "jiefangbei",
      },
      {
        t: "11:30",
        ti: "🐸 林玉红蜻蜓美蛙鱼头（新牌坊店）（待定...）",
        d: "临行前再品一次美蛙鱼，抑或吃点想吃的",
        tg: [{ c: "frogfish", l: "美蛙鱼" }],
        tp: "food",
        dk: "food",
        did: "hongguang",
      },
      {
        t: "13:00",
        ti: "🏨 返回酒店收拾行李",
        d: "整理行李，退房",
        tg: [{ c: "hotel", l: "住宿" }],
        tp: "",
        dk: "",
        did: "",
      },
      {
        t: "13:30",
        ti: "🚕 出发前往重庆北站",
        d: "打车约30分钟，预留充足缓冲",
        tg: [{ c: "transport", l: "交通" }],
        tp: "transport",
        dk: "",
        did: "",
      },
      {
        t: "14:15",
        ti: "🚄 抵达重庆北站",
        d: "提前1小时+到达，安检候车",
        tg: [{ c: "transport", l: "交通" }],
        tp: "transport",
        dk: "",
        did: "",
      },
      {
        t: "15:30",
        ti: "🚄 高铁返程",
        d: "愉快的重庆之旅结束！",
        tg: [{ c: "transport", l: "返程" }],
        tp: "",
        dk: "",
        did: "",
      },
    ],
  },
];

var TRIP_START = new Date(2026, 3, 30);
var TRIP_END = new Date(2026, 4, 4);
var MS_PER_DAY = 86400000;
var BIRTHDAY_MONTH = 4;
var BIRTHDAY_DAY = 3;
var BIRTHDAY_VIEW_PREFIX = "tourPlanBirthdaySurpriseViews:";
var BIRTHDAY_MAX_AUTO_VIEWS = 3;

function getTripStatus() {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  var t = now.getTime();
  if (t < TRIP_START.getTime()) {
    return {
      phase: "before",
      daysLeft: Math.ceil((TRIP_START.getTime() - t) / MS_PER_DAY),
      currentDay: 0,
    };
  }
  if (t > TRIP_END.getTime()) {
    return { phase: "after", currentDay: 4 };
  }
  var idx = Math.round((t - TRIP_START.getTime()) / MS_PER_DAY);
  if (idx < 0) idx = 0;
  if (idx > 4) idx = 4;
  return { phase: "during", currentDay: idx, dayOfTrip: idx + 1 };
}

function renderCountdown() {
  var el = document.getElementById("heroCountdown");
  if (!el) return;
  var s = getTripStatus();
  if (s.phase === "before") {
    el.className = "hero-countdown before";
    el.innerHTML =
      '<i class="fas fa-hourglass-half"></i>' +
      '<span class="cd-label">距离出发还有</span>' +
      '<span class="cd-num">' + s.daysLeft + '</span>' +
      '<span class="cd-unit">天</span>';
  } else if (s.phase === "during") {
    el.className = "hero-countdown during";
    el.innerHTML =
      '<i class="fas fa-plane-departure"></i>' +
      '<span class="cd-label">旅途中</span>' +
      '<span class="cd-badge">DAY ' + s.dayOfTrip + '</span>' +
      '<span class="cd-unit">/ 5</span>';
  } else {
    el.className = "hero-countdown after";
    el.innerHTML =
      '<i class="fas fa-heart"></i>' +
      '<span class="cd-label">🎉 愉快的重庆之旅已圆满结束</span>';
  }
}

function getBirthdayDateKey(date) {
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function getBirthdaySurpriseViews(date) {
  try {
    var value = parseInt(
      localStorage.getItem(BIRTHDAY_VIEW_PREFIX + getBirthdayDateKey(date)) || "0",
      10,
    );
    return Number.isNaN(value) ? 0 : value;
  } catch (err) {
    return 0;
  }
}

function recordBirthdaySurpriseView(date) {
  try {
    var views = getBirthdaySurpriseViews(date);
    localStorage.setItem(BIRTHDAY_VIEW_PREFIX + getBirthdayDateKey(date), String(views + 1));
  } catch (err) {}
}

function getBirthdaySurpriseState(date) {
  var params = new URLSearchParams(window.location.search);
  var birthdayParam = params.get("birthday");
  if (birthdayParam === "1") return { show: true, forced: true };
  if (birthdayParam === "0") return { show: false, forced: false };
  if (date.getMonth() !== BIRTHDAY_MONTH || date.getDate() !== BIRTHDAY_DAY) {
    return { show: false, forced: false };
  }
  if (getBirthdaySurpriseViews(date) >= BIRTHDAY_MAX_AUTO_VIEWS) {
    return { show: false, forced: false };
  }
  return { show: true, forced: false };
}

function initBirthdaySurprise() {
  var now = new Date();
  var surpriseState = getBirthdaySurpriseState(now);
  if (!surpriseState.show) return;
  if (document.getElementById("birthdaySurprise")) return;
  if (!surpriseState.forced) recordBirthdaySurpriseView(now);

  var overlay = document.createElement("div");
  overlay.className = "birthday-surprise";
  overlay.id = "birthdaySurprise";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "birthdaySurpriseTitle");

  var confetti = "";
  var confettiColors = ["rose", "gold", "blue", "green"];
  for (var i = 0; i < 42; i++) {
    var x = (i * 29) % 100;
    var drift = (50 - x) * 0.42;
    confetti +=
      '<span class="birthday-confetti ' +
      confettiColors[i % confettiColors.length] +
      '" style="left:' +
      x +
      "%;--drift:" +
      drift +
      "vw;--delay:" +
      ((i % 14) * 0.12) +
      "s;--spin:" +
      (i % 2 === 0 ? "520deg" : "-520deg") +
      '"></span>';
  }

  overlay.innerHTML =
    '<div class="birthday-sky" aria-hidden="true">' +
    confetti +
    '<span class="birthday-balloon b1">🎈</span>' +
    '<span class="birthday-balloon b2">🎈</span>' +
    '<span class="birthday-balloon b3">🎈</span>' +
    "</div>" +
    '<div class="birthday-card">' +
    '<button class="birthday-close" type="button" aria-label="关闭生日惊喜" onclick="closeBirthdaySurprise()">✕</button>' +
    '<div class="birthday-kicker">MAY 3 · BIRTHDAY MOMENT</div>' +
    '<div class="birthday-cake-wrap" aria-hidden="true">' +
    '<div class="birthday-candle"><span></span></div>' +
    '<div class="birthday-cake"><span></span></div>' +
    "</div>" +
    '<h2 id="birthdaySurpriseTitle">生日快乐，今晚把愿望留给山城夜风</h2>' +
    '<p>今天的行程已经偷偷加了一颗彩蛋：慢慢逛、好好吃，晚上一起把这份惊喜拆开。</p>' +
    '<div class="birthday-actions">' +
    '<button class="birthday-primary" type="button" onclick="openBirthdayPlan()">查看 5/3 行程</button>' +
    '<button class="birthday-secondary" type="button" onclick="closeBirthdaySurprise()">先收下惊喜</button>' +
    "</div>" +
    "</div>";

  document.body.appendChild(overlay);
  document.body.classList.add("birthday-open");
  setTimeout(function () {
    overlay.classList.add("show");
    var closeBtn = overlay.querySelector(".birthday-close");
    if (closeBtn) closeBtn.focus();
  }, 120);
  setTimeout(function () {
    if (overlay && overlay.classList.contains("show")) {
      overlay.classList.add("settled");
    }
  }, 4300);
}

function closeBirthdaySurprise() {
  var overlay = document.getElementById("birthdaySurprise");
  if (!overlay) return;
  overlay.classList.add("closing");
  document.body.classList.remove("birthday-open");
  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 260);
}

function openBirthdayPlan() {
  switchDay(3);
  closeBirthdaySurprise();
  setTimeout(function () {
    var day = document.getElementById("day3");
    if (day && typeof day.scrollIntoView === "function") {
      day.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 280);
}

function renderApp() {
  var a = document.getElementById("app");
  a.innerHTML =
    rWeather() +
    rItinerary() +
    rMap() +
    rFood() +
    rScenic() +
    rVote() +
    rPractical();
  renderCountdown();
  var s = getTripStatus();
  currentDay = s.currentDay;
  switchDay(currentDay);
  rVoteGrid();
  initMap();
  enhanceA11y();
  initBirthdaySurprise();
}

function enhanceA11y() {
  document.querySelectorAll("[onclick]").forEach(function (el) {
    var tag = el.tagName;
    if (tag === "BUTTON" || tag === "A" || tag === "INPUT") return;
    var disabled = el.getAttribute("aria-disabled") === "true";
    if (disabled) {
      el.setAttribute("tabindex", "-1");
    } else if (!el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }
    if (!el.hasAttribute("role")) el.setAttribute("role", "button");
  });
}

document.addEventListener("keydown", function (e) {
  var key = e.key;
  var el = document.activeElement;
  if (!el || el === document.body) return;
  var tag = el.tagName;
  var role = el.getAttribute("role");

  if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown") {
    var group = null;
    if (role === "radio") group = el.closest('[role="radiogroup"]');
    else if (role === "tab") group = el.closest('[role="tablist"]');
    if (!group) return;
    var items = Array.prototype.filter.call(
      group.querySelectorAll('[role="' + role + '"]'),
      function (it) {
        return it.getAttribute("aria-disabled") !== "true" && !it.hasAttribute("disabled");
      },
    );
    if (!items.length) return;
    var idx = items.indexOf(el);
    if (idx < 0) return;
    var next = key === "ArrowLeft" || key === "ArrowUp" ? idx - 1 : idx + 1;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    e.preventDefault();
    items[next].focus();
    items[next].click();
    return;
  }

  if (key !== "Enter" && key !== " " && key !== "Spacebar") return;
  if (
    tag === "BUTTON" ||
    tag === "A" ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  )
    return;
  if (!el.hasAttribute("onclick") && role !== "button" && role !== "radio" && role !== "checkbox" && role !== "tab")
    return;
  if (el.getAttribute("aria-disabled") === "true") return;
  e.preventDefault();
  el.click();
});

function rWeather() {
  var h =
    '<div class="section"><h2 class="section-title"><i class="fas fa-cloud-sun"></i> 天气预报</h2><div class="weather-grid">';
  W.forEach(function (w, i) {
    h +=
      '<div class="weather-card" onclick="showWeather(' +
      i +
      ')"><div class="date">' +
      w.d +
      '</div><div class="week">' +
      w.w +
      '</div><div class="icon">' +
      w.i +
      '</div><div class="temp">' +
      w.h +
      "°<span>/ " +
      w.l +
      '°</span></div><div class="desc">' +
      w.desc +
      "</div>" +
      (w.d === "5/3"
      ? '<div style="color:#2f78a8;font-size:.7em;margin-top:2px">🎂 生日</div>'
        : "") +
      "</div>";
  });
  return h + "</div></div>";
}

function rItinerary() {
  var h =
    '<div class="section"><h2 class="section-title"><i class="fas fa-route"></i> 每日行程</h2><div class="day-nav" role="tablist" aria-label="按天切换行程">';
  DAYS.forEach(function (d, i) {
    h +=
      '<button class="day-btn' +
      (i === 0 ? " active" : "") +
      '" role="tab" aria-pressed="' +
      (i === 0 ? "true" : "false") +
      '" aria-controls="day' +
      i +
      '" onclick="switchDay(' +
      i +
      ')">' +
      d.lb +
      "</button>";
  });
  h += "</div>";
  DAYS.forEach(function (d, i) {
    h +=
      '<div class="day-panel' +
      (i === 0 ? " active" : "") +
      '" id="day' +
      i +
      '" role="tabpanel" aria-hidden="' +
      (i === 0 ? "false" : "true") +
      '"><div class="day-overview">';
    d.ov.forEach(function (o) {
      h +=
        '<div class="overview-item"><div class="ic ' +
        o.cls +
        '"><i class="fas ' +
        o.ic +
        '"></i></div><div><div class="lb">' +
        o.lb +
        '</div><div class="vl">' +
        o.vl +
        "</div></div></div>";
    });
    h += '</div><div class="timeline">';
    d.tl.forEach(function (t) {
      h +=
        '<div class="timeline-item' +
        (t.tp ? " " + t.tp : "") +
        '"><div class="timeline-card"' +
        (t.dk
          ? " onclick=\"showDetail('" + t.dk + "','" + t.did + "')\""
          : "") +
        '><div class="time"><i class="fas fa-clock"></i> ' +
        t.t +
        '</div><div class="title">' +
        t.ti +
        '</div><div class="desc">' +
        t.d +
        '</div><div class="tags">';
      t.tg.forEach(function (g) {
        h += '<span class="tag ' + g.c + '">' + g.l + "</span>";
      });
      h += "</div></div></div>";
    });
    h += "</div></div>";
  });
  return h + "</div>";
}

function rMap() {
  return '<div class="section"><h2 class="section-title"><i class="fas fa-map-marked-alt"></i> 路线地图</h2><div class="map-section"><div class="map-header"><h3><i class="fas fa-map"></i> 行程路线</h3><div class="map-controls"><div class="map-tabs" role="tablist" aria-label="地图视图模式"><button class="map-tab active" data-mode="day" role="tab" aria-selected="true" onclick="switchMapView(\'day\')">当日路线</button><button class="map-tab" data-mode="overview" role="tab" aria-selected="false" onclick="switchMapView(\'overview\')">五日总览</button></div><div class="map-tabs route-mode-tabs" role="tablist" aria-label="路线计算方式"><button class="map-tab active" data-route="straight" role="tab" aria-selected="true" onclick="switchRouteMode(\'straight\')" title="按两点直线连接"><i class="fas fa-ruler" aria-hidden="true"></i> 直线距离</button><button class="map-tab" data-route="driving" role="tab" aria-selected="false" onclick="switchRouteMode(\'driving\')" title="按真实道路驾车路程"><i class="fas fa-route" aria-hidden="true"></i> 驾车路程</button></div></div></div><div id="mapContainer"></div><div id="mapLoading" class="map-loading" style="display:none"><i class="fas fa-spinner fa-spin"></i> 正在规划驾车路线…</div><div class="overview-cards" id="overviewCards" style="display:none"><div class="overview-card active" onclick="switchDayFromMap(0)"><div class="day-label">Day1 · 4/30</div><div class="day-places">解放碑→洪崖洞<br>蛙鱼郎美蛙鱼</div></div><div class="overview-card" onclick="switchDayFromMap(1)"><div class="day-label">Day2 · 5/1</div><div class="day-places">索道→十八梯→湖广会馆<br>三峡博物馆→大礼堂<br>小兵老火锅</div></div><div class="overview-card" onclick="switchDayFromMap(2)"><div class="day-label">Day3 · 5/2</div><div class="day-places">磁器口→白公馆<br>俊杰火锅→KTV</div></div><div class="overview-card" onclick="switchDayFromMap(3)"><div class="day-label">Day4 · 5/3 🎂</div><div class="day-places">鹅岭→李子坝→弹子石<br>🎂生日下午茶<br>朝天门→宝气蛙自助</div></div><div class="overview-card" onclick="switchDayFromMap(4)"><div class="day-label">Day5 · 5/4</div><div class="day-places">自由活动<br>红蜻蜓美蛙鱼<br>→重庆北站</div></div></div></div></div>';
}

function rFood() {
  var fl = [
    { id: "junjie", b: "🔥 火锅", bc: "hotpot" },
    { id: "xiaobing", b: "🔥 火锅", bc: "hotpot" },
    { id: "wayulang", b: "🐸 美蛙鱼", bc: "frogfish" },
    { id: "hongguang", b: "🐸 美蛙鱼", bc: "frogfish" },
    { id: "baoqiwa", b: "🍽️ 自助美蛙鱼", bc: "buffet" },
    { id: "xiaomian", b: "🍜 特色小吃", bc: "local" },
    { id: "tangyuan", b: "🥣 特色小吃", bc: "local" },
    { id: "kaoyu", b: "🐟 特色美食", bc: "local" },
  ];
  var h =
    '<div class="section"><h2 class="section-title"><i class="fas fa-utensils"></i> 美食推荐</h2><div class="food-grid">';
  fl.forEach(function (f) {
    var d = FD[f.id];
    if (!d) return;
    h +=
      "<div class=\"food-card\" onclick=\"showDetail('food','" +
      f.id +
      '\')"><div class="card-img" style="background-image:url(\'' +
      d.img +
      '\')"><span class="badge ' +
      f.bc +
      '">' +
      f.b +
      '</span></div><div class="card-body"><h4>' +
      d.n +
      '</h4><div class="info"><i class="fas fa-map-marker-alt"></i> ' +
      d.a +
      '</div><div class="info"><i class="fas fa-clock"></i> ' +
      d.tm +
      '</div><div class="info"><i class="fas fa-yen-sign"></i> ' +
      d.c +
      (d.rt ? ' <span class="rating">★ ' + d.rt + "</span>" : "") +
      '</div><div class="special">特色：' +
      d.sp +
      "</div></div></div>";
  });
  return h + "</div></div>";
}

function rScenic() {
  var sl = [
    { id: "hongyadong", lv: "AAAA·必去" },
    { id: "jiefangbei", lv: "地标" },
    { id: "suodao", lv: "体验" },
    { id: "shibati", lv: "推荐" },
    { id: "huguang", lv: "AAAA" },
    { id: "sanxia", lv: "推荐" },
    { id: "eling", lv: "AAA" },
    { id: "danzishi", lv: "推荐" },
    { id: "ciqikou", lv: "AAAA" },
    { id: "baigongguan", lv: "红色" },
    { id: "dalitang", lv: "地标" },
    { id: "liziba", lv: "网红" },
  ];
  var h =
    '<div class="section"><h2 class="section-title"><i class="fas fa-mountain"></i> 景点推荐</h2><div class="scenic-grid">';
  sl.forEach(function (s) {
    var d = SD[s.id];
    if (!d) return;
    h +=
      "<div class=\"scenic-card\" onclick=\"showDetail('scenic','" +
      s.id +
      '\')"><div class="card-img" style="background-image:url(\'' +
      d.img +
      '\')"><span class="level-badge">' +
      s.lv +
      '</span></div><div class="card-body"><h4>' +
      d.n +
      '</h4><div class="info"><i class="fas fa-map-marker-alt"></i> ' +
      d.a +
      '</div><div class="info"><i class="fas fa-clock"></i> ' +
      d.tm +
      '</div><div class="info"><i class="fas fa-ticket-alt"></i> ' +
      d.tk +
      ' <span class="rating">★ ' +
      d.rt +
      "</span></div></div></div>";
  });
  return h + "</div></div>";
}

function rVote() {
  return '<div class="section"><h2 class="section-title"><i class="fas fa-vote-yea"></i> 旅行投票</h2><div class="vote-section"><h2>🎯 选出你最期待的！</h2><p class="vote-sub">4人全部投票后揭晓结果，每人可选多个选项</p><div class="vote-players" id="votePlayers" role="radiogroup" aria-label="选择当前投票人"><div class="vote-player active" role="radio" aria-checked="true" aria-pressed="true" aria-label="刘乐彤" onclick="selectPlayer(0)"><div class="vp-avatar" aria-hidden="true" style="background:rgba(120,188,232,.72)">👨</div><div class="vp-name">刘乐彤</div><div class="vp-status" id="pStatus0">投票中</div></div><div class="vote-player" role="radio" aria-checked="false" aria-pressed="false" aria-label="邢晖" onclick="selectPlayer(1)"><div class="vp-avatar" aria-hidden="true" style="background:rgba(139,199,238,.72)">👨</div><div class="vp-name">邢晖</div><div class="vp-status" id="pStatus1">未投票</div></div><div class="vote-player" role="radio" aria-checked="false" aria-pressed="false" aria-label="王雨" onclick="selectPlayer(2)"><div class="vp-avatar" aria-hidden="true" style="background:rgba(167,213,236,.72)">👩</div><div class="vp-name">王雨</div><div class="vp-status" id="pStatus2">未投票</div></div><div class="vote-player" role="radio" aria-checked="false" aria-pressed="false" aria-label="霍颖" onclick="selectPlayer(3)"><div class="vp-avatar" aria-hidden="true" style="background:rgba(112,171,201,.72)">👩</div><div class="vp-name">霍颖</div><div class="vp-status" id="pStatus3">未投票</div></div></div><div class="vote-tabs" role="tablist" aria-label="投票类别"><button class="vote-tab active" data-tab="scenic" role="tab" aria-selected="true" onclick="switchVoteTab(\'scenic\')">🏛️ 最期待景点</button><button class="vote-tab" data-tab="food" role="tab" aria-selected="false" onclick="switchVoteTab(\'food\')">🍲 最期待美食</button></div><div class="vote-grid" id="voteGrid"></div><button class="vote-btn" id="voteBtn" onclick="submitVote()">✅ 确认投票</button><div class="vote-results" id="voteResults"></div></div></div>';
}

function rPractical() {
  return '<div class="section"><h2 class="section-title"><i class="fas fa-info-circle"></i> 实用信息</h2><div class="practical-grid"><div class="practical-card"><h4><i class="fas fa-phone-alt"></i> 紧急电话</h4><ul><li><i class="fas fa-ambulance"></i> 急救：120</li><li><i class="fas fa-shield-alt"></i> 报警：110</li><li><i class="fas fa-fire-extinguisher"></i> 火警：119</li><li><i class="fas fa-phone"></i> 消费投诉：12315</li></ul></div><div class="practical-card"><h4><i class="fas fa-lightbulb"></i> 注意事项</h4><ul><li><i class="fas fa-cloud-rain"></i> 5/2-3有雨，记得带伞</li><li><i class="fas fa-mountain"></i> 山城多坡道，穿舒适鞋</li><li><i class="fas fa-pepper-hot"></i> 饮食偏辣，备好肠胃药</li><li><i class="fas fa-subway"></i> 优先地铁出行，避免堵车</li><li><i class="fas fa-train"></i> 5/4务必13:30前出发去车站</li><li><i class="fas fa-birthday-cake"></i> 5/3是生日，提前准备蛋糕！</li></ul></div><div class="practical-card"><h4><i class="fas fa-map-signs"></i> 交通提示</h4><ul><li><i class="fas fa-subway"></i> 地铁1/2/3/6号线覆盖主要景点</li><li><i class="fas fa-taxi"></i> 打车起步价¥10，高峰期难打</li><li><i class="fas fa-bus"></i> 公交¥2起，支持扫码支付</li><li><i class="fas fa-mobile-alt"></i> 支付宝/微信均可乘车</li></ul></div></div></div>';
}

function switchDay(i) {
  currentDay = i;
  document.querySelectorAll(".day-btn").forEach(function (b, j) {
    b.classList.toggle("active", j === i);
    b.setAttribute("aria-pressed", j === i ? "true" : "false");
  });
  document.querySelectorAll(".day-panel").forEach(function (p, j) {
    p.classList.toggle("active", j === i);
    p.setAttribute("aria-hidden", j === i ? "false" : "true");
  });
  document.querySelectorAll(".overview-card").forEach(function (c, j) {
    c.classList.toggle("active", j === i);
    c.setAttribute("aria-pressed", j === i ? "true" : "false");
  });
  if (!map) return;
  if (mapViewMode === "day") updateMapDay();
  else updateMapOverview();
}
function switchMapView(m) {
  mapViewMode = m;
  document.querySelectorAll(".map-tab[data-mode]").forEach(function (t) {
    var on = t.getAttribute("data-mode") === m;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  document.getElementById("overviewCards").style.display =
    m === "overview" ? "grid" : "none";
  if (m === "overview") updateMapOverview();
  else updateMapDay();
}
function switchDayFromMap(i) {
  currentDay = i;
  document.querySelectorAll(".day-btn").forEach(function (b, j) {
    b.classList.toggle("active", j === i);
  });
  document.querySelectorAll(".day-panel").forEach(function (p, j) {
    p.classList.toggle("active", j === i);
  });
  document.querySelectorAll(".overview-card").forEach(function (c, j) {
    c.classList.toggle("active", j === i);
  });
  updateMapDay();
}

var map,
  markers = [],
  polylines = [],
  routeLabels = [],
  cluster = null,
  drivingInst = null,
  routeMode = "straight",
  mapRenderToken = 0;

function initMap() {
  try {
    map = new AMap.Map("mapContainer", {
      zoom: 12,
      center: [106.56, 29.56],
      mapStyle: "amap://styles/normal",
      features: ["bg", "road", "building", "point"],
    });
    updateMapDay();
  } catch (e) {
    document.getElementById("mapContainer").innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#95a5a6;font-size:.9em;text-align:center;padding:20px"><div><i class="fas fa-map-marked-alt" style="font-size:3em;margin-bottom:10px;display:block"></i>地图加载中...<br><small>请确保网络连接正常</small></div></div>';
  }
}

function ensureDriving() {
  if (!drivingInst && window.AMap && AMap.Driving) {
    drivingInst = new AMap.Driving({
      policy:
        AMap.DrivingPolicy && AMap.DrivingPolicy.LEAST_DISTANCE !== undefined
          ? AMap.DrivingPolicy.LEAST_DISTANCE
          : 2,
      hideMarkers: true,
      showTraffic: false,
      autoFitView: false,
    });
  }
  return drivingInst;
}

function showMapLoading(show) {
  var el = document.getElementById("mapLoading");
  if (el) el.style.display = show ? "flex" : "none";
}

function clearMap() {
  mapRenderToken++;
  if (cluster) {
    cluster.setMap(null);
    cluster = null;
  }
  markers.forEach(function (m) {
    map.remove(m);
  });
  polylines.forEach(function (p) {
    map.remove(p);
  });
  routeLabels.forEach(function (l) {
    map.remove(l);
  });
  markers = [];
  polylines = [];
  routeLabels = [];
  showMapLoading(false);
}
function addMarker(loc, color, label, idx) {
  var prefix = idx
    ? '<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-right:6px;border-radius:50%;background:' +
      color +
      ';color:#fff;font-weight:800;box-shadow:0 2px 6px rgba(0,0,0,.22)">' +
      idx +
      "</span>"
    : "";
  var m = new AMap.Marker({
    position: [loc.lng, loc.lat],
    title: loc.name,
    content:
      '<div style="display:flex;align-items:center;background:rgba(255,255,255,.96);color:#20364f;border:2px solid ' +
      color +
      ';padding:4px 10px;border-radius:16px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 6px 16px rgba(20,33,61,.24)">' +
      prefix +
      label +
      "</div>",
    offset: new AMap.Pixel(-24, -18),
  });
  markers.push(m);
  map.add(m);
}
function addPolyline(path, color) {
  var p = new AMap.Polyline({
    path: path,
    strokeColor: color,
    strokeWeight: 6,
    strokeOpacity: 0.92,
    strokeStyle: "solid",
    lineJoin: "round",
    lineCap: "round",
    showDir: true,
    dirColor: "#fff",
  });
  polylines.push(p);
  map.add(p);
}
function addDistanceLabelAt(position, color, text) {
  var label = new AMap.Marker({
    position: position,
    zIndex: 80,
    content:
      '<div style="background:' +
      color +
      ';color:#fff;border:2px solid rgba(255,255,255,.95);padding:4px 8px;border-radius:999px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 6px 16px rgba(20,33,61,.26)">' +
      text +
      "</div>",
    offset: new AMap.Pixel(-26, -13),
  });
  routeLabels.push(label);
  map.add(label);
}
function addDistanceLabel(from, to, color) {
  var d = getDistance(from, to);
  var mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  addDistanceLabelAt(mid, color, "约 " + formatDistance(d));
}
function pathMidPoint(path) {
  if (!path.length) return [0, 0];
  var idx = Math.floor(path.length / 2);
  return path[idx];
}
function drawRoute(path, color, showDistance) {
  if (path.length < 2) return;
  if (routeMode === "driving" && window.AMap && AMap.Driving) {
    drawDrivingRoute(path, color, showDistance);
  } else {
    addPolyline(path, color);
    if (!showDistance) return;
    for (var i = 0; i < path.length - 1; i++)
      addDistanceLabel(path[i], path[i + 1], color);
  }
}
function drawDrivingRoute(path, color, showDistance) {
  var d = ensureDriving();
  if (!d) {
    addPolyline(path, color);
    if (showDistance) {
      for (var i = 0; i < path.length - 1; i++)
        addDistanceLabel(path[i], path[i + 1], color);
    }
    return;
  }
  showMapLoading(true);
  var token = mapRenderToken;
  var total = path.length - 1;
  var finished = 0;
  function step(idx) {
    if (idx >= total) {
      if (token === mapRenderToken) showMapLoading(false);
      return;
    }
    if (token !== mapRenderToken) return;
    var from = new AMap.LngLat(path[idx][0], path[idx][1]);
    var to = new AMap.LngLat(path[idx + 1][0], path[idx + 1][1]);
    d.search(from, to, function (status, result) {
      if (token !== mapRenderToken) return;
      var segPath = null;
      var distance = null;
      if (
        status === "complete" &&
        result &&
        result.routes &&
        result.routes[0]
      ) {
        var route = result.routes[0];
        segPath = [];
        distance = route.distance;
        route.steps.forEach(function (st) {
          (st.path || []).forEach(function (p) {
            segPath.push([p.lng, p.lat]);
          });
        });
      }
      if (segPath && segPath.length >= 2) {
        addPolyline(segPath, color);
        if (showDistance) {
          addDistanceLabelAt(
            pathMidPoint(segPath),
            color,
            "驾车 " + formatDistance(distance),
          );
        }
      } else {
        addPolyline([path[idx], path[idx + 1]], color);
        if (showDistance) addDistanceLabel(path[idx], path[idx + 1], color);
      }
      finished++;
      step(idx + 1);
    });
  }
  step(0);
}
function getDistance(a, b) {
  if (AMap.GeometryUtil && AMap.GeometryUtil.distance)
    return AMap.GeometryUtil.distance(a, b);
  var r = 6371000,
    dLat = ((b[1] - a[1]) * Math.PI) / 180,
    dLng = ((b[0] - a[0]) * Math.PI) / 180,
    lat1 = (a[1] * Math.PI) / 180,
    lat2 = (b[1] * Math.PI) / 180;
  var h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * r * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
function formatDistance(m) {
  return m >= 1000
    ? (m / 1000).toFixed(m >= 10000 ? 0 : 1) + " km"
    : Math.round(m) + " m";
}
function updateMapDay() {
  clearMap();
  var route = DR[currentDay];
  var path = [];
  route.r.forEach(function (key, i) {
    var loc = LOC[key];
    if (loc) {
      addMarker(loc, route.c, loc.name, i + 1);
      path.push([loc.lng, loc.lat]);
    }
  });
  drawRoute(path, route.c, true);
  if (path.length > 0) map.setFitView(markers, false, [60, 60, 60, 60]);
}
function updateMapOverview() {
  clearMap();
  var colors = ["#ff4f7b", "#2161ff", "#ff8a00", "#7c4dff", "#00b8a9"];
  var clusterMarkers = [];
  var seen = {};
  DR.forEach(function (route, di) {
    var path = [];
    route.r.forEach(function (key) {
      var loc = LOC[key];
      if (!loc) return;
      path.push([loc.lng, loc.lat]);
      if (di === currentDay) addMarker(loc, colors[di], loc.name);
      if (seen[key]) return;
      seen[key] = true;
      clusterMarkers.push(
        new AMap.Marker({
          position: [loc.lng, loc.lat],
          title: loc.name,
          zIndex: 30,
          offset: new AMap.Pixel(-6, -6),
          content:
            '<div style="width:12px;height:12px;border-radius:50%;background:' +
            colors[di] +
            ';border:2px solid rgba(255,255,255,.95);box-shadow:0 4px 10px rgba(20,33,61,.3)"></div>',
        }),
      );
    });
    drawRoute(path, colors[di], false);
  });
  addMarker(LOC.hotel, "#2c3e50", "🏨 住宿");
  if (AMap.MarkerCluster && clusterMarkers.length) {
    cluster = new AMap.MarkerCluster(map, clusterMarkers, {
      gridSize: 70,
      maxZoom: 14,
      renderClusterMarker: function (ctx) {
        var count = ctx.count;
        var size = count >= 10 ? 44 : count >= 5 ? 38 : 32;
        var div = document.createElement("div");
        div.style.cssText =
          "width:" +
          size +
          "px;height:" +
          size +
          "px;border-radius:50%;background:linear-gradient(135deg,#2f78a8,#78bce8);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;border:2px solid #fff;box-shadow:0 6px 18px rgba(47,120,168,.42)";
        div.innerText = count;
        ctx.marker.setContent(div);
        ctx.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
      },
    });
  }
  map.setFitView(markers.concat(polylines), false, [60, 60, 60, 60]);
}

function switchRouteMode(mode) {
  if (routeMode === mode) return;
  routeMode = mode;
  document.querySelectorAll(".map-tab[data-route]").forEach(function (t) {
    var on = t.getAttribute("data-route") === mode;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  if (!map) return;
  if (mapViewMode === "day") updateMapDay();
  else updateMapOverview();
}

function showWeather(i) {
  var w = W[i];
  openModal(
    w.d + " " + w.w + " 天气详情",
    '<div class="modal-img" style="background-image:url(\'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400\')"></div><div class="modal-info"><div class="mi-row"><i class="fas fa-thermometer-half"></i><div>温度：' +
      w.l +
      "°C ~ " +
      w.h +
      '°C</div></div><div class="mi-row"><i class="fas fa-cloud"></i><div>天气：' +
      w.desc +
      '</div></div></div><div class="modal-desc">' +
      w.dt +
      "</div>",
  );
}

function showDetail(type, id) {
  if (type === "food") {
    var d = FD[id];
    if (!d) return;
    openModal(
      d.n,
      '<div class="modal-img" style="background-image:url(\'' +
        d.img +
        '\')"></div><div class="modal-info"><div class="mi-row"><i class="fas fa-tag"></i><div>类型：' +
        d.t +
        '</div></div><div class="mi-row"><i class="fas fa-map-marker-alt"></i><div>地址：' +
        d.a +
        '</div></div><div class="mi-row"><i class="fas fa-clock"></i><div>营业：' +
        d.tm +
        '</div></div><div class="mi-row"><i class="fas fa-yen-sign"></i><div>消费：' +
        d.c +
        "</div></div>" +
        (d.rt
          ? '<div class="mi-row"><i class="fas fa-star"></i><div>评分：' +
            d.rt +
            "</div></div>"
          : "") +
        '<div class="mi-row"><i class="fas fa-utensils"></i><div>特色：' +
        d.sp +
        '</div></div></div><div class="modal-desc">' +
        d.ds +
        "</div>",
    );
  } else if (type === "scenic") {
    var d = SD[id];
    if (!d) return;
    openModal(
      d.n,
      '<div class="modal-img" style="background-image:url(\'' +
        d.img +
        '\')"></div><div class="modal-info"><div class="mi-row"><i class="fas fa-map-marker-alt"></i><div>地址：' +
        d.a +
        '</div></div><div class="mi-row"><i class="fas fa-clock"></i><div>开放：' +
        d.tm +
        '</div></div><div class="mi-row"><i class="fas fa-ticket-alt"></i><div>门票：' +
        d.tk +
        '</div></div><div class="mi-row"><i class="fas fa-star"></i><div>评分：' +
        d.rt +
        "</div></div>" +
        (d.lv
          ? '<div class="mi-row"><i class="fas fa-award"></i><div>等级：' +
            d.lv +
            "</div></div>"
          : "") +
        '</div><div class="modal-desc">' +
        d.ds +
        "</div>",
    );
  } else if (type === "hotel") {
    openModal(
      "庆隆海客瀛洲B栋",
      '<div class="modal-img" style="background-image:url(\'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400\')"></div><div class="modal-info"><div class="mi-row"><i class="fas fa-map-marker-alt"></i><div>地址：重庆市渝中区朝天门</div></div><div class="mi-row"><i class="fas fa-calendar-check"></i><div>入住：4/30 - 5/4（4晚）</div></div></div><div class="modal-desc">庆隆海客瀛洲位于渝中区朝天门附近，地理位置优越，步行可达洪崖洞、解放碑等核心景点。周边交通便利，地铁1号线小什字站步行可达。公寓式酒店，设施齐全，适合4人团队入住。附近餐饮丰富，便利店、超市一应俱全。</div>',
    );
  } else if (type === "transport") {
    openModal(
      "交通信息",
      '<div class="modal-info"><div class="mi-row"><i class="fas fa-plane-arrival"></i><div>抵达：重庆江北国际机场 / 重庆北站</div></div><div class="mi-row"><i class="fas fa-taxi"></i><div>机场→酒店：打车约40分钟，¥60-80</div></div><div class="mi-row"><i class="fas fa-subway"></i><div>北站→酒店：地铁1号线，约20分钟</div></div></div><div class="modal-desc">重庆交通以地铁为主，1/2/3/6号线覆盖主要景点。打车建议使用滴滴，高峰期（8-9点、17-19点）较难打到。轻轨2号线可体验李子坝穿楼。返程5月4日务必13:30前出发前往重庆北站，预留充足缓冲时间。</div>',
    );
  }
}

var _modalLastFocus = null;

function openModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  var ov = document.getElementById("modalOverlay");
  ov.classList.remove("closing");
  ov.classList.add("show");
  document.body.style.overflow = "hidden";
  _modalLastFocus =
    document.activeElement && document.activeElement !== document.body
      ? document.activeElement
      : null;
  if (typeof enhanceA11y === "function") enhanceA11y();
  setTimeout(function () {
    var closeBtn = ov.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }, 60);
}

function closeModal(e) {
  var ov = document.getElementById("modalOverlay");
  if (e && e.target !== ov) return;
  if (!ov.classList.contains("show")) return;
  ov.classList.add("closing");
  document.body.style.overflow = "";
  setTimeout(function () {
    ov.classList.remove("show");
    ov.classList.remove("closing");
    if (_modalLastFocus && typeof _modalLastFocus.focus === "function") {
      try { _modalLastFocus.focus(); } catch (err) {}
    }
    _modalLastFocus = null;
  }, 240);
}

function getFocusableInModal() {
  var ov = document.getElementById("modalOverlay");
  if (!ov || !ov.classList.contains("show")) return [];
  return Array.prototype.filter.call(
    ov.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
    function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
    },
  );
}

document.addEventListener("keydown", function (e) {
  var birthday = document.getElementById("birthdaySurprise");
  if ((e.key === "Escape" || e.keyCode === 27) && birthday) {
    e.preventDefault();
    closeBirthdaySurprise();
    return;
  }
  if (e.key === "Tab" && birthday) {
    var birthdayFocusables = Array.prototype.slice.call(
      birthday.querySelectorAll("button:not([disabled])"),
    );
    if (!birthdayFocusables.length) return;
    var firstBirthdayControl = birthdayFocusables[0];
    var lastBirthdayControl = birthdayFocusables[birthdayFocusables.length - 1];
    if (e.shiftKey && document.activeElement === firstBirthdayControl) {
      e.preventDefault();
      lastBirthdayControl.focus();
    } else if (!e.shiftKey && document.activeElement === lastBirthdayControl) {
      e.preventDefault();
      firstBirthdayControl.focus();
    } else if (!birthday.contains(document.activeElement)) {
      e.preventDefault();
      firstBirthdayControl.focus();
    }
    return;
  }
  var ov = document.getElementById("modalOverlay");
  var isModalOpen = ov && ov.classList.contains("show") && !ov.classList.contains("closing");
  if (e.key === "Escape" || e.keyCode === 27) {
    if (isModalOpen) {
      e.preventDefault();
      closeModal();
    }
    return;
  }
  if (e.key === "Tab" && isModalOpen) {
    var focusables = getFocusableInModal();
    if (!focusables.length) {
      e.preventDefault();
      return;
    }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    } else if (!ov.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }
});

function selectPlayer(i) {
  currentPlayer = i;
  document.querySelectorAll(".vote-player").forEach(function (p, j) {
    var on = j === i;
    p.classList.toggle("active", on);
    p.setAttribute("aria-pressed", on ? "true" : "false");
    p.setAttribute("aria-checked", on ? "true" : "false");
  });
  updateVoteActionButton();
  rVoteGrid();
}

function updateVoteActionButton() {
  var btn = document.getElementById("voteBtn");
  if (!btn) return;
  btn.classList.remove("withdraw");
  btn.disabled = false;
  if (votedPlayers.has(currentPlayer)) {
    btn.innerHTML = '<i class="fas fa-undo"></i> 撤回投票';
    btn.classList.add("withdraw");
    btn.onclick = withdrawVote;
  } else if (votedPlayers.size === 4) {
    btn.textContent = "🎉 全部投票完成！";
    btn.disabled = true;
    btn.onclick = null;
  } else {
    btn.textContent = "✅ 确认投票";
    btn.onclick = submitVote;
  }
}

function withdrawVote() {
  if (!votedPlayers.has(currentPlayer)) return;
  votedPlayers.delete(currentPlayer);
  var p = document.querySelectorAll(".vote-player")[currentPlayer];
  p.classList.remove("voted");
  p.classList.add("active");
  document.getElementById("pStatus" + currentPlayer).textContent = "投票中";
  var res = document.getElementById("voteResults");
  if (res) {
    res.classList.remove("show");
    res.innerHTML = "";
  }
  updateVoteActionButton();
  rVoteGrid();
}

function switchVoteTab(tab) {
  currentVoteTab = tab;
  document.querySelectorAll(".vote-tab").forEach(function (t) {
    var on = t.getAttribute("data-tab") === tab;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  rVoteGrid();
}

function rVoteGrid() {
  var items = currentVoteTab === "scenic" ? VS : VF;
  var selected = voteData[currentPlayer][currentVoteTab];
  var isLocked = votedPlayers.has(currentPlayer);
  var h = "";
  items.forEach(function (item) {
    var isSel = selected.indexOf(item.id) >= 0;
    h +=
      '<div class="vote-item' +
      (isSel ? " selected" : "") +
      (isLocked ? " locked" : "") +
      '" role="checkbox" aria-checked="' +
      (isSel ? "true" : "false") +
      '" aria-pressed="' +
      (isSel ? "true" : "false") +
      '"' +
      (isLocked
        ? ' aria-disabled="true" tabindex="-1"'
        : ' tabindex="0"') +
      ' aria-label="' +
      (isSel ? "已选 " : "") +
      item.name +
      '" onclick="toggleVote(\'' +
      item.id +
      '\')"><div class="vi-icon" aria-hidden="true" style="background:' +
      (currentVoteTab === "scenic" ? "#e8f5e9" : "#fff3e0") +
      '">' +
      item.icon +
      '</div><div class="vi-info"><div class="vi-name">' +
      item.name +
      '</div><div class="vi-desc">' +
      item.desc +
      '</div></div><div class="vi-check" aria-hidden="true">✓</div></div>';
  });
  document.getElementById("voteGrid").innerHTML = h;
  if (typeof enhanceA11y === "function") enhanceA11y();
}

function toggleVote(id) {
  if (votedPlayers.has(currentPlayer)) return;
  var sel = voteData[currentPlayer][currentVoteTab];
  var idx = sel.indexOf(id);
  if (idx >= 0) sel.splice(idx, 1);
  else sel.push(id);
  rVoteGrid();
}

function submitVote() {
  var sel = voteData[currentPlayer];
  if (sel.scenic.length === 0 && sel.food.length === 0) {
    alert("请至少选择一个景点或美食！");
    return;
  }
  votedPlayers.add(currentPlayer);
  document.getElementById("pStatus" + currentPlayer).textContent = "已投票 ✓";
  var players = document.querySelectorAll(".vote-player");
  players[currentPlayer].classList.remove("active");
  players[currentPlayer].classList.add("voted");
  var next = -1;
  for (var i = 0; i < 4; i++) {
    if (!votedPlayers.has(i)) {
      next = i;
      break;
    }
  }
  if (next >= 0) {
    currentPlayer = next;
    players[next].classList.add("active");
    document.getElementById("pStatus" + next).textContent = "投票中";
    rVoteGrid();
  }
  updateVoteActionButton();
  if (votedPlayers.size === 4) showVoteResults();
}

function assignRanks(list) {
  var lastVotes = null;
  var lastRank = 0;
  list.forEach(function (r, i) {
    if (r.votes !== lastVotes) {
      r.rank = i + 1;
      lastVotes = r.votes;
      lastRank = r.rank;
    } else {
      r.rank = lastRank;
    }
  });
}

function renderResultRow(r, maxVotes, animOrder) {
  var rc =
    r.rank === 1
      ? "gold"
      : r.rank === 2
      ? "silver"
      : r.rank === 3
      ? "bronze"
      : "normal";
  var pct = maxVotes > 0 ? Math.round((r.votes / maxVotes) * 100) : 0;
  var delay = (animOrder || 0) * 60;
  return (
    '<div class="result-item" style="--anim-delay:' + delay + 'ms"><div class="rank ' +
    rc +
    '">' +
    r.rank +
    '</div><div class="ri-info"><div class="ri-name">' +
    r.icon +
    " " +
    r.name +
    '</div><div class="ri-bar"><div class="fill" data-pct="' +
    pct +
    '" style="width:0%;transition-delay:' + (delay + 150) + 'ms"></div></div></div><div class="ri-votes">' +
    r.votes +
    "/4票</div></div>"
  );
}

function showVoteResults() {
  var res = document.getElementById("voteResults");
  res.classList.add("show");
  var counts = {};
  VS.forEach(function (s) {
    counts["s_" + s.id] = 0;
  });
  VF.forEach(function (f) {
    counts["f_" + f.id] = 0;
  });
  for (var p = 0; p < 4; p++) {
    voteData[p].scenic.forEach(function (id) {
      counts["s_" + id]++;
    });
    voteData[p].food.forEach(function (id) {
      counts["f_" + id]++;
    });
  }
  var sr = VS.map(function (s) {
    return { id: s.id, name: s.name, icon: s.icon, votes: counts["s_" + s.id] };
  }).sort(function (a, b) {
    return b.votes - a.votes;
  });
  var fr = VF.map(function (f) {
    return { id: f.id, name: f.name, icon: f.icon, votes: counts["f_" + f.id] };
  }).sort(function (a, b) {
    return b.votes - a.votes;
  });
  assignRanks(sr);
  assignRanks(fr);
  var maxS = sr.length && sr[0].votes > 0 ? sr[0].votes : 1;
  var maxF = fr.length && fr[0].votes > 0 ? fr[0].votes : 1;
  var h = '<h3 style="margin-bottom:16px">📊 投票结果</h3>';
  h += '<h4 style="margin-bottom:12px">🏛️ 最期待景点</h4>';
  sr.forEach(function (r, i) {
    h += renderResultRow(r, maxS, i);
  });
  h += '<h4 style="margin:16px 0 12px">🍲 最期待美食</h4>';
  fr.forEach(function (r, i) {
    h += renderResultRow(r, maxF, sr.length + i);
  });
  var topS = sr[0];
  var topF = fr[0];
  var sd = SD[topS.id];
  var fd = FD[topF.id];
  h +=
    '<div style="margin-top:24px;padding:20px;background:rgba(224,244,255,.58);border-radius:22px;border:1px solid rgba(120,188,232,.28);box-shadow:0 14px 34px rgba(74,128,168,.1)">';
  h += '<h3 style="color:#2f78a8;margin-bottom:12px">🏆 榜首推荐</h3>';
  if (sd)
    h +=
      '<div style="margin-bottom:12px"><strong>' +
      topS.icon +
      " 景点榜首：" +
      sd.n +
      '</strong><br><span style="font-size:.85em;color:#657287">' +
      sd.ds.substring(0, 80) +
      "...</span></div>";
  if (fd)
    h +=
      "<div><strong>" +
      topF.icon +
      " 美食榜首：" +
      fd.n +
      '</strong><br><span style="font-size:.85em;color:#657287">' +
      fd.ds.substring(0, 80) +
      "...</span></div>";
  h += "</div>";
  res.innerHTML = h;
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      res.querySelectorAll(".ri-bar .fill").forEach(function (el) {
        var pct = el.getAttribute("data-pct");
        if (pct != null) el.style.width = pct + "%";
      });
    });
  });
}

renderApp();
