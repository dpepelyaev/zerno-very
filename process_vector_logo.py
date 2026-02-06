import os
from PIL import Image, ImageEnhance, ImageFilter

# Исходник из CDR (2000px PNG)
SOURCE_PATH = "/Users/pepden/Проекты/zerno-very/optimized/logo-vector.png"
OUTPUT_DIR = "/Users/pepden/Проекты/zerno-very/optimized"
IMAGES_DIR = "/Users/pepden/Проекты/zerno-very/images"


def process_vector_logo():
    print(f"Обработка векторного рендера: {SOURCE_PATH}")

    try:
        img = Image.open(SOURCE_PATH).convert("RGBA")

        # 1. Обрезка пустых полей (Trim)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        # 2. Улучшение цветов (делаем сочнее)
        # Насыщенность +30%
        converter = ImageEnhance.Color(img)
        img = converter.enhance(1.3)

        # Контраст +10%
        converter = ImageEnhance.Contrast(img)
        img = converter.enhance(1.1)

        # 3. Сохраняем основной логотип (HQ)
        # Ресайз до 1200px (оптимально для веба)
        if img.width > 1200:
            ratio = 1200 / img.width
            new_h = int(img.height * ratio)
            img = img.resize((1200, new_h), Image.Resampling.LANCZOS)

        save_path = os.path.join(OUTPUT_DIR, "logo-enhanced.png")
        img.save(save_path, "PNG")
        print(f"Сохранен HQ логотип: {save_path}")

        # 4. Обновляем Favicon
        fav_size = 512
        fav_img = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))
        logo_fav = img.copy()
        logo_fav.thumbnail((450, 450), Image.Resampling.LANCZOS)
        fx = (fav_size - logo_fav.width) // 2
        fy = (fav_size - logo_fav.height) // 2
        fav_img.paste(logo_fav, (fx, fy), logo_fav)
        fav_path = os.path.join(IMAGES_DIR, "favicon.png")
        fav_img.save(fav_path)
        print("Favicon обновлен")

        # 5. Обновляем лого футера
        footer_img = img.copy()
        footer_img.thumbnail((300, 300), Image.Resampling.LANCZOS)
        footer_path = os.path.join(OUTPUT_DIR, "logo-footer.png")
        footer_img.save(footer_path)
        print("Лого футера обновлено")

    except Exception as e:
        print(f"Ошибка: {e}")


if __name__ == "__main__":
    process_vector_logo()
