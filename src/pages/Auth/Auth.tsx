import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from 'firebase/auth'
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter'
import { app } from '../../firebase'
import { useUserContext } from '../../contexts/userContext'

type AuthProps = {
   authState: 'login' | 'signup'
}

type FormInputs = {
   userName: string
   email: string
   password: string
}

function Auth({ authState }: AuthProps) {
   const { setUser } = useUserContext()
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const navigate = useNavigate()

   const validation = yup.object().shape({
      userName:
         authState === 'signup'
            ? yup.string().required('Please enter your username.')
            : yup.string(),
      email: yup
         .string()
         .email('Your email is not valid.')
         .required('Please enter your email.'),
      password: yup
         .string()
         .required('Please enter your password.')
         .min(8, 'Your password is too short.'),
   })

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormInputs>({
      resolver: yupResolver(validation),
      defaultValues: {
         userName: '',
         email: '',
         password: '',
      },
   })

   const auth = getAuth(app)

   const onSubmit: SubmitHandler<FormInputs> = ({ email, password }) => {
      setIsLoading(true)
      setError('')

      if (authState === 'signup') {
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const { user: u } = userCredential as { user: { email: string } }

               setUser(u)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      } else if (authState === 'login') {
         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const { user: u } = userCredential as { user: { email: string } }

               setUser(u)
               navigate('/')
               setIsLoading(false)
            })
            .catch((e) => {
               const errorMessage = e.message

               setError(errorMessage)
               setIsLoading(false)
            })
      }
   }

   return (
      <Form
         className='p-4'
         onSubmit={handleSubmit(onSubmit)}
      >
         {authState === 'signup' && (
            <Form.Group
               className='mb-3'
               controlId='userName'
            >
               <Form.Label>Username</Form.Label>
               <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <Form.Control
                           type='text'
                           placeholder='Enter username'
                           onChange={onChange}
                           onBlur={onBlur}
                           value={value}
                        />
                        {errors.userName && (
                           <Form.Text>{errors.userName.message}</Form.Text>
                        )}
                     </>
                  )}
                  name='userName'
               />
            </Form.Group>
         )}
         <Form.Group
            className='mb-3'
            controlId='email'
         >
            <Form.Label>Email address</Form.Label>
            <Controller
               control={control}
               render={({ field: { onChange, onBlur, value } }) => (
                  <>
                     <Form.Control
                        type='email'
                        placeholder='Enter email'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                     />
                     {errors.email && (
                        <Form.Text>{errors.email.message}</Form.Text>
                     )}
                  </>
               )}
               name='email'
            />
         </Form.Group>
         <Form.Group
            className='mb-3'
            controlId='password'
         >
            <Form.Label>Password</Form.Label>
            <Controller
               control={control}
               render={({ field: { onChange, onBlur, value } }) => (
                  <>
                     <Form.Control
                        type='password'
                        placeholder='Password'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                     />
                     {errors.password && (
                        <Form.Text>{errors.password.message}</Form.Text>
                     )}
                  </>
               )}
               name='password'
            />
         </Form.Group>
         {error && (
            <Alert
               variant='danger'
               className='py-2'
            >
               {error}
            </Alert>
         )}
         <Button
            variant='primary'
            type='submit'
            disabled={isLoading}
         >
            {capitalizeFirstLetter(authState)}
         </Button>
      </Form>
   )
}

export default Auth
