
import { message } from 'antd';
import { Github, Slack } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaJira } from 'react-icons/fa';
import { removeIntegration } from '../../api/Integration';

const IntegrationCard = (props) => {
    const { integration,data } = props;


    const [isGithub, setIsGithub] = useState(false);
    const [isSlack, setIsSlack] = useState(false);
    const [isJira, setIsJira] = useState(false);
 

    const name=integration.name;

    
    const handleConnect = async (e) => {
        e.preventDefault();

        if (name === "Github") {
            if(isGithub){
                const response = await removeIntegration("github");
                if(response.success){

                    message.info(response.data.data);
                    message.info("Redirecting to GitHub. Please uninstall the GitHub app from your account as well.");

                    setTimeout(function() {
                        const url = process.env.REACT_APP_GITHUB_APP;
                        window.open(url, 'GitHubPopup', 'width=800,height=600,scrollbars=yes,resizable=yes');
                    }, 3000);
                }
                else{
                    message.error(response.data.message);
                }
                setIsGithub(false);
                return;
            }
            const url = process.env.REACT_APP_GITHUB_APP;
            // window.open(url, '_blank', 'width=800,height=600,left=200,top=200,resizable=yes');
            window.location.href = url;
        }

        else if(name === "Jira"){
            if(isJira){
                const response = await removeIntegration("jira");
                if(response.success){
                    message.info(response.data.data);
                }else{
                    message.error(response.data.message);
                }
                setIsJira(false);
                return;
            }
            const url = process.env.REACT_APP_JIRA_APP;
            // window.open(url, '_blank', 'width=800,height=600,left=200,top=200,resizable=yes');
            window.location.href = url;
        }
    };

    useEffect(()=>{
        const isGithub = data && data.githubIntegration;
        const isSlack = data && data.slackToken;
        const isJira = data && data.jiraIntegration;
        setIsGithub(isGithub!==null)
        setIsSlack(isSlack!==null)
        setIsJira(isJira!=null);
    },[data])


    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-slate-400">
            <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                    {integration.name==="Github"?<Github />:integration.name==="Slack"?<Slack />:<FaJira className='mt-1'/>}
                    <div className=" font-medium text-gray-300">
                        {integration.name}
                    </div>
                </div>
                {/* Connect button */}
                <div className="text-sm">
                    <button
                        className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 font-bold focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleConnect} // Example action
                    >
                        {(name==="Github" && !isGithub) || (name==="Jira" && !isJira) || (name=="Slack" && !isSlack)?"Connect":"Disconnect"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IntegrationCard;
