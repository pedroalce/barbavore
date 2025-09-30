# Configuração Local - Barbavore

## 1. Configurar Backend

### Criar arquivo `.env` em `barber-backend/.env`:
```env
SUPABASE_URL=https://vpwgydisyudoogdobddz.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd2d5ZGlzeXVkb29nZG9iZGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTk1MzYsImV4cCI6MjA3NDgzNTUzNn0.tRyXjp-AKBwHbIBXIn44dZ0CmAeYpTa9ZziJ2OEthN8
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
```

### Instalar dependências e rodar backend:
```bash
cd barber-backend
npm install
npm run dev
```

## 2. Configurar Frontend

### Criar arquivo `.env` em `barber-frontend/.env`:
```env
VITE_SUPABASE_URL=https://vpwgydisyudoogdobddz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd2d5ZGlzeXVkb29nZG9iZGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTk1MzYsImV4cCI6MjA3NDgzNTUzNn0.tRyXjp-AKBwHbIBXIn44dZ0CmAeYpTa9ZziJ2OEthN8
VITE_API_URL=http://localhost:3000
```

### Instalar dependências e rodar frontend:
```bash
cd barber-frontend
npm install
npm run dev
```

## 3. Testar

1. Backend rodando em: http://localhost:3000
2. Frontend rodando em: http://localhost:5173
3. Teste as rotas:
   - GET http://localhost:3000/services (pública)
   - GET http://localhost:3000/agendamentos (protegida - precisa token)

## 4. Configurar Supabase

### Criar tabela `agendamentos`:
```sql
CREATE TABLE agendamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_cliente TEXT NOT NULL,
  servico TEXT NOT NULL,
  horario TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Ativar RLS e criar políticas:
```sql
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura/escrita para usuários autenticados
CREATE POLICY "Users can manage their own appointments" ON agendamentos
  FOR ALL USING (auth.uid() IS NOT NULL);
```
