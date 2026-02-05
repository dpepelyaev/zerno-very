#!/bin/bash

# Скрипт автоматической замены placeholder-изображений на реальные фото
# Дата: 05.02.2026

echo "🔄 Начинаю замену placeholder-изображений..."

# Проверка наличия фотографий
PHOTOS_DIR="/Users/pepden/Проекты/zerno-very/photos"
REQUIRED_PHOTOS=(
  "IMG_5444.jpg"
  "IMG_5438.jpg"
  "IMG_5439.jpg"
  "IMG_5440.jpg"
  "IMG_5441.jpg"
  "IMG_5442.jpg"
  "IMG_5443.jpg"
  "IMG_5445.jpg"
)

echo ""
echo "📁 Проверка наличия фотографий..."
MISSING_COUNT=0

for photo in "${REQUIRED_PHOTOS[@]}"; do
  if [ ! -f "$PHOTOS_DIR/$photo" ]; then
    echo "   ❌ Отсутствует: $photo"
    MISSING_COUNT=$((MISSING_COUNT + 1))
  else
    echo "   ✅ Найден: $photo"
  fi
done

echo ""
if [ $MISSING_COUNT -gt 0 ]; then
  echo "⚠️  Внимание! Отсутствует $MISSING_COUNT фотографий."
  echo ""
  read -p "Продолжить замену для найденных фото? (y/n): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Отменено пользователем."
    exit 1
  fi
fi

# Создание резервной копии
BACKUP_FILE="index.html.backup-$(date +%Y%m%d-%H%M%S)"
echo ""
echo "💾 Создаю резервную копию: $BACKUP_FILE"
cp index.html "$BACKUP_FILE"

# Замена placeholder'ов
echo ""
echo "🔧 Заменяю placeholder'ы на реальные пути..."

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

echo "   ✅ Карусель: 8 изображений"
echo "   ✅ Блок 'О центре': 1 изображение"
echo "   ✅ Блок 'Концерты': 1 изображение"

# Проверка результата
echo ""
echo "🔍 Проверяю результат..."
REMAINING_PLACEHOLDERS=$(grep -c "placehold.co" index.html || true)

if [ $REMAINING_PLACEHOLDERS -eq 0 ]; then
  echo "   ✅ Все placeholder'ы успешно заменены!"
else
  echo "   ⚠️  Осталось $REMAINING_PLACEHOLDERS placeholder'ов"
fi

echo ""
echo "✅ Готово!"
echo ""
echo "📋 Следующие шаги:"
echo "   1. Откройте index.html в браузере для проверки"
echo "   2. Проверьте, что все изображения отображаются корректно"
echo "   3. При необходимости восстановите из бэкапа: $BACKUP_FILE"
echo ""
echo "🌐 Открыть в браузере:"
echo "   open /Users/pepden/Проекты/zerno-very/index.html"
