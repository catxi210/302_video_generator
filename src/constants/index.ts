import { VIDEO_FORM, VideoFormProps } from "./forms";
import { APP_ROUTE_MENU, MenuProps } from "./menus";
import {
  APP_THEME_OPTION,
  COG_RATIO_OPTION,
  DEFAULT_RATIO_OPTION,
  KLING_RATIO_OPTION,
  LUMA_RATIO_OPTION,
  MINIMAX_RATIO_OPTION,
  OptionProps,
  PIKA_RATIO_OPTION,
  RUNWAY_RATIO_OPTION,
} from "./options";

// APP
type AppConstantsProps = {
  appRouteMenu: MenuProps[];
  appThemeOption: OptionProps[];
};

export const APP_CONSTANTS: AppConstantsProps = {
  appRouteMenu: APP_ROUTE_MENU,
  appThemeOption: APP_THEME_OPTION,
};

// Form
type FormConstantsProps = {
  videoForm: VideoFormProps[];
};

export const FORM_CONSTANTS: FormConstantsProps = {
  videoForm: VIDEO_FORM,
};

// Option
type OptionConstansProps = {
  defaultVideoOption: OptionProps[];
  klingVideoOption: OptionProps[];
  minimaxVideoOption: OptionProps[];
  pikaVideoOption: OptionProps[];
  runwayVideoOption: OptionProps[];
  cogVideoOption: OptionProps[];
  lumaVideoOption: OptionProps[];
};

export const OPTION_CONSTANTS: OptionConstansProps = {
  defaultVideoOption: DEFAULT_RATIO_OPTION,
  klingVideoOption: KLING_RATIO_OPTION,
  minimaxVideoOption: MINIMAX_RATIO_OPTION,
  pikaVideoOption: PIKA_RATIO_OPTION,
  runwayVideoOption: RUNWAY_RATIO_OPTION,
  cogVideoOption: COG_RATIO_OPTION,
  lumaVideoOption: LUMA_RATIO_OPTION,
};
