import { StateCreator } from "zustand";

// Video Form
interface VideoFormData {
  model: string;
  prompt?: string;
  firstFile?: null | File;
  lasttFile?: null | File;
  firstFrame?: null | File;
  lastFrame?: null | File;
  raio?: string;
  type?: string;
  time?: string;
  loop?: string;
  camera?: string;
  audio?: string;
  style?: string;
}

// 定义每个表单的默认值类型接口
interface FormDefaults {
  videoForm: VideoFormData;
  // 如果有其他表单，可以在这里继续添加
}

// 定义具体表单的状态接口
interface VideoFormState {
  formData: VideoFormData;
  resetToDefault: () => void;
  setFormData: (data: Partial<VideoFormData>) => void;
}

// 定义zustand store的接口
export interface FormStore extends FormDefaults {
  videoFormState: VideoFormState;
  // 其他表单的状态声明
}

// 默认值
const defaultValues: FormDefaults = {
  videoForm: {
    model: "luma",
    prompt: "",
    type: "fast",
    time: "5s",
    loop: "false",
    audio: "false",
    camera: "none",
    style: "none",
  },
  // 如果有其他表单，设置它们的默认值
};

// 创建一个zustand store
export const createFormSlice: StateCreator<FormStore, [], [], FormStore> = (
  set
) => ({
  videoForm: defaultValues.videoForm,
  videoFormState: {
    formData: { ...defaultValues.videoForm },
    resetToDefault: () =>
      set((state) => ({
        videoFormState: {
          ...state.videoFormState,
          formData: { ...defaultValues.videoForm },
        },
      })),
    setFormData: (data) =>
      set((state) => ({
        videoFormState: {
          ...state.videoFormState,
          // formData: { ...state.videoFormState.formData, ...data }
          formData: { ...defaultValues.videoForm, ...data },
        },
      })),
  },
  // 可以在这里添加其他表单的状态管理
});
