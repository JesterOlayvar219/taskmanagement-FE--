import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from '@/auth'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

  } catch(error) {
    if (error.type === 'CredentialsSignin') {
      
    }
  }
}