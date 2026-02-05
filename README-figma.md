# Как создать дизайн «Зерно веры» в Figma

> Пошаговая инструкция с плагинами и автоматизацией

---

## 🚀 Быстрый старт (5 минут)

### Шаг 1: Создайте файл Figma
1. Откройте Figma: https://figma.com
2. New Design File → Название: **"Зерно веры — Лендинг"**

### Шаг 2: Импортируйте дизайн-токены
1. Установите плагин: **Design Tokens** (Plugins → Browse → поиск "Design Tokens")
2. Plugins → Design Tokens → Import
3. Загрузите файл: `design-tokens.json` (из папки проекта)
4. Плагин автоматически создаст:
   - Color Styles (9 цветов)
   - Text Styles (7 стилей)
   - Spacing переменные

### Шаг 3: Импортируйте логотипы
1. Drag & Drop в Figma:
   - `logo-ru.jpg` (русская версия)
   - `logo-en.jpg` (английская версия)
   - `logo-icon.jpg` (иконка)
2. Создайте компонент из логотипа (Ctrl+Alt+K)

---

## 📁 Структура файла

Создайте 5 страниц (Pages):

```
📄 Cover (обложка)
   ├── Название проекта: Зерно веры
   ├── Описание: Лендинг православного семейного центра
   └── Дата: 2026-02-04

📄 Design System
   ├── Colors (Color Styles)
   ├── Typography (Text Styles)
   ├── Spacing (8px grid)
   ├── Shadows
   └── Components

📄 Desktop (1440px)
   ├── Hero
   ├── Carousel
   ├── About
   ├── Quote
   ├── Programs
   ├── Parents
   ├── Concerts
   ├── Testimonials
   ├── CTA
   └── Footer

📄 Mobile (375px)
   └── [Те же 10 секций]

📄 Assets
   ├── Logos
   ├── Photos (7 шт.)
   └── Icons
```

---

## 🎨 Импорт дизайн-системы

### Цвета (Color Styles)

**Автоматический импорт** через плагин Design Tokens, или **вручную:**

1. Откройте Page "Design System"
2. Создайте фрейм 1200x800 с названием "Colors"
3. Для каждого цвета:
   - Нарисуйте квадрат 100x100px
   - Заливка: цвет из таблицы ниже
   - Правая панель → Fill → ... → Create Style
   - Название стиля: как в таблице

**Таблица цветов:**

| Стиль | HEX | Описание |
|-------|-----|----------|
| `Primary/Olive` | #7D8B5E | Оливковый |
| `Primary/Dark` | #2D4A3E | Тёмно-зелёный |
| `Surface/Background` | #E8DCC8 | Основной фон |
| `Surface/Beige` | #D4C4A8 | Карточки |
| `Surface/White` | #FFFFFF | Белый |
| `Accent/Gold` | #C9A227 | Охра |
| `Accent/Red` | #B22222 | CTA |
| `Text/Primary` | #1A1A1A | Основной текст |
| `Text/Secondary` | #4A4A4A | Описания |

### Типографика (Text Styles)

**Импорт шрифтов:**
1. Figma → File → Install missing fonts
2. Или: Google Fonts → Cormorant Garamond, PT Serif

**Создание Text Styles:**

| Стиль | Шрифт | Размер | Вес | Line-height |
|-------|-------|--------|-----|-------------|
| `H1/Desktop` | Cormorant Garamond | 64px | Bold 700 | 120% |
| `H1/Mobile` | Cormorant Garamond | 36px | Bold 700 | 120% |
| `H2/Desktop` | Cormorant Garamond | 48px | SemiBold 600 | 130% |
| `H2/Mobile` | Cormorant Garamond | 28px | SemiBold 600 | 130% |
| `H3` | Cormorant Garamond | 32px | SemiBold 600 | 140% |
| `Body Large` | PT Serif | 20px | Regular 400 | 160% |
| `Body` | PT Serif | 16px | Regular 400 | 160% |

**Как создать:**
1. Text Tool (T) → напишите текст
2. Настройте шрифт, размер, вес
3. Правая панель → Type details → ... → Create Style

---

## 🖼️ Создание секций (Desktop)

### 1. Hero (1440x900)

1. **Создайте фрейм:**
   - Frame Tool (F) → 1440x900px
   - Название: "Hero"

2. **Фон:**
   - Fill → Linear Gradient
   - Начало: #E8DCC8 (сверху)
   - Конец: #D4C4A8 (снизу)
   - Angle: 135deg

3. **Логотип:**
   - Drag & Drop `logo-ru.jpg`
   - Позиция: 40px от левого верхнего угла
   - Размер: 180px ширина (пропорционально)

4. **Заголовок:**
   - Text Tool (T)
   - Текст: "Поддержите семейные ценности"
   - Стиль: H1/Desktop
   - Позиция: 80px слева, по центру вертикально
   - Ширина: 520px

5. **Подзаголовок:**
   - Текст из `landing-plan.md` (строки 46-47)
   - Стиль: Body Large
   - Ширина: 480px

6. **Кнопка CTA:**
   - Rectangle Tool (R) → 220x64px
   - Fill: Accent/Red
   - Border-radius: 32px (правая панель → Corner radius)
   - Text: "Поддержать центр" → стиль Body, цвет белый
   - Shadow: 0px 8px 24px rgba(178, 34, 34, 0.3)
   - Auto Layout: Shift+A → Gap 12px, Padding 20px horizontal

7. **Иллюстрация:**
   - Используйте `logo-icon.jpg` как базу
   - Увеличьте до 400px
   - Добавьте декор (плагин Iconify → "wheat", "leaf")

### 2. Carousel (1440x600)

1. **Фрейм:** 1440x600px, фон #F5EFE1
2. **Фото:**
   - Drag & Drop фото из папки `photos/`
   - Размер: 800x500px
   - Border-radius: 16px
   - Shadow: 0px 16px 40px rgba(0, 0, 0, 0.1)
   - Позиция: по центру
3. **Индикаторы:**
   - Circle Tool (O) → 12x12px
   - 10 кружков с Gap 8px (Auto Layout)
   - Активный: Accent/Gold
   - Неактивные: Surface/Beige

### 3-10. Остальные секции

Следуйте композиции из `figma-composition-guide.md` (детальные схемы для каждой секции).

---

## 🔌 Полезные плагины

Установите через Figma → Plugins → Browse:

### Обязательные:
1. **Design Tokens** — импорт токенов из JSON
2. **Iconify** — иконки (Material Symbols)
3. **Unsplash** — временные фото для placeholder
4. **Auto Layout** — автоматическая адаптивность

### Опциональные:
5. **Content Reel** — генерация текстов для заполнения
6. **Font Scale** — типографическая шкала
7. **Artboard Studio** — акварельные текстуры
8. **Blobs** — плавные органические формы
9. **Stark** — проверка контрастности (accessibility)

---

## 📱 Адаптив (Mobile 375px)

### Быстрый способ:

1. Выделите фрейм Desktop секции (например, Hero)
2. Plugins → Autoflow → Convert to Mobile
3. Плагин автоматически:
   - Изменит ширину на 375px
   - Переключит Grid на 4 колонки
   - Поменяет Text Styles на Mobile версии
   - Перестроит Auto Layout

### Ручной способ:

1. Создайте новый фрейм 375x...px
2. Скопируйте контент из Desktop
3. Настройте Auto Layout:
   - Direction: Vertical (вертикальный stack)
   - Gap: 24px
   - Padding: 16px
4. Замените Text Styles:
   - H1/Desktop → H1/Mobile
   - H2/Desktop → H2/Mobile

---

## 🎯 Компоненты (Reusable)

Создайте на странице "Design System":

### Button (Primary)
1. Rectangle + Text → Auto Layout
2. Variants:
   - Default (фон: Accent/Red)
   - Hover (фон: #8B1A1A, scale 1.05)
   - Disabled (opacity 50%)
3. Properties:
   - Label (text)
   - Has icon (boolean)

**Как создать Variants:**
- Выделите кнопку → Create Component (Ctrl+Alt+K)
- Дублируйте → Create Variant
- Настройте Property "State" → Default, Hover, Disabled

### Card (Program)
1. Frame 280x320px
2. Auto Layout: Vertical, Gap 16px, Padding 24px
3. Внутри:
   - Icon (64px)
   - Title (H3)
   - Badge (возраст)
   - Description (Body)
4. Component Properties:
   - Icon (Component swap)
   - Title (Text)
   - Age (Text)
   - Description (Text)

### Input
1. Rectangle 100% ширины, height 56px
2. Border 2px, цвет Border/Default
3. Placeholder текст внутри
4. Variants:
   - Default
   - Focus (border Accent/Olive)
   - Error (border #B22222)

---

## 🖥️ Dev Mode (для разработчиков)

После завершения дизайна:

1. **Включите Dev Mode:**
   - Правый верхний угол → Toggle Dev Mode
   - Разработчики смогут инспектировать CSS

2. **Экспорт ассетов:**
   - Выделите элемент → Export → настройте формат
   - Логотипы: SVG
   - Иконки: SVG
   - Фото: WebP (качество 80%)

3. **Поделитесь ссылкой:**
   - Share → Copy link
   - Настройте доступ: "Can view"

---

## ✅ Чек-лист перед сдачей

### Дизайн-система
- [ ] Color Styles созданы (9 цветов)
- [ ] Text Styles созданы (7 стилей)
- [ ] Spacing система настроена (8px grid)
- [ ] Layout Grids настроены (Desktop, Tablet, Mobile)

### Секции
- [ ] 10 секций Desktop созданы
- [ ] 10 секций Mobile созданы
- [ ] Все тексты из `landing-plan.md` добавлены
- [ ] 7 фото импортированы (+ 3 placeholder)

### Компоненты
- [ ] Button (Primary, Secondary)
- [ ] Card (Program, Testimonial)
- [ ] Input (Default, Focus, Error)
- [ ] Badge
- [ ] Все компоненты имеют Variants

### Интерактивность
- [ ] Hover состояния настроены
- [ ] Auto Layout везде (никаких абсолютных позиций)
- [ ] Prototype связи созданы (для демо)

### Экспорт
- [ ] Dev Mode включен
- [ ] Ассеты экспортированы
- [ ] Ссылка на файл получена

---

## 📚 Дополнительные материалы

| Файл | Описание |
|------|----------|
| `figma-design-brief.md` | Полное руководство (дизайн-система, композиция) |
| `figma-composition-guide.md` | Детальные схемы всех 10 секций |
| `design-tokens.json` | Токены для импорта через плагин |
| `landing-plan.md` | Структура и контент лендинга |
| `project.md` | Информация о центре «Зерно веры» |
| `testimonials.md` | 4 отзыва родителей |

---

## 🆘 Частые вопросы

**Q: Как импортировать design-tokens.json?**
A: Плагин "Design Tokens" → Import → выберите файл → Apply

**Q: Где взять иконки?**
A: Плагин Iconify → Material Symbols → поиск "child_care", "music_note", etc.

**Q: Как сделать акварельные текстуры?**
A: Unsplash → "watercolor beige" → opacity 20-40% → Blend mode: Multiply

**Q: Как проверить контрастность цветов?**
A: Плагин Stark → Color Contrast Checker → минимум 4.5:1 для текста

**Q: Как создать адаптив быстро?**
A: Используйте Auto Layout (Shift+A) везде → элементы автоматически перестроятся

---

## 🚀 Следующие шаги

1. ✅ Создайте дизайн в Figma (8-12 часов)
2. [ ] Согласуйте с клиентом (батюшка, Елена)
3. [ ] Экспортируйте ассеты
4. [ ] Передайте в разработку (вёрстка)
5. [ ] Интеграция форм и платежей

**Удачи в создании!**
