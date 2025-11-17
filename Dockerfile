FROM node:20-alpine

WORKDIR /app

# Copia package.json de raiz e lockfile (contendo workspaces)
COPY package*.json ./

# Instala dependências de todos os workspaces
RUN npm install

# Copia todo o monorepo
COPY . .

# Build dos apps individualmente (não usando --workspace)
RUN npm run build:web
RUN npm run build:api
# Se quiser: RUN npm run build:extension

# Comando padrão (API)
CMD ["npm", "run", "start:api"]
