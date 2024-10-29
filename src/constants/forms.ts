import {
  VIDEO_AUDIO_OPTION,
  VIDEO_CAMERA_OPTION,
  VIDEO_LOOP_OPTION,
  VIDEO_MODEL_OPTION,
  VIDEO_STYLE_OPTION,
  VIDEO_TIME_OPTION,
  VIDEO_TYPE_OPTION,
} from "./options";

export type VideoFormProps = {
  id: number;
  name: string;
  label?: string;
  placeholder?: string;
  type: "select" | "input" | "textarea" | "checkbox" | "upload";
  inputType?: "text" | "email" | "password" | "number" | "checkbox";
  textareaRows?: number;
  selectOptions?: { value: string; label: string; id: number }[];
};

export const VIDEO_FORM: VideoFormProps[] = [
  {
    id: 1,
    name: "model",
    label: "v-gen:form.model.title",
    placeholder: "v-gen:form.model.desc",
    type: "select",
    selectOptions: VIDEO_MODEL_OPTION,
  },
  {
    id: 2,
    name: "prompt",
    label: "v-gen:form.prompt.title",
    placeholder: "v-gen:form.prompt.desc",
    type: "textarea",
    textareaRows: 3,
  },
  {
    id: 3,
    name: "firstFile",
    label: "v-gen:form.first_frame.title",
    placeholder: "v-gen:form.first_frame.desc",
    type: "upload",
  },
  {
    id: 4,
    name: "lastFile",
    label: "v-gen:form.last_frame.title",
    placeholder: "v-gen:form.last_frame.desc",
    type: "upload",
  },
  {
    id: 5,
    name: "type",
    label: "v-gen:form.type.title",
    placeholder: "v-gen:form.type.desc",
    type: "select",
    selectOptions: VIDEO_TYPE_OPTION,
  },
  {
    id: 6,
    name: "time",
    label: "v-gen:form.time.title",
    placeholder: "v-gen:form.time.desc",
    type: "select",
    selectOptions: VIDEO_TIME_OPTION,
  },
  {
    id: 7,
    name: "loop",
    label: "v-gen:form.loop.title",
    placeholder: "v-gen:form.loop.desc",
    type: "select",
    selectOptions: VIDEO_LOOP_OPTION,
  },
  {
    id: 8,
    name: "audio",
    label: "v-gen:form.audio.title",
    placeholder: "v-gen:form.audio.desc",
    type: "select",
    selectOptions: VIDEO_AUDIO_OPTION,
  },
  {
    id: 9,
    name: "camera",
    label: "v-gen:form.camera.title",
    placeholder: "v-gen:form.camera.desc",
    type: "select",
    selectOptions: VIDEO_CAMERA_OPTION,
  },
  {
    id: 10,
    name: "style",
    label: "v-gen:form.style.title",
    placeholder: "v-gen:form.style.desc",
    type: "select",
    selectOptions: VIDEO_STYLE_OPTION,
  },
];
