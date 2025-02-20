export type OptionProps = {
  id: number;
  label: string;
  value: string;
};

export const APP_THEME_OPTION: OptionProps[] = [
  { id: 1, label: "global:theme.light", value: "light" },
  { id: 2, label: "global:theme.dark", value: "dark" },
  { id: 3, label: "global:theme.system", value: "system" },
];

export const DEFAULT_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
];

export const KLING_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const MINIMAX_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const PIKA_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const RUNWAY_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1280:768", value: "1280:768" },
  { id: 2, label: "768:1280", value: "768:1280" },
];

export const COG_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1024:1024" },
  { id: 2, label: "3:2", value: "720:480" },
  { id: 3, label: "4:3", value: "1280:960" },
  { id: 4, label: "3:4", value: "960:1280" },
  { id: 5, label: "16:9", value: "1920:1080" },
  { id: 6, label: "9:16", value: "1080:1920" },
];

export const LIGHTRICKS_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "3:2", value: "3:2" },
];

export const VIDU_RATIO_OPTION: OptionProps[] = [
  // { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const WANX_RATION_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "960*960" },
  { id: 2, label: "4:3", value: "1088*832" },
  { id: 3, label: "3:4", value: "832*1088" },
  { id: 4, label: "16:9", value: "1280*720" },
  { id: 5, label: "9:16", value: "720*1280" },
];

export const SEAWEED_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "4:3", value: "4:3" },
  { id: 3, label: "16:9", value: "16:9" },
];

// export const HAIPER_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

// export const LUMA_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

// export const PIXVERSE_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

export const CUSTOMER_RATIO_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "自定义",
    value: "0",
  },
];

export const VIDEO_MODEL_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.model.option.luma", value: "luma" },
  { id: 2, label: "v-gen:form.model.option.kling_15", value: "kling_15" },
  { id: 3, label: "v-gen:form.model.option.kling_16", value: "kling" },
  { id: 4, label: "v-gen:form.model.option.runway", value: "runway" },
  { id: 5, label: "v-gen:form.model.option.cog", value: "cog" },
  { id: 6, label: "v-gen:form.model.option.minimax", value: "minimax" },
  {
    id: 7,
    label: "v-gen:form.model.option.minimax_live2d",
    value: "minimax_live2d",
  },
  {
    id: 8,
    label: "v-gen:form.model.option.minimax_s2v01",
    value: "minimax_s2v01",
  },
  { id: 9, label: "v-gen:form.model.option.pika", value: "pika" },
  { id: 10, label: "v-gen:form.model.option.genmo", value: "genmo" },
  { id: 11, label: "v-gen:form.model.option.haiper", value: "haiper" },
  { id: 12, label: "v-gen:form.model.option.pixverse", value: "pixverse" },
  { id: 13, label: "v-gen:form.model.option.vidu", value: "vidu" },
  { id: 14, label: "v-gen:form.model.option.lightricks", value: "lightricks" },
  { id: 15, label: "v-gen:form.model.option.hunyuan", value: "hunyuan" },
  { id: 16, label: "v-gen:form.model.option.wanx_turbo", value: "wanx_turbo" },
  { id: 17, label: "v-gen:form.model.option.wanx_plus", value: "wanx_plus" },
  { id: 18, label: "v-gen:form.model.option.seaweed", value: "seaweed" },
];

export const VIDEO_TYPE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.type.option.fast", value: "fast" },
  { id: 2, label: "v-gen:form.type.option.hq", value: "hq" },
];

export const VIDEO_TIME_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.time.option.short", value: "5s" },
  { id: 2, label: "v-gen:form.time.option.long", value: "10s" },
];

export const VIDEO_LOOP_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.loop.option.open", value: "true" },
  { id: 2, label: "v-gen:form.loop.option.close", value: "false" },
];

export const VIDEO_AUDIO_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.audio.option.open", value: "true" },
  { id: 2, label: "v-gen:form.audio.option.close", value: "false" },
];

export const VIDEO_CAMERA_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.camera.option.none", value: "none" },
  {
    id: 2,
    label: "v-gen:form.camera.option.move_left",
    value: "camera move left ",
  },
  {
    id: 3,
    label: "v-gen:form.camera.option.move_right",
    value: "camera move right ",
  },
  {
    id: 4,
    label: "v-gen:form.camera.option.move_up",
    value: "camera move up ",
  },
  {
    id: 5,
    label: "v-gen:form.camera.option.move_down",
    value: "camera move down ",
  },
  {
    id: 6,
    label: "v-gen:form.camera.option.push_in",
    value: "camera Push In ",
  },
  {
    id: 7,
    label: "v-gen:form.camera.option.push_out",
    value: "camera move out ",
  },
  {
    id: 8,
    label: "v-gen:form.camera.option.pan_left",
    value: "camera pan left ",
  },
  {
    id: 9,
    label: "v-gen:form.camera.option.pan_right",
    value: "camera pan right ",
  },
  {
    id: 10,
    label: "v-gen:form.camera.option.orbit_left",
    value: "camera orbit left ",
  },
  {
    id: 11,
    label: "v-gen:form.camera.option.orbit_right",
    value: "camera orbit right ",
  },
  {
    id: 12,
    label: "v-gen:form.camera.option.grane_up",
    value: "camera grane up ",
  },
  {
    id: 13,
    label: "v-gen:form.camera.option.grane_down",
    value: "camera grane down ",
  },
];

export const VIDEO_STYLE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.style.option.none", value: "none" },
  { id: 2, label: "v-gen:form.style.option.inflate", value: "Inflate" },
  { id: 3, label: "v-gen:form.style.option.melt", value: "Melt" },
  { id: 4, label: "v-gen:form.style.option.explode", value: "Explode" },
  { id: 5, label: "v-gen:form.style.option.squish", value: "Squish" },
  { id: 6, label: "v-gen:form.style.option.crush", value: "Crush" },
  { id: 7, label: "v-gen:form.style.option.cake_ify", value: "Cake-ify" },
  { id: 8, label: "v-gen:form.style.option.ta_da", value: "Ta-da" },
  { id: 9, label: "v-gen:form.style.option.deflate", value: "Deflate" },
  { id: 10, label: "v-gen:form.style.option.crumble", value: "Crumble" },
  { id: 11, label: "v-gen:form.style.option.dissolve", value: "Dissolve" },
];

export const VIDEO_TEMPLATE_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "v-gen:form.template.option.hairCurl",
    value: "310371322329472",
  },
  {
    id: 2,
    label: "v-gen:form.template.option.hairKing",
    value: "308552687706496",
  },
  {
    id: 3,
    label: "v-gen:form.template.option.hugYourLove",
    value: "303624424723200",
  },
  {
    id: 4,
    label: "v-gen:form.template.option.wonderWomanTransformation",
    value: "309283958194560",
  },
  {
    id: 5,
    label: "v-gen:form.template.option.catwomanTransformation",
    value: "307489548427968",
  },
  {
    id: 6,
    label: "v-gen:form.template.option.harleyQuinnTransformation",
    value: "307489434436288",
  },
  {
    id: 7,
    label: "v-gen:form.template.option.muscleMan",
    value: "308621408717184",
  },
  {
    id: 8,
    label: "v-gen:form.template.option.summonHulk",
    value: "304826314164992",
  },
  {
    id: 9,
    label: "v-gen:form.template.option.jokerRebirth",
    value: "304826126435072",
  },
  {
    id: 10,
    label: "v-gen:form.template.option.ironmanTransformation",
    value: "304826054394624",
  },
  {
    id: 11,
    label: "v-gen:form.template.option.batmanReturns",
    value: "304826374632192",
  },
  {
    id: 12,
    label: "v-gen:form.template.option.wickedShots",
    value: "303788802773760",
  },
  {
    id: 13,
    label: "v-gen:form.template.option.venomTransformation",
    value: "303624537709312",
  },
  {
    id: 14,
    label: "v-gen:form.template.option.venomColorBox",
    value: "304358279051648",
  },
  {
    id: 15,
    label: "v-gen:form.template.option.zombieMode",
    value: "302325299651648",
  },
  {
    id: 16,
    label: "v-gen:form.template.option.squishIt",
    value: "302325299692608",
  },
  {
    id: 17,
    label: "v-gen:form.template.option.zombieHand",
    value: "302325299672128",
  },
  {
    id: 18,
    label: "v-gen:form.template.option.wizardHat",
    value: "302325299661888",
  },
  {
    id: 19,
    label: "v-gen:form.template.option.leggyRun",
    value: "302325299711040",
  },
  {
    id: 20,
    label: "v-gen:form.template.option.monsterInvades",
    value: "302325299682368",
  },
  {
    id: 21,
    label: "v-gen:form.template.option.legoBlast",
    value: "302325299702848",
  },
  {
    id: 22,
    label: "v-gen:form.template.option.sailorMoonTransformation",
    value: "313359138372032",
  },
  {
    id: 23,
    label: "v-gen:form.template.option.blackGokuEngine",
    value: "313359209531840",
  },
  {
    id: 24,
    label: "v-gen:form.template.option.aliveArt",
    value: "302325299721280",
  },
  {
    id: 25,
    label: "v-gen:form.template.option.babyFace",
    value: "315446232403008",
  },
  {
    id: 26,
    label: "v-gen:form.template.option.cigarBoss",
    value: "316645675647872",
  },
  {
    id: 27,
    label: "v-gen:form.template.option.fightAndMeet",
    value: "315447659476032",
  },
  {
    id: 28,
    label: "v-gen:form.template.option.kissOfLove",
    value: "315446315336768",
  },
  {
    id: 29,
    label: "v-gen:form.template.option.christmasOutfit",
    value: "312314911869312",
  },
  {
    id: 30,
    label: "v-gen:form.template.option.christmasGiftBox",
    value: "311521768592256",
  },
  {
    id: 31,
    label: "v-gen:form.template.option.santaHideAndSeek",
    value: "311521879229312",
  },
  {
    id: 32,
    label: "v-gen:form.template.option.venomReveal",
    value: "305714097668480",
  },
  {
    id: 33,
    label: "v-gen:form.template.option.venomBrother",
    value: "306059795500352",
  },
  {
    id: 34,
    label: "v-gen:form.template.option.squidGame",
    value: "316139945292864",
  },
  {
    id: 35,
    label: "v-gen:form.template.option.ingiGaze",
    value: "317013620689664",
  },
];

// VIDU
export const VIDU_TYPE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_type.option.general", value: "general" },
  { id: 2, label: "v-gen:form.vidu_type.option.character", value: "character" },
  { id: 3, label: "v-gen:form.vidu_type.option.scene", value: "scene" },
];

export const VIDU_STYLE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_style.option.general", value: "general" },
  { id: 2, label: "v-gen:form.vidu_style.option.anime", value: "anime" },
];

export const VIDU_TIME_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_time.option.short", value: "4" },
  { id: 2, label: "v-gen:form.vidu_time.option.long", value: "8" },
];

export const VIDU_RESOLUTION_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_resolution.option.sd", value: "512" },
  { id: 2, label: "v-gen:form.vidu_resolution.option.hd", value: "720p" },
  { id: 3, label: "v-gen:form.vidu_resolution.option.fhd", value: "1080p" },
];

export const VIDU_SCENE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_scene.option.hug", value: "hug" }, // 拥抱相关
  { id: 2, label: "v-gen:form.vidu_scene.option.kiss", value: "kiss" }, // 亲吻
  {
    id: 3,
    label: "v-gen:form.vidu_scene.option.christmas_effect",
    value: "christmas@effect",
  }, // 圣诞老人变身
  {
    id: 4,
    label: "v-gen:form.vidu_scene.option.santa_gifts",
    value: "christmas@gifts",
  }, // 圣诞老人来送礼
  {
    id: 5,
    label: "v-gen:form.vidu_scene.option.merry_christmas",
    value: "christmas@merry",
  }, // 圣诞节举杯祝贺
  {
    id: 6,
    label: "v-gen:form.vidu_scene.option.santa_hug",
    value: "christmas@hug",
  }, // 圣诞老人来拥抱
  {
    id: 8,
    label: "v-gen:form.vidu_scene.option.inflate",
    value: "morphlab@inflate",
  }, // 膨胀
  {
    id: 9,
    label: "v-gen:form.vidu_scene.option.twist",
    value: "morphlab@twist",
  }, // 扭曲
  {
    id: 10,
    label: "v-gen:form.vidu_scene.option.explode",
    value: "morphlab@explode",
  }, // 爆炸
  {
    id: 10,
    label: "v-gen:form.vidu_scene.option.melt",
    value: "morphlab@melt",
  }, // 融化
  // 实况照片
  {
    id: 11,
    label: "v-gen:form.vidu_scene.option.live_photo@smile",
    value: "live_photo@smile",
  }, // 微笑
  {
    id: 12,
    label: "v-gen:form.vidu_scene.option.live_photo@wind",
    value: "live_photo@wind",
  }, // 风动
  {
    id: 13,
    label: "v-gen:form.vidu_scene.option.live_photo@camera",
    value: "live_photo@camera",
  }, // 镜头动
  {
    id: 14,
    label: "v-gen:form.vidu_scene.option.live_photo@walk",
    value: "live_photo@walk",
  }, // 走路
  // 情绪特效
  {
    id: 15,
    label: "v-gen:form.vidu_scene.option.emotionlab@terrible",
    value: "emotionlab@terrible",
  }, // 恐惧
  {
    id: 16,
    label: "v-gen:form.vidu_scene.option.emotionlab@smile",
    value: "emotionlab@smile",
  }, // 微笑
  {
    id: 17,
    label: "v-gen:form.vidu_scene.option.emotionlab@laugh",
    value: "emotionlab@laugh",
  }, // 狂笑
  {
    id: 18,
    label: "v-gen:form.vidu_scene.option.emotionlab@surprised",
    value: "emotionlab@surprised",
  }, // 惊讶
  // 老照片
  {
    id: 19,
    label: "v-gen:form.vidu_scene.option.live_memory@old_photo",
    value: "live_memory@old_photo",
  }, // 老照片动起来
  // 发型特效
  {
    id: 20,
    label: "v-gen:form.vidu_scene.option.hair_swap@curl",
    value: "hair_swap@curl",
  }, // 羊毛卷
  {
    id: 21,
    label: "v-gen:form.vidu_scene.option.hair_swap@double",
    value: "hair_swap@double",
  }, // 双马尾
  {
    id: 22,
    label: "v-gen:form.vidu_scene.option.hair_swap@long",
    value: "hair_swap@long",
  }, // 长发
  // 互动特效
  {
    id: 23,
    label: "v-gen:form.vidu_scene.option.interaction@love",
    value: "interaction@love",
  }, // 爱的互动
  {
    id: 24,
    label: "v-gen:form.vidu_scene.option.interaction@rose",
    value: "interaction@rose",
  }, // 送玫瑰花
  // 新年特效
  {
    id: 25,
    label: "v-gen:form.vidu_scene.option.lunar_newyear@fireworks",
    value: "lunar_newyear@fireworks",
  }, // 新年烟花
  {
    id: 26,
    label: "v-gen:form.vidu_scene.option.lunar_newyear@cheers",
    value: "lunar_newyear@cheers",
  }, // 新年举杯
  {
    id: 27,
    label: "v-gen:form.vidu_scene.option.lunar_newyear@gift",
    value: "lunar_newyear@gift",
  }, // 新年红包
  // 童年回忆
  {
    id: 28,
    label: "v-gen:form.vidu_scene.option.youth_rewind@rewind",
    value: "youth_rewind@rewind",
  }, // 童年回忆
  // 古风换装
  {
    id: 29,
    label: "v-gen:form.vidu_scene.option.dynasty_dress@dress",
    value: "dynasty_dress@dress",
  }, // 古风换装
  // 全家福比心
  {
    id: 30,
    label: "v-gen:form.vidu_scene.option.lover_pose@pose",
    value: "lover_pose@pose",
  }, // 全家福比心
  // 财神特效
  {
    id: 31,
    label: "v-gen:form.vidu_scene.option.wish_sender@love",
    value: "wish_sender@love",
  }, // 和财神比心
  {
    id: 32,
    label: "v-gen:form.vidu_scene.option.wish_sender@coins",
    value: "wish_sender@coins",
  }, // 财神发金币
  // 婚礼特效
  {
    id: 33,
    label: "v-gen:form.vidu_scene.option.dreamy_wedding",
    value: "dreamy_wedding",
  }, // 梦幻婚礼
  {
    id: 34,
    label: "v-gen:form.vidu_scene.option.romantic_lift",
    value: "romantic_lift",
  }, // 浪漫公主抱
  {
    id: 35,
    label: "v-gen:form.vidu_scene.option.sweet_proposal",
    value: "sweet_proposal",
  }, // 甜蜜求婚
  // 情侣互动
  {
    id: 36,
    label: "v-gen:form.vidu_scene.option.couple_arrival@flower",
    value: "couple_arrival@flower",
  }, // 情侣送花
  {
    id: 37,
    label: "v-gen:form.vidu_scene.option.couple_arrival@hug",
    value: "couple_arrival@hug",
  }, // 情侣拥抱
  {
    id: 38,
    label: "v-gen:form.vidu_scene.option.couple_arrival@kiss",
    value: "couple_arrival@kiss",
  }, // 情侣亲吻
  {
    id: 39,
    label: "v-gen:form.vidu_scene.option.couple_arrival@wave",
    value: "couple_arrival@wave",
  }, // 情侣挥手
  // 丘比特之箭
  {
    id: 40,
    label: "v-gen:form.vidu_scene.option.cupid_arrow",
    value: "cupid_arrow",
  }, // 丘比特之箭
  // 萌宠恋人
  {
    id: 41,
    label: "v-gen:form.vidu_scene.option.pet_lovers",
    value: "pet_lovers",
  }, // 萌宠恋人
];
