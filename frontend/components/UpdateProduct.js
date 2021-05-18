import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

export default function UpdateProduct({ id }) {
  //Get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  })

  // Get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)
  // Form to handle the updates

  //Create some state for the form input
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product)
  if (loading) return <p> loading ...</p>
  async function handleSubmit(e) {
    e.preventDefault()
    const res = await updateProduct({
      variables: {
        id: id,
        name: inputs.name,
        price: inputs.price,
        description: inputs.description,
      },
    })
    // TODO: handle submit
    // //submit the inputfields to he backend
    // const res = await createProduct()
    // clearForm()
    // //Go to that product's page!
    // Router.push({
    //   pathname: `/product/${res.data.createProduct.id}`,
    // })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={updateError || error} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  )
}
