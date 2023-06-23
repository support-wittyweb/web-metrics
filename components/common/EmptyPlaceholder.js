import { Icon, Text, Flexbox } from 'react-basics';
import Logo from 'assets/logo.svg';
import Image from 'next/image';

export function EmptyPlaceholder({ message, children }) {
  return (
    <Flexbox direction="column" alignItems="center" justifyContent="center" gap={60} height={600}>
      <Icon size="xl">
        {/* <Logo /> */}
        <Image
            src="/images/logo/web-metrics-favicon.png"
            alt="Logo"
            width={30}
          />
      </Icon>
      <Text size="lg">{message}</Text>
      <div>{children}</div>
    </Flexbox>
  );
}

export default EmptyPlaceholder;
