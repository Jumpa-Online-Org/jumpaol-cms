import React, { lazy } from 'react'
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
  const [posts, setPosts] = React.useState(null)
  const baseURL = 'https://api-jumpaol.herokuapp.com/api/posts'
  React.useEffect(() => {
    axios.get(baseURL).then((res) => {
      setPosts(res.data.data)
    })
  }, [])
  return (
    <>
      <CRow>
        <CCol lg="12">
          <CCardGroup className="mb-4">
            <CWidgetProgressIcon
              header={posts.total}
              text="Posts"
              color="gradient-info"
              inverse
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
