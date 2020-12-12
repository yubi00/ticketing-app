import buildClient from '../api/build-client';

const LandingPage = () => {
  return <div>Welcome to BuchuTicketing</div>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
