import { Provider } from "react-redux";
import { store } from "@/store/index";
import { ThemeProvider } from "@/lib/theme";
import { AccessibilityProvider } from "@/lib/accessibility";
import { ChatPage } from "@/pages/ChatPage";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AccessibilityProvider>
          <ChatPage />
        </AccessibilityProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;