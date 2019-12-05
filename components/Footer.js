const Footer = () => {
    return (
        <div className="container-fluid footer">
            <div className="row">
                <div className="col-md-12">
                    <div className="links">
                        <span className="built">Built with</span>
                        <a className="link" href="https://nextjs.org/">Next.js</a>
                        <a className="link" href="https://github.com/jerairrest/react-chartjs-2">Chart.js</a>
                        <a className="link" href="https://bootswatch.com/lux/">Bootswatch</a>
                        <a className="link" href="https://developer.github.com/v3/users/">GitHub API</a>
                        <a className="link" href="https://github.com/primer/octicons/tree/master/lib/octicons_react">Octicons</a>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .footer {
                        background: black;
                        padding: 1.5em;
                        margin-top: 2em;
                    }

                    .links {
                        text-align: center;
                    }

                    .link {
                        color: #00ffd9;
                        padding: 10px;
                    }

                    .link:hover {
                        color: #00ffd9;
                        text-decoration: none;
                    }

                    .built {
                        padding: 10px;
                    }
                `}
            </style>
        </div>
    )
}

export default Footer;