import "bootswatch/dist/lux/bootstrap.min.css"; 

const Layout = (props) => {
    return (
        <div>
            { props.children }
        </div>
    )
}

export default Layout;