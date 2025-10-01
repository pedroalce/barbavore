import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Usuário ou senha inválidos');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="E-mail" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
        disabled={loading}
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}