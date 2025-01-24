
const githubBaseUrl = process.env.REACT_APP_API_URL+"/api/v1/github"
const jiraBaseUrl = process.env.REACT_APP_API_URL+"/api/v1/jira"
const integrationBaseUrl = process.env.REACT_APP_API_URL+"/api/v1/integrations"


export const extractGithubAccessToken = async (code) => {
    try {
        
        const accessTokenUrl = githubBaseUrl+"/access_token";
        
        const body = {code,callBackUrl:process.env.REACT_APP_GITHUB_REDIRECT_URL};

        const response = await fetch(accessTokenUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(body)
        });

        const data = await response.json();

        return {data,success:response.ok};
        
    } catch (err) {
        console.log(err);
    }
}

export const extractJiraAccessToken = async (code) => {
    try {
        
        const accessTokenUrl = jiraBaseUrl+"/access_token";
        
        const body = {code,callBackUrl:process.env.REACT_APP_JIRA_REDIRECT_URL};

        const response = await fetch(accessTokenUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(body)
        });

        const data = await response.json();

        return {data,success:response.ok};
        
    } catch (err) {
        console.log(err);
    }
}

export const saveIntegration = async(bodyData,type) =>{
    try {
        
        const githubIntegrationUrl = integrationBaseUrl+"/createOrUpdate";
        

        let body;

        if(type==="GITHUB"){
            body = {githubIntegration:bodyData}
        }
        else if(type==="JIRA"){
            body = {jiraIntegration:bodyData}
        }

        const response = await fetch(githubIntegrationUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(body)
        });

        const data = await response.json();

        return {data,success:response.ok};
        
    } catch (err) {
        console.log(err);
    }
}


export const removeIntegration = async(type) =>{
    try {
        
        const githubIntegrationUrl = integrationBaseUrl+`/remove/${type}`;

        const response = await fetch(githubIntegrationUrl,{
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        return {data,success:response.ok};
        
    } catch (err) {
        console.log(err);
    }
}

