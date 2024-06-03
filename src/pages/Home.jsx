import React from 'react'
import Layout from '../app/components/Layout'
import Hero from '../app/components/Hero'
import ProjectsHome from '../app/components/ProjectsHome'
import LearnMore from '../app/components/LearnMore'

const Home = () => {
    return (
        <Layout>
            <Hero/>
            <ProjectsHome/>
            <LearnMore/>
        </Layout>
    )
}

export default Home
