import { Provider } from "react-redux";
import { store } from "@/store/index";
import { ThemeProvider } from "@/lib/theme";
import { ChatPage } from "@/pages/ChatPage";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ChatPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;