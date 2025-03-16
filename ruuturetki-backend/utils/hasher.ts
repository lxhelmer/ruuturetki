import bcrypt from 'bcrypt'

export const hash_pswd = async (password: string) => {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}
