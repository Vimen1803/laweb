# 🐞 Informe de Errores — Web LA Spain

**Fecha:** 2026-06-05
**Alcance:** Directorio `web/` (aplicación Next.js 16 / React 19)
**Autor del informe:** Revisión UX/UI + Front-end

> Informe de errores localizados durante la revisión.

### ✅ Estado de resolución (actualizado)

- **Resueltos:** #1, #2, #5, #6, #7, #8, #9, #10, #11, #12 y #14.
- **Pendientes (por decisión del equipo):** #3 (validar tag de club), #4 (llamadas externas
  de la blacklist) y #13 (imagen externa del banner DC Info).
- Sobre #2: el `server_id` `724202847822151680` de la blacklist se mantiene **hardcodeado a
  propósito** (servidor distinto); solo se centralizó el guild principal en variable de entorno.

---

## Escala de gravedad

| Nivel | Etiqueta | Significado |
|-------|----------|-------------|
| 🔴 | **Crítica** | Compromete la seguridad o la integridad de los datos. Actuar de inmediato. |
| 🟠 | **Alta** | Rompe funcionalidad importante o expone datos sensibles. Prioridad alta. |
| 🟡 | **Media** | Afecta a la usabilidad/accesibilidad o produce comportamientos incorrectos puntuales. |
| 🟢 | **Baja** | Mejora de calidad, mantenimiento, rendimiento o detalle visual. |

### Resumen

| # | Gravedad | Área | Error |
|---|----------|------|-------|
| 1 | 🔴 Crítica | Seguridad | API `/api/admin` sin autenticación (lectura y escritura) |
| 2 | 🟠 Alta | Datos | Inconsistencia de Guild ID (3 valores distintos) |
| 3 | 🟡 Media | Datos | `addClub` no valida el tag ni rellena nombre/trofeos |
| 4 | 🟡 Media | Rendimiento | Enriquecido de blacklist con N llamadas externas bloqueantes |
| 5 | 🟡 Media | Accesibilidad | Elementos interactivos `<div onClick>` sin soporte de teclado |
| 6 | 🟡 Media | Accesibilidad | Contraste insuficiente del texto silenciado (`--text-muted`) |
| 7 | 🟡 Media | UX / Lógica | Estado “sin partidas” de Wordle se basa solo en el modo `normal` |
| 8 | 🟡 Media | Responsive | `h1` de la home con tamaño fijo (`4.5rem`) sin `clamp()` |
| 9 | 🟢 Baja | Navegación | Secciones del panel admin (`config`, `users`) inaccesibles desde la UI |
| 10 | 🟢 Baja | UX | Login mediante `window.location.href` (recarga completa) |
| 11 | 🟢 Baja | Rendimiento | Uso de `<img>` en lugar de `next/image`; import sin usar en `Footer` |
| 12 | 🟢 Baja | Mantenimiento | Imports de iconos sin usar en `admin/page.js` |
| 13 | 🟢 Baja | Fiabilidad | Banner DC Info depende de una imagen externa de Webflow |
| 14 | 🟢 Baja | SEO | Páginas cliente sin `metadata` propio (title/description/OG) |

---

## 🔴 Crítica

### 1. La API `/api/admin` no tiene autenticación ni autorización
- **Archivo:** `app/api/admin/route.js` (handlers `GET` y `POST`)
- **Descripción:** El endpoint no comprueba la sesión en ningún momento. La verificación de
  administrador se hace **solo en el cliente** (`app/admin/page.js`, vía `/api/session`).
  Cualquier persona puede llamar directamente a la API y:
  - **Leer** datos sensibles: `mod_log` (historial de moderación), `blacklist`, lista de
    usuarios, configuración de moderación e información de cualquier usuario de Discord
    (sección `usercheck`, que usa el token del bot).
  - **Escribir** en la base de datos del bot: `addClub`, `removeClub`, `addBlacklist`,
    `removeBlacklist` con una simple petición `POST`.
- **Impacto:** Exposición de datos personales y manipulación directa de la BBDD de producción
  por usuarios no autenticados.
- **Recomendación:** Validar en el propio handler `const session = await auth();` y abortar con
  `401/403` si `!session?.isAdmin` (el mismo patrón que ya usa `app/api/session/route.js`).

---

## 🟠 Alta

### 2. Inconsistencia de identificadores de servidor (Guild ID)
- **Archivos:** `app/api/admin/route.js`, `app/api/user/bot-stats/route.js`, `lib/auth.js`
- **Descripción:** Conviven **tres** identificadores de guild distintos:
  - `process.env.DISCORD_GUILD_ID` → overview, clubes, mod-logs y usercheck.
  - `'724202847822151680'` **hardcodeado** → consultas de `blacklist` (GET y POST).
  - `'460550486257565697'` → estadísticas de bot (`bot-stats`) y comprobación de admin (`auth.js`).
- **Impacto:** Si el guild de producción no es `724202847822151680`, la blacklist del panel está
  operando sobre **otro servidor**, y las métricas/permisos pueden no cuadrar entre vistas.
- **Recomendación:** Centralizar el ID en una sola variable de entorno y reutilizarla en todos los
  endpoints.

---

## 🟡 Media

### 3. `addClub` no valida el tag ni rellena los datos del club
- **Archivo:** `app/api/admin/route.js` (`action: 'addClub'`)
- **Descripción:** El `upsert` guarda únicamente `club_tag` y `club_key`. No comprueba que el tag
  exista realmente en Brawl Stars, por lo que se puede insertar un club inexistente. El nombre y
  los trofeos dependen de un enriquecido posterior vía `api.rnt.dev`; si esa API falla, el club
  aparece con `—`.
- **Recomendación:** Validar el tag contra la API de BS antes de insertar y mostrar feedback claro
  si no existe.

### 4. Enriquecido de la blacklist con llamadas externas bloqueantes
- **Archivo:** `app/api/admin/route.js` (sección `blacklist` del `GET`)
- **Descripción:** Por cada entrada de la blacklist se hace una petición a `api.rnt.dev/profile`
  (en bloques de 10). Con muchas entradas, la carga de la sección se ralentiza notablemente y no
  hay carga incremental ni manejo visible de errores parciales.
- **Recomendación:** Cachear nombres en BBDD, paginar, o cargar los nombres de forma diferida en el
  cliente.

### 5. Elementos interactivos sin soporte de teclado
- **Archivos:** `app/admin/page.js` (tarjetas de mod-log y filas de usuario con `onClick`),
  y patrón general del sitio (acordeones, tarjetas clicables, incluidas las nuevas documentaciones
  que siguen el mismo patrón del proyecto).
- **Descripción:** Se usan `<div onClick>` sin `role="button"`, `tabIndex` ni manejador
  `onKeyDown`. No son focusables ni accionables con teclado (Enter/Espacio), lo que incumple WCAG
  2.1 (2.1.1 Teclado).
- **Recomendación:** Usar `<button>` o añadir `role="button"`, `tabIndex={0}` y `onKeyDown` a los
  elementos clicables.

### 6. Contraste insuficiente del texto silenciado
- **Archivo:** `app/globals.css` (`--text-muted: #626875` sobre `--bg-primary: #0b0c10`)
- **Descripción:** El color de texto silenciado, usado en etiquetas y descripciones pequeñas,
  queda por debajo del ratio recomendado (WCAG AA exige 4.5:1 para texto normal). En tamaños
  pequeños (`0.7–0.8rem`) la legibilidad se resiente.
- **Recomendación:** Aclarar ligeramente `--text-muted` (p. ej. `#8a909c`) o reservarlo solo para
  texto grande/no esencial.

### 7. El estado “sin partidas” de Wordle depende solo del modo `normal`
- **Archivos:** `app/bot-stats/page.js` y `app/bot-stats/wordle/page.js`
- **Descripción:** La condición `!wordle || wordle.normal.played === 0` muestra el mensaje de
  “aún no has jugado”. Un usuario que solo haya jugado en modo **doble**, **triple** o **escalera**
  (pero no `normal`) verá erróneamente que no tiene partidas.
- **Recomendación:** Comprobar si existe actividad en **cualquier** modo antes de mostrar el estado
  vacío.

### 8. Título de la home con tamaño fijo (sin `clamp`)
- **Archivo:** `app/page.js` (`<h1 className="hero-title" style={{ fontSize: '4.5rem' }}>`)
- **Descripción:** A diferencia del resto del sitio (que usa `clamp()`), el título principal tiene
  un tamaño fijo de `4.5rem`, lo que reduce la armonía responsive en pantallas muy pequeñas o muy
  grandes.
- **Recomendación:** Usar `clamp(2.5rem, 8vw, 4.5rem)` para coherencia con el sistema de diseño.

---

## 🟢 Baja

### 9. Secciones del panel admin inaccesibles desde la interfaz
- **Archivo:** `app/admin/page.js`
- **Descripción:** Existen bloques de render para `section === 'config'` y `section === 'users'`,
  pero **no hay ningún item en el `sideItems`** que permita navegar a ellos. Es código alcanzable
  solo manipulando el estado.
- **Recomendación:** Añadir los accesos al sidebar o eliminar el código muerto.

### 10. Login mediante recarga completa de página
- **Archivos:** `app/reviews/page.js`, `app/bot-stats/*` (enlaces `signin`)
- **Descripción:** Se usa `window.location.href = '/api/auth/signin...'` o `<a href>` para iniciar
  sesión, provocando una recarga completa en lugar de aprovechar la navegación cliente de Next.
- **Recomendación:** Usar `signIn()` de NextAuth o el router cuando proceda.

### 11. Uso de `<img>` e import sin usar
- **Archivos:** `app/components/Footer.js` (importa `next/image` `Image` pero **no lo usa**, y emplea
  `<img>`), `app/components/Navbar.js`, `app/admin/page.js`
- **Descripción:** El uso de `<img>` en lugar de `next/image` genera avisos de Next y empeora el
  LCP/optimización. Además, `Footer` mantiene un import muerto.
- **Recomendación:** Migrar a `next/image` o eliminar el import no utilizado.

### 12. Imports de iconos sin usar
- **Archivo:** `app/admin/page.js`
- **Descripción:** Se importan iconos que no se utilizan (`DocumentTextIcon`, `IdentificationIcon`,
  `QuestionMarkCircleIcon`, `ScaleIcon` en algunas vistas, etc.), aumentando el ruido del bundle y
  del código.
- **Recomendación:** Limpiar imports no usados (un linter con `no-unused-vars` lo detecta).

### 13. El banner de DC Info depende de una imagen externa de terceros
- **Archivo:** `app/globals.css` (`.dc-cta-banner` → `url('https://assets-global.website-files.com/...clyde...svg')`)
- **Descripción:** El fondo del banner CTA carga un SVG alojado en un dominio de Webflow ajeno al
  proyecto. Si ese recurso cambia o desaparece, el banner se degrada; además implica una petición a
  un tercero.
- **Recomendación:** Alojar el asset en `public/` y referenciarlo localmente.

### 14. Páginas cliente sin metadatos propios (SEO)
- **Archivos:** la mayoría de páginas (`'use client'`), incluidas las nuevas documentaciones y las
  vistas de estadísticas.
- **Descripción:** Al ser componentes de cliente no exportan `metadata`, por lo que todas heredan el
  `title` global “LA Spain”. No hay títulos ni descripciones específicas por página ni Open Graph
  individual.
- **Recomendación:** Separar un `layout.js`/`page` servidor con `export const metadata` por ruta, o
  usar `generateMetadata`, especialmente para las documentaciones de Wordle y Werewolf.

---

## Notas finales

- Los problemas **#1 y #2** son los más urgentes: el primero por seguridad y el segundo por
  integridad de datos.
- Varios puntos de la categoría 🟢 son “quick wins” (limpieza de imports, `clamp()`, `next/image`)
  que mejoran la calidad sin riesgo.
- La accesibilidad por teclado (**#5**) es un patrón transversal del proyecto; conviene abordarla de
  forma global y no caso por caso.
