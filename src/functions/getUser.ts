export type User = { email: string }

export default function getUser(): User {
   const user = JSON.parse(localStorage.getItem('user') || '')

   return user || { email: '' }
}
