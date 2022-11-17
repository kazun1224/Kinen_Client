import z from 'zod'
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Alert,
  Anchor,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AlertCircle, Database, SmokingNo } from 'tabler-icons-react'
import axios from 'axios'
import { CustomNextPage } from 'next'
import { Layout } from 'src/layouts'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(5, { message: 'You must be at least 18 to create an account' }),
})

const Home: CustomNextPage = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
     validate: zodResolver(schema),
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //   confirmPassword: (value, values) =>
    //     value !== values.password ? 'Passwords did not match' : null,
    // },
  })

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`)
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      })
      form.reset()
      router.push('/main')
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }
  return (
    <div>
      <SmokingNo size={48} strokeWidth={2} color={'#fff'} />;
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<AlertCircle size={48} strokeWidth={2} color={'#e6b4b3'} />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            id="email"
            label="Email*"
            placeholder="example@gmail.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mt="md"
            id="password"
            placeholder="password"
            label="Password*"
            description="Must be min 5 char"
            {...form.getInputProps('password')}
          />
          <Group mt="xl" position="apart">
            <Anchor
              component="button"
              type="button"
              size="xs"
              className="text-gray-300"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >
              {isRegister
                ? 'Have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              leftIcon={<Database size={48} strokeWidth={2} color={'#fff'} />}
              color="cyan"
              type="submit"
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
