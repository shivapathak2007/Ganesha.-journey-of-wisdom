# GANESHA: Journey of Wisdom

An original, culturally respectful devotional browser-game MVP. React + Vite + JavaScript + Three.js + React Three Fiber + Drei + Framer Motion. All source is included; no secret keys or external model downloads are required.

## Run locally

Node.js 20.19+ or a current Node LTS and npm are required.

```sh
npm ci
npm run dev
```

Open the address printed by Vite (default http://localhost:4173). To produce a distributable build:

```sh
npm run build
npm run preview
```

Dependencies are pinned by `package-lock.json`. `package.json` contains React 19.1.0, React DOM 19.1.0, Three.js, @react-three/fiber 9.1.2, @react-three/drei 10.0.7, framer-motion, lucide-react, Vite, and @vitejs/plugin-react. `npm ci` installs all of them.

## Files and exact locations

All locations below are relative to the project root.

| File | Responsibility |
| --- | --- |
| `src/main.jsx` | React entry and shared profile provider |
| `src/App.jsx` | Title, home, navigation, settings, player profile, credits, music, pause, demo |
| `src/style.css` | Responsive visual system and animations |
| `src/data.js` | Nine adventure definitions; all 24 bilingual story scenes |
| `src/managers/AudioManager.js` | User-initiated Web Audio synthesis, bells, percussion, seven original instrumental tracks, volume buses |
| `src/managers/ProgressManager.jsx` | LocalStorage profile, scores, stories, achievements, language, wisdom and settings |
| `src/managers/Graphics.js` | WebGL2 capability detection |
| `src/scenes/World.jsx` | Shared R3F world, lighting, fog, mountains, temple, particles and labeled procedural character placeholders |
| `src/scenes/Explore.jsx` | Adventure library and orbitable 3D portals |
| `src/scenes/Stories.jsx` | Illustrated cinematic story player and optional browser narration |
| `src/scenes/Prayer.jsx` | Mantras, meanings, 4–2–4 breathing, 1/3/5-minute sessions and rewards |
| `src/games/MouseRun.jsx` | Three-lane 3D runner, jump/slide, collisions, distance, collectibles and scoring |
| `src/games/SoftwareRunner.jsx` | Playable Canvas 2D runner fallback when WebGL2 is unavailable |
| `src/games/MountainAdventure.jsx` | Twelve floating platforms, keyboard/touch movement, jumps, checkpoints, gems and gateway |
| `src/games/GaneshaPuzzle.jsx` | Solvable sliding grids and picture-swap grids, 3/4/5 sizes, hints, timer and scoring |
| `src/games/DiyaPuzzle.jsx` | Twelve-lamp sequence memory challenge with ongoing patterns |
| `src/games/FlowerOffering.jsx` | Tap or drag flowers into a twelve-position offering |
| `src/games/MantraMemory.jsx` | Flip-and-match cards; 4/6/8-pair difficulty |
| `src/games/DivineTarget.jsx` | Moving non-violent rings, 20 offerings, 10/25/50-point zones, combos |
| `src/games/HiddenSymbols.jsx` | Ten discoverable objects, orbit/zoom, hints, checklist and timer |
| `src/games/DholRhythm.jsx` | Four-lane 45-second rhythm challenge, accuracy and combo scoring |
| `src/games/shared.jsx` | Shared HUD, start/result panels and timers |
| `public/assets/kailash.webp` | Original generated cinematic devotional illustration |
| `public/ganesha-source.zip` | Downloadable snapshot of complete project source, excluding itself and build output |
| `vite.config.js` | Relative deployment base and separated 3D vendor bundle |

## Controls

| Adventure | Keyboard | Touch / mouse |
| --- | --- | --- |
| Title | Enter | Begin your journey |
| Mouse Run | A/D or left/right; W/up/Space to jump; S/down to slide | Swipe or four control pads |
| Mountain | WASD/arrows; Space to jump | Hold direction pads and ↟ jump pad; optional Guided jump |
| Rhythm | D F J K | Four large note pads |
| Prayer | P | Begin/Pause controls |
| Puzzles | Pointer interaction | Tap tiles/cards/lamps; drag or tap flowers |
| Target | Pointer interaction | Aim and click/tap to launch a petal; score on arrival |
| Hidden symbols | Pointer interaction | Drag to pan, use zoom controls, tap objects |
| Global | Escape | Pause/settings button |

## Assets and replacement models

The opening artwork is an original AI-generated illustration. It is not an animated, rigged 3D model. Main menu, stories and prayer combine illustration, UI animation and particles. The actual 3D games use low-poly procedural placeholders in `src/scenes/World.jsx`, explicitly identified in Credits. They are intentionally asset-independent.

Put production `.glb` files under `public/assets/models/`, textures under `public/assets/textures/`, and cleared/licensed recordings under `public/assets/audio/`. Replace `Ganesha` and `Mouse` in `World.jsx` with loaded and reviewed GLTF components. Keep fallback geometry until loading succeeds. No files in those optional folders are required by this build.

A final competition release should add independently reviewed, rigged characters, distinct animated 3D story sets, real instrument recordings or higher-quality synthesis, and expanded mountain levels. The supplied instrumental soundscapes are original synthesized approximations, not authentic sampled dhol/tabla/shehnai performances. Narration uses installed browser voices; Hindi voice availability depends on the device.

## MVP scope and limitations

Implemented: the connected title/home/explore/story/prayer flow, nine playable adventure modules on WebGL-capable devices, English/Hindi interface and story text, generated cinematic artwork, local progression, scores, six achievements, one unlockable Moonlight theme (250 Wisdom), quality/comfort controls, original audio, pause/restart, credits, and a 90-second encoded animated gameplay preview.

Intentional MVP simplifications:

- The opener/home/prayer and story scenes are illustrated cinematics, not fully rigged AAA 3D deity cinematics.
- Picture-swap is the alternate picture puzzle. A cut-piece drag-and-drop jigsaw is not included.
- Mountain has one twelve-island checkpoint course, not several biomes, timed doors or moving bridges.
- Runner uses rocks, branches and ring collectibles, not every proposed collectible/obstacle type.
- Flower Offering has a 90-second scoring window followed by untimed completion; it does not punish an unfinished sacred offering.
- Target uses direct ring selection and animated flower feedback, not ballistic wind physics.
- The library grid is the default exploration view; 3D portals can be selected through its view toggle.
- Audio memory, physical cloth, volumetric shaders, licensed narration, custom profile names and multiple unlockable artwork/environment collections are not implemented.
- The competition tour is scripted screen navigation; its mouse and rhythm portions use demo input, not recorded gameplay.

These limits are explicit so the project is not mistaken for the full production-scale brief. All included modules contain executable code, not pseudocode.

## Performance and compatibility

Nine mini-games are lazy-loaded separately. The initial menu does not need a Three.js context. The compressed 3D vendor bundle is about 300 KB; the cinematic WebP is about 400 KB (exact values depend on the final build). Low/Medium/High presets use DPR 1 / capped 1.5 / capped 2 and control particle counts and antialiasing. Shadows and post-processing are deliberately limited. The exact 50–60 FPS target is NOT benchmark-certified; measure on the judging laptop before presenting.

A browser with WebGL2 and hardware acceleration is needed for the full 3D course and orbitable scenes. Runner, target and hidden objects have compatibility views when WebGL is disabled. Other canvas-free puzzles, stories and prayer remain usable. On a WebGL-disabled device, the mountain scene shows an explicit compatibility message rather than crashing the app.

`localStorage` is per browser and origin. Reset Progress has an explicit in-app confirmation. Data is not synced to an account or remote server. Private browsing or storage restrictions can prevent persistence. Google Fonts are optional enhancements; system serif/sans-serif fallbacks remain usable if font networking is unavailable.

## Deploy

This is a static SPA with internal screen state, so there are no nested route rewrites to configure.

- **Vercel:** import the project, select Vite, build command `npm run build`, output `dist`.
- **Netlify:** build `npm run build`, publish `dist` (configuration is included).
- **GitHub Pages:** run the included GitHub Actions workflow after enabling Settings → Pages → GitHub Actions. `base: './'` supports repository subpaths. There is no server-side code.
- **Sites:** `.openai/hosting.json` identifies the private hosted project. Do not reuse its ID for a different project.

## Personalize before competition

Update the team, college and competition fields in the `Credits` component in `src/App.jsx`. Add the same names here. Read every retelling and any replacement depiction with a knowledgeable cultural reviewer. Keep deities out of enemy roles, sacred objects out of destructive mechanics, and all transformations symbolic.

## Attribution

- Original generated artwork: created for this project using OpenAI image generation; no stock asset download.
- Procedural geometry, gameplay and audio synthesis: created for this project.
- React, React DOM, Vite, Three.js, R3F, Drei, Framer Motion: MIT licenses; see installed package license files for exact terms and transitive dependencies.
- Lucide icons: ISC.
- Google Fonts: Cormorant Garamond, DM Sans and Noto Sans Devanagari are distributed under the SIL Open Font License.
- Traditional mythology is presented as retelling with variations, not a single definitive historical account. No copyrighted songs, branded game assets, copied levels or other games' UI are used.

## September 2026 improvement release

- **Preview:** the old timed page tour is replaced by a real 90-second H.264/AAC MP4 (1280×720, 30 fps), with native seeking/fullscreen, playback speeds and English/Hindi captions. It is an offline rendered, continuously animated gameplay showcase. Runner, mountain and target reuse their playable Canvas renderers; other scenes are illustrative animated demonstrations. It is not a captured WebGL playthrough.
- **Art:** six new optimized cinematic WebP illustrations distinguish Explore, portals and all four stories. The Mahabharata chapter presents the broken-tusk writing story as a traditional retelling.
- **Runner:** smaller right-side HUD; separate help popover; upright spinning coins, shaded boulders, wooden barriers, layered cedar trees, smaller mouse. Cedar clusters share merged geometry to reduce drawing overhead.
- **Mountain:** corrected competing camera controllers; unified keyboard/touch physics; checkpoints and optional guided jumps; a playable Canvas fallback on devices without WebGL2.
- **Picture puzzle:** six selectable images; full completed-picture view; Next picture cycles the collection without leaving the game.
- **Diya:** explicit watch/answer phases; optional spoken numbers; correct entries remain lit; first mistake repeats the same sequence, second creates a new sequence; unlimited patterns.
- **Memory:** symbol names, pair progress, gentle feedback and distinct forest artwork.
- **Target:** visible aiming reticle and moving mandala; petals visibly travel before collision scoring; misses count as offerings; 20-shot round; steady lighting and separate help.
- **Hidden symbols:** stable illustrated search scene with touch pan, zoom, hints, clear checklist and ten individually selectable objects. This scene uses 2D illustration, not a 3D temple.
- **Music:** seven pre-rendered original synthesized instrumental tracks, seek/volume/playlist/crossfade and local audio loading. The entries named Jai Dev Jai Dev and Ganesh Vandana are original instrumental studies, not the requested commercial vocal recordings or verified arrangements of a particular singer's melody. The audio-generation service had no balance; no studio vocals were produced. Load a preferred audio file using Music → Load your song. Files stay on the device and last for that session.
- **Secret band:** six synthesized instruments, eight flute notes, recording, tempo-adjusted event replay, loop and MediaRecorder download (WebM or device-supported format). No microphone is used.
- **Prayer:** six traditional Sanskrit recitations, transliteration, concise meanings, selectable device voice, lower-pitched reading, pause/resume/repeat. Voice and Sanskrit pronunciation quality depend on installed browser voices; this is not professional chanting.

New source locations: `src/scenes/MusicPlayer.jsx`, `VideoPreview.jsx`, `Recitations.jsx`, `Nature.jsx`, `art.js`; `src/games/GameHelp.jsx`, `BandRoom.jsx`; `src/media/runnerRenderer.js`, `mountainEngine.js`, `targetRenderer.js`.

Runtime assets are included in `public/assets/`: artwork `.webp`, `audio/*.mp3`, `ganesha-preview.mp4`, and `preview-*.vtt`. No external asset service is needed to run the project. `scripts/create_music.py` regenerates the original instrumental files with NumPy and FFmpeg. `scripts/render_preview.mjs` regenerates the video with FFmpeg and @napi-rs/canvas; adjust its runtime-specific import to your locally installed package if regenerating. These optional authoring dependencies are not needed for `npm ci` or game builds.

This remains a stylized competition MVP, not a photorealistic AAA game. R3F character models are procedural placeholders. The 50–60 FPS target has not been benchmarked on the user's laptop. Preserve local progress when updating; no migration/reset is required.
