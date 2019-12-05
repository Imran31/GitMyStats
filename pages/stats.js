import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import BasicInfo from '../components/BasicInfo';
import CoreInfo from '../components/CoreInfo';
import Footer from '../components/Footer';


const Stats = (props) => {

    return (
        <div>
            <Layout />
            <BasicInfo data = { props.basicData }/>
            <CoreInfo repoData = { props.repoData } username = { props.username }/>
            <Footer />
        </div>
    )
}

Stats.getInitialProps = async function(context) {
    console.log('Fetching...');
    const username = context.query.login;
    console.log(username)
    console.log(username)
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    const { repos_url } = data;
    
    const repoRes = await fetch(repos_url);
    const repoData = await repoRes.json();

    console.log(repoData);
    console.log(`Show data fetched. Count: ${repoData.length}`);

    return {
        basicData: data,
        repoData: repoData,
        username: username
    };
};

  
export default Stats;