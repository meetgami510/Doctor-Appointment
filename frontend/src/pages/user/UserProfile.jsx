import React from 'react'
import PersonalDetails from '../../components/Profile/PersonalDetails'
import Layout from '../../components/Layout/Layout'

function UserProfile({ axiosInstance }) {
    return (
        <Layout axiosInstance={axiosInstance}>
            <PersonalDetails axiosInstance={axiosInstance} />
        </Layout>
    )
}

export default UserProfile