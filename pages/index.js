import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.movie.imdbID}`} href={`/post?id=${props.movie.imdbID}`}>
      <a>{props.movie.Title}</a>
    </Link>
  </li>
)

const Index = (props) => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {
        props.movies.map((movie) => (
          <PostLink movie={movie} key={movie.imdbID} />
        ))
      }
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('http://www.omdbapi.com/?s=batman')
  const data = await res.json()

  console.log(`Movie data fetched. Count: ${data.Search.length}`)

  return {
    movies: data.Search
  }
}

export default  Index;
