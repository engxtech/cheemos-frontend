import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { extractAccessToken, extractGithubAccessToken, extractJiraAccessToken, saveGithubIntegration, saveIntegration } from '../../api/Integration';


const IntegrationCallBack = () => {
    const { provider } = useParams(); // Capture the provider (e.g., github, google, etc.)
    const location = useLocation(); // Get the current location (URL)
    const [code, setCode] = useState(null); // State for the code (string or null)
    const navigate = useNavigate();


    const exportAccessToken = async (code) => {

        if (provider === "github") {

            if (!code) {
                message.error("Code not found");
                return;
            }

            const response = await extractGithubAccessToken(code);

            if (!response.success) {
                message.info(response.data.message);
                return;
            }
            const saveGithubIntegrationResponse = await saveIntegration(response.data,"GITHUB");
            navigate("/integrations");
            if (!saveGithubIntegrationResponse.success) {
                message.info(saveGithubIntegrationResponse.data.message);
                return;
            }
            message.info("Github successfully integrated.");
        }
        
        else if(provider === "jira"){
            if (!code) {
                message.error("Code not found");
                return;
            }

            const response = await extractJiraAccessToken(code);

            if (!response.success) {
                message.info(response.data.message);
                return;
            }
            const saveGithubIntegrationResponse = await saveIntegration(response.data,"JIRA");
            navigate("/integrations");
            if (!saveGithubIntegrationResponse.success) {
                message.info(saveGithubIntegrationResponse.data.message);
                return;
            }
            message.info("Jira successfully integrated");
        }
    }

    useEffect(() => {
        // Extract the 'code' query parameter from the URL
        const urlParams = new URLSearchParams(location.search);
        const extractedCode = urlParams.get('code');
        setCode(extractedCode);
        exportAccessToken(extractedCode);
    }, [location.search]);

    return (
        <div>
            <h2>{provider} Authentication Callback</h2>
            <p>Provider: {provider}</p>
            <p>Extracted Code: {code ? code : 'No code found'}</p>
        </div>
    );
}

export default IntegrationCallBack
