import { Card } from '@material-ui/core'
import { appCardColor } from '../helpers/constant'

function MyCard({ children }) {
  return (
    <Card
      raised
      style={{
        backgroundColor: appCardColor,
        marginTop: 15,
        marginBottom: 15,
        padding: '10px 20px',
        borderRadius: 10,
      }}
    >
      {children}
    </Card>
  )
}

export default MyCard
