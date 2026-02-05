# Инструкция по замене placeholder-изображений

> Дата: 05.02.2026

## Текущий статус

✅ **Сайт работает** — все изображения заменены на placeholder'ы (временные заглушки)
⚠️ **Требуется**: получить 8 фотографий от клиента и заменить placeholder'ы

---

## Шаг 1: Получить фотографии

Запросите у клиента 8 фотографий согласно списку в `photos/README.md`:

1. **IMG_5444.jpg** — Портрет основателей (о. Андрей и м. Светлана Кравченко)
2. **IMG_5438.jpg** — Дети с геобордами (развивающие занятия)
3. **IMG_5439.jpg** — Взрослые в народных костюмах (хоровод)
4. **IMG_5440.jpg** — Пасхальное фото у собора (массовое мероприятие)
5. **IMG_5441.jpg** — Мама с малышом (портрет)
6. **IMG_5442.jpg** — Дети с музыкальными инструментами (концерт)
7. **IMG_5443.jpg** — Малыши с кубиками (раннее развитие)
8. **IMG_5445.jpg** — Занятие каллиграфией

---

## Шаг 2: Сохранить фото в папку `photos/`

```bash
# Скопируйте полученные фотографии в папку:
cp ~/Downloads/IMG_5444.jpg ~/Проекты/zerno-very/photos/
cp ~/Downloads/IMG_5438.jpg ~/Проекты/zerno-very/photos/
# ... и так далее для всех 8 фото
```

---

## Шаг 3: Заменить placeholder'ы в index.html

Откройте `index.html` и найдите все строки с `https://placehold.co/`:

### Карусель (строки 31-60)

**Было:**
```html
<img src="https://placehold.co/800x600/8B7355/FFFFFF?text=Портрет+основателей" alt="Портрет основателей">
```

**Станет:**
```html
<img src="photos/IMG_5444.jpg" alt="Портрет основателей">
```

Повторите для всех 8 изображений в карусели.

---

### Блок "О центре" (строка 96)

**Было:**
```html
<img src="https://placehold.co/600x400/8B7355/FFFFFF?text=Основатели+центра" alt="Основатели центра" class="founders-photo">
```

**Станет:**
```html
<img src="photos/IMG_5444.jpg" alt="Основатели центра" class="founders-photo">
```

---

### Блок "Концерты" (строка 249)

**Было:**
```html
<img src="https://placehold.co/600x800/8B7355/FFFFFF?text=Пасхальное+празднование" alt="Пасхальное празднование">
```

**Станет:**
```html
<img src="photos/IMG_5440.jpg" alt="Пасхальное празднование">
```

---

## Шаг 4: Проверить результат

Откройте `index.html` в браузере:

```bash
open /Users/pepden/Проекты/zerno-very/index.html
```

Убедитесь, что все изображения отображаются корректно.

---

## Автоматическая замена (через командную строку)

Если хотите заменить все placeholder'ы автоматически, используйте эту команду:

```bash
cd /Users/pepden/Проекты/zerno-very

# Создать резервную копию
cp index.html index.html.backup

# Заменить placeholder'ы на реальные пути
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Портрет+основателей|photos/IMG_5444.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Дети+с+геобордами|photos/IMG_5438.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Народные+костюмы|photos/IMG_5439.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Пасха+у+собора|photos/IMG_5440.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Мама+с+малышом|photos/IMG_5441.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Музыкальные+инструменты|photos/IMG_5442.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Малыши+с+кубиками|photos/IMG_5443.jpg|g' index.html
sed -i '' 's|https://placehold.co/800x600/8B7355/FFFFFF?text=Каллиграфия|photos/IMG_5445.jpg|g' index.html
sed -i '' 's|https://placehold.co/600x400/8B7355/FFFFFF?text=Основатели+центра|photos/IMG_5444.jpg|g' index.html
sed -i '' 's|https://placehold.co/600x800/8B7355/FFFFFF?text=Пасхальное+празднование|photos/IMG_5440.jpg|g' index.html

echo "✅ Замена завершена! Проверьте index.html"
```

---

## Что изменено в index.html

### До исправления:
- ❌ Использовались пути `photos/IMG_5444.jpg`, но файлов не было
- ❌ Изображения не загружались (broken images)

### После исправления:
- ✅ Используются placeholder'ы с placehold.co
- ✅ Сайт работает и отображается корректно
- ✅ Логотипы используют оптимизированные версии из `optimized/`

---

## Checklist

- [ ] Получены 8 фотографий от клиента
- [ ] Фото сохранены в папку `photos/`
- [ ] Placeholder'ы заменены на реальные пути
- [ ] Проверено отображение в браузере
- [ ] Проверена адаптивность (мобильная версия)
- [ ] Проверена скорость загрузки

---

## Контакты для вопросов

Если возникнут вопросы, обратитесь к документации:
- `photos/README.md` — описание всех фотографий
- `START-HERE.md` — общая инструкция по проекту
