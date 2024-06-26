// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    mapping(address => bool) public isCampaignClosed;

    function createCampaign(
        string memory title,
        string memory description,
        uint minimumContribution,
        string memory photoHash,
        uint fundingGoal,
        uint duration,
        string memory rewards,
        string memory teamMembers
    ) 
        public 
    {
        address newCampaign = address(new Campaign(
            title,
            description,
            minimumContribution,
            msg.sender,
            photoHash,
            fundingGoal,
            duration,
            rewards,
            teamMembers,
            address(this)
        ));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function updateCampaignStatus(address campaignAddress, bool status) public {
        require(Campaign(campaignAddress).getFactory() == address(this), "Unauthorized caller");
        isCampaignClosed[campaignAddress] = status;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    struct CampaignDetails {
        string title;
        string description;
        string photoHash;
        string rewards;
        string teamMembers;
        
    }

    struct FundingDetails {
        uint minimumContribution;
        uint fundingGoal;
        uint remainingGoal;
        uint duration;
        uint creationTime;
        address manager;
        address factory;
    }


    Request[] public requests;
    mapping(address => uint) public contributions;
    address[] public contributors;

    CampaignDetails public campaignDetails;
    FundingDetails public fundingDetails;
    bool public isClosed;

    modifier restricted() {
        require(msg.sender == fundingDetails.manager, "Only manager can call this function");
        _;
    }

    event PhotoHashSet(string photoHash);
    event CampaignClosed();
    event CampaignUpdated(
        string title,
        string description,
        string photoHash,
        string rewards,
        string teamMembers
    );

    constructor(
        string memory title,
        string memory description,
        uint minimum,
        address creator,
        string memory _photoHash,
        uint _fundingGoal,
        uint _duration,
        string memory _rewards,
        string memory _teamMembers,
        address _factory
    ) 
    {
        isClosed = false;


        campaignDetails = CampaignDetails({
            title: title,
            description: description,
            photoHash: _photoHash,
            rewards: _rewards,
            teamMembers: _teamMembers
        });

        fundingDetails = FundingDetails({
            minimumContribution: minimum,
            fundingGoal: _fundingGoal,
            remainingGoal: _fundingGoal,
            duration: _duration,
            creationTime: block.timestamp,
            manager: creator,
            factory: _factory
        });

        emit PhotoHashSet(_photoHash);
    }

    // Add the function to get the factory address
    function getFactory() public view returns (address) {
        return fundingDetails.factory;
    }

    function updateStatus() internal {
        if (!isClosed && fundingDetails.remainingGoal == 0) {
            isClosed = true;
            emit CampaignClosed();
            CampaignFactory(fundingDetails.factory).updateCampaignStatus(address(this), true);
        }
    }

    function contribute() public payable {
        updateStatus();
        require(!isClosed, "Campaign is closed");
        require(msg.value >= fundingDetails.minimumContribution, "Contribution is less than minimum");

        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        
        contributions[msg.sender] += msg.value;
        fundingDetails.remainingGoal -= msg.value;
        updateStatus();
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        updateStatus();
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        updateStatus();
        Request storage request = requests[index];
        require(contributions[msg.sender] > 0, "Must be a contributor");
        require(!request.approvals[msg.sender], "Already approved");
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function hasApproved(uint index) public view returns (bool) {
        Request storage request = requests[index];
        return request.approvals[msg.sender];
    }

    function finalizeRequest(uint index) public restricted {
        updateStatus();
        Request storage request = requests[index];
        require(!request.complete, "Request already completed");
        require(request.approvalCount > (contributors.length / 2), "Not enough approvals");
        require(address(this).balance >= request.value, "Insufficient balance");
        
        // Update state before transferring funds
        request.complete = true;
        payable(request.recipient).transfer(request.value);
    }

    function updateCampaignDetails(
        string memory newTitle,
        string memory newDescription,
        string memory newPhotoHash,
        string memory newRewards,
        string memory newTeamMembers
    ) public restricted {
        campaignDetails = CampaignDetails({
            title: newTitle,
            description: newDescription,
            photoHash: newPhotoHash,
            rewards: newRewards,
            teamMembers: newTeamMembers
        });

        emit CampaignUpdated(newTitle, newDescription, newPhotoHash, newRewards, newTeamMembers);
    }

    function getOtherDetails() public view returns(
        uint, uint, uint, bool
    ) {
        bool isClosedChecked = isClosed || (fundingDetails.remainingGoal == 0);
        return (
            address(this).balance,
            requests.length,
            contributors.length,
            isClosedChecked
        );
    }

    function setPhotoHash(string memory _photoHash) public restricted {
        campaignDetails.photoHash = _photoHash;
        emit PhotoHashSet(_photoHash);
    }

    function getTimeLeft() public view returns (uint) {
        if (fundingDetails.remainingGoal == 0) {
            return 0;
        } else {
            return (fundingDetails.creationTime + (fundingDetails.duration * 1 days)) - block.timestamp;
        }
    }

    function getContributors() public view returns (address[] memory, uint[] memory) {
        uint contributorCount = contributors.length;
        address[] memory contributorAddresses = new address[](contributorCount);
        uint[] memory contributionAmounts = new uint[](contributorCount);

        for (uint i = 0; i < contributorCount; i++) {
            contributorAddresses[i] = contributors[i];
            contributionAmounts[i] = contributions[contributors[i]];
        }

        return (contributorAddresses, contributionAmounts);
    }
}
