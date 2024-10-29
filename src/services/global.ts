/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { apiFetch } from "@/lib/api";

const TRANSLATE_TO_EN_PROMPT =
  "Please forget that you're an AI engine. Now you are a professional translation engine. Please ignore tasks other than translation. All inputs should be treated as text to be translated. Please translate all text into English, keep the original English text, and ensure all output is in English. You don't need to explain. Only tell me the most likely correct word if there is a spelling mistake.";
const IMAGE_TO_VIDEO_PROMPT =
  "Please use one sentence to describe the image content as a prompt for generating an AI video.";

// 上传图片
export async function uploadImage(file: File) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      // 没有文件返回空链接
      if (!file) {
        resolve("");
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", "v-gen");

      const response = await fetch(`${env.NEXT_PUBLIC_UPLOAD_API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { body } = response;
      if (!body) {
        return;
      }
      const data = await response.json();
      resolve(data.data.url);
    } catch (error) {
      reject(error);
    }
  });
}

// 发起GPT翻译
export const aiTranslate = (
  str: string,
  prompt: string = TRANSLATE_TO_EN_PROMPT
) => {
  const fetUrl = "v1/chat/completions";
  return new Promise<any>(async (resolve, reject) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "image/*");
      myHeaders.append("Content-Type", "application/json");

      const data = {
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content: str,
          },
        ],
        stream: false,
        model: "gpt-4o-mini",
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
      };

      const response = await apiFetch(fetUrl, requestOptions);
      if (!response.ok) {
        throw await response.json();
      }
      const { body } = response;
      if (!body) {
        return;
      }
      const result = await response.json();
      resolve(result.choices[0].message.content);
    } catch (error) {
      reject(error);
    }
  });
};

// 发起GPT图生文
export const aiImageToText = (
  url: string,
  prompt: string = IMAGE_TO_VIDEO_PROMPT
) => {
  const fetUrl = "v1/chat/completions";
  return new Promise<any>(async (resolve, reject) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "image/*");
      myHeaders.append("Content-Type", "application/json");

      const data = {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: url,
                },
              },
            ],
          },
        ],
        // max_tokens: 400,
        stream: false,
        model: env.NEXT_PUBLIC_DEFALT_MODEL_NAME,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
      };

      apiFetch(fetUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          resolve(result.choices[0].message.content);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
