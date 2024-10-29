/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Download,
  Edit,
  RotateCcwIcon,
  Trash2Icon,
  UnfoldHorizontal,
} from "lucide-react";

import ErrorRenderer from "@/components/common/error-renderer";
import { DotLoader } from "@/components/common/loader-renderer";
import VideoPlayer from "@/components/common/video-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientTranslation } from "@/hooks/global";
import FileManager from "@/lib/file";
import { cn } from "@/lib/utils";
import { extendVideo, generateVideo } from "@/services/v-gen";
import { useFormStore, useHistoryStore, useTaskStore } from "@/stores";
import { HistoryType } from "@/stores/slices/history-slice";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type TaskItemProps = {
  top: number;
  taskData: any;
};

const TaskItem = ({ top, taskData }: TaskItemProps) => {
  const { id: taskId } = taskData;
  const [frameImageUrl, setFrameImageURL] = useState("");
  const queryClient = useQueryClient();
  const updateTaskResult = useTaskStore((state) => state.updateTaskResult);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addHistory = useHistoryStore((state) => state.addHistory);
  const updateVideoForm = useFormStore(
    (state) => state.videoFormState.setFormData
  );
  const { t } = useClientTranslation();

  // Create Video
  const {
    error: createVideoError,
    data: videoData,
    isFetching,
    refetch: refetchVideo,
  } = useQuery({
    queryKey: ["video", taskId],
    queryFn: () => generateVideo(taskData),
    retry: false,
    enabled: !taskData.result, // 只在任务未完成时进行查询
  });

  // Extend Video
  const ExtendVideoMutation = useMutation({
    mutationFn: extendVideo,
    onSuccess: (data) => {
      queryClient.setQueryData(["video", taskId], data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // Handler Extend Video
  const handleExtendVideo = () => {
    ExtendVideoMutation.mutate(taskData);
  };

  // Restore Video
  useEffect(() => {
    if (videoData) {
      updateTaskResult(taskId, {
        resultId: videoData.resultId,
        videoUrl: videoData.videoUrl,
      });
      // save history for v-gen type
      addHistory(
        { ...taskData, result: videoData },
        HistoryType.VIDEO_GENERATION
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData, taskId, updateTaskResult, addHistory]);

  useEffect(() => {
    const frameImageFiel =
      taskData.payload.firstFrame || taskData.payload.lastFrame;
    if (frameImageFiel) {
      const imageURL = URL.createObjectURL(frameImageFiel);
      setFrameImageURL(imageURL);
    }
  }, [taskData.payload]);

  return (
    <Card className={cn("w-full] relative rounded-none")}>
      <CardHeader className="pb-2">
        <CardTitle>
          <div className="absolute left-5 top-[-4px] w-8 rounded-b-sm border bg-primary py-5 text-center text-white shadow-2xl">
            {top + 1}
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-1 md:flex-row">
            <div className="flex w-full flex-col items-start justify-between pl-8">
              <span className="text-md font-medium">
                {t(`v-gen:form.model.option.${taskData.payload.model}`)}
              </span>
              <span className="text-sans text-xs italic text-slate-400">
                {dayjs(taskData.timestamp).format("YYYY-MM-DD hh:mm:ss")}
              </span>
            </div>
            <div className="flex w-full justify-end gap-2 md:justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="hover:border-purple-500 hover:text-purple-500"
                      size={"sm"}
                      onClick={handleExtendVideo}
                      disabled={
                        isFetching ||
                        ExtendVideoMutation.isPending ||
                        !taskData.result
                      }
                    >
                      <UnfoldHorizontal size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("v-gen:action.extend_video")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="hover:border-purple-500 hover:text-purple-500"
                      size={"icon"}
                      disabled={isFetching || ExtendVideoMutation.isPending}
                      onClick={() => refetchVideo()}
                    >
                      <RotateCcwIcon size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("v-gen:action.recreate_video")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="hover:border-purple-500 hover:text-purple-500"
                      size={"icon"}
                      onClick={() => updateVideoForm(taskData.payload)}
                    >
                      <Edit size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("v-gen:action.edit_video")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      title="Edit"
                      variant={"outline"}
                      size={"icon"}
                      className="hover:border-red-500 hover:text-red-500"
                      onClick={() => deleteTask(taskId)}
                    >
                      <Trash2Icon size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("v-gen:action.delete_task")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      disabled={!taskData.result}
                      size={"icon"}
                      onClick={() =>
                        FileManager.downloadVideo(taskData.result.videoUrl)
                      }
                    >
                      <Download size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("v-gen:action.download_video")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardTitle>
        <CardDescription className="py-1 text-sm text-slate-400">
          {taskData.payload.prompt}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="relative w-full">
          {(isFetching || ExtendVideoMutation.isPending) && (
            <div className="absolute top-[40%] h-6 w-full text-center">
              <DotLoader className="" />
              <p className="p-2 text-center text-xs text-primary">
                {isFetching
                  ? t("v-gen:info.video_on_create")
                  : t("v-gen:info.video_on_extend")}
              </p>
            </div>
          )}

          {createVideoError ? (
            <ErrorRenderer info={createVideoError} />
          ) : (
            <div className="min-h-40 w-full">
              {taskData.result ? (
                <VideoPlayer url={taskData.result.videoUrl} />
              ) : frameImageUrl ? (
                <Image
                  src={frameImageUrl}
                  width={200}
                  height={50}
                  className="h-auto w-full opacity-20"
                  alt="Video frame image"
                />
              ) : (
                <div className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-md bg-slate-50 dark:bg-slate-900"></div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
