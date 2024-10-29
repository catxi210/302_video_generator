import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ConfigStore, createConfigSlice } from "./slices/config-slice";
import { FormStore, createFormSlice } from "./slices/form-slice";
import { HistoryStore, createHistorySlice } from "./slices/history-slice";
import { TaskStore, createTaskSlice } from "./slices/task-slice";

// 配置数据, 数据暂不需要缓存
type AppStore = ConfigStore;
export const useAppStore = create<AppStore>()((...a) => ({
  ...createConfigSlice(...a),
}));

// 表单数据
export const useFormStore = create<FormStore>()((...a) => ({
  ...createFormSlice(...a),
}));

// 任务数据，使用 persist 中间件来持久化
export const useTaskStore = create<TaskStore>()((...a) => ({
  ...createTaskSlice(...a),
}));

// 历史记录数据，使用 persist 中间件来持久化
export const useHistoryStore = create<HistoryStore>()(
  persist(
    (...a) => ({
      ...createHistorySlice(...a),
    }),
    {
      name: "history-store",
    }
  )
);
