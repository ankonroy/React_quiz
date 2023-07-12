import Illustration from '../components/illustration/Illustration';
import LoginForm from '../components/loginForm/LoginForm';

export default function LogIn() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <LoginForm />
      </div>
    </>
  );
}
