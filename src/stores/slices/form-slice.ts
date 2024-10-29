import { StateCreator } from "zustand";

interface VideoFormData {
  model: string;
  prompt?: string;
  firstFile?: null | File;
  lastFile?: null | File;
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

interface FormDefaults {
  videoForm: VideoFormData;
}

interface VideoFormState {
  formData: VideoFormData;
  resetToDefault: () => void;
  setFormData: (data: Partial<VideoFormData>) => void;
}

export interface FormStore extends FormDefaults {
  videoFormState: VideoFormState;
}

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
};

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
          formData: { ...defaultValues.videoForm, ...data },
        },
      })),
  },
});
