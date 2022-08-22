import { CircularProgress } from '@material-ui/core'

const Loading = props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress color={props.color} size={props.size} />
    </div>
  )
}

export default Loading
