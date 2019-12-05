const Style = () => {
    return (
        <div>
        <style jsx global>
                    {`
                        .basic-info {
                        padding: 3em;
                        background: black
                        }

                        .name {
                        color: white;
                        }

                        .login {
                        color: #00ffd9;
                        }

                        .login:hover {
                            color: #00ffd9;
                            text-decoration: none; /* no underline */
                          }

                        .avatar {
                        width: 10%;
                        border-radius: 100%;
                        padding: 1.5em;
                        }

                        .basic-data {
                        padding: 1.1em;
                        }

                        .basic-stat {
                        padding: 1.1em;
                        border: 1px solid white;
                        margin: 1.1em;
                        display:inline-block;
                        min-width: 10%;
                        max-width: 50%;
                        }

                        .group {
                        padding: 1.4em;
                        }

                        .icon-group {
                        padding-top: 1.1em;
                        }

                        .number {
                        font-size: 1.3em;
                        }
                        
                    `}
            </style> 
        </div>
    )
}

export default Style;

