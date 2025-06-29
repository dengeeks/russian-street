import { useState, useEffect, useCallback } from 'react'
import { getTeam } from '@/shared/api/team/getTeam'
import { TeamListType } from '@/shared/api/team/type'

export function useTeam() {
  const [teamList, setTeamList] = useState<TeamListType>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeMemberIndex, setActiveMemberIndex] = useState(0)

  const fetchTeam = useCallback(async () => {
    const data = await getTeam()
    const filtered = data.filter(cat => cat.team_members?.length)
    setTeamList(filtered)

    if (filtered.length > 0) {
      setSelectedCategory(filtered[0].team_type)
    }
  }, [])

  useEffect(() => {
    void fetchTeam()
  }, [fetchTeam])

  useEffect(() => {
    setActiveMemberIndex(0)
  }, [selectedCategory])

  const currentCategory = teamList.find(cat => cat.team_type === selectedCategory)
  const members = currentCategory?.team_members || []

  return {
    teamList,
    members,
    setSelectedCategory,
    activeMemberIndex,
    setActiveMemberIndex,
  }
}
