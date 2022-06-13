# Quake log parser

Bem vindo(a) ao meu repositório do desafio de backend da Luizalabs

## Setup

Para subir a aplicação siga os passos:

1. Clonar o repositório
1. Instalar dependências com comando "npm install" ou "yarn"
2. Rodar aplicação com "npm run dev:server" ou "yarn dev:server"

# Estrutura

O código está dividido em pastas que melhor determinam a responsabilidade de cada parte.

├── src
|   ├── config
|   ├── modules
|   ├── shared

/config - Contém os arquivos de configuração necessário para uso de bibliotecas comuns
/modules - O código utiliza conceitos de DDD, assim, cada domínios identificados possui uma pasta dentro de modules
/shared - Detem códigos comuns a aplicação, como roteamento, providers, etc

## Testes

Para rodar os testes unitários basta utilizar o comando "npm run test" ou "yarn test"

## Documentação

A documentação feita com swagger está disponível na rota /v1/documentation
