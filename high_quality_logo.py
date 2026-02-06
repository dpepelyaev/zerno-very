import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

# ИСХОДНИК МАКСИМАЛЬНОГО КАЧЕСТВА (8MB файл)
SOURCE_PATH = "/Users/pepden/Проекты/zerno-very/optimized/logo-ru.jpg"
OUTPUT_DIR = "/Users/pepden/Проекты/zerno-very/optimized"
IMAGES_DIR = "/Users/pepden/Проекты/zerno-very/images"


def process_high_quality():
    print(f"Обработка исходника: {SOURCE_PATH}")

    try:
        # Открываем изображение
        img = Image.open(SOURCE_PATH).convert("RGBA")
        print(f"Размер оригинала: {img.width}x{img.height}")

        # 1. Удаление фона (Продвинутый метод)
        # Превращаем белый цвет в прозрачный с допуском
        datas = img.getdata()
        new_data = []

        # Порог белого (чем меньше, тем строже)
        threshold = 240

        for item in datas:
            # Если пиксель светлый (фон)
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)

        # 2. Обрезка пустых полей
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            print(f"Размер после обрезки: {img.width}x{img.height}")

        # 3. Улучшение качества
        # Повышение резкости (Unsharp Mask - идеально для деталей)
        img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

        # Насыщенность (+20%)
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.2)

        # Контраст (+10%)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.1)

        # 4. Сохраняем ГЛАВНЫЙ ЛОГОТИП (Full HD качество)
        # Ограничиваем ширину до 1200px (этого достаточно для retina)
        if img.width > 1200:
            ratio = 1200 / img.width
            new_h = int(img.height * ratio)
            img = img.resize((1200, new_h), Image.Resampling.LANCZOS)

        save_path = os.path.join(OUTPUT_DIR, "logo-enhanced.png")
        img.save(save_path, "PNG")
        print(f"Сохранен HQ логотип: {save_path} ({img.width}x{img.height})")

        # 5. Создаем Hero-Background (обновленный)
        hero_w, hero_h = 1920, 1080
        # Цвет фона (светло-кремовый, почти белый)
        bg_color = (250, 247, 242)
        hero_bg = Image.new("RGB", (hero_w, hero_h), bg_color)

        # Добавляем очень мягкое свечение по центру (золотистое)
        from PIL import ImageDraw

        glow = Image.new("RGBA", (hero_w, hero_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(glow)
        cx, cy = hero_w // 2, hero_h // 2
        r = 600
        # Золотистый оттенок свечения
        glow_color = (255, 248, 220, 100)  # Cornsilk + alpha
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=glow_color)
        glow = glow.filter(ImageFilter.GaussianBlur(100))

        hero_bg.paste(glow, (0, 0), glow)

        hero_bg_path = os.path.join(IMAGES_DIR, "hero-bg.png")
        hero_bg.save(hero_bg_path)
        print("Фон обновлен")

    except Exception as e:
        print(f"Ошибка: {e}")


if __name__ == "__main__":
    process_high_quality()
