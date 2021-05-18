import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import DisplayError from './ErrorMessage'
import Head from 'next/head'
import styled from 'styled-components'

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;

    object-fit: contain;
  }
`

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`
// to rename a query just put the name in front of them. Ex: items: Product(where ...)

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: id,
    },
  })
  if (loading) return <p>Loading..</p>
  if (error) return <DisplayError error={error} />
  const { Product: items } = data
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {items.name}</title>
      </Head>
      <img
        src={items.photo.image.publicUrlTransformed}
        alt={items.photo.altText}
      />
      <div className='details'>
        <h2>{items.name}</h2>
        <p>{items.description}</p>
      </div>
    </ProductStyles>
  )
}
