/***********************************************
> 应用名称：墨鱼自用B站去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2023-03-31
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/

const version = "V2.0.114";

let body = $response.body;
if (body) {
  switch (!0) {
    case /pgc\/season\/app\/related\/recommend\?/.test($request.url):
      try {
        let i = JSON.parse(body);
        i.result?.cards?.length > 0 &&
          (i.result.cards = i.result.cards.filter((i) => 2 != i.type)),
          (body = JSON.stringify(i));
      } catch (t) {
        console.log("bilibili recommend:" + t);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/.test(
      $request.url
    ):
      try {
        let a = JSON.parse(body);
        delete a.data?.common_equip, (body = JSON.stringify(a));
      } catch (e) {
        console.log("bilibili skin:" + e);
      }
      break;
    case /^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test(
      $request.url
    ):
      try {
        let s = JSON.parse(body),
          l = [];
        for (let o of s.data.items)
          if (!o.hasOwnProperty("banner_item")) {
            if (
              !(
                !o.hasOwnProperty("ad_info") &&
                -1 === o.card_goto?.indexOf("ad") &&
                [
                  "small_cover_v2",
                  "large_cover_v1",
                  "large_cover_single_v9"
                ].includes(o.card_type)
              )
            )
              continue;
            else l.push(o);
          }
        (s.data.items = l), (body = JSON.stringify(s));
      } catch (d) {
        console.log("bilibili index:" + d);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test(
      $request.url
    ):
      try {
        let b = JSON.parse(body),
          r = [];
        for (let p of b.data.items)
          p.hasOwnProperty("ad_info") ||
            -1 !== p.card_goto.indexOf("ad") ||
            r.push(p);
        (b.data.items = r), (body = JSON.stringify(b));
      } catch (c) {
        console.log("bilibili Story:" + c);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/.test(
      $request.url
    ):
      try {
        let n = JSON.parse(body);
        (n.data.teenagers_status = 0), (body = JSON.stringify(n));
      } catch (u) {
        console.log("bilibili teenagers:" + u);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(
      $request.url
    ):
      try {
        let y = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489]),
          f = JSON.parse(body);
        if (
          (f.data?.tab &&
            (-1 == JSON.stringify(f.data.tab).indexOf("pgc/home")
              ? (f.data.tab = [
                  {
                    id: 39,
                    name: "直播",
                    uri: "bilibili://live/home",
                    tab_id: "直播tab",
                    pos: 1
                  },
                  {
                    id: 40,
                    name: "推荐",
                    uri: "bilibili://pegasus/promo",
                    tab_id: "推荐tab",
                    pos: 2,
                    default_selected: 1
                  },
                  {
                    id: 41,
                    name: "热门",
                    uri: "bilibili://pegasus/hottopic",
                    tab_id: "hottopic",
                    pos: 3
                  },
                  {
                    id: 774,
                    name: "番剧",
                    uri: "bilibili://following/home_activity_tab/6544",
                    tab_id: "bangumi",
                    pos: 4
                  },
                  {
                    id: 151,
                    name: "影视",
                    uri: "bilibili://pgc/cinema-tab",
                    tab_id: "film",
                    pos: 5
                  }
                ])
              : (f.data.tab = [
                  {
                    id: 39,
                    name: "直播",
                    uri: "bilibili://live/home",
                    tab_id: "直播tab",
                    pos: 1
                  },
                  {
                    id: 40,
                    name: "推荐",
                    uri: "bilibili://pegasus/promo",
                    tab_id: "推荐tab",
                    pos: 2,
                    default_selected: 1
                  },
                  {
                    id: 41,
                    name: "热门",
                    uri: "bilibili://pegasus/hottopic",
                    tab_id: "hottopic",
                    pos: 3
                  },
                  {
                    id: 545,
                    name: "番剧",
                    uri: "bilibili://pgc/home",
                    tab_id: "bangumi",
                    pos: 4
                  },
                  {
                    id: 151,
                    name: "影视",
                    uri: "bilibili://pgc/cinema-tab",
                    tab_id: "film",
                    pos: 5
                  }
                ])),
          f.data.top &&
            (f.data.top = [
              {
                id: 481,
                icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
                name: "消息",
                uri: "bilibili://link/im_home",
                tab_id: "消息Top",
                pos: 1
              }
            ]),
          f.data.bottom)
        ) {
          let m = f.data.bottom.filter((i) => y.has(i.id));
          f.data.bottom = m;
        }
        body = JSON.stringify(f);
      } catch (h) {
        console.log("bilibili tabprocess:" + h);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(
      $request.url
    ):
      try {
        let g = JSON.parse(body),
          v = new Set([
            396, 397, 398, 399, 407, 410, 402, 404, 425, 426, 427, 428, 430,
            432, 433, 434, 494, 495, 496, 497, 500, 501
          ]);
        g.data.sections_v2.forEach((i, t) => {
          let a = i.items.filter((i) => v.has(i.id));
          (g.data.sections_v2[t].items = a),
            (g.data.sections_v2[t].button = {}),
            delete g.data.sections_v2[t].be_up_title,
            delete g.data.sections_v2[t].tip_icon,
            delete g.data.sections_v2[t].tip_title,
            ("创作中心" == g.data.sections_v2[t].title ||
              "創作中心" == g.data.sections_v2[t].title) &&
              (delete g.data.sections_v2[t].title,
              delete g.data.sections_v2[t].type);
        }),
          delete g.data.vip_section_v2,
          delete g.data.vip_section,
          g.data.hasOwnProperty("live_tip") && (g.data.live_tip = {}),
          g.data.hasOwnProperty("answer") && (g.data.answer = {}),
          g.data.vip.status ||
            ((g.data.vip_type = 2),
            (g.data.vip.type = 2),
            (g.data.vip.status = 1),
            (g.data.vip.vip_pay_type = 1),
            (g.data.vip.due_date = 466982416e4)),
          (body = JSON.stringify(g));
      } catch (_) {
        console.log("bilibili mypage:" + _);
      }
      break;
    case /^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/.test(
      $request.url
    ):
      try {
        let $ = JSON.parse(body);
        ($.data.activity_banner_info = null),
          $.data?.shopping_info && ($.data.shopping_info = { is_show: 0 }),
          $.data?.new_tab_info?.outer_list &&
            $.data.new_tab_info.outer_list.length &&
            ($.data.new_tab_info.outer_list =
              $.data.new_tab_info.outer_list.filter((i) => 33 != i.biz_id)),
          (body = JSON.stringify($));
      } catch (x) {
        console.log("bilibili live broadcast:" + x);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/.test(
      $request.url
    ):
      try {
        let k = JSON.parse(body);
        k.data && ((k.data.hash = "ddgksf2013"), (k.data.online.icon = "")),
          (body = JSON.stringify(k));
      } catch (w) {
        console.log("bilibili right corner:" + w);
      }
      break;
    case /ecommerce-user\/get_shopping_info\?/.test($request.url):
      try {
        let O = JSON.parse(body);
        O.data &&
          (O.data = {
            shopping_card_detail: {},
            bubbles_detail: {},
            recommend_card_detail: {},
            selected_goods: {},
            h5jump_popup: []
          }),
          (body = JSON.stringify(O));
      } catch (P) {
        console.log("bilibili shopping info:" + P);
      }
      break;
    case /^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/.test(
      $request.url
    ):
      try {
        let W = JSON.parse(body);
        (W.data = {
          type: "history",
          title: "搜索历史",
          search_hotword_revision: 2
        }),
          (body = JSON.stringify(W));
      } catch (j) {
        console.log("bilibili hot search:" + j);
      }
      break;
    case /https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/.test(
      $request.url
    ):
      try {
        let q = JSON.parse(body);
        q.data.vip.status ||
          ((q.data.vip.type = 2),
          (q.data.vip.status = 1),
          (q.data.vip.vip_pay_type = 1),
          (q.data.vip.due_date = 466982416e4)),
          (body = JSON.stringify(q));
      } catch (E) {
        console.log("bilibili 1080p:" + E);
      }
      break;
    case /pgc\/page\/(bangumi|cinema\/tab\?)/.test($request.url):
      try {
        let z = JSON.parse(body);
        z.result.modules.forEach((i) => {
          i.style.startsWith("banner") &&
            (i.items = i.items.filter((i) => -1 != i.link.indexOf("play"))),
            i.style.startsWith("function") &&
              ((i.items = i.items.filter(
                (i) => -1 == i.blink.indexOf("bilibili.com")
              )),
              [1283, 241, 1441, 1284].includes(i.module_id) && (i.items = [])),
            i.style.startsWith("tip") && (i.items = []);
        }),
          (body = JSON.stringify(z));
      } catch (B) {
        console.log("bilibili fanju:" + B);
      }
      break;
    case /^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(
      $request.url
    ):
      try {
        let I = JSON.parse(body);
        if (I.data && I.data.list)
          for (let R of I.data.list)
            (R.duration = 0),
              (R.begin_time = 2240150400),
              (R.end_time = 2240150400);
        body = JSON.stringify(I);
      } catch (S) {
        console.log("bilibili openad:" + S);
      }
      break;
    case /^https:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test(
      $request.url
    ):
      try {
        let T = JSON.parse(body);
        T.data &&
          T.data.card_list &&
          (T.data.card_list = T.data.card_list.filter(
            (i) => "banner_v1" != i.card_type
          )),
          (body = JSON.stringify(T));
      } catch (A) {
        console.log("bilibili xlive:" + A);
      }
      break;
    default:
      $done({});
  }
  $done({ body });
} else $done({});
