import useForm from '../lib/useForm'
import { useMutation } from '@apollo/client'
import Form from './styles/Form'
import gql from 'graphql-tag'
import DisplayError from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from './Products'
import Router from 'next/router'

const CREAT_PRODUCT_MUTATION = gql`
  mutation CREAT_PRODUCT_MUTATION(
    #Which variables are getting passed in? and what types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'jorge',
    price: 1000,
    description: 'These are the best shoes',
  })

  const [createProduct, { loading, error, data }] = useMutation(
    CREAT_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  )

  async function handleSubmit(e) {
    e.preventDefault()
    //submit the inputfields to he backend
    const res = await createProduct()
    clearForm()
    //Go to that product's page!
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input
            required
            type='file'
            id='image'
            name='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            type='text'
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  )
}
