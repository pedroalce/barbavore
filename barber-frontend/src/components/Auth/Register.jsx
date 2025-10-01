import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    birthDate: '',
    whatsapp: '',
    gender: 'masculino'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      setLoading(false);
      return;
    }

    const success = await register(formData);
    if (success) {
      setSuccess('Conta criada com sucesso! Verifique seu e-mail.');
    } else {
      setError('Erro ao criar conta');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Cadastro</h2>
      <input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="client">Cliente</option>
        <option value="barber">Barbeiro</option>
        <option value="admin">Administrador</option>
      </select>
      <input
        type="date"
        name="birthDate"
        placeholder="Data de nascimento"
        value={formData.birthDate}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="tel"
        name="whatsapp"
        placeholder="WhatsApp"
        value={formData.whatsapp}
        onChange={handleChange}
        disabled={loading}
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Criando conta...' : 'Cadastrar'}
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
}