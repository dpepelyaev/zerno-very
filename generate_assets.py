import os
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageOps

# Конфигурация
SOURCE_PATH = "/Users/pepden/Downloads/image_original (9).png"
OUTPUT_DIR = "/Users/pepden/Проекты/zerno-very/images"
OPTIMIZED_DIR = "/Users/pepden/Проекты/zerno-very/optimized"

# Цвета бренда
C_CREAM = (250, 247, 242)  # #FAF7F2
C_GREEN_LIGHT = (232, 245, 238)  # #E8F5EE
C_GREEN = (46, 139, 87)  # #2E8B57
C_GOLD = (212, 168, 67)  # #D4A843
C_WHITE = (255, 255, 255)

# Создаем папки если нет
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(OPTIMIZED_DIR, exist_ok=True)


def create_gradient(width, height, color1, color2):
    """Создает вертикальный градиент"""
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
        img = Image.open(SOURCE_PATH).convert("RGBA")

        # 1. Улучшение качества (Умная обработка)
        # Убираем лишние поля (crop)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        # Увеличиваем насыщенность (чтобы был ярким)
        converter = ImageEnhance.Color(img)
        img = converter.enhance(1.4)  # +40% насыщенности

        # Увеличиваем контраст
        converter = ImageEnhance.Contrast(img)
        img = converter.enhance(1.15)  # +15% контраста

        # Увеличиваем резкость
        img = img.filter(ImageFilter.SHARPEN)

        # Сохраняем улучшенный логотип
        enhanced_path = os.path.join(OPTIMIZED_DIR, "logo-enhanced.png")
        img.save(enhanced_path, "PNG")
        print(f"Сохранен улучшенный логотип: {enhanced_path}")

        # --- ВАРИАНТ 1: Hero Background (Широкий фон для шапки) ---
        hero_w, hero_h = 1920, 1080
        hero_bg = create_gradient(hero_w, hero_h, C_CREAM, C_GREEN_LIGHT)

        # Размещаем логотип по центру
        logo_w = 600
        ratio = logo_w / img.width
        logo_h = int(img.height * ratio)
        logo_resized = img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)

        # Центрируем
        x = (hero_w - logo_w) // 2
        y = (hero_h - logo_h) // 2

        # Добавляем "свечение" под логотип
        glow = Image.new("RGBA", (hero_w, hero_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(glow)
        # Рисуем белый круг под логотипом для контраста
        center_x, center_y = x + logo_w // 2, y + logo_h // 2
        r = 400
        draw.ellipse(
            (center_x - r, center_y - r, center_x + r, center_y + r),
            fill=(255, 255, 255, 200),
        )
        glow = glow.filter(ImageFilter.GaussianBlur(50))

        hero_bg.paste(glow, (0, 0), glow)
        hero_bg.paste(logo_resized, (x, y), logo_resized)

        hero_path = os.path.join(OUTPUT_DIR, "hero-bg.png")
        hero_bg.save(hero_path)
        print(f"Создан Hero-фон: {hero_path}")

        # --- ВАРИАНТ 2: Social Card (Квадрат для постов) ---
        social_size = 1080
        social_bg = create_gradient(social_size, social_size, C_WHITE, C_CREAM)

        # Рамка
        draw = ImageDraw.Draw(social_bg)
        border = 40
        draw.rectangle(
            [border, border, social_size - border, social_size - border],
            outline=C_GOLD,
            width=4,
        )

        logo_s_w = 500
        ratio = logo_s_w / img.width
        logo_s_h = int(img.height * ratio)
        logo_social = img.resize((logo_s_w, logo_s_h), Image.Resampling.LANCZOS)

        sx = (social_size - logo_s_w) // 2
        sy = (social_size - logo_s_h) // 2
        social_bg.paste(logo_social, (sx, sy), logo_social)

        social_path = os.path.join(OUTPUT_DIR, "social-card.png")
        social_bg.save(social_path)
        print(f"Создана карточка соцсетей: {social_path}")

        # --- ВАРИАНТ 3: Favicon (Иконка сайта) ---
        fav_size = 512
        fav_img = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))

        # Логотип максимально крупно
        logo_f_w = 400
        ratio = logo_f_w / img.width
        logo_f_h = int(img.height * ratio)
        logo_fav = img.resize((logo_f_w, logo_f_h), Image.Resampling.LANCZOS)

        fx = (fav_size - logo_f_w) // 2
        fy = (fav_size - logo_f_h) // 2
        fav_img.paste(logo_fav, (fx, fy), logo_fav)

        fav_path = os.path.join(OUTPUT_DIR, "favicon.png")
        fav_img.save(fav_path)
        print(f"Создан фавикон: {fav_path}")

        # --- ВАРИАНТ 4: Мини-лого для футера (белый фон) ---
        footer_size = 200
        footer_img = img.copy()
        footer_img.thumbnail((footer_size, footer_size), Image.Resampling.LANCZOS)

        footer_path = os.path.join(OPTIMIZED_DIR, "logo-footer.png")
        footer_img.save(footer_path)
        print(f"Создан лого футера: {footer_path}")

    except Exception as e:
        print(f"Ошибка при обработке: {e}")


if __name__ == "__main__":
    process_logo()
