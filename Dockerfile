# Stage 1: Build
FROM node:22.5.0 AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências de produção e desenvolvimento
RUN NODE_ENV=development npm i

RUN rm -rf /app/node_modules && mkdir -p /app/node_modules

# Copie todo o código-fonte para o container
COPY . /app/

# Compile o projeto para produção
RUN npm run build

# Stage 2: Run
FROM node:22.5.0 AS runner

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários do estágio de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Exponha a porta usada pelo Next.js
EXPOSE 3001

# Comando para rodar a aplicação Next.js em produção
CMD ["npm", "run", "start"]

