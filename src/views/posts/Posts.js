import React from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from "../../store/actions/postAction";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Posts = () => {
  // const [posts, setPosts] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const posts = useSelector(state => state?.postReducer.posts)
  // const isLoading = useSelector(state => state?.postReducer.isLoading)
  const dispatch = useDispatch()
  // const pattern = /([0-9]){4}(\-)([0-9]){2}(\-)([0-9]){2}/
  // console.log(text.match(pattern)[0])

  const history = useHistory()
  const baseURL = 'https://api-jumpaol.herokuapp.com/api/posts'
  const fields = [
    { key: 'post_title', label: 'Judul', _style: {width: '40%'}},
    { key: 'author_name', label: 'Penulis', _style: {width: '20%'}},
    // { key: 'post_category' },
    { key: 'display_date', label: 'Tanggal Terbit', _style: {width: '20%'}},
    { key: 'views', _style: {width: '5%'}},
    { key: 'comment_count', label: 'Comment', _style: {width: '5%'}},
    { key: 'action', label: '', _style: {width: '10%'}},
  ]

  React.useEffect(() => {
    dispatch(getPosts(page))
  }, [page])

  const handleAddPost = () => {
    history.push({
      pathname: '/posts/formpost',
      state: {typeForm: 'add'}
    });
  }

  const handleEditPost = (id) => {
    history.push({
      pathname: '/posts/formpost',
      state: {typeForm: 'edit', id: id}
    });
  }

  const handleDeletePost = (id) => {
    axios.delete(`${baseURL}/${id}`).then((res) => {
      // console.log(res.data)
      history.push('/posts')
    })
  }

  // if (!posts.data) return "No Posts!"

  return (
    <div>
      {/* {console.log(posts)} */}
      <CRow className="mt-3">
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="2" lg="2">
                  <CButton block color="primary" onClick={handleAddPost}>Add Post</CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={posts.data}
              fields={fields}
              // columnFilter
              tableFilter
              striped
              // itemsPerPageSelect
              // itemsPerPage={10}
              sorter
              loading={!posts.data ? true : false}
              // pagination
              scopedSlots = {{
                'action':
                  (item, index) => {
                    return (
                      <td>
                        <CButton block outline="true" color="warning" size="sm" onClick={() => handleEditPost(item.id)}>
                          <CIcon name="cil-pencil" />
                        </CButton>
                        <CButton block outline="true" color="danger" size="sm" onClick={() => handleDeletePost(item.id)}>
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    )
                  }
              }}
            />
            <CPagination
              activePage={page}
              pages={parseInt(posts.total_pages)}
              onActivePageChange={(i) => {
                setPage(i)
              }}
            ></CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Posts
