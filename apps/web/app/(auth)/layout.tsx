interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-svh">
      {children}
    </div>
  )
}

export default Layout