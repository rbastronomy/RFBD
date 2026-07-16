# RFBD — guía para Claude

Portafolio personal de Renato en **rfbd.cl**.
**Vue 3 + Vite 7 + TypeScript** — sitio estático, **sin backend**. Usa gsap, lenis, three,
matter-js. Dev en `:3000` (`strictPort`).

## 🔴 Este repo es PÚBLICO
Es el único repo público de Renato. Cualquiera lee lo que se commitea aquí.
**Nunca commitees credenciales, datos personales, ni detalles de la infraestructura del
hosting** (nombres de cuenta, rutas del servidor, u otros sitios alojados). El `.vscode/` está
gitignoreado — que siga así.

Los detalles de despliegue viven **fuera de este repo**, en la skill `deploy-rfbd`
(`~/.claude/skills/deploy-rfbd/`), que no se versiona. Consúltala al desplegar.

## Comandos
```
npm run dev        # :3000
npm run build      # vue-tsc -b && vite build → dist/
npm run typecheck
npm run capture    # scripts/capture-shots.mjs
```

## Despliegue
`https://rfbd.cl`, hosting compartido cPanel. Sube el contenido de `dist/`.

⚠️ **No te fíes de `.vscode/sftp.json`**: su `protocol`, `port` y `remotePath` son incorrectos y
un despliegue guiado por ese archivo falla (timeout) o sube al directorio equivocado. Los valores
correctos están en la skill `deploy-rfbd`; verifícalos ahí antes de subir.

⚠️ El hosting comparte espacio con otros sitios. **Sube solo dentro del directorio de este sitio
y no toques carpetas hermanas.** `dist/` no incluye `demos/`, así que las demos del servidor se
conservan.

Alternativa: `scripts/make-deploy-zips.ps1` genera zips listos para cPanel con separadores POSIX
(evita el bug de `Compress-Archive`, que con backslashes rompe los permisos al descomprimir en
Linux). Uso: `powershell -ExecutionPolicy Bypass -File scripts\make-deploy-zips.ps1` tras
`npm run build`.

Verificar tras subir: `Invoke-WebRequest https://rfbd.cl` → deben aparecer el hash del asset
recién compilado y el link a `favicon.svg`. Si escribes un script de deploy desechable con la
password dentro, **bórralo después**.

## Versionado
Solo `version` en `package.json` (`1.0.0`). No hay CHANGELOG — es un sitio estático.

## Nota
`rfbdcommunity/` es documentación de un proyecto aparte (servidor de Minecraft de la comunidad,
hoy en Aternos). No tiene relación con el portafolio; ver
`rfbdcommunity/docs/31_ESTADO_ACTUAL_ATERNOS.md`.
