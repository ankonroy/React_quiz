import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
// import Checkbox from '../components/checkbox/Checkbox';
import { useAuth } from '../../context/AuthContext';
import Form from '../form/Form';
import TextInput from '../textInput/TextInput';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError('Failed to login!');
    }
  }
  return (
    <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
      {/* <TextInput type="text" placeholder="Enter name" icon="person" /> */}
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <TextInput
            type="password"
            placeholder="Confirm password"
            icon="lock_clock"
          /> */}
      {/* <Checkbox text="I agree to the Terms & Conditions" /> */}
      <Button type="submit" disabled={loading}>
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don&apos;t have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
