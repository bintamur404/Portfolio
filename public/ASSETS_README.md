# Portfolio Asset Folder Structure

All assets are under `public/` and organized by content type.
To replace any image, simply drop a new file at the same path — the portfolio will pick it up automatically.

---

## 📂 Folder Map

```
public/
├── profile/
│   └── tamur.png              ← Your profile photo (used in About section)
│
├── papers/
│   ├── hemx/
│   │   └── cover.png          ← HemX: Hematological Triage (IEEE Access)
│   ├── chd-net/
│   │   └── cover.png          ← CHD-Net: Congenital Heart Disease (IEEE QPAIN 2026)
│   ├── dual-stream-freqvit/
│   │   └── cover.png          ← FreqViT: Plant Disease Detection (IEEE QPAIN 2026)
│   ├── fuse-senet/
│   │   └── cover.png          ← FUSE SENet: Skin Lesion (IEEE ICCIT 2025)
│   ├── fed-neurotriage/
│   │   └── cover.png          ← Fed-NeuroTriage: Psychiatric NLP (JSCDM)
│   ├── cma-fusion/
│   │   └── cover.png          ← CMA-Fusion: Alzheimer's MRI+PET (ACM ICCA)
│   └── diaxai-stack/
│       └── cover.png          ← DiaXAI-Stack: Diabetes XAI
│
└── projects/
    ├── hematriage/
    │   ├── cover.png          ← HemaTriage app UI screenshot
    │   └── hemx_model.png     ← Model architecture reference
    ├── spectraleaf/
    │   └── cover.png          ← SpectraLeaf Analytics app screenshot
    ├── wolf-scholar/
    │   └── cover.png          ← Wolf Scholar RAG assistant screenshot
    └── fpv-drone/
        └── cover.png          ← FPV Drone engineering photo
```

---

## 🔄 How to Replace Images

1. Navigate to the appropriate folder above
2. Drop your new image file as `cover.png` (or whatever the existing filename is)
3. The portfolio auto-refreshes (dev server) or redeploys (production)

## 📌 Image Paths in Code

All paths are defined in `src/data.json` under:
- `personal.profileImage` → profile photo
- `publications[n].image` → paper cover images
- `projects[n].image` → project cover (card)
- `projects[n].gallery[]` → project detail modal gallery

---

## 🖼️ Recommended Image Sizes

| Location          | Recommended Size |
|-------------------|------------------|
| Profile photo     | 400×400 px (square) |
| Paper cover       | 1200×630 px (16:9 or 2:1) |
| Project cover     | 1200×800 px (3:2) |
| Project gallery   | 1200×800 px (3:2) |
