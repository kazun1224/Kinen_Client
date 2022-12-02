import { createStyles, Container, Group, Anchor } from '@mantine/core'
import { SmokingNo } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },


}))

interface FooterSimpleProps {
  links: { link: string; label: string }[]
}

export const FooterComponent = () => {
  const { classes } = useStyles()
  const links = [{ link: 'aa', label: 'ddd' }]
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <Container className="inner  flex justify-between items-center py-5">
        <SmokingNo size={28} />
        <Group >{items}</Group>
      </Container>
    </div>
  )
}
