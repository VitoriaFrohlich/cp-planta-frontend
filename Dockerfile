# Use uma imagem base oficial do Node.js
FROM node:latest AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json 
COPY package.json ./

# Instale as dependências
RUN npm install --force

COPY tsconfig.json ./   
# Copie o restante do código da aplicação
COPY . .

# Compile o projeto para produção 
RUN npm run build

# Agora, crie uma imagem final com o código de produção
FROM node:latest AS runner

WORKDIR /app

# Copie apenas os arquivos necessários da build anterior
COPY --from=builder /app /app

# Exponha a porta onde a aplicação vai rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]