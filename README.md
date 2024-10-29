# 🎬🤖 Welcome to AI Video Generator! 🚀✨

[中文](README_zh.md) | [English](README.md) | [日本語](README_ja.md)

This is an open-source project from [302.AI](https://302.ai). You can directly use this project to generate AI videos, or modify it according to your needs and deploy it yourself.

## ✨ Introduction to 302.AI ✨

[302.AI](https://302.ai) is a pay-as-you-go AI application platform that solves the last-mile problem of applying AI in practice for users.

1. 🧠 Aggregates the latest and most comprehensive AI capabilities and brands, including but not limited to language models, image models, sound models, and video models.
2. 🚀 Deep application development on foundational models, developing real AI products, not just simple chatbots.
3. 💰 No monthly fees; all features are pay-as-you-go, fully open, with truly low entry barriers and high upper limits.
4. 🛠 Powerful management backend, aimed at teams and small to medium enterprises, with one person managing and multiple users utilizing it.
5. 🔗 All AI capabilities provide API access, and all tools are open-source and customizable (ongoing).
6. 💡 Strong development team, launching 2-3 new applications weekly, with product updates daily. Developers interested in joining are also welcome to contact us.

## Project Features

1. 🎥 **AI Video Generator**: Supports multiple video models generating from images to quickly create custom videos.
2. 🖼️ **Local Image Cropping**: Supports cropping local images before generating videos.
3. 🔄 **Task Management**: Video tasks support re-generation and video extensions for further editing.
4. ⚙️ **Multi-model Support**: Provides different configuration options according to different models, including lens control and video effects.
5. 📜 **History**: Saves your creation history; memories are not lost and can be downloaded anytime, anywhere.
6. 🌓 **Dark Mode**: Supports dark mode to protect your eyes.
7. 🌐 **Internationalization**: Supports multiple languages, currently supporting Chinese, English, and Japanese.

## Technology Stack

- Next.js 14 foundational framework
- Tailwind CSS + Shadcn UI for styling UI
- Zod + react-hook-form for form handling
- Zustand for state management

## Development & Deployment

1. Clone the project `git clone https://github.com/302ai/pub_video_generator`
2. Install dependencies `pnpm install`
3. Configure 302 API KEY as per .env.example
4. Run the project `pnpm dev`
5. Package and deploy `docker build -t video-generator . && docker run -p 3000:3000 video-generator`

## Interface Preview

![v-gen](docs/en.png)
