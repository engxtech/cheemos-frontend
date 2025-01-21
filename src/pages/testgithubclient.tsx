export function GitHubLoginButton() {
  const loginWithGitHub = () => {
      const clientID = 'Iv23li6HD94M5Oz81hhu';
      const redirectURI = 'http://localhost:3000/auth/github/callback';
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return <button onClick={loginWithGitHub}>Login with GitHub</button>;
}