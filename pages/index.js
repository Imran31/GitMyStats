import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Router from 'next/router';
import { useState } from 'react';


const Form = () => {
    const [username, setUsername] = useState('');
    const handleChange = e => setUsername(e.target.value);

    return (
        <div className="main">
            <form onSubmit={ e => {
                                    e.preventDefault();
                                    Router.push({
                                        pathname: '/stats',
                                        query: { login: username },
                                    });
                                }
                }>
                <p className="text-center">Enter any Github username to visualize statistics</p>
                <fieldset>
                    <div className="form-group" align="center" >
                        <input name="username" className="form-control" type="text" onChange={ handleChange } />
                        <br></br>
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </fieldset>
            </form>
            <style jsx>
            {`
                .main {
                    margin-top: 100%;
                }
            `}
            </style>
        </div>
        
    )
}

const Index = (props) => {
    return (
        <div>
            <Layout>
                <div className="container">
                    <div className="col-md-4 offset-md-4">
                        <Form />
                    </div>
                    
                </div>
            </Layout> 
        </div>
    )
}
  
export default Index;