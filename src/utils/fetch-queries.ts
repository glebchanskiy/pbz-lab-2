

import type { Organization } from "db/queries"

export const fetchGetOrganizations = async () => {
  const response = await fetch('/api/organizations', { method: 'get' })
  const data = await  response.json()
  console.log(data)
  if (response.ok) {
   return (data) as Organization[]
  } 
}

export const fetchPostOrganization = async (organization: Organization) => {
  const response = await fetch('/api/organizations', {
    method: 'post',
    body: JSON.stringify(organization)
  })
 }

// export const fetchGameById = async (gameId: string, signal?: AbortSignal) => {
//   const response = await fetch(`/api/game/${gameId}`, { method: 'get', signal })
//   if (response.status === 200) {
//     return (await response.json()) as CGABotGameDetails
//   } else {
//     return undefined
//   }
// }

// export const postGameToCreatePost = async (postDetails: PostDetails): Promise<CreateRouteResponseDataInterface> => {
//   const response = await fetch('/api/posts/create', {
//     method: 'post',
//     body: JSON.stringify(postDetails)
//   })

//   const data = (await response.json()) as CreateRouteResponseDataInterface
//   return data
// }

// type Query = {
//   page?: number
//   limit?: number
//   searchText?: string
// }

// export const fetchPosts = async (query: Query) => {
//   let response = null
//   if (query.page !== undefined && query.limit !== undefined) {
//     response = await fetch(`/api/posts?page=${query.page}&limit=${query.limit}`, { method: 'get' })
//   } else if (query.searchText) {
//     response = await fetch(`/api/posts?searchText=${query.searchText}`, {
//       method: 'get'
//     })
//   } else {
//     return []
//   }

//   if (response.status === 200) {
//     return (await response.json()) as PostForCard[]
//   } else {
//     return []
//   }
// }
