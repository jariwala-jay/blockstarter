import React from 'react';
import Layout from '../app/components/Layout'
import styles from './CommunityPage.module.css';

export default function CommunityPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Join our community!</h1>
        <div className={styles.community}>
          <div className={styles.communityItem}>
            <img
              src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription01&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Tongue&skinColor=DarkBrown"
              alt="Community member avatar"
              className={styles.avatar}
            />
            <h3 className={styles.name}>John Smith</h3>
            <p className={styles.description}>
              John is an experienced investor who has been using our platform to fund innovative projects that align with his investment goals. He is passionate about supporting startups and entrepreneurs who are using technology to create positive social impact.
            </p>
          </div>
          <div className={styles.communityItem}>
            <img
              src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription01&hairColor=PastelPink&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue02&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Light'
              alt="Community member avatar"
              className={styles.avatar}
            />
            <h3 className={styles.name}>Jane Doe</h3>
            <p className={styles.description}>
              Jane is a social activist who has been using our platform to raise funds for various causes she is passionate about. She has been actively organizing crowdfunding campaigns for causes such as environmental conservation, animal rights, and social justice.
            </p>
          </div>
          <div className={styles.communityItem}>
            <img
              src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Kurt&hatColor=Black&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=CollarSweater&clotheColor=Red&eyeType=Happy&eyebrowType=UpDownNatural&mouthType=Concerned&skinColor=Light'
              alt="Community member avatar"
              className={styles.avatar}
            />
            <h3 className={styles.name}>Bob Marley</h3>
            <p className={styles.description}>
              Bob is an entrepreneur who has been using our platform to raise funds for his own startup. He has been actively involved in the startup ecosystem and has been leveraging our platform to connect with potential investors and customers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
