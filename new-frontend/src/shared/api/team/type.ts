export type TeamMember = {
  id: string
  first_name: string
  last_name: string
  info: string
  image: string
}

export type TeamCategory = {
  team_type: string
  team_members: TeamMember[]
}

export type TeamListType = TeamCategory[]
