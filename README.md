# 🐱 Michi Tasks

Simulador 8-bit de gatos que cuidan tus tareas del día. Cada tarea es un **pez**: complétala y caerá al plato para alimentar a tus michis. Cuando quieras revisar tus pendientes, los gatos hacen fila y te los traen en la boca.

**PWA instalable** en Android y iOS, funciona sin conexión y guarda todo en tu dispositivo. Sin dependencias, sin build: un HTML, un service worker y un manifest.

## ✨ Características

- 🎨 **Crea tus gatos**: 8 personalidades, 8 colores de pelaje, 5 patrones (liso, rayas, manchas, atigrado, esmoquin) y color de ojos, con vista previa en vivo. Sprites generados píxel a píxel.
- 🧠 **Comportamiento determinista-pero-aleatorio**: cada gato decide con su propio RNG sembrado (mulberry32) y pesos según su personalidad — trepan árboles, acechan pájaros, roban pescado, tiran macetas, meditan junto al estanque…
- 🐟 **Tareas con forma de pez**: ciclo Pendiente → En curso → Finalizado (las terminadas se vuelven esqueleto 🦴). Completar una tarea sirve un pescado real en el plato y el gato más hambriento corre a comérselo.
- 📋 **Consultar tareas**: los gatos interrumpen lo que hacen, forman una cola hasta tu avatar y te muestran cada tarea.
- 🌙 **Ciclo día/noche** (5 min por día): atardeceres cálidos, luciérnagas nocturnas y gatos más dormilones de noche.
- 👆 **Interacción táctil**: acaricia a tus gatos, o atrapa al travieso que robó un pescado.
- 💾 **Exportar / importar** tus datos como JSON para moverlos entre dispositivos.

## 🚀 Probar en local

Cualquier servidor estático sirve (el service worker requiere `localhost` o HTTPS):

```bash
cd michi-tasks
python -m http.server 8000
# abre http://localhost:8000
```

Para probar desde tu teléfono en la misma red: `http://<ip-de-tu-pc>:8000` (sin HTTPS no se instala como PWA, pero la app funciona).

## 🌐 Publicar en GitHub Pages

1. Sube este repositorio a GitHub.
2. En el repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)`** → Save.
3. En 1–2 minutos tu app queda en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

Todas las rutas son relativas, así que funciona en cualquier subcarpeta.

> ℹ️ Las actualizaciones llegan solas a los usuarios: la página usa *red-primero* y los recursos *stale-while-revalidate* (se refrescan en segundo plano). Solo necesitas subir la versión en `sw.js` (`michi-tasks-v1` → `v2`) si **renombras o eliminas** archivos y quieres purgar el caché viejo.

## 📱 Instalar en el teléfono

**Android (Chrome/Edge):** abre la URL → menú ⋮ → **"Instalar aplicación"** (o el banner automático).

**iOS (Safari):** abre la URL → botón **Compartir** □↑ → **"Añadir a pantalla de inicio"**.

> 💡 En iOS, Safari puede borrar los datos de sitios web que no visitas en ~7 días, pero **instalar la app en la pantalla de inicio protege tus datos**. Aun así, usa **💾 Exportar datos** de vez en cuando como respaldo.

## 🗂 Estructura

```
index.html            # Toda la app (UI, motor, sprites, lógica)
sw.js                 # Service worker (offline)
manifest.webmanifest  # Manifest PWA
icons/                # Iconos generados (192, 512, apple-touch, favicon)
```

## 📄 Licencia

MIT — ver [LICENSE](LICENSE).
