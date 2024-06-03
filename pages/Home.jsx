import React from 'react'
import Layout from '../src/app/components/Layout'
import Hero from '../src/app/components/Hero'
import ProjectsHome from '../src/app/components/ProjectsHome'
import LearnMore from '../src/app/components/LearnMore'

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
