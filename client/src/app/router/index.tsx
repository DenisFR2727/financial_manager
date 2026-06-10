import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@app/layouts';
import { DashboardPage } from '@pages/dashboard';
import { ExpensesPage } from '@pages/expenses';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Route>
    </Routes>
  );
}
