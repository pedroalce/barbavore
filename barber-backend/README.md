# Barber Backend API

Backend Node.js + Express + MongoDB para sistema de agendamento de barbearia.

## Funcionalidades
- Autenticação JWT (admin, barbeiro, cliente)
- CRUD de usuários e agendamentos
- Agenda visual (quadros de 30min)
- Balanço financeiro (mensal, semanal, anual)
- Configuração de serviços e valores
- Histórico de cortes
- Upload de foto do cliente (campo photoUrl)

## Endpoints principais
- POST `/api/auth/login` — login
- POST `/api/auth/register` — cadastro
- GET/POST/PUT/DELETE `/api/appointments` — agendamentos
- GET `/api/balance` — balanço
- GET/PUT `/api/services` — serviços e valores

## Como rodar
1. Instale dependências:
   ```
   npm install
   ```
2. Configure o MongoDB em `.env`
3. Inicie o servidor:
   ```
   npm run dev
   ```
