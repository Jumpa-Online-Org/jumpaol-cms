import React from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
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
  const [posts, setPosts] = React.useState(null)
  const [page, setPage] = React.useState(1)

  const history = useHistory()
  const baseURL = 'https://api-jumpaol.herokuapp.com/api/posts'
  const fields = [
    { key: 'post_title', label: 'Judul'},
    { key: 'author_name', label: 'Penulis'},
    // { key: 'post_category' },
    { key: 'post_date', label: 'Tanggal Terbit' },
    { key: 'views' },
    { key: 'comment_count', label: 'Comment' },
    { key: 'action', label: '' },
  ]

  React.useEffect(() => {
    async function getPost() {
      setPosts({})
      const response = await axios.get(`${baseURL}?q=&page=${page}&per_page=10`)
      const tes = response?.data?.data?.data.map((item) => ({
        ...item,
        author_name: item.author.display_name,
      }))

      const data = {...response.data.data, data: tes}
      // console.log('data '+data)
      setPosts(data);
    }
    getPost();
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


  const handleChangePage = (index) => {
    setPage(index)
  }

  if (!posts) return "No Posts!"


  return (
    <div className>
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
