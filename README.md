# Dada Poem

**dada poem** is an experimental camera-poetry interface for making visual poems from live surroundings.

It combines real-time camera capture, interactive segmentation, collage editing, physics-based motion, and cloud archiving into a mobile-first creative tool. Users can cut objects from the camera view, turn them into movable stickers, transform them with tactile controls, and assemble them into playful, unstable Dada-style compositions.

The project is designed mainly for iPhone and iPad browsers, with responsive behavior for desktop testing.

## Use Online

Open the hosted version:

```txt
https://qiuwanqing.github.io/dada-poem
```

For best results, use Safari on iPhone/iPad or Chrome on Android. 

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


## Mobile Notes

- iOS Safari may require explicit permission for motion/orientation features.
 iOS Safari motion/orientation
- Some in-app browsers may block or limit camera/WASM behavior.
 App WASM
- Safari edge gestures can conflict with custom left/right drawers.


## Credits

Built as an experimental camera-poetry interface by Qiu Wanqing.

The project uses:

- MediaPipe vision tasks
- Supabase
- vConsole
