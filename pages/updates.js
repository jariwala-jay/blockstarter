import React from 'react';
import Layout from '../src/app/components/Layout';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from './UpdatesPage.module.css';

export default () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Updates Page</h1>
                <div className={styles.updates}>
                    <div className={styles.update}>
                        <h3 className={styles.updateTitle}>Update #1: Project Milestone Reached</h3>
                        <p className={styles.updateDescription}>We're excited to announce that we've reached a major milestone in our project development! We've completed the first phase of development and are now moving onto the next phase. Thank you to all of our backers for your support!</p>
                    </div>
                    <div className={styles.update}>
                        <h3 className={styles.updateTitle}>Update #2: New Partnership Announced</h3>
                        <p className={styles.updateDescription}>We're thrilled to announce that we've partnered with a leading blockchain development firm to help us bring our project to the next level. With their expertise and support, we're confident that we can deliver a high-quality product that meets the needs of our community.</p>
                    </div>
                    <div className={styles.update}>
                        <h3 className={styles.updateTitle}>Update #3: Alpha Release Coming Soon</h3>
                        <p className={styles.updateDescription}>We're getting ready to release our alpha version of the platform in the coming weeks. This release will give our backers an early look at the platform and allow us to gather valuable feedback to improve the product before the official launch.</p>
                    </div>
                    <div className={styles.update}>
                        <h3 className={styles.updateTitle}>Update #4: Funding Goal Reached</h3>
                        <p className={styles.updateDescription}>We're thrilled to announce that we've reached our funding goal! This is a major milestone for our project and we couldn't have done it without the support of our backers. We're now able to fully fund the development and launch of our platform.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
