# Використовуємо базовий образ з уже встановленим Chrome
FROM ianwalter/puppeteer:latest

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json і package-lock.json до контейнера
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту коду програми
COPY . .

# Визначаємо команду для запуску тестів WebDriverIO
CMD ["npm", "run", "test:all:chrome"]