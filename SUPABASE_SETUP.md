# 🗄️ Configuração do Supabase

## 1. Criar Tabelas

Execute no SQL Editor do Supabase:

```sql
-- Tabela de agendamentos
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES auth.users(id),
  barber_id UUID REFERENCES auth.users(id),
  date TIMESTAMPTZ NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  services TEXT[] NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('dinheiro', 'pix', 'cartao')),
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'finalizado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de serviços (opcional - pode usar constante no código)
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- em minutos
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir serviços padrão
INSERT INTO services (key, label, value, duration) VALUES
('maquina', 'Corte Máquina 1 Pente', 20.00, 30),
('tesoura', 'Corte com Tesoura', 25.00, 30),
('barba', 'Barba', 15.00, 30),
('sobrancelha', 'Sobrancelha', 5.00, 15),
('combo', 'Corte + Barba + Sobrancelha', 35.00, 60);
```

## 2. Ativar RLS (Row Level Security)

```sql
-- Ativar RLS nas tabelas
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Políticas para appointments
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = barber_id OR
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'barber')
    )
  );

CREATE POLICY "Users can create appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Barbers can update appointments" ON appointments
  FOR UPDATE USING (
    auth.uid() = barber_id OR
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can delete appointments" ON appointments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Políticas para services (todos podem ver, apenas admin pode modificar)
CREATE POLICY "Everyone can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );
```

## 3. Configurar Auth

1. **Authentication > Settings**
   - Enable email confirmations: `false` (para desenvolvimento)
   - Enable phone confirmations: `false`

2. **Authentication > Users**
   - Criar usuários de teste com roles:
     - Admin: `role: 'admin'`
     - Barber: `role: 'barber'`
     - Client: `role: 'client'`

## 4. Testar Conexão

```javascript
// Teste no console do navegador
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'SUA_URL_AQUI',
  'SUA_CHAVE_AQUI'
)

// Testar conexão
supabase.from('appointments').select('*').then(console.log)
```
