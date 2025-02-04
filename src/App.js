import { useEffect, useState } from "react";
import { CssVarsProvider, styled } from "@mui/joy/styles";
import globalTheme from "./theme";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AgentsDashboard from "./pages/agents/AllAgents";
import "./App.css";
import { CreateAgent } from "./pages/agents/createAgent/CreateAgent";
import AgentContent from "./content/AgentContent";
import ToolsGrid from "./pages/tools/AllTools";
import Knowledge from "./pages/knowledge/KnowledgeBase";
import IntegrationList from "./pages/integrations/AllIntegrations";
import AllTemplates from "./pages/templates/AllComponents";
import RightSignUp from "./pages/login/LoginForm";
import MultiStepForm from "./pages/login/MultiStepSignup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux";
import PaymentPage from "./pages/payments/VerifyPayment";
import { PythonSandbox } from "./pages/tools/EditTool";
import { OneTool } from "./pages/tools/OneTool";
import SettingsPage from "./pages/settings/SettingsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import GitHubLoginPage, { GitHubLoginButton } from "./pages/testgithubclient";
import IntegrationCallBack from "./pages/integrations/IntegrationCallBack";

const Root = styled("div")(({ theme }) => ({
  width: "100vw", // Corrected from "100wh" to "100vw" for width
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

function App() {
  const [loading, setLoading] = useState(true); // Add a loading state
  const [redirectPath, setRedirectPath] = useState(null); // Set to null initially
  const navigate = useNavigate();
  const location = useLocation().pathname;
  useEffect(() => {
    // Check dark mode setting in localStorage
    const isDarkMode = localStorage.getItem("darkmode") === "true";
    const body = document.body;

    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, []); 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setRedirectPath("/onboarding");
      setLoading(false); // Stop loading when there's no token
    } else {
      setRedirectPath("/templates");
      setLoading(false);
    }
  }, [location]);
  const RootRedirect = () => {
    useEffect(() => {
      if (!loading && redirectPath) {
        navigate(redirectPath); // Navigate only when loading is complete and redirectPath is set
      }
    }, [redirectPath, loading]);
  };


  return (
    <CssVarsProvider theme={globalTheme}>
      <Provider store={store} className="App ">
        <GoogleOAuthProvider clientId="613285431561-5m419bf7niu3fen55tus2eio4jugetqp.apps.googleusercontent.com">
          <Root>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/templates" element={<AllTemplates />} />
              <Route path="/agents" element={<AgentsDashboard />} />
              <Route path="/agents/:agentId/*" element={<AgentContent />} />
              <Route path="/integrations" element={<IntegrationList />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/tools" element={<ToolsGrid />} />
              <Route path="/tools/:toolId" element={<OneTool />} />
              <Route path="/tools/create-tool" element={<PythonSandbox />} />
              <Route path="/tools/edit-tool/:toolId" element={<PythonSandbox />} />
              <Route path="/agents/create-agent/*" element={<CreateAgent />} />
              <Route path="/onboarding" element={<RightSignUp />} />
              <Route path="/signup" element={<MultiStepForm />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/github" element={<GitHubLoginButton />} />
              <Route path="/payment/:agentId/:cloneType/*" element={<PaymentPage />} />
              <Route path="/auth/:provider/callback" element={<IntegrationCallBack />} />
            </Routes>
          </Root>
        </GoogleOAuthProvider>
      </Provider>
    </CssVarsProvider>
  );
}

export default App;
