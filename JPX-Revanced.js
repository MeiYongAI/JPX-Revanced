// ==UserScript==
// @name         JPX-Revanced
// @namespace    ijpx
// @version      26.06.08
// @author       MeiYongAI
// @icon         https://hentaiverse.org/y/favicon.png
// @description  jpx
// @run-at       document-end
// @match        *://*.hentaiverse.org/*
// @exclude      *hentaiverse.org/equip/*
// @exclude      *hentaiverse.org/isekai/equip/*
// @grant none
// ==/UserScript==

let cfgBattle = {};
let defaultCfgBattle = {
    "battleVersion": 20251216,
    "advanceToNextRound": false,
    "ajaxRound": false,
    "autoFinishBattle": true,
    "notifyOnRiddle": false,
    "riddleAlarmLimit": 5,
    "showCooldowns": false,
    "quickbarExtend": [],
    "showDurations": false,
    "showRealTimeProficiency": false,
    "showMonsterIndex": false,
    "showMonsterInfo": false,
    "showMonsterHP": false,
    "recordBattleLog": false,
    "dailyStaminaQuotaPlus": 0,
    "ctrlWidgetStyleText": [],
    "ctrlWidgetMouseEnter": false,
    "ctrlWidgetRows": [
        {"id":"isActiveBattle"},
        {"id":"readyNext"},
        {"id":"networkDelay"},
        {"id":"battleStyle"},
        {"id":"battleType"},
        {"id":"round"}
    ],
    "OneHanded_General": {
        "supports": [
            {"type":"item","name":"Spirit Gem","conditions":[{"key":"pSP","value":[0,0.9]}]},
            {"type":"item","name":"Spirit Potion","conditions":[{"key":"pSP","value":[0,0.5]}]},
            {"type":"item","name":"Last Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"item","name":"Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"stop","customMessage":"Can't use Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"item","name":"Health Gem","conditions":[]},
            {"type":"spellSupport","name":"Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Potion","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"spellSupport","name":"Full-Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"stop","customMessage":"Can't use Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Gem","conditions":[{"key":"pMP","value":[0,0.8]}]},
            {"type":"item","name":"Mana Potion","conditions":[{"key":"pMP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"stop","customMessage":"Can't use Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"item","name":"Mystic Gem","conditions":[{"key":"pIgnoredEffects","value":[0,9999,"Channeling"]}]},
            {"type":"spellSupport","name":"Heartseeker","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,100,"Heartseeker"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,50,"Regen"]}]},
            {"type":"toggle","name":"Spirit","toggled":true,"conditions":[{"key":"pOC","value":[6,10]}]},
            {"type":"spellSupport","name":"Heartseeker","conditions":[{"key":"pEffects","value":[-1,0,"Heartseeker"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[-1,0,"Regen"]}]},
            {"type":"item","name":"Health Draught","conditions":[{"key":"pEffects","value":[-1,0,"Regeneration"]},{"key":"monsters","value":[4,10]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]},
            {"type":"item","name":"Mana Draught","conditions":[{"key":"pEffects","value":[-1,0,"Replenishment"]},{"key":"pMP","value":[0,0.85]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]},
            {"type":"item","name":"Spirit Draught","conditions":[{"key":"pEffects","value":[-1,0,"Refreshment"]},{"key":"pSP","value":[0,0.9]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]}
        ],
        "attacks": [
            {"type":"smartDebuff","name":"Weaken","targetCount":3,"tailSkip":0,"bottomUp":false,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tTypes","value":["Arena400","Arena500"],"offset":[0,0],"matched":[1,1]},{"key":"tIgnoredEffects","value":[1,9999,"Weakened"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"world","value":["Persistent"]},{"key":"tDaysSinceUpdate","value":[46,9999],"offset":[0,0],"matched":[1,1]},{"key":"tIgnoredEffects","value":[0,9999,"Imperiled","Searing Skin","Freezing Limbs","Turbulent Air","Deep Burns","Breached Defense","Blunted Attack"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"skill","name":"Scan","conditions":[{"key":"pActionCounts","value":[0,0,"Scan"]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tName","value":"Yggdrasil","offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tTypes","value":["Rare","Legendary","Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[]},
            {"type":"skill","name":"Orbital Friendship Cannon","conditions":[{"key":"activeMonsters","value":[6,10]},{"key":"pOC","value":[9,10]},{"key":"pSpiritStatus","value":true}]},
            {"type":"smartDebuff","name":"Imperil","targetCount":3,"bottomUp":false,"tailSkip":0,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Imperiled"],"offset":[0,0],"matched":[1,1]},{"key":"tTypes","value":["Rare","Legendary","Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"smartDebuff","name":"Imperil","targetCount":3,"bottomUp":false,"tailSkip":-1,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Imperiled"],"offset":[0,0],"matched":[1,1]},{"key":"activeBosses","value":[0,0]}]},
            {"type":"skill","name":"Merciful Blow","conditions":[{"key":"tTypes","value":["Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]},{"key":"tEffects","value":[0,9999,"Bleeding Wound"],"offset":[0,0],"matched":[1,1]},{"key":"tHP","value":[0.04,0.22],"offset":[0,0],"matched":[1,1]},{"key":"pOC","value":[4.5,10]}]},
            {"type":"skill","name":"Vital Strike","conditions":[{"key":"tTypes","value":["Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]},{"key":"tEffects","value":[0,9999,"Stunned"],"offset":[0,0],"matched":[1,1]},{"key":"tHP","value":[0.05,1],"offset":[0,0],"matched":[1,1]},{"key":"pOC","value":[2.5,10]}]},
            {"type":"normalAttack"}
        ]
    },
    "OneHanded_Tower": {
        "supports": [
            {"type":"item","name":"Spirit Gem","conditions":[{"key":"pSP","value":[0,0.9]}]},
            {"type":"item","name":"Spirit Potion","conditions":[{"key":"pSP","value":[0,0.6]}]},
            {"type":"item","name":"Last Elixir","conditions":[{"key":"pSP","value":[0,0.6]}]},
            {"type":"item","name":"Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.6]}]},
            {"type":"stop","customMessage":"Can't use Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.6]}]},
            {"type":"item","name":"Health Gem","conditions":[]},
            {"type":"spellSupport","name":"Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Potion","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"spellSupport","name":"Full-Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"stop","customMessage":"Can't use Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Gem","conditions":[{"key":"pMP","value":[0,0.8]}]},
            {"type":"item","name":"Mana Potion","conditions":[{"key":"pMP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"stop","customMessage":"Can't use Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"item","name":"Mystic Gem","conditions":[{"key":"pIgnoredEffects","value":[0,9999,"Channeling"]}]},
            {"type":"spellSupport","name":"Heartseeker","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,100,"Heartseeker"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,50,"Regen"]}]},
            {"type":"toggle","name":"Spirit","toggled":true,"conditions":[{"key":"pOC","value":[6,10]},{"key":"defeatedMonsters","value":[1,10]}]},
            {"type":"spellSupport","name":"Heartseeker","conditions":[{"key":"pEffects","value":[-1,0,"Heartseeker"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[-1,0,"Regen"]}]},
            {"type":"item","name":"Health Draught","conditions":[{"key":"pEffects","value":[-1,0,"Regeneration"]},{"key":"monsters","value":[4,10]}]},
            {"type":"item","name":"Mana Draught","conditions":[{"key":"pEffects","value":[-1,0,"Replenishment"]},{"key":"pMP","value":[0,0.85]}]},
            {"type":"item","name":"Spirit Draught","conditions":[{"key":"pEffects","value":[-1,0,"Refreshment"]},{"key":"pSP","value":[0,0.9]}]}
        ],
        "attacks": [
            {"type":"smartDebuff","targetCount":3,"name":"Sleep","bottomUp":true,"tailSkip":1,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Asleep"],"offset":[0,0],"matched":[1,1]},{"key":"roundCurrent","value":[0,9999]},{"key":"floor","value":[36,9999]}]},
            {"type":"smartDebuff","targetCount":3,"name":"Weaken","bottomUp":false,"tailSkip":0,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Weakened","Asleep"],"offset":[0,0],"matched":[1,1]},{"key":"roundCurrent","value":[10,9999]},{"key":"floor","value":[40,9999]}]},
            {"type":"smartDebuff","targetCount":3,"name":"Silence","bottomUp":true,"tailSkip":0,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Asleep","Silenced"],"offset":[0,0],"matched":[1,1]},{"key":"roundCurrent","value":[15,9999]},{"key":"floor","value":[40,9999]}]},
            {"type":"smartDebuff","targetCount":3,"name":"Imperil","bottomUp":false,"tailSkip":-1,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Imperiled"],"offset":[0,0],"matched":[1,1]},{"key":"roundCurrent","value":[0,9999]},{"key":"floor","value":[40,9999]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[]},
            {"type":"toggle","name":"Spirit","toggled":true,"conditions":[{"key":"pOC","value":[6,10]}]},
            {"type":"skill","name":"Merciful Blow","conditions":[{"key":"tEffects","value":[0,9999,"Bleeding Wound"],"offset":[0,0],"matched":[1,1]},{"key":"tHP","value":[0.04,0.22],"offset":[0,0],"matched":[1,1]},{"key":"pOC","value":[4.5,10]},{"key":"roundCurrent","value":[0,9999]},{"key":"floor","value":[95,9999]}]},
            {"type":"skill","name":"Vital Strike","conditions":[{"key":"tEffects","value":[0,9999,"Stunned"],"offset":[0,0],"matched":[1,1]},{"key":"tHP","value":[0.05,1],"offset":[0,0],"matched":[1,1]},{"key":"pOC","value":[2.5,10]},{"key":"pSpiritStatus","value":true},{"key":"roundCurrent","value":[0,9999]},{"key":"floor","value":[60,9999]}]},
            {"type":"normalAttack"}
        ]
    },
    "1H_Mage_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "TwoHanded_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "2H_Mage_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "DualWielding_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "DW_Mage_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "NitenIchiryu_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "NI_Mage_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
    "Staff_General": {
        "supports": [
            {"type":"item","name":"Spirit Gem","conditions":[{"key":"pSP","value":[0,0.9]}]},
            {"type":"item","name":"Spirit Potion","conditions":[{"key":"pSP","value":[0,0.5]}]},
            {"type":"item","name":"Last Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"item","name":"Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"stop","customMessage":"Can't use Spirit Elixir","conditions":[{"key":"pSP","value":[0,0.4]}]},
            {"type":"item","name":"Health Gem","conditions":[]},
            {"type":"spellSupport","name":"Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Potion","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"spellSupport","name":"Full-Cure","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"stop","customMessage":"Can't use Health Elixir","conditions":[{"key":"pHP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Gem","conditions":[{"key":"pMP","value":[0,0.8]}]},
            {"type":"item","name":"Mana Potion","conditions":[{"key":"pMP","value":[0,0.4]}]},
            {"type":"item","name":"Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"stop","customMessage":"Can't use Mana Elixir","conditions":[{"key":"pMP","value":[0,0.1]}]},
            {"type":"item","name":"Mystic Gem","conditions":[{"key":"pIgnoredEffects","value":[0,9999,"Channeling"]}]},
            {"type":"spellSupport","name":"Arcane Focus","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,100,"Arcane Focus"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[0,9999,"Channeling"]},{"key":"pEffects","value":[-1,50,"Regen"]}]},
            {"type":"spellSupport","name":"Arcane Focus","conditions":[{"key":"pEffects","value":[-1,0,"Arcane Focus"]}]},
            {"type":"spellSupport","name":"Regen","conditions":[{"key":"pEffects","value":[-1,0,"Regen"]}]},
            {"type":"item","name":"Health Draught","conditions":[{"key":"pEffects","value":[-1,0,"Regeneration"]},{"key":"monsters","value":[4,10]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]},
            {"type":"item","name":"Mana Draught","conditions":[{"key":"pEffects","value":[-1,0,"Replenishment"]},{"key":"pMP","value":[0,0.85]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]},
            {"type":"item","name":"Spirit Draught","conditions":[{"key":"pEffects","value":[-1,0,"Refreshment"]},{"key":"pSP","value":[0,0.9]},{"key":"battleTypes","value":["Arena","Colosseum","Battle1000","Tower","Item"]}]}
        ],
        "attacks": [
            {"type":"smartDebuff","targetCount":3,"name":"Weaken","bottomUp":false,"tailSkip":0,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Weakened"],"offset":[0,0],"matched":[1,1]},{"key":"tTypes","value":["Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"smartDebuff","targetCount":3,"name":"Silence","bottomUp":false,"tailSkip":0,"maxAtFirst":10,"minMonstersLeft":10,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Silenced"],"offset":[0,0],"matched":[1,1]},{"key":"tTypes","value":["Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"smartDebuff","targetCount":3,"name":"Imperil","bottomUp":false,"tailSkip":0,"maxAtFirst":3,"minMonstersLeft":5,"conditions":[{"key":"tIgnoredEffects","value":[1,9999,"Imperiled"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tDaysSinceUpdate","value":[46,9999],"offset":[0,0],"matched":[1,1]},{"key":"tIgnoredEffects","value":[0,9999,"Imperiled","Searing Skin","Freezing Limbs","Turbulent Air","Deep Burns","Breached Defense","Blunted Attack"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"skill","name":"Scan","conditions":[{"key":"pActionCounts","value":[0,0,"Scan"]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tName","value":"Yggdrasil","offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tEffects","value":[0,9999,"Imperiled","Coalesced Mana"],"offset":[0,0],"matched":[1,1]},{"key":"tTypes","value":["Rare","Legendary","Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tEffects","value":[0,9999,"Coalesced Mana"],"offset":[0,0],"matched":[1,1]},{"key":"tTypes","value":["Rare","Legendary","Ultimate","Arena300","Arena400","Arena500"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tEffects","value":[0,9999,"Imperiled","Coalesced Mana"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[{"key":"tEffects","value":[0,9999,"Imperiled"],"offset":[0,0],"matched":[1,1]}]},
            {"type":"target","priorityRule":"Top Down","conditions":[]},
            {"type":"spellDamage","name":"T3","conditions":[{"key":"activeMonsters","value":[2,10]}]},
            {"type":"spellDamage","name":"T2","conditions":[{"key":"activeMonsters","value":[2,10]}]},
            {"type":"spellDamage","name":"T1","conditions":[{"key":"activeMonsters","value":[2,10]}]},
            {"type":"spellDamage","name":"T3","conditions":[{"key":"pMP","value":[0.2,1]}]},
            {"type":"spellDamage","name":"T2","conditions":[{"key":"pMP","value":[0.2,1]}]},
            {"type":"spellDamage","name":"T1","conditions":[{"key":"pMP","value":[0.2,1]}]},
            {"type":"normalAttack"}
        ]
    },
    "Unarmed_General": {
        "supports": [

        ],
        "attacks": [

        ]
    },
};
let cfgStats = {};
let defaultCfgStats = {
    "statsVersion": 20260109,
    "darkMode": false,
    "combatRows": [
        {"id":"fire"},
        {"id":"cold"},
        {"id":"wind"},
        {"id":"elec"},
        {"id":"holy"},
        {"id":"dark"},
        {"id":"crushing","s_pt":"background-color: var(--jpx-danger-soft);"},
        {"id":"slashing","s_pt":"background-color: var(--jpx-danger-soft);"},
        {"id":"piercing","s_pt":"background-color: var(--jpx-danger-soft);"},
        {"id":"void"},
        {"id":"damagePlus"},
        {"id":"damageTotal"},
        {"id":"glance","s_pt":"background-color: var(--jpx-warning-soft);"},
        {"id":"hit","s_pt":"background-color: var(--jpx-warning-soft);"},
        {"id":"crit","s_pt":"background-color: var(--jpx-warning-soft);"},
        {"id":"miss","s_pt":"background-color: var(--jpx-success-soft);"},
        {"id":"evade","s_pt":"background-color: var(--jpx-success-soft);"},
        {"id":"parry","s_pt":"background-color: var(--jpx-success-soft);"},
        {"id":"resist","s_md":"background-color: var(--jpx-info-soft);"},
        {"id":"block","s_pt":"background-color: var(--jpx-success-soft);"},
        {"id":"resultTotal"},
        {"id":"resist50","s_md":"background-color: var(--jpx-info-soft);"},
        {"id":"resist75","s_md":"background-color: var(--jpx-info-soft);"},
        {"id":"resist90","s_md":"background-color: var(--jpx-info-soft);"},
        {"id":"parryPartially","s_pt":"background-color: var(--jpx-success-soft);"},
        {"id":"resistPartially","s_md":"background-color: var(--jpx-info-soft);"},
        {"id":"blockPartially","s_pt":"background-color: var(--jpx-success-soft);"}
    ],
    "revenueRows": [
        {"id":"exp"},
        {"id":"proficiency"},
        {"id":"credit","styleText":"color: var(--jpx-warning);"},
        {"id":"equipment","styleText":"color: var(--jpx-danger);"},
        {"id":"material","styleText":"color: var(--jpx-danger);"},
        {"id":"consumable","styleText":"color: var(--jpx-success);"},
        {"id":"token","styleText":"color: var(--jpx-success);"},
        {"id":"food","styleText":"color: var(--jpx-accent);"},
        {"id":"figurine","styleText":"color: var(--jpx-accent);"},
        {"id":"artifact","styleText":"color: var(--jpx-accent);"},
        {"id":"trophy","styleText":"color: var(--jpx-warning);"},
        {"id":"crystal","styleText":"color: var(--jpx-accent);"},
        {"id":"crystalTotal","styleText":"color: var(--jpx-accent);"},
        {"id":"totalProfit"},
        {"id":"stamina"},
        {"id":"finalProfit"}
    ],
    "statsColumns": [
        {"id":"date"},
        {"id":"round"},
        {"id":"deltaTime"},
        {"id":"turns"},
        {"id":"riddle"},
        {"id":"tps"},
        {"id":"finalProfit"},
        {"id":"credit"},
        {"id":"eqP"},
        {"id":"eqL"},
        {"id":"eqM"},
        {"id":"cha"},
        {"id":"blo"},
        {"id":"food"},
        {"id":"fig"},
        {"id":"arti"},
        {"id":"crys"},
        {"id":"t2"},
        {"id":"t36"},
        {"id":"lCharm"},
        {"id":"gCharm"},
        {"id":"seed"},
        {"id":"hd"},
        {"id":"md"},
        {"id":"sd"},
        {"id":"hp"},
        {"id":"mp"},
        {"id":"sp"},
        {"id":"he"},
        {"id":"me"},
        {"id":"se"},
        {"id":"le"},
        {"id":"swif"},
        {"id":"prot"},
        {"id":"avat"},
        {"id":"abso"},
        {"id":"shad"},
        {"id":"life"},
        {"id":"gods"},
        {"id":"staminaCost"},
        {"id":"totalProfit"}
    ]
};
let cfg = {
    //CSS
    styleText: `
        :root {
            --jpx-font-ui: Arial, Helvetica, "Microsoft YaHei", sans-serif;
            --jpx-bg-soft: #e8e3d1;
            --jpx-bg-panel: #f5f0df;
            --jpx-bg-elevated: #fffaf0;
            --jpx-border-subtle: #b9ab8d;
            --jpx-border-strong: #7f6a45;
            --jpx-text-primary: #2b2116;
            --jpx-text-muted: #5f4d34;
            --jpx-text-on-dark: #fffaf0;
            --jpx-accent: #5a1b1b;
            --jpx-accent-soft: #e3d6ba;
            --jpx-success: #38733f;
            --jpx-success-soft: #e4efdc;
            --jpx-warning: #ba8300;
            --jpx-warning-soft: #efe2bd;
            --jpx-danger: #b84e4e;
            --jpx-danger-soft: #ead0c8;
            --jpx-info-soft: #eadcc5;
            --jpx-widget-bg: #f5f0df;
            --jpx-widget-border: #7f6a45;
            --jpx-widget-divider: #b9ab8d;
            --jpx-widget-text: #2b2116;
            --jpx-widget-muted: #5f4d34;
            --jpx-widget-hover-bg: #fffaf0;
            --jpx-widget-hover-border: #5a1b1b;
            --jpx-widget-btn-bg: #e8e3d1;
            --jpx-widget-btn-hover-bg: #fffaf0;
            --jpx-overlay: #101010;
            --jpx-duration-critical: #8de2ce;
            --jpx-duration-low: #d8d7ff;
            --jpx-status-active: #38733f;
            --jpx-status-idle: #7f6a45;
            --jpx-status-warn: #ba8300;
            --jpx-scroll-track: #ded5bd;
            --jpx-scroll-thumb: #9a8866;
            --jpx-scroll-thumb-hover: #7f6a45;
        }

        .dark-mode {
            --jpx-bg-soft: #151515;
            --jpx-bg-panel: #202020;
            --jpx-bg-elevated: #2a2a2a;
            --jpx-border-subtle: #555;
            --jpx-border-strong: #888;
            --jpx-text-primary: #e8e0cd;
            --jpx-text-muted: #c3bda9;
            --jpx-text-on-dark: #f5f0df;
            --jpx-accent: #c89956;
            --jpx-accent-soft: #332a1c;
            --jpx-success: #80c996;
            --jpx-success-soft: #263a2b;
            --jpx-warning: #e2b85e;
            --jpx-warning-soft: #44361f;
            --jpx-danger: #dd8787;
            --jpx-danger-soft: #442828;
            --jpx-info-soft: #2f2a20;
            --jpx-widget-bg: #202020;
            --jpx-widget-border: #777;
            --jpx-widget-divider: #555;
            --jpx-widget-text: #e8e0cd;
            --jpx-widget-muted: #c3bda9;
            --jpx-widget-hover-bg: #2a2a2a;
            --jpx-widget-hover-border: #c89956;
            --jpx-widget-btn-bg: #151515;
            --jpx-widget-btn-hover-bg: #2a2a2a;
            --jpx-overlay: #050505;
            --jpx-duration-critical: #4ba492;
            --jpx-duration-low: #6d77b9;
            --jpx-status-active: #539166;
            --jpx-status-idle: #666;
            --jpx-status-warn: #ae8439;
            --jpx-scroll-track: #252525;
            --jpx-scroll-thumb: #666;
            --jpx-scroll-thumb-hover: #888;
        }

        #settings-container,
        #settings-container *,
        #btcp {
            scrollbar-width: thin;
            scrollbar-color: var(--jpx-scroll-thumb) var(--jpx-scroll-track);
        }

        #settings-container::-webkit-scrollbar,
        #settings-container *::-webkit-scrollbar,
        #btcp::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        #settings-container::-webkit-scrollbar-track,
        #settings-container *::-webkit-scrollbar-track,
        #btcp::-webkit-scrollbar-track {
            background: var(--jpx-scroll-track);
            border-radius: 0;
        }

        #settings-container::-webkit-scrollbar-thumb,
        #settings-container *::-webkit-scrollbar-thumb,
        #btcp::-webkit-scrollbar-thumb {
            background: var(--jpx-scroll-thumb);
            border-radius: 0;
        }

        #settings-container::-webkit-scrollbar-thumb:hover,
        #settings-container *::-webkit-scrollbar-thumb:hover,
        #btcp::-webkit-scrollbar-thumb:hover {
            background: var(--jpx-scroll-thumb-hover);
        }

        #ctrl-widget {
            position: fixed;
            right: 18px;
            bottom: 18px;
            width: 190px;
            max-width: calc(100vw - 16px);
            height: auto;
            z-index: 100;
            cursor: default;
            user-select: none;
            color: var(--jpx-widget-text);
            font-size: 12px;
            font-family: var(--jpx-font-ui);
            line-height: 1.42;
            text-align: center;
            padding: 5px;
            border: 1px solid var(--jpx-widget-border);
            border-radius: 0;
            background: var(--jpx-widget-bg);
            overflow: hidden;
        }

        #ctrl-widget:hover {
            background: var(--jpx-widget-hover-bg);
            border-color: var(--jpx-widget-hover-border);
        }

        #ctrl-widget .jpx-widget-header {
            position: relative;
            overflow: hidden;
            margin: 0 0 5px;
            padding: 4px 6px;
            border: 1px solid var(--jpx-widget-divider);
            border-radius: 0;
            color: var(--jpx-widget-muted);
            font-size: 12px;
            background: var(--jpx-widget-btn-bg);
            cursor: move;
            touch-action: none;
        }

        #ctrl-widget .jpx-widget-info {
            display: grid;
            gap: 2px;
            text-align: left;
        }

        #ctrl-widget .jpx-widget-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 6px;
            padding: 1px 2px;
            border-bottom: 1px dotted var(--jpx-widget-divider);
        }

        #ctrl-widget .jpx-widget-key {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--jpx-widget-muted);
            font-size: 11px;
        }

        #ctrl-widget .jpx-widget-value {
            min-width: 0;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            color: var(--jpx-widget-text);
            font-weight: 700;
        }

        #ctrl-widget .jpx-widget-actions {
            margin-top: 5px;
            border-top: 1px solid var(--jpx-widget-divider);
            padding-top: 5px;
            display: grid;
            gap: 3px;
        }

        #ctrl-widget .jpx-widget-btn {
            border: 1px solid var(--jpx-widget-divider);
            border-radius: 0;
            background: var(--jpx-widget-btn-bg);
            color: var(--jpx-widget-text);
            font-size: 12px;
            line-height: 1.25;
            font-weight: 700;
            padding: 3px 6px;
            cursor: pointer;
        }

        #ctrl-widget .jpx-widget-btn:hover {
            background: var(--jpx-widget-btn-hover-bg);
            border-color: var(--jpx-widget-hover-border);
        }

        #ctrl-widget .jpx-widget-toggle.is-active {
            border-color: var(--jpx-widget-hover-border);
            background: var(--jpx-status-active);
        }

        #ctrl-widget .jpx-widget-settings {
            font-size: 12px;
        }

        #jpx-settings-launcher {
            position: fixed;
            right: 18px;
            bottom: 18px;
            z-index: 99;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px;
            border: 1px solid var(--jpx-widget-border);
            border-radius: 0;
            background: var(--jpx-widget-bg);
            user-select: none;
            touch-action: none;
        }

        #jpx-settings-launcher.is-collapsed .jpx-settings-open {
            display: none;
        }

        #jpx-settings-launcher .jpx-settings-open,
        #jpx-settings-launcher .jpx-settings-toggle {
            border: 1px solid var(--jpx-widget-divider, var(--jpx-widget-border));
            border-radius: 0;
            background: var(--jpx-widget-btn-bg);
            color: var(--jpx-widget-text);
            font-size: 12px;
            line-height: 1.25;
            font-weight: 600;
            min-height: 24px;
            padding: 2px 8px;
            cursor: pointer;
        }

        #jpx-settings-launcher .jpx-settings-open:hover,
        #jpx-settings-launcher .jpx-settings-toggle:hover {
            background: var(--jpx-widget-btn-hover-bg);
            border-color: var(--jpx-widget-hover-border);
        }

        #jpx-settings-launcher .jpx-settings-toggle {
            width: 24px;
            min-width: 24px;
            padding: 0;
            cursor: grab;
        }

        #jpx-settings-launcher.is-dragging .jpx-settings-toggle {
            cursor: grabbing;
        }

        #proficiency-record {
            position: absolute;
            top: 752px;
            left: 50px;
            white-space: nowrap;
            text-align: left;
        }

        @media (min-width: 600px) and (orientation:landscape) {
            #proficiency-record { top: 50px; left: 1240px; }
        }

        #battle_right {
            position: absolute;
            top: 42px;
            left: 681px;
            width: 364px;
            overflow: visible;

            .btm6 {
                min-width: 200px;
            }
        }

        .effect-duration {
            display: inline-block;
            width: 24px;
            margin-right: -24px;
            position: relative;
            text-align: center;
            z-index: 2;

            div {
                display: inline-block;
                min-width: 18px;
                padding: 1px 5px;
                border-radius: 0;
                background: var(--jpx-overlay);
                color: var(--jpx-text-on-dark);
                font-size: 10px;
                letter-spacing: 0.1px;
                font-weight: bold;
                border: 1px solid #fffaf0;
            }
        }

        .cooldown {
            position: absolute;
            inset: 0;
            z-index: 3;
            color: var(--jpx-text-on-dark);
            font-size: 18px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--jpx-overlay);
            border-radius: 0;
            pointer-events: none;
        }

        .monster-hp {
            position: absolute;
            top: 2px;
            right: 6px;
            left: auto;
            bottom: auto;
            color: var(--jpx-text-on-dark);
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            padding: 1px 6px;
            border-radius: 0;
            background: #101010;
            pointer-events: none;
        }

        #time-records-div { text-align: center; white-space: pre; }

        .records-table {
            border-top: 1px solid;
            border-bottom: 1px solid;
            border-collapse: collapse;
            background-color: #fff;

            & tr:nth-child(1) > td, & tr:nth-child(2) > td {
                text-align: center;
            }
            & tr:not(:nth-child(1), :nth-child(2)) > td:nth-child(1) { text-align: left; }
            & td {
                min-width: 40px;
                padding: 2px 4px;
                border-left: 1px solid;
                border-right: 1px solid;
                text-align: right;
            }
        }

        #time-records-div.dark-mode,
        #combat-records-use-table.dark-mode,
        #combat-records-table.dark-mode,
        #revenue-records-table.dark-mode {
            color: #eee;
            background-color: #121212;
            border-color: #555;
        }

        #combat-records-table { margin: 10px 0px; }
        #combat-records-table tr:nth-child(1) > td:not(:nth-child(1)),
        #combat-records-table tr:nth-child(2) > td {
            border-bottom: 1px solid;
        }

        #combat-records-use-table {
            border-collapse: collapse;
            background-color: #fff;

            & th, & td {
                border: 1px solid;
                min-width: 40px;
                padding: 2px 4px;
            }
            & th { text-align: center; }
            & td { text-align: left; }
        }

        #revenue-records-table { margin: 10px auto; }
        #revenue-records-table .surplus { color: #000 !important; background-color: #a5f779 !important; }
        #revenue-records-table .deficit { color: #000 !important; background-color: #ff6a6a !important; }
        #revenue-records-table .noData { color: #000 !important; background-color: #a796fa !important; }
        #revenue-records-table.dark-mode .surplus { color: #eee !important; background-color: #226709 !important; }
        #revenue-records-table.dark-mode .deficit { color: #eee !important; background-color: #7c1010 !important; }
        #revenue-records-table.dark-mode .noData { color: #eee !important; background-color: #433483 !important; }

        #settings-overlay {
            position: fixed;
            inset: 0;
            z-index: 1200;
            background: transparent;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px;
            box-sizing: border-box;
        }

        #settings-container {
            --jpx-bg: var(--jpx-bg-soft);
            --jpx-panel: var(--jpx-bg-panel);
            --jpx-border: var(--jpx-border-subtle);
            --jpx-text: var(--jpx-text-primary);
            --jpx-muted: var(--jpx-text-muted);
            width: min(1040px, 96vw);
            height: min(86vh, 780px);
            border-radius: 0;
            border: 2px solid var(--jpx-border-strong);
            background: var(--jpx-bg);
            color: var(--jpx-text);
            font-size: 12px;
            line-height: 1.35;
            font-family: var(--jpx-font-ui);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            text-align: left;
            position: relative;
        }

        #settings-container .settings-header {
            border-bottom: 1px solid var(--jpx-border);
            padding: 7px 10px;
            background: var(--jpx-panel);
            text-align: left;
            position: sticky;
            top: 0;
            z-index: 4;
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 8px;
        }

        #settings-container .settings-header-main {
            min-width: 0;
        }

        #settings-container .settings-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 4px;
        }

        #settings-container .settings-chip {
            display: inline-flex;
            align-items: center;
            min-height: 18px;
            padding: 1px 5px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-bg);
            color: var(--jpx-muted);
            font-size: 11px;
            font-weight: 700;
            line-height: 1.2;
        }

        #settings-container .settings-header-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 6px;
        }

        #settings-container .settings-theme-toggle {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            min-height: 24px;
            padding: 2px 6px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-bg);
            color: var(--jpx-text);
            cursor: pointer;
            user-select: none;
        }

        #settings-container .settings-theme-text {
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
        }

        #settings-container .settings-title {
            margin: 0;
            font-size: 15px;
            font-weight: 700;
        }

        #settings-container .settings-subtitle {
            margin: 2px 0 0;
            font-size: 11px;
            color: var(--jpx-muted);
        }

        #settings-container .settings-main {
            flex: 1;
            min-height: 0;
            display: flex;
            align-items: stretch;
            overflow: hidden;
        }

        #settings-container .settings-sidebar {
            width: 142px;
            min-width: 142px;
            border-right: 1px solid var(--jpx-border);
            background: var(--jpx-panel);
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        #settings-container .settings-nav-title {
            font-size: 11px;
            color: var(--jpx-muted);
            font-weight: 700;
            letter-spacing: 0;
            padding-left: 0;
        }

        #settings-container .settings-tabs {
            margin-top: 0;
            display: flex;
            flex-direction: column;
            gap: 0;
            background: var(--jpx-panel);
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 0;
        }

        #settings-container .settings-tab-btn {
            border: 0;
            border-bottom: 1px solid var(--jpx-border);
            background: var(--jpx-panel);
            color: var(--jpx-muted);
            border-radius: 0;
            padding: 7px 8px;
            font-weight: 700;
            width: 100%;
            text-align: left;
        }

        #settings-container .settings-tab-btn:hover:not(:disabled) {
            background: var(--jpx-accent-soft);
            color: var(--jpx-text);
            border-color: var(--jpx-border);
        }

        #settings-container .settings-tab-btn.is-active {
            color: var(--jpx-text-on-dark);
            background: var(--jpx-accent);
            border-color: var(--jpx-border-strong);
        }

        #settings-container .settings-tab-btn.is-active:hover:not(:disabled) {
            color: var(--jpx-text-on-dark);
            background: var(--jpx-accent);
            border-color: var(--jpx-accent);
        }

        #settings-container .settings-content {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            background: var(--jpx-bg);
        }

        #settings-container .settings-body {
            flex: 1;
            overflow: auto;
            padding: 8px;
            background: var(--jpx-bg);
            text-align: left;
            min-height: 0;
        }

        #settings-container .settings-panel {
            display: none;
            min-height: 100%;
            width: 100%;
            margin: 0 auto;
            padding-bottom: 4px;
        }

        #settings-container .settings-footer {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
            justify-content: flex-end;
            border-top: 1px solid var(--jpx-border);
            padding: 7px 10px;
            background: var(--jpx-panel);
            position: sticky;
            bottom: 0;
            z-index: 4;
        }

        #settings-container .settings-sub-actions {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }

        #settings-container button:not(.settings-tab-btn) {
            appearance: none;
            border: 1px solid var(--jpx-border);
            background: var(--jpx-panel);
            color: var(--jpx-text);
            border-radius: 0;
            padding: 3px 8px;
            min-height: 24px;
            font-weight: 700;
            cursor: pointer;
        }

        #settings-container button:not(.settings-tab-btn):hover:not(:disabled) {
            border-color: var(--jpx-accent);
            background: var(--jpx-accent-soft);
        }

        #settings-container button:not(.settings-tab-btn):disabled {
            color: var(--jpx-muted);
            background: var(--jpx-bg);
            cursor: not-allowed;
        }

        #settings-container #save-button {
            background: var(--jpx-accent);
            color: var(--jpx-text-on-dark);
            border-color: var(--jpx-accent);
        }

        #settings-container #save-button:hover:not(:disabled) {
            background: var(--jpx-accent);
            border-color: var(--jpx-border-strong);
        }

        #settings-container button.jpx-btn-primary {
            background: var(--jpx-accent);
            color: var(--jpx-text-on-dark);
            border-color: var(--jpx-accent);
        }

        #settings-container button.jpx-btn-primary:hover:not(:disabled) {
            background: var(--jpx-accent);
            border-color: var(--jpx-border-strong);
        }

        #settings-container #close-button {
            border-color: var(--jpx-border);
            color: var(--jpx-text);
            background: var(--jpx-panel);
        }

        #settings-container #close-button:hover:not(:disabled) {
            background: var(--jpx-accent-soft);
            border-color: var(--jpx-border);
            color: var(--jpx-text);
        }

        #settings-container button.jpx-btn-danger {
            border-color: var(--jpx-danger);
            color: var(--jpx-danger);
            background: var(--jpx-panel);
        }

        #settings-container button.jpx-btn-danger:hover:not(:disabled) {
            border-color: var(--jpx-danger);
            color: var(--jpx-danger);
            background: var(--jpx-danger-soft);
        }

        #settings-container .field-block {
            border: 0;
            border-radius: 0;
            padding: 3px 4px;
            margin-bottom: 0;
        }

        #settings-container .settings-group {
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 6px;
            margin-bottom: 8px;
            background: var(--jpx-panel);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 5px 12px;
        }

        #settings-container .settings-group-title {
            font-weight: 700;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-accent-soft);
            color: var(--jpx-text);
            padding: 4px 6px;
            margin: 0 0 4px;
            grid-column: 1 / -1;
        }

        #settings-container .settings-group > .field-block {
            border: 0;
            border-radius: 0;
            padding: 2px 3px;
            margin-bottom: 0;
            min-width: 0;
        }

        #settings-container .field-block-wide {
            grid-column: 1 / -1;
        }

        #settings-container .field-block > label,
        #settings-container .field-block > div > label {
            display: inline-flex;
            align-items: center;
            margin-right: 8px;
        }

        #settings-container .heading {
            font-weight: 700;
            margin: 2px 0 5px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-bg);
            padding: 4px 6px;
            color: var(--jpx-text);
            text-align: left;
        }

        #settings-container label {
            color: var(--jpx-text);
            font-weight: 600;
        }

        #settings-container input[type="text"],
        #settings-container input[type="number"],
        #settings-container select,
        #settings-container textarea {
            border: 1px solid var(--jpx-border);
            background: var(--jpx-panel) !important;
            color: var(--jpx-text) !important;
            border-radius: 0;
            min-height: 22px;
            padding: 2px 5px;
            box-sizing: border-box;
            max-width: 100%;
            font: 12px/18px var(--jpx-font-ui);
            vertical-align: middle;
        }

        #settings-container input[type="text"],
        #settings-container select:not([multiple]) {
            width: min(100%, 360px);
            height: 24px;
        }

        #settings-container input[type="number"] {
            width: 72px;
            height: 24px;
            text-align: right;
        }

        #settings-container .jpx-input-wide {
            width: min(100%, 560px) !important;
        }

        #settings-container .jpx-range-field {
            display: inline-flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 4px;
            margin-right: 8px;
        }

        #settings-container .jpx-range-input {
            width: 68px;
        }

        #settings-container .jpx-range-separator {
            color: var(--jpx-muted);
            font-weight: 600;
        }

        #settings-container textarea {
            width: min(100%, 680px);
            min-height: 88px;
            resize: vertical;
        }

        #settings-container input::placeholder,
        #settings-container textarea::placeholder {
            color: var(--jpx-muted);
        }

        #settings-container input[readonly] {
            background: var(--jpx-bg) !important;
            cursor: pointer;
        }

        #settings-container select,
        #settings-container select option {
            background-color: var(--jpx-panel) !important;
            color: var(--jpx-text) !important;
        }

        #settings-container select:not([multiple]) {
            padding-right: 5px;
        }

        #settings-container .jpx-select-host {
            position: relative;
            display: inline-block;
            width: auto;
            max-width: 100%;
            vertical-align: middle;
        }

        #settings-container .jpx-select-source {
            display: none !important;
        }

        #settings-container .jpx-select-trigger {
            position: relative;
            width: 100%;
            height: 24px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            color: var(--jpx-text);
            box-sizing: border-box;
            padding: 2px 22px 2px 5px;
            font: 12px/18px var(--jpx-font-ui);
            text-align: left;
            cursor: pointer;
        }

        #settings-container .jpx-select-trigger::after {
            content: "▾";
            position: absolute;
            right: 7px;
            top: 2px;
            color: var(--jpx-text);
        }

        #settings-container .jpx-select-trigger:focus {
            outline: 1px solid var(--jpx-accent);
            border-color: var(--jpx-accent);
        }

        #settings-container .jpx-select-window {
            display: none;
            position: absolute;
            z-index: 160;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            box-sizing: border-box;
            padding: 6px;
        }

        #settings-container .jpx-select-window-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            border-bottom: 1px solid var(--jpx-border);
            padding: 0 0 5px;
            margin-bottom: 6px;
            color: var(--jpx-text);
            font-weight: 700;
        }

        #settings-container .jpx-select-options {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-items: flex-start;
        }

        #settings-container .jpx-select-option {
            display: inline-block;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            color: var(--jpx-text);
            padding: 3px 7px;
            font: 12px/18px var(--jpx-font-ui);
            text-align: center;
            white-space: nowrap;
            cursor: pointer;
        }

        #settings-container .jpx-select-option:hover,
        #settings-container .jpx-select-option.is-selected {
            background: var(--jpx-accent-soft);
            color: var(--jpx-text-primary);
        }
        #settings-container select[multiple] {
            background: var(--jpx-bg) !important;
            border-color: var(--jpx-border);
            padding: 2px;
        }

        #settings-container select[multiple] option {
            border-radius: 0;
            padding: 2px 4px;
            min-height: 20px;
            line-height: 1.3;
        }

        #settings-container select[multiple] option:checked {
            background: var(--jpx-accent-soft) !important;
            color: var(--jpx-text-primary) !important;
        }

        #settings-container select[multiple] option:hover {
            background: var(--jpx-accent-soft) !important;
            color: var(--jpx-text-primary) !important;
        }

        #settings-container input:focus,
        #settings-container select:focus,
        #settings-container textarea:focus {
            outline: 1px solid var(--jpx-accent);
            border-color: var(--jpx-accent);
        }

        #settings-container .keybinds-section {
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            padding: 6px;
            margin-bottom: 6px;
            display: grid;
            gap: 4px;
        }

        #settings-container .keybind-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 4px 6px;
            background: var(--jpx-bg);
        }

        #settings-container .keybind-label {
            color: var(--jpx-muted);
            font-weight: 600;
        }

        #settings-container .array-row:not(.array-row .array-row) {
            border: 1px solid var(--jpx-border);
            background: var(--jpx-bg-elevated);
            border-radius: 0;
            padding: 5px;
            margin: 5px 0;
            position: relative;
        }

        #settings-container .array-row:not(.array-row .array-row):hover {
            border-color: var(--jpx-accent);
            background: var(--jpx-accent-soft);
        }

        #settings-container .dynamic-array-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px 7px;
            margin-bottom: 5px;
        }

        #settings-container .conditions-list {
            display: grid;
            gap: 4px;
            margin: 4px 0 5px;
            justify-items: start;
        }

        #settings-container .condition-row {
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-bg);
            padding: 4px;
            margin: 0;
            gap: 4px 6px;
            width: fit-content;
            max-width: 100%;
            box-sizing: border-box;
            align-items: flex-start;
        }

        #settings-container .condition-index {
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            color: var(--jpx-muted);
            padding: 2px 5px;
            font-weight: 700;
            line-height: 18px;
        }

        #settings-container .condition-value,
        #settings-container .condition-extra {
            display: inline-flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 4px 6px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            padding: 3px 5px;
            min-height: 22px;
            box-sizing: border-box;
        }

        #settings-container .condition-extra:empty {
            display: none;
        }

        #settings-container .condition-value.is-wide {
            max-width: 100%;
        }

        #settings-container .condition-extra-field {
            display: inline-block;
        }

        #settings-container .condition-row > button {
            align-self: flex-start;
        }

        #settings-container .multiSelect-popup-panel {
            display: none;
            position: absolute;
            z-index: 100;
            box-sizing: border-box;
            width: max-content;
            max-width: min(620px, calc(100vw - 32px));
            overflow: visible;
            background: var(--jpx-panel) !important;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 3px;
            flex-wrap: wrap;
            gap: 3px;
            align-items: flex-start;
        }

        #settings-container .multiSelect-summary {
            width: auto;
            min-width: 10ch;
            max-width: min(46ch, 100%);
            cursor: pointer;
        }

        #settings-container button.multiSelect-option {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-bg);
            color: var(--jpx-text);
            padding: 1px 6px;
            min-height: 20px;
            box-sizing: border-box;
            white-space: nowrap;
            cursor: pointer;
            font: 12px/17px var(--jpx-font-ui);
            font-weight: 700;
        }

        #settings-container button.multiSelect-option:hover:not(:disabled) {
            border-color: var(--jpx-border-strong);
            background: var(--jpx-accent-soft);
        }

        #settings-container button.multiSelect-option.is-checked {
            border-color: var(--jpx-border-strong);
            background: var(--jpx-accent);
            color: var(--jpx-text-on-dark);
        }

        #settings-container button.multiSelect-option.is-checked:hover:not(:disabled) {
            background: var(--jpx-accent);
            color: var(--jpx-text-on-dark);
        }

        #settings-container .field-picker-select {
            width: 210px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 4px;
            background: var(--jpx-bg) !important;
            color: var(--jpx-text) !important;
        }

        #settings-container .object-item {
            margin-bottom: 6px;
        }

        #settings-container .rule-workbench {
            display: grid;
            gap: 6px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            background: var(--jpx-panel);
            padding: 6px;
        }

        #settings-container .rule-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            align-items: center;
        }

        #settings-container .rule-toolbar input[type="text"] {
            width: min(360px, 100%);
        }

        #settings-container .rule-toolbar select {
            min-width: 200px;
        }

        #settings-container .rule-toolbar-meta {
            margin-left: auto;
            color: var(--jpx-muted);
            font-weight: 600;
            font-size: 12px;
        }

        #settings-container .rule-list {
            display: grid;
            gap: 5px;
            max-height: 52vh;
            overflow: auto;
            padding-right: 2px;
        }

        #settings-container .rule-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            border: 1px solid var(--jpx-border);
            border-radius: 0;
            padding: 5px 6px;
            background: var(--jpx-bg);
        }

        #settings-container .rule-item:hover {
            border-color: var(--jpx-border-strong);
            background: var(--jpx-bg-elevated);
        }

        #settings-container .rule-item.is-disabled {
            border-style: solid;
            border-color: var(--jpx-danger);
            border-left: 4px solid var(--jpx-danger);
            background: var(--jpx-danger-soft);
        }

        #settings-container .rule-item.is-disabled .rule-item-title {
            color: var(--jpx-danger);
            text-decoration: line-through;
        }

        #settings-container .rule-item.is-disabled .rule-item-meta {
            color: var(--jpx-danger);
            font-weight: 700;
        }

        #settings-container .rule-item-main {
            min-width: 0;
            flex: 1;
        }

        #settings-container .rule-item-title {
            font-weight: 700;
            color: var(--jpx-text);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #settings-container .rule-item-meta {
            margin-top: 2px;
            color: var(--jpx-muted);
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #settings-container .rule-actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 6px;
            flex: 0 0 auto;
        }

        #settings-container .rule-actions button {
            min-height: 26px;
            padding: 4px 8px;
            font-size: 12px;
        }

        #settings-container .rule-empty {
            border: 1px dashed var(--jpx-border);
            border-radius: 0;
            padding: 10px 8px;
            text-align: center;
            color: var(--jpx-muted);
        }

        #settings-container .rule-editor-overlay {
            position: absolute;
            inset: 0;
            background: transparent;
            backdrop-filter: blur(1px);
            -webkit-backdrop-filter: blur(1px);
            z-index: 12;
            display: flex;
            justify-content: flex-end;
            align-items: stretch;
            padding: 0;
            box-sizing: border-box;
        }

        #settings-container .rule-editor-window {
            width: min(760px, 96%);
            min-width: 0;
            max-width: 760px;
            height: 100%;
            max-height: none;
            background: var(--jpx-panel);
            border: 0;
            border-left: 1px solid var(--jpx-border-strong);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            transform: translateX(100%);
            transition: transform 140ms ease-out;
        }

        #settings-container .rule-editor-overlay.is-open .rule-editor-window {
            transform: translateX(0);
        }

        #settings-container .rule-editor-overlay.is-closing .rule-editor-window {
            transform: translateX(100%);
        }

        #settings-container .rule-editor-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            border-bottom: 1px solid var(--jpx-border);
            padding: 7px 8px;
            background: var(--jpx-bg);
        }

        #settings-container .rule-editor-title {
            font-weight: 700;
        }

        #settings-container .rule-editor-subtitle {
            color: var(--jpx-muted);
            font-size: 12px;
            margin-top: 2px;
        }

        #settings-container .rule-editor-body {
            flex: 1;
            min-height: 0;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 6px;
        }

        #settings-container .rule-editor-body .settings-group {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 4px 8px;
            padding: 5px;
            margin-bottom: 6px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        #settings-container .rule-editor-body .settings-group-title {
            flex: 1 0 100%;
            margin-bottom: 2px;
            padding: 3px 5px;
            box-sizing: border-box;
        }

        #settings-container .rule-editor-body .field-block {
            flex: 0 1 auto;
            padding: 1px 2px;
        }

        #settings-container .rule-editor-body .field-block-wide {
            flex: 1 0 100%;
        }

        #settings-container .switch-row {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 4px;
            cursor: pointer;
            min-height: 22px;
        }

        #settings-container .switch-label {
            font-weight: 700;
            white-space: nowrap;
        }

        #settings-container .switch-control {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: auto;
            height: auto;
            flex: 0 0 auto;
        }

        #settings-container .switch-input {
            position: static;
            width: auto;
            height: auto;
            margin: 0;
            cursor: pointer;
            accent-color: var(--jpx-accent);
        }

        #settings-container .switch-input:focus-visible {
            outline: 1px solid var(--jpx-accent);
        }

        @media (max-width: 900px) {
            #settings-overlay { padding: 10px; }
            #settings-container {
                width: 100%;
                height: 94vh;
                border-radius: 0;
            }
            #settings-container .settings-header {
                grid-template-columns: 1fr;
                padding: 8px;
            }
            #settings-container .settings-header-actions { justify-content: flex-start; }
            #settings-container .settings-main { flex-direction: column; }
            #settings-container .settings-sidebar {
                width: 100%;
                min-width: 0;
                border-right: 0;
                border-bottom: 1px solid var(--jpx-border);
                padding: 6px;
            }
            #settings-container .settings-tabs {
                flex-direction: row;
                flex-wrap: wrap;
            }
            #settings-container .settings-tab-btn {
                width: auto;
                flex: 1 1 auto;
                text-align: center;
            }
            #settings-container .settings-body { padding: 6px; }
            #settings-container .settings-footer { padding: 6px; }
            #settings-container .settings-group { grid-template-columns: 1fr; }
        }

        #toast-container {
            position: fixed;
            right: 16px;
            bottom: 16px;
            display: flex;
            flex-direction: column-reverse;
            gap: 5px;
            z-index: 1300;
            pointer-events: none;
        }

        #toast-container .jpx-toast {
            max-width: min(360px, calc(100vw - 32px));
            padding: 7px 9px;
            border: 1px solid var(--jpx-border-strong);
            border-radius: 0;
            background: var(--jpx-bg-panel);
            color: var(--jpx-text-primary);
            font-family: var(--jpx-font-ui);
            font-size: 12px;
            line-height: 1.4;
            cursor: pointer;
            pointer-events: auto;
        }

        #toast-container .jpx-toast.success { background: var(--jpx-success-soft); }
        #toast-container .jpx-toast.warning { background: var(--jpx-warning-soft); }
        #toast-container .jpx-toast.error { background: var(--jpx-danger-soft); }

        .drag-handle {
            cursor: grab;
            user-select: none;
            min-width: 32px;
            padding: 4px 6px;
            border-radius: 0;
            background: var(--jpx-accent-soft) !important;
            border-color: var(--jpx-border) !important;
            font-size: 15px;
            line-height: 1;
            letter-spacing: 1px;
        }
        .drag-handle:active {
            cursor: grabbing;
        }
    `,
};

jpxPanelManager();
jpxMarket();
jpxUtils();

let doInitDoBattle = false;
let isActiveBattle = false;

let readyNext = 0;
let lastActionTimestamp = Date.now();
let lastLogTimestamp = Date.now();

let prefix = 'jpx_';
let isekaiSuffix = document.URL.includes('isekai') ? '_isekai' : '';
const getAutoBattleStateKey = () => prefix + 'isActiveBattle' + isekaiSuffix;
const nativeDialogBackup = {
    alert: window.alert?.bind(window),
    confirm: window.confirm?.bind(window),
    prompt: window.prompt?.bind(window),
};
let nativeDialogGuardEnabled = false;

function readThemeColorVar(varName, fallback = '') {
    const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return color || fallback;
}

function getWidgetStateColor(state) {
    switch (state) {
        case 'active':
            return readThemeColorVar('--jpx-status-active', '#4f4');
        case 'warn':
            return readThemeColorVar('--jpx-status-warn', '#ff5');
        default:
            return readThemeColorVar('--jpx-status-idle', '#fef');
    }
}

function loadAutoBattleState() {
    isActiveBattle = localStorage.getItem(getAutoBattleStateKey()) === 'true';
}

function saveAutoBattleState() {
    localStorage.setItem(getAutoBattleStateKey(), String(isActiveBattle));
}

function ensureBattleCfgLoaded() {
    if (Object.keys(cfgBattle).length > 0) return;

    let storedCfgBattle = {};
    try {
        storedCfgBattle = JSON.parse(localStorage.getItem(prefix + 'cfgBattle' + isekaiSuffix) || '{}');
    } catch (err) {
        console.error('Failed to load cfgBattle. Using default cfgBattle.');
        console.error(err);
        storedCfgBattle = {};
    }
    mergeCfg(storedCfgBattle, defaultCfgBattle, cfgBattle, 'battle');
}

function syncNativeDialogGuard() {
    const shouldGuard = !!isActiveBattle;
    if (shouldGuard === nativeDialogGuardEnabled) return;

    if (shouldGuard) {
        nativeDialogGuardEnabled = true;
        if (nativeDialogBackup.alert) {
            window.alert = function(message) {
                console.warn('[JPX-Revanced] Suppressed alert dialog in auto mode:', message);
                return;
            };
        }
        return;
    }

    nativeDialogGuardEnabled = false;
    if (nativeDialogBackup.alert) window.alert = nativeDialogBackup.alert;
    if (nativeDialogBackup.confirm) window.confirm = nativeDialogBackup.confirm;
    if (nativeDialogBackup.prompt) window.prompt = nativeDialogBackup.prompt;
}

let regExp = {
    locationQueries: /\w+=\w+/g,
    playerInfo: /(\w+) Lv\.(\d+)/,
    staminaInfo: /Stamina:\s(\d+)/,
    spellInfo: /\('([\w\s-]+)'.*, '(\w+)', (\d+), (\d+), (\d+)\)/, //Name, iconID, MP, OC, CD
    itemInfo: /set_infopane_item\((\d+)/,
    battleTypeLog: /Initializing (.*) \.\.\./,
    floor: /Floor (\d+)/,
    round: /Round (\d+) \/ (\d+)/,
    monster: /MID=(\d+) \(([^<>]+)\) \LV=(\d+) HP=(\d+)/g,
    effectGain: /([\w\s-]+) gains the effect ([\w\s-]+)\./g,
    effectExpired: /The effect ([\w\s-]+) on ([\w\s-]+) has expired\./g,
    effectWear: /The effect ([\w\s-]+) on ([\w\s-]+) has worn off\./g,
    effectWearAsleep: /([^<>]+) has been roused from its sleep\./g,
    effectWearConfused: /([^<>]+) got knocked out of confuse\./g,
    oc: /div/g,
    ocHalf: /vcr/g,
    /*isekai911*/
    spellMatch: /\('(?<name>[\w\s-]+)(?:\s\(x(?<stack>\d+)\))?',\s?(?<description>.*),\s?'?(?<turns>[\w\s-]+)'?\)/,
    /*isekai912*/
    //battleRecorder
    turnLog: /([^]+?)<tr><td class="tls">/,
    //timeRecorder
    action: />([^<>]+)<\/td><\/tr>(<tr><td class="tlb">Spirit Stance Exhausted<\/td><\/tr>)*<tr><td class="tls"/,
    /*isekai911*/
    action2: />([^<>]+)<\/td><\/tr><tr><td class="tlb?">[^<>]+<\/td><\/tr>(<tr><td class="tlb">Spirit Stance Exhausted<\/td><\/tr>)*<tr><td class="tls"/,
    /*isekai912*/
    zeroturn: /You use\s*(\w* (?:Gem|Draught|Potion|Elixir|Drink|Candy|Infusion|Scroll|Vase|Bubble))/,
    use: /You (cast|use) ([\w\s-]+)/,
    //combatRecorder
    damage: /[^<>]+damage( \([^<>]+\))*(<\/td><\/tr><tr><td class="tlb">Your spirit shield absorbs \d+ |<|\.)/g,
    damageType: /for (\d+) (\w+) damage/,
    spiritShield: /absorbs (\d+)/,
    crit: /(You crit| crits | blasts )/,
    strike: /(Fire|Cold|Wind|Elec|Holy|Dark|Void) Strike hits/,
    damagePlus: /for (\d+) damage/,
    damagePhysicalPlus: /(Bleeding Wound|Spreading Poison)/,
    damagePoints: /for (\d+) points of (\w+) damage/,
    counter: />You counter/g,
    //    dealt magical
    magicalDealtMiss: /to connect\./g,
    magicalDealtEvade: /evades your spell\./g,
    magicalDealtResist50: / (?:hits|blasts) [^y][^<>]+50%/g,
    magicalDealtResist75: / (?:hits|blasts) [^y][^<>]+75%/g,
    magicalDealtResist90: / (?:hits|blasts) [^y][^<>]+90%/g,
    magicalDealtResist: /resists your spell\./g,
    //    dealt physical
    physicalDealtMiss: /its mark\./g,
    physicalDealtEvade: /(?: dodges your attack\.|evades your offhand attack\.)/g,
    physicalDealtParry: /parries your attack\./g,
    //    taken magical
    magicalTakenEvade: / casts [^<>]+evade the attack\./g,
    magicalTakenBlock: / casts [^<>]+block the attack\./g,
    magicalTakenResist50: / (?:hits|blasts) y[^<>]+50%/g,
    magicalTakenResist75: / (?:hits|blasts) y[^<>]+75%/g,
    magicalTakenResist90: / (?:hits|blasts) y[^<>]+90%/g,
    //    taken physical
    physicalTakenMiss: /misses the attack against you\./g,
    physicalTakenEvade: /(>You evade| uses [^<>]+evade the attack\.)/g,
    physicalTakenParry: /(>You parry| uses [^<>]+parry the attack\.)/g,
    physicalTakenBlock: /(>You block| uses [^<>]+block the attack\.)/g,
    /*isekai911*/
    //combatRecorder_isekai
    damage_isekai: /[^<>]+damage/g,
    damageTaken1_isekai: /(?<v>glances|hits|crits) you.*?(?<n>\d+).*?(?<t>\w+) damage/,
    damageTaken2_isekai: /which (?<v>glances|hits|crits).*?(?<n>\d+).*?(?<t>\w+) damage/,
    spiritShield_isekai: /absorbs (\d+)/,
    damageDealt1_isekai: /(?:You|Your offhand attack|Arcane Blow) (?:(?<s>\d)x-)*(?<v>glance|hit|crit).*?(?<n>\d+).*?(?<t>\w+) damage/,
    damageDealt2_isekai: /(?:(?<s>\d)x-)*(?<v>glanced|hit|crit|eviscerated) for (?<n>\d+) (?<t>\w+) damage/,
    strike_isekai: /(Fire|Cold|Wind|Elec|Holy|Dark|Void) Strike hits.*?(\d+).*?(\w+) damage/,
    explode_isekai: /explodes for (\d+) (\w+) damage/,
    damagePlus_isekai: /for (\d+) damage/,
    damagePhysicalPlus_isekai: /(Bleeding Wound|Spreading Poison)/,
    damagePoints_isekai: /for (\d+) points of (\w+) damage/,
    debuffLog_isekai: /(?:<tr><td class="tlb?">[^<>]+(?: gains the effect | partially resists the effects of your spell\.| shrugs off the effects of your spell\.)+[^<>]*<\/td><\/tr>)+<tr><td class="tl">You cast [a-zA-Z]+\.<\/td><\/tr>/,
    debuffResist0_isekai: / gains the effect (?!Coalesced Mana)/g,
    debuffResist1_isekai: / partially resists the effects of your spell\./g,
    debuffResist3_isekai: / shrugs off the effects of your spell\./g,
    counter_isekai: />You counter/g,
    //    dealt magical
    magicalDealtMiss_isekai: / to connect\./g,
    magicalDealtEvade_isekai: / evades your spell\./g,
    magicalDealtResistPartially_isekai: / resists, and was/g,
    magicalDealtResist_isekai: / resists your spell\./g,
    //    dealt physical
    physicalDealtMiss_isekai: / its mark\./g,
    physicalDealtEvade_isekai: / dodges your attack\./g,
    physicalDealtParryPartially_isekai: / parries[^<>]+?(\d+)[^<>]+?(\w+) damage/g,
    physicalDealtParry_isekai: / parries your attack\./g,
    //    taken magical
    magicalTakenMiss_isekai: /(?:casts[^<>]+, but misses the attack\.|casts[^<>]+, missing you completely\.)/g,
    magicalTakenEvade_isekai: />You evade the attack\./g,
    magicalTakenResistPartially_isekai: / resist the attack/g,
    magicalTakenBlockPartially_isekai: /casts[^<>]+partially block (?:and|resist| )*the attack/g,
    magicalTakenBlock_isekai: /(?<!partially )block (?:and|resist| )*the attack\./g,
    //    taken physical
    physicalTakenMiss_isekai: /(?:uses[^<>]+, but misses the attack\.|(?:vigorously whiffs at a shadow|uses[^<>]+), missing you completely\.)/g,
    physicalTakenEvade_isekai: />You evade the attack from/g,
    physicalTakenParryPartially_isekai: /partially parry the attack/g,
    physicalTakenParry_isekai: /(?<!partially )parry the attack/g,
    physicalTakenBlockPartially_isekai: /(?:(?:uses[^<>]+|>)You|you) partially block (?:and|partially|parry| )*the attack/g,
    physicalTakenBlock_isekai: /(?<!partially )block (?:and|partially|parry| )*the attack/g,
    /*isekai912*/
    //revenueRecorder
    gainExp: /gain (\d+) EXP/,
    gainCredit: /gain (\d+) Credit/,
    proficiencies: /\d+\.\d+ points of [^<>]+ proficiency/g,
    proficiency: /(\d+\.\d+) points of ([^<>]+) proficiency/,
    dropsLogs: /\S+ <span style="color:.{7}">\[[^<>]+\](<\/span><\/td><\/tr><tr><td class="tlb">A traveling)*/g,
    drop: /(\S+) \<.*#(.{6}).*\[(.*)\](.)*/,
    quality: /(Crude|Fair|Average|Superior|Exquisite|Magnificent|Legendary|Peerless)/,
    credit: /(\d+) Credit/,
    crystal: /(?:(\d+)x )?(Crystal of \w+)/,
}

let log;
let battleStyle = '';
let battleType = '';
let towerFloor = 0;
let roundInfo = { current: 0, total: 0 }
let monsterData = [];
let allMonsterInfo = {};
let prevMonsterIds = '';
let monstersEffects = {};
let actionCounts = {};
let battleLogRecord = [];
let battleLogRecordCurrent = [];
let timeRecords = {};
let combatRecords = {};
let revenueRecords = {};
let spellDamageBonus = JSON.parse(localStorage.getItem(prefix + 'spellDamageBonus' + isekaiSuffix) || '{"maxType":"fire","maxValue":0}');

let dummy = document.createElement('div');
let newWindow;

const difficultyMap = { Normal: 1, Hard: 2, Nightmare: 4, Hell: 7, Nintendo: 10, IWBTH: 15, PFUDOR: 20 };
const itemMap = {
    10005: 'Health Gem', 10006: 'Mana Gem', 10007: 'Spirit Gem', 10008: 'Mystic Gem',
    11191: 'Health Draught', 11195: 'Health Potion', 11199: 'Health Elixir',
    11291: 'Mana Draught', 11295: 'Mana Potion', 11299: 'Mana Elixir',
    11391: 'Spirit Draught', 11395: 'Spirit Potion', 11399: 'Spirit Elixir',
    11401: 'Energy Drink', 11402: 'Caffeinated Candy', 11501: 'Last Elixir',
    12101: 'Infusion of Flames', 12201: 'Infusion of Frost', 12301: 'Infusion of Lightning', 12401: 'Infusion of Storms', 12501: 'Infusion of Divinity', 12601: 'Infusion of Darkness',
    13101: 'Scroll of Swiftness', 13111: 'Scroll of Protection', 13199: 'Scroll of the Avatar', 13201: 'Scroll of Absorption', 13211: 'Scroll of Shadows', 13221: 'Scroll of Life', 13299: 'Scroll of the Gods',
    19111: 'Flower Vase', 19131: 'Bubble-Gum',
};
const itemSrc = [
    { keys: ['Health', 'Last Elixir'], src: '/y/e/healthpot.png' },
    { keys: ['Mana'], src: '/y/e/manapot.png' },
    { keys: ['Spirit'], src: '/y/e/spiritpot.png' },
    { keys: ['Drink', 'Candy'], src: '/y/e/soulstone.png' },
    { keys: ['Flames'], src: '/y/e/fireinfusion.png' },
    { keys: ['Frost'], src: '/y/e/coldinfusion.png' },
    { keys: ['Storms'], src: '/y/e/windinfusion.png' },
    { keys: ['Lightning'], src: '/y/e/elecinfusion.png' },
    { keys: ['Divinity'], src: '/y/e/holyinfusion.png' },
    { keys: ['Darkness'], src: '/y/e/darkinfusion.png' },
    { keys: ['Protection','vatar'], src: '/y/e/protection_scroll.png' },
    { keys: ['Swiftness'], src: '/y/e/haste_scroll.png' },
    { keys: ['Absorption'], src: '/y/e/absorb_scroll.png' },
    { keys: ['Shadows'], src: '/y/e/shadowveil_scroll.png' },
    { keys: ['Life','Gods'], src: '/y/e/sparklife_scroll.png' },
    { keys: ['Vase'], src: '/y/e/flowers.png' },
    { keys: ['Gum'], src: '/y/e/gum.png' }
];
const effectSrc = {
    'Vital Theft': { scr: '/y/e/drainhp.png' },
    'Ether Theft': { scr: '/y/e/drainmp.png' },
    'Spirit Theft': { scr: '/y/e/drainsp.png' },

    'Weakened': { scr: '/y/e/weaken.png' },
    'Imperiled': { scr: '/y/e/imperil.png' },
    'Slowed': { scr: '/y/e/slow.png' },
    'Asleep': { scr: '/y/e/sleep.png' },
    'Confused': { scr: '/y/e/confuse.png' },
    'Blinded': { scr: '/y/e/blind.png' },
    'Silenced': { scr: '/y/e/silence.png' },
    'Magically Snared': { scr: '/y/e/magnet.png' },
    'Immobilized': { scr: '/y/e/magnet.png' },
    'Stunned': { scr: '/y/e/wpn_stun.png' },
    'Penetrated Armor': { scr: '/y/e/wpn_ap.png' },
    'Bleeding Wound': { scr: '/y/e/wpn_bleed.png' },
    'Spreading Poison': { scr: '/y/e/poison.png' },
    'Coalesced Mana': { scr: '/y/e/coalescemana.png' },

    'Searing Skin': { scr: '/y/e/firedot.png' },
    'Freezing Limbs': { scr: '/y/e/coldslow.png' },
    'Turbulent Air': { scr: '/y/e/windmiss.png' },
    'Deep Burns': { scr: '/y/e/elecweak.png' },
    'Breached Defense': { scr: '/y/e/holybreach.png' },
    'Blunted Attack': { scr: '/y/e/darknerf.png' },
    'Burning Soul': { scr: '/y/e/soulfire.png' },
    'Ripened Soul': { scr: '/y/e/ripesoul.png' },

    'Fury of the Sisters': { scr: '/y/e/trio_furyofthesisters.png' },
    'Lamentations of the Future': { scr: '/y/e/trio_skuld.png' },
    'Screams of the Past': { scr: '/y/e/trio_urd.png' },
    'Wails of the Present': { scr: '/y/e/trio_verdandi.png' },
    'Absorbing Ward': { scr: '/y/e/absorb.png' },
};
const spellsDamageObj = {
    fire: ['Fiery Blast', 'Inferno', 'Flames of Loki'],
    cold: ['Freeze', 'Blizzard', 'Fimbulvetr'],
    wind: ['Gale', 'Downburst', 'Storms of Njord'],
    elec: ['Shockblast', 'Chained Lightning', 'Wrath of Thor'],
    holy: ['Smite', 'Banishment', 'Paradise Lost'],
    dark: ['Corruption', 'Disintegrate', 'Ragnarok'],
};
const bossTypes = {
    Rare: new Set(['Manbearpig', 'White Bunneh', 'Mithra', 'Dalek']),
    Legendary: new Set(['Konata', 'Mikuru Asahina', 'Ryouko Asakura', 'Yuki Nagato']),
    Ultimate: new Set(['Skuld', 'Urd', 'Verdandi', 'Yggdrasil', 'Real Life', 'Invisible Pink Unicorn', 'Flying Spaghetti Monster']),
    Arena300: new Set(['Drogon', 'Rhaegal', 'Viserion']),
    Arena400: new Set(['New Game +', 'Bottomless Dungeon', 'Recycled Boss Rush', 'Time Trial Mode', 'Achievement Grind', 'Hardcore Mode']),
    Arena500: new Set(['Angel Bunny', 'Applejack', 'Fluttershy', 'Gummy', 'Pinkie Pie', 'Rarity', 'Spike', 'Rainbow Dash', 'Twilight Sparkle']),
};

const BATTLE_STYLES = ['OneHanded', '1H_Mage', 'TwoHanded', '2H_Mage', 'DualWielding', 'DW_Mage', 'NitenIchiryu', 'NI_Mage', 'Staff', 'Unarmed'];
const BATTLE_TYPES = ['Arena', 'Encounter', 'Colosseum', 'Battle1000', 'Item', 'Tower'];
const BATTLE_MODES = BATTLE_STYLES.flatMap(style => ['General', ...BATTLE_TYPES].map(type => `${style}_${type}`));
const PRIORITY_RULES = ['Top Down', 'Bottom Up', 'Current HP Low to High', 'Current HP High to Low', 'Current HP Percent Low to High', 'Current HP Percent High to Low'];
const MONSTER_TYPES = ['Normal', 'Rare', 'Legendary', 'Ultimate', 'Arena300', 'Arena400', 'Arena500'];
const MONSTER_CLASSES = ['Arthropod', 'Avion', 'Beast', 'Celestial', 'Daimon', 'Dragonkin', 'Elemental',
     'Giant', 'Humanoid', 'Mechanoid', 'Reptilian', 'Sprite', 'Undead'];
const PLAYER_EFFECTS = ['Channeling', 'Regeneration', 'Replenishment', 'Refreshment', 'Regen', 'Heartseeker', 'Arcane Focus',
    'Hastened', 'Protection', 'Absorbing Ward', 'Shadow Veil', 'Spark of Life', 'Spirit Shield',
    'Infused Flames', 'Infused Frost', 'Infused Storm', 'Infused Lightning', 'Infused Divinity', 'Infused Darkness',
    'Energized', 'Sleeper Imprint', 'Kicking Ass',
    'Overwhelming Strikes', 'Ether Tap', 'Cloak of the Fallen', 'Blessing of the RiddleMaster', 'Defending', 'Focusing'];
const TOGGLE = ['Spirit', 'Defend', 'Focus'];
const SKILLS = ['Shield Bash', 'Vital Strike', 'Merciful Blow', 'Iris Strike', 'Backstab', 'Frenzied Blows', 'Great Cleave',
    'Rending Blow', 'Shatter Strike', 'Skyward Sword', 'Concussive Strike', 'Flee', 'Scan', 'FUS RO DAH', 'Orbital Friendship Cannon'];
const SPELLS_SUPPORT = ['Cure', 'Full-Cure', 'Regen', 'Haste', 'Protection', 'Absorb', 'Shadow Veil', 'Spark of Life', 'Spirit Shield', 'Heartseeker', 'Arcane Focus'];
const ITEMS = ['Mystic Gem', 'Health Gem', 'Health Draught', 'Health Potion', 'Health Elixir', 'Mana Gem', 'Mana Draught', 'Mana Potion', 'Mana Elixir',
    'Spirit Gem', 'Spirit Draught', 'Spirit Potion', 'Spirit Elixir', 'Last Elixir', 'Infusion of Flames', 'Infusion of Frost', 'Infusion of Storms', 'Infusion of Lightning',
    'Infusion of Divinity', 'Infusion of Darkness',    'Scroll of Swiftness', 'Scroll of Protection', 'Scroll of the Avatar', 'Scroll of Absorption', 'Scroll of Shadows',
    'Scroll of Life', 'Scroll of the Gods',    'Caffeinated Candy', 'Energy Drink', 'Flower Vase', 'Bubble-Gum'];
const SPELLS_DAMAGE = ['T1', 'T2', 'T3', 'Fiery Blast', 'Inferno', 'Flames of Loki', 'Freeze', 'Blizzard', 'Fimbulvetr', 'Gale', 'Downburst', 'Storms of Njord',
    'Shockblast', 'Chained Lightning', 'Wrath of Thor', 'Smite', 'Banishment', 'Paradise Lost', 'Corruption', 'Disintegrate', 'Ragnarok'];
const SPELLS_DEBUFF = ['Drain', 'Weaken', 'Imperil', 'Slow', 'Sleep', 'Confuse', 'Blind', 'Silence', 'MagNet', 'Immobilize'];

const CTRLWIDGET_FIELDS = [
    { id: 'isActiveBattle', get: () => isActiveBattle ? t('cW.auto') : t('cW.manual') },
    { id: 'readyNext', get: () => readyNext },
    { id: 'networkDelay', get: () => (lastLogTimestamp > lastActionTimestamp ? lastLogTimestamp - lastActionTimestamp : '-') },
    { id: 'battleStyle', get: () => t(`cW.${battleStyle}`) + (/Staff|Mage/.test(battleStyle) ? ` (${t(`cW.${spellDamageBonus.maxType}`)})` : '') },
    { id: 'battleType', get: () => t(`cW.${battleType}`) + (towerFloor ? ` (${towerFloor}F)` : '') },
    { id: 'round', get: () => roundInfo.total ? `${roundInfo.current} / ${roundInfo.total}` : '-' },
].map(f => ({ ...f, label: `cW.${f.id}` }));
const COMBAT_FIELDS = [
    { id: 'fire', type: 'damage' },
    { id: 'cold', type: 'damage' },
    { id: 'wind', type: 'damage' },
    { id: 'elec', type: 'damage' },
    { id: 'holy', type: 'damage' },
    { id: 'dark', type: 'damage' },
    { id: 'crushing', type: 'damage' },
    { id: 'slashing', type: 'damage' },
    { id: 'piercing', type: 'damage' },
    { id: 'void', type: 'damage' },
    { id: 'damagePlus', type: 'damage' },
    { id: 'damageTotal', type: 'damage', isTotal: true },

    { id: 'glance', type: 'result' },
    { id: 'hit', type: 'result' },
    { id: 'crit', type: 'result' },
    { id: 'miss', type: 'result' },
    { id: 'evade', type: 'result' },
    { id: 'parry', type: 'result' },
    { id: 'resist', type: 'result' },
    { id: 'block', type: 'result' },
    { id: 'resultTotal', type: 'result', isTotal: true },

    { id: 'resist50', type: 'resultPartially' },
    { id: 'resist75', type: 'resultPartially' },
    { id: 'resist90', type: 'resultPartially' },
    { id: 'parryPartially', type: 'resultPartially' },
    { id: 'resistPartially', type: 'resultPartially' },
    { id: 'blockPartially', type: 'resultPartially' },
    { id: 'resultPartiallyTotal', type: 'resultPartially', isTotal: true },
].map(f => ({ ...f, label: `cP.${f.id}` }));
const COMBAT_USE_FIELDS = [
    { id: 'action', keys: ['Attack', ...TOGGLE] },
    { id: 'item', keys: ['Mystic Gem', 'Health Gem', 'Mana Gem', 'Spirit Gem', 'Caffeinated Candy', 'Energy Drink'] },
    { id: 'skill', keys: SKILLS },
    { id: 'spellSupport', keys: SPELLS_SUPPORT },
    { id: 'spellDamage', keys: SPELLS_DAMAGE },
    { id: 'spellDebuff', keys: SPELLS_DEBUFF },
].map(f => ({ ...f, label: `cP.${f.id}`, keys: f.keys.map(key => ({ key, label: `cB.${key}`})) }));
const REVENUE_FIELDS = [
    { id: 'exp', type: 'simple' },
    { id: 'proficiency', type: 'list_paired',
        order: [
            'one-handed weapon', 'two-handed weapon', 'dual wielding', /*isekai911*/'dual-wielding',/*isekai912*/ 'staff',
            'cloth armor', 'light armor', 'heavy armor', 'elemental magic', 'divine magic', 'forbidden magic', 'supportive magic', 'deprecating magic'
        ]
    },
    { id: 'credit', type: 'simple' },
    { id: 'equipment', type: 'list_flat', order: ['Peerless', 'Legendary', 'Magnificent', 'Exquisite', 'Superior', 'Average', 'Fair', 'Crude'] },
    { id: 'material', type: 'grid',
        order: [
            'Low-Grade Cloth', 'Mid-Grade Cloth', 'High-Grade Cloth',
            'Low-Grade Leather', 'Mid-Grade Leather', 'High-Grade Leather',
            'Low-Grade Metals', 'Mid-Grade Metals', 'High-Grade Metals',
            'Low-Grade Wood', 'Mid-Grade Wood', 'High-Grade Wood',
            'Scrap Cloth', 'Scrap Leather', 'Scrap Metal', 'Scrap Wood', 'Energy Cell',
        ]
    },
    { id: 'consumable', type: 'grid_detailed',
        order: [
            'Health Draught', 'Health Potion', 'Health Elixir',
            'Mana Draught', 'Mana Potion', 'Mana Elixir',
            'Spirit Draught', 'Spirit Potion', 'Spirit Elixir', 'Last Elixir',
            'Infusion of Flames', 'Infusion of Frost', 'Infusion of Storms', 'Infusion of Lightning', 'Infusion of Divinity', 'Infusion of Darkness',
            'Scroll of Swiftness', 'Scroll of Protection', 'Scroll of the Avatar', 'Scroll of Absorption', 'Scroll of Shadows', 'Scroll of Life', 'Scroll of the Gods',
            'Voidseeker Shard', 'Aether Shard', 'Featherweight Shard', 'Amnesia Shard', 'World Seed',
            'Flower Vase', 'Bubble-Gum'
        ]
    },
    { id: 'consumableProfit', type: 'simple', source: 'consumable', key: 'profit' },
    { id: 'token', type: 'grid', order: ['Token of Blood', 'Chaos Token', 'Soul Fragment'] },
    { id: 'tokenProfit', type: 'simple', source: 'token', key: 'profit' },
    { id: 'food', type: 'grid', order: ['Monster Chow', 'Monster Edibles', 'Monster Cuisine', 'Happy Pills'] },
    { id: 'foodProfit', type: 'simple', source: 'food', key: 'profit' },
    { id: 'figurine', type: 'grid',
        order: [
            'Twilight Sparkle Figurine', 'Rainbow Dash Figurine', 'Applejack Figurine', 'Fluttershy Figurine', 'Pinkie Pie Figurine', 'Rarity Figurine',
            'Trixie Figurine', 'Princess Celestia Figurine', 'Princess Luna Figurine', 'Apple Bloom Figurine', 'Scootaloo Figurine', 'Sweetie Belle Figurine',
            'Big Macintosh Figurine', 'Spitfire Figurine', 'Derpy Hooves Figurine', 'Lyra Heartstrings Figurine', 'Octavia Figurine', 'Zecora Figurine',
            'Cheerilee Figurine', 'Vinyl Scratch Figurine', 'Daring Do Figurine', 'Doctor Whooves Figurine', 'Berry Punch Figurine', 'Bon-Bon Figurine',
            'Fluffle Puff Figurine', 'Angel Bunny Figurine', 'Gummy Figurine',
        ]
    },
    { id: 'figurineProfit', type: 'simple', source: 'figurine', key: 'profit' },
    { id: 'artifact', type: 'grid', order: ['Precursor Artifact'] },
    { id: 'artifactProfit', type: 'simple', source: 'artifact', key: 'profit' },
    { id: 'trophy', type: 'grid',
        order: [
            'ManBearPig Tail', 'Holy Hand Grenade of Antioch', "Mithra's Flower", 'Dalek Voicebox', 'Lock of Blue Hair',
            'Bunny-Girl Costume', 'Hinamatsuri Doll', 'Broken Glasses', 'Black T-Shirt', 'Sapling', 'Unicorn Horn', 'Noodly Appendage',
        ]
    },
    { id: 'trophyProfit', type: 'simple', source: 'trophy', key: 'profit' },
    { id: 'crystal', type: 'grid',
        order: [
            'Crystal of Vigor', 'Crystal of Finesse', 'Crystal of Swiftness', 'Crystal of Fortitude', 'Crystal of Cunning', 'Crystal of Knowledge',
            'Crystal of Flames', 'Crystal of Frost', 'Crystal of Tempest', 'Crystal of Lightning', 'Crystal of Devotion', 'Crystal of Corruption',
        ]
    },
    { id: 'crystalTotal', type: 'total', source: 'crystal' },
    { id: 'totalProfit', type: 'summary' },
    { id: 'stamina', type: 'stamina' },
    { id: 'finalProfit', type: 'summary' }
].map(f => ({ ...f, label: `rP.${f.id}` }));
const sumRevenueCategory = (record, category) => {
    let data = record.revenueRecords?.[category];
    if (!data) return '0';
    let total = 0;
    for (const [key, value] of Object.entries(data)) {
        if (key !== 'total' && key !== 'profit') total += value;
    }
    return Math.round(total * 100) / 100;
};
const sumTrophies = (record, type) => {
    let data = record.revenueRecords?.trophy;
    if (!data) return '0';

    const TROPHIES_T2 = ['ManBearPig Tail', 'Holy Hand Grenade of Antioch', "Mithra's Flower", 'Dalek Voicebox', 'Lock of Blue Hair'];
    let total = 0;
    for (const [key, value] of Object.entries(data)) {
        if (key === 'total' || key === 'profit') continue;
        let isLesser = key.match(/Lesser .+ Charm/);
        let isGreater = key.match(/Greater .+ Charm/);
        let isT2 = TROPHIES_T2.includes(key);
        switch (type) {
            case 'lesserCharm':
                if (isLesser) total += value;
                break;
            case 'greaterCharm':
                if (isGreater) total += value;
                break;
            case 'T2':
                if (isT2) total += value;
                break;
            case 'T36':
                if (!isT2 && !isLesser && !isGreater) total += value;
                break;
        }
    }
    return total;
};
const getConsumable = (record, field) => {
    let item = record.revenueRecords?.consumable?.[field];
    if (!item) return { drop: 0, use: 0, balance: 0 };
    return { drop: item.drop || 0, use: item.use || 0, balance: item.balance || 0 };
};
const getEquipmentCount = (record, quality) => {
    let value = record.revenueRecords?.equipment?.[quality];
    if (Array.isArray(value)) return value.length;
    return typeof value === 'number' ? value : 0;
};
const STATS_FIELDS = [
    { id: 'date', get: d => d.date || '' },
    { id: 'round', get: d => d.roundInfo?.current || '' },
    { id: 'deltaTime', get: d => d.deltaTime || '' },
    { id: 'turns', style: 'min-width: 60px;', get: d => d.turns || '' },
    { id: 'riddle', get: d => d.riddle || 0 },
    { id: 'tps', get: d => d.tps || '' },
    { id: 'finalProfit', get: d => d.revenueRecords?.finalProfit || 0 },
    { id: 'credit', get: d => d.revenueRecords?.credit || 0 },
    { id: 'staminaCost', get: d => d.revenueRecords?.staminaCost || 0 },
    { id: 'totalProfit', get: d => d.revenueRecords?.totalProfit || 0 },

    { id: 'pDGlance', get: d => d.combatRecords?.physicalDealt?.glance || 0 },
    { id: 'pDHit', get: d => d.combatRecords?.physicalDealt?.hit || 0 },
    { id: 'pDCrit', get: d => d.combatRecords?.physicalDealt?.crit || 0 },
    { id: 'mDGlance', get: d => d.combatRecords?.magicalDealt?.glance || 0 },
    { id: 'mDHit', get: d => d.combatRecords?.magicalDealt?.hit || 0 },
    { id: 'mDCrit', get: d => d.combatRecords?.magicalDealt?.crit || 0 },
    { id: 'mDRes', get: d => d.combatRecords?.magicalDealt?.resist || 0 },
    { id: 'mDRes50', get: d => d.combatRecords?.magicalDealt?.resist50 || 0 },
    { id: 'mDRes75', get: d => d.combatRecords?.magicalDealt?.resist75 || 0 },
    { id: 'mDRes90', get: d => d.combatRecords?.magicalDealt?.resist90 || 0 },
    { id: 'mDResP', get: d => d.combatRecords?.magicalDealt?.resistPartially || 0 },
    { id: 'mDDRes0', get: d => d.combatRecords?.magicalDealt?.debuffResist0 || 0 },
    { id: 'mDDRes12', get: d => d.combatRecords?.magicalDealt?.debuffResist1 || 0 },
    { id: 'mDDRes3', get: d => d.combatRecords?.magicalDealt?.debuffResist3 || 0 },

    { id: 'uCure', get: d => d.combatRecords?.use?.Cure || 0 },
    { id: 'uFullCure', get: d => d.combatRecords?.use?.['Full-Cure'] || 0 },
    { id: 'uCloakOfTheFallen', get: d => d.combatRecords?.use?.['Cloak of the Fallen'] || 0 },
    { id: 'uImperil', get: d => d.combatRecords?.use?.Imperil || 0 },

    { id: 'eqP', get: d => getEquipmentCount(d, 'Peerless') },
    { id: 'eqL', get: d => getEquipmentCount(d, 'Legendary') },
    { id: 'eqM', get: d => getEquipmentCount(d, 'Magnificent') },
    { id: 'cha', get: d => d.revenueRecords?.token?.['Chaos Token'] || 0 },
    { id: 'blo', get: d => d.revenueRecords?.token?.['Token of Blood'] || 0 },

    { id: 'food', get: d => sumRevenueCategory(d, 'food') },
    { id: 'fig', get: d => sumRevenueCategory(d, 'figurine') },
    { id: 'arti', get: d => sumRevenueCategory(d, 'artifact') },
    { id: 'crys', get: d => sumRevenueCategory(d, 'crystal') },

    { id: 't2', get: d => sumTrophies(d, 'T2') },
    { id: 't36', get: d => sumTrophies(d, 'T36') },
    { id: 'lCharm', get: d => sumTrophies(d, 'lesserCharm') },
    { id: 'gCharm', get: d => sumTrophies(d, 'greaterCharm') },

    { id: 'seed', get: d => getConsumable(d, 'World Seed') },
    { id: 'hd', get: d => getConsumable(d, 'Health Draught') },
    { id: 'md', get: d => getConsumable(d, 'Mana Draught') },
    { id: 'sd', get: d => getConsumable(d, 'Spirit Draught') },
    { id: 'hp', get: d => getConsumable(d, 'Health Potion') },
    { id: 'mp', get: d => getConsumable(d, 'Mana Potion') },
    { id: 'sp', get: d => getConsumable(d, 'Spirit Potion') },
    { id: 'he', get: d => getConsumable(d, 'Health Elixir') },
    { id: 'me', get: d => getConsumable(d, 'Mana Elixir') },
    { id: 'se', get: d => getConsumable(d, 'Spirit Elixir') },
    { id: 'le', get: d => getConsumable(d, 'Last Elixir') },
    { id: 'swif', get: d => getConsumable(d, 'Scroll of Swiftness') },
    { id: 'prot', get: d => getConsumable(d, 'Scroll of Protection') },
    { id: 'avat', get: d => getConsumable(d, 'Scroll of the Avatar') },
    { id: 'abso', get: d => getConsumable(d, 'Scroll of Absorption') },
    { id: 'shad', get: d => getConsumable(d, 'Scroll of Shadows') },
    { id: 'life', get: d => getConsumable(d, 'Scroll of Life') },
    { id: 'gods', get: d => getConsumable(d, 'Scroll of the Gods') },
].map(f => ({ ...f, label: `sP.${f.id}` }));

const createKeybind = (key, { ctrl = false, alt = false, shift = false } = {}) => ({ key, ctrl, alt, shift });

const quickbarDefaultKeybinds = Object.fromEntries(
    Array.from({ length: 10 }, (_, index) => {
        const slot = index + 1;
        const quickbarKey = slot === 10 ? '0' : String(slot);
        return [`nativeQuickbar${slot}`, createKeybind(quickbarKey, { alt: true })];
    })
);

const itemDefaultKeybinds = {
    nativeItemP: createKeybind('p'),
    ...Object.fromEntries(
        Array.from({ length: 12 }, (_, index) => {
            const slot = index + 1;
            return [`nativeItem${slot}`, createKeybind(`F${slot}`)];
        })
    ),
    ...Object.fromEntries(
        Array.from({ length: 3 }, (_, index) => {
            const slot = index + 13;
            return [`nativeItem${slot}`, createKeybind('')];
        })
    ),
};

const itemShiftDefaultKeybinds = Object.fromEntries(
    Array.from({ length: 6 }, (_, index) => {
        const slot = index + 1;
        return [`nativeItemShift${slot}`, createKeybind(`F${slot}`, { shift: true })];
    })
);

const itemCtrlDefaultKeybinds = Object.fromEntries(
    Array.from({ length: 6 }, (_, index) => {
        const slot = index + 1;
        return [`nativeItemCtrl${slot}`, createKeybind(`F${slot}`, { ctrl: true })];
    })
);

const KEYBINDS = {
    openBattleRecords: createKeybind('z'),
    toggleActive: createKeybind('m'),
    openSettings: createKeybind(','),

    nativeAttack: createKeybind('q'),
    nativeSkillbook: createKeybind('w'),
    nativeItemsPane: createKeybind('e'),
    nativeSpirit: createKeybind('s'),
    nativeDefend: createKeybind('d'),
    nativeFocus: createKeybind('f'),
    nativeRecast: createKeybind('r'),

    ...quickbarDefaultKeybinds,
    ...itemDefaultKeybinds,
    ...itemShiftDefaultKeybinds,
    ...itemCtrlDefaultKeybinds,
};

const storedUserKeybinds = (() => {
    try {
        return JSON.parse(localStorage.getItem(prefix + 'userKeybinds' + isekaiSuffix) || '{}');
    } catch (err) {
        console.warn('Failed to load userKeybinds. Using default userKeybinds.');
        return {};
    }
})();

let userKeybinds = Object.fromEntries(
    Object.entries(KEYBINDS).map(([action, fallback]) => {
        const bind = storedUserKeybinds[action];
        if (bind && typeof bind.key === 'string') {
            return [action, {
                key: bind.key,
                ctrl: !!bind.ctrl,
                alt: !!bind.alt,
                shift: !!bind.shift,
            }];
        }
        return [action, { ...fallback }];
    })
);

const legacyNativeItemDefaults = {
    nativeItem13: 'g',
    nativeItem14: 'p',
    nativeItem15: 'h',
};

const shouldMigrateLegacyNativeItemDefaults =
    !Object.prototype.hasOwnProperty.call(storedUserKeybinds, 'nativeItemP') &&
    Object.entries(legacyNativeItemDefaults).every(([action, key]) => {
        const bind = storedUserKeybinds[action];
        return !!bind &&
            typeof bind.key === 'string' &&
            bind.key.toLowerCase() === key &&
            !bind.ctrl &&
            !bind.alt &&
            !bind.shift;
    });

if (shouldMigrateLegacyNativeItemDefaults) {
    userKeybinds.nativeItem13 = { ...KEYBINDS.nativeItem13 };
    userKeybinds.nativeItem14 = { ...KEYBINDS.nativeItem14 };
    userKeybinds.nativeItem15 = { ...KEYBINDS.nativeItem15 };
}

let idCounter = 0;
const mkF = (key, type, extra = {}) => {
    const { prefix = 'cB.', label, ...otherExtra } = extra;
    const field = {
        key,
        type,
        label: label || (type === 'constant' ? `${prefix}${extra.value || key}` : `${prefix}${key}`),
        ...otherExtra
    };

    ['options', 'multiSelectOptions'].forEach(opts => {
        if (type !== 'conditionsArray' && Array.isArray(field[opts])) field[opts] = field[opts].map(opt => ({ value: opt, label: `${prefix}${opt}` }));
    });

    return field;
};
const mkItem = (type, nameList = null, extra = [], useGeneral = true, useTarget = false) => {
    const properties = [mkF('type', 'constant', { value: type, class: 'heading' })];

    if (nameList) properties.push(mkF('name', 'dropdown', { options: nameList }));
    if (extra.length > 0) properties.push(...extra.map(item => mkF(item.key, item.type, { ...item })));

    let conds = [];
    if (useGeneral) conds = conds.concat(conditionsGeneral);
    if (useTarget) conds = conds.concat(conditionsTarget);
    if (conds.length > 0) properties.push(mkF('conditions', 'conditionsArray', { options: conds }));

    return { type: 'object', properties };
};
const conditionsGeneral = [
    mkF('world', 'array', { multiSelectOptions: ['Persistent', 'Isekai'], itemSchema: { type: 'text' } }),
    mkF('pLevel', 'rangeNumber'),
    mkF('battleTypes', 'array', { multiSelectOptions: BATTLE_TYPES, popup: true, itemSchema: { type: 'text' } }),
    mkF('difficulty', 'array', { multiSelectOptions: Object.keys(difficultyMap), popup: true, itemSchema: { type: 'text' } }),
    mkF('roundCurrent', 'rangeNumber'),
    mkF('roundLeft', 'rangeNumber'),
    mkF('roundTotal', 'rangeNumber'),
    mkF('floor', 'rangeNumber'),
    mkF('pActionCooldown', 'array', { multiSelectOptions: [
        ...SKILLS, ...SPELLS_SUPPORT, ...ITEMS, ...SPELLS_DAMAGE, ...SPELLS_DEBUFF,
    ], hasRange: 'cB.cooldownRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('pActionCounts', 'array', { multiSelectOptions: [
        'Attack', ...TOGGLE, ...SKILLS, ...SPELLS_SUPPORT, ...ITEMS, ...SPELLS_DAMAGE, ...SPELLS_DEBUFF,
    ], hasRange: 'cB.usesPerRoundRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('pHP', 'rangeNumber'),
    mkF('pMP', 'rangeNumber'),
    mkF('pSP', 'rangeNumber'),
    mkF('pOC', 'rangeNumber'),
    mkF('pSpiritStatus', 'boolean'),
    mkF('pEffects', 'array', { multiSelectOptions: PLAYER_EFFECTS, hasRange: 'cB.remainingTurnsRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('pIgnoredEffects', 'array', { multiSelectOptions: PLAYER_EFFECTS, hasRange: 'cB.remainingTurnsRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('pEffectStacks', 'array', { multiSelectOptions: PLAYER_EFFECTS, hasRange: 'cB.stacksRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('monsters', 'rangeNumber'),
    mkF('activeMonsters', 'rangeNumber'),
    mkF('defeatedMonsters', 'rangeNumber'),
    mkF('bosses', 'rangeNumber'),
    mkF('activeBosses', 'rangeNumber'),
    mkF('defeatedBosses', 'rangeNumber'),
    mkF('mWithoutEffects', 'array', { multiSelectOptions: Object.keys(effectSrc), hasRange: 'cB.monsterCountRange', popup: true, itemSchema: { type: 'text' } }),
];
const conditionsTarget = [
    mkF('tName', 'text'),
    mkF('tTypes', 'array', { multiSelectOptions: MONSTER_TYPES, popup: true, itemSchema: { type: 'text' } }),
    mkF('tClasses', 'array', { multiSelectOptions: MONSTER_CLASSES, popup: true, itemSchema: { type: 'text' } }),
    mkF('tPowerLevel', 'rangeNumber'),
    mkF('tIndex', 'rangeNumber'),
    mkF('tHP', 'rangeNumber'),
    mkF('tMP', 'rangeNumber'),
    mkF('tSP', 'rangeNumber'),
    mkF('tEffects', 'array', { multiSelectOptions: Object.keys(effectSrc), hasRange: 'cB.remainingTurnsRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('tIgnoredEffects', 'array', { multiSelectOptions: Object.keys(effectSrc), hasRange: 'cB.remainingTurnsRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('tEffectStacks', 'array', { multiSelectOptions: Object.keys(effectSrc), hasRange: 'cB.stacksRange', popup: true, itemSchema: { type: 'text' } }),
    mkF('tDaysSinceUpdate', 'rangeNumber'),
].map(f => ({
    ...f,
    extraFields: [
        { key: 'offset', type: 'rangeNumber' },
        { key: 'matched', type: 'rangeNumber', defaultValue: [1, 1] },
    ].map(ef => ({ ...ef, label: `cB.${ef.key}` }))
}));
const cfgBattleSchema = {
    type: 'object',
    properties: [
        mkF('autoFlowSettings', 'heading', { class: 'heading' }),
        mkF('advanceToNextRound', 'boolean'),
        mkF('ajaxRound', 'boolean'),
        mkF('autoFinishBattle', 'boolean'),
        mkF('noticeSettings', 'heading', { class: 'heading' }),
        mkF('notifyOnRiddle', 'boolean'),
        mkF('riddleAlarmLimit', 'number'),
        mkF('dailyStaminaQuotaPlus', 'number'),
        mkF('battleDisplaySettings', 'heading', { class: 'heading' }),
        mkF('showCooldowns', 'boolean'),
        mkF('quickbarExtend', 'array', { itemSchema: { type: 'text' } }),
        mkF('showDurations', 'boolean'),
        mkF('showRealTimeProficiency', 'boolean'),
        mkF('showMonsterIndex', 'boolean'),
        mkF('showMonsterInfo', 'boolean'),
        mkF('showMonsterHP', 'boolean'),
        mkF('recordWidgetSettings', 'heading', { class: 'heading' }),
        mkF('recordBattleLog', 'boolean'),
        mkF('ctrlWidgetStyleText', 'text', { placeholder: 'right: 18px;' }),
        mkF('ctrlWidgetMouseEnter', 'boolean'),

        mkF('battleModeSettings', 'heading', { class: 'heading' }),
        {
            key: 'modes', type: 'dropdown', label: 'cB.modes',
            hasModeDropdown: 'battleMode',
            options: {
                battleStyle: BATTLE_STYLES.map(key => ({ value: key, label: `cB.${key}` })),
                battleType: ['General', ...BATTLE_TYPES].map(key => ({ value: key, label: `cB.${key}` })),
            },
            flatten: '_',
            itemSchema: {
                type: 'object',
                properties: [
                    mkF('keyBindings', 'keyBasedObjectArray', {
                        class: 'heading',
                        canDisable: true,
                        flatten: true,
                        itemSchema: {
                            type: 'object',
                            discriminator: 'type',
                            oneOf: {
                                target: mkItem('target', null, [{ key: 'priorityRule', type: 'dropdown', options: PRIORITY_RULES }], true, true),
                                spellSupport: mkItem('spellSupport', SPELLS_SUPPORT, true, true),
                                item: mkItem('item', ITEMS, true, true),
                                toggle: mkItem('toggle', TOGGLE, [{ key: 'toggled', type: 'boolean' }], true, true),
                                stop: mkItem('stop', null, [{ key: 'customMessage', type: 'text' }]),
                                smartDebuff: mkItem('smartDebuff', SPELLS_DEBUFF, [
                                    { key: 'targetCount', type: 'dropdown', options: [3, 2, 1] },
                                    { key: 'bottomUp', type: 'boolean' },
                                    { key: 'tailSkip', type: 'number' },
                                    { key: 'maxAtFirst', type: 'number' },
                                    { key: 'minMonstersLeft', type: 'number' }
                                ], true, true),
                                spellDebuff: mkItem('spellDebuff', SPELLS_DEBUFF, [], true, true),
                                spellDamage: mkItem('spellDamage', SPELLS_DAMAGE, [], true, true),
                                skill: mkItem('skill', SKILLS, [], true, true),
                                normalAttack: mkItem('normalAttack', null, [], false, false),
                            }
                        }
                    }),
                    mkF('supports', 'array', {
                        class: 'heading',
                        canDisable: true,
                        itemSchema: {
                            type: 'object',
                            discriminator: 'type',
                            oneOf: {
                                spellSupport: mkItem('spellSupport', SPELLS_SUPPORT, true, true),
                                item: mkItem('item', ITEMS, true, true),
                                toggle: mkItem('toggle', TOGGLE, [{ key: 'toggled', type: 'boolean' }]),
                                stop: mkItem('stop', null, [{ key: 'customMessage', type: 'text' }]),
                            }
                        }
                    }),
                    mkF('attacks', 'array', {
                        class: 'heading',
                        canDisable: true,
                        itemSchema: {
                            type: 'object',
                            discriminator: 'type',
                            oneOf: {
                                target: mkItem('target', null, [{ key: 'priorityRule', type: 'dropdown', options: PRIORITY_RULES }], true, true),
                                toggle: mkItem('toggle', TOGGLE, [{ key: 'toggled', type: 'boolean' }], true, true),
                                smartDebuff: mkItem('smartDebuff', SPELLS_DEBUFF, [
                                    { key: 'targetCount', type: 'dropdown', options: [3, 2, 1] },
                                    { key: 'bottomUp', type: 'boolean' },
                                    { key: 'tailSkip', type: 'number' },
                                    { key: 'maxAtFirst', type: 'number' },
                                    { key: 'minMonstersLeft', type: 'number' }
                                ], true, true),
                                spellDebuff: mkItem('spellDebuff', SPELLS_DEBUFF, [], true, true),
                                spellDamage: mkItem('spellDamage', SPELLS_DAMAGE, [], true, true),
                                skill: mkItem('skill', SKILLS, [], true, true),
                                normalAttack: mkItem('normalAttack', null, [], false, false),
                            }
                        }
                    })
                ]
            }
        }
    ]
};
const cfgStatsSchema = {
    type: 'object',
    properties: [
        mkF('basic', 'heading', { class: 'heading', prefix: 'cS.' }),
        mkF('combatRows', 'fieldPicker', {
            prefix: 'cS.',
            size: 16,
            allFields: COMBAT_FIELDS,
            editFields: [
                { key: 's_pd' },
                { key: 's_md' },
                { key: 's_td' },
                { key: 's_pt' },
                { key: 's_ps' },
                { key: 's_mt' },
                { key: 's_ms' },
                { key: 's_tt' },
            ].map(f => ({ ...f, label: `cS.${f.key}`, placeholder: 'background-color: red' })),
        }),
        mkF('revenueRows', 'fieldPicker', {
            prefix: 'cS.',
            size: 16,
            allFields: REVENUE_FIELDS,
            editFields: [
                { key: 'styleText', label: 'cS.styleText', placeholder: 'color: red;' },
            ],
        }),
        mkF('statsColumns', 'fieldPicker', {
            prefix: 'cS.',
            size: 16,
            allFields: STATS_FIELDS,
            editFields: [
                { key: 'customName', label: 'cS.customName' },
                { key: 'styleText', label: 'cS.styleText', placeholder: 'color: red;' },
                { key: 'colorThresholds', label: 'cS.colorThresholds', placeholder: '500:#c31dcf, 1000:red' },
            ],
        }),
    ]
};

function getBattleSchemaForCurrentWorld() {
    return cfgBattleSchema;
}

let spellCooldowns = {};
let itemCooldowns = {};
let vitals = {};
let spiritStatus = false;
let playerEffectsObj = {};
let monstersObj = {};

const I18N = (() => {
    const decodeI18N = (value) => {
        if (typeof value === 'number' || typeof value === 'boolean' || value == null) return value;
        if (Array.isArray(value)) return value.map(decodeI18N);

        if (typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value).map(([k, v]) => [k, decodeI18N(v)])
            );
        }

        return decodeURIComponent(value);
    };

    const i18n = {
		"add": "新增",
		"delete": "删除",
		"conditions": "条件",
		"cW": {
			"isActiveBattle": "启动",
			"auto": "自动",
			"manual": "手动",
			"readyNext": "准备好下一步",
			"networkDelay": "网路延迟",
			"battleStyle": "战斗风格",
			"OneHanded": "单手",
			"1H_Mage": "单手战法师",
			"TwoHanded": "双手",
			"2H_Mage": "双手战法师",
			"DualWielding": "双持",
			"DW_Mage": "双持战法师",
			"NitenIchiryu": "二天一流",
			"NI_Mage": "二天一流战法师",
			"Staff": "法师",
			"Unarmed": "徒手",
			"fire": "火",
			"cold": "冰",
			"wind": "风",
			"elec": "雷",
			"holy": "圣",
			"dark": "暗",
			"battleType": "战斗类型",
			"Arena": "竞技场",
			"Encounter": "随机遭遇",
			"Colosseum": "浴血擂台",
			"Battle1000": "压榨界",
			"Item": "道具世界",
			"Tower": "塔楼",
			"round": "轮次",
            "toggleAutoOn": "启动自动",
            "toggleAutoOff": "暂停自动",
            "dragToMove": "可拖动区域",
			"openSettings": "打开设定"
		},
		"cGen": {
			"saved!": "已储存",
			"error!": "储存失败",
			"exported!": "已导出",
			"exportFailed!": "导出失败",
			"imported!": "已导入",
			"importFailed!": "导入失败",
            "importSucceeded": "导入成功",
            "importPartial": "部分导入成功",
            "importSkipped": "导入已取消",
            "invalidJson": "JSON格式错误",
            "invalidImportData": "导入资料格式不正确",
			"reset!": "已重置",
			"resetFailed!": "重置失败",
			"closeSettings": "关闭设定"
		},
		"cB": {
			"openBattleRecords": "打开战斗纪录",
			"toggleActive": "切换启动",
			"openSettings": "打开设定",
            "nativeAttack": "攻击",
            "nativeSkillbook": "技能/法术",
            "nativeItemsPane": "道具面板",
            "nativeSpirit": "灵力",
            "nativeDefend": "防御",
            "nativeFocus": "集中",
            "nativeRecast": "重施",
            "keybindSettings": "按键设定",
            "saveKeybindConfig": "储存按键设定",
            "exportKeybindConfig": "导出按键设定",
            "importKeybindConfig": "导入按键设定",
			"basic": "基本",
            "autoFlowSettings": "自动流程",
            "noticeSettings": "提示与限制",
            "battleDisplaySettings": "战斗显示",
            "recordWidgetSettings": "记录与控件",
			"advanceToNextRound": "自动进入下一轮战斗",
            "autoFinishBattle": "自动结束战斗",
            "notifyOnRiddle": "小马谜题通知",
            "riddleAlarmLimit": "小马验证警报次数",
			"ajaxRound": "启用以AJAX进入下一回合。其他脚本不支援时关闭它",
			"showCooldowns": "在快捷栏位显示冷却回合数",
			"quickbarExtend": "快捷栏",
			"showDurations": "显示状态剩余回合数",
			"showRealTimeProficiency": "即时显示目前获得的熟练度",
			"showMonsterIndex": "显示怪物索引值",
			"showMonsterInfo": "（需要安装怪物资料库脚本） 显示怪物资讯，包含类别、攻击类型与战斗力",
			"showMonsterHP": "显示怪物血量，包含目前血量与最大血量",
			"recordBattleLog": "纪录战斗日志",
			"dailyStaminaQuotaPlus": "每日额外精力",
			"ctrlWidgetStyleText": "控制元件行内样式",
			"ctrlWidgetMouseEnter": "在控制元件监听游标进入事件",
			"battleModeSettings": "战斗模式设定",
			"modes": "战斗模式",
            "battleStyle": "战斗风格",
            "battleType": "战斗类型",
            "General": "通用",
            "OneHanded": "单手",
            "1H_Mage": "单手战法师",
            "TwoHanded": "双手",
            "2H_Mage": "双手战法师",
            "DualWielding": "双持",
            "DW_Mage": "双持战法师",
            "NitenIchiryu": "二天一流",
            "NI_Mage": "二天一流战法师",
            "Staff": "法师",
            "Unarmed": "徒手",
            "Arena": "竞技场",
            "Encounter": "随机遭遇",
            "Colosseum": "浴血擂台",
            "Battle1000": "压榨界",
            "Item": "道具世界",
            "Tower": "塔楼",
			"name": "名字",
			"keyBindings": "按键绑定",
			"binding": "绑定",
			"duplicateKeys": "按键已经存在！",
			"addNewKeyBinding": "新增按键绑定",
			"recording": "记录中",
			"supports": "补给",
			"spellSupport": "辅助法术",
			"item": "物品",
			"toggle": "切换",
			"toggled": "切换",
			"stop": "停止",
			"customMessage": "显示自定义讯息",
			"clickToSelect": "点击以选择",
			"attacks": "攻击",
			"target": "目标",
			"priorityRule": "优先度规则",
			"smartDebuff": "智能减益",
			"targetCount": "法术影响的目标数",
			"bottomUp": "由下而上（从怪物J处理到怪物A）",
			"tailSkip": "忽略尾端 （正数为忽略末N个怪物；负数则只锁定前N个怪物）",
			"maxAtFirst": "二只怪物死前的最大施法次数",
			"minMonstersLeft": "无限施法的存活怪物数量阈值",
			"spellDebuff": "减益法术",
			"spellDamage": "伤害法术",
			"skill": "技能",
			"normalAttack": "普通攻击",
			"conditions": "条件",
			"world": "世界",
			"Persistent": "主世界",
			"Isekai": "异世界",
			"pLevel": "玩家等级范围",
			"battleTypes": "战斗类型",
			"Arena": "竞技场",
			"Encounter": "随机遭遇",
			"Colosseum": "浴血擂台",
			"Battle1000": "压榨界",
			"Item": "道具世界",
			"Tower": "塔楼",
			"difficulty": "难度",
			"Normal": "普通",
			"Hard": "困难",
			"Nightmare": "恶梦",
			"Hell": "地狱",
			"Nintendo": "任天堂",
			"IWBTH": "我要成为变态",
			"PFUDOR": "毛茸茸的粉红独角兽在彩虹上跳舞",
			"roundCurrent": "目前轮次范围",
			"roundLeft": "剩余轮次范围",
			"roundTotal": "总轮次范围",
			"floor": "楼层范围",
			"pActionCooldown": "玩家行动冷却范围",
			"cooldownRange": "冷却范围",
			"pActionCounts": "玩家行动次数范围",
			"usesPerRoundRange": "单轮次使用次数范围",
			"pHP": "玩家血量百分比范围",
			"pMP": "玩家魔力百分比范围",
			"pSP": "玩家灵力百分比范围",
			"pOC": "玩家斗气百分比范围",
			"pSpiritStatus": "玩家灵动状态",
			"pEffects": "玩家效果",
			"remainingTurnsRange": "剩余回合数范围",
			"pIgnoredEffects": "玩家忽略效果",
			"pEffectStacks": "玩家效果堆叠数",
			"stacksRange": "堆叠数范围",
			"monsters": "怪物数量范围",
			"activeMonsters": "怪物存活数量范围",
			"defeatedMonsters": "怪物击败数量范围",
			"bosses": "魔王数量范围",
			"activeBosses": "魔王存活数量范围",
			"defeatedBosses": "魔王击败数量范围",
			"mWithoutEffects": "怪物没有效果范围",
			"monsterCountRange": "怪物数量范围",
			"offset": "目标位移范围",
			"matched": "匹配数量范围",
			"tName": "怪物名字",
			"tTypes": "怪物类型",
			"tClasses": "怪物类别",
			"tPowerLevel": "怪物战斗力范围",
			"tIndex": "怪物索引值范围",
			"tHP": "怪物血量百分比范围",
            "tMP": "怪物魔力百分比范围",
            "tSP": "怪物灵力百分比范围",
			"tEffects": "怪物效果",
			"tIgnoredEffects": "怪物忽略效果",
			"tEffectStacks": "怪物效果堆叠数",
			"tDaysSinceUpdate": "怪物距离上次更新日数范围",
			"OneHanded_General": "单手-通用",
			"OneHanded_Tower": "单手-塔楼",
			"1H_Mage_General": "单手战法师-通用",
			"TwoHanded_General": "双手-通用",
			"2H_Mage_General": "双手战法师-通用",
			"DualWielding_General": "双持-通用",
			"DW_Mage_General": "双持战法师-通用",
			"NitenIchiryu_General": "二天一流-通用",
			"NI_Mage_General": "二天一流战法师-通用",
			"Staff_General": "法师-通用",
			"Unarmed_General": "徒手-通用",
			"Top Down": "由上而下",
			"Bottom Up": "由下而上",
			"Current HP Low to High": "目前血量值由低至高",
			"Current HP High to Low": "目前血量值由高至低",
			"Current HP Percent Low to High": "目前血量百分比由低至高",
			"Current HP Percent High to Low": "目前血量百分比由高至低",
			"Rare": "罕见",
			"Legendary": "传奇",
			"Ultimate": "终极",
			"Arena300": "竞技场300",
			"Arena400": "竞技场400",
			"Arena500": "竞技场500",
			"Arthropod": "节肢动物",
			"Avion": "飞禽",
			"Beast": "兽类",
			"Celestial": "天使",
			"Daimon": "魔鬼",
			"Dragonkin": "龙类",
			"Elemental": "元素精灵",
			"Giant": "巨人",
			"Humanoid": "类人类",
			"Mechanoid": "人形机器人",
			"Reptilian": "爬虫类",
			"Sprite": "妖精",
			"Undead": "不死族",
			"Channeling": "引导",
			"Regeneration": "再生",
			"Replenishment": "补给",
			"Refreshment": "提神",
			"Hastened": "急速",
			"Absorbing Ward": "吸收",
			"Infused Flames": "火焰附魔",
			"Infused Frost": "冰霜附魔",
			"Infused Storm": "风暴附魔",
			"Infused Lightning": "闪电附魔",
			"Infused Divinity": "神圣附魔",
			"Infused Darkness": "黑暗附魔",
			"Energized": "带劲",
			"Sleeper Imprint": "沉睡烙印",
			"Kicking Ass": "海扁",
			"Overwhelming Strikes": "压制打击",
			"Ether Tap": "以太之触",
			"Cloak of the Fallen": "陨落的披风",
			"Blessing of the RiddleMaster": "御谜士的祝福",
			"Defending": "防御",
			"Focusing": "专注",
			"Vital Theft": "生命吸窃",
			"Ether Theft": "以太吸窃",
			"Spirit Theft": "灵力吸窃",
			"Weakened": "虚弱",
			"Imperiled": "陷危",
			"Slowed": "缓慢",
			"Asleep": "沉眠",
			"Confused": "混乱",
			"Blinded": "致盲",
			"Silenced": "沉默",
			"Magically Snared": "魔磁网",
			"Immobilized": "定身",
			"Stunned": "晕眩",
			"Penetrated Armor": "破甲",
			"Bleeding Wound": "流血",
			"Spreading Poison": "流动毒性",
			"Coalesced Mana": "魔力合流",
			"Searing Skin": "烧灼的皮肤",
			"Freezing Limbs": "冰封的肢体",
			"Turbulent Air": "湍流的空气",
			"Deep Burns": "深层的烧伤",
			"Breached Defense": "崩溃的防御",
			"Blunted Attack": "钝化的攻击",
			"Burning Soul": "焚烧的灵魂",
			"Ripened Soul": "鲜美的灵魂",
			"Fury of the Sisters": "姊妹们的盛怒",
			"Lamentations of the Future": "未来的哀叹",
			"Screams of the Past": "昔日的凄叫",
			"Wails of the Present": "此刻的恸哭",
			"Attack": "攻击",
			"Spirit": "灵动",
			"Defend": "防守",
			"Focus": "专注",
			"Counter": "反击",
			"Shield Bash": "盾牌猛击",
			"Vital Strike": "要害猛击",
			"Merciful Blow": "最后的慈悲",
			"Iris Strike": "致盲打击",
			"Backstab": "暗影潜袭",
			"Frenzied Blows": "星爆气流斩",
			"Great Cleave": "蓄力重击",
			"Rending Blow": "猛龙破军击",
			"Shatter Strike": "崩山裂地击",
			"Skyward Sword": "燕返",
			"Concussive Strike": "震荡冲击",
			"Flee": "逃跑",
			"Scan": "扫描",
			"FUS RO DAH": "龙之怒吼",
			"Orbital Friendship Cannon": "轨道友情加农炮",
			"Cure": "疗伤",
			"Full-Cure": "全疗伤",
			"Regen": "细胞活化",
			"Haste": "急速",
			"Protection": "守护",
			"Absorb": "吸收",
			"Shadow Veil": "影纱",
			"Spark of Life": "生命火花",
			"Spirit Shield": "灵力盾",
			"Heartseeker": "穿心",
			"Arcane Focus": "奥术集成",
			"Mystic Gem": "神秘宝石",
			"Health Gem": "生命宝石",
			"Health Draught": "生命长效药",
			"Health Potion": "生命药水",
			"Health Elixir": "生命万能药",
			"Mana Gem": "魔力宝石",
			"Mana Draught": "魔力长效药",
			"Mana Potion": "魔力药水",
			"Mana Elixir": "魔力万能药",
			"Spirit Gem": "灵力宝石",
			"Spirit Draught": "灵力长效药",
			"Spirit Potion": "灵力药水",
			"Spirit Elixir": "灵力万能药",
			"Last Elixir": "终极万能药",
			"Infusion of Flames": "火焰魔药",
			"Infusion of Frost": "冰霜魔药",
			"Infusion of Storms": "风暴魔药",
			"Infusion of Lightning": "闪电魔药",
			"Infusion of Divinity": "神圣魔药",
			"Infusion of Darkness": "黑暗魔药",
			"Scroll of Swiftness": "迅捷卷轴",
			"Scroll of Protection": "防护卷轴",
			"Scroll of the Avatar": "化身卷轴",
			"Scroll of Absorption": "吸收卷轴",
			"Scroll of Shadows": "幻影卷轴",
			"Scroll of Life": "生命卷轴",
			"Scroll of the Gods": "神之卷轴",
			"Caffeinated Candy": "咖啡因糖果",
			"Energy Drink": "能量饮料",
			"Flower Vase": "花瓶",
			"Bubble-Gum": "泡泡糖",
			"T1": "T1",
			"T2": "T2",
			"T3": "T3",
			"Fiery Blast": "高热冲击",
			"Inferno": "地狱火",
			"Flames of Loki": "邪神战火",
			"Freeze": "冰冻",
			"Blizzard": "暴雪",
			"Fimbulvetr": "芬布尔之冬",
			"Gale": "烈风",
			"Downburst": "下击暴流",
			"Storms of Njord": "尼奥尔德神风",
			"Shockblast": "电光冲击",
			"Chained Lightning": "连锁闪电",
			"Wrath of Thor": "雷神之怒",
			"Smite": "惩戒",
			"Banishment": "放逐",
			"Paradise Lost": "失乐园",
			"Corruption": "腐败",
			"Disintegrate": "瓦解",
			"Ragnarok": "诸神黄昏",
			"Drain": "枯竭",
			"Weaken": "虚弱",
			"Imperil": "陷危",
			"Slow": "缓慢",
			"Sleep": "沉眠",
			"Confuse": "混乱",
			"Blind": "致盲",
			"Silence": "沉默",
			"MagNet": "魔磁网",
			"Immobilize": "定身",
			"exportCurrentBattleMode": "导出当前战斗模式",
			"resetCurrentBattleMode": "重置当前战斗模式",
			"battleSettings": "战斗设定",
			"saveBattleConfig": "储存战斗设定",
			"exportBattleConfig": "导出战斗设定",
			"importBattleConfig": "导入战斗设定"
		},
		"cS": {
			"basic": "基本",
			"darkMode": "深色模式",
			"combatRows": "战斗列",
			"s_pd": "物理造成伤害行内样式",
			"s_md": "魔法造成伤害行内样式",
			"s_td": "总造成伤害行内样式",
			"s_pt": "物理承受伤害行内样式",
			"s_ps": "物理灵力承受伤害行内样式",
			"s_mt": "魔法承受伤害行内样式",
			"s_ms": "魔法灵力承受伤害行内样式",
			"s_tt": "总承受伤害行内样式",
			"revenueRows": "营收列",
			"styleText": "行内样式",
			"statsColumns": "统计栏位",
			"customName": "自定义名称",
			"colorThresholds": "颜色阈值",
			"resetStatsSettings": "重置统计设定",
			"exportDB": "导出资料库",
			"importDB": "导入资料库",
			"importConfirm": "是否合并资料？\n按确定确保只新增资料（合并），或按取消来覆写已存在的资料（覆写）。",
			"statsSettings": "统计设定",
			"saveStatsConfig": "储存统计设定",
			"exportStatsConfig": "导出统计设定",
			"importStatsConfig": "导入统计设定"
		},
		"tP": {
			"turns": "回合",
			"t/s": "每秒回合数",
			"riddle": "谜语",
			"spark": "火花"
		},
		"cP": {
			"damageDealt": "造成伤害",
			"damageTaken": "承受伤害",
			"physical": "物理",
			"magical": "魔法",
			"total": "总计",
			"spirit": "灵力",
			"fire": "火",
			"cold": "冰",
			"wind": "风",
			"elec": "雷",
			"holy": "圣",
			"dark": "暗",
			"crushing": "敲击",
			"slashing": "砍击",
			"piercing": "刺击",
			"void": "虚空",
			"damagePlus": "额外伤害",
			"damageTotal": "总伤害",
			"glance": "擦伤",
			"hit": "击中",
			"crit": "暴击",
			"miss": "未击中",
			"evade": "闪避",
			"parry": "招架",
			"resist": "抵抗",
			"block": "格挡",
			"resultTotal": "总结果",
			"resist50": "抵抗50",
			"resist75": "抵抗75",
			"resist90": "抵抗90",
			"parryPartially": "部分招架",
			"resistPartially": "部分抵抗",
			"blockPartially": "部分格挡",
			"resultPartiallyTotal": "总部分结果",
			"critStack": "暴击堆叠数",
			"debuffResist": "减益抵抗",
			"debuffResist0": "减益抵抗0",
			"debuffResist1-2": "减益抵抗1-2",
			"debuffResist3": "减益抵抗3",
			"used": "已使用",
			"action": "行动",
			"item": "物品",
			"skill": "技能",
			"spellSupport": "辅助法术",
			"spellDamage": "伤害法术",
			"spellDebuff": "减益法术",
			"misc": "杂项"
		},
		"rP": {
			"revenue": "营收",
			"name": "名字",
			"drop": "掉落",
			"use": "使用",
			"balance": "结余",
			"unitPrice": "单价",
			"profit": "收益",
			"noData": "无资料",
			"exp": "经验",
			"proficiency": "熟练度",
			"credit": "钱",
			"equipment": "装备",
			"material": "材料",
			"consumable": "消耗品",
			"consumableProfit": "消耗品收益",
			"token": "令牌",
			"tokenProfit": "令牌收益",
			"food": "食物",
			"foodProfit": "食物收益",
			"figurine": "雕像",
			"figurineProfit": "雕像收益",
			"artifact": "文物",
			"artifactProfit": "文物收益",
			"trophy": "奖杯",
			"trophyProfit": "奖杯收益",
			"crystal": "水晶",
			"crystalTotal": "水晶收益",
			"totalProfit": "总收益",
			"stamina": "精力",
			"finalProfit": "最终收益",
			"one-handed weapon": "单手",
			"two-handed weapon": "双手",
			"dual wielding": "双持",
			"dual-wielding": "双持",
			"staff": "法杖",
			"cloth armor": "布甲",
			"light armor": "轻甲",
			"heavy armor": "重甲",
			"elemental magic": "元素魔法",
			"divine magic": "神圣魔法",
			"forbidden magic": "黑暗魔法",
			"supportive magic": "辅助魔法",
			"deprecating magic": "贬抑魔法",
			"Low-Grade Cloth": "低级布料",
			"Mid-Grade Cloth": "中级布料",
			"High-Grade Cloth": "高级布料",
			"Low-Grade Leather": "低级皮革",
			"Mid-Grade Leather": "中级皮革",
			"High-Grade Leather": "高级皮革",
			"Low-Grade Metals": "低级金属",
			"Mid-Grade Metals": "中级金属",
			"High-Grade Metals": "高级金属",
			"Low-Grade Wood": "低级木材",
			"Mid-Grade Wood": "中级木材",
			"High-Grade Wood": "高级木材",
			"Scrap Cloth": "废布料",
			"Scrap Leather": "废皮革",
			"Scrap Metal": "废金属",
			"Scrap Wood": "废木材",
			"Energy Cell": "能量元件",
			"Health Draught": "生命长效药",
			"Health Potion": "生命药水",
			"Health Elixir": "生命万能药",
			"Mana Draught": "魔力长效药",
			"Mana Potion": "魔力药水",
			"Mana Elixir": "魔力万能药",
			"Spirit Draught": "灵力长效药",
			"Spirit Potion": "灵力药水",
			"Spirit Elixir": "灵力万能药",
			"Last Elixir": "终极万能药",
			"Infusion of Flames": "火焰魔药",
			"Infusion of Frost": "冰霜魔药",
			"Infusion of Storms": "风暴魔药",
			"Infusion of Lightning": "闪电魔药",
			"Infusion of Divinity": "神圣魔药",
			"Infusion of Darkness": "黑暗魔药",
			"Scroll of Swiftness": "迅捷卷轴",
			"Scroll of Protection": "防护卷轴",
			"Scroll of the Avatar": "化身卷轴",
			"Scroll of Absorption": "吸收卷轴",
			"Scroll of Shadows": "幻影卷轴",
			"Scroll of Life": "生命卷轴",
			"Scroll of the Gods": "神之卷轴",
			"Voidseeker Shard": "虚空碎片",
			"Aether Shard": "以太碎片",
			"Featherweight Shard": "羽毛碎片",
			"Amnesia Shard": "失忆碎片",
			"World Seed": "世界种子",
			"Flower Vase": "花瓶",
			"Bubble-Gum": "泡泡糖",
			"Token of Blood": "混沌令牌",
			"Chaos Token": "怪物令牌",
			"Soul Fragment": "灵魂断片",
			"Monster Chow": "怪物口粮",
			"Monster Edibles": "怪物食品",
			"Monster Cuisine": "怪物料理",
			"Happy Pills": "快乐药丸",
			"Twilight Sparkle Figurine": "暮光闪闪的公仔",
			"Rainbow Dash Figurine": "云宝黛西的公仔",
			"Applejack Figurine": "苹果杰克的公仔",
			"Fluttershy Figurine": "小蝶的公仔",
			"Pinkie Pie Figurine": "萍琪的公仔",
			"Rarity Figurine": "瑞瑞的公仔",
			"Trixie Figurine": "崔克茜的公仔",
			"Princess Celestia Figurine": "塞拉斯提娅公主的公仔",
			"Princess Luna Figurine": "露娜公主的公仔",
			"Apple Bloom Figurine": "小萍花的公仔",
			"Scootaloo Figurine": "飞板露的公仔",
			"Sweetie Belle Figurine": "甜贝儿的公仔",
			"Big Macintosh Figurine": "大麦克的公仔",
			"Spitfire Figurine": "爆火的公仔",
			"Derpy Hooves Figurine": "小呆的公仔",
			"Lyra Heartstrings Figurine": "天琴心弦的公仔",
			"Octavia Figurine": "奥塔维亚的公仔",
			"Zecora Figurine": "泽科拉的公仔",
			"Cheerilee Figurine": "车厘子的公仔",
			"Vinyl Scratch Figurine": "维尼尔的公仔",
			"Daring Do Figurine": "天马无畏的公仔",
			"Doctor Whooves Figurine": "神秘博士的公仔",
			"Berry Punch Figurine": "酸梅酒的公仔",
			"Bon-Bon Figurine": "糖糖的公仔",
			"Fluffle Puff Figurine": "毛毛小马的公仔",
			"Angel Bunny Figurine": "天使兔的公仔",
			"Gummy Figurine": "甘米的公仔",
			"Precursor Artifact": "古文物",
			"ManBearPig Tail": "人熊猪的尾巴",
			"Holy Hand Grenade of Antioch": "安提阿的神圣手榴弹",
			"Mithra's Flower": "猫人族的花",
			"Dalek Voicebox": "戴立克音箱",
			"Lock of Blue Hair": "一绺蓝发",
			"Bunny-Girl Costume": "兔女郎装",
			"Hinamatsuri Doll": "雏人形",
			"Broken Glasses": "破碎的眼镜",
			"Black T-Shirt": "黑色Ｔ恤",
			"Sapling": "树苗",
			"Unicorn Horn": "独角兽的角",
			"Noodly Appendage": "面条般的附肢",
			"Crystal of Vigor": "力量水晶",
			"Crystal of Finesse": "灵巧水晶",
			"Crystal of Swiftness": "敏捷水晶",
			"Crystal of Fortitude": "体质水晶",
			"Crystal of Cunning": "智力水晶",
			"Crystal of Knowledge": "感知水晶",
			"Crystal of Flames": "火焰水晶",
			"Crystal of Frost": "冰冷水晶",
			"Crystal of Tempest": "风暴水晶",
			"Crystal of Lightning": "闪电水晶",
			"Crystal of Devotion": "神圣水晶",
			"Crystal of Corruption": "黑暗水晶"
		},
		"sP": {
			"jpxStats": "jpx 战斗统计",
			"Aggregate by Day": "按日汇总",
			"Persistent": "主世界",
			"Isekai": "异世界",
			"Arena": "竞技场",
			"Encounter": "随机遭遇",
			"Colosseum": "浴血擂台",
			"Battle1000": "压榨界",
			"Item": "道具世界",
			"Tower": "塔楼",
			"Victory": "胜利",
			"Defeat": "战败",
			"Flee": "逃跑",
			"drop": "掉落",
			"use": "使用",
			"Total": "总计",
			"Average": "平均",
			"date": "日期",
			"world": "世界",
			"level": "等级",
			"persona": "人格",
			"battleType": "战斗模式",
			"round": "轮次",
            "roundTotal": "总轮次范围",
			"deltaTime": "用时",
			"turns": "回合数",
            "riddle": "谜题次数",
			"tps": "每秒回合数",
			"finalProfit": "最终收益",
			"credit": "钱",
			"staminaCost": "精力消耗",
			"totalProfit": "总收益",
			"pDGlance": "物攻擦伤",
			"pDHit": "物攻击中",
			"pDCrit": "物攻暴击",
			"mDGlance": "魔攻擦伤",
			"mDHit": "魔攻击中",
			"mDCrit": "魔攻暴击",
			"mDRes": "魔攻抵抗",
			"mDRes50": "魔攻抵抗50",
			"mDRes75": "魔攻抵抗75",
			"mDRes90": "魔攻抵抗90",
			"mDResP": "魔攻部分抵抗",
			"mDDRes0": "减益抵抗0",
			"mDDRes12": "减益抵抗1-2",
			"mDDRes3": "减益抵抗3",
			"uCure": "治疗",
			"uFullCure": "完全治疗",
			"uCloakOfTheFallen": "火花",
			"uImperil": "陷危",
			"eqP": "无双",
			"eqL": "传奇",
			"eqM": "史诗",
			"cha": "怪物令牌",
			"blo": "混沌令牌",
			"food": "食物",
			"fig": "雕像",
			"arti": "古遗物",
			"crys": "水晶",
			"t2": "奖杯2",
			"t36": "奖杯36",
			"lCharm": "小护符",
			"gCharm": "大护符",
			"seed": "种子",
			"hd": "生命长效药",
			"md": "魔力长效药",
			"sd": "灵力长效药",
			"hp": "生命药水",
			"mp": "魔力药水",
			"sp": "灵力药水",
			"he": "生命万能药",
			"me": "魔力万能药",
			"se": "灵力万能药",
			"le": "终极万能药",
			"swif": "迅捷卷轴",
			"prot": "防护卷轴",
			"avat": "化身卷轴",
			"abso": "吸收卷轴",
			"shad": "幻影卷轴",
			"life": "生命卷轴",
			"gods": "神之卷轴"
		}
	};
    return i18n;
})();
const mergedI18N = {};

function initDo() {
    let style = document.createElement('style');
    style.id = 'jpx';
    style.textContent = cfg.styleText;
    document.head.appendChild(style);

    window.addEventListener('beforeunload', storeTmp);
    document.addEventListener('pointerdown', (e) => {
        if (!e.target.closest('.jpx-select-host')) closeJpxSelectPanels();
        if (!e.target.closest('.multiSelect-popup-panel') && !e.target.classList.contains('multiSelect-summary')) {
            closeMultiSelectPanels();
        }
    });
    document.addEventListener('scroll', () => {
        closeJpxSelectPanels();
        closeMultiSelectPanels();
    }, true);
    const throttledActionManager = jpxUtils.throttle(actionManager, 75);
    document.addEventListener('keydown', (e) => onKeyDown(e, throttledActionManager), true);

    initDoI18n();

    let queries = location.search.match(regExp.locationQueries) || [];
    let queriesObj = Object.fromEntries(queries.map(
        (query) => {
            return query.split('=', 2);
        }
    ));
    log = document.querySelector('#textlog');

    if (log) jpxPanelManager.removeSettingsLauncher();
    else jpxPanelManager.ensureSettingsLauncher();

    ensureBattleCfgLoaded();
    syncNativeDialogGuard();

    //Battle
    if (log && !doInitDoBattle) {
        initDoBattle();
        return;
    }

    //Riddle
    if (document.querySelector('#riddlemaster')) {
        riddleRecorder();
        return;
    }

    //Lobby
    if (!log) {
        let difficulty = localStorage.getItem(prefix + 'difficulty' + isekaiSuffix) || 'undefined';
        let playerLevel = parseInt(localStorage.getItem(prefix + 'playerLevel' + isekaiSuffix)) || 0;
        let persona = localStorage.getItem(prefix + 'persona' + isekaiSuffix) || 'undefined';
        let stamina = parseFloat(localStorage.getItem(prefix + 'stamina' + isekaiSuffix)) || 80;

        if (queriesObj.s === 'Battle') {
            let levelReadout = document.querySelector('#level_readout > div > div')?.innerText;
            let playerInfo = levelReadout.match(regExp.playerInfo);
            if (playerInfo) {
                if (difficulty != playerInfo[1]) {
                    localStorage.setItem(prefix + 'difficulty' + isekaiSuffix, playerInfo[1]);
                }
                if (playerLevel != playerInfo[1]) {
                    localStorage.setItem(prefix + 'playerLevel' + isekaiSuffix, playerInfo[2]);
                }
            }
            let staminaReadout = document.querySelector('#stamina_readout > div > div')?.innerText;
            let staminaInfo = staminaReadout.match(regExp.staminaInfo)?.[1];
            if (staminaInfo && stamina != staminaInfo) {
                localStorage.setItem(prefix + 'stamina' + isekaiSuffix, staminaInfo);
            }
        }

        let personaSelected = document.querySelector('#persona_form > select > option[selected]')?.innerText;
        if (personaSelected && persona != personaSelected) {
            localStorage.setItem(prefix + 'persona' + isekaiSuffix, personaSelected);
        }

        let spcArray = Array.from(document.querySelectorAll('.spc'));
        let spellDamageBonus = spcArray.find(spc =>
            spc.innerText.includes('Spell Damage Bonus') || jpxUtils.parseHVClasses(spc.querySelector('div')).includes('Spell Damage Bonus')
        );
        if (spellDamageBonus) {
            if (!isekaiSuffix) {
                let spellDamageBonusArray = Array.from(spellDamageBonus.nextElementSibling.children);
                let maxValue = -Infinity;
                let maxType = '';

                for (let i = 0; i < spellDamageBonusArray.length; i += 2) {
                    let value = parseFloat(spellDamageBonusArray[i].innerText || jpxUtils.parseHVClasses(spellDamageBonusArray[i].querySelector('div')));
                    let spellsDamageType = (spellDamageBonusArray[i + 1].innerText || jpxUtils.parseHVClasses(spellDamageBonusArray[i + 1].querySelector('div'))).match(/[A-Za-z]+/)?.[0];

                    if (value > maxValue) {
                        maxValue = value;
                        maxType = jpxUtils.lowerFirst(spellsDamageType);
                    }
                }

                if (
                    (maxType && spellDamageBonus.maxType != maxType) ||
                    (maxValue > 0 && spellDamageBonus.maxValue != maxValue)
                ){
                    localStorage.setItem(prefix + 'spellDamageBonus' + isekaiSuffix, JSON.stringify({
                        maxType: maxType,
                        maxValue: maxValue,
                    }));
                }
            /*isekai911*/
            } else {
                let table = spellDamageBonus.nextElementSibling;
                let rows = table.querySelectorAll('tr');
                let maxValue = -Infinity;
                let maxType = "";

                rows.forEach((tr) => {
                    let tds = tr.querySelectorAll('td');
                    if (tds.length < 2) {
                        return;
                    }

                    let value = parseFloat(tds[0].textContent.trim());
                    let spellsDamageType = tds[1].textContent.trim();

                    if (value > maxValue) {
                        maxValue = value;
                        maxType = jpxUtils.lowerFirst(spellsDamageType);
                    }
                });

                if (
                    (maxType && spellDamageBonus.maxType != maxType) ||
                    (maxValue > 0 && spellDamageBonus.maxValue != maxValue)
                ) {
                    localStorage.setItem(prefix + 'spellDamageBonus' + isekaiSuffix, JSON.stringify({
                        maxType: maxType,
                        maxValue: maxValue,
                    }));
                }
            }
            /*isekai912*/
        }

        return;
    }
}

function initDoBattle() {
    doInitDoBattle = true;
    loadAutoBattleState();
    syncNativeDialogGuard();

    document.addEventListener('DOMContentLoaded', (event) => {
        if (document.querySelector('#riddlemaster')) {
            riddleRecorder();
            return;
        }

		loadAutoBattleState();
		syncNativeDialogGuard();
		jpxPanelManager.ready = false;
        monsterData = [];
        localStorage.removeItem(prefix + 'monsterData' + isekaiSuffix);
        allMonsterInfo = {};
        actionCounts = {};
        monstersEffects = {};
        log = document.querySelector('#textlog');
        log && preDoBattle();
        jpxPanelManager.setBackground(isActiveBattle ? 'active' : 'idle');
        jpxPanelManager.dispatchState();
    });

    ensureBattleCfgLoaded();

    if (cfgBattle.recordBattleLog) {
        battleLogRecord = JSON.parse(localStorage.getItem(prefix + 'battleLogRecord' + isekaiSuffix) || '[]');
    }
    timeRecords = JSON.parse(localStorage.getItem(prefix + 'timeRecords' + isekaiSuffix) || '{}');
    if (jpxUtils.isEmpty(timeRecords)) timeRecords = jpxUtils.createTimeRecords();
    combatRecords = JSON.parse(localStorage.getItem(prefix + 'combatRecords' + isekaiSuffix) || '{}');
    if (jpxUtils.isEmpty(combatRecords)) combatRecords = jpxUtils.createCombatRecords();
    revenueRecords = JSON.parse(localStorage.getItem(prefix + 'revenueRecords' + isekaiSuffix) || '{}');
    if (jpxUtils.isEmpty(revenueRecords)) revenueRecords = jpxUtils.createRevenueRecords();

    //Battle Style
    let {
        spellCooldowns
    } = getActionCooldowns();
    let spells = Object.keys(spellCooldowns);
    if (spells.includes('Shield Bash')) {
        battleStyle = spellDamageBonus.maxValue <= 100 ? 'OneHanded' : '1H_Mage';
    } else if (spells.includes('Great Cleave')) {
        battleStyle = spellDamageBonus.maxValue <= 100 ? 'TwoHanded' : '2H_Mage';
    } else if (spells.includes('Iris Strike')) {
        battleStyle = spellDamageBonus.maxValue <= 100 ? 'DualWielding' : 'DW_Mage';
    } else if (spells.includes('Skyward Sword')) {
        battleStyle = spellDamageBonus.maxValue <= 100 ? 'NitenIchiryu' : 'NI_Mage';
    } else if (spells.includes('Concussive Strike')) {
        battleStyle = 'Staff';
    } else {
        battleStyle = 'Unarmed';
    }

    //Battle Type
    let battleTypeLog = log.innerHTML.match(regExp.battleTypeLog);
    if (battleTypeLog) {
        if (battleTypeLog[1].includes('arena challenge') && !battleTypeLog[1].includes('Round 1 / 1)')) {
            battleType = 'Arena';
        } else if (battleTypeLog[1].includes('random encounter')) {
            battleType = 'Encounter';
        } else if (battleTypeLog[1].includes('arena challenge') && battleTypeLog[1].includes('Round 1 / 1)')) {
            battleType = 'Colosseum';
        } else if (battleTypeLog[1].includes('Grindfest')) {
            battleType = 'Battle1000';
        } else if (battleTypeLog[1].includes('Item World')) {
            battleType = 'Item';
        } else if (battleTypeLog[1].includes('The Tower')) {
            battleType = 'Tower';
            let floor = battleTypeLog[1].match(regExp.floor);
            if (floor) {
                towerFloor = floor[1];
            }
        }
    }
    if (battleType) {
        localStorage.setItem(prefix + 'battleType' + isekaiSuffix, battleType);
    } else {
        battleType = localStorage.getItem(prefix + 'battleType' + isekaiSuffix) || '';
    }

    //Tower Floor
    if (battleType === 'Tower') {
        if (towerFloor) {
            localStorage.setItem(prefix + 'towerFloor' + isekaiSuffix, towerFloor);
        } else {
            towerFloor = parseInt(localStorage.getItem(prefix + 'towerFloor' + isekaiSuffix)) || 0;
        }
    }

    preDoBattle();
}

function preDoBattle() {
    //Round
    let round = log.innerHTML.match(regExp.round);
    let storedRoundInfo = JSON.parse(localStorage.getItem(prefix + 'roundInfo' + isekaiSuffix) || '{}');
    if (battleType !== 'Encounter') {
        if (round) {
            roundInfo.current = +round[1];
            roundInfo.total = +round[2];
            localStorage.setItem(prefix + 'roundInfo' + isekaiSuffix, JSON.stringify(roundInfo));
        } else {
            roundInfo.current = storedRoundInfo.current || 0;
            roundInfo.total = storedRoundInfo.total || 0;
        }
    }

    //Proficiency Record
    if (cfgBattle.showRealTimeProficiency) {
        let proficiencyRecord = document.querySelector('#proficiency-record');
        if (!proficiencyRecord) {
            proficiencyRecord = document.createElement('table');
            proficiencyRecord.id = 'proficiency-record';
            document.querySelector('#csp').appendChild(proficiencyRecord);
        }

        let proficiencyKeys = Object.keys(revenueRecords.proficiency);
        if (proficiencyKeys.length) {
            let innerHTMLTemp = '';
            let order = REVENUE_FIELDS.find(f => f.id === 'proficiency').order;
            let sortedKeys = jpxUtils.getSortedKeys(order, proficiencyKeys);
            for (const sortedKey of sortedKeys) {
                let value = revenueRecords.proficiency[sortedKey];
                if (value) innerHTMLTemp += `<tr><td>${Math.round(value * 1000) / 1000}</td><td>${t(`rP.${sortedKey}`)}</td></tr>`;
            }
            proficiencyRecord.innerHTML = `<tbody>${innerHTMLTemp}</tbody>`;
        }
    }

    //Monster Data
    let matches;
    while ((matches = regExp.monster.exec(log.innerHTML)) !== null) {
        monsterData.unshift({
            id: +matches[1],
            name: matches[2],
            level: +matches[3],
            maxHP: +matches[4],
        });
    }
    let storedMonsterData = JSON.parse(localStorage[prefix + 'monsterData' + isekaiSuffix] || '[]');
    if (monsterData.length) {
        localStorage.setItem(prefix + 'monsterData' + isekaiSuffix, JSON.stringify(monsterData));
    } else if (storedMonsterData) {
        monsterData = storedMonsterData;
    }

    updateMonsterInfo();

    //Riddle
    if (log.textContent.includes('You gain the effect Blessing of the RiddleMaster.')) {
        markRiddleTriggered();
    }

    jpxPanelManager.createCtrlWidget('battle');

    let throttledPreProcessLog = jpxUtils.throttle(preProcessLog, 200, true);
    let obs = new MutationObserver(throttledPreProcessLog);
    obs.observe(log.firstChild, { childList: true });

    preRender();
}

function preProcessLog() {
    lastActionTimestamp = lastLogTimestamp;
    lastLogTimestamp = Date.now();

    let td = Array.from(log.getElementsByTagName('td'));
    for (let i = 0; i < td.length; i++) {
        if (td[i].className == 'tls') td[i].innerHTML = '<hr>';
    }

    battleRecorder();

    let btcp = document.querySelector('#btcp');
    let finishBattle = document.querySelector('img[src$="finishbattle.png"]');
    if (btcp) {
        localStorage.removeItem(prefix + 'monsterData' + isekaiSuffix);

        if (finishBattle) {
            if (btcp.dataset.jpxResultHandled === '1') return;
            btcp.dataset.jpxResultHandled = '1';

            btcp.setAttribute('style', 'display: block; width: max-content; min-width: 380px; max-width: 530px; height: auto; min-height: 120px; max-height: 621px; overflow: auto;');

            battleRecordPlayer()
                .catch(err => console.error('Failed to finalize battle record:', err))
                .finally(() => {
                    localStorage.removeItem(prefix + 'battleLogRecord' + isekaiSuffix);
                    localStorage.removeItem(prefix + 'timeRecords' + isekaiSuffix);
                    localStorage.removeItem(prefix + 'combatRecords' + isekaiSuffix);
                    localStorage.removeItem(prefix + 'revenueRecords' + isekaiSuffix);

                    if (cfgBattle.autoFinishBattle) {
                        setTimeout(() => {
                            if (document.contains(btcp)) btcp.click();
                        }, 50);
                    }
                });

            return;
        }
    }

    preRender();
}

function preRender() {
    ({ spellCooldowns, itemCooldowns } = getActionCooldowns(true));
    vitals = getVitals();
    spiritStatus = getSpiritStatus();
    monstersObj = getMonsters(true);

    let { monsters, activeMonsters } = monstersObj;

    //Monster Effects
    updateMonsterEffects();

    //Player Effects and Render All
    playerEffectsObj = getEffectDuration(cfgBattle.showDurations);

    //Monster HP
    if (cfgBattle.showMonsterHP) {
        for (let i = 0; i < monsters.length; i++) {
            if (!monsterData[i]) break;
            if (monsters[i].hpPercentage) {
                let maxHP = monsterData[i].maxHP;
                let hpDiv = document.createElement('div');
                hpDiv.className = 'monster-hp';
                hpDiv.innerText = 'HP: ' + Math.round(maxHP * monsters[i].hpPercentage).toLocaleString() + ' / ' + maxHP.toLocaleString();
                monsters[i].monster_btm1.style.position = 'relative';
                monsters[i].monster_btm1.appendChild(hpDiv);
            }
        }
    }

    jpxPanelManager.updateContent('battle');

    goNext();
}

function goNext() {
    if (isActiveBattle) {
        jpxPanelManager.setBackground('active');

        //End of Round
        let btcp = document.querySelector('#btcp');
        let finishBattle = document.querySelector('img[src$="finishbattle.png"]');
        if (!monstersObj.activeMonsters[0]) {
            if (cfgBattle.advanceToNextRound && btcp && !finishBattle) {
                btcp.click();
                btcp.style.visibility = 'hidden';
            }
            return;
        }

        switch (readyNext) {
            case -1:
                break;
            default:
                readyNext = -1;
                setTimeout(() => {
                    smartBattle();
                }, 0);
                break;
        }
    }
}

function triggerNativeClickById(id) {
    if (!log) return false;
    const target = document.getElementById(id);
    if (!target || typeof target.click !== 'function') return false;
    target.click();
    return true;
}

const keybindHandlers = {
    openBattleRecords: () => {
        openBattleRecords();
        return true;
    },
    toggleActive: () => {
        if (!log) return false;
        toggleActive();
        return true;
    },
    openSettings: () => {
        renderSettings();
        return true;
    },

    nativeAttack: () => triggerNativeClickById('ckey_attack'),
    nativeSkillbook: () => triggerNativeClickById('ckey_skill'),
    nativeItemsPane: () => triggerNativeClickById('ckey_items'),
    nativeSpirit: () => triggerNativeClickById('ckey_spirit'),
    nativeDefend: () => triggerNativeClickById('ckey_defend'),
    nativeFocus: () => triggerNativeClickById('ckey_focus'),
    nativeRecast: () => {
        if (!log) return false;
        const nativeBattle = window.battle;
        if (!nativeBattle || typeof nativeBattle.recast !== 'function') return false;
        nativeBattle.recast();
        return true;
    },
};

for (let slot = 1; slot <= 10; slot++) {
    keybindHandlers[`nativeQuickbar${slot}`] = () => triggerNativeClickById(`qb${slot}`);
}

keybindHandlers.nativeItemP = () => triggerNativeClickById('ikey_p');

for (let slot = 1; slot <= 15; slot++) {
    keybindHandlers[`nativeItem${slot}`] = () => triggerNativeClickById(`ikey_${slot}`);
}

for (let slot = 1; slot <= 6; slot++) {
    keybindHandlers[`nativeItemShift${slot}`] = () => triggerNativeClickById(`ikey_s${slot}`);
    keybindHandlers[`nativeItemCtrl${slot}`] = () => triggerNativeClickById(`ikey_n${slot}`);
}

function onKeyDown(e, throttledActionManager) {
    if (jpxUtils.keyCaptureController) return;

    let target = e.target;
    if (
        e.isComposing ||
        (target instanceof HTMLInputElement && !target.readOnly && !target.disabled) ||
        (target instanceof HTMLTextAreaElement && !target.readOnly && !target.disabled) ||
        target.isContentEditable
    ) return;
    
    let currentKB = 'kb_' + jpxUtils.formatKeyCombo({
        key: e.key,
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey
    }, '+');

    if (!e.repeat) {
        for (const [action, bind] of Object.entries(userKeybinds)) {
            if (currentKB === ('kb_' + jpxUtils.formatKeyCombo(bind, '+'))) {
                const handled = keybindHandlers[action]?.() || false;
                if (handled) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }
        
    if (!log || isActiveBattle || !monstersObj.activeMonsters[0]) return;
    let actions = cfgBattle[getBattleMode()][currentKB];
    if (actions) {
        e.preventDefault();
        (e.repeat ? throttledActionManager : actionManager)(actions);        
    }
}

function toggleActive() {
    if (!log) return;
    isActiveBattle = !isActiveBattle;
    saveAutoBattleState();
    syncNativeDialogGuard();
    jpxPanelManager.updateContent('battle');
    jpxPanelManager.setBackground(isActiveBattle ? 'active' : 'idle');
    if (isActiveBattle) goNext();
    jpxPanelManager.dispatchState();
}

function applyBattleSettingsImmediately() {
    syncNativeDialogGuard();

    if (!log) return;

    jpxPanelManager.updateContent('battle');
    jpxPanelManager.setBackground(isActiveBattle ? 'active' : 'idle');
    if (isActiveBattle && monstersObj?.activeMonsters) goNext();
    jpxPanelManager.dispatchState();
}

//Battle Smart
function smartBattle() {
    let { supports, attacks } = cfgBattle[getBattleMode()];
    if (supports.length < 1) {
        readyNext = '\nWith so few conditions, you might die in auto-battle.';
        jpxPanelManager.updateContent('battle');
        jpxPanelManager.setBackground('warn');
        return true;
    }
    if (actionManager(supports)) return true;
    if (actionManager(attacks)) return true;
    readyNext = '\nNo available action.';
    jpxPanelManager.updateContent('battle');
    jpxPanelManager.setBackground('warn');

    return false;
}

//Battle Utils
function doSpellsDebuffGoNext({name, targetCount = 3, tailSkip = 0, bottomUp = false, maxAtFirst = Infinity, minMonstersLeft = 10, conditions}) {
    let { monsters, activeMonsters } = monstersObj;

    if (spellCooldowns[name] !== 0) return false;

    let maxDo = 0;
    if (monsters.length - activeMonsters.length <= 1) {
        maxDo = maxAtFirst;
    } else if (activeMonsters.length <= minMonstersLeft) {
        maxDo = Infinity;
    }
    if ((actionCounts[name] ?? 0) >= maxDo) return false;

    let startIndex = 0;
    let endIndex = 0;
    let firstIndex = activeMonsters[0].index;
    let lastIndex = activeMonsters.at(-1).index;
    let dir = !bottomUp ? 1 : -1;
    if (!bottomUp) {
        startIndex = firstIndex;
        endIndex = tailSkip >= 0
            ? lastIndex + 1 - tailSkip
            : startIndex + Math.abs(tailSkip);
    } else {
        startIndex = monsters.length - 1 - lastIndex;
        endIndex = tailSkip >= 0
            ? monsters.length - (firstIndex + tailSkip)
            : startIndex + Math.abs(tailSkip);
    }
    endIndex = Math.min(endIndex, monsters.length);
    if (endIndex <= 0) return false;

    let undebuffedObj = {};
    const isUnDebuffed = (i) => {
        return undebuffedObj[i] ??= (
            !!monsters[i]?.isAlive &&
            checkConditions(conditions, monsters[i], false)
        );
    };
    const getIndex = (j) => !bottomUp ? j : monsters.length - 1 - j;

    if (targetCount >= 3) {
        for (let i = startIndex + 1; i < endIndex - 1; i++) {
            let j = getIndex(i);
            if (!isUnDebuffed(j - 1) || !isUnDebuffed(j) || !isUnDebuffed(j + 1)) continue;
            doSpellGoNext(name, monsters[j]);
            return true;
        }
    }
    if (targetCount >= 2) {
        for (let i = startIndex; i < endIndex; i++) {
            let j = getIndex(i);
            if (!isUnDebuffed(j - 1) || !isUnDebuffed(j)) continue;
            if ((targetCount === 2 && !bottomUp || targetCount === 3) && i === startIndex && monsters[j + dir]?.isAlive) {
                doSpellGoNext(name, monsters[j + dir]);
            } else if ((targetCount === 2 && bottomUp || targetCount === 3) && i === endIndex - 1 && monsters[j - dir]?.isAlive) {
                doSpellGoNext(name, monsters[j - dir]);
            } else {
                doSpellGoNext(name, monsters[j]);
            }
            return true;
        }
    }
    if (targetCount >= 3) {
        for (let i = startIndex + 1; i < endIndex - 1; i++) {
            let j = getIndex(i);
            if (!isUnDebuffed(j - 1) || !monsters[j]?.isAlive || !isUnDebuffed(j + 1)) continue;
            doSpellGoNext(name, monsters[j]);
            return true;
        }
    }
    for (let i = startIndex; i < endIndex; i++) {
        let j = getIndex(i);
        if (!isUnDebuffed(j)) continue;
        if ((targetCount === 2 && !bottomUp || targetCount === 3) && i === startIndex && monsters[j + dir]?.isAlive) {
            doSpellGoNext(name, monsters[j + dir]);
        } else if ((targetCount === 2 && bottomUp || targetCount === 3) && i === endIndex - 1 && monsters[j - dir]?.isAlive) {
            doSpellGoNext(name, monsters[j - dir]);
        } else {
            doSpellGoNext(name, monsters[j]);
        }
        return true;
    }

    return false;
}

function doSpellGoNext(spell, monster) {
    readyNext = 0;
    if (monster.isAlive && spellCooldowns[spell] === 0) {
        cast(spell);
        monster.click();
        return true;
    }
    return false;
}

function doAttackGoNext(monster) {
    readyNext = 0;
    if (monster.isAlive) {
        monster.click();
        return true;
    }
    return false;
}

function doToggleGoNext(name) {
	readyNext = 0;
    let state = document.querySelector('#ckey_' + name.toLowerCase());
    if (state) {
        dummy.setAttribute('onclick', state.getAttribute('onmouseover'));
        dummy.click();
        state.click();
		return true;
    }
	return false;
}

function cast(name) {
    let spell = document.querySelector('.bts > div[onclick][onmouseover*="\'' + name + '\'"]');
    if (document.getElementsByClassName('btii')[0].innerHTML != name && spell) {
        dummy.setAttribute('onclick', spell.getAttribute('onmouseover'));
        dummy.click();
        spell.click();
    }
}

function use(name) {
    let id = Object.entries(itemMap).find(([id, _name]) => _name === name)?.[0];
    if (!id) return;

    let itemArray = Array.from(document.querySelectorAll('.bti3 > div[onclick][onmouseover]'));
    let item = itemArray.find(div => div.outerHTML.includes(id));
    if (item) {
        dummy.setAttribute('onclick', item.getAttribute('onmouseover'));
        dummy.click();
        item.click();
    }
}

function getActionCooldowns(render = false) {
    let quickbarObj = {};

    function scan({selector, regexp, getName, getInitlCooldown}) {
        let result = {};

        for (const slot of document.querySelectorAll(selector)) {
            let tooltip = slot.getAttribute('onmouseover');
            let matches = tooltip?.match(regexp);

            let name;
            if (matches) {
                name = getName(matches);
            } else {
                name = slot.textContent?.trim() || jpxUtils.parseHVClasses(slot.querySelector('div'), true);
            }
            if (!name) continue;

            let cooldown;
            let onClick = slot.getAttribute('onclick');
            if (onClick) {
                cooldown = 0;
                result[name] = 0;
            } else {
                let lastUse = timeRecords.lastUse[name] ?? -Infinity;
                let initCooldown = getInitlCooldown(matches) ?? 0;
                cooldown = lastUse + initCooldown - timeRecords.turn;

                result[name] = cooldown > 0 ? cooldown : '-';
            }

            if (!render) continue;
            if (slot.id === 'ikey_p') {
                quickbarObj.ikey_p = {
                    name,
                    tooltip,
                    onClick,
                    cooldown,
                };
            } else {
                quickbarObj[name] = {
                    tooltip,
                    onClick,
                    cooldown,
                };
            }
        }

        return result;
    }

    function getQuickName(quick) {
        if (quick.id?.startsWith('extend_')) return quick.id.slice(7);

        let tooltip = quick.getAttribute('onmouseover');
        if (!tooltip) return;

        return tooltip.match(regExp.spellInfo)?.[1];
    }

    function renderQuickbar() {
        let quickbar = document.querySelector('#quickbar');

        for (const name of cfgBattle.quickbarExtend) {
            let quickDiv = document.createElement('div');
            quickDiv.id = `extend_${name}`;
            quickDiv.className = 'btqs extend';

            if (quickbarObj[name]) {
                let innerImg = document.createElement('img');

                let tooltip = quickbarObj[name].tooltip;
                quickDiv.setAttribute('onmouseover', tooltip ? tooltip : '');

                let onClick = quickbarObj[name].onClick;
                if (onClick) quickDiv.setAttribute('onclick', onClick);
                else innerImg.style.outline = '1px solid #7f6a45';

                let spellIconID = tooltip?.match(regExp.spellInfo)?.[2];
                if (spellIconID) innerImg.src = '/y/a/' + spellIconID + '.png';
                else innerImg.src = itemSrc.find(rule => rule.keys.some(key => {
                    if (name === 'ikey_p') return quickbarObj[name].name.includes(key);
                    return name.includes(key);
                }))?.src ?? '/y/e/channeling.png';

                innerImg.className = 'btqi';
                quickDiv.appendChild(innerImg);
            }

            let outerImg = document.createElement('img');
            outerImg.src = '/y/ab/b.png';
            outerImg.className = 'btqb';
            quickDiv.appendChild(outerImg);
            quickbar.appendChild(quickDiv);
        }

        showCooldowns(quickbar);
    }

    function showCooldowns(quickbar) {
        if (!cfgBattle.showCooldowns) return;

        for (const quick of quickbar.querySelectorAll('.btqs[onmouseover]:not([onclick])')) {
            let name = getQuickName(quick);
            if (!name) continue;

            let cooldown = quickbarObj[name].cooldown;
            if (!(cooldown > 0)) continue;

            quick.style.position = 'relative';
            quick.style.overflow = 'hidden';
            let cooldownDiv = document.createElement('div');
            cooldownDiv.className = 'cooldown';
            cooldownDiv.textContent = cooldown;
            quick.appendChild(cooldownDiv);
        }
    }

    let spellCooldowns = scan({
        selector: '.bts > div[onmouseover]',
        regexp: regExp.spellInfo,
        getName: m => m[1],
        getInitlCooldown: m => m ? +m[5] : 0
    });

    let itemCooldowns = scan({
        selector: '.bti3 > div',
        regexp: regExp.itemInfo,
        getName: m => itemMap[+m[1]],
        getInitlCooldown: () => 40
    });

    if (render) renderQuickbar();

    return {
        spellCooldowns,
        itemCooldowns
    };
}

function getVitals() {
    let ocBar = document.querySelector('img[src$="bar_orange.png"]');

    let vitalCfg = ocBar ? {
        widthHP: 414, widthMP: 414, widthSP: 414, widthOC: 414,
        idHP: ['#dvrhb', '#dvrhd'], idMP: '#dvrm', idSP: '#dvrs',
    } : {
        widthHP: 496, widthMP: 207, widthSP: 207,
        idHP: ['#vrhb', '#vrhd'], idMP: '#vrm', idSP: '#vrs',
    };

    let oc = 0;
    if (ocBar) {
        let ocPercentage = parseInt(ocBar.style.width, 10) / vitalCfg.widthOC;
        oc = Math.round(10 * ocPercentage * 1000) / 1000;
    } else {
        let vcp = document.querySelector('#vcp')?.innerHTML;
        if (vcp) {
            let matches = vcp.match(regExp.oc);
            if (matches) {
                oc = matches.length / 2 - 1;
                if (vcp.match(regExp.ocHalf)) {
                    oc -= 0.5;
                }
            }
        }
    }

    let hpPercentage = Math.round(parseInt(document.querySelector('img[src$="green.png"]').style.width, 10) / vitalCfg.widthHP * 1000) / 1000;
    let mpPercentage = Math.round(parseInt(document.querySelector('img[src$="bar_blue.png"]').style.width, 10) / vitalCfg.widthMP * 1000) / 1000;
    let spPercentage = Math.round(parseInt(document.querySelector('img[src$="bar_red.png"]').style.width, 10) / vitalCfg.widthSP * 1000) / 1000;

    let hpCurrentText = vitalCfg.idHP.map(id => document.querySelector(id)?.innerText).find(Boolean) || "0";
    let hpCurrent = parseInt(hpCurrentText, 10) || 0;
    let mpCurrent = parseInt(document.querySelector(vitalCfg.idMP).innerText, 10);
    let spCurrent = parseInt(document.querySelector(vitalCfg.idSP).innerText, 10);

    let hpMax = Math.round(hpCurrent / hpPercentage * 1000) / 1000;
    let mpMax = Math.round(mpCurrent / mpPercentage * 1000) / 1000;
    let spMax = Math.round(spCurrent / spPercentage * 1000) / 1000;

    return {
        oc,
        hpPercentage, mpPercentage, spPercentage,
        hpCurrent, mpCurrent, spCurrent,
        hpMax, mpMax, spMax,
    }
}

function getSpiritStatus() {
    let ckey_spirit = document.querySelector('#ckey_spirit');
    let spiritStatus = ckey_spirit.outerHTML.includes('spirit_a.png');
    return spiritStatus;
}

function getEffectDuration(render = false) {
    let playerEffectObj = {};
    let effectsPane = document.querySelector('#pane_effects');
    let effects = Array.from(effectsPane.getElementsByTagName('img'));
    let playerEffectsLength = effects.length;

    if (render) effects.push(...document.querySelectorAll('.btm6 > img[onmouseover]'));

    effects.forEach((effect, index) => {
        let tooltip = effect.getAttribute('onmouseover');
        if (!tooltip) return;

        let matches = tooltip.match(regExp.spellMatch);
        if (!matches?.groups) return;

        let { name, stack, description, turns } = matches.groups;
        if (index < playerEffectsLength && name) playerEffectObj[name] = { turns, stack: stack ?? 1 };

        if (render) {
            let displayTurns = turns;
            let durationContainer = document.createElement('div');
            durationContainer.className = 'effect-duration';
            let durationDiv = document.createElement('div');
            if (turns < 9) {
                durationDiv.style.background = turns < 4
                    ? readThemeColorVar('--jpx-duration-critical', 'aquamarine')
                    : readThemeColorVar('--jpx-duration-low', 'lavender');
            } else if (turns === 'autocast') {
                displayTurns = 'auto';
            } else if (turns === 'permanent') {
                displayTurns = decodeURIComponent('%E2%88%9E');
            /*isekai911*/
            } else if (turns === 'decaying') {
                displayTurns = '';
            /*isekai912*/
            } else if (turns === '-') {
                displayTurns = '-';
            }

            durationDiv.innerHTML = displayTurns;
            if (stack) durationDiv.innerHTML += `${turns !== 'decaying' ? '&nbsp;' : ''}x${stack}`;

            durationContainer.appendChild(durationDiv);
            effect.parentNode.insertBefore(durationContainer, effect);
        }
    });

    return playerEffectObj;
}

function getMonsters(render = false) {
    let monsters = [];
    let activeMonsters = [];
    let bosses = [];
    let activeBosses = [];

    [...document.getElementsByClassName('btm1')].forEach((monster_btm1, index) => {
        let monsterInfo = allMonsterInfo?.[`mkey_${(index + 1) % 10}`];
        let monster = {
            index: index,
            click: function() {
                monster_btm1.click();
            },
            name: 'Unknown',
            type: 'Normal',
            hpPercentage: 0,
            mpPercentage: 0,
            spPercentage: 0,
            isAlive: monster_btm1.hasAttribute('onclick'),
            effectObj: {},
            monster_btm1: monster_btm1,
        };

        //index
        let monster_btm2 = monster_btm1.querySelector('.btm2');
        if (render && (cfgBattle.showMonsterIndex || cfgBattle.showMonsterInfo)) {
            monster_btm2.querySelector('img').style.display = 'none';
            let monIndex = document.createElement('div');
            monIndex.textContent = index + 1;
            monIndex.style.cssText = `font-size: ${cfgBattle.showMonsterInfo ? 17 : 28}px; font-weight: bold`;
            monster_btm2.querySelector('div').appendChild(monIndex);
        }
        //info: monsterClass
        if (render && cfgBattle.showMonsterInfo) {
            let monClass = document.createElement('div');
            monClass.textContent = monsterInfo?.monsterClass ?? '?';
            monClass.dataset.field = 'monClass';
            monClass.style.cssText = 'font-size: 10px; font-weight: bold; overflow: hidden;';
            monster_btm2.querySelector('div').prepend(monClass);
        }

        //name
        let monster_btm3 = monster_btm1.querySelector('.btm3');
        let nameContainer = monster_btm3.querySelector('div');
        monster.name = nameContainer.textContent.trim() || jpxUtils.parseHVClasses(nameContainer);
        //type
        for (const [type, names] of Object.entries(bossTypes)) {
            if (names.has(monster.name)) {
                monster.type = type;
                monster.isAlive && activeBosses.push(monster);
                bosses.push(monster);
                break;
            }
        }
        //info: attackType, powerLevel, trainer
        if (render && cfgBattle.showMonsterInfo) {
            monster_btm3.querySelector(':scope > div > div').style.display = 'inline';
            let monTrAtkPl = document.createElement('span');
            if (!jpxUtils.isEmpty(monsterInfo)) monTrAtkPl.textContent = `${monsterInfo?.attack ?? '?'}, ${monsterInfo?.plvl ?? '?'}`;
            monTrAtkPl.dataset.field = 'monTrAtkPl';
            monTrAtkPl.style.cssText = 'font-weight: bold; position: absolute; right: 2px;';
            monster_btm3.querySelector('div').appendChild(monTrAtkPl);
        }

        //hpPercentage, mpPercentage, spPercentage
        let monster_btm4 = monster_btm1.querySelector('.btm4');
        let healthBar = monster_btm4.querySelector('img[src$="nbargreen.png"]');
        monster.hpPercentage = Math.round((parseInt(healthBar?.style.width, 10) / 120) * 100) / 100 || 0;
        let manaBar = monster_btm4.querySelector('img[src$="nbarblue.png"]');
        monster.mpPercentage = Math.round((parseInt(manaBar?.style.width, 10) / 120) * 100) / 100 || 0;
        let spiritBar = monster_btm4.querySelector('img[src$="nbarred.png"]');
        monster.spPercentage = Math.round((parseInt(spiritBar?.style.width, 10) / 120) * 100) / 100 || 0;

        //status
        let monster_btm6 = monster_btm1.querySelector('.btm6');
        monster_btm6.querySelectorAll('img').forEach((effect) => {
            let tooltip = effect.getAttribute('onmouseover');
            if (!tooltip) return;

            let matches = tooltip.match(regExp.spellMatch);
            if (!matches?.groups) return;

            let { name, stack, description, turns } = matches.groups;
            if (name) monster.effectObj[name] = { turns, stack: stack ?? 1 };
        });

        monsters.push(monster);
        monster.isAlive && activeMonsters.push(monster);
    });

    return {
        monsters, activeMonsters,
        bosses, activeBosses,
    }
}

function updateMonsterEffects() {
    let { monsters, activeMonsters } = monstersObj;

    function getEffectChanges(turnLog) {
        let effectsAdded = turnLog.matchAll(regExp.effectGain);
        let effectsRemoved = [...turnLog.matchAll(regExp.effectExpired), ...turnLog.matchAll(regExp.effectWear)];
        let asleepRemoved = turnLog.matchAll(regExp.effectWearAsleep);
        let confusedRemoved = turnLog.matchAll(regExp.effectWearConfused);
        let effectChanges = {};

        for (const match of effectsAdded) (effectChanges[match[1]] ??= { add: [], remove: [] }).add.push(match[2]);
        for (const match of effectsRemoved) (effectChanges[match[2]] ??= { add: [], remove: [] }).remove.push(match[1]);
        for (const match of asleepRemoved) (effectChanges[match[1]] ??= { add: [], remove: [] }).remove.push('Asleep');
        for (const match of confusedRemoved) (effectChanges[match[1]] ??= { add: [], remove: [] }).remove.push('Confused');

        return effectChanges;
    }

    function calcHiddenDelta(name, effectObj) {
        let savedEffects = monstersEffects[name];
        if (!savedEffects) return;

        let maxDecrease = 0;
        for (const effect in effectObj) {
            let savedTurns = +savedEffects[effect]?.turns;
            let effectTurns = +effectObj[effect]?.turns;
            if (!isNaN(savedTurns) && !isNaN(effectTurns)) {
                let delta = savedTurns - effectTurns;
                if (delta > 0) maxDecrease = Math.max(maxDecrease, delta);
            }
        }

        return maxDecrease;
    }

    function applyHiddenDelta(name, effectObj, delta) {
        let savedEffects = monstersEffects[name];
        if (!savedEffects) return;

        let elementEffects = ['Searing Skin', 'Freezing Limbs', 'Turbulent Air', 'Deep Burns', 'Breached Defense', 'Blunted Attack'];
        let effects = Object.keys(effectObj);
        let elementCount = effects.filter(effect => elementEffects.includes(effect)).length;

        for (const savedEffect in savedEffects) {
            if (effects.includes(savedEffect)) continue;

            if (
                (elementCount < 3 && elementEffects.includes(savedEffect)) ||
                savedEffect === 'Coalesced Mana'
            ) {
                delete savedEffects[savedEffect];
                continue;
            }

            if (!delta || delta <= 0) continue;
            let savedTurns = +savedEffects[savedEffect]?.turns;
            if (isNaN(savedTurns)) continue;

            if (savedTurns - delta < 0 && elementEffects.includes(savedEffect)) {
                delete savedEffects[savedEffect];
                continue;
            }
            savedEffects[savedEffect].turns = Math.max(0, savedTurns - delta);
        }
    }

    let turnLog = log.innerHTML.match(regExp.turnLog)?.[0];
    let effectChanges = turnLog ? getEffectChanges(turnLog) : {};

    for (const activeMonster of activeMonsters) {
        let name = activeMonster.name;
        let savedEffects = monstersEffects[name] ??= {};

        let effectObj = activeMonster.effectObj;
        let effects = Object.keys(effectObj);

        if (effects.length < 5) {
            for (const effect in savedEffects) delete savedEffects[effect];
        } else if (effects.length === 5) {
            for (const effect in savedEffects) delete savedEffects[effect];
            for (const effect of effects) savedEffects[effect] = { ...effectObj[effect] };
        } else if (effects.length === 6) {
            let delta = calcHiddenDelta(name, effectObj);
            for (const effect of effects) savedEffects[effect] = { ...effectObj[effect] };

            if (effectChanges[name]) {
                for (const effect of effectChanges[name].add) !effects.includes(effect) && (savedEffects[effect] = { turns: '-', stack: '-' });
                for (const effect of effectChanges[name].remove) (!effects.includes(effect) && (effect in savedEffects)) && delete savedEffects[effect];
            }

            applyHiddenDelta(name, effectObj, delta);

            let monster_btm6 = activeMonster.monster_btm1.querySelector('.btm6');
            monster_btm6.style.width = 'max-content';

            for (const effect in savedEffects) {
                if (!(effect in effectObj)) {
                    let { turns, stack } = savedEffects[effect];
                    effectObj[effect] = { turns, stack };
                    if (isNaN(+turns)) turns = `'${String(turns).replace(/'/g, "\\'")}'`;

                    let img = document.createElement('img');
                    img.src = (isekaiSuffix ? '/isekai' : '') + (effectSrc[effect]?.scr || '/y/e/channeling.png');
                    img.setAttribute('onmouseover', `battle.set_infopane_effect('${effect}', 'jpx Hidden Effects', ${turns})`);
                    img.setAttribute('onmouseout', 'battle.clear_infopane()');

                    monster_btm6.appendChild(img);
                }
            }
        }
    }
}

function monsterDBReady(prevInfo) {
    const getMonsterIds = info => info ? Object.values(info).map(monsterInfo => monsterInfo?.monsterId ?? '').join('|') : '';

    return new Promise((resolve, reject) => {
        let start = Date.now();

        (function loop() {
            let info = window.HVMonsterDB?.getCurrentMonstersInformation();
            let monsterIds = getMonsterIds(info);
            if (info && !jpxUtils.isEmpty(info) && monsterIds !== prevMonsterIds) {
                resolve({ info, monsterIds });
                return;
            }

            if (Date.now() - start > 250) {
                resolve();
                return;
            }

            setTimeout(loop, 10);
        })();
    });
}

function updateMonsterInfo() {
    monsterDBReady(prevMonsterIds).then((result) => {
        if (!result) return;
        allMonsterInfo = result.info;
        prevMonsterIds = result.monsterIds;

        if (!cfgBattle.showMonsterInfo) return;
        for (const monster of monstersObj.monsters) {
            let monsterInfo = allMonsterInfo?.[`mkey_${(monster.index + 1) % 10}`];
            let monClass = monster.monster_btm1.querySelector('[data-field="monClass"]');
            monClass.textContent = monsterInfo?.monsterClass ?? '?';
            let monTrAtkPl = monster.monster_btm1.querySelector('[data-field="monTrAtkPl"]')
            monTrAtkPl.textContent = `${monsterInfo?.attack ?? '?'}, ${monsterInfo?.plvl ?? '?'}`;
        }
    });
}

function checkConditions(conditions, target, checkGlobal = true, checkTarget = true) {
    let { monsters, activeMonsters, bosses, activeBosses } = monstersObj;
    
    const generalHandlers = {
        world: arr => arr.includes(!isekaiSuffix ? 'Persistent' : 'Isekai'),
        pLevel: range => jpxUtils.inRange(parseInt(localStorage.getItem(prefix + 'playerLevel' + isekaiSuffix) || 1), range),
        battleTypes: arr => arr.includes(battleType),
        difficulty: arr => {
            let difficulty;
            if (battleType === 'Tower') {
                if (jpxUtils.inRange(towerFloor, [1, 6])) difficulty = 'Normal';
                else if (jpxUtils.inRange(towerFloor, [7, 13])) difficulty = 'Hard';
                else if (jpxUtils.inRange(towerFloor, [14, 19])) difficulty = 'Nightmare';
                else if (jpxUtils.inRange(towerFloor, [20, 26])) difficulty = 'Hell';
                else if (jpxUtils.inRange(towerFloor, [27, 33])) difficulty = 'Nintendo';
                else if (jpxUtils.inRange(towerFloor, [34, 39])) difficulty = 'IWBTH';
                else difficulty = 'PFUDOR';
            } else {
                difficulty = localStorage.getItem(prefix + 'difficulty' + isekaiSuffix) || 'PFUDOR';
            }

            return arr.includes(difficulty);
        },
        roundCurrent: range => jpxUtils.inRange(roundInfo.current, range),
        roundLeft: range => jpxUtils.inRange(roundInfo.total - roundInfo.current, range),
        roundTotal: range => jpxUtils.inRange(roundInfo.total, range),
        floor: range => (battleType !== 'Tower' || jpxUtils.inRange(towerFloor, range)),
        pActionCooldown: arr => {
            let range = arr.slice(0, 2);
            let actions = arr.slice(2);

            return actions.every(action => {
                let tier = action.match(/^T(\d)$/)?.[1];
                let action2 = tier ? spellsDamageObj[spellDamageBonus.maxType][tier - 1] : action;
                let cooldown = spellCooldowns[action2] ?? itemCooldowns[action2];
                if (cooldown === '-') cooldown = 9999;
                return jpxUtils.inRange(cooldown, range);
            });
        },
        pActionCounts: arr => {
            let range = arr.slice(0, 2);
            let actions = arr.slice(2);

            return actions.every(action => {
                let tier = action.match(/^T(\d)$/)?.[1];
                let action2 = tier ? spellsDamageObj[spellDamageBonus.maxType][tier - 1] : action;
                return jpxUtils.inRange(actionCounts[action2] ?? 0, range);
            });
        },
        pHP: range => jpxUtils.inRange(vitals.hpPercentage, range),
        pMP: range => jpxUtils.inRange(vitals.mpPercentage, range),
        pSP: range => jpxUtils.inRange(vitals.spPercentage, range),
        pOC: range => jpxUtils.inRange(vitals.oc, range),
        pSpiritStatus: flag => flag === spiritStatus,
        pEffects: arr => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return effects.every(effect => {
                let turns = playerEffectsObj[effect]?.turns ?? -1;
                if (turns === 'permanent') turns = 9999;
                return isNaN(+turns) || jpxUtils.inRange(+turns, range);
            });
        },
        pIgnoredEffects: arr => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return !effects.some(effect => {
                let turns = playerEffectsObj[effect]?.turns ?? -1;
                if (turns === 'permanent') turns = 9999;
                return isNaN(+turns) || jpxUtils.inRange(+turns, range);
            });
        },
        pEffectStacks: arr => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return effects.every(effect => {
                let stack = playerEffectsObj[effect]?.stack ?? -1;
                return isNaN(+stack) || jpxUtils.inRange(+stack, range);
            });
        },
        monsters: range => jpxUtils.inRange(monsters.length, range),
        activeMonsters: range => jpxUtils.inRange(activeMonsters.length, range),
        defeatedMonsters: range => jpxUtils.inRange(monsters.length - activeMonsters.length, range),
        bosses: range => jpxUtils.inRange(bosses.length, range),
        activeBosses: range => jpxUtils.inRange(activeBosses.length, range),
        defeatedBosses: range => jpxUtils.inRange(bosses.length - activeBosses.length, range),
        mWithoutEffects: arr => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);
            return jpxUtils.inRange(activeMonsters.filter(activeMonster => effects.some(effect => activeMonster.effectObj[effect]?.turns == null)).length, range);
        },
    };

    const targetHandlers = {
        tName: (str, t) => {
            let regex = jpxUtils.toRegExp(str);
            return !regex || regex.test(t.name);
        },
        tTypes: (arr, t) => arr.includes(t.type),
        tClasses: (arr, t) => arr.includes(allMonsterInfo?.[`mkey_${(t.index + 1) % 10}`]?.monsterClass),
        tPowerLevel: (range, t) => jpxUtils.inRange(allMonsterInfo?.[`mkey_${(t.index + 1) % 10}`]?.plvl, range),
        tIndex: (range, t) => jpxUtils.inRange(t.index, range.map(n => (
            n = n > 0 ? n - 1 : n === 0 ? 0 : monsters.length + n,
            Math.min(monsters.length - 1, Math.max(0, n))
        ))),
        tHP: (range, t) => jpxUtils.inRange(t.hpPercentage, range),
        tMP: (range, t) => jpxUtils.inRange(t.mpPercentage, range),
        tSP: (range, t) => jpxUtils.inRange(t.spPercentage, range),
        tEffects: (arr, t) => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return effects.every(effect => {
                let turns = t.effectObj[effect]?.turns ?? -1;
                if (turns === 'permanent') turns = 9999;
                return isNaN(+turns) || jpxUtils.inRange(+turns, range);
            });
        },
        tIgnoredEffects: (arr, t) => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return !effects.some(effect => {
                let turns = t.effectObj[effect]?.turns ?? -1;
                if (turns === 'permanent') turns = 9999;
                return isNaN(+turns) || jpxUtils.inRange(+turns, range);
            });
        },
        tEffectStacks: (arr, t) => {
            let range = arr.slice(0, 2);
            let effects = arr.slice(2);

            return effects.every(effect => {
                let stack = t.effectObj[effect]?.stack ?? -1;
                return isNaN(+stack) || jpxUtils.inRange(+stack, range);
            });
        },
        tDaysSinceUpdate: (range, t) => {
            let lastUpdate = allMonsterInfo?.[`mkey_${(t.index + 1) % 10}`]?.lastUpdate;
            let deltaDays = lastUpdate ? jpxUtils.daysSince(lastUpdate) : 9999;
            return !jpxUtils.isEmpty(allMonsterInfo) && jpxUtils.inRange(deltaDays, range);
        },
    };

    return conditions.every(condition => {
        let { key, value, offset = [0, 0], matched = [1, 1] } = condition;

        if (key in generalHandlers && checkGlobal) {
            return generalHandlers[key](value) === true;
        }

        if (key in targetHandlers && checkTarget) {
            if (!target) return false;
            let successCount = 0;
			
            for (let i = target.index + offset[0]; i <= target.index + offset[1]; i++) {
                if (i < 0 || i > monsters.length - 1) continue;
                let m = activeMonsters.find(activeMonster => activeMonster.index === i);
                if (m && targetHandlers[key](value, m) === true) successCount++;
            }
			
            return jpxUtils.inRange(successCount, matched);
        }

        return true;
    });
}

const actionHandlers = {
    stop(action, monster) {
        const { customMessage, conditions } = action;

        if (checkConditions(conditions, monster, true, !!monster)) {
            readyNext = `Stop: ${customMessage}`;
            jpxPanelManager.updateContent('battle');
            jpxPanelManager.setBackground('warn');
            jpxPanelManager.dispatchState();
            return true;
        }
        return false;
    },

    spellSupport(action, monster) {
        const { name, conditions } = action;

        if (
            spellCooldowns[name] === 0 &&
            checkConditions(conditions, monster, true, !!monster)
        ) {
            readyNext = 0;
            cast(name);
            return true;
        }
        return false;
    },

    item(action, monster) {
        const { name, conditions } = action;

        if (
            itemCooldowns[name] === 0 &&
            checkConditions(conditions, monster, true, !!monster)
        ) {
            readyNext = 0;
            use(name);
            return true;
        }
        return false;
    },

    toggle(action, monster) {
        const { name, toggled, conditions } = action;
        return (
            (name !== 'Spirit' || toggled !== spiritStatus) &&
            checkConditions(conditions, monster, true, !!monster) &&
            doToggleGoNext(name)
        );
    },

    target(action, monster) {
        const { priorityRule, conditions } = action;
        if (!checkConditions(conditions, monster, true, false)) return null;
        
        let { activeMonsters } = monstersObj;
        monstersObj.sorted ??= {};

        const getSorted = (fn, asc) => {
            return monstersObj.sorted[priorityRule] ??= jpxUtils.getSortedArray(activeMonsters, fn, priorityRule.includes('Low to High'));
        };

        let list = activeMonsters;
        switch (priorityRule) {
            case 'Bottom Up':
                list = monstersObj.sorted[priorityRule] ??= [...activeMonsters].reverse();
                break;
            case 'Current HP Low to High':
            case 'Current HP High to Low':
                list = getSorted(m => monsterData[m.index].maxHP * m.hpPercentage);
                break;
            case 'Current HP Percent Low to High':
            case 'Current HP Percent High to Low':
                list = getSorted(m => m.hpPercentage);
                break;
        }

        return list.find(activeMonster => checkConditions(conditions, activeMonster, false)) ?? null;
    },

    smartDebuff(action, monster) {
        const { conditions } = action;
        return (
            checkConditions(conditions, monster, true, false) &&
            doSpellsDebuffGoNext({ ...action })
        );
    },

    spellDebuff(action, monster) {
        const { name, conditions } = action;
        return (
            monster &&
            checkConditions(conditions, monster) &&
            doSpellGoNext(name, monster)
        );
    },

    spellDamage(action, monster) {
        const { name, conditions } = action;
        let tier = name.match(/^T(\d)$/)?.[1];
        let spell = tier ? spellsDamageObj[spellDamageBonus.maxType][tier - 1] : name;
        return (
            monster &&
            checkConditions(conditions, monster) &&
            doSpellGoNext(spell, monster)
        );
    },

    skill(action, monster) {
        const { name, conditions } = action;
        return (
            monster &&
            checkConditions(conditions, monster) &&
            doSpellGoNext(name, monster)
        );
    },

    normalAttack(action, monster) {
        return (
            monster &&
            doAttackGoNext(monster)
        )
    },
};

function actionManager(actions) {
    let targetPhase = false;
    let targetMonster = null;
    let targetLocked = false;

    for (const action of actions) {
        const handler = actionHandlers[action.type];
        if (!handler) continue;
        if (action.disabled === true) continue;

        if (action.type === 'target') {
            targetPhase = true;
            if (!targetLocked) {
                targetMonster = null;

                let result = handler(action, targetMonster);
                if (result) {
                    targetMonster = result;
                    targetLocked = true;
                }
            }
            continue;
        }

        if (action.type !== 'smartDebuff' && targetPhase && !targetMonster) continue;
        if (handler(action, targetMonster)) return true;
        targetLocked = false;
    }

    return false;
}

//Battle Record
function battleRecorder() {
    let turnLog = log.innerHTML.match(regExp.turnLog)?.[0];
    if (!turnLog) return;

    let action = turnLog.match(regExp.action)?.[1];
    if (!action) {
        /*isekai911*/
        if (turnLog.includes('<strong>Scanning')) {
            turnLog = turnLog.replace(/[\t\r\n]+/g, '').replace(/>\s+</g, '><');
            action = 'You use Scan';
        /*isekai912*/
        } else {
            return;
        }
    }
    /*isekai911*/
    if (action.includes('gains the effect')) {
        let action2 = turnLog.match(regExp.action2)?.[1];
        action2 && (action = action2);
    }
    /*isekai912*/
    let use = action.match(regExp.use)?.[2];

    if (cfgBattle.recordBattleLog) {
        battleLogRecorder();
    }
    timeRecorder(turnLog, action, use);
    if (!isekaiSuffix) {
        combatRecorder(turnLog, action, use);
    /*isekai911*/
    } else {
        combatRecorder_isekai(turnLog, action, use);
    }
    /*isekai912*/
    revenueRecorder(turnLog, action, use);
}

function battleLogRecorder() {
    let tdArray = Array.from(log.querySelectorAll('td'));
    let tlsArray = Array.from(log.querySelectorAll('.tls'));
    if (regExp.battleTypeLog.test(tdArray.at(-1).innerHTML) & tlsArray.length === 1) {
        for (let i = tdArray.length - 1; i > -1; i--) {
            if (!tdArray[i].textContent.trim() || tdArray[i].innerHTML.includes('<hr>')) {
                break;
            }
            battleLogRecordCurrent.unshift(tdArray[i].textContent);
        }
    }
    battleLogRecordCurrent.push('--------------------------------------------------');
    for (const td of tdArray) {
        if (!td.textContent.trim() || td.innerHTML.includes('<hr>')) {
            break;
        }
        if (td.querySelector('table')) {
            let clone = td.cloneNode(true);
            clone.querySelector('table')?.remove();
            clone = clone.textContent.replace(/\s+/g, ' ').trim();
            battleLogRecordCurrent.push(clone);
        } else {
            battleLogRecordCurrent.push(td.textContent.replace(/\s+/g, ' ').trim());
        }
    }

    let btcp = document.querySelector('#btcp');
    if (btcp) {
        battleLogRecordCurrent.push('++++++++++++++++++++++++++++++++++++++++++++++++++');
    }
    battleLogRecord = battleLogRecord.concat(battleLogRecordCurrent);
    battleLogRecordCurrent = [];
}

function timeRecorder(turnLog, action, use) {
    timeRecords['startTime'] ??= Date.now();
    timeRecords['action'] += 1;
    if (!regExp.zeroturn.test(action)) timeRecords['turn'] += 1;
    if (use) timeRecords['lastUse'][use] = timeRecords['turn'];
}

function ensureRiddleCounterState() {
    if (jpxUtils.isEmpty(timeRecords)) {
        timeRecords = JSON.parse(localStorage.getItem(prefix + 'timeRecords' + isekaiSuffix) || JSON.stringify(jpxUtils.createTimeRecords()));
    }

    if (!timeRecords.riddle || typeof timeRecords.riddle !== 'object') {
        timeRecords.riddle = { lastTurn: -1, solved: 0, total: 0 };
    }

    if (typeof timeRecords.turn !== 'number') timeRecords.turn = 0;
    if (typeof timeRecords.riddle.lastTurn !== 'number') timeRecords.riddle.lastTurn = -1;
    if (typeof timeRecords.riddle.solved !== 'number') timeRecords.riddle.solved = 0;
    if (typeof timeRecords.riddle.total !== 'number') timeRecords.riddle.total = 0;
}

function markRiddleTriggered() {
    ensureRiddleCounterState();
    if (timeRecords.riddle.lastTurn === timeRecords.turn) return false;
    timeRecords.riddle.lastTurn = timeRecords.turn;
    timeRecords.riddle.total += 1;
    return true;
}

function riddleRecorder() {
    const didCountRiddle = markRiddleTriggered();
    if (didCountRiddle) {
        localStorage.setItem(prefix + 'timeRecords' + isekaiSuffix, JSON.stringify(timeRecords));
    }

    let alarmInterval = null;
    const stopAlarm = () => {
        if (alarmInterval) {
            clearInterval(alarmInterval);
            alarmInterval = null;
        }
    };

    if (cfgBattle?.notifyOnRiddle) {
        const showNotification = () => {
            if (typeof Notification === 'undefined') return;
            if (Notification.permission === 'granted') {
                new Notification('Hentaiverse', { body: '谜题大师出现了！', tag: 'jpx-riddle', requireInteraction: true });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then((p) => {
                    if (p === 'granted') {
                        new Notification('Hentaiverse', { body: '谜题大师出现了！', tag: 'jpx-riddle', requireInteraction: true });
                    }
                }).catch(() => {});
            }
        };

        const playBeep = () => {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 1200;
                gain.gain.value = 0.08;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
                osc.onended = () => { ctx.close(); };
            } catch (_) {}
        };

        showNotification();

        let beepCount = 0;
        let maxBeeps = cfgBattle.riddleAlarmLimit > 0 ? cfgBattle.riddleAlarmLimit : 5;
        playBeep();
        beepCount += 1;

        if (maxBeeps > 1) {
            alarmInterval = setInterval(() => {
                playBeep();
                beepCount += 1;
                if (beepCount >= maxBeeps) stopAlarm();
            }, 1000);
        }
    }

    let riddlesubmit = document.querySelector('#riddlesubmit')
    riddlesubmit && riddlesubmit.addEventListener('click', () => {
        stopAlarm();
        ensureRiddleCounterState();
        timeRecords.riddle.solved += 1;
        localStorage.setItem(prefix + 'timeRecords' + isekaiSuffix, JSON.stringify(timeRecords));
    }, { once: true });
}

function combatRecorder(turnLog, action, use) {
    if (use) {
        if (
            !regExp.zeroturn.test(action) ||
            use.includes('Gem') ||
            use.includes('Caffeinated Candy') ||
            use.includes('Energy Drink')
        ) {
            jpxUtils.inc(combatRecords.use, use);
            jpxUtils.inc(actionCounts, use);
            use === 'Scan' && updateMonsterInfo();
        }
    } else if (action.includes('Spirit Stance Engaged')) {
        jpxUtils.inc(combatRecords.use, 'Spirit');
        jpxUtils.inc(actionCounts, 'Spirit');
    } else if (action.includes('Defending.')) {
        jpxUtils.inc(combatRecords.use, 'Defend');
        jpxUtils.inc(actionCounts, 'Defend');
    } else if (action.includes('Focusing.')) {
        jpxUtils.inc(combatRecords.use, 'Focus');
        jpxUtils.inc(actionCounts, 'Focus');
    } else {
        jpxUtils.inc(combatRecords.use, 'Attack');
        jpxUtils.inc(actionCounts, 'Attack');
    }

    if (turnLog.includes('You gain the effect Cloak of the Fallen.')) {
        jpxUtils.inc(combatRecords.use, 'Cloak of the Fallen');
        jpxUtils.inc(actionCounts, 'Cloak of the Fallen');
    }

    let damage = turnLog.match(regExp.damage);
    if (damage) {
        let cast = action.includes('You cast');

        for (let i = 0; i < damage.length; i++) {
            let damageType = damage[i].match(regExp.damageType);
            let damagePlus = damage[i].match(regExp.damagePlus);
            let damagePoints = damage[i].match(regExp.damagePoints);

            if (damageType) {
                //Taken
                if (damage[i].includes('its you for')) {
                    let crit = damage[i].includes(' crits ');
                    let spiritShield = damage[i].match(regExp.spiritShield);

                    //Magical Taken
                    if (damage[i].includes(' casts ')) {
                        combatRecords['magicalTaken']['hit'] += 1;
                        crit && (combatRecords['magicalTaken']['crit'] += 1);
                        jpxUtils.inc(combatRecords.magicalTaken, damageType[2], +damageType[1]);

                        if (spiritShield) {
                            jpxUtils.inc(combatRecords.magicalTaken, 'spiritShield' + 'hit');
                            if (crit) jpxUtils.inc(combatRecords.magicalTaken, 'spiritShield' + 'crit');
                            jpxUtils.inc(combatRecords.magicalTaken, 'spiritShield' + damageType[2], +spiritShield[1]);
                        }
                    //Physical Taken
                    } else {
                        combatRecords['physicalTaken']['hit'] += 1;
                        crit && (combatRecords['physicalTaken']['crit'] += 1);
                        jpxUtils.inc(combatRecords.physicalTaken, damageType[2], +damageType[1]);

                        if (spiritShield) {
                            jpxUtils.inc(combatRecords.physicalTaken, 'spiritShield' + 'hit');
                            if (crit) jpxUtils.inc(combatRecords.physicalTaken, 'spiritShield' + 'crit');
                            jpxUtils.inc(combatRecords.physicalTaken, 'spiritShield' + damageType[2], +spiritShield[1]);
                        }
                    }
                //Dealt
                } else {
                    //Magical Dealt
                    if (cast) {
                        if (!damage[i].includes(' explodes ')) {
                            combatRecords['magicalDealt']['hit'] += 1;

                            if (damage[i].includes(' blasts ')) {
                                combatRecords['magicalDealt']['crit'] += 1;
                            }
                        }
                        jpxUtils.inc(combatRecords.magicalDealt, damageType[2], +damageType[1]);
                    //Physical Dealt
                    } else {
                        if (!regExp.strike.test(damage[i])) {
                            combatRecords['physicalDealt']['hit'] += 1;

                            if (regExp.crit.test(damage[i])) {
                                combatRecords['physicalDealt']['crit'] += 1;
                            }
                        }

                        jpxUtils.inc(combatRecords.physicalDealt, damageType[2], +damageType[1]);
                    }
                }
            } else if (damagePlus) {
                //Physical Dealt
                //    <td class="tl">Bleeding Wound hits Monster for 1000 damage.</td>
                //    <td class="tl">Spreading Poison hits Monster for 1000 damage.</td>
                if (regExp.damagePhysicalPlus.test(damage[i])) {
                    jpxUtils.inc(combatRecords.physicalDealt, 'damagePlus', +damagePlus[1]);
                //Magical Dealt
                //    <td class="tl">Burning Soul hits Monster for 1000 damage.</td>
                //    <td class="tl">Ripened Soul hits Monster for 1000 damage.</td>
                } else {
                    jpxUtils.inc(combatRecords.magicalDealt, 'damagePlus', +damagePlus[1]);
                }
            } else if (damagePoints) {
                //counter
                //    <td class="tl">You counter Monster for 1000 points of void damage.</td>
                if (damage[i].includes('You counter')) {
                    jpxUtils.inc(combatRecords.physicalDealt, damagePoints[2], +damagePoints[1]);
                //spike shield
                //    <td class="tl">Your spike shield hits Monster for 1000 points of elec damage.</td>
                } else {
                    jpxUtils.inc(combatRecords.magicalDealt, damagePoints[2], +damagePoints[1]);
                }
            }
        }
    }

    let combatRecordsFactory = (regexp, combatRecordsType, combatRecordsKey) => {
        let match = turnLog.match(regexp);
        if (match) jpxUtils.inc(combatRecords[combatRecordsType], combatRecordsKey, match.length);
    }

    //Magical Dealt
    combatRecordsFactory(regExp.magicalDealtMiss, 'magicalDealt', 'miss');
    combatRecordsFactory(regExp.magicalDealtEvade, 'magicalDealt', 'evade');
    combatRecordsFactory(regExp.magicalDealtResist50, 'magicalDealt', 'resist50');
    combatRecordsFactory(regExp.magicalDealtResist75, 'magicalDealt', 'resist75');
    combatRecordsFactory(regExp.magicalDealtResist90, 'magicalDealt', 'resist90');
    combatRecordsFactory(regExp.magicalDealtResist, 'magicalDealt', 'resist');

    //Physical Dealt
    combatRecordsFactory(regExp.physicalDealtMiss, 'physicalDealt', 'miss');
    combatRecordsFactory(regExp.physicalDealtEvade, 'physicalDealt', 'evade');
    combatRecordsFactory(regExp.physicalDealtParry, 'physicalDealt', 'parry');

    //Magical Taken
    //    miss
    combatRecordsFactory(regExp.magicalTakenEvade, 'magicalTaken', 'evade');
    combatRecordsFactory(regExp.magicalTakenResist50, 'magicalTaken', 'resist50');
    combatRecordsFactory(regExp.magicalTakenResist75, 'magicalTaken', 'resist75');
    combatRecordsFactory(regExp.magicalTakenResist90, 'magicalTaken', 'resist90');
    //    resist
    combatRecordsFactory(regExp.magicalTakenBlock, 'magicalTaken', 'block');

    //Physical Taken
    combatRecordsFactory(regExp.physicalTakenMiss, 'physicalTaken', 'miss');
    combatRecordsFactory(regExp.physicalTakenEvade, 'physicalTaken', 'evade');
    combatRecordsFactory(regExp.physicalTakenParry, 'physicalTaken', 'parry');
    combatRecordsFactory(regExp.physicalTakenBlock, 'physicalTaken', 'block');

    //counter
    combatRecordsFactory(regExp.counter, 'use', 'Counter');
}

/*isekai911*/
function combatRecorder_isekai(turnLog, action, use) {
    if (use) {
        if (
            !regExp.zeroturn.test(action) ||
            use.includes('Gem') ||
            use.includes('Caffeinated Candy') ||
            use.includes('Energy Drink')
        ) {
            jpxUtils.inc(combatRecords.use, use);
            jpxUtils.inc(actionCounts, use);
            use === 'Scan' && updateMonsterInfo();
        }
    } else if (action.includes('Spirit Stance Engaged')) {
        jpxUtils.inc(combatRecords.use, 'Spirit');
        jpxUtils.inc(actionCounts, 'Spirit');
    } else if (action.includes('Defending.')) {
        jpxUtils.inc(combatRecords.use, 'Defend');
        jpxUtils.inc(actionCounts, 'Defend');
    } else if (action.includes('Focusing.')) {
        jpxUtils.inc(combatRecords.use, 'Focus');
        jpxUtils.inc(actionCounts, 'Focus');
    } else {
        jpxUtils.inc(combatRecords.use, 'Attack');
        jpxUtils.inc(actionCounts, 'Attack');
    }

    if (turnLog.includes('You gain the effect Cloak of the Fallen.')) {
        jpxUtils.inc(combatRecords.use, 'Cloak of the Fallen');
        jpxUtils.inc(actionCounts, 'Cloak of the Fallen');
    }

    let damage = turnLog.match(regExp.damage_isekai);
    if (damage) {
        for (let i = 0; i < damage.length; i++) {
            let damageTaken = jpxUtils.matchAny(damage[i], regExp.damageTaken1_isekai, regExp.damageTaken2_isekai);
            let spiritShield = damage[i].match(regExp.spiritShield_isekai);
            let damageDealt = jpxUtils.matchAny(damage[i], regExp.damageDealt1_isekai, regExp.damageDealt2_isekai);
            let strike = damage[i].match(regExp.strike_isekai);
            let explode = damage[i].match(regExp.explode_isekai);
            let damagePlus = damage[i].match(regExp.damagePlus_isekai);
            let damagePoints = damage[i].match(regExp.damagePoints_isekai);

            //Taken
            if (damageTaken?.groups) {
                let glance = damageTaken.groups.v.includes('glance');
                let crit = damageTaken.groups.v.includes('crit');
                let hit = !glance && !crit;
                let damageType = jpxUtils.lowerFirst(damageTaken.groups.t);
                //Magical Taken
                if (damage[i].includes(' casts ')) {
                    glance && (combatRecords.magicalTaken.glance += 1);
                    hit && (combatRecords.magicalTaken.hit += 1);
                    crit && (combatRecords.magicalTaken.crit += 1);
                    jpxUtils.inc(combatRecords.magicalTaken, damageType, +damageTaken.groups.n);
                //Physical Taken
                } else {
                    glance && (combatRecords.physicalTaken.glance += 1);
                    hit && (combatRecords.physicalTaken.hit += 1);
                    crit && (combatRecords.physicalTaken.crit += 1);
                    jpxUtils.inc(combatRecords.physicalTaken, damageType, +damageTaken.groups.n);
                }
            } else if (spiritShield) {
                jpxUtils.inc(combatRecords.physicalTaken, 'spiritShield' + 'hit');
                jpxUtils.inc(combatRecords.physicalTaken, 'spiritShield' + 'damagePlus', +spiritShield[1]);
            //Dealt
            } else if (damageDealt?.groups) {
                let glance = damageDealt.groups.v.includes('glance');
                let crit = damageDealt.groups.v.includes('crit');
                let critStack = parseInt(damageDealt.groups.s) || 1;
                let hit = !glance && !crit;
                let damageType = jpxUtils.lowerFirst(damageDealt.groups.t);
                //Magical Dealt
                if (action.includes('You cast')) {
                    glance && (combatRecords.magicalDealt.glance += 1);
                    hit && (combatRecords.magicalDealt.hit += 1);
                    crit && (combatRecords.magicalDealt.crit += 1);
                    jpxUtils.inc(combatRecords.magicalDealt, damageType, +damageDealt.groups.n);
                //Physical Dealt
                } else {
                    glance && (combatRecords.physicalDealt.glance += 1);
                    hit && (combatRecords.physicalDealt.hit += 1);
                    if (crit) {
                        combatRecords.physicalDealt.crit += 1;
                        jpxUtils.inc(combatRecords.physicalDealt, `crit${critStack}`);
                    }
                    jpxUtils.inc(combatRecords.physicalDealt, damageType, +damageDealt.groups.n);
                }
            } else if (strike) {
                let damageType = jpxUtils.lowerFirst(strike[3]);
                jpxUtils.inc(combatRecords.physicalDealt, damageType, +strike[2]);
            } else if (explode) {
                let damageType = jpxUtils.lowerFirst(explode[2]);
                jpxUtils.inc(combatRecords.magicalDealt, damageType, +explode[1]);
            } else if (damagePlus) {
                //Physical Dealt
                //    <td class="tl">Bleeding Wound hits Monster for 1000 damage.</td>
                //    <td class="tl">Spreading Poison hits Monster for 1000 damage.</td>
                if (regExp.damagePhysicalPlus_isekai.test(damage[i])) {
                    jpxUtils.inc(combatRecords.physicalDealt, 'damagePlus', +damagePlus[1]);
                //Magical Dealt
                //    <td class="tl">Burning Soul hits Monster for 1000 damage.</td>
                //    <td class="tl">Ripened Soul hits Monster for 1000 damage.</td>
                } else {
                    jpxUtils.inc(combatRecords.magicalDealt, 'damagePlus', +damagePlus[1]);
                }
            } else if (damagePoints) {
                let damageType = jpxUtils.lowerFirst(damagePoints[2]);
                //counter
                //    <td class="tl">You counter Monster for 1000 points of void damage.</td>
                if (damage[i].includes('You counter')) {
                    jpxUtils.inc(combatRecords.physicalDealt, damageType, +damagePoints[1]);
                //spike shield
                //    <td class="tl">Your spike shield hits Monster for 1000 points of elec damage.</td>
                } else {
                    jpxUtils.inc(combatRecords.magicalDealt, damageType, +damagePoints[1]);
                }
            }
        }
    }

    //debuff
    let debuffLog = turnLog.match(regExp.debuffLog_isekai)?.[0];
    if (debuffLog) {
        let debuffResist0 = debuffLog.match(regExp.debuffResist0_isekai)?.length || 0;
        let debuffResist1 = debuffLog.match(regExp.debuffResist1_isekai)?.length || 0;
        let debuffResist3 = debuffLog.match(regExp.debuffResist3_isekai)?.length || 0;
        jpxUtils.inc(combatRecords.magicalDealt, 'debuffResist0', debuffResist0 - debuffResist1);
        jpxUtils.inc(combatRecords.magicalDealt, 'debuffResist1', debuffResist1);
        jpxUtils.inc(combatRecords.magicalDealt, 'debuffResist3', debuffResist3);
    }

    /*patch*/
    let patchBlock = turnLog.match(/You block the attack\./g);
    if (patchBlock) jpxUtils.inc(combatRecords.magicalTaken, 'block', -patchBlock.length);
    let patchBlockAndParry = turnLog.match(/You block and parry the attack/g);
    if (patchBlockAndParry) jpxUtils.inc(combatRecords.physicalTaken, 'blockAndParry', patchBlockAndParry.length);

    let combatRecordsFactory = (regexp, combatRecordsType, combatRecordsKey) => {
        let match = turnLog.match(regexp);
        if (match) jpxUtils.inc(combatRecords[combatRecordsType], combatRecordsKey, match.length);
    }

    //Magical Dealt
    combatRecordsFactory(regExp.magicalDealtMiss_isekai, 'magicalDealt', 'miss');
    combatRecordsFactory(regExp.magicalDealtEvade_isekai, 'magicalDealt', 'evade');
    combatRecordsFactory(regExp.magicalDealtResistPartially_isekai, 'magicalDealt', 'resistPartially');
    combatRecordsFactory(regExp.magicalDealtResist_isekai, 'magicalDealt', 'resist');

    //Physical Dealt
    combatRecordsFactory(regExp.physicalDealtMiss_isekai, 'physicalDealt', 'miss');
    combatRecordsFactory(regExp.physicalDealtEvade_isekai, 'physicalDealt', 'evade');
    combatRecordsFactory(regExp.physicalDealtParryPartially_isekai, 'physicalDealt', 'parryPartially');
    combatRecordsFactory(regExp.physicalDealtParry_isekai, 'physicalDealt', 'parry');

    //Magical Taken
    combatRecordsFactory(regExp.magicalTakenMiss_isekai, 'magicalTaken', 'miss');
    combatRecordsFactory(regExp.magicalTakenEvade_isekai, 'magicalTaken', 'evade');
    combatRecordsFactory(regExp.magicalTakenBlockPartially_isekai, 'magicalTaken', 'blockPartially');
    combatRecordsFactory(regExp.magicalTakenBlock_isekai, 'magicalTaken', 'block');
    combatRecordsFactory(regExp.magicalTakenResistPartially_isekai, 'magicalTaken', 'resistPartially');

    //Physical Taken
    combatRecordsFactory(regExp.physicalTakenMiss_isekai, 'physicalTaken', 'miss');
    combatRecordsFactory(regExp.physicalTakenEvade_isekai, 'physicalTaken', 'evade');
    combatRecordsFactory(regExp.physicalTakenParryPartially_isekai, 'physicalTaken', 'parryPartially');
    combatRecordsFactory(regExp.physicalTakenParry_isekai, 'physicalTaken', 'parry');
    combatRecordsFactory(regExp.physicalTakenBlockPartially_isekai, 'physicalTaken', 'blockPartially');
    combatRecordsFactory(regExp.physicalTakenBlock_isekai, 'physicalTaken', 'block');

    //Counter
    combatRecordsFactory(regExp.counter_isekai, 'use', 'Counter');
}
/*isekai912*/

function revenueRecorder(turnLog, action, use) {
    if (
        use && regExp.zeroturn.test(action) &&
        !use.includes('Gem') &&
        !use.includes('Caffeinated Candy') &&
        !use.includes('Energy Drink')
    ) {
        revenueRecords['consumable'][use] ??= { use: 0, drop: 0 };
        revenueRecords['consumable'][use]['use'] += 1;
        jpxUtils.inc(actionCounts, use);
    }

    let gainExp = turnLog.match(regExp.gainExp);
    if (gainExp) revenueRecords['exp'] += +gainExp[1];

    let gainCredit = turnLog.match(regExp.gainCredit);
    if (gainCredit) revenueRecords['credit'] += +gainCredit[1];

    let proficiencies = turnLog.match(regExp.proficiencies);
    if (proficiencies) {
        for (let i = 0; i < proficiencies.length; i++) {
            let proficiency = proficiencies[i].match(regExp.proficiency);
            if (proficiency) {
                let prof = parseFloat(proficiency[1]);
                if (prof > 0) {
                    jpxUtils.inc(revenueRecords.proficiency, proficiency[2], prof);
                }
            }
        }
    }

    let dropLogs = turnLog.match(regExp.dropsLogs) || [];
    for (let dropLog of dropLogs) {
        let drop = dropLog.match(regExp.drop) || []; //drop[4]: sold, salvaged
        switch (drop[2]) {
            //Equipment, Material
            case 'FF0000': {
                if (!drop[4]){
                    let quality = drop[3].match(regExp.quality)?.[1];
                    if (quality) {
                        revenueRecords['equipment'][quality] ??= [];
                        revenueRecords['equipment'][quality].push(drop[3]);
                    } else {
                        jpxUtils.inc(revenueRecords.material, drop[3], +drop[1] || 1);
                    }
                }
                break;
            }
            //Credit
            case 'A89000': {
                let credit = drop[3].match(regExp.credit);
                if (credit) {
                    revenueRecords['credit'] += (+credit[1] || 1);
                }
                break;
            }
            //Consumable
            //    Restorative: Draught, Potion, Elixir
            //    Infusion: Flames, Frost, Storms, Lighting, Divinity, Darkness
            //    Scroll: Swiftness, Protection, the Avatar, Absorption, Shadows, Life, the Gods
            //    Shard: Voidseeker Shard, Aether Shard, Featherweight Shard, Amnesia Shard, World Seed
            //    Special Item: Flower Vase, Bubble Gum
            case '00B000': {
                if (!drop[3].includes('Gem')) {
                    revenueRecords['consumable'][drop[3]] ??= { use: 0, drop: 0 };
                    revenueRecords['consumable'][drop[3]]['drop'] += 1;
                }
                break;
            }
            //Token
            //    Token of Blood, Chaos Token, Soul Fragment
            case '254117': {
                if (drop[3].includes('Blood')) {
                    jpxUtils.inc(revenueRecords.token, 'Token of Blood');
                } else if (drop[3].includes('Chaos')) {
                    jpxUtils.inc(revenueRecords.token, 'Chaos Token');
                } else if (drop[3].includes('Soul')) {
                    jpxUtils.inc(revenueRecords.token, 'Soul Fragment', drop[1] === 'five' ? 5 : (+drop[1].match(/\d+/)?.[0] || 1));
                }
                break;
            }
            //Food
            case '489EFF': {
                jpxUtils.inc(revenueRecords.food, drop[3]);
                break;
            }
            //Artifact, Collectable
            case '0000FF': {
                if (drop[3].includes('Figurine')) {
                    jpxUtils.inc(revenueRecords.figurine, drop[3]);
                } else {
                    jpxUtils.inc(revenueRecords.artifact, drop[3]);
                }
                break;
            }
            //Trophy, World Seed, Charm
            case '461B7E': {
                /*isekai911*/
                if (drop[3].includes('World Seed')) {
                    revenueRecords['consumable'][drop[3]] ??= { use: 0, drop: 0 };
                    revenueRecords['consumable'][drop[3]]['drop'] += +drop[1].match(/\d+/)?.[0] || 1;
                /*isekai912*/
                } else {
                    jpxUtils.inc(revenueRecords.trophy, drop[3]);
                }
                break;
            }
            //Crystal
            case 'BA05B4': {
                let crystal = drop[3].match(regExp.crystal);
                if (crystal) jpxUtils.inc(revenueRecords.crystal, crystal[2], +crystal[1] || 1);
                break;
            }
        }
    }
}

async function battleRecordPlayer() {
    if (Object.keys(cfgStats).length < 1) {
        let storedCfgStats = {};
        try {
            storedCfgStats = JSON.parse(localStorage.getItem(prefix + 'cfgStats') || '{}');
        } catch (err) {
            console.warn('Failed to load cfgStats. Using default cfgStats.');
            storedCfgStats = {};
        }
        mergeCfg(storedCfgStats, defaultCfgStats, cfgStats, 'stats');
    }

    let startTime = timeRecords['startTime'] || 0;
    let timestamp = new Date(timeRecords['startTime']).toISOString().slice(0, 19).replace('T', ' ');
    let date = timestamp.slice(0, 10);
    let result = 'undefined';
    if (log.innerHTML.includes('You are Victorious!')) {
        result = 'Victory';
    } else if (log.innerHTML.includes('You have been defeated.')) {
        result = 'Defeat';
    } else if (log.innerHTML.includes('You have escaped from the battle.')) {
        result = 'Flee';
    }
    let deltaSeconds = (Date.now() - startTime) / 1000;
    let deltaTime = jpxUtils.secondsToTime(deltaSeconds, true);
    let action = timeRecords['action'];
    let tps = Math.round(action / deltaSeconds * 100) / 100;

    //revenueRecords
    let priceData = await jpxMarket.getMarketPrice();
    for (const [categoryKey, categoryValue] of Object.entries(revenueRecords)) {
        switch (categoryKey) {
            case ('proficiency'):
                for (const [key, value] of Object.entries(categoryValue)) {
                    categoryValue[key] = Math.round(value * 1000) / 1000;
                }
                break;
            case ('consumable'):
                for (const [key, value] of Object.entries(categoryValue)) {
                    value['balance'] = value['drop'] - value['use'];
                    jpxUtils.inc(categoryValue, 'profit', (priceData[key] || 0) * value['balance']);
                }
                break;
            case ('material'):
            case ('token'):
            case ('food'):
            case ('figurine'):
            case ('artifact'):
            case ('trophy'):
                for (const [key, value] of Object.entries(categoryValue)) {
                    jpxUtils.inc(categoryValue, 'profit', (priceData[key] || 0) * value);
                }
                break;
            case ('crystal'):
                for (const [key, value] of Object.entries(categoryValue)) {
                    jpxUtils.inc(categoryValue, 'total', value);
                    jpxUtils.inc(categoryValue, 'profit', (priceData[key] || 0) * value);

                }
                break;
        }
        if (categoryValue?.['profit']) {
            categoryValue['profit'] = Math.round(categoryValue['profit'] * 10) / 10;
            revenueRecords['totalProfit'] += categoryValue['profit'];
        }
    }

    revenueRecords['totalProfit'] += revenueRecords['credit'] || 0;
    revenueRecords['totalProfit'] = Math.round(revenueRecords['totalProfit']);

    //Stamina
    let stamina = parseFloat(localStorage.getItem(prefix + 'stamina' + isekaiSuffix)) || 80;
    let greatCost = !isekaiSuffix ? 0.03 : 0.06;
    let normalCost = !isekaiSuffix ? 0.02 : 0.04;
    let greatRoundQuota = Math.floor(Math.max(0, stamina - (battleType === 'Battle1000' ? 1 : 0) - 60) / greatCost);
    let greatRound = Math.min(greatRoundQuota, roundInfo.current);
    let normalRound = roundInfo.current - greatRound;
    let staminaCost = greatRound * greatCost + normalRound * normalCost;

    if (battleType === 'Encounter' || battleType === 'Colosseum') {
        staminaCost = 0;
    } else if (battleType === 'Battle1000') {
        staminaCost += 1;
    }
    //    Daily 24 and LongGoneBeforeDaylight 20
    let staminaRecords = JSON.parse(localStorage.getItem(prefix + 'staminaRecords' + isekaiSuffix) || '{}');
    let currentDate = new Date().toISOString().slice(0, 10);
    if (
        !staminaRecords?.lastUpdate ||
        new Date(staminaRecords.lastUpdate).toISOString().slice(0, 10) != currentDate
    ) {
        staminaRecords = { lastUpdate: Date.now(), staminaCost: 0 };
    }

    let staminaQuota = 24 + (!isekaiSuffix ? cfgBattle.dailyStaminaQuotaPlus : 0) - staminaRecords.staminaCost;
    if (staminaCost > staminaQuota) {
        if (staminaQuota > 0) {
            revenueRecords['staminaCost'] = Math.round((staminaCost - staminaQuota) * 10) / 10;
        } else {
            revenueRecords['staminaCost'] = Math.round(staminaCost * 10) / 10;
        }
    } else {
        revenueRecords['staminaCost'] = 0;
    }
    staminaRecords.staminaCost = Math.round((staminaRecords.staminaCost + staminaCost) * 10) / 10;
    localStorage.setItem(prefix + 'staminaRecords' + isekaiSuffix, JSON.stringify(staminaRecords));
    //Final Profit
    let staminaUnitPrice = priceData['Energy Drink'] / 10;
    let staminaProfit = Math.round(-revenueRecords['staminaCost'] * staminaUnitPrice * 10) / 10;
    revenueRecords['finalProfit'] = Math.round((revenueRecords['totalProfit'] + staminaProfit) * 10) / 10;

    let battleRecords = {
        world: !isekaiSuffix ? 'Persistent' : 'Isekai',
        timestamp: timestamp,
        date: date,
        playerLevel: parseInt(localStorage.getItem(prefix + 'playerLevel' + isekaiSuffix)) || 0,
        difficulty: difficultyMap[localStorage.getItem(prefix + 'difficulty' + isekaiSuffix)] || 0,
        persona: localStorage.getItem(prefix + 'persona' + isekaiSuffix),
        battleType: battleType,
        towerFloor: towerFloor,
        roundInfo: roundInfo,
        result: result,
        deltaSeconds: deltaSeconds,
        deltaTime: deltaTime,
        turns: timeRecords.action,
        tps: tps,
        riddle: timeRecords.riddle.total,
        combatRecords: combatRecords,
        revenueRecords: revenueRecords,
    }

    timeRecordPlayer(battleRecords);
    combatRecordPlayer(combatRecords);
    revenueRecordPlayer(revenueRecords, priceData);
    newWindowRecordPlayer(battleRecords);
    if (cfgBattle.recordBattleLog) battleLogPlayer();

    storeBattleRecords(battleRecords)
        .then(result => console.log(result))
        .catch(err => console.error('Save failed: ', err));

    cfgBattle.recordBattleLog && console.log(battleLogRecord);
    console.log(timeRecords);
    console.log(combatRecords);
    console.log(revenueRecords);
    console.log(battleRecords);
}

function newWindowRecordPlayer(battleRecords) {
    try {
        const battleRecordsStr = JSON.stringify(battleRecords);
        const btn = document.createElement('button');
        btn.textContent = 'New Tab Record';
        btn.style.margin = '5px';
        btn.addEventListener('click', () => {
            const win = window.open();
            if (!win) return;
            win.onload = () => {
                let data = win.document.createElement('script');
                data.type = 'text/javascript';
                data.text = `var battleRecords = ${battleRecordsStr};`;
                let script = win.document.createElement('script');
                script.type = 'text/javascript';
                script.src = "/script/battleRecord.js";
                win.document.head.append(data);
                win.document.head.append(script);
            };
        });
        
        const container = document.getElementById('battleRecordsButtons');
        if (container) {
            container.appendChild(btn);
        }
    } catch (e) {
        console.error('newWindowRecordPlayer error:', e);
    }
}

function battleLogPlayer() {
    let blob = new Blob([JSON.stringify(battleLogRecord, null, '\t')], { type: 'text/plain;charset=utf-8' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    log.parentNode.insertBefore(a, log.parentNode.firstChild);
    a.innerText = 'Download Battle Log';
    a.style.cssText = 'float: left; font-size: 200%; margin: 10px 0px;';
    a.href = url;
    a.download = 'battleLog.txt';
}

function timeRecordPlayer(battleRecords) {
    let btcp = document.querySelector('#btcp');
    if (!btcp) return;
    let div = document.createElement('div');
    div.id = 'time-records-div';
    cfgStats.darkMode && div.classList.add('dark-mode');

    let riddleSolved = timeRecords.riddle.solved < timeRecords.riddle.total ? `${timeRecords.riddle.solved} / ` : '';
    div.innerText =
        `${battleRecords.turns.toLocaleString()} ${t('tP.turns')}   ${battleRecords.deltaTime}  (${battleRecords.tps} ${t('tP.t/s')})   ` +
        `${riddleSolved}${timeRecords.riddle.total} ${t('tP.riddle')}   ${combatRecords.use['Cloak of the Fallen'] || 0} ${t('tP.spark')}`;
    btcp.appendChild(div);
}

function combatRecordPlayer(combatRecords) {
    let table = document.createElement('table');
    table.id = 'combat-records-table';
    table.className = 'records-table';
    cfgStats.darkMode && table.classList.add('dark-mode');
    let tbody = document.createElement('tbody');

    let innerHTML = `
        <tr>
            <td></td>
            <td colspan="3">${t('cP.damageDealt')}</td>
            <td colspan="5">${t('cP.damageTaken')}</td>
        </tr>
        <tr>
            <td></td>
            <td>${t('cP.physical')}</td><td>${t('cP.magical')}</td><td>${t('cP.total')}</td>
            <td>${t('cP.physical')}</td><td>${t('cP.spirit')}</td><td>${t('cP.magical')}</td><td>${t('cP.spirit')}</td><td>${t('cP.total')}</td>
        </tr>`;
    /*isekai911*/
    if (isekaiSuffix) {
        innerHTML = `
            <tr>
                <td></td>
                <td colspan="3">${t('cP.damageDealt')}</td>
                <td colspan="4">${t('cP.damageTaken')}</td>
            </tr>
            <tr>
                <td></td>
                <td>${t('cP.physical')}</td><td>${t('cP.magical')}</td><td>${t('cP.total')}</td>
                <td>${t('cP.physical')}</td><td>${t('cP.magical')}</td><td>${t('cP.spirit')}</td><td>${t('cP.total')}</td>
            </tr>`;
    }
    /*isekai912*/

    function renderCombatRow(label, rowId, style, combatRecords, rowConfig) {
        let pd = combatRecords.physicalDealt[rowId] ?? 0;
        let md = combatRecords.magicalDealt[rowId] ?? 0;
        let td = pd + md;

        let pt = combatRecords.physicalTaken[rowId] ?? 0;
        let pts = combatRecords.physicalTaken['spiritShield' + rowId] ?? 0;
        let mt = combatRecords.magicalTaken[rowId] ?? 0;
        let mts = combatRecords.magicalTaken['spiritShield' + rowId] ?? 0;
        let tt = pt + pts + mt + mts;

        let dataObj = { label, pd, md, td, pt, pts, mt, mts, tt };
        let order = ['label', 'pd', 'md', 'td', 'pt', 'pts', 'mt', 'mts', 'tt'];
        /*isekai911*/
        if (isekaiSuffix) order = ['label', 'pd', 'md', 'td', 'pt', 'mt', 'pts', 'tt'];
        /*isekai912*/

        let html = `<tr ${style}>`;
        order.forEach((k, index) => {
            let v = dataObj[k];
            let styleStr = rowConfig[`s_${k}`] || '';
            let styleText = styleStr ? ` style="${styleStr}"` : '';
            html += `<td${styleText}>${(v === 0 && index !== 0) ? '' : v.toLocaleString()}</td>`;
        });
        html += '</tr>';
        return html;
    };

    let totals = {};
    let totalsTypes = ['damage', 'result', 'resultPartially'];
    COMBAT_FIELDS.forEach(f => {
        if (!totalsTypes.includes(f.type) || f.isTotal) return;
        totals[f.type] ??= { pd: 0, md: 0, pt: 0, pts: 0, mt: 0, mts: 0 };

        let acc = totals[f.type];
        acc.pd += (combatRecords.physicalDealt[f.id] ?? 0);
        acc.md += (combatRecords.magicalDealt[f.id] ?? 0);
        acc.pt += (combatRecords.physicalTaken[f.id] ?? 0);
        acc.pts += (combatRecords.physicalTaken['spiritShield' + f.id] ?? 0);
        acc.mt += (combatRecords.magicalTaken[f.id] ?? 0);
        acc.mts += (combatRecords.magicalTaken['spiritShield' + f.id] ?? 0);
    });

    cfgStats.combatRows.forEach(row => {
        /*isekai911*/
        let excludeIds = !isekaiSuffix
            ? ['glance', 'parryPartially', 'resistPartially', 'blockPartially']
            : ['resist50', 'resist75', 'resist90'];
        if (excludeIds.includes(row.id)) return;
        /*isekai912*/

        let field = COMBAT_FIELDS.find(f => f.id === row.id);
        let styleNormal = row.styleText ? `style="${row.styleText}"` : '';
        let styleTotal = `style="border-top: 1px solid; border-bottom: 1px solid; ${row.styleText || ''}"`;

        switch (field.type) {
            case 'damage':
            case 'result':
            case 'resultPartially': {
                if (field.isTotal) {
                    let totalData = { ...(totals[field.type] || { pd: 0, md: 0, pt: 0, pts: 0, mt: 0, mts: 0 }) };
                    /*patch*/if (isekaiSuffix && field.type === 'result') totalData.pt -= combatRecords.physicalTaken.blockAndParry || 0;
                    innerHTML += renderCombatRow(t(field.label), 'total', styleTotal, {
                        physicalDealt: { total: totalData.pd || 0 },
                        magicalDealt: { total: totalData.md || 0 },
                        physicalTaken: { total: totalData.pt || 0, spiritShieldtotal: totalData.pts || 0 },
                        magicalTaken: { total: totalData.mt || 0, spiritShieldtotal: totalData.mts || 0 }
                    }, row);
                } else {
                    innerHTML += renderCombatRow(t(field.label), field.id, styleNormal, combatRecords, row);
                }
                break;
            }
        }
    });

    /*isekai911*/
    if (isekaiSuffix) {
        innerHTML += `
            <tr style="border-top: 1px solid; border-bottom: 1px solid;">
                <td colspan="2" style="text-align: center;">${t('cP.critStack')}</td>
                <td colspan="2" style="text-align: center;">${t('cP.debuffResist')}</td>
                <td colspan="4"></td>
            </tr>
        `;

        let debuffResistTotal = 0;
        let debuffMap = {
            1: { key: 'debuffResist0', label: t('cP.debuffResist0') },
            2: { key: 'debuffResist1', label: t('cP.debuffResist1-2') },
            3: { key: 'debuffResist3', label: t('cP.debuffResist3') },
        };

        for (let i = 1; i < 10; i++) {
            let critStack = combatRecords.physicalDealt[`crit${i}`];
            if (i <= 4) {
                innerHTML += `<tr><td>${i}x-${t('cP.crit')}</td><td>${(critStack || '').toLocaleString()}</td>`;
                if (i < 4) {
                    let value = combatRecords.magicalDealt[debuffMap[i].key] || 0;
                    debuffResistTotal += value;
                    innerHTML += `<td style="text-align: left;">${debuffMap[i].label}</td><td>${(value || '').toLocaleString()}</td>`;
                } else if (i === 4) {
                    innerHTML += `<td style="border: 1px solid; text-align: left;">${t('cP.total')}</td><td style="border: 1px solid;">${(debuffResistTotal || '').toLocaleString()}</td>`;
                }
                innerHTML += '<td colspan="4"></td></tr>';
            } else if (critStack) {
                innerHTML += `<tr><td>${i}x-${t('cP.crit')}</td><td>${(critStack || '').toLocaleString()}</td><td colspan="6"></td></tr>`;
            }
        }
    }
    /*isekai912*/

    tbody.innerHTML = innerHTML;
    table.appendChild(tbody);
    log.parentNode.insertBefore(table, log.parentNode.firstChild);

    combatRecordPlayer_Use(combatRecords)
}

function combatRecordPlayer_Use(combatRecords) {
    let table = document.createElement('table');
    table.id = 'combat-records-use-table';
    if (cfgStats.darkMode) table.classList.add('dark-mode');
    let tbody = document.createElement('tbody');

    let innerHTML = `<tr><th colspan="2">${t('cP.used')}</th></tr>`;

    function renderCombatUseRow(label, entries) {
        if (!entries.length) return;
        innerHTML += `<tr><td>${t(label)}</td><td>${entries.join(', ')}</td></tr>`;
    }

    let useKeys = new Set();
    let temp_combatUseRows = [{"id":"action"}, {"id":"item"}, {"id":"skill"}, {"id":"spellSupport"}, {"id":"spellDamage"}, {"id":"spellDebuff"}];
    temp_combatUseRows.forEach(row => {
        let field = COMBAT_USE_FIELDS.find(f => f.id === row.id);
        let entries = [];
        for (const { key, label } of field.keys) {
            let count = combatRecords.use[key];
            if (count) {
                entries.push(`${t(label)}: ${count}`);
                useKeys.add(key);
            }
        }
        renderCombatUseRow(field.label, entries);
    });

    let others = [];
    for (const [key, value] of Object.entries(combatRecords.use)) {
        if (useKeys.has(key)) continue;
        others.push(`${t(`cB.${key}`)}: ${value}`);
    }
    renderCombatUseRow(t('cP.misc'), others);

    tbody.innerHTML = innerHTML;
    table.appendChild(tbody);
    let combatRecordsTable = document.querySelector('#combat-records-table');
    combatRecordsTable.parentNode.insertBefore(table, combatRecordsTable.nextSibling);
}

function revenueRecordPlayer(revenueRecords, priceData) {
    let btcp = document.querySelector('#btcp');
    if (!btcp) return;

    let table = document.createElement('table');
    table.id = 'revenue-records-table';
    table.className = 'records-table';
    cfgStats.darkMode && table.classList.add('dark-mode');
    let tbody = document.createElement('tbody');

    let innerHTML = `
        <tr style="border: 1px solid;"><td colspan="6">${t('rP.revenue')}</td></tr>
        <tr style="border: 1px solid;">
            <td style="text-align: left;">${t('rP.name')}</td>
            <td>${t('rP.drop')}</td><td>${t('rP.use')}</td><td>${t('rP.balance')}</td><td>${t('rP.unitPrice')}</td><td>${t('rP.profit')}</td>
        </tr>`;

    cfgStats.revenueRows.forEach(row => {
        let field = REVENUE_FIELDS.find(f => f.id === row.id);
        let data = revenueRecords[field.source || field.id];
        let styleNormal = row.styleText ? `style="${row.styleText}"` : '';
        let styleFirst = `style="border-top: 1px solid; ${row.styleText || ''}"`;

        switch (field.type) {
            case 'simple': {
                let value = field.key ? data[field.key] : data;
                if (value) {
                    innerHTML += `<tr${value < 0 ? ' class="deficit"' : ''} ${styleFirst}>
                        <td>${t(field.label)}</td>
                        <td colspan="5" style="text-align: center;">${value.toLocaleString()}</td>
                    </tr>`;
                }
                break;
            }
            case 'list_flat':
            case 'list_paired': {
                let dataKeys = Object.keys(data);
                let sortedKeys = jpxUtils.getSortedKeys(field.order || [], dataKeys);

                let items = [];
                sortedKeys.forEach(sortedKey => {
                    if (field.type === 'list_flat') items.push(...data[sortedKey]);
                    else if (field.type === 'list_paired') items.push(`${t(`rP.${sortedKey}`)}: ${data[sortedKey]}`);
                });
                if (!items.length) break;

                let firstItem = items.shift();
                innerHTML += `<tr ${styleFirst}>
                    <td rowspan="${items.length + 1}">${t(field.label)}</td>
                    <td colspan="5" style="text-align: center;">${firstItem}</td>
                </tr>`;
                items.forEach(item => {
                    innerHTML += `<tr ${styleNormal}><td colspan="5" style="text-align: center;">${item}</td></tr>`;
                });
                break;
            }
            case 'grid':
            case 'grid_detailed': {
                let dataKeys = Object.keys(data).filter(key => {
                    if (key === 'total' || key === 'profit') return false;
                    let value = data[key];
                    if (value && typeof value === 'object') return !jpxUtils.isEmpty(value);
                    return value;
                });
                let sortedKeys = jpxUtils.getSortedKeys(field.order || [], dataKeys);
                if (!sortedKeys.length) break;

                const renderRow = (key, rowStyle) => {
                    let value = data[key];
                    let balance = (field.type === 'grid_detailed') ? (value.drop - value.use) : value;
                    let unitPrice = priceData[key];
                    let tdClass = !isNaN(unitPrice) ? '' : ' class="noData"';
                    let tdUnitPrice = !isNaN(unitPrice) ? unitPrice.toLocaleString() : t('rP.noData');
                    let tdProfit = !isNaN(unitPrice) ? (Math.round(unitPrice * balance * 10) / 10).toLocaleString() : t('rP.noData') ;
                    let profitTds = `<td${tdClass}>${tdUnitPrice}</td><td${tdClass}>${tdProfit}</td>`;

                    if (field.type === 'grid_detailed') {
                        return `<tr${balance < 0 ? ' class="deficit"' : ''} ${rowStyle}>
                            <td>${t(`rP.${key}`)}</td><td>${value.drop}</td><td>${value.use}</td><td>${balance}</td>${profitTds}
                        </tr>`;
                    } else {
                        return `<tr ${rowStyle}>
                            <td>${t(`rP.${key}`)}</td><td colspan="3">${value}</td>${profitTds}
                        </tr>`;
                    }
                };

                let firstKey = sortedKeys.shift();
                innerHTML += renderRow(firstKey, styleFirst);
                sortedKeys.forEach(sortedKey => innerHTML += renderRow(sortedKey, styleNormal));
                break;
            }
            case 'total': {
                if (data && data.total) {
                    innerHTML += `<tr ${styleFirst}>
                        <td>${t(field.label)}</td>
                        <td colspan="3">${data.total}</td><td></td><td>${data.profit}</td>
                    </tr>`;
                }
                break;
            }
            case 'stamina': {
                let staminaRecords = JSON.parse(localStorage.getItem(prefix + 'staminaRecords' + isekaiSuffix) || '{}');
                let staminaCost = staminaRecords?.staminaCost ?? 0;
                let staminaQuotaTotal = 24 + (!isekaiSuffix ? cfgBattle.dailyStaminaQuotaPlus : 0)
                let unitPrice = priceData['Energy Drink'] / 10;
                let balance = -revenueRecords.staminaCost || 0;
                let profit = Math.round(balance * unitPrice * 10) / 10;
                innerHTML += `<tr${profit < 0 ? ' class="deficit"' : ''} ${styleFirst}>
                    <td>${t(field.label)}</td><td>${staminaQuotaTotal}</td><td>${staminaCost}</td><td>${balance}</td>
                    <td>${unitPrice.toLocaleString()}</td><td>${profit.toLocaleString()}</td>
                </tr>`;
                break;
            }
            case 'summary': {
                let trClass = data < 0 ? 'deficit' : (data > 0 ? 'surplus' : '');
                innerHTML += `<tr class="${trClass}" ${styleFirst}>
                    <td>${t(field.label)}</td>
                    <td colspan="5" style="text-align: center;">${data.toLocaleString()}</td>
                </tr>`;
                break;
            }
        }
    });

    tbody.innerHTML = innerHTML;
    table.appendChild(tbody);
    btcp.appendChild(table);
}

//Indexed DB
function openDB() {
    return new Promise((resolve, reject) => {
        let request = window.indexedDB.open('jpx', 1);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            if (!db.objectStoreNames.contains('battleRecords')) {
                let objectStore = db.createObjectStore('battleRecords', {
                    keyPath: 'timestamp'
                });
                objectStore.createIndex('date', 'date');
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject(request.error);
        };;
    });
}

async function storeBattleRecords(battleRecords) {
    const db = await openDB();

    const transaction = db.transaction('battleRecords', 'readwrite');
    transaction.objectStore('battleRecords').put(battleRecords);

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
            resolve('Saved successfully');
        };
        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}

function openBattleRecords() {
    if (Object.keys(cfgStats).length < 1) {
        let storedCfgStats = {};
        try {
            storedCfgStats = JSON.parse(localStorage.getItem(prefix + 'cfgStats') || '{}');
        } catch (err) {
            console.warn('Failed to load cfgStats. Using default cfgStats.');
            storedCfgStats = {};
        }
        mergeCfg(storedCfgStats, defaultCfgStats, cfgStats, 'stats');
    }

    newWindow = window.open();
    if (newWindow === null || newWindow === undefined) return;

    newWindow.document.title = t('sP.jpxStats');
    newWindow.document.head.appendChild(newWindow.document.createElement('style')).innerHTML = `
        :root {
            --stats-bg: #e8e3d1;
            --stats-panel: #f5f0df;
            --stats-border: #7f6a45;
            --stats-text: #2b2116;
            --stats-muted: #5f4d34;
            --stats-accent: #5a1b1b;
            --stats-accent-soft: #e3d6ba;
            --stats-row-hover: #fffaf0;
            --stats-tooltip-bg: #fffaf0;
            --stats-font: Arial, Helvetica, "Microsoft YaHei", sans-serif;
            --stats-scroll-track: #ded5bd;
            --stats-scroll-thumb: #9a8866;
            --stats-scroll-thumb-hover: #7f6a45;
        }

        body.dark-mode {
            --stats-bg: #151515;
            --stats-panel: #202020;
            --stats-border: #666;
            --stats-text: #e8e0cd;
            --stats-muted: #c3bda9;
            --stats-accent: #c89956;
            --stats-accent-soft: #332a1c;
            --stats-row-hover: #2a2a2a;
            --stats-tooltip-bg: #2a2a2a;
            --stats-scroll-track: #252525;
            --stats-scroll-thumb: #666;
            --stats-scroll-thumb-hover: #888;
        }

        body {
            margin: 0;
            padding: 10px;
            text-align: center;
            background: var(--stats-bg);
            color: var(--stats-text);
            font-family: var(--stats-font);
            font-size: 12px;
        }

        * {
            scrollbar-width: thin;
            scrollbar-color: var(--stats-scroll-thumb) var(--stats-scroll-track);
        }

        *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        *::-webkit-scrollbar-track {
            background: var(--stats-scroll-track);
            border-radius: 0;
        }

        *::-webkit-scrollbar-thumb {
            background: var(--stats-scroll-thumb);
            border-radius: 0;
        }

        *::-webkit-scrollbar-thumb:hover {
            background: var(--stats-scroll-thumb-hover);
        }

        #filtersDiv {
            margin: 0 auto 12px;
            width: fit-content;
            max-width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            gap: 10px;
            padding: 6px;
            border: 1px solid var(--stats-border);
            border-radius: 0;
            background: var(--stats-panel);
        }

        #filtersDiv .filter-group {
            min-width: 128px;
            border-radius: 0;
            border: 1px solid var(--stats-border);
            background: var(--stats-accent-soft);
            overflow: hidden;
        }

        #filtersDiv .filter-group > summary {
            list-style: none;
            cursor: pointer;
            user-select: none;
            padding: 4px 8px;
            color: var(--stats-text);
            font-weight: 700;
            text-align: left;
            border-bottom: 1px solid var(--stats-border);
        }

        #filtersDiv .filter-group > summary::-webkit-details-marker {
            display: none;
        }

        #filtersDiv .filter-group[open] > summary {
            border-bottom-color: var(--stats-border);
        }

        #filtersDiv .filter-group > summary:hover {
            background: var(--stats-row-hover);
        }

        #filtersDiv .filter-options {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
            padding: 6px;
        }

        #filtersDiv label {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            color: var(--stats-muted);
            font-weight: 600;
            white-space: nowrap;
        }

        #filtersDiv input[type="checkbox"] {
            accent-color: var(--stats-accent);
        }

        #filtersDiv input[type="number"] {
            width: 72px;
            height: 24px;
            border: 1px solid var(--stats-border);
            border-radius: 0;
            background: var(--stats-panel);
            color: var(--stats-text);
            text-align: right;
            padding: 2px 5px;
            font-weight: 600;
            box-sizing: border-box;
            font: 12px/18px var(--stats-font);
        }

        #filtersDiv input[type="number"]:focus {
            outline: 1px solid var(--stats-accent);
            border-color: var(--stats-accent);
        }

        #battleStatsWrap {
            margin: 10px auto 0;
            width: min(100%, calc(100vw - 32px));
            max-height: 72vh;
            overflow: auto;
            border-radius: 0;
        }

        #battleStatsTable {
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
            margin: 0;
            border: 1px solid var(--stats-border);
            background: var(--stats-panel);
            min-width: max-content;
        }

        #battleStatsTable tr {
            font-size: 80%;
        }

        #battleStatsTable tbody tr:hover {
            background-color: var(--stats-row-hover);
        }

        #battleStatsTable td,
        #battleStatsTable th {
            min-width: 20px;
            padding: 3px 5px;
            white-space: nowrap;
            border: 1px solid var(--stats-border);
        }

        #battleStatsTable th {
            position: sticky;
            top: 0;
            z-index: 3;
            background: var(--stats-accent-soft);
            color: var(--stats-text);
            text-align: center;
            font-weight: 700;
        }

        #battleStatsTable tr:last-child td {
            border-bottom: 0;
        }

        .tooltip {
            position: relative;
            cursor: help;
        }
        .tooltip:hover::after {
            display: block;
            position: absolute;
            bottom: 100%;
            right: 0;
            margin-bottom: 6px;
            content: attr(content);
            border: 1px solid var(--stats-border);
            border-radius: 0;
            background: var(--stats-tooltip-bg);
            color: var(--stats-text);
            padding: 5px 8px;
            white-space: pre;
            z-index: 99;
            text-align: left;
            min-width: max-content;
        }

        @media (max-width: 900px) {
            body {
                padding: 10px;
                font-size: 12px;
            }

            #filtersDiv {
                justify-content: stretch;
                gap: 8px;
                padding: 8px;
            }

            #filtersDiv .filter-group {
                width: 100%;
            }

            #filtersDiv .filter-options {
                gap: 4px;
                padding: 7px;
            }

            #battleStatsWrap {
                width: 100%;
                max-height: 70vh;
                border-radius: 0;
            }

            #battleStatsTable td,
            #battleStatsTable th {
                padding: 5px 6px;
                font-size: 11px;
            }
        }
    `;

    cfgStats.darkMode && newWindow.document.body.classList.add('dark-mode');
    newWindow.document.body.appendChild(createFilter());
    getBattleRecordsRender().then(battleRecords => {
        renderDynamicTable(battleRecords, cfgStats.statsColumns, newWindow.document.body);
    });
}

async function getBattleRecordsRender() {
    const db = await openDB();
    const transaction = db.transaction('battleRecords', 'readonly');
    const objectStore = transaction.objectStore('battleRecords');

    let battleRecords = [];
    let filters = getFilters();
    let indexName = filters.aggregate ? 'date' : 'default';

    let keyRange = IDBKeyRange.bound(0, 'z');
    let source = (indexName === 'default' ? objectStore : objectStore.index(indexName));
    let i = 0;

    return new Promise(resolve => {
        const req = source.openCursor(keyRange, 'prevunique');
        req.onsuccess = function(e) {
            let cursor = e.target.result;

            if (!cursor || i >= filters.limit) {
                battleRecords.unshift(generateAggregate(battleRecords, 'Total'), generateAggregate(battleRecords, 'Average'));

                resolve(battleRecords);
                return;
            }

            if (indexName === 'date') {
                let dailyReq = objectStore.index('date').getAll(cursor.key);
                dailyReq.onsuccess = function(ev) {
                    let results = ev.target.result || [];
                    results = results.filter(x => filterData(x, filters));
                    if (results.length > 0) {
                        battleRecords.push(generateAggregate(results, 'Total', results[0].date));
                        i += 1;
                    }

                    cursor.continue();
                };

                return;
            }

            let bs = filterData(cursor.value, filters);
            if (bs) {
                battleRecords.push(bs);
                i += 1;
            }

            cursor.continue();
        };
    });
}

async function exportIndexedDB() {
    const db = await openDB();
    const exportData = {
        dbName: db.name,
        version: db.version,
        stores: {},
    };

    for (const storeName of db.objectStoreNames) {
        exportData.stores[storeName] = await new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const req = objectStore.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    db.close();
    return exportData;
}

async function importIndexedDB(jsonData, merge = true) {
    if (!jsonData?.stores || typeof jsonData.stores !== 'object') {
        throw new Error(t('cGen.invalidImportData'));
    }

    const db = await openDB();

    for (const storeName in jsonData.stores) {
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);

        if (!merge) objectStore.clear();
        let existingKeys = null;
        if (merge) {
            existingKeys = await new Promise((resolve, reject) => {
                const req = objectStore.getAllKeys();
                req.onsuccess = () => resolve(new Set(req.result));
                req.onerror = () => reject(req.error);
            });
        }

        for (const record of jsonData.stores[storeName]) {
            const key = record[objectStore.keyPath];
            if (merge) {
                if (!existingKeys.has(key)) objectStore.put(record);
            } else {
                objectStore.put(record);
            }
        }

        await new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    db.close();
}

function filterData(data, filters) {
    if (filters.world && !filters.world.includes(data.world)) {return false }
    if (filters.battleType && !filters.battleType.includes(data.battleType)) {return false}
    if (filters.difficulties && !filters.difficulties.includes(data.difficulty.toString())) {return false}
    if (filters.result && !filters.result.includes(data.result)) {return false}
    if (filters.roundTotal && !jpxUtils.inRange(data.roundInfo.total, filters.roundTotal)) {return false}

    return data;
}

function generateAggregate(data_array, type, timestamp_name = null) { //type: Average, Total
    if (data_array.length === 0) {
        return false
    } else {
        let length = type === 'Average' ? data_array.length : 1;
        let total_turns = data_array.map(x => x.turns).reduce((a,b) => a + b, 0);
        let total_deltaSeconds = data_array.map(x => x.deltaSeconds).reduce((a,b) => a + b, 0);

        let new_data = {
            date: timestamp_name || t(`sP.${type}`),
            roundInfo: {
                current: Math.round(data_array.map(x => x.roundInfo.current).reduce((a,b) => a + b, 0) / length * 100) / 100,
                total: Math.round(data_array.map(x => x.roundInfo.total).reduce((a,b) => a + b, 0) / length * 100) / 100,
            },
            deltaSeconds: type === 'Average' ? (Math.round(total_deltaSeconds / length * 1000) / 1000) : Math.round(total_deltaSeconds * 1000) / 1000,
            deltaTime: '',
            turns: type === 'Average' ? (Math.round(total_turns / length * 100) / 100) : total_turns,
            tps: 0,
            riddle: 0,
            aggregateType: type,
            combatRecords: jpxUtils.createCombatRecords(),
            revenueRecords: jpxUtils.createRevenueRecords(),
        };
        new_data.deltaTime = jpxUtils.secondsToTime(new_data.deltaSeconds, true);
        new_data.tps = Math.round(new_data.turns / new_data.deltaSeconds * 100) / 100;

        for (let i = 0; i < data_array.length; i++) {
            new_data.riddle += data_array[i].riddle || 0;

            for (const [categoryKey, categoryValue] of Object.entries(data_array[i].combatRecords)) {
                for (const [fieldKey, fieldValue] of Object.entries(categoryValue)) {
                    jpxUtils.inc(new_data.combatRecords[categoryKey], fieldKey, fieldValue);
                }
            }
            for (const [categoryKey, categoryValue] of Object.entries(data_array[i].revenueRecords)) {
                switch (categoryKey) {
                    case ('credit'):
                    case ('staminaCost'):
                    case ('totalProfit'):
                    case ('finalProfit'):
                        new_data.revenueRecords[categoryKey] += categoryValue;
                        break;
                    case ('equipment'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            new_data.revenueRecords[categoryKey][key] ??= [];
                            new_data.revenueRecords[categoryKey][key] = new_data.revenueRecords[categoryKey][key].concat(value);
                        }
                        break;
                    case ('consumable'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            if (key != 'total' && key != 'profit') {
                                new_data.revenueRecords[categoryKey][key] ??= {};
                                jpxUtils.inc(new_data.revenueRecords[categoryKey][key], 'balance', value.balance);
                            }
                        }
                        break;
                    case ('token'):
                    case ('food'):
                    case ('figurine'):
                    case ('artifact'):
                    case ('trophy'):
                    case ('crystal'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            if (key != 'total' && key != 'profit') {
                                jpxUtils.inc(new_data.revenueRecords[categoryKey], key, value);
                            }
                        }
                        break;
                }
            }
        }

        if (type === 'Average') {
            new_data.riddle = Math.round(new_data.riddle / length * 10) / 10;

            for (const [categoryKey, categoryValue] of Object.entries(new_data.combatRecords)) {
                for (const [fieldKey, fieldValue] of Object.entries(categoryValue)) {
                    new_data.combatRecords[categoryKey][fieldKey] = Math.round(fieldValue / length * 10) / 10;
                }
            }
            for (const [categoryKey, categoryValue] of Object.entries(new_data.revenueRecords)) {
                switch (categoryKey) {
                    case ('credit'):
                    case ('staminaCost'):
                    case ('totalProfit'):
                    case ('finalProfit'):
                        new_data.revenueRecords[categoryKey] = Math.round(categoryValue / length * 10) / 10;
                        break;
                    case ('consumable'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            if (key != 'total' && key != 'profit') {
                                new_data.revenueRecords[categoryKey][key].balance = Math.round(value.balance / length * 10) / 10;
                            }
                        }
                        break;
                    case ('equipment'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            new_data.revenueRecords[categoryKey][key] = Math.round((Array.isArray(value) ? value.length : value) / length * 10) / 10;
                        }
                        break;
                    case ('material'):
                    case ('token'):
                    case ('food'):
                    case ('figurine'):
                    case ('artifact'):
                    case ('trophy'):
                    case ('crystal'):
                        for (const [key, value] of Object.entries(categoryValue)) {
                            if (key != 'total' && key != 'profit') {
                                new_data.revenueRecords[categoryKey][key] = Math.round(value / length * 10) / 10;
                            }
                        }
                        break;
                }
            }
        }

        return new_data;
    }
}

function createFilter() {
    let filtersDiv = newWindow.document.createElement('div');
    filtersDiv.id = 'filtersDiv';

    let checkboxSortArray = [
        {
            id: 'filter-aggregate',
            title: '汇总',
            sortArray: ['Aggregate by Day'],
        },
        {
            id: 'filter-world',
            title: '世界',
            sortArray: ['Persistent', 'Isekai'],
        },
        {
            id: 'filter-battleType',
            title: '战斗类型',
            sortArray: ['Arena', 'Encounter', 'Colosseum', 'Battle1000', 'Item', 'Tower'],
        },
        {
            id: 'filter-difficulties',
            title: '难度',
            sortArray: ['20', '15', '10', '7', '4', '2', '1'],
        },
        {
            id: 'filter-result',
            title: '结果',
            sortArray: ['Victory', 'Defeat', 'Flee'],
        },
    ];

    //checkBox Filter
    for (let checkboxSort of checkboxSortArray) {
        let group = newWindow.document.createElement('details');
        group.className = 'filter-group';
        group.id = `${checkboxSort.id}-group`;
        group.open = true;

        let summary = newWindow.document.createElement('summary');
        summary.textContent = checkboxSort.title;

        let filterDiv = newWindow.document.createElement('div');
        filterDiv.id = checkboxSort.id;
        filterDiv.className = 'filter-options';
        for (let checkboxValue of checkboxSort.sortArray) {
            let label = newWindow.document.createElement('label');
            let input = newWindow.document.createElement('input');
            input.type = 'checkbox';
            input.addEventListener('change', function() {
                getBattleRecordsRender().then(battleRecords => {
                    renderDynamicTable(battleRecords, cfgStats.statsColumns, newWindow.document.body);
                });
            });
            input.defaultChecked = true;
            input.value = checkboxValue;
            label.append(input);
            label.append(t(`sP.${checkboxValue}`));
            filterDiv.appendChild(label);
        }

        group.append(summary, filterDiv);
        filtersDiv.appendChild(group);
    }

    //range Filter
    let roundTotalGroup = newWindow.document.createElement('details');
    roundTotalGroup.className = 'filter-group';
    roundTotalGroup.id = 'filter-roundTotal-group';
    roundTotalGroup.open = true;

    let roundTotalSummary = newWindow.document.createElement('summary');
    roundTotalSummary.textContent = t('sP.roundTotal');

    let roundTotalDiv = newWindow.document.createElement('div');
    roundTotalDiv.id = 'filter-roundTotal';
    roundTotalDiv.className = 'filter-options';

    let roundMinInput = newWindow.document.createElement('input');
    roundMinInput.type = 'number';
    roundMinInput.addEventListener('change', function() {
        getBattleRecordsRender().then(battleRecords => {
            renderDynamicTable(battleRecords, cfgStats.statsColumns, newWindow.document.body);
        });
    });
    roundMinInput.value = 0;
    roundMinInput.min = '0';
    roundMinInput.step = '1';

    let roundMaxInput = newWindow.document.createElement('input');
    roundMaxInput.type = 'number';
    roundMaxInput.addEventListener('change', function() {
        getBattleRecordsRender().then(battleRecords => {
            renderDynamicTable(battleRecords, cfgStats.statsColumns, newWindow.document.body);
        });
    });
    roundMaxInput.value = 9999;
    roundMaxInput.min = '0';
    roundMaxInput.step = '1';

    let rangeSpan = newWindow.document.createElement('span');
    rangeSpan.textContent = ' to ';

    roundTotalDiv.append(roundMinInput, rangeSpan, roundMaxInput);
    roundTotalGroup.append(roundTotalSummary, roundTotalDiv);
    filtersDiv.appendChild(roundTotalGroup);

    //number Filter
    let rowsGroup = newWindow.document.createElement('details');
    rowsGroup.className = 'filter-group';
    rowsGroup.id = 'filter-rows-group';
    rowsGroup.open = true;

    let rowsSummary = newWindow.document.createElement('summary');
    rowsSummary.textContent = '记录条数';

    let filterDiv = newWindow.document.createElement('div');
    filterDiv.id = 'filter-rows';
    filterDiv.className = 'filter-options';
    let input = newWindow.document.createElement('input');
    input.type = 'number';
    input.addEventListener('change', function() {
        getBattleRecordsRender().then(battleRecords => {
            renderDynamicTable(battleRecords, cfgStats.statsColumns, newWindow.document.body);
        });
    });
    input.value = 50;
    input.min = '0';
    input.step = '1';
    filterDiv.append(input);
    rowsGroup.append(rowsSummary, filterDiv);
    filtersDiv.appendChild(rowsGroup);

    return filtersDiv;
}

function getFilters() {
    let filters = {};
    let aggregateInput = newWindow.document.querySelector('#filter-aggregate input[type="checkbox"]');
    filters.aggregate = aggregateInput?.checked === true;
    filters.world =  Array.from(newWindow.document.getElementById('filter-world').querySelectorAll('input:checked')).map(x => x.value);
    filters.battleType =  Array.from(newWindow.document.getElementById('filter-battleType').querySelectorAll('input:checked')).map(x => x.value);
    filters.difficulties =  Array.from(newWindow.document.getElementById('filter-difficulties').querySelectorAll('input:checked')).map(x => x.value);
    filters.result = Array.from(newWindow.document.getElementById('filter-result').querySelectorAll('input:checked')).map(x => x.value);
    let roundTotalInputs = newWindow.document.querySelectorAll('#filter-roundTotal input[type="number"]');
    if (roundTotalInputs.length >= 2) {
        let min = parseInt(roundTotalInputs[0].value);
        let max = parseInt(roundTotalInputs[1].value);
        min = isNaN(min) ? 0 : min;
        max = isNaN(max) ? Number.MAX_SAFE_INTEGER : max;
        filters.roundTotal = [min, max];
    }
    let limitInput = newWindow.document.querySelector('#filter-rows input[type="number"]');
    filters.limit = parseInt(limitInput?.value) || 1;

    return filters;
}

function renderDynamicTable(battleRecords, displayedColumns, parent) {
    newWindow.document.querySelector('#battleStatsWrap')?.remove();

    let activeFields = displayedColumns.map(column => {
        let baseField = STATS_FIELDS.find(f => f.id === column.id);
        return baseField ? { ...baseField, ...column } : null;
    }).filter(f => f);

    let table = newWindow.document.createElement('table');
    table.id = 'battleStatsTable';

    let thead = newWindow.document.createElement('thead');
    let theadHTML = '<tr>';
    for (const field of activeFields) {
        let style = field.style ? ` style="${field.style}"` : '';
        theadHTML += `<th${style}>${field.customName || t(field.label)}</th>`;
    }
    theadHTML += '</tr>';
    thead.innerHTML = theadHTML;
    table.appendChild(thead);

    let tbody = newWindow.document.createElement('tbody');

    const parseColorThresholds = (str) => {
        if (!str) return [];
        return str.split(',').map(s => {
            const [value, color] = s.split(':');
            return { min: parseFloat(value.trim()), color: color?.trim() };
        }).filter(thr => !isNaN(thr.min)).sort((a, b) => b.min - a.min);
    };

    for (const record of battleRecords) {
        let tr = newWindow.document.createElement('tr');

        for (const field of activeFields) {
            let td = newWindow.document.createElement('td');
            let value = field.get(record);

            if (field.styleText) td.style.cssText = field.styleText;
            if (field.doI18n) value = t(`sP.${value}`);
            
            if (!record.aggregateType && (field.id === 'eqP' || field.id === 'eqL' || field.id === 'eqM') && value > 0) {
                let eqType = field.id === 'eqP' ? 'Peerless' : (field.id === 'eqL' ? 'Legendary' : 'Magnificent');
                let eqList = record.revenueRecords?.equipment?.[eqType] || [];
                if (eqList.length > 0) {
                    td.classList.add('tooltip');
                    let displayList = [...eqList];
                    if (displayList.length > 25) {
                        displayList = displayList.slice(0, 25);
                        displayList.push(`...及其他 ${eqList.length - 25} 件`);
                    }
                    td.setAttribute('content', displayList.join('\n'));
                }
            }

            if (value && typeof value === 'object' && 'drop' in value) {
                td.classList.add('tooltip');
                td.setAttribute('content', `${t('sP.drop')}: ${value.drop.toLocaleString()}\n${t('sP.use')}: ${value.use.toLocaleString()}`);
                td.textContent = value.balance.toLocaleString();
            } else if (typeof value === 'number') {
                td.textContent = value.toLocaleString();

                if (field.colorThresholds) {
                    let thresholds = parseColorThresholds(field.colorThresholds);
                    let match = thresholds.find(thr => value >= thr.min);
                    if (match) td.style.color = match.color;
                }
            } else {
                td.textContent = value || '';
            }

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    let tableWrap = newWindow.document.createElement('div');
    tableWrap.id = 'battleStatsWrap';
    tableWrap.appendChild(table);
    parent.appendChild(tableWrap);
}

//Settings
function getBattleMode(defaultBattleStyle = 'Unarmed') {
    let modeKey = `${battleStyle || defaultBattleStyle}_${battleType}`;
    return !jpxUtils.isEmpty(cfgBattle[modeKey]) ? modeKey : `${battleStyle || defaultBattleStyle}_General`;
}

function renderSchema(container, schema, data) {
    container.innerHTML = '';

    if (schema.type === 'object') {
        let currentGroup = null;

        schema.properties.forEach(field => {
            const isHeading =
                (field.type === 'heading' || field.type === 'constant') &&
                field.class === 'heading';

            if (isHeading) {
                currentGroup = document.createElement('section');
                currentGroup.className = 'settings-group';

                let titleDiv = document.createElement('div');
                titleDiv.className = 'settings-group-title';
                titleDiv.textContent = t(field.label);

                currentGroup.appendChild(titleDiv);
                container.appendChild(currentGroup);
                return;
            }

            let fieldDiv = document.createElement('div');
            fieldDiv.className = 'field-block';
            if (
                field.hasModeDropdown ||
                ['array', 'fieldPicker', 'keyBasedObjectArray', 'conditionsArray', 'object'].includes(field.type)
            ) {
                fieldDiv.classList.add('field-block-wide');
            }
            renderField(fieldDiv, field, data);

            if (currentGroup) {
                currentGroup.appendChild(fieldDiv);
            } else {
                container.appendChild(fieldDiv);
            }
        });
    }
}

const BOOLEAN_LABEL_META = {
    advanceToNextRound: { short: '自动下一轮', title: '当前轮次结束后，自动点击进入下一轮战斗' },
    ajaxRound: { short: 'AJAX下一回合', title: '使用AJAX进入下一回合；如果其他脚本不兼容，可以关闭' },
    autoFinishBattle: { short: '自动结束战斗', title: '战斗结束后自动点击结束按钮' },
    notifyOnRiddle: { short: '小马谜题通知', title: '出现小马谜题时发出通知提醒' },
    showCooldowns: { short: '显示冷却', title: '在快捷栏位上显示动作、法术或物品的冷却回合数' },
    showDurations: { short: '显示状态回合', title: '在玩家和怪物状态图标上显示剩余回合数' },
    showRealTimeProficiency: { short: '显示熟练度', title: '战斗中即时显示本场目前获得的熟练度' },
    showMonsterIndex: { short: '显示怪物索引', title: '在怪物区域显示索引值，方便规则定位目标' },
    showMonsterInfo: { short: '显示怪物资料', title: '显示怪物类别、攻击类型与战斗力；需要安装怪物资料库脚本' },
    showMonsterHP: { short: '显示怪物HP', title: '显示怪物当前血量与最大血量' },
    recordBattleLog: { short: '记录战斗日志', title: '保存战斗日志，用于统计和复盘' },
    ctrlWidgetMouseEnter: { short: '悬停监听控件', title: '在控制元件上监听鼠标进入事件；部分环境下可提高控制按钮响应' },
    darkMode: { short: '深色界面', title: '切换设置界面、悬浮控件和统计界面的深色模式' },
    pSpiritStatus: { short: '要求灵动状态', title: '玩家必须处于灵动状态时才满足此条件' },
    bottomUp: { short: '由下而上', title: '从怪物J到怪物A的顺序处理目标' },
    toggled: { short: '目标为开启', title: '切换类动作需要处于开启状态' },
};

function getBooleanLabelMeta(field) {
    let fullLabel = t(field.label);
    let meta = BOOLEAN_LABEL_META[field.key] || {};
    return {
        shortLabel: meta.short || field.shortLabel || fullLabel,
        title: meta.title || field.title || fullLabel,
    };
}

function appendConfigLabel(container, field, inputId) {
    if (field.skipLabel) return null;

    let label = document.createElement('label');
    label.htmlFor = inputId;
    label.textContent = t(field.label);
    container.appendChild(label);
    return label;
}

function getTextWidthUnits(text = '') {
    return Array.from(String(text)).reduce((sum, char) => sum + (/[^\x00-\xff]/.test(char) ? 2 : 1), 0);
}

function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function setContentBasedWidth(element, text, options = {}) {
    if (!element || element.classList?.contains('jpx-input-wide')) return;

    let min = options.min ?? 8;
    let max = options.max ?? 44;
    let extra = options.extra ?? 4;
    let units = clampNumber(getTextWidthUnits(text || '') + extra, min, max);
    element.style.width = `${units}ch`;
}

function updateConfigInputWidth(input) {
    if (!input || input.dataset.jpxAutoWidth !== '1') return;

    let fallbackText = input.placeholder || input.title || '';
    let text = input.value || fallbackText;
    if (input.type === 'number') {
        setContentBasedWidth(input, text || '0', { min: 7, max: 14, extra: 3 });
    } else {
        setContentBasedWidth(input, text, { min: 10, max: 46, extra: 4 });
    }
}

function createConfigInput(type, field, inputId, className = '') {
    let input = document.createElement('input');
    input.id = inputId;
    input.type = type;
    if (className) input.className = className;
    input.autocomplete = 'off';

    if (type === 'text') input.spellcheck = false;
    if (type === 'number') input.step = field.step ?? 'any';
    if ((type === 'text' || type === 'number') && !className.includes('jpx-input-wide')) {
        input.dataset.jpxAutoWidth = '1';
        input.addEventListener('input', () => updateConfigInputWidth(input));
    }
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.title) input.title = field.title;
    else if (!field.skipLabel && field.label) input.title = t(field.label);

    ['min', 'max'].forEach(attr => {
        if (field[attr] !== undefined) input[attr] = field[attr];
    });

    return input;
}

function bindConfigNumberInput(input, getValue, setValue) {
    const restoreValue = () => {
        input.value = getValue() ?? 0;
        updateConfigInputWidth(input);
    };

    const commitValue = (restoreInvalid = false) => {
        let rawValue = input.value.trim();
        if (!rawValue) {
            if (restoreInvalid) restoreValue();
            return;
        }

        let value = Number(rawValue);
        if (!Number.isFinite(value)) {
            if (restoreInvalid) restoreValue();
            return;
        }

        setValue(value);
    };

    input.addEventListener('input', () => commitValue(false));
    input.addEventListener('blur', () => commitValue(true));
}

function closeJpxSelectPanels(except = null) {
    document.querySelectorAll('#settings-container .jpx-select-window').forEach(panel => {
        if (panel !== except) panel.style.display = 'none';
    });
}

function closeMultiSelectPanels() {
    document.querySelectorAll('.multiSelect-popup-panel').forEach(panel => {
        panel.style.display = 'none';
    });
}

function positionMultiSelectPanel(panel, summary) {
    let listRect = panel.offsetParent?.getBoundingClientRect() || summary.parentElement.getBoundingClientRect();
    let summaryRect = summary.getBoundingClientRect();
    let bounds = summary.closest('.rule-editor-window') || summary.closest('#settings-container') || document.documentElement;
    let boundsRect = bounds.getBoundingClientRect();
    let margin = 8;
    let minLeft = boundsRect.left + margin;
    let maxRight = boundsRect.right - margin;
    let availableWidth = Math.max(220, maxRight - minLeft);

    panel.style.maxWidth = `${availableWidth}px`;

    let panelWidth = Math.min(panel.offsetWidth, availableWidth);
    let left = clampNumber(summaryRect.left, minLeft, Math.max(minLeft, maxRight - panelWidth));
    panel.style.left = `${left - listRect.left}px`;
    panel.style.top = `${summaryRect.bottom - listRect.top + 3}px`;
}

function updateSelectHostWidth(select, host) {
    let selected = select.selectedOptions?.[0];
    let text = selected?.textContent || '';
    setContentBasedWidth(host, text, { min: 8, max: 48, extra: 7 });
}

function setSelectWindowWidth(select, panel, trigger) {
    let optionTexts = Array.from(select.options).map(option => option.textContent || '');
    let maxOptionUnits = optionTexts.reduce((max, text) => Math.max(max, getTextWidthUnits(text)), 0);
    let titleUnits = getTextWidthUnits(trigger.textContent || '');
    let minUnits = Math.max(18, titleUnits + 10);
    let countUnits = optionTexts.length > 18 ? 78 : (optionTexts.length > 10 ? 62 : (optionTexts.length > 5 ? 44 : 0));
    let maxUnits = optionTexts.length > 18 ? 110 : 76;
    let widthUnits = clampNumber(Math.max(maxOptionUnits + 10, minUnits, countUnits), minUnits, maxUnits);
    panel.style.width = `min(${widthUnits}ch, calc(100vw - 32px))`;
}

function positionSelectWindow(panel, trigger) {
    let host = trigger.closest('.jpx-select-host');
    let rect = host.getBoundingClientRect();
    let settingsRect = document.getElementById('settings-container')?.getBoundingClientRect();
    let viewportWidth = document.documentElement.clientWidth;
    let viewportHeight = document.documentElement.clientHeight;
    let margin = 8;
    let leftMin = Math.max(margin, (settingsRect?.left ?? 0) + margin);
    let leftMax = Math.min(viewportWidth - margin, (settingsRect?.right ?? viewportWidth) - margin) - panel.offsetWidth;
    if (leftMax < leftMin) leftMax = viewportWidth - panel.offsetWidth - margin;

    let left = clampNumber(rect.left, leftMin, Math.max(leftMin, leftMax));
    panel.style.left = `${left - rect.left}px`;

    let belowSpace = viewportHeight - rect.bottom - margin;
    let aboveSpace = rect.top - margin;
    if (belowSpace >= panel.offsetHeight || belowSpace >= aboveSpace) {
        panel.style.top = 'calc(100% + 4px)';
        panel.style.bottom = 'auto';
    } else {
        panel.style.top = 'auto';
        panel.style.bottom = 'calc(100% + 4px)';
    }
}

function enhanceSelectElement(select) {
    if (!select || select.multiple || select.dataset.jpxSelectEnhanced === '1') return;
    if (!select.parentNode) return;

    select.dataset.jpxSelectEnhanced = '1';

    let host = document.createElement('span');
    host.className = 'jpx-select-host';
    select.parentNode.insertBefore(host, select);
    host.appendChild(select);
    select.classList.add('jpx-select-source');

    let trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'jpx-select-trigger';

    let panel = document.createElement('div');
    panel.className = 'jpx-select-window';

    const refreshTrigger = () => {
        let selected = select.selectedOptions?.[0];
        trigger.textContent = selected ? selected.textContent : '';
        trigger.title = select.title || getTitle();
        trigger.disabled = select.disabled;
        updateSelectHostWidth(select, host);
    };

    const getTitle = () => {
        let label = null;
        if (select.id) {
            label = document.querySelector(`#settings-container label[for="${select.id}"]`);
        }
        return label?.textContent?.trim() || trigger.textContent || 'Select';
    };

    const renderOptions = () => {
        panel.textContent = '';

        let header = document.createElement('div');
        header.className = 'jpx-select-window-header';

        let title = document.createElement('span');
        title.textContent = getTitle();
        header.appendChild(title);

        let optionsBox = document.createElement('div');
        optionsBox.className = 'jpx-select-options';

        Array.from(select.options).forEach(option => {
            let item = document.createElement('button');
            item.type = 'button';
            item.className = 'jpx-select-option';
            item.textContent = option.textContent;
            item.disabled = option.disabled;
            if (option.selected) item.classList.add('is-selected');

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                closeJpxSelectPanels();
                refreshTrigger();
            });

            optionsBox.appendChild(item);
        });

        panel.append(header, optionsBox);
    };

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (select.disabled) return;

        let shouldOpen = panel.style.display !== 'block';
        closeJpxSelectPanels(panel);
        if (shouldOpen) {
            renderOptions();
            setSelectWindowWidth(select, panel, trigger);
            panel.style.visibility = 'hidden';
            panel.style.display = 'block';
            positionSelectWindow(panel, trigger);
            panel.style.visibility = '';
        } else {
            panel.style.display = 'none';
        }
    });

    select.addEventListener('change', refreshTrigger);
    host.append(trigger, panel);
    refreshTrigger();
}

function enhanceSelects(container) {
    container.querySelectorAll('select:not([multiple])').forEach(enhanceSelectElement);
}

const fieldRenderers = {
    heading(container, field) {
        let div = document.createElement('div');
        div.textContent = t(field.label);
        if (field.class) div.classList.add(field.class);
        container.appendChild(div);
    },

    constant(container, field) {
        let div = document.createElement('div');
        div.textContent = t(field.label);
        if (field.class) div.classList.add(field.class);
        container.appendChild(div);
    },

    boolean(container, field, dataObj) {
        let key = field.key;
        let checkboxId = getUniqueId(key);
        let labelMeta = getBooleanLabelMeta(field);
        container.textContent = '';

        let label = document.createElement('label');
        label.className = 'switch-row';
        label.htmlFor = checkboxId;
        label.title = labelMeta.title;

        let checkbox = document.createElement('input');
        checkbox.className = 'switch-input';
        checkbox.type = 'checkbox';
        checkbox.id = checkboxId;
        checkbox.checked = !!dataObj[key];
        checkbox.title = labelMeta.title;

        let text = document.createElement('span');
        text.className = 'switch-label';
        text.textContent = labelMeta.shortLabel;
        text.title = labelMeta.title;

        label.append(checkbox, text);
        container.appendChild(label);

        checkbox.onchange = event => {
            dataObj[key] = event.target.checked;
            if (key === 'darkMode' && dataObj === cfgStats) setJpxDarkMode(event.target.checked);
        };
    },

    text(container, field, dataObj) {
        let key = field.key;
        let inputId = getUniqueId(key);
        container.textContent = '';
        appendConfigLabel(container, field, inputId);

        let input = createConfigInput('text', field, inputId);
        input.value = dataObj[key] ?? '';
        updateConfigInputWidth(input);
        container.appendChild(input);
        input.oninput = event => dataObj[key] = event.target.value;
    },

    number(container, field, dataObj) {
        let key = field.key;
        let inputId = getUniqueId(key);
        container.textContent = '';
        appendConfigLabel(container, field, inputId);

        let input = createConfigInput('number', field, inputId);
        input.value = dataObj[key] ?? 0;
        updateConfigInputWidth(input);
        container.appendChild(input);
        bindConfigNumberInput(input, () => dataObj[key], value => dataObj[key] = value);
    },

    rangeNumber(container, field, dataObj) {
        let key = field.key;
        if (!Array.isArray(dataObj[key])) dataObj[key] = [0, 0];
        let idMin = getUniqueId(`${key}_min`);
        let idMax = getUniqueId(`${key}_max`);
        container.textContent = '';

        let wrap = document.createElement('span');
        wrap.className = 'jpx-range-field';
        appendConfigLabel(wrap, field, idMin);

        let minInput = createConfigInput('number', field, idMin, 'jpx-range-input');
        minInput.value = dataObj[key][0];
        updateConfigInputWidth(minInput);

        let separator = document.createElement('span');
        separator.className = 'jpx-range-separator';
        separator.textContent = 'to';

        let maxInput = createConfigInput('number', field, idMax, 'jpx-range-input');
        maxInput.value = dataObj[key][1];
        updateConfigInputWidth(maxInput);

        wrap.append(minInput, separator, maxInput);
        container.appendChild(wrap);

        bindConfigNumberInput(minInput, () => dataObj[key][0], value => dataObj[key][0] = value);
        bindConfigNumberInput(maxInput, () => dataObj[key][1], value => dataObj[key][1] = value);
    },
    
    dropdown(container, field, dataObj) {
        function createSelectComponent(field) {
            let component = {
                element: document.createElement('div'),
                getValue: () => {},
                setValue: (value) => {},
                onchange: () => {}
            };

            if (!Array.isArray(field.options) && typeof field.options === 'object') {
                let selects = {};

                component.getValue = () => {
                    let values = Object.keys(field.options).map(key => jpxUtils.parseValue(selects[key].value));
                    return field.flatten ? values.join(field.flatten) : values;
                };

                component.setValue = (value) => {
                    let values = value;
                    if (field.flatten && typeof value === 'string') {
                        if (field.flatten === '_') values = value.split(/_(?!Mage(?:_|$))/);
                        else values = value.split(field.flatten);
                    }
                    Object.keys(field.options).forEach((key, i) => { if (values?.[i] !== undefined) selects[key].value = values[i]; });
                };

                for (const [subLabel, subOptions] of Object.entries(field.options)) {
                    let subWrap = document.createElement('div');
                    subWrap.style.display = 'inline-block';
                    subWrap.style.marginRight = '8px';

                    let select = createSelect(subOptions);
                    let label = document.createElement('label');
                    label.textContent = t(`cB.${subLabel}`);
                    subWrap.appendChild(label);
                    label.htmlFor = select.id;
                    select.onchange = () => component.onchange();
                    subWrap.appendChild(select);
                    selects[subLabel] = select;
                    component.element.appendChild(subWrap);
                }
            } else {
                let select = createSelect(field.options);
                component.element = select;
                component.getValue = () => jpxUtils.parseValue(select.value);
                component.setValue = (value) => { select.value = value; };
                select.onchange = () => component.onchange();
            }

            return component;
        }

        function createSelect(options) {
            let select = document.createElement('select');
            select.id = getUniqueId(field.key);
            if (field.class) select.className = field.class;
            options.forEach(opt => {
                let option = document.createElement('option');
                option.value = opt.value;
                option.textContent = t(opt.label);
                select.appendChild(option);
            });

            return select;
        }

        let selectComponent = createSelectComponent(field);

        let initValue = dataObj[field.key];
        if (initValue === undefined) {
            if (Array.isArray(field.options)) {
                initValue = field.options[0]?.value;
            } else {
                let defaultVals = Object.values(field.options).map(opts => (opts[0]?.value));
                initValue = field.flatten ? defaultVals.join(field.flatten) : defaultVals;
            }
        }

        if (field.hasModeDropdown) {
            container.dataset.role = field.hasModeDropdown;

            let selectContent = document.createElement('div');
            selectComponent.onchange = () => {
                selectContent.innerHTML = '';
                let currentValue = selectComponent.getValue();
                container.dataset.currentValue = currentValue;
                if (!dataObj[currentValue] || jpxUtils.isEmpty(dataObj[currentValue])) dataObj[currentValue] = {};
                renderSchema(selectContent, field.itemSchema, dataObj[currentValue]);
            };

            container.appendChild(selectComponent.element);
            container.appendChild(selectContent);

            let modeKey = getBattleMode('OneHanded');
            let importBtn = document.getElementById('import-button');
            let resetBtn = document.getElementById('reset-current-button');
            let finalKey = (importBtn?.dataset.battleMode) || (resetBtn?.dataset.battleMode) || modeKey;

            if (importBtn) delete importBtn.dataset.battleMode;
            if (resetBtn) delete resetBtn.dataset.battleMode;

            if (finalKey) selectComponent.setValue(finalKey);
            selectComponent.onchange();
        } else {
            let wrap = document.createElement('div');
            let label = document.createElement('label');
            label.htmlFor = selectComponent.element.id;
            label.textContent = t(field.label);
            wrap.appendChild(label);

            selectComponent.setValue(initValue);
            dataObj[field.key] = selectComponent.getValue();

            selectComponent.onchange = () => dataObj[field.key] = selectComponent.getValue();

            wrap.appendChild(selectComponent.element);
            container.appendChild(wrap);
        }
    },
    
    dragState: { fromIndex: null, groupId: null },
    array(container, field, dataObj) {
        if (!Array.isArray(dataObj[field.key])) dataObj[field.key] = [];
        let arrayGroupId = Symbol('array-group');

        if (!field.skipLabel) container.innerHTML = `<div${field.class ? ` class="${field.class}"` : ''} style="font-weight:bold; margin-bottom:4px;">${t(field.label)}</div>`;

        let listDiv = document.createElement('div');
        container.appendChild(listDiv);

        const isRuleWorkbenchMode =
            !!field.itemSchema?.discriminator &&
            !!field.itemSchema?.oneOf &&
            (field.key === 'supports' || field.key === 'attacks');

        const getRuleTypeSchema = (ruleType = '') => {
            let schema = field.itemSchema?.oneOf?.[ruleType];
            if (!schema) schema = Object.values(field.itemSchema?.oneOf || {})[0];
            return schema;
        };

        const getRuleTypeLabel = (ruleType = '') => {
            let schema = getRuleTypeSchema(ruleType);
            let constantField = schema?.properties?.find(item => item.type === 'constant');
            return constantField ? t(constantField.label) : (ruleType || '');
        };

        const getRuleDisplayName = (item) => {
            if (!item || typeof item !== 'object') return '';
            let typeText = getRuleTypeLabel(item.type);
            let nameText = item.name ? t(`cB.${item.name}`) : '';
            return nameText ? `${typeText} - ${nameText}` : typeText;
        };

        function renderRowButtons(row, index) {
            const isTop = index === 0;
            const isBottom = index === dataObj[field.key].length - 1;

            row.style.borderStyle = dataObj[field.key][index].disabled === true ? 'dashed' : 'solid';

            let handle = jpxUtils.createButton(row, { text: '⋮⋮', className: 'drag-handle' });
            handle.draggable = true;
            handle.addEventListener('dragstart', e => {
                fieldRenderers.dragState.fromIndex = index;
                fieldRenderers.dragState.groupId = arrayGroupId;
                e.dataTransfer.setDragImage(row, 0, 0);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', '');
            });
            
            handle.addEventListener('dragend', () => {
                fieldRenderers.dragState.fromIndex = null;
                fieldRenderers.dragState.groupId = null;
            });

            row.addEventListener('dragover', e => {
                if (fieldRenderers.dragState.groupId === arrayGroupId) e.preventDefault();
            });
            row.addEventListener('drop', e => {
                e.preventDefault();
                if (fieldRenderers.dragState.groupId !== arrayGroupId) return;

                let from = fieldRenderers.dragState.fromIndex;
                if (from == null || from === index) return;

                dataObj[field.key].splice(index, 0, dataObj[field.key].splice(from, 1)[0]);
                fieldRenderers.dragState.fromIndex = null;
                fieldRenderers.dragState.groupId = null;
                renderArray();
            });

            jpxUtils.createButton(row, { text: decodeURIComponent('%E2%86%91%E2%86%91'), disabled: isTop, onClick: () => {
                dataObj[field.key].unshift(dataObj[field.key].splice(index, 1)[0]);
                renderArray();
            }});
            jpxUtils.createButton(row, { text: decodeURIComponent('%E2%86%91'), disabled: isTop, onClick: () => {
                [dataObj[field.key][index - 1], dataObj[field.key][index]] = [dataObj[field.key][index], dataObj[field.key][index - 1]];
                renderArray();
            }});
            jpxUtils.createButton(row, { text: decodeURIComponent('%E2%86%93'), disabled: isBottom, onClick: () => {
                [dataObj[field.key][index + 1], dataObj[field.key][index]] = [dataObj[field.key][index], dataObj[field.key][index + 1]];
                renderArray();
            }});
            jpxUtils.createButton(row, { text: decodeURIComponent('%E2%86%93%E2%86%93'), disabled: isBottom, onClick: () => {
                dataObj[field.key].push(dataObj[field.key].splice(index, 1)[0]);
                renderArray();
            }});
            jpxUtils.createButton(row, { text: decodeURIComponent('%E2%A7%89'), onClick: () => {
                dataObj[field.key].splice(index + 1, 0, JSON.parse(JSON.stringify(dataObj[field.key][index])));
                renderArray();
            }});
            if (field.canDisable) {
                let disableBtn = jpxUtils.createButton(row, {
                    text: decodeURIComponent('%E2%8A%98'),
                    onClick: () => {
                        if (dataObj[field.key][index]?.disabled === true) {
                            delete dataObj[field.key][index].disabled;
                        } else if (dataObj[field.key][index] && typeof dataObj[field.key][index] === 'object') {
                            dataObj[field.key][index].disabled = true;
                        }
                        renderArray();
                    }
                });
                disableBtn.title = dataObj[field.key][index]?.disabled === true ? '启用此规则' : '禁用此规则';
            }
            jpxUtils.createButton(row, { text: t('delete'), className: 'jpx-btn-danger', onClick: () => {
                dataObj[field.key].splice(index, 1);
                renderArray();
            }});
        };

        function renderAddButtons(addContainer) {
            const addAction = (targetSchema) => {
                dataObj[field.key].push(targetSchema.type === 'text' ? '' : createEmptyObject(targetSchema));
                renderArray();
            };

            if (field.itemSchema.discriminator) {
                for (const [typeKey, subSchema] of Object.entries(field.itemSchema.oneOf)) {
                    jpxUtils.createButton(addContainer, {
                        text: `${t('add')} ${t(subSchema.properties.find(item => item.type === 'constant')?.label)}`,
                        onClick: () => addAction(subSchema)
                    });
                };
            } else {
                jpxUtils.createButton(addContainer, { text: t('add'), onClick: () => addAction(field.itemSchema) });
            }
        };

        function renderMultiSelectMode() {
            if (field.hasRange) {
                if (dataObj[field.key].length < 2) dataObj[field.key].unshift(0, 0);
                let rangeBox = document.createElement('div');
                fieldRenderers.rangeNumber(rangeBox, { ...field, label: field.hasRange, skipLabel: false }, dataObj);
                listDiv.appendChild(rangeBox);
            }

            if (field.popup) {
                let summary = document.createElement('input');
                summary.type = 'text';
                summary.readOnly = true;
                summary.placeholder = t('cB.clickToSelect');
                summary.className = 'multiSelect-summary';
                summary.dataset.jpxAutoWidth = '1';
                summary.title = t('cB.clickToSelect');
                summary.onclick = (e) => {
                    e.stopPropagation();
                    let shouldOpen = panel.style.display === 'none';
                    closeMultiSelectPanels();
                    if (!shouldOpen) return;
                    panel.style.visibility = 'hidden';
                    panel.style.display = 'flex';
                    positionMultiSelectPanel(panel, summary);
                    panel.style.visibility = '';
                };

                let panel = document.createElement('div');
                panel.className = 'multiSelect-popup-panel';
                panel.style.display = 'none';
                panel.onclick = (e) => e.stopPropagation();

                listDiv.style.position = 'relative';
                listDiv.append(summary, panel);        
                
                const updateSummary = () => {
                    let values = field.hasRange ? dataObj[field.key].slice(2) : dataObj[field.key];
                    let labels = values.map(v => t(field.multiSelectOptions.find(opt => opt.value === v)?.label || v));
                    summary.value = labels.join(', ');
                    summary.title = summary.value || t('cB.clickToSelect');
                    updateConfigInputWidth(summary);
                };

                renderCheckboxes(panel, updateSummary);
                updateSummary();
            } else {
                renderCheckboxes(listDiv);
            }

            function renderCheckboxes(targetContainer, onUpdate) {
                field.multiSelectOptions.forEach(opt => {
                    let optionBtn = document.createElement('button');
                    optionBtn.type = 'button';
                    optionBtn.className = 'multiSelect-option';
                    optionBtn.textContent = t(opt.label);
                    optionBtn.title = t(opt.label);

                    const refreshOption = () => {
                        let checked = dataObj[field.key].includes(opt.value);
                        optionBtn.classList.toggle('is-checked', checked);
                        optionBtn.setAttribute('aria-pressed', checked ? 'true' : 'false');
                    };

                    optionBtn.onclick = () => {
                        let checked = dataObj[field.key].includes(opt.value);
                        if (!checked) {
                            if (!dataObj[field.key].includes(opt.value)) dataObj[field.key].push(opt.value);
                        } else {
                            if (field.hasRange) dataObj[field.key] = [...dataObj[field.key].slice(0, 2), ...dataObj[field.key].slice(2).filter(v => v !== opt.value)];
                            else dataObj[field.key] = dataObj[field.key].filter(v => v !== opt.value);
                        }
                        refreshOption();
                        if (onUpdate) onUpdate();
                    };

                    refreshOption();
                    targetContainer.appendChild(optionBtn);
                });
            }
        }

        function renderRuleWorkbenchMode() {
            let workbench = document.createElement('div');
            workbench.className = 'rule-workbench';
            listDiv.appendChild(workbench);

            let toolbar = document.createElement('div');
            toolbar.className = 'rule-toolbar';

            let typeSelect = document.createElement('select');
            Object.keys(field.itemSchema.oneOf).forEach(typeKey => {
                let option = document.createElement('option');
                option.value = typeKey;
                option.textContent = getRuleTypeLabel(typeKey);
                typeSelect.appendChild(option);
            });
            toolbar.appendChild(typeSelect);
            enhanceSelectElement(typeSelect);

            let addBtn = jpxUtils.createButton(toolbar, {
                text: `${t('add')} ${t(field.label)}`,
                onClick: () => {
                    let schema = getRuleTypeSchema(typeSelect.value);
                    dataObj[field.key].push(createEmptyObject(schema));
                    renderRuleList();
                    openRuleEditor(dataObj[field.key].length - 1);
                }
            });
            addBtn.classList.add('jpx-btn-primary');

            let toolbarMeta = document.createElement('span');
            toolbarMeta.className = 'rule-toolbar-meta';
            toolbar.appendChild(toolbarMeta);
            workbench.appendChild(toolbar);

            let ruleList = document.createElement('div');
            ruleList.className = 'rule-list';
            workbench.appendChild(ruleList);

            const closeRuleEditor = (animate = true) => {
                let host = container.closest('#settings-container') || container;
                let overlay = host.querySelector('.rule-editor-overlay');
                if (!overlay) return;
                if (!animate) {
                    overlay.remove();
                    return;
                }

                let editorWindow = overlay.querySelector('.rule-editor-window');
                overlay.classList.remove('is-open');
                overlay.classList.add('is-closing');

                const removeOverlay = () => {
                    if (overlay.parentNode) overlay.remove();
                };

                if (editorWindow) {
                    editorWindow.addEventListener('transitionend', removeOverlay, { once: true });
                }
                setTimeout(removeOverlay, 220);
            };

            const openRuleEditor = (index) => {
                let item = dataObj[field.key][index];
                if (!item) return;

                closeRuleEditor(false);

                let host = container.closest('#settings-container') || container;
                let overlay = document.createElement('div');
                overlay.className = 'rule-editor-overlay';

                let editorWindow = document.createElement('div');
                editorWindow.className = 'rule-editor-window';

                let header = document.createElement('div');
                header.className = 'rule-editor-header';

                let headerText = document.createElement('div');
                let title = document.createElement('div');
                title.className = 'rule-editor-title';
                title.textContent = `${t(field.label)} #${index + 1}`;
                let subtitle = document.createElement('div');
                subtitle.className = 'rule-editor-subtitle';
                subtitle.textContent = getRuleDisplayName(item);
                headerText.append(title, subtitle);

                const finishEdit = () => {
                    renderRuleList();
                    closeRuleEditor();
                };

                let closeBtn = jpxUtils.createButton(header, {
                    text: '完成',
                    onClick: () => {
                        finishEdit();
                    }
                });
                closeBtn.classList.add('jpx-btn-primary');
                closeBtn.title = '完成编辑';
                header.prepend(headerText);

                let body = document.createElement('div');
                body.className = 'rule-editor-body';
                renderSchema(body, getRuleTypeSchema(item.type), item);
                body.addEventListener('input', renderRuleList);
                body.addEventListener('change', renderRuleList);

                editorWindow.append(header, body);
                editorWindow.addEventListener('pointerdown', e => e.stopPropagation());
                overlay.appendChild(editorWindow);
                overlay.addEventListener('pointerdown', (e) => {
                    if (e.target === overlay) {
                        finishEdit();
                    }
                });
                host.appendChild(overlay);
                requestAnimationFrame(() => overlay.classList.add('is-open'));
                overlay.tabIndex = -1;
                overlay.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') finishEdit();
                });
                overlay.focus();
            };

            const renderRuleList = () => {
                ruleList.innerHTML = '';

                let ruleCount = dataObj[field.key].length;

                dataObj[field.key].forEach((item, index) => {
                    let isTop = index === 0;
                    let isBottom = index === dataObj[field.key].length - 1;
                    let conditionCount = Array.isArray(item.conditions) ? item.conditions.length : 0;
                    let titleText = getRuleDisplayName(item) || `${t(field.label)} #${index + 1}`;
                    let metaText = `${getRuleTypeLabel(item.type)} · ${conditionCount} 条条件${item.disabled === true ? ' · 已禁用' : ''}`;

                    let row = document.createElement('div');
                    row.className = 'rule-item';
                    if (item.disabled === true) row.classList.add('is-disabled');

                    let main = document.createElement('div');
                    main.className = 'rule-item-main';
                    main.title = '双击编辑规则';

                    let title = document.createElement('div');
                    title.className = 'rule-item-title';
                    title.textContent = `${index + 1}. ${titleText}`;
                    main.appendChild(title);

                    let meta = document.createElement('div');
                    meta.className = 'rule-item-meta';
                    meta.textContent = metaText;
                    main.appendChild(meta);

                    row.appendChild(main);

                    let actions = document.createElement('div');
                    actions.className = 'rule-actions';

                    let editBtn = jpxUtils.createButton(actions, {
                        text: '编辑',
                        onClick: () => openRuleEditor(index)
                    });
                    editBtn.title = '编辑规则';

                    let copyBtn = jpxUtils.createButton(actions, {
                        text: decodeURIComponent('%E2%A7%89'),
                        onClick: () => {
                            dataObj[field.key].splice(index + 1, 0, JSON.parse(JSON.stringify(item)));
                            renderRuleList();
                        }
                    });
                    copyBtn.title = '复制规则';

                    let upBtn = jpxUtils.createButton(actions, {
                        text: decodeURIComponent('%E2%86%91'),
                        disabled: isTop,
                        onClick: () => {
                            [dataObj[field.key][index - 1], dataObj[field.key][index]] = [dataObj[field.key][index], dataObj[field.key][index - 1]];
                            renderRuleList();
                        }
                    });
                    upBtn.title = isTop ? '已经是第一条' : '上移规则';

                    let downBtn = jpxUtils.createButton(actions, {
                        text: decodeURIComponent('%E2%86%93'),
                        disabled: isBottom,
                        onClick: () => {
                            [dataObj[field.key][index + 1], dataObj[field.key][index]] = [dataObj[field.key][index], dataObj[field.key][index + 1]];
                            renderRuleList();
                        }
                    });
                    downBtn.title = isBottom ? '已经是最后一条' : '下移规则';

                    if (field.canDisable) {
                        let disableBtn = jpxUtils.createButton(actions, {
                            text: item.disabled === true ? '启用' : '禁用',
                            onClick: () => {
                                if (item.disabled === true) {
                                    delete item.disabled;
                                } else {
                                    item.disabled = true;
                                }
                                renderRuleList();
                            }
                        });
                        disableBtn.title = item.disabled === true ? '启用规则' : '禁用规则';
                    }

                    let deleteBtn = jpxUtils.createButton(actions, {
                        text: t('delete'),
                        className: 'jpx-btn-danger',
                        onClick: () => {
                            dataObj[field.key].splice(index, 1);
                            renderRuleList();
                        }
                    });
                    deleteBtn.title = '删除规则';

                    row.appendChild(actions);
                    row.addEventListener('dblclick', (e) => {
                        if (e.target.closest('button')) return;
                        openRuleEditor(index);
                    });
                    ruleList.appendChild(row);
                });

                if (ruleCount === 0) {
                    let empty = document.createElement('div');
                    empty.className = 'rule-empty';
                    empty.textContent = '暂无规则，先从上方新增一条';
                    ruleList.appendChild(empty);
                }

                toolbarMeta.textContent = `共 ${ruleCount} 条`;
            };

            renderRuleList();
        }

        function renderDynamicListMode() {
            dataObj[field.key].forEach((value, index) => {
                let row = document.createElement('div');
                row.className = 'array-row';

                let itemSchema = field.itemSchema;
                if (itemSchema.discriminator) itemSchema = resolveSchema(itemSchema, value);

                if (itemSchema.type === 'text') {
                    renderField(row, { ...itemSchema, key: index, label: index + 1 }, dataObj[field.key]);
                } else if (itemSchema.type === 'object') {
                    let objDiv = document.createElement('div');
                    objDiv.className = 'object-item';
                    renderSchema(objDiv, itemSchema, value);
                    row.appendChild(objDiv);
                }

                renderRowButtons(row, index);
                listDiv.appendChild(row);
            });

            renderAddButtons(listDiv);
        };

        function renderArray() {
            listDiv.innerHTML = '';
            if (field.multiSelectOptions) renderMultiSelectMode();
            else if (isRuleWorkbenchMode) renderRuleWorkbenchMode();
            else renderDynamicListMode();
        }

        renderArray();
    },

    fieldPicker(container, field, dataObj) {
        let editFields = field.editFields || [];
        if (!Array.isArray(dataObj[field.key])) dataObj[field.key] = [];

        container.innerHTML = `<div${field.class ? ` class="${field.class}"` : ''} style="margin-top:8px;">${t(field.label)}</div>`;

        let pickerWrap = document.createElement('div');
        pickerWrap.style.cssText = 'display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap;';
        container.appendChild(pickerWrap);

        let inputMap = {};
        let leftFields = field.allFields.filter(f => !dataObj[field.key].some(d => d.id === f.id));
        let rightFields = dataObj[field.key].map(d => {
            let base = field.allFields.find(f => f.id === d.id);
            return base ? { ...base, ...d } : null;
        }).filter(Boolean);

        const getSelectedIndexes = (select) => Array.from(select.selectedOptions, opt => +opt.value);
        const getIndexGroups = (indexes) => {
            return indexes.sort((a, b) => a - b).reduce((acc, value, i, array) => {
                if (i > 0 && value === array[i - 1] + 1) acc.at(-1).push(value);
                else acc.push([value]);
                return acc;
            }, []);
        };

        function updateDataObj() {
            dataObj[field.key] = rightFields.map(f => {
                let storageObj = { id: f.id };
                editFields.forEach(editF => {
                    let val = f[editF.key];
                    if (val !== undefined && val !== null && val !== '') {
                        storageObj[editF.key] = val;
                    }
                });
                return storageObj;
            });
        }

        function refresh(selectedItems = []) {
            leftSelect.innerHTML = leftFields.map((f, i) => `<option value="${i}">${t(f.label)}</option>`).join('');
            rightSelect.innerHTML = rightFields.map((f, i) => `<option value="${i}">${t(f.label)}</option>`).join('');
            rightFields.forEach((f, i) => {
                if (selectedItems.includes(f)) rightSelect.options[i].selected = true;
            });
            updateDataObj();
            let noAvailableFields = leftFields.length === 0;
            leftSelect.hidden = noAvailableFields;
            addBtn.hidden = noAvailableFields;
        };

        function transfer(fromArray, toArray, select, isToRight) {
            let indexes = getSelectedIndexes(select).sort((a, b) => b - a);
            if (!indexes.length) return;

            let selectedItems = indexes.map(i => {
                let item = fromArray[i];
                if (isToRight) {
                    editFields.forEach(editF => {
                        item[editF.key] = '';
                    });
                }
                return item;
            }).reverse();

            indexes.forEach(i => fromArray.splice(i, 1));
            toArray.push(...selectedItems);
            if (!isToRight) toArray.sort((a, b) => field.allFields.findIndex(f => f.id === a.id) - field.allFields.findIndex(f => f.id === b.id));
            refresh(selectedItems);
        }

        function reorder(direction) {
            let indexes = getSelectedIndexes(rightSelect);
            if (!indexes.length) return;
            let selectedItems = indexes.map(i => rightFields[i]);

            if (direction === 'top' || direction === 'bottom') {
                let unselected = rightFields.filter((f, i) => !indexes.includes(i));
                rightFields = direction === 'top' ? [...selectedItems, ...unselected] : [...unselected, ...selectedItems];
            } else {
                let groups = getIndexGroups(indexes);
                if (direction === 'up') {
                    groups.forEach(group => {
                        if (group[0] > 0) {
                            let items = rightFields.splice(group[0], group.length);
                            rightFields.splice(group[0] - 1, 0, ...items);
                        }
                    });
                } else if (direction === 'down') {
                    groups.reverse().forEach(group => {
                        if (group.at(-1) < rightFields.length - 1) {
                            let items = rightFields.splice(group[0], group.length);
                            rightFields.splice(group[0] + 1, 0, ...items);
                        }
                    });
                }
            }
            refresh(selectedItems);
        };

        let editBox = document.createElement('div');
        editBox.style.cssText = 'display: flex; flex-direction: column; gap: 8px; min-width: 350px;';
        editFields.forEach(editF => {
            let div = document.createElement('div');
            div.textContent = `${t(editF.label)}: `;

            let input = createConfigInput('text', editF, getUniqueId('editField'), 'jpx-input-wide');
            input.addEventListener('input', () => {
                let indexes = getSelectedIndexes(rightSelect);
                indexes.forEach(i => {
                    rightFields[i][editF.key] = input.value;
                });
                updateDataObj();
            });

            div.appendChild(input);
            editBox.appendChild(div);

            inputMap[editF.key] = input;
        });

        let leftSelect = document.createElement('select');
        let rightSelect = document.createElement('select');
        [leftSelect, rightSelect].forEach(s => {
            s.multiple = true;
            s.size = field.size || 12;
            s.className = 'field-picker-select';
        });
        leftSelect.title = '双击添加';
        rightSelect.title = '双击移除；选中后可调整顺序';
        leftSelect.addEventListener('pointerdown', () => { rightSelect.selectedIndex = -1; });
        rightSelect.addEventListener('pointerdown', () => { leftSelect.selectedIndex = -1; });
        leftSelect.addEventListener('dblclick', () => transfer(leftFields, rightFields, leftSelect, true));
        rightSelect.addEventListener('dblclick', () => transfer(rightFields, leftFields, rightSelect, false));
        rightSelect.addEventListener('change', () => {
            let indexes = getSelectedIndexes(rightSelect);
            editFields.forEach(editF => {
                inputMap[editF.key].value = (indexes.length > 0) ? (rightFields[indexes[0]][editF.key] || '') : '';
            });
        });

        let btnBoxStyle = 'display: flex; flex-direction: column; gap: 4px;';

        let moveBox = document.createElement('div');
        moveBox.style.cssText = btnBoxStyle;
        let addBtn = jpxUtils.createButton(moveBox, { text: decodeURIComponent('%E2%86%92'), onClick: () => transfer(leftFields, rightFields, leftSelect, true) });
        addBtn.title = '添加选中项';
        let removeBtn = jpxUtils.createButton(moveBox, { text: decodeURIComponent('%E2%86%90'), onClick: () => transfer(rightFields, leftFields, rightSelect, false) });
        removeBtn.title = '移除选中项';

        let sortBox = document.createElement('div');
        sortBox.style.cssText = btnBoxStyle;
        jpxUtils.createButton(sortBox, { text: decodeURIComponent('%E2%86%91%E2%86%91'), onClick: () => reorder('top') }).title = '移到顶部';
        jpxUtils.createButton(sortBox, { text: decodeURIComponent('%E2%86%91'), onClick: () => reorder('up') }).title = '上移';
        jpxUtils.createButton(sortBox, { text: decodeURIComponent('%E2%86%93'), onClick: () => reorder('down') }).title = '下移';
        jpxUtils.createButton(sortBox, { text: decodeURIComponent('%E2%86%93%E2%86%93'), onClick: () => reorder('bottom') }).title = '移到底部';

        pickerWrap.append(leftSelect, moveBox, rightSelect, sortBox, editBox);
        refresh();
    },

    object(container, field, dataObj) {
        renderSchema(container, field, dataObj[field.key]);
    },

    keyBasedObjectArray(container, field, dataObj) {
        let targetData = field.flatten ? dataObj : dataObj[field.key];
        
        container.innerHTML = `<div${field.class ? ` class="${field.class}"` : ''} style="font-weight:bold; margin-bottom:4px;">${t(field.label)}</div>`;

        let listDiv = document.createElement('div');
        container.appendChild(listDiv);

        function renderKeyBinding(key) {
            let row = document.createElement('div');
            row.style.cssText = 'border: 1px solid var(--jpx-border-subtle); border-radius: 0; background: var(--jpx-bg-panel); padding: 6px; margin-bottom: 8px;';

            let header = document.createElement('div');
            header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid var(--jpx-border-subtle); padding-bottom: 6px;';

            let span = document.createElement('span');
            span.append(`${t('cB.binding')}: `);
            jpxUtils.createButton(span, {
                text: jpxUtils.formatKeyCombo(key, ' + '),
                onClick: (btn, e) => {
                    let originalText = btn.textContent;
                    btn.textContent = '...';
                    jpxUtils.captureKeyCombo(
                        (result) => {
                            let newKey = 'kb_' + result.comboString;
                            if (newKey === key) return renderAll();
                            if (targetData[newKey]) {
                                jpxUtils.createToast(t('cB.duplicateKeys'));
                                return renderAll();
                            }
                            
                            let newEntries = Object.entries(targetData).map(([k, v]) => (k === key ? [newKey, v] : [k, v]));
                            for (const k in targetData) delete targetData[k];
                            Object.assign(targetData, Object.fromEntries(newEntries));
                            
                            renderAll();
                        },
                        () => { btn.textContent = originalText; }
                    );
                }
            });
            header.appendChild(span);
            
            jpxUtils.createButton(header, { 
                text: t('delete'), 
                className: 'jpx-btn-danger',
                onClick: () => { if(confirm(`${t('delete')} ${jpxUtils.formatKeyCombo(key, ' + ')}?`)) { delete targetData[key]; renderAll(); } } 
            });
            
            row.appendChild(header);

            let arrayContainer = document.createElement('div');
            renderField(arrayContainer, {
                key,
                skipLabel: true,
                type: 'array',
                canDisable: field.canDisable,
                itemSchema: field.itemSchema,
            }, targetData);
            row.appendChild(arrayContainer);

            listDiv.appendChild(row);
        }

        function renderAll() {
            listDiv.innerHTML = '';
            Object.keys(targetData).forEach(k => {
                if (field.flatten && k.startsWith('kb_')) {
                    renderKeyBinding(k);
                } else if (!field.flatten) {
                    renderKeyBinding(k);
                }
            });
        }

        jpxUtils.createButton(container, {
            text: t('cB.addNewKeyBinding'),
            onClick: (btn, e) => {
                let originalText = btn.textContent;
                btn.textContent = `... ${t('cB.recording')} ...`;
                jpxUtils.captureKeyCombo(
                    (result) => {
                        let newKey = 'kb_' + result.comboString;
                        if (targetData[newKey]) {
                            jpxUtils.createToast(t('cB.duplicateKeys'));
                        } else {
                            targetData[newKey] = [];
                        }
                        renderAll();
                        btn.textContent = originalText;
                    },
                    () => { btn.textContent = originalText; }
                );
            }
        });

        renderAll();
    },

    conditionsArray(container, field, dataObj) {
        if (!Array.isArray(dataObj[field.key])) dataObj[field.key] = [];

        let listDiv = document.createElement('div');
        listDiv.className = 'conditions-list';
        container.appendChild(listDiv);

        const notifyConditionsChanged = () => {
            container.dispatchEvent(new Event('change', { bubbles: true }));
        };

        function createRow(item, index) {
            let selectId = getUniqueId('condition');

            let row = document.createElement('div');
            row.className = 'dynamic-array-row condition-row';

            let indexLabel = document.createElement('span');
            indexLabel.className = 'condition-index';
            indexLabel.textContent = `#${index + 1}`;
            indexLabel.title = '条件序号';
            row.appendChild(indexLabel);

            let select = document.createElement('select');
            select.id = selectId;
            select.title = '选择条件类型';
            field.options.forEach(opt => {
                let option = document.createElement('option');
                option.value = opt.key;
                option.textContent = t(opt.label);
                select.appendChild(option);
            });
            select.value = item.key ?? field.options[0]?.key;
            row.appendChild(select);
            enhanceSelectElement(select);

            let inputDiv = document.createElement('div');
            inputDiv.className = 'condition-value';
            row.appendChild(inputDiv);
            
            let extraDiv = document.createElement('div');
            extraDiv.className = 'condition-extra';
            row.appendChild(extraDiv);

            function renderInput() {
                inputDiv.innerHTML = '';
                extraDiv.innerHTML = '';

                let selectedOption = field.options.find(option => option.key === select.value);
                if (!selectedOption) return;

                if ((item.key !== undefined && item.key !== select.value) || item.key === undefined) {
                    Object.keys(item).forEach(k => delete item[k]);
                    item.key = selectedOption.key;
                    item.value = getDefaultValue(selectedOption.type, selectedOption.defaultValue);
                }
				
				if (selectedOption.extraFields) {
					selectedOption.extraFields.forEach(f => {
						if (item[f.key] === undefined) item[f.key] = getDefaultValue(f.type, f.defaultValue);
					});
				}

                if (selectedOption.type === 'array' && selectedOption.hasRange && selectedOption.extraFields) {
                    inputDiv.classList.add('is-wide');
                } else {
                    inputDiv.classList.remove('is-wide');
                }

                renderField(inputDiv, {
                    ...selectedOption,
                    key: 'value',
                    skipLabel: true,
                }, item);
                
                if (selectedOption.extraFields) {
                    selectedOption.extraFields.forEach(f => {
                        let wrap = document.createElement('div');
                        wrap.className = 'condition-extra-field';
                        renderField(wrap, f, item);
                        extraDiv.appendChild(wrap);
                    });
                }
            }
            
            function getDefaultValue(type, defaultValue) {
				if (defaultValue !== undefined) return JSON.parse(JSON.stringify(defaultValue));
				
                switch (type) {
                    case 'boolean': return false;
                    case 'text': return '';
                    case 'number': return 0;
                    case 'rangeNumber': return [0, 0];
                    case 'array': return [];
                    case 'dropdown': return '';
                    default: return null;
                }
            }

            select.onchange = () => {
                renderInput();
                notifyConditionsChanged();
            };
            
            let deleteButton = jpxUtils.createButton(row, {
                text: 'x',
                className: 'jpx-btn-danger',
                onClick: () => {
                    dataObj[field.key].splice(index, 1);
                    renderList();
                    notifyConditionsChanged();
                }
            });
            deleteButton.title = '删除条件';

            renderInput();
            return row;
        }

        function renderList() {
            listDiv.innerHTML = '';
            dataObj[field.key].forEach((item, index) => {
                listDiv.appendChild(createRow(item, index));
            });
        }
        
        jpxUtils.createButton(container, {
            text: `${t('add')} ${t(field.key)}`,
            onClick: () => {
                let newItem = {};
                dataObj[field.key].push(newItem);
                renderList();
                notifyConditionsChanged();
            }
        });
        
        renderList();
    }
};

function renderField(container, field, dataObj) {
    const renderer = fieldRenderers[field.type];
    if (renderer) renderer(container, field, dataObj);
    enhanceSelects(container);
}

function resolveSchema(schema, dataObj) {
    if (!schema.discriminator) return schema;
    const typeValue = dataObj[schema.discriminator];
    return schema.oneOf[typeValue];
}

function createEmptyObject(schema) {
    const obj = {};
    schema.properties.forEach(property => {
        if (property.type === 'constant') {
            obj[property.key] = property.value;
            return;
        }

        if (property.default !== undefined) {
            obj[property.key] = property.default;
            return;
        }

        const defaults = {
            text: '',
            number: 0,
            rangeNumber: [0,0],
            boolean: false,
            array: [],
            fieldPicker: [],
            object: () => createEmptyObject(property),
            keyBasedObjectArray: {},
        };

        obj[property.key] = typeof defaults[property.type] === 'function' ? defaults[property.type]() : defaults[property.type] ?? undefined;
    });

    return obj;
}

function getUniqueId(prefix = 'input') {
    return `${prefix}_${idCounter++}`;
}

function parseImportJSON(content) {
    try {
        const data = JSON.parse(content);
        if (!data || typeof data !== 'object') {
            throw new Error(t('cGen.invalidImportData'));
        }
        return data;
    } catch (err) {
        if (err instanceof SyntaxError) {
            throw new Error(`${t('cGen.invalidJson')}: ${err.message}`);
        }
        throw err;
    }
}

function createImportResult(detail, options = {}) {
    const statusText = options.partial ? t('cGen.importPartial') : t('cGen.importSucceeded');
    const message = detail ? `${statusText}: ${detail}` : statusText;
    return { ...options, message };
}

function getImportErrorMessage(err) {
    const detail = err?.message || String(err || '');
    return detail ? `${t('cGen.importFailed!')}: ${detail}` : t('cGen.importFailed!');
}

function shouldUseJpxDarkMode() {
    if (cfgStats && cfgStats.darkMode !== undefined) return !!cfgStats.darkMode;
    try {
        return !!JSON.parse(localStorage.getItem(prefix + 'cfgStats') || '{}').darkMode;
    } catch (err) {
        return false;
    }
}

function ensureCfgStatsLoaded() {
    if (cfgStats && Object.keys(cfgStats).length > 0) return;

    let storedCfgStats = {};
    try {
        storedCfgStats = JSON.parse(localStorage.getItem(prefix + 'cfgStats') || '{}');
    } catch (err) {
        storedCfgStats = {};
    }
    mergeCfg(storedCfgStats, defaultCfgStats, cfgStats, 'stats');
}

function setJpxDarkMode(enabled) {
    ensureCfgStatsLoaded();
    cfgStats.darkMode = !!enabled;
    localStorage.setItem(prefix + 'cfgStats', JSON.stringify(cfgStats));

    document.querySelectorAll('#settings-container, #ctrl-widget, #jpx-settings-launcher').forEach(element => {
        element.classList.toggle('dark-mode', cfgStats.darkMode);
    });

    let themeInput = document.getElementById('jpx-theme-toggle');
    if (themeInput) {
        themeInput.checked = cfgStats.darkMode;
        let themeText = themeInput.closest('.settings-theme-toggle')?.querySelector('.settings-theme-text');
        if (themeText) themeText.textContent = cfgStats.darkMode ? '深色' : '浅色';
    }

}

function mergeCfg(storedCfg, defaultCfg, mergedCfg, mergedType) {
    let vKey = mergedType === 'battle' ? 'battleVersion' : 'statsVersion';
    //patch 20260109
    if (mergedType === 'battle' && storedCfg) {
        if (storedCfg.version && !storedCfg.battleVersion) {
            storedCfg.battleVersion = storedCfg.version;
            delete storedCfg.version;
        }
    }
    //-
    if (!storedCfg?.[vKey] || storedCfg[vKey] < defaultCfg[vKey]) storedCfg = {};

    if (mergedType === 'battle') {
        for (const key of BATTLE_MODES) {
            let localObj = storedCfg[key];
            //patch 20260208
            key === '1H_Mage_General' && (localObj ??= storedCfg.Battlecaster_General);
            //-
            if (localObj && Array.isArray(localObj.supports) && Array.isArray(localObj.attacks)) {
                mergedCfg[key] = localObj;
            } else {
                if (!defaultCfg[key] || jpxUtils.isEmpty(defaultCfg[key])) continue;
                mergedCfg[key] = JSON.parse(JSON.stringify(defaultCfg[key]));
            }

            //patch 20260309
            mergedCfg[key].supports.forEach(support => {
                if (support.type === 'spellInstant' || support.type === 'spellDuration') {
                    support.type = 'spellSupport';
                } else if (support.type === 'itemInstant' || support.type === 'itemDuration') {
                    support.type = 'item';
                }
            });
            //-
            //patch 20260103
            mergedCfg[key].attacks.forEach(attack => {
                if (attack.type === 'target' && 'bottomUp' in attack) {
                    attack.priorityRule = attack.bottomUp ? 'Bottom Up' : 'Top Down';
                    delete attack.bottomUp;
                }
                if (attack.type === 'smartDebuff') {
                    attack.targetCount = jpxUtils.parseValue(attack.targetCount);
                }
            });
            //-
        }

        for (const key in defaultCfg) {
            if (BATTLE_MODES.includes(key)) continue;
            mergedCfg[key] = (key in storedCfg) ? storedCfg[key] : defaultCfg[key];
        }
    } else if (mergedType === 'stats') {
        for (const key in defaultCfg) {
            mergedCfg[key] = (key in storedCfg) ? storedCfg[key] : defaultCfg[key];
        }
    }
}

function renderSettings() {
    let overlay = document.getElementById('settings-overlay');
    if (overlay) {
        if (typeof overlay._jpxCloseSettings === 'function') overlay._jpxCloseSettings();
        else overlay.remove();
        return;
    }

    const closeSettingsWindow = () => {
        let existingOverlay = document.getElementById('settings-overlay');
        if (existingOverlay) existingOverlay.remove();
        document.removeEventListener('keydown', onEscClose, true);
    };

    const onEscClose = (e) => {
        if (e.key === 'Escape') closeSettingsWindow();
    };

    document.addEventListener('keydown', onEscClose, true);

    overlay = document.createElement('div');
    overlay.id = 'settings-overlay';
    overlay._jpxCloseSettings = closeSettingsWindow;
    overlay.addEventListener('pointerdown', (e) => {
        if (e.target === overlay) closeSettingsWindow();
    });

    let container = document.createElement('div');
    container.id = 'settings-container';
    if (shouldUseJpxDarkMode()) container.classList.add('dark-mode');
    container.addEventListener('pointerdown', (e) => e.stopPropagation());

    let header = document.createElement('div');
    header.className = 'settings-header';

    let headerMain = document.createElement('div');
    headerMain.className = 'settings-header-main';

    let title = document.createElement('h2');
    title.className = 'settings-title';
    title.textContent = 'JPX Revanced';

    let subtitle = document.createElement('p');
    subtitle.className = 'settings-subtitle';
    subtitle.textContent = '战斗自动化与记录配置';

    let meta = document.createElement('div');
    meta.className = 'settings-meta';

    const versionText = typeof GM_info !== 'undefined' && GM_info?.script?.version
        ? GM_info.script.version
        : '26.06.08';
    [
        `版本 ${versionText}`,
        isekaiSuffix ? 'Isekai' : 'Persistent',
    ].forEach(text => {
        let chip = document.createElement('span');
        chip.className = 'settings-chip';
        chip.textContent = text;
        meta.appendChild(chip);
    });

    headerMain.append(title, subtitle, meta);

    let headerActions = document.createElement('div');
    headerActions.className = 'settings-header-actions';

    let themeToggle = document.createElement('label');
    themeToggle.className = 'settings-theme-toggle';
    themeToggle.htmlFor = 'jpx-theme-toggle';
    themeToggle.title = BOOLEAN_LABEL_META.darkMode.title;

    let themeText = document.createElement('span');
    themeText.className = 'settings-theme-text';

    let themeControl = document.createElement('span');
    themeControl.className = 'switch-control';

    let themeInput = document.createElement('input');
    themeInput.id = 'jpx-theme-toggle';
    themeInput.className = 'switch-input';
    themeInput.type = 'checkbox';
    themeInput.checked = shouldUseJpxDarkMode();
    themeInput.title = BOOLEAN_LABEL_META.darkMode.title;

    const syncThemeToggle = () => {
        themeInput.checked = shouldUseJpxDarkMode();
        themeText.textContent = themeInput.checked ? '深色' : '浅色';
    };

    themeInput.addEventListener('change', () => {
        setJpxDarkMode(themeInput.checked);
        syncThemeToggle();
    });

    themeControl.append(themeInput);
    themeToggle.append(themeControl, themeText);
    headerActions.appendChild(themeToggle);
    syncThemeToggle();

    header.append(headerMain, headerActions);

    let main = document.createElement('div');
    main.className = 'settings-main';

    let sidebar = document.createElement('aside');
    sidebar.className = 'settings-sidebar';

    let navTitle = document.createElement('div');
    navTitle.className = 'settings-nav-title';
    navTitle.textContent = '设置分类';

    let tabHeader = document.createElement('div');
    tabHeader.className = 'settings-tabs';
    sidebar.append(navTitle, tabHeader);

    let content = document.createElement('div');
    content.className = 'settings-content';

    let body = document.createElement('div');
    body.className = 'settings-body';
    content.appendChild(body);

    main.append(sidebar, content);

    let tabs = [
        {
            id: 'battle',
            text: t('cB.battleSettings'),
            saveBtnText: t('cB.saveBattleConfig'),
            exportBtnText: t('cB.exportBattleConfig'),
            importBtnText: t('cB.importBattleConfig'),
            render: renderBattleTab,
            onSave() {
                let modeKey = document.querySelector('[data-role="battleMode"]')?.dataset.currentValue;
                for (const key of BATTLE_MODES) {
                    if (
                        key !== modeKey && !key.includes('_General') && cfgBattle[key] &&
                        Array.isArray(cfgBattle[key].supports) && cfgBattle[key].supports.length === 0 &&
                        Array.isArray(cfgBattle[key].attacks) && cfgBattle[key].attacks.length === 0 &&
                        !Object.keys(cfgBattle[key]).some(key => key.startsWith('kb_'))
                    ) {
                        delete cfgBattle[key];
                        jpxUtils.createToast(`Removed empty ruleset: ${key}`, 5000);
                    }
                }
                console.log(cfgBattle);
                localStorage.setItem(prefix + 'cfgBattle' + isekaiSuffix, JSON.stringify(cfgBattle));
                localStorage.setItem(prefix + 'userKeybinds' + isekaiSuffix, JSON.stringify(userKeybinds));
                applyBattleSettingsImmediately();
            },
            onExport() {
                return { data: cfgBattle, fileName: `cfgBattle${!isekaiSuffix ? '_Persistent' : '_Isekai'}.txt`, depth: 3 };
            },
            onImport(content) {
                let data = parseImportJSON(content);
                if (!data.battleVersion && !BATTLE_MODES.some(key => data[key])) {
                    throw new Error(t('cGen.invalidImportData'));
                }
                mergeCfg(data, cfgBattle, cfgBattle, 'battle');
                return createImportResult(t('cB.battleSettings'), {
                    uiId: 'cfgBattle-ui',
                    schema: getBattleSchemaForCurrentWorld(),
                    cfg: cfgBattle,
                    transModeKey: true,
                });
            },
        },
        {
            id: 'keybind',
            text: t('cB.keybindSettings'),
            saveBtnText: t('cB.saveKeybindConfig'),
            exportBtnText: t('cB.exportKeybindConfig'),
            importBtnText: t('cB.importKeybindConfig'),
            render: renderKeybindTab,
            onSave() {
                localStorage.setItem(prefix + 'userKeybinds' + isekaiSuffix, JSON.stringify(userKeybinds));
            },
            onExport() {
                return { data: userKeybinds, fileName: `userKeybinds${isekaiSuffix}.txt`, depth: 2 };
            },
            onImport(content) {
                let data = parseImportJSON(content);
                let importedCount = 0;
                let skippedCount = 0;
                Object.keys(KEYBINDS).forEach((action) => {
                    let fallback = userKeybinds[action] || KEYBINDS[action];
                    let bind = data?.[action];
                    if (bind && typeof bind.key === 'string') {
                        userKeybinds[action] = {
                            key: bind.key,
                            ctrl: !!bind.ctrl,
                            alt: !!bind.alt,
                            shift: !!bind.shift,
                        };
                        importedCount++;
                    } else {
                        userKeybinds[action] = { ...fallback };
                        skippedCount++;
                    }
                });
                return createImportResult(
                    `${t('cB.keybindSettings')} (${importedCount}/${Object.keys(KEYBINDS).length}${skippedCount ? `, 跳过 ${skippedCount}` : ''})`,
                    {
                        partial: skippedCount > 0,
                        rerender: () => {
                            this.panel.innerHTML = '';
                            renderKeybindTab(this.panel);
                        }
                    }
                );
            },
        },
        {
            id: 'stats',
            text: t('cS.statsSettings'),
            saveBtnText: t('cS.saveStatsConfig'),
            exportBtnText: t('cS.exportStatsConfig'),
            importBtnText: t('cS.importStatsConfig'),
            render: renderStatsTab,
            onSave() {
                console.log(cfgStats);
                localStorage.setItem(prefix + 'cfgStats', JSON.stringify(cfgStats));
            },
            onExport() {
                return { data: cfgStats, fileName: 'cfgStats.txt', depth: 2 };
            },
            onImport(content) {
                let data = parseImportJSON(content);
                if (!data.statsVersion && !Object.keys(defaultCfgStats).some(key => key in data)) {
                    throw new Error(t('cGen.invalidImportData'));
                }
                mergeCfg(data, cfgStats, cfgStats, 'stats');
                return createImportResult(t('cS.statsSettings'), { uiId: 'cfgStats-ui', schema: cfgStatsSchema, cfg: cfgStats });
            },
        },
    ];

    tabs.forEach(tab => {
        tab.btn = jpxUtils.createButton(tabHeader, {
            className: 'settings-tab-btn',
            text: tab.text,
            onClick: () => switchTab(tab.id, tabs),
        });

        tab.panel = document.createElement('div');
        tab.panel.id = `panel_${tab.id}`;
        tab.panel.className = 'settings-panel';
        tab.panel.style.display = 'none';

        tab.render(tab.panel);
        body.appendChild(tab.panel);
    });

    container.appendChild(header);
    container.appendChild(main);

    let buttonsUI = document.createElement('div');
    buttonsUI.className = 'settings-footer';

    jpxUtils.createButton(buttonsUI, {
        id: 'save-button',
        onClick: (btn) => {
            let activeTab = tabs.find(t => t.panel.style.display === 'block');
            if (!activeTab || !activeTab.onSave) return t('cGen.error!');
            activeTab.onSave();
            return t('cGen.saved!');
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'export-button',
        onClick: () => {
            let activeTab = tabs.find(t => t.panel.style.display === 'block');
            if (!activeTab || !activeTab.onExport) return t('cGen.exportFailed!');

            let info = activeTab.onExport();
            let blob = new Blob([jpxUtils.stringifyLimited(info.data, info.depth)], { type: 'text/plain;charset=utf-8' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = info.fileName;
            a.click();
            URL.revokeObjectURL(url);

            return t('cGen.exported!');
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'import-button',
        onClick: (btn) => {
            let activeTab = tabs.find(t => t.panel.style.display === 'block');
            if (!activeTab || !activeTab.onImport) return t('cGen.importFailed!');
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt,.json';

            return new Promise((resolve, reject) => {
                input.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (!file) return resolve(t('cGen.importSkipped'));

                    try {
                        const content = await file.text();
                        let info = activeTab.onImport(content);

                        if (info.transModeKey) {
                            let modeKey = document.querySelector('[data-role="battleMode"]')?.dataset.currentValue;
                            if (modeKey) btn.dataset.battleMode = modeKey;
                        }

                        if (info.rerender) {
                            info.rerender();
                            jpxUtils.createToast(info.message || t('cGen.imported!'), 5000, info.partial ? 'warning' : 'success');
                            return resolve(info.partial ? t('cGen.importPartial') : t('cGen.imported!'));
                        }

                        let oldUI = document.getElementById(info.uiId);
                        let newUI = document.createElement('div');
                        newUI.id = info.uiId;
                        if (oldUI) oldUI.replaceWith(newUI);
                        renderSchema(newUI, info.schema, info.cfg);

                        jpxUtils.createToast(info.message || t('cGen.imported!'), 5000, info.partial ? 'warning' : 'success');
                        resolve(info.partial ? t('cGen.importPartial') : t('cGen.imported!'));
                    } catch (err) {
                        console.error(err);
                        jpxUtils.createToast(getImportErrorMessage(err), 7000, 'error');
                        reject(t('cGen.importFailed!'));
                    }
                });

                input.click();
            });
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'close-button',
        text: t('cGen.closeSettings'),
        onClick: () => closeSettingsWindow()
    });

    container.appendChild(buttonsUI);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    switchTab('battle', tabs);
}

function switchTab(targetId, tabs) {
    tabs.forEach(tab => {
        let isActive = (tab.id === targetId);
        tab.btn.classList.toggle('is-active', isActive);
        tab.panel.style.display = isActive ? 'block' : 'none';

        if (isActive) {
            let saveBtn = document.getElementById('save-button');
            let exportBtn = document.getElementById('export-button');
            let importBtn = document.getElementById('import-button');

            if (saveBtn) saveBtn.textContent = tab.saveBtnText || 'Save Settings';
            if (exportBtn) exportBtn.textContent = tab.exportBtnText || 'Export Settings';
            if (importBtn) importBtn.textContent = tab.importBtnText || 'Import Settings';
        }
    });
}

function getKeybindActionLabel(action) {
    if (action.startsWith('nativeQuickbar')) {
        return `快捷栏${action.slice('nativeQuickbar'.length)}`;
    }
    if (action === 'nativeItemP') {
        return '物品栏P';
    }
    if (action.startsWith('nativeItemShift')) {
        return `卷轴栏${action.slice('nativeItemShift'.length)}`;
    }
    if (action.startsWith('nativeItemCtrl')) {
        return `魔药栏${action.slice('nativeItemCtrl'.length)}`;
    }
    if (action.startsWith('nativeItem')) {
        return `物品栏${action.slice('nativeItem'.length)}`;
    }
    return t(`cB.${action}`);
}

function renderKeybindTab(parent) {
    let keybindsUI = document.createElement('div');
    keybindsUI.className = 'keybinds-section';
    keybindsUI.id = 'keybinds-ui';

    Object.keys(KEYBINDS).forEach(action => {
        const bind = userKeybinds[action] || KEYBINDS[action];
        let row = document.createElement('div');
        row.className = 'keybind-row';

        let span = document.createElement('span');
        span.className = 'keybind-label';
        span.textContent = getKeybindActionLabel(action) + ': ';
        row.appendChild(span);

        jpxUtils.createButton(row, {
            id: `btn_${action}`,
            text: jpxUtils.formatKeyCombo(bind, ' + '),
            onClick: (btn, e) => {
                e.stopPropagation();
                let originalText = btn.textContent;
                btn.textContent = `... ${t('cB.recording')} ...`;
                jpxUtils.captureKeyCombo(
                    (result) => {
                        userKeybinds[action] = {
                            key: result.key,
                            ctrl: result.ctrl,
                            alt: result.alt,
                            shift: result.shift
                        };
                        btn.textContent = jpxUtils.formatKeyCombo(userKeybinds[action], ' + ');
                    },
                    () => { btn.textContent = originalText; }
                );
            }
        });
        keybindsUI.appendChild(row);
    });

    parent.appendChild(keybindsUI);
}

function renderBattleTab(parent) {
    let storedCfgBattle = {};
    try {
        storedCfgBattle = JSON.parse(localStorage.getItem(prefix + 'cfgBattle' + isekaiSuffix) || '{}');
    } catch (err) {
        console.warn('Failed to load cfgBattle. Using default cfgBattle.');
        storedCfgBattle = {};
    }
    mergeCfg(storedCfgBattle, defaultCfgBattle, cfgBattle, 'battle');

    let cfgBattleUI = document.createElement('div');
    cfgBattleUI.id = 'cfgBattle-ui';
    parent.appendChild(cfgBattleUI);
    renderSchema(cfgBattleUI, getBattleSchemaForCurrentWorld(), cfgBattle);

    let buttonsUI = document.createElement('div');
    buttonsUI.className = 'settings-sub-actions';

    jpxUtils.createButton(buttonsUI, {
        id: 'export-current-button',
        text: t('cB.exportCurrentBattleMode'),
        onClick: () => {
            let modeKey = document.querySelector('[data-role="battleMode"]')?.dataset.currentValue;
            if (!cfgBattle[modeKey]) return t('cGen.exportFailed!');
            let exportData = { [modeKey]: cfgBattle[modeKey], battleVersion: cfgBattle.battleVersion };
            let blob = new Blob([jpxUtils.stringifyLimited(exportData, 3)], { type: 'text/plain;charset=utf-8' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `cfgBattle${!isekaiSuffix ? '_Persistent' : '_Isekai'}_${modeKey}.txt`;
            a.click();
            URL.revokeObjectURL(url);

            return t('cGen.exported!');
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'reset-current-button',
        text: t('cB.resetCurrentBattleMode'),
        onClick: (btn) => {
            let modeKey = document.querySelector('[data-role="battleMode"]')?.dataset.currentValue;
            if (!modeKey) return t('cGen.resetFailed!');
            let defaultMode = defaultCfgBattle[modeKey];
            cfgBattle[modeKey] = defaultMode && !jpxUtils.isEmpty(defaultMode)
                ? JSON.parse(JSON.stringify(defaultMode))
                : {};
            btn.dataset.battleMode = modeKey;

            let oldUI = document.getElementById('cfgBattle-ui');
            let newUI = document.createElement('div');
            newUI.id = 'cfgBattle-ui';
            if (oldUI) {
                oldUI.replaceWith(newUI);
                renderSchema(newUI, getBattleSchemaForCurrentWorld(), cfgBattle);
            }

            return t('cGen.reset!');
        }
    });

    parent.appendChild(buttonsUI);
}

function renderStatsTab(parent) {
    let storedCfgStats = {};
    try {
        storedCfgStats = JSON.parse(localStorage.getItem(prefix + 'cfgStats') || '{}');
    } catch (err) {
        console.warn('Failed to load cfgStats. Using default cfgStats.');
        storedCfgStats = {};
    }
    mergeCfg(storedCfgStats, defaultCfgStats, cfgStats, 'stats');

    let cfgStatsUI = document.createElement('div');
    cfgStatsUI.id = 'cfgStats-ui';
    parent.appendChild(cfgStatsUI);
    renderSchema(cfgStatsUI, cfgStatsSchema, cfgStats);

    let buttonsUI = document.createElement('div');
    buttonsUI.className = 'settings-sub-actions';

    jpxUtils.createButton(buttonsUI, {
        id: 'reset-cfgStats-button',
        text: t('cS.resetStatsSettings'),
        onClick: (btn) => {
            cfgStats = JSON.parse(JSON.stringify(defaultCfgStats));

            let oldUI = document.getElementById('cfgStats-ui');
            let newUI = document.createElement('div');
            newUI.id = 'cfgStats-ui';
            if (oldUI) {
                oldUI.replaceWith(newUI);
                renderSchema(newUI, cfgStatsSchema, cfgStats);
            }

            return t('cGen.reset!');
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'export-db-button',
        text: t('cS.exportDB'),
        onClick: async () => {
            let exportData = await exportIndexedDB();
            let blob = new Blob([jpxUtils.stringifyLimited(exportData, 3)], { type: 'application/json' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `battleStats_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            return t('cGen.exported!');
        }
    });

    jpxUtils.createButton(buttonsUI, {
        id: 'import-db-button',
        text: t('cS.importDB'),
        onClick: (btn) => {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';

            return new Promise((resolve, reject) => {
                input.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (!file) return resolve(t('cGen.importSkipped'));
                    try {
                        let content = await file.text();
                        let json = parseImportJSON(content);

                        const merge = confirm(t('cS.importConfirm'));
                        await importIndexedDB(json, merge);

                        jpxUtils.createToast(
                            createImportResult(`${t('cS.importDB')} (${merge ? '合并' : '覆写'})`).message,
                            5000,
                            'success'
                        );
                        resolve(t('cGen.imported!'));
                    } catch (err) {
                        console.error(err);
                        jpxUtils.createToast(getImportErrorMessage(err), 7000, 'error');
                        reject(t('cGen.importFailed!'));
                    }
                });

                input.click();
            });
        }
    });

    parent.appendChild(buttonsUI);
}

//Misc
function storeTmp() {
    if (log) {
        let btcp = document.querySelector('#btcp');
        let finishBattle = document.querySelector('img[src$="finishbattle.png"]');

        if (!btcp) {
            localStorage.setItem(prefix + 'monsterData' + isekaiSuffix, JSON.stringify(monsterData));
        }
        if (!finishBattle) {
            if (cfgBattle.recordBattleLog) {
                if (Array.isArray(battleLogRecord)) localStorage.setItem(prefix + 'battleLogRecord' + isekaiSuffix, JSON.stringify(battleLogRecord));
                /*patch*/
                else localStorage.removeItem(prefix + 'battleLogRecord' + isekaiSuffix)
            }
            localStorage.setItem(prefix + 'timeRecords' + isekaiSuffix, JSON.stringify(timeRecords));
            localStorage.setItem(prefix + 'combatRecords' + isekaiSuffix, JSON.stringify(combatRecords));
            localStorage.setItem(prefix + 'revenueRecords' + isekaiSuffix, JSON.stringify(revenueRecords));
        }
    }
}

//I18n
function initDoI18n() {
    const mergeI18N = () => {Object.assign(mergedI18N, jpxUtils.deepMerge(JSON.parse(JSON.stringify(I18N)), window.jpxI18N || {}));};
    let externalI18n = window.jpxI18N;
    Object.defineProperty(window, 'jpxI18N', {
        get: () => externalI18n,
        set: (v) => {
            externalI18n = v; mergeI18N();
            jpxPanelManager.updateContent();
    },
        configurable: true
    });
    mergeI18N();
}

function t(path, args = {}) {
    if (typeof path === 'number' || (!isNaN(path) && !isNaN(parseFloat(path)))) return String(path);
    if (typeof path !== 'string') return path;

    let keys = path.split('.');
    let lastKey = keys.at(-1);
    if (!isNaN(lastKey) && !isNaN(parseFloat(lastKey))) return String(lastKey);

    let text = jpxUtils.getValueByPath(mergedI18N, keys);
    if (text === undefined) text = jpxUtils.sentenceCase(lastKey);

    if (args && typeof args === 'object') {
        for (const prop in args) {
            text = text.split('${' + prop + '}').join(String(args[prop]));
        }
    }

    return text;
}

//Panel
function jpxPanelManager(panelType) {
    const ns = jpxPanelManager;
    if (ns._init) return ns;

	ns.ready = true;
    ns.currentType = panelType;
    const panelSuffix = document.URL.includes('isekai') ? '_isekai' : '';
    ns.widgetPositionKey = `jpx_ctrlWidgetPosition${panelSuffix}`;
    ns.settingsLauncherCollapsedKey = `jpx_settingsLauncherCollapsed${panelSuffix}`;
    ns.settingsLauncherPositionKey = `jpx_settingsLauncherPosition${panelSuffix}`;

    ns.updateToggleButton = function() {
        if (!ns.toggleButton) return;
        ns.toggleButton.textContent = isActiveBattle ? t('cW.toggleAutoOff') : t('cW.toggleAutoOn');
        ns.toggleButton.classList.toggle('is-active', !!isActiveBattle);
    };

    ns.applySavedWidgetPosition = function() {
        if (!ns.ctrlWidget) return;

        let savedPosition = null;
        try {
            savedPosition = JSON.parse(localStorage.getItem(ns.widgetPositionKey) || 'null');
        } catch (err) {
            savedPosition = null;
        }

        if (!savedPosition || !Number.isFinite(savedPosition.left) || !Number.isFinite(savedPosition.top)) return;

        const maxLeft = Math.max(0, window.innerWidth - ns.ctrlWidget.offsetWidth);
        const maxTop = Math.max(0, window.innerHeight - ns.ctrlWidget.offsetHeight);
        const left = Math.min(Math.max(0, savedPosition.left), maxLeft);
        const top = Math.min(Math.max(0, savedPosition.top), maxTop);

        ns.ctrlWidget.style.left = `${left}px`;
        ns.ctrlWidget.style.top = `${top}px`;
        ns.ctrlWidget.style.right = 'auto';
        ns.ctrlWidget.style.bottom = 'auto';
    };

    ns.bindWidgetDrag = function(handle) {
        if (!handle || !ns.ctrlWidget) return;

        let dragState = null;

        const applyPosition = (clientX, clientY) => {
            if (!dragState) return;
            const maxLeft = Math.max(0, window.innerWidth - ns.ctrlWidget.offsetWidth);
            const maxTop = Math.max(0, window.innerHeight - ns.ctrlWidget.offsetHeight);
            const left = Math.min(Math.max(0, clientX - dragState.offsetX), maxLeft);
            const top = Math.min(Math.max(0, clientY - dragState.offsetY), maxTop);

            ns.ctrlWidget.style.left = `${left}px`;
            ns.ctrlWidget.style.top = `${top}px`;
            ns.ctrlWidget.style.right = 'auto';
            ns.ctrlWidget.style.bottom = 'auto';
        };

        const endDrag = (e) => {
            if (!dragState) return;
            if (e && e.pointerId !== dragState.pointerId) return;

            ns.ctrlWidget.classList.remove('is-dragging');
            const rect = ns.ctrlWidget.getBoundingClientRect();
            localStorage.setItem(ns.widgetPositionKey, JSON.stringify({
                left: Math.round(rect.left),
                top: Math.round(rect.top),
            }));

            if (dragState.pointerId != null && handle.releasePointerCapture) {
                try {
                    handle.releasePointerCapture(dragState.pointerId);
                } catch (_) {}
            }

            dragState = null;
        };

        handle.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            e.preventDefault();

            const rect = ns.ctrlWidget.getBoundingClientRect();
            dragState = {
                pointerId: e.pointerId,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
            };

            ns.ctrlWidget.classList.add('is-dragging');
            if (handle.setPointerCapture) {
                try {
                    handle.setPointerCapture(e.pointerId);
                } catch (_) {}
            }
        });

        handle.addEventListener('pointermove', (e) => {
            if (!dragState || e.pointerId !== dragState.pointerId) return;
            e.preventDefault();
            applyPosition(e.clientX, e.clientY);
        });

        handle.addEventListener('pointerup', endDrag);
        handle.addEventListener('pointercancel', endDrag);
    };

    ns.updateSettingsLauncher = function() {
        if (!ns.settingsLauncher || !ns.settingsLauncherToggleBtn || !ns.settingsLauncherOpenBtn) return;

        const collapsed = localStorage.getItem(ns.settingsLauncherCollapsedKey) === 'true';
        ns.settingsLauncher.classList.toggle('is-collapsed', collapsed);
        ns.settingsLauncherToggleBtn.textContent = collapsed ? '+' : '-';
        ns.settingsLauncherToggleBtn.title = collapsed ? '展开' : '收起';
        ns.settingsLauncherOpenBtn.textContent = t('cW.openSettings');
    };

    ns.setSettingsLauncherPosition = function(left, top, save = true) {
        if (!ns.settingsLauncher) return;

        const maxLeft = Math.max(0, window.innerWidth - ns.settingsLauncher.offsetWidth);
        const maxTop = Math.max(0, window.innerHeight - ns.settingsLauncher.offsetHeight);
        const clampedLeft = Math.min(Math.max(0, left), maxLeft);
        const clampedTop = Math.min(Math.max(0, top), maxTop);

        ns.settingsLauncher.style.left = `${clampedLeft}px`;
        ns.settingsLauncher.style.top = `${clampedTop}px`;
        ns.settingsLauncher.style.right = 'auto';
        ns.settingsLauncher.style.bottom = 'auto';

        if (save) {
            localStorage.setItem(ns.settingsLauncherPositionKey, JSON.stringify({
                left: Math.round(clampedLeft),
                top: Math.round(clampedTop),
            }));
        }
    };

    ns.toggleSettingsLauncherCollapsed = function() {
        if (!ns.settingsLauncher || !ns.settingsLauncherToggleBtn) return;

        const beforeRect = ns.settingsLauncherToggleBtn.getBoundingClientRect();
        const collapsed = localStorage.getItem(ns.settingsLauncherCollapsedKey) === 'true';
        localStorage.setItem(ns.settingsLauncherCollapsedKey, collapsed ? 'false' : 'true');
        ns.updateSettingsLauncher();

        const afterRect = ns.settingsLauncherToggleBtn.getBoundingClientRect();
        const dx = beforeRect.left - afterRect.left;
        const dy = beforeRect.top - afterRect.top;

        if (dx || dy) {
            const launcherRect = ns.settingsLauncher.getBoundingClientRect();
            ns.setSettingsLauncherPosition(launcherRect.left + dx, launcherRect.top + dy, true);
        }
    };

    ns.applySavedSettingsLauncherPosition = function() {
        if (!ns.settingsLauncher) return;

        let savedPosition = null;
        try {
            savedPosition = JSON.parse(localStorage.getItem(ns.settingsLauncherPositionKey) || 'null');
        } catch (err) {
            savedPosition = null;
        }

        if (!savedPosition || !Number.isFinite(savedPosition.left) || !Number.isFinite(savedPosition.top)) return;

        ns.setSettingsLauncherPosition(savedPosition.left, savedPosition.top, false);
    };

    ns.bindSettingsLauncherDrag = function(handle, launcher, onTap) {
        if (!handle || !launcher) return;

        let dragState = null;

        const applyPosition = (clientX, clientY) => {
            if (!dragState) return;
            ns.setSettingsLauncherPosition(clientX - dragState.offsetX, clientY - dragState.offsetY, false);
        };

        const endDrag = (e) => {
            if (!dragState) return;
            if (e && e.pointerId !== dragState.pointerId) return;

            launcher.classList.remove('is-dragging');

            if (dragState.moved) {
                const rect = launcher.getBoundingClientRect();
                ns.setSettingsLauncherPosition(rect.left, rect.top, true);
                ns.settingsLauncherSuppressClickUntil = Date.now() + 180;
            } else if (typeof onTap === 'function') {
                onTap();
            }

            if (dragState.pointerId != null && handle.releasePointerCapture) {
                try {
                    handle.releasePointerCapture(dragState.pointerId);
                } catch (_) {}
            }

            dragState = null;
        };

        handle.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;

            const rect = launcher.getBoundingClientRect();
            dragState = {
                pointerId: e.pointerId,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
                startX: e.clientX,
                startY: e.clientY,
                moved: false,
            };

            if (handle.setPointerCapture) {
                try {
                    handle.setPointerCapture(e.pointerId);
                } catch (_) {}
            }

            e.preventDefault();
            e.stopPropagation();
        });

        handle.addEventListener('pointermove', (e) => {
            if (!dragState || e.pointerId !== dragState.pointerId) return;
            e.preventDefault();

            if (!dragState.moved) {
                const deltaX = Math.abs(e.clientX - dragState.startX);
                const deltaY = Math.abs(e.clientY - dragState.startY);
                if (deltaX > 3 || deltaY > 3) {
                    dragState.moved = true;
                    launcher.classList.add('is-dragging');
                }
            }

            applyPosition(e.clientX, e.clientY);
        });

        handle.addEventListener('pointerup', endDrag);
        handle.addEventListener('pointercancel', endDrag);
    };

    ns.ensureSettingsLauncher = function() {
        if (document.querySelector('#textlog')) return;

        if (!ns.settingsLauncher) {
            const launcher = document.createElement('div');
            launcher.id = 'jpx-settings-launcher';

            const openBtn = document.createElement('button');
            openBtn.type = 'button';
            openBtn.className = 'jpx-settings-open';
            openBtn.addEventListener('click', (e) => {
                if ((ns.settingsLauncherSuppressClickUntil || 0) > Date.now()) return;
                e.preventDefault();
                e.stopPropagation();
                renderSettings();
            });

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'jpx-settings-toggle';

            launcher.append(openBtn, toggleBtn);
            ns.settingsLauncher = launcher;
            ns.settingsLauncherOpenBtn = openBtn;
            ns.settingsLauncherToggleBtn = toggleBtn;
            ns.bindSettingsLauncherDrag(toggleBtn, launcher, () => {
                if ((ns.settingsLauncherSuppressClickUntil || 0) > Date.now()) return;
                ns.toggleSettingsLauncherCollapsed();
            });
        }

        if (!document.querySelector('#jpx-settings-launcher')) {
            document.body.appendChild(ns.settingsLauncher);
        }
        ns.settingsLauncher.classList.toggle('dark-mode', shouldUseJpxDarkMode());
        ns.updateSettingsLauncher();
        ns.applySavedSettingsLauncherPosition();
    };

    ns.removeSettingsLauncher = function() {
        const launcher = document.getElementById('jpx-settings-launcher');
        if (launcher) launcher.remove();
    };

    ns.createCtrlWidget = function(type) {
        ns.removeSettingsLauncher();

        if (ns.ctrlWidget) {
            !document.querySelector('#ctrl-widget') && document.body.appendChild(ns.ctrlWidget);
            ns.ctrlWidget.classList.toggle('dark-mode', shouldUseJpxDarkMode());
            ns.updateToggleButton();
            return;
        }
        ns.currentType = type || ns.currentType;
        ns.ctrlWidget = document.createElement('div');
        ns.ctrlWidget.id = 'ctrl-widget';
        ns.ctrlWidget.classList.toggle('dark-mode', shouldUseJpxDarkMode());
        if (cfgBattle.ctrlWidgetStyleText) ns.ctrlWidget.style.cssText = cfgBattle.ctrlWidgetStyleText;
        ns.infoDiv = document.createElement('div');
        ns.infoDiv.className = 'jpx-widget-info';

        switch (ns.currentType) {
            case 'battle': {
                let dragHeader = document.createElement('div');
                dragHeader.className = 'jpx-widget-header';
                dragHeader.textContent = t('cW.dragToMove');
                ns.ctrlWidget.appendChild(dragHeader);
                ns.bindWidgetDrag(dragHeader);

                ns.ctrlWidget.appendChild(ns.infoDiv);

                let actionsDiv = document.createElement('div');
                actionsDiv.className = 'jpx-widget-actions';

                const throttledToggleBattle = jpxUtils.throttle(toggleActive, 200);

                ns.toggleButton = document.createElement('button');
                ns.toggleButton.type = 'button';
                ns.toggleButton.className = 'jpx-widget-btn jpx-widget-toggle';
                ns.toggleButton.addEventListener('pointerdown', (e) => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    e.stopPropagation();
                    e.preventDefault();
                    throttledToggleBattle();
                });

                if (cfgBattle.ctrlWidgetMouseEnter) {
					ns.toggleButton.addEventListener('mousemove', () => { ns.ready = true; });
					ns.toggleButton.addEventListener('mouseenter', () => {
						if (!ns.ready) return;
						throttledToggleBattle();
					});
				}

                actionsDiv.appendChild(ns.toggleButton);
                ns.updateToggleButton();

                let settingsDiv = document.createElement('button');
                settingsDiv.type = 'button';
                settingsDiv.className = 'jpx-widget-btn jpx-widget-settings';
                settingsDiv.textContent = t('cW.openSettings');
                settingsDiv.addEventListener('pointerdown', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                        let proficiencyRecord = document.querySelector('#proficiency-record');
                        if (proficiencyRecord) proficiencyRecord.style.left = '800px';
                    }
                    renderSettings();
                });
                actionsDiv.appendChild(settingsDiv);
                ns.ctrlWidget.appendChild(actionsDiv);
                break;
            }
        }

        if (!ns.ctrlWidget.contains(ns.infoDiv)) {
            ns.ctrlWidget.prepend(ns.infoDiv);
        }
        document.body.appendChild(ns.ctrlWidget);
        ns.applySavedWidgetPosition();
        ns.dispatchState();
    };

    ns.updateContent = function(type) {
        if (!ns.infoDiv) return;
        ns.currentType = type || ns.currentType;
        switch (ns.currentType) {
            case 'battle': {
                ns.infoDiv.replaceChildren();
                const widgetRows = Array.isArray(cfgBattle.ctrlWidgetRows)
                    ? cfgBattle.ctrlWidgetRows
                    : defaultCfgBattle.ctrlWidgetRows;
                widgetRows.forEach(row => {
                    let field = CTRLWIDGET_FIELDS.find(f => f.id === row.id);
                    if (!field) return;

                    let item = document.createElement('div');
                    item.className = 'jpx-widget-row';

                    let key = document.createElement('span');
                    key.className = 'jpx-widget-key';
                    key.textContent = t(field.label);

                    let value = document.createElement('span');
                    value.className = 'jpx-widget-value';
                    value.textContent = field.get();
                    value.title = value.textContent;

                    item.append(key, value);
                    ns.infoDiv.appendChild(item);
                });
                break;
            }
        }
    };

    ns.setBackground = function(color) {
        if (!ns.ctrlWidget) return;

        let mappedColor;
        switch (color) {
            case 'active':
            case 'idle':
            case 'warn':
                mappedColor = getWidgetStateColor(color);
                break;
            default:
                mappedColor = color;
                break;
        }
        ns.ctrlWidget.classList.toggle('dark-mode', shouldUseJpxDarkMode());
        ns.ctrlWidget.style.background = readThemeColorVar('--jpx-widget-bg', '#f5f0df');
        ns.ctrlWidget.style.borderColor = mappedColor || readThemeColorVar('--jpx-widget-border', '#7f6a45');
        ns.updateToggleButton();
    };
    
    ns.dispatchState = function() {
        ns.updateToggleButton();
        setTimeout(()=> {
            window.dispatchEvent(new CustomEvent('jpx_ctrlWidget_update', {
                detail: {
                    active: isActiveBattle,
                    background: ns.ctrlWidget?.style.background,
                    suffix: isekaiSuffix,
                    timestamp: Date.now()
                }
            }));
        }, 0);
    };

    ns._init = true;
    return ns;
}

//Market
function jpxMarket() {
    const ns = jpxMarket;
    if (ns._init) return ns;

    ns.getMarketPrice = async function () {
        let priceData = JSON.parse(localStorage.getItem(prefix + 'priceData' + isekaiSuffix) || '{}');
        let currentDate = new Date().toISOString().slice(0, 10);
        if (
            !priceData?.lastUpdate ||
            new Date(priceData.lastUpdate).toISOString().slice(0, 10) != currentDate
        ) {
            priceData = await this.updatePrice(priceData);
        }

        return priceData;
    };

    ns.updatePrice = async function (priceData) {
        let finishBattle = document.querySelector('img[src$="finishbattle.png"]');
        let isekaiSuffixUrl = document.URL.includes('isekai') ? 'isekai/' : '';
        let urlArray = [
            `${location.origin}/${isekaiSuffixUrl}?s=Bazaar&ss=mk&screen=browseitems&filter=co`,
            `${location.origin}/${isekaiSuffixUrl}?s=Bazaar&ss=mk&screen=browseitems&filter=ma`,
            `${location.origin}/${isekaiSuffixUrl}?s=Bazaar&ss=mk&screen=browseitems&filter=tr`,
        ];
        if (!isekaiSuffix) {
            urlArray = urlArray.concat([
                `${location.origin}/?s=Bazaar&ss=mk&screen=browseitems&filter=ar`,
                `${location.origin}/?s=Bazaar&ss=mk&screen=browseitems&filter=fi`,
                `${location.origin}/?s=Bazaar&ss=mk&screen=browseitems&filter=mo`,
            ]);
        }
        let defaultPriceData = {
            //Stamina
            'Energy Drink': 400,

            //Material
            'Low-Grade Cloth': 2, 'Mid-Grade Cloth': 10, 'High-Grade Cloth': 50,
            'Low-Grade Leather': 2, 'Mid-Grade Leather': 10, 'High-Grade Leather': 50,
            'Low-Grade Metals': 2, 'Mid-Grade Metals': 10, 'High-Grade Metals': 50,
            'Low-Grade Wood': 2, 'Mid-Grade Wood': 10, 'High-Grade Wood': 50,
            'Scrap Cloth': 1, 'Scrap Leather': 1, 'Scrap Metal': 1, 'Scrap Wood': 1,
            'Energy Cell': 2,

            //Consumable
            //    Restorative
            'Health Draught': 1, 'Health Potion': 2, 'Health Elixir': 20,
            'Mana Draught': 2, 'Mana Potion': 4, 'Mana Elixir': 40,
            'Spirit Draught': 2, 'Spirit Potion': 4, 'Spirit Elixir': 40,
            'Last Elixir': 40,
            //    Infusion
            'Infusion of Flames': 8, 'Infusion of Frost': 8, 'Infusion of Storms': 8, 'Infusion of Lightning': 8, 'Infusion of Divinity': 8, 'Infusion of Darkness': 8,
            //    Scroll
            'Scroll of Swiftness': 8, 'Scroll of Protection': 8, 'Scroll of the Avatar': 20,
            'Scroll of Absorption': 4, 'Scroll of Shadows': 8, 'Scroll of Life': 12, 'Scroll of the Gods': 32,
            //    Shard
            'Voidseeker Shard': 10, 'Aether Shard': 50, 'Featherweight Shard': 10, 'Amnesia Shard': 50,
            'World Seed': 50,
            //    Special Item
            'Flower Vase': 200, 'Bubble-Gum': 200,

            //Token of Blood, Chaos Token, Soul Fragment
            'Token of Blood': 0, 'Chaos Token': 0, 'Soul Fragment': 0,

            //Food
            'Monster Chow': 1, 'Monster Edibles': 1, 'Monster Cuisine': 1, 'Happy Pills': 10,

            //Figurine
            'Twilight Sparkle Figurine': 10000, 'Rainbow Dash Figurine': 10000, 'Applejack Figurine': 10000, 'Fluttershy Figurine': 10000,
            'Pinkie Pie Figurine': 10000, 'Rarity Figurine': 10000, 'Trixie Figurine': 10000, 'Princess Celestia Figurine': 10000,
            'Princess Luna Figurine': 10000, 'Apple Bloom Figurine': 10000, 'Scootaloo Figurine': 10000, 'Sweetie Belle Figurine': 10000,
            'Big Macintosh Figurine': 10000, 'Spitfire Figurine': 10000, 'Derpy Hooves Figurine': 10000, 'Lyra Heartstrings Figurine': 10000,
            'Octavia Figurine': 10000, 'Zecora Figurine': 10000, 'Cheerilee Figurine': 10000, 'Vinyl Scratch Figurine': 10000,
            'Daring Do Figurine': 10000, 'Doctor Whooves Figurine': 10000, 'Berry Punch Figurine': 10000, 'Bon-Bon Figurine': 10000,
            'Fluffle Puff Figurine': 10000, 'Angel Bunny Figurine': 10000, 'Gummy Figurine': 10000,

            //Artifacts
            'Precursor Artifact': 2000,

            //Trophy
            'ManBearPig Tail': 200, 'Holy Hand Grenade of Antioch': 200, "Mithra's Flower": 200, 'Dalek Voicebox': 200, 'Lock of Blue Hair': 200,
            'Bunny-Girl Costume': 400, 'Hinamatsuri Doll': 400, 'Broken Glasses': 400,
            'Black T-Shirt': 800, 'Sapling': 800,
            'Unicorn Horn': 1000,
            'Noodly Appendage': 1000,

            //Crystal
            'Crystal of Vigor': 1, 'Crystal of Finesse': 1, 'Crystal of Swiftness': 1, 'Crystal of Fortitude': 1, 'Crystal of Cunning': 1, 'Crystal of Knowledge': 1,
            'Crystal of Flames': 1, 'Crystal of Frost': 1, 'Crystal of Lightning': 1, 'Crystal of Tempest': 1, 'Crystal of Devotion': 1, 'Crystal of Corruption': 1,

            //Upgrade Material
            'Wispy Catalyst': 1, 'Diluted Catalyst': 5, 'Regular Catalyst': 10, 'Robust Catalyst': 25, 'Vibrant Catalyst': 50, 'Coruscating Catalyst': 100,
        };
        let latestPriceData = {};

        if (!log || finishBattle) {
            priceData['lastUpdate'] = Date.now();
            await jpxUtils.xhrGet(urlArray).then((results)=>{
                console.log('jpxUtils.xhrGet Results:');
                console.log(results);
                for (let result of results){
                    if (result['status'] === 'rejected') {
                        console.error(result['reason']);
                        break;
                    }
                    try {
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(result['value']['responseText'], 'text/html');
                        let itemListTrs = doc.querySelectorAll('#market_itemlist > table > tbody > tr');

                        itemListTrs.forEach((itemListTr, index) => {
                            if (index === 0) return;

                            let itemListTds = itemListTr.querySelectorAll('td');
                            if (itemListTds.length >= 4) {
                                let name = itemListTds[0].textContent.trim();
                                let bid = parseFloat(itemListTds[2].textContent.trim().replace(' C', '').replace(',', ''));
                                let defaultBid = defaultPriceData[name];

                                if (!isNaN(bid)) {
                                    if (!isNaN(defaultBid)) {
                                        if (bid >= defaultBid) {
                                            latestPriceData[name] = bid;
                                        } else {
                                            latestPriceData[name] = defaultBid;
                                        }
                                    } else {
                                        latestPriceData[name] = bid;
                                    }
                                } else if (!isNaN(defaultBid)) {
                                    latestPriceData[name] = defaultBid;
                                }
                            }
                        });
                    } catch (e) {
                        console.error('Parsing error for url: ' + result['value']['url']);
                    }
                }
            });
        }

        for (let latestPriceDataKey in latestPriceData) {
            priceData[latestPriceDataKey] = latestPriceData[latestPriceDataKey];
        }
        for (let defaultPriceDataKey in defaultPriceData) {
            if (!priceData[defaultPriceDataKey]) {
                priceData[defaultPriceDataKey] = defaultPriceData[defaultPriceDataKey];
            }
        }
        if (isekaiSuffix) {
            priceData['Energy Drink'] = 130000;
        }

        localStorage.setItem(prefix + 'priceData' + isekaiSuffix, JSON.stringify(priceData));

        return priceData;
    };

    ns._init = true;
    return ns;
}

//Utils
function jpxUtils() {
    const ns = jpxUtils;
    if (ns._init) return ns;

    ns.throttle = function (func, cooldownMillis, trailing = false) {
        let lastRan = 0;
        let timeoutId = null;
        let trailingThis = null;
        let trailingArgs = null;

        return (...args) => {
            if (Date.now() - lastRan > cooldownMillis) {
                lastRan = Date.now();
                func.call(this, ...args);
            } else if (trailing) {
                trailingThis = this;
                trailingArgs = args;
                if (!timeoutId) {
                    timeoutId = setTimeout(() => {
                        lastRan = Date.now();
                        timeoutId = null;
                        func.call(trailingThis, ...trailingArgs);
                    }, cooldownMillis - (Date.now() - lastRan));
                }
            }
        };
    };

    ns.secondsToTime = function (seconds, showMillisecond = false) {
        let tHours = Math.floor(seconds / 3600);
        let tMinutes = Math.floor(seconds / 60) % 60;
        let tSeconds = Math.floor(seconds % 60);
        let tMilliseconds = Math.round(seconds % 1 * 1000);
        let time =
            tHours.toString().padStart(2, '0') + ':' +
            tMinutes.toString().padStart(2, '0') + ':' +
            tSeconds.toString().padStart(2, '0');

        return showMillisecond ? time + '.' + tMilliseconds.toString().padStart(3, '0') : time;
    };

    ns.daysSince = function(dateStr) {
        if (!dateStr) return null;
        let date = new Date(dateStr + 'T00:00:00Z');
        if (isNaN(date)) return null;

        let now = new Date();
        let today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

        return Math.floor((today - date) / (1000 * 60 * 60 * 24));
    };

    ns.getSortedArray = function(arr, getValue, asc = true) {
        if (!Array.isArray(arr) || !arr.length) return [];

        if (typeof getValue !== 'function') getValue = (item) => item;

        return [...arr].sort((a, b) => {
            let va = getValue(a);
            let vb = getValue(b);
            return asc ? va - vb : vb - va;
        });
    };

    ns.lowerFirst = function (str) {
        if (!str) return str;
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    ns.titleCase = function (str, multiWord = false) {
        if (!str) return str;
        if (!multiWord && /\s/.test(str)) return str;
        return str
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    ns.sentenceCase = function (str, multiWord = false) {
        if (!str) return str;
        if (!multiWord && /\s/.test(str)) return str;
        return str
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^./, c => c.toUpperCase());
    };

    ns.matchAny = function (str, ...regexps) {
        for (const regexp of regexps) {
            let matches = str.match(regexp);
            if (matches) {
                return matches;
            }
        }
        return null;
    };

    ns.parseValue = (val) => {
        if (typeof val === 'string' && val.trim() !== '' && !isNaN(val)) return Number(val);
        return val;
    };

    ns.isEmpty = function (obj) {
        if (!obj || typeof obj !== 'object') return true;
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) return false;
        }

        return true;
    };

    ns.inRange = function (value, range) {
        let [min, max] = range;
        return value >= min && value <= max;
    };

    ns.getValueByPath = function(obj, keys) {
        let current = obj;
        for (const key of keys) {
            if (current[key] === undefined) return undefined;
            current = current[key];
        }
        return current;
    };

    ns.deepMerge = function (target, source) {
        if (!source) return target;
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], ns.deepMerge(target[key], source[key]));
            }
        }
        Object.assign(target || {}, source);
        return target;
    };

    ns.getSortedKeys = function(order, keys) {
        let sortedKeys = order.filter(key => keys.includes(key));
        let extraKeys = keys.filter(key => !order.includes(key));
        return [...sortedKeys, ...extraKeys];
    };

    ns.inc = function (obj, key, step = 1) {
        if (!obj || key == null) return;
        obj[key] = (obj[key] ?? 0) + (step || 0);
    };

    ns.createButton = function (container, options) {
        let { id, className, cssText, text, disabled, onClick } = options;

        let btn = document.createElement('button');
        if (id) btn.id = id;
        if (className) btn.className = className;
        if (cssText) btn.style.cssText = cssText;
        if (text) btn.textContent = text;
        if (disabled) btn.disabled = true;
        container.appendChild(btn);

        if (onClick) {
            btn.addEventListener('click', (e) => {
                let result = onClick(btn, e);

                const handleTempText = (tempText) => {
                    if (!tempText) return;
                    let originalText = btn.textContent;
                    btn.style.width = btn.offsetWidth + 'px';
                    btn.textContent = tempText;
                    btn.disabled = true;

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.width = '';
                        btn.disabled = false;
                    }, 1500);
                };

                if (result instanceof Promise) result.then(handleTempText).catch(handleTempText);
                else handleTempText(result);
            });
        }

        return btn;
    };

    ns.createToast = function(content, duration = 3000, styleName) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        let toast = document.createElement('div');
        toast.textContent = content;
        toast.className = `jpx-toast${styleName ? ` ${styleName}` : ''}`;
        container.appendChild(toast);

        const close = () => {
            toast.remove();
        };

        toast.addEventListener('pointerdown', close);
        setTimeout(close, duration);

        return toast;
    };

    ns.stringifyLimited = function(obj, maxPrettyLevel = 3) {
        function helper(value, level) {
            if (value && typeof value === 'object') {
                const isArray = Array.isArray(value);
                const entries = isArray ? value : Object.entries(value);

                if (level < maxPrettyLevel) {
                    if (isArray) {
                        return '[\n' +
                            value.map(value => '\t'.repeat(level + 1) + helper(value, level + 1))
                                .join(',\n') + '\n' +
                            '\t'.repeat(level) + ']';
                    } else {
                        return '{\n' +
                            Object.entries(value)
                                .map(([key, value]) => '\t'.repeat(level + 1) + JSON.stringify(key) + ': ' + helper(value, level + 1))
                                .join(',\n') + '\n' +
                            '\t'.repeat(level) + '}';
                    }
                } else {
                    return JSON.stringify(value);
                }
            } else {
                return JSON.stringify(value);
            }
        }

        return helper(obj, 0);
    };

    ns.toRegExp = function(input) {
        let match = input.match(/^\/(.*?)\/([dgimsuvy]*)$/);

        if (match) {
            let [, pattern, flags] = match;
            try {
                return new RegExp(pattern, flags);
            } catch (e) {
                console.error('Invalid regex syntax:', e.message);
                return null;
            }
        }

        return new RegExp(input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    };

    ns.keyCaptureController = null,
    ns.captureKeyCombo = function(onComplete, onAbort) {
        if (ns.keyCaptureController) ns.keyCaptureController.abort();
        let currentController = new AbortController();
        ns.keyCaptureController = currentController;
        let signal = currentController.signal;

        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (e.key === 'Escape') { currentController.abort(); return; }
            if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;

            let result = {
                key: e.key,
                ctrl: e.ctrlKey,
                alt: e.altKey,
                shift: e.shiftKey,
                comboString: '',
            };
            result.comboString = ns.formatKeyCombo(result, '+');

            currentController.abort();
            if (onComplete) onComplete(result);
        }, { signal });
        window.addEventListener('pointerdown', () => {
            currentController.abort();
        }, { signal, once: true });

        signal.addEventListener('abort', () => {
            if (ns.keyCaptureController === currentController) ns.keyCaptureController = null;
            if (onAbort) onAbort();
        });
    };
    
    ns.formatKeyCombo = function(input, separator = '+') {
        let key, ctrl, alt, shift;
        if (typeof input === 'string') {
            let pureKey = input.startsWith('kb_') ? input.slice(3) : input;
            let parts = pureKey.split('+');
            key = parts.pop();
            ctrl = parts.includes('Ctrl');
            alt = parts.includes('Alt');
            shift = parts.includes('Shift');
        } else {
            ({ key, ctrl, alt, shift } = input);
        }

        if (!key) return '未设定';

        let result = [];
        if (ctrl) result.push('Ctrl');
        if (alt) result.push('Alt');
        if (shift) result.push('Shift');
        result.push(key === ' ' ? 'SPACE' : key.toUpperCase());
        return result.join(separator);
    };

    ns.parseHVClasses = function (container, preserveSmallWords = false){
        let content = [...container?.children]
            .map(div => {
                const HVClasses = {
                    '2a': '.', '2b': ',', '2c': '!', '2d': '?', '2e': '%', '2f': '+', '2g': '-', '2h': '=', '2i': '/', '2j': '\\',
                    '2k': "'", '2l': '"', '2m': ':', '2n': ';', '2o': '(', '2p': ')', '2q': '[', '2r': ']', '2s': '_', '39': ' ',
                };

                let key = div.className.slice(-2);
                return HVClasses[key] ?? div.className.slice(-1);
            })
            .join('')
            .toLowerCase()
            .split(' ')
            .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : word)
            .join(' ');

        if (preserveSmallWords) {
            let smallWords = ['Of', 'The'];
            let regex = new RegExp(`(?<!^)\\b(${smallWords.join('|')})\\b(?<!$)`, 'g');
            content = content.replace(regex, match => match.toLowerCase());
        }

        return content;
    };

    ns.createTimeRecords = function() {
        return {
            action: 0,
            turn: 0,
            riddle: { lastTurn: -1, solved: 0, total: 0 },
            lastUse: {}
        };
    };

    ns.createCombatRecords = function() {
        return {
            use: {},
            physicalDealt: { glance:0, hit:0, crit:0, miss:0, evade:0, parryPartially:0, parry:0 },
            magicalDealt: { glance:0, hit:0, crit:0, miss:0, evade:0, resist50:0, resist75:0, resist90:0, resistPartially:0, resist:0 },
            physicalTaken: { glance:0, hit:0, crit:0, miss:0, evade:0, parryPartially:0, parry:0, blockPartially:0, block:0 },
            magicalTaken: { glance:0, hit:0, crit:0, miss:0, evade:0, resist50:0, resist75:0, resist90:0, resistPartially:0, resist:0, blockPartially:0, block:0 },
        };
    };

    ns.createRevenueRecords = function() {
        return {
            exp: 0,
            credit: 0,
            proficiency: {},
            equipment: {},
            material: {},
            consumable: {},
            token: {},
            food: {},
            figurine: {},
            artifact: {},
            trophy: {},
            crystal: {},
            staminaCost: 0,
            totalProfit: 0,
            finalProfit: 0,
        };
    };

    ns.xhrGet = async function(urlArray, interval = 250) {
        const fetchWithDelay = (url, delay) => 
            new Promise(resolve => setTimeout(resolve, delay))
            .then(() => {
                console.info('jpxUtils.xhrGet: ' + url);
                return fetch(url).then(res => {
                    if (!res.ok) throw new Error('Failed to load: ' + url);
                    return res.text().then(text => ({ url: url, responseText: text }));
                });
            });

        const promises = urlArray.map((url, index) => fetchWithDelay(url, index * interval));
        return Promise.allSettled(promises);
    };

    ns._init = true;
    return ns;
}

initDo();
