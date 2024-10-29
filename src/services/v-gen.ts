/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the TaskResult interface
import { apiFetch } from "@/lib/api";
import { isEnglish } from "@/lib/utils";
import { useTaskStore } from "@/stores";
import { Task, TaskResult } from "@/stores/slices/task-slice";

import { aiImageToText, aiTranslate, uploadImage } from "./global";

// Generate Video Fetch
export const generateVideo = async (task: Task): Promise<TaskResult> => {
  const taskId = task.id;
  try {
    const {
      model,
      prompt = "",
      firstFrame = "",
      lastFrame = "",
      ratio = "",
      type = "",
      time = "",
      loop = "",
      camera = "",
      audio = "",
      style = "",
    } = task.payload;
    console.log("task:.apyload:::", task.payload);

    // Translate prompt if not in English
    const translatedPrompt = async () =>
      prompt && !isEnglish(prompt) ? await aiTranslate(prompt) : prompt;

    // Extract image description by uploading and processing the frame
    const getUploadedImagePrompt = async (frame: File) => {
      const url = await uploadImage(frame);
      return await aiImageToText(url);
    };

    // Derive the video prompt based on available files
    const videoPrompt = prompt
      ? await translatedPrompt()
      : firstFrame
        ? await getUploadedImagePrompt(firstFrame)
        : await getUploadedImagePrompt(lastFrame);

    // Process video creation based on the specified model
    const createVideo = async () => {
      switch (model) {
        case "luma":
          return await getLumaVideo(
            taskId,
            camera !== "none" ? `${camera} ${videoPrompt}` : videoPrompt,
            firstFrame,
            lastFrame,
            loop
          );

        case "kling":
          return await getKlingVideo(
            taskId,
            videoPrompt,
            firstFrame,
            lastFrame,
            ratio,
            type,
            time
          );

        case "runway":
          return await getRunwayVideo(
            taskId,
            videoPrompt,
            firstFrame,
            lastFrame,
            time.replace("s", ""),
            type
          );

        case "cog":
          return await getCogVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame)
          );

        case "minimax":
          return await getMinimaxVideo(
            taskId,
            prompt.slice(0, 200),
            await uploadImage(firstFrame)
          );

        case "pika":
          return await getPikaVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame),
            ratio,
            style !== "none" ? style : "",
            audio === "true"
          );

        case "genmo":
          return await getGenmoVideo(await translatedPrompt());

        default:
          throw new Error("Unknown model");
      }
    };

    const res = await createVideo();

    // Validate and return result
    return res.output
      ? { resultId: res.id || "", videoUrl: res.output }
      : Promise.reject("Create video error: missing video");
  } catch (error) {
    return Promise.reject(error);
  }
};

// Extend Video
export const extendVideo = async (task: Task): Promise<TaskResult> => {
  const { id: taskId, result, payload } = task;
  const resultId = result?.resultId;

  if (!resultId) throw new Error("Extend Video Error: Missing result ID");

  try {
    const { model, prompt } = payload;
    let res;

    switch (model) {
      case "luma":
        res = await extendLumaVideo(taskId, resultId, prompt);
        break;

      case "kling":
        res = await extendKlingVideo(taskId, resultId, prompt);
        break;

      default:
        throw new Error("Unsupported model for extension");
    }

    return res.output
      ? { resultId: res.id || "", videoUrl: res.output }
      : Promise.reject("Extend video error: missing video");
  } catch (error) {
    return Promise.reject(error);
  }
};

// 视频: Luma
export async function getLumaVideo(
  taskId: string,
  prompt: string,
  firstFrame: File | null,
  lastFrame: File | null,
  loop: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);
      if (firstFrame) {
        formData.append("image_url", firstFrame);
      }
      if (lastFrame) {
        formData.append("image_end_url", lastFrame);
        formData.append("loop", loop);
      }

      const res = await apiFetch("luma/submit", {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }

      result = await fetchLumaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Luma
async function fetchLumaTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`luma/task/${resultId}/fetch`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.state === "completed") {
            resolve(data);
          } else if (data.state === "failed") {
            reject("Task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached!");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 拓展: Luma
export async function extendLumaVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);

      const res = await apiFetch(`luma/extend/${key}`, {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }
      result = await fetchLumaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 视频：Kling
export async function getKlingVideo(
  taskId: string,
  prompt: string,
  firstFrame: File,
  lastFrame: File,
  ratio: string,
  type: string,
  time: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      let path = "";
      let url = "";
      if (firstFrame) {
        path = type === "fast" ? "m2v_img2video" : "m2v_img2video_hq";
      } else {
        if (type === "fast") {
          path = "m2v_txt2video";
        } else {
          path = time === "5s" ? "m2v_txt2video_hq_5s" : "m2v_txt2video_hq_10s";
        }
      }
      url = `klingai/${path}`;

      const formdata = new FormData();
      if (firstFrame) {
        if (lastFrame) {
          formdata.append("tail_image", lastFrame);
        }
        formdata.append("input_image", firstFrame);
        formdata.append("prompt", prompt);
        formdata.append("negative_prompt", "");
        formdata.append("cfg", "0.5");
        formdata.append("aspect_ratio", ratio);
        formdata.append("camera_type", "zoom");
        formdata.append("camera_value", "-5");
      } else {
        formdata.append("prompt", prompt);
        formdata.append("negative_prompt", "");
        formdata.append("cfg", "0.5");
        formdata.append("aspect_ratio", ratio);
        formdata.append("camera_type", "zoom");
        formdata.append("camera_value", "-5");
      }

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();

      const video = result.data.works[0]?.resource.resource;
      if (video) {
        const id = type === "fast" ? result.data.task.id : "";
        resolve({ output: video, id });
        return;
      }
      result = await fetchKlingTask(taskId, result.data.task.id);
      resolve({ output: result.video, id: type === "fast" ? result.id : "" });
    } catch (error) {
      reject(error);
    }
  });
}

// 拓展：Kling
export async function extendKlingVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const url = "klingai/m2v_extend_video";
      const formdata = new FormData();
      formdata.append("prompt", prompt);
      formdata.append("task_id", key);

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      const video = result.data.works[0]?.resource.resource;
      if (video) {
        const id = result.data.task.id;
        resolve({ output: video, id });
        return;
      }
      result = await fetchKlingTask(taskId, result.data.task.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Kling
async function fetchKlingTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `klingai/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const video = data.data.works[0]?.resource.resource;
          const id = data.data.task.id;
          if (video) {
            resolve({ video, id });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频：Runway-turbo
export async function getRunwayVideo(
  taskId: string,
  prompt: string,
  firstFrame: File,
  lastFrame: File,
  time: string,
  type: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const file = firstFrame || lastFrame;
      const url =
        type === "fast" && file ? "runway_turbo/submit" : "runway/submit";

      const formdata = new FormData();
      if (!file) {
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
      } else if (type !== "fast") {
        const end = firstFrame ? "false" : "true";
        formdata.append("init_image", file);
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
        formdata.append("image_as_end_frame", end);
      } else {
        formdata.append("image_url", firstFrame);
        formdata.append("image_end_url", lastFrame);
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
      }

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      const video = result.task.artifacts[0]?.url;
      if (video) {
        resolve({ output: video });
        return;
      }
      result = await fetchRunwayTask(taskId, result.task.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Runway
async function fetchRunwayTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `runway/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const video = data.task.artifacts[0]?.url;
          if (video) {
            resolve({ output: video });
          } else if (data.task.status === "FAILED") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Cog
export async function getCogVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      let raw = "";
      if (url) {
        raw = JSON.stringify({
          model: "cogvideox",
          prompt: prompt,
          image_url: url,
        });
      } else {
        raw = JSON.stringify({
          model: "cogvideox",
          prompt: prompt,
        });
      }

      const res = await apiFetch("zhipu/api/paas/v4/videos/generations", {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      // save task
      if (result.task_status === "SUCCESS") {
        resolve({ output: result.video_result[0].url });
        return;
      }
      result = await fetchCogTask(taskId, result.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Cog
async function fetchCogTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`zhipu/api/paas/v4/async-result/${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.task_status === "SUCCESS") {
            resolve({ output: data.video_result[0].url });
          } else if (data.state === "failed") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Minimax
export async function getMinimaxVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const data = url
        ? {
            model: "video-01",
            prompt: prompt,
            first_frame_image: url,
          }
        : {
            model: "video-01",
            prompt: prompt,
          };

      const res = await apiFetch("minimaxi/v1/video_generation", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (!result.task_id) {
        throw new Error("Fetch faild");
      }
      result = await fetchMinimaxTask(taskId, result.task_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Minimax
async function fetchMinimaxTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`minimaxi/v1/query/video_generation?task_id=${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.file_id) {
            const url = await fetchMinimaxFile(data.file_id);
            resolve({ output: url });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 查询: Minimax
async function fetchMinimaxFile(fileId: string) {
  return new Promise((resolve, reject) => {
    const polling = (fileId: string) => {
      apiFetch(`minimaxi/v1/files/retrieve?file_id=${fileId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.file) {
            resolve(data.file.download_url);
          } else {
            reject("Get Minimax File Error");
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(fileId);
  });
}

// 视频: Pika
export async function getPikaVideo(
  taskId: string,
  prompt: string,
  url: string,
  ratio: string,
  style: string,
  audio: boolean
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      let data: any = {
        style: style,
        ratio: ratio,
        prompt: prompt,
        sfx: audio,
        model: 1.5,
        options: {
          frameRate: 24,
          camera: {
            pan: "right",
            tilt: "up",
            rotate: "cw",
            zoom: "in",
          },
          parameters: {
            guidanceScale: 16,
            motion: 2,
            negativePrompt: "ugly",
          },
        },
      };

      if (url) {
        data = {
          prompt: prompt,
          sfx: audio,
          image: url,
          style: style,
          model: 1.5,
          options: {
            frameRate: 24,
            parameters: {
              guidanceScale: 16,
              motion: 2,
              negativePrompt: "ugly",
            },
          },
        };
      }

      const res = await apiFetch("pika/generate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      const jsonData = await res.json();

      result = await fetchPikaTask(taskId, jsonData.data.task_id);
      resolve({ output: result.video_url });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Pika
async function fetchPikaTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `pika/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.data.video_url) {
            resolve(data.data);
          } else if (data.code !== 200) {
            reject("Task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 拓展: Pika
export async function extendPikaVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);

      const res = await apiFetch(`luma/extend/${key}`, {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }
      result = await fetchPikaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 视频: Genmo
export async function getGenmoVideo(prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const data = {
        prompt: prompt,
        enable_prompt_expansion: true,
        seed: 1936147,
      };

      const res = await apiFetch("302/submit/mochi-v1", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();

      resolve({ output: result.video.url });
    } catch (error) {
      reject(error);
    }
  });
}
