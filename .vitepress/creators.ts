export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: 'RETAP',
    avatar: '',
    username: 'R1TAP',
    title: '博客构建者？',
    desc: '时光总能消磨忧郁，晴天也会如期而至。',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/R1TAP' },
      { type: 'twitter', icon: 'twitter', link: 'https://x.com/RETAP_SMS' },
    ],
    nameAliases: ['RE', 'RETAP'],
    emailAliases: ['retap1122@outlook.com'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
