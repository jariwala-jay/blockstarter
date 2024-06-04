import React from 'react';
import Layout from '../src/app/components/Layout';

export default function CommunityPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center mb-[40px]">
        <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold">Join our community!</h1>
        <div className="flex flex-wrap justify-center gap-8 text-black font-nanum">
          <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 min-w-[200px] max-w-[300px] shadow-md ">
            <img
              src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription01&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Tongue&skinColor=DarkBrown"
              alt="Community member avatar"
              className="w-[150px] h-[150px] rounded-full mb-4"
            />
            <h3 className="text-2xl mb-2">John Smith</h3>
            <p className="text-base leading-6 text-justify">
              John is an experienced investor who has been using our platform to fund innovative projects that align with his investment goals. He is passionate about supporting startups and entrepreneurs who are using technology to create positive social impact.
            </p>
          </div>
          <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 min-w-[200px] max-w-[300px] shadow-md">
            <img
              src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription01&hairColor=PastelPink&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue02&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Light'
              alt="Community member avatar"
              className="w-[150px] h-[150px] rounded-full mb-4"
            />
            <h3 className="text-2xl mb-2">Jane Doe</h3>
            <p className="text-base leading-6 text-justify">
              Jane is a social activist who has been using our platform to raise funds for various causes she is passionate about. She has been actively organizing crowdfunding campaigns for causes such as environmental conservation, animal rights, and social justice.
            </p>
          </div>
          <div className="flex flex-col items-center bg-[#eefdfe] rounded-lg p-4 min-w-[200px] max-w-[300px] shadow-md">
            <img
              src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Kurt&hatColor=Black&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=CollarSweater&clotheColor=Red&eyeType=Happy&eyebrowType=UpDownNatural&mouthType=Concerned&skinColor=Light'
              alt="Community member avatar"
              className="w-[150px] h-[150px] rounded-full mb-4"
            />
            <h3 className="text-2xl mb-2">Bob Marley</h3>
            <p className="text-base leading-6 text-justify">
              Bob is an entrepreneur who has been using our platform to raise funds for his own startup. He has been actively involved in the startup ecosystem and has been leveraging our platform to connect with potential investors and customers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
