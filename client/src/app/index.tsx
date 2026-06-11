import { ThemeProvider } from "@shared/lib/theme";
import { AppProviders } from "@app/providers";
import { AppRouter } from "@app/router";

export function App() {
  return (
    <ThemeProvider>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ThemeProvider>
  );
}
