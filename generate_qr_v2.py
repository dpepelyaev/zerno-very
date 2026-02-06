#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор красивого QR-кода для «Зерно Веры»
В стиле https://всё-беременным.рф (розовая рамка + логотип в центре)
"""

import qrcode
from PIL import Image, ImageDraw, ImageFont
import os

# Цвета "Зерно Веры"
PINK = (243, 156, 170)  # Розовый (как на примере "Всё-беременным")
PINK_LIGHT = (255, 182, 193)  # Светло-розовый для рамки
GREEN = (123, 139, 94)  # Зелёный из палитры Зерно Веры
WHITE = (255, 255, 255)
BEIGE = (250, 248, 245)


def create_beautiful_qr():
    """Создаёт QR-код со скруглёнными углами и логотипом"""

    # URL для оплаты
    payment_url = "https://pay.kk.bank/services/58817?hh"

    # Создаём QR-код
    qr = qrcode.QRCode(
        version=6,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15,
        border=1,
    )
    qr.add_data(payment_url)
    qr.make(fit=True)

    # Генерируем изображение (зелёный на белом)
    qr_img = qr.make_image(fill_color=GREEN, back_color=WHITE)
    qr_img = qr_img.convert("RGBA")
    qr_size = qr_img.size[0]

    # Размеры canvas
    padding = 80
    border = 40
    canvas_width = qr_size + padding * 2 + border * 2
    canvas_height = qr_size + padding * 2 + border * 2 + 150  # +150 для текста внизу

    # Создаём canvas
    canvas = Image.new("RGBA", (canvas_width, canvas_height), BEIGE)
    draw = ImageDraw.Draw(canvas)

    # Внешняя розовая рамка (скруглённая)
    draw.rounded_rectangle(
        [(0, 0), (canvas_width, canvas_height - 100)], radius=60, fill=PINK_LIGHT
    )

    # Внутренний белый фон для QR-кода (скруглённый)
    inner_rect = [
        (border + 20, border + 20),
        (canvas_width - border - 20, canvas_height - 100 - border - 20),
    ]
    draw.rounded_rectangle(inner_rect, radius=40, fill=WHITE)

    # Позиция QR-кода
    qr_x = (canvas_width - qr_size) // 2
    qr_y = (canvas_height - 100 - qr_size) // 2

    # Вставляем QR-код
    canvas.paste(qr_img, (qr_x, qr_y), qr_img)

    # Добавляем логотип в центр
    logo_path = "/Users/pepden/Проекты/zerno-very/logo.min.png"
    if os.path.exists(logo_path):
        try:
            logo_original = Image.open(logo_path).convert("RGBA")

            # Размер логотипа
            logo_size = qr_size // 5
            logo = logo_original.resize(
                (logo_size, logo_size), Image.Resampling.LANCZOS
            )

            # Создаём белый круг под логотипом
            circle_size = logo_size + 30
            circle = Image.new("RGBA", (circle_size, circle_size), (0, 0, 0, 0))
            circle_draw = ImageDraw.Draw(circle)
            circle_draw.ellipse([(0, 0), (circle_size, circle_size)], fill=WHITE)

            # Позиция круга
            circle_x = qr_x + (qr_size - circle_size) // 2
            circle_y = qr_y + (qr_size - circle_size) // 2
            canvas.paste(circle, (circle_x, circle_y), circle)

            # Позиция логотипа
            logo_x = qr_x + (qr_size - logo_size) // 2
            logo_y = qr_y + (qr_size - logo_size) // 2
            canvas.paste(logo, (logo_x, logo_y), logo)

            print("✓ Логотип добавлен")
        except Exception as e:
            print(f"⚠ Ошибка добавления логотипа: {e}")

    # Добавляем декоративные иконки в углах (как на примере)
    icon_radius = 35
    # Левый верхний угол
    draw.ellipse(
        [
            (border + 30, border + 30),
            (border + 30 + icon_radius * 2, border + 30 + icon_radius * 2),
        ],
        fill=PINK,
    )
    # Правый верхний угол
    draw.ellipse(
        [
            (canvas_width - border - 30 - icon_radius * 2, border + 30),
            (canvas_width - border - 30, border + 30 + icon_radius * 2),
        ],
        fill=PINK,
    )
    # Левый нижний угол
    draw.ellipse(
        [
            (border + 30, canvas_height - 100 - border - 30 - icon_radius * 2),
            (border + 30 + icon_radius * 2, canvas_height - 100 - border - 30),
        ],
        fill=PINK,
    )

    # Текст внизу
    text = "Отсканируйте в приложении банка"

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    except:
        font = ImageFont.load_default()
        font_small = font

    # Рисуем текст
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_x = (canvas_width - text_width) // 2
    text_y = canvas_height - 70

    draw.text((text_x, text_y), text, fill=GREEN, font=font)

    # Конвертируем в RGB для сохранения
    canvas_rgb = Image.new("RGB", canvas.size, BEIGE)
    canvas_rgb.paste(canvas, (0, 0), canvas)

    # Сохраняем
    output_path = "/Users/pepden/Проекты/zerno-very/qr-code-beautiful.png"
    canvas_rgb.save(output_path, "PNG", quality=100, optimize=True)
    print(f"✓ Красивый QR-код сохранён: {output_path}")

    return output_path


if __name__ == "__main__":
    print("Создание красивого QR-кода для «Зерно Веры»...")
    create_beautiful_qr()
    print("✅ Готово!")
