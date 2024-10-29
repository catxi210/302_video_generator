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
  { id: 1, label: "3:2", value: "3:2" },
];

export const LUMA_RATIO_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "自定义",
    value: "0",
  },
];

export const VIDEO_MODEL_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.model.option.luma", value: "luma" },
  { id: 2, label: "v-gen:form.model.option.kling", value: "kling" },
  { id: 3, label: "v-gen:form.model.option.runway", value: "runway" },
  { id: 4, label: "v-gen:form.model.option.cog", value: "cog" },
  { id: 5, label: "v-gen:form.model.option.minimax", value: "minimax" },
  { id: 6, label: "v-gen:form.model.option.pika", value: "pika" },
  { id: 7, label: "v-gen:form.model.option.genmo", value: "genmo" },
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
