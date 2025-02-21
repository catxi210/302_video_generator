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

type DefaultVideoData = {
  model: string;
  prompt: string;
  firstFile: null | string;
  lastFile: null | string;
  thirdFile: null | string;
  firstFrame: null | string;
  lastFrame: null | string;
  thirdFrame: null | string;
  referenceImage1: null | string;
  referenceImage2: null | string;
  referenceImage3: null | string;
  referenceImage4: null | string;
  ratio?: string;
  type?: string;
  time?: string;
  loop?: string;
  camera?: string;
  audio?: string;
  style?: string;
  template?: string;
  viduType?: string;
  viduStyle?: string;
  viduTime?: string;
  viduResolution?: string;
  viduScene?: string;
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
  const thirdFile = watch("thirdFile");
  // vidu
  const viduTypeValue = watch("viduType");
  const viduTimeValue = watch("viduTime");

  // Reset Files
  useEffect(() => {
    switch (modelValue) {
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
      case "kling_15":
        setRatioOptions(OPTION_CONSTANTS.klingVideoOption);
        const baseFields = [
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "ratio",
          "type",
          "time",
        ];
        const referenceFields = [
          "referenceImage1",
          "referenceImage2",
          "referenceImage3",
          "referenceImage4",
        ];
        const lastFields = ["lastFile", "lastFrame"];

        if (typeValue === "fast") {
          setShowFields(
            firstFile ? baseFields : [...baseFields, ...referenceFields]
          );
        } else {
          setShowFields(
            firstFile
              ? [...baseFields, ...lastFields]
              : [...baseFields, ...lastFields, ...referenceFields]
          );
        }
        break;
      case "kling":
        setRatioOptions(OPTION_CONSTANTS.klingVideoOption);
        const fields = [
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "ratio",
          "type",
          "time",
        ];
        if (!firstFile) {
          fields.push(
            "referenceImage1",
            "referenceImage2",
            "referenceImage3",
            "referenceImage4"
          );
        }
        setShowFields(fields);
        break;
      case "runway":
        setRatioOptions(OPTION_CONSTANTS.runwayVideoOption);
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
        // setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        if (firstFile) {
          setShowFields([
            "model",
            "prompt",
            "firstFile",
            "firstFrame",
            "type",
            "audio",
            "time",
            "ratio",
          ]);
        } else {
          setShowFields([
            "model",
            "prompt",
            "firstFile",
            "firstFrame",
            "type",
            "audio",
            "ratio",
          ]);
        }
        break;
      case "minimax":
        setRatioOptions(OPTION_CONSTANTS.minimaxVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "minimax_live2d":
        setRatioOptions(OPTION_CONSTANTS.minimaxVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "minimax_s2v01":
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
          // "style",
          // "audio",
        ]);
        break;
      case "genmo":
        setShowFields(["model", "prompt"]);
        break;
      case "haiper":
        setRatioOptions(OPTION_CONSTANTS.haiperVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "pixverse":
        setRatioOptions(OPTION_CONSTANTS.pixverseVideoOption);
        setShowFields([
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "template",
        ]);
        break;
      case "lightricks":
        setRatioOptions(OPTION_CONSTANTS.lightricksVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame"]);
        break;
      case "hunyuan":
        setShowFields(["model", "prompt"]);
        break;
      case "wanx_turbo":
        setRatioOptions(OPTION_CONSTANTS.wanxVideoOption);
        setShowFields(["model", "prompt", "ratio"]);
        break;
      case "wanx_plus":
        setRatioOptions(OPTION_CONSTANTS.wanxVideoOption);
        setShowFields(["model", "prompt", "ratio"]);
        break;
      case "vidu":
        setRatioOptions(OPTION_CONSTANTS.viduVideoOption);
        const viduShowFields = [
          "model",
          "prompt",
          "firstFile",
          "firstFrame",
          "lastFile",
          "lastFrame",
          "ratio",
          "viduType",
        ];

        if (viduTypeValue === "scene") {
          viduShowFields.push("viduScene");
        } else if (viduTypeValue === "character") {
          // viduShowFields.push("viduTime");
          viduShowFields.push("viduResolution");
          viduShowFields.push("thirdFile");
          viduShowFields.push("thirdFrame");
        } else if (viduTypeValue === "general") {
          viduShowFields.push("viduTime");
          viduShowFields.push("viduResolution");
          if (!firstFile && !lastFile) {
            viduShowFields.push("viduStyle");
          }
        }

        if (viduTimeValue === "8") {
          const idx = viduShowFields.indexOf("viduResolution");
          if (idx > -1) {
            viduShowFields.splice(idx, 1);
          }
        }
        setShowFields(viduShowFields);
        break;
      case "seaweed":
        setRatioOptions(OPTION_CONSTANTS.seaweedVideoOption);
        setShowFields(["model", "prompt", "firstFile", "firstFrame", "ratio"]);
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
          "template",
        ]);
        break;
    }
  }, [
    modelValue,
    promptValue,
    typeValue,
    firstFile,
    lastFile,
    viduTypeValue,
    viduTimeValue,
    setValue,
    setRatioOptions,
  ]);

  // Reset Frame
  useEffect(() => {
    if (!firstFile) setValue("firstFrame", null);
    if (!lastFile) setValue("lastFrame", null);
    if (!thirdFile) setValue("thirdFrame", null);
  }, [firstFile, lastFile, thirdFile, setValue]);

  // Set Ratio
  useEffect(() => {
    if (
      [
        "kling_15",
        "kling",
        "pika",
        "vidu",
        "wanx_turbo",
        "wanx_plus",
        "seaweed",
      ].includes(modelValue) ||
      (showFields.includes("firstFile") && firstFile) ||
      (showFields.includes("lastFile") && lastFile) ||
      (showFields.includes("thirdFile") && thirdFile)
    ) {
      setIsNeedRatio(true);
    } else {
      setIsNeedRatio(false);
    }
  }, [modelValue, firstFile, lastFile, thirdFile, showFields]);

  // Set Resize
  useEffect(() => {
    setIsResize(modelValue === "runway");
  }, [modelValue]);

  // Set Ready
  useEffect(() => {
    if (["pixverse", "minimax_live2d", "minimax_s2v01"].includes(modelValue)) {
      setIsReady(!!firstFile);
    } else {
      setIsReady(!!(firstFile || lastFile || promptValue));
    }
  }, [firstFile, lastFile, promptValue, modelValue]);

  // Set Fromdata
  useEffect(() => {
    Object.entries(videoForm).forEach(([key, value]) =>
      setValue(key as VideoFormKey, value)
    );
  }, [videoForm, setValue]);

  // Handle form submit
  const _onSubmit = (data: DefaultVideoData) => {
    // console.log("_onSubmit:::", data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => showFields.includes(key))
    );
    addTask(filteredData, TaskType.VIDEO_GENERATION);
  };

  // Handle crop submit
  const handleCropConfirm = (data: {
    firstFrame: string | null;
    lastFrame: string | null;
    thirdFrame: string | null;
    ratio: string;
  }) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as VideoFormKey, value);
    });
    // console.log("data:::", data);
    handleSubmit(_onSubmit)();
  };

  // 添加一个函数来获取正确的标签
  const getFieldLabel = (fieldName: string) => {
    // 在minimax_s2v01模型时才改变标签
    if (modelValue === "minimax_s2v01") {
      if (fieldName === "firstFile" || fieldName === "firstFrame") {
        return {
          label: "v-gen:form.main_image.title",
          placeholder: "v-gen:form.main_image.desc",
        };
      }
    }
    // 只有在vidu模型且viduType为character时才改变标签
    if (modelValue === "vidu" && viduTypeValue !== "general") {
      if (fieldName === "firstFile" || fieldName === "firstFrame") {
        return {
          label: "v-gen:form.main_image1.title",
          placeholder: "v-gen:form.main_image1.desc",
        };
      }
      if (fieldName === "lastFile" || fieldName === "lastFrame") {
        return {
          label: "v-gen:form.main_image2.title",
          placeholder: "v-gen:form.main_image2.desc",
        };
      }
      if (fieldName === "thirdFile" || fieldName === "thirdFrame") {
        return {
          label: "v-gen:form.main_image3.title",
          placeholder: "v-gen:form.main_image3.desc",
        };
      }
    }
    // 其他情况使用默认标签
    if (fieldName === "firstFile" || fieldName === "firstFrame") {
      return {
        label: "v-gen:form.first_frame.title",
        placeholder: "v-gen:form.first_frame.desc",
      };
    }
    if (fieldName === "lastFile" || fieldName === "lastFrame") {
      return {
        label: "v-gen:form.last_frame.title",
        placeholder: "v-gen:form.last_frame.desc",
      };
    }
    if (fieldName === "thirdFile" || fieldName === "thirdFrame") {
      return {
        label: "v-gen:form.third_frame.title",
        placeholder: "v-gen:form.third_frame.desc",
      };
    }
    return null;
  };

  // 添加一个函数来确定是否显示字段
  const shouldShowField = (fieldName: string) => {
    // 首先检查字段是否在允许显示的字段列表中
    if (!showFields.includes(fieldName)) {
      return false;
    }
    return true;
  };

  return (
    <form
      className={cn("grid w-full items-center gap-4", className)}
      onSubmit={handleSubmit(_onSubmit)}
    >
      {FORM_CONSTANTS.videoForm.map((field) => {
        const customLabel = getFieldLabel(field.name);
        return (
          <FormGenerator
            {...field}
            key={field.id}
            watch={watch}
            register={register}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            label={customLabel?.label || field.label}
            placeholder={customLabel?.placeholder || field.placeholder}
            className={cn("flex flex-col space-y-1.5", {
              hidden: !shouldShowField(field.name),
            })}
          />
        );
      })}
      {isNeedRatio ? (
        <ImageCropper
          disable={disabled || !isReady}
          ratioOptions={ratioOptions}
          originFirstUrl={showFields.includes("firstFile") ? firstFile : null}
          originLastUrl={showFields.includes("lastFile") ? lastFile : null}
          originThirdUrl={showFields.includes("thirdFile") ? thirdFile : null}
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
