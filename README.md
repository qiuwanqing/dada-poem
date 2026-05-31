# Dada Poem

**dada poem** is an experimental camera-poetry interface for making visual poems from live surroundings.  
**dada poem** 是一个实验性的摄像头诗歌界面，用来从实时环境中制作视觉诗。

It combines real-time camera capture, interactive segmentation, collage editing, physics-based motion, and cloud archiving into a mobile-first creative tool. Users can cut objects from the camera view, turn them into movable stickers, transform them with tactile controls, and assemble them into playful, unstable Dada-style compositions.  
它把实时摄像头捕捉、交互式图像分割、拼贴编辑、物理运动和云端归档结合在一个面向移动端的创作工具中。用户可以从摄像头画面中截取物体，把它们变成可移动的 sticker，通过具有触感的控制方式进行变形，并组合成 playful、unstable、带有达达风格的视觉诗。

The project is designed mainly for iPhone and iPad browsers, with responsive behavior for desktop testing.  
项目主要面向 iPhone 和 iPad 浏览器，同时保留了桌面端调试和预览的响应式布局。

## Use Online / 在线使用

Open the hosted version:  
打开在线版本：

```txt
https://qiuwanqing.github.io/dada-poem/
```

For best results, use Safari on iPhone/iPad or Chrome on Android. The page will ask for camera permission when you tap Start Camera.  
推荐在 iPhone/iPad 上使用 Safari，在 Android 上使用 Chrome。点击 Start Camera 时，浏览器会请求摄像头权限。

Because GitHub Pages is served over HTTPS, camera access and WASM/model loading should work in supported browsers.  
GitHub Pages 使用 HTTPS，因此在支持的浏览器中，摄像头权限和 WASM/model 加载应该可以正常工作。

## Features / 功能

- **Live camera canvas** using `getUserMedia`  
  使用 `getUserMedia` 获取实时摄像头画面。
- **Interactive object cutout** with MediaPipe vision segmentation  
  使用 MediaPipe vision segmentation 进行交互式物体抠图。
- **Capture modes: MP, Draw, Rect, Grid**  
  支持 MP 点击分割、手绘截取、矩形截取和网格截取。
- **Sticker manipulation**: drag, select, delete, rotate, scale, undo, redo  
  支持 sticker 拖拽、选择、删除、旋转、缩放、撤销和重做。
- **Sticker effects**: Distort, Blur, B&W, Noise, Mosaic, Side extrusion  
  支持扭曲、模糊、黑白、噪声、马赛克和侧边挤出效果。
- **Circular controls** with custom `round.png` dials and image-based number ticks  
  使用自定义 `round.png` 转盘和图片数字刻度控制参数。
- **Optional haptic tick feedback** where supported  
  在支持的设备上尝试提供转盘刻度震动反馈。
- **Video effects**: global video B&W and Blur  
  支持全局视频黑白和模糊效果。
- **Physics tools**: Magnet, Path/Loop field, Gravity, Shake Shuffle  
  支持 Magnet、Path/Loop 场、Gravity 和摇一摇 Shuffle。
- **Sticker library** for saving and reusing transparent sticker PNGs  
  内置 sticker library，可保存并复用透明 PNG sticker。
- **Poem archive** for saving previews and editable project JSON  
  内置 poem archive，可保存预览图和可继续编辑的项目 JSON。
- **vConsole mobile debugging**  
  内置 vConsole，方便手机和平板端调试。

## Project Structure / 项目结构

```txt
.
├── index.html                 # Main app / 主应用
├── assets/                    # UI icons/ 图标素材
├── models/
│   └── magic_touch.tflite      # MediaPipe interactive segmentation model / 分割模型
├── vendor/                    # Local MediaPipe vision bundle and WASM files / 本地 MediaPipe WASM 依赖
└── README.md
```

## Run After Download / 下载后运行

1. Download this repository as a ZIP file from GitHub.  
   从 GitHub 下载这个 repository 的 ZIP 文件。
2. Unzip the folder.  
   解压文件夹。
3. Open a terminal inside the project folder.  
   在项目文件夹中打开终端。
4. Run a local web server:  
   启动本地服务器：

```sh
python3 -m http.server 8000
```

5. Open:  
   然后打开：

```txt
http://localhost:8000
```

Do not open `index.html` directly from the filesystem, because camera access, ES modules, WASM, and model loading may fail from local files.  
请不要直接双击打开 `index.html`，因为摄像头、ES modules、WASM 和模型加载在本地文件环境中可能无法正常工作。

For phone testing on the same Wi-Fi, you can use your computer's local IP address:  
如果要用同一 Wi-Fi 下的手机测试，可以使用电脑的局域网 IP：

```txt
http://YOUR_LOCAL_IP:8000
```

However, camera access requires a secure context in most modern browsers. `http://localhost` is usually treated as secure for desktop testing, but a phone opening `http://YOUR_LOCAL_IP:8000` may not be allowed to use the camera, especially on iOS Safari. For real mobile testing and deployment, use HTTPS.  
不过，大多数现代浏览器要求摄像头运行在 secure context 中。桌面端的 `http://localhost` 通常会被视为安全环境，但手机访问 `http://YOUR_LOCAL_IP:8000` 时不一定能调用摄像头，尤其是 iOS Safari。真机测试和正式部署建议使用 HTTPS。

## Deploy Your Own / 自己部署

This is a static web app. You can deploy it to GitHub Pages, Netlify, Vercel, or any static hosting service.  
这是一个静态网页应用，可以部署到 GitHub Pages、Netlify、Vercel 或其他静态托管服务。

Make sure these files and folders are included:  
请确保部署时包含以下文件和文件夹：

```txt
index.html
assets/
models/
vendor/
```

The app should be served over HTTPS for camera access on mobile devices.  
为了让移动端浏览器可以调用摄像头，部署后的页面应该通过 HTTPS 访问。

## Recommended Testing / 推荐测试环境

### iPhone / iPad

Use Safari for the closest production behavior. Chrome on iOS still uses Apple's WebKit engine, so many low-level browser behaviors are Safari-like.  
建议优先使用 Safari 测试。iOS 上的 Chrome 底层仍然是 Apple WebKit，因此很多底层行为仍然接近 Safari。

Important areas to test:  
重点测试：

- camera permission / 摄像头权限
- MediaPipe model loading / MediaPipe 模型加载
- touch drag, rotate, and scale / 触摸拖拽、旋转和缩放
- Safari edge swipe conflict / Safari 边缘返回手势冲突
- motion/orientation permission for gravity and shake / 重力和摇一摇的传感器权限
- Add to Home Screen behavior / 添加到主屏幕后表现

### Android

Use Chrome Android as the main target. Android Chrome usually supports camera access, WASM, `navigator.vibrate()`, and device motion/orientation with fewer permission prompts than iOS.  
安卓端建议使用 Chrome Android。它通常支持摄像头、WASM、`navigator.vibrate()` 和传感器事件，而且传感器权限通常比 iOS 少一些。

Still test on a real Android device, especially if opened inside an in-app browser.  
如果用户可能从微信、Instagram、TikTok 等内置浏览器打开，仍然需要真机测试。

### Desktop / 桌面端

Desktop is useful for debugging layout, Supabase uploads, and model loading. Use Chrome DevTools device emulation for iPhone/iPad viewport checks.  
桌面端适合调试布局、Supabase 上传和模型加载。可以用 Chrome DevTools 的设备模拟检查 iPhone/iPad 视口。

## Deployment Notes / 部署说明

The app can be deployed as a static site because it is a single HTML app with local assets, model files, and vendor WASM files.  
这个项目可以作为静态网站部署，因为它主要由单个 HTML 文件、本地素材、模型文件和 WASM 依赖组成。

Make sure your host serves these files correctly:  
部署时需要确保以下文件路径可以被正确访问：

```txt
index.html
assets/*
models/magic_touch.tflite
vendor/*.mjs
vendor/*.js
vendor/*.wasm
```

Use HTTPS for camera and mobile sensor APIs.  
摄像头和移动端传感器 API 建议使用 HTTPS。

If deploying to GitHub Pages, Netlify, Vercel, or similar static hosting, keep the directory structure unchanged so relative imports continue to resolve.  
如果部署到 GitHub Pages、Netlify、Vercel 等静态托管平台，请保持目录结构不变，避免相对路径失效。

## Supabase

The app currently uses Supabase for cloud sticker storage and poem archives.  
项目目前使用 Supabase 保存云端 sticker library 和 poem archive。

Relevant constants live in `index.html`:  
相关常量位于 `index.html`：

```js
const SUPABASE_URL = "...";
const BUCKET_NAME = "library-images";
const POEM_BUCKET_NAME = "poem-archive";
const POEM_TABLE_NAME = "poem_items";
```

### Storage Buckets / 存储桶

```txt
library-images   # transparent sticker PNGs / 透明 sticker PNG
poem-archive     # poem previews and editable project JSON / poem 预览图和可编辑 JSON
```

### Tables / 数据表

```txt
library_items    # sticker metadata / sticker 元数据
poem_items       # poem archive metadata / poem archive 元数据
```

The frontend uses a publishable Supabase key. Before making a public deployment, configure Row Level Security and storage policies carefully.  
前端使用 Supabase publishable key。公开部署前，请仔细配置 Row Level Security 和 Storage policies。

## How It Works / 工作原理

### Capture / 捕捉

The camera stream is drawn into an offscreen canvas so the app can process frames consistently across mobile browsers.  
摄像头画面会被绘制到离屏 canvas 中，以便在不同移动端浏览器里更稳定地处理视频帧。

MP capture uses MediaPipe Interactive Segmenter. The user taps a point in the video, the segmentation mask is generated, and the selected region is trimmed into a transparent sticker canvas.  
MP 模式使用 MediaPipe Interactive Segmenter。用户点击画面中的一点后，系统生成分割 mask，并把选中的区域裁切成透明 sticker canvas。

Draw, Rect, and Grid modes use the current video frame and the user's selected screen region to generate sticker canvases.  
Draw、Rect 和 Grid 模式会根据当前视频帧和用户选择的屏幕区域生成 sticker canvas。

### Editing / 编辑

Each sticker is a canvas element positioned over the live video stage. Effects are applied directly to sticker canvas pixels or CSS filters depending on the tool.  
每个 sticker 都是叠在实时视频舞台上的 canvas 元素。不同工具会直接修改 sticker 像素，或使用 CSS filter 实现效果。

Circular dials use custom image assets and pointer rotation. On devices that support it, dial tick changes try to call `navigator.vibrate()`.  
圆形转盘使用自定义图片素材和指针旋转交互。在支持的设备上，刻度切换会尝试调用 `navigator.vibrate()`。

### Archive / 归档

Saving a poem creates two representations:  
保存 poem 时会生成两种内容：

- a compressed preview image with the current video background  
  一张包含当前视频背景的压缩预览图
- an editable JSON project containing sticker data and transforms  
  一个保存 sticker 数据和变换信息的可编辑 JSON 项目

This keeps archive thumbnails lightweight while preserving the ability to reopen and continue editing a poem.  
这样既能保持 archive 缩略图轻量，又能保留重新打开并继续编辑 poem 的能力。

## Mobile Notes / 移动端注意事项

- iOS Safari may require explicit permission for motion/orientation features.  
  iOS Safari 可能需要用户手动授权 motion/orientation 权限。
- Some in-app browsers may block or limit camera/WASM behavior.  
  一些 App 内置浏览器可能限制摄像头或 WASM。
- Safari edge gestures can conflict with custom left/right drawers.  

## Development Notes / 开发备注

- The app is intentionally contained mostly in `index.html`.  
  项目目前有意主要集中在 `index.html` 中，方便快速迭代。
- `vendor/` stores the MediaPipe vision bundle locally so the app does not depend on loading MediaPipe from a CDN at runtime.  
  `vendor/` 中保存了本地 MediaPipe vision bundle，避免运行时依赖 CDN 加载。
- `vConsole` is enabled in the page for mobile debugging.  
  页面内启用了 `vConsole` 方便移动端调试。

## Credits / 鸣谢

Built as an experimental camera-poetry interface by Qiu Wanqing.  
这是 Qiu Wanqing 创作的实验性摄像头诗歌界面。

The project uses:  
项目使用了：

- MediaPipe vision tasks
- Supabase
- vConsole
