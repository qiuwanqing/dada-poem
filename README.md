# Dada Poem

**dada poem** is an experimental camera-poetry interface for making visual poems from live surroundings.
**dada poem**

It combines real-time camera capture, interactive segmentation, collage editing, physics-based motion, and cloud archiving into a mobile-first creative tool. Users can cut objects from the camera view, turn them into movable stickers, transform them with tactile controls, and assemble them into playful, unstable Dada-style compositions.
 sticker playfulunstable

The project is designed mainly for iPhone and iPad browsers, with responsive behavior for desktop testing.
 iPhone iPad

## Use Online

Open the hosted version:

```txt
https://qiuwanqing.github.io/dada-poem
```

For best results, use Safari on iPhone/iPad or Chrome on Android. The page will ask for camera permission when you tap Start Camera.
 iPhone/iPad Safari Android Chrome Start Camera

Because GitHub Pages is served over HTTPS, camera access and WASM/model loading should work in supported browsers.
GitHub Pages HTTPS WASM/model

## Features

- **Live camera canvas** using `getUserMedia`
 `getUserMedia`
- **Interactive object cutout** with MediaPipe vision segmentation
 MediaPipe vision segmentation
- **Capture modes: MP, Draw, Rect, Grid**
 MP
- **Sticker manipulation**: drag, select, delete, rotate, scale, undo, redo
 sticker
- **Sticker effects**: Distort, Blur, B&W, Noise, Mosaic, Side extrusion
- **Circular controls** with custom `round.png` dials and image-based number ticks
 `round.png`
- **Optional haptic tick feedback** where supported
- **Video effects**: global video B&W and Blur
- **Physics tools**: Magnet, Path/Loop field, Gravity, Shake Shuffle
 MagnetPath/Loop Gravity Shuffle
- **Sticker library** for saving and reusing transparent sticker PNGs
 sticker library PNG sticker
- **Poem archive** for saving previews and editable project JSON
 poem archive JSON
- **vConsole mobile debugging**
 vConsole

## Project Structure

```txt
.
├── index.html # Main app
├── assets/ # UI icons
├── models
│ └── magic_touch.tflite # MediaPipe interactive segmentation model
├── vendor/ # Local MediaPipe vision bundle and WASM files
└── README.md
```

## Supabase

The app currently uses Supabase for cloud sticker storage and poem archives.
 Supabase sticker library poem archive

Relevant constants live in `index.html`:
 `index.html`

```js
const SUPABASE_URL = "...";
const BUCKET_NAME = "library-images";
const POEM_BUCKET_NAME = "poem-archive";
const POEM_TABLE_NAME = "poem_items";
```

### Storage Buckets

```txt
library-images # transparent sticker PNGs
poem-archive # poem previews and editable project JSON / poem JSON
```

### Tables

```txt
library_items # sticker metadata / sticker
poem_items # poem archive metadata / poem archive
```

The frontend uses a publishable Supabase key. Before making a public deployment, configure Row Level Security and storage policies carefully.
 Supabase publishable key Row Level Security Storage policies

## How It Works

### Capture

The camera stream is drawn into an offscreen canvas so the app can process frames consistently across mobile browsers.
 canvas

MP capture uses MediaPipe Interactive Segmenter. The user taps a point in the video, the segmentation mask is generated, and the selected region is trimmed into a transparent sticker canvas.
MP MediaPipe Interactive Segmenter mask sticker canvas

Draw, Rect, and Grid modes use the current video frame and the user's selected screen region to generate sticker canvases.
DrawRect Grid sticker canvas

### Editing

Each sticker is a canvas element positioned over the live video stage. Effects are applied directly to sticker canvas pixels or CSS filters depending on the tool.
 sticker canvas sticker CSS filter

Circular dials use custom image assets and pointer rotation. On devices that support it, dial tick changes try to call `navigator.vibrate()`.
 `navigator.vibrate()`

### Archive

Saving a poem creates two representations:
 poem

- a compressed preview image with the current video background
- an editable JSON project containing sticker data and transforms
 sticker JSON

This keeps archive thumbnails lightweight while preserving the ability to reopen and continue editing a poem.
 archive poem

## Mobile Notes

- iOS Safari may require explicit permission for motion/orientation features.
 iOS Safari motion/orientation
- Some in-app browsers may block or limit camera/WASM behavior.
 App WASM
- Safari edge gestures can conflict with custom left/right drawers.


## Credits

Built as an experimental camera-poetry interface by Qiu Wanqing.
 Qiu Wanqing

The project uses:

- MediaPipe vision tasks
- Supabase
- vConsole
