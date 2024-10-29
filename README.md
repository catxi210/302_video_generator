# 🎬🤖 Welcome to the AI Video Generator! 🚀✨

[中文](README_zh.md) | [English](README.md) | [日本語](README_ja.md)

This is the open-source version of the [AI Video Generator](https://302.ai/tools/vgen/) from [302.AI](https://302.ai). You can log in directly to 302.AI, use the online version with zero code and zero background, or modify and deploy it according to your needs.

## ✨ About 302.AI ✨

[302.AI](https://302.ai) is a pay-as-you-go AI application platform that addresses the last-mile problem of AI in practice.

1. 🧠 It integrates the latest and most comprehensive AI capabilities and brands, including but not limited to language models, image models, sound models, and video models.
2. 🚀 We conduct deep application development on basic models, creating real AI products rather than simple chatbots.
3. 💰 No monthly fees, all features are pay-as-you-go, fully open, truly low barrier with high potential.
4. 🛠 Powerful management backend for teams and small to medium enterprises; one person manages while multiple people use.
5. 🔗 All AI capabilities provide API access, and all tools are open source and customizable (ongoing).
6. 💡 A strong development team releases 2-3 new applications weekly, with products updated daily. Developers interested in joining are welcome to contact us.

## Project Features

1. 🎥 **AI Video Generator**: Supports various models of image-to-video generation, quickly creating custom videos.
2. 🖼️ **Local Image Cropping**: Supports cropping local images to create videos.
3. 🔄 **Task Management**: Video tasks support regeneration and further editing.
4. ⚙️ **Multi-Model Support**: Offers different configuration options for different models, including lens control and video effects.
5. 📜 **History**: Saves your creation history, ensuring memories aren't lost and available for download anytime.
6. 🌓 **Dark Mode**: Supports dark mode, protecting your eyes.
7. 🌐 **Internationalization**: Supports multiple languages, currently including Chinese, English, and Japanese.

## Technology Stack

- Next.js 14 Base Framework
- Tailwind CSS + Shadcn UI for Styling
- Zod + react-hook-form for Form Handling
- Zustand for Data Management

## Development & Deployment

1. Clone the project `git clone git@github.com:302ai/302_video_generator.git`
2. Install dependencies `pnpm install`
3. Configure 302’s API KEY as per .env.example
4. Run the project `pnpm dev`
5. Build and deploy `docker build -t video-generator . && docker run -p 3000:3000 video-generator`

## Interface Preview

![v-gen](docs/en.png)
