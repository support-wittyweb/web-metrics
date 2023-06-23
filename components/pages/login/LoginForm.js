import { useMutation } from '@tanstack/react-query';
import {
  Form,
  FormRow,
  FormInput,
  FormButtons,
  TextField,
  PasswordField,
  SubmitButton,
  Icon,
} from 'react-basics';
import { useRouter } from 'next/router';
import useApi from 'hooks/useApi';
import { setUser } from 'store/app';
import { setClientAuthToken } from 'lib/client';
import useMessages from 'hooks/useMessages';
import Image from 'next/image';
import styles from './LoginForm.module.css';

export function LoginForm() {
  const { formatMessage, labels, getMessage } = useMessages();
  const router = useRouter();
  const { post } = useApi();
  const { mutate, error, isLoading } = useMutation(data => post('/auth/login', data));

  const handleSubmit = async data => {
    mutate(data, {
      onSuccess: async ({ token, user }) => {
        setClientAuthToken(token);
        setUser(user);

        await router.push('/dashboard');
      },
    });
  };

  return (
    <div className={styles.login}>
      {/* <Image
          src="/images/logo/web-metrics-logo.png"
          alt="Logo"
          width={200}
        /> */}
        <Icon className={styles.icon} size="xl">
          <Image
              src="/images/logo/web-metrics-favicon.png"
              alt="Logo"
              width={30}
            />
        </Icon>
        <div className={styles.title}>Web <span className={styles.span}>Metrics</span></div>
      <Form className={styles.form} onSubmit={handleSubmit} error={getMessage(error)}>
        <FormRow label={formatMessage(labels.username)}>
          <FormInput name="username" rules={{ required: formatMessage(labels.required) }}>
            <TextField autoComplete="off" />
          </FormInput>
        </FormRow>
        <FormRow label={formatMessage(labels.password)}>
          <FormInput name="password" rules={{ required: formatMessage(labels.required) }}>
            <PasswordField />
          </FormInput>
        </FormRow>
        <FormButtons>
          <SubmitButton className={styles.button} variant="primary" disabled={isLoading}>
            {formatMessage(labels.login)}
          </SubmitButton>
        </FormButtons>
      </Form>
    </div>
  );
}

export default LoginForm;
