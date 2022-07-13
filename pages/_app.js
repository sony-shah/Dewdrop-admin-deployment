import Layout from '../component/admin/Layout'
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
      <Component {...pageProps} />
    // </Layout>
  )     
}

export default MyApp
