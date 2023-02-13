import { Alert, Button, Form } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter'
import { SignupFormInputs, useUserContext } from '../../contexts/userContext'

type AuthProps = {
   authState: 'login' | 'signup'
}

function Auth({ authState }: AuthProps) {
   const { error, isLoading, login, signup } = useUserContext()

   const validation = yup.object().shape({
      name:
         authState === 'signup'
            ? yup.string().required('Please enter your name.')
            : yup.string(),
      surname:
         authState === 'signup'
            ? yup.string().required('Please enter your surname.')
            : yup.string(),
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
   } = useForm<SignupFormInputs>({
      resolver: yupResolver(validation),
      defaultValues: {
         name: '',
         surname: '',
         userName: '',
         email: '',
         password: '',
      },
   })

   const onSubmit: SubmitHandler<SignupFormInputs> = ({
      name,
      surname,
      userName,
      email,
      password,
   }) => {
      if (authState === 'signup') {
         signup({ name, surname, userName, email, password })
      } else if (authState === 'login') {
         login({ email, password })
      }
   }

   return (
      <Form
         className='p-4'
         onSubmit={handleSubmit(onSubmit)}
      >
         {authState === 'signup' && (
            <>
               <Form.Group
                  className='mb-3'
                  controlId='name'
               >
                  <Form.Label>Name</Form.Label>
                  <Controller
                     control={control}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <>
                           <Form.Control
                              type='text'
                              placeholder='Enter name'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                           />
                           {errors.name && (
                              <Form.Text>{errors.name.message}</Form.Text>
                           )}
                        </>
                     )}
                     name='name'
                  />
               </Form.Group>
               <Form.Group
                  className='mb-3'
                  controlId='surname'
               >
                  <Form.Label>Surname</Form.Label>
                  <Controller
                     control={control}
                     render={({ field: { onChange, onBlur, value } }) => (
                        <>
                           <Form.Control
                              type='text'
                              placeholder='Enter surname'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                           />
                           {errors.surname && (
                              <Form.Text>{errors.surname.message}</Form.Text>
                           )}
                        </>
                     )}
                     name='surname'
                  />
               </Form.Group>
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
            </>
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
