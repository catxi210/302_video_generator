import { z } from "zod";

const FileSchema = z.instanceof(File);

export type VideoFormKey =
  | "model"
  | "prompt"
  | "firstFile"
  | "lastFile"
  | "firstFrame"
  | "lastFrame"
  | "ratio"
  | "type"
  | "time"
  | "loop"
  | "audio"
  | "camera"
  | "style";

export const VideoSchema = z.object({
  model: z.string().optional(),
  prompt: z.string().optional(),
  firstFile: z.union([FileSchema, z.null()]).optional(),
  lastFile: z.union([FileSchema, z.null()]).optional(),
  firstFrame: z.union([FileSchema, z.null()]).optional(),
  lastFrame: z.union([FileSchema, z.null()]).optional(),
  ratio: z.string().optional(),
  type: z.string().optional(),
  time: z.string().optional(),
  loop: z.string().optional(),
  audio: z.string().optional(),
  camera: z.string().optional(),
  style: z.string().optional(),
});
