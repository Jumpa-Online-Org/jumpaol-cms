import React from 'react'
import axios from 'axios'
import {
  CCol,
  CRow,
  CCardGroup,
  CWidgetProgressIcon
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import MainChartExample from '../charts/MainChartExample.js'

// const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const [posts, setPosts] = React.useState()
  const baseURL = 'https://api-jumpaol.herokuapp.com/api/posts'

  React.useEffect(() => {
    setPosts({})
    async function getPost() {
      axios.get(baseURL).then((res) => {
        setPosts(res.data.data)
      })
    }
    getPost();
  },[])

  if (!posts) return "No Posts!"

  return (
    <>
      <CRow>
        <CCol lg="12">
          <CCardGroup className="mb-4">
            <CWidgetProgressIcon
              header={!posts.data ? `...` : `${posts.total}`}
              text="Posts"
              color="gradient-primary"
              // inverse
            >
              <CIcon name="cil-people" height="36"/>
            </CWidgetProgressIcon>
          </CCardGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
