import Layout from '../components/Layout';
import BasicInfo from '../components/BasicInfo';

const Index = (props) => {
    return (
        <div>
            <p>{props.data.name}</p>
            <p>{props.data.login}</p>
            <p>{props.data.public_repos}</p>
            <p>{props.data.followers}</p>
            <p>{props.data.location}</p>
            <p>{props.data.created_at}</p>
            <p>{props.data.avatar_url}</p>
            <p>Hello</p>
        </div>
    )
}

Index.getInitialProps = async function() {
    console.log('Fetching...')
    const res = await fetch('https://api.github.com/users/imran31');
    const data = await res.json();
    console.log(data);
    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        data
    };
};
  
export default Index;