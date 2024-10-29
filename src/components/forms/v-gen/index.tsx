/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormGenerator from "@/components/common/form-generator";
import { ImageCropper } from "@/components/common/image-cropper";
import { Button } from "@/components/ui/button";
import { FORM_CONSTANTS, OPTION_CONSTANTS } from "@/constants";
import { OptionProps } from "@/constants/options";
import { useClientTranslation } from "@/hooks/global";
import { cn } from "@/lib/utils";
import { useFormStore, useTaskStore } from "@/stores";
import { TaskType } from "@/stores/slices/task-slice";

import type { VideoFormKey } from "./schema";
import { VideoSchema } from "./schema";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

// Define the type for authentication data
type DefaultVideoData = {
  model: string;
  prompt: string;
  firstFile: null | File;
  lastFile: null | File;
  firstFrame: null | File;
  lastFrame: null | File;
  ratio?: string;
  type?: string;
  time?: string;
  loop?: string;
  camera?: string;
  audio?: string;
  style?: string;
};

type VideoFormProps = {
  disabled?: boolean;
  className?: string;
};

const VideoForm = ({ className, disabled = false }: VideoFormProps) => {
  const addTask = useTaskStore((state) => state.addTask);
  const [isReady, setIsReady] = useState(false);
  const [showFields, setShowFields] = useState<string[]>([]);
  const [isNeedRatio, setIsNeedRatio] = useState(false);
  const [isResize, setIsResize] = useState(false);
  const [ratioOptions, setRatioOptions] = useState<OptionProps[]>(
    OPTION_CONSTANTS.defaultVideoOption
  );
  const { t } = useClientTranslation();

  const videoForm = useFormStore((state) => state.videoFormState.formData);

  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<DefaultVideoData>({
    defaultValues: videoForm,
    resolver: zodResolver(VideoSchema),
  });

  const modelValue = watch("model");
  const promptValue = watch("prompt");
  const typeValue = watch("type");
  const firstFile = watch("firstFile");
  const lastFile = watch("lastFile");

  useEffect(() => {
    // set ready for submit
    if (firstFile || lastFile || promptValue) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }

    // set frame imgages
    if (!firstFile) setValue("firstFrame", null);
    if (!lastFile) setValue("lastFrame", null);

    // show crop modal if have image or model in list
    if (!["kling", "pika"].includes(modelValue) && !firstFile && !lastFile) {
      setIsNeedRatio(false);
    } else {
      setIsNeedRatio(true);
    }

    // set frame size
    if (modelValue === "runway") {
      setIsResize(true);
    } else {
      setIsResize(false);
    }

    // Dynamically update visible fields based on model value
    switch (modelValue) {
      // set if show files
      case "luma":
        setRatioOptions(OPTION_CONSTANTS.lumaVideoOption);
        setShowFields([
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "lastFile",
          "lastFrame",
          "camera",
          "loop",
        ]);
        break;
      case "kling":
        setRatioOptions(OPTION_CONSTANTS.klingVideoOption);
        setShowFields([
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "lastFile",
          "lastFrame",
          "ratio",
          "type",
          "time",
        ]);
        break;
      case "runway":
        // 设置比例
        setRatioOptions(OPTION_CONSTANTS.runwayVideoOption);
        // 有图片可以选高清或快速生成
        if (firstFile || lastFile) {
          setShowFields([
            "model",
            "prompt",
            "firstFile",
            "firstFrame",
            "lastFile",
            "lastFrame",
            "type",
            "time",
          ]);
        } else {
          setShowFields([
            "model",
            "prompt",
            "firstFile",
            "firstFrame",
            "lastFile",
            "lastFrame",
            "time",
          ]);
        }
        break;
      case "cog":
        setRatioOptions(OPTION_CONSTANTS.cogVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "minimax":
        setRatioOptions(OPTION_CONSTANTS.minimaxVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "pika":
        setRatioOptions(OPTION_CONSTANTS.pikaVideoOption);
        setShowFields([
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "ratio",
          "style",
          "audio",
        ]);
        break;
      case "genmo":
        setShowFields(["model", "prompt"]);
        break;

      default:
        setRatioOptions(OPTION_CONSTANTS.defaultVideoOption);
        setShowFields([
          "model",
          "prompt",
          "firstFile",
          "lastFile",
          "firstFrame",
          "lastFrame",
          "ratio",
          "type",
          "time",
          "loop",
          "audio",
          "camera",
          "style",
        ]);
        break;
    }
  }, [modelValue, promptValue, typeValue, firstFile, lastFile, setValue]);

  // Restore form
  useEffect(() => {
    // 使用外部组件更新时回填表单
    Object.entries(videoForm).forEach(([key, value]) =>
      setValue(key as VideoFormKey, value)
    );
  }, [videoForm, setValue]);

  // 提交表单
  const _onSubmit = (data: DefaultVideoData) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => showFields.includes(key))
    );
    addTask(filteredData, TaskType.VIDEO_GENERATION);
    // Submit filteredData instead of data
  };

  const handleCropConfirm = (data: {
    firstFrame: File | null;
    lastFrame: File | null;
    ratio: string;
  }) => {
    // 使用外部组件更新时回填表单
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as VideoFormKey, value);
    });
    handleSubmit(_onSubmit)(); // Resubmit with chosen ratio
  };

  return (
    <form
      className={cn("grid w-full items-center gap-4", className)}
      onSubmit={handleSubmit(_onSubmit)}
    >
      {FORM_CONSTANTS.videoForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          watch={watch}
          register={register}
          getValues={getValues}
          setValue={setValue}
          errors={errors}
          className={cn("flex flex-col space-y-1.5", {
            hidden: !showFields.includes(field.name),
          })}
        />
      ))}
      {isNeedRatio ? (
        <ImageCropper
          disable={disabled || !isReady}
          ratioOptions={ratioOptions}
          originFirstFile={firstFile}
          originLastFile={lastFile}
          resize={isResize}
          confirm={handleCropConfirm}
        />
      ) : (
        <Button disabled={disabled || !isReady} type="submit">
          {t("v-gen:action.create_video")}
        </Button>
      )}
    </form>
  );
};

export default VideoForm;
