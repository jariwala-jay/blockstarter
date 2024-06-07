import React from 'react';
import Layout from '../src/app/components/Layout';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default () => {
    return (
        <Layout>
            <div className="flex flex-col items-center font-nanum mb-[30px]">
                <h1 className="text-3xl mt-6 mb-4 font-kanit font-semibold">Updates Page</h1>
                <div className="flex flex-col flex-wrap overflow-x-auto no-scrollbar">
                    <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 m-4 min-w-[200px] max-w-[800px] shadow-md">
                        <h3 className="text-xl mb-2 text-black">Update #1: Project Milestone Reached</h3>
                        <p className="text-base leading-6 mb-4 text-black">We're excited to announce that we've reached a major milestone in our project development! We've completed the first phase of development and are now moving onto the next phase. Thank you to all of our backers for your support!</p>
                    </div>
                    <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 m-4 min-w-[200px] max-w-[800px] shadow-md">
                        <h3 className="text-xl mb-2 text-black">Update #2: New Partnership Announced</h3>
                        <p className="text-base leading-6 mb-4 text-black" >We're thrilled to announce that we've partnered with a leading blockchain development firm to help us bring our project to the next level. With their expertise and support, we're confident that we can deliver a high-quality product that meets the needs of our community.</p>
                    </div>
                    <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 m-4 min-w-[200px] max-w-[800px] shadow-md">
                        <h3 className="text-xl mb-2 text-black ">Update #3: Alpha Release Coming Soon</h3>
                        <p className="text-base leading-6 mb-4 text-black">We're getting ready to release our alpha version of the platform in the coming weeks. This release will give our backers an early look at the platform and allow us to gather valuable feedback to improve the product before the official launch.</p>
                    </div>
                    <div className="flex flex-col items-center  bg-[#eefdfe] rounded-lg p-4 m-4 min-w-[200px] max-w-[800px] shadow-md">
                        <h3 className="text-xl mb-2 text-black ">Update #4: Funding Goal Reached</h3>
                        <p className="text-base leading-6 mb-4 text-black">We're thrilled to announce that we've reached our funding goal! This is a major milestone for our project and we couldn't have done it without the support of our backers. We're now able to fully fund the development and launch of our platform.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
