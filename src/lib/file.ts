/* eslint-disable @typescript-eslint/no-explicit-any */

interface CompressOptions {
  maxSizeMB: number; // 最大图片大小，单位为MB
  mimeType?: string; // 输出图片的MIME类型，例如 'image/jpeg'
  quality?: number; // 压缩质量，0到1之间的小数
}

export default class FileManager {
  // 压缩图片数据
  static compressImageBlob = (
    blob: Blob,
    maxSizeMB: number,
    mimeType: string,
    quality: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            return reject(new Error("Failed to get 2D context"));
          }

          let width = img.width;
          let height = img.height;

          while ((width * height * 4) / (1024 * 1024) > maxSizeMB) {
            width /= 1.1;
            height /= 1.1;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
          }

          canvas.toBlob(
            (compressedBlob) => {
              if (compressedBlob) {
                resolve(compressedBlob);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            mimeType,
            quality
          );
        };

        img.onerror = reject;
        img.src = String(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // 压缩图片文件
  static compressImage = (
    file: File,
    options: CompressOptions
  ): Promise<Blob> => {
    const { maxSizeMB, mimeType = "image/jpeg", quality = 0.8 } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = (event.target?.result as string) || "";
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Failed to get 2D context"));
        }

        let width = img.width;
        let height = img.height;

        // 调整图片尺寸，以确保符合最大大小
        while ((width * height * 4) / (1024 * 1024) > maxSizeMB) {
          width /= 1.1;
          height /= 1.1;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              // 再次调整质量，确保符合最大大小
              if (blob.size > maxSizeMB * 1024 * 1024) {
                return this.compressImageBlob(
                  blob,
                  maxSizeMB,
                  mimeType,
                  quality
                ).then(resolve, reject);
              }
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          mimeType,
          quality
        );
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 下载图片为文件
  static imageToFile = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Get origin image error: ${res.statusText}`);
      }
      const blob = await res.blob();
      // 创建一个File对象
      let fileName = "file.jpg";
      if (url.includes(".svg")) {
        fileName = "file.svg";
      }
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error transferring image:", error);
    }
  };

  // 读取文件为图片
  static fielToImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file);
        resolve(url);
      } catch (error) {
        reject(error);
      }
    });
  };

  // 读取file为base64
  static fileToBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = function (event) {
          const result = event?.target?.result;
          resolve(result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  // 下载图片为本地Base64
  static imageToBase64 = async (url: string) => {
    try {
      if (url.includes("base64")) {
        return url;
      }
      const file = await this.imageToFile(url);
      const base64 = await this.fileToBase64(file);
      return base64;
    } catch (error) {
      console.error("Transferring image error:", error);
    }
  };

  // 转换图片格式
  static pngToJpg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0);
        const jpegData = canvas.toDataURL("image/jpeg");
        resolve(jpegData);
      };
      image.onerror = reject;
    });
  };

  // 转换文件格式
  static pngFileToJpgFile = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = URL.createObjectURL(file);
        const jpg = (await this.pngToJpg(url)) as string;
        const result = await this.imageToFile(jpg);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  // 读取图片宽高
  static readImageSize = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (img.width && img.height) {
            resolve({ width: img.width, height: img.height });
          }
        };
        img.onerror = () => {
          reject("Load image error");
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  // 本地化图片地址
  static localizeImage = async (url: string) => {
    try {
      const file = await this.imageToFile(url);
      const src = URL.createObjectURL(file as File);
      return src;
    } catch (error) {
      console.log("File to url error: ", error);
    }
  };

  static resetSizeCanvas = async (
    originCanvas: any,
    size: { width: number; height: number }
  ) => {
    return new Promise((resolve) => {
      const originUrl = originCanvas.toDataURL("image/png");
      const originImage = new Image();
      originImage.onload = () => {
        const newCanvas = document.createElement("canvas");
        const newContext = newCanvas.getContext("2d");
        if (newContext && originImage) {
          newCanvas.width = size.width;
          newCanvas.height = size.height;
          newContext.drawImage(
            originImage,
            0,
            0,
            newCanvas.width,
            newCanvas.height
          );
          resolve(newCanvas);
        }
      };
      originImage.src = originUrl;
    });
  };

  // 加载图片
  static loadImage = async (src: string) => {
    const img = new Image();
    img.src = src;
  };

  // 下载图片
  static downloadImage = async (url: string, name?: string) => {
    const file = await this.imageToFile(url);
    const currentTime = this.getNowformatTime();
    const metaType = file?.type.split("/")[1] || url.split(".")[1];
    const resultName =
      name || `result-${currentTime}.${metaType.split("+")[0]}`;
    const localUrl = URL.createObjectURL(file as File);
    const link = document.createElement("a");
    link.href = localUrl;
    link.download = resultName;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      // window.URL.revokeObjectURL(base64)
      link.remove();
    }, 300);
  };

  // 下载视频
  static downloadVideo = (url: string, name?: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // 创建下载链接
        const currentTime = this.getNowformatTime();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name || `result-${currentTime}.mp4`;
        link.style.display = "none";
        document.body.appendChild(link);
        // 触发点击事件进行下载
        link.click();
        // 清理链接对象和URL对象
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error("下载视频出错:", error);
      });
  };

  // 格式化当前时间
  static getNowformatTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return year + month + day + hours + minutes + seconds;
  };

  // 格式化时间戳
  static formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
    return formattedDate;
  };
}
