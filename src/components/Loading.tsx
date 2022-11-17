import { Loader } from '@mantine/core'

export const Loading = () => {
  return (
    <div className="grid h-full min-h-screen w-full grid-rows-1 place-items-center">
      <Loader color="orange" size="xl" />
    </div>
  )
}
