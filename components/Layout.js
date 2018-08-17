import Header from './Header'
import Head from 'next/head';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div className='container'>
    <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <title>ScreenShooter</title>
    </Head>
    {
        props.children // props.children is an object with all the components inside <Layout/>
    } 
    {style}
  </div>
)

const style = (
    <style jsx>{`
        h1, a {
        font-family: "Arial";
        }

        ul {
        padding: 0;
        }

        li {
        list-style: none;
        margin: 5px 0;
        }

        a {
        text-decoration: none;
        color: blue;
        }

        a:hover {
        opacity: 0.6;
        }
    `}
    </style>
)



export default Layout