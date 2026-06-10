import { NavLink, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.scss';

const navItems = [
  { to: '/', label: 'Дашборд' },
  { to: '/expenses', label: 'Витрати' },
];

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Financial Manager</h1>
          <p>Контроль витрат</p>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink}${isActive ? ` ${styles.active}` : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
        <header className={styles.mobileHeader}>
          <h1>Financial Manager</h1>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>

        <nav className={styles.bottomNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.bottomNavLink}${isActive ? ` ${styles.active}` : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
