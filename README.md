# ✈ AeroNex — React + Tailwind Airport Platform

## Loyihani ishga tushurish

```bash
# 1. Papkaga kiring
cd aeronex

# 2. Kutubxonalarni o'rnating
npm install

# 3. Dev serverni ishga tushiring
npm run dev
```

Brauzerda: http://localhost:5173

## Sahifalar
| URL | Sahifa |
|-----|--------|
| `/` | Home — Hero, destinations, why section |
| `/booking` | Book Flight — search + results |
| `/destinations` | Destinations — filtered grid |
| `/flights` | Live Flights — real-time board |
| `/checkin` | Check-In — 3-step flow + boarding pass |

## Stack
- React 18 + Vite
- Tailwind CSS v3
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion
- React Router v6
- Lucide React icons

## 3D Model
Boeing 737-8 MAX (Ryanair livery) — `/src/components/Plane737.jsx`
- Ko'k qorin (#073590), oq ustki qism
- Split Scimitar wingletlar
- CFM LEAP-1B dvigatellar (sariq inlet)
- Nav lights (yashil/qizil), tail strobe
- 360° aylanuvchi + sichqoncha kuzatish

## I18N
`/src/hooks/useLang.js` — EN / UZ
Navbar'dan til almashtirish tugmasi.
