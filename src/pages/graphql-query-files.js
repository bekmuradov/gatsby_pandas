import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const ListLink = props => <Link to={"/" + props.to} style={{textDecoration: `none`}}>{props.children}</Link>

export default function MyFiles({ data }) {
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
              <th>changeTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>
                    <ListLink to={node.name}>{node.name}</ListLink>
                </td>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.ext}</td>
                <td>{node.birthTime}</td>
                <td>{node.changeTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {relativeDirectory: {eq: "pages"}}
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          birthTime(fromNow: true)
          name
          relativePath
          prettySize
          ext
          changeTime(fromNow: true)
          relativeDirectory
        }
      }
    }
  }
`
