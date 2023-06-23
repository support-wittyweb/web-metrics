import {Icon, Text, Row, Column } from 'react-basics';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import ThemeButton from 'components/input/ThemeButton';
import LanguageButton from 'components/input/LanguageButton';
import ProfileButton from 'components/input/ProfileButton';
import styles from './NavBar.module.css';
import useConfig from 'hooks/useConfig';
import useMessages from 'hooks/useMessages';
import { useRouter } from 'next/router';
import HamburgerButton from '../common/HamburgerButton';

export function NavBar() {
  const { pathname } = useRouter();
  const { cloudMode } = useConfig();
  const { formatMessage, labels } = useMessages();

  const links = [
    { label: formatMessage(labels.dashboard), url: '/dashboard' },
    { label: formatMessage(labels.realtime), url: '/realtime' },
    !cloudMode && { label: formatMessage(labels.settings), url: '/settings' },
  ].filter(n => n);

  return (
    <div className={classNames(styles.navbar)}>
      <Row>
        <Column className={styles.left}>
          <div className={styles.logo}>
              {/* <Image
                src="/images/logo/web-metrics-logo.png"
                alt="Logo"
                width={200}
              />
            <Text className={styles.text}>web metrics</Text> */}
             <Icon size="lg">
             <Image
                src="/images/logo/web-metrics-favicon.png"
                alt="Logo"
                width={30}
              />
            </Icon>
          {/* <Text className={styles.text}>web metrics</Text> */}
          <Text className={styles.text}> Web <span className={styles.span}>Metrics</span></Text>
          </div>
          <div className={styles.links}>
            {links.map(({ url, label }) => {
              return (
                <Link
                  key={url}
                  href={url}
                  className={classNames({ [styles.selected]: pathname.startsWith(url) })}
                >
                  <Text>{label}</Text>
                </Link>
              );
            })}
          </div>
        </Column>
        <Column className={styles.right}>
          <div className={styles.actions}>
            <ThemeButton />
            <LanguageButton />
            <ProfileButton />
          </div>
          <div className={styles.mobile}>
            <HamburgerButton />
          </div>
        </Column>
      </Row>
    </div>
  );
}

export default NavBar;
