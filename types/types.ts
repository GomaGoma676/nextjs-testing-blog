interface TAG {
  id: number
  name: string
}
export interface POST {
  id: number
  title: string
  content: string
  username: string
  tags: TAG[]
  created_at: string
}
