import os
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageOps

# Конфигурация
SOURCE_PATH = "/Users/pepden/Downloads/image_original (9).png"
OUTPUT_DIR = "/Users/pepden/Проекты/zerno-very/images"
OPTIMIZED_DIR = "/Users/pepden/Проекты/zerno-very/optimized"

# Цвета
C_CREAM = (250, 247, 242)
C_GREEN_LIGHT = (232, 245, 238)
C_GOLD = (212, 168, 67)


def make_transparent(img):
    """Удаляет белый фон, делая его прозрачным"""
    img = img.convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Если пиксель очень светлый (близко к белому), делаем его прозрачным
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    return img


def create_gradient(width, height, color1, color2):
    base = Image.new("RGB", (width, height), color1)
    top = Image.new("RGB", (width, height), color2)
    mask = Image.new("L", (width, height))
    mask_data = []
    for y in range(height):
        mask_data.extend([int(255 * (y / height))] * width)
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base


def process_logo():
    print(f"Обработка файла: {SOURCE_PATH}")

    try:
        img = Image.open(SOURCE_PATH)

        # 1. Делаем прозрачным фон
        img = make_transparent(img)

        # 2. Убираем лишние прозрачные поля (crop)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        # 3. Улучшаем качество (цвет, контраст)
        converter = ImageEnhance.Color(img)
        img = converter.enhance(1.4)

        converter = ImageEnhance.Contrast(img)
        img = converter.enhance(1.1)

        img = img.filter(ImageFilter.SHARPEN)

        # Сохраняем прозрачный логотип для сайта (HTML <img>)
        enhanced_path = os.path.join(OPTIMIZED_DIR, "logo-enhanced.png")
        img.save(enhanced_path, "PNG")
        print(f"Сохранен прозрачный логотип: {enhanced_path}")

        # --- HERO ФОН (БЕЗ ЛОГОТИПА) ---
        # Делаем просто красивый фон с мягким свечением по центру
        hero_w, hero_h = 1920, 1080
        hero_bg = create_gradient(hero_w, hero_h, C_CREAM, C_GREEN_LIGHT)

        # Добавляем свечение по центру (где будет стоять логотип)
        glow = Image.new("RGBA", (hero_w, hero_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(glow)
        center_x, center_y = hero_w // 2, hero_h // 2
        r = 500
        # Рисуем мягкое белое свечение
        draw.ellipse(
            (center_x - r, center_y - r, center_x + r, center_y + r),
            fill=(255, 255, 255, 180),
        )
        glow = glow.filter(ImageFilter.GaussianBlur(80))

        hero_bg.paste(glow, (0, 0), glow)

        hero_path = os.path.join(OUTPUT_DIR, "hero-bg.png")
        hero_bg.save(hero_path)
        print(f"Создан чистый Hero-фон: {hero_path}")

        # --- FAVICON ---
        fav_size = 512
        fav_img = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))
        logo_fav = img.copy()
        logo_fav.thumbnail((400, 400), Image.Resampling.LANCZOS)
        fx = (fav_size - logo_fav.width) // 2
        fy = (fav_size - logo_fav.height) // 2
        fav_img.paste(logo_fav, (fx, fy), logo_fav)
        fav_path = os.path.join(OUTPUT_DIR, "favicon.png")
        fav_img.save(fav_path)

        # --- FOOTER LOGO ---
        footer_img = img.copy()
        footer_img.thumbnail((200, 200), Image.Resampling.LANCZOS)
        footer_path = os.path.join(OPTIMIZED_DIR, "logo-footer.png")
        footer_img.save(footer_path)

    except Exception as e:
        print(f"Ошибка: {e}")


if __name__ == "__main__":
    process_logo()
