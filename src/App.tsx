import React from "react";
import { AuthProvider } from "./context/Auth";
import { ToastProvider } from "react-toast-notifications";
import Body from "./components/Body";

function App() {
  return (
    <AuthProvider>
      <ToastProvider autoDismiss={true} placement="bottom-right">
        <Body />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
