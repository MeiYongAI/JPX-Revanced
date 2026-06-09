// ==UserScript==
// @name         HV 新版汉化
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  完全重构后新版的HV汉化脚本
// @author       mbbdzz
// @grant        none
// @icon           https://hentaiverse.org/y/favicon.png
// @match        https://hentaiverse.org/*
// @match        *://*.hentaiverse.org/*
// @match     https://forums.e-hentai.org/index.php?showtopic=*
// @match     https://reasoningtheory.net/*

// ==/UserScript==
(function () {
    'use strict';

    // 日志汉化禁用状态（保存在本地，默认 false 即开启汉化）
    let IS_LOG_TRANS_DISABLED = localStorage.getItem('LogTransDisabled') === 'true';

    // 1. 创建按钮
    const btn = document.createElement('button');
    btn.textContent = '翻译切换开关';

    // 基础样式
    btn.style.position = 'fixed';
    btn.style.zIndex = 9999;
    btn.style.fontSize = '12px';
    btn.style.padding = '4px 8px';
    btn.style.borderRadius = '3px';
    btn.style.backgroundColor = '#4CAF50';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.cursor = 'move';
    btn.style.userSelect = 'none';
    btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

    document.body.appendChild(btn);

    // 2. 读取保存的状态和位置
    let enabled = localStorage.getItem('myScriptEnabled') !== 'false';
    btn.textContent = enabled ? '中' : '英';
    btn.style.backgroundColor = enabled ? '#4CAF50' : '#666'; // 关掉时变灰

    const savedTop = localStorage.getItem('transBtnTop');
    const savedLeft = localStorage.getItem('transBtnLeft');

    // 如果有保存的位置就用保存的，否则用默认位置
    if (savedTop && savedLeft) {
        btn.style.top = savedTop;
        btn.style.left = savedLeft;
    } else {
        btn.style.bottom = '50px';
        btn.style.left = '10px';
    }

    // 3. 实现拖动逻辑
    let isDragging = false;

    btn.addEventListener('mousedown', function(e) {
        isDragging = false;

        // 计算鼠标点击点距离按钮左上角的偏移
        const shiftX = e.clientX - btn.getBoundingClientRect().left;
        const shiftY = e.clientY - btn.getBoundingClientRect().top;

        // 移动处理函数
        function moveAt(pageX, pageY) {
            isDragging = true;

            // 计算新位置
            let newLeft = pageX - shiftX;
            let newTop = pageY - shiftY;

            // 限制不拖出屏幕 (可选)
            const maxLeft = window.innerWidth - btn.offsetWidth;
            const maxTop = window.innerHeight - btn.offsetHeight;
            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));

            // 应用新位置
            btn.style.left = newLeft + 'px';
            btn.style.top = newTop + 'px';
            btn.style.bottom = 'auto';
        }

        // 鼠标移动事件
        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }

        // 监听整个文档的移动
        document.addEventListener('mousemove', onMouseMove);

        // 鼠标松开事件
        btn.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            btn.onmouseup = null;

            // 保存当前位置
            if (isDragging) {
                localStorage.setItem('transBtnTop', btn.style.top);
                localStorage.setItem('transBtnLeft', btn.style.left);
            }
        };
    });

    // 4. 点击切换逻辑
    btn.addEventListener('click', function(e) {
        // 如果刚才是在拖动，就不要触发切换功能
        if (isDragging) {
            isDragging = false; // 重置状态
            return;
        }

        // 正常的切换逻辑
        enabled = !enabled;
        localStorage.setItem('myScriptEnabled', enabled);
        btn.textContent = enabled ? '中' : '英';
        location.reload();
    });

    // 切换脚本状态检查
    if (!enabled) return;

    // =============== 翻译词典 ===============
    const pageTranslations = [
        {
            //顶部导航栏
            //priority: 1,
            selector: "#hvut-top, #popup_box, #navbar, #towerstart > p:nth-of-type(5), #iwinfo",
            //excludeSelector:
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //"原文":"翻译",
                //"原文": {replace: "翻译",style: "样式"},
                'Character' : '角色',
                'Equipment' : '装备',
                'Abilities' : '技能',
                'Training' : '训练',
                'Item Inventory' : '道具',
                'Equip Inventory' : '装备',
                'Settings' : '设置',
                'Equipment Shop' : '装备店',
                'Item Shop' : '道具店',
                'Item Shop Bot' : '采购机器人',
                'Item Backorder' : '采购机器人',
                'The Market' : '交易市场',
                'Monster Lab' : '怪物实验室',
                'The Shrine' : '雪花祭坛',
                'MoogleMail' : '莫古利邮局',
                'The Armory' : '军械库',
                'Weapon Lottery' : '武器彩票',
                'Armor Lottery' : '防具彩票',
                'The Arena' : '竞技场',
                'The Tower' : '塔楼',
                'Ring of Blood' : '浴血擂台',
                'GrindFest' : '压榨界',
                'Item World' : '道具界',
                'Stamina' : '体力',
                'Isekai' : '异世界',
                'ISEKAI' : '异世界',
                'Currently playing on Isekai' : '你当前在异世界中',
                'Season' : '赛季',
                'Click to switch to Persistent' : '点击切换到永久区',
                'Persistent' : '永久区',
                'Currently playing on Persistent' : '你当前在永久区中',
                'Click to switch to Isekai' : '点击切换到异世界',
                'Normal' : '普通✖1 ',
                'Hard' : '困难✖2 ',
                'Nightmare' : '噩梦✖3 ',
                'Hell' : '地狱✖5 ',
                'Nintendo' : '任天堂✖10 ',
                'IWBTH' : 'I Wanna✖15 ',
                'PFUDOR' : '彩虹小马✖20',
                'Repair equipment' : '装备需要修理',
                'Check equipment' : '检查你的装备情况',
                'Great. You receive a 100% EXP Bonus but stamina drains 50% faster.' : '你现在精力充沛，获得额外100%经验加成，但精力消耗速度增加50%（每场战斗消耗0.03精力,异世界加倍）',
                'Normal. You are not receiving any bonuses or penalties.' : '正常，你既不会受到额外的奖励也不会受到惩罚（每场战斗消耗0.02精力,异世界加倍）',
                'Exhausted. You do not receive EXP or drops from monsters, and you cannot gain proficiencies.' : '你已经筋疲力尽，你将无法从怪物处获取任何经验、潜经验、掉落、以及熟练度，直到你的精力恢复到2以上',
                'You have increased stamina drain due to low riddle accuracy' : '由于你的小马图回答正确率太低，你的精力消耗速率被提高了',
            },
            patterns: [
                {
                    //pattern: /正则匹配内容/,
                    //replace: "翻译"
                    //style:"样式"
                },
            ]
        },
        {
            // 全局词典
            priority: 5,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //提示信息
                'Stamina:' : '精力状态:',
                'Insufficient credits.' : 'Credits 不足',
                'There are no items of that type available.' : '购买的物品库存不足',
                'Item has already been sold.' : '所选物品已售出',
                'Invalid item, or item cannot be auto-bought' : '所指定物品无效在或者不能自动购买',
                'Bid price must be at least' : '最低出价为',
                'Insufficient credits.' : 'Credits 不足',
                'No longer available' : '已不存在',
                'Items cannot be sold while locked.' : '无法出售已锁定装备',
                'Items cannot be sold while in use.' : '无法出售正在穿戴装备',
                'Your equipment inventory is full' : '你的装备库存已经满了！',
                'You do not have enough credits for that.' : '你没有足够的 Credits 来执行操作！',
                'Invalid or expired token' : '令牌无效或者已过期',
                'You cannot enter the same arena twice in one day.' : '同一竞技场一天只能进入一次',
                'You cannot enter the Item World while exhausted.' : '你无法在精力耗竭时进入道具界',
                'You cannot start a Grindfest while exhausted.' : '你无法在精力耗竭时进入压榨界',
                'You cannot attempt The Tower again until tomorrow.' : '你今天的塔楼挑战/清通次数已达上限，明天再来吧。',
                'You do not have enough stamina to start a new Arena.' : '你没有足够的精力开始竞技场挑战',
                'You do not have enough stamina to enter this Item World.' : '你没有足够的精力进入道具界挑战',
                'You do not have enough stamina to start a new Grindfest.' : '你没有足够的精力开始压榨界挑战',
                'You do not have enough stamina to enter The Tower.' : '你没有足够的精力进入塔楼挑战',
                'System Message' : '系统信息',
                'Account Suspended' : '账号被禁封',
                'Snowflake and the moogles are relaxing on the beach. Check back later.' : '雪花女神和莫古利正在海滩休息，请稍后再来',
                'Snowflake and the moogles are rebooting the universe. Check back later.' : '雪花女神和莫古利正在重启宇宙，请稍后再来',
                'Snowflake and the moogles are playing in the snow. Check back later.' : '雪花女神和莫古利正在玩雪，请稍后再来',
                'Snowflake and the moogles are pining for spring. Check back later.' : '雪花女神和莫古利渴望春天，请稍后再来',
                'Snowflake and the moogles are remaking the world. Check back later.' : '雪花女神和莫古利正在重做世界，请稍后再来',
                'You cannot enter the item world of a currently equipped item.': "你不能进入已装备物品的道具界",
                //提示
                'Insufficient EXP.' : '可分配属性点不足',
                'Name contains invalid characters' : '名字中包含不支持字符(仅支持英文和数字)',
                'Name must be between 1 and 20 characters.' : '名字长度需要在1至20个字符之间',
                'Requested persona does not exist' : '所选人格角色不存在',
                'You cannot currently create more personas' : '你当前已经没有空余的角色槽可以创建新人格。',
                'Insufficient do-overs.' : '下调数值超过每日限制',
                //全局翻译
                'Item Inventory' : '物品栏',
                'Battle Slots' : '战斗携带品',
                'Your Inventory' : '你的物品',
                'Store Inventory' : '商店物品',
                "Are you sure you wish to purchase": "你确定要花费如下金额购买",
                "Are you sure you wish to sell": "你确定要出售以下道具",
                'Cannot slot item - no free spaces.' : '无法携带物品 - 没有空余的物品槽。',
                'Can only slot consumables' : '你只能携带战斗消耗品',
                'Item is already slotted.' : '只能携带一种同名物品',
                'Slot only takes infusions.' : '所选物品槽只能装配魔药',
                'Slot only takes scrolls.' : '所选物品槽只能装配卷轴',
                'Insufficient items.' : '道具不足',
                'Item is already slotted': '道具已装备',
            },
            patterns: [
                // --- 商店买卖与交易 (Shop & Trade) ---
                { pattern: /Sold it for (.+?) credits/gi, replace: '出售获得了 $1 Credits' },
                { pattern: /Sold ((?:(?!equipment).)+?) for (.+?) Credits/gi, replace: '出售$1获得了 $2 Credits' },
                { pattern: /Sold (.+?) equipment for (.+?) Credits/gi, replace: '出售$1件装备获得了 $2 Credits' },
                { pattern: /Bought ((?:(?!equipment).)+?) for (.+?) Credits/gi, replace: '花费 $2 Credits 购入了 $1' },
                { pattern: /Bought (.+?) equipment for (.+?) Credits/gi, replace: '花费 $2 Credits 购入了 $1 件装备' },

                // --- 技能重置与确认 (Reset & Confirmation) ---
                { pattern: /Reseting this ability will cost ([\d,]+) soul fragments?\. Proceed\?/gi, replace: '重置该技能将消耗 $1 个灵魂碎片，是否执行？' },
                { pattern: /This will reset ALL mastery and ability point assignments at a cost of ([\d,]+) soul fragments?\. Proceed\?/gi, replace: '此操作将重置所有技能点和精通点，本次重置将消耗 $1 个灵魂碎片。是否执行？' },

                // --- 装备批量操作警告 (Equipment Selection) ---
                { pattern: /You have selected ([^a]+?) SOULBOUND equipment\./g, replace: '你选中了$1件魂绑装备' },
                { pattern: /You have selected ([^a]+?) LEGENDARY equipment\./g, replace: '你选中了$1件传奇装备' },
                { pattern: /You have selected ([^a]+?) PEERLESS equipment\./g, replace: '你选中了$1件无双装备' },
            ]
        },
        {
            // 角色界面与属性侧边栏
            selector: "#stats_scrollable, #eqch_left",
            priority: 2,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                'One-handed' : '单手武器',
                'Two-handed' : '双手武器',
                'Dual-wielding' : '双持武器',
                'Staff' : '法杖',
                'Light armor' : '轻甲',
                'Cloth armor' : '布甲',
                'Heavy armor' : '重甲',
                'Strength' : '力量',
                'Dexterity' : '灵巧',
                'Agility' : '敏捷',
                'Endurance' : '体质',
                'Intelligence' : '智力',
                'Wisdom' : '智慧',
                'Evade' : '闪避',
                'Block' : '格挡',
                'Parry' : '招架',
                'Resist' : '抵抗',
                'Compromise' : '装备影响',
                'Interference' : '干涉',
                'Burden' : '负重',
                'Cloth Armor':'布甲',
                'Light Armor':'轻甲',
                'Heavy Armor':'重甲',
                'Damage Mitigation' : '属性减伤',
                'Overwhelming Strikes on hit' : '压制打击触发率',
                'Counter-Attack on block/parry' : '格挡/招架时触发反击率',
                'Coalesced Mana on spell hit' : '魔力合流触发率',
                'Active persona' : '当前激活角色',
                'Used persona slots' : '已使用的角色栏',
                'Primary attributes' : '主属性',
                'Equipment proficiency' : '武器/装备熟练度',
                'Magic proficiency' : '法杖/魔法熟练度',
                'Elemental' : '元素魔法',
                'Divine' : '神圣魔法',
                'Forbidden' : '黑暗魔法',
                'Supportive' : '增益魔法',
                'Deprecating' : '减益魔法',
                'Mainhand Attack' : '主手攻击',
                'Offhand Attack' : '副手攻击',
                'Slashing Damage' : '斩击伤害',
                'Accuracy' : '命中值',
                'Crit Multiplier' : '暴击伤害',
                'Attack Speed Bonus' : '攻击速度加成',
                'Domino Strike on hit' : '概率触发顺劈斩',
                'Magic Attack' : '魔法伤害',
                'Mana Cost Modifier' : '魔法消耗修正',
                'Cast Speed Bonus' : '施法速度加成',
                'Damage Bonus' : '伤害加成',
                'Spell Damage Bonus' : '法术伤害加成',
                'Vitals' : '属性值',
                'Base Health' : '基础生命',
                'Base Mana' : '基础魔力',
                'Base Spirit' : '基础灵力',
                'Mana Regen' : '魔力再生',
                'Spirit Regen' : '灵力再生',
                'Avoidance' : '伤害规避',
                'Physical' : '物理',
                'Magical' : '魔法',
                'Fire' : '火焰',
                'Cold' : '冰冷',
                'Elec' : '闪电',
                'Wind' : '疾风',
                'Holy' : '神圣',
                'Dark' : '黑暗',
                'Slashing Damage' : '斩击伤害',
                'Crushing Damage' : '打击伤害',
                'Piercing Damage' : '刺击伤害',
                'Dark Damage' : '黑暗伤害',
                'Holy Damage' : '神圣伤害',
                'Cold Damage' : '寒冰伤害',
                'Fire Damage' : '火焰伤害',
                'Wind Damage' : '疾风伤害',
                'Elec Damage' : '闪电伤害',
                'Void Damage' : '虚空伤害',
                'Slashing' : '斩击',
                'Crushing' : '打击',
                'Piercing' : '刺击',
                'Spell' : '法术',
                'Effective Primary Stats' : '有效主属性',
                'Effective Proficiency' : '有效熟练度',
            }
        },
        {
            // 装备栏位
            priority: 2,
            selector: "#eqsb, #equipselect_left, .hvut-bt-equip, .eqselall",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                'Equipment Slots' : '套装栏',
                'Main Hand' : '🖐️主手',
                'Off Hand' : '🤚副手',
                'Empty Slot' : '空槽位',
                'Empty' : '空',
                'Soulbound' : '灵魂绑定',
                'Body' : '🥼身体',
                'Hands' : '🤲手部',
                'Legs' : '🦵腿部',
                'Feet' : '👣足部',
                '(empty)' : '空',
                '(unavailable with current mainhand)' : '当前主手无法搭配副手装备',
                'Unequip Current' : '脱下装备',
                'Equip Selected' : '装备选中',
                'There are no available equipment of this type.' : '此类别下无可用装备',
            }
        },
        {
            //道具分类标签
            //priority: 1,
            selector:"#filterbar, #popup_box",
            //excludeSelector:
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //"原文":"翻译",
                'All' : '全部',
                'Restoratives' : '回复品',
                'Infusions' : '魔药',
                'Scrolls' : '卷轴',
                'Crystals' : '水晶',
                'Materials' : '材料',
                'Special' : '特殊',
                'Trophy': '奖杯',
                'Consumable': '消耗品',
                'Consumables': '消耗品',
                'Artifact': '文物',
                'Artifacts': '文物',
                'Token': '令牌',
                'Crystal': '水晶',
                'Trophies': '奖杯',
                'Material': '材料',
                'Collectable': '收藏品',
                'Monster Food': '怪物食物',
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            //装备分类标签
            //priority: 1,
            selector:".hvut-eqp-type, .hvut-eqp-category",
            //excludeSelector:
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=(?:Bazaar&ss=am|Character&ss=(?:eq&equip_slot|in))/
                }
            ],
            translations: {
                //"原文":"翻译",
                'Protected Equipment' : '被保护装备',
                'Surtr' : '苏尔特(火法伤+)',
                'Niflheim' : '尼芙菲姆(冰法伤+)',
                'Mjolnir' : '姆乔尔尼尔(电法伤+)',
                'Freyr' : '弗瑞尔(风法伤+)',
                'Heimdall' : '海姆达(圣法伤+)',
                'Fenrir' : '芬里尔(暗法伤+)',
                'the Elementalist' : '元素使(元素熟练+)',
                'the Heaven-sent' : '天堂(神圣熟练+)',
                'the Demon-fiend' : '恶魔(黑暗熟练+)',
                'the Earth-walker' : '地行者(增益熟练+)',
                'the Curse-weaver' : '织咒者(减益熟练+)',
                'the Ox' : ' 公牛(力量+)',
                'the Raccoon' : ' 浣熊(灵巧+)',
                'the Cheetah' : ' 猎豹(敏捷+)',
                'the Turtle' : ' 乌龟(体质+)',
                'the Fox' : ' 狐狸(智力+)',
                'the Owl' : ' 猫头鹰(智慧+)',
                'the Slaughter' : ' 杀戮(攻击+)',
                'the Balance' : ' 平衡(命中暴伤+)',
                'the Swiftness' : ' 迅捷(攻速+)',
                'the Vampire' : ' 吸血鬼(10%回血)',
                'the Illithid' : ' 汲灵(5%回血+吸魔)',
                'the Banshee' : ' 女妖(5%回血+吸灵)',
                'the Nimble' : ' 灵活(招架+)',
                'the Battlecaster' : ' 战法师(魔耗-魔命+无干涉)',
                'the Destruction' : ' 毁灭(法伤+)',
                'the Focus' : ' 专注(魔命+法暴伤+魔耗-)',
                'the Barrier' : ' 屏障(格挡+)',
                'Warding' : ' 护佑(魔减伤+)',
                'Protection' : ' 保护(物减伤+)',
                'the Dampening' : ' 抑制(打减伤+)',
                'the Stoneskin' : ' 石肤(斩减伤+)',
                'the Deflection' : ' 偏转(刺减伤+)',
                'the Shadowdancer' : ' 影武者(闪避攻暴+)',
                'the Arcanist' : ' 秘法(智力智慧魔命+)',
                'the Fleet' : ' 迅捷(闪避+)',
                'the Negation' : ' 否定(抵抗+)',
                'the Stone-skinned' : ' 石肤者(物减伤+)',
                'the Fire-eater' : ' 吞火者(火抗+)',
                'the Frost-born' : ' 冰诞者(冰抗+)',
                'the Thunder-child' : ' 雷之子(电抗+)',
                'the Wind-waker' : ' 驭风者(风抗+)',
                'the Thrice-blessed' : ' 恩典(圣抗+)',
                'the Spirit-ward' : ' 魂护(暗抗+)',
                'suffixless' : ' 无后缀',
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            // 装备属性
            priority: 1,
            excludeSelector:"#equipblurb, .postdetails, .signature, .copyright",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?(?:equip|\?s=(?:Bazaar&ss|Character&ss|Battle&ss=iw))/
                },
                { mode: "prefix", match: "https://forums.e-hentai.org/index.php?showtopic" },
            ],
            translations: {
                //装备状态
                'Condition:':'耐久度:',
                'Untradeable':'不可交易',
                'Tradeables':'可交易',
                'Tradeable':'可交易',
                'Level ':'等级 ',
                'Soulbound':'灵魂绑定',
                'Unassigned':'未确定',
                'Tier':'阶级',
                'MAX' : '已满级',
                'Upgrade Equipment' : '升级装备',
                'Salvaged - Repair Required' : '已分解 - 需要完全修理',
                //装备类型
                'One-Handed' : '单手武器',
                'Two-Handed' : '双手武器',
                'One-handed Weapon':'单手武器',
                'Two-handed Weapon':'双手武器',
                'Staffs' : '法杖',
                'Shield' : '盾牌',
                'Staff':'法杖',
                'Cloth Armor':'布甲',
                'Light Armor':'轻甲',
                'Heavy Armor':'重甲',
                'Cloth':'布甲',
                'Light':'轻甲',
                'Heavy':'重甲',
                //装备属性
                'Ether Tap':'魔力回流',
                'Bleeding Wound':'流血',
                'Penetrated Armor':'穿甲',
                'Stunned':'眩晕',
                'Siphon Spirit':'灵力吸取',
                'Siphon Magic':'魔力吸取',
                'Siphon Health':'生命吸取',
                'Ether Theft':'魔力回流',
                'Lasts for':'持续',
                ' turns':' 回合',
                ' turn':' 回合',
                'DOT':'持续伤害比例',
                'Spell Damage':'法术伤害加成',
                'Elemental Strike':'属性打击',
                'Fire Strike':'火焰打击',
                'Cold Strike':'冰霜打击',
                'Lightning Strike':'闪电打击',
                'Elec Strike':'闪电打击',
                'Wind Strike':'疾风打击',
                'Holy Strike':'神圣打击',
                'Dark Strike':'黑暗打击',
                'Void Strike':'虚空打击',
                'Damage Mitigation':'属性减伤',
                'Spell Damage Bouns':'魔法伤害加成',
                'Fire':'火焰 ',
                'Cold':'冰霜 ',
                'Elec':'闪电 ',
                'Wind':'疾风 ',
                'Holy':'神圣 ',
                'Dark':'黑暗 ',
                'Void':'虚空 ',
                'Crushing':'打击',
                'Piercing':'刺击',
                'Slashing':'斩击',
                'Magic Crit Damage':'魔法暴击伤害',
                'Attack Crit Damage':'攻击暴击伤害',
                'Attack Accuracy':'攻击命中值',
                'Attack Critical':'攻击暴击率',
                'Attack Damage':'攻击伤害',
                'Parry':'招架值',
                'Magic Damage':'魔法伤害',
                'Magic Critical':'魔法暴击率',
                'Mana Conservation':'魔力消耗降低',
                'Counter-Resist':'反抵抗率',
                'Counter-resist':'反抵抗率',
                'Physical Mitigation':'物理减伤',
                'Magical Mitigation':'魔法减伤',
                'Block':'格挡值',
                'Evade':'回避值',
                'Casting Speed':'施法速度',
                'Resist':'抵抗值',
                'Spell Crit':'法术暴击率',
                'Attack Crit Damage':'攻击爆击伤害',
                'Magic Accuracy':'魔法命中值',
                '攻击 Accuracy':'攻击命中值',
                'Counter-parry':'反招架值',
                'Counter-parry':'反招架值',
                'Attack Speed':'攻击速度',
                'MP Bonus':'魔力加成',
                'HP Bonus':'生命加成',
                'Burden':'负重',
                'Interference':'干涉',
                'Energy':'电量',
                'chance':'几率',
                'Proficiency':'熟练度加成',
                'Elemental':'元素魔法',
                'Divine':'神圣魔法',
                'Forbidden':'黑暗魔法',
                'Deprecating':'减益魔法',
                'Supportive':'增益魔法',
                'Primary Attributes':'主属性加成',
                'Strength':'力量',
                'Dexterity':'灵巧',
                'Agility':'敏捷',
                'Endurance':'体质',
                'Intelligence':'智力',
                'Wisdom':'智慧',
                //强化区 待确认
                'Upgrades and Enchantments':'强化与附魔',
                'None':'无',
                'Physical':'物理',
                'Magical':'魔法',
                'Damage':'伤害',
                'Defense':'防御',
                'Mitigation':'减伤',
                'Hit Chance':'命中值',
                'Crit Chance':'暴击率',
                'Bonus':'加成',
                //装备来源与状态
                'Dropped by' : '掉落于',
                'Current Owner' : '现持有人',
                'Equipment Shop' : '装备店',
                'Rewarded as a Clear Bonus to' : '作为竞技场通关奖励给与',
                'Rewarded from Snowflake\'s Shrine to' : '作为雪花祭坛献祭奖励给予',
                //装备品质
                'Flimsy' : '脆弱',
                'Crude' : '粗糙',
                'Fair' : '普通',
                'Average' : '中等 ',
                'Superior' : '上等',
                'Fine' : '优质 ',
                'Exquisite' : '✧精良✧',
                'Magnificent' : '☆史诗☆',
                'Legendary' : '✪传奇✪',
                'Peerless' : '☯无双☯',
                //单手武器类型
                'Axe' : '🪓斧(单)',
                'Club' : '🦯棍(单)',
                'Rapier' : '🤺西洋剑(单)',
                'Shortsword' : '⚔️短剑(单)',
                'Wakizashi' : '🔪脇差(单)',
                'Dagger' : '🗡️匕首(单)',
                //双手武器类型
                'Estoc' : '🤺刺剑(双)',
                'Longsword' : '⚔️长剑(双)',
                'Katana' : '※太刀(双)',
                'Scythe' : '𖤠镰刀(双)',
                'Mace' : '🔨战锤(双)',
                'Great Mace' : '🔨战锤(双)',
                'Swordchucks' : '⚔︎锁链双剑(双)',
                'Staff' : '🧙‍♂️法杖(双)',
                //盾类型
                'Buckler' : '🛡️小圆盾(副)',
                'Kite Shield' : '🔰鸢盾(副)',
                'Tower Shield' : '🚪塔盾(副)',
                'Force Shield' : '力场盾(副)',
                //法杖类型
                'Oak' : '橡木(增益熟练+圣法伤+)',
                'Redwood' : '红木(元素熟练/法伤+)',
                'Willow' : '柳木(减益熟练+暗法伤+)',
                'Katalox' : '铁木(圣暗熟练/法伤+)',
                'Ebony':'乌木(元素圣暗熟练/法伤+)',
                //护甲材质
                'Silk' : '丝绸(布)',
                'Gossamer' : '薄纱(布)',
                'Cotton' : '棉布(布)',
                'Ironsilk' : '铁丝(布)',
                'Drakehide ': '龙皮(轻)',
                'Kevlar' : '凯夫拉(轻)',
                'Leather' : '皮革(轻)',
                'Chain': '锁链(重)',
                'Plate' : '板甲(重)',
                //稀有护甲类型
                'Phase' : '相位(布)',
                'Shade' : '暗影(轻)',
                'Power': '动力(重)',
                'Reactive':'反应装甲(重)',
                //护甲部位
                'Cap' : '🪖帽 ',
                'Helmet' : '🪖头盔',
                'Robe' : '🥼长袍',
                'Breastplate' : '🥼护胸',
                'Cuirass' : '🥼胸甲',
                'Power Armor' : '动力(重) 🥼盔甲',
                'Gloves' : '🤲手套',
                'Gauntlets' : '🤲手甲',
                'Pants' : '🦵裤子',
                'Leggings' : '🦵绑腿',
                'Greaves' : '🦵护胫',
                'Shoes' : '👣鞋子',
                'Boots' : '👣靴子',
                'Sabatons' : '👣马靴',
                //前缀
                'Fiery' : '灼热(火法伤+)',
                'Arctic' : '极寒(冰法伤+)',
                'Shocking' : '闪电(电法伤+)',
                'Tempestuous' : '风暴(风法伤+)',
                'Hallowed' : '神圣(圣法伤+)',
                'Demonic' : '恶魔(暗法伤+)',
                'Ethereal' : '虚空(无负重干涉)',
                'Reinforced' : '加固的(斩打刺减伤+)',
                'Radiant' : '✪魔光的✪(法伤+)',
                'Mystic' : '神秘的(法爆伤+)',
                'Charged' : '充能的(施速+)',
                'Frugal' : '节能的(魔耗-)',
                'Mithril' : '秘银的(负重-)',
                'Agile' : '俊敏的(攻速+)',
                'Savage' : '残暴的(攻暴伤+)',
                'Shielding' : '盾化的(格挡+)',
                'Amber' : '琥珀的(电抗+)',
                'Zircon' : '锆石的(圣抗+)',
                'Jade' : '翡翠的(风抗+)',
                'Cobalt' : '钴石的(冰抗+)',
                'Ruby' : '红宝石(火抗+)',
                'Onyx' : '缟玛瑙(暗抗+)',
                //后缀
                ' of Slaughter' : ' 杀戮(攻击+)',
                ' of Balance' : ' 平衡(命中暴伤+)',
                ' of Swiftness' : ' 迅捷(攻速+)',
                ' of the Vampire' : ' 吸血鬼(10%回血)',
                ' of the Illithid' : ' 汲灵(5%回血+吸魔)',
                ' of the Banshee' : ' 女妖(5%回血+吸灵)',
                ' of the Nimble' : ' 灵活(招架+)',
                ' of the Battlecaster' : ' 战法师(魔耗-魔命+无干涉)',
                ' of Destruction' : ' 毁灭(法伤+)',
                ' of Focus' : ' 专注(魔命+法暴伤+魔耗-)',
                ' of Surtr' : ' 苏尔特(火法伤+)',
                ' of Niflheim' : ' 尼芙菲姆(冰法伤+)',
                ' of Mjolnir' : ' 姆乔尔尼尔(电法伤+)',
                ' of Freyr' : ' 弗瑞尔(风法伤+)',
                ' of Heimdall' : ' 海姆达(圣法伤+)',
                ' of Fenrir' : ' 芬里尔(暗法伤+)',
                ' of the Elementalist' : ' 元素使(元素熟练+)',
                ' of the Heaven-sent' : ' 天堂(神圣熟练+)',
                ' of the Demon-fiend' : ' 恶魔(黑暗熟练+)',
                ' of the Earth-walker' : ' 地行者(增益熟练+)',
                ' of the Curse-weaver' : ' 织咒者(减益熟练+)',
                ' of the Barrier' : ' 屏障(格挡+)',
                ' of Warding' : ' 护佑(魔减伤+)',
                ' of Protection' : ' 保护(物减伤+)',
                ' of Dampening' : ' 抑制(打减伤+)',
                ' of Stoneskin' : ' 石肤(斩减伤+)',
                ' of Deflection' : ' 偏转(刺减伤+)',
                ' of the Shadowdancer' : ' 影武者(闪避攻暴+)',
                ' of the Arcanist' : ' 秘法(智力智慧魔命+)',
                ' of the Fleet' : ' 迅捷(闪避+)',
                ' of Negation' : ' 否定(抵抗+)',
                ' of the Stone-skinned' : ' 石肤者(物减伤+)',
                ' of the Fire-eater' : ' 吞火者(火抗+)',
                ' of the Frost-born' : ' 冰诞者(冰抗+)',
                ' of the Thunder-child' : ' 雷之子(电抗+)',
                ' of the Wind-waker' : ' 驭风者(风抗+)',
                ' of the Thrice-blessed' : ' 恩典(圣抗+)',
                ' of the Spirit-ward' : ' 魂护(暗抗+)',
                ' of the Ox' : ' 公牛(力量+)',
                ' of the Raccoon' : ' 浣熊(灵巧+)',
                ' of the Cheetah' : ' 猎豹(敏捷+)',
                ' of the Turtle' : ' 乌龟(体质+)',
                ' of Turtle' : ' 乌龟(体质+)',
                ' of the Fox' : ' 狐狸(智力+)',
                ' of the Owl' : ' 猫头鹰(智慧+)',
                //旧版词缀
                'Bronze' : '铜',
                'Iron' : '铁',
                'Silver' : '银',
                'Steel' : '钢',
                'Gold' : '金',
                'Platinum' : '白金',
                'Titanium' : '钛',
                'Emerald' : '祖母绿',
                'Sapphire' : '蓝宝石',
                'Diamond' : '金刚石',
                'Prism' : '光棱',
                'trimmed' : ' 镶边',
                'adorned' : ' 装饰',
                'tipped' : ' 前端',
                'Astral' : '五芒星',
                'Quintessential' : '第五元素',
                ' of Priestess' : ' 牧师',
                ' of the Hulk' : ' 巨物(虚空抗+)',
            },
            patterns: [
                {
                    pattern: /Dropped by (.+?) for/,
                    replace: (m, source) => `掉落于 "${source}",获得者`
        },
                {
                    pattern: /on (\d{4}-\d{2}-\d{2})/,
                    replace: (m, d) => `掉落时间: ${d} `
        },
            ]
        },
        {
            // 技能页
            priority: 2,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Character&ss=ab/
                }
            ],
            translations: {
                //共通
                'Current Tier' : '当前等级',
                'Next Tier' : '下一等级',
                'Not Acquired' : '未获得',
                'At Maximum' : '已满级',
                'Ability Points' : '技能点',
                'Mastery Points' : '支配点',
                ' and ' : '和 ',
                ' or ' : ' 或者 ',
                'Click or drag an unlocked ability to fill slot.' : '点击或者拖曳一个已解锁技能到此处安装',
                'This will reset ALL mastery and ability point assignments. This time it is free. Proceed?' : '这将重置所有已分配的技能点与精通点,本次重置是免费的,确定吗?',
                'Reseting this ability is free this time. Proceed?' : '重置本项能力本次是免费的,继续吗?',
                'Unlock Cost:' : '解锁消耗',
                'Maxed' : '已满级',
                'max' : '已满',
                'Ability Points' : '技能点',
                'Mastery Points' : '精通点',
                'Mastery Point' : '精通点',
                'AP' : '技能点',
                'Cost:' : '消耗:',
                'Requires' : '需要 ',
                'Level' : '等级',
                'Ability is already slotted' : '技能已装备',
                'No slot available that fits the given ability' : '没有合适的空槽位适合该技能',
                'The slot does not fit the given ability' : '所选技能不能装备在该槽位上',
                'That slot is already unlocked' : '所指定槽位已解锁',
                'No such slot' : '所指定槽位不存在',
                'Insufficient ability points' : '技能点不足',
                'Insufficient mastery points' : '支配点不足',
                'Ability cannot be increased further' : '技能已满级',
                'No such ability' : '你没有获得该技能',
                'Level requirements not met' : '你还没有到达解锁该技能要求的等级',
                //技能名
                'HP Tank' : '生命值增幅',
                'MP Tank' : '魔力值增幅',
                'SP Tank' : '灵力值增幅',
                'Better Health Pots' : '生命药水效果加成',
                'Better Mana Pots' : '魔力药水效果加成',
                'Better Spirit Pots' : '灵力药水效果加成',
                '2H Damage' : '双手流伤害加成',
                '1H Damage' : '单手流伤害加成',
                'DW Damage' : '双持流伤害加成',
                'Light Acc' : '轻甲套命中值加成',
                'Light Crit' : '轻甲套暴击伤害加成',
                'Light Speed' : '轻甲套攻速加成',
                'Light HP/MP' : '轻甲套生命/魔力值加成',
                '1H Accuracy' : '单手流命中值加成',
                '1H Block' : '单手流格挡值加成',
                '2H Accuracy' : '双手流命中值加成',
                '2H Parry' : '双手流招架值加成',
                'DW Accuracy' : '双持流命中值加成',
                'DW Crit' : '双持流暴击伤害加成',
                'Staff Spell Damage' : '法杖流魔法伤害加成',
                'Staff Accuracy' : '法杖流全域命中值加成',
                'Staff Damage' : '法杖流攻击伤害加成',
                'Cloth Spellacc' : '布甲套法术命中值加成',
                'Cloth Spellcrit' : '布甲套法术暴击加成',
                'Cloth Castspeed' : '布甲套施法速度加成',
                'Cloth MP' : '布甲套魔力值加成',
                'Heavy Crush' : '重甲套打击减伤加成',
                'Heavy Prcg' : '重甲套刺击减伤加成',
                'Heavy Slsh' : '重甲套斩击减伤加成',
                'Heavy HP' : '重甲套生命值加成',
                'Better Weaken' : '强力虚弱',
                'Faster Weaken' : '快速虚弱',
                'Better Imperil' : '强力陷危',
                'Faster Imperil' : '快速陷危',
                'Better Blind' : '强力致盲',
                'Faster Blind' : '快速致盲',
                'Mind Control' : '精神控制',
                'Better Silence' : '强力沉默',
                'Better MagNet' : '强力魔磁网',
                'Better Immobilize' : '强力固定术',
                'Better Slow' : '强力缓慢',
                'Better Drain' : '强力枯竭',
                'Faster Drain' : '快速枯竭',
                'Ether Theft' : '魔力窃取',
                'Spirit Theft' : '灵力窃取',
                'Better Haste' : '强力急速',
                'Better Shadow Veil' : '强力影纱',
                'Better Absorb' : '强力吸收',
                'Stronger Spirit' : '强力灵能力',
                'Better Heartseeker' : '强力觅心者',
                'Better Arcane Focus' : '强力奥数集成',
                'Better Regen' : '强力细胞活化',
                'Better Cure' : '强力治疗',
                'Better Spark' : '强力生命火花',
                'Better Protection' : '强力守护',
                'Flame Spike Shield' : '烈焰刺盾',
                'Frost Spike Shield' : '冰霜刺盾',
                'Shock Spike Shield' : '闪电刺盾',
                'Storm Spike Shield' : '风暴刺盾',
                'Conflagration' : '火灾',
                'Cryomancy' : '冰灾',
                'Havoc' : '雷灾',
                'Tempest' : '风灾',
                'Sorcery' : '巫术',
                'Elementalism' : '自然崇拜者',
                'Archmage' : '大法师',
                'Better Corruption' : '强力腐败',
                'Better Disintegrate' : '强力瓦解',
                'Better Ragnarok' : '强力诸神黄昏',
                'Ripened Soul' : '成熟的灵魂',
                'Dark Imperil' : '黑暗陷危',
                'Better Smite' : '强力惩戒',
                'Better Banish' : '强力放逐',
                'Better Paradise' : '强力失乐园',
                'Soul Fire' : '焚烧的灵魂',
                'Holy Imperil' : '神圣陷危',

                //常规页
                'Direct Player Stat Modification' : '直接改变玩家的属性修正值',
                'Increases your maximum HP. This adds 10% to your total HP per tier.' : '增加你的最大HP,每一级增加10%你的总HP',
                'Increases your maximum MP. This adds 10% to your total MP per tier.' : '增加你的最大HP,每一级增加10%你的总MP',
                'Increases your maximum SP. This adds 10% to your total SP per tier.' : '增加你的最大HP,每一级增加10%你的总SP',
                'Increases your maximum HP and MP' : '增加你的最大HP和MP ',
                'Maximum Health' : '最大生命',
                'Maximum Magic' : '最大魔力',
                'Maximum Spirit' : '最大灵力',
                'Items Modified' : '道具性能变化',
                'Effect Over Time' : '持续效果',
                'Restores ' : '每隔一段时间恢复',
                'Health Potion' : '生命药水',
                'Health Draught' : '生命饮剂',
                'Mana Potion' : '法力药水',
                'Mana Draught' : '法力饮剂',
                'Spirit Potion' : '灵力药水',
                'Spirit Draught' : '灵力饮剂',
                'Refreshment' : '灵力饮剂',
                'Regeneration' : '生命饮剂',
                'Replenishment' : '魔力饮剂',

                ' per tick' : '',
                'of Base Health' : '基础生命',
                'of Base Magic' : '基础魔力',
                'of Base Spirit' : '基础灵力',
                'Improves the overall potency of common' : '增加',
                'health restoratives.' : '生命药剂的药效',
                'mana restoratives.' : '魔力药剂的药效',
                'spirit restoratives.' : '灵力药剂的药效',
                'When Used' : '使用时',
                'Instantly restores ' : '立即恢复',

                //武器和装备技能
                'Increases your damage' : '增加你的攻击伤害，',
                'Increases your spell damage' : '增加你的魔法伤害，',
                'Increases your critical chance' : '增加你的攻击暴击率，',
                'Increases your accuracy' : '增加你的攻击命中值，',
                'Increases your spell accuracy' : '增加你的法术命中值，',
                'Increases your attack and magic accuracy' : '增加你的攻击和法术命中值，',
                'Increases your block' : '增加你的格挡值，',
                'Increases your parry and block' : '增加你的格挡值与招架值 ',
                'Increases your attack accuracy' : '增加你的攻击命中值，',
                'Increases your spell critical chance' : '增加你的法术暴击率，',
                'Increases your attack speed' : '增加你的攻击速度，',
                'Increases your attack crit damage' : '增加你的攻击暴击伤害，',
                'Increases your spell casting speed' : '增加你的施法速度，',
                'Increases your crushing mitigation' : '增加你的打击减伤，',
                'Increases your piercing mitigation' : '增加你的刺击减伤，',
                'Increases your slashing mitigation' : '增加你的斩击减伤，',
                'Increases your critical damage' : '增加你的攻击暴击伤害，',
                'Increases your spell critical damage' : '增加你的法术暴击伤害，',
                ' when using only ' : '当你穿戴全套 ',
                ' when using mostly ' : '当你穿戴至少三件 ',
                ' when using the ' : '当你使用 ',
                'cloth armor, ':'布甲 时，',
                'light armor, ':'轻甲 时，',
                'heavy armor, ':'重甲 时，',
                'fighting style' : '战斗风格时',
                'scaling with your proficiency.' : '加成量与你的熟练度成正比。',
                'Proficiency-based Stat Modification' : '根据熟练度改变加成值',
                'For every ten points of' : '每10点',
                'One-Handed' : '单手',
                'Two-Handed' : '双手',
                'Weapon' : '武器',
                'Niten' : '二天一流',
                'Niten Ichiryu' : '二天一流',
                'Dual-Wielding' : '双持',
                'Staff' : '法杖',
                'Cloth Armor':'布甲',
                'Light Armor':'轻甲',
                'Heavy Armor':'重甲',
                'Deprecating':'减益魔法',
                'Supportive':'增益魔法',
                'Elemental':'元素魔法',
                'Elemental mage':'元素法师',
                'Forbidden':'禁忌魔法',
                'Divine':'神圣魔法',
                'Abilities':'能力',
                'Proficiency, adds' : '熟练度 获得',
                'Attack Base Damage' : '基础攻击伤害',
                'Magic Base Damage' : '基础魔法伤害',
                'Attack Accuracy' : '攻击命中值',
                'Attack Speed' : '攻击速度',
                'Magic Cast Speed' : '施法速度',
                'Magic Accuracy' : '魔法命中值',
                'Block Chance' : '格挡值',
                'Parry Chance' : '招架值',
                'Attack Critical Multiplier' : '攻击暴击伤害',
                'Spell Critical Multiplier' : '法术暴击伤害',
                'Crit Multiplier' : '暴击伤害',
                'Crushing Mitigation':'打击减伤',
                'Piercing Mitigation':'刺击减伤',
                'Slashing Mitigation':'斩击减伤',
                'Physical Mitigation' : '物理减伤',
                'Magical Mitigation' : '魔法减伤',
                'Spells Modified' : '咒语效果变化',
                'Effects Modified' : '效果变化',

                'Sleep, Confuse' : '沉睡,混乱',
                'Fiery Blast, Freeze, Shockblast, Gale' : '炎爆术(Ⅰ),冰冻(Ⅰ),烈风(Ⅰ),惩戒(Ⅰ)',
                'Inferno, Blizzard, Chained Lightning, Downburst' : '地狱火(Ⅱ),暴风雪(Ⅱ),连锁闪电(Ⅱ),下击暴流(Ⅱ)',
                'Flames of Loki, Fimbulvetr, Wrath of Thor, Storms of Njord' : '邪神之火(Ⅲ),芬布尔之冬(Ⅲ),雷神之怒(Ⅲ),尼奥尔德风暴(Ⅲ)',

                //DEBUFF技能说明
                'Increases the duration and damage decrease granted by Weaken' : '增加“虚弱”法术的持续时间和伤害弱化效果.',
                'Increases Damage Decrease to ' : '伤害弱化效果提高至 ',
                'Decreases the casttime and cooldown of weaken. Higher levels also increase the number of targets affected per cast' : '缩短“虚弱”的施放时间和冷却时间。高等级也增加每次施放影响的目标数。',
                'Changes cooldown to' : '改变冷却时间至',
                ' turns' : ' 回合',
                'Changes max affected targets to' : '改变受影响的最大目标数至',
                'Changes cast time to' : '改变施法时间至',
                'Changes base mana cost to' : '改变基础魔力消耗至',
                'Changes effect duration to' : '改变效果持续时间至',
                'Increases the duration and defensive penalties caused by Imperil.' : '增加“陷危”的持续时间和降防效果。',
                'Decreases the casttime and cooldown of Imperil. Higher levels also increase the number of targets affected per cast.' : '缩短“陷危”的施放时间和冷却时间。高等级也增加每次施放影响的目标数。',
                'Increase the duration and hit penalty caused by the Blind spell.' : '增加“致盲”的持续时间和命中值低下效果。',
                'Decreases the cooldown and casttime on the Blind spell. Higher levels also increase the number of targets affected per cast.' : '缩短“致盲”咒语的冷却时间和施放时间。高等级也增加每次施放影响的目标数。',
                'Increase the duration and decrease the chance that Sleep and Confuse will break upon taking damage. Higher levels also increase the number of targets affected per cast.' : '增加“沉眠”和“混乱”的持续时间并且降低受到伤害后解除状态的机率。高等级也增加每次施放影响的目标数。',
                'Increase the duration and decrease the cooldown of the Silence spell. Higher levels also increase the number of targets affected per cast.' : '增加“沉默”咒语的持续时间并缩短冷却时间。高等级也增加每次施放影响的目标数。	',
                'Increase the duration of the MagNet spell, and add a slowing effect. Higher levels increase the number of targets affected per cast, and reduces the cooldown of the spell.' : '增加“魔磁网”咒语的持续时间并且附加缓慢效果。高等级增加每次施放影响的目标数，也缩短咒语的冷却时间。',
                'Increase the duration of the Immobilize spell, and add a slowing effect. Higher levels increase the number of targets affected per cast, and reduces the cooldown of the spell.' : '增加“固定术”的持续时间，并添加减速效果。更高的等级会增加每次施放的影响目标数量，也缩短咒语的冷却时间。',
                'Increase the duration and power of the Slow spell. Higher levels also increase the number of targets affected per cast.' : '增加“缓慢”咒语的持续时间与效果。高等级也增加每次施放影响的目标数。	',
                'Increases the amount of health drained by the Drain spell.' : '增加“枯竭”咒语的生命汲取量。	',
                'Decreases the cooldown and cast time on the Drain spell.' : '缩短“枯竭”的冷却时间并增加施放速度。	',
                'Augment the Drain spell with the ability to inflict Ether Theft on any target afflicted with Soul Fire.' : '此技能扩充“枯竭”咒语的能力，可对任何受焚烧的灵魂(圣特殊效果)折磨的目标施加魔力吸窃效果。',
                'Augment the Drain spell with the ability to inflict Spirit Theft on any target afflicted with Ripened Soul.' : '此技能扩充“枯竭”咒语的能力，可对任何受鲜美的灵魂(暗特殊效果)折磨的目标施加灵力吸窃效果。',
                'Action Speed Modification' : '行动速度修正',
                'Added special effect: Ether Theft' : '附加特殊效果：魔力窃取',
                'Added special effect: Spirit Theft' : '附加特殊效果：灵力窃取',
                'Followup' : '追加',
                'Multiplies HP Drain by ' : '生命汲取倍率',
                'Increases Confuse Break Resistance to' : '增加混乱脱离抗性至',
                'Increases Sleep Break Resistance to' : '增加沉眠脱离抗性至',
                'Natural Resist Modifier' : '抵抗修正',

                //BUFF技能说明
                'Increases the action speed-up granted by the Haste spell.' : '增加“急速”咒语给予的行动速度加成。',
                'Increases the evade bonus granted by the Shadow Veil spell.' : '增加“影纱”咒语给予的回避率奖励并增加影纱触发完全闪避的概率。',
                'Increases the chance that Absorb will successfully nullify a hostile spell.' : '增加“吸收”咒语的发动率。',
                'Decreases the amount of damage required to make Spirit Shield kick in, as well as how much spirit is consumed when it does.' : '降低触发“灵力盾”所需的伤害量，同时也减少灵力值的损失。',
                'Heartseeker will further increase the damage of any critical melee hits.' : '“觅心者”咒语会进一步的增加你的近战暴击伤害。',
                'Arcane Focus will additionally increase the damage of any critical spell hits.' : '“奥术集中”咒语现在也增加你的法术暴击伤害。	',
                'Increase the power and duration of the Regen spell.' : '增加“细胞活化”咒语的效果和持续回合数。	',
                'Increase the healing power and decrease the cooldown of the Cure spell.' : '增加“治疗术”咒语的治疗效果和缩短冷却时间。	',
                'Increase the duration and decrease the mana cost of the Spark of Life spell.' : '增加“生命火花”咒语的持续回合数并且减少施放所需的魔力值。	',
                'Increases the mitigation bonuses granted by the Protect spell.' : '增加“守护”咒语给予的减伤加成。	',
                'Augments your Protection spell by adding fire elemental spikes. Additional levels increase your fire elemental resistance while the spell is active.' : '扩充你的“守护”咒语能力，使它附加火元素刺盾。后续等级会在此咒语作用时增加你的火焰抗性。',
                'Augments your Protection spell by adding cold elemental spikes. Additional levels increase your cold elemental resistance while the spell is active.' : '扩充你的“守护”咒语能力，使它附加冰元素刺盾。后续等级会在此咒语作用时增加你的冰冷抗性。',
                'Augments your Protection spell by adding elec elemental spikes. Additional levels increase your elec elemental resistance while the spell is active.' : '扩充你的“守护”咒语能力，使它附加雷元素刺盾。后续等级会在此咒语作用时增加你的闪电抗性。',
                'Augments your Protection spell by adding wind elemental spikes. Additional levels increase your wind elemental resistance while the spell is active.' : '扩充你的“守护”咒语能力，使它附加风元素刺盾。后续等级会在此咒语作用时增加你的疾风抗性。',
                'Flame Spikes' : '烈焰刺盾(使怪物-10%伤害/抵抗/-25%冰冷抗性)',
                'Frost Spikes' : '冰霜刺盾(使怪物-10%行动速度/-25%疾风抗性)',
                'Shock Spikes' : '闪电刺盾(使怪物-10%回避/抵抗/-25%火焰抗性)',
                'Storm Spikes' : '风暴刺盾(使怪物-10%命中值/-25%闪电抗性)',
                'Fire Mitigation' : '火焰抗性',
                'Cold Mitigation' : '冰霜抗性',
                'Elec Mitigation' : '闪电抗性',
                'Wind Mitigation' : '疾风抗性',
                'Fire/Cold/Elec' : '火焰/冰霜/闪电',
                'Additional Effect' : '额外效果',
                'Increases Absorption Chance to' : '增加吸收触发率至 ',
                'Reduces Damage Threshold to ' : '降低伤害门槛至 ',
                'Spell Critical Damage' : '魔法暴击伤害',
                'Attack Critical Damage' : '攻击暴击伤害',
                'Spell Crit Multiplier' : '魔法暴击伤害',
                'Attack Crit Multiplier' : '攻击暴击伤害',
                'Changes base damage to' : '改变基础伤害至 ',
                'Base Health Regen per tick' : '基础生命回复/每回合',
                'Base Mana Regen per tick' : '基础魔力回复/每回合',
                'Base Spirit Regen per tick' : '基础灵力回复/每回合',
                'Evade' : '闪避率',
                'Natural Evade Modifier' : '基础闪避率修正',
                'Shadow Veil Trigger Chance' : '影纱触发率',

                //攻击技能说明
                'Increases the maximum number of targets hit by' : '增加',
                'fire elemental spells.' : '火系元素咒语的最大目标数',
                'cold elemental spells.' : '冰系元素咒语的最大目标数',
                'lightning elemental spells.' : '雷系元素咒语的最大目标数',
                'wind elemental spells.' : '风系元素咒语的最大目标数',
                'Increases damage and decreases cast time of all first-tier elemental spells.' : '增加所有第一级元素咒语的伤害、缩短施放时间。',
                'Increases damage, and decreases cast time and cooldown of all second-tier elemental spells.' : '增加第二级元素咒语的伤害、缩短施放时间和冷却时间。	',
                'Increases damage, and decreases cast time and cooldown of all third-tier elemental spells.' : '增加第三级元素咒语的伤害、缩短施放时间和冷却时间。	',

                'Decreases cooldown and increases the maximum number of targets hit by the Corruption spell.' : '缩短冷却时间并且增加“腐败”咒语的最大目标命中数。	',
                'Decreases cooldown and increases the maximum number of targets hit by the Disintegrate spell.' : '缩短冷却时间并且增加“瓦解”咒语的最大目标命中数。	',
                'Decreases cooldown and increases the maximum number of targets hit by the Ragnarok spell.' : '缩短冷却时间并且增加“诸神黄昏”咒语的最大目标命中数。	',
                'Augments your forbidden spells with the Ripened Soul proc, which damages the target over time and enables certain follow-up attacks. Higher levels increase the chance of the proc occurring.' : '扩充你的黑暗咒语能力，附加鲜美的灵魂状态，给予持续伤害且能对目标使用某些后续攻击。高等级增加状态触发率。',
                'Added effect: Ripened Soul' : '附加效果：鲜美的灵魂',
                'Chance)' : '几率)',
                'Imperil additionally reduces specific mitigation against Dark.' : '让“陷危”咒语附加降低黑暗抗性的能力。	',
                'Dark Mitigation':'黑暗减伤',
                'Decreases cooldown and increases the maximum number of targets hit by the Smite holy spell.' : '缩短冷却时间并且增加“惩戒”咒语的最大目标命中数。	',
                'Decreases cooldown and increases the maximum number of targets hit by the Banishment holy spell.' : '缩短冷却时间并且增加“放逐”咒语的最大目标命中数。	',
                'Decreases cooldown and increases the maximum number of targets hit by the Paradise Lost holy spell.' : '缩短冷却时间并且增加“失乐园”咒语的最大目标命中数。	',
                'Augments your divine spells with the Soul Fire proc, which damages the target over time and enables certain follow-up attacks. Higher levels increase the chance of the proc occurring.' : '扩充你的神圣咒语能力，附加焚烧的灵魂状态，给予持续伤害且能对目标使用某些后续攻击。高等级增加状态触发率。',
                'Added effect: Soul Fire' : '附加效果：焚烧的灵魂',
                'Imperil additionally reduces specific mitigation against Holy.' : '让“陷危”咒语附加降低神圣抗性的能力。	',
                'Holy Mitigation':'神圣减伤',
                'Major Ability Slot':'主要技能槽',
                "Major Ability Slot - Unlock Cost: 1 Mastery Points": "主要技能槽 - 解锁费用：1 精通点",
                "Major Ability Slot - Unlock Cost: 2 Mastery Points": "主要技能槽 - 解锁费用：2 精通点",
                "Major Ability Slot - Unlock Cost: 3 Mastery Points": "主要技能槽 - 解锁费用：3 精通点",
                "Major Ability Slot - Unlock Cost: 4 Mastery Points": "主要技能槽 - 解锁费用：4 精通点",
                "Major Ability Slot - Unlock Cost: 5 Mastery Points": "主要技能槽 - 解锁费用：5 精通点",
                "Supportive Ability Slot - Unlock Cost: 1 Mastery Point": "辅助技能槽 - 解锁费用：1 精通点",
                "Supportive Ability Slot - Unlock Cost: 2 Mastery Points": "辅助技能槽 - 解锁费用：2 精通点",
                "Supportive Ability Slot - Unlock Cost: 3 Mastery Points": "辅助技能槽 - 解锁费用：3 精通点",
                "Supportive Ability Slot - Unlock Cost: 4 Mastery Points": "辅助技能槽 - 解锁费用：4 精通点",
                "Protection Augment Ability Slot - Unlock Cost: 1 Mastery Point": "“守护”技能强化槽 - 解锁费用：1 精通点",
                "Drain Augment Ability Slot - Unlock Cost: 2 Mastery Points": "“枯竭”技能强化槽 - 解锁费用：2 精通点",
                'Drain Augment Ability Slot - Click or drag an unlocked ability to fill slot.' : '点击或者拖曳一个已解锁技能到此处安装',
                'Supportive Ability Slot - Click or drag an unlocked ability to fill slot.' : '点击或者拖曳一个已解锁技能到此处安装',
                'Major Ability Slot - Click or drag an unlocked ability to fill slot.' : '点击或者拖曳一个已解锁技能到此处安装',
                'Protection Augment Ability Slot - Click or drag an unlocked ability to fill slot.' : '点击或者拖曳一个已解锁技能到此处安装',
            }
        },
        {
            // 全部道具与说明
            priority: 3,
            excludeSelector:"#equipaction, #equipblurb, #settings-container",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=(?:Character&ss=it|Battle&ss|Bazaar&ss=(?:is|mk|ss|am&screen=))/
                },
                { mode: "prefix", match: "https://forums.e-hentai.org/index.php?showtopic" },
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss=mm" },
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss" },
                { mode: "prefix", match: "https://hentaiverse.org/isekai/?s=Bazaar&ss" },
            ],
            translations: {
                'Health Potion' : '生命药水',
                'Health Draught' : '生命饮剂',
                'Health Elixir' : '生命秘药',
                'Mana Potion' : '法力药水',
                'Mana Draught' : '法力饮剂',
                'Mana Elixir' : '法力秘药',
                'Spirit Potion' : '灵力药水',
                'Spirit Draught' : '灵力饮剂',
                'Spirit Elixir' : '灵力秘药',
                'Last Elixir' : '终极秘药',
                'Energy Drink' : '能量饮料',
                'Caffeinated Candy' : '咖啡因糖果',
                'Soul Stone' : '灵魂石',
                'Flower Vase' : '花瓶',
                'Bubble-Gum' : '泡泡糖',
                'Bubble Gum' : '泡泡糖',

                'Infusion of Darkness' : '黑暗魔药',
                'Infusion of Divinity' : '神圣魔药',
                'Infusion of Storms' : '风暴魔药',
                'Infusion of Lightning' : '闪电魔药',
                'Infusion of Frost' : '冰冷魔药',
                'Infusion of Flames' : '火焰魔药',
                'Infusion of Gaia' : '盖亚魔药',
                'Scroll of Swiftness' : '加速卷轴',
                'Scroll of the Avatar' : '化身卷轴',
                'Scroll of Shadows' : '幻影卷轴',
                'Scroll of Absorption' : '吸收卷轴',
                'Scroll of Life' : '生命卷轴',
                'Scroll of Protection' : '保护卷轴',
                'Scroll of the Gods' : '神之卷轴',

                'Crystal of Vigor' : '力量水晶',
                'Crystal of Finesse' : '灵巧水晶',
                'Crystal of Swiftness' : '敏捷水晶',
                'Crystal of Fortitude' : '体质水晶',
                'Crystal of Cunning' : '智力水晶',
                'Crystal of Knowledge' : '智慧水晶',
                'Crystal of Flames' : '火焰水晶',
                'Crystal of Frost' : '冰冻水晶',
                'Crystal of Lightning' : '闪电水晶',
                'Crystal of Tempest' : '疾风水晶',
                'Crystal of Devotion' : '神圣水晶',
                'Crystal of Corruption' : '暗黑水晶',
                'Crystal of Quintessence' : '灵魂水晶',

                'Monster Chow' : '怪物饲料',
                'Monster Edibles' : '怪物食品',
                'Monster Cuisine' : '怪物料理',
                'Happy Pills' : '快乐药丸',

                'Golden Lottery Ticket' : '黄金彩票券',
                'Token of Blood' : '鲜血令牌',
                'Chaos Token' : '混沌令牌',
                'Soul Fragment' : '灵魂碎片',

                'Binding of Slaughter':  '粘合剂 基础攻击伤害',
                'Binding of Balance':  '粘合剂 物理命中率',
                'Binding of Isaac':  '粘合剂 物理暴击率',
                'Binding of Destruction':  '粘合剂 基础魔法伤害',
                'Binding of Focus':  '粘合剂 魔法命中率',
                'Binding of Friendship':  '粘合剂 魔法暴击率',
                'Binding of Protection':  '粘合剂 物理减伤',
                'Binding of Warding':  '粘合剂 魔法减伤',
                'Binding of the Fleet':  '粘合剂 回避率',
                'Binding of the Barrier':  '粘合剂 格挡率',
                'Binding of the Nimble':  '粘合剂 招架率',
                'Binding of Negation':  '粘合剂 抵抗率',
                'Binding of the Ox':  '粘合剂 力量',
                'Binding of the Raccoon':  '粘合剂 灵巧',
                'Binding of the Cheetah':  '粘合剂 敏捷',
                'Binding of the Turtle':  '粘合剂 体质',
                'Binding of the Fox':  '粘合剂 智力',
                'Binding of the Owl':  '粘合剂 智慧',
                'Binding of the Elementalist':  '粘合剂 元素魔法熟练度',
                'Binding of the Heaven-sent':  '粘合剂 神圣魔法熟练度',
                'Binding of the Demon-fiend':  '粘合剂 黑暗魔法熟练度',
                'Binding of the Curse-weaver':  '粘合剂 减益魔法熟练度',
                'Binding of the Earth-walker':  '粘合剂 增益魔法熟练度',
                'Binding of Surtr':  '粘合剂 火焰魔法伤害',
                'Binding of Niflheim':  '粘合剂 冰冷魔法伤害',
                'Binding of Mjolnir':  '粘合剂 闪电魔法伤害',
                'Binding of Freyr':  '粘合剂 疾风魔法伤害',
                'Binding of Heimdall':  '粘合剂 神圣魔法伤害',
                'Binding of Fenrir':  '粘合剂 黑暗魔法伤害',
                'Binding of Dampening':  '粘合剂 打击减伤',
                'Binding of Stoneskin':  '粘合剂 斩击减伤',
                'Binding of Deflection':  '粘合剂 刺击减伤',
                'Binding of the Fire-eater':  '粘合剂 火焰减伤',
                'Binding of the Frost-born':  '粘合剂 冰冷减伤',
                'Binding of the Thunder-child':  '粘合剂 闪电减伤',
                'Binding of the Wind-waker':  '粘合剂 疾风减伤',
                'Binding of the Thrice-blessed':  '粘合剂 神圣减伤',
                'Binding of the Spirit-ward':  '粘合剂 黑暗减伤',

                'Wispy Catalyst' : '纤细 催化剂',
                'Diluted Catalyst' : '稀释 催化剂',
                'Regular Catalyst' : '平凡 催化剂',
                'Robust Catalyst' : '稳健 催化剂',
                'Vibrant Catalyst' : '活力 催化剂',
                'Coruscating Catalyst' : '闪耀 催化剂',

                'Low-Grade Cloth': '低级布料',
                'Mid-Grade Cloth': '中级布料',
                'High-Grade Cloth': '高级布料',
                'Low-Grade Leather': '低级皮革',
                'Mid-Grade Leather': '中级皮革',
                'High-Grade Leather': '高级皮革',
                'Low-Grade Metals': '低级金属',
                'Mid-Grade Metals': '中级金属',
                'High-Grade Metals': '高级金属',
                'Low-Grade Wood': '低级木材',
                'Mid-Grade Wood': '中级木材',
                'High-Grade Wood': '高级木材',
                'Scrap Metal' : '金属废料',
                'Scrap Leather' : '皮革废料',
                'Scrap Wood' : '木材废料',
                'Scrap Cloth' : '废布料',
                'Energy Cell' : '能量元',
                'Defense Matrix Modulator' : '力场碎片(盾)',
                'Repurposed Actuator' : '动力碎片(重)',
                'Shade Fragment' : '暗影碎片(轻)',
                'Crystallized Phazon' : '相位碎片(布)',

                'Legendary Weapon Core' : '传奇武器核心',
                'Peerless Weapon Core' : '无双武器核心',
                'Legendary Staff Core' : '传奇法杖核心',
                'Peerless Staff Core' : '无双法杖核心',
                'Legendary Armor Core' : '传奇护甲核心',
                'Peerless Armor Core' : '无双护甲核心',

                'Voidseeker Shard' : '虚空碎片',
                'Featherweight Shard' : '羽毛碎片',
                'Aether Shard' : '以太碎片',
                'Amnesia Shard' : '重铸碎片',

                'Twilight Sparkle Figurine' : '暮光闪闪公仔',
                'Rainbow Dash Figurine' : '云宝黛西公仔',
                'Applejack Figurine' : '苹果杰克公仔',
                'Fluttershy Figurine' : '小蝶公仔',
                'Pinkie Pie Figurine' : '萍琪派公仔',
                'Rarity Figurine' : '瑞瑞公仔',
                'Trixie Figurine' : '崔克茜公仔',
                'Princess Celestia Figurine' : '塞拉斯蒂亚公主公仔',
                'Princess Luna Figurine' : '露娜公主公仔',
                'Apple Bloom Figurine' : '小苹花公仔',
                'Scootaloo Figurine' : '飞板璐公仔',
                'Sweetie Belle Figurine' : '甜贝儿公仔',
                'Big Macintosh Figurine' : '大麦克公仔',
                'Spitfire Figurine' : '飞火公仔',
                'Derpy Hooves Figurine' : '小呆公仔',
                'Lyra Heartstrings Figurine' : '天琴心弦公仔',
                'Octavia Figurine' : '奥塔维亚公仔',
                'Zecora Figurine' : '泽科拉公仔',
                'Cheerilee Figurine' : '车厘子公仔',
                'Vinyl Scratch Figurine' : '维尼尔公仔',
                'Daring Do Figurine' : '无畏天马公仔',
                'Doctor Whooves Figurine' : '神秘博士公仔',
                'Berry Punch Figurine' : '酸梅酒公仔',
                'Bon-Bon Figurine' : '糖糖公仔',
                'Fluffle Puff Figurine' : '毛毛马公仔',
                'Angel Bunny Figurine' : '天使兔公仔',
                'Gummy Figurine' : '嘎米公仔',

                'Mithril Charm Pouch' : '秘银护符袋(T3)',
                'Kevlar Charm Pouch' : '凯夫拉护符袋(T2)',
                'Silk Charm Pouch' : '丝绸护符袋(T1)',
                'World Seed' : '世界之种',
                'World Seeds' : '世界之种',
                'Lesser Featherweight Charm' : '小型轻羽护符',
                'Greater Featherweight Charm' : '大型轻羽护符',
                'Lesser Fire Strike Charm' : '小型火焰打击护符',
                'Greater Fire Strike Charm' : '大型火焰打击护符',
                'Lesser Cold Strike Charm' : '小型冰霜打击护符',
                'Greater Cold Strike Charm' : '大型冰霜打击护符',
                'Lesser Lightning Strike Charm' : '小型闪电打击护符',
                'Greater Lightning Strike Charm' : '大型闪电打击护符',
                'Lesser Wind Strike Charm' : '小型疾风打击护符',
                'Greater Wind Strike Charm' : '大型疾风打击护符',
                'Lesser Holy Strike Charm' : '小型神圣打击护符',
                'Greater Holy Strike Charm' : '大型神圣打击护符',
                'Lesser Dark Strike Charm' : '小型黑暗打击护符',
                'Greater Dark Strike Charm' : '大型黑暗打击护符',
                'Lesser Capacitor Charm' : '小型魔力护符',
                'Greater Capacitor Charm' : '大型魔力护符',
                'Lesser Juggernaut Charm' : '小型生命护符',
                'Greater Juggernaut Charm' : '大型生命护符',
                'Lesser Butcher Charm' : '小型攻击伤害护符',
                'Greater Butcher Charm' : '大型攻击伤害护符',
                'Lesser Fatality Charm' : '小型攻击暴击伤害护符',
                'Greater Fatality Charm' : '大型攻击暴击伤害护符',
                'Lesser Overpower Charm' : '小型反招架护符',
                'Greater Overpower Charm' : '大型反招架护符',
                'Lesser Swiftness Charm' : '小型攻速护符',
                'Greater Swiftness Charm' : '大型攻速护符',
                'Lesser Annihilator Charm' : '小型魔法暴击伤害护符',
                'Greater Annihilator Charm' : '大型魔法暴击伤害护符',
                'Lesser Archmage Charm' : '小型魔法伤害护符',
                'Greater Archmage Charm' : '大型魔法伤害护符',
                'Lesser Economizer Charm' : '小型魔力消耗减免护符',
                'Greater Economizer Charm' : '大型魔力消耗减免护符',
                'Lesser Penetrator Charm' : '小型反抵抗护符',
                'Greater Penetrator Charm' : '大型反抵抗护符',
                'Lesser Spellweaver Charm' : '小型施法速度护符',
                'Greater Spellweaver Charm' : '大型施法速度护符',
                'Lesser Cold-proof Charm' : '小型冰抗护符',
                'Greater Cold-proof Charm' : '大型冰抗护符',
                'Lesser Dark-proof Charm' : '小型暗抗护符',
                'Greater Dark-proof Charm' : '大型暗抗护符',
                'Lesser Lightning-proof Charm' : '小型电抗护符',
                'Greater Lightning-proof Charm' : '大型电抗护符',
                'Lesser Fire-proof Charm' : '小型火抗护符',
                'Greater Fire-proof Charm' : '大型火抗护符',
                'Lesser Holy-proof Charm' : '小型圣抗护符',
                'Greater Holy-proof Charm' : '大型圣抗护符',
                'Lesser Wind-proof Charm' : '小型风抗护符',
                'Greater Wind-proof Charm' : '大型风抗护符',
                'Lesser Voidseeker Charm' : '小型虚空祝福护符',
                'Greater Voidseeker Charm' : '大型虚空祝福护符',
                'Lesser Aether Charm' : '小型以太护符',
                'Greater Aether Charm' : '大型以太护符',
                'Lesser Hollowforged Charm' : '小型虚空升华护符',
                'Greater Hollowforged Charm' : '大型虚空升华护符',

                //当前可以获取的文物和奖杯
                'Precursor Artifact' : '古遗物',
                'ManBearPig Tail' : '人熊猪的尾巴(等级2)',
                'Holy Hand Grenade of Antioch' : '安提阿的神圣手榴弹(等级2)',
                'Mithra\'s Flower' : '猫人族的花(等级2)',
                'Dalek Voicebox' : '戴立克音箱(等级2)',
                'Lock of Blue Hair' : '一绺蓝发(等级2)',
                'Bunny-Girl Costume' : '兔女郎装(等级3)',
                'Hinamatsuri Doll' : '雏人形(等级3)',
                'Broken Glasses' : '破碎的眼镜(等级3)',
                'Sapling' : '树苗(等级4)',
                'Black T-Shirt' : '黑色Ｔ恤(等级4)',
                'Unicorn Horn' : '独角兽的角(等级5)',
                'Noodly Appendage' : '面条般的附肢(等级6)',

                //礼券
                'Bronze Coupon' : '铜礼券(等级3)',
                'Silver Coupon' : '银礼券(等级5)',
                'Gold Coupon' : '黄金礼券(等级7)',
                'Platinum Coupon' : '白金礼券(等级8)',
                'Peerless Voucher' : '无双凭证(等级10)',

                //旧文物
                'Priceless Ming Vase' : '无价的明朝瓷器',
                'Grue' : '格鲁',
                'Seven-Leafed Clover' : '七叶幸运草',
                'Rabbit\'s Foot' : '幸运兔脚',
                'Wirts Leg' : '维特之脚',
                'Shark-Mounted Laser' : '装在鲨鱼头上的激光枪',
                'BFG9000' : 'BFG9000',
                'Railgun' : '磁道炮',
                'Flame Thrower' : '火焰喷射器',
                'Small Nuke' : '小型核武',
                'Chainsaw Oil' : '电锯油',
                'Chainsaw Fuel' : '电锯燃油',
                'Chainsaw Chain' : '电锯链',
                'Chainsaw Safety Manual' : '电锯安全手册',
                'Chainsaw Repair Guide' : '电锯维修指南',
                'Chainsaw Guide Bar' : '电锯导板',
                'ASHPD Portal Gun' : '光圈科技传送门手持发射器',
                'Smart Bomb' : '炸弹机器人',
                'Tesla Coil' : '电光塔',
                'Vorpal Blade Hilt' : '斩龙剑的剑柄',
                'Crystal Jiggy' : '水晶拼图',

                //圣诞文物
                'Fiber-Optic Xmas Tree' : '光纤圣诞树',
                'Decorative Pony Sled' : '小马雪橇装饰品',
                'Hearth Warming Lantern' : '暖心节灯笼',
                'Mayan Desk Calendar' : '马雅桌历',
                'Fiber-Optic Tree of Harmony' : '光纤谐律之树',
                'Crystal Snowman' : '水晶雪人',
                'Annoying Dog' : '烦人的狗',
                'Iridium Sprinkler' : '铱制洒水器',
                'Robo Rabbit Head' : '机器兔子头',

                //复活节文物
                //2011
                'Easter Egg' : '复活节彩蛋',
                //S、N、O、W、F、L、A、K、E。
                //2012
                'Red Ponyfeather' : '红色天马羽毛',
                'Orange Ponyfeather' : '橙色天马羽毛',
                'Yellow Ponyfeather' : '黄色天马羽毛',
                'Green Ponyfeather' : '绿色天马羽毛',
                'Blue Ponyfeather' : '蓝色天马羽毛',
                'Indigo Ponyfeather' : '靛色天马羽毛',
                'Violet Ponyfeather' : '紫色天马羽毛',
                //2013
                'Twinkling Snowflake' : '闪闪发光(Twinkling)的雪花',
                'Glittering Snowflake' : '闪闪发光(Glittering)的雪花',
                'Shimmering Snowflake' : '闪闪发光(Shimmering)的雪花',
                'Gleaming Snowflake' : '闪闪发光(Gleaming)的雪花',
                'Sparkling Snowflake' : '闪闪发光(Sparkling)的雪花',
                'Glinting Snowflake' : '闪闪发光(Glinting)的雪花',
                'Scintillating Snowflake' : '闪闪发光(Scintillating)的雪花',
                //2014
                'Altcoin' : '山寨币',
                'LiteCoin' : '莱特币',
                'DogeCoin' : '多吉币',
                'PeerCoin' : '点点币',
                'FlappyCoin' : '象素鸟币',
                'VertCoin' : '绿币',
                'AuroraCoin' : '极光币',
                'DarkCoin' : '暗黑币',
                //2015
                'Ancient Server Part' : '古老的服务器零组件',
                'Server Motherboard' : '服务器主板',
                'Server CPU Module' : '服务器中央处理器模组',
                'Server RAM Module' : '服务器主内存模组',
                'Server Chassis' : '服务器机壳',
                'Server Network Card' : '服务器网络卡',
                'Server Hard Drive' : '服务器硬盘',
                'Server Power Supply' : '服务器电源供应器',
                //2016
                'Chicken Figurines' : '小鸡公仔',
                'Red Chicken Figurine' : '红色小鸡公仔',
                'Orange Chicken Figurine' : '橙色小鸡公仔',
                'Yellow Chicken Figurine' : '黄色小鸡公仔',
                'Green Chicken Figurine' : '绿色小鸡公仔',
                'Blue Chicken Figurine' : '蓝色小鸡公仔',
                'Indigo Chicken Figurine' : '靛色小鸡公仔',
                'Violet Chicken Figurine' : '紫色小鸡公仔',
                //2017
                'Ancient Fruit Smoothies' : '古老的水果冰沙',
                'Ancient Lemon' : '古代柠檬',
                'Ancient Plum' : '古代李子',
                'Ancient Kiwi' : '古代奇异果',
                'Ancient Mulberry' : '古代桑葚',
                'Ancient Blueberry' : '古代蓝莓',
                'Ancient Strawberry' : '古代草莓',
                'Ancient Orange' : '古代橙子',
                //2018
                'Aggravating Spelling Error' : '严重的拼写错误',
                'Exasperating Spelling Error' : '恼人的拼写错误',
                'Galling Spelling Error' : '恼怒的拼写错误',
                'Infuriating Spelling Error' : '激怒的拼写错误',
                'Irking Spelling Error' : '忿怒的拼写错误',
                'Vexing Spelling Error' : '烦恼的拼写错误',
                'Riling Spelling Error' : '愤怒的拼写错误',
                //2019
                'Manga Category Button' : '漫画类别按钮',
                'Doujinshi Category Button' : '同人志类别按钮',
                'Artist CG Category Button' : '画师CG类别按钮',
                'Western Category Button' : '西方类别按钮',
                'Image Set Category Button' : '图集类别按钮',
                'Game CG Category Button' : '游戏CG类别按钮',
                'Non-H Category Button' : '非H类别按钮',
                'Cosplay Category Button' : 'Cosplay类别按钮',
                'Asian Porn Category Button' : '亚洲色情类别按钮',
                'Misc Category Button' : '杂项类别按钮',
                //2020
                'Hoarded Hand Sanitizer' : '库存的洗手液',
                'Hoarded Disinfecting Wipes' : '库存的消毒湿巾',
                'Hoarded Face Masks' : '库存的口罩',
                'Hoarded Toilet Paper' : '库存的厕纸',
                'Hoarded Dried Pasta' : '库存的干面',
                'Hoarded Canned Goods' : '库存的罐头',
                'Hoarded Powdered Milk' : '库存的奶粉',
                //2021
                'Red Vaccine Vial' : '红色疫苗瓶',
                'Orange Vaccine Vial' : '橙色疫苗瓶',
                'Yellow Vaccine Vial' : '黄色疫苗瓶',
                'Green Vaccine Vial' : '绿色疫苗瓶',
                'Blue Vaccine Vial' : '蓝色疫苗瓶',
                'Indigo Vaccine Vial' : '靛色疫苗瓶',
                'Violet Vaccine Vial' : '紫色疫苗瓶',
                //2022
                'Core Carrying Bag' : '核心携带包',
                'Core Display Stand' : '核心展示架',
                'Core Ornament Set' : '核心饰品套装',
                'Core Maintenance Set' : '核心维护套装',
                'Core Wall-Mount Display' : '核心壁挂显示器',
                'Core LED Illumination' : '核心LED照明',
                //2023
                'Search Engine Crankshaft': '搜索引擎曲轴',
                'Search Engine Carburetor': '搜索引擎化油器',
                'Search Engine Piston': '搜索引擎活塞',
                'Search Engine Manifold': '搜索引擎歧管',
                'Search Engine Distributor': '搜索引擎分电器',
                'Search Engine Water Pump': '搜索引擎水泵',
                'Search Engine Oil Filter': '搜索引擎机油滤清器',
                'Search Engine Spark Plug': '搜索引擎火花塞',
                'Search Engine Valve': '搜索引擎阀门',

                //2024
                'Abstract Art of Fire Hydrants': '抽象艺术消防栓',
                'Abstract Art of Staircases': '抽象艺术楼梯',
                'Abstract Art of Bridges': '抽象艺术桥梁',
                'Abstract Art of Traffic Lights': '抽象艺术红绿灯',
                'Abstract Art of Bicycles': '抽象艺术自行车',
                'Abstract Art of Tractors': '抽象艺术拖拉机',
                'Abstract Art of Busses': '抽象艺术公交车',
                'Abstract Art of Motorcycles': '抽象艺术摩托车',
                'Abstract Art of Crosswalks': '抽象艺术人行道',
                'Abstract Art of Crosswalks': '抽象艺术人行道',

                //2025
                'Bunny Girl': '兔女郎装扮',
                'Fluffy Ear Headband': '毛绒发带',
                'White Fluffy Tail': '毛绒白尾巴',
                'Black Latex Top': '黑色乳胶上衣',
                'Black Latex Gloves': '黑色乳胶手套',
                'Black High Heels': '黑色高跟鞋',
                'Black Fishnet Stockings': '黑色渔网袜',
                'Black Underwear': '黑色内衣',
                'Choker and Bowtie': '项圈与领带',

                //节日及特殊奖杯
                'Mysterious Box' : '神秘宝盒(等级9)', // 在‘训练：技能推广’调整价格后赠予某些玩家。
                'Solstice Gift' : '冬至赠礼(等级7)', //  2009 冬至
                'Stocking Stuffers' : '圣诞袜小礼物(等级7)', // 2009年以来每年圣诞节礼物。
                'Tenbora\'s Box' : '天菠拉的盒子(等级9)', // 年度榜单或者年度活动奖品
                'Shimmering Present' : '微光闪动的礼品(等级8)', //  2010 圣诞节
                'Potato Battery' : '马铃薯电池(等级7)', // 《传送门 2》发售日
                'RealPervert Badge' : '真-变态胸章(等级7)', // 2011 愚人节
                'Rainbow Egg' : '彩虹蛋(等级8)', //  2011 复活节
                'Colored Egg' : '彩绘蛋(等级7)', //  2011 复活节
                'Raptor Jesus' : '猛禽耶稣(等级7)', //  哈罗德·康平的被提预言
                'Gift Pony' : '礼品小马(等级8)', // 2011 圣诞节
                'Faux Rainbow Mane Cap' : '人造彩虹鬃毛帽(等级8)', //  2012 复活节
                'Pegasopolis Emblem' : '天马族徽(等级7)', // 2012 复活节
                'Fire Keeper Soul' : '防火女的灵魂(等级8)', // 2012 圣诞节
                'Crystalline Galanthus' : '结晶雪花莲(等级8)', // 2013 复活节
                'Sense of Self-Satisfaction' : '自我满足感(等级7)', // 2013 复活节
                'Six-Lock Box' : '六道锁盒子(等级8)', // 2013 圣诞节
                'Golden One-Bit Coin' : '金色一比特硬币(等级8)', // 2014 复活节
                'USB ASIC Miner' : '随身型特定应用积体电路挖矿机(等级7)', // 2014 复活节
                'Reindeer Antlers' : '驯鹿鹿角(等级8)', // 2014 圣诞节
                'Ancient Porn Stash' : '古老的色情隐藏档案(等级8)', // 2015 复活节
                'VPS Hosting Coupon' : '虚拟专用服务器代管优惠券(等级7)', // 2015 复活节
                'Heart Locket' : '心型盒坠(等级8)', // 2015 圣诞节
                'Holographic Rainbow Projector' : '全像式彩虹投影机(等级8)', // 2016 复活节
                'Pot of Gold' : '黄金罐(等级7)', // 2016 复活节
                'Dinosaur Egg' : '恐龙蛋(等级8)', // 2016 圣诞节
                'Precursor Smoothie Blender' : '旧世界冰沙机(等级8)', // 2017 复活节
                'Rainbow Smoothie' : '彩虹冰沙(等级7)', // 2017 复活节
                'Mysterious Tooth' : '神秘的牙齿(等级8)', // 2017 圣诞节
                'Grammar Nazi Armband' : '语法纳粹臂章(等级7)', // 2018 复活节
                'Abstract Wire Sculpture' : '抽象线雕(等级8)', // 2018 复活节
                'Delicate Flower' : '娇嫩的花朵(等级8)', // 2018 圣诞节
                'Assorted Coins' : '什锦硬币(等级7)', // 2019 复活节
                'Coin Collector\'s Guide' : '硬币收藏家指南(等级8)', // 2019 复活节
                'Iron Heart' : '钢铁之心(等级8)', // 2019 圣诞节
                'Shrine Fortune' : '神社灵签(等级7)', // 2020起复活节
                'Plague Mask' : '瘟疫面具(等级8)', // 2020 复活节
                'Festival Coupon' : '节日礼券(等级7)', //2020起收获节(中秋)
                'Annoying Gun' : '烦人的枪(等级8)', //2020 圣诞节
                'Vaccine Certificate' : '疫苗证明(等级8)', //2021 复活节
                'Barrel' : '酒桶(等级8)', //2021 圣诞节
                'CoreCare Starter Kit' : '核心服务工具套件(等级8)', //2022 复活节
                'Star Compass' : '星罗盘(等级8)', //2022 圣诞节
                'Museum Ticket' : '博物馆门票(等级8)', // 2023 复活节
                'Idol Fan Starter Pack' : '偶像粉丝入门包(等级8)', //2023 圣诞节
                'AI-Based Captcha Solver': '基于AI的验证码解答器(等级8)',//2024 复活节
                'Vintage Paper Tag': '复古的纸质标签(等级8)',//2024 网站标签清理大赛
                'Marten Pelt': '貂皮(等级8)',//2024 圣诞节
                'Snowflake Bunny Girl Figure': '兔女郎雪花女神公仔(等级8)',//2025复活节
                'Bath Salts' : '浴盐(等级8)',//2025 圣诞节

                ///////////////////////////////////////////////////////物品说明

                //消耗品说明
                'Provides a long-lasting health restoration effect.' : '持续回复一定量的生命，持续50回合.',
                'Instantly restores a large amount of health.' : '立刻回复大量的生命.',
                'Fully restores health, and grants a long-lasting health restoration effect.' : '生命值全满,并持续回复一定量的生命，持续100回合.',
                'Provides a long-lasting mana restoration effect.' : '持续回复一定量的魔力值，持续50回合.',
                'Instantly restores a moderate amount of mana.' : '立刻回复一定量的魔力值.',
                'Fully restores mana, and grants a long-lasting mana restoration effect.' : '魔力值全满,并持续回复一定量的魔力值，持续100回合.',
                'Provides a long-lasting spirit restoration effect.' : '持续回复一定量的灵力值，持续50回合.',
                'Instantly restores a moderate amount of spirit.' : '立刻回复一定量的灵力值.',
                'Fully restores spirit, and grants a long-lasting spirit restoration effect.' : '灵力值全满,并持续回复一定量的灵力值，持续100回合.',
                'Fully restores all vitals, and grants long-lasting restoration effects.' : '生命,魔力,灵力全满,并同时产生三种饮剂的效果，持续100回合.',
                'Restores 10 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for ten turns.' : '恢复10点精力，但不超过99。如果在战斗中使用，除恢复精力外附带持续10回合每回合增加10%灵力和斗气.',
                'Restores 5 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for five turns.' : '恢复5点精力，但不超过99。如果在战斗中使用，除恢复精力外附带持续5回合每回合增加10%灵力和斗气.',
                'There are three flowers in a vase. The third flower is green.' : '花瓶中有三朵花，第三朵是绿色的(玩偶特工)。使用时持续50回合攻击/魔法伤害，攻击/法术命中值与暴击率，回避与抵抗率大幅提升。',
                'It is time to kick ass and chew bubble-gum... and here is some gum.' : '该是嚼著泡泡糖收拾他们的时候了…这里有一些泡泡糖(极度空间)。使用时持续50回合攻击和魔法伤害提升100%，必定命中且必定暴击',
                'You gain +25% resistance to Fire elemental attacks and do 25% more damage with Fire magicks.' : '你获得 +25% 的火焰抗性且获得 25% 的额外火焰魔法伤害，持续50回合。',
                'You gain +25% resistance to Cold elemental attacks and do 25% more damage with Cold magicks.' : '你获得 +25% 的冰冷抗性且获得 25% 的额外冰冷魔法伤害，持续50回合。',
                'You gain +25% resistance to Elec elemental attacks and do 25% more damage with Elec magicks.' : '你获得 +25% 的闪电抗性且获得 25% 的额外闪电魔法伤害，持续50回合。',
                'You gain +25% resistance to Wind elemental attacks and do 25% more damage with Wind magicks.' : '你获得 +25% 的疾风抗性且获得 25% 的额外疾风魔法伤害，持续50回合。',
                'You gain +25% resistance to Holy elemental attacks and do 25% more damage with Holy magicks.' : '你获得 +25% 的神圣抗性且获得 25% 的额外神圣魔法伤害，持续50回合。',
                'You gain +25% resistance to Dark elemental attacks and do 25% more damage with Dark magicks.' : '你获得 +25% 的黑暗抗性且获得 25% 的额外黑暗魔法伤害，持续50回合。',
                'Grants the Haste effect.' : '使用后产生加速(60%加速)效果，持续100回合',
                'Grants the Protection effect.' : '使用后产生保护(50%减伤)效果，持续100回合',
                'Grants the Haste and Protection effects with twice the normal duration.' : '使用后产生加速和保护的效果，持续200回合',
                'Grants the Absorb effect.' : '使用后获得吸收(100%触发)效果，持续100回合',
                'Grants the Shadow Veil effect.' : '使用产生暗影面纱(提升25%回避值)效果，持续100回合',
                'Grants the Spark of Life effect.' : '使用产生生命火花(受到致命伤害后消耗25%基础SP，并以50%最大生命复活)效果，持续100回合',
                'Grants the Absorb, Shadow Veil and Spark of Life effects with twice the normal duration.' : '同时产生吸收，闪避，以及生命火花效果，持续200回合',
                //现有文物和奖杯
                'An advanced technological artifact from an ancient and long-lost civilization. Handing these in at the Shrine of Snowflake will grant you a reward.' : '一个发达古代文明的技术结晶，把它交给雪花神殿的雪花女神来获得你的奖励',
                'Retrieved as a Toplist Reward for active participation in the E-Hentai Galleries system.' : '作为在E-Hentai画廊系统的活跃排行榜奖励派发，献祭作用与奖杯相同。',
                'A sapling from Yggdrasil, the World Tree' : '一棵来自世界树的树苗',
                'A plain black 100% cotton T-Shirt. On the front, an inscription in white letters reads' : '一件平凡无奇的100%纯棉T恤衫，在前面用白色的字母写着',
                'I defeated Real Life, and all I got was this lousy T-Shirt.' : '战胜了现实后，我就得到了这么一件恶心的T恤衫',
                'No longer will MBP spread havoc, destruction, and melted polar ice caps.' : '不会再有人熊猪扩散浩劫、破坏、和融化的极地冰帽了。',
                'You found this item in the lair of a White Bunneh. It appears to be a dud.' : '这似乎是你在一只杀人兔的巢穴里发现的一颗未爆弹。',
                'A Lilac flower given to you by a Mithra when you defeated her. Apparently, this type was her favorite.' : '击败小猫娘后她送你的紫丁香。很显然这品种是她的最爱。',
                'Taken from the destroyed remains of a Dalek shell.' : '从戴立克的残骸里取出来的音箱。',
                'Given to you by Konata when you defeated her. It smells of Timotei.' : '击败泉此方后获得的蓝发。闻起来像蒂沐蝶洗发精的味道',
                'Given to you by Mikuru when you defeated her. If you wear it, keep it to yourself.' : '击败朝比奈实玖瑠后获得的兔女郎装。不要告诉别人你有穿过。',
                'Given to you by Ryouko when you defeated her. You decided to name it Achakura, for no particular reason.' : '击败朝仓凉子后获得的人形。你决定取名叫朝仓，这没什么特别的理由。',
                'Given to you by Yuki when you defeated her. She looked better without them anyway.' : '击败长门有希后获得的眼镜。她不戴眼镜时看起来好多了。',
                'An Invisible Pink Unicorn Horn taken from the Invisible Pink Unicorn. It doesn\'t weigh anything and has the consistency of air, but you\'re quite sure it\'s real.' : '从隐形粉红独角兽头上取下来的隐形粉红色的角，它很像空气一样轻，几乎没有重量，但是你很确定它是真实存在的',
                'A nutritious pasta-based appendage from the Flying Spaghetti Monster.' : '一条用飞行意大利面怪物身上的面团做成的营养附肢。',
                'A voucher for a free soulbound Peerless equipment piece of your choice. Given to you personally by Snowflake for your devout worship and continued offerings.' : '一张可以根据你的选择兑换一件免费灵魂绑定无双装备的凭证。这是雪花女神对你的虔诚与持续奉献的奖励。',

                //强化材料
                'A cylindrical object filled to the brim with magitech energy. Used to power charms and advanced equipment.' : '一个充斥着奥术能量的圆柱形物体，用于为护身符和先进装备供电',
                'A small vial filled with a catalytic substance necessary for upgrading and repairing equipment in the forge. This is permanently consumed on use.' : '一个装着升级与修复装备必须的催化剂的小瓶子，每使用一次就会消耗一个',
                'Various bits and pieces of scrap cloth. These can be used to mend the condition of an equipment piece.' : '各种零碎的布料，用于修复装备',
                'Various bits and pieces of scrap leather. These can be used to mend the condition of an equipment piece.' : '各种零碎的皮革，用于修复装备',
                'Various bits and pieces of scrap metal. These can be used to mend the condition of an equipment piece.' : '各种零碎的金属，用于修复装备',
                'Various bits and pieces of scrap wood. These can be used to mend the condition of an equipment piece.' : '各种零碎的木材，用于修复装备',
                'Some materials scavenged from fallen adventurers by a monster. Required to ' : '一些从怪物身上收集到的材料，用于',
                'Used to imbue equipment with a charm.' : '用于作为护符安装到装备上.',
                'Used to imbue a weapon or staff with a charm.' : '用于作为护符安装到武器或法杖上',
                'Used to imbue an armor or shield with a charm.' : '用于作为护符安装到盔甲或盾牌上',
                'A protective pouch that will prevent a charm from tearing when you are defeated in battle. Fragile; will always be destroyed if it takes damage.' : '一个保护袋,能降低50%的护符耐久度损耗,当因被击败导致护符受损时,会代替护符被摧毁.',
                'A protective pouch that will prevent a charm from tearing when you are defeated in battle. Low chance of being destroyed if it takes damage.' : '一个保护袋,能降低90%的护符耐久度损耗,当因被击败导致护符受损时,有20%几率被摧毁.',
                'A protective pouch that will prevent a charm from tearing when you are defeated in battle. Indestructible.' : '一个保护袋,能完全防止护符的耐久度损耗,并完全防止你在战斗中被击败时导致护符被摧毁.本身也不会被摧毁',
                'reforge and upgrade cloth armor.' : '升级布甲',
                'reforge and upgrade staffs and shields.' : '升级法杖和盾牌',
                'reforge and upgrade heavy armor and weapons' : '升级重甲和武器',
                'reforge and upgrade light armor' : '升级轻甲',
                'reforge Phase Armor' : '强化相位甲',
                'reforge Shade Armor' : '强化暗影甲',
                'reforge Power Armor' : '强化动力甲',
                'reforge Force Shields' : '强化力场盾',
                'upgrade equipment bonuses to ' : '升级装备的 ',
                'Elemental Magic Proficiency': '元素魔法熟练度',
                'Divine Magic Proficiency': '神圣魔法熟练度',
                'Forbidden Magic Proficiency': '黑暗魔法熟练度',
                'Deprecating Magic Proficiency': '减益魔法熟练度',
                'Supportive Magic Proficiency': '增益魔法熟练度',
                'Magical Base Damage': '基础魔法伤害',
                'Physical Base Damage': '基础物理伤害',
                'The core of a legendary weapon. Contains the power to improve a weapon beyond its original potential.' : '一件传奇武器的核心。含有提升一件武器原始潜能的力量。',
                'The core of a peerless weapon. Contains the power to improve a weapon beyond its original potential.' : '一件无双武器的核心。含有提升一件武器原始潜能的力量。',
                'The core of a legendary staff. Contains the power to improve a staff beyond its original potential.' : '一件传奇法杖的核心。含有提升一件法杖原始潜能的力量。',
                'The core of a peerless staff. Contains the power to improve a staff beyond its original potential.' : '一件无双法杖的核心。含有提升一件法杖原始潜能的力量。',
                'The core of a legendary armor. Contains the power to improve an armor piece or shield beyond its original potential.' : '一件传奇护甲的核心。含有提升一件护甲或者盾牌原始潜能的力量。',
                'The core of a peerless armor. Contains the power to improve an armor piece or shield beyond its original potential.' : '一件无双护甲的核心。含有提升一件护甲或者盾牌原始潜能的力量。',
                //碎片
                'These fragments can be used in the forge to permanently soulbind an equipment piece to you, which will make it level as you do.' : '这些碎片可以在锻造中用于将装备永久地灵魂绑定到你身上，这将使它属性与你一起成长。',
                'Used to power Featherweight Charms.' : '用于升级或修理轻羽护符',
                'Used to power Voidseeker Charms.' : '用于升级或修理虚空祝福护符',
                'Used to power Aether Charms.' : '用于升级或修理以太护符',
                'Can be used to create a new world inside an equipment piece. Clearing this world will allow you to upgrade it further.' : '可用于在装备件内创建一个新世界。清除这个世界将使你能够进一步升级它。',
                'These fragments can be used in the forge to permanently soulfuse an equipment piece to you, which will make it level as you do.' : '这个碎片可以将一件装备与你灵魂绑定，灵魂绑定的装备属性将随着你的等级变化。',
                'You can exchange this token for the chance to face a legendary monster by itself in the Ring of Blood.' : '你可以用这些令牌在浴血擂台里面换取与传奇怪物对阵的机会',
                'You can use this token to unlock monster slots in the Monster Lab, as well as to upgrade your monsters.' : '你可以用这些令牌开启额外的怪物实验室槽位，也可以升级你的怪物',
                'Use this ticket on a lottery to add 100 tickets and double your effective ticket count. Will not increase effective count past 10% of the total tickets sold.' : '你可以使用这张彩券兑换100张当期彩票，并且让自己持有的彩票数量翻倍(效果在开奖时计算，最多不超过总奖池10%)',
                'Artifacts and Trophies' : '文物和奖杯',
            }
        },
        {
            // 技能翻译
            priority: 2,
            excludeSelector:"#pane_log, #pane_monster",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=(?:Character&ss=(?:ab|se)|Battle&ss)/
                },
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss=am&screen=modify&filter=" },
                { mode: "prefix", match: "https://hentaiverse.org/isekai/?s=Bazaar&ss=am&screen=modify&filter=" },
            ],
            translations: {
                'Hastened' : '急速[S]',
                'Absorbing Ward' : '吸收结界[S]',
                'Slowed' : '缓慢[D]',
                'Weaken' : '虚弱[D]',
                'Weakened' : '虚弱[D]',
                'Imperiled' : '陷危[D]',
                'Imperil' : '陷危[D]',
                'Blinded' : '盲目[D]',
                'Blind' : '盲目[D]',
                'Asleep' : '沉眠[D]',
                'Confuse' : '混乱[D]',
                'Confused' : '混乱[D]',
                'Silence' : '沉默[D]',
                'Silenced' : '沉默[D]',
                'Magically Snared' : '魔磁网[D]',
                'Vital Theft' : '生命窃取[D]',
                'Drain' : '枯竭[D]',
                'Silence' : '沉默[D]',
                'Silenced' : '沉默[D]',
                'Magically Snared' : '魔磁网[D]',
                'Immobilize the target, making it unable to evade attacks or spells.' : '固定目标，使其无法躲避攻击或法术。',
                'Inflicts Drain on one target, causing damage over time.' : '对目标施加枯竭，给予持续伤害。',

                'Fiery Blast' : '炎爆术(Ⅰ)',
                'Inferno' : '地狱火(Ⅱ)',
                'Flames of Loki' : '邪神之火(Ⅲ)',
                'Freeze' : '冰冻(Ⅰ)',
                'Blizzard' : '暴风雪(Ⅱ)',
                'Fimbulvetr' : '芬布尔之冬(Ⅲ)',
                'Shockblast' : '电能爆破(Ⅰ)',
                'Chained Lightning' : '连锁闪电(Ⅱ)',
                'Wrath of Thor' : '雷神之怒(Ⅲ)',
                'Gale' : '烈风(Ⅰ)',
                'Downburst' : '下击暴流(Ⅱ)',
                'Storms of Njord' : '尼奥尔德风暴(Ⅲ)',
                'Smite' : '惩戒(Ⅰ)',
                'Banishment' : '放逐(Ⅱ)',
                'Paradise Lost' : '失乐园(Ⅲ)',
                'Corruption' : '腐化(Ⅰ)',
                'Disintegrate' : '瓦解(Ⅱ)',
                'Ragnarok' : '诸神黄昏(Ⅲ)',

                'Slow' : '缓慢[D]',
                'Sleep' : '沉眠[D]',
                'MagNet' : '魔磁网[D]',
                'Immobilized' : '固定术[D]',
                'Immobilize' : '固定术[D]',

                'Cure' : '治疗术[S]',
                'Regen' : '细胞活化[S]',
                'Full-Cure' : '完全治疗术[S]',
                'Haste' : '急速[S]',
                'Protection' : '守护[S]',
                ' of Protection' : ' 保护(物减伤+)',
                'Shadow Veil' : '影纱[S]',
                'Absorb' : '吸收[S]',
                'Spark of Life' : '生命火花[S]',
                'Arcane Focus' : '奥术集中[S]',
                'Heartseeker' : '觅心者[S]',
                'Spirit Shield' : '灵力盾[S]',

                'Flee' : '逃跑',
                'Scan' : '扫描',
                'FUS RO DAH' : '龙吼',
                'Orbital Friendship Cannon' : '友谊小马炮',
                'Concussive Strike' : '震荡打击',
                'Skyward Sword' : '天空之剑',
                'Frenzied Blows' : '狂乱百裂斩(Ⅲ)',
                'Iris Strike' : '虹膜打击(Ⅰ)',
                'Backstab' : '背刺(Ⅱ)',
                'Shatter Strike' : '粉碎打击(Ⅲ)',
                'Rending Blow' : '撕裂打击(Ⅱ)',
                'Great Cleave' : '大劈砍(Ⅰ)',
                'Merciful Blow' : '最后的慈悲(Ⅲ)',
                'Shield Bash' : '盾击(Ⅰ)',
                'Vital Strike' : '致命打击(Ⅱ)',
                'Arcane Blow' : '奥术冲击',
            }
        },
        {
            // 设置页
            priority: 3,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Character&ss=se/
                }
            ],
            translations: {
                //难度
                'Challenge Level' : '难度等级',
                'Challenge' : '等级名称',
                'Normal' : '普通',
                'Hard' : '困难',
                'Nightmare' : '噩梦',
                'Hell' : '地狱',
                'Nintendo' : '任天堂',
                'IWBTH' : 'I Wanna',
                'PFUDOR' : '彩虹小马',
                'EXP Mod' : '经验倍率',
                'Balanced Fun' : '平衡而有趣',
                'Somewhat Tricky' : '有些棘手',
                'Pretty Tough' : '确实挺难的',
                'Even Tougher' : '还能更难(掉落率与"任天堂"相同)',
                'Old School' : '像小时候的红白机游戏一样无情',
                'I Wanna Be The Hentai' : '我要成为大Hentai',
                'Smiles' : '微笑 :-)',
                'When you get too powerful to be challenged by the mobs on the normal difficulty, you can increase the Challenge Level here.' : '当你变的足够强大，感到对付当前难度的怪物已经没有挑战性的时候，你可以在这里改变游戏的难度等级。',
                'Playing on a higher Challenge Level will increase the EXP you get from each mob, but the mobs have increased HP and hit harder' : '在更高的难度等级下，你会获得更好的掉落，更多的经验与Credit，怪物也将变的更强',
                'Additional difficulty levels unlock as you level up.' : '更高的难度选项会在等级提升后解锁(150级解锁I Wanna难度,200级解锁彩虹小马难度)',

                'Display Title' : '称号一览',
                'Here you can choose which of your available titles that will be displayed below your level and on the forums.' : '在这里可以选择你的称号，称号会显示在你的等级下方以及论坛中',
                'Effect' : '效果',
                'Title' : '称号',
                'Newbie' : '新人',
                'Novice' : '入门者',
                'Beginner' : '初学者',
                'Apprentice' : '学徒',
                'Journeyman' : '熟练工',
                'Artisan' : '工匠',
                'Expert' : '专家',
                'Master' : '大师',
                'Champion' : '冠军',
                'Hero' : '英雄',
                'Lord' : '领主',
                'Ascended' : '升华者',
                'Destined' : '天选者',
                'Godslayer' : '弑神者',
                'Dovahkiin' : '龙裔',
                'Ponyslayer' : '小马杀手(也可使用龙吼)',
                '% Damage' : '% 攻击伤害',
                '% Evade' : '% 闪避率',
                'The power of the Dragonborn.' : '+10.0% 攻击伤害, +3% 闪避率 并可使用龙吼',
                'Level Default' : '自动选择(根据当前等级)',
                'See Below' : '见下表(到“领主”为止)',
                'No Bonus' : '无加成',

                'Font Engine' : '文字引擎',
                'Here you can choose a custom font instead of the standard HentaiVerse font engine.' : '在这里你可以选择使用自定义字体取代HV的默认字体，',
                'This mostly affects how fast pages will render and how pretty they will look.' : '这将大幅改善页面的加载速度以及页面显示的字体效果。(为了完全汉化其它内容及更好的使用其它脚本，你必须设置自定义字体)',
                'Use Custom Font (specify below - this font MUST be installed on your local system to work)' : '使用自定义字体(下方字体名称必填，所指定的字体如果本地系统内没有安装会自动使用其它字体替代)',
                'font-family' : '字体名称',
                'font-size' : '字体大小',
                'font-weight' : '字体深浅',
                'font-style' : '字体版式',
                'vertical adjust' : '垂直调整',
                'Allowed' : '可选',
                '5 to 20 (points)' : '5 ~ 20 号(请输入数字)',
                'normal, bold, bolder, lighter' : '普通(normal),粗体(bold),粗体+(bolder),细(lighter)(请输入对应英文)',
                'normal, italic, oblique' : '普通(normal),斜体(italic),斜体+(oblique)(请输入对应英文)',
                '-8 to 8 pixels (tweak until text appears centered)' : '-8 ~ 8 像素(请输入数字，可适当调整使文字垂直居中)',

                'Equipment Sets' : '套装设定',
                'If you want to have separate slotted abilities, battle items and skillbars/autocast assignments per equipment set for your current persona, you can toggle the options below. ' : '默认情况下，同一个人格角色下的所有装备套装共享一样的技能、战斗物品、快捷栏、自动施法配置。如果你想让不同的装备套装使用不同的各项配置，你可以在这里更改选项。',
                'If this is changed, the current persona\'s shared set will be assigned to Set 1 and vice versa. This can be set differently for each persona.' : ' 如果以下选项被勾选，则当前人物角色该项的原有设置将仅应用于套装1，其它套装可以重新设置，当取消勾选时则当前人格角色下所有套装的该项配置将重新使用原有套装1的设置。',
                'Use Separate Ability Set Assigments' : '使用不同的技能配置',
                'Use Separate Battle Item Assigments' : '使用不同的战斗物品配置',
                'Use Separate Skillbar/Autocast Assignments' : '使用不同的快捷栏及自动施法配置',

                'Vital Bar Style' : '状态值显示设置',
                'You can either use the standard bar which uses pips for charges, or a more utilitarian (and skinnable) bar that has numerical bars for everything.' : '你可以使用预设的两端缩进式(类似上古卷轴)血条来表示生命值，圆点来表示斗气槽，也可以使用更直观的通常血条来表示生命值和斗气槽。',
                'Standard' : '预设',
                'Utilitarian' : '通常',

                'Shrine Trophy Upgrades' : '高级献祭设置',
                'By default, as you gain levels, Snowflake will start accepting more lower-tier trophies for a higher-trophy roll in the Shrine. You can override this behavior here.' : '随着你等级的提升，你可以将多个低级奖杯一同献祭给雪花女神以获得更高级别奖杯的奖励，你可以在下面更改升级设置。',
                'Use Default' : '默认设置(自动选择，200级自动选择升级至等级3，300级时选择升级至等级4，400级时选择升级至等级5)',
                'Upgrade to Tier 3' : '升级至等级3(消耗4个T2奖杯以获得T3奖杯的奖励，同时使奖杯的总献祭价值增加至1.1倍)',
                'Upgrade to Tier 4' : '升级至等级4(消耗8个T2奖杯或2个T3奖杯以获得T4奖杯的奖励，同时使奖杯的总献祭价值提升为1.2倍)',
                'Upgrade to Tier 5' : '升级至等级5(消耗32个T2奖杯或8个T3奖杯或4个T4奖杯以获得T5奖杯的奖励，同时总献祭价值提升为1.3倍)',
                'Do Not Upgrade' : '不升级',

                'Quickbar Slots' : '快捷栏',
                'Here you can set up which spells will appear on the battle screen quickbar.' : '这里你可以设定战斗中显示的技能快捷栏',
                '/Set (\\d+) is selected/' : '当前使用的设置为套装$1',
                'Not Assigned' : '未设置',

                'Auto-Cast Slots' : '自动施法',
                'Here you can set which spells will be automatically cast at the start of each battle' : '这里你可以选择在战斗中持续释放的法术，这些法术效果会常驻在状态栏，但是会每回合消耗你的魔力',
                'Note that you have to unlock one or more' : '你可以在hath能力中解锁',
                'to use these' : '使自动施法的消耗更低',
                'If your MP decreases below 10%, the innate spells will dissipate. They will be recast when it goes back above 25%.' : '如果你的MP低于10%，这些法术效果将会消失，直到你的MP回复到25%以上',
                'Upkeep' : '维持法术需消耗',
                'MP/round' : '魔力/回合',
                'Autocast' : '自动施法槽',

                'Auto-Sell / Auto-Salvage' : '自动出售/自动分解',
                'If you want to automatically dump junk equipment on the closest travelling salesmoogle or break it down into parts, you can do so here. ' : '如果你打算自动把垃圾装备就近出售给路过的商人或者将其分解成材料，你可以在这里设置装备过滤器。',
                'All equipment of the specified qualify and below will be automatically sold or turned in to salvage. ' : '所有你所指定品质及以下的装备将会在获得时被自动出售或者分解。',
                'If a dropped equipment qualifies for both sell and salvage, the action with the lowest required quality will be taken.' : '如果一类装备同时设置了自动出售和自动分解，则优先执行对装备品质要求低的，如果品质要求相同，则优先出售',
                'No Auto-Sell' : '不自动出售',
                'No Auto-Salvage' : '不自动分解',
                'Sell' : '出售',
                'Salvage' : '分解',

                //装备品质
                'Flimsy' : '脆弱',
                'Crude' : '粗糙',
                'Fair' : '普通',
                'Average' : '中等 ',
                'Superior' : '上等',
                'Fine' : '优质 ',
                'Exquisite' : '✧精良✧',
                'Magnificent' : '☆史诗☆',
                'Legendary' : '✪传奇✪',
                'Peerless' : '☯无双☯',
                //单手武器类型
                'Axe' : '🪓斧(单)',
                'Club' : '🦯棍(单)',
                'Rapier' : '🤺西洋剑(单)',
                'Shortsword' : '⚔️短剑(单)',
                'Wakizashi' : '🔪脇差(单)',
                'Dagger' : '🗡️匕首(单)',
                //双手武器类型
                'Estoc' : '🤺刺剑(双)',
                'Longsword' : '⚔️长剑(双)',
                'Katana' : '※太刀(双)',
                'Scythe' : '𖤠镰刀(双)',
                'Mace' : '🔨战锤(双)',
                'Great Mace' : '🔨战锤(双)',
                'Swordchucks' : '⚔︎锁链双剑(双)',
                'Staff' : '🧙‍♂️法杖(双)',
                //盾类型
                'Buckler' : '🛡️小圆盾(副)',
                'Kite Shield' : '🔰鸢盾(副)',
                'Tower Shield' : '🚪塔盾(副)',
                //法杖类型
                'Oak' : '橡木(增益熟练+圣法伤+)',
                'Redwood' : '红木(元素熟练/法伤+)',
                'Willow' : '柳木(减益熟练+暗法伤+)',
                'Katalox' : '铁木(圣暗熟练/法伤+)',
                'Ebony':'乌木(元素圣暗熟练/法伤+)',
                //护甲部位
                'Cap' : '🪖帽 ',
                'Helmet' : '🪖头盔',
                'Robe' : '🥼长袍',
                'Breastplate' : '🥼护胸',
                'Cuirass' : '🥼胸甲',
                'Power Armor' : '动力(重) 🥼盔甲',
                'Gloves' : '🤲手套',
                'Gauntlets' : '🤲手甲',
                'Pants' : '🦵裤子',
                'Leggings' : '🦵绑腿',
                'Greaves' : '🦵护胫',
                'Shoes' : '👣鞋子',
                'Boots' : '👣靴子',
                'Sabatons' : '👣马靴',

                'Apply Changes' : '确认更改',

            }
        },
        {
            // 祭坛
            priority: 2,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Bazaar&ss=ss/
                }
            ],
            translations: {
                "One-Handed Weapon": "单手武器",
                "Two-Handed Weapon": "双手武器",
                "Ranged Weapon": "远程武器",
                "Shield": "盾牌",
                'One-handed Weapon':'单手武器',
                'Two-handed Weapon':'双手武器',
                'Staff':'法杖',
                'Helmet' : '头部',
                'Body' : '身体',
                'Hands' : '手部',
                'Legs' : '腿部',
                'Feet' : '足部',
                'Welcome to Snowflake\'s Shrine' : '欢迎来到雪花神殿',
                'Here you can make an offering to Snowflake, the Goddess of Loot and Harvest.' : '在这里你可以向雪花女神，司掌战利品与收获的女神献上祭品。',
                'Snowflake will grant you various boons depending on your offering.' : '雪花女神会根据你献上的祭品给予相应的馈赠。',
                'Select a trophy, artifact or collectible to continue.' : '从左侧列表中选择一件文物、奖杯或者收藏品查看具体献祭说明',
                'Artifacts can be exchanged for a random reward.' : '文物可以兑换随机奖励',
                'Depending on your luck and earlier rewards, you can get one of the following:' : '基于你的人品 你可以获得以下随机一项奖励',
                'Some Hath' : '2 Hath(活动文物为1 hath)(20%)',
                'A bunch of crystals' : '随机种类水晶5000颗(活动文物为3000颗)(40%)',
                'Some rare consumables' : '3瓶终极秘药，1个花瓶，1个泡泡糖，1枚混沌令牌(40%)',
                'A permanent +1 bonus to a primary stat' : '永久提升1点主要属性(0-10%，越接近属性上限几率越低)',
                'You cannot currently receive more than ' : '根据你目前的等级，你不能获得多于',
                'to any primary stat. This increases by one for every tenth level. ' : '点属性奖励，此上限每10级提升1点。',
                'Gaining primary stats in this way will not increase how much EXP your next point costs.' : '利用这种方式获得的主属性提升不会增加你的加点消耗。',
                'Trophies can be exchanged for a piece of equipment.' : '奖杯可以用于兑换装备',
                'The quality and tier of the item depends on the trophy you offer. ' : '装备品质取决于献祭的奖杯等级。',
                'You can select the major class of the item being granted from the list below.' : '你可以选择要获取的装备类型或部位。',
                'Offering ' : '献祭 ',
                'Trophy Tier' : '奖杯等级',
                'You have handed in' : '你有总价值',
                'worth of trophies' : '的奖杯献祭记录(在购买了hath能力"雪花的信徒"后，每献祭价值合计1000万的奖杯，可获得一张“无双凭证”，用于兑换灵魂绑定的无双装备)',
                'Collectibles can be exchanged for a random selection of bindings and materials.' : '献祭一个收藏品可以获得随机种类的 1 个粘合剂和 1-3 个高阶基本素材',
                'Random Reward' : '随机奖励',
                'Are you sure you wish to offer Snowflake a' : '你确定要献上一个',
                'Snowflake has blessed you with an item' : '雪花女神用这个道具祝福了你',
                'Salvaged it for' : '自动分解后获得',
                'Sold the remains for' : '自动出售残骸后获得',
                'Hit Space Bar to offer another item like this.' : '按空格键继续献上相同的奖杯',
            }
        },
        {
            // 市场页
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Bazaar&ss=mk/
                }
            ],
            translations: {
                'Consumables' : '消耗品',
                'Materials' : '材料',
                'Trophies' : '奖杯',
                'Previous Consumable' : '上一种消耗品',
                'Next Consumable' : '下一种消耗品',
                'Next Material' : '下一种材料',
                'Previous Material' : '上一种材料',
                'Previous Trophy' : '上一种奖杯',
                'Next Trophy' : '下一种奖杯',
                'Artifacts' : '文物',
                'Figures' : '小马雕像',
                'Monster Items' : '怪物物品',
                'Account Balance' : '账户余额',
                'Market Balance' : '市场余额',
                'Browse Items' : '查看市场',
                'My Buy Orders' : '我的买单',
                'My Sell Orders' : '我的卖单',
                'Market Log' : '市场记录',
                'Account Log' : '帐号记录',
                'Trade Log' : '交易记录',
                'Listed Sell Orders' : '卖单列表',
                'Listed Buy Orders' : '买单列表',
                'There are no items matching this filter' : '当前没有符合筛选条件的物品',
                'There are no orders for this type of item' : '当前类别没有订单',
                'There are no recent market events.' : '最近没有市场活动',
                'Only With Sellable Stock' : '只看可出售库存',
                'Only With Buyable Stock' : '只看可购买库存',
                'Show Obsolete Items' : '显示绝版物品',
                'Your Stock' : '你的库存',
                'Market Bid' : '市场出价',
                'Market Ask' : '市场要价',
                'Market Stock' : '市场库存',
                'Placing sell orders is locked for the first' : '在异世界每季度最开始',
                '24 hours of each Isekai season.' : '前24小时投放卖单将被临时禁用',
                'You have ': '你有 ',
                'Please wait a bit longer before making another account transfer': '转账过于频繁,请稍候',
                ' available to sell. This item is traded in batches of ' : ' 件库存可供出售。本物品出售单位为每组 ',
                '; all prices are per batch. Min price is ' : ' 件, 以下价格都是以组为单位。市场最低出价为 ',
                ' available to sell. This item is traded in single units. Min price is ' : ' 件库存可出售。本物品出售单位为一件，市场最低出价为',
                ' for market orders.' : '.',
                ' for market orders and ' : ', 商店最低供货价为 ',
                ' for backorders.' : '.',
                'Can always be bought for ' : '商店直接供货价为 ',
                'Item cannot be backordered.' : '本物品不支持系统店进货',
                'Your Sell Order' : '你的卖单',
                'Sell Count:' : '出售数量',
                'Min Ask Price:' : '最低卖价',
                'Ask Price:' : '卖价',
                'Stock:' : '库存',
                'Place Sell Order' : '投放卖单',
                'Min Undercut' : '最低减价',
                'Available Sell Orders' : '当前卖单',
                'No sell orders found' : '当前没有卖单',
                'Your Buy Order' : '你的买单',
                'Buy Count:' : '购买数量',
                'Min Bid Price:' : '最低买价',
                'Bid Price:' : '买价',
                'Order Total:' : '总价',
                'Min Overbid' : '最低加价',
                'Place Buy Order' : '投放买单',
                'Update' : '更新',
                'Delete' : '删除',
                'Available Buy Orders' : '当前买单',
                'No buy orders found' : '当前没有买单',
                'Price History' : '历史价格',
                'Count' : '数量',
                'Price' : '单价',
                'Edit Prices' : '编辑价格',
                'Total' : '总计',
                'Sold' : '销售额',
                'Low' : '最低',
                'Avg' : '平均',
                'High' : '最高',
                'Vol' : '总计',
                'Day' : '日',
                'Week' : '周',
                'Month' : '月',
                'Year' : '年',
                'Recent Trades' : '最近交易',
                'Seller' : '卖家',
                'Buyer' : '买家',
                'Item' : '物品',
                'No recent trades found' : '无最近交易记录',
                'No trades found' : '无交易记录',
                'Show Full Trade Log' : '查看全部交易记录',
                'Item Trade Log' : '物品交易记录',
                'Player Trade Log' : '用户交易记录',
                'Back to' : '返回',
                'Go to' : '查看',
                'Order ' : '订单',
                'Amount' : '数额',
                'Balance' : '余额',
                'Info' : '详情',
                'Deposit from credit balance' : '从个人账户中存款至市场账户',
                'Withdrawal to credit balance' : '提款至个人账户',
                'Purchased' : '购买',
                'There are no recent trades.' : '最近无交易记录',
                'Itemshop' : '道具商店',
                'Insufficent credits in market account' : '市场账户余额不足',
                'Insufficent credits in credit balance' : '个人账户余额不足',
                'Insufficient items available' : '你没有足够数量该物品可供出售',
                'You do not have a sufficient market balance to place that order' : '你没有足够的市场余额可供投放当前买单',
                'Bidding price must be at least' : '当前物品最低出价为',
                'Asking price must be at least' : '当前物品最低要价为',
                'You have to wait a short while between placing each order' : '你创建订单过于频繁，稍后再试',
            }
        },
        {
            // 装备类型
            priority: 3,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=(?:Bazaar&ss=am|Character&ss=(?:eq&equip_slot|se))/
                }
            ],
            translations: {
                //装备类型
                'Cotton Armor' : '棉甲(布)',
                'Gossamer Armor' : '薄纱甲(布)',
                'Ironsilk Armor' : '铁丝甲(布)',
                'Phase Armor' : '*相位甲(布)',
                'Leather Armor' : '皮甲(轻)',
                'Drakehide Armor' : '龙皮甲(轻)',
                'Kevlar Armor' : '凯夫拉护甲(轻)',
                'Shade Armor' : '*暗影甲(轻)',
                'Chain Armor' : '链甲(重)',
                'Plate Armor' : '板甲(重)',
                'Reactive Armor' : '*反应装甲(重)',
                'Force Shield' : '*力场盾(副)',
            }
        },
        {
            // 军械库页
            priority: 3,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Bazaar&ss=am/
                }
            ],
            translations: {
                //
                'Equipped' : '装备中',
                'New' : '最新',
                'Modify' : '改装',
                'Repair' : '修理',
                'Organize' : '管理',
                'Soulbind' : '绑定',
                'Purchase' : '购买',
                'Sell' : '出售',
                'Salvage' : '分解',
                'Salvaged' : '已分解',
                'Salvaged - Repair Required' : '已分解 - 需要完全修理',
                'Charm Slot' : '护符栏',
                '(empty)' : '空',
                'Soulbinding Required' : '需要灵魂绑定装备',
                'Upgrade Tier' : '升级情况',
                'Next Tier Materials' : '升级材料',
                'Challenge Item World' : '挑战道具界',
                'Base Stat Rolls' : '基础属性浮动值',
                'Magic Crit Damage':'魔法暴击伤害',
                'Attack Crit Damage':'攻击暴击伤害',
                'Soulbind Equipment' : '魂绑装备',
                'Repair Equipment' : '修理装备',
                'Pin Equipment' : '收藏装备',
                'Unpin Equipment' : '解除收藏装备',
                'Lock Equipment' : '锁定装备',
                'Force Unequip' : '强制脱下',
                'Total Repair Cost' : '修理消耗',
                'Required Items' : '需求道具',
                'Item World Clear Required' : '需要通关道具界',
                'Currently Equipped' : '装备中',
                'Rename Equipment' : '重命名装备',
                'Remove Lock' : '取消锁定',
                'Set To Locked' : '设为锁定',
                'Set To Protected' : '设为保护',
                'Change To Protected' : '改为保护',
                'Change To Locked' : '改为锁定',
                'Remove Protection' : '移除保护',
                'Remove Locked' : '移除锁定',
                'Charm Points' : '护符点数',
                "Move To Storage": "移入仓库",
                "Move From Storage": "移出仓库",
                'Total Salvage' : '总回收材料',
                'Acquired' : '获得了',
                'Sold the salvage remains' : '出售分解残骸获得了',
                'Are you sure you want to buy the ' : '确定要购入这 ',
                'selected equipment' : '件选择的装备吗',
                'Could not reserve the selected items; usually this means they are no longer available.' : '找不到指定物品,这通常说明它已经不存在了',
                'Confirm Action' : '操作确认',
                'Here you can manage your equipment, as well as modify them using Upgrades, Charms and Stat Fusion. Modifications all require that the equipment is soulbound first.' : '在这里，你可以改装你的装备，包括强化装备、安装护符以及通过属性融合对其属性进行修改。所有修改都要求装备首先要为绑定装备',
                'Upgrading equipment will increase the number of Charm Points available, and adds bonues relative to its base stats. The maximum number of upgrades for an equipment is capped by the number of cleared Item Worlds.' : '升级装备将增加装备可用的护符点数，每级1点，并提升装备的全属性(每升一级全属性提升1%,武器伤害提升2%)。装备的最大升级次数受到装备品质以及这件装备已通关道具界层数的限制。',
                'Attaching Charms to your equipment can improve or add new stats, or add special effects and various other boons. Charms and Charm Pouches can be obtained by offering trophies in The Shrine, or purchased from other players in The Market.' : '在装备上附加护符可以改善或添加新的属性，或添加特效和各种其他增益。护符和护符袋可以通过在祭坛献祭奖杯获得，也可以从其他玩家那里购买。',
                'Stat Fusion lets you improve Legendary+ equipment by sacrificing another Legendary+ equipment together with various materials to increase its base stats. (Persistent Only)' : '属性融合允许你通过牺牲另一个传奇+装备以及各种材料来提高其基础属性，从而改进传奇或无双装备(仅永久区)',
                'Materials for upgrades and stat fusion can be obtained from salvaging unwanted equipment or raising monsters in the Monster Lab, or purchased from other players in The Market.' : '材料可以从分解装备和怪物实验室获得，也可以从市场上的其他玩家那里购买。',
                'Select an equipment first to show the available options.' : '选择一件装备以显示可用选项。',
                'All equipment has a Condition value which degrades when you are defeated in battle, as well as at a fixed rate depending on the equipment Durability and the number of cleared rounds. Repairs require different Scrap Material corresponding to the equipment type; these can be salvaged from low-grade equipment, or bought from the Item Store or The Market.' : '所有装备都有耐久度，当你在战斗中被击败时，耐久度会降低，并且根据装备的耐久性和战斗的回合数以固定术的速率降低。维修需要与装备类型相对应的不同废料；这些可以从低级装备中回收，也可以从物品商店或市场上购买。',
                'Magitech equipment and equipment with attached charms will also have an Energy value. Energy is consumed at a fixed rate depending on the number of cleared rounds. Recharging energy requires Energy Cells; these can be salvaged from magitech equipment, or bought from the Item Store or The Market. Attached charms affect the required number of energy cells and can also require other upkeep materials.' : '高级装备和护符带有电量值。根据战斗回合数，电量值会以固定速率消耗。充电需要能量电池；这些可以从高级装备中回收，也可以从物品商店或市场上购买。附加的护符会影响充电所需的能量电池数量，也会增加修理材料的种类。',
                'When you are defeated in battle, any charms attached to your equipment have a chance to take damage. If a charm is protected by a pouch, this can destroy the pouch, exposing the charm. If the charm is exposed, any damage will cause it to tear. Torn charms and destroyed pouches can be replaced with spare charms and pouches from your inventory; these can be obtained in the Item World or by offering trophies in The Shrine, or bought from other players in The Market.' : '当你在战斗中被击败时，你装备上的任何护符都有可能受到伤害。如果一个护身符被一个袋子保护着，这可能会破坏袋子，露出护符。如果护符暴露出来，任何损坏都会导致它被摧毁。损坏的护符和损坏的袋子可以用库存中的备用护符和袋子代替；这些可以在道具界获得，也可以在祭坛献祭获得，或者在市场上从其他玩家那里购买。',
                ' Replace Charms & Pouches' : '直接替换护符与护符袋。',
                'This page allows you to organize your equipment.' : '此页面允许你管理装备。',
                'Protected equipment require an additional confirmation to select for sell or salvage, to be attached to mooglemails, and to be sacrificed for stat fusion. This protects them from various dangerous actions while not preventing it outright' : '受保护的装备在出售,分解,寄送,属性融合时需要经过额外确认，这可以保护它们免受各种危险行为的影响，同时也不会完全禁止你这么做',
                'Locked equipment are further protected and will not show up on pages with potentially dangerous actions at all. You can still freely repair, upgrade and modify protected and locked equipment. Equips cannot be both locked and protected' : '锁定的装备得到了进一步的保护，使其根本不会出现在这些具有潜在危险行为的页面上。你仍然可以自由修理、强化和改装受保护和锁定的装备。装备不能同时被锁定和保护',
                'These will generally be available to buy back for up to a day, but you should not rely on this.' : '你通常可以在一天之内回购它们，但系统不能保证它们一定还在库，所以你不应该太依赖这个功能。',
                'Excess inventory of tradeable equipment will be pruned regularly, and there are no guarantees for how long they will remain available.' : '商店库存将定期被系统削减，所以无法保证这些装备们的在库时间',
                'Charms attached to your equipment may take condition damage, depending on its Pouch; if the condition reaches zero, it will tear, rendering it useless. If you are defeated, some pouches can be destroyed, exposing their charms to additional damage. Torn charms and destroyed pouches can be replaced with spare charms and pouches from your inventory; these can be obtained in the Item World or by offering trophies in The Shrine, or bought from other players in The Market.' : '装备上的护符的耐久值也会受损，具体取决于其护符袋类型；如果护符的耐久值降至零，护符将会被撕裂。如果你被击败，你的护符袋可能会因保护护符而被摧毁，从而使护符暴露出来。如果你的护符没有了护符带的保护，在你被击败时，你的护符可能会被直接摧毁。撕裂的护符和被摧毁的护符袋可以用库存中的备用护符和护符袋替换；这些物品可以从道具界中获得，或在祭坛中献上奖杯，或在市场中从其他玩家处购买。',
                'Pinned equipment are always sorted before unpinned equipment for each respective equipment type.' : '被收藏的装备在装备分类中总会被首先排序.',
                'Locked equipment are protected from various dangerous actions. Specifically, they will not show up on the Sell or Salvage pages or for MoogleMail attachments, and cannot be sacrificed for Stat Fusion. You can still repair, upgrade and modify charms for locked equipment.' : '锁定的装备受到保护，免受各种危险行为的影响。具体来说，它们不会出现在出售或分解页面或邮箱附件中，也不能作为属性融合的素材被消耗。你仍然可以维修、升级和修改锁定装备的护符',
                'Stored equipment are hidden on all equipment lists except for the one on this page, and are not available for any actions. These will not count towards your regular equipment limit unless your equipment storage overflows' : '存仓的装备隐藏在除此页面上的装备列表之外的所有装备列表中，并且不可用于任何操作。除非你的仓库满了，否则这些装备不会占用你的装备上限',
                'Equipped equipment is (obviously) used as an indicator for equipment that is currently equipped, even if it is in a different equipment set or profile. These cannot be stored; attempting this will be silently ignored' : '装备中的装备旁边有一个🗡️的图标，这些装备不能被存入仓库，不过，它们仍然可以被收藏或锁定',
                'Stat Fusion is not available on Isekai.' : '属性融合在异世界不可用',
                'Inventory Capacity' : '物品栏容量',
                'Storage Capacity' : '仓库容量',
                'There are no available equipment of this type.' : '此类别下无可用装备',
                'Bonded with' : '已绑定',
                'No Charm' : '无护符',
                'Silk Pouch' : '丝绸护符袋(T1)',
                'Kevlar Pouch' : '凯夫拉护符袋(T2)',
                'Mithril Pouch' : '秘银护符袋(T3)',
                'Equipment normally has a fixed level that determines the scaling of its stats. Some low-quality equipment drops with an unassigned level; in that case, it will be assigned to your current level when you first equip it.' : '装备通常有一个固定的装备等级，决定了其装备数值的缩放比例。存在一些低质量的装备以装备等级未确定形态掉率；在这种情况下，当你第一次装备它时，它将被自动提升到你当前的级别作为装备等级。',
                'Soulbinding equipment will permanently bind it to you, and makes it always scale to your level. This will also let you access its Item World, as well as enabling the use of Upgrades, Charms and Stat Fusions to improve it.' : '灵魂绑定装备将永久地将其绑定到你身上，并使其属性始终与你的级别相匹配。这也将允许你访问其道具界，并允许使用升级、咒语和属性融合来改进它。',
                'Soulbound equipment becomes permanently untradeable, and can no longer be salvaged. It can still be sold in the Equipment Shop, but cannot be purchased by anyone else. Soulbinding cannot be reversed under any circumstances.' : '灵魂绑定的装备将永远无法交易，也无法再分解。它仍然可以在装备商店出售，但其他人不能购买。灵魂绑定在任何情况下都无法逆转。',
                'You cannot soulbind equipment more than 100 levels above your current level.' : '你可灵魂绑定装备不能超过你当前等级的100级。',
                'Equipment that you cannot soulbind are not listed here.' : '你无法灵魂绑定的装备不会在此列出。',
                'Soulbinding costs a number of Soul Fragments depending on its quality and how much higher level it is compared to you.' : '灵魂绑定需要花费大量的灵魂碎片，数量取决于装备的品质以及它的装备等级与你的等级差距有多大。',
                'Available Soul Fragments' : '可用灵魂碎片数',
                'Here you can purchase tradeable equipment that was sold by other players. Most of the listed equipment can also be purchased by other players at any time, and is regularly cleared out to make room for new stock, so you will want to be quick if you see something you want.' : '在这里，你可以购买其他玩家出售的可交易装备。大多数列出的装备也可以随时由其他玩家购买，并且会定期清理，为新库存腾出空间，所以如果你看到你想要的东西，请尽快下手。',
                'You can also buy back soulbound, salvaged or untradeable equipment that you previously sold yourself, as well as salvage remains that was sold when you manually salvaged equipment. These cannot be bought by other players, but will only be available for a limited time.' : '你还可以回购之前自己出售的灵魂绑定、已拆解或无法交易的装备，以及分解装备时出售的分解残骸。这些不能被其他玩家购买，但只能在有限的时间内回购。',
                'Equipment that was automatically sold or salvaged by a traveling salesmoogle during battle cannot be bought back, since it never really existed in the first place.' : '在战斗中自动出售或由自动分解的装备不能回购，因为它从一开始就不存在。',
                'Current Balance: ' : '资金余额:',
                'Here you can sell equipment you no longer need in exchange for Credits. Any tradeable equipment you sell can be bought by other players.' : '在这里，你可以出售不再需要的装备以换取Credits。你出售的任何可交易的装备都可以被其他玩家购买。',
                'If you sell soulbound, salvaged or untradeable equipment, they cannot be bought by anyone else; you can however still buy them back yourself for a limited time, at an exorbitant markup.' : '如果你出售的是灵魂绑定的、已拆解的或无法交易的装备，那这些装备除你之外其他任何人都买不到；意味着你仍然可以在有限的时间内以过高的价格买回它们。',
                'Salvaging equipment you no longer need will allow you to extract useful materials that can be used for upgrading or repairing other equipment.' : '分解不再需要的装备将使你能够提取可用于升级或维修其他装备的有用材料。',
                'After salvaging, in addition to the extracted materials, the equipment itself will turn into Salvage Remains. You can either keep these, or sell them for a small amount of credits. Salvage Remains are only listed under the Salvaged tabs; they cannot be equipped or modified unless they are repaired, which will restore them to their original condition.' : '拆解后，除了提取的材料外，装备本身也将变成拆解残骸。你可以保留这些残骸，也可以以少量credits出售。拆解残骸仅列在拆解选项卡下；除非进行维修，否则无法对其进行装备或改装，这将使其恢复到原始状态。',
                'Repairing salvage remains will require all the materials you obtained from salvaging them, in addition to the normal repair materials for repairing from zero Condition and Energy.' : '修复拆解残骸将需要你从拆解中获得的所有材料，以及从零耐久和零电量恢复到满的所有修复材料。',
                'Salvaging an upgraded equipment will return 90% of the base materials spent upgrading it. It will not return cores or credits, nor any materials used for Stat Fusion.' : '分解后会返还90%的用于升级装备基础材料（低/中/高等级材料）和稀有材料（例如相位/动力/力场碎片等），但不会返还升级所消耗的核心/催化剂/credit,属性融合中消耗的装备也不会返还.',
                ' Sell Salvage Remains' : '自动出售拆解残骸',
                'You have selected a SOULBOUND equipment.' : '你选中了一件魂绑装备',
                'You have selected a LEGENDARY equipment.' : '你选中了一件传奇装备',
                'You have selected a PEERLESS equipment.' : '你选中了一件无双装备',
                'Are you sure you want to force unequip this item from all equipment sets in all personas? This may also unequip other gear that depends on it.' : '你确定要从所有角色的所有装备集合中强制脱下装备此物品吗？这可能导致依赖它的其他装备无法继续装备。',
                '❌ the ' : '❌ 这 ',
                'SALVAGE' : '分解 ',
                'Obtained: ' : '获得时间: ',
                'Required Repair Materials' : '所需修理材料',
                'Are you sure you want to make this protected equipment selectable' : '你确定要选中这件被保护的装备吗',
                'Are you sure you want to repair this equipment' : '你确定要修理这件装备吗',
                'Are you sure you want to enter this Item World' : '你确定要进入这件装备的道具界吗',
                'If you sell the salvage remains, they can be bought back for a limited time. Salvage remains must be repaired to restore them to usable condition, requiring more materials than you get from salvaging.' : '如果你卖掉分解残骸，它们可以在有限的时间内回购。分解的残骸必须进行修复，以使其恢复到可用状态，这需要提供比分解得到的材料更多的材料。',
                'Check both safety boxes to continue.' : '点击两侧以打勾确认',
                'SELL' : '出售 ',
                'Sold' : '已出售 ',
                'Soulbound and non-tradeable equipment can be bought back for a limited time. Other equipment can also be bought by other players.' : '灵魂绑定和不可交易的装备可以在有限的时间内回购。其他玩家也可以购买这些装备',
                ' 💰 the ' : '💰 这 ',
                'The existing charm will be ' : '现有的护符将被 ',
                'Enter a new customized name for your' : '为你的这件装备输入新名字',
                'Enter a blank name to revert to the default name. Customized names are always removed if the equipment is sold or attached to a MoogleMail.' : '输入空名字会将这件装备变回本名,改名的装备在邮寄后会恢复本名. ',
                'You cannot attach more than two strike charms':'你不能安装多于两个打击护符',
                'Are you sure you want to spend the requisite materials and credits to upgrade this equipment? Credits and Cores cannot be refunded.':'你确定要消耗以下材料和credits来升级你的装备吗,消耗的credits和核心无法返还',

                'Capacitor':'魔力',
                'Juggernaut':'生命',
                'Butcher':'武器伤害',
                'Fatality':'攻击暴击伤害',
                'Overpower':'反招架',
                'Swift Strike':'攻击速度',
                'Annihilator':'魔法暴击伤害',
                'Archmage':'武器魔法伤害',
                'Economizer':'魔力消耗减免',
                'Penetrator':'反抵抗',
                'Spellweaver':'施法速度',
                'Hollowforged':'虚空升华',
                'Featherweight':'轻羽',
                'Swiftness':'攻击速度',
                ' of Swiftness' : ' 迅捷(攻速+)',
                'Lesser':'小型',
                'Greater':'大型',
                'Cold-proof':'冰霜抗性',
                'Dark-proof':'黑暗抗性',
                'Lightning-proof':'闪电抗性',
                'Fire-proof':'火焰抗性',
                'Holy-proof':'神圣抗性',
                'Wind-proof':'疾风抗性',

                'Elemental Prof':'元素熟练',
                'Divine Prof':'神圣熟练',
                'Forbidden Prof':'黑暗熟练',
                'Supportive Prof':'增益熟练',
                'Deprecating Prof':'减益熟练',
                'Affinity':'亲和度',

                'Aether' : '以太祝福',
                'Featherweight Charm' : '轻羽祝福',
                'Voidseeker':'虚空祝福',
                'Destroy Charm':'摧毁护符',
                'Attach Charm':'安装护符',
                'attach a new charm in' : '在以下栏位安装新护符吗',
                'Slot' : '栏位',
                'with a' : '加上',
                'by spending the following materials:' : '消耗材料:',

                'Confirm Purchase' : '确定购买',
                'Confirm Salvage' : '确定分解',
                'Confirm Sell' : '确定出售',
                'Confirm Attach' : '确定安装',
                'Confirm Unequip' : '确定脱下',
                'Unlock Equipment' : '解锁装备',
                'Confirm Attach' : '确定安装',
                'Are you sure you want to' : '你确定要',
                'Stat Fuse Equipment' : '属性融合',
                'Unavailable on Isekai' : '异世界不可用',
                'The existing intact charm will be ' : '现有护符将被',
                'DESTROYED' : '摧毁',
                'DESTROY' : '摧毁',
                ' the charm and pouch in ' : '位于护符',
                'No equipment was selected' : '未选中装备',
                'the salvage remains' : '分解残骸',
                "Missing": "缺少材料:",
                'Base:' : '基础值:',
                'This charm is already attached in Slot' : '该护符已装备在栏位',
                'This charm cannot be attached due to the charm in Slot' : '该护符不能',
                'Replace Pouch' : '替换护符袋',
                'Are you sure you want to replace the intact pouch in ' : '你确定要替换护符袋在',
                'Insufficient Charm Points' : '护符点数不足',
                'Replace Pouch' : '替换护符袋',
                'Sell Salvaged Equipment' : '出售已分解装备',
            },
            patterns: [
                {
                    pattern: /As of right now, you can soulbind equipment up to Level (\d+)/i,
                    replace: (m, d) => `根据你目前的等级,你可灵魂绑定的最大装备等级为 ${d}`
        },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+organize/i,
                    replace: "已选择 $1 / $2 件可管理装备"
                },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+salvage/i,
                    replace: "已选择 $1 / $2 件可拆解装备"
                },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+sell/i,
                    replace: "已选择 $1 / $2 件可出售装备"
                },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+soulbind/i,
                    replace: "已选择 $1 / $2 件可绑定装备"
                },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+purchase/i,
                    replace: "已选择 $1 / $2 件可购买装备"
                },
                {
                    pattern: /Selected\s+(\d+)\s+of\s+(\d+)\s+matching equipment available to\s+repair/i,
                    replace: "已选择 $1 / $2 件可修理装备"
                },
                {
                    pattern: /This charm cannot be attached due to the charm in Slot (\d+)/i,
                    replace: "该护符与栏位 $1 的护符冲突,不能装备"
                },
                {
                    pattern: /Charm Points:\s*(\d+)\s*\/\s*(\d+)/,
                    replace: "护符点数：$1 / $2 "
                },


            ]
        },
        {
            //装备管理
            //priority: 1,
            selector:"#equipaction",
            //excludeSelector:
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Bazaar&ss=am&screen=organize/
                }
            ],
            translations: {
                //"原文":"翻译",
                'Pin' : '收藏',
                'Lock' : '锁定',
                'Store' : '存储',
                'Protect' : '保护',
                'Unchanged' : '保持不变',
                'Enable' : '设置为',
                'Clear' : '清除',
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            // 道具界
            priority: 2,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=(?:Battle&ss=iw|Bazaar&ss=am&screen=modify)/
                }
            ],
            translations: {
                'Confirm Action' : '操作确认',
                'Are you sure you want to enter this Item World' : '你确定要进入这件物品的道具界',
                'World Level' : '道具界等级',
                'Battle Rounds' : '战斗场次',
                'Monster LVL' : '怪物等级',
                'Difficulty' : '难度等级',
                'Required Items' : '需要道具',
                'Entry Cost' : '入场消耗',
                'Available World Seeds' : '剩余世界之种',
            }
        },
        {
            // 邮箱
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Bazaar&ss=mm/
                }
            ],
            translations: {
                'Inbox' : '收件箱',
                'Write New' : '写邮件',
                'Read Mail' : '已读邮件',
                'Sent Mail' : '已发送邮件',
                'Subject' : '主题',
                'Sent' : '发送时间',
                'Read' : '被阅读时间',
                'Never' : '还未',
                'To' : '收件人',
                'From' : '寄件人',
                '< Prev' : '< 上一页',
                'Next >' : '下一页 >',
                'No New Mail' : '没有新邮件',
                'Attaching items on Isekai is restricted to donators.' : '异世界模式下给邮件添加附件功能仅限捐赠玩家。',
                'Attachments also cannot be added on the last day of each season.' : '同时在每个赛季最后一天将无法发送附件。',
                'Attachments also cannot be sent for the last month of each season.' : '同时在每个赛季最后一个月将无法发送附件。',
                'Welcome to MoogleMail. A Moogle approach to email.' : '欢迎来到莫古利邮务，莫古利将为你传送邮件。',
                'From here you can send messages and items to other people in the HentaiVerse, kupo!' : '在这里你可以向其他HV玩家传送信息和物品，咕波！',
                'You can click the buttons above to attach items, equipment, credits or hath to this message. ' : '你可以点击上面的按钮为此邮件添加道具、装备、Credit、Hath附件。',
                'You can click the buttons above to attach items or equipment to this message. ' : '你可以点击上面的按钮为此邮件添加道具、装备附件。',
                'Up to 10 different things can be attached to each message.' : '一封邮件最多可添加10件附件。',
                'You can optionally request payment for messages with attachments with the Credits on Delivery (CoD) setting after attaching at least one item. ' : '当你为一封邮件添加至少一个附件之后，你可以为邮件设置货到付款(CoD)功能。',
                'The receipient will have to pay the specified number of credits in order to remove the attachments from your message. ': 'CoD 功能会令收件人在提取附件时向你支付指定数额的Credits。',
                'To prevent misuse, a small fee is required to use this function unless you have the Postage Paid perk.' : '为了防止滥用，这个功能每次会收取少量费用，除非你购买了Hath能力“邮资已付”。',
                'To prevent misuse, a fee is required to use this function' : '为了防止滥用，这个功能每次会收取一些费用',
                ' unless you have the Postage Paid perk.' : '，除非你购买了Hath能力“邮资已付”。',
                'Until the CoD has been paid, the sender and the recipient can both choose to return the message. ' : '除非货到付款(CoD)已经被收件人支付，否则发件人与收件人可以在任意时刻撤回或者拒收CoD邮件。',
                'This allows the recepient to reject an unwanted message, and allows you to recover your items if the recipient does not accept it within a reasonable time.' : '这可以防止发出的邮件长时间得不到回应或者收到了不合理的CoD邮件的问题。',
                'Note that unsent drafts will be deleted after one month, and sent messages will be deleted after one year. Any remaining attachments for a deleted message will be permanently lost.' : '请注意，邮件草稿将于1个月后自动删除，已发送的邮件在保留1年后也会自动删除，如果被删除的邮件里仍有未提取的附件，它将永久丢失。',
                'Attach Item' : '选择附件',
                'Attach Equipment' : '选择装备',
                'Attached: ' : '已选择附件：',
                'Not Set' : '未设置',
                'Current Funds:' : '你目前拥有:',
                'items attached' : '个附件',
                'Requested Payment on Delivery' : '要求货到付款数额',
                'Your message has been discarded.' : '你的邮件信息已被丢弃。',
                'Any attachments have been returned.' : '邮件中附带的附件已归还仓库。',
                'Your message has been sent.' : '邮件已发送',
                'Sending it will cost you 10 credits, kupo! Are you sure you wish to send this message, kupo?' : '发送本邮件将会收取你 10 Credits 的费用！确定要发送吗?',
                'Are you sure you wish to discard this message, kupo?' : '是否确认丢弃本邮件？',
            }
        },
        {
            // 战斗页面说明
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Battle&ss/
                }
            ],
            translations: {
                'First Blood' : '第一滴血',
                'Learning Curves' : '学习曲线',
                'Graduation' : '毕业典礼',
                'Road Less Traveled' : '孤途之旅',
                'A Rolling Stone' : '浪迹天涯',
                'Fresh Meat' : '鲜肉一族',
                'Dark Skies' : '黑云密布',
                'Growing Storm' : '风雨欲来',
                'Power Flux' : '力量涌动',
                'Killzone' : '杀戮地带',
                'Endgame' : '终局游戏',
                'Longest Journey' : '无尽旅程',
                'Dreamfall' : '梦殒之时',
                'Exile' : '流亡之途',
                'Sealed Power' : '封印之力',
                'New Wings' : '崭新之翼',
                'To Kill a God' : '弑神之路',
                'Eve of Death' : '死亡前夜',
                'The Trio and the Tree' : '大树三重奏',
                'End of Days' : '世界末日',
                'Eternal Darkness' : '永恒黑暗',
                'A Dance with Dragons' : '与龙共舞',
                'Post-Game Content' : '额外内容',
                'Secret Pony Level' : '秘密小马关',
                'Konata' : '泉此方',
                'Mikuru Asahina' : '朝比奈实玖瑠',
                'Ryouko Asakura' : '朝仓凉子',
                'Yuki Nagato' : '长门有希',
                'Real Life' : '现实生活',
                'Invisible Pink Unicorn' : '隐形粉红独角兽',
                'Flying Spaghetti Monster' : '飞行意大利面怪物',
                'Triple Trio and the Tree' : '大树十重奏',
                'There are no challenges available at your level. Check back later!' : '没有适用于你当前等级的挑战。努力升级以后再来查看吧！',
                'Are you sure you wish to start this Arena Challenge' : '确定要开始选定的竞技场挑战吗',
                'Challenge' : '名称',
                'Highest Clear' : '最高通过难度',
                'EXP Mod' : '经验倍率',
                'Min Level' : '入场等级',
                'Rounds' : '战斗场次',
                'Clear Bonus' : '通关奖励',
                'Entry Cost' : '入场消耗',
                'Never' : '还未',
                '1 Token' : '1 鲜血令牌',
                '2 Tokens' : '2 鲜血令牌',
                '3 Tokens' : '3 鲜血令牌',
                '5 Tokens' : '5 鲜血令牌',
                '10 Tokens' : '10 鲜血令牌',
                'Cooldown' : '冷却中',
                'You have' : '你有',
                'tokens of blood.' : '块鲜血令牌',
                'token of blood.' : '块鲜血令牌',
                'Are you sure you wish to spend 1 token to enter the' : '你确定要消耗1块鲜血令牌以进入',
                'Are you sure you wish to spend 2 tokens to enter the' : '你确定要消耗2块鲜血令牌以进入',
                'Are you sure you wish to spend 3 tokens to enter the' : '你确定要消耗3块鲜血令牌以进入',
                'Are you sure you wish to spend 5 tokens to enter the' : '你确定要消耗5块鲜血令牌以进入',
                'Are you sure you wish to spend 10 tokens to enter the' : '你确定要消耗10块鲜血令牌以进入',
                'The Tower is an Isekai-Only battle mode where the goal is to get as high as possible before the end of the season. ' : '塔楼是异世界独有的战斗模式，目标是在每个赛季结束前尽可能获得更高的排位。',
                'Ranking high in this mode at the end of the season will provide you with some permanent bonuses on HV Persistent.' : '塔楼天梯榜以一个赛季为周期进行统计，你到达的塔楼层数越高,你的排名越高,根据你的排名数,你将在每个赛季结束后获得一些永久区的加成与对应的奖励。达到50层将在赛季结束后在永久区获得一张"无双凭证",如果达到100层会再额外获得一张,达到塔楼30层的玩家可在永久区获得全属性+1的加成,40层为+2,50层为+3.同时,每成功攀爬一层塔楼,你可在异世界中获得20%的经验加成与0.1%的伤害加成,并获得(层数+1)*5的灵魂碎片(上限100)与层数/10的世界之种(上限10),并会根据塔楼当前的难度等级获得一件装备',
                'The difficulty and monster level in this battle mode is locked to each floor, with an increase in monster level, difficulty or number of rounds for each floor.' : '此模式下的战斗难度和怪物等级与对应层级绑定，和你的难度设置与自身等级无关。每一层都会伴随着怪物等级、战斗难度或者战斗场次的提升。塔楼在20层前每天可以尝试并通关5次,20层后每天仅能通关1次,尝试3次,逃跑与被击败均视为消耗了尝试次数',
                'Your Ranking: ' : '你的排名: ',
                'Unranked' : '未上榜',
                '1st' : '1',
                '2nd' : '2',
                '3rd' : '3',
                'Current Floor:' : '当前层级:',
                'Monster Level' : '怪物等级',
                'Daily Attempts: ' : '今日尝试次数: ',
                'Daily Clears:' : '今日通关次数:',
                'Welcome to the Grindfest.' : '欢迎来到压榨界',
                'A Grindfest consists of up to 1000 rounds of battle.' : '压榨界包含1000场连续且难度与收益递增的战斗',
                'Starting a Grindfest will consume 1 point of Stamina.' : '进入压榨界战斗会消耗1点精力',
                'There is a small credit reward at the end,' : '完成全部的压榨界战斗',
                'if you make it all the way through.' : '可以获得5000C的奖励',
                'There are no available equipment of this type.' : '没有可用的装备',
                'Equipment must be soulbound before you can enter its Item World.' : '只有灵魂绑定且未装备中的装备才能进入道具界',
                'Clearing item worlds is the only way to unlock the full potential of your equipment. Select an equipment to enter the world contained within. You can only enter the worlds of equipment that are soulbound to you.' : '通关道具界是释放装备全部潜力的唯一途径。选择一个装备以进入其中包含的世界。你只能进入与你灵魂绑定装备的道具界。',
                'If you manage to fight your way through, you will boost the latent potency of your equipment. This increases the total strength of the charms the equipment can handle, and allows you to upgrade it further.' : '如果你通关了装备的道具界，装备的全属性将会提升，装备的护符点数上限也会提升。这增加了装备可以附加护符的数量，并提升你的装备强化上限。',
                'The number of rounds you will be fighting depends on the quality of your item. More powerful items will have more powerful monsters inside them, and the monsters get more powerful the deeper you go. The difficulty setting does not affect the difficulty in Item Worlds.' : '道具界的战斗回合数取决于装备的品质。更强大的物品内部会有更强大的怪物，你越深入，怪物就越强大。难度设置不会影响道具界中的难度。',
                'Spawning an item world requires a number of World Seeds, depending on its quality and number of item worlds cleared inside that particular equipment.' : '开启道具界需要一些世界种子，具体数量取决于其品质以及你在该装备内清除道具界的次数。',
                'Available World Seeds' : '可用世界之种',
                'You have' : '你有',
                'tokens of blood.' : '块鲜血令牌',
                'token of blood.' : '块鲜血令牌',
                'Spawned Monster': '生成怪物',
            }
        },
        {
            // 战斗技能说明
            priority: 2,
            //exclude: [{ mode: "prefix", match: "" }],
            excludeSelector:".lc, .showequip, #confirm_body, #stats_scrollable, #pane_monster",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/\?s=Battle&ss|\?s=Battle)/
                },
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss=am&screen=modify&filter=" },
                { mode: "prefix", match: "https://hentaiverse.org/isekai/?s=Bazaar&ss=am&screen=modify&filter=" },
            ],
            translations: {
                'Battle Time' : '战斗时间到',
                'Current Floor' : '当前层数',
                'Floor' : '层数',
                'Round' : '场次',
                "Select ALL ponies you see in the image above then hit \"Submit Answer\" before the time limit runs out.": "勾选所有出现在图中的小马然后点击确认",
                'Submit Answer' : '提交答案',
                'Timer' : '剩余时间',
                "You have been defeated": "你被击败了",
                "The grindfest has ended": "压榨界已结束",
                "Defeated": "被击败",
                'Attack' : '攻击',
                'Defend' : '防御',
                'Focus' : '专注',
                ' of Focus' : ' 专注(魔命+法暴伤+魔耗-)',
                'Items' : '道具',
                'Skillbook' : '技能书',
                'Spirit' : '灵动架势',
                " of the Spirit-ward": {
                    replace: " 魂护(暗抗+)",
                    style: "background: #cccccc; color: #000000; padding: 0 1px;"
                },
                'Spirit Gem' : '灵力宝石',
                'Spirit Potion' : '灵力药水',
                'Spirit Elixir' : '灵力秘药',
                'Spirit Draught' : '灵力饮剂',
                "Spirit Stance Engaged":   { replace: "灵动架势开启", style: "background:#FF8888" },
                "Spirit Stance Exhausted": { replace: "灵动架势无法维持", style: "background:#f5b3c4" },
                "Spirit Stance Disabled":  { replace: "灵动架势关闭", style: "background:#f5b3c4" },
                'Decays by 20% per turn' : '每回合损失20%层数',
                'Damages a single enemy. Depending on your equipped weapon, this can place certain status effects on the affected monster. To attack, click here, then click your target. Simply clicking an enemy will also perform a normal attack.' : '普通攻击，取决于你的武器能对怪物造成特定的伤害，单击此处并点击目标怪物进行攻击，没有选中技能法术时仅点击怪物也有相同效果。普通攻击命中怪物可以获得5%~10%斗气。',
                'Use special skills and magic. To use offensive spells and skills, first click it, then click your target. To use it on yourself, click it twice.' : '使用一个技能或法术。对于攻击和减益技能法术，点击技能然后点击目标怪物，对于治疗和辅助法术，仅需点击技能法术名称。重复点击技能书按钮可以切换技能和法术列表。你可以在HV设置中将常用技能法术放在快捷栏上。',
                'Use various consumable items that can replenish your vitals or augment your power in various ways.' : '使用战斗补给品中的道具，它们能恢复你的状态或者给你带来各方面提升。',
                'Toggle Spirit Channeling.' : '切换灵动架式。当你有 100点 以上的斗气可以开启，开启后每次行动消耗 1 点灵力值和 10% 斗气，攻击伤害增加100%，魔力值消耗减少 25%。',
                'Increases your defensive capabilities for the next turn.' : '本回合和下一回合你的物理和魔法减伤增加25%。消耗 10% 斗气恢复 10% 基础生命值 (需要 10%+ 斗气)。',
                'Reduces the chance that your next spell will be resisted. Your defenses and evade chances are lowered for the next turn.' : '本回合无法进行回避、格挡、招架和抵抗，增加下一回合魔法命中和反抵抗率。消耗 25% 斗气恢复 5% 基础魔力值 (需要 25%+ 斗气)。',
                'Choose from the Battle Actions highlighted above, and use them to defeat your enemies listed to the right. When all enemies are reduced to zero Health, you win. If your Health reaches zero, you are defeated.' : '选择上面的任意一个行动来打倒右侧的敌人。当所有敌人生命为0时，你获得胜利，当你的生命为0时，你被打败。',
                //先天技能
                'Run away from the current battle.' : '从战斗中逃跑，逃跑可能需要完整的一回合才会生效，在此期间怪物仍然可以攻击。',
                'Retrieve data on the target.' : '探查目标的情报。',
                //武器技能
                'A precision strike towards the sensory organs of your enemy inflicts massive damage and temporarily blinds it.' : '造成500%伤害，并使目标致盲 20 回合。',
                'Does additional damage to blinded targets.' : '造成1000%伤害，对致盲的目标伤害加倍。 50% 机率使致盲的目标中毒(每回合造成持续伤害且无法闪避) 20 回合。',
                'Hits up to five targets multiple times.' : '对5名敌人共造成 10~20 次250%的伤害。',
                'Bash an enemy with your shield to stun it, which opens up for devastating strikes with your weapon.' : '造成500%打击伤害，使目标晕眩 5 回合。造成打击伤害。',
                'Follow up with an attack that inflicts internal bleeding and causes a large amount of damage if target is stunned.' : '造成500%伤害，必定对已晕眩的敌人造成 90 层流血效果。对眩晕敌人造成4倍伤害。',
                'Finish off a mortally wounded enemy. Instantly kills a target with bleed and less than 25% health.' : '造成1000%伤害，扑杀生命值低于 25% 且正在流血的敌人。',
                'Focus a powerful strike on a single enemy.' : '对单体目标造成1000%伤害,必定暴击。',
                'Tears through enemy defenses, leaving them vulnerable for followup attacks.' : '对5名敌人造成500%伤害，并给予 3 层穿甲效果',
                'A mighty swing with your weapon causes all enemies with penetrated armor to stagger.' : '对5名敌人造成500%伤害，并令穿甲单位晕眩 5 回合。',
                'Focus your magical power into your staff for a precision strike towards the head of your enemy, causing major damage and stunning it.' : '造成100%伤害，使目标晕眩 5 回合，但不会使已晕眩的目标再晕眩。视为法术攻击，可触发魔力合流。',
                'Massive AoE damage to all enemies on the battlefield.' : '对战场上所有的敌人造成2000%的虚空伤害。',
                'Damages and temporarily staggers all enemies on the battlefield.' : '对战场上所有的敌人造成500%的虚空伤害并导致其晕眩 5 回合。',

                //辅助咒语(BUFF)
                'Restores a moderate amount of Health on the target.' : '使目标恢复中量生命值。',
                'Fully restores the Health of the target.' : '使目标恢复全部生命值。',
                'The next magical attack against the target has a chance to be absorbed and partially converted to MP.' : '当本回合受到非暴击的法术攻击时将有机率将其无效化并偷取攻击者一部分魔力补充自身。',
                'Speeds up all actions of the target, allowing it to attack more frequently.' : '加速目标的所有行动，使他行动更频繁。',
                'Places a shield effect on the target, absorbing' : '施加护盾效果，增加自身',
                'of the damage from all attacks.' : '的物理魔法减伤。',
                'Places a heal over time effect on the target.' : '在目标身上施加持续性治疗效果。',
                'Surrounds the target with a veil of shadows, making it harder to hit with attacks and spells.' : '一层幻影面纱包围目标，使他不容易被攻击和咒语击中，并使得有几率完全回避目标的攻击。',
                'Any attack that would one-shot a target with more than 1 HP leaves it alive but on the brink of defeat. The buff is removed when triggered.' : '当目标受到任何致命攻击时会以1HP幸存。辅助效果在触发之后就会消失 (并且消耗玩家的基础灵力值 50%)。',
                'Powerful attacks against you will be partially absorbed and damage your spirit gauge instead of health.' : '根据你灵力盾当前的触发阈值，当你受到超过该阈值的伤害时，降低受到的生命值损伤至触发阈值，剩余伤害转而以SP承担。',
                'The target attains a higher level of attunement with the arcane forces, increasing spell and crit damage.' : '使目标经由奥术力量点化而到达更高的境界，强化魔法伤害与暴击率。',
                'The target attains intimate knowledge of the flow of life in all living beings, increasing attack and crit damage.' : '使目标到达精通万物生命源流的境界，强化攻击伤害与暴击率。',

                //减益咒语(DEBUFF)
                'A net of pure energy ensnares the target, slowing it by' : '使用一张能量网诱捕目标，使其行动速度降低',
                'and making it unable to evade attacks or spells.' : '无法回避并降低其抵抗值',
                'Blinds the target, reducing the chance of it landing attacks and hitting with magic spells.' : '使目标致盲，降低攻击与法术的命中值。',
                'Inflicts Drain on one target, causing damage over time.' : '对目标施加枯竭，给予持续伤害。',
                'Confuses the target, making it lunge out wildly and strike friends and foes alike.' : '使目标产生错乱，如同面对敌人似地疯狂的对伙伴进行攻击。',
                'The target is imperiled, reducing physical and magical mitigation as well as elemental mitigations.' : '威胁目标，降低它的物理和魔法减伤，同时也降低其元素减伤。',
                'The target is silenced, preventing it from using special attacks and magic.' : '使目标沉默，防止它使用技能攻击。',
                'The target is lulled to sleep, preventing it from taking any actions.' : '催眠目标，防止它采取任何行动。',
                'The target is slowed by' : '使目标减速',
                'making it attack less frequently.': '降低目标的攻击速度',
                'The target is weakened, making it deal less damage, and preventing it from scoring critical hits.' : '使目标弱化，让它的攻击打出较低伤害且能防止它打出暴击。',

                //攻击咒语
                'A ball of fire is hurled at the target.' : '对着目标投掷一颗火球。',
                'A blast of wind hits the target, causing Wind damage.' : '刮起一阵风攻击目标，造成风属性伤害。',
                'A bolt of lightning strikes the target, causing Elec damage.' : '落下一道闪电击中目标，造成雷属性伤害。',
                'Unleashes an inferno of flames on all hostile targets, causing Fire damage.' : '释放一道地狱之火对付所有敌人，造成火属性伤害。',
                'Dark damage' : '黑暗伤害',
                'Holy damage' : '神圣伤害',
                'Cold damage' : '寒冰伤害',
                'Fire damage' : '火焰伤害',
                'Wind damage' : '疾风伤害',
                'Elec damage' : '闪电伤害',
                'Void damage' : '虚空伤害',
                'Piercing damage' : '刺击伤害',
                'Slashing damage' : '斩击伤害',
                'Piercing damage' : '打击伤害',

                'Requires' : '需要',
                'Charges to use' : '格充能以使用(1格=25点OC)',
                'Magic Points to use' : '点魔力以使用',
                'Magic Points and' : '点魔力以及',
                'Cooldown:' : '冷却时间:',
                'Expires in' : '剩余时间',
                'turns' : '回合',
                'turn' : '回合',
                'Charge to use' : '格充能以使用(1格=25点OC)',

                /////////////////////////////////////////////////////道具buff效果
                'This powerup will restore a large amount of health.' : '立刻回复100%的基础HP(战场道具，无法带出战斗)',
                'This powerup will restore a moderate amount of mana.' : '立刻回复50%的基础MP(战场道具，无法带出战斗)',
                'This powerup will restore a small amount of spirit.' : '立刻回复50%的基础SP(战场道具，无法带出战斗)',
                'This powerup will grant you the Channeling effect.' : '给予 15 回合的引导效果，施放法术会消耗该效果。(战场道具，无法带出战斗。获得引导时，施放的咒语效果增强 50% 且只会消耗 1 点魔力值。)',
                'Provides a long-lasting health restoration effect.' : '持续回复一定量的生命，持续50回合.',
                'Instantly restores a large amount of health.' : '立刻回复大量的生命.',
                'Fully restores health, and grants a long-lasting health restoration effect.' : '生命值全满,并持续回复一定量的生命，持续100回合.',
                'Provides a long-lasting mana restoration effect.' : '持续回复一定量的魔力值，持续50回合.',
                'Instantly restores a moderate amount of mana.' : '立刻回复一定量的魔力值.',
                'Fully restores mana, and grants a long-lasting mana restoration effect.' : '魔力值全满,并持续回复一定量的魔力值，持续100回合.',
                'Provides a long-lasting spirit restoration effect.' : '持续回复一定量的灵力值，持续50回合.',
                'Instantly restores a moderate amount of spirit.' : '立刻回复一定量的灵力值.',
                'Fully restores spirit, and grants a long-lasting spirit restoration effect.' : '灵力值全满,并持续回复一定量的灵力值，持续100回合.',
                'Fully restores all vitals, and grants long-lasting restoration effects.' : '生命,魔力,灵力全满,并同时产生三种饮剂的效果，持续100回合.',
                'Restores 10 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for ten turns.' : '恢复10点精力，但不超过99，每回合增加10%的灵力和斗气.',
                'Restores 5 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for five turns.' : '恢复5点精力，但不超过99，每回合增加10%的灵力和斗气.',
                'There are three flowers in a vase. The third flower is green.' : '你的攻击伤害、魔法伤害提升25%，命中值、暴击率、回避率、抵抗率大幅提升，持续50回合。',
                'It is time to kick ass and chew bubble-gum... and here is some gum.' : '你的攻击和魔法伤害提升100%。必定命中且必定暴击，持续50回合。',
                'You gain +25% resistance to Fire elemental attacks and do 25% more damage with Fire magicks.' : '你获得 +25% 的火焰抗性且获得 25% 的额外火焰魔法伤害。',
                'You gain +25% resistance to Cold elemental attacks and do 25% more damage with Cold magicks.' : '你获得 +25% 的冰冷抗性且获得 25% 的额外冰冷魔法伤害。',
                'You gain +25% resistance to Elec elemental attacks and do 25% more damage with Elec magicks.' : '你获得 +25% 的闪电抗性且获得 25% 的额外闪电魔法伤害。',
                'You gain +25% resistance to Wind elemental attacks and do 25% more damage with Wind magicks.' : '你获得 +25% 的疾风抗性且获得 25% 的额外疾风魔法伤害。',
                'You gain +25% resistance to Holy elemental attacks and do 25% more damage with Holy magicks.' : '你获得 +25% 的神圣抗性且获得 25% 的额外神圣魔法伤害。',
                'You gain +25% resistance to Dark elemental attacks and do 25% more damage with Dark magicks.' : '你获得 +25% 的黑暗抗性且获得 25% 的额外黑暗魔法伤害。',
                'Grants the Haste effect.' : '使用后产生加速(60%加速)效果，持续100回合',
                'Grants the Protection effect.' : '使用后产生保护(50%减伤)效果，持续100回合',
                'Grants the Haste and Protection effects with twice the normal duration.' : '使用后产生加速和保护的效果，持续200回合',
                'Grants the Absorb effect.' : '使用后获得吸收(100%触发)效果，持续100回合',
                'Grants the Shadow Veil effect.' : '使用产生暗影面纱(30%闪避)效果，持续100回合',
                'Grants the Spark of Life effect.' : '使用产生生命火花(受到致命伤害后消耗25%基础SP，并以50%最大生命复活)效果，持续100回合',
                'Grants the Absorb, Shadow Veil and Spark of Life effects with twice the normal duration.' : '同时产生吸收，闪避，以及生命火花效果，持续200回合',

                /////////////////////////////////////////////////////状态
                //先天能力
                'Focusing' : '专注',
                'Defending' : '防御',
                'Fleeing' : '逃跑',
                'You are mentally prepared for casting a magical attack. The chance for your spell being evaded or resisted is reduced, but so is your chance to avoid attacks.' : '你正集中精力准备释放法术，你的法术被闪避和被抵抗概率降低，但你自身的躲避攻击的能力同样下降。',
                'You are defending from enemy blows. The amount of damage you take is reduced by' : '你正在防御敌人的进攻，你遭受的攻击伤害将减少',
                'You are running away' : '你正尝试从战场中逃离',

                //战斗风格
                'Overwhelming Strikes' : '压制打击',
                'Coalesced Mana' : '魔力合流',
                'Ether Tap' : '魔力回流',
                'Increases attack damage by 15% and attack accuracy by 50%. Also grants a 20% chance per stack to overwhelm enemy parry.' : '增加15%攻击伤害和50%命中值，以及20%的反招架值，最大可堆叠5层',
                'Mystical energies have converged on this target. Striking it with any magic spell will consume only half the normal mana.' : '神秘的能量汇集于这个目标，对其施放法术只需消耗一半的魔力值 (可以和灵动架式共同作用)。',
                'You are absorbing magicks from shattering the Coalesced Mana surrounding a target.' : '你打散了合流于目标周围的魔力然后吸取中。',

                //武器效果
                'Penetrated Armor' : '穿甲',
                'Stunned' : '眩晕',
                'Bleeding Wound' : '流血',
                'A powerful blow has temporarily stunned this target.' : '巨大的冲击使目标陷入眩晕，使其无法行动,招架,闪避,并降低其25%抵抗。',
                'The armor of this target has been breached, reducing its physical defenses.' : '目标的护甲被破坏了，它的物理减伤下降了25% ',
                'Gashing wounds are making this target take damage over time.' : '血流如注的伤口给予此目标持续伤害。',

                //特殊
                'Channeling' : '引导',
                'Blessing of the RiddleMaster' : '御谜士的祝福',
                'You are channeling the mystic forces of the ever-after. Your next spell is powered up by 50%, and costs no MP.' : '你正不断地引导出神祕的力量，你下一次施放的咒语效果会增强 50% 且只会消耗 1 点魔力值。',
                'You have been blessed by the RiddleMaster. Your attack and magic damage are temporarily increased by' : '你已被御谜士祝福，你的攻击和魔法伤害会短暂提升',

                //恢复剂
                'Refreshment' : '灵力饮剂',
                'Regeneration' : '生命饮剂',
                'Replenishment' : '魔力饮剂',
                'Energized' : '带劲',
                'Kicking Ass': '海扁',
                'Sleeper Imprint' : '沉睡烙印',
                'You are generating additional Overcharge and Spirit.' : '你正在产生额外的斗气和灵力。',
                'The Spirit Restorative is refreshing your spirit.' : '灵力恢复剂正在恢复你的灵力',
                'The Health Restorative is regenerating your body.' : '生命恢复剂正在恢复你的生命',
                'The Mana Restorative is replenishing your magic reserves.' : '魔力恢复剂正在恢复你的魔力',
                'Your attacks and spells deal twice as much damage for a short time, will always hit, and will always land critical hits.' : '你的攻击和魔法伤害提升100%。必定命中且必定暴击，持续50回合。',
                'Your attack/magic rating, attack/magic hit/crit chance and evade/resist chance increases significantly for a short time.' : '你的攻击伤害、魔法伤害提升25%，命中值、暴击率、回避率、抵抗率大幅提升，持续50回合。', //20210120验证，以下两条为WIKI内容暂保留
                'Your attacks and spells deal significantly more damage for a short time, will always hit, and will always land critical hits. Also replenishes 20% of base mana and health per turn.' : '你的攻击和咒语伤害短暂大幅提升。必定命中且必定暴击。同时每回合补充 20% 基础魔力与基础生命值。',
                'Your attack/magic damage, attack/magic accuracy and evade/resist chance increases significantly for a short time.' : '你的物理/魔法伤害、物理/魔法命中、回避、抵抗率在短时间内大幅提升。',

                //卷轴
                '(Scroll' : '(卷轴',
                'Increases Action Speed by' : '增加行动速度',
                'Absorbs all damage taken by' : '吸收所有伤害的',
                'Increases evasion by' : '增加闪避率',
                'Any attack that would normally kill the target leaves it alive with 50% HP. The buff is removed when triggered.' : '任何本该杀死玩家的攻击现在玩家可以保留50%的HP存活。辅助效果在触发之后就会消失 (并且消耗玩家25%基础灵力值)',
                'The next magical attack against the target will be absorbed and partially converted to MP.' : '命中此目标的下一次魔法伤害将100%被吸收并转为MP',

                //魔药
                'Infused Flames' : '火焰注入',
                'Infused Frost' : '冰霜缠绕',
                'Infused Lightning' : '雷电缠身',
                'Infused Storm' : '暴风环绕',
                'Infused Divinity' : '神圣附体',
                'Infused Darkness' : '黑暗笼罩',
                'You are wreathed in the power of flames.' : '你被火焰的力量环绕着。',
                'You are suffused with the power of frost.' : '你周身充满了冰霜的力量。',
                'You are surrounded by the power of lightning.' : '你被雷电的力量围绕着。',
                'You are draped in the power of storms.' : '你驾驭着暴风的力量。',
                'You are veiled in the power of divinity.' : '你蒙上了神圣的力量。',
                'You are cloaked in the power of darkness.' : '你被黑暗的力量所笼罩。',

                //BUFF的效果
                'The holy effects of the spell are restoring your body.' : '神圣的法术效果正在恢复你的身体',
                'Places a shield effect on the target, absorbing' : '施加护盾效果，吸收所有攻击',
                'of the damage from all attacks.' : '的伤害值。',
                'The target has been hastened, increasing its action speed by' : '目标已被加速，行动速度增加',
                'A veil of shadows surround the target, increasing its chance to evade attacks and spells by' : '目标被影纱包围，回避率增加',
                'A veil of shadows surround the target, causing monsters to occasionally whiff, and boosting Evade by 20%.' : '目标被影纱包围，导致怪物对你的攻击可能打中你的阴影导致完全打空,并使你的回避率增加20%',
                'This protective veil activates for powerful blows that damage more than' : '根据你灵力盾当前的触发阈值',
                'of your max HP, absorbing the remainder as spirit damage.' : '当你受到超过该阈值的伤害时，降低受到的生命值损伤至触发阈值，剩余伤害转而以SP承担。',
                'Any attack that would normally kill the target leaves it alive with a small amount of HP. The buff is removed when triggered.' : '受到任何致命攻击时会以1HP幸存。辅助效果在触发之后就会消失 (并且消耗玩家50%基础灵力)。',
                'Being brought back by Spark of Life has draped you with this powerful protective shield, increasing your damage resistance for a brief time.' : '被“生命火花”带回战场的你披着此强力的防护盾，你的物理魔法减伤增加75%。',
                'You are able to see the flow of life in all living beings, increasing your attack damage and crit multiplier by 25%.' : '你已到达精通万物生命源流的境界，强化攻击伤害与暴击伤害',
                'and crit chance by': '和暴击率',
                'You have reached a high level of attunement with the arcane forces, increasing your magic damage and crit multiplier by 25%.' : '你经由奥术的力量点化而到达更高的境界，强化魔法伤害与暴击伤害',
                'A veil of shadows surround the target, causing monsters to occasionally whiff, and boosting Evade by 10%.' : '目标周围笼罩着一层阴影，导致怪物偶尔会攻击落空，并使闪避增加10%',

                //DEBUFF效果
                'Weakened' : '虚弱',
                'Slowed' : '缓慢',
                'Magically Snared' : '魔磁网',
                'Imperiled' : '陷危',
                'Silenced' : '沉默',
                'Asleep' : '沉眠',
                'Blinded' : '盲目',
                'Confused' : '混乱',
                'Spreading Poison' : '扩散之毒',
                'Immobilized' : '固定术',
                'Immobilize' : '固定术',
                'Immobilize the target, making it unable to evade attacks or spells.' : '固定目标，使其无法躲避攻击或法术。',
                'The target has been immobilized, eliminating its chance to evade and reducing its magic resistance.' : '目标已经被固定，令它无法闪避，并降低了它20%的抵抗。',
                'The target has been weakened, making it deal less damage, and preventing it from scoring critical hits.' : '目标已被弱化，它的攻击力与魔法伤害降低了，无法造成暴击。',
                'The target has been slowed by' : '目标已被缓慢，行动速度降低。',
                'The target has been hit with a magic net, eliminating its chance to evade or resist attacks.' : '目标已被能量网诱捕，削减它的回避和咒语抵抗。',
                'The target has been imperiled, reducing physical and magical mitigation as well as elemental mitigation.' : '目标已被威胁，降低它的物理和魔法减伤，同样也降低其元素减伤。',
                'The target has been silenced, preventing it from using special attacks and magic.' : '目标已被沉默，防止它释放魔法与灵力攻击。',
                'The target has been lulled to sleep, preventing it from taking any actions. Any attacks against this target are guaranteed to hit, but can also wake it up.' : '目标已进入沉睡，受到的伤害增加50%，抵抗降低20%,并防止它采取任何行动。在此状态下对其进行的任何攻击都是必中,但一定会打醒目标',
                'The target has been blinded, reducing the chance of landing attacks and hitting with magic spells.' : '目标已致盲，降低其攻击与法术的命中值。',
                'The target has been confused, making it lunge out wildly and strike friends and foes alike.' : '目标产生错乱，有25%几率对友军发起攻击。',
                'Poison courses through the target\'s veins. This causes a damage-over-time effect, and reduces its evade chance.' : '毒药正通过目标的静脉扩散。对其造成持续伤害，并降低其闪避率。',
                'Vital Theft' : '生命吸窃',
                'Ether Theft' : '魔力吸窃',
                'Spirit Theft' : '灵力吸窃',
                'Siphons off the target\'s life essence over time. This causes a damage-over-time effect, and returns a small amount of health to the player.' : '持续抽取目标的生命精髓。造成持续伤害效果而且少量的生命值会回到玩家身上。',
                'Siphons off the target\'s mana over time. This returns a small amount of mana to the player.' : '持续抽取目标的魔力值。少量的魔力值会回到玩家身上。',
                'Siphons off the target\'s spirit over time. This returns a small amount of spirit to the player.' : '持续抽取目标的灵力值。少量的灵力值会回到玩家身上。',

                //攻击咒语效果
                'Searing Skin' : '焦灼皮肤',
                'Freezing Limbs' : '冰封肢体',
                'Turbulent Air' : '空气湍流',
                'Deep Burns' : '深层灼伤',
                'Breached Defense' : '防御崩溃',
                'Blunted Attack' : '攻击钝化',
                'The skin of the target has been scorched, inhibiting its attack damage. Cold resistance is lowered.' : '此目标的皮肤已烧焦，抑制它的攻击力，冰冷抗性与抵抗降低。',
                'The limbs of the target have been frozen, causing slower movement. Wind resistance is lowered.' : '此目标的肢体已被冻结，使它行动迟缓，疾风抗性降低。',
                'The air around the target has been upset, blowing up dust and increasing its miss chance. Elec resistance is lowered.' : '此目标周围的气流已被扰乱，扬起的尘土降低它的命中值，闪电抗性降低。',
                'Internal damage causes slower reactions and lowers evade and resist chance. Fire resistance is lowered.' : '体内的伤害导致反应迟钝，降低回避率与抵抗率，火焰抗性降低。',
                'The holy attack has penetrated the target defenses, making it take more damage. Dark resistance is lowered.' : '神圣的攻击刺穿了此目标的防御，它将会受到更多伤害，黑暗抗性降低。',
                'The decaying effects of the spell has blunted the target offenses, making it deal less damage. Holy resistance is lowered.' : '咒语的衰败效果磨钝目标的攻击性，使它打出较低伤害，神圣抗性降低。',
                'Burning Soul' : '焚烧的灵魂',
                'Ripened Soul' : '鲜美的灵魂',
                'The life essence of the target has been set ablaze, damaging its physical form over time.' : '此目标的生命之核已被点燃，对它造成持续伤害。',
                'The life essence of the target has been corrupted beyond repair, damaging its physical form over time.' : '此目标的生命之核持续著无法修补的腐败，对它造成持续伤害。',

                //特殊怪物效果
                'Fury of the Sisters' : '姊妹们的盛怒',
                'Lamentations of the Future' : '未来的悲叹',
                'Screams of the Past' : '昔日的凄叫',
                'Wails of the Present' : '此刻的恸哭',
                'The destruction of the world tree has infuriated its defenders, increasing their accuracy.' : '世界之树的毁灭激怒了它的守护者，增加了她们的命中。',
                'The destruction of the future has increased the attack power of her allies.' : '诗蔻蒂被击倒，消灭了“未来”，其他友军的攻击力被强化了。',
                'The destruction of the past has increased the defensive power of her allies.' : '兀儿德被击倒，消灭了“过去”，其他友军的防御力被强化了。',
                'The destruction the present has increased the attack speed of her allies.' : '蓓儿丹娣被击倒，消灭了“现在”，其他友军的攻击速度被强化了。',

                'Expires if magic is depleted to below 10%' : '如果你的MP低于10%将会消散',
                'Permanent until triggered' : '永续',
            }
        },
        {
            // HVU汉化
            //priority: 1,
            selector: ".hvut-cfg-div, .hvut-top-sub, .hvut-mm-list, .hvut-top-links, .hvut-ab-calc",
            exclude: [{ mode: "prefix", match: "https://forums.e-hentai.org/index.php?showtopic" }],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                'Bazaar' : '商店',
                'Armory' : '军械库',
                'Battle' : '战斗',
                'Modify' : '改装',
                'Repair' : '修理',
                'Organize' : '管理',
                'Soulbind' : '绑定',
                'Purchase' : '购买',
                "Sell": "出售",
                "Salvage": "拆解",
                "MENU": "菜单",
                "Page": "页",

                'General' : '常规',
                'One-handed' : '单手',
                'Two-handed' : '双手',
                'Dual-wielding' : '双持',
                'Niten Ichiryu' : '二天',
                'Ability Boost' : '需额外技能点',
                "Assimilator": "同化者",
                "Currently playing in": "当前位于",
                'Attachment' : '附件',
                'Use Default' : '使用默认',
                "Options": "选项",
                "CoD Deduction": "Cod 减免",
                "Top Navigation Bar": "顶部导航栏设置",
                "topMenuIntegration": "整合顶部导航栏",
                "equipmentIntegration": "显示所有装备",
                "equipShowLevel": "显示装备等级",
                "equipShowPAB": "显示装备属性加成",
                "equipmentShopAutoProtect": "装备自动出售保护",
                "always": "总是",
                "equipmentShopPriceDeductFee": "显示市场道具实际价格",
                "equipmentShopPriceDeductFee": "显示市场道具实际价格",
                "CHARACTER": "角色",
                "BAZAAR": "商店",
                "ARMORY": "军械库",
                "BATTLE": "战斗",
                //MB设置
                "Integrate top menus into one button.": "整合顶部导航栏到一个按钮中",
                "topMenuLinks": "顶部菜单链接",
                "Set quick links in the top.": "设置在顶部出现的快捷菜单(点击下方list查看菜单列表,需要填写英文)",
                "If [topMenuIntegration] above is disabled, set the number of items in the list to 8 or less.": "如果未开启整合顶部导航栏,请保持顶部快捷菜单数量在8个以下",
                "Validation Error": "填写字段错误(填写英文原文)",
                "confirmStaminaRestorative": "确认体力恢复",
                "Confirm whether to use a stamina restorative item.": "使用体力道具时需要确认",
                "disableStaminaRestorative": "禁用体力恢复按钮",
                "Disable the stamina restorative button when stamina is above the specified value.": "当体力下降到指定数值后才出现体力恢复按钮",
                "warnLowStamina": "低体力警告",
                "Warn when stamina is below the specified value.": "低于设定的体力后发出警告",
                "Bottom Bar": "底部栏",
                "showCredits": "显示Credits",
                "Show credits balance.": "是否显示Credits",
                "disable": "关闭",
                "always": "总是",
                "showEquipCapacity": "显示装备上限",
                "warnEquipCapacity": "上限警告",

                "equipPanelPosition": "快捷装备栏位置",
                "equipPanelRepairThreshold": "设置装备修理阈值",
                "equipPanelItemInventory": "消耗品库存阈值",
                "always": "总是",
                "disable": "关闭",
                "always": "总是",

                "Show free space in the Equipment Inventory.": "显示装备仓库的剩余空间",
                "on battle pages only": "仅在战斗页",
                "trainingNotification": "训练提醒",
                "Shows the training in progress and automatically start the next training up to the set level.": "显示正在进行的训练，并自动开始下一次训练，直至达到设定等级",
                "lotteryNotification": "彩票提醒",
                "Show the weapon and the armor which are currently in the lottery.": "展示目前正在开奖的武器和盔甲",
                "lotteryFilters": "彩票过滤",
                "Notify if the new equipment in the lottery qualifies.": "当彩票装备满足过滤器时发送通知(设定时请关掉汉化)",
                "* $pab is not available.": "暂不支持筛选装备的* $pab",
                "equipInventoryIntegration": "整合装备仓库",
                "Integrate all types of equipment into a list in the Equipment Inventory.": "整合所有的装备类型到一页中",
                "equipSort": "装备分类",
                "Sort and categorize the equipment list.": "分类并按种类排序装备列表",
                "equipColor": "装备着色",
                "Set the color of equipment by quality": "按装备品质为装备着色",
                "equipHoverFunctions": "装备快捷操作",
                "Support keyboard and mouse actions when the mouse cursor is over the equipment.": "当鼠标光标位于装备上时可以对装备进行快捷操作",
                "Open equipment link in a pop-up": "在弹出窗口中打开装备链接",
                "Open equipment link in a new tab": "在新窗口中打开装备链接",
                "Show link code": "显示装备链接",
                "Show link code in bbcode format": "显示bbcode格式装备链接",
                "Open equipment link": "打开装备链接",
                "DOUBLE CLICK": "双击",
                "equipTouchFunctions": "装备触屏操作",
                "Support touch actions on mobile": "支持移动端触屏操作",
                "DOUBLE TAP": "双击",
                "LONG PRESS": "长按",
                "equipCode": "装备代码",
                "Set the format of the code for the forum.": "设置论坛中显示的装备代码格式",
                "equipNameCode": "装备名称代码",
                "Set the rules for codes that decorate the names of equipment.": "为装备的词缀与品质设置特别格式",
                "equipmentShopIntegration": "装备商店整合",
                "Integrate all types of equipment on the default shop page.": "整合装备商店页面到一页",
                "equipmentShopShowLevel": "显示商店装备等级",
                "Show equipment's level": "显示装备等级",
                "equipmentShopShowPAB": "显示装备属性加成",
                "Show equipment's pab": "显示装备属性加成",
                "equipmentShopConfirm": "装备页面确认设置",
                "Confirm when selling or salvaging equipment.": "当拆解或出售装备时",
                "confirm less-profitable actions": "对低收益操作进行确认",
                "equipmentShopProtectFilters": "商店页面保护器",
                "Show valuable equipment together at the top of the list, and prevent them from being selected by the \"Select All\" button.": "在列表顶部一起显示有价值的装备，并防止它们被“全选”按钮选中",
                "equipmentShopAutoLock": "商店页面自动上锁",
                "Automatically lock protected equipment.": "自动上锁被保护的装备",
                "equipmentShopBazaarFilters": "商店页面过滤器",
                "Keep valuable equipment in BAZAAR, then hide all other trash.": "确保商店页面只出现有价值的装备,隐藏垃圾",
                "monsterLab": "怪物实验室",
                "Advanced MonsterLab features": "高级怪物实验室功能",
                "monsterLabCloseDefaultPopup": "关闭怪物实验室默认弹窗",
                "monsterLabDefaultSort": "怪物标签筛选",
                "Set the default value for sorting the list.": "设置默认筛选值",
                "shrineHideItems": "祭坛隐藏设置",
                "Hide items to prevent them from being accidentally offered to the Shrine.": "隐藏物品，防止意外供奉给神社",
                "shrineFilters": "祭坛过滤器",
                "Show the names of rewarded equipment of higher quality only.": "仅显示高于这个品质的装备供奉结果",
                "moogleMail": "邮箱",
                "Advanced MoogleMail features": "高级邮件布局",
                "equipEnchantPosition": "增强战斗布局",
                "equipEnchantRepairThreshold": "装备修理阈值",
                "Set the position of the pane": "额外拓展栏位置",
                "left": "左",
                "right": "右",
                "Warn if the durability of each equipment is low.": "低于该耐久度时发出警告",
                "Show the amount of items in the inventory, and warn if each number is less than the specified value.": "显示库存中的物品数量，如果每个数字都小于指定值，则发出警告",
                "You can purchase that quantity from the Item Shop by clicking on the item name in the list.": "你可以通过点击物品快速购买指定数量的物品,下方是默认购买数量",
                "unleveled": "可升级",
                "suffixless": "无后缀",
                "the remains": "分解残骸",
                "Search": "搜索",
            }
        },
        {
            // 细部修正
            //priority: 1,
            //exclude: [{ mode: "prefix", match: "" }],
            conditions: [
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss=am&screen=soulbind" },
                { mode: "prefix", match: "https://hentaiverse.org/isekai/?s=Bazaar&ss=am&screen=soulbind" },
                { mode: "strict", match: "" },
                { mode: "regex", match: "" },
            ],
            translations: {
                "SF": "魂片",
            }
        },
        {
            // PAB翻译
            //priority: 1,
            ignoreWordBoundary: true,
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            selector: ".hvut-eqp-pab, .hvut-eq-info, .hvut-es-pab",
            translations: {
                "S": "力",
                "D": "灵",
                "E": "体",
                "A": "敏",
                "I": "智",
                "W": "慧",
            }
        },
        {
            // 按钮汉化
            priority: 4,
            selector: "input[type='submit'], input[type='button'], button",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //各类按钮
                'Modify Equipment':'改装装备',
                'Repair Equipment':'修理装备',
                'Organize Equipment' : '管理装备',
                'Soulbind Equipment' : '魂绑装备',
                'Purchase Equipment' : '购买装备',
                'Sell Equipment' : '出售装备',
                'Salvage Equipment' : '分解装备',
                'Enter Item World':'进入道具界',
                'Soulbind Equipment' : '魂绑装备',
                'Purchase Equipment' : '购买装备',
                'Sell Equipment' : '出售装备',
                'Salvage Equipment' : '分解装备',
                'Confirm Purchase' : '确认购买',
                'Confirm Sell' : '确认出售',
                'Confirm Salvage' : '确认分解',
                'Confirm Replace' : '确认替换',
                'Confirm Upgrade' : '确认升级',
                'Confirm Select' : '确认选择',
                'Confirm Destroy' : '确认摧毁',
                'Apply Changes' : '应用更改',
                'Place Sell Order' : '发布卖单',
                'Place Buy Order' : '发布买单',
                'Submit Answer' : '提交答案',
                'Upgrade Equipment' : '升级装备',
                'Update' : '改价',
                'Delete' : '删除',
                'Destroy Charm':'摧毁护符',
                'Attach Charm':'安装护符',
                'Remove Lock' : '取消锁定',
                'Set To Locked' : '设为锁定',
                'Set To Protected' : '设为保护',
                'Change To Protected' : '改为保护',
                'Change To Locked' : '改为锁定',
                'Remove Protection' : '移除保护',
                'Remove Locked' : '移除锁定',
                //MB按钮
                'Equip Code' : '装备代码',
                'Equip Pop-ups' : '装备一览',
                'Save' : '保存',
                'Ability Simulator' : '技能模拟器',
                'Close' : '关闭',
                'Current Set' : '当前流派',
                'One-handed' : '单手',
                'Two-handed' : '双手',
                'Dual-wielding' : '双持',
                'Niten Ichiryu' : '二天',
                'Elemental mage' : '元素法师',
                'Dark mage' : '暗法',
                'Holy mage' : '圣法',
                'Save Current Settings' : '保存当前设置为',
                'Show All Items' : '显示所有奖杯',
                'Show Only Filtered' : '显示过滤后奖杯',
                'Offering Results' : '供奉结果',
                'Reset Log' : '祭坛日志',
                'Edit Filters' : '编辑过滤器',
                'Inventory Capacity' : '仓库容量',
                'Filter: Off' : '过滤器: 关',
                'Filter: On' : '过滤器: 开',
                'Offer' : '供奉',
                'All' : '全部',
                'Set as Bid' : '设内置物品基准价为出价',
                'Set as Ask' : '设内置物品基准价为要价',
                'Edit Prices' : '手动编辑价格',
                'The Shrine Log' : '祭坛日志',
                'Edit Filter' : '编辑过滤器',
                'Inventory Capacity' : '仓库容量',
                'EXP Simulator' : '属性模拟器',
                'Close' : '关闭',
                'SEND' : '发送',
                'Edit List' : '编辑收件人',
                'ATTACH from TEXT' : '从文本粘贴',
                'Available Formats' : '可用文本格式',
                'CALC' : '计算',
                'ATTACH' : '附件',
                'RESET' : '重置',
                'Manage Database' : '管理数据库',
                'Search Mail' : '搜索邮件',
                'Reset Database' : '重置数据库',
                'Export to JSON' : '导出到JSON',
                'Import from JSON' : '从JSON导入',
                'GO' : '跳转',
                'Prev' : '前',
                'Next' : '后',
                'Search' : '搜索',
                'Close List' : '关闭列表',
                'Collapse' : '折叠页面',
                'Details' : '展开页面',
                'Bid' : '出价',
                'Ask' : '要价',
                'Edit All Items' : '编辑全部物品价格',
                'Reply' : '回复',
                'Revert' : '撤销',
                'Default' : '默认',
                'Start Battle' : '开始战斗',
                'Select All' : '全选',
                'Purchase' : '购买',
                'Default' : '默认',
                'Purchase & Salvage' : '出售 & 分解',
                'Select' : '选中',
                'Item Prices' : '内置道具价格清单',
                'Lock' : '锁定',
                'Sell' : '出售',
                'Salvage' : '分解',
                'Tradeables' : '可交易',
                'Invert' : '反选',
                'Edit Format' : '编辑格式',
                'Lock' : '锁定',
                'Sell' : '出售',
                'Salvage' : '分解',
            },
            patterns: [
                {
                    pattern: /\bDeposit\b/g,
                    replace: "存款"
                },
                {
                    pattern: /\bWithdraw\b/g,
                    replace: "提款"
                }
            ]

        },
        {
            // 字典匹配占位符
            //priority: 1,
            //exclude: [{ mode: "prefix", match: "" }],
            selector: "#shrine_offertext",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
            },
            patterns: [
                {
                    // 模式 1: 献上物品
                    pattern: /^Offer\s+(\d+x\s+)(.+?)\s+for\s*:?$/i,
                    replace: "献上 $1 $2 换取"
                },
                {
                    // 模式 2: 拥有数量提示
                    pattern: /You have\s+(\d+)\s*\/\s*(\d+)\s+items?\s+required\s+for\s+this\s+offering\.?/i,
                    replace: "根据你的设定,你还需要收集 $1 / $2 个献祭所需的奖杯"
                },
            ]
        },
        {
            //主世界修正
            //priority: 1,
            selector:".hvut-eq-type, .hvut-eq-category, .hvut-in-header, #accept_equip",
            excludeSelector:"#accept_equip",
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //"原文":"翻译",
                "One-handed Weapon":"单手武器",
                "Two-handed Weapon":"双手武器",
                "Staff":"法杖",
                "Shield":"盾牌",
                "Cloth Armor":"布甲",
                "Light Armor":"轻甲",
                "Heavy Armor":"重甲",
                //单手武器类型
                'Axe' : '🪓斧(单)',
                'Club' : '🦯棍(单)',
                'Rapier' : '🤺西洋剑(单)',
                'Shortsword' : '⚔️短剑(单)',
                'Wakizashi' : '🔪脇差(单)',
                'Dagger' : '🗡️匕首(单)',
                //双手武器类型
                'Estoc' : '🤺刺剑(双)',
                'Longsword' : '⚔️长剑(双)',
                'Katana' : '※太刀(双)',
                'Scythe' : '𖤠镰刀(双)',
                'Mace' : '🔨战锤(双)',
                'Great Mace' : '🔨战锤(双)',
                'Swordchucks' : '⚔︎锁链双剑(双)',
                'Staff' : '法杖',
                //盾类型
                'Buckler' : '🛡️小圆盾(副)',
                'Kite Shield' : '🔰鸢盾(副)',
                'Tower Shield' : '🚪塔盾(副)',
                'Force Shield' : '力场盾(副)',
                //法杖类型
                'Oak' : '橡木(增益熟练+圣法伤+)',
                'Redwood' : '红木(元素熟练/法伤+)',
                'Willow' : '柳木(减益熟练+暗法伤+)',
                'Katalox' : '铁木(圣暗熟练/法伤+)',
                'Ebony':'乌木(元素圣暗熟练/法伤+)',
                //护甲材质
                'Silk' : '丝绸(布)',
                'Gossamer' : '薄纱(布)',
                'Cotton' : '棉布(布)',
                'Ironsilk' : '铁丝(布)',
                'Drakehide ': '龙皮(轻)',
                'Kevlar' : '凯夫拉(轻)',
                'Leather' : '皮革(轻)',
                'Chain': '锁链(重)',
                'Plate' : '板甲(重)',
                //稀有护甲类型
                'Phase' : '相位(布)',
                'Shade' : '暗影(轻)',
                'Power': '动力(重)',
                'Reactive':'反应装甲(重)',
                //护甲部位
                'Cap' : '🪖帽 ',
                'Helmet' : '🪖头盔',
                'Robe' : '🥼长袍',
                'Breastplate' : '🥼护胸',
                'Cuirass' : '🥼胸甲',
                'Power Armor' : '动力(重) 🥼盔甲',
                'Gloves' : '🤲手套',
                'Gauntlets' : '🤲手甲',
                'Pants' : '🦵裤子',
                'Leggings' : '🦵绑腿',
                'Greaves' : '🦵护胫',
                'Shoes' : '👣鞋子',
                'Boots' : '👣靴子',
                'Sabatons' : '👣马靴',
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            // 外显词缀
            priority: 2,
            exclude: [{ mode: "prefix", match: "https://hentaiverse.org/equip/" }],
            excludeSelector:"#pane_monster",
            selector: ".eqb, .lc, .showequip, .postcolor, .eqp, #showequip, #pane_log, .hvut-bt-active, #lottery_eqname, .hvut-lt-div, .hvut-bt-equip, .hvut-ss-table, #btcp, #dropbox, .logtable, #bidInterface, .hvut-mm-attach, .hvut-mm-attach-e",
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                },
                { mode: "prefix", match: "https://reasoningtheory.net" },
                { mode: "prefix", match: "https://forums.e-hentai.org/index.php?showtopic" },
            ],
            translations: {
                //单手武器类型
                'Axe' : '🪓斧(单)',
                'Club' : '🦯棍(单)',
                'Rapier' : '🤺西洋剑(单)',
                'Shortsword' : '⚔️短剑(单)',
                'Wakizashi' : '🔪脇差(单)',
                'Dagger' : '🗡️匕首(单)',
                //双手武器类型
                'Estoc' : '🤺刺剑(双)',
                'Longsword' : '⚔️长剑(双)',
                'Katana' : '※太刀(双)',
                'Scythe' : '𖤠镰刀(双)',
                'Mace' : '🔨战锤(双)',
                'Great Mace' : '🔨战锤(双)',
                'Swordchucks' : '⚔︎锁链双剑(双)',
                'Staff' : '🧙‍♂️法杖(双)',
                //盾类型
                'Buckler' : '🛡️小圆盾(副)',
                'Kite Shield' : '🔰鸢盾(副)',
                'Tower Shield' : '🚪塔盾(副)',
                //法杖类型
                'Oak' : '橡木(增益熟练+圣法伤+)',
                'Redwood' : '红木(元素熟练/法伤+)',
                'Willow' : '柳木(减益熟练+暗法伤+)',
                'Katalox' : '铁木(圣暗熟练/法伤+)',
                'Ebony':'乌木(元素圣暗熟练/法伤+)',
                //护甲部位
                'Cap' : '🪖帽 ',
                'Helmet' : '🪖头盔',
                'Robe' : '🥼长袍',
                'Breastplate' : '🥼护胸',
                'Cuirass' : '🥼胸甲',
                'Power Armor' : '动力(重) 🥼盔甲',
                'Gloves' : '🤲手套',
                'Gauntlets' : '🤲手甲',
                'Pants' : '🦵裤子',
                'Leggings' : '🦵绑腿',
                'Greaves' : '🦵护胫',
                'Shoes' : '👣鞋子',
                'Boots' : '👣靴子',
                'Sabatons' : '👣马靴',
                // --- 普通后缀 ---
                //前缀
                'Fiery' : '灼热(火法伤+)',
                'Arctic' : '极寒(冰法伤+)',
                'Shocking' : '闪电(电法伤+)',
                'Tempestuous' : '风暴(风法伤+)',
                'Hallowed' : '神圣(圣法伤+)',
                'Demonic' : '恶魔(暗法伤+)',
                'Ethereal' : '虚空(无负重干涉)',
                'Reinforced' : '加固的(斩打刺减伤+)',
                'Mystic' : '神秘的(法爆伤+)',
                'Charged' : '充能的(施速+)',
                'Frugal' : '节能的(魔耗-)',
                'Mithril' : '秘银的(负重-)',
                'Agile' : '俊敏的(攻速+)',
                'Savage' : '残暴的(攻暴伤+)',
                'Shielding' : '盾化的(格挡+)',
                //后缀
                ' of Slaughter' : ' 杀戮(攻击+)',
                ' of Balance' : ' 平衡(命中暴伤+)',
                ' of Swiftness' : ' 迅捷(攻速+)',
                ' of the Vampire' : ' 吸血鬼(10%回血)',
                ' of the Illithid' : ' 汲灵(5%回血+吸魔)',
                ' of the Banshee' : ' 女妖(5%回血+吸灵)',
                ' of the Nimble' : ' 灵活(招架+)',
                ' of the Battlecaster' : ' 战法师(魔耗-魔命+无干涉)',
                ' of Destruction' : ' 毁灭(法伤+)',
                ' of Focus' : ' 专注(魔命+法暴伤+魔耗-)',
                ' of the Elementalist' : ' 元素使(元素熟练+)',
                ' of the Heaven-sent' : ' 天堂(神圣熟练+)',
                ' of the Demon-fiend' : ' 恶魔(黑暗熟练+)',
                ' of the Earth-walker' : ' 地行者(增益熟练+)',
                ' of the Curse-weaver' : ' 织咒者(减益熟练+)',
                ' of the Barrier' : ' 屏障(格挡+)',
                ' of Warding' : ' 护佑(魔减伤+)',
                ' of Protection' : ' 保护(物减伤+)',
                ' of Dampening' : ' 抑制(打减伤+)',
                ' of Stoneskin' : ' 石肤(斩减伤+)',
                ' of Deflection' : ' 偏转(刺减伤+)',
                ' of the Shadowdancer' : ' 影武者(闪避攻暴+)',
                ' of the Arcanist' : ' 秘法(智力智慧魔命+)',
                ' of the Fleet' : ' 迅捷(闪避+)',
                ' of Negation' : ' 否定(抵抗+)',
                ' of the Stone-skinned' : ' 石肤者(物减伤+)',
                ' of the Ox' : ' 公牛(力量+)',
                ' of the Raccoon' : ' 浣熊(灵巧+)',
                ' of the Cheetah' : ' 猎豹(敏捷+)',
                ' of the Turtle' : ' 乌龟(体质+)',
                ' of Turtle' : ' 乌龟(体质+)',
                ' of the Fox' : ' 狐狸(智力+)',
                ' of the Owl' : ' 猫头鹰(智慧+)',
                //旧版词缀
                'Bronze' : '铜',
                'Iron' : '铁',
                'Silver' : '银',
                'Steel' : '钢',
                'Gold' : '金',
                'Platinum' : '白金',
                'Titanium' : '钛',
                'Emerald' : '祖母绿',
                'Sapphire' : '蓝宝石',
                'Diamond' : '金刚石',
                'Prism' : '光棱',
                'trimmed' : ' 镶边',
                'adorned' : ' 装饰',
                'tipped' : ' 前端',
                'Astral' : '五芒星',
                'Quintessential' : '第五元素',
                ' of Priestess' : ' 牧师',
                ' of the Hulk' : ' 巨物(虚空抗+)',
                "Flimsy": {
                    replace: "脆弱",
                    style: "background: #848482; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #848482;"
                },
                "Crude": {
                    replace: "粗糙",
                    style: "background: #acacac; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #acacac;"
                },
                "Fair": {
                    replace: "普通",
                    style: "background: #c1c1c1; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #c1c1c1;"
                },
                "Average": {
                    replace: "中等",
                    style: "background: #dfdfdf; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #dfdfdf;"
                },
                "Superior": {
                    replace: "上等",
                    style: "background: #fbf9f9; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #fbf9f9;"
                },
                "Fine": {
                    replace: "优质",
                    style: "background: #b9ffb9; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #b9ffb9;"
                },
                "Exquisite": {
                    replace: "✧精良✧",
                    style: "background: #d7e698; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #d7e698;"
                },
                "Magnificent": {
                    replace: "☆史诗☆",
                    style: "background: #a6daf6; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #a6daf6;"
                },
                "Legendary": {
                    replace: "✪传奇✪",
                    style: "background: #ffbbff; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #ffbbff;"
                },
                "Peerless": {
                    replace: "☯无双☯",
                    style: "background: #ffd760; color: #000; border-radius: 2px; vertical-align: baseline; box-shadow: 0 0 0 1px #ffd760;"
                },
                "Cotton": {
                    replace: "棉布(布)",
                    style: "background: #FFFFFF; color: #000000; padding: 0 1px;"
                },
                "Gossamer": {
                    replace: "薄纱(布)",
                    style: "background: #FFFFFF; color: #000000; padding: 0 1px;"
                },
                "Ironsilk": {
                    replace: "铁丝(布)",
                    style: "background: #FFFFFF; color: #000000; padding: 0 1px;"
                },
                "Silk": {
                    replace: "丝绸(布)",
                    style: "background: #FFFFFF; color: #000000; padding: 0 1px;"
                },
                // === 轻甲 (灰底白字) ===
                "Leather": {
                    replace: "皮革(轻)",
                    style: "background: #666666; color: #FFFFFF; padding: 0 1px;"
                },
                "Drakehide": {
                    replace: "龙皮(轻)",
                    style: "background: #666666; color: #FFFFFF; padding: 0 1px;"
                },
                "Kevlar": {
                    replace: "凯夫拉(轻)",
                    style: "background: #666666; color: #FFFFFF; padding: 0 1px;"
                },
                // === 重甲 (黑底白字) ===
                "Chain": {
                    replace: "锁链(重)",
                    style: "background: #000000; color: #FFFFFF; padding: 0 1px;"
                },
                "Plate": {
                    replace: "板甲(重)",
                    style: "background: #000000; color: #FFFFFF; padding: 0 1px;"
                },
                "Phase": {
                    replace: "相位(布)",
                    style: "background: #ffa500; color: #000000; padding: 0 1px;"
                },
                "Shade": {
                    replace: "暗影(轻)",
                    style: "background: #ffa500; color: #000000; padding: 0 1px;"
                },
                "Power Armor": {
                    replace: "<span style='background: #ffa500; color: #000000; padding: 0 1px;'>动力(重)</span> 🥼盔甲",
                    style: "background: transparent; color: inherit; padding: 0;"
                },
                "Power": {
                    replace: "动力(重)",
                    style: "background: #ffa500; color: #000000; padding: 0 1px;"
                },
                "Reactive": {
                    replace: "反应装甲(重)",
                    style: "background: #ffa500; color: #000000; padding: 0 1px;"
                },
                "Force Shield": {
                    replace: "力场盾(副)",
                    style: "background: #ffa500; color: #000000; padding: 0 1px;"
                },
                "Fiery": {
                    replace: "灼热(火法伤+)",
                    style: "background: #f97c7c; color: #000000; padding: 0 1px;"
                },
                "Arctic": {
                    replace: "极寒(冰法伤+)",
                    style: "background: #94c2f5; color: #000000; padding: 0 1px;"
                },
                "Shocking": {
                    replace: "闪电(电法伤+)",
                    style: "background: #f4f375; color: #000000; padding: 0 1px;"
                },
                "Tempestuous": {
                    replace: "风暴(风法伤+)",
                    style: "background: #7ff97c; color: #000000; padding: 0 1px;"
                },
                "Hallowed": {
                    replace: "神圣(圣法伤+)",
                    style: "background: #ffffff; color: #000000; padding: 0 1px;"
                },
                "Demonic": {
                    replace: "恶魔(暗法伤+)",
                    style: "background: #000000; color: #ffffff; padding: 0 1px;"
                },

                // --- 特殊前缀 ---
                "Ethereal": {
                    replace: "虚空(无负重干涉)",
                    style: "background: #ffffff; color: #5c5a5a; padding: 0 1px;"
                },
                "Radiant": {
                    replace: "✪魔光的✪(法伤+)",
                    style: "background: #ffffff; color: #000000; padding: 0 1px;"
                },
                "Savage": {
                    replace: "残暴的(攻暴伤+)",
                    style: "color: red; background: transparent; padding: 0 1px;"
                },
                // --- 宝石类前缀 (抗性) ---
                "Ruby": {
                    replace: "红宝石(火抗+)",
                    style: "background: #ffa6a6; color: #000000; padding: 0 1px;"
                },
                "Cobalt": {
                    replace: "钴石的(冰抗+)",
                    style: "background: #a0f4f4; color: #000000; padding: 0 1px;"
                },
                "Amber": {
                    replace: "琥珀的(电抗+)",
                    style: "background: #ffff00; color: #9f9f16; padding: 0 1px;"
                },
                "Jade": {
                    replace: "翡翠的(风抗+)",
                    style: "background: #b1f9b1; color: #000000; padding: 0 1px;"
                },
                "Zircon": {
                    replace: "锆石的(圣抗+)",
                    style: "background: #ffffff; color: #5c5a5a; padding: 0 1px;"
                },
                "Onyx": {
                    replace: "缟玛瑙(暗抗+)",
                    style: "background: #cccccc; color: #000000; padding: 0 1px;"
                },

                // --- 后缀 (神话/高级词缀) ---
                "of Destruction": {
                    replace: " 毁灭(法伤+)",
                    style: "background: #9400d3; color: #ffffff; padding: 0 1px;"
                },
                "of Surtr": {
                    replace: " 苏尔特(火法伤+)",
                    style: "background: #f97c7c; color: #000000; padding: 0 1px;"
                },
                "of Niflheim": {
                    replace: " 尼芙菲姆(冰法伤+)",
                    style: "background: #94c2f5; color: #000000; padding: 0 1px;"
                },
                "of Mjolnir": {
                    replace: " 姆乔尔尼尔(电法伤+)",
                    style: "background: #f4f375; color: #000000; padding: 0 1px;"
                },
                "of Freyr": {
                    replace: " 弗瑞尔(风法伤+)",
                    style: "background: #7ff97c; color: #000000; padding: 0 1px;"
                },
                "of Heimdall": {
                    replace: " 海姆达(圣法伤+)",
                    style: "background: #ffffff; color: #000000; padding: 0 1px;"
                },
                "of Fenrir": {
                    replace: " 芬里尔(暗法伤+)",
                    style: "background: #000000; color: #ffffff; padding: 0 1px;"
                },
                "of Slaughter": {
                    replace: " 杀戮(攻击+)",
                    style: "background: #FF0000; color: #FFFFFF; padding: 0 1px;"
                },

                // --- 后缀 (抗性者) ---
                " of the Fire-eater": {
                    replace: " 吞火者(火抗+)",
                    style: "background: #ffa6a6; color: #000000; padding: 0 1px;"
                },
                " of the Frost-born": {
                    replace: " 冰诞者(冰抗+)",
                    style: "background: #a0f4f4; color: #000000; padding: 0 1px;"
                },
                " of the Thunder-child": {
                    replace: " 雷之子(电抗+)",
                    style: "background: #ffff00; color: #9f9f16; padding: 0 1px;"
                },
                " of the Wind-waker": {
                    replace: " 驭风者(风抗+)",
                    style: "background: #b1f9b1; color: #000000; padding: 0 1px;"
                },
                " of the Thrice-blessed": {
                    replace: " 恩典(圣抗+)",
                    style: "background: #ffffff; color: #5c5a5a; padding: 0 1px;"
                },
                " of the Spirit-ward": {
                    replace: " 魂护(暗抗+)",
                    style: "background: #cccccc; color: #000000; padding: 0 1px;"
                },
                //附魔效果
                'Suffused Aether' : '弥漫的以太',
                'Featherweight Charm' : '轻如鸿毛',
                'Voidseeker\'s Blessing':'虚空探索者的祝福',
                'Infused Flames':'火焰附魔',
                'Infused Frost':'冰霜附魔',
                'Infused Lightning':'雷电附魔',
                'Infused Storms':'风暴附魔',
                'Infused Divinity':'神圣附魔',
                'Infused Darkness':'黑暗附魔',
                //潜能
                'Capacitor':'电容器（魔力+2%/级）',
                'Juggernaut':'勇士（生命+2%/级）',
                'Butcher':'屠夫（武器攻击伤害+2%/级）',
                'Fatality':'致命（攻击暴击伤害+2%/级）',
                'Overpower':'压制（反招架率+4%/级）',
                'Swift Strike':'迅捷打击（攻速+1.92%/级）',
                'Annihilator':'毁灭者（魔法暴击伤害+2%/级）',
                'Archmage':'大法师（武器魔法伤害+2%/级）',
                'Economizer':'节约者（魔力消耗减免+5%/级）',
                'Penetrator':'穿透者（反抵抗率+4%/级）',
                'Spellweaver':'织法者（施法速度+1.5%/级）',
                'Hollowforged':'虚空升华',

                'Coldproof':'抗寒（冰冷抗性+4%/级）',
                'Darkproof':'驱暗（黑暗抗性+4%/级）',
                'Elecproof':'绝缘（闪电抗性+4%/级）',
                'Fireproof':'耐热（火焰抗性+4%/级）',
                'Holyproof':'驱圣（神圣抗性+4%/级）',
                'Windproof':'防风（疾风抗性+4%/级）',
                //战斗记录补充翻译
                'Used:' : '使用次数:',
                'Attack:' : '普攻:',
                'Counter:' : '反击:',
                'Spirit:' : '灵动架势:',
            }
        },
        {
            //战斗日志
            priority: 3,
            selector: '#pane_log, #pane_skill, #pane_magic, #pane_item, #btcp',
            excludeSelector:"#combat-records-table_isekai",
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                },
            ],
            translations: {
                //jpx
                "Action": "基本行动",
                "Item": "道具",
                "Skill": "技能",
                "Supportive Spells": "增益",
                "Offensive Magic": "法术",
                "Deprecating Magic": "减益",
                "Misc": "其他",
                "Download Battle Log": "下载战斗日志",
                //药剂效果
                "Refreshment":   { replace: "灵力饮剂", style: "color:#D4637A" },
                "Regeneration":  { replace: "生命饮剂", style: "color:#006400" },
                "Replenishment": { replace: "魔力饮剂", style: "color:#639AD4" },
                //怪物技能名
                "Super Serial": "超级序列",
                "Global Warming": "全球变暖",
                "Awww": "哎呀~",
                "OM NOM NOM NOM": "囊囊囊の小曲",
                "Purr": "咕噜",
                "Undress": "宽衣",
                "Death Ray": "死亡射线",
                "Brain Sucker": "大脑汲取",
                "Timotei": "蒂沐碟",
                "Petanko Smash": "平板冲撞!",
                "Mikuru Beam": "实玖瑠射线",
                "Time Quake": "时间震",
                "Spike Shot": "尖刺射击",
                "Impaler": "穿刺者",
                "Stoic Staredown": "斯多葛式凝视",
                "Data Rewrite": "数据覆写",
                "Future Shock": "未来的震颤",
                "Fated Demise": "命定之灾",
                "Frozen Fate": "命运冻结",
                "Altered Timeline": "时间线切换",
                "Winds of Change": "变革之风",
                "No Time Like The Present": "只争朝夕",
                "Healing Roots": "治愈根源",
                "Fiery Breath": "炙热吐息",
                "Flames of Darkness": "黯炎",
                "Crooks": "小偷",
                "Dead-End Job": "没前途的工作",
                "Liars": "骗子",
                "Money Problems": "财务危机",
                "No Girlfriend": "没有对象",
                "Phone Sellers": "电话推销",
                "Rent Is Due": "房租到期",
                "Scam Artists": "诈骗",
                "Sheeple": "跟风者",
                "Internet Shutdown": "断网",
                "Pink Unicorn Sparkles": "闪光粉色独角兽!",
                "Perplexing Paradox": "困惑的悖论",
                "Sudden Outbreak of Common Sense": "突然涌现的常识",
                "Puff of Logic": "逻辑的泡影",
                "Team Rush": "团队冲锋",
                "Power Upgrade": "力量升级",
                "Endless Swarm": "无尽的集群",
                "No Saves Allowed": "没有存档",
                "Uncapped Scaling": "无限增长的数值",
                "Literally Bottomless": "字面意义上的无限",
                "Level Reset": "等级重置",
                "Ability Seal": "能力封印",
                "Monster Rescale": "怪物属性重构",
                "Pointless Monster Hunt": "无意义的刷怪",
                "Tedious Skill Maxing": "无聊技能全满",
                "Beat Game Ten Times": "已经通关10次",
                "OOB": "越界",
                "RNG": "随机性",
                "Global Cheaterboard": "全球作弊榜",
                "Arm Swipe": "手臂挥打",
                "Blade Cleave": "剑刃劈砍",
                "Bullet Storm": "子弹风暴",
                "YAY": "耶!",
                "Critter Rush": "小动物冲刺",
                "The Stare": "凝视",
                "Vicious Bite": "恶毒撕咬",
                "Vacant Stare": "迷茫眼神",
                "Existential Monologue": "存在主义自白",
                "Pegasus Raze": "天马之怒",
                "Thundercloud Kick": "雷云踢",
                "Sonic Rainboom": "彩虹音爆",
                "Ethereal Charge": "以太充能",
                "Endless Lecture": "无尽讲座",
                "Arcane Blast": "奥术冲击",
                "Graceful Charge": "优雅冲锋",
                "Hail of Scissors": "千刃齐射",
                "Unexpected Beatdown": "意料之外的翻车",
                "Applebuck Kick": "苹果后踢",
                "Apple Flurry": "苹果乱舞",
                "Hail of Apples": "苹果齐射",
                "Party Cannon": "派对大炮",
                "Gigglesnort": "咯咯噗嗤",
                "Cupcakes": "纸杯蛋糕",
                "Bunny Kick": "兔子踢",
                "Carrot Strike": "胡萝卜打击",
                "Dagger Stare": "匕首凝视",
                "Claw Swipe": "爪击",
                "Tail Swipe": "甩尾",
                "Firesneeze": "火焰喷嚏",

                // --- 战斗 BUFF ---
                "Kicking Ass": "海扁",
                "Sleeper Imprint": "沉睡烙印",
                "Protection": "守护",
                ' of Protection' : ' 保护(物减伤+)',
                "Hastened": "急速",
                "Shadow Veil": "影纱",
                "Absorbing Ward": "吸收结界",
                "Spark of Life": "生命火花",
                "Cloak of the Fallen": "陨落斗篷",
                "Heartseeker": "觅心者",
                "Arcane Focus": "奥术集中",
                "Blessing of the RiddleMaster": "御谜士的祝福",

                // --- 怪物 DEBUFF ---
                "Vital Theft": "生命汲取",
                "Ether Theft": "魔力汲取",
                "Spirit Theft": "灵力汲取",
                "Confused": "混乱",
                "Slowed": "缓慢",
                "Weakened": "虚弱",
                "Imperiled": "陷危",
                "Blinded": "盲目",
                "Asleep": "沉眠",
                "Silenced": "沉默",
                "Magically Snared": "魔磁网",
                "Spreading Poison": "扩散之毒",
                "Immobilized": "固定",
                "Immobilize": "固定",

                // --- 战斗风格 ---
                "Overwhelming Strikes": "压制打击",
                "Coalesced Mana": "魔力合流",
                "Ether Tap": "魔力回流",
                // ============================================
                // 🔥 攻击咒语效果 (Spell Effects)
                // ============================================
                "Searing Skin": "焦灼皮肤",
                "Freezing Limbs": "冰封肢体",
                "explodes": "爆裂并造成",
                "Turbulent Air": "空气湍流",
                "Deep Burns": "深层烧伤",
                "Breached Defense": "防御破坏",
                "Blunted Attack": "攻击钝化",

                // ============================================
                // ⚔️ 通用技能
                // ============================================
                "Channeling": "引导",
                "Fleeing": "逃跑",
                "Defending": "防御",
                "Focusing": "集中",
                "Flee": "逃跑",
                "Scan": "扫描",
                "FUS RO DAH": "龙吼",
                "Orbital Friendship Cannon": {
                    replace: '<font color="#FF0000">友</font><font color="#CC0033">谊</font><font color="#990066">小</font><font color="#660099">马</font><font color="#3300CC">炮</font>',
                    style: "display:inline"
                },
                // --- 物理技能 ---
                "Concussive Strike": "震荡打击",
                "Skyward Sword": "天空之剑",
                "Frenzied Blows": "狂乱百裂斩(Ⅲ)",
                "Iris Strike": "虹膜打击(Ⅰ)",
                "Backstab": "背刺(Ⅱ)",
                "Shatter Strike": "粉碎打击(Ⅲ)",
                "Rending Blow": "撕裂打击(Ⅱ)",
                "Great Cleave": "大劈砍(Ⅰ)",
                "Merciful Blow": "最后的慈悲(Ⅲ)",
                "Shield Bash": "盾击(Ⅰ)",
                "Vital Strike": "致命打击(Ⅱ)",
                "Arcane Blow": "奥术冲击",
                // --- 魔法技能 ---
                "Fiery Blast": "炎爆术(Ⅰ)",
                "Inferno": "地狱火(Ⅱ)",
                "Flames of Loki": "邪神之火(Ⅲ)",
                "Freeze": "冰冻(Ⅰ)",
                "Blizzard": "暴风雪(Ⅱ)",
                "Fimbulvetr": "芬布尔之冬(Ⅲ)",
                "Shockblast": "电能爆破(Ⅰ)",
                "Chained Lightning": "连锁闪电(Ⅱ)",
                "Wrath of Thor": "雷神之怒(Ⅲ)",
                "Gale": "烈风(Ⅰ)",
                "Downburst": "下击暴流(Ⅱ)",
                "Storms of Njord": "尼奥尔德风暴(Ⅲ)",
                "Smite": "惩戒(Ⅰ)",
                "Banishment": "放逐(Ⅱ)",
                "Paradise Lost": "失乐园(Ⅲ)",
                "Corruption": "腐化(Ⅰ)",
                "Disintegrate": "瓦解(Ⅱ)",
                "Ragnarok": "诸神黄昏(Ⅲ)",
                // ============================================
                // 💢 状态效果 (Debuffs & Status)
                // ============================================
                "Drain": "枯竭",
                "Slow": "缓慢",
                "Weaken": "虚弱",
                "Silence": "沉默",
                "Sleep": "沉眠",
                "Confuse": "混乱",
                "Imperil": "陷危",
                "Blind": "致盲",
                "MagNet": "魔磁网",
                // ============================================
                // 🛡️ 增益与治疗 (Buffs & Healing)
                // ============================================
                // 带颜色的 Regen
                "Regen": { replace: "细胞活化", style: "color:#006400" },
                "Full-Cure": "完全治疗术",
                "Cure": "治疗术",
                "Haste": "急速",
                "Absorb": "吸收",
                // ============================================
                // 🗡️ 武器特效 (Weapon Procs)
                // ============================================
                "Penetrated Armor": "🪡穿甲",
                "Stunned": "💫眩晕",
                "Bleeding Wound": "🩸流血",
                "Void Strike": { replace: "虚空打击", style: "background:#ffffff; color:#5c5a5a" },
                "Fire Strike": { replace: "火焰打击", style: "background:#f97c7c" },
                "Cold Strike": { replace: "冰霜打击", style: "background:#94c2f5" },
                "Elec Strike": { replace: "闪电打击", style: "background:#f4f375" },
                "Wind Strike": { replace: "疾风打击", style: "background:#7ff97c" },
                "Holy Strike": { replace: "神圣打击", style: "background:#ffffff; color:#000000" },
                "Dark Strike": { replace: "黑暗打击", style: "background:#000000; color:#ffffff" },
                //动作状态
                "counter": "反击",
                "but is absorbed": "但被吸收了",
                "attack misses its mark": "攻击未命中目标",
                "resisted)": "被抵抗)",
                "MP and": "MP 和",
                "causing": "造成",
                "additional": "额外",
                "glance": "擦伤了",
                "glances": "擦伤了",
                "which glances!": "擦伤了你!",
                "block and": "格挡并",
                "partially block and partially parry the attack": "格挡了一半又招架了一半伤害",
                "partially block and parry the attack": "格挡了一半又完全招架了伤害",
                "block and partially": "格挡并部分",
                "partially block and": "格挡了一半又",
                "resists, and": "抵抗了法术,并",
                "resists, and was glanced": "被擦伤且抵抗了法术,受到",
                "resists, and was": "抵抗了法术,并被",
                "saves": "拯救了",
                "dodges your attack": "闪避了你的攻击",
                "which parries": "但被其招架了",
                "which ": " ",
                "which hits": "击中了",
                "which crits!": "暴击了",
                "hit you ": "击中了你",
                "but it is absorbed": "但是它被你吸收了",
                "misses the attack against": "攻击没有命中",
                "but misses the attack.": "但这次攻击没有命中",
                "got knocked out of confuse": "从混乱中脱离",
                "has been roused from its sleep": "已从睡梦中苏醒",
                "spell fails to connect": "法术未能成功施加",
                "you take": "你受到",
                "You take": "你受到",
                "and take": "最后承受了",
                "and takes": "最后承受了",
                "take": "受到",
                "evades your offhand attack": "闪避了你的副手攻击",
                "is eviscerated for": "被你切除了内脏并受到",
                "putting it out of its misery": "随后被你干净利落的干掉了",
                "partially parry the attack, and take": "招架住了一半伤害,受到",
                "which partially parries": "但被格挡住了一半伤害",
                "resist the attack, and take": "你抵抗了部分伤害,受到",
                "resist the attack": "抵抗了这次攻击",
                "partially parries the attack": "部分招架了这次攻击",
                "partially block the attack, and take": "格挡了一半伤害, 受到",
                "deftly evades your attack": { replace: "灵巧的闪避了你的攻击", style: "color:#1E90FF" },
                "evades your attack": { replace: "闪避了你的攻击", style: "color:#1E90FF" },
                "deftly evades your spell":  { replace: "灵巧的闪避了你的法术", style: "color:#1E90FF" },
                "Your offhand attack":{ replace: "你的副手攻击", style: "color:#1E90FF" },
                "Your offhand":       { replace: "你的副手攻击", style: "color:#1E90FF" },
                "uses":               { replace: " 使用了", style: "background:#ADFF2F" },
                "and hits":           { replace: " 并击中了", style: "color:#E63F00" },
                "hits":               { replace: " 击中了", style: "color:#E63F00" },
                "hits!":               { replace: " 击中了你", style: "color:#E63F00" },
                "hit":               { replace: " 击中了", style: "color:#E63F00" },
                "and crits":          { replace: " 并暴击了", style: "background:#FF0000;color:#FFFFFF" },
                "crits":              { replace: " 暴击了", style: "background:#FF0000;color:#FFFFFF" },
                "which crits! You take":              { replace: " 暴击了你!你受到", style: "background:#FF0000;color:#FFFFFF" },
                "and blasts":         { replace: " 并暴击了", style: "background:#FF0000;color:#FFFFFF" },
                "blasts":             { replace: " 暴击了", style: "background:#FF0000;color:#FFFFFF" },
                "You use":            { replace: "你使用了", style: "background:#ADFF2F" },
                "You glance":         { replace: "你擦伤了", style: "color:inherit" }, // 保持默认
                "You hit": {
                    replace: '<span style="color:#1E90FF">你</span><span style="color:#E63F00">击中了</span>',
                    style: "display:inline"
                },
                "Magic Points": {
                    replace: '点<span style="color:#639AD4"> 魔力 </span>',
                    style: "display:inline"
                },
                "parries your attack": { replace: "招架了你的攻击", style: "background:#00FFFF" },
                "resists your spell": { replace: "抵抗了你的魔法", style: "background:#81f7f3" },
                "restores": "恢复了你",
                "Recovered": "你恢复了",
                // ============================================
                // 📢 系统提示 (System Messages)
                // ============================================
                "Spawned Monster": "生成怪物",
                "Initializing random encounter": "正在初始化随机遭遇战",
                "Initializing arena challenge": "正在初始化竞技场战斗",
                "Initializing Item World": "正在初始化道具界战斗",
                "Initializing Grindfest": "正在初始化压榨界战斗",
                "Initializing The Tower": "正在初始化塔楼战斗",
                "With the light of a new dawn, Your experience in all things increases": "随着新的黎明的到来，你在所有事情上的经验都增加了",
                "With the light of a new dawn, your experience in all things increases": "随着新的黎明的到来，你在所有事情上的经验都增加了", // 兼容大小写
                "have escaped from the battle": "从战斗中脱离了",
                "Time Bonus:": "快速回答奖励:",
                // 谜语大师 (Riddlemaster)
                "The Riddlemaster listens to your answer, tries to keep a pensive face, then breaks into a wide grin": "谜语大师听了你的回答，努力保持沉思的表情，然后咧嘴大笑",
                "The Riddlemaster listens to your answer and winks at you": "谜语大师听了你的回答，向你眨眼",
                "The Riddlemaster listens to your answer and cackles hysterically.": "谜语大师听了你的回答，歇斯底里地笑了起来",
                "The Riddlemaster listens to your answer and grins mischievously.": "谜语大师听了你的回答，顽皮地笑了起来",
                "The Riddlemaster listens to your answer and shows no reaction whatsoever.": "谜语大师听了你的回答，没有任何反应",
                "The Riddlemaster listens to your answer and snorts ambiguously.": "谜语大师听了你的回答，含糊地哼了一声",
                "The Riddlemaster listens to your answer and starts humming a jaunty tune.": "谜语大师听了你的回答，开始哼起欢快的曲调",
                // 斗气/灵力提示
                "Insufficient overcharge or spirit for Spirit Stance.": "灵力或斗气值不足，无法开启灵动架势",
                "Insufficient overcharge to use": "斗气值不足，无法使用",
                "fails due to insufficient Spirit": "由于灵力不足，没有生效",
                "Spirit Stance Engaged":   { replace: "灵动架势开启", style: "background:#FF8888" },
                "Spirit Stance Exhausted": { replace: "灵动架势无法维持", style: "background:#f5b3c4" },
                "Spirit Stance Disabled":  { replace: "灵动架势关闭", style: "background:#f5b3c4" },
                // ============================================
                // 🏆 胜利与结算 (Victory & Loot)
                // ============================================
                "You are victorious": "你胜利了",
                "Item world cleared": "道具界通关成功",
                "Arena challenge cleared": "竞技场通关成功",
                "You fail to clear the tower floor": "塔楼通关失败",
                "Grindfest cleared": "压榨界通关成功",
                "are Victorious": "胜利了",
                "are victorious": "胜利了",
                "You gain": "你获得了",
                "You obtained": "你获得了",
                "one Mastery point": "1点支配点",
                "one Skill point": "1点技能点",
                "Stop kicking the dead horse": "别鞭尸啦",
                "Stop beating dead ponies": "别鞭尸啦",
                "You gain no EXP due to exhaustion": "你已精疲力竭，因此无法获得经验",
                "Warning: Reached equipment inventory limit": "警告，装备仓库已满",
                "Invalid target": "非法目标",
                "Item does not exist": "道具不存在",
                "Inventory slot is empty": "物品栏是空的",
                "You do not have a powerup gem": "宝石不存在",
                "Cooldown is still pending for": "所选技能仍在冷却中",
                "The charm is now exposed": "里面的护符暴露出来了",
                "A traveling salesmoogle gives": "自动出售后给予了",
                "A traveling salesmoogle salvages it into": "自动分解后给予了",
                "Arena Token Bonus!": "获得竞技场令牌奖励!",
                "Battle Clear Bonus!": "获得战斗胜利奖励!",
                "Arena Extra Bonus!": "竞技场额外奖励!",
                "The potential of Your equipment has grown!": "你装备的潜能等级提升了!",
                "The potential of your equipment has grown!": "你装备的潜能等级提升了!",
                "received a": "获得了一个",
                " have run away": "逃走了",
                " escape from the item world": "从道具界撤离了",
                " escape from the arena": "从竞技场撤离了",
                " escape from the grindfest": "从压榨界撤离了",
                "dropped": "掉落了",
                // ============================================
                // 📈 熟练度 (Proficiency)
                // ============================================
                "gain": "获得了",
                "obtained": "获得了",
                "one-handed weapon proficiency": "单手武器的熟练度",
                "two-handed weapon proficiency": "双手武器的熟练度",
                "one-handed proficiency": "单手熟练度",
                "two-handed proficiency": "双手熟练度",
                "dual wielding proficiency": "双持熟练度",
                "dual-wielding proficiency": "双持熟练度",
                "staff proficiency": "法杖熟练度",
                "cloth armor proficiency": "布甲熟练度",
                "light armor proficiency": "轻甲熟练度",
                "heavy armor proficiency": "重甲熟练度",
                "elemental magic proficiency": "元素魔法熟练度",
                "divine magic proficiency": "神圣魔法熟练度",
                "forbidden magic proficiency": "黑暗魔法熟练度",
                "deprecating magic proficiency": "减益魔法熟练度",
                "supportive magic proficiency": "增益魔法熟练度",
                // ============================================
                // ⚒️ 道具界
                // ============================================
                "Capacitor Level": "电容器（魔力+2%/级） 等级",
                "Juggernaut Level": "勇士（生命+2%/级） 等级",
                "Butcher Level": "屠夫（武器攻击伤害+2%/级） 等级",
                "Fatality Level": "致命（攻击暴击伤害+2%/级） 等级",
                "Overpower Level": "压制（反招架率+4%/级） 等级",
                "Swift Strike Level": "迅捷打击（攻速+1.92%/级） 等级",
                "Annihilator Level": "毁灭者（魔法暴击伤害+2%/级） 等级",
                "Archmage Level": "大法师（武器魔法伤害+2%/级） 等级",
                "Economizer Level": "节约者（魔力消耗减免+5%/级） 等级",
                "Penetrator Level": "穿透者（反抵抗率+4%/级） 等级",
                "Spellweaver Level": "织法者（施法速度+1.5%/级） 等级",
                "Hollowforged": "虚空升华",
                "Coldproof Level": "抗寒（冰冷抗性+4%/级） 等级",
                "Darkproof Level": "驱暗（黑暗抗性+4%/级） 等级",
                "Elecproof Level": "绝缘（闪电抗性+4%/级） 等级",
                "Fireproof Level": "耐热（火焰抗性+4%/级） 等级",
                "Holyproof Level": "驱圣（神圣抗性+4%/级） 等级",
                "Windproof Level": "防风（疾风抗性+4%/级） 等级",
                "Unlocked innate potential": "解锁内在潜能",
                "The equipment's potential has increased by": "装备的潜经验提升了",
                "points!": "点",
                'drops a' : '掉落了一颗',
                'powerup!' : ' ',
                'power up!' : ' ',
                'for it' : ' ',
                'for the remains' : ' ',
                'and' : '和',
                'drops a Health Gem powerup!' : '掉落了一颗生命宝石',
                'drops a Mana Gem powerup!' : '掉落了一颗魔力宝石',
                'drops a Spirit Gem powerup!' : '掉落了一颗灵力宝石',
                'drops a Mystic Gem powerup!' : '掉落了一颗神秘宝石',
                'drops a Health Gem power up!' : '掉落了一颗生命宝石',
                'drops a Mana Gem power up!' : '掉落了一颗魔力宝石',
                'drops a Spirit Gem power up!' : '掉落了一颗灵力宝石',
                'drops a Mystic Gem power up!' : '掉落了一颗神秘宝石',
                // ============================================
                // 💔 基础属性与资源 (Attributes & Resources)
                // ============================================
                "points of": " ",
                "health": { replace: "生命", style: "color:#006400" },
                "mana":   { replace: "魔力", style: "color:#639AD4" },
                'spirit': { replace: "灵力", style: "color:#D4637A" },
                "you": { replace: "你", style: "color:#1E90FF" },
                "You": { replace: "你", style: "color:#1E90FF" },
                "Your": { replace: "你的", style: "color:#1E90FF" },
            },
            patterns: [
                // ============================================
                // 🔍 3. 正则匹配
                // ============================================
                {
                    pattern: /Tower floor (.*) cleared/,
                    replace: "已通关第 $1 层塔楼"
                },
                {
                    pattern: /You gain (.*) exp/,
                    replace: "你获得了 $1 经验"
                },
                {
                    pattern: /absorbs (.*) damage from the attack into/,
                    replace: "吸收了 $1 伤害转换为"
                },
                {
                    pattern: /[sS]pirit [sS]hield/g,
                    replace: "灵力盾",
                    style: "color:#D4637A"
                },
                {
                    pattern: /magic(?! proficiency)/g,
                    replace: "魔力",
                    style: "color:#639AD4"
                },
                {
                    pattern: /[sS]pirit [sS]hield/g,
                    replace: "灵力盾"
                },
                {
                    pattern: /[yY]our [sS]pike [sS]hield hits (.*) for/g,
                    replace: '你的刺盾反弹了 $1',
                    style: "display:inline"
                },

                // casts? -> 咏唱了
                { pattern: /casts?/g, replace: " 施放了", style: "background:#7CFC00" },

                // gains? the effect -> 获得了状态
                { pattern: /gains? the effect/g, replace: "获得了状态", style: "background:#ADFF2F" },

                // The effect ... was dispelled
                { pattern: /The effect (.+) was dispelled\./g, replace: "效果 $1 已被替换" },

                // Healing
                {
                    pattern: /You are healed for (.*) Health Points/g,
                    replace: '你恢复了<span style="color:#006400"> $1 </span>生命',
                    style: "display:inline"
                },
                {
                    pattern: /healing (.*) for (.*) points of health/g,
                    replace: '治疗 $1 <span style="color:#006400"> $2 点生命</span>',
                    style: "display:inline"
                },
                {
                    pattern: /you from the brink of defeat!/g,
                    replace: '你<span style="background:#2E6F15;color:#FFFFFF">从死亡的边缘复活了!</span>',
                    style: "display:inline"
                },
                {
                    pattern: /partially resists the effects of your spell/g,
                    replace: '<span style="background:#81f7f3">抵抗了部分你的法术效果</span>',
                    style: "display:inline"
                },
                {
                    pattern: /shrugs off the effects of your spell/g,
                    replace: '<span style="background:#81f7f3">完全抵抗了你的法术效果</span>',
                    style: "display:inline"
                },
                // Defensive actions (Evade/Block/Parry from ...)
                { pattern: /You evade the attack from (.*)\./g, replace: '<span style="color:#696969">你闪避了 $1 的攻击</span>', style: "display:inline" },
                { pattern: /You block the attack from (.*)\./g, replace: '<span style="color:#696969">你格挡了 $1 的攻击</span>', style: "display:inline" },
                { pattern: /You parry the attack from (.*)\./g, replace: '<span style="color:#696969">你招架了 $1 的攻击</span>', style: "display:inline" },

                // Generic Defensive
                { pattern: /You evade the attack/g, replace: '<span style="color:#696969">你闪避了攻击</span>', style: "display:inline" },
                { pattern: /You block the attack/g, replace: '<span style="color:#696969">你格挡了攻击</span>', style: "display:inline" },
                { pattern: /You parry the attack/g, replace: '<span style="color:#696969">你招架了攻击</span>', style: "display:inline" },
                // Expired Effects
                {
                    pattern: /You crit /g,
                    replace: '<span style="color:#1E90FF">你</span><span style="background:#FF0000;color:#FFFFFF">暴击了</span> ',
                    style: "display:inline"
                },
                {
                    pattern: /The effect (.*) on (.*) has expired./g,
                    replace: '<span style="color:#C22508">$2 身上的状态 $1 已失效❗</span>',
                    style: "display:inline"
                },
                {
                    pattern: /The effect (.*) has expired/g,
                    replace: '<span style="color:#C22508">状态 $1 已失效❗</span>',
                    style: "display:inline"
                },
                {
                    pattern: /The effect (.*) on (.*) has worn off/g,
                    replace: '<span style="color:#C22508">$2 身上的状态 $1 已失效❗</span>',
                    style: "display:inline"
                },
                {
                    pattern: /The effect (.*) has worn off/g,
                    replace: '<span style="color:#C22508">状态 $1 已失效❗</span>',
                    style: "display:inline"
                },

                // Cooldown
                {
                    pattern: /Cooldown expired for (.*)/g,
                    replace: '<span style="color:#000000">$1</span> <span style="background:#97ffb2">已可使用</span>✅',
                    style: "display:inline"
                },

                // Counter
                {
                    pattern: /counter (.*) for (.*)/g,
                    replace: '<span style="background:#FFFF00">反击</span> $1 <span style="color:#e21a1a">造成 $2</span>',
                    style: "display:inline"
                },

                // Drains (HP/MP/SP)
                {
                    pattern: /You drain (.*) HP from (.*)/g,
                    replace: '你从 $2 身上吸取<span style="color:#006400"> $1 点生命</span>',
                    style: "display:inline"
                },
                {
                    pattern: /You drain (.*) MP from (.*)/g,
                    replace: '你从 $2 身上吸取<span style="color:#639AD4"> $1 点魔力</span>',
                    style: "display:inline"
                },
                {
                    pattern: /You drain (.*) SP from (.*)/g,
                    replace: '你从 $2 身上吸取<span style="color:#D4637A"> $1 点灵力</span>',
                    style: "display:inline"
                },
                // Drain variant phrases
                { pattern: /You drain (.*) points of health from (.*)/g, replace: '你从 $2 身上吸取<span style="color:#006400"> $1 点生命</span>', style: "display:inline" },
                { pattern: /You drain (.*) points of mana from (.*)/g, replace: '你从 $2 身上吸取<span style="color:#639AD4"> $1 点魔力</span>', style: "display:inline" },
                { pattern: /You drain (.*) points of spirit from (.*)/g, replace: '你从 $2 身上吸取<span style="color:#006400"> $1 点灵力</span>', style: "display:inline" },

                // Additional damage
                { pattern: /causing (.*) additional/g, replace: "额外造成 $1" },

                // Partial Defense
                { pattern: /parry the attack from (.*)/g, replace: "招架了来自$1的攻击" },

                // Partial Defense
                { pattern: /evade the attack from (.*)/g, replace: "闪避了来自$1的攻击" },
                // Multi-Crits (2x - 9x)
                { pattern: /You 2x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 双倍暴击了!</span> ', style: "display:inline" },
                { pattern: /You 3x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 三倍暴击了!!</span> ', style: "display:inline" },
                { pattern: /You 4x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 四倍暴击了!!!</span> ', style: "display:inline" },
                { pattern: /You 5x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 五倍暴击了!!!!</span> ', style: "display:inline" },
                { pattern: /You 6x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 六倍暴击了!!!!!</span> ', style: "display:inline" },
                { pattern: /You 7x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 七倍暴击了!!!!!!</span> ', style: "display:inline" },
                { pattern: /You 8x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 八倍暴击了!!!!!!!</span> ', style: "display:inline" },
                { pattern: /You 9x-crit /g, replace: '你<span style="background:#FF0000;color:#FFFFFF"> 九倍暴击了!!!!!!!!</span> ', style: "display:inline" },

                // Enemy Multi-Crits
                { pattern: /was 2x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 双倍暴击!</span>,造成', style: "display:inline" },
                { pattern: /was 3x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 三倍暴击!!</span>,造成', style: "display:inline" },
                { pattern: /was 4x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 四倍暴击!!!</span>,造成', style: "display:inline" },
                { pattern: /was 5x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 五倍暴击!!!!</span>,造成', style: "display:inline" },
                { pattern: /was 6x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 六倍暴击!!!!!</span>,造成', style: "display:inline" },
                { pattern: /was 7x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 七倍暴击!!!!!!</span>,造成', style: "display:inline" },
                { pattern: /was 8x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 八倍暴击!!!!!!!</span>,造成', style: "display:inline" },
                { pattern: /was 9x-crit for/g, replace: '受到<span style="background:#FF0000;color:#FFFFFF"> 九倍暴击!!!!!!!!</span>,造成', style: "display:inline" },

                // Misses / Shadows
                {
                    pattern: /vigorously whiffs at a shadow, missing you completely/g,
                    replace: '<span style="background:#696969;color:#FFFFFF">有力的攻击只掠过了你的阴影</span>',
                    style: "display:inline"
                },
                {
                    pattern: /in the general direction of a shadow, missing you completely/g,
                    replace: '<span style="background:#696969;color:#FFFFFF">但只掠过了你的阴影</span>',
                    style: "display:inline"
                },

                { pattern: /was hit for/g, replace: "被击中受到了" },
                {
                    pattern: /was crit for/g,
                    replace: '被<span style="background:#FF0000;color:#FFFFFF">暴击</span> 受到了',
                    style: "display:inline"
                },
                {
                    pattern: /(.*) has been defeated/g,
                    replace: '<span style="background:#000000;color:#FFFFFF">打败了 $1</span>',
                    style: "display:inline"
                },
                {
                    pattern: /have been defeated/g,
                    replace: "被击败了"
                },
                {
                    pattern: /A pouch on (.*) was damaged/g,
                    replace: "上的一个护符袋损坏了"
                },
                {
                    pattern: /plus (.*)/g,
                    replace: "残骸出售后额外获得了 $1"
                },
                {
                    pattern: /have reached Level/g,
                    replace: '<span style="background:#00FF00">升级至</span>',
                    style: "display:inline"
                },
                {
                    pattern: /for (\d+) damage/g,
                    replace: '造成 $1 伤害',
                    style: "display:inline"
                },

                // ============================================
                // 🌀 伤害类型名称 (Damage Types - Regex Keys)
                // ============================================
                { pattern: /[Ff]ire damage/g,      replace: '<span style="background:#f97c7c">火焰伤害</span>', style: "display:inline" },
                { pattern: /[Cc]old damage/g,      replace: '<span style="background:#94c2f5">冰冷伤害</span>', style: "display:inline" },
                { pattern: /[Vv]oid damage/g,      replace: '<span style="background:#ffffff;color:#5c5a5a">虚空伤害</span>', style: "display:inline" },
                { pattern: /[Ee]lec damage/g,      replace: '<span style="background:#f4f375">闪电伤害</span>', style: "display:inline" },
                { pattern: /[Ww]ind damage/g,      replace: '<span style="background:#7ff97c">疾风伤害</span>', style: "display:inline" },
                { pattern: /[Dd]ark damage/g,      replace: '<span style="background:#000000;color:#ffffff">黑暗伤害</span>', style: "display:inline" },
                { pattern: /[Hh]oly damage/g,      replace: '<span style="background:#ffffff;color:#000000">神圣伤害</span>', style: "display:inline" },
                { pattern: /[Ss]pirit damage/g,    replace: '<span style="color:#a2042c">灵力值伤害</span>', style: "display:inline" },
                { pattern: /[Cc]rushing damage/g,  replace: '<span style="background:#000000;color:#F6F504">打击伤害</span>', style: "display:inline" },
                { pattern: /[Ss]lashing damage/g,  replace: '<span style="background:#000000;color:#F6F504">斩击伤害</span>', style: "display:inline" },
                { pattern: /[Pp]iercing damage/g,  replace: '<span style="background:#000000;color:#F6F504">刺击伤害</span>', style: "display:inline" },

            ]
        },
        {
            //战斗日志掉落物品
            priority: 5,
            selector: '#pane_log, #pane_item',
            //excludeSelector:
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //"原文":"翻译",
                //掉落物品
                "Health Gem": "生命宝石",
                "Mana Gem": "魔力宝石",
                "Spirit Gem": "灵力宝石",
                "Mystic Gem": "神秘宝石",
                "Health Potion": "生命药水",
                "Health Draught": "生命饮剂",
                "Health Elixir": "生命秘药",
                "Mana Potion": "法力药水",
                "Mana Draught": "法力饮剂",
                "Mana Elixir": "法力秘药",
                "Spirit Potion": "灵力药水",
                "Spirit Draught": "灵力饮剂",
                "Spirit Elixir": "灵力秘药",
                "Last Elixir": "终极秘药",
                "Energy Drink": "能量饮料",
                "Caffeinated Candy": "咖啡因糖果",
                "Soul Stone": "灵魂石",
                "Flower Vase": "花瓶",
                "Bubble-Gum": "泡泡糖",
                "Infusion of Darkness": "黑暗魔药",
                "Infusion of Divinity": "神圣魔药",
                "Infusion of Storms": "风暴魔药",
                "Infusion of Lightning": "闪电魔药",
                "Infusion of Frost": "冰冷魔药",
                "Infusion of Flames": "火焰魔药",
                "Infusion of Gaia": "盖亚魔药",
                "Soul Fragments": "灵魂碎片",
                "Soul Fragment": "灵魂碎片",
                // --- 卷轴 ---
                "Scroll of Swiftness": "加速卷轴",
                "Scroll of the Avatar": "化身卷轴",
                "Scroll of Shadows": "幻影卷轴",
                "Scroll of Absorption": "吸收卷轴",
                "Scroll of Life": "生命卷轴",
                "Scroll of Protection": "保护卷轴",
                "Scroll of the Gods": "神之卷轴",
                'Crystal of Vigor' : '力量水晶',
                'Crystal of Finesse' : '灵巧水晶',
                'Crystal of Swiftness' : '敏捷水晶',
                'Crystal of Fortitude' : '体质水晶',
                'Crystal of Cunning' : '智力水晶',
                'Crystal of Knowledge' : '智慧水晶',
                'Crystal of Flames' : '火焰水晶',
                'Crystal of Frost' : '冰冻水晶',
                'Crystal of Lightning' : '闪电水晶',
                'Crystal of Tempest' : '疾风水晶',
                'Crystal of Devotion' : '神圣水晶',
                'Crystal of Corruption' : '暗黑水晶',
                'Crystal of Quintessence' : '灵魂水晶',

                'Monster Edibles' : '怪物食品',
                'Monster Chow' : '怪物口粮',
                'Monster Cuisine' : '怪物料理',
                'Happy Pills' : '快乐药丸',

                'Low-Grade Cloth': '低级布料',
                'Mid-Grade Cloth': '中级布料',
                'High-Grade Cloth': '高级布料',
                'Low-Grade Leather': '低级皮革',
                'Mid-Grade Leather': '中级皮革',
                'High-Grade Leather': '高级皮革',
                'Low-Grade Metals': '低级金属',
                'Mid-Grade Metals': '中级金属',
                'High-Grade Metals': '高级金属',
                'Low-Grade Wood': '低级木材',
                'Mid-Grade Wood': '中级木材',
                'High-Grade Wood': '高级木材',
                'Scrap Metal' : '金属废料',
                'Scrap Leather' : '皮革废料',
                'Scrap Wood' : '木材废料',
                'Scrap Cloth' : '废布料',
                'Energy Cell' : '能量元',
                'Defense Matrix Modulator' : '力场碎片(盾)',
                'Repurposed Actuator' : '动力碎片(重)',
                'Shade Fragment' : '暗影碎片(轻)',
                'Crystallized Phazon' : '相位碎片(布)',
                'Voidseeker Shard' : '虚空碎片',
                'Featherweight Shard' : '羽毛碎片',
                'Aether Shard' : '以太碎片',
                'Amnesia Shard' : '重铸碎片',
                'Soul Fragment' : '灵魂碎片',
                'Blood Token' : '鲜血令牌',
                'Token of Blood' : '鲜血令牌',
                'Chaos Token' : '混沌令牌',
                //一般奖杯
                'Precursor Artifact' : '古遗物',
                'ManBearPig Tail' : '人熊猪的尾巴(等级2)',
                'Mithra\'s Flower' : '猫人族的花(等级2)',
                'Holy Hand Grenade of Antioch' : '安提阿的神圣手榴弹(等级2)',
                'Dalek Voicebox' : '戴立克音箱(等级2)',
                'Lock of Blue Hair' : '一绺蓝发(等级2)',
                'Bunny-Girl Costume' : '兔女郎装(等级3)',
                'Hinamatsuri Doll' : '雏人形(等级3)',
                'Broken Glasses' : '破碎的眼镜(等级3)',
                'Sapling' : '树苗(等级4)',
                'Black T-Shirt' : '黑色Ｔ恤(等级4)',
                'Unicorn Horn' : '独角兽的角(等级5)',
                'Noodly Appendage' : '面条般的附肢(等级6)',
                'Festival Coupon' : '节日礼券(等级7)', //2020起收获节（中秋）
                //护符
                'Charm Pouch' : '护符袋',
                'Lesser Featherweight Charm' : '小型轻羽护符',
                'Greater Featherweight Charm' : '大型轻羽护符',
                'Lesser Fire Strike Charm' : '小型火焰打击护符',
                'Greater Fire Strike Charm' : '大型火焰打击护符',
                'Lesser Cold Strike Charm' : '小型冰霜打击护符',
                'Greater Cold Strike Charm' : '大型冰霜打击护符',
                'Lesser Lightning Strike Charm' : '小型闪电打击护符',
                'Greater Lightning Strike Charm' : '大型闪电打击护符',
                'Lesser Wind Strike Charm' : '小型疾风打击护符',
                'Greater Wind Strike Charm' : '大型疾风打击护符',
                'Lesser Holy Strike Charm' : '小型神圣打击护符',
                'Greater Holy Strike Charm' : '大型神圣打击护符',
                'Lesser Dark Strike Charm' : '小型黑暗打击护符',
                'Greater Dark Strike Charm' : '大型黑暗打击护符',
                'Lesser Capacitor Charm' : '小型魔力护符',
                'Greater Capacitor Charm' : '大型魔力护符',
                'Lesser Juggernaut Charm' : '小型生命护符',
                'Greater Juggernaut Charm' : '大型生命护符',
                'Lesser Butcher Charm' : '小型攻击伤害护符',
                'Greater Butcher Charm' : '大型攻击伤害护符',
                'Lesser Fatality Charm' : '小型攻击暴击伤害护符',
                'Greater Fatality Charm' : '大型攻击暴击伤害护符',
                'Lesser Overpower Charm' : '小型反招架护符',
                'Greater Overpower Charm' : '大型反招架护符',
                'Lesser Swiftness Charm' : '小型攻速护符',
                'Greater Swiftness Charm' : '大型攻速护符',
                'Lesser Annihilator Charm' : '小型魔法暴击伤害护符',
                'Greater Annihilator Charm' : '大型魔法暴击伤害护符',
                'Lesser Archmage Charm' : '小型魔法伤害护符',
                'Greater Archmage Charm' : '大型魔法伤害护符',
                'Lesser Economizer Charm' : '小型魔力消耗减免护符',
                'Greater Economizer Charm' : '大型魔力消耗减免护符',
                'Lesser Penetrator Charm' : '小型反抵抗护符',
                'Greater Penetrator Charm' : '大型反抵抗护符',
                'Lesser Spellweaver Charm' : '小型施法速度护符',
                'Greater Spellweaver Charm' : '大型施法速度护符',
                'Lesser Cold-proof Charm' : '小型冰抗护符',
                'Greater Cold-proof Charm' : '大型冰抗护符',
                'Lesser Dark-proof Charm' : '小型暗抗护符',
                'Greater Dark-proof Charm' : '大型暗抗护符',
                'Lesser Lightning-proof Charm' : '小型电抗护符',
                'Greater Lightning-proof Charm' : '大型电抗护符',
                'Lesser Fire-proof Charm' : '小型火抗护符',
                'Greater Fire-proof Charm' : '大型火抗护符',
                'Lesser Holy-proof Charm' : '小型圣抗护符',
                'Greater Holy-proof Charm' : '大型圣抗护符',
                'Lesser Wind-proof Charm' : '小型风抗护符',
                'Greater Wind-proof Charm' : '大型风抗护符',
                'Lesser Voidseeker Charm' : '小型虚空祝福护符',
                'Greater Voidseeker Charm' : '大型虚空祝福护符',
                'Lesser Aether Charm' : '小型以太护符',
                'Greater Aether Charm' : '大型以太护符',
                'Lesser Hollowforged Charm' : '小型虚空升华护符',
                'Greater Hollowforged Charm' : '大型虚空升华护符',
                'World Seed' : '世界之种',
                'World Seeds' : '世界之种',
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            //战斗熟练度统计
            //priority: 1,
            selector: "#proficiency-record",
            //excludeSelector:
            //ignoreWordBoundary: true,
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?\?s=Battle/
                },
                { mode: "prefix", match: "https://hentaiverse.org/?s=Bazaar&ss=am&screen=modify&filter=" },
                { mode: "prefix", match: "https://hentaiverse.org/isekai/?s=Bazaar&ss=am&screen=modify&filter=" },
            ],

            translations: {
                //"原文":"翻译",
                "one-handed weapon": "单手武器",
                "two-handed weapon": "双手武器",
                "dual wielding": "双持",
                "dual-wielding": "双持",
                "staff": "法杖",
                "cloth armor": "布甲",
                "light armor": "轻甲",
                "heavy armor": "重甲",
                "elemental magic": "元素魔法",
                "divine magic": "神圣魔法",
                "forbidden magic": "黑暗魔法",
                "deprecating magic": "减益魔法",
                "supportive magic": "增益魔法",
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            //buff持续时间
            //priority: 1,
            selector:".effect-duration",
            //excludeSelector:
            //ignoreWordBoundary: true,
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                {
                    mode: "regex",
                    match: /^https?:\/\/(?:alt\.)?hentaiverse\.org\/(?:isekai\/)?/
                }
            ],
            translations: {
                //"原文":"翻译",
                "auto":"常驻",
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            //字典模板
            //priority: 1,
            //selector:
            //excludeSelector:
            //ignoreWordBoundary: true,
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                { mode: "prefix", match: "" },
                { mode: "strict", match: "" },
                { mode: "regex", match: "" },
            ],
            translations: {
                //"原文":"翻译",
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },
        {
            //字典模板
            //priority: 1,
            //selector:
            //excludeSelector:
            //ignoreWordBoundary: true,
            //exclude: [
            //    { mode: "prefix", match: "" },
            //    { mode: "strict", match: "" },
            //    { mode: "regex", match: "" },
            //],
            conditions: [
                { mode: "prefix", match: "" },
                { mode: "strict", match: "" },
                { mode: "regex", match: "" },
            ],
            translations: {
                //"原文":"翻译",
            },
            patterns: [
                {
                    //pattern: /匹配内容/i,
                    //replace: ""
                },
            ]
        },

    ];

    //翻译逻辑区

    //原生弹窗劫持
    // 1. 备份原生的弹窗函数
    const nativeAlert = window.alert;
    const nativeConfirm = window.confirm;
    const nativePrompt = window.prompt;

    // 2. 系统消息翻译字典
    const sysMessages = {
        "Server communication failed: ": "服务器通讯错误：",
        "No item selected": "没有选中物品",
    };
    // 正则用字典
    const dynamicItemDict = {
        'Health Potion' : '生命药水',
        'Health Draught' : '生命饮剂',
        'Health Elixir' : '生命秘药',
        'Mana Potion' : '法力药水',
        'Mana Draught' : '法力饮剂',
        'Mana Elixir' : '法力秘药',
        'Spirit Potion' : '灵力药水',
        'Spirit Draught' : '灵力饮剂',
        'Spirit Elixir' : '灵力秘药',
        'Last Elixir' : '终极秘药',
        'Energy Drink' : '能量饮料',
        'Caffeinated Candy' : '咖啡因糖果',
        'Soul Stone' : '灵魂石',
        'Flower Vase' : '花瓶',
        'Bubble-Gum' : '泡泡糖',


        'Infusion of Darkness' : '黑暗魔药',
        'Infusion of Divinity' : '神圣魔药',
        'Infusion of Storms' : '风暴魔药',
        'Infusion of Lightning' : '闪电魔药',
        'Infusion of Frost' : '冰冷魔药',
        'Infusion of Flames' : '火焰魔药',
        'Infusion of Gaia' : '盖亚魔药',
        'Scroll of Swiftness' : '加速卷轴',
        'Scroll of the Avatar' : '化身卷轴',
        'Scroll of Shadows' : '幻影卷轴',
        'Scroll of Absorption' : '吸收卷轴',
        'Scroll of Life' : '生命卷轴',
        'Scroll of Protection' : '保护卷轴',
        'Scroll of the Gods' : '神之卷轴',

        'Crystal of Vigor' : '力量水晶',
        'Crystal of Finesse' : '灵巧水晶',
        'Crystal of Swiftness' : '敏捷水晶',
        'Crystal of Fortitude' : '体质水晶',
        'Crystal of Cunning' : '智力水晶',
        'Crystal of Knowledge' : '智慧水晶',
        'Crystal of Flames' : '火焰水晶',
        'Crystal of Frost' : '冰冻水晶',
        'Crystal of Lightning' : '闪电水晶',
        'Crystal of Tempest' : '疾风水晶',
        'Crystal of Devotion' : '神圣水晶',
        'Crystal of Corruption' : '暗黑水晶',
        'Crystal of Quintessence' : '灵魂水晶',

        'Monster Chow' : '怪物饲料',
        'Monster Edibles' : '怪物食品',
        'Monster Cuisine' : '怪物料理',
        'Happy Pills' : '快乐药丸',

        'Golden Lottery Ticket' : '黄金彩票券',
        'Token of Blood' : '鲜血令牌',
        'Chaos Token' : '混沌令牌',
        'Soul Fragment' : '灵魂碎片',

        'Binding of Slaughter':  '粘合剂 基础攻击伤害',
        'Binding of Balance':  '粘合剂 物理命中率',
        'Binding of Isaac':  '粘合剂 物理暴击率',
        'Binding of Destruction':  '粘合剂 基础魔法伤害',
        'Binding of Focus':  '粘合剂 魔法命中率',
        'Binding of Friendship':  '粘合剂 魔法暴击率',
        'Binding of Protection':  '粘合剂 物理减伤',
        'Binding of Warding':  '粘合剂 魔法减伤',
        'Binding of the Fleet':  '粘合剂 回避率',
        'Binding of the Barrier':  '粘合剂 格挡率',
        'Binding of the Nimble':  '粘合剂 招架率',
        'Binding of Negation':  '粘合剂 抵抗率',
        'Binding of the Ox':  '粘合剂 力量',
        'Binding of the Raccoon':  '粘合剂 灵巧',
        'Binding of the Cheetah':  '粘合剂 敏捷',
        'Binding of the Turtle':  '粘合剂 体质',
        'Binding of the Fox':  '粘合剂 智力',
        'Binding of the Owl':  '粘合剂 智慧',
        'Binding of the Elementalist':  '粘合剂 元素魔法熟练度',
        'Binding of the Heaven-sent':  '粘合剂 神圣魔法熟练度',
        'Binding of the Demon-fiend':  '粘合剂 黑暗魔法熟练度',
        'Binding of the Curse-weaver':  '粘合剂 减益魔法熟练度',
        'Binding of the Earth-walker':  '粘合剂 增益魔法熟练度',
        'Binding of Surtr':  '粘合剂 火焰魔法伤害',
        'Binding of Niflheim':  '粘合剂 冰冷魔法伤害',
        'Binding of Mjolnir':  '粘合剂 闪电魔法伤害',
        'Binding of Freyr':  '粘合剂 疾风魔法伤害',
        'Binding of Heimdall':  '粘合剂 神圣魔法伤害',
        'Binding of Fenrir':  '粘合剂 黑暗魔法伤害',
        'Binding of Dampening':  '粘合剂 打击减伤',
        'Binding of Stoneskin':  '粘合剂 斩击减伤',
        'Binding of Deflection':  '粘合剂 刺击减伤',
        'Binding of the Fire-eater':  '粘合剂 火焰减伤',
        'Binding of the Frost-born':  '粘合剂 冰冷减伤',
        'Binding of the Thunder-child':  '粘合剂 闪电减伤',
        'Binding of the Wind-waker':  '粘合剂 疾风减伤',
        'Binding of the Thrice-blessed':  '粘合剂 神圣减伤',
        'Binding of the Spirit-ward':  '粘合剂 黑暗减伤',

        'Wispy Catalyst' : '纤细 催化剂',
        'Diluted Catalyst' : '稀释 催化剂',
        'Regular Catalyst' : '平凡 催化剂',
        'Robust Catalyst' : '稳健 催化剂',
        'Vibrant Catalyst' : '活力 催化剂',
        'Coruscating Catalyst' : '闪耀 催化剂',

        'Low-Grade Cloth': '低级布料',
        'Mid-Grade Cloth': '中级布料',
        'High-Grade Cloth': '高级布料',
        'Low-Grade Leather': '低级皮革',
        'Mid-Grade Leather': '中级皮革',
        'High-Grade Leather': '高级皮革',
        'Low-Grade Metals': '低级金属',
        'Mid-Grade Metals': '中级金属',
        'High-Grade Metals': '高级金属',
        'Low-Grade Wood': '低级木材',
        'Mid-Grade Wood': '中级木材',
        'High-Grade Wood': '高级木材',
        'Scrap Metal' : '金属废料',
        'Scrap Leather' : '皮革废料',
        'Scrap Wood' : '木材废料',
        'Scrap Cloth' : '废布料',
        'Energy Cell' : '能量元',
        'Defense Matrix Modulator' : '力场碎片(盾)',
        'Repurposed Actuator' : '动力碎片(重)',
        'Shade Fragment' : '暗影碎片(轻)',
        'Crystallized Phazon' : '相位碎片(布)',

        'Legendary Weapon Core' : '传奇武器核心',
        'Peerless Weapon Core' : '无双武器核心',
        'Legendary Staff Core' : '传奇法杖核心',
        'Peerless Staff Core' : '无双法杖核心',
        'Legendary Armor Core' : '传奇护甲核心',
        'Peerless Armor Core' : '无双护甲核心',

        'Voidseeker Shard' : '虚空碎片',
        'Featherweight Shard' : '羽毛碎片',
        'Aether Shard' : '以太碎片',
        'Amnesia Shard' : '重铸碎片',

        'Twilight Sparkle Figurine' : '暮光闪闪公仔',
        'Rainbow Dash Figurine' : '云宝黛西公仔',
        'Applejack Figurine' : '苹果杰克公仔',
        'Fluttershy Figurine' : '小蝶公仔',
        'Pinkie Pie Figurine' : '萍琪派公仔',
        'Rarity Figurine' : '瑞瑞公仔',
        'Trixie Figurine' : '崔克茜公仔',
        'Princess Celestia Figurine' : '塞拉斯蒂亚公主公仔',
        'Princess Luna Figurine' : '露娜公主公仔',
        'Apple Bloom Figurine' : '小苹花公仔',
        'Scootaloo Figurine' : '飞板璐公仔',
        'Sweetie Belle Figurine' : '甜贝儿公仔',
        'Big Macintosh Figurine' : '大麦克公仔',
        'Spitfire Figurine' : '飞火公仔',
        'Derpy Hooves Figurine' : '小呆公仔',
        'Lyra Heartstrings Figurine' : '天琴心弦公仔',
        'Octavia Figurine' : '奥塔维亚公仔',
        'Zecora Figurine' : '泽科拉公仔',
        'Cheerilee Figurine' : '车厘子公仔',
        'Vinyl Scratch Figurine' : '维尼尔公仔',
        'Daring Do Figurine' : '无畏天马公仔',
        'Doctor Whooves Figurine' : '神秘博士公仔',
        'Berry Punch Figurine' : '酸梅酒公仔',
        'Bon-Bon Figurine' : '糖糖公仔',
        'Fluffle Puff Figurine' : '毛毛马公仔',
        'Angel Bunny Figurine' : '天使兔公仔',
        'Gummy Figurine' : '嘎米公仔',

        'Mithril Charm Pouch' : '秘银护符袋(T3)',
        'Kevlar Charm Pouch' : '凯夫拉护符袋(T2)',
        'Silk Charm Pouch' : '丝绸护符袋(T1)',
        'World Seed' : '世界之种',
        'Lesser Featherweight Charm' : '小型轻羽护符',
        'Greater Featherweight Charm' : '大型轻羽护符',
        'Lesser Fire Strike Charm' : '小型火焰打击护符',
        'Greater Fire Strike Charm' : '大型火焰打击护符',
        'Lesser Cold Strike Charm' : '小型冰霜打击护符',
        'Greater Cold Strike Charm' : '大型冰霜打击护符',
        'Lesser Lightning Strike Charm' : '小型闪电打击护符',
        'Greater Lightning Strike Charm' : '大型闪电打击护符',
        'Lesser Wind Strike Charm' : '小型疾风打击护符',
        'Greater Wind Strike Charm' : '大型疾风打击护符',
        'Lesser Holy Strike Charm' : '小型神圣打击护符',
        'Greater Holy Strike Charm' : '大型神圣打击护符',
        'Lesser Dark Strike Charm' : '小型黑暗打击护符',
        'Greater Dark Strike Charm' : '大型黑暗打击护符',
        'Lesser Capacitor Charm' : '小型魔力护符',
        'Greater Capacitor Charm' : '大型魔力护符',
        'Lesser Juggernaut Charm' : '小型生命护符',
        'Greater Juggernaut Charm' : '大型生命护符',
        'Lesser Butcher Charm' : '小型攻击伤害护符',
        'Greater Butcher Charm' : '大型攻击伤害护符',
        'Lesser Fatality Charm' : '小型攻击暴击伤害护符',
        'Greater Fatality Charm' : '大型攻击暴击伤害护符',
        'Lesser Overpower Charm' : '小型反招架护符',
        'Greater Overpower Charm' : '大型反招架护符',
        'Lesser Swiftness Charm' : '小型攻速护符',
        'Greater Swiftness Charm' : '大型攻速护符',
        'Lesser Annihilator Charm' : '小型魔法暴击伤害护符',
        'Greater Annihilator Charm' : '大型魔法暴击伤害护符',
        'Lesser Archmage Charm' : '小型魔法伤害护符',
        'Greater Archmage Charm' : '大型魔法伤害护符',
        'Lesser Economizer Charm' : '小型魔力消耗减免护符',
        'Greater Economizer Charm' : '大型魔力消耗减免护符',
        'Lesser Penetrator Charm' : '小型反抵抗护符',
        'Greater Penetrator Charm' : '大型反抵抗护符',
        'Lesser Spellweaver Charm' : '小型施法速度护符',
        'Greater Spellweaver Charm' : '大型施法速度护符',
        'Lesser Cold-proof Charm' : '小型冰抗护符',
        'Greater Cold-proof Charm' : '大型冰抗护符',
        'Lesser Dark-proof Charm' : '小型暗抗护符',
        'Greater Dark-proof Charm' : '大型暗抗护符',
        'Lesser Lightning-proof Charm' : '小型电抗护符',
        'Greater Lightning-proof Charm' : '大型电抗护符',
        'Lesser Fire-proof Charm' : '小型火抗护符',
        'Greater Fire-proof Charm' : '大型火抗护符',
        'Lesser Holy-proof Charm' : '小型圣抗护符',
        'Greater Holy-proof Charm' : '大型圣抗护符',
        'Lesser Wind-proof Charm' : '小型风抗护符',
        'Greater Wind-proof Charm' : '大型风抗护符',
        'Lesser Voidseeker Charm' : '小型虚空祝福护符',
        'Greater Voidseeker Charm' : '大型虚空祝福护符',
        'Lesser Aether Charm' : '小型以太护符',
        'Greater Aether Charm' : '大型以太护符',
        'Lesser Hollowforged Charm' : '小型虚空升华护符',
        'Greater Hollowforged Charm' : '大型虚空升华护符',

        //当前可以获取的文物和奖杯
        'Precursor Artifact' : '古遗物',
        'ManBearPig Tail' : '人熊猪的尾巴(等级2)',
        'Holy Hand Grenade of Antioch' : '安提阿的神圣手榴弹(等级2)',
        'Mithra\'s Flower' : '猫人族的花(等级2)',
        'Dalek Voicebox' : '戴立克音箱(等级2)',
        'Lock of Blue Hair' : '一绺蓝发(等级2)',
        'Bunny-Girl Costume' : '兔女郎装(等级3)',
        'Hinamatsuri Doll' : '雏人形(等级3)',
        'Broken Glasses' : '破碎的眼镜(等级3)',
        'Sapling' : '树苗(等级4)',
        'Black T-Shirt' : '黑色Ｔ恤(等级4)',
        'Unicorn Horn' : '独角兽的角(等级5)',
        'Noodly Appendage' : '面条般的附肢(等级6)',

        //礼券
        'Bronze Coupon' : '铜礼券(等级3)',
        'Silver Coupon' : '银礼券(等级5)',
        'Gold Coupon' : '黄金礼券(等级7)',
        'Platinum Coupon' : '白金礼券(等级8)',
        'Peerless Voucher' : '无双凭证(等级10)',
    };

    // 3. 正则翻译字典
    const sysRegex = [
        // --- 商店/交易相关 ---
        {
            reg: /^Are you sure you wish to purchase ([\d,]+) equipment pieces\? for ([\d,]+) credits\?/,
            repl: "是否确认以 $2 Credits的价格购买 $1 件装备"
        },
        {
            reg: /^Are you sure you wish to sell ([\d,]+) equipment pieces\? for ([\d,]+) credits\?/,
            repl: "是否确认以 $2 Credits的价格出售 $1 件装备"
        },
        {
            reg: /^Are you sure you wish to purchase ([\d,]+) (.+) for ([\d,]+) credits \?/,
            // p1=数量, p2=名称, p3=价格
            repl: (m, p1, p2, p3) => `是否确认以 ${p3} Credits的价格购买 ${p1} 个 ${transItem(p2)}`
        },
        {
            reg: /^Are you sure you wish to sell ([\d,]+) (.+) for ([\d,]+) credits \?/,
            // p1=数量, p2=名称, p3=价格
            repl: (m, p1, p2, p3) => `是否确认以 ${p3} Credits的价格出售 ${p1} 个 ${transItem(p2)}`
        },
        {
            reg: /Are you sure you wish to offer Snowflake a?/,
            repl: "是否确认向雪花女神献祭 "
        },
        // --- 邮件系统 ---
        {
            reg: /^You have attached ([\d,]+) items?, and the CoD is set to ([\d,]+) credits, kupo!/,
            repl: "你在邮件中附加了 $1 个附件，并且设置了 $2 Credits的货到付款(CoD)，注意！"
        },
        {
            reg: /^You have attached ([\d,]+) items?, but you have not set a CoD, kupo! The attachments will be a gift, kupo!/,
            repl: "你在邮件中附加了 $1 个附件，但是没有设置货到付款(CoD)，注意！你的附件将会被认为是礼物免费送出！"
        },
        {
            reg: /^Sending it will cost you ([\d,]+) credits, kupo!/,
            repl: "发送本邮件将会收取你 $1 Credits 的费用！注意！"
        },
        {
            reg: /Sending it will cost you ([\d,]+) credits, kupo! Are you sure you wish to send this message, kupo\?/,
            repl: "发送本邮件将会收取你 $1 Credits 的费用！注意！"
        },
        {
            reg: /^Are you sure you wish to send this message, kupo\?/,
            repl: "是否确认发送本邮件？"
        },
        {
            reg: /^Are you sure you wish to discard this message, kupo\?/,
            repl: "是否确认丢弃本邮件信息？注意！"
        },
        {
            reg: /^Removing the attachments will deduct ([\d,]+) Credits from your account, kupo! Are you sure\?/,
            repl: "领取本邮件附件将会收取你 $1 Credits 货到付款(CoD)费用，是否确认？注意！"
        },
        {
            reg: /^This will return the message to the sender, kupo! Are you sure\?/,
            repl: "此操作将会把邮件退还给发件人，是否确认？注意！"
        },

        // --- 角色/人格管理 ---
        {
            reg: /^Enter a new name for this persona\./,
            repl: "请输入一个新的用户名（1~20字符，仅支持英文和数字）"
        },
        {
            reg: /^Are you sure you wish to create a new persona with the same attribute, slot, equipment and ability assignments as "(.+)"\? This action is irreversible, and created personas cannot be deleted\./,
            repl: "是否确认创建一个和 $1 相同属性、套装、技能分配的人格角色？注意此操作不可撤销且创建的角色无法删除！"
        },
        {
            reg: /^Are you sure you wish to create a blank persona\? This action is irreversible, and created personas cannot be deleted\./,
            repl: "是否确认创建一个未设置的全新人格角色？（你的等级经验和基础熟练、装备物品仓库等仍然和当前人格角色共享）请注意此操作无法撤销且创建的角色无法删除！"
        },

        // --- 技能重置 ---
        {
            reg: /^Reseting this ability will cost ([\d,]+) soul fragments?\. Proceed\?/,
            repl: "重置该技能将消耗 $1 个灵魂碎片，是否执行？"
        },
        {
            reg: /^Reseting this ability is free this time\. Proceed\?/,
            repl: "本次重置技能免费(总计达到10次之后将消耗灵魂碎片)，是否执行？"
        },
        {
            reg: /^This will reset ALL mastery and ability point assignments at a cost of ([\d,]+) soul fragments?\. Proceed\?/,
            repl: "此操作将重置所有技能点和已配置的支配点，本次重置将消耗 $1 个灵魂碎片。是否执行？"
        },
        {
            reg: /^This will reset ALL mastery and ability point assignments\. This time it is free\. Proceed\?/,
            repl: "此操作将重置所有技能点和已配置的支配点，本次重置免费(下一次全部重置将消耗灵魂碎片)。是否执行？"
        },

        // --- 竞技场与怪物 ---
        {
            reg: /^Enter a new name for this monster\./,
            repl: "请输入怪物的新名称（3~30字符，仅支持英文和数字）"
        },
        {
            reg: /^Are you sure you wish to delete the monster (.+)\? This action cannot be reversed\./,
            repl: "是否确认删除怪物 $1 ？ 此操作无法撤销！"
        },
        {
            reg: /^Are you sure you wish to opt out of the grand prize drawing on this lottery\? This is not reversible\./,
            repl: "是否确认放弃本次彩票的头奖？此操作无法撤销"
        },
        {
            reg: /^Are you sure you wish to start this Arena Challenge\?/,
            repl: "是否确认进入竞技场挑战？"
        },
        {
            reg: /^Are you sure you wish to spend ([\d,]+) tokens? to start this Arena Challenge\?/,
            repl: "是否确认消耗 $1 个令牌进入竞技场？"
        },
        {
            reg: /^Are you sure you wish to enter the Ring of Blood\?/,
            repl: "是否确认进入浴血擂台挑战？"
        },
        {
            reg: /^Are you sure you wish to spend ([\d,]+) tokens? to enter the Ring of Blood\?/,
            repl: "是否确认消耗 $1 个鲜血令牌进入浴血擂台挑战？"
        },
        // --- 装备操作 ---
        {
            reg: /^Enter a name for this equipment\./,
            repl: "请输入装备名称（最大50个字符，仅支持字母和数字和非特殊字符)"
        },
        {
            reg: /^Are you sure you want to reforge this item\? This will remove all potencies and reset its level to zero\./,
            repl: "是否确认重铸所选装备？此操作将会移除该装备所有的已解锁潜能并将潜能等级重置为0。"
        },
        {
            reg: /^Are you sure you want to soulfuse this item\? This will bind it to your level, but makes it untradeable\./,
            repl: "是否确认灵魂绑定所选装备？该装备将会跟随你的等级成长并且变成不可交易。"
        }
    ];

// 4. 通用翻译处理函数
function translateSystemMsg(msg) {
    if (!msg) return msg;

    // 优先尝试完全匹配
    if (sysMessages[msg]) {
        return sysMessages[msg];
    }

    // 其次尝试正则匹配
    for (let i = 0; i < sysRegex.length; i++) {
        if (sysRegex[i].reg.test(msg)) {
            return msg.replace(sysRegex[i].reg, sysRegex[i].repl);
        }
    }
    // 如果都没匹配上，返回原文 (方便你看到原文后续添加到字典里)
    return msg;
}
function transItem(name) {
    const cleanName = name.replace(/^["']|["']$/g, '').trim();
    // 2. 用干净的名字查字典
    const translated = dynamicItemDict[cleanName];
    // 3. 如果查到了，返回翻译结果
    if (translated) {
        return translated;
        // 如果你想给翻译后的词加上中文引号，可以用下面这行代替上面这行：
        // return `“${translated}”`;
    }
    // 4. 如果没查到，返回原始值 (这里的 name 是包含引号的原文，保留它以防误操作)
    return name;
}

// 5. 覆盖原生 alert
window.alert = function (message) {
    const translated = translateSystemMsg(message);
    nativeAlert(translated); // 调用备份的原生函数，显示翻译后的文字
};

// 6. 覆盖原生 confirm (如果有 "确定/取消" 框)
window.confirm = function (message) {
    const translated = translateSystemMsg(message);
    return nativeConfirm(translated);
};

// 7. 覆盖原生 prompt (如果有输入框)
window.prompt = function (message, _default) {
    const translated = translateSystemMsg(message);
    return nativePrompt(translated, _default);
};

// ================= 0. 基础配置与缓存 =================
const translationCache = new WeakMap();
const processedMarks = new WeakSet();
const UI_SELECTORS = "input[type='submit'], input[type='button'], button, option, optgroup, label, input[placeholder], [title]";
function escapeRegExp(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// ================= 1. 论坛结构保护逻辑 =================
function normalizeStyledTextInPostcolor() {
    const posts = document.getElementsByClassName('postcolor');
    for (let i = 0; i < posts.length; i++) {
        let el = posts[i];
        el.innerHTML = el.innerHTML
            .replace(/<span[^>]*>/gi, "")
            .replace(/<\/span>/gi, "")
            .replace(/<!--.*?-->/g, "")
            .replace(/<mark[^>]*>/gi, "")
            .replace(/<\/mark>/gi, "")
            .replace(/<b>/gi, "")
            .replace(/<\/b>/gi, "");
    }
}

// ==========================================
// 样式修正 (修复汉化后的排版错位)
// ==========================================
(function addCustomStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        #eqbaserolls table td {
            padding: 0px 2px !important;
            line-height: 1.15 !important;
        }
        #eqbaserolls {
            overflow-y: auto !important;
        }

        /* 军械库菜单汉化后文字变短，HVUT 的侧边按钮又是 absolute，
           不参与左栏宽度计算，会压到右侧装备列表。让按钮回到文档流，
           由按钮本身撑开左栏，比硬固定英文宽度更紧凑。 */
        #armory_left .hvut-am-side {
            position: static !important;
            width: 100px !important;
            margin: 20px 4px 0 !important;
            box-sizing: border-box !important;
        }

        #armory_left .armory_tab {
            box-sizing: border-box !important;
            width: 100% !important;
            text-align: center !important;
        }

        /* 1. 压缩表格单元格的垂直间距 */
        #equipaction table td {
            padding: 1px 0px !important; /* 上下仅留1px */
            height: auto !important;      /* 覆盖原有的固定高度 */
        }

        /* 2. 压缩按钮本身的尺寸 */
        #equipaction button {
            margin: 0px !important;       /* 去掉按钮外部间距 */
            padding: 2px 5px !important;  /* 减小按钮内部留白 */
            line-height: 2 !important;  /* 强制收紧文字行高 */
            min-height: 24px !important;  /* 限制最小高度，防止变得过高 */
            font-size: 12px !important;   /* 字体稍微改小以适应布局 */
        }

        /* 3. 保险措施：如果还是太高，允许滚动，不要截断 */
        #equipaction {
            overflow-y: auto !important;
            padding-bottom: 5px !important; /* 底部留点空隙给滚动条 */
        }
    `;
    document.head.appendChild(style);
})();

// ================= 2. 匹配规则与分层编译 (修正边界匹配) =================
const currentUrl = location.href;
let matchedRules = [];

// URL 匹配逻辑
for (const item of pageTranslations) {
    if (item.exclude && Array.isArray(item.exclude)) {
        const isExcluded = item.exclude.some(cond => {
            if (cond.mode === "strict") return currentUrl === cond.match;
            if (cond.mode === "prefix") return currentUrl.startsWith(cond.match);
            if (cond.mode === "regex") return cond.match instanceof RegExp && cond.match.test(currentUrl);
            return false;
        });
        if (isExcluded) continue;
    }
    const isMatched = item.conditions.some(cond => {
        if (cond.mode === "strict") return currentUrl === cond.match;
        if (cond.mode === "prefix") return currentUrl.startsWith(cond.match);
        if (cond.mode === "regex") return cond.match instanceof RegExp && cond.match.test(currentUrl);
        return false;
    });
    if (isMatched) matchedRules.push(item);
}

// 1. 按优先级【降序】排列 (100 -> 1)
matchedRules.sort((a, b) => (Number(b.priority) || 1) - (Number(a.priority) || 1));

const executionQueue = matchedRules.map(rule => {
    const dict = rule.translations || {};
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);

    // 【新增】：读取规则中的 flag
    const shouldCheckBoundary = !rule.ignoreWordBoundary;

    const staticRegex = keys.length > 0
    ? new RegExp(keys.map(key => {
        const escaped = escapeRegExp(key);
        // 只有当 shouldCheckBoundary 为 true 时，才给单词加边界
        if (shouldCheckBoundary && /^\w+$/.test(key)) {
            return `\\b${escaped}\\b`;
        }
        return escaped;
    }).join('|'), 'g')
    : null;

    return {
        priority: Number(rule.priority) || 1,
        selector: rule.selector || null,
        excludeSelector: rule.excludeSelector || null,
        // 【新增】：将 flag 传递给执行队列，供 Part 4 使用
        ignoreWordBoundary: rule.ignoreWordBoundary || false,
        dict: dict,
        keys: keys,
        staticRegex: staticRegex,
        patterns: rule.patterns || []
    };
});

// ================= 3. 辅助函数 =================

function applyStyleToNode(node, matchIndex, matchLength, newText, style) {
    try {
        const range = document.createRange();
        range.setStart(node, matchIndex);
        range.setEnd(node, matchIndex + matchLength);

        const mark = document.createElement('mark');
        mark.className = 'trans-styled';
        // 重置 mark 默认样式，应用自定义样式
        mark.style.cssText = "background: transparent; color: inherit; padding: 0; margin: 0;" + style;
        mark.innerHTML = newText;

        processedMarks.add(mark);

        range.deleteContents();
        range.insertNode(mark);
        return true;
    } catch (e) {
        console.error("[Translation Error] Style injection failed:", e);
        return false;
    }
}

function getPlainText(text, translationsDict) {
    if (!text) return text;
    const val = translationsDict[text];
    if (val) {
        return (typeof val === 'object' && val.replace) ? val.replace : val;
    }
    return text;
}

// ================= 4. 翻译核心引擎  =================
/**
     * 纯文本替换器 (用于 UI 元素)
     * 逻辑顺序：正则 -> 字典 (按优先级分层执行)
     */
function getTranslatedString(text, element) {
    if (!text || !text.trim()) return text;
    // --- 新增：如果禁用日志汉化且元素在日志区，返回原文 ---
    if (IS_LOG_TRANS_DISABLED && element && element.closest('#pane_log')) {
        return text;
    }
    let result = text;
    for (const group of executionQueue) {
        if (group.selector && element && !element.closest(group.selector)) continue;
        if (group.excludeSelector && element && element.closest(group.excludeSelector)) continue;

        // 1. 正则替换
        for (const p of group.patterns) {
            if (!p.style) result = result.replace(p.pattern, p.replace);
        }
        // 2. 字典替换
        if (group.staticRegex) {
            result = result.replace(group.staticRegex, (m) => getPlainText(m, group.dict));
        }
    }
    return result;
}

/**
     * 文本节点处理器 (重构版)
     * 执行顺序：
     * 1. 纯文本正则 (修正文本)
     * 2. 样式正则 (切割节点)
     * 3. 样式字典 (切割节点)
     * 4. 纯文本字典 (最终替换)
     */
function translateTextNode(node) {
    if (!node || node.nodeType !== 3) return;
    const parent = node.parentNode;
    if (!parent || processedMarks.has(parent)) return;
    if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return;
    // --- 新增：如果禁用日志汉化且父节点在日志区，直接跳过 ---
    if (IS_LOG_TRANS_DISABLED && parent.closest('#pane_log')) {
        return;
    }

    let text = node.nodeValue;
    if (!text.trim()) return;
    if (translationCache.get(node) === text) return;

    // 遍历每一个规则组 (按优先级)
    for (const group of executionQueue) {
        // A. 作用域与排除检查
        if (group.selector && !parent.closest(group.selector)) continue;
        if (group.excludeSelector && parent.closest(group.excludeSelector)) continue;

        // ================= STEP 1: 纯文本正则 (Plain Regex) =================
        // 优先执行，确保文本被清洗或修正，为后续匹配做准备
        let hasTextChanged = false;
        for (const p of group.patterns) {
            if (!p.style) {
                const newText = text.replace(p.pattern, p.replace);
                if (newText !== text) {
                    text = newText;
                    hasTextChanged = true;
                }
            }
        }
        // 如果文本发生了变化，立即更新 DOM 和缓存，确保后续逻辑基于新文本
        if (hasTextChanged) {
            node.nodeValue = text;
            translationCache.set(node, text);
        }

        // ================= STEP 2: 样式正则 (Style Regex) =================
        // 能够切割节点的正则
        for (const p of group.patterns) {
            if (p.style) {
                const regex = new RegExp(p.pattern);
                const match = regex.exec(text);
                if (match) {
                    const replaceText = (typeof p.replace === 'function') ? p.replace(...match) : match[0].replace(regex, p.replace);
                    // 命中样式 -> 立即执行并返回 (打断当前节点的后续处理，等待 DOM 变动回调)
                    if (applyStyleToNode(node, match.index, match[0].length, replaceText, p.style)) return;
                }
            }
        }

        // ================= STEP 3: 样式字典 (Style Dict) =================
        // 能够切割节点的字典
        for (const key of group.keys) {
            const target = group.dict[key];
            if (typeof target === 'object' && target.style) {
                const idx = text.indexOf(key);
                if (idx !== -1) {
                    // 边界检查逻辑 (保留之前的 ignoreWordBoundary 功能)
                    if (!group.ignoreWordBoundary && /^\w+$/.test(key)) {
                        const charBefore = idx > 0 ? text[idx - 1] : " ";
                        const charAfter = idx + key.length < text.length ? text[idx + key.length] : " ";
                        if (/\w/.test(charBefore) || /\w/.test(charAfter)) {
                            continue;
                        }
                    }

                    // 命中样式 -> 立即执行并返回
                    if (applyStyleToNode(node, idx, key.length, target.replace, target.style)) return;
                }
            }
        }

        // ================= STEP 4: 纯文本字典 (Plain Dict) =================
        // 当前层级的字典替换 (无样式)
        if (group.staticRegex) {
            const newText = text.replace(group.staticRegex, (m) => getPlainText(m, group.dict));
            if (newText !== text) {
                text = newText;
                node.nodeValue = text;
                translationCache.set(node, text);
            }
        }
    }
    // 循环结束，所有层级处理完毕
}

function translateUIElement(el) {
    if (!el || processedMarks.has(el)) return;
    const attrsToTranslate = ['value', 'placeholder', 'title'];
    attrsToTranslate.forEach(attr => {
        const original = el.getAttribute ? el.getAttribute(attr) : el[attr];
        if (original && original.trim()) {
            const cacheKey = `cache_${attr}`;
            if (el[cacheKey] === original) return;
            const translated = getTranslatedString(original, el);
            if (translated !== original) {
                if (el.setAttribute) el.setAttribute(attr, translated);
                else el[attr] = translated;
                el[cacheKey] = translated;
            }
        }
    });
    if (['BUTTON', 'OPTION', 'OPTGROUP', 'LABEL'].includes(el.tagName)) {
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) return;
    }
}

// ================= 5. 执行逻辑 =================
function applyAll(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) translateTextNode(node);

    if (root.matches && root.matches(UI_SELECTORS)) translateUIElement(root);
    if (root.querySelectorAll) {
        root.querySelectorAll(UI_SELECTORS).forEach(translateUIElement);
    }
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (m.type === 'childList') {
            m.addedNodes.forEach(n => {
                if (n.nodeType === 1) applyAll(n);
                else if (n.nodeType === 3) translateTextNode(n);
            });
        }
        else if (m.type === 'characterData') {
            translateTextNode(m.target);
        }
        else if (m.type === 'attributes') {
            translateUIElement(m.target);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['value', 'placeholder', 'title']
});

document.addEventListener('mousedown', e => {
    const target = e.target.closest(UI_SELECTORS);
    if (target) {
        [10, 50, 200].forEach(delay => {
            setTimeout(() => translateUIElement(target), delay);
        });
    }
}, true);

function initLogToggleButton() {
    const logPane = document.getElementById('pane_log');
    if (!logPane) return;

    const btn = document.createElement('button');
    btn.id = 'logTransToggleBtn';
    btn.textContent = IS_LOG_TRANS_DISABLED ? '日志汉化: 关' : '日志汉化: 开';

    // 样式设定 (颜色为蓝色，区别于主开关)
    Object.assign(btn.style, {
        position: 'fixed',
        zIndex: '10001',
        padding: '4px 8px',
        fontSize: '12px',
        cursor: 'move',
        backgroundColor: IS_LOG_TRANS_DISABLED ? '#666' : '#2196F3',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        userSelect: 'none',
        touchAction: 'none'
    });

    // 读取保存的位置
    const savedTop = localStorage.getItem('logBtnTop') || '100px';
    const savedLeft = localStorage.getItem('logBtnLeft') || (window.innerWidth - 100 + 'px');
    btn.style.top = savedTop;
    btn.style.left = savedLeft;

    document.body.appendChild(btn);

    // --- 拖动逻辑 ---
    let isDragging = false;
    let startX, startY;

    btn.addEventListener('mousedown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;

        const shiftX = e.clientX - btn.getBoundingClientRect().left;
        const shiftY = e.clientY - btn.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            // 如果移动距离超过 5px，判定为拖拽
            if (Math.abs(pageX - startX) > 5 || Math.abs(pageY - startY) > 5) {
                isDragging = true;
            }
            const newTop = pageY - shiftY + 'px';
            const newLeft = pageX - shiftX + 'px';
            btn.style.top = newTop;
            btn.style.left = newLeft;
            localStorage.setItem('logBtnTop', newTop);
            localStorage.setItem('logBtnLeft', newLeft);
        }

        function onMouseMove(e) { moveAt(e.pageX, e.pageY); }

        document.addEventListener('mousemove', onMouseMove);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    });

    // 防止拖拽松开时触发点击
    btn.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            return;
        }
        IS_LOG_TRANS_DISABLED = !IS_LOG_TRANS_DISABLED;
        localStorage.setItem('LogTransDisabled', IS_LOG_TRANS_DISABLED);
        location.reload();
    });
}

// 启动
normalizeStyledTextInPostcolor();
applyAll(document.body);
initLogToggleButton(); // <--- 添加这一行
})();
