import React from 'react'
import {
    Card,
    Typography,
    CardContent,
    LinearProgress
  } from "@mui/material";
import CampaignTimer from "./CampaignTimer";
import web3 from "../../../ethereum/web3";
import ContributeForm from "./ContributeForm";

const InvestDetailsCard = ({address,raisedAmount,progress,targetAmount,approversCount,minimumContribution}) => {
    return (
        <Card
              sx={{
                backgroundColor: "#eefdfe",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                p: 2,
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum mb-[1rem]"
                >
                  Time Left
                </Typography>
                <CampaignTimer address={address} />
                
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Raised
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {Math.round(raisedAmount*100)/100} ETH
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#f5f5f5",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#f36128",
                    },
                  }}
                />
                <div className='relative'>
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {`${progress.toFixed(2)}% of Target`}

                </Typography>
                
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className='absolute right-0'
                >
                {targetAmount} ETH

                </Typography>
                </div>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Investors
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {approversCount}
                </Typography>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Minimum Investment
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {web3.utils.fromWei(minimumContribution, "ether")} ETH
                </Typography>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum mb-[1rem]"
                >
                  Invest Here
                </Typography>
                <ContributeForm address={address} />
              </CardContent>
            </Card>
    )
}

export default InvestDetailsCard
