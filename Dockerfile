FROM cypress/included:13.11.0

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

ENV CYPRESS_BASE_URL=https://www.saucedemo.com

CMD ["npx", "cypress", "run", "--browser", "chrome", "--headless"]
